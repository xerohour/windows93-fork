/*! { author: "hcdphobe", name: "Telephone busy signal", url: ["https://www.reddit.com/r/bytebeat/comments/1gzj7x0/telephone_busy_signal/","https://dollchan.net/btb/res/163.html#5059"], date: "2024-11-25", sampleRate: 48000, mode: "Floatbeat" } */
t/=48e3,(sin(620*t*PI*2)+cos(480*t*PI*2))*min(.3,max(0,tan(sin(t*2*PI)))*40)
