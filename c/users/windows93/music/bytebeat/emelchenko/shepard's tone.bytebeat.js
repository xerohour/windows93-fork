/*! { author: "emelchenko", name: "shepard's tone", url: "https://www.reddit.com/r/bytebeat/comments/1h7xojq/shepards_tone/", date: "2024-12-06", sampleRate: 32000, mode: "Floatbeat" } */
f=i=>i&&sin(t*1.5**i/256*((t>>16&7)/16+1))+f(i-1),f(16)/16
