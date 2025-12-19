var j = Object.defineProperty;
var q = (s, t, a) => t in s ? j(s, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : s[t] = a;
var c = (s, t, a) => (q(s, typeof t != "symbol" ? t + "" : t, a), a), I = (s, t, a) => {
  if (!t.has(s))
    throw TypeError("Cannot " + a);
};
var R = (s, t, a) => (I(s, t, "read from private field"), a ? a.call(s) : t.get(s)), x = (s, t, a) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, a);
}, w = (s, t, a, e) => (I(s, t, "write to private field"), e ? e.call(s, a) : t.set(s, a), a);
function E(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var U = function s(t, a) {
  if (t === a)
    return !0;
  if (t && a && typeof t == "object" && typeof a == "object") {
    if (t.constructor !== a.constructor)
      return !1;
    var e, i, o;
    if (Array.isArray(t)) {
      if (e = t.length, e != a.length)
        return !1;
      for (i = e; i-- !== 0; )
        if (!s(t[i], a[i]))
          return !1;
      return !0;
    }
    if (t.constructor === RegExp)
      return t.source === a.source && t.flags === a.flags;
    if (t.valueOf !== Object.prototype.valueOf)
      return t.valueOf() === a.valueOf();
    if (t.toString !== Object.prototype.toString)
      return t.toString() === a.toString();
    if (o = Object.keys(t), e = o.length, e !== Object.keys(a).length)
      return !1;
    for (i = e; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(a, o[i]))
        return !1;
    for (i = e; i-- !== 0; ) {
      var f = o[i];
      if (!s(t[f], a[f]))
        return !1;
    }
    return !0;
  }
  return t !== t && a !== a;
};
const O = /* @__PURE__ */ E(U);
function n(s, t) {
  return !Number.isInteger(s) || !Number.isInteger(t) ? Math.random() * (t - s) + s : Math.floor(Math.random() * (t - s + 1) + s);
}
function y(s, t, a) {
  return (1 - a) * s + a * t;
}
function N(s) {
  const t = Math.floor(Math.random() * s.length);
  return s[t];
}
function L(s) {
  return s ? {
    height: s.offsetHeight,
    width: s.offsetWidth
  } : { height: 0, width: 0 };
}
const v = Math.PI * 2, X = {
  color: "#dee4fd",
  radius: [0.5, 3],
  speed: [1, 3],
  wind: [-0.5, 2],
  changeFrequency: 200,
  rotationSpeed: [-1, 1],
  opacity: [1, 1],
  enable3DRotation: !1
}, l = class l {
  constructor(t, a = {}) {
    c(this, "config");
    c(this, "params");
    c(this, "framesSinceLastUpdate");
    c(this, "image");
    this.updateConfig(a);
    const { radius: e, wind: i, speed: o, rotationSpeed: f, opacity: r, enable3DRotation: h } = this.config;
    this.params = {
      x: n(0, t.offsetWidth),
      y: n(-t.offsetHeight, 0),
      rotation: n(0, 360),
      radius: n(...e),
      speed: n(...o),
      wind: n(...i),
      rotationSpeed: n(...f),
      nextSpeed: n(...o),
      nextWind: n(...i),
      nextRotationSpeed: n(...f),
      opacity: n(...r),
      hasNextOpacity: !1,
      // Initialize 3D rotation parameters
      rotationX: h ? n(0, 360) : 0,
      rotationY: h ? n(0, 360) : 0,
      rotationSpeedX: h ? n(-2, 2) : 0,
      rotationSpeedY: h ? n(-2, 2) : 0,
      nextRotationSpeedX: h ? n(-2, 2) : 0,
      nextRotationSpeedY: h ? n(-2, 2) : 0
    }, this.framesSinceLastUpdate = 0;
  }
  /**
   * A utility function to create a collection of snowflakes
   * @param canvas The canvas element
   * @param amount The number of snowflakes
   * @param config The configuration for each snowflake
   */
  static createSnowflakes(t, a, e) {
    if (!t)
      return [];
    const i = [];
    for (let o = 0; o < a; o++)
      i.push(new l(t, e));
    return i;
  }
  selectImage() {
    this.config.images && this.config.images.length > 0 ? this.image = N(this.config.images) : this.image = void 0;
  }
  updateConfig(t) {
    const a = this.config;
    this.config = { ...X, ...t }, this.config.changeFrequency = n(this.config.changeFrequency, this.config.changeFrequency * 1.5), this.params && !O(this.config.radius, a == null ? void 0 : a.radius) && (this.params.radius = n(...this.config.radius)), O(this.config.images, a == null ? void 0 : a.images) || this.selectImage(), a != null && a.opacity && !O(this.config.opacity, a == null ? void 0 : a.opacity) && (this.params.hasNextOpacity = !0);
  }
  updateTargetParams() {
    this.params.nextSpeed = n(...this.config.speed), this.params.nextWind = n(...this.config.wind), this.image && (this.params.nextRotationSpeed = n(...this.config.rotationSpeed)), this.config.enable3DRotation && (this.params.nextRotationSpeedX = n(-2, 2), this.params.nextRotationSpeedY = n(-2, 2));
  }
  update(t, a, e = 1) {
    const { x: i, y: o, rotation: f, rotationSpeed: r, nextRotationSpeed: h, wind: g, speed: u, nextWind: S, nextSpeed: k, radius: p } = this.params;
    this.params.x = (i + g * e) % (t + p * 2), this.params.x > t + p && (this.params.x = -p), this.params.y = (o + u * e) % (a + p * 2), this.params.y > a + p && (this.params.hasNextOpacity && (this.params.opacity = n(...this.config.opacity), this.params.hasNextOpacity = !1), this.params.y = -p), (this.image || this.config.enable3DRotation) && (this.params.rotation = (f + r) % 360), this.config.enable3DRotation && (this.params.rotationX = (this.params.rotationX + this.params.rotationSpeedX * e) % 360, this.params.rotationY = (this.params.rotationY + this.params.rotationSpeedY * e) % 360), this.params.speed = y(u, k, 0.01), this.params.wind = y(g, S, 0.01), this.params.rotationSpeed = y(r, h, 0.01), this.config.enable3DRotation && (this.params.rotationSpeedX = y(this.params.rotationSpeedX, this.params.nextRotationSpeedX, 0.01), this.params.rotationSpeedY = y(this.params.rotationSpeedY, this.params.nextRotationSpeedY, 0.01)), this.framesSinceLastUpdate++ > this.config.changeFrequency && (this.updateTargetParams(), this.framesSinceLastUpdate = 0);
  }
  getImageOffscreenCanvas(t, a) {
    var i;
    if (t instanceof HTMLImageElement && t.loading)
      return t;
    let e = l.offscreenCanvases.get(t);
    if (e || (e = {}, l.offscreenCanvases.set(t, e)), !(a in e)) {
      const o = document.createElement("canvas");
      o.width = a, o.height = a, (i = o.getContext("2d")) == null || i.drawImage(t, 0, 0, a, a), e[a] = o;
    }
    return e[a] ?? t;
  }
  /**
   * Applies 3D rotation transform to the canvas context.
   * This method calculates and applies the transformation matrix for 3D rotation effects.
   *
   * @param ctx The canvas context to apply the transform to
   * @param x The x position to translate to
   * @param y The y position to translate to
   */
  apply3DTransform(t, a, e) {
    if (this.config.enable3DRotation) {
      const { rotationX: i, rotationY: o } = this.params, f = this.params.rotation || 0, r = i * Math.PI / 180, h = o * Math.PI / 180, g = f * Math.PI / 180, u = Math.cos(r), S = Math.sin(r), k = Math.cos(h), p = Math.sin(h), M = Math.cos(g), D = Math.sin(g), Y = M * k, b = M * p * S - D * u, P = M * p * u + D * S, T = D * k;
      t.setTransform(Y, b, P, T, a, e);
    } else {
      const o = (this.params.rotation || 0) * Math.PI / 180, f = Math.cos(o), r = Math.sin(o);
      t.setTransform(f, r, -r, f, a, e);
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
    t.moveTo(this.params.x, this.params.y), t.arc(this.params.x, this.params.y, this.params.radius, 0, v);
  }
  /**
   * Draws a circular snowflake with 3D rotation effect to the canvas.
   *
   * This method is used when 3D rotation is enabled and images are not being used.
   *
   * @param ctx The canvas context to draw to
   * @param color The color to fill the circle with
   */
  drawCircle3D(t, a) {
    const { x: e, y: i, radius: o } = this.params;
    t.save(), this.config.enable3DRotation ? this.apply3DTransform(t, e, i) : t.translate(e, i), t.beginPath(), t.arc(0, 0, o, 0, v), t.fillStyle = a, t.fill(), t.restore();
  }
  /**
   * Draws an image-based snowflake to the canvas.
   *
   * This method should only be called if our config has images.
   *
   * @param ctx The canvas context to draw to
   */
  drawImage(t) {
    const { x: a, y: e, radius: i } = this.params;
    t.save(), this.params.opacity !== 1 && (t.globalAlpha = this.params.opacity), this.apply3DTransform(t, a, e);
    const o = this.getImageOffscreenCanvas(this.image, i);
    t.drawImage(o, -(i / 2), -(i / 2), i, i), t.restore();
  }
};
c(l, "offscreenCanvases", /* @__PURE__ */ new WeakMap());
let C = l;
const F = C, H = {
  pointerEvents: "none",
  backgroundColor: "transparent",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%"
}, W = 1e3 / 60;
var d, m;
class Z {
  constructor(t, a) {
    c(this, "lastUpdate", Date.now());
    c(this, "snowflakes", []);
    c(this, "config");
    x(this, d, void 0);
    x(this, m, void 0);
    c(this, "animationFrame");
    w(this, m, t), w(this, d, t.getContext("2d")), this.config = { snowflakeCount: 150, ...X, ...a }, this.snowflakes = [], this.snowflakes = F.createSnowflakes(t, a.snowflakeCount || 150, a), this.play();
  }
  get ctx() {
    return R(this, d);
  }
  get canvas() {
    return R(this, m);
  }
  set canvas(t) {
    w(this, m, t), w(this, d, t.getContext("2d"));
  }
  /**
   * Updates the config used for the snowfall animation, if the number of snowflakes
   * has changed then this will create new or remove existing snowflakes gracefully
   * to retain the position of as many existing snowflakes as possible.
   */
  updateConfig(t) {
    this.config = { ...this.config, ...t };
    const a = this.config.snowflakeCount - this.snowflakes.length;
    a > 0 && (this.snowflakes = [...this.snowflakes, ...F.createSnowflakes(this.canvas, a, t)]), a < 0 && (this.snowflakes = this.snowflakes.slice(0, this.config.snowflakeCount));
    for (const e of this.snowflakes)
      e.updateConfig(this.config);
  }
  /**
   * Updates the location of each snowflake based on the number of frames passed then
   * clears the canvas and draws each snowflake.
   */
  render(t = 1) {
    const { ctx: a, canvas: e, snowflakes: i } = this;
    if (!a || !e)
      return;
    const { offsetWidth: o, offsetHeight: f } = e;
    for (const r of i)
      r.update(o, f, t);
    if (a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, o, f), this.config.images && this.config.images.length > 0) {
      for (const r of i)
        r.drawImage(a);
      return;
    }
    if (this.config.enable3DRotation)
      for (const r of i)
        r.drawCircle3D(a, this.config.color);
    else {
      a.beginPath();
      for (const r of i)
        r.drawCircle(a);
      a.fillStyle = this.config.color, a.fill();
    }
  }
  /**
   * The animation loop, will calculate the time since the last render and update
   * the position of the snowflakes appropriately before queueing another frame.
   */
  loop() {
    const t = Date.now(), a = Date.now() - this.lastUpdate;
    this.lastUpdate = t;
    const e = a / W;
    this.render(e), this.animationFrame = requestAnimationFrame(() => this.loop());
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
d = new WeakMap(), m = new WeakMap();
export {
  Z as S,
  F as a,
  X as d,
  L as g,
  O as i,
  H as s,
  W as t
};
