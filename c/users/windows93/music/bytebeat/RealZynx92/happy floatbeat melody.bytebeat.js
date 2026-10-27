/*! { author: "RealZynx92", name: "happy floatbeat melody", url: "https://www.reddit.com/r/bytebeat/comments/rtkgtn/happy_floatbeat_melody/", date: "2022-01-01", sampleRate: 32000, mode: "Floatbeat" } */
a=t*[1,1,1,1,1.5,1.5,1.33,1.33][t>>15&7],b=t*[1,1.33][t>>14&1],sin(t*"6868686834343434"[t>>13&15]/41)/8+(b*4%256/256)/4+atan(tan(a/41)+cos(a/100))/[4,8,16,32][t>>13&3]
