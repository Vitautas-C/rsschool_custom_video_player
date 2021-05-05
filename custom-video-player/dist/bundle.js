! function(e) {
    var t = {};

    function n(r) { if (t[r]) return t[r].exports; var o = t[r] = { i: r, l: !1, exports: {} }; return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports }
    n.m = e, n.c = t, n.d = function(e, t, r) { n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r }) }, n.r = function(e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) { return e[t] }.bind(null, o));
        return r
    }, n.n = function(e) { var t = e && e.__esModule ? function() { return e.default } : function() { return e }; return n.d(t, "a", t), t }, n.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, n.p = "", n(n.s = 0)
}([function(e, t, n) {
    "use strict";
    n.r(t);
    n(1);
    console.log("Hello, SASS"), console.log("Hello, HTML");
    const r = e => document.querySelector(e),
        o = r(".button_play"),
        i = r(".button_pause"),
        a = r(".button_muted-on"),
        l = r(".button_muted-off"),
        s = r(".player__control_speed"),
        d = r(".icon_player-rate"),
        c = (u = ".player__control_speed_item", document.querySelectorAll(u));
    var u;
    const m = r(".button_forward"),
        v = r(".button_back"),
        f = r(".button_repeat"),
        p = r(".button_next"),
        L = r(".button_previous"),
        _ = r(".duration__progress-bar"),
        b = r(".duration__progress-background"),
        g = r(".volume__progress-bar"),
        h = r(".volume__progress-background"),
        y = r(".playing-time"),
        k = r(".player__video_container .video");
    let E;
    k.volume = .5;
    let T, x = ["forest life.mp4", "how mushrooms grow.mp4", "how flowers bloom.mp4"],
        M = 0;
    const S = () => { o.classList.add("hidden"), i.classList.remove("hidden"), k.play(), T = setInterval(q, 500) },
        w = () => { i.classList.add("hidden"), o.classList.remove("hidden"), k.pause(), clearTimeout(T) },
        j = () => { i.classList.contains("hidden") ? S() : w() },
        O = () => { l.classList.add("hidden"), a.classList.remove("hidden"), k.muted = !0 },
        P = () => { a.classList.add("hidden"), l.classList.remove("hidden"), k.muted = !1 },
        H = () => { d.classList.toggle("rotated"), s.classList.toggle("opened") },
        q = () => {
            let e = k.currentTime.toFixed(0);
            y.innerText = (e => {
                let t = Math.floor(e % 60),
                    n = Math.floor(e / 60 % 60),
                    r = Math.floor(e / 3600 % 24);
                return r = r < 10 ? "0" + r : r, n = n < 10 ? "0" + n : n, t = t < 10 ? "0" + t : t, 0 == r ? n + ":" + t : r + ":" + n + ":" + t
            })(e)
        };
    k.addEventListener("click", j), o.addEventListener("click", S), i.addEventListener("click", w), k.addEventListener("click", j), l.addEventListener("click", O), a.addEventListener("click", P), d.addEventListener("click", H), m.addEventListener("click", () => {
        E = k.duration / 8;
        let e = k.currentTime + E;
        e > k.duration && (e = k.duration), k.currentTime = e, v.classList.remove("maximum-value"), e === k.duration && m.classList.add("maximum-value")
    }), v.addEventListener("click", () => {
        E = k.duration / 8;
        let e = k.currentTime - E;
        e < 0 && (e = 0), k.currentTime = e, m.classList.remove("maximum-value"), 0 == k.currentTime && v.classList.add("maximum-value")
    }), f.addEventListener("click", () => { f.classList.toggle("default-value"), k.loop = !k.loop }), p.addEventListener("click", () => {++M, M >= x.length && (M = 0), k.src = "./video/" + x[M], S() }), L.addEventListener("click", () => { 0 == M && (M = x.length), M--, k.src = x[M], S() }), k.addEventListener("volumechange", () => {
        let e = k.volume / 1 * 100;
        g.style.width = Math.floor(e) + "%"
    }), h.addEventListener("click", e => {
        let t = Math.floor(e.offsetX) / h.offsetWidth * 1;
        k.volume = t, k.volume > 0 && P(), 0 == k.volume && O()
    }), k.addEventListener("timeupdate", () => {
        let e = k.currentTime / k.duration * 100;
        _.style.width = e + "%"
    }), b.addEventListener("click", e => {
        _.offsetHeight;
        let t = Math.floor(e.offsetX) / b.offsetWidth * k.duration;
        k.currentTime = t
    }), s.addEventListener("click", () => { c.forEach(e => e.classList.remove("active")), event.target.classList.contains("player__control_speed_item") && (event.target.classList.add("active"), k.playbackRate = event.target.dataset.speed, setTimeout(H, 750)) }), k.addEventListener("ended", w)
}, function(e, t) {}]);