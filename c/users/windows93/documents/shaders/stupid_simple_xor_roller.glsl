// https://www.shadertoy.com/view/4lffzM

// Chris M. Thomasson's Stupid Simple Xor Roller. ;^)
// version: pre-alpha 0.0.1

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord.xy / iResolution.xy;

    int x = int(fragCoord.x);
    int y = int(fragCoord.y);

    int xy_xor = (x + iFrame) ^ (y);
    float s = .01 + abs(sin(iTime * .01)) * (abs(cos(iTime * sin(iTime * .05) * .001) * .01));

    float cr = mod(float(xy_xor) * 1.1 * s, 1.0);
	float cg = mod(float(xy_xor) * abs(sin(iTime * 0.01)) * 1.234 * s, 1.0);
    float cb = mod(float(xy_xor) * 2.253 * s, 1.0);

    fragColor = vec4(cr, cg, cb, 1.0);
}
