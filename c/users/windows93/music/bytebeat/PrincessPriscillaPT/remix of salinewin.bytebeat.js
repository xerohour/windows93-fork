/*! { author: "PrincessPriscillaPT", name: "remix of salinewin", url: "https://www.reddit.com/r/bytebeat/comments/1hga4vc/made_a_remix_of_salinewin_ver_of_neurofunk_and/", date: "2024-12-17", sampleRate: 35500, mode: "Signed Bytebeat", remix: "SthephanShi/Neurofunk" } */
t/=4,
min(max((((t*2**(round(log2(((t&4096?t%65536<59392?7:t&7:16)^(1&t>>14)))*12)/12)>>(3&-t>>(t&2048?2:10))&t>>4&255)-(t>>5)%128)+tanh(sin(18*sqrt(t%4096)**.6))*168*(1-t%4096/4096)**3+((t*sin(t/.33>>1)&64)*2*(1&t>>12)*(1-t%4096/4096)**2)),-128),127)
