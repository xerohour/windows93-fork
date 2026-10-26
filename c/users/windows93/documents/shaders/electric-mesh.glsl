/* "Electric Mesh" by @kishimisu (2023) - https://www.shadertoy.com/view/dtl3Ds

    199 chars => 197 chars by @GregRostami */

void mainImage(out vec4 O, vec2 u) {
    u = abs(u+u-(O.xy=iResolution.xy))/O.y; O *= 0.;

    for (float i = 0., t = iTime*.5; i < 46.; O += .002/
        abs(abs(u.x-sin(t+i*.17)*.7)+u.y-sin(t+i*.1)*.6)
        *(cos(i+++vec4(0,1,2,0))+1.2)) {};
}
