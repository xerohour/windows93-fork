/*! { author: "SthephanShi", name: "3D sphere animation 1/32", url: "https://www.reddit.com/r/bytebeat/comments/18yl6an/3d_sphere_animation/", date: "2024-01-05", sampleRate: 48000, mode: "Floatbeat", remix: "SthephanShi/3D sphere animation 1/16" } */
T=(t-4096)%16384,k=PI*t/262144,y=1-T%32/16,x=(T>>6)/64-1,x*sin(2*k)+y*cos(k)+1.8*sqrt(1-x**2-y**2)-.8||-.8
