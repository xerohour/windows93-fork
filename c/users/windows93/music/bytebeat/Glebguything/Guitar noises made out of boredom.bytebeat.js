/*! { author: "Glebguything", name: "Guitar noises made out of boredom", url: "https://www.reddit.com/r/bytebeat/comments/1b87yho/guitar_noises_made_out_of_boredom/", date: "2024-03-06", sampleRate: 44100, mode: "Floatbeat" } */
THK=[1,2,1,2,0.8,1.8,0.6,0.4],sin(t/16*THK[(t>>14)%8]+sin(t*[(t>>17)%8]/16*THK[(t>>14)%8])%256*(-t/2&2047)/2E3)%256*(-t/8&2047)/2E3+sin(t/128/8)
