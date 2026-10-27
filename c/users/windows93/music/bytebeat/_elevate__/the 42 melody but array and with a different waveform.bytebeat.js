/*! { author: "_elevate__", name: "the 42 melody but array and with a different waveform", url: "https://www.reddit.com/r/bytebeat/comments/rz5f3l/the_42_melody_but_array_and_with_a_different/", date: "2022-01-08", sampleRate: 44100, remix: "the 42 melody" } */
(sin((t/112.5)*[0,1,0,1,4,5,4,5,0,1,0,1,4,5,4,5,16,17,16,17,20,21,20,21,16,17,16,17,20,21,20,21][t/11025&31])*127)+(sin(t/5000)*100)
