/*! { author: "MT2023", name: "i am in lil' panic", url: "https://dollchan.net/btb/res/500.html#2342", date: "2023-09-24", sampleRate: 44100 } */
((t*(t>>12|t>>11|t>>10)^-t)&255)/4+sin(sqrt(t%16384))*32+32+random()*64*(1-t/4%2048/2048)*[0,1][(t>>14)%2]
