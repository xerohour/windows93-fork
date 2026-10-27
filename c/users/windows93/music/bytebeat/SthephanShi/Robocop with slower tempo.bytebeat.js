/*! { author: "SthephanShi", name: "Robocop with slower tempo", remix: "SthephanShi/Robocop" } */
(t>>2)*(t&(t&32768?16:24)|t>>(t>>8&24))|t>>3
