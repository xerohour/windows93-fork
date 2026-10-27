/*! { author: "SthephanShi", name: "Voice generator", description : "Low talking robot.", url: "https://www.reddit.com/r/bytebeat/comments/11nq8yn/voice_generator/", date: "2023-03-10", sampleRate: 32000, mode: "Floatbeat", remix: "justaboutdead/YAY!" } */
t/=32E3,T=2*PI*t,n=160,.7*sin((3.6*(2*abs(1-n*t%2)-1)+1.5*sin(64*n*T))*(1+sin(.42*T))*(1+sin(1.13*T+7*sin(.7*T)))+T)
