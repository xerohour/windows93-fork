/*! { author: "D3nschøt", name: "the pulse but as the song", url: "https://youtu.be/hp0RUcEe3qA?si=0CyKCEnXCkFit12N", date: "2024-02-19", sampleRate: 44100 } */
Bpm = 160,
Hz = 44100,
tf = abs((((t/Hz/180*3)*256*128)*Bpm)),
pitch = ([1,2,3,4,4.5,4.75,6,8][(abs(tf)>>14)%8]),
pitch2 = ([4,4.5,4.75,(5+(1/3))][(abs(tf)>>18)%4]/8),
speed = 2,
x = abs(floor(((t*pitch%256)/((tf*(speed/4)%(256**2))|(tf*(speed/4)/32^tf*(speed/4)/64)%(256**2)))*(256**2)/256%2)*255),
(abs(-x*128%256)+(abs(t*pitch2%256))/2)
