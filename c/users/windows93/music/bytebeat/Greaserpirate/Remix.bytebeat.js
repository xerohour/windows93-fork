/*! { author: "Greaserpirate", name: "Remix", url: "https://www.reddit.com/r/bytebeat/comments/1b7gm3v/comment/ktjxj3q/", date: "2024-03-06", sampleRate: 32000, remix: "Zackx/Power Up" } */
t*=.6,
v=(t%8192)/8192,
s=x=>
(t/1.3*2**(parseInt('16ADID269E9EILQL48BGBGKNSNKNSNK6'[t>>11&31],36)/12)&127*v**x) * v,
k = (sin(cbrt(t%8192+16)*8)+1)*64*(2-v),

[ ( s(0) & s(v**4) ) + k, ( s(0) & s(.5) ) + k ]
