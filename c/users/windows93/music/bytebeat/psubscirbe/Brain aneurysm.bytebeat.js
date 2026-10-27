/*! { author: "psubscirbe", name: "Brain aneurysm", url: "https://www.reddit.com/r/bytebeat/comments/1fg2sa1/brain_aneurysm/", date: "2024-09-13", sampleRate: 32000 } */
bf=i=>i&~i>>3,s=13,t||(n=0),t||(l=[],(()=>{for(let i=0;i<256;i++){l.push(bf(i))}})()),t%(2**s)?n+=(l[(t>>s)%l.length]-n)/2048:n=(l[((t>>s)%l.length)-1]||l[0]),(t&255)*n
