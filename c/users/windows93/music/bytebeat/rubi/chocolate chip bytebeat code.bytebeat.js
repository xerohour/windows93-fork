/*! { author: "rubi", name: "chocolate chip bytebeat code", url: "https://www.reddit.com/r/bytebeat/comments/s69l6o/chocolate_chip_bytebeat_code/", date: "2022-01-17", sampleRate: 44100 } */
t/=4.7,[sin(t>>3),2,sin(t>>1),3][(t>>11)%4]*t|[2,1,0.5,0.1,2,1,0.5,PI][(t>>12)%8]*t>>4
