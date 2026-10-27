/*! { author: "rubi", name: "ARRAY 11025HZ SONG", url: "https://www.reddit.com/r/bytebeat/comments/s1cai7/array_11025hz_song/", date: "2022-01-11", sampleRate: 11025 } */
([1,0,2,0,3,0,2.4,0][(t>>12)%8]*t)+([0,128][(t>>12)%2]*random())|t>>3
