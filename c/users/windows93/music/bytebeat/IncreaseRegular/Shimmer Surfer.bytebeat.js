/*! { author: "IncreaseRegular", name: "Shimmer Surfer", url: "https://www.reddit.com/r/bytebeat/comments/153h95z/shimmer_surfer/", date: "2023-07-19", mode: "Signed Bytebeat", remix: ["stimmer","skurk, raer/Street Surfer"] } */
a=(0.5*t*(4|t>>13&3)>>(~t>>11&1)|~t>>5)&127,b=0.5*(t*(t>>11&t>>13)*(~t>>9&3)&127)&127+128,c=((t&4096?(t*(t^t%255)|t>>5)>>1:t>>4|(t&8192?t<<1:t))&127)+64,a+b+c
