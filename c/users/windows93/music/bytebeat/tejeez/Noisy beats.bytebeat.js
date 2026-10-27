/*! { author: "tejeez", name: "Noisy beats", url: ["https://youtu.be/GtQdIYUtAHg?t=175","http://viznut.fi/demos/unix/bytebeat_formulas.txt"], date: "2011-09-18" } */
((-t&4095)*(255&t*(t&(t>>13)))>>12)+(127&t*(234&t>>8&t>>3)>>(3&t>>14))
