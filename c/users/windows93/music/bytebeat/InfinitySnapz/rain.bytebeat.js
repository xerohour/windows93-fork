/*! { author: "InfinitySnapz", name: "rain", url: "https://www.reddit.com/r/bytebeat/comments/ceg1gu/rain/", date: "2019-07-17", sampleRate: 44100 } */
(t<2)?
(

a = 0, 
b = 0,
c = 0

):(

a = (a*0.999)+(random()*0.001),
(b<0)?(b = random()*0.7,c = random()):(b = b-(1/44100)),
abs((a*256*(sin(t/50000)*5+10))%256-128) + ((t/300*((c*10)+200))&2)*255*pow(b,random()/5+4)

)
