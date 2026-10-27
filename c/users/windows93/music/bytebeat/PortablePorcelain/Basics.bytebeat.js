/*! { author: "PortablePorcelain", name: "Basics", url: "https://www.reddit.com/r/bytebeat/comments/1go6lue/basics/", date: "2024-11-10", remix: "viznut/Sin() isn't kosher, people!" } */
((t&3072?(2048+t%4096)%3072/12:0)*((10*(t>>6|t|t>>(t>>16&3))+(7&t>>11))%256)>>8)+(t&3072?0:(((t%256)*(1024-t%1024)/3>>6&128)>>(t>>8&15)))
