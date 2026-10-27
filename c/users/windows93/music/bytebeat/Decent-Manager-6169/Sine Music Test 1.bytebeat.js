/*! { author: "Decent-Manager-6169", name: "Sine Music Test 1", url: "https://www.reddit.com/r/bytebeat/comments/rn8xsl/sine_music_test_1/", date: "2021-12-24", sampleRate: 44100 } */
a=t*"87"[t/1.1>>16&1]/2.75,a=(Math.cos(a/5.13/8)*64+64)/8,
b=t*"87"[t/1.1>>16&1]/2.75/0.8,b=(Math.cos(b/5.13/8)*64+64)/8,
c=(t*Math.random()|t/1.1>>7)&31*[1,0,1,0,0,0,1,1,0,0,1,0,0,0,1,0][t/1.1>>12&15],
d=(t*Math.random()|t/1.1>>9)&31*[0,1][t/1.1>>15&1],
e=t*[0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0][t/1.1>>12&15]*[2.4,2.15,2.4,2.15,2.7,2.15,2.7,2.15][t/1.1>>16&7]/2.75,e=(Math.cos(e/14.8)*64+64)/4,a+b+c+d+e
