// https://a2aaron.github.io/BROKEN_FIELD/

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec3 color = vec3(0.0,1.0,0.0);
  float wrap_value = 256.0;

  // int t = int(iTime * 14.66);
  int t = iFrame;

  vec2 uv = fragCoord;

  int sx = int(uv.x);
  int sy = int(uv.y);

  int value = (sx ^ sy) + t;

  value = value % int(wrap_value);
  value = value < 0 ? value + int(wrap_value) : value;
  float value_out = float(value) / (wrap_value - 1.0);
  fragColor = vec4(value_out * color, 1.0);
}
