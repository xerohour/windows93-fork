/*! { author: "MT2023", name: "my ears are on fire", url: "https://dollchan.net/btb/res/500.html#2054", date: "2023-08-25", sampleRate: 44100, mode: "Floatbeat" } */
rev=x=>(t?0:a=Array(r=2e4).fill(0),b=x+a[t%r],a[t%r]=b/2,b),rev(sin(sin(t*PI/128*[1,1,2,3][(t>>17)%4])*9)+sin(80*cbrt(t&1048511/2))*8+sin(t))/16
