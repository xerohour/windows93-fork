/*! { author: "rubi", name: "Vegal *A N G E R Y*", url: "https://www.reddit.com/r/bytebeat/comments/sgjf3j/vegal_a_n_g_e_r_y/", date: "2022-01-30", sampleRate: 12288 } */
((t*[1,1.2,1.5,1.5][(t>>15)%4]>>1)%63)+((t*[1,1.2,1.5,1.5][(t>>15)%4]>>1)%64)+(32*random()*(1-(1&t>>10)))+(t*[sin(t>>4),sin(t>>1)][(t>>13)%2]&-t>>7&63)
