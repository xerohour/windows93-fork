/*! { author: "Zackx", name: "Adding beat", url: "https://dollchan.net/btb/res/204.html#262", date: "2022-11-27", sampleRate: 32000, remix: "Zackx/hard life" } */
bass=[1,1.12,.75,.67,.594,.67,.75,.89][7&t/32000]*1.32,
z=[1,1.12,1.5,1.78,1,1.12,.75,.669][7&t/32000]*1.32,(z*t%256+z*-t%257+bass*t%512+bass*-t%514)/12+((beat=t=>sin(cbrt(t/80)*30)*63+128),beat(t%16000))
