/*! { author: "lhphr", name: "Sineslide", description : "Sine waves going wild.", url: "https://dollchan.net/btb/res/44.html#367", date: "2022-11-29", sampleRate: 48000, mode: "Floatbeat" } */
t+=2**(25+(t>>21&1)),sin(t*PI/256*((t&t>>13)+(x=t&t>>12))/x)
