/*! { author: "WoolWL", name: "Bytebreak", url: "https://www.reddit.com/r/bytebeat/comments/1atswzl/bytebreak/?rdt=37311&onetap_auto=true", date: "2024-02-18", sampleRate: 44100 } */
((t&32767)>>13==2|(t&65535)>>12==9?(t^-(t/8&t>>5)*(t/8&127))&(-(t>>5)&255)*((t&65535)>>12==9?2:1):(t&8191)%((t>>5&255^240)==0?1:t>>5&255^240))/4*3+(t*4/(4+(t>>15&3))&128)*(-t>>11&2)*((t&32767)>>13!=2)/3
