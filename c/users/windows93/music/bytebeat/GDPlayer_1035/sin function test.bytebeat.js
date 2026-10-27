/*! { author: "GDPlayer_1035", name: "sin function test", url: "https://www.reddit.com/r/bytebeat/comments/rhgniv/sin_function_test/", date: "2021-12-16", sampleRate: 44100 } */
delay=32,wv1=[1,2,3,4,5,6,7,8],((sin(t*(wv1[floor(t/delay/32/4)%wv1.length]/20)&t/delay/256)*64)+64)&-t/delay
