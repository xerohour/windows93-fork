/*! { author: "Chasyxx", name: "Cave_8", description : "Good for some horror game. Reminds the \"Government Funding\" cover for Backrooms.", url: "https://dollchan.net/btb/res/756.html#2528", date: "2023-10-23", sampleRate: 29000, remix: "Chasyxx/cave_7" } */
t||(rvA=[]),rvI=0,
$A=t==0,
rv=(X,L,dry=0.5,wet=0.5,dry2=0,T=t,Q=false)=>(
    (t&&!(rvA[rvI]==undefined))||(
        rvA.push(Array(L).fill(0))
    ),
    //(()=>{throw rv})()
    OUTPUT1=rvA[rvI][Q?int(T%L):t%L]=
        rvA[rvI][Q?t%L:int(T%L)]*wet+
        (X&255)*dry,
    Q?OUTPUT1+X*dry2:rvA[rvI][t%L]+X*dry2
),R=t*10/(4+(t>>17)%16)*(1+(3&t>>15))>>(1&t>>14)&128,rv(R*1.00003**-(t&16383),16384,0.2,0.8,0.0,t/1.004,true)*2
