/*! { author: "Gabriel Miceli", name: "Noise Maker", url: ["https://www.youtube.com/watch?v=V4GfkFbDojc","https://youtu.be/V4GfkFbDojc?t=51"], date: "2016-07-09", sampleRate: 11025, remix: ["Blueberry/Good old fractal melody","skurk, raer/Street Surfer"] } */
i=t&8191,(((t*((t>>9^((t>>9)-1)^1)%13)&255)/2)+((((t>>3|t<<(t>>12&2))*(i<4096)+(t>>4|t*(t^t+t/256))*(i>4095)))&255)/2)*(2+(t>>16))
