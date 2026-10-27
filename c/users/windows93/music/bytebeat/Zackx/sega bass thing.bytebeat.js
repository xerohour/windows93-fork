/*! { author: "Zackx", name: "sega bass thing", url: ["https://dollchan.net/btb/res/204.html#1800","https://www.reddit.com/r/bytebeat/comments/15hwc8y/songs_was_publish_here_i_made_in_private_server/"], date: "2023-07-21", sampleRate: 48000, mode: "Floatbeat" } */
e=256,r=40,d=32,
p=t*2**(parseInt('0CC0CC57'[7&t>>13],36)/12)/2.43,
sin(
sin(
sin(
p*PI/16)/76*(r-(t/e)%d)+
p*PI/256)/8*(r-(t/e)%d)+
p*PI/256)*(r-(t/e)%d)/64
