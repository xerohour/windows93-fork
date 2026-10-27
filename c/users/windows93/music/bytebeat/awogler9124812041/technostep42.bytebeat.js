/*! { author: "awogler9124812041", name: "technostep42", url: "https://www.reddit.com/r/bytebeat/comments/1bpycu6/technostep42/", date: "2024-03-28", sampleRate: 44100, mode: "Floatbeat", remix: ["the 42 melody","krcko/Modem melody"] } */
d=sin(sqrt(t%16384))/2+(random()-0.5)*((4096-t&4095)/4096)*(t>>13&1),
forty2=min(t*(42&((t>>12)+2)&15)/4%256/(256/((t>>12&1)?16:1)),1)-0.5,
[(sin((t&t>>12)&t*PI/256)+sin((t&t>>12)|t*PI/256))/4+d/2+forty2/2*(t>>18&1),(sin((t&t>>12)|t*PI/256)+sin((t&t>>12)^t*PI/256))/4+d/2+forty2/2*(t>>18&1)]
