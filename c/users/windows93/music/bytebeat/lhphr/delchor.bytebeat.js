/*! { author: "lhphr", name: "delchor", description : "Probably a simple progression of chords.", url: "https://dollchan.net/btb/res/44.html#44", date: "2022-04-13", sampleRate: 44100 } */
(s=4*((l=t/44100*4400)%2**12)>>11<7)*((a=l*'12'[l>>8&1]*'66998887'[l>>13&7]/6)%48+a%64)|(a<<3&a>>7)%32
