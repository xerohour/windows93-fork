/*! { author: "raphaelgoulart", name: "Fortnite Default Dance in Bytebeat", url: "https://www.reddit.com/r/bytebeat/comments/b48xrx/fortnite_default_dance_in_bytebeat/", date: "2019-03-22", sampleRate: 44100, cover: "[Fortnite Default Dance](https://youtu.be/6dck03SrEmM)" } */
d=.127*t,
b=floor(t/1578),
a=[0,0,0,0,0,0,0,0,4,4,4.75,4.75,5.3,0,5.3,5.3,5.3,5.3,5.3,5.3,4.75,4.75,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4.75,4.75,5.3,0,5.3,5.3,5.3,5.3,4.75,4.75,0,0,4,4,0,0,3.55,3.55,4,4,0,0],
n=d*random(),
r=floor(b/2)%64,
([0,3,6,10].includes(floor(b/4%16))?d:0)%64+d*a[r]%64+d*a[r]/1.33%64+(b%4==0?n:0)%20+(b%32==16?n:0)%44
