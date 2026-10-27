/*! { author: "SthephanShi", name: "3D sphere animation 1/16 light", url: "https://www.reddit.com/r/bytebeat/comments/18yl6an/3d_sphere_animation/", date: "2024-01-05", sampleRate: 48000, mode: "Floatbeat", remix: "SthephanShi/3D sphere animation 1/16" } */
T=(t-2048)%8192,k=PI*t/262144,y=1-T%16/8,x=(T>>5)/64-1,max(x*sin(3*k)+y*sin(2*k)+sqrt(1-x**2-y**2)-1,-1)+.6||-.2
