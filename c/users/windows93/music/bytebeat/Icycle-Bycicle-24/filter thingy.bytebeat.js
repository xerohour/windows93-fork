/*! { author: "Icycle-Bycicle-24", name: "filter thingy", url: "https://www.reddit.com/r/bytebeat/comments/1eac6so/filter_thingy/", date: "2024-07-23", sampleRate: 11025, remix: "SthephanShi/The time is running out!" } */
f=t=>(
t*(2&t>>13?7:5)*(3-(3&t>>9)+(3&t>>8))>>(3&-t>>(t&4096|(t>>11)%32>28?2:16))|t>>3
),

F=n=>{out=0;for(i=0;i<n;i++)out+=f(t-i)&255;return out/n},

F(10)
