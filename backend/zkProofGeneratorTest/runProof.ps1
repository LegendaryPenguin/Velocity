# Run end-to-end zk-proof generation + validation
# Assumes input.json already contains: { "score": <int> }

$GENERATOR = "."
$VALIDATOR = "..\zkProofValidator"

Write-Host "=== ZK Proof Pipeline ==="

# -------------------------
# Step 0: Sanity check input
# -------------------------
$input = Get-Content "$GENERATOR\input.json" | ConvertFrom-Json
if ($null -eq $input.score) {
    Write-Error "input.json must contain a 'score' field"
    exit 1
}

Write-Host "Using score:" $input.score

$score = $input.score
Write-Host "Using score:" $score

# Reject out-of-range scores before generating witness
if ($score -lt -4000 -or $score -gt 6000) {
    Write-Host "=== Test failed: score out of valid range. Data not processed. ==="
    exit 0
}

# ---------------------------------------
# Step 1: Clean stale generated artifacts
# ---------------------------------------
Write-Host "Cleaning old circuit artifacts..."

$pathsToDelete = @(
    "$GENERATOR\captcha_js",
    "$GENERATOR\captcha.r1cs",
    "$GENERATOR\captcha.sym",
    "$GENERATOR\captcha_0000.zkey",
    "$GENERATOR\captcha_final.zkey",
    "$GENERATOR\verification_key.json",
    "$GENERATOR\witness.wtns",
    "$GENERATOR\proof.json",
    "$GENERATOR\publicSignals.json"
)

foreach ($path in $pathsToDelete) {
    if (Test-Path $path) {
        Remove-Item $path -Recurse -Force
    }
}

# -------------------------
# Step 2: Compile circuit
# -------------------------
Write-Host "Compiling circuit..."
circom captcha.circom --r1cs --wasm --sym
if ($LASTEXITCODE -ne 0) {
    Write-Error "Circuit compilation failed"
    exit 1
}

# -------------------------
# Step 3: Trusted setup
# -------------------------
Write-Host "Running Groth16 setup..."
snarkjs groth16 setup `
  "$GENERATOR\captcha.r1cs" `
  "$GENERATOR\pot12_final.ptau" `
  "$GENERATOR\captcha_0000.zkey"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Groth16 setup failed"
    exit 1
}

snarkjs zkey contribute `
  "$GENERATOR\captcha_0000.zkey" `
  "$GENERATOR\captcha_final.zkey" `
  --name="hackathon" -v `
  --entropy="wolfie"

if ($LASTEXITCODE -ne 0) {
    Write-Error "ZKey contribution failed"
    exit 1
}

snarkjs zkey export verificationkey `
  "$GENERATOR\captcha_final.zkey" `
  "$GENERATOR\verification_key.json"

# -------------------------
# Step 4: Generate witness
# -------------------------
Write-Host "Generating witness..."
node `
  "$GENERATOR\captcha_js\generate_witness.js" `
  "$GENERATOR\captcha_js\captcha.wasm" `
  "$GENERATOR\input.json" `
  "$GENERATOR\witness.wtns"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Witness generation failed (score likely out of range)"
    exit 1
}

# -------------------------
# Step 5: Generate proof
# -------------------------
Write-Host "Generating proof..."
snarkjs groth16 prove `
  "$GENERATOR\captcha_final.zkey" `
  "$GENERATOR\witness.wtns" `
  "$GENERATOR\proof.json" `
  "$GENERATOR\publicSignals.json"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Proof generation failed"
    exit 1
}

# --------------------------------
# Step 6: Copy files to validator
# --------------------------------
Copy-Item "$GENERATOR\proof.json" "$VALIDATOR\proof.json" -Force
Copy-Item "$GENERATOR\publicSignals.json" "$VALIDATOR\publicSignals.json" -Force
Copy-Item "$GENERATOR\verification_key.json" "$VALIDATOR\verification_key.json" -Force

# -------------------------
# Step 7: Verify proof
# -------------------------
Write-Host "`n=== Running Validator ==="
Push-Location $VALIDATOR
node test.js
Pop-Location

Write-Host "`n ZK pipeline completed successfully"