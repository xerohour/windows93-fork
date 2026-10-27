/*! { author: "rubi", name: "remix of sthephanshi's thing", url: "https://www.reddit.com/r/bytebeat/comments/14k9ofu/remix_of_sthephanshis_thing/", date: "2023-06-27", sampleRate: 32768, remix: "SthephanShi/Arabic beat #2" } */
t>>=2,((4e4/(t&2**11-1)*'11000100'[7&t>>11]&128)+(t*sin(t>>1)*'0000100101001001'[15&t>>10]&-t>>3&127)+(random()*(1&-t>>10)*50)+(t%((t&-16|t>>11)&42)<<2&-t>>4))/1.5
