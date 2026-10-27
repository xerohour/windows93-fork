/*! { author: "rubi", name: "the teem is rooning out", url: "https://www.reddit.com/r/bytebeat/comments/shsssm/the_teem_is_rooning_out/", date: "2022-02-01", sampleRate: 11025, mode: "Signed Bytebeat", remix: "SthephanShi/The time is running out!" } */
((t*[5,7][(t>>14)%2]>>2&128)+(t*[1,2,3,4][(t>>10)%4]*[5,7][(t>>14)%2]&95)+(96*random()*(1-(1&t>>[9,11][(t>>12)%2])))+(70*sin(4e3/(t&4095))))/2-90
