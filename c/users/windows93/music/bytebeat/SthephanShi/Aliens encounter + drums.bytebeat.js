/*! { author: "SthephanShi", name: "Aliens encounter + drums", description : "Replacing 3&t>>9 with 3&t>>2 in \"Aliens encounter\" gives a noise sound. This is an excellent instrument for drums, we use it in a ternary 3&t>>(t&4096?2:9)", date: "2017-11-26" } */
t*(t&16384?6:5)*(4-(1&t>>8))>>(3&t>>(t&4096?2:9))|t>>(t&4096?3:4)
