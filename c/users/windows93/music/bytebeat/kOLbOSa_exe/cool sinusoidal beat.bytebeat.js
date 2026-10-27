/*! { author: "kOLbOSa_exe", name: "cool sinusoidal beat", description : "First t/(t&4095) beat code ever.", url: "https://www.reddit.com/r/bytebeat/comments/pzb9mz/cool_sinusoidal_beat_some_parts_bring_from_no/", date: "2021-10-01" } */
wv=function(a,b){return sin(t/a)*b+128},wv((t&4095)+1000,32)
