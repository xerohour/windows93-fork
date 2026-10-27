/*! { author: "hcdphobe", name: "PWM ECHO", url: "https://dollchan.net/btb/res/163.html#2910", date: "2024-01-13", sampleRate: 32000, remix: "Greaserpirate/a limiter (that also removes offsets)" } */
t||(A=Array(n=12287).fill(0)),a=(t*(t&8192?4:t&4096?2:1)*[1,1.2,1.33333333333,1.5,1.6,1.5,1.8,1.5][t>>14&7]&192?0:255)*.99992**(t&16383)/2+96+A[t%n],A[t%n]=a/2
