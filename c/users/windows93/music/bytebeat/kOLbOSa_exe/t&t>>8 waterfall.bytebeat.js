/*! { author: "kOLbOSa_exe", name: "t&t>>8 waterfall", description : "Waterfall in error console.", url: "https://www.reddit.com/r/bytebeat/comments/18mozx3/tt8_waterfall/", date: "2023-12-20", remix: "viznut/minimal sierpinski harmony" } */
n='\n',a();function a(){
nt = t|0;
for(i=0;i<1024;i++)
{t = nt+i;
n+=String.fromCharCode(65+((t&t>>8)&255));
if(i%64==63){n+='\n'}}
if(t%64==63){throw n;}
return t&t>>8;}
