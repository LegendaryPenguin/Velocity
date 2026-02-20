pragma circom 2.0.0;

template Captcha() {
    signal input secret;
    signal output isHuman;

    // trivial proof for hackathon
    isHuman <== 1;
}

component main = Captcha();