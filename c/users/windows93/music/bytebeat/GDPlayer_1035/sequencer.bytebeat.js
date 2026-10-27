/*! { author: "GDPlayer_1035", name: "sequencer", url: "https://www.reddit.com/r/bytebeat/comments/q5r5zk/sequencer/", date: "2021-10-11", sampleRate: 44100 } */
delay=22050,
c5=523,
d5=587,
e5=659,
f5=698,
g5=783,
a5=880,
b5=987,
c6=1046,
tones=[c5,d5,e5,f5,g5,a5,b5,c6][round(t/delay)%8],
(sin(t/44100*tones*6.28000000000001)*128)+128
