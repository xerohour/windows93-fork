/*! { author: "ANoUserXD", name: "Tansin", url: "https://battleofthebits.com/arena/Entry/Tansin/62947/", date: "2023-11-11", sampleRate: 44100, mode: "Floatbeat" } */
t/=44100,T=2*PI*t,n=4*(x=2**([0,2,-2,4,-5,-3,-1,1][t/4&7]/12))/(1+(t*8&3)),sin(sin(T*n*500)+atan(tan(T*n*75)))/4+(tanh(tan(T*x*100))+tanh(tan(T*x*101))+tanh(tan(T*x*125))+tanh(tan(T*x*150)))/6
