/*! { author: "Zackx", name: "lazy jones - star dust", url: ["https://www.reddit.com/r/bytebeat/comments/155w0cg/lazy_jones_star_dust_kernkraft_400/","https://dollchan.net/btb/res/204.html#1685"], date: "2023-07-21", sampleRate: 32000, mode: "Signed Bytebeat", remix: "Zackx/kernkraft 400", cover: "[Lazy Jones - Star Dust](https://youtu.be/YsorGbKwNlA?t=23)" } */
r=t*1.25,w=(x,y)=>((t*2**(x/12)/y%256/4)-32)*(-cos(r*PI/4096)+1),
w([-12,12,15,17,19,0,-12,0,-12,12,15,17,19,20,19,15,17,5,-7,5,15,7,19,12,-12,0,-12,0,-12,0,-12,0][31&r>>13],.99)+w([0,0,0,0,5,7,0,0][7&r>>15],'21'[1&r>>13])
