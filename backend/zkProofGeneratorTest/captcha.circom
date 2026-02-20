pragma circom 2.0.0;

template NumToBits(n) {
    signal input in;
    signal output bits[n];

    var acc = 0;
    for (var i = 0; i < n; i++) {
        bits[i] <-- (in >> i) & 1;
        bits[i] * (bits[i] - 1) === 0;
        acc += bits[i] * (1 << i);
    }
    acc === in;
}

template Captcha() {
    signal input score;
    signal output isHuman;

    // Shift range [-4000, 6000] → [0, 10000]
    signal shifted;
    shifted <== score + 4000;

    component low = NumToBits(14);
    low.in <== shifted;

    signal slack;
    slack <== 10000 - shifted;

    component high = NumToBits(14);
    high.in <== slack;

    isHuman <== 1;
}

component main = Captcha();