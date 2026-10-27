/*! { author: "Zackx", name: "some rave", url: "https://dollchan.net/btb/res/204.html#1451", date: "2023-07-01", sampleRate: 50000 } */
(t/4%256*(t&4096?0:1)*(t%32768/32768))/2+sin(2E4/(t%32768+1024)**.8)*48+48+((t*sin(t>>2)&64)*(-t>>7&255)>>8)*(t&32768?1:0)
