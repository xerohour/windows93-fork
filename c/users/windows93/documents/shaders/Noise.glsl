// @src https://www.shadertoy.com/view/4djSRW
// Copyright (c)2014 David Hoskins. MIT License.

vec3 hash33(vec3 p3)
{
	p3 = fract(p3 * vec3(.1031, .1030, .0973));
    p3 += dot(p3, p3.yxz+33.33);
    return fract((p3.xxy + p3.yxx)*p3.zyx);
}

//----------------------------------------------------------------------------------------
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 position = fragCoord.xy;
    vec2 uv = fragCoord.xy / iResolution.xy;

	vec3 a = vec3(0.0);
    vec3 pos = vec3(position, iTime*.3) + iTime * 500. + 50.0;
    a += hash33(pos);

	fragColor = vec4(a, 1.0);
}
