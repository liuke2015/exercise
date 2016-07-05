(function($, undefined) {
        var ms = $.mobiscroll
            , presets = ms.presets.scroller;
        presets.treelist = presets.list;
        ms.presetShort("list");
        ms.presetShort("treelist");
        var ms = $.mobiscroll
            , defaults = {
                invalid: [],
                showInput: true,
                inputClass: ""
            };
        ms.presets.scroller.list = function(inst) {
            var orig = $.extend({}, inst.settings), s = $.extend(inst.settings, defaults, orig), layout = s.layout || (/top|bottom/.test(s.display) ? "liquid" : ""), isLiquid = layout == "liquid", origReadOnly = s.readonly, elm = $(this), input, prevent, id = this.id + "_dummy", spanText = elm.attr("text_show"), cascadeLevel = elm.attr("cascade-level"), lvl = 0, ilvl = 0, timer = {}, labels = generateLabels(lvl), currLevel = 1, currWheelVector = [];
            inst.wa = s.wheelArray || createWheelArray(elm),
                fwv = firstWheelVector(inst.wa),
                w = generateWheelsFromVector(fwv, lvl);
            function setDisabled(dw, nrWheels, whArray, whVector) {
                var j, i = 0;
                while (i < nrWheels) {
                    var currWh = $(".dwwl" + i, dw)
                        , inv = getInvalidKeys(whVector, i, whArray);
                    for (j = 0; j < inv.length; j++) {
                        $('.dw-li[data-val="' + inv[j] + '"]', currWh).removeClass("dw-v")
                    }
                    i++
                }
            }
            function getInvalidKeys(whVector, index, whArray) {
                var i = 0, n, whObjA = whArray, invalids = [];
                while (i < index) {
                    var ii = whVector[i];
                    for (n in whObjA) {
                        if (whObjA[n].key == ii) {
                            whObjA = whObjA[n].children;
                            break
                        }
                    }
                    i++
                }
                i = 0;
                while (i < whObjA.length) {
                    if (whObjA[i].invalid) {
                        invalids.push(whObjA[i].key)
                    }
                    i++
                }
                return invalids
            }
            function createROVector(n, i) {
                var a = [];
                while (n) {
                    a[--n] = true
                }
                a[i] = false;
                return a
            }
            function generateLabels(l) {
                var a = [], i;
                for (i = 0; i < l; i++) {
                    a[i] = s.labels && s.labels[i] ? s.labels[i] : i
                }
                return a
            }
            function generateWheelsFromVector(wv, l, index) {
                var i = 0, j, obj, chInd, w = [[]];
                var level = parseInt(cascadeLevel);
                if (level == 2) {
                    var wtObjA = inst.wa;
                    l = level;
                    var hIndex = wv[0];
                    var children = createWheelArray(elm.eq(0).children("li").eq(hIndex).children("ul"));
                    wtObjA[hIndex].children = children;
                    wv.length = l
                } else {
                    if (level == 3) {
                        var wtObjA = inst.wa;
                        l = level;
                        var fIndex = wv[0];
                        if (window.firstIndex && window.firstIndex != fIndex) {
                            var sIndex = 0;
                            var tIndex = 0
                        } else {
                            var sIndex = wv[1] ? wv[1] : 0;
                            var tIndex = wv[2] ? wv[2] : 0
                        }
                        window.firstIndex = fIndex;
                        var children = createWheelArray(elm.eq(0).children("li").eq(fIndex).children("ul"));
                        wtObjA[fIndex].children = children;
                        var children2 = createWheelArray(elm.eq(0).children("li").eq(fIndex).children("ul").eq(0).children("li").eq(sIndex).children("ul"));
                        wtObjA[fIndex].children[sIndex].children = children2;
                        wv.length = l
                    }
                }
                if (l) {
                    for (j = 0; j < l; j++) {
                        if (isLiquid) {
                            w[0][j] = {}
                        } else {
                            w[j] = [{}]
                        }
                    }
                }
                while (i < wv.length) {
                    if (isLiquid) {
                        w[0][i] = getWheelFromObjA(wtObjA, labels[i])
                    } else {
                        w[i] = [getWheelFromObjA(wtObjA, labels[i])]
                    }
                    j = 0;
                    chInd = undefined;
                    while (j < wtObjA.length && chInd === undefined) {
                        if (wtObjA[j].key == wv[i] && ((index !== undefined && i <= index) || index === undefined)) {
                            chInd = j
                        }
                        j++
                    }
                    if (chInd !== undefined && wtObjA[chInd].children) {
                        i++;
                        wtObjA = wtObjA[chInd].children
                    } else {
                        if ((obj = getFirstValidItemObjOrInd(wtObjA)) && obj.children) {
                            i++;
                            wtObjA = obj.children
                        } else {
                            return w
                        }
                    }
                }
                return w
            }
            function getFirstValidItemObjOrInd(wtObjA, getInd) {
                if (!wtObjA) {
                    return false
                }
                var i = 0, obj;
                while (i < wtObjA.length) {
                    if (!(obj = wtObjA[i++]).invalid) {
                        return getInd ? i - 1 : obj
                    }
                }
                return false
            }
            function getWheelFromObjA(objA, lbl) {
                var wheel = {
                        keys: [],
                        values: [],
                        label: lbl,
                        datas: [],
                        codes: []
                    }
                    , j = 0;
                while (j < objA.length) {
                    wheel.values.push(objA[j].value.split(":")[0]);
                    wheel.keys.push(objA[j].key);
                    wheel.datas.push(objA[j].value.split(":")[0]);
                    wheel.codes.push(objA[j].value.split(":")[1]);
                    j++
                }
                return wheel
            }
            function hideWheels(dw, i) {
                $(".dwfl", dw).css("display", "").slice(i).hide()
            }
            function firstWheelVector(wa) {
                var t = [], ndObjA = wa, obj, ok = true, i = 0;
                while (ok) {
                    obj = getFirstValidItemObjOrInd(ndObjA);
                    t[i] = obj.key;
                    ok = obj.children;
                    if (ok) {
                        ndObjA = ok
                    }
                    i++
                }
                return t
            }
            function calcLevelOfVector2(wv, index) {
                var t = [], ndObjA = inst.wa, lvl = 0, next = false, i, childName, chInd;
                if (wv[lvl] !== undefined && lvl <= index) {
                    i = 0;
                    childName = wv[lvl];
                    chInd = undefined;
                    while (i < ndObjA.length && chInd === undefined) {
                        if (ndObjA[i].key == wv[lvl] && !ndObjA[i].invalid) {
                            chInd = i
                        }
                        i++
                    }
                } else {
                    chInd = getFirstValidItemObjOrInd(ndObjA, true);
                    childName = ndObjA[chInd].key
                }
                next = chInd !== undefined ? ndObjA[chInd].children : false;
                t[lvl] = childName;
                while (next) {
                    ndObjA = ndObjA[chInd].children;
                    lvl++;
                    next = false;
                    chInd = undefined;
                    if (wv[lvl] !== undefined && lvl <= index) {
                        i = 0;
                        childName = wv[lvl];
                        chInd = undefined;
                        while (i < ndObjA.length && chInd === undefined) {
                            if (ndObjA[i].key == wv[lvl] && !ndObjA[i].invalid) {
                                chInd = i
                            }
                            i++
                        }
                    } else {
                        chInd = getFirstValidItemObjOrInd(ndObjA, true);
                        chInd = chInd === false ? undefined : chInd;
                        childName = ndObjA[chInd].key
                    }
                    next = chInd !== undefined && getFirstValidItemObjOrInd(ndObjA[chInd].children) ? ndObjA[chInd].children : false;
                    t[lvl] = childName
                }
                return {
                    lvl: lvl + 1,
                    nVector: t
                }
            }
            function createWheelArray(ul) {
                var wheelArray = [];
                lvl = lvl > ilvl++ ? lvl : ilvl;
                var liList = ul.children("li");
                ul.children("li").each(function(index) {
                        var that = $(this)
                            , c = that.clone();
                        c.children("ul,ol").remove();
                        var v = inst._processMarkup ? inst._processMarkup(c) : c.html().replace(/^\s\s*/, "").replace(/\s\s*$/, "")
                            , inv = that.attr("data-invalid") ? true : false
                            , wheelObj = {
                                key: that.attr("data-val") === undefined || that.attr("data-val") === null  ? index : that.attr("data-val"),
                                value: v,
                                invalid: inv,
                                children: null
                            };
                        wheelArray.push(wheelObj)
                    }
                );
                ilvl--;
                return wheelArray
            }
            $("#" + id).remove();
            if (s.showInput) {
                input = $("#" + spanText);
                var firstInput = $("#" + elm.attr("first_name"));
                var secondInput = $("#" + elm.attr("second_name"));
                s.anchor = input;
                inst.attachShow(input)
            }
            if (!s.wheelArray) {
                elm.hide().closest(".ui-field-contain").trigger("create")
            }
            return {
                width: 50,
                wheels: w,
                layout: layout,
                headerText: false,
                formatResult: function(d) {
                    return d.slice(0, currLevel).join(" ")
                },
                parseValue: function(value) {
                    var value = value ? (value + "").split(" ") : (s.defaultValue || fwv).slice(0);
                    return value
                },
                onBeforeShow: function() {
                    var t = inst.getArrayVal(true);
                    currWheelVector = t.slice(0);
                    s.wheels = generateWheelsFromVector(t, lvl, lvl);
                    prevent = true
                },
                onValueFill: function(v, change) {
                    if (input) {
                        var html = "";
                        var sel = $(".dw-sel");
                        var areCode = 0;
                        var secondCode = 0;
                        var arr = v.split(" ");
                        if (sel.length == 0) {
                            var firstLi = $("#" + this.id).children("li")[arr[0]];
                            html = html + firstLi.innerText.split(":")[0];
                            if (arr.length == 2) {
                                var lastLi = $(firstLi).children("ul").children("li")[arr[1]];
                                html = html + lastLi.innerText.split(":")[0];
                                areCode = lastLi.innerText.split(":")[1]
                            } else {
                                var secondLi = $(firstLi).children("ul").children("li")[arr[1]];
                                html = html + secondLi.innerText.split(":")[0];
                                var lastLi = $(secondLi).children("ul").children("li")[arr[1]];
                                html = html + lastLi.innerText.split(":")[0];
                                areCode = lastLi.innerText.split(":")[1]
                            }
                        } else {
                            if (cascadeLevel == 2) {
                                areCode = sel[0].getAttribute("data-code");
                                areCode = parseInt(areCode);
                                secondCode = sel[arr.length - 1].getAttribute("data-code");
                                secondCode = parseInt(secondCode);
                                var h1 = sel.eq(0).children().html();
                                var h2 = sel.eq(1).children().html();
                                if (areCode == "-1") {
                                    if (secondCode != "-1") {
                                        html = sel[1].getAttribute("data-show") + "以下"
                                    } else {
                                        html = h1
                                    }
                                } else {
                                    if (secondCode == "-1") {
                                        if (h2 == "不限") {
                                            html = sel[0].getAttribute("data-show") + "以上"
                                        } else {
                                            html = h1
                                        }
                                    } else {
                                        html = h1 + " " + h2
                                    }
                                }
                            } else {
                                for (var i = 0, l = arr.length; i < l; i++) {
                                    if (sel[i].getAttribute("data-code") != "-1") {
                                        html += sel[i].getAttribute("data-show") + " ";
                                        areCode = sel[i].getAttribute("data-code")
                                    } else {
                                        if (i > 0) {
                                            areCode = sel[i - 1].getAttribute("data-code")
                                        } else {
                                            areCode = sel[i].getAttribute("data-code");
                                            html += sel[i].getAttribute("data-show") + " "
                                        }
                                        break
                                    }
                                }
                            }
                        }
                        input.html(html);
                        if (secondInput && secondInput.length > 0) {
                            firstInput.val(areCode);
                            secondInput.val(secondCode)
                        } else {
                            if (secondCode == 0 || secondCode == -1) {
                                firstInput.val(areCode)
                            } else {
                                firstInput.val(secondCode)
                            }
                        }
                        if (firstInput && firstInput.length > 0) {
                            firstInput.attr("arrIndex", v)
                        } else {
                            if (secondInput && secondInput.length > 0) {
                                secondInput.attr("arrIndex", v)
                            }
                        }
                    }
                    if (change) {
                        inst._preventChange = true;
                        elm.change()
                    }
                },
                onShow: function(dw) {
                    $(".dwwl", dw).on("mousedown touchstart", function() {
                            clearTimeout(timer[$(".dwwl", dw).index(this)])
                        }
                    )
                },
                onDestroy: function() {
                    elm.removeClass("dw-hsel").removeAttr("tabindex")
                },
                validate: function(dw, index, time) {
                    var args = [], t = inst.getArrayVal(true), i = (index || 0) + 1, j, o;
                    if ((index !== undefined && currWheelVector[index] != t[index]) || (index === undefined && !prevent)) {
                        s.wheels = generateWheelsFromVector(t, null , index);
                        o = calcLevelOfVector2(t, index === undefined ? t.length : index);
                        currLevel = o.lvl;
                        for (j = 0; j < t.length; j++) {
                            t[j] = o.nVector[j] || 0
                        }
                        while (i < o.lvl) {
                            args.push(i++)
                        }
                        if (args.length) {
                            s.readonly = createROVector(lvl, index);
                            clearTimeout(timer[index]);
                            timer[index] = setTimeout(function() {
                                    prevent = true;
                                    hideWheels(dw, o.lvl);
                                    currWheelVector = t.slice(0);
                                    inst.changeWheel(args, index === undefined ? time : 0, index !== undefined);
                                    s.readonly = origReadOnly
                                }
                                , index === undefined ? 0 : time * 1000);
                            return false
                        }
                    } else {
                        o = calcLevelOfVector2(t, t.length);
                        currLevel = o.lvl
                    }
                    currWheelVector = t.slice(0);
                    setDisabled(dw, o.lvl, inst.wa, t);
                    hideWheels(dw, o.lvl);
                    prevent = false
                }
            }
        }
        ;
        var ms = $.mobiscroll
            , presets = ms.presets.scroller;
        presets.treelist = presets.list;
        ms.presetShort("list")
    }
)(jQuery);
