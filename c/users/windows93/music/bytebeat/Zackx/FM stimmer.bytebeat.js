/*! { author: "Zackx", name: "FM stimmer", url: "https://dollchan.net/btb/res/204.html#266", date: "2022-11-29", sampleRate: 32000, mode: "Floatbeat", remix: "stimmer" } */
p=(t>>15&t>>13)*[3,2,1.5,0][3&t>>11]/2,b=([1,2][1&t>>13]*0.5)*[2,2.5,3,3.5][3&t>>15]/2,
sin(sin(p*t/4.79)/40*(32-(t/256)%32)+p*t/40.743665)*(32-(t/256)%32)/64+sin(sin(b*t/81.48732)/6*(32-(t/256)%32)+b*t/40.743665)*(32-(t/256)%32)/48
