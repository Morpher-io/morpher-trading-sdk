var ne = Object.create, U = Object.defineProperty, oe = Object.getOwnPropertyDescriptor, J = Object.getOwnPropertyNames, ie = Object.getPrototypeOf, se = Object.prototype.hasOwnProperty, P = (t, e) => function() {
  return e || (0, t[J(t)[0]])((e = { exports: {} }).exports, e), e.exports;
}, ue = (t, e, r, o) => {
  if (e && typeof e == "object" || typeof e == "function") for (var n = J(e), i = 0, u = n.length, s; i < u; i++)
    s = n[i], !se.call(t, s) && s !== r && U(t, s, {
      get: ((a) => e[a]).bind(null, s),
      enumerable: !(o = oe(e, s)) || o.enumerable
    });
  return t;
}, y = (t, e, r) => (r = t != null ? ne(ie(t)) : {}, ue(U(r, "default", {
  value: t,
  enumerable: !0
}), t)), F = P({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(t, e) {
  function r(o) {
    "@babel/helpers - typeof";
    return e.exports = r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
      return typeof n;
    } : function(n) {
      return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
    }, e.exports.__esModule = !0, e.exports.default = e.exports, r(o);
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
} }), ae = P({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(t, e) {
  var r = F().default;
  function o(n, i) {
    if (r(n) != "object" || !n) return n;
    var u = n[Symbol.toPrimitive];
    if (u !== void 0) {
      var s = u.call(n, i || "default");
      if (r(s) != "object") return s;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (i === "string" ? String : Number)(n);
  }
  e.exports = o, e.exports.__esModule = !0, e.exports.default = e.exports;
} }), ce = P({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(t, e) {
  var r = F().default, o = ae();
  function n(i) {
    var u = o(i, "string");
    return r(u) == "symbol" ? u : u + "";
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
} }), g = P({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(t, e) {
  var r = ce();
  function o(n, i, u) {
    return (i = r(i)) in n ? Object.defineProperty(n, i, {
      value: u,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : n[i] = u, n;
  }
  e.exports = o, e.exports.__esModule = !0, e.exports.default = e.exports;
} }), x = P({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(t, e) {
  var r = g();
  function o(i, u) {
    var s = Object.keys(i);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(i);
      u && (a = a.filter(function(c) {
        return Object.getOwnPropertyDescriptor(i, c).enumerable;
      })), s.push.apply(s, a);
    }
    return s;
  }
  function n(i) {
    for (var u = 1; u < arguments.length; u++) {
      var s = arguments[u] != null ? arguments[u] : {};
      u % 2 ? o(Object(s), !0).forEach(function(a) {
        r(i, a, s[a]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(s)) : o(Object(s)).forEach(function(a) {
        Object.defineProperty(i, a, Object.getOwnPropertyDescriptor(s, a));
      });
    }
    return i;
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
} });
function q(t) {
  const e = {
    subscribe(r) {
      let o = null, n = !1, i = !1, u = !1;
      function s() {
        if (o === null) {
          u = !0;
          return;
        }
        i || (i = !0, typeof o == "function" ? o() : o && o.unsubscribe());
      }
      return o = t({
        next(a) {
          var c;
          n || (c = r.next) === null || c === void 0 || c.call(r, a);
        },
        error(a) {
          var c;
          n || (n = !0, (c = r.error) === null || c === void 0 || c.call(r, a), s());
        },
        complete() {
          var a;
          n || (n = !0, (a = r.complete) === null || a === void 0 || a.call(r), s());
        }
      }), u && s(), { unsubscribe: s };
    },
    pipe(...r) {
      return r.reduce(le, e);
    }
  };
  return e;
}
function le(t, e) {
  return e(t);
}
function pe(t) {
  const e = new AbortController();
  return new Promise((o, n) => {
    let i = !1;
    function u() {
      i || (i = !0, s.unsubscribe());
    }
    e.signal.addEventListener("abort", () => {
      n(e.signal.reason);
    });
    const s = t.subscribe({
      next(a) {
        i = !0, o(a), u();
      },
      error(a) {
        n(a);
      },
      complete() {
        e.abort(), u();
      }
    });
  });
}
function fe(t) {
  return (e) => {
    let r = 0, o = null;
    const n = [];
    function i() {
      o || (o = e.subscribe({
        next(s) {
          for (const c of n) {
            var a;
            (a = c.next) === null || a === void 0 || a.call(c, s);
          }
        },
        error(s) {
          for (const c of n) {
            var a;
            (a = c.error) === null || a === void 0 || a.call(c, s);
          }
        },
        complete() {
          for (const a of n) {
            var s;
            (s = a.complete) === null || s === void 0 || s.call(a);
          }
        }
      }));
    }
    function u() {
      if (r === 0 && o) {
        const s = o;
        o = null, s.unsubscribe();
      }
    }
    return q((s) => (r++, n.push(s), i(), { unsubscribe() {
      r--, u();
      const a = n.findIndex((c) => c === s);
      a > -1 && n.splice(a, 1);
    } }));
  };
}
function de(t) {
  let e = t;
  const r = [], o = (u) => {
    e !== void 0 && u.next(e), r.push(u);
  }, n = (u) => {
    r.splice(r.indexOf(u), 1);
  }, i = q((u) => (o(u), () => {
    n(u);
  }));
  return i.next = (u) => {
    if (e !== u) {
      e = u;
      for (const s of r) s.next(u);
    }
  }, i.get = () => e, i;
}
function ve(t) {
  return q((e) => {
    function r(n = 0, i = t.op) {
      const u = t.links[n];
      if (!u) throw new Error("No more links to execute - did you forget to add an ending link?");
      return u({
        op: i,
        next(a) {
          return r(n + 1, a);
        }
      });
    }
    return r().subscribe(e);
  });
}
function O(t) {
  return !!t && !Array.isArray(t) && typeof t == "object";
}
var ye = Object.create, Y = Object.defineProperty, me = Object.getOwnPropertyDescriptor, $ = Object.getOwnPropertyNames, be = Object.getPrototypeOf, he = Object.prototype.hasOwnProperty, S = (t, e) => function() {
  return e || (0, t[$(t)[0]])((e = { exports: {} }).exports, e), e.exports;
}, xe = (t, e, r, o) => {
  if (e && typeof e == "object" || typeof e == "function") for (var n = $(e), i = 0, u = n.length, s; i < u; i++)
    s = n[i], !he.call(t, s) && s !== r && Y(t, s, {
      get: ((a) => e[a]).bind(null, s),
      enumerable: !(o = me(e, s)) || o.enumerable
    });
  return t;
}, M = (t, e, r) => (r = t != null ? ye(be(t)) : {}, xe(Y(r, "default", {
  value: t,
  enumerable: !0
}), t));
const B = () => {
}, W = (t) => {
  Object.freeze && Object.freeze(t);
};
function Q(t, e, r) {
  var o;
  const n = e.join(".");
  return (o = r[n]) !== null && o !== void 0 || (r[n] = new Proxy(B, {
    get(i, u) {
      if (!(typeof u != "string" || u === "then"))
        return Q(t, [...e, u], r);
    },
    apply(i, u, s) {
      const a = e[e.length - 1];
      let c = {
        args: s,
        path: e
      };
      return a === "call" ? c = {
        args: s.length >= 2 ? [s[1]] : [],
        path: e.slice(0, -1)
      } : a === "apply" && (c = {
        args: s.length >= 2 ? s[1] : [],
        path: e.slice(0, -1)
      }), W(c.args), W(c.path), t(c);
    }
  })), r[n];
}
const Pe = (t) => Q(t, [], /* @__PURE__ */ Object.create(null)), _e = (t) => new Proxy(B, { get(e, r) {
  if (r !== "then")
    return t(r);
} });
var V = S({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/typeof.js"(t, e) {
  function r(o) {
    "@babel/helpers - typeof";
    return e.exports = r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(n) {
      return typeof n;
    } : function(n) {
      return n && typeof Symbol == "function" && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
    }, e.exports.__esModule = !0, e.exports.default = e.exports, r(o);
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
} }), ge = S({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPrimitive.js"(t, e) {
  var r = V().default;
  function o(n, i) {
    if (r(n) != "object" || !n) return n;
    var u = n[Symbol.toPrimitive];
    if (u !== void 0) {
      var s = u.call(n, i || "default");
      if (r(s) != "object") return s;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (i === "string" ? String : Number)(n);
  }
  e.exports = o, e.exports.__esModule = !0, e.exports.default = e.exports;
} }), we = S({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/toPropertyKey.js"(t, e) {
  var r = V().default, o = ge();
  function n(i) {
    var u = o(i, "string");
    return r(u) == "symbol" ? u : u + "";
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
} }), X = S({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/defineProperty.js"(t, e) {
  var r = we();
  function o(n, i, u) {
    return (i = r(i)) in n ? Object.defineProperty(n, i, {
      value: u,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : n[i] = u, n;
  }
  e.exports = o, e.exports.__esModule = !0, e.exports.default = e.exports;
} }), D = S({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/objectSpread2.js"(t, e) {
  var r = X();
  function o(i, u) {
    var s = Object.keys(i);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(i);
      u && (a = a.filter(function(c) {
        return Object.getOwnPropertyDescriptor(i, c).enumerable;
      })), s.push.apply(s, a);
    }
    return s;
  }
  function n(i) {
    for (var u = 1; u < arguments.length; u++) {
      var s = arguments[u] != null ? arguments[u] : {};
      u % 2 ? o(Object(s), !0).forEach(function(a) {
        r(i, a, s[a]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(s)) : o(Object(s)).forEach(function(a) {
        Object.defineProperty(i, a, Object.getOwnPropertyDescriptor(s, a));
      });
    }
    return i;
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
} });
M(D());
M(X());
var T = M(D());
function je(t, e) {
  if ("error" in t) {
    const o = e.deserialize(t.error);
    return {
      ok: !1,
      error: (0, T.default)((0, T.default)({}, t), {}, { error: o })
    };
  }
  return {
    ok: !0,
    result: (0, T.default)((0, T.default)({}, t.result), (!t.result.type || t.result.type === "data") && {
      type: "data",
      data: e.deserialize(t.result.data)
    })
  };
}
var L = class extends Error {
  constructor() {
    super("Unable to transform response from server");
  }
};
function Oe(t, e) {
  let r;
  try {
    r = je(t, e);
  } catch {
    throw new L();
  }
  if (!r.ok && (!O(r.error.error) || typeof r.error.error.code != "number")) throw new L();
  if (r.ok && !O(r.result)) throw new L();
  return r;
}
M(D());
var k = y(g()), w = y(x());
function Se(t) {
  return t instanceof A;
}
function Ee(t) {
  return O(t) && O(t.error) && typeof t.error.code == "number" && typeof t.error.message == "string";
}
function Te(t, e) {
  return typeof t == "string" ? t : O(t) && typeof t.message == "string" ? t.message : e;
}
var A = class I extends Error {
  constructor(e, r) {
    var o, n;
    const i = r == null ? void 0 : r.cause;
    super(e, { cause: i }), (0, k.default)(this, "cause", void 0), (0, k.default)(this, "shape", void 0), (0, k.default)(this, "data", void 0), (0, k.default)(this, "meta", void 0), this.meta = r == null ? void 0 : r.meta, this.cause = i, this.shape = r == null || (o = r.result) === null || o === void 0 ? void 0 : o.error, this.data = r == null || (n = r.result) === null || n === void 0 ? void 0 : n.error.data, this.name = "TRPCClientError", Object.setPrototypeOf(this, I.prototype);
  }
  static from(e, r = {}) {
    const o = e;
    return Se(o) ? (r.meta && (o.meta = (0, w.default)((0, w.default)({}, o.meta), r.meta)), o) : Ee(o) ? new I(o.error.message, (0, w.default)((0, w.default)({}, r), {}, { result: o })) : new I(Te(o, "Unknown error"), (0, w.default)((0, w.default)({}, r), {}, { cause: o }));
  }
};
function ke(t) {
  const e = t;
  return e ? "input" in e ? e : {
    input: e,
    output: e
  } : {
    input: {
      serialize: (r) => r,
      deserialize: (r) => r
    },
    output: {
      serialize: (r) => r,
      deserialize: (r) => r
    }
  };
}
const G = (t) => typeof t == "function";
function Ce(t) {
  if (t) return t;
  if (typeof window < "u" && G(window.fetch)) return window.fetch;
  if (typeof globalThis < "u" && G(globalThis.fetch)) return globalThis.fetch;
  throw new Error("No fetch implementation found");
}
var j = y(x());
function Ie(t) {
  return {
    url: t.url.toString(),
    fetch: t.fetch,
    transformer: ke(t.transformer),
    methodOverride: t.methodOverride
  };
}
function Ae(t) {
  const e = {};
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    e[r] = o;
  }
  return e;
}
const qe = {
  query: "GET",
  mutation: "POST",
  subscription: "PATCH"
};
function Z(t) {
  return "input" in t ? t.transformer.input.serialize(t.input) : Ae(t.inputs.map((e) => t.transformer.input.serialize(e)));
}
const ee = (t) => {
  const e = t.url.split("?");
  let o = e[0].replace(/\/$/, "") + "/" + t.path;
  const n = [];
  if (e[1] && n.push(e[1]), "inputs" in t && n.push("batch=1"), t.type === "query" || t.type === "subscription") {
    const i = Z(t);
    i !== void 0 && t.methodOverride !== "POST" && n.push(`input=${encodeURIComponent(JSON.stringify(i))}`);
  }
  return n.length && (o += "?" + n.join("&")), o;
}, Me = (t) => {
  if (t.type === "query" && t.methodOverride !== "POST") return;
  const e = Z(t);
  return e !== void 0 ? JSON.stringify(e) : void 0;
}, Le = (t) => We((0, j.default)((0, j.default)({}, t), {}, {
  contentTypeHeader: "application/json",
  getUrl: ee,
  getBody: Me
}));
var Ne = class extends Error {
  constructor() {
    const t = "AbortError";
    super(t), this.name = t, this.message = t;
  }
};
const Re = (t) => {
  var e;
  if (t != null && t.aborted)
    throw (e = t.throwIfAborted) === null || e === void 0 || e.call(t), typeof DOMException < "u" ? new DOMException("AbortError", "AbortError") : new Ne();
};
async function De(t) {
  var e;
  Re(t.signal);
  const r = t.getUrl(t), o = t.getBody(t), { type: n } = t, i = await (async () => {
    const s = await t.headers();
    return Symbol.iterator in s ? Object.fromEntries(s) : s;
  })(), u = (0, j.default)((0, j.default)((0, j.default)({}, t.contentTypeHeader ? { "content-type": t.contentTypeHeader } : {}), t.trpcAcceptHeader ? { "trpc-accept": t.trpcAcceptHeader } : void 0), i);
  return Ce(t.fetch)(r, {
    method: (e = t.methodOverride) !== null && e !== void 0 ? e : qe[n],
    signal: t.signal,
    body: o,
    headers: u
  });
}
async function We(t) {
  const e = {}, r = await De(t);
  e.response = r;
  const o = await r.json();
  return e.responseJSON = o, {
    json: o,
    meta: e
  };
}
y(x());
const K = () => {
  throw new Error("Something went wrong. Please submit an issue at https://github.com/trpc/trpc/issues/new");
};
function z(t) {
  let e = null, r = null;
  const o = () => {
    clearTimeout(r), r = null, e = null;
  };
  function n(s) {
    const a = [[]];
    let c = 0;
    for (; ; ) {
      const d = s[c];
      if (!d) break;
      const f = a[a.length - 1];
      if (d.aborted) {
        var v;
        (v = d.reject) === null || v === void 0 || v.call(d, new Error("Aborted")), c++;
        continue;
      }
      if (t.validate(f.concat(d).map((p) => p.key))) {
        f.push(d), c++;
        continue;
      }
      if (f.length === 0) {
        var l;
        (l = d.reject) === null || l === void 0 || l.call(d, new Error("Input is too big for a single dispatch")), c++;
        continue;
      }
      a.push([]);
    }
    return a;
  }
  function i() {
    const s = n(e);
    o();
    for (const a of s) {
      if (!a.length) continue;
      const c = { items: a };
      for (const l of a) l.batch = c;
      t.fetch(c.items.map((l) => l.key)).then(async (l) => {
        await Promise.all(l.map(async (f, m) => {
          const p = c.items[m];
          try {
            var b;
            const h = await Promise.resolve(f);
            (b = p.resolve) === null || b === void 0 || b.call(p, h);
          } catch (h) {
            var E;
            (E = p.reject) === null || E === void 0 || E.call(p, h);
          }
          p.batch = null, p.reject = null, p.resolve = null;
        }));
        for (const f of c.items) {
          var d;
          (d = f.reject) === null || d === void 0 || d.call(f, new Error("Missing result")), f.batch = null;
        }
      }).catch((l) => {
        for (const f of c.items) {
          var d;
          (d = f.reject) === null || d === void 0 || d.call(f, l), f.batch = null;
        }
      });
    }
  }
  function u(s) {
    var a;
    const c = {
      aborted: !1,
      key: s,
      batch: null,
      resolve: K,
      reject: K
    }, v = new Promise((l, d) => {
      var f;
      c.reject = d, c.resolve = l, (f = e) !== null && f !== void 0 || (e = []), e.push(c);
    });
    return (a = r) !== null && a !== void 0 || (r = setTimeout(i)), v;
  }
  return { load: u };
}
function Ge(...t) {
  const e = new AbortController(), r = t.length;
  let o = 0;
  const n = () => {
    ++o === r && e.abort();
  };
  for (const i of t) i != null && i.aborted ? n() : i == null || i.addEventListener("abort", n, { once: !0 });
  return e.signal;
}
var C = y(x());
function Ke(t) {
  var e, r;
  const o = Ie(t), n = (e = t.maxURLLength) !== null && e !== void 0 ? e : 1 / 0, i = (r = t.maxItems) !== null && r !== void 0 ? r : 1 / 0;
  return () => {
    const u = (v) => ({
      validate(l) {
        if (n === 1 / 0 && i === 1 / 0) return !0;
        if (l.length > i) return !1;
        const d = l.map((p) => p.path).join(","), f = l.map((p) => p.input);
        return ee((0, C.default)((0, C.default)({}, o), {}, {
          type: v,
          path: d,
          inputs: f,
          signal: null
        })).length <= n;
      },
      async fetch(l) {
        const d = l.map((h) => h.path).join(","), f = l.map((h) => h.input), m = Ge(...l.map((h) => h.signal)), p = await Le((0, C.default)((0, C.default)({}, o), {}, {
          path: d,
          inputs: f,
          type: v,
          headers() {
            return t.headers ? typeof t.headers == "function" ? t.headers({ opList: l }) : t.headers : {};
          },
          signal: m
        }));
        return (Array.isArray(p.json) ? p.json : l.map(() => p.json)).map((h) => ({
          meta: p.meta,
          json: h
        }));
      }
    }), s = z(u("query")), a = z(u("mutation")), c = {
      query: s,
      mutation: a
    };
    return ({ op: v }) => q((l) => {
      /* istanbul ignore if -- @preserve */
      if (v.type === "subscription") throw new Error("Subscriptions are unsupported by `httpLink` - use `httpSubscriptionLink` or `wsLink`");
      const f = c[v.type].load(v);
      let m;
      return f.then((p) => {
        m = p;
        const b = Oe(p.json, o.transformer.output);
        if (!b.ok) {
          l.error(A.from(b.error, { meta: p.meta }));
          return;
        }
        l.next({
          context: p.meta,
          result: b.result
        }), l.complete();
      }).catch((p) => {
        l.error(A.from(p, { meta: m == null ? void 0 : m.meta }));
      }), () => {
      };
    });
  };
}
y(x());
const te = (t, ...e) => typeof t == "function" ? t(...e) : t;
y(g());
function ze() {
  let t, e;
  return {
    promise: new Promise((o, n) => {
      t = o, e = n;
    }),
    resolve: t,
    reject: e
  };
}
async function He(t) {
  const e = await te(t.url);
  if (!t.connectionParams) return e;
  const o = `${e.includes("?") ? "&" : "?"}connectionParams=1`;
  return e + o;
}
async function Ue(t) {
  const e = {
    method: "connectionParams",
    data: await te(t)
  };
  return JSON.stringify(e);
}
y(g());
var _ = y(g());
function Je(t) {
  const { promise: e, resolve: r, reject: o } = ze();
  return t.addEventListener("open", () => {
    t.removeEventListener("error", o), r();
  }), t.addEventListener("error", o), e;
}
function Fe(t, { intervalMs: e, pongTimeoutMs: r }) {
  let o, n;
  function i() {
    o = setTimeout(() => {
      t.send("PING"), n = setTimeout(() => {
        t.close();
      }, r);
    }, e);
  }
  function u() {
    clearTimeout(o), i();
  }
  function s() {
    clearTimeout(n), u();
  }
  t.addEventListener("open", i), t.addEventListener("message", ({ data: a }) => {
    clearTimeout(o), i(), a === "PONG" && s();
  }), t.addEventListener("close", () => {
    clearTimeout(o), clearTimeout(n);
  });
}
var Ye = class R {
  constructor(e) {
    var r;
    if ((0, _.default)(this, "id", ++R.connectCount), (0, _.default)(this, "WebSocketPonyfill", void 0), (0, _.default)(this, "urlOptions", void 0), (0, _.default)(this, "keepAliveOpts", void 0), (0, _.default)(this, "wsObservable", de(null)), (0, _.default)(this, "openPromise", null), this.WebSocketPonyfill = (r = e.WebSocketPonyfill) !== null && r !== void 0 ? r : WebSocket, !this.WebSocketPonyfill) throw new Error("No WebSocket implementation found - you probably don't want to use this on the server, but if you do you need to pass a `WebSocket`-ponyfill");
    this.urlOptions = e.urlOptions, this.keepAliveOpts = e.keepAlive;
  }
  get ws() {
    return this.wsObservable.get();
  }
  set ws(e) {
    this.wsObservable.next(e);
  }
  /**
  * Checks if the WebSocket connection is open and ready to communicate.
  */
  isOpen() {
    return !!this.ws && this.ws.readyState === this.WebSocketPonyfill.OPEN && !this.openPromise;
  }
  /**
  * Checks if the WebSocket connection is closed or in the process of closing.
  */
  isClosed() {
    return !!this.ws && (this.ws.readyState === this.WebSocketPonyfill.CLOSING || this.ws.readyState === this.WebSocketPonyfill.CLOSED);
  }
  async open() {
    var e = this;
    if (e.openPromise) return e.openPromise;
    e.id = ++R.connectCount;
    const r = He(e.urlOptions).then((o) => new e.WebSocketPonyfill(o));
    e.openPromise = r.then(async (o) => {
      e.ws = o, o.addEventListener("message", function({ data: n }) {
        n === "PING" && this.send("PONG");
      }), e.keepAliveOpts.enabled && Fe(o, e.keepAliveOpts), o.addEventListener("close", () => {
        e.ws === o && (e.ws = null);
      }), await Je(o), e.urlOptions.connectionParams && o.send(await Ue(e.urlOptions.connectionParams));
    });
    try {
      await e.openPromise;
    } finally {
      e.openPromise = null;
    }
  }
  /**
  * Closes the WebSocket connection gracefully.
  * Waits for any ongoing open operation to complete before closing.
  */
  async close() {
    var e = this;
    try {
      await e.openPromise;
    } finally {
      var r;
      (r = e.ws) === null || r === void 0 || r.close();
    }
  }
};
(0, _.default)(Ye, "connectCount", 0);
y(g());
y(x());
var N = y(g()), H = y(x()), $e = class {
  constructor(t) {
    (0, N.default)(this, "links", void 0), (0, N.default)(this, "runtime", void 0), (0, N.default)(this, "requestId", void 0), this.requestId = 0, this.runtime = {}, this.links = t.links.map((e) => e(this.runtime));
  }
  $request(t) {
    var e;
    return ve({
      links: this.links,
      op: (0, H.default)((0, H.default)({}, t), {}, {
        context: (e = t.context) !== null && e !== void 0 ? e : {},
        id: ++this.requestId
      })
    }).pipe(fe());
  }
  async requestAsPromise(t) {
    var e = this;
    try {
      const r = e.$request(t);
      return (await pe(r)).result.data;
    } catch (r) {
      throw A.from(r);
    }
  }
  query(t, e, r) {
    return this.requestAsPromise({
      type: "query",
      path: t,
      input: e,
      context: r == null ? void 0 : r.context,
      signal: r == null ? void 0 : r.signal
    });
  }
  mutation(t, e, r) {
    return this.requestAsPromise({
      type: "mutation",
      path: t,
      input: e,
      context: r == null ? void 0 : r.context,
      signal: r == null ? void 0 : r.signal
    });
  }
  subscription(t, e, r) {
    return this.$request({
      type: "subscription",
      path: t,
      input: e,
      context: r.context,
      signal: r.signal
    }).subscribe({
      next(n) {
        switch (n.result.type) {
          case "state": {
            var i;
            (i = r.onConnectionStateChange) === null || i === void 0 || i.call(r, n.result);
            break;
          }
          case "started": {
            var u;
            (u = r.onStarted) === null || u === void 0 || u.call(r, { context: n.context });
            break;
          }
          case "stopped": {
            var s;
            (s = r.onStopped) === null || s === void 0 || s.call(r);
            break;
          }
          case "data":
          case void 0: {
            var a;
            (a = r.onData) === null || a === void 0 || a.call(r, n.result.data);
            break;
          }
        }
      },
      error(n) {
        var i;
        (i = r.onError) === null || i === void 0 || i.call(r, n);
      },
      complete() {
        var n;
        (n = r.onComplete) === null || n === void 0 || n.call(r);
      }
    });
  }
};
const Be = Symbol.for("trpc_untypedClient"), Qe = {
  query: "query",
  mutate: "mutation",
  subscribe: "subscription"
}, Ve = (t) => Qe[t];
function Xe(t) {
  const e = Pe(({ path: r, args: o }) => {
    const n = [...r], i = Ve(n.pop()), u = n.join(".");
    return t[i](u, ...o);
  });
  return _e((r) => r === Be ? t : e[r]);
}
function Ze(t) {
  const e = new $e(t);
  return Xe(e);
}
y(x());
y(x());
var et = P({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/asyncIterator.js"(t, e) {
  function r(n) {
    var i, u, s, a = 2;
    for (typeof Symbol < "u" && (u = Symbol.asyncIterator, s = Symbol.iterator); a--; ) {
      if (u && (i = n[u]) != null) return i.call(n);
      if (s && (i = n[s]) != null) return new o(i.call(n));
      u = "@@asyncIterator", s = "@@iterator";
    }
    throw new TypeError("Object is not async iterable");
  }
  function o(n) {
    function i(u) {
      if (Object(u) !== u) return Promise.reject(new TypeError(u + " is not an object."));
      var s = u.done;
      return Promise.resolve(u.value).then(function(a) {
        return {
          value: a,
          done: s
        };
      });
    }
    return o = function(s) {
      this.s = s, this.n = s.next;
    }, o.prototype = {
      s: null,
      n: null,
      next: function() {
        return i(this.n.apply(this.s, arguments));
      },
      return: function(s) {
        var a = this.s.return;
        return a === void 0 ? Promise.resolve({
          value: s,
          done: !0
        }) : i(a.apply(this.s, arguments));
      },
      throw: function(s) {
        var a = this.s.return;
        return a === void 0 ? Promise.reject(s) : i(a.apply(this.s, arguments));
      }
    }, new o(n);
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
} });
y(et());
y(x());
var tt = P({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/usingCtx.js"(t, e) {
  function r() {
    var o = typeof SuppressedError == "function" ? SuppressedError : function(s, a) {
      var c = Error();
      return c.name = "SuppressedError", c.error = s, c.suppressed = a, c;
    }, n = {}, i = [];
    function u(s, a) {
      if (a != null) {
        if (Object(a) !== a) throw new TypeError("using declarations can only be used with objects, functions, null, or undefined.");
        if (s) var c = a[Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")];
        if (c === void 0 && (c = a[Symbol.dispose || Symbol.for("Symbol.dispose")], s)) var v = c;
        if (typeof c != "function") throw new TypeError("Object is not disposable.");
        v && (c = function() {
          try {
            v.call(a);
          } catch (d) {
            return Promise.reject(d);
          }
        }), i.push({
          v: a,
          d: c,
          a: s
        });
      } else s && i.push({
        d: a,
        a: s
      });
      return a;
    }
    return {
      e: n,
      u: u.bind(null, !1),
      a: u.bind(null, !0),
      d: function() {
        var a, c = this.e, v = 0;
        function l() {
          for (; a = i.pop(); ) try {
            if (!a.a && v === 1) return v = 0, i.push(a), Promise.resolve().then(l);
            if (a.d) {
              var f = a.d.call(a.v);
              if (a.a) return v |= 2, Promise.resolve(f).then(l, d);
            } else v |= 1;
          } catch (m) {
            return d(m);
          }
          if (v === 1) return c !== n ? Promise.reject(c) : Promise.resolve();
          if (c !== n) throw c;
        }
        function d(f) {
          return c = c !== n ? new o(f, c) : f, l();
        }
        return l();
      }
    };
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
} }), re = P({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/OverloadYield.js"(t, e) {
  function r(o, n) {
    this.v = o, this.k = n;
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
} }), rt = P({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/awaitAsyncGenerator.js"(t, e) {
  var r = re();
  function o(n) {
    return new r(n, 0);
  }
  e.exports = o, e.exports.__esModule = !0, e.exports.default = e.exports;
} }), nt = P({ "../../node_modules/.pnpm/@oxc-project+runtime@0.72.2/node_modules/@oxc-project/runtime/src/helpers/wrapAsyncGenerator.js"(t, e) {
  var r = re();
  function o(i) {
    return function() {
      return new n(i.apply(this, arguments));
    };
  }
  function n(i) {
    var u, s;
    function a(v, l) {
      try {
        var d = i[v](l), f = d.value, m = f instanceof r;
        Promise.resolve(m ? f.v : f).then(function(p) {
          if (m) {
            var b = v === "return" ? "return" : "next";
            if (!f.k || p.done) return a(b, p);
            p = i[b](p).value;
          }
          c(d.done ? "return" : "normal", p);
        }, function(p) {
          a("throw", p);
        });
      } catch (p) {
        c("throw", p);
      }
    }
    function c(v, l) {
      switch (v) {
        case "return":
          u.resolve({
            value: l,
            done: !0
          });
          break;
        case "throw":
          u.reject(l);
          break;
        default:
          u.resolve({
            value: l,
            done: !1
          });
      }
      (u = u.next) ? a(u.key, u.arg) : s = null;
    }
    this._invoke = function(v, l) {
      return new Promise(function(d, f) {
        var m = {
          key: v,
          arg: l,
          resolve: d,
          reject: f,
          next: null
        };
        s ? s = s.next = m : (u = s = m, a(v, l));
      });
    }, typeof i.return != "function" && (this.return = void 0);
  }
  n.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
    return this;
  }, n.prototype.next = function(i) {
    return this._invoke("next", i);
  }, n.prototype.throw = function(i) {
    return this._invoke("throw", i);
  }, n.prototype.return = function(i) {
    return this._invoke("return", i);
  }, e.exports = o, e.exports.__esModule = !0, e.exports.default = e.exports;
} });
y(tt());
y(rt());
y(nt());
y(x());
function ot(t) {
}
function it(t) {
  return Ze({
    links: [
      Ke({
        url: t
      })
    ]
  });
}
export {
  it as createTradingClient,
  ot as subscribeToMarket
};
