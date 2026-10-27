/*! { author: "PortablePorcelain", name: "Polyrhythm thing", url: "https://www.reddit.com/r/bytebeat/comments/1b5fbju/polyrhythm_thing/", date: "2024-03-03" } */
[...Array(2+(t>>15&7)).keys()].map(i=>z+=(t*i<<2|(t*i>>4)%1024%(-t*i>>12&3?192:256)|t*i>>3)%256/++i/3,z=0),z
