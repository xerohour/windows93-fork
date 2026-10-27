/*! { author: "emelchenko", name: "customizable beat", description : "Change the plus and minuses to get different patterns.", url: "https://www.reddit.com/r/bytebeat/comments/1h69y07/customizable_beat/", date: "2024-12-04", sampleRate: 48000 } */
a='+ -  +- ++-+ +- ',b=a[(t>>13)%a.length],(b=='+'?cbrt(t&8191)*2&1:b=='-'?round(random()):0)*128
