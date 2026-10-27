/*! { author: "PortablePorcelain", name: "super creepy tornado sound effect with EAS included", url: "https://www.reddit.com/r/bytebeat/comments/u56wj4/eas_standard_tone_getting_hit_by_a_tornado_noise/", date: "2022-04-16", sampleRate: 44100 } */
SAMP=44100,
hz=t/SAMP*256,
freq1=853,
freq2=960,
d=sin(hz*Math.PI/128*freq1)*32+sin(hz*Math.PI/128*freq2)*32+64,
t<2?(a=0,b=0,c=0):(a=0.99*a+(.003+t/131072000)*random(),b<0?(b=.5*random(),c=random()):b-=1/440,abs(256*a*(5*sin(t/5E4)+10)%256-128)+255*(t/300*(10*c+200)&1)*b**(random()/5+10-(t/131072)))+d
