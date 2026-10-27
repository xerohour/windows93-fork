/*! { author: "rubi", name: "snaerasrakd", url: "https://www.reddit.com/r/bytebeat/comments/saf49d/snaerasrakd/", date: "2022-01-23", sampleRate: 44100 } */
t/=5.5,+[1.5,sin(t>>1),1.5,sin(t>>1),2,sin(t>>1),1.8,sin(t>>1),][(t>>12)%8]*t&-t>>4|128*random()*(1-(1&t>>9))|4e4/(t&4095)
