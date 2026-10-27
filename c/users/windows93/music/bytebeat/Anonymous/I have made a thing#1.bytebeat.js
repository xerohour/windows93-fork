/*! { author: "Anonymous", name: "I have made a thing#1", url: "https://dollchan.net/btb/res/3.html#78", date: "2022-06-19", remix: "Jay-Arnett-97104/Sine Music v2" } */
x=6.28318530718*4*t/44100,
a=1200-(1200>>((t>>16)%2)),
b=400+(400>>((t>>14)%4)),
c=200+(400>>((t>>10)%4)),
d=200+(200>>((t>>12)%4)),
(sin(x*a)+sin(x*b)+sin(x*c)+sin(x*d)+4)*30
