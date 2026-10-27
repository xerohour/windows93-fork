/*! { author: "May_I_Change_My_Name", name: "Butterfly Funcbeat", description : "A proof of concept for an arbitrary-voice waveform generator topology. The idea is to construct generating functors that play single notes and put them in a list of active generators; when a generator finishes playing its note, it can return undefined, whereupon it will be deleted from the list.", url: "https://www.reddit.com/r/bytebeat/comments/1awlv56/butterfly_funcbeat/", date: "2024-02-21", sampleRate: 40000, mode: "Funcbeat", cover: "[Chopin - Etude Op. 25 No. 9 (Butterfly)](https://youtu.be/WZYHvEF84NQ)" } */
A=Array();
class Square {
	constructor(pitch) {this.t = 0; this.p = 2**(pitch/12)*1.24;};
	render() {
		let s = (this.t*this.p/2&128)/96-.75;
		++this.t;
		if (this.t == 32768) return undefined;
		return s*.9999**this.t;
	};
};
class Tri {
	constructor(pitch) {this.t = 0; this.p = 2**(pitch/12)*1.24;};
	render() {
		let s = asin(sin(this.t*this.p*PI/256))*2/PI;
		++this.t;
		if (this.t == 32768) return undefined;
		return s*.9998**this.t;
	};
};
class Sine {
	constructor(pitch) {this.t = 0; this.p = 2**(pitch/12)*1.24;};
	render() {
		let s = sin(this.t*this.p*PI/256)/2;
		++this.t;
		if (this.t == 32768) return undefined;
		return s*.9999**this.t;
	};
};
Tacet = (ticks)=>Array(ticks);
Voices = [{
	gen: Square,
	notes: [
		[11],,[18,23],,[10],,[13,18,25],,
		[8],,[11,15,20],,[6],,[10,15,22],,
		[4],,[11,16],,[3],,[6,11,18],,
		[5],,[11,13,20],,[6],,[16,18,22],,
		[11],,[15,23],,[10],,[13,18,25],,
		[8],,[11,15,20],,[6],,[10,15,22],,
		[4],,[11,16],,[3],,[6,11,18],,
		[5,11,20],,[6,16,22],,[11,15],,[-1],,
	]
},{
	gen: Tri,
	notes: [
		[27],[35,39],[28,40],[29,41],[30],[37,42],[32,44],[30,42],
		[23],[32,35],[25,37],[26,38],[27],[34,39],[28,40],[27,39],
		[20],[28,32],[21,33],[22,34],[23],[30,35],[22,34],[23,35],
		[25],[32,37],[27,39],[25,37],[25],[34,37],[27,39],[28,40],
		[35,39],[27],[28,40],[29,41],[30],[37,42],[32,44],[30,42],
		[32,35],[23],[25,37],[26,38],[27],[34,39],[28,40],[27,39],
		[28,32],[20],[21,33],[22,34],[23],[30,35],[22,34],[23,35],
		[25],[35,37],[27,34,39],[25,37],[23],[30,35],,
	]
},{
	gen: Sine,
	notes: [
		...Tacet(32),



		[39,51],,[40,52],[41,53],[42,54],,,,
		[35,47],,[37,49],[38,50],[39,51],,,,
		[32,44],,[33,45],[34,46],[35,47],,,,
		[37,49],,[39,51],[37,49],[35,47],,[47,51,54,59],,
	]
}];
Player=(t, sr)=>{
	t *= sr*0.8;
	t |= 0;
	if (t%4096==0) {
		for (voice of Voices)
			if (voice.notes[t/4096])
				for (note of voice.notes[t/4096])
					A.push(new voice.gen(note));
	}
	let out = 0;
	for (let i=0; i < A.length; ++i) {
		let result = A[i].render();
		if (result !== undefined)
			out += result;
		else
			A.splice(i, 1);
	}
	return out/8;
};
return Player;
