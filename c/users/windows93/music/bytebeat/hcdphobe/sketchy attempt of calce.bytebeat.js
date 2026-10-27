/*! { author: "hcdphobe", name: "sketchy attempt of calce", url: "https://dollchan.net/btb/res/163.html#375", date: "2023-01-28", sampleRate: 22050 } */
x=((t/2*[1,sin(t>>2),1.22,sin(t>>2),1.12,sin(t>>2),1.5,sin(t>>2),][t>>13&7]|t>>5)&255)/2,c=((random()*t)&128|t>>3)&128?0:44,r=(230000/(t&8191))&64,x+c+r*1.15
