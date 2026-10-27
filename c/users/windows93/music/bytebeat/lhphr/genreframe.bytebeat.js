/*! { author: "lhphr", name: "genreframe", url: "https://dollchan.net/btb/res/44.html#50", date: "2022-04-22", sampleRate: 32000 } */
2*((x=t%16384)%((x/(y=2+(t>>15&3)-2.25*((t>>15)%8==7))*(y-1))>>7))|x<<(y-2)&x>>(8-(t>>17&1))
