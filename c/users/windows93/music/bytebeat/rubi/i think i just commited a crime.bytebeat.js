/*! { author: "rubi", name: "i think i just commited a crime", url: "https://www.reddit.com/r/bytebeat/comments/skiv5q/i_think_i_just_commited_a_crime/", date: "2022-02-04", sampleRate: 32000 } */
(t*[2,1.8,1.5,1,2,3,1.5,1][(t>>14)%8]>>1&95)*4e3/(t&[2047,12287,16383,16383,511,1023,16383,16383][(t>>14)%8])
