/*! { author: "PortablePorcelain", name: "We are temporally deficient!", url: "https://dollchan.net/btb/res/55.html#136", date: "2022-08-09", sampleRate: 36000 } */
t*=.1875,x=(x,y)=>max(x&255,t/y&255),y=(x(t*(t/3&4096?7.5:6)*2**(t/3>>14&3),8)&x(t*(t/3&4096?5:4.5)*2**(t/3>>14&3),12))+(512/(t/3&1023))+(1024/(t&1023)),((y&255)^(x(t*(t/3&4096?7.5:6)*2&t*(t/3&4096?5:4.5)*2,8)&255))&192
