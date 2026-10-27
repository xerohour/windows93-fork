/*! { author: "Chasyxx", name: "Drum Pattern", url: "https://dollchan.net/btb/res/756.html#967", date: "2023-04-28" } */
a=(a,b)=>(b.test(a.toString(2))),
tt=((t>>4)&255),
drum=(t)=>a(t+tt,/^...1/)&&(a(t+tt,/^..1/)||a(t+tt,/^....1/)),

drum(t%(2048/[1,1,1,1,1,1,2,2][t>>11&7]))?255:0
