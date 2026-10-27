/*! { author: "psubscirbe", name: "enjoy some drums *_*", url: "https://www.reddit.com/r/bytebeat/comments/150as84/enjoy_some_drums/", date: "2023-07-15", sampleRate: 48000 } */
(t*[,sin(t>>2)][t>>14&1]&63&~t>>8)+(sqrt(t&16383)*32&64)+(t*random()&31&~t>>8)+(t/2*(1+(t>>17&1))*2**([0,3,5,6,10,6,1,3][t>>13&7]/12)&96)
