/*! { author: "lhphr", name: "sine of power", description : "Decided to raise t to the power of a sine function. Ended up sounding somewhat unique.", url: "https://dollchan.net/btb/res/44.html#54", date: "2022-04-24" } */
(t%32768>>4)**sin(t/2/'66546657'[t>>13&7])&t>>4
