/*! { author: "awogler9124812041", name: "simple bitcrushed noise with lerp", url: "https://www.reddit.com/r/bytebeat/comments/1bk7eap/simple_bitcrushed_noise/", date: "2024-03-21", sampleRate: 48000, mode: "Floatbeat", remix: "awogler9124812041/simple bitcrushed noise" } */
dist=128,
t||(trg=0,l=0,c=0),
(t%dist)||(l=trg,trg=random()-0.5),
lerp=(v0,v1,t)=>v0*(1-t)+v1*t,
c=lerp(l,trg,t%dist/dist)
