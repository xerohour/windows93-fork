/*! { author: "PrincessPriscillaPT", description : "Korg M1 - Patch 17 - PercOrgan interpretation", url: "https://www.reddit.com/r/bytebeat/comments/1hb0jjj/show_me_love_doctor_y_melody/", date: "2024-12-10", sampleRate: 48000, mode: "Floatbeat", cover: "[Doctor Y - Show Me Love](https://youtu.be/WUb8PNObii8)" } */
BPM=120,
SampleRate=48000,
tf=abs(t/SampleRate/180*3*32768*BPM),
n=-9e9,
p=-7.2,
l=t*2**(([3,n,n,n,3,3,6,-2,n,n,-2,n,n,-2,n,n,-1,n,n,n,-1,n,n,-1,n,n,-1,n,n,-1,-2,n,n,n][(tf>>13)%32]+p)/12),
x=j=>tanh(sin(l*PI/128+sin(l*PI/64*j))*(1-(tf/8192)%1)**.2/1.5+sin(l*2**(7/12)*PI/128)*(1-(tf/8192)%1)**.2/2.2+sin(l*2**(19/12)*PI/128*j)*(1-(tf/8192)%1)**.2/.7)*.1**(5/(tf%8192)),
[x(1.005),x(.995)]
