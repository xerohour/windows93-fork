/*! { author: "psubscirbe", name: "floatbeat rhythm", url: "https://www.reddit.com/r/bytebeat/comments/14e9a5u/floatbeat_rhythm/", date: "2023-06-20", mode: "Floatbeat" } */
sin(sqrt(t*(t&4096?random():[1,1,1.2,1.5,1,1,1.2,1.1][t>>14&7])&63)*4)/((t>>(t&8192?t&16384?2:3:4)&255)*.1)
