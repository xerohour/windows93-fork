/*! { author: "Glebguything", name: "cool sine wopping music", url: "https://www.reddit.com/r/bytebeat/comments/105nc8t/cool_sine_wopping_music/", date: "2023-01-07", sampleRate: 32000 } */
sin(t*[1,1.01,1.02,1.03,1.04,1.05,1.06,1.07,1.08,1.09,1.1,1.11,1.12,1.13,1.14][(t>>5)%15]&t>>11)*128+128
