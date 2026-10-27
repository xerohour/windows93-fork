/*! { author: "D3nschøt", name: "NoisecanMinor", url: "https://www.reddit.com/r/bytebeat/comments/1aqpt0o/i_think_i_broke_it/", date: "2024-02-14", sampleRate: 44100 } */
w = 1<<16,
Fn = (([1,2,3,4,4.5,4.75,6,8][(abs(t)>>12)%8])),
output = abs((t*Fn*256/4))|-abs((-t|-t*2|-t*3|-t*4)/16),
kick = sin((3e5/(t%(65536)+1))%256*3.14159265359/64)*127.9+128,
((w*2+(output%w/(w/256)))%256)/2+kick/2
