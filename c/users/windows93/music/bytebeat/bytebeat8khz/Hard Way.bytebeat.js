/*! { author: "bytebeat8khz", name: "Hard Way", url: "https://www.reddit.com/r/bytebeat/comments/1563pem/hard_way/", date: "2023-07-22", sampleRate: 22050 } */
t*2**((t>>15&7^1|t>>14&3^2)/12)*(1+(t>>11&3))|t>>((t>>15&3)==2?6:t>>15&3?4:5)
