/*! { author: "Admirable-Dot-5854", name: "Patrick The Android's Vocals", url: "https://www.reddit.com/r/bytebeat/comments/1imghdr/comment/mc768c7/", date: "2025-02-10", sampleRate: 48000, mode: "Signed Bytebeat", remix: "awogler9124812041/formant synthesis" } */
f=a=>sin(t%541/8e3*a),p=a=>{q=0;a.forEach(b=>q+=f(b)/a.length);return q},DTMF=[
[312,2497],[520,1995],[681,1659],
[558,1201],[335,865]],(p(DTMF[(t>>13&-t>>12)%DTMF.length])*128)%256*(1-t%541/541)
