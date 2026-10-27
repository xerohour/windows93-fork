/*! { author: "MT2023", name: "random melody", url: "https://dollchan.net/btb/res/500.html#2207", date: "2023-09-03", sampleRate: 44100, mode: "Floatbeat" } */
sin(t*PI/64*((t%8192?a:(a=floor(random()*8)))^2)+(t*PI/16384))/4+sin(t*PI/64*(t%4096?b:(b=floor(random()*4)))+(t*PI/16384))/4
