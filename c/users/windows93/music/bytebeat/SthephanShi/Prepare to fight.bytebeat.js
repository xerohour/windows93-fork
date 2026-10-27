/*! { author: "SthephanShi", name: "Prepare to fight", description : "Long period, sound is changing from low to high.", date: "2017-11-26" } */
2*t*(t&16384?6:5)*(4-(3&t>>8))>>(3&-t>>15)|t>>(t&4096?3:4)
