/*! { author: "Zackx", name: "C64 thing", url: "https://dollchan.net/btb/res/204.html#1091", date: "2023-05-26", sampleRate: 32000 } */
(t*2**('047'[(t>>10)%3]/12)*1.04*2**('0572'[3&t>>17]/12)&127)+(t>>10)&128
