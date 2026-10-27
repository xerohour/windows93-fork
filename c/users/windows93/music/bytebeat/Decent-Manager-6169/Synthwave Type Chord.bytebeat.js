/*! { author: "Decent-Manager-6169", name: "Synthwave Type Chord", url: "https://dollchan.net/btb/res/520.html#8230", date: "2025-07-15", sampleRate: 48000, mode: "Floatbeat" } */
f=(t%65536/3>>7&63)/(70+(cos(t*PI/65536/3)+.94)*200)/3+.01,a=i=>i&&(t*2**(([0,4,7,11][t&3]-'0075'[t>>16&3])/12)+(f*i*7))%256/100+a(i-1),(a(100)/128-1)*-cbrt(t%8192-13e3)/32*min(1,abs(asin(sin(t*PI/8192)))*48)
