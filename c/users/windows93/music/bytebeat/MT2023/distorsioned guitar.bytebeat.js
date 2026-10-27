/*! { author: "MT2023", name: "distorsioned guitar", url: "https://dollchan.net/btb/res/500.html#1790", date: "2023-08-03", sampleRate: 32000, remix: "aturned777" } */
a=t=>sin(t/4/(4+(t>>15)%16)*(1+(3&t>>13))/[1,4][(t>>12)%2])*16+16,p=(i)=>(a(t)+a(t-i)+a(t-(i*2))+a(t-(i*3))+a(t-(i*4))+a(t-(i*5))+a(t-(i*6))+a(t-(i*7))+a(t-(i*4)))/2,p(p(104)%p(0))+(29*sqrt(t*[1,2,4,8,1,2,4,3][(t>>14)%8]&16383)&64)
