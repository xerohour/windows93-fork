/*! { author: "PortablePorcelain", name: "Noise maker with only one variable", url: "https://www.reddit.com/r/bytebeat/comments/16u1o2d/noise_maker_with_only_one_variable/", date: "2023-09-28", sampleRate: 11025, remix: "Gabriel Miceli/Noise Maker" } */
(((t&4096?t*(t^t+t/256)|t>>4:t>>3|(t&8192?t<<2:t))>>1&127)+((t*((t>>9^(t>>9)-1^1)%13)&255)>>1))*(2+(t>>16))
