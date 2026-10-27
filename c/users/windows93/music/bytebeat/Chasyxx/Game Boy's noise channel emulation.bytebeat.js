/*! { author: "Chasyxx", name: "Game Boy's noise channel emulation", url: "https://www.reddit.com/r/bytebeat/comments/11ifny8/i_made_something_based_off_of_the_game_boys_noise/", date: "2023-03-10" } */
t<1?(this.LFSR=65535):0,

this.noise??= function(t,o=2,w=0) {


	//if (t<2) {console.error("start")}

	processLFSR = function(width=0) {
		S=width?100000100000000:100000000000000
		trade =(a,b)=>(LFSR[a] = LFSR[b])
		temp= LFSR&1^((LFSR&2)>>1)
		LFSR>>=1,
		LFSR = (temp ? (LFSR|S) : (LFSR&~S))
	}

	if ((t%(1<<(o)))==0) {
	processLFSR(w)
	//console.log(LFSR)
	v=LFSR&1
	}
	return v*128

},

noise(t,3,0)
