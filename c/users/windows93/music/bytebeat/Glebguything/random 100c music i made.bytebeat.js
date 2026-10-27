/*! { author: "Glebguything", name: "random 100c music i made", url: "https://www.reddit.com/r/bytebeat/comments/11mq8e4/comment/jbk5fv8/?utm_source=reddit&utm_medium=web2x&context=3", date: "2023-03-09", sampleRate: 32000 } */
t/=4,(t*(t/64|t>>5|t>>6|t>>7|t>>8|t))%256/4+50+sin(4e3/(t%4096))*50+(random ()*75&-t>>5)*[0,1][(t>>12)%2]
