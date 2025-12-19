import { g as f, s as y, i as S, d as o, S as h } from "./vanilla-B1bQheks.js";
import { ref as u, onMounted as p, onUnmounted as v, computed as g, watch as w, defineComponent as m, toRef as z, openBlock as _, createElementBlock as C, unref as l, normalizeStyle as b } from "vue";
function k(t) {
  const e = u(f(t.value)), n = () => {
    t.value && (e.value = f(t.value));
  };
  let s = null;
  return p(() => {
    t.value && (n(), typeof ResizeObserver == "function" ? (s = new ResizeObserver(n), s.observe(t.value)) : window.addEventListener("resize", n));
  }), v(() => {
    s ? s.disconnect() : window.removeEventListener("resize", n);
  }), e;
}
function q(t) {
  return g(() => ({
    ...y,
    ...t.value || {}
  }));
}
function R(t) {
  const e = u(t());
  return w(
    t,
    (n) => {
      S(n, e.value) || (e.value = n);
    },
    { deep: !0 }
  ), e;
}
const B = ["height", "width"], O = /* @__PURE__ */ m({
  __name: "Snowfall",
  props: {
    color: { default: () => o.color },
    radius: { default: () => o.radius },
    speed: { default: () => o.speed },
    wind: { default: () => o.wind },
    changeFrequency: { default: () => o.changeFrequency },
    snowflakeCount: { default: 150 },
    images: { default: void 0 },
    rotationSpeed: { default: () => o.rotationSpeed },
    opacity: { default: () => o.opacity },
    enable3DRotation: { type: Boolean, default: !1 },
    style: { default: void 0 }
  },
  setup(t) {
    const e = t, n = z(e, "style"), s = q(n), i = u(null), r = k(i), d = R(() => ({
      color: e.color,
      changeFrequency: e.changeFrequency,
      radius: e.radius,
      speed: e.speed,
      wind: e.wind,
      rotationSpeed: e.rotationSpeed,
      images: e.images,
      snowflakeCount: e.snowflakeCount,
      opacity: e.opacity,
      enable3DRotation: e.enable3DRotation
    }));
    let a;
    return p(() => {
      i.value && (a = new h(i.value, d.value));
    }), v(() => {
      a == null || a.pause(), a = void 0;
    }), w(
      d,
      (c) => {
        a && a.updateConfig(c);
      },
      { deep: !0 }
    ), (c, D) => (_(), C("canvas", {
      ref_key: "canvasRef",
      ref: i,
      height: l(r).height,
      width: l(r).width,
      style: b(l(s)),
      "data-testid": "SnowfallCanvas"
    }, null, 12, B));
  }
});
export {
  O as Snowfall,
  h as SnowfallCanvas,
  O as default
};
