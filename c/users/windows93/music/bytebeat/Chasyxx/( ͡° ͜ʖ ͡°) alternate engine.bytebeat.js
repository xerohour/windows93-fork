/*! { author: "Chasyxx", name: "( ͡° ͜ʖ ͡°) alternate engine", url: "https://dollchan.net/btb/res/756.html#994", date: "2023-05-03", sampleRate: 44100, remix: "rubi/( ͡° ͜ʖ ͡°)" } */
t=int(t/4),
l=sin(t>>3),
h=sin(t),
proc=(input,s=11)=>(x=input[(t>>s)%input.length],(x=='h'?h:x=='l'?l:x)*t&t>>(s-8)),
proc("l2h2l2h2l2h2l2h3",12)-8
