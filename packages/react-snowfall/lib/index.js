var L = Object.defineProperty;
var _ = (a, t, e) => t in a ? L(a, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[t] = e;
var h = (a, t, e) => (_(a, typeof t != "symbol" ? t + "" : t, e), e), I = (a, t, e) => {
  if (!t.has(a))
    throw TypeError("Cannot " + e);
};
var O = (a, t, e) => (I(a, t, "read from private field"), e ? e.call(a) : t.get(a)), x = (a, t, e) => {
  if (t.has(a))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(a) : t.set(a, e);
}, y = (a, t, e, s) => (I(a, t, "write to private field"), s ? s.call(a, e) : t.set(a, e), e);
import { ref as F, onMounted as q, onUnmounted as E, computed as N, watch as P, defineComponent as W, toRef as A, openBlock as B, createElementBlock as H, unref as b, normalizeStyle as Z } from "vue";
function G(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var J = function a(t, e) {
  if (t === e)
    return !0;
  if (t && e && typeof t == "object" && typeof e == "object") {
    if (t.constructor !== e.constructor)
      return !1;
    var s, n, o;
    if (Array.isArray(t)) {
      if (s = t.length, s != e.length)
        return !1;
      for (n = s; n-- !== 0; )
        if (!a(t[n], e[n]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === e.source && t.flags === e.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === e.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === e.toString();
    if (o = Object.keys(t), s = o.length, s !== Object.keys(e).length)
      return !1;
    for (n = s; n-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(e, o[n]))
        return !1;
    for (n = s; n-- !== 0; ) {
      var c = o[n];
      if (!a(t[c], e[c]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
};
const R = /* @__PURE__ */ G(J);
function r(a, t) {
  return !Number.isInteger(a) || !Number.isInteger(t) ? Math.random() * (t - a) + a : Math.floor(Math.random() * (t - a + 1) + a);
}
function S(a, t, e) {
  return (1 - e) * a + e * t;
}
function K(a) {
  const t = Math.floor(Math.random() * a.length);
  return a[t];
}
function X(a) {
  return a ? {
    height: a.offsetHeight,
    width: a.offsetWidth
  } : { height: 0, width: 0 };
}
const Y = Math.PI * 2, p = {
  color: "#dee4fd",
  radius: [0.5, 3],
  speed: [1, 3],
  wind: [-0.5, 2],
  changeFrequency: 200,
  rotationSpeed: [-1, 1],
  opacity: [1, 1],
  enable3DRotation: !1
}, u = class u {
  constructor(t, e = {}) {
    h(this, "config");
    h(this, "params");
    h(this, "framesSinceLastUpdate");
    h(this, "image");
    this.updateConfig(e);
    const { radius: s, wind: n, speed: o, rotationSpeed: c, opacity: i, enable3DRotation: f } = this.config;
    this.params = {
      x: r(0, t.offsetWidth),
      y: r(-t.offsetHeight, 0),
      rotation: r(0, 360),
      radius: r(...s),
      speed: r(...o),
      wind: r(...n),
      rotationSpeed: r(...c),
      nextSpeed: r(...o),
      nextWind: r(...n),
      nextRotationSpeed: r(...c),
      opacity: r(...i),
      hasNextOpacity: !1,
      // Initialize 3D rotation parameters
      rotationX: f ? r(0, 360) : 0,
      rotationY: f ? r(0, 360) : 0,
      rotationSpeedX: f ? r(-2, 2) : 0,
      rotationSpeedY: f ? r(-2, 2) : 0,
      nextRotationSpeedX: f ? r(-2, 2) : 0,
      nextRotationSpeedY: f ? r(-2, 2) : 0
    }, this.framesSinceLastUpdate = 0;
  }
  /**
   * A utility function to create a collection of snowflakes
   * @param canvas The canvas element
   * @param amount The number of snowflakes
   * @param config The configuration for each snowflake
   */
  static createSnowflakes(t, e, s) {
    if (!t)
      return [];
    const n = [];
    for (let o = 0; o < e; o++)
      n.push(new u(t, s));
    return n;
  }
  selectImage() {
    this.config.images && this.config.images.length > 0 ? this.image = K(this.config.images) : this.image = void 0;
  }
  updateConfig(t) {
    const e = this.config;
    this.config = { ...p, ...t }, this.config.changeFrequency = r(this.config.changeFrequency, this.config.changeFrequency * 1.5), this.params && !R(this.config.radius, e == null ? void 0 : e.radius) && (this.params.radius = r(...this.config.radius)), R(this.config.images, e == null ? void 0 : e.images) || this.selectImage(), e != null && e.opacity && !R(this.config.opacity, e == null ? void 0 : e.opacity) && (this.params.hasNextOpacity = !0);
  }
  updateTargetParams() {
    this.params.nextSpeed = r(...this.config.speed), this.params.nextWind = r(...this.config.wind), this.image && (this.params.nextRotationSpeed = r(...this.config.rotationSpeed)), this.config.enable3DRotation && (this.params.nextRotationSpeedX = r(-2, 2), this.params.nextRotationSpeedY = r(-2, 2));
  }
  update(t, e, s = 1) {
    const { x: n, y: o, rotation: c, rotationSpeed: i, nextRotationSpeed: f, wind: d, speed: w, nextWind: v, nextSpeed: k, radius: l } = this.params;
    this.params.x = (n + d * s) % (t + l * 2), this.params.x > t + l && (this.params.x = -l), this.params.y = (o + w * s) % (e + l * 2), this.params.y > e + l && (this.params.hasNextOpacity && (this.params.opacity = r(...this.config.opacity), this.params.hasNextOpacity = !1), this.params.y = -l), (this.image || this.config.enable3DRotation) && (this.params.rotation = (c + i) % 360), this.config.enable3DRotation && (this.params.rotationX = (this.params.rotationX + this.params.rotationSpeedX * s) % 360, this.params.rotationY = (this.params.rotationY + this.params.rotationSpeedY * s) % 360), this.params.speed = S(w, k, 0.01), this.params.wind = S(d, v, 0.01), this.params.rotationSpeed = S(i, f, 0.01), this.config.enable3DRotation && (this.params.rotationSpeedX = S(this.params.rotationSpeedX, this.params.nextRotationSpeedX, 0.01), this.params.rotationSpeedY = S(this.params.rotationSpeedY, this.params.nextRotationSpeedY, 0.01)), this.framesSinceLastUpdate++ > this.config.changeFrequency && (this.updateTargetParams(), this.framesSinceLastUpdate = 0);
  }
  getImageOffscreenCanvas(t, e) {
    var n;
    if (t instanceof HTMLImageElement && t.loading)
      return t;
    let s = u.offscreenCanvases.get(t);
    if (s || (s = {}, u.offscreenCanvases.set(t, s)), !(e in s)) {
      const o = document.createElement("canvas");
      o.width = e, o.height = e, (n = o.getContext("2d")) == null || n.drawImage(t, 0, 0, e, e), s[e] = o;
    }
    return s[e] ?? t;
  }
  /**
   * Applies 3D rotation transform to the canvas context.
   * This method calculates and applies the transformation matrix for 3D rotation effects.
   *
   * @param ctx The canvas context to apply the transform to
   * @param x The x position to translate to
   * @param y The y position to translate to
   */
  apply3DTransform(t, e, s) {
    if (this.config.enable3DRotation) {
      const { rotationX: n, rotationY: o } = this.params, c = this.params.rotation || 0, i = n * Math.PI / 180, f = o * Math.PI / 180, d = c * Math.PI / 180, w = Math.cos(i), v = Math.sin(i), k = Math.cos(f), l = Math.sin(f), C = Math.cos(d), M = Math.sin(d), T = C * k, j = C * l * v - M * w, U = C * l * w + M * v, z = M * k;
      t.setTransform(T, j, U, z, e, s);
    } else {
      const o = (this.params.rotation || 0) * Math.PI / 180, c = Math.cos(o), i = Math.sin(o);
      t.setTransform(c, i, -i, c, e, s);
    }
  }
  /**
   * Draws a circular snowflake to the canvas.
   *
   * This method should only be called if our config does not have images.
   *
   * This method assumes that a path has already been started on the canvas.
   * `ctx.beginPath()` should be called before calling this method.
   *
   * After calling this method, the fillStyle should be set to the snowflake's
   * color and `ctx.fill()` should be called to fill the snowflake.
   *
   * Calling `ctx.fill()` after multiple snowflakes have had `drawCircle` called
   * will render all of the snowflakes since the last call to `ctx.beginPath()`.
   *
   * @param ctx The canvas context to draw to
   */
  drawCircle(t) {
    t.moveTo(this.params.x, this.params.y), t.arc(this.params.x, this.params.y, this.params.radius, 0, Y);
  }
  /**
   * Draws a circular snowflake with 3D rotation effect to the canvas.
   *
   * This method is used when 3D rotation is enabled and images are not being used.
   *
   * @param ctx The canvas context to draw to
   * @param color The color to fill the circle with
   */
  drawCircle3D(t, e) {
    const { x: s, y: n, radius: o } = this.params;
    t.save(), this.config.enable3DRotation ? this.apply3DTransform(t, s, n) : t.translate(s, n), t.beginPath(), t.arc(0, 0, o, 0, Y), t.fillStyle = e, t.fill(), t.restore();
  }
  /**
   * Draws an image-based snowflake to the canvas.
   *
   * This method should only be called if our config has images.
   *
   * @param ctx The canvas context to draw to
   */
  drawImage(t) {
    const { x: e, y: s, radius: n } = this.params;
    t.save(), this.params.opacity !== 1 && (t.globalAlpha = this.params.opacity), this.apply3DTransform(t, e, s);
    const o = this.getImageOffscreenCanvas(this.image, n);
    t.drawImage(o, -(n / 2), -(n / 2), n, n), t.restore();
  }
};
h(u, "offscreenCanvases", /* @__PURE__ */ new WeakMap());
let D = u;
const Q = {
  pointerEvents: "none",
  backgroundColor: "transparent",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%"
}, $ = 1e3 / 60;
var m, g;
class V {
  constructor(t, e) {
    h(this, "lastUpdate", Date.now());
    h(this, "snowflakes", []);
    h(this, "config");
    x(this, m, void 0);
    x(this, g, void 0);
    h(this, "animationFrame");
    y(this, g, t), y(this, m, t.getContext("2d")), this.config = { snowflakeCount: 150, ...p, ...e }, this.snowflakes = [], this.snowflakes = D.createSnowflakes(t, e.snowflakeCount || 150, e), this.play();
  }
  get ctx() {
    return O(this, m);
  }
  get canvas() {
    return O(this, g);
  }
  set canvas(t) {
    y(this, g, t), y(this, m, t.getContext("2d"));
  }
  /**
   * Updates the config used for the snowfall animation, if the number of snowflakes
   * has changed then this will create new or remove existing snowflakes gracefully
   * to retain the position of as many existing snowflakes as possible.
   */
  updateConfig(t) {
    this.config = { ...this.config, ...t };
    const e = this.config.snowflakeCount - this.snowflakes.length;
    e > 0 && (this.snowflakes = [...this.snowflakes, ...D.createSnowflakes(this.canvas, e, t)]), e < 0 && (this.snowflakes = this.snowflakes.slice(0, this.config.snowflakeCount));
    for (const s of this.snowflakes)
      s.updateConfig(this.config);
  }
  /**
   * Updates the location of each snowflake based on the number of frames passed then
   * clears the canvas and draws each snowflake.
   */
  render(t = 1) {
    const { ctx: e, canvas: s, snowflakes: n } = this;
    if (!e || !s)
      return;
    const { offsetWidth: o, offsetHeight: c } = s;
    for (const i of n)
      i.update(o, c, t);
    if (e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, o, c), this.config.images && this.config.images.length > 0) {
      for (const i of n)
        i.drawImage(e);
      return;
    }
    if (this.config.enable3DRotation)
      for (const i of n)
        i.drawCircle3D(e, this.config.color);
    else {
      e.beginPath();
      for (const i of n)
        i.drawCircle(e);
      e.fillStyle = this.config.color, e.fill();
    }
  }
  /**
   * The animation loop, will calculate the time since the last render and update
   * the position of the snowflakes appropriately before queueing another frame.
   */
  loop() {
    const t = Date.now(), e = Date.now() - this.lastUpdate;
    this.lastUpdate = t;
    const s = e / $;
    this.render(s), this.animationFrame = requestAnimationFrame(() => this.loop());
  }
  /** Start the animation playing. */
  play() {
    this.loop();
  }
  /** Pause the animation. */
  pause() {
    this.animationFrame && (cancelAnimationFrame(this.animationFrame), this.animationFrame = void 0);
  }
}
m = new WeakMap(), g = new WeakMap();
function tt(a) {
  const t = F(X(a.value)), e = () => {
    a.value && (t.value = X(a.value));
  };
  let s = null;
  return q(() => {
    a.value && (e(), typeof ResizeObserver == "function" ? (s = new ResizeObserver(e), s.observe(a.value)) : window.addEventListener("resize", e));
  }), E(() => {
    s ? s.disconnect() : window.removeEventListener("resize", e);
  }), t;
}
function et(a) {
  return N(() => ({
    ...Q,
    ...a.value || {}
  }));
}
function at(a) {
  const t = F(a());
  return P(
    a,
    (e) => {
      R(e, t.value) || (t.value = e);
    },
    { deep: !0 }
  ), t;
}
const st = ["height", "width"], it = /* @__PURE__ */ W({
  __name: "Snowfall",
  props: {
    color: { default: () => p.color },
    radius: { default: () => p.radius },
    speed: { default: () => p.speed },
    wind: { default: () => p.wind },
    changeFrequency: { default: () => p.changeFrequency },
    snowflakeCount: { default: 150 },
    images: { default: void 0 },
    rotationSpeed: { default: () => p.rotationSpeed },
    opacity: { default: () => p.opacity },
    enable3DRotation: { type: Boolean, default: !1 },
    style: { default: void 0 }
  },
  setup(a) {
    const t = a, e = A(t, "style"), s = et(e), n = F(null), o = tt(n), c = at(() => ({
      color: t.color,
      changeFrequency: t.changeFrequency,
      radius: t.radius,
      speed: t.speed,
      wind: t.wind,
      rotationSpeed: t.rotationSpeed,
      images: t.images,
      snowflakeCount: t.snowflakeCount,
      opacity: t.opacity,
      enable3DRotation: t.enable3DRotation
    }));
    let i;
    return q(() => {
      n.value && (i = new V(n.value, c.value));
    }), E(() => {
      i == null || i.pause(), i = void 0;
    }), P(
      c,
      (f) => {
        i && i.updateConfig(f);
      },
      { deep: !0 }
    ), (f, d) => (B(), H("canvas", {
      ref_key: "canvasRef",
      ref: n,
      height: b(o).height,
      width: b(o).width,
      style: Z(b(s)),
      "data-testid": "SnowfallCanvas"
    }, null, 12, st));
  }
});
export {
  it as Snowfall,
  V as SnowfallCanvas,
  it as default
};
