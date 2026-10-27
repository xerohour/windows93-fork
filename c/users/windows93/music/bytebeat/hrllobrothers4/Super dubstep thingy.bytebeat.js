/*! { author: "hrllobrothers4", name: "Super dubstep thingy", url: "https://www.reddit.com/r/bytebeat/comments/11pohr2/super_dubstep_thingy/", date: "2023-03-12", sampleRate: 44100, mode: "Floatbeat", remix: "Gabriel Miceli/Crude Sinewave Dubstep" } */
a=t*(t&t>>12)/(t&16384?10:1e4),sin(a/20.5)*((a>>5)%.7)+sin(log(t&16383)*50)/2+random()*(-t&8E3)/8E3+(sin(3E4/(t/16*2&4095))*.3)-0.5
