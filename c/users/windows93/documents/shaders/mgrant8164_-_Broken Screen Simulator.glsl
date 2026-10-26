// https://www.shadertoy.com/view/MdXyzs
vec3 vp = vec3(3.);
vec3 vpdir = vec3(-3.);


vec4 getc(float z) {
    float dpc = max(min(z,1.),-1.)/2.+0.5;
    //return vec4(dpc,1.-dpc,0.,1.);
    return vec4(vec3(1.-dpc-.3),1.);
}

float getdz(vec2 inp) {
    float x = inp.x;
    float y = inp.y;
    return -cos(y-x)-sin(x+y);
}

float getz(vec2 inp) {
    float x = inp.x;
    float y = inp.y;
    return -sin(y-x)+cos(x+y);
    //return -4.*sin(y*y-x)+cos(x+y);
}

float gettdz(float t, vec2 dir) {
    return vpdir.z-getdz(dir.xy * t);
}

float gettz(float t, vec2 dir) {
    return vpdir.z*t+vp.z-getz(dir.xy * t);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    
	vec2 uv = 0.03* (fragCoord.xy - (iResolution.xy*.5));// - 0.5;
    
    float t = 0.;
    float cz = vp.z;
    //float roty = normalize(vpdir.z);
    //vec2 origin = vp-vec3(0.,uv.x,uv.y);
    
    vpdir = vec3(0.)-vp-vec3(normalize(vpdir.xy)*uv.x,uv.y);
    
    vec2 dir = normalize(vpdir.xy + uv + iTime/100.);
    
    //calculate zero using newton's method
    float pv = 0., cv = 0.;
    //x_(n + 1) = x_n - (x_n cos(x_n))/(cos(x_n) - x_n sin(x_n))
    for(int i = 0; i < 20; i++) {
        pv = cv;
        cv = cv - gettz(cv,dir)/gettdz(cv,dir);
        //if((abs(pv-cv)>0.01) break;
    }
    
    
	//fragColor = vec4(uv,0.5+0.5*sin(iTime),1.0);
    float z = getz(dir*pv);//.05*
    fragColor = getc(0.5*z);
}
