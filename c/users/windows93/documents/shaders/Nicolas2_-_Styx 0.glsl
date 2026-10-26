// https://www.shadertoy.com/view/Xljyz3

float random (in vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners porcentages
    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}

float fbm(in vec2 p){
    float result = noise(p*vec2(1.0,1.0));
	result += 0.5*noise(p*vec2(3.0,2.0));
    result += 0.25*noise(p*vec2(-8.0,8.0));
     result += 0.25*noise(p*vec2(12.0,12.0));
    
    return result;
}


 float pattern( in vec2 p )
  {
      vec2 q = vec2( fbm( p + vec2(iTime/10.0,0.0) ),
                     fbm( p + vec2(iMouse.x/iResolution.x*5.2,iMouse.x/iResolution.x*5.2) ) );

      vec2 r = vec2( fbm( p + 4.0*q + vec2(iMouse.x/iResolution.x*5.2,iMouse.x/iResolution.x*5.2) ),
                     fbm( p + 4.0*q + vec2(8.3,2.8) ) );

      return fbm( p + 1.0*r );
  }



    




void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
   
    float p=pattern(fragCoord.xy/100.0);
	fragColor = vec4(p,0,pow(p,2.2)/3.0,0);
 
}
