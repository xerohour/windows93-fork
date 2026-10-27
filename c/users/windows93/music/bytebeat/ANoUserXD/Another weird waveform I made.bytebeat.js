/*! { author: "ANoUserXD", name: "Another weird waveform I made", url: "https://www.reddit.com/r/bytebeat/comments/14d0cv9/another_weird_waveform_i_made/", date: "2023-06-19", sampleRate: 16000, mode: "Floatbeat" } */
a=t*(t>>14&3|t>>11&7|t>>16&5|t>>14&9)*PI/128,sin(sin(a)+sin(a/1.5)+sin(a/3))/8+expm1(sin(a/2))/8+sinh(sin(a/4))/8+cosh(cos(a))/6+sin(PI-a/2)/8
