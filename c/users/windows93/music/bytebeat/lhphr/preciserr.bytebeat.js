/*! { author: "lhphr", name: "preciserr", description : "A song created with the use of precision errors in floats.", url: "https://dollchan.net/btb/res/44.html#1367", date: "2023-04-21", sampleRate: 32000 } */
x=t&t>>12,y=t/4096,z=!(~t>>13&15),(y/x%1==y%x/x)*(y/2**!z%1)**.5*127+(50*(t%2**(13-z))**.5&128)
