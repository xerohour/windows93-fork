/*! { author: "Zackx", name: "DJ harmony", url: "https://dollchan.net/btb/res/204.html#498", date: "2023-03-02", sampleRate: 10000, remix: "miiro/Sierpinski harmony" } */
(8*t&t>>8|1.3333*t&t>>6|6*t&t>>9)%256/3+sin(16*cbrt(t%4096))*32+32+
(t/1.5%64)*1.5*(t%4096/4e3)*(1&-t>>9)
