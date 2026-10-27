/*! { author: "SthephanShi", name: "Another level", description : "Adding a noise beat by using ternary operator.", url: "https://dollchan.net/de/res/706.html#707", date: "2019-01-12" } */
t*(t&16384?6:5)*(1+(3&t>>(t&2048?4:10)))>>(3&t>>8)|t>>2
