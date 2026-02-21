Place the ZK proof artifacts here so the frontend can load them at /zk/:

  - captcha.wasm   (from backend/zkProofGeneratorTest/captcha_js/captcha.wasm after running the pipeline)
  - captcha_final.zkey (from backend/zkProofGeneratorTest/captcha_final.zkey after running the pipeline)

If this folder is inside the PoW-Captcha-Module only (not your app), copy these two files into your application's public/zk/ directory instead.
