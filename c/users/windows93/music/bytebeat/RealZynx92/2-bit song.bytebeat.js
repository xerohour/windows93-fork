/*! { author: "RealZynx92", name: "2-bit song", url: "https://www.reddit.com/r/bytebeat/comments/q36kta/2bit_song/", date: "2021-10-07", sampleRate: 32000 } */
(pow(2.75,-t/2048%8+8)&128)+(t*(t&t>>11)&64)|t/[2,2,2,2,3,3,4,4][(t>>14)%8]&128
