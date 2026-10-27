/*! { author: "Chasyxx", name: "cave_7", description : "Mysterious echoes in minor key.", url: "https://dollchan.net/btb/res/756.html#1762", date: "2023-07-30", sampleRate: 31000, remix: "BaenHoHoHo/echo_testing" } */
f=4,t/=f,r=(x,y,z)=>(t||(a=Array(n=4096*f).fill(y)),c=x%256+a[(t*f)%n],a[(t*f)%n]=c*z,c),
c=((t*5)/(4+(t>>15)%16)*(1+(3&t>>13))>>(1&t>>12)&16)*8,
d=r(c*1.00009**(-t%16384)%256/4,64,.8)*1.5,e=isNaN(d)?e:d
