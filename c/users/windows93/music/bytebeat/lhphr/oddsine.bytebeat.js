/*! { author: "lhphr", name: "oddsine", description : "Was messing around with the sine function and got this by chance.", url: "https://dollchan.net/btb/res/44.html#50", date: "2022-04-19", sampleRate: 44100 } */
(32*sin((x=t/[1,1,1,2,1.5,1.5,w=1.25+(0.75-1.25*(t>>16&1))*(t>>15&1),w][t>>12&7])/441*65)>>(x/2&16))+128
