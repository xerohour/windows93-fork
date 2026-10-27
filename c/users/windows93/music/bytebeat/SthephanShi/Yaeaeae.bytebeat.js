/*! { author: "SthephanShi", name: "Yaeaeae", url: "https://www.reddit.com/r/bytebeat/comments/11nq8yn/voice_generator/", date: "2023-03-10", sampleRate: 32000, mode: "Floatbeat", remix: "SthephanShi/Voice generator" } */
t/=32E3,T=2*PI*t,n=160,.7*sin((3.6*(2*abs(1-n*t%2)-1)+1.5*sin(64*n*T))*(1+2.3*sin(1+.4*T+sin(1.1*T)))+T)
