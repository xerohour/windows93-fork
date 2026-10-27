/*! { author: "hcdphobe", name: "DJ Adding sinewaves", url: "https://dollchan.net/btb/res/163.html#518", date: "2023-03-03", sampleRate: 8100, remix: "Zackx/Adding sinewave" } */
c=x=>sin(16*cbrt(t&8191>>x))*32,z=[1,.8865,.79,.593][(t>>14)%4]*[.5,1,2,4][3&t>>10],((z*t%100+z*t%100.5+z*t%67)/1.5+32+32*sin(z*t/1.34))/2+c([1,1,1,2,1,1,3,2][t>>12&7])+64
