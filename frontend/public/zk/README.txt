Place ZK proof artifacts here for the captcha (loaded at /zk/):
  - captcha.wasm   (from backend/zkProofGeneratorTest/captcha_js/captcha.wasm after running the pipeline)
  - captcha_final.zkey (from backend/zkProofGeneratorTest/captcha_final.zkey after running the pipeline)

Run the pipeline once: cd backend/zkProofGeneratorTest && node -e "require('./runPipeline.js').runZKProofPipeline(1000)" (or use testRun.js), then copy the two files above.
