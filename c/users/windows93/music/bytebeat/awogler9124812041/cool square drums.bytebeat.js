/*! { author: "awogler9124812041", name: "cool square drums", url: "https://www.reddit.com/r/bytebeat/comments/127mivm/cool_square_drums/", date: "2023-03-31", sampleRate: 44100 } */
(cbrt(((t>>9)%128>114?t&4095:t&8191))*256|(t>>13&1?t*64:0))&128
