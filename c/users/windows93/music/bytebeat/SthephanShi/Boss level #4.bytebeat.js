/*! { author: "SthephanShi", name: "Boss level #4", description : "Complicated rhythm with ternary operator |t>>(t&4096?3:4)", date: "2017-11-26" } */
t*(t&16384?7:5)*(4-(1&t>>8))>>(3&t>>8)|t>>(t&4096?3:4)
