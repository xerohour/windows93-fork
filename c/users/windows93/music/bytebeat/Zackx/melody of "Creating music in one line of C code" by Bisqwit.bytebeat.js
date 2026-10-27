/*! { author: "Zackx", name: "melody of \"Creating music in one line of C code\" by Bisqwit", url: "https://www.reddit.com/r/bytebeat/comments/12uichk/cover_of_creating_music_in_one_line_of_c_code_on/", date: "2023-04-21", sampleRate: 48000, mode: "Floatbeat", cover: "[Bisqwit - Creating music in one line of C code](https://youtu.be/L9KLnN0GczI)" } */
r=t*1.18,snm=d=>(d&15)*(-d&15)*(((d&16)>>3)-1)/192*(1-r%8192/8e3),p=t/2.82*2**(([0,,12,,0,,12,,10,,9,,7,,9,10,12,,5,,5,,12,10,9,,7,,0,,,,10,,10,9,7,,9,10,12,,5,,5,,5,9,7,,7,-12,0,,-10,-8,5,,0,,-7][63&r>>13])/12),
(snm(p)+snm(p/2))+
random(t**2.5)/3*'1011'[3&r>>13]*(1-r%8192/8e3)
