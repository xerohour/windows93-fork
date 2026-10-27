/*! { author: "D3nschøt", name: "cool Dubstep thing", url: "https://www.reddit.com/r/bytebeat/comments/1dpghuo/idk/", date: "2024-06-27", sampleRate: 44100, mode: "Signed Bytebeat", remix: "Gabriel Miceli/Crude Sinewave Dubstep" } */
root=(a,b)=>a**(1/b),a=t/64%256,

x=t*(0x9876>>(t>>17&3)*4&15)/6,
sin((root(a+1,8)*64-1)*PI)*42+(x/(x&t>>12)&255)/3-42+sin(((x*(0x1424>>(t>>12&3)*4&15)/4))/128*PI)*42
