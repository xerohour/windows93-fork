/*! { author: "emelchenko", name: "ultra hard beat", url: "https://www.reddit.com/r/bytebeat/comments/1hgavuq/ultra_hard_beat/", date: "2024-12-17", sampleRate: 32768, mode: "Floatbeat" } */
sin(cbrt(t&16383)*8)*64*max(0,.5-t/16384%1)+tan(t/((t&t>>12)+1))
