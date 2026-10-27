/*! { author: "MarioFan171", name: "Sine Mosaic Pattern", description : "Set \"Diagram\" mode and zoom to 2(-7).", url: "https://www.reddit.com/r/bytebeat/comments/1mpynn0/sine_mosaic_pattern/", date: "2025-08-14", sampleRate: 16000, mode: "Floatbeat" } */
a=(x=128)=>abs(sin(t*PI/x)),(a()*a(126)*a(126.5)*a(127.5)*a(127)*a(128.5)*a(129)*a(129.5)*a(130))*32-1
