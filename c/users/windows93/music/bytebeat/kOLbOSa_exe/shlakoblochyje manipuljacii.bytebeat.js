/*! { author: "kOLbOSa_exe", name: "shlakoblochyje manipuljacii", url: "https://www.reddit.com/r/bytebeat/comments/18mpkm1/shlakoblochyje_manipuljacii/", date: "2023-12-20", sampleRate: 20000, mode: "Floatbeat" } */
m=[8,8,5,6][(t>>15)%4]/12,
(sin(-(0.1*m*t%3))/3+sin(-(0.05*m*t%3))/3+sin(-(0.075*m*t%3)))*(~t>>9&31)/31+1-sin(t*m*0.2%3)*(~t>>[7,6,7,6,7,7,6,5][(t>>14)%8]&31)/64
