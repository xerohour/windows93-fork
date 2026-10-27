/*! { author: "May_I_Change_My_Name", name: "Arbitrary Waveform Sierpinski", description : "A simple function that can synthesize Sierpinski harmonies out of any waveforms you like.", url: "https://www.reddit.com/r/bytebeat/comments/1f610e1/arbitrary_waveform_sierpinski/", date: "2024-09-01", sampleRate: 32000, mode: "Floatbeat" } */
T=t=>asin(sin(t*PI/128))*1.7/PI,
Q=t=>(t&128)/128-.5,
S=t=>sin(t*PI/128)*.68,
W=t=>(t&255)/256-.5,

V=[Q,T,W,S][t>>16&3],
G=(t,m)=>{
	let out = 0;
	for (let i=0; i<8; ++i)
		if (m>>(7-i)&1)
			out += V(t*(1<<i))/(1<<i);
	return out;
},

G(t,t>>8)
