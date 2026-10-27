/*! { author: "MT2023", name: "hi", description : "\"Hi\" in \"Points\" mode, zoom to 1/32.", url: ["https://dollchan.net/btb/res/500.html#5035","https://www.reddit.com/r/bytebeat/comments/1gycbi7/hi/"], date: "2024-11-24", sampleRate: 32000 } */
t*=4,[(t/4&255)*[1,0.25,0.25,1][t>>12&3]+[0,96,96,0][t>>12&3],[128,(t/4&255)*[0.5,0.25][t>>2&1]+[0,192][t>>2&1]][t>>13&1],128,128][t>>14&3]/1.25+32
