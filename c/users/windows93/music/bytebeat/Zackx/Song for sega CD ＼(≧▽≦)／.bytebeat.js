/*! { author: "Zackx", name: "Song for sega CD ＼(≧▽≦)／", url: "https://dollchan.net/btb/res/204.html#397", date: "2023-02-11", sampleRate: 22050, remix: "Zackx/Square & sawtooth the video game C chords" } */
e=[0,2,4,7,12,7,4,2][7&t>>11]+12,
p=t*1.01*2**(([1,3,5,5,1,3,6,6][7&t>>15]+e)/12),
v=((p&128)+(p/.996&128))/2,v2=(p%256+p%172+p%128+p%86*2)/6,
v*(-t&2047)/2e3+v2
