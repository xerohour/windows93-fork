/*! { author: "psubscirbe", name: "Atari's noise emulation", url: "https://www.reddit.com/r/bytebeat/comments/1gi77i9/ataris_noise_emulation/", date: "2024-11-02", mode: "Funcbeat", remix: "Decent-Manager-6169/atari thingy" } */
return function(t) {
    t *= 1000;
    let lfsr = 0b11111;
    let o = [];

    for (let _ = 0; _ < 32; _++) {
        const bit = (lfsr & 1) ^ ((lfsr >> 1) & 1);
        lfsr = (lfsr >> 1) | (bit << 4);
        o.push(lfsr & 1);
    }
    const atari_thingy = 2 + ((t >> 7 & 7) % 3);
    return o[int(t * atari_thingy) % o.length];
}
