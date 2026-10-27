/*! { author: "Chasyxx", name: "abandoned pit", url: "https://dollchan.net/btb/res/756.html#1633", date: "2023-05-03", sampleRate: 48000, cover: "[Abandoned Pit - Castlevania: Symphony of the Night Music Extended](https://youtu.be/Qa5ZjayT5CA)" } */
T=t*1.2,
A=(T>>16)<7?[2.4,0,2,2.4]:[0,0,2,2.4],
C=!!((((T>>16)/3)-1.666)&4),
C2=((T>>16)>5)&&!!((((T>>16)/3)-2)&4),
B=[0,0,2,2.7],
D=C2?[1.35,2,1.88]:[1,2.4,2],
a=(t*0.56*D[(T>>16)%3]&192)/(1+(T>>10&63)/4),
b=((t*1.12*((C||C2)?B:A)[(T>>14)&3]&255)/(1+(T>>8&63)/8))&224,

a+(((T>>16)>5)&&b)
