/*! { author: "lhphr", name: "3DIAL", description : "Probably not how one is supposed to melody.", url: "https://dollchan.net/btb/res/44.html#88", date: "2022-06-26", sampleRate: 32000 } */
v=t/3,m=v>>10&127^v>>10&v>>9&255,(3E3**(1-t/2**(12-(t>>12&1))%3/3)&64)+64*(1-t/16384%1)*sin((v%16384>>(v>>7&7))**3)**2+1.5*(2**((m/7|0)+[-1,1,1,4,4,6,9][m%7]/12)*t/25*11&32)
