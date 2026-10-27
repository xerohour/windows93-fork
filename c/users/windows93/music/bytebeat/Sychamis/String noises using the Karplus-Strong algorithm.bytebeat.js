/*! { author: "Sychamis", name: "String noises using the Karplus-Strong algorithm", url: "https://www.reddit.com/r/bytebeat/comments/1dyjink/string_noises_using_the_karplusstrong_algorithm/", date: "2024-07-08", sampleRate: 48000, mode: "Floatbeat" } */
f=436,t==0?b=Array.from({length:f},()=>random()):(b[t%f]=(b[t%f]+b[(t-1)%f])/2)*2-1
