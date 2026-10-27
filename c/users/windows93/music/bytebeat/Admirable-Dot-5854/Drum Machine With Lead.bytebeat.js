/*! { author: "Admirable-Dot-5854", name: "Drum Machine With Lead", url: "https://www.reddit.com/r/bytebeat/comments/1fklmk4/drum_machine_with_lead/", date: "2024-09-19", sampleRate: 16000 } */
(((t/2048)&3)?(((6*t&t>>6)-((5+2*(1&-t>>15))*t&t>>5))&255)/2+(random()*80*!(t/256&7)):(4e6/(t%8192)**1.1&128)+(random()*500*!(t/1024+8&15)))
