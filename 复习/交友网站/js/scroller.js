if (!window.jQuery) {
    var jQuery = Zepto;
    !
        function(e) {
            ["width", "height"].forEach(function(t) {
                e.fn[t] = function(n) {
                    var s, i = document.body,
                        a = document.documentElement,
                        o = t.replace(/./, function(e) {
                            return e[0].toUpperCase()
                        });
                    return void 0 === n ? this[0] == window ? a["client" + o] : this[0] == document ? Math.max(i["scroll" + o], i["offset" + o], a["client" + o], a["scroll" + o], a["offset" + o]) : (s = this.offset()) && s[t] : this.each(function(s) {
                        e(this).css(t, n)
                    })
                }
            }), ["width", "height"].forEach(function(t) {
                var n = t.replace(/./, function(e) {
                    return e[0].toUpperCase()
                });
                e.fn["outer" + n] = function(e) {
                    var s = this;
                    if (s) {
                        var i = s[0]["offset" + n],
                            a = {
                                width: ["left", "right"],
                                height: ["top", "bottom"]
                            };
                        return a[t].forEach(function(t) {
                            e && (i += parseInt(s.css("margin-" + t), 10))
                        }), i
                    }
                    return null
                }
            }), ["width", "height"].forEach(function(t) {
                var n = t.replace(/./, function(e) {
                    return e[0].toUpperCase()
                });
                e.fn["inner" + n] = function() {
                    var e = this;
                    if (e[0]["inner" + n]) return e[0]["inner" + n];
                    var s = e[0]["offset" + n],
                        i = {
                            width: ["left", "right"],
                            height: ["top", "bottom"]
                        };
                    return i[t].forEach(function(t) {
                        s -= parseInt(e.css("border-" + t + "-width"), 10)
                    }), s
                }
            }), ["Left", "Top"].forEach(function(t, n) {
                function s(e) {
                    return e && "object" == typeof e && "setInterval" in e
                }
                function i(e) {
                    return s(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
                }
                var a = "scroll" + t;
                e.fn[a] = function(t) {
                    var s, o;
                    return void 0 === t ? (s = this[0]) ? (o = i(s), o ? "pageXOffset" in o ? o[n ? "pageYOffset" : "pageXOffset"] : o.document.documentElement[a] || o.document.body[a] : s[a]) : null : void this.each(function() {
                        if (o = i(this)) {
                            var s = n ? e(o).scrollLeft() : t,
                                l = n ? t : e(o).scrollTop();
                            o.scrollTo(s, l)
                        } else this[a] = t
                    })
                }
            }), e.fn.prevUntil = function(t) {
                for (var n = this, s = []; n.length && !e(n).filter(t).length;) s.push(n[0]), n = n.prev();
                return e(s)
            }, e.fn.nextUntil = function(t) {
                for (var n = this, s = []; n.length && !n.filter(t).length;) s.push(n[0]), n = n.next();
                return e(s)
            }, e._extend = e.extend, e.extend = function() {
                return arguments[0] = arguments[0] || {}, e._extend.apply(this, arguments)
            }
        }(jQuery)
}!
    function(e, t, n, s) {
        function i(e) {
            var t;
            for (t in e) if (c[e[t]] !== s) return !0;
            return !1
        }
        function a() {
            var e, t = ["Webkit", "Moz", "O", "ms"];
            for (e in t) if (i([t[e] + "Transform"])) return "-" + t[e].toLowerCase() + "-";
            return ""
        }
        function o(t, n, i) {
            var a = t;
            return "object" == typeof n ? t.each(function() {
                this.id || (this.id = "mobiscroll" + ++l), r[this.id] && r[this.id].destroy(), new e.mobiscroll.classes[n.component || "Scroller"](this, n)
            }) : ("string" == typeof n && t.each(function() {
                var e, t = r[this.id];
                return t && t[n] && (e = t[n].apply(this, Array.prototype.slice.call(i, 1)), e !== s) ? (a = e, !1) : void 0
            }), a)
        }
        var l = +new Date,
            r = {},
            d = e.extend,
            c = n.createElement("modernizr").style,
            u = i(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]),
            h = i(["flex", "msFlex", "WebkitBoxDirection"]),
            f = a(),
            p = f.replace(/^\-/, "").replace(/\-$/, "").replace("moz", "Moz");
        e.fn.mobiscroll = function(t) {
            return d(this, e.mobiscroll.components), o(this, t, arguments)
        }, e.mobiscroll = e.mobiscroll || {
                version: "2.14.0",
                util: {
                    prefix: f,
                    jsPrefix: p,
                    has3d: u,
                    hasFlex: h,
                    testTouch: function(t, n) {
                        if ("touchstart" == t.type) e(n).attr("data-touch", "1");
                        else if (e(n).attr("data-touch")) return e(n).removeAttr("data-touch"), !1;
                        return !0
                    },
                    objectToArray: function(e) {
                        var t, n = [];
                        for (t in e) n.push(e[t]);
                        return n
                    },
                    arrayToObject: function(e) {
                        var t, n = {};
                        if (e) for (t = 0; t < e.length; t++) n[e[t]] = e[t];
                        return n
                    },
                    isNumeric: function(e) {
                        return e - parseFloat(e) >= 0
                    },
                    isString: function(e) {
                        return "string" == typeof e
                    },
                    getCoord: function(e, t) {
                        var n = e.originalEvent || e;
                        return n.changedTouches ? n.changedTouches[0]["page" + t] : e["page" + t]
                    },
                    getPosition: function(n, i) {
                        var a, o, l = t.getComputedStyle ? getComputedStyle(n[0]) : n[0].style;
                        return u ? (e.each(["t", "webkitT", "MozT", "OT", "msT"], function(e, t) {
                            return l[t + "ransform"] !== s ? (a = l[t + "ransform"], !1) : void 0
                        }), a = a.split(")")[0].split(", "), o = i ? a[13] || a[5] : a[12] || a[4]) : o = i ? l.top.replace("px", "") : l.left.replace("px", ""), o
                    },
                    constrain: function(e, t, n) {
                        return Math.max(t, Math.min(e, n))
                    }
                },
                tapped: !1,
                presets: {
                    scroller: {},
                    numpad: {}
                },
                themes: {
                    listview: {},
                    menustrip: {}
                },
                i18n: {},
                instances: r,
                classes: {},
                components: {},
                defaults: {
                    theme: "mobiscroll",
                    context: "body"
                },
                userdef: {},
                setDefaults: function(e) {
                    d(this.userdef, e)
                },
                presetShort: function(e, t, n) {
                    this.components[e] = function(i) {
                        return o(this, d(i, {
                            component: t,
                            preset: n === !1 ? s : e
                        }), arguments)
                    }
                }
            };
        var w, m, d = e.extend,
            v = e.mobiscroll,
            r = v.instances,
            b = v.userdef,
            y = v.util,
            p = y.jsPrefix,
            u = y.has3d,
            g = y.getCoord,
            x = y.constrain,
            _ = y.isString,
            C = /android [1-3]/i.test(navigator.userAgent),
            T = "webkitAnimationEnd animationend",
            V = function() {},
            M = function(e) {
                e.preventDefault()
            };
        v.classes.Widget = function(i, a, o) {
            function l(t) {
                j && j.removeClass("dwb-a"), j = e(this), j.hasClass("dwb-d") || j.hasClass("dwb-nhl") || j.addClass("dwb-a"), "mousedown" === t.type && e(n).on("mouseup", c)
            }
            function c(t) {
                j && (j.removeClass("dwb-a"), j = null), "mouseup" === t.type && e(n).off("mouseup", c)
            }
            function h(e) {
                e || I.focus(), ne.ariaMessage(Z.ariaMessage)
            }
            function f(t) {
                var n, i, a, o = Z.focusOnClose;
                L.remove(), w && !t && setTimeout(function() {
                    if (o === s || o === !0) {
                        m = !0, n = w[0], a = n.type, i = n.value;
                        try {
                            n.type = "button"
                        } catch (t) {}
                        w.focus(), n.type = a, n.value = i
                    } else o && (r[e(o).attr("id")] && (v.tapped = !1), e(o).focus())
                }, 200), ne._isVisible = !1, W("onHide", [])
            }
            function y(e) {
                clearTimeout(ae[e.type]), ae[e.type] = setTimeout(function() {
                    var t = "scroll" == e.type;
                    t && !$ || ne.position(!t)
                }, 200)
            }
            function k(t) {
                v.tapped || (t && t(), e(n.activeElement).is("input,textarea") && e(n.activeElement).blur(), w = se, ne.show()), setTimeout(function() {
                    m = !1
                }, 300)
            }
            function W(t, n) {
                var s;
                return n.push(ne), e.each([b, J, Q, a], function(e, a) {
                    a && a[t] && (s = a[t].apply(i, n))
                }), s
            }
            var O, S, A, L, D, P, I, q, E, F, j, H, z, R, U, N, B, Y, Q, X, Z, $, G, J, K, ee, te, ne = this,
                se = e(i),
                ie = [],
                ae = {};
            ne.position = function(t) {
                var i, a, o, l, r, d, c, u, h, f, p, w, m, v, b, y, g = 0,
                    _ = 0,
                    C = {},
                    T = Math.min(q[0].innerWidth || q.innerWidth(), P.width()),
                    V = q[0].innerHeight || q.innerHeight();
                ee === T && te === V && t || X || ((ne._isFullScreen || /top|bottom/.test(Z.display)) && I.width(T), W("onPosition", [L, T, V]) !== !1 && R && (b = q.scrollLeft(), y = q.scrollTop(), l = Z.anchor === s ? se : e(Z.anchor), ne._isLiquid && "liquid" !== Z.layout && (400 > T ? L.addClass("dw-liq") : L.removeClass("dw-liq")), !ne._isFullScreen && /modal|bubble/.test(Z.display) && (E.width(""), e(".mbsc-w-p", L).each(function() {
                    i = e(this).outerWidth(!0), g += i, _ = i > _ ? i : _
                }), i = g > T ? _ : g, E.width(i).css("white-space", g > T ? "" : "nowrap")), N = ne._isFullScreen ? T : I.outerWidth(), B = ne._isFullScreen ? V : I.outerHeight(!0), $ = V >= B && T >= N, ne.scrollLock = $, "modal" == Z.display ? (a = Math.max(0, b + (T - N) / 2), o = y + (V - B) / 2) : "bubble" == Z.display ? (v = !0, f = e(".dw-arrw-i", L), c = l.offset(), u = Math.abs(S.offset().top - c.top), h = Math.abs(S.offset().left - c.left), r = l.outerWidth(), d = l.outerHeight(), a = x(h - (I.outerWidth(!0) - r) / 2, b + 3, b + T - N - 3), o = u - B, y > o || u > y + V ? (I.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"), o = u + d) : I.removeClass("dw-bubble-bottom").addClass("dw-bubble-top"), p = f.outerWidth(), w = x(h + r / 2 - (a + (N - p) / 2), 0, p), e(".dw-arr", L).css({
                    left: w
                })) : (a = b, "top" == Z.display ? o = y : "bottom" == Z.display && (o = y + V - B)), o = 0 > o ? 0 : o, C.top = o, C.left = a, I.css(C), P.height(0), m = Math.max(o + B, "body" == Z.context ? e(n).height() : S[0].scrollHeight), P.css({
                    height: m
                }), v && (o + B > y + V || u > y + V) && (X = !0, setTimeout(function() {
                    X = !1
                }, 300), q.scrollTop(Math.min(o + B - V, m - V))), ee = T, te = V))
            }, ne.attachShow = function(e, t) {
                ie.push(e), "inline" !== Z.display && (G && e.on("mousedown.dw", function(e) {
                    e.preventDefault()
                }), Z.showOnFocus && e.on("focus.dw", function() {
                    m || k(t)
                }), Z.showOnTap && ne.tap(e, function() {
                    k(t)
                }))
            }, ne.select = function() {
                ne._fillValue(), ne.settings.callback && "function" == typeof ne.settings.callback && ne.settings.callback(), R && ne.hide(!1, "set") === !1 || W("onSelect", [ne._value])
            }, ne.cancel = function() {
                ne.settings.offcallback && "function" == typeof ne.settings.offcallback && ne.settings.offcallback(), R && ne.hide(!1, "cancel") === !1 || W("onCancel", [ne._value])
            }, ne.clear = function() {
                W("onClear", [L]), R && !ne.live && ne.hide(!1, "clear"), ne.setValue(null, !0)
            }, ne.enable = function() {
                Z.disabled = !1, ne._isInput && se.prop("disabled", !1)
            }, ne.disable = function() {
                Z.disabled = !0, ne._isInput && se.prop("disabled", !0)
            }, ne.show = function(n, i) {
                var a;
                Z.disabled || ne._isVisible || (H !== !1 && ("top" == Z.display && (H = "slidedown"), "bottom" == Z.display && (H = "slideup")), ne._readValue(), W("onBeforeShow", []), a = '<div lang="' + Z.lang + '" class="mbsc-' + Z.theme + " dw-" + Z.display + " " + (Z.cssClass || "") + (ne._isLiquid ? " dw-liq" : "") + (C ? " mbsc-old" : "") + (z ? "" : " dw-nobtn") + '"><div class="dw-persp">' + (R ? '<div class="dwo"></div>' : "") + "<div" + (R ? ' role="dialog" tabindex="-1"' : "") + ' class="dw' + (Z.rtl ? " dw-rtl" : " dw-ltr") + '">' + ("bubble" === Z.display ? '<div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div>' : "") + '<div class="dwwr"><div aria-live="assertive" class="dw-aria dw-hidden"></div>' + (Z.headerText ? '<div class="dwv">' + (_(Z.headerText) ? Z.headerText : "") + "</div>" : "") + '<div class="dwcc">', a += ne._generateContent(), a += "</div>", z && (a += '<div class="dwbc">', e.each(F, function(e, t) {
                    t = _(t) ? ne.buttons[t] : t, "set" === t.handler && (t.parentClass = "dwb-s"), "cancel" === t.handler && (t.parentClass = "dwb-c"), t.handler = _(t.handler) ? ne.handlers[t.handler] : t.handler, a += "<div" + (Z.btnWidth ? ' style="width:' + 100 / F.length + '%"' : "") + ' class="dwbw ' + (t.parentClass || "") + '"><div tabindex="0" role="button" class="dwb' + e + " dwb-e " + (t.cssClass === s ? Z.btnClass : t.cssClass) + (t.icon ? " mbsc-ic mbsc-ic-" + t.icon : "") + '">' + (t.text || "") + "</div></div>"
                }), a += "</div>"), a += "</div></div></div></div>", L = e(a), P = e(".dw-persp", L), D = e(".dwo", L), E = e(".dwwr", L), A = e(".dwv", L), I = e(".dw", L), O = e(".dw-aria", L), ne._markup = L, ne._header = A, ne._isVisible = !0, Y = "orientationchange resize", ne._markupReady(), W("onMarkupReady", [L]), R ? (e(t).on("keydown.dw", function(e) {
                    13 == e.keyCode ? ne.select() : 27 == e.keyCode && ne.cancel()
                }), Z.scrollLock && L.on("touchstart touchmove mousewheel DOMMouseScroll", function(e) {
                    $ && e.preventDefault()
                }), "Moz" !== p && e("input,select,button", S).each(function() {
                    this.disabled || e(this).addClass("dwtd").prop("disabled", !0)
                }), Y += " scroll", v.activeInstance = ne, L.appendTo(S), u && H && !n && L.addClass("dw-in dw-trans").on(T, function() {
                    L.off(T).removeClass("dw-in dw-trans").find(".dw").removeClass("dw-" + H), h(i)
                }).find(".dw").addClass("dw-" + H)) : se.is("div") ? se.html(L) : L.insertAfter(se), W("onMarkupInserted", [L]), ne.position(), q.on(Y, y), L.on("selectstart mousedown", M).on("click", ".dwb-e", M).on("keydown", ".dwb-e", function(t) {
                    32 == t.keyCode && (t.preventDefault(), t.stopPropagation(), e(this).click())
                }), setTimeout(function() {
                    e.each(F, function(t, n) {
                        ne.tap(e(".dwb" + t, L), function(e) {
                            n = _(n) ? ne.buttons[n] : n, n.handler.call(this, e, ne)
                        }, !0)
                    }), Z.closeOnOverlay && ne.tap(D, function() {
                        ne.cancel()
                    }), R && !H && h(i), L.on("touchstart mousedown", ".dwb-e", l).on("touchend", ".dwb-e", c), ne._attachEvents(L)
                }, 300), W("onShow", [L, ne._tempValue]))
            }, ne.hide = function(t, n, s) {
                return !ne._isVisible || !s && !ne._isValid && "set" == n || !s && W("onClose", [ne._tempValue, n]) === !1 ? !1 : (L && ("Moz" !== p && e(".dwtd", S).each(function() {
                    e(this).prop("disabled", !1).removeClass("dwtd")
                }), u && R && H && !t && !L.hasClass("dw-trans") ? L.addClass("dw-out dw-trans").find(".dw").addClass("dw-" + H).on(T, function() {
                    f(t)
                }) : f(t), q.off(Y, y)), void delete v.activeInstance)
            }, ne.ariaMessage = function(e) {
                O.html(""), setTimeout(function() {
                    O.html(e)
                }, 100)
            }, ne.isVisible = function() {
                return ne._isVisible
            }, ne.setValue = V, ne._generateContent = V, ne._attachEvents = V, ne._readValue = V, ne._fillValue = V, ne._markupReady = V, ne._processSettings = V, ne.tap = function(e, t, n) {
                var s, i, a;
                Z.tap && e.on("touchstart.dw", function(e) {
                    n && e.preventDefault(), s = g(e, "X"), i = g(e, "Y"), a = !1
                }).on("touchmove.dw", function(e) {
                    (Math.abs(g(e, "X") - s) > 20 || Math.abs(g(e, "Y") - i) > 20) && (a = !0)
                }).on("touchend.dw", function(e) {
                    var n = this;
                    a || (e.preventDefault(), t.call(n, e)), v.tapped = !0, setTimeout(function() {
                        v.tapped = !1
                    }, 500)
                })
            }, ne.option = function(e, t) {
                var n = {};
                "object" == typeof e ? n = e : n[e] = t, ne.init(n)
            }, ne.destroy = function() {
                ne.hide(!0, !1, !0), e.each(ie, function(e, t) {
                    t.off(".dw")
                }), ne._isInput && G && (i.readOnly = K), W("onDestroy", []), delete r[i.id]
            }, ne.getInst = function() {
                return ne
            }, ne.trigger = W, ne.init = function(n) {
                ne.settings = Z = {}, d(a, n), d(Z, v.defaults, ne._defaults, b, a), J = v.themes[Z.theme] || v.themes.mobiscroll, U = v.i18n[Z.lang], W("onThemeLoad", [U, a]), d(Z, J, U, b, a), Q = v.presets[ne._class][Z.preset], Z.buttons = Z.buttons || ("inline" !== Z.display ? ["set", "cancel"] : []), Z.headerText = Z.headerText === s ? "inline" !== Z.display ? "{value}" : !1 : Z.headerText, Q && (Q = Q.call(i, ne), d(Z, Q, a)), v.themes[Z.theme] || (Z.theme = "mobiscroll"), ne._isLiquid = "liquid" === (Z.layout || (/top|bottom/.test(Z.display) ? "liquid" : "")), ne._processSettings(), se.off(".dw"), H = C ? !1 : Z.animate, F = Z.buttons, R = "inline" !== Z.display, G = Z.showOnFocus || Z.showOnTap, q = e("body" == Z.context ? t : Z.context), S = e(Z.context), ne.context = q, ne.live = !0, e.each(F, function(e, t) {
                    return "set" === t || "set" === t.handler ? (ne.live = !1, !1) : void 0
                }), ne.buttons.set = {
                    text: Z.setText,
                    handler: "set"
                }, ne.buttons.cancel = {
                    text: ne.live ? Z.closeText : Z.cancelText,
                    handler: "cancel"
                }, ne.buttons.clear = {
                    text: Z.clearText,
                    handler: "clear"
                }, ne._isInput = se.is("input"), z = F.length > 0, ne._isVisible && ne.hide(!0, !1, !0), R ? (ne._readValue(), ne._isInput && G && (K === s && (K = i.readOnly), i.readOnly = !0), ne.attachShow(se)) : ne.show(), se.on("change.dw", function() {
                    ne._preventChange || ne.setVal(se.val(), !0, !1), ne._preventChange = !1
                }), W("onInit", [])
            }, ne.buttons = {}, ne.handlers = {
                set: ne.select,
                cancel: ne.cancel,
                clear: ne.clear
            }, ne._value = null, ne._isValid = !0, o || (r[i.id] = ne, ne.init(a))
        }, v.classes.Widget.prototype._defaults = {
            lang: "en",
            setText: "Set",
            selectedText: "Selected",
            closeText: "Close",
            cancelText: "Cancel",
            clearText: "Clear",
            disabled: !1,
            closeOnOverlay: !0,
            showOnFocus: !0,
            showOnTap: !0,
            display: "modal",
            scrollLock: !0,
            tap: !0,
            btnClass: "dwb",
            btnWidth: !0,
            focusOnClose: !1
        }, v.themes.mobiscroll = {
            rows: 3,
            showLabel: !1,
            headerText: !1,
            btnWidth: !1,
            selectedLineHeight: !0,
            selectedLineBorder: 1,
            dateOrder: "MMddyy",
            weekDays: "min",
            checkIcon: "ion-ios7-checkmark-empty",
            btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
            btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
            btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
            btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
        }, e(t).on("focus", function() {
            w && (m = !0)
        }), e(n).on("mouseover mouseup mousedown click", function(e) {
            return v.tapped ? (e.stopPropagation(), e.preventDefault(), !1) : void 0
        }), e.mobiscroll.themes["android-holo-light"] = {
            dateOrder: "Mddyy",
            rows: 5,
            minWidth: 76,
            height: 36,
            showLabel: !1,
            selectedLineHeight: !0,
            selectedLineBorder: 2,
            useShortLabels: !0,
            icon: {
                filled: "star3",
                empty: "star"
            },
            btnPlusClass: "mbsc-ic mbsc-ic-arrow-down6",
            btnMinusClass: "mbsc-ic mbsc-ic-arrow-up6",
            onMarkupReady: function(e) {
                e.addClass("mbsc-android-holo")
            }
        }, e.mobiscroll.themes.listview["android-holo-light"] = {
            onInit: function() {
                e(this).closest(".mbsc-lv-cont").addClass("mbsc-lv-android-holo")
            }
        }, e.mobiscroll.themes.menustrip["android-holo-light"] = {
            onMarkupReady: function(e) {
                e.addClass("mbsc-android-holo")
            }
        }, e.mobiscroll.i18n.zh = e.extend(e.mobiscroll.i18n.zh, {
            setText: "确定",
            cancelText: "取消",
            clearText: "明确",
            selectedText: "选",
            dateFormat: "yy/mm/dd",
            dateOrder: "yymmdd",
            dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            dayText: "日",
            hourText: "时",
            minuteText: "分",
            monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            monthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
            monthText: "月",
            secText: "秒",
            timeFormat: "HH:ii",
            timeWheels: "HHii",
            yearText: "年",
            nowText: "当前",
            pmText: "下午",
            amText: "上午",
            dateText: "日",
            timeText: "时间",
            calendarText: "日历",
            closeText: "关闭",
            fromText: "开始时间",
            toText: "结束时间",
            wholeText: "合计",
            fractionText: "分数",
            unitText: "单位",
            labels: ["年", "月", "日", "小时", "分钟", "秒", ""],
            labelsShort: ["年", "月", "日", "点", "分", "秒", ""],
            startText: "开始",
            stopText: "停止",
            resetText: "重置",
            lapText: "圈",
            hideText: "隐藏"
        });
        var k, v = e.mobiscroll,
            W = v.classes,
            r = v.instances,
            y = v.util,
            p = y.jsPrefix,
            u = y.has3d,
            h = y.hasFlex,
            g = y.getCoord,
            x = y.constrain,
            O = y.testTouch;
        W.Scroller = function(t, i, a) {
            function o(t) {
                !O(t, this) || k || N || j || _(this) || (t.preventDefault(), t.stopPropagation(), k = !0, H = "clickpick" != R.mode, J = e(".dw-ul", this), T(J), B = ie[K] !== s, Z = B ? M(J) : ae[K], Y = g(t, "Y"), Q = new Date, X = Y, A(J, K, Z, .001), H && J.closest(".dwwl").addClass("dwa"), "mousedown" === t.type && e(n).on("mousemove", l).on("mouseup", d))
            }
            function l(e) {
                k && H && (e.preventDefault(), e.stopPropagation(), X = g(e, "Y"), (Math.abs(X - Y) > 3 || B) && (A(J, K, x(Z + (Y - X) / z, $ - 1, G + 1)), B = !0))
            }
            function d(t) {
                if (k) {
                    var s, i, a, o = new Date - Q,
                        r = x(Z + (Y - X) / z, $ - 1, G + 1),
                        c = J.offset().top;
                    if (t.stopPropagation(), u && 300 > o ? (s = (X - Y) / o, i = s * s / R.speedUnit, 0 > X - Y && (i = -i)) : i = X - Y, a = Math.round(Z - i / z), !B) {
                        var h = Math.floor((X - c) / z),
                            f = e(e(".dw-li", J)[h]),
                            p = f.hasClass("dw-v"),
                            w = H;
                        U("onValueTap", [f]) !== !1 && p ? a = h : w = !0, w && p && (f.addClass("dw-hl"), setTimeout(function() {
                            f.removeClass("dw-hl")
                        }, 100))
                    }
                    H && P(J, a, 0, !0, Math.round(r)), "mouseup" === t.type && e(n).off("mousemove", l).off("mouseup", d), k = !1
                }
            }
            function c(t) {
                j = e(this), O(t, this) && b(t, j.closest(".dwwl"), j.hasClass("dwwbp") ? I : q), "mousedown" === t.type && e(n).on("mouseup", f)
            }
            function f(t) {
                alert(2), j = null, N && (clearInterval(te), N = !1), "mouseup" === t.type && e(n).off("mouseup", f)
            }
            function w(t) {
                38 == t.keyCode ? b(t, e(this), q) : 40 == t.keyCode && b(t, e(this), I)
            }
            function m() {
                N && (clearInterval(te), N = !1)
            }
            function v(t) {
                if (!_(this)) {
                    t.preventDefault(), t = t.originalEvent || t;
                    var n = t.wheelDelta ? t.wheelDelta / 120 : t.detail ? -t.detail / 3 : 0,
                        s = e(".dw-ul", this);
                    T(s), P(s, Math.round(ae[K] - n), 0 > n ? 1 : 2)
                }
            }
            function b(e, t, n) {
                if (e.stopPropagation(), e.preventDefault(), !N && !_(t) && !t.hasClass("dwa")) {
                    N = !0;
                    var s = t.find(".dw-ul");
                    T(s), clearInterval(te), te = setInterval(function() {
                        n(s)
                    }, R.delay), n(s)
                }
            }
            function _(t) {
                if (e.isArray(R.readonly)) {
                    var n = e(".dwwl", F).index(t);
                    return R.readonly[n]
                }
                return R.readonly
            }
            function C(t) {
                var n = '<div class="dw-bf">',
                    s = le[t],
                    i = 1,
                    a = s.labels || [],
                    o = s.values,
                    l = s.keys || o,
                    r = s.datas ? s.datas : "",
                    d = s.codes ? s.codes : "";
                return e.each(o, function(e, t) {
                    i % 20 === 0 && (n += '</div><div class="dw-bf">'), n += '<div role="option" aria-selected="false" class="dw-li dw-v" data-code="' + ("" == d ? "" : d[e]) + '" data-show="' + ("" == r ? "" : r[e]) + '"data-val="' + l[e] + '"' + (a[e] ? ' aria-label="' + a[e] + '"' : "") + ' style="height:' + z + "px;line-height:" + z + 'px;"><div class="dw-i"' + (ee > 1 ? ' style="line-height:' + Math.round(z / ee) + "px;font-size:" + Math.round(z / ee * .8) + 'px;"' : "") + ">" + t + "</div></div>", i++
                }), n += "</div>"
            }
            function T(t) {
                var n = t.closest(".dwwl").hasClass("dwwms");
                $ = e(".dw-li", t).index(e(n ? ".dw-li" : ".dw-v", t).eq(0)), G = Math.max($, e(".dw-li", t).index(e(n ? ".dw-li" : ".dw-v", t).eq(-1)) - (n ? R.rows - 1 : 0)), K = e(".dw-ul", F).index(t)
            }
            function V(e) {
                var n = R.headerText;
                return n ? "function" == typeof n ? n.call(t, e) : n.replace(/\{value\}/i, e) : ""
            }
            function M(e) {
                return Math.round(-y.getPosition(e, !0) / z)
            }
            function S(e, t) {
                clearTimeout(ie[t]), delete ie[t], e.closest(".dwwl").removeClass("dwa")
            }
            function A(e, t, n, s, i) {
                var a = -n * z,
                    o = e[0].style;
                a == oe[t] && ie[t] || (oe[t] = a, u ? (o[p + "Transition"] = y.prefix + "transform " + (s ? s.toFixed(3) : 0) + "s ease-out", o[p + "Transform"] = "translate3d(0," + a + "px,0)") : o.top = a + "px", ie[t] && S(e, t), s && i && (e.closest(".dwwl").addClass("dwa"), ie[t] = setTimeout(function() {
                    S(e, t)
                }, 1e3 * s)), ae[t] = n)
            }
            function L(t, n, s, i) {
                var a = e('.dw-li[data-val="' + t + '"]', n),
                    o = e(".dw-li", n),
                    l = o.index(a),
                    r = o.length;
                if (i) T(n);
                else if (!a.hasClass("dw-v")) {
                    for (var d = a, c = a, u = 0, h = 0; l - u >= 0 && !d.hasClass("dw-v");) u++, d = o.eq(l - u);
                    for (; r > l + h && !c.hasClass("dw-v");) h++, c = o.eq(l + h);
                    (u > h && h && 2 !== s || !u || 0 > l - u || 1 == s) && c.hasClass("dw-v") ? (a = c, l += h) : (a = d, l -= u)
                }
                return {
                    cell: a,
                    v: i ? x(l, $, G) : l,
                    val: a.hasClass("dw-v") ? a.attr("data-val") : null
                }
            }
            function D(t, n, i, a, o) {
                U("validate", [F, n, t, a]) !== !1 && (e(".dw-ul", F).each(function(i) {
                    var l = e(this),
                        r = l.closest(".dwwl").hasClass("dwwms"),
                        d = i == n || n === s,
                        c = L(ne._tempWheelArray[i], l, a, r),
                        u = c.cell;
                    u.hasClass("dw-sel") && !d || (ne._tempWheelArray[i] = c.val, r || (e(".dw-sel", l).removeAttr("aria-selected"), u.attr("aria-selected", "true")), e(".dw-sel", l).removeClass("dw-sel"), u.addClass("dw-sel"), A(l, i, c.v, d ? t : .1, d ? o : !1))
                }), ne._tempValue = R.formatResult(ne._tempWheelArray), ne.live && (ne._hasValue = i || ne._hasValue, E(i, i, 0, !0)), ne._header.html(V(ne._tempValue)), i && U("onChange", [ne._tempValue]), U("onValidated", []))
            }
            function P(t, n, i, a, o) {
                n = x(n, $, G);
                var l = e(".dw-li", t).eq(n),
                    r = o === s ? n : o,
                    d = o !== s,
                    c = K,
                    u = Math.abs(n - r),
                    h = a ? n == r ? .1 : u * R.timeUnit * Math.max(.5, (100 - u) / 100) : 0;
                ne._tempWheelArray[c] = l.attr("data-val"), A(t, c, n, h, d), setTimeout(function() {
                    D(h, c, !0, i, d)
                }, 10)
            }
            function I(e) {
                var t = ae[K] + 1;
                P(e, t > G ? $ : t, 1, !0)
            }
            function q(e) {
                var t = ae[K] - 1;
                P(e, $ > t ? G : t, 2, !0)
            }
            function E(e, t, n, s, i) {
                if (ne._isVisible && !s && D(n), ne._tempValue = R.formatResult(ne._tempWheelArray), y.isNumeric(ne._tempValue) && (ne._tempValue = +ne._tempValue), i || (ne._wheelArray = ne._tempWheelArray.slice(0), ne._value = ne._hasValue ? ne._tempValue : null), e) {
                    U("onValueFill", [ne._hasValue ? ne._tempValue : "", t]);
                    if (ne._isInput) se.val(ne._hasValue ? ne._tempValue : ""), t && (ne._preventChange = !0, se.change());
                    else {
                        var a = ne._hasValue ? ne._tempValue + "" : "";
                        a && (a.indexOf("-") > -1 || a.indexOf("/") > -1) && "-1" != a && (se.html(a), se.next().val(a)), t && (ne._preventChange = !0, se.change())
                    }
                }
            }
            var F, j, H, z, R, U, N, B, Y, Q, X, Z, $, G, J, K, ee, te, ne = this,
                se = e(t),
                ie = {},
                ae = {},
                oe = {},
                le = [];
            W.Widget.call(this, t, i, !0), ne.setVal = ne._setVal = function(n, i, a, o, l) {
                ne._hasValue = null !== n && n !== s, ne._tempWheelArray = e.isArray(n) ? n.slice(0) : R.parseValue.call(t, n, ne), E(i, a === s ? i : a, l, !1, o)
            }, ne.getVal = ne._getVal = function(e) {
                return ne._hasValue ? ne[e ? "_tempValue" : "_value"] : null
            }, ne.setArrayVal = ne.setVal, ne.getArrayVal = function(e) {
                return e ? ne._tempWheelArray : ne._wheelArray
            }, ne.setValue = function(e, t, n, s, i) {
                ne.setVal(e, t, i, s, n)
            }, ne.getValue = ne.getArrayVal, ne.changeWheel = function(t, n, i) {
                if (F) {
                    var a = 0,
                        o = t.length;
                    e.each(R.wheels, function(l, r) {
                        return e.each(r, function(l, r) {
                            return e.inArray(a, t) > -1 && (le[a] = r, e(".dw-ul", F).eq(a).html(C(a)), o--, !o) ? (ne.position(), D(n, s, i), !1) : void a++
                        }), o ? void 0 : !1
                    })
                }
            }, ne.getValidCell = L, ne._generateContent = function() {
                var t, n = "",
                    i = 0;
                return e.each(R.wheels, function(a, o) {
                    n += '<div class="mbsc-w-p dwc' + ("scroller" != R.mode ? " dwpm" : " dwsc") + (R.showLabel ? "" : " dwhl") + '"><div class="dwwc"' + (R.maxWidth ? "" : ' style="max-width:600px;"') + ">" + (h ? "" : '<table class="dw-tbl" cellpadding="0" cellspacing="0"><tr>'), e.each(o, function(e, a) {
                        le[i] = a, t = a.label !== s ? a.label : e, n += "<" + (h ? "div" : "td") + ' class="dwfl" style="' + (R.fixedWidth ? "width:" + (R.fixedWidth[i] || R.fixedWidth) + "px;" : (R.minWidth ? "min-width:" + (R.minWidth[i] || R.minWidth) + "px;" : "min-width:" + R.width + "px;") + (R.maxWidth ? "max-width:" + (R.maxWidth[i] || R.maxWidth) + "px;" : "")) + '"><div class="dwwl dwwl' + i + (a.multiple ? " dwwms" : "") + '">' + ("scroller" != R.mode ? '<div class="dwb-e dwwb dwwbp ' + (R.btnPlusClass || "") + '" style="height:' + z + "px;line-height:" + z + 'px;"><span>+</span></div><div class="dwb-e dwwb dwwbm ' + (R.btnMinusClass || "") + '" style="height:' + z + "px;line-height:" + z + 'px;"><span>&ndash;</span></div>' : "") + '<div class="dwl">' + t + '</div><div tabindex="0" aria-live="off" aria-label="' + t + '" role="listbox" class="dwww"><div class="dww" style="height:' + R.rows * z + 'px;"><div class="dw-ul" style="margin-top:' + (a.multiple ? 0 : R.rows / 2 * z - z / 2) + 'px;">', n += C(i) + '</div></div><div class="dwwo"></div></div><div class="dwwol"' + (R.selectedLineHeight ? ' style="height:' + z + "px;margin-top:-" + (z / 2 + (R.selectedLineBorder || 0)) + 'px;"' : "") + "></div></div>" + (h ? "</div>" : "</td>"), i++
                    }), n += (h ? "" : "</tr></table>") + "</div></div>"
                }), n
            }, ne._attachEvents = function(e) {
                e.on("DOMMouseScroll mousewheel", ".dwwl", v).on("keydown", ".dwwl", w).on("keyup", ".dwwl", m).on("touchstart mousedown", ".dwwl", o).on("touchmove", ".dwwl", l).on("touchend", ".dwwl", d).on("touchstart mousedown", ".dwwb", c).on("touchend", ".dwwb", f)
            }, ne._markupReady = function() {
                F = ne._markup, D()
            }, ne._fillValue = function() {
                ne._hasValue = !0, E(!0, !0, 0, !0)
            }, ne._readValue = function() {
                var e = se.val() || "";
                ne._hasValue = "" !== e, ne._tempWheelArray = ne._wheelArray ? ne._wheelArray.slice(0) : R.parseValue(e, ne), E()
            }, ne._processSettings = function() {
                R = ne.settings, U = ne.trigger, z = R.height, ee = R.multiline, ne._isLiquid = "liquid" === (R.layout || (/top|bottom/.test(R.display) && 1 == R.wheels.length ? "liquid" : "")), ee > 1 && (R.cssClass = (R.cssClass || "") + " dw-ml")
            }, ne._selectedValues = {}, a || (r[t.id] = ne, ne.init(i))
        }, W.Scroller.prototype._class = "scroller", W.Scroller.prototype._defaults = e.extend({}, W.Widget.prototype._defaults, {
            minWidth: 80,
            height: 40,
            rows: 3,
            multiline: 1,
            delay: 300,
            readonly: !1,
            showLabel: !0,
            wheels: [],
            mode: "scroller",
            preset: "",
            speedUnit: .0012,
            timeUnit: .08,
            formatResult: function(e) {
                return e.join(" ")
            },
            parseValue: function(t, n) {
                var s, i = t.split(" "),
                    a = [],
                    o = 0;
                return e.each(n.settings.wheels, function(t, n) {
                    e.each(n, function(t, n) {
                        s = n.keys || n.values, -1 !== e.inArray(i[o], s) ? a.push(i[o]) : a.push(s[0]), o++
                    })
                }), a
            }
        })
    }(jQuery, window, document);