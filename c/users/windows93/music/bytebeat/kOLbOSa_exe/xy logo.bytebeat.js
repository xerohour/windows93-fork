/*! { author: "kOLbOSa_exe", name: "xy logo", description : "Set \"Diagram\" mode and zoom to 1/8 or 1/16.", url: ["https://dollchan.net/btb/res/27.html#2309","https://www.reddit.com/r/bytebeat/comments/16kkngq/c_i_r_c_l_e/"], date: "2023-09-17", sampleRate: 63200 } */
this.ybuffer ??= Array(16+1),
this.xbuffer ??= Array(32+1),

clear(),



placepixel(2,2,100), // x
placepixel(3,3,200),
placepixel(4,4,255),
placepixel(2,6,255),
placepixel(3,5,255),
placepixel(6,2,255),
placepixel(5,3,255),
placepixel(5,5,200),
placepixel(6,6,100),

placepixel(6,8,110), // y
placepixel(6,9,200),
placepixel(6,10,255),
placepixel(6,11,255),
placepixel(5,12,255),
placepixel(3,12,200),
placepixel(2,12,200),
placepixel(4,11,255),
placepixel(4,10,255),
placepixel(4,9,255),
placepixel(3,8,200),
placepixel(2,8,100),


xbuffer[(t>>8)%32];

function clear(){
    for(var k=0;k<32;k++){
        ybuffer[k]=0;
        xbuffer[k]=0;

    }
}

function placepixel(y,x, col){
    var p = col;
    ybuffer[y] = p;
    xbuffer[x] = (t%16==y)?ybuffer[y]:xbuffer[x];
}
