/*! { author: "MT2023", name: "some type of fm square with stimmer", url: "https://dollchan.net/btb/res/500.html#1983", date: "2023-08-20", sampleRate: 32000, mode: "Floatbeat", remix: "stimmer" } */
t/=4,fm=(code,decayspeed)=>sin(2*.1**(t*decayspeed%2048/2048)**sin(code))*128,(fm(t*PI/256*(4|t>>13&3)*[1,2][(t>>11)%2],1)+fm(t*PI/128*(t>>11&t>>13)*(~t>>9&3),1))/256-.5
