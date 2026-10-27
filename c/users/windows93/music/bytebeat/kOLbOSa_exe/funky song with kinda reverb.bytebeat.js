/*! { author: "kOLbOSa_exe", name: "funky song with kinda reverb", url: "https://www.reddit.com/r/bytebeat/comments/12aydeh/512_members111/", date: "2023-04-04", mode: "Floatbeat" } */
add=(accumulator, a)=>accumulator/2 + a,t==0?array=Array(1600):0,array.push(sin(t/((t>>13)%8+1))/(t*4%4095)*1000),array.shift(),array.reduce(add,0)
