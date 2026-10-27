/*! { author: "SthephanShi", name: "Boss level #2", description : "Another pattern using the ternary operator. The rhythm is slowed down to |t>>4", date: "2017-11-26" } */
t*(t&16384?7:5)*(1+(1&t>>12))>>(3&t>>8)|t>>4
