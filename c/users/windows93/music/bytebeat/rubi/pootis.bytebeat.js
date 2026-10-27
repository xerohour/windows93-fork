/*! { author: "rubi", name: "pootis", url: "https://www.reddit.com/r/bytebeat/comments/s1gjav/pootis_44100hz/", date: "2022-01-11", sampleRate: 44100 } */
(([2,0,3,0,2,0,2.5,0,3,0,2,0,1.8,0,3,3][(t>>12)%16]*t>>2&127)+(t>>8)&128)+([0,1][(t>>13)%2]*t>>2&127)+(128*sin(4095/(t%pow(4,(3+(3+(1)))))))
