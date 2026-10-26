// https://www.shadertoy.com/view/4XsXzM

float hueToRGB(float f1, float f2, float hue) {
	if (hue < 0.0) {
		hue += 1.0;
	} else if (hue > 1.0) {
		hue -= 1.0;
	}

	float res;

	if ((6.0 * hue) < 1.0) {
		res = f1 + (f2 - f1) * 6.0 * hue;
	} else if ((2.0 * hue) < 1.0) {
		res = f2;
	} else if ((3.0 * hue) < 2.0) {
		res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
	} else {
		res = f1;
	}

	return res;
}

vec4 RGBToHSL(vec4 rgb) {
	vec4 hsl;
	hsl.w = rgb.w;

	float fmin = min(min(rgb.r, rgb.g), rgb.b);
	float fmax = max(max(rgb.r, rgb.g), rgb.b);
	float delta = fmax - fmin;

	hsl.z = (fmax + fmin) / 2.0;

	if (delta == 0.0) {
		hsl.x = 0.0;
		hsl.y = 0.0;
	} else {
		if (hsl.z < 0.5) {
			hsl.y = delta / (fmax + fmin);
		} else {
			hsl.y = delta / (2.0 - fmax - fmin);
		}

		float deltaR = (((fmax - rgb.r) / 6.0) + (delta / 2.0)) / delta;
		float deltaG = (((fmax - rgb.g) / 6.0) + (delta / 2.0)) / delta;
		float deltaB = (((fmax - rgb.b) / 6.0) + (delta / 2.0)) / delta;

		if (rgb.r == fmax) {
			hsl.x = deltaB - deltaG;
		} else if (rgb.g == fmax) {
			hsl.x = (1.0 / 3.0) + deltaR - deltaB;
		} else if (rgb.b == fmax) {
			hsl.x = (2.0 / 3.0) + deltaG - deltaR;
		}

		if (hsl.x < 0.0) {
			hsl.x += 1.0;
		} else if (hsl.x > 1.0) {
			hsl.x -= 1.0;
		}
	}

	return hsl;
}

vec4 HSLToRGB(vec4 hsl) {
	vec4 rgb;

	if (hsl.y == 0.0) {
		rgb = vec4(hsl.z);
	} else {
		float f2;

		if (hsl.z < 0.5) {
			f2 = hsl.z * (1.0 + hsl.y);
		} else {
			f2 = (hsl.z + hsl.y) - (hsl.y * hsl.z);
		}

		float f1 = 2.0 * hsl.z - f2;

		rgb.r = hueToRGB(f1, f2, hsl.x + (1.0/3.0));
		rgb.g = hueToRGB(f1, f2, hsl.x);
		rgb.b = hueToRGB(f1, f2, hsl.x - (1.0/3.0));
		rgb.a = hsl.w;
	}

	return rgb;
}

vec4 transformHSL(vec4 hsl, float h, float s, float v) {
	return vec4(fract(hsl.x + h), hsl.y * s, hsl.z * v, hsl.w);
}

const vec4 blue1 = vec4(0.588235294, 0.745098039, 0.929411765, 1.0);
const vec4 blue2 = vec4(0.635294118, 0.8, 1.0, 1.0);

vec4 renderLayer0(in vec2 fragCoord) {
	float x = fragCoord.x;
	float step1 = iResolution.x * 0.50;

	vec4 color1 = HSLToRGB(transformHSL(RGBToHSL(blue1), fract(iTime / 17.0), 1.0, 0.8));
	vec4 color2 = HSLToRGB(transformHSL(RGBToHSL(blue2), fract(iTime / 22.0), 1.0, 0.8));
	vec4 color3 = HSLToRGB(transformHSL(RGBToHSL(blue1), fract(iTime / 12.0), 1.0, 0.8));

	vec4 color = mix(color1, color2, smoothstep(iResolution.x, step1, x));
	return mix(color, color3, smoothstep(step1, 0.0, x));
}

void mainImage( out vec4 oColor, in vec2 fragCoord ) {
	float y = fragCoord.y;
	float step1 = iResolution.y * 0.50;

	vec4 color1 = HSLToRGB(transformHSL(RGBToHSL(blue1), fract(iTime / 10.0), 1.0, 0.8));
	vec4 color2 = HSLToRGB(transformHSL(RGBToHSL(blue2), fract(iTime / 20.0), 1.0, 0.8));
	vec4 color3 = HSLToRGB(transformHSL(RGBToHSL(blue1), fract(iTime / 16.0), 1.0, 0.8));

	vec4 layer1 = mix(color1, color2, smoothstep(iResolution.y, step1, y));
	layer1 = mix(layer1, color3, smoothstep(step1, 0.0, y));

	oColor = mix(renderLayer0(fragCoord), layer1, 0.5);
}
