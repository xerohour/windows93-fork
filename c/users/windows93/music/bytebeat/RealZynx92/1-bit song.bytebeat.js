/*! { author: "RealZynx92", name: "1-bit song", url: "https://www.reddit.com/r/bytebeat/comments/qmk3k8/1bit_song/", date: "2021-11-04", sampleRate: 32000 } */
(48*(random()*"0000202020002020"[t/1.2>>10&15]&1))+(6E4/(t/1.2&4095))+(t*[1,random(),random(),random(),0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0][(t/1.2>>10)+16&31])+(t/"12483456"[t/1.2>>16&7]&40)&64
