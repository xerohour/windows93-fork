/*! { author: "Zackx", name: "DJ running man#3", url: "https://dollchan.net/btb/res/204.html#442", date: "2023-02-21", sampleRate: 32000, remix: "viznut/Another attempt at melody construction" } */
t/=4,b=t*'11182413'[7&t>>12],
((t*(3+(1^t>>10&5))*(5+(3&t>>14))>>(t>>10&3))%256/2*(-t>>2&255)>>8)+
sin(cbrt(b%4096)*13)*48+48+(32*random()*(-t&4095)/4e3)*(t&4096)/2400
