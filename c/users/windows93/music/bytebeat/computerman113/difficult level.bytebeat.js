/*! { author: "computerman113", name: "difficult level", url: "https://www.reddit.com/r/bytebeat/comments/1hfy2uj/difficult_level/", date: "2024-12-17", sampleRate: 48000, remix: "SthephanShi/Hard level" } */
t/=6,
a=t*(t&16384?7:5)*(5-(3&t>>8))>>(3&-t>>(t&4096?2:16))|t>>(t&16384?t&4096?3:4:3),
b=(sin(200000/((t%4096)+900)))*64,
c=(t&4096)?((random()*64)&-t>>5):0,

o=(a%256*.5)+b+c,
max(min(o+32,255),0)
