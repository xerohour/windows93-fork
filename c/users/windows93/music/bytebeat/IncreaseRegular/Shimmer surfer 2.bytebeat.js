/*! { author: "IncreaseRegular", name: "Shimmer surfer 2", url: "https://www.reddit.com/r/bytebeat/comments/155b6mj/shimmer_surfer_2/", date: "2023-07-21", remix: "IncreaseRegular/Shimmer Surfer" } */
a=(0.25*t*[1,2][t>>11&1])*'4567'[t>>13&3]&64,b=6*t*(t>>11&t>>13)%256*(-t&2047)/4E3,c=(t*[2,random(),4,random()][t>>12&3]&128)%256*(-t&4095/'21'[t>>12&1])/[2000,4000][t>>12&1],a+b+c
