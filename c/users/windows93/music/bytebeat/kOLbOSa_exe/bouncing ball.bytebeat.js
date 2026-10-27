/*! { author: "kOLbOSa_exe", name: "bouncing ball", description : "Like in an Arkanoid game or a TV logo screensaver! Set \"Diagram\" mode and zoom to 1/16 on phones.", url: "https://www.reddit.com/r/bytebeat/comments/18nsqvt/comment/kecqea1/?utm_source=reddit&utm_medium=web2x&context=3", date: "2023-12-21", sampleRate: 32000 } */
xx=16,yy=16,f=q(xx,yy),draw(f),f[(t>>9)%yy][t%xx]/3.7*63;
//---------------------------//
function q(x,y){ // screen init
arr=Array(y);for(i=0;i<y;i++){arr[i]=Array(x)}return arr;
}
function draw(arr){ // drawing routine
t==0?px=2:0; // init once
t==0?py=2:0;
t==0?dpx=-1:0;
t==0?dpy=1:0;
for(y=0;y<yy;y++){for(x=0;x<xx;x++){arr[y][x]=0;}} // clr
if((px==xx-1)|(px==0)){t%8192==8191?dpx*=-1:0}; // if touches edges + on timing
if((py==yy-1)|(py==0)){t%8192==8191?dpy*=-1:0};
t%8192==8191?px+=dpx:0; // on timing
t%8192==8191?py+=dpy:0;
arr[px][py] = 15; // put px at this position
return arr;
}
