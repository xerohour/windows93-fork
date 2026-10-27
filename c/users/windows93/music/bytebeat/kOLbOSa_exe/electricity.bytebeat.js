/*! { author: "kOLbOSa_exe", name: "electricity", url: "https://www.reddit.com/r/bytebeat/comments/ufvuio/electricity/", date: "2022-05-01", sampleRate: 32000 } */
((t>>12&3)?((t>>12)%(((t>>16)%6/(3&t>>12))+1)+1)*t&-t>>4:
((t>>1)%(((t>>16)%6/(3&t>>12))+1)+1)*t&t)+5e3/(t/4&4095)
