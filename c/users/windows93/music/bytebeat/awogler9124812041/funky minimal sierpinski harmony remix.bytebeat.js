/*! { author: "awogler9124812041", name: "funky minimal sierpinski harmony remix", url: "https://www.reddit.com/r/bytebeat/comments/11it6gb/funky_minimal_sierpinski_harmony_remix/", date: "2023-03-05", sampleRate: 44100, remix: "miiro/Sierpinski harmony" } */
sin(random()|512/cbrt(t%16384))*40+40+random()/cbrt(t%8192)*128+(t&t>>11)%256/2+(t&t>>5)/2%256/6+(t>>(t/8))%256/8
