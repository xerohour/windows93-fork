/*! { author: "lhphr", name: "clear delay example", url: "https://dollchan.net/btb/res/171.html#943", date: "2023-04-25", sampleRate: 48000, mode: "Floatbeat" } */
(t/=y=1.5)?0:d=Array(12288*y|0).fill(x=0),

//volume change variable
x=min((1-t/8192%1),x+1/128),

// sound requires pitch change or volume change for the delay to be apparent
// pitch change shows the delay effect rather well already, but having both is nice
code=sin(t*PI/64*2**((+'03  75'[t>>13&5]+[0,-2,-3,4][t>>17&3])/12)*y)/2*x,

main=code+d.shift(),
d.push(main/2),
main
