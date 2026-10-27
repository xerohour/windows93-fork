/*! { author: "orion_aboy", name: "sphere", description : "Sphere visualization. Set \"Diagram\" mode and zoom to 2(-8).", url: "https://www.reddit.com/r/bytebeat/comments/17ilipb/sphere/", date: "2023-10-28", mode: "Floatbeat" } */
y=1-((t&255)/128),x=((t>>8)/128)-1,z=sqrt(1-x**2-y**2),z?max((x*0.5+y*0.5+z*0.3)*2-1,-1)+0.5:0
