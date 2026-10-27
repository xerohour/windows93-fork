/*! { author: "Bp103", name: "they're getting closer", url: "https://www.reddit.com/r/bytebeat/comments/rtld2d/theyre_getting_closer/", date: "2022-01-01", sampleRate: 44100, mode: "Floatbeat" } */
r=44100,q=t/r,sin(q*(1.3*exp(-2*((q*16)%8))+(9e9*exp(-60*((q*64)%8))))+(((q/2)*r)&((q*8)%r))%tan((q*r)%2))
