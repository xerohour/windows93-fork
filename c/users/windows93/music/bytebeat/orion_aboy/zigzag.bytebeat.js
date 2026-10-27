/*! { author: "orion_aboy", name: "zigzag", description : "Set \"Diagram\" mode and zoom to 2(-8).", url: "https://www.reddit.com/r/bytebeat/comments/16m2ia8/zigzag/", date: "2023-09-18", sampleRate: 48000 } */
height=256,

main=(x,y)=>{
  let zigzag = x*2%512;
  zigzag = min(zigzag, 511-zigzag);
  return abs(zigzag-y)<10?255:0;
},

main((t/height)%(height*256*4),255-t*(256/height)%256)
