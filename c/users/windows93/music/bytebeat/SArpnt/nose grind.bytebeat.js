/*! { author: "SArpnt", name: "nose grind", url: "https://www.reddit.com/r/bytebeat/comments/ggkslh/cant_think_of_a_name_atm_but_new_thing/", date: "2020-05-09", sampleRate: 44100 } */
h=t*[.5,.6,.57,.53][int(t/44e3)%4],((h&h*-2.5+sin(t/1e4)*100)%256*-cos(t/2e7+1.61))-10
