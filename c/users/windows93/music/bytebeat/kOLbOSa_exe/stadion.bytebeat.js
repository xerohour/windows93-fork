/*! { author: "kOLbOSa_exe", name: "stadion", description : "mu6k's code with reverb.", url: "https://www.reddit.com/r/bytebeat/comments/18it7a4/stadion/", date: "2023-12-15", sampleRate: 16000, mode: "Floatbeat", remix: "mu6k/The detuned sound" } */
t/=2,

q = `
u=10^t>>15&7,u+=3,y=(t>>11&7)/u,f=8*t*y,z=16*t/u&99|f|1.01*f,2*z`,

h=t=>(eval(q)&255),

ce()/256-1;

function ce(){
    let out=h(t)/4;
    for (ij=1;ij<8;ij++){
        out+=h(t-(ij*1025))/(ij*9);
    }
    return out*2;
}
