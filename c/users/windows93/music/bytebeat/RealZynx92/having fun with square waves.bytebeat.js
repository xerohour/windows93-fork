/*! { author: "RealZynx92", name: "having fun with square waves", url: "https://www.reddit.com/r/bytebeat/comments/qeml94/having_fun_with_square_waves/", date: "2021-10-24", sampleRate: 44100 } */
(t&64/(t&t>>12?t&t>>14?1:2:4))+(t/[1,2,8,2,4,3,2,3][(t>>13)%8]&64)+(sqrt((t&16383)*1000)&64)+(t*(t&t>>12)&32)
