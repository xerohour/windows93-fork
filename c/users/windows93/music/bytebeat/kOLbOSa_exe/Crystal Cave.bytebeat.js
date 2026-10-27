/*! { author: "kOLbOSa_exe", name: "Crystal Cave", url: "https://www.reddit.com/r/bytebeat/comments/154me2z/crystal_cave/", date: "2023-07-20" } */
a = (t) => (cbrt(cos(t/(((t>>10&3)^(t>>13&6)|(t>>12&7))+2)))*(32-(t>>6)&31))+32,
(a(t)/1.5+a(t-3000)/2+a(t-6000)/3)*cbrt(sin(t/8000))+100
