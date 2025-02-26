var zfem_cons = {
    identifiedVisitor: !1,
    setDisableWidgets: !1,
    disableTracking: false,
    baseSurveyUrl: 'https://us1.zonka.co',
    webSurveyCDNAssetsUrl: 'https://us1.zonka.co/assets',
    backendApiBaseUrl: 'https://us1.zonkafeedback.com/api/v1',
    apiGatewayBaseUrl: 'https://us1.apis.zonkafeedback.com',
    cdnImgBaseSrc: "https://zonkafeedback-gallery.s3.amazonaws.com/img_gallery/",
    wsId: '679b6f226131b4000836e0bf',
    cmpId: '679b6f226131b4000836e0b6',
    detectedLang: "",
    availableLanguages: "af_ZA,ar_AE,az_AZ,bg_BG,bn_IN,cs_CZ,cy_GB,da_DA,de_DE,dv_MV,en_US,es_ES,es_US,fi_FI,fr_CA,fr_FR,ga_IE,gu_IN,he_IL,hi_IN,hmn_HMN,hr_HR,ht_FR,hu_HU,id_ID,it_IT,ja_JA,kn_IN,ko_KO,ml_IN,mr_IN,ms_MS,my_MM,nb_NB,ne_NP,nl_NL,or_IN,pa_IN,pl_PL,pt_BR,pt_PT,ro_RO,ru_RU,so_SO,sr_RS,sv_SV,ta_IN,te_IN,th_TH,tr_TR,uk_UA,vi_VN,yue_CN,zh_CN,zh_TW",
    workspaceDistrbutions: {
        "buttonWidgets": [],
        "articleWidgets": [],
        "bottomBarWidgets": [{
            "_id": "67b2f6441fc7b10008269302",
            "type": "bottomBar",
            "allowMultipleResponsesFromSameDevice": true,
            "endDate": null,
            "customerEndDate": null,
            "startDate": null,
            "customerStartDate": null,
            "name": "Bottom Bar",
            "uniqueRefCode": "FxM6j1",
            "surveyId": "67b2f5d91fc7b10008268dd2",
            "embedSettings": {
                "embedType": "popover",
                "type": "bottomBar",
                "button_text_color": "#ffffff",
                "button_bg_color": "#000000",
                "button_position": "right",
                "variant": "micro",
                "button_text": "Feedback",
                "button_text_languages": {
                    "en_US": "Feedback"
                },
                "left_padding": "12",
                "right_padding": "3",
                "bottom_padding": "5",
                "trigger": {
                    "after": 0,
                    "scroll": 0,
                    "url": [],
                    "keywords": "",
                    "manualTrigger": false,
                    "regexExpressions": []
                },
                "devices": {
                    "desktop": true,
                    "tablet": true,
                    "mobile": true
                },
                "appearance": 0,
                "visibleTill": "always",
                "welcomescreen": false,
                "logo": true,
                "progress": false,
                "autoclose": true,
                "showNavigation": true,
                "closeButInside": false,
                "includeSegmentConditions": [],
                "excludeSegmentConditions": [],
                "enableMicroWidget": true
            }
        }],
        "sideTabWidgets": [],
        "autoWidgets": [],
        "companyId": "679b6f226131b4000836e0b6"
    },
    sourceUrl: String(window.location),
    widgetVariant: "large",
    widgetCloseBgColor: "#000000",
    widgetCloseFontColor: "#ffffff",
    enableMicroWidget: !1,
    autoclose: !0,
    deviceType: _zfDetectDevice(),
    arrAppearanceCookie: [],
    arrVisibleSurveyCookie: [],
    arrSubmitSurveyCookie: [],
    scrollExists: document.body.scrollHeight > document.body.clientHeight || document.documentElement.scrollHeight > document.documentElement.clientHeight || _zfCheckVerticalScrollExist(),
    clientPageHeight: document.body.clientHeight < document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight,
    closeEvent: new CustomEvent("onClose"),
    openEvent: new CustomEvent("onOpen"),
    submitEvent: new CustomEvent("onSubmit"),
    popupPostMessageHandler: null,
    buttonPostMessageHandler: null,
    sideTabPostMessageHandler: null,
    slideUpPostMessageHandler: null,
    bottomBarPostMessageHandler: null,
    arrDisributionsInfo: [],
    arrButtonEmbeds: [],
    arrArticleEmbeds: [],
    arrPopupEmbeds: [],
    arrSlideupEmbeds: [],
    arrSidetabEmbeds: [],
    arrBottombarEmbeds: [],
    iframeWidth: "800px",
    iframeHeight: "500px",
    defaultEmbedSettings: {
        type: "embed",
        trigger: {
            after: 0,
            scroll: 0,
            url: [],
            keywords: ""
        },
        devices: {
            desktop: !0,
            tablet: !0,
            mobile: !0
        },
        appearance: 0,
        visibleTill: "always",
        welcomescreen: !0,
        logo: !0,
        progress: !1,
        autoclose: !0
    },
    visCId: "zfm_cnt_ck_id",
    usrSessCookieId: "zfm_usr_sess_ck_id",
    visitorLStorage: [],
    onSamePage: !0,
    onPageTimeCount: 0,
    oneSessionMinCount: 10,
    refreshSessCookieTime: .2,
    widgetRunning: !1,
    dismissEventAvilable: !0,
    customPageTitle: "",
    customPagePath: "",
    debugMode: !1,
    resetUser: !1,
    conCreatKeys: ["email", "mobile", "uniqueId", "contact_email", "contact_mobile", "contact_name"],
    temporaryBlockTracking: !1,
    localStorageDataSaved: "",
    localStorageSavedDataObject: {},
    urlParams: null,
    foundTrackingArgument: null,
    foundResetArgument: null,
    foundPageTrackingArgument: null,
    previousUrl: location.href,
    observerconfig: {
        subtree: !0,
        childList: !0
    },
    sideTabInitiated: !1,
    autoPopupDelayTimeout: null,
    mouseEvent: null,
    pageScrollTicking: !1,
    clientDemoStyle: ["5f9963a3bc8868234ca1f015", "64822e4186af630008279a81"],
    settingVariables: ["lang"],
    exitIntentDelayIntervalTimer: null,
    noActivityPeriod: 0,
    selectedChoiceItem: "",
    arrEmotionEmoji: ["angry_80x80.png", "sad-80x80.png", "puzzled80x80.png", "happy-80x80.png", "celebrity-80x80.png"],
    arrEmotionOutlineEmoji: ["angry_80x80-outline.png", "sad-80x80-outline.png", "puzzled80x80-outline.png", "happy-80x80-outline.png", "celebrity-80x80-outline.png"],
    arrEmotionOutlineBracket: {
        5: [0, 1, 2, 3, 4],
        4: [0, 1, 3, 4],
        3: [0, 2, 4],
        2: [0, 4]
    },
    arrEmotionEmojiBracket: {
        5: [0, 1, 2, 3, 4],
        4: [0, 1, 3, 4],
        3: [1, 2, 3],
        2: [1, 3]
    },
    arrCircleEmoji: ["circle_1.png", "circle_2.png", "circle_3.png", "circle_4.png", "circle_5.png"],
    arrCircleOutlineEmoji: ["circle_1-outline.png", "circle_2-outline.png", "circle_3-outline.png", "circle_4-outline.png", "circle_5-outline.png"],
    arrCircleEmojiBracket: {
        5: [0, 1, 2, 3, 4],
        4: [0, 1, 3, 4],
        3: [0, 2, 4],
        2: [0, 4]
    },
    arrCESColors: ["#E43836", "#FB674B", "#FDA83E", "#FFC21F", "#E3C517", "#9DCD07", "#3CAE00"],
    arrNPSColors: ["#FF7574", "#FF7574", "#FF7574", "#FF7574", "#FF7574", "#FF7574", "#FF7574", "#F9BE00", "#F9BE00", "#76CE1E", "#76CE1E"],
    arrCircleColors: ["#D70000", "#D56200", "#E4FF00", "#BAFF00", "#8CFF00"],
    skipMouseOutEvent: !1,
    emailValidationRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    pageScrollEventUsed: !1,
    exitPageEventUsed: !1,
    pageLoadEventUsed: !1,
    delayEventUsed: !1,
    customAdaniAccounts: ["6784e8224163f42743131635", "677621caff59830007db7120", "6777d600aa77ea0008516873"]
};
class ZfemClsWorkerInterval {
    constructor(e, t) {
        let o = new Blob([`setInterval(() => postMessage(0), ${t});`])
          , i = URL.createObjectURL(o);
        this.worker = new Worker(i),
        this.worker.onmessage = e
    }
    stop() {
        this.worker.terminate()
    }
}
_zfSetInteractionLanguage(document.documentElement.lang),
_zfDetectBoatCall(),
_zfCheckLoggedCredChanges(),
zfem_cons.urlParams = new URLSearchParams(window.location.search),
zfem_cons.urlParams.get("zf_debug") || location.hash && -1 !== location.hash.search("#zf_debug=") ? (zfem_cons.urlParams.get("zf_debug") ? zfem_cons.debugMode = "true" == zfem_cons.urlParams.get("zf_debug") ? "true" : "false" : location.hash && -1 !== location.hash.search("#zf_debug=true") && (zfem_cons.debugMode = "true"),
localStorage.setItem("zf_debug", zfem_cons.debugMode)) : zfem_cons.debugMode = localStorage.getItem("zf_debug"),
"true" == zfem_cons.debugMode && (_zfPrintConsole("Please use zf_debug=false as query or hash parameter to turn off debug mode."),
_zfHandleDebugBanner()),
zfem_cons.foundTrackingArgument = window._zfQueue.find(e => "disableTracking" === e[0]),
zfem_cons.foundTrackingArgument && "disableTracking" == zfem_cons.foundTrackingArgument[0] && (zfem_cons.disableTracking = !!zfem_cons.foundTrackingArgument[1],
_zfDetectBoatCall()),
zfem_cons.foundResetArgument = window._zfQueue.find(e => "resetUser" === e[0]),
zfem_cons.foundResetArgument && "resetUser" == zfem_cons.foundResetArgument[0] && (zfem_cons.disableTracking = !0,
_zfClearZfEmbedSurveyCookies()),
zfem_cons.foundPageTrackingArgument = window._zfQueue.find(e => "pageTracking" === e[0]),
zfem_cons.foundPageTrackingArgument && "pageTracking" == zfem_cons.foundPageTrackingArgument[0] && (zfem_cons.customPageTitle = zfem_cons.foundPageTrackingArgument[1].title ? zfem_cons.foundPageTrackingArgument[1].title : "",
zfem_cons.customPagePath = zfem_cons.foundPageTrackingArgument[1].path ? zfem_cons.foundPageTrackingArgument[1].path : "",
_zfPrintConsole("Custom page Title, Path supplied"));
const zfem_cons_observer = new MutationObserver(function(e) {
    if (location.href !== zfem_cons.previousUrl) {
        zfem_cons.widgetRunning = !1,
        zfem_cons.previousUrl = location.href,
        zfem_cons.pageScrollEventUsed = !1,
        zfem_cons.exitPageEventUsed = !1,
        zfem_cons.pageLoadEventUsed = !1,
        zfem_cons.delayEventUsed = !1,
        zfem_cons.customPageTitle = "",
        zfem_cons.customPagePath = "",
        _zfRemoveElementById("ZfEmbedFlypopButton"),
        _zfRemoveElementById("ZfEmbedFlyoutCont");
        var t = document.getElementsByClassName("zf-embed-pop-main-box-continer");
        t[0] && t[0].parentNode.removeChild(t[0]),
        clearTimeout(zfem_cons.autoPopupDelayTimeout),
        clearTimeout(zfem_cons.exitIntentTimeout),
        _zfRemoveElementById("ZfEmbedFlypopBottomButton"),
        _zfRemoveElementById("ZfEmbedFlyoutBottomBarCont"),
        document.removeEventListener("mouseout", zfem_cons.mouseEvent),
        zfem_cons.pageScrollTicking = !0,
        zfem_cons.sourceUrl = String(window.location),
        zfem_cons.exitIntentDelayIntervalTimer && zfem_cons.exitIntentDelayIntervalTimer.stop(),
        _zfGetZfEmbedSurveyCookie(zfem_cons.visCId) ? (_zfSetZfEmbedSurveyCookie(zfem_cons.visCId, _zfGetZfEmbedSurveyCookie(zfem_cons.visCId)),
        _zfSetUpdateVisitorData(null, !0, !0, !0, !0)) : (_zfSetZfEmbedSurveyCookie(zfem_cons.visCId, Math.random().toString(36).slice(2) + Date.now()),
        _zfSetUpdateVisitorData(null, !0, !0, !0, !0))
    }
}
);
function _zfRunAutoTriggerWidgets(e) {
    if (zfem_cons.exitPageEventUsed && zfem_cons.pageScrollEventUsed && zfem_cons.delayEventUsed && zfem_cons.pageLoadEventUsed)
        return !0;
    var t = "Widget";
    "popup" == e.type ? t = "Popup" : "slideUp" == e.type && (t = "Slide Up");
    var o, i = e.embedSettings, n = i.trigger && i.trigger.after ? i.trigger.after : 0, s = i.trigger && i.trigger.scroll ? i.trigger.scroll : null, a = !!i.trigger && !!i.trigger.exitIntent, r = i.trigger && i.trigger.exitIntent && i.trigger.exitIntentIdleFor ? i.trigger.exitIntentIdleFor : 10;
    if ((0 === n && s || a) && (n = null),
    i.trigger && i.trigger.manualTrigger)
        return !0;
    if (a && !zfem_cons.exitPageEventUsed && (zfem_cons.exitPageEventUsed = !0,
    zfem_cons.mouseEvent = t => {
        let o = !t.toElement && !t.relatedTarget && t.clientY < 10;
        o && !zfem_cons.widgetRunning && setTimeout(function() {
            _zfPrintConsole("Widget Triggered cause of exit intent"),
            _zfBuildEmbedSurvey(e),
            _zfSetUpdateVisitorData({
                lastWebWidgetShown: new Date
            }, !0),
            document.removeEventListener("mouseout", zfem_cons.mouseEvent)
        }, 10)
    }
    ),
    a && r && "desktop" !== zfem_cons.deviceType && !zfem_cons.exitPageEventUsed && (zfem_cons.exitIntentDelayIntervalTimer = new ZfemClsWorkerInterval(function() {
        zfem_cons.noActivityPeriod >= r && (zfem_cons.exitPageEventUsed = !0,
        _zfPrintConsole(t + " Triggered cause of exit intent idle delay"),
        _zfBuildEmbedSurvey(e),
        _zfSetUpdateVisitorData({
            lastWebWidgetShown: new Date
        }, !0),
        zfem_cons.exitIntentDelayIntervalTimer.stop())
    }
    ,1e3)),
    a && !s && zfem_cons.scrollExists && "desktop" !== zfem_cons.deviceType && !zfem_cons.exitPageEventUsed) {
        let l = 0;
        window.onscroll = function() {
            let o = document.documentElement.scrollTop || document.body.scrollTop;
            o > 0 && l <= o ? l = o : (zfem_cons.exitPageEventUsed = !0,
            l = o,
            _zfPrintConsole(t + " Triggered cause of exit intent scroll up"),
            _zfBuildEmbedSurvey(e),
            _zfSetUpdateVisitorData({
                lastWebWidgetShown: new Date
            }, !0),
            window.onscroll = null)
        }
    }
    if (a && "desktop" !== zfem_cons.deviceType && !zfem_cons.exitPageEventUsed && (document.onvisibilitychange = function() {
        "hidden" === document.visibilityState && (zfem_cons.exitPageEventUsed = !0,
        _zfPrintConsole(t + " Triggered cause of exit intent tab changes"),
        _zfBuildEmbedSurvey(e),
        _zfSetUpdateVisitorData({
            lastWebWidgetShown: new Date
        }, !0))
    }
    ),
    s && zfem_cons.scrollExists && !zfem_cons.pageScrollEventUsed) {
        var d = 0;
        zfem_cons.pageScrollEventUsed = !0,
        zfem_cons.pageScrollTicking = !1,
        window.addEventListener("scroll", function(o) {
            currentScrollPercentage = 100 * (d = window.scrollY + zfem_cons.clientPageHeight + 10) / document.documentElement.scrollHeight,
            !zfem_cons.pageScrollTicking && currentScrollPercentage > s && !zfem_cons.widgetRunning && (zfem_cons.pageScrollTicking = !0,
            _zfPrintConsole(t + " Triggered as scroll event occurred"),
            _zfBuildEmbedSurvey(e),
            _zfSetUpdateVisitorData({
                lastWebWidgetShown: new Date
            }, !0))
        })
    } else
        a ? zfem_cons.exitIntentTimeout = setTimeout( () => {
            document.addEventListener("mouseout", zfem_cons.mouseEvent)
        }
        , 0) : (null === n || zfem_cons.delayEventUsed || !n) && (zfem_cons.pageLoadEventUsed || 0 !== n) || (n ? zfem_cons.delayEventUsed = !0 : zfem_cons.pageLoadEventUsed = !0,
        zfem_cons.autoPopupDelayTimeout = setTimeout(function() {
            zfem_cons.widgetRunning || (_zfPrintConsole(t + " Triggered after a delay of " + n + " seconds"),
            _zfBuildEmbedSurvey(e),
            _zfSetUpdateVisitorData({
                lastWebWidgetShown: new Date
            }, !0))
        }, 1e3 * n))
}
function _zfInitiateWidgets() {
    if (zfem_cons.setDisableWidgets)
        return !0;
    var e = zfem_cons.workspaceDistrbutions;
    if (null !== e) {
        e.buttonWidgets.length > 0 ? e.buttonWidgets.forEach(function(e, t) {
            _zfPrintConsole("Popover configured with unique ref code: `" + e.uniqueRefCode + "`"),
            zfem_cons.arrButtonEmbeds[e.uniqueRefCode] = e
        }) : _zfPrintConsole("None popover widgets configured against the added workspace."),
        _zfRenderArticleEmbeds();
        let t = e.autoWidgets;
        if (t.length)
            for (aw = 0; aw < t.length; aw++)
                (autoWidget = t[aw]) && autoWidget.uniqueRefCode && (_zfPrintConsole("Auto widget configured with unique ref code: `" + autoWidget.uniqueRefCode + "`"),
                "popup" === autoWidget.type ? zfem_cons.arrPopupEmbeds[autoWidget.uniqueRefCode] = autoWidget : zfem_cons.arrSlideupEmbeds[autoWidget.uniqueRefCode] = autoWidget,
                _zfCheckWidgetFeasibility(autoWidget.uniqueRefCode, autoWidget.type) && _zfRunAutoTriggerWidgets(autoWidget));
        else
            _zfPrintConsole("No auto run widget is configured.");
        let o = e.sideTabWidgets;
        if (o.length) {
            for (st = 0; st < o.length; st++)
                if ((sideTabEmbed = o[st]) && sideTabEmbed.uniqueRefCode && (zfem_cons.arrSidetabEmbeds[sideTabEmbed.uniqueRefCode] = sideTabEmbed,
                _zfCheckWidgetFeasibility(sideTabEmbed.uniqueRefCode, "sideTab"))) {
                    _zfPrintConsole("Side Tab configured with unique ref code: `" + sideTabEmbed.uniqueRefCode + "`"),
                    zfem_cons.sideTabInitiated = !0,
                    _zfBuildEmbedSurvey(sideTabEmbed);
                    break
                }
        } else
            _zfPrintConsole("Side Tab is not configured into the system.");
        let i = e.bottomBarWidgets;
        if (i.length) {
            for (bb = 0; bb < i.length; bb++)
                if (bottomBarEmbed = i[bb],
                zfem_cons.arrBottombarEmbeds[bottomBarEmbed.uniqueRefCode] = bottomBarEmbed,
                bottomBarEmbed && bottomBarEmbed.uniqueRefCode && _zfCheckWidgetFeasibility(bottomBarEmbed.uniqueRefCode, "bottomBar")) {
                    _zfPrintConsole("Bottom bar configured with unique ref code: `" + bottomBarEmbed.uniqueRefCode + "`"),
                    _zfBuildEmbedSurvey(bottomBarEmbed);
                    break
                }
        } else
            _zfPrintConsole("Bottom bar is not configured into the system.")
    }
}
function _zfRenderArticleEmbeds(e=!1) {
    var t = _zfGetZfEmbedSurveyCookie(zfem_cons.visCId)
      , o = localStorage.getItem(t)
      , i = o ? JSON.parse(o) : {}
      , n = zfem_cons.workspaceDistrbutions;
    if (null !== n) {
        if (n.articleWidgets.length > 0) {
            n.articleWidgets.forEach(function(e, t) {
                _zfPrintConsole("Article configured with unique ref code: `" + e.uniqueRefCode + "`"),
                zfem_cons.arrArticleEmbeds[e.uniqueRefCode] = e
            });
            var s = "[zf-embed-widget]";
            e && (s = "[zf-embed-widget]:not([zf-hold-content])");
            var a = document.querySelectorAll(s);
            a.forEach(function(t) {
                var o = t.getAttribute("zf-embed-widget")
                  , n = zfem_cons.arrArticleEmbeds[o];
                if (t.innerHTML = "",
                n && (_zfCheckWidgetFeasibility(o, "article") || e)) {
                    if (n && n.embedField) {
                        let s = zfem_cons.detectedLang ? zfem_cons.detectedLang : n.defaultLanguageCode;
                        t.innerHTML = _zfGetFieldHTML(o, n.embedField, n.defaultLanguageCode, s, n.fontColorLabel, n.fontColorValue, n.fontFamily, n.buttonColor, n.defaultLanguageCode),
                        i.contactId && !e && _zfLogSureyVisit("article", n.surveyId, o, i.contactId)
                    } else
                        t.innerHTML = '<span style="display: flex; justify-content: center; align-items: center;font-family:' + n.fontFamily + ";color:" + n.fontColorLabel + '">No Question to embed</span>'
                }
            });
            var a = document.querySelectorAll("[zf-embed-article-code]")
              , r = !1;
            a.forEach(function(e) {
                e.hasAttribute("il") && (r = !0),
                e.addEventListener("click", function(t) {
                    zfem_cons.skipMouseOutEvent = !0,
                    setTimeout(function() {
                        zfem_cons.skipMouseOutEvent = !1
                    }, 100);
                    var o = e.parentElement
                      , i = zfem_cons.arrArticleEmbeds[e.getAttribute("zf-embed-article-code")]
                      , n = Array.prototype.filter.call(o.children, function(e) {
                        return e.hasAttribute("zf-embed-article-code")
                    });
                    if (_zfGetFieldSelectedChoiceHTML(this, o, i, Array.prototype.indexOf.call(n, e), "click"),
                    "a" === e.tagName.toLowerCase() && t.preventDefault(),
                    e.hasAttribute("zf-embed-article-code")) {
                        let s = parseInt(e.getAttribute("zf-embed-c-id"))
                          , a = e.getAttribute("zf-embed-article-code");
                        1 == zfem_cons.arrArticleEmbeds[a].surveyFieldsCount && a && s ? _zfSubmitArticleEmbedSurvey(zfem_cons.arrArticleEmbeds[a], a, s, this) : a && s ? _zf("startForm", {
                            urc: a,
                            preSelectedChoice: s
                        }, t) : a && _zf("startForm", a, t)
                    }
                }),
                e.children.length > 0 && (e.addEventListener("mouseover", function() {
                    var t = e.parentElement
                      , o = zfem_cons.arrArticleEmbeds[e.getAttribute("zf-embed-article-code")]
                      , i = Array.prototype.filter.call(t.children, function(e) {
                        return e.hasAttribute("zf-embed-article-code")
                    });
                    _zfGetFieldSelectedChoiceHTML(this, t, o, Array.prototype.indexOf.call(i, e), "hover")
                }),
                e.addEventListener("mouseout", function(t) {
                    if (zfem_cons.skipMouseOutEvent)
                        return !0;
                    var o = e.parentElement
                      , i = zfem_cons.arrArticleEmbeds[e.getAttribute("zf-embed-article-code")]
                      , n = Array.prototype.filter.call(o.children, function(e) {
                        return e.hasAttribute("zf-embed-article-code")
                    });
                    _zfGetFieldSelectedChoiceHTML(this, o, i, Array.prototype.indexOf.call(n, e), "mouseout")
                }))
            })
        } else
            _zfPrintConsole("None article widgets configured against the added workspace.")
    }
}
function _zf(e, t={}, o=window.event) {
    switch (e) {
    case "startForm":
        if (zfem_cons.widgetRunning)
            return;
        var i = t;
        if ((void 0 === i || "object" == typeof i) && Object.keys(zfem_cons.arrButtonEmbeds).length > 0 && !i.urc && (i = "object" == typeof i && Object.keys(i).length > 0 && i.urc ? i.urc : Object.keys(zfem_cons.arrButtonEmbeds)[0]),
        (void 0 === i || "object" == typeof i) && Object.keys(zfem_cons.arrArticleEmbeds).length > 0 && "object" == typeof i && Object.keys(i).length > 0 && i.urc && (i.preSelectedChoice && (zfem_cons.selectedChoiceItem = i.preSelectedChoice),
        i = i.urc),
        i && (void 0 !== zfem_cons.arrButtonEmbeds[i] || void 0 !== zfem_cons.arrArticleEmbeds[i]))
            void 0 !== zfem_cons.arrButtonEmbeds[i] ? _zfCheckWidgetFeasibility(i) && (_zfPrintConsole("Manual popover triggered"),
            _zfBuildEmbedSurvey(zfem_cons.arrButtonEmbeds[i], o.target)) : _zfCheckWidgetFeasibility(i, "article") && (_zfPrintConsole("Article Embed triggered"),
            _zfBuildEmbedSurvey(zfem_cons.arrArticleEmbeds[i], o.target.closest("div[zf-embed-widget]") ? o.target.closest("div[zf-embed-widget]") : o.target));
        else {
            let n = zfem_cons.workspaceDistrbutions.autoWidgets;
            if (n.length) {
                for (maw = 0; maw < n.length; maw++)
                    n[maw] && ("popup" == n[maw].type ? zfem_cons.arrPopupEmbeds[n[maw].uniqueRefCode] = n[maw] : zfem_cons.arrSlideupEmbeds[n[maw].uniqueRefCode] = n[maw]);
                i && (zfem_cons.arrPopupEmbeds[i] || zfem_cons.arrSlideupEmbeds[i]) && !zfem_cons.widgetRunning && setTimeout(function() {
                    zfem_cons.arrPopupEmbeds[i] ? _zfCheckWidgetFeasibility(i, zfem_cons.arrPopupEmbeds[i].type) ? (_zfPrintConsole("Manual popup triggered with unique ref code: `" + i + "`"),
                    _zfBuildEmbedSurvey(zfem_cons.arrPopupEmbeds[i])) : _zfPrintConsole("Manual popup triggered falied due to eligibility ref code: `" + i + "`") : _zfCheckWidgetFeasibility(i, zfem_cons.arrSlideupEmbeds[i].type) ? (_zfPrintConsole("Manual slideup triggered with unique ref code: `" + i + "`"),
                    _zfBuildEmbedSurvey(zfem_cons.arrSlideupEmbeds[i])) : _zfPrintConsole("Manual slideup triggered falied due to eligibility ref code: `" + i + "`"),
                    _zfSetUpdateVisitorData({
                        lastWebWidgetShown: new Date
                    }, !0)
                }, 10)
            }
        }
        break;
    case "resetUser":
        zfem_cons.disableTracking = !0,
        _zfClearZfEmbedSurveyCookies();
        break;
    case "disableTracking":
        zfem_cons.disableTracking = !!(t || _zfDetectBoatCall());
        break;
    case "pageTracking":
        var s = t;
        zfem_cons.customPageTitle = s.title ? s.title : "",
        zfem_cons.customPagePath = s.path ? s.path : "",
        _zfPrintConsole("Custom page Title, Path supplied"),
        _zfSetUpdateVisitorData({
            lastWebWidgetShown: new Date
        }, !0);
        break;
    case "reInitiate":
        _zfPrintConsole("Re-Initiate called up"),
        zfem_cons.pageScrollEventUsed = !1,
        zfem_cons.exitPageEventUsed = !1,
        zfem_cons.pageLoadEventUsed = !1,
        zfem_cons.delayEventUsed = !1,
        zfem_cons.customPageTitle = "",
        zfem_cons.customPagePath = "",
        _zfRemoveElementById("ZfEmbedFlypopButton"),
        _zfRemoveElementById("ZfEmbedFlyoutCont"),
        clearTimeout(zfem_cons.autoPopupDelayTimeout),
        clearTimeout(zfem_cons.exitIntentTimeout),
        _zfRemoveElementById("ZfEmbedFlypopBottomButton"),
        _zfRemoveElementById("ZfEmbedFlyoutBottomBarCont"),
        document.removeEventListener("mouseout", zfem_cons.mouseEvent),
        zfem_cons.pageScrollTicking = !0,
        zfem_cons.sourceUrl = String(window.location),
        zfem_cons.exitIntentDelayIntervalTimer && zfem_cons.exitIntentDelayIntervalTimer.stop(),
        _zfGetZfEmbedSurveyCookie(zfem_cons.visCId) ? (_zfSetZfEmbedSurveyCookie(zfem_cons.visCId, _zfGetZfEmbedSurveyCookie(zfem_cons.visCId)),
        _zfSetUpdateVisitorData(null, !0, !0)) : (_zfSetZfEmbedSurveyCookie(zfem_cons.visCId, Math.random().toString(36).slice(2) + Date.now()),
        _zfSetUpdateVisitorData(null, !0, !0));
        break;
    case "settings":
        let a = {}
          , r = null;
        for (let l = _zfQueue.length - 1; l >= 0; l--)
            if ("settings" === _zfQueue[l][0]) {
                r = l,
                a = _zfQueue[l][1];
                break
            }
        let d = ["settings", {
            ...t
        }];
        null == r && (r = _zfQueue.length),
        _zfQueue[r] = {
            ...d
        };
        var c = t;
        if (c) {
            for (var m in c)
                if (c.hasOwnProperty(m) && -1 !== zfem_cons.settingVariables.indexOf(m) && "lang" == m) {
                    var f = _zfSetInteractionLanguage(c[m], !0)
                      , p = zfem_cons.workspaceDistrbutions.sideTabWidget && zfem_cons.workspaceDistrbutions.sideTabWidget.embedSettings.button_text_languages[f]
                      , $ = zfem_cons.workspaceDistrbutions.bottomBarWidget && zfem_cons.workspaceDistrbutions.bottomBarWidget.embedSettings.button_text_languages[f];
                    p && document.getElementById("ZfEmbedFlypopButton").querySelectorAll("span").forEach(e => {
                        e.innerHTML = p
                    }
                    ),
                    $ && document.getElementById("ZfEmbedFlypopBottomButton").querySelectorAll("span").forEach(e => {
                        e.innerHTML = $
                    }
                    )
                }
        }
        break;
    case "variables":
        let b = {}
          , _ = null;
        for (let g = _zfQueue.length - 1; g >= 0; g--)
            if ("variables" === _zfQueue[g][0]) {
                _ = g,
                b = _zfQueue[g][1];
                break
            }
        let u = ["variables", {
            ...t
        }];
        null == _ && (_ = _zfQueue.length),
        _zfQueue[_] = {
            ...u
        };
        break;
    default:
        _zfQueue.push(arguments)
    }
}
function _zfCheckWidgetFeasibility(e, t="button") {
    zfem_cons.arrAppearanceCookie[e] = "zfm_app_" + e,
    zfem_cons.arrVisibleSurveyCookie[e] = "zfm_beh_" + e,
    zfem_cons.arrSubmitSurveyCookie[e] = "zfm_submit_" + e,
    _zfGetZfEmbedSurveyCookie("vis_" + e) && (_zfSetZfEmbedSurveyCookie(zfem_cons.arrVisibleSurveyCookie[e], _zfGetZfEmbedSurveyCookie("vis_" + e)),
    _zfSetZfEmbedSurveyCookie("vis_" + e, "", 0)),
    _zfGetZfEmbedSurveyCookie("app_" + e) && (_zfSetZfEmbedSurveyCookie(zfem_cons.arrAppearanceCookie[e], _zfGetZfEmbedSurveyCookie("app_" + e)),
    _zfSetZfEmbedSurveyCookie("app_" + e, "", 0)),
    _zfGetZfEmbedSurveyCookie("sub_" + e) && (_zfSetZfEmbedSurveyCookie(zfem_cons.arrSubmitSurveyCookie[e], _zfGetZfEmbedSurveyCookie("sub_" + e)),
    _zfSetZfEmbedSurveyCookie("sub_" + e, "", 0));
    var o = _zfGetZfEmbedSurveyCookie(zfem_cons.visCId)
      , i = localStorage.getItem(o)
      , n = i ? JSON.parse(i) : {}
      , s = []
      , a = !0;
    s = "sideTab" == t ? zfem_cons.arrSidetabEmbeds[e] && zfem_cons.arrSidetabEmbeds[e].embedSettings ? zfem_cons.arrSidetabEmbeds[e].embedSettings : [] : "popup" == t ? zfem_cons.arrPopupEmbeds[e] && zfem_cons.arrPopupEmbeds[e].embedSettings ? zfem_cons.arrPopupEmbeds[e].embedSettings : [] : "slideUp" == t ? zfem_cons.arrSlideupEmbeds[e] && zfem_cons.arrSlideupEmbeds[e].embedSettings ? zfem_cons.arrSlideupEmbeds[e].embedSettings : [] : "bottomBar" == t ? zfem_cons.arrBottombarEmbeds[e] && zfem_cons.arrBottombarEmbeds[e].embedSettings ? zfem_cons.arrBottombarEmbeds[e].embedSettings : [] : "article" == t ? zfem_cons.arrArticleEmbeds[e] && zfem_cons.arrArticleEmbeds[e].embedSettings ? zfem_cons.arrArticleEmbeds[e].embedSettings : [] : zfem_cons.arrButtonEmbeds[e] && zfem_cons.arrButtonEmbeds[e].embedSettings ? zfem_cons.arrButtonEmbeds[e].embedSettings : [];
    let r = [];
    if (!zfem_cons.disableTracking && zfem_cons.identifiedVisitor && s.includeSegment && "any" == s.includeSegment.type && s.includeSegment.list && s.includeSegment.list.length > 0) {
        for (let l = 0; l < s.includeSegmentConditions.length; l++)
            s.includeSegmentConditions[l].isKnownVisitor && r.push(s.includeSegmentConditions[l]._id);
        if (r.length > 0 && (a = !1,
        n.dynamicList && n.dynamicList.length > 0))
            for (let d = 0; d < n.dynamicList.length; d++) {
                let c = n.dynamicList[d];
                if (-1 !== r.indexOf(c)) {
                    a = !0;
                    break
                }
            }
    }
    let m = [];
    if (!zfem_cons.disableTracking && zfem_cons.identifiedVisitor && s.excludeSegment && "any" == s.excludeSegment.type && s.excludeSegment.list && s.excludeSegment.list.length > 0) {
        for (let f = 0; f < s.excludeSegmentConditions.length; f++)
            s.excludeSegmentConditions[f].isKnownVisitor && m.push(s.excludeSegmentConditions[f]._id);
        if (m.length > 0 && n.dynamicList && n.dynamicList.length > 0)
            for (let p = 0; p < n.dynamicList.length; p++) {
                let $ = n.dynamicList[p];
                if (-1 !== m.indexOf($)) {
                    a = !1;
                    break
                }
            }
    }
    if (!zfem_cons.identifiedVisitor && s.includeSegment && "any" == s.includeSegment.type && s.includeSegment.list && s.includeSegment.list.length > 0 && (a = _zfCheckSegmentConditions(n, s)),
    !zfem_cons.identifiedVisitor && s.excludeSegment && "any" == s.excludeSegment.type && s.excludeSegment.list && s.excludeSegment.list.length > 0 && (a = _zfCheckSegmentConditions(n, s, "exclude")),
    (s.visibleTill && "submit" == s.visibleTill && "hide" == _zfGetZfEmbedSurveyCookie(zfem_cons.arrSubmitSurveyCookie[e]) && !zfem_cons.identifiedVisitor || s.visibleTill && "submit" == s.visibleTill && zfem_cons.identifiedVisitor && n.widgetsAnswered.length && -1 !== n.widgetsAnswered.indexOf(e)) && (a = !1,
    "article" == t)) {
        let b = zfem_cons.detectedLang;
        -1 == Object.keys(zfem_cons.arrArticleEmbeds[e].typt).indexOf(zfem_cons.detectedLang) && (b = zfem_cons.arrArticleEmbeds[e].defaultLanguageCode);
        var _ = zfem_cons.arrArticleEmbeds[e].typt[b].upperText ? zfem_cons.arrArticleEmbeds[e].typt[b].upperText : "Thankyou !!";
        let g = document.querySelectorAll('div[zf-embed-widget="' + e + '"]');
        g.forEach(t => {
            let o = t.closest("div[zf-embed-widget]").offsetHeight;
            t.innerHTML = '<div class="zf-embed-html-submit-msg-holder" style="height:' + o + 'px;display: flex; justify-content: center; align-items: center;"><span style="font-family:' + zfem_cons.arrArticleEmbeds[e].fontFamily + ";color:" + zfem_cons.arrArticleEmbeds[e].fontColorLabel + '">' + _ + "</span></div>"
        }
        )
    }
    if ((s.visibleTill && "once" == s.visibleTill && "hide" == _zfGetZfEmbedSurveyCookie(zfem_cons.arrVisibleSurveyCookie[e]) && !zfem_cons.identifiedVisitor || s.visibleTill && "once" == s.visibleTill && zfem_cons.identifiedVisitor && n.widgetsVisited.length && -1 !== n.widgetsVisited.indexOf(e)) && (a = !1),
    s.appearance && s.appearance > 0 && s.appearance <= 100) {
        var u = Math.ceil(100 * Math.random());
        _zfPrintConsole("Score for appearance is: " + u);
        var y = "hide";
        (u > 0 && u <= s.appearance && "hide" != _zfGetZfEmbedSurveyCookie(zfem_cons.arrAppearanceCookie[e]) || "show" == _zfGetZfEmbedSurveyCookie(zfem_cons.arrAppearanceCookie[e])) && (y = "show"),
        "show" == y ? _zfSetZfEmbedSurveyCookie(zfem_cons.arrAppearanceCookie[e], "show") : (_zfSetZfEmbedSurveyCookie(zfem_cons.arrAppearanceCookie[e], "hide"),
        a = !1)
    }
    if (s.devices) {
        var z = s.devices;
        "desktop" === zfem_cons.deviceType && (z.desktop,
        1) && !1 === z.desktop && (a = !1),
        "tablet" === zfem_cons.deviceType && (z.tablet,
        1) && !1 === z.tablet && (a = !1),
        "mobile" === zfem_cons.deviceType && (z.mobile,
        1) && !1 === z.mobile && (a = !1)
    }
    var h = !1;
    return a && (h = _zfCheckTriggerFilter(s)),
    h
}
function _zfBuildEmbedSurvey(e, t) {
    var o = e.uniqueRefCode
      , i = "0"
      , n = "0"
      , s = "0"
      , a = "1"
      , r = "1"
      , l = e.embedSettings ? e.embedSettings : zfem_cons.defaultEmbedSettings;
    (void 0 === l.welcomescreen || !1 == l.welcomescreen || "false" == l.introscreen) && (i = "1"),
    (void 0 === l.logo || !1 == l.logo || "false" == l.logo) && (n = "1"),
    (void 0 === l.progress || !1 == l.progress || "false" == l.progress) && (s = "1"),
    void 0 != l.autoclose && (!1 == l.autoclose || "false" == l.autoclose) && (a = 0),
    void 0 != l.navigation && (!1 == l.navigation || "false" == l.navigation) && (r = 0),
    void 0 != l.showNavigation && (!1 == l.showNavigation || "false" == l.showNavigation) && (r = 0);
    let d = new URLSearchParams(window.location.search);
    var c = d.get("utm_source") ? d.get("utm_source") : ""
      , m = d.get("utm_medium") ? d.get("utm_medium") : ""
      , f = d.get("utm_campaign") ? d.get("utm_campaign") : ""
      , p = d.get("utm_content") ? d.get("utm_content") : ""
      , $ = d.get("utm_term") ? d.get("utm_term") : ""
      , b = l.variant && -1 !== ["large", "micro"].indexOf(l.variant) ? l.variant : zfem_cons.widgetVariant;
    switch ("micro" == b && (zfem_cons.enableMicroWidget = !0),
    l.type) {
    case "sidetab":
        _zfRemoveElementById("ZfEmbedFlypopButton"),
        _zfRemoveElementById("ZfEmbedFlyoutCont");
        var _ = 600
          , g = l.button_position ? l.button_position : "right"
          , u = l.button_text ? l.button_text : "Feedback";
        zfem_cons.detectedLang && l.button_text_languages && (u = l.button_text_languages[zfem_cons.detectedLang] ? l.button_text_languages[zfem_cons.detectedLang] : u);
        var y = !1 != l.closeButInside
          , z = window._zfQueue.find(e => "settings" == e[0]);
        if (z) {
            for (var h in z[1])
                if (z[1].hasOwnProperty(h) && -1 !== zfem_cons.settingVariables.indexOf(h) && "lang" == h) {
                    var x = l.button_text_languages && l.button_text_languages[_zfSetInteractionLanguage(z[1][h], !0)];
                    u = x || u
                }
        }
        var v = document.createElement("div");
        v.id = "ZfEmbedFlypopButton",
        v.className = "zf-embed-flypop-button";
        var C = l.button_text_color ? l.button_text_color : "#ffffff"
          , w = l.button_bg_color ? l.button_bg_color : "#56cff5"
          , k = l.font_family ? l.font_family : "Helvetica Neue,Helvetica,Arial,sans-serif";
        zfem_cons.enableMicroWidget = l.enableMicroWidget,
        document.body.appendChild(v);
        var E = "<button style='font-family:" + k + ";background-color:" + w + "'><span style='color:" + C + "'>" + u + "</span></button>";
        document.getElementById("ZfEmbedFlypopButton").innerHTML = E;
        var T = document.createElement("div");
        T.id = "ZfEmbedFlyoutCont",
        T.className = "zf-embed-flyout-cont",
        T.innerHTML = flypopBox(b),
        document.body.appendChild(T);
        var S = T.getElementsByClassName("zf-pre-loaded-text")[0]
          , B = document.head || document.getElementsByTagName("head")[0];
        (style = document.createElement("style")).type = "text/css",
        style.appendChild(document.createTextNode(_zfFlyoutStyle(g, b, y))),
        B.appendChild(style);
        var I = document.getElementsByClassName("zf-embed-flyout-cont")
          , A = document.getElementsByClassName("zf-embed-flyout-sub-cont")[0];
        y && ("micro" !== b ? A.style.color = zfem_cons.workspaceDistrbutions.sideTabWidget ? zfem_cons.workspaceDistrbutions.sideTabWidget.fontColorLabel : "rgba(0,0,0,0.8)" : (A.firstElementChild.firstElementChild.style.background = "transparent",
        A.firstElementChild.firstElementChild.style.color = zfem_cons.workspaceDistrbutions.sideTabWidget ? zfem_cons.workspaceDistrbutions.sideTabWidget.fontColorLabel : "rgba(0,0,0,0.8)")),
        A.onclick = function() {
            zfem_cons.dismissEventAvilable || (zfem_cons.dismissEventAvilable = !0),
            zfem_cons.closeEvent = new CustomEvent("onClose",{
                detail: {
                    urc: o,
                    type: "sidetab"
                }
            }),
            zfem_cons.widgetRunning = !1,
            window.removeEventListener("message", zfem_cons.sideTabPostMessageHandler),
            A.style.display = "none",
            document.body.dispatchEvent(zfem_cons.closeEvent),
            T.style.transition = "all .6s",
            "right" == g ? "micro" == b && ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) ? (T.style.transition = "none",
            _ = 10) : T.style.right = "-" + T.offsetWidth + "px" : "micro" == b && ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) ? (T.style.transition = "none",
            _ = 10) : T.style.left = "-" + T.offsetWidth + "px",
            iframeContElement = document.getElementById("ZfEmbedFlyoutCont").getElementsByClassName("zf-embed-iframe")[0],
            setTimeout(function() {
                T.style.visibility = "hidden",
                v.style.display = "block";
                var e = document.getElementById("ZfEmbedFlyoutCont").getElementsByClassName("zf-embed-iframe")[0];
                e.parentNode.removeChild(e),
                "right" == g ? T.style.right = "0px" : T.style.left = "0px",
                "micro" !== b && "mobile" !== zfem_cons.deviceType && "tablet" !== zfem_cons.deviceType && (T.style.width = "0"),
                "mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType ? "micro" !== b && (T.style.width = "0") : (T.style.width = "0",
                "micro" === b && (T.style.maxWidth = "0"))
            }, _)
        }
        ,
        v.onclick = function() {
            if (!zfem_cons.widgetRunning) {
                if (_zfPrintConsole("Trigger happen to open a side tab widget."),
                zfem_cons.widgetRunning = !0,
                _zfSetUpdateVisitorData({
                    lastWebWidgetShown: new Date
                }, !0),
                zfem_cons.openEvent = new CustomEvent("onOpen",{
                    detail: {
                        urc: o,
                        type: "sidetab"
                    }
                }),
                document.body.dispatchEvent(zfem_cons.openEvent),
                S.style.display = "block",
                zfem_cons.enableMicroWidget = l.enableMicroWidget,
                l.visibleTill && "once" == l.visibleTill && (_zfSetZfEmbedSurveyCookie(zfem_cons.arrVisibleSurveyCookie[o], "hide"),
                document.getElementById("ZfEmbedFlypopButton").remove()),
                T.style.visibility && "hidden" != T.style.visibility)
                    T.style.width = "0px",
                    A.style.display = "none";
                else {
                    this.style.display = "none";
                    var e = "57%"
                      , t = "100%"
                      , d = "0%"
                      , _ = "0px"
                      , u = "0px"
                      , y = ""
                      , z = ""
                      , h = ""
                      , x = ""
                      , v = ""
                      , C = ""
                      , w = "";
                    zfem_cons.enableMicroWidget && "micro" == b ? ("mobile" == zfem_cons.deviceType ? (e = "100%",
                    t = "270px",
                    d = "inherit",
                    y = "320px",
                    v = "50%",
                    x = "inherit",
                    w = "-160px",
                    h = (screen.width - 320) / 2 + "px") : "tablet" == zfem_cons.deviceType ? (e = "100%",
                    t = "270px",
                    d = "inherit",
                    y = "320px",
                    h = "15px",
                    v = "15px",
                    x = "inherit") : (e = "100%",
                    t = "270px",
                    d = "50%",
                    y = "320px",
                    z = "-160px"),
                    _ = "30px",
                    u = "30px") : "micro" == b && ("mobile" == zfem_cons.deviceType ? (e = "100%",
                    t = "100%",
                    d = "inherit",
                    y = "320px",
                    v = "20px",
                    x = "inherit",
                    C = "500px",
                    h = (screen.width - 320) / 2 + "px") : "tablet" == zfem_cons.deviceType ? (e = "100%",
                    t = "100%",
                    d = "inherit",
                    y = "320px",
                    v = "15px",
                    x = "inherit",
                    C = "500px",
                    h = "15px") : (e = "100%",
                    t = "100%",
                    y = "320px",
                    d = "50%",
                    z = "-240px",
                    C = "500px"),
                    _ = "30px",
                    u = "30px"),
                    T.style.width = ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && "micro" !== b ? "100%" : e,
                    T.style.height = ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && "micro" !== b ? "100%" : t,
                    T.style.top = ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && "micro" !== b ? "0%" : d,
                    y && (T.style.maxWidth = y),
                    z && (T.style.marginTop = z),
                    h && (T.style.bottom = h),
                    x && (T.style.right = x),
                    v && (T.style.left = v),
                    C && (T.style.maxHeight = C),
                    w && (T.style.marginLeft = w),
                    "right" == g ? "micro" == b && ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) ? T.style.right = "inherit" : T.style.right = "mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType ? "0%" : _ : "micro" == b && "mobile" == zfem_cons.deviceType ? (T.style.left = "inherit",
                    T.style.right = "50%",
                    T.style.marginRight = "-160px") : "micro" == b && "tablet" == zfem_cons.deviceType ? T.style.left = "15px" : T.style.left = "mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType ? "0%" : u,
                    T.style.visibility = "visible",
                    T.style.backgroundColor = "#ffffff",
                    A.style.display = "block",
                    _zfCF(document, I[0], "flyout", zfem_cons.baseSurveyUrl + "/" + o, i, n, s, a, r, b, c, m, f, p, $),
                    document.getElementById("ZfEmbedFlyoutCont").getElementsByClassName("zf-embed-iframe")[0].onload = function() {
                        S.style.display = "none"
                    }
                    ,
                    window.addEventListener("message", zfem_cons.sideTabPostMessageHandler = function(e) {
                        var t = e.data;
                        ("zf-embed-submit-close" === t || "zf-embed-submit-only" === t) && (zfem_cons.dismissEventAvilable = !1,
                        l.visibleTill && "submit" == l.visibleTill && (_zfSetZfEmbedSurveyCookie(zfem_cons.arrSubmitSurveyCookie[o], "hide"),
                        document.getElementById("ZfEmbedFlypopButton").remove()),
                        zfem_cons.submitEvent = new CustomEvent("onSubmit",{
                            detail: {
                                urc: o,
                                type: "sidetab"
                            }
                        }),
                        document.body.dispatchEvent(zfem_cons.submitEvent),
                        window.removeEventListener("message", zfem_cons.sideTabPostMessageHandler),
                        "zf-embed-submit-close" === t && A.click()),
                        zfem_cons.enableMicroWidget && "micro" == b && "zf-embed-expand-widget" === t && "mobile" !== zfem_cons.deviceType && "tablet" !== zfem_cons.deviceType ? (T.style.transition = "all 1s",
                        T.style.height = "100%",
                        T.style.marginTop = "-250px",
                        T.style.top = "50%",
                        T.style.maxHeight = "500px") : zfem_cons.enableMicroWidget && "micro" == b && "zf-embed-expand-widget" === t && ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && (T.style.transition = "all 1s",
                        T.style.height = "100%",
                        T.style.maxHeight = "500px")
                    }
                    , !1)
                }
            }
        }
        ;
        break;
    case "popup":
        let P = 500;
        if (-1 !== zfem_cons.customAdaniAccounts.indexOf(zfem_cons.cmpId) && (P = 580),
        zfem_cons.widgetRunning)
            return;
        zfem_cons.widgetRunning = !0,
        zfem_cons.enableMicroWidget = l.enableMicroWidget,
        l.visibleTill && "once" == l.visibleTill && _zfSetZfEmbedSurveyCookie(zfem_cons.arrVisibleSurveyCookie[o], "hide");
        var L = !1 != l.closeButInside
          , B = document.head || document.getElementsByTagName("head")[0];
        (style = document.createElement("style")).type = "text/css",
        style.appendChild(document.createTextNode(_zfPopupStyle(b, L, e))),
        B.appendChild(style);
        var T = document.createElement("div");
        T.className = "zf-embed-pop-main-box-continer",
        T.innerHTML = modalBox(b, L),
        document.body.appendChild(T);
        var S = document.getElementById("ZfEmbedPopModalBox").getElementsByClassName("zf-pre-loaded-text")[0];
        zfem_cons.openEvent = new CustomEvent("onOpen",{
            detail: {
                urc: o,
                type: "popup"
            }
        }),
        document.body.dispatchEvent(zfem_cons.openEvent);
        var H = document.getElementById("ZfEmbedPopModalBox")
          , R = document.getElementById("ZfEmbedPopModalBox").getElementsByClassName("zf-embed-close")[0];
        L && (R.style.color = e.fontColorLabel ? e.fontColorLabel : "rgba(0,0,0,0.8)");
        var F = document.getElementById("ZfEmbedPopModalFrameConainer");
        -1 !== zfem_cons.customAdaniAccounts.indexOf(zfem_cons.cmpId) && _zfLockScroll(),
        iframeWidth = "100%",
        iframeHeight = "100%",
        _zfCF(document, F, "button_popup", zfem_cons.baseSurveyUrl + "/" + o, i, n, s, a, r, b, c, m, f, p, $),
        H.style.opacity = .1,
        H.style.display = "flex",
        _zfFadeIn(H),
        document.getElementById("ZfEmbedPopModalFrameConainer").getElementsByClassName("zf-embed-iframe")[0].onload = function() {
            S.style.display = "none"
        }
        ,
        R.onclick = function() {
            zfem_cons.dismissEventAvilable || (zfem_cons.dismissEventAvilable = !0),
            zfem_cons.widgetRunning = !1,
            zfem_cons.closeEvent = new CustomEvent("onClose",{
                detail: {
                    urc: o,
                    type: "popup"
                }
            }),
            document.body.dispatchEvent(zfem_cons.closeEvent),
            window.removeEventListener("message", zfem_cons.popupPostMessageHandler),
            -1 !== zfem_cons.customAdaniAccounts.indexOf(zfem_cons.cmpId) && _zfUnlockScroll();
            var e = document.getElementsByClassName("zf-embed-pop-main-box-continer");
            e[0].parentNode.removeChild(e[0]),
            H.style.display = "none"
        }
        ,
        window.addEventListener("message", zfem_cons.popupPostMessageHandler = function(e) {
            var t = e.data;
            if (("zf-embed-submit-close" === t || "zf-embed-submit-only" === t) && (zfem_cons.dismissEventAvilable = !1,
            l.visibleTill && "submit" == l.visibleTill && _zfSetZfEmbedSurveyCookie(zfem_cons.arrSubmitSurveyCookie[o], "hide"),
            zfem_cons.submitEvent = new CustomEvent("onSubmit",{
                detail: {
                    urc: o,
                    type: "popup"
                }
            }),
            document.body.dispatchEvent(zfem_cons.submitEvent),
            "zf-embed-submit-close" === t && R.click()),
            zfem_cons.enableMicroWidget && "micro" == b && "zf-embed-expand-widget" === t && "mobile" !== zfem_cons.deviceType && "tablet" !== zfem_cons.deviceType) {
                var i = H.getElementsByClassName("zf-embed-modal-content")[0];
                i.setAttribute("style", i.style.cssText + "transition:all 0.5s !important;"),
                i.style.height = "100%",
                i.style.maxHeight = P + "px"
            } else if (zfem_cons.enableMicroWidget && "micro" == b && "zf-embed-expand-widget" === t && ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType)) {
                var i = H.getElementsByClassName("zf-embed-modal-content")[0];
                i.style.transition = "all .5s",
                i.style.height = P + "px",
                -1 !== zfem_cons.customAdaniAccounts.indexOf(zfem_cons.cmpId) && (i.style.bottom = (screen.height - P) / 2 + "px")
            }
        }
        , !1);
        break;
    case "button":
    case "article-embed":
        var Z = t
          , M = !1 != l.closeButInside
          , B = document.head || document.getElementsByTagName("head")[0];
        if ((style = document.createElement("style")).type = "text/css",
        style.appendChild(document.createTextNode(_zfPopupStyle(b, M, e))),
        B.appendChild(style),
        Z.disabled && "article-embed" !== l.type)
            return !0;
        _zfSetUpdateVisitorData({
            lastWebWidgetShown: new Date
        }, !0),
        zfem_cons.enableMicroWidget = l.enableMicroWidget,
        zfem_cons.widgetRunning = !0,
        Z.disabled = !0;
        var U = Z.getBoundingClientRect()
          , W = window.innerHeight - 43 * window.innerHeight / 100 - 5 - Z.offsetHeight
          , O = window.innerWidth - 25 * window.innerWidth / 100 - 10
          , D = U.left > O ? O + "px" : U.left + "px"
          , N = U.top > W ? W + "px" : U.top + Z.offsetHeight + 10 + "px";
        "article-embed" == l.type && (D = U.left + U.width / 2 - 171 + "px",
        N = U.top > 270 ? U.top - (10 + U.height + 160) + "px" : U.top + U.height + 10 + "px");
        var G = "";
        zfem_cons.enableMicroWidget || (G = D,
        D = "0"),
        zfem_cons.openEvent = new CustomEvent("onOpen",{
            detail: {
                urc: o,
                type: "popover"
            }
        }),
        document.body.dispatchEvent(zfem_cons.openEvent),
        l.visibleTill && "once" == l.visibleTill && (_zfSetZfEmbedSurveyCookie(zfem_cons.arrVisibleSurveyCookie[o], "hide"),
        "article-embed" == l.type || t.remove());
        var T = document.createElement("div");
        T.className = "zf-embed-pop-main-box-continer",
        T.innerHTML = modalBox(b, M, l.type),
        document.body.appendChild(T);
        var S = document.getElementById("ZfEmbedPopModalBox").getElementsByClassName("zf-pre-loaded-text")[0]
          , H = document.getElementById("ZfEmbedPopModalBox")
          , R = document.getElementById("ZfEmbedPopModalBox").getElementsByClassName("zf-embed-close")[0];
        M && (R.style.color = zfem_cons.workspaceDistrbutions.buttonWidgets ? zfem_cons.workspaceDistrbutions.buttonWidgets.fontColorLabel : "rgba(0,0,0,0.8)");
        var F = document.getElementById("ZfEmbedPopModalFrameConainer");
        iframeWidth = "100%",
        iframeHeight = "100%",
        _zfCF(document, F, "button_popup", zfem_cons.baseSurveyUrl + "/" + o, i, n, s, a, r, b, c, m, f, p, $),
        document.getElementById("ZfEmbedPopModalFrameConainer").getElementsByClassName("zf-embed-iframe")[0].onload = function() {
            S.style.display = "none"
        }
        ,
        H.style.opacity = .1,
        H.style.display = "flex";
        var V = H.getElementsByClassName("zf-embed-modal-content")[0];
        "micro" == b && "mobile" !== zfem_cons.deviceType && ("tablet" !== zfem_cons.deviceType || "tablet" === zfem_cons.deviceType && "article-embed" === l.type) && (V.style.position = "absolute",
        V.style.left = D,
        V.style.top = N,
        G && (H.style.left = G),
        H.style.bottom = "15px"),
        zfem_cons.enableMicroWidget || (H.style.top = "0",
        H.style.maxHeight = "",
        H.style.maxWidth = "",
        V.style.maxHeight = "500px",
        V.style.left = G,
        H.style.left = D,
        V.style.top = "10%"),
        _zfFadeIn(H),
        R.onclick = function() {
            zfem_cons.dismissEventAvilable || (zfem_cons.dismissEventAvilable = !0),
            zfem_cons.widgetRunning = !1,
            window.removeEventListener("message", zfem_cons.buttonPostMessageHandler),
            Z.disabled = !1,
            zfem_cons.closeEvent = new CustomEvent("onClose",{
                detail: {
                    urc: o,
                    type: "popover"
                }
            }),
            document.body.dispatchEvent(zfem_cons.closeEvent);
            var e = document.getElementsByClassName("zf-embed-pop-main-box-continer");
            e[0].parentNode.removeChild(e[0]),
            H.style.display = "none",
            "article-embed" == l.type && _zfRenderArticleEmbeds(!0)
        }
        ,
        window.addEventListener("message", zfem_cons.buttonPostMessageHandler = function(i) {
            var n = i.data;
            if ("zf-embed-submit-close" === n || "zf-embed-submit-only" === n) {
                if (zfem_cons.dismissEventAvilable = !1,
                "article-embed" == l.type) {
                    let s = t.closest("div[zf-embed-widget]");
                    if (s) {
                        let a = zfem_cons.detectedLang;
                        -1 == Object.keys(e.typt).indexOf(zfem_cons.detectedLang) && (a = e.defaultLanguageCode);
                        let r = e.typt[a].upperText ? e.typt[a].upperText : "Thankyou!!"
                          , d = s.offsetHeight;
                        s.innerHTML = '<div class="zf-embed-html-submit-msg-holder" style="height:' + d + 'px;display: flex; justify-content: center; align-items: center;"><span style="font-family:' + e.fontFamily + ";color:" + e.fontColorLabel + '">' + r + "</span></div>",
                        s.setAttribute("zf-hold-content", "true"),
                        l.visibleTill && "submit" == l.visibleTill && _zfSetZfEmbedSurveyCookie(zfem_cons.arrSubmitSurveyCookie[o], "hide")
                    }
                } else
                    l.visibleTill && "submit" == l.visibleTill && (_zfSetZfEmbedSurveyCookie(zfem_cons.arrSubmitSurveyCookie[o], "hide"),
                    t.remove());
                zfem_cons.submitEvent = new CustomEvent("onSubmit",{
                    detail: {
                        urc: o,
                        type: "popover"
                    }
                }),
                document.body.dispatchEvent(zfem_cons.submitEvent),
                window.removeEventListener("message", zfem_cons.buttonPostMessageHandler),
                "zf-embed-submit-close" === n && R.click()
            }
            if (zfem_cons.enableMicroWidget && "micro" == b && "zf-embed-expand-widget" === n && "mobile" !== zfem_cons.deviceType && ("tablet" !== zfem_cons.deviceType || "tablet" === zfem_cons.deviceType && "article-embed" === l.type)) {
                var c = H.getElementsByClassName("zf-embed-modal-content")[0];
                c.setAttribute("style", c.style.cssText + "transition:all 0.5s !important;"),
                c.style.height = "100%",
                c.style.top = "10%",
                c.style.maxHeight = "500px"
            } else if (zfem_cons.enableMicroWidget && "micro" == b && "zf-embed-expand-widget" === n && ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType)) {
                H.style.transition = "all 1s",
                H.style.height = "100%",
                H.style.overflow = "inherit",
                H.style.paddingTop = "0px",
                H.style.maxHeight = "500px",
                H.style.bottom = "15px";
                var c = H.getElementsByClassName("zf-embed-modal-content")[0];
                c.style.height = "100%"
            }
        }
        , !1);
        break;
    case "slideUp":
        _zfRemoveElementById("slideupBottom");
        var q = 600
          , g = l.button_position ? l.button_position : "right"
          , j = !1 != l.closeButInside
          , T = document.createElement("div");
        T.id = "slideupBottom",
        T.innerHTML = flypopSlideUpBox(b),
        document.body.appendChild(T);
        var S = T.getElementsByClassName("zf-pre-loaded-text")[0]
          , B = document.head || document.getElementsByTagName("head")[0];
        (style = document.createElement("style")).type = "text/css",
        style.appendChild(document.createTextNode(_zfFlyoutSlideUpStyle(g, b, j))),
        B.appendChild(style);
        var I = document.getElementById("slideupBottom")
          , X = document.getElementById("slideupBottom").getElementsByClassName("zf-embed-flyout-slideup-sub-cont")[0];
        if (X.onclick = function() {
            zfem_cons.closeEvent = new CustomEvent("onClose",{
                detail: {
                    urc: o,
                    type: "slideUp"
                }
            }),
            zfem_cons.widgetRunning = !1,
            window.removeEventListener("message", zfem_cons.slideUpPostMessageHandler),
            X.style.display = "none",
            document.body.dispatchEvent(zfem_cons.closeEvent),
            T.style.transition = "all 0.3s",
            "micro" == b && ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) ? (T.style.bottom = "-" + T.offsetHeight + "px",
            q = 10) : T.style.bottom = "-" + T.offsetHeight + "px",
            iframeContElement = document.getElementsByClassName("zf-embed-iframe")[0],
            setTimeout(function() {
                T.style.visibility = "hidden";
                var e = document.getElementsByClassName("zf-embed-iframe")[0];
                e.parentNode.removeChild(e)
            }, q)
        }
        ,
        zfem_cons.widgetRunning)
            return;
        if (zfem_cons.widgetRunning = !0,
        _zfSetUpdateVisitorData({
            lastWebWidgetShown: new Date
        }, !0),
        zfem_cons.openEvent = new CustomEvent("onOpen",{
            detail: {
                urc: o,
                type: "slideUp"
            }
        }),
        document.body.dispatchEvent(zfem_cons.openEvent),
        S.style.display = "block",
        l.visibleTill && "once" == l.visibleTill && _zfSetZfEmbedSurveyCookie(zfem_cons.arrVisibleSurveyCookie[o], "hide"),
        T.style.visibility && "hidden" != T.style.visibility)
            T.style.width = "0px",
            X.style.display = "none";
        else {
            var Q = "calc(100% - 0px)"
              , K = "0px"
              , Y = "0px"
              , J = "-320px"
              , ee = "0px"
              , et = "0px"
              , eo = ""
              , ei = "fixed"
              , en = ""
              , es = "0.3s";
            zfem_cons.enableMicroWidget && "micro" == b ? ("mobile" == zfem_cons.deviceType ? (Q = "calc(100% - 20px)",
            ei = "fixed",
            et = "10px",
            ee = "10px") : "tablet" == zfem_cons.deviceType ? (Q = "520px",
            eo = "0px auto") : (Q = "520px",
            eo = "0px auto",
            ei = "fixed",
            en = "10px 0px"),
            K = "0px",
            Y = "0px") : "micro" == b && ("mobile" == zfem_cons.deviceType ? (Q = "calc(100% - 20px)",
            et = "10px",
            ee = "10px") : "tablet" == zfem_cons.deviceType ? (Q = "520px",
            eo = "0px auto") : (Q = "320px",
            eo = "0px auto",
            ei = "fixed",
            en = "10px 0px"),
            K = "0px",
            Y = "0px"),
            T.style.width = ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && "micro" !== b ? "calc(100% - 20px)" : Q,
            T.style.height = "210px",
            T.style.top = ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && "micro" !== b ? "0%" : "",
            ei && (T.style.position = ei),
            eo && (T.style.margin = eo),
            J && (T.style.bottom = J),
            ee && (T.style.right = ee),
            et && (T.style.left = et),
            es && (T.style.transition = es),
            "right" == g ? "micro" == b && ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) ? T.style.right = "10" : T.style.right = "mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType ? "10" : K : "micro" == b && "mobile" == zfem_cons.deviceType ? T.style.right = "10px" : "micro" == b && "tablet" == zfem_cons.deviceType || (T.style.left = "mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType ? "0%" : Y),
            "large" == b && ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && (T.style.top = "inherit"),
            "micro" == b && ("desktop" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && ("right" == g ? (T.style.right = "20px",
            T.style.left = "inherit") : "left" == g && (T.style.right = "inherit",
            T.style.left = "20px")),
            T.style.zIndex = 11e3,
            T.style.visibility = "visible",
            T.style.backgroundColor = "#ffffff",
            T.style.boxShadow = "rgb(0 0 0 / 40%) 0px 0px 15px 0px",
            T.style.borderRadius = "micro" == b ? "8px 8px 8px 8px" : "8px 8px 0px 0px",
            ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && (T.style.borderRadius = "8px"),
            setTimeout(function() {}, 50),
            X.style.display = "block",
            _zfCF(document, I, "flyout", zfem_cons.baseSurveyUrl + "/" + o, i, n, s, a, r, "micro" == b ? "slideUp" : "slideUpLarge", c, m, f, p, $);
            var ea = document.getElementById("slideupBottom").getElementsByClassName("zf-embed-iframe")[0];
            ea.style.borderRadius = "micro" == b ? "8px" : "8px 8px 0px 0px",
            ea.style.transition = "0.3s",
            document.getElementsByClassName("zf-embed-iframe")[0].onload = function() {
                S.style.display = "none"
            }
            ,
            window.addEventListener("message", zfem_cons.slideUpPostMessageHandler = function(e) {
                var t = e.data.hasOwnProperty("event_id") ? e.data.event_id : e.data;
                "surveyform.loaded" === t && (T.style.bottom = J,
                setTimeout(function() {
                    "micro" == b ? "mobile" == zfem_cons.deviceType ? T.style.bottom = "10px" : T.style.bottom = "20px" : (T.style.bottom = "0px",
                    ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && (T.style.bottom = "10px",
                    T.style.left = "10px",
                    T.style.right = "10px"))
                }, 150)),
                ("zf-embed-submit-close" === t || "zf-embed-submit-only" === t) && (l.visibleTill && "submit" == l.visibleTill && (_zfSetZfEmbedSurveyCookie(zfem_cons.arrSubmitSurveyCookie[o], "hide"),
                document.getElementById("ZfEmbedFlypopButton").remove()),
                zfem_cons.submitEvent = new CustomEvent("onSubmit",{
                    detail: {
                        urc: o,
                        type: "slideUp"
                    }
                }),
                document.body.dispatchEvent(zfem_cons.submitEvent),
                window.removeEventListener("message", zfem_cons.slideUpPostMessageHandler),
                "zf-embed-submit-close" === t && X.click()),
                zfem_cons.enableMicroWidget && "micro" == b && "zf-embed-expand-widget" === t && "mobile" !== zfem_cons.deviceType && "tablet" !== zfem_cons.deviceType ? (T.style.transition = "all 1s",
                T.style.height = "70vh",
                T.style.maxHeight = "70vh") : zfem_cons.enableMicroWidget && "micro" == b && "zf-embed-expand-widget" === t && ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && (T.style.transition = "all 1s",
                T.style.height = "calc(100% - 230px)",
                T.style.maxHeight = "calc(100% - 230px)"),
                "large" == b && "zf-embed-expand-widget" === t && (T.style.transition = "all 1s",
                T.style.height = "70vh",
                T.style.maxHeight = "70vh",
                ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && (T.style.height = "calc(100% - 50px)",
                T.style.maxHeight = "calc(100% - 50px)")),
                "zf-embed-auto-height-adaptiveness-widget" === t && (T.style.height = e.data.data.v1 + 81 + "px",
                T.style.maxHeight = "75vh")
            }
            , !1)
        }
        break;
    case "bottomBar":
        _zfRemoveElementById("ZfEmbedFlypopBottomButton"),
        _zfRemoveElementById("ZfEmbedFlyoutBottomBarCont");
        var er = 600
          , g = l.button_position ? l.button_position : "right"
          , u = l.button_text ? l.button_text : "Feedback";
        zfem_cons.detectedLang && l.button_text_languages && (u = l.button_text_languages[zfem_cons.detectedLang] ? l.button_text_languages[zfem_cons.detectedLang] : u);
        var z = window._zfQueue.find(e => "settings" == e[0]);
        if (z) {
            for (var h in z[1])
                if (z[1].hasOwnProperty(h) && -1 !== zfem_cons.settingVariables.indexOf(h) && "lang" == h) {
                    var x = l.button_text_languages && l.button_text_languages[_zfSetInteractionLanguage(z[1][h], !0)];
                    u = x || u
                }
        }
        var el = !1 != l.closeButInside
          , ed = document.createElement("div");
        ed.id = "ZfEmbedFlypopBottomButton",
        ed.className = "zf-embed-flypop-bottom-button";
        var C = l.button_text_color ? l.button_text_color : "#ffffff"
          , w = l.button_bg_color ? l.button_bg_color : "#56cff5"
          , k = l.font_family ? l.font_family : "Helvetica Neue,Helvetica,Arial,sans-serif";
        zfem_cons.enableMicroWidget = l.enableMicroWidget,
        document.body.appendChild(ed);
        var ec = "";
        zfem_cons.clientDemoStyle.includes(zfem_cons.cmpId) && (ec = ";width:200px");
        var E = "<button style='font-family:" + k + ";background-color:" + w + ec + "'><span style='color:" + C + "'>" + u + "</span></button>";
        document.getElementById("ZfEmbedFlypopBottomButton").innerHTML = E;
        var T = document.createElement("div");
        T.id = "ZfEmbedFlyoutBottomBarCont",
        T.className = "zf-embed-flyout-bottom-bar-cont",
        T.innerHTML = flypopBottomBarBox(b),
        document.body.appendChild(T);
        var S = T.getElementsByClassName("zf-pre-loaded-text")[0]
          , B = document.head || document.getElementsByTagName("head")[0];
        (style = document.createElement("style")).type = "text/css",
        style.appendChild(document.createTextNode(_zfFlyoutBottomBarStyle(g, b, el))),
        B.appendChild(style);
        var I = document.getElementsByClassName("zf-embed-flyout-bottom-bar-cont")
          , em = document.getElementById("ZfEmbedFlyoutBottomBarCont").getElementsByClassName("zf-embed-flyout-bottom-bar-sub-cont")[0];
        "right" == g ? ed.style.right = l.right_padding ? l.right_padding + "px" : "12px" : ed.style.left = l.left_padding ? l.left_padding + "px" : "12px";
        var ef = l.bottom_padding ? l.bottom_padding : "10";
        ed.style.bottom = "-" + (Number(ef) + ed.offsetHeight) + "px",
        ed.style.transition = "all 0.6s",
        setTimeout(function() {
            ed.style.bottom = ef + "px"
        }, 50),
        em.onclick = function() {
            zfem_cons.closeEvent = new CustomEvent("onClose",{
                detail: {
                    urc: o,
                    type: "bottomBar"
                }
            }),
            zfem_cons.widgetRunning = !1,
            window.removeEventListener("message", zfem_cons.bottomBarPostMessageHandler),
            ed.style.bottom = ef + "px",
            document.body.dispatchEvent(zfem_cons.closeEvent),
            T.style.transition = "all 0.3s",
            "micro" == b && ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) ? (T.style.bottom = "-" + (T.offsetHeight + 100) + "px",
            er = 10) : (T.style.bottom = "-" + (T.offsetHeight + 100) + "px",
            T.style.top = "unset"),
            iframeContElement = document.getElementById("ZfEmbedFlyoutBottomBarCont").getElementsByClassName("zf-embed-iframe")[0],
            setTimeout(function() {
                T.style.visibility = "hidden";
                var e = document.getElementById("ZfEmbedFlyoutBottomBarCont").getElementsByClassName("zf-embed-iframe")[0];
                e.parentNode.removeChild(e)
            }, er)
        }
        ,
        ed.onclick = function() {
            if (!zfem_cons.widgetRunning) {
                if (_zfPrintConsole("Trigger happen to open a bottom bar widget."),
                zfem_cons.widgetRunning = !0,
                _zfSetUpdateVisitorData({
                    lastWebWidgetShown: new Date
                }, !0),
                zfem_cons.openEvent = new CustomEvent("onOpen",{
                    detail: {
                        urc: o,
                        type: "bottomBar"
                    }
                }),
                document.body.dispatchEvent(zfem_cons.openEvent),
                S.style.display = "block",
                zfem_cons.enableMicroWidget = l.enableMicroWidget,
                l.visibleTill && "once" == l.visibleTill && (_zfSetZfEmbedSurveyCookie(zfem_cons.arrVisibleSurveyCookie[o], "hide"),
                document.getElementById("ZfEmbedFlypopBottomButton").remove()),
                T.style.visibility && "hidden" != T.style.visibility)
                    T.style.width = "0px",
                    em.style.display = "none";
                else {
                    this.style.transition = "all 0.6s",
                    this.style.bottom = "-" + (this.offsetHeight + Number(ef)) + "px";
                    var e = "57%"
                      , t = "100%"
                      , d = "0px"
                      , _ = "0px"
                      , u = ""
                      , y = ""
                      , z = "-" + 2 * T.clientHeight + "px"
                      , h = ""
                      , x = ""
                      , v = "";
                    zfem_cons.enableMicroWidget && "micro" == b ? ("mobile" == zfem_cons.deviceType ? (e = "calc(100% - 20px)",
                    t = "270px",
                    u = "",
                    z = "15px",
                    x = "50%",
                    h = "inherit") : "tablet" == zfem_cons.deviceType ? (e = "100%",
                    t = "270px",
                    u = "320px",
                    z = "15px") : (e = "100%",
                    t = "270px",
                    u = "320px",
                    y = "-160px"),
                    d = "30px",
                    _ = "30px") : "micro" == b && ("mobile" == zfem_cons.deviceType ? (e = "calc(100% - 20px)",
                    t = "270px",
                    u = "",
                    x = "20px",
                    h = "inherit",
                    v = "500px",
                    z = (screen.width - 320) / 2 + "px") : "tablet" == zfem_cons.deviceType ? (e = "100%",
                    t = "270px",
                    u = "320px",
                    v = "500px",
                    z = "15px") : (e = "100%",
                    t = "100%",
                    u = "320px",
                    y = "-240px",
                    v = "500px"),
                    d = "30px",
                    _ = "30px"),
                    T.style.width = ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && "micro" !== b ? "100%" : e,
                    T.style.height = ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && "micro" !== b ? "100%" : t,
                    T.style.top = ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && "micro" !== b ? "0%" : "unset",
                    u && (T.style.maxWidth = u),
                    z && (T.style.bottom = z),
                    h && (T.style.right = h),
                    x && (T.style.left = x),
                    v && (T.style.maxHeight = v),
                    "right" == g ? "micro" == b && ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) ? T.style.right = "inherit" : T.style.right = "mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType ? "0%" : d : "micro" == b && "mobile" == zfem_cons.deviceType ? (T.style.left = "inherit",
                    T.style.right = "50%") : "micro" == b && "tablet" == zfem_cons.deviceType ? T.style.left = "15px" : T.style.left = "mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType ? "0%" : _,
                    "right" == g ? "mobile" == zfem_cons.deviceType ? (T.style.right = "10px",
                    T.style.left = "10px") : ("tablet" == zfem_cons.deviceType && (T.style.left = "inherit"),
                    T.style.right = l.right_padding ? l.right_padding + "px" : "12px") : "mobile" == zfem_cons.deviceType ? (T.style.left = "10px",
                    T.style.right = "10px") : T.style.left = l.left_padding ? l.left_padding + "px" : "12px",
                    T.style.zIndex = 11e3,
                    T.style.visibility = "visible",
                    T.style.backgroundColor = "#ffffff",
                    T.style.transition = "all 0.3s",
                    em.style.display = "block",
                    _zfCF(document, I[0], "flyout", zfem_cons.baseSurveyUrl + "/" + o, i, n, s, a, r, "micro" == b ? "bottomBar" : "bottomBarLarge", c, m, f, p, $),
                    document.getElementById("ZfEmbedFlyoutBottomBarCont").getElementsByClassName("zf-embed-iframe")[0].onload = function() {
                        S.style.display = "none"
                    }
                    ,
                    window.addEventListener("message", zfem_cons.bottomBarPostMessageHandler = function(e) {
                        var t = e.data.hasOwnProperty("event_id") ? e.data.event_id : e.data;
                        "surveyform.loaded" === t && setTimeout(function() {
                            "mobile" == zfem_cons.deviceType ? T.style.bottom = "10px" : T.style.bottom = l.bottom_padding ? l.bottom_padding + "px" : "10px"
                        }, 10),
                        ("zf-embed-submit-close" === t || "zf-embed-submit-only" === t) && (l.visibleTill && "submit" == l.visibleTill && (_zfSetZfEmbedSurveyCookie(zfem_cons.arrSubmitSurveyCookie[o], "hide"),
                        document.getElementById("ZfEmbedFlypopBottomButton").remove()),
                        zfem_cons.submitEvent = new CustomEvent("onSubmit",{
                            detail: {
                                urc: o,
                                type: "sidetab"
                            }
                        }),
                        document.body.dispatchEvent(zfem_cons.submitEvent),
                        window.removeEventListener("message", zfem_cons.bottomBarPostMessageHandler),
                        "zf-embed-submit-close" === t && em.click()),
                        zfem_cons.enableMicroWidget && "micro" == b && "zf-embed-expand-widget" === t && "mobile" !== zfem_cons.deviceType && "tablet" !== zfem_cons.deviceType ? (T.style.transition = "all 1s",
                        T.style.height = "100%",
                        T.style.marginTop = "-250px",
                        T.style.top = "inherit",
                        T.style.maxHeight = "500px",
                        ef > window.innerHeight - 500 && (T.style.top = "16px",
                        T.style.marginTop = "initial")) : zfem_cons.enableMicroWidget && "micro" == b && "zf-embed-expand-widget" === t && ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && (T.style.transition = "all 1s",
                        T.style.height = "100%",
                        T.style.maxHeight = "500px"),
                        "zf-embed-auto-height-adaptiveness-widget" === t && (T.style.transition = "all 0.3s",
                        T.style.height = e.data.data.v1 + 109 + "px",
                        "tablet" == zfem_cons.deviceType ? T.style.maxHeight = "550px" : T.style.maxHeight = "75vh")
                    }
                    , !1)
                }
            }
        }
        ;
        break;
    default:
        console.log("Invalid embed survey method")
    }
}
function modalBox(e="", t=!1, o="") {
    var i = '<svg style="height:100%;" viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>'
      , n = 320
      , s = 270
      , a = "inherit";
    -1 !== zfem_cons.customAdaniAccounts.indexOf(zfem_cons.cmpId) && (n = 360,
    s = 410,
    a = "rgba(0,0,0,.6)",
    i = '<svg width="14" height="14" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Cancel" d="M2.46365 2.76161C1.80338 3.5706 1.85055 4.7604 2.60514 5.51499L13.0903 16L2.60514 26.4879C1.80024 27.2928 1.80024 28.5929 2.60514 29.3978L2.76162 29.5393C3.57062 30.1995 4.76041 30.1524 5.51501 29.3978L16.0015 18.9112L26.4879 29.3978C27.2928 30.2027 28.5929 30.2027 29.3978 29.3978L29.5393 29.2413C30.1995 28.4323 30.1524 27.2425 29.3978 26.4879L18.9112 16L29.3978 5.51499C30.1813 4.73143 30.1813 3.41003 29.3978 2.62647L29.2413 2.48498C28.4323 1.82469 27.2425 1.87192 26.4877 2.62667L16.0001 13.0903L5.51501 2.60513C4.71011 1.80022 3.41004 1.80022 2.60514 2.60513L2.46365 2.76161Z" fill="#222222" stroke="#222222" stroke-width="0.3"/></svg>');
    var r = "72%"
      , l = "60%"
      , d = "top:0;"
      , c = n + "px"
      , m = ""
      , f = "";
    "micro" == e && zfem_cons.enableMicroWidget ? (r = s + "px",
    l = "100%") : "micro" == e && (r = "100%",
    l = "100%",
    d = "top:inherit;"),
    "mobile" == zfem_cons.deviceType && "micro" == e && zfem_cons.enableMicroWidget ? (r = "320px",
    -1 !== zfem_cons.customAdaniAccounts.indexOf(zfem_cons.cmpId) && (r = "410px"),
    l = "100%",
    d = "top:auto;",
    m = "margin:10px 0px 0px 20px;") : "tablet" == zfem_cons.deviceType && "micro" == e && zfem_cons.enableMicroWidget && "article-embed" !== o ? (r = "100%",
    l = "100%",
    d = "top:inherit;",
    m = "margin:10px 0px 0px 20px;") : ("mobile" != zfem_cons.deviceType || "micro" != e || zfem_cons.enableMicroWidget) && ("tablet" != zfem_cons.deviceType || "micro" != e || zfem_cons.enableMicroWidget) ? ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType && "article-embed" !== o) && (r = "100%",
    l = "100%") : (l = "100%",
    r = "100%",
    d = "top:inherit;");
    var p = ""
      , $ = ""
      , b = "";
    if ("article-embed" == o && ($ = "pointer-events:none;",
    b = "pointer-events:visible;"),
    "micro" == e) {
        if ("mobile" == zfem_cons.deviceType) {
            if (zfem_cons.enableMicroWidget) {
                var _ = (screen.width - n) / 2 + "px";
                p = '<div id="ZfEmbedPopModalBox" class="zf-embed-modal" style="' + $ + "bottom:" + _ + ";box-shadow: 0px 0px 15px 0px rgba(0,0,0,.4);display: none;position: fixed;z-index: 2147483003;top:0;left: 0;right:inherit;width: 100%;height: 100%;overflow: inherit; background-color: " + a + ';">'
            } else
                p = '<div id="ZfEmbedPopModalBox" class="zf-embed-modal" style="' + $ + "box-shadow: 0px 0px 15px 0px rgba(0,0,0,.4);display: none;position: fixed;z-index: 2147483003;top:inherit;left: 50%;margin-left:-160px;right:inherit;width: 100%;bottom:15px;max-height:500px;height:100%;overflow:inherit;border-radius:10px;max-width:" + n + "px;background-color: " + a + ';">'
        } else if ("tablet" == zfem_cons.deviceType && "article-embed" !== o)
            p = zfem_cons.enableMicroWidget ? '<div id="ZfEmbedPopModalBox" class="zf-embed-modal" style="' + $ + "box-shadow: 0px 0px 15px 0px rgba(0,0,0,.4);display: none;position: fixed;z-index: 2147483003;top:inherit;bottom:15px;left: 15px;right:inherit;width: 100%;height: " + s + "px;max-width:" + n + "px;overflow: inherit;border-radius:10px; background-color: " + a + ';">' : '<div id="ZfEmbedPopModalBox" class="zf-embed-modal" style="' + $ + "box-shadow: 0px 0px 15px 0px rgba(0,0,0,.4);display: none;position: fixed;z-index: 2147483003;top:inherit;left: 15px;right:inherit;width: 100%;bottom:15px;max-height:500px;height:100%;overflow:inherit;border-radius:10px;max-width:" + n + "px;background-color: " + a + ';">';
        else if (zfem_cons.enableMicroWidget)
            p = '<div id="ZfEmbedPopModalBox" class="zf-embed-modal" style="' + $ + "box-shadow: 0px 0px 15px 0px rgba(0,0,0,.4);display: none;position: fixed;z-index: 2147483003;top:0;left: 0;width: 100%;height: 100%;bottom:15px;overflow: auto; background-color: rgb(0,0,0);background-color: " + a + ';">';
        else {
            var _ = (screen.width - n) / 2 + "px";
            p = '<div id="ZfEmbedPopModalBox" class="zf-embed-modal" style="' + $ + "box-shadow: 0px 0px 15px 0px rgba(0,0,0,.4);display: none;position: fixed;z-index: 2147483003;top:inherit;left: " + _ + ";right:inherit;width: 100%;bottom:15px;max-height:500px;height:100%;overflow:inherit;border-radius:10px;max-width:" + n + "px;background-color: " + a + ';">'
        }
        var g = "15px";
        -1 !== zfem_cons.customAdaniAccounts.indexOf(zfem_cons.cmpId) && (g = (screen.height - s) / 2 + "px"),
        p = "mobile" == zfem_cons.deviceType ? p + '<div class="zf-embed-modal-content" style="' + b + m + d + "background-color: #fefefe;margin: auto;padding: 0px;border: none;max-width:" + c + ";width:" + l + ";height:" + r + ";justify-content: center;align-items: center;display:flex;bottom:" + g + ";position:absolute;border-radius: 10px !important; box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 15px 0px;left:50%;margin-left:" + -(n / 2) + 'px;">' : p + '<div class="zf-embed-modal-content" style="' + b + m + d + "background-color: #fefefe;margin: auto;padding: 0px;border: none;max-width:" + c + ";width:" + l + ";height:" + r + ';justify-content: center;align-items: center;display:flex;position:relative;border-radius: 10px !important; box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 15px 0px;">',
        f = "right: 20px;top: -10px;",
        t && (f = "right: 0px;top: -2px;",
        -1 !== zfem_cons.customAdaniAccounts.indexOf(zfem_cons.cmpId) && (f = "left: 17px;top: 33px; width:22px;height:22px;")),
        p = (p = p + '<span class="zf-embed-close" style="' + f + 'position: absolute;cursor: pointer;" title="close">') + '<span class="zf-micro-close-button">' + i + "</span>"
    } else
        f = "font-size: 16px;",
        t && (f = "font-size: 14px;"),
        p = (p = (p = '<div id="ZfEmbedPopModalBox" class="zf-embed-modal" style="display: none;position: fixed;z-index: 2147483003;top:0;left: 0;width: 100%;height: 100%;overflow: auto; background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.7);">') + '<div class="zf-embed-modal-content" style="' + b + "background-color:inherit;margin: auto;padding: 0px;border-radius:10px;border: 0px;width:" + l + ";height:" + r + ';justify-content: center;align-items: center;display:flex;position:relative;">') + '<span class="zf-embed-close" title="close"><svg style="' + f + 'height:100%;" viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>';
    return p += "</span>",
    p += '<p style="align:center;height:100%;width:100%;display:block;margin:0px;flex:1;" id="ZfEmbedPopModalFrameConainer"><h5 class="zf-pre-loaded-text" style="position: absolute;top: 50%;left: 50%;transform: translateX(-50%);"><div class="zf-embed-loader zf-embed-loader-animation"><span class="zf-embed-box"></span><span class="zf-embed-box"></span><span class="zf-embed-box"></span><span class="zf-embed-box"></span></div></h5></p></div></div>'
}
function flypopBox(e="") {
    var t = '<h5 class="zf-pre-loaded-text"><div class="abc zf-embed-loader zf-embed-loader-animation"><span class="zf-embed-box"></span><span class="zf-embed-box"></span><span class="zf-embed-box"></span><span class="zf-embed-box"></span></div></h5><div class="zf-embed-flyout-sub-cont">';
    return "micro" == e ? (t += '<span class="zf-embed-flypop-sub-cont-span">',
    t += '<span class="zf-micro-close-button"><svg style="height:100%;" viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></span></span>') : t += '<svg style="height:100%;font-size:14px;" viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>',
    t += "</div>"
}
function flypopBottomBarBox(e="") {
    var t = '<h5 class="zf-pre-loaded-text"><div class="abc zf-embed-loader zf-embed-loader-animation"><span class="zf-embed-box"></span><span class="zf-embed-box"></span><span class="zf-embed-box"></span><span class="zf-embed-box"></span></div></h5><div class="zf-embed-flyout-bottom-bar-sub-cont">';
    return "micro" == e ? (t += '<span class="zf-embed-flypop-sub-cont-span">',
    t += '<span class="zf-micro-close-button"><svg style="height:100%;" viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></span></span>') : t += '<svg style="height:100%;" viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>',
    t += "</div>"
}
function flypopSlideUpBox(e="") {
    var t = '<h5 class="zf-pre-loaded-text"><div class="abc zf-embed-loader zf-embed-loader-animation"><span class="zf-embed-box"></span><span class="zf-embed-box"></span><span class="zf-embed-box"></span><span class="zf-embed-box"></span></div></h5><div class="zf-embed-flyout-slideup-sub-cont">';
    return "micro" == e ? (t += '<span class="zf-embed-flypop-sub-cont-span">',
    t += '<span class="zf-micro-close-button"><svg style="height:100%;" viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></span></span>') : t += '<svg style="height:100%;" viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>',
    t += "</div>"
}
function _zfCF(e, t, o, i, n, s, a, r, l, d, c, m, f, p, $) {
    var b = _zfIsIOSDevice() ? "ios" : "other";
    mainFrameUrl = i;
    var _ = e.createElement("iframe");
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zf_embed=1"),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zf_embeddev=" + zfem_cons.deviceType),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zf_embeddevos=" + b),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zf_embedtype=" + o),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zf_embedintrooff=" + n),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zf_embedheaderoff=" + s),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zf_embedfooteroff=" + a),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zf_embedautoclose=" + r),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zf_embednavigation=" + l),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zf_embedwidgetvariant=" + d),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "utm_source=" + c),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "utm_medium=" + m),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "utm_campaign=" + f),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "utm_content=" + p),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "utm_term=" + $),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zfsource_PageTitle=" + document.title),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zfsource_pp_domain=" + window.location.hostname),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zfsource_pp_url=" + encodeURIComponent(window.location.href)),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zfsource_pp_pageurl=" + (window.location.origin + window.location.pathname)),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zfsource_pp_path=" + (zfem_cons.customPagePath ? zfem_cons.customPagePath : window.location.pathname)),
    mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "zfsource_pp_pagename=" + (zfem_cons.customPageTitle ? zfem_cons.customPageTitle : document.title)),
    zfem_cons.selectedChoiceItem && (mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "choice=" + zfem_cons.selectedChoiceItem),
    zfem_cons.selectedChoiceItem = "");
    var g = ["url", "type", "button_text", "button_text_color", "button_bg_color", "introscreen", "welcomescreen", "header", "logo", "footer", "progress", "autoclose", "navigation", "width", "height", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "variant"]
      , u = []
      , y = window._zfQueue.find(e => "variables" == e[0]);
    if (y)
        for (var z in y[1])
            y[1].hasOwnProperty(z) && -1 === g.indexOf(z) && (u.push(z),
            mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, z + "=" + y[1][z]));
    var h = window._zfQueue.find(e => "settings" == e[0])
      , x = "";
    if (h) {
        for (var z in h[1])
            if (h[1].hasOwnProperty(z)) {
                var v = _zfSetInteractionLanguage(h[1][z], !0);
                -1 !== zfem_cons.settingVariables.indexOf(z) && "lang" == z && v && (x = "language",
                u.push(z),
                mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, x + "=" + v))
            }
    }
    -1 === u.indexOf("language") && _zfSetInteractionLanguage(document.documentElement.lang, !0) && (mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "language=" + zfem_cons.detectedLang));
    var C = _zfGetZfEmbedSurveyCookie(zfem_cons.visCId)
      , w = localStorage.getItem(C)
      , k = w ? JSON.parse(w) : {};
    k.contactId && (mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "contactId=" + k.contactId)),
    k.cookieId && (mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "cookieId=" + k.cookieId)),
    k.externalVisitorId && (mainFrameUrl = _zfAaddParameterToURL(mainFrameUrl, "externalVisitorId=" + k.externalVisitorId)),
    _.setAttribute("src", encodeURI(mainFrameUrl)),
    _.setAttribute("class", "zf-embed-iframe"),
    _.setAttribute("id", "ZfEmbedIFrame"),
    _.style.width = "100%",
    _.style.height = "100%",
    _.style.border = "none",
    t.prepend(_)
}
function _zfAaddParameterToURL(e, t) {
    var o = e;
    return o + ((o.split("?")[1] ? "&" : "?") + t)
}
function _zfAddPowerdByBranding(e) {
    var t = document.createElement("div");
    t.className = "powerd-by-element",
    t.innerHTML = "<div style='background:#000000;color:#ffffff;'>Powered By Zonka</div>",
    e.appendChild(t)
}
function _zfFadeIn(e) {
    var t = .1
      , o = setInterval(function() {
        t >= 1 && clearInterval(o),
        e.style.opacity = t,
        t += .1
    }, 50)
}
function _zfPopupStyle(e="", t=!1, o={}) {
    var i = o ? o.fontColorLabel : "rgba(0,0,0,0.8)"
      , n = "14px"
      , s = "26px"
      , a = "26px"
      , r = "26px";
    -1 !== zfem_cons.customAdaniAccounts.indexOf(zfem_cons.cmpId) && (i = "#222222",
    n = "20px",
    s = "20px",
    a = "20px",
    r = "0");
    var l = ""
      , d = '@import "//fonts.googleapis.com/css?family=Open+Sans";';
    return d += ".zf-embed-loader{width:20px;height:20px;display:inline-block;position:relative}.zf-embed-box:nth-child(1){stop:0;left:0}.zf-embed-box:nth-child(2){top:0;right:0;-webkit-animation-delay:.4s;animation-delay:.4s}.zf-embed-box:nth-child(3){right:0;bottom:0;-webkit-animation-delay:.8s;animation-delay:.8s}.zf-embed-box:nth-child(4){bottom:0;left:0;-webkit-animation-delay:1.2s;animation-delay:1.2s}.zf-embed-loader .zf-embed-box{width:9px;height:9px;background:#2bc4f2;display:block;border-radius:50%;position:absolute;-webkit-transform:scale(0.75);-ms-transform:scale(0.75);transform:scale(0.75)}.zf-embed-loader-animation{-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:antRotate 1.2s infinite linear;animation:antRotate 1.2s infinite linear}@keyframes antRotate{100%{-webkit-transform:rotate(405deg);transform:rotate(405deg)}}",
    d += ".zf-pre-loaded-text{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);margin:0px;color:#1ac3f4;}",
    "micro" == e ? d += ".zf-embed-iframe{border-radius:8px !important;}" : d += ".zf-embed-iframe{border-radius:10px  box-shadow:0px 0px 15px 0px rgba(0,0,0,.4);}",
    l = "right: 20px;top: 14px;background: " + zfem_cons.widgetCloseBgColor + ";color:" + zfem_cons.widgetCloseFontColor + ";",
    t && (l = "right: 0px;top: -2px;background:transparent;color:" + i + ";"),
    d = d + ".zf-embed-close {" + l + "position: absolute;width: 26px;height: 26px;line-height: " + r + ";border-radius: 50%;display: inline-block;text-align: center;cursor: pointer;}",
    d = t ? d + "#ZfEmbedPopModalBox span.zf-micro-close-button { width: " + a + ";height: " + s + "; line-height:" + r + ";border-radius: 50%;display: inline-block;text-align: center;cursor: pointer;color: " + zfem_cons.widgetCloseFontColor + ";background:transparent;} #ZfEmbedPopModalBox span.zf-micro-close-button svg {display:inline-block;font-size: " + n + ";position: relative; z-index: 10; vertical-align: inherit;color:" + i + ";}#ZfEmbedPopModalBox .zf-micro-close-button:hover {opacity:.9; background:transparent;}" : d + "#ZfEmbedPopModalBox span.zf-micro-close-button { width: 26px;height: 26px; line-height:26px;border-radius: 50%;display: inline-block;text-align: center;cursor: pointer;color: " + zfem_cons.widgetCloseFontColor + ";} #ZfEmbedPopModalBox span.zf-micro-close-button svg {display:inline-block;font-size: 16px;position: relative; z-index: 10; vertical-align: inherit;color:#ffffff;}#ZfEmbedPopModalBox .zf-micro-close-button:hover {opacity:.9; background: " + zfem_cons.widgetCloseBgColor + ";}"
}
function _zfFlyoutStyle(e, t="", o=!1) {
    var i = '@import "//fonts.googleapis.com/css?family=Open+Sans";';
    i += ".zf-embed-loader{width:20px;height:20px;display:inline-block;position:relative}.zf-embed-box:nth-child(1){stop:0;left:0}.zf-embed-box:nth-child(2){top:0;right:0;-webkit-animation-delay:.4s;animation-delay:.4s}.zf-embed-box:nth-child(3){right:0;bottom:0;-webkit-animation-delay:.8s;animation-delay:.8s}.zf-embed-box:nth-child(4){bottom:0;left:0;-webkit-animation-delay:1.2s;animation-delay:1.2s}.zf-embed-loader .zf-embed-box{width:9px;height:9px;background:#2bc4f2;display:block;border-radius:50%;position:absolute;-webkit-transform:scale(0.75);-ms-transform:scale(0.75);transform:scale(0.75)}.zf-embed-loader-animation{-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:antRotate 1.2s infinite linear;animation:antRotate 1.2s infinite linear}@keyframes antRotate{100%{-webkit-transform:rotate(405deg);transform:rotate(405deg)}}";
    var n = "";
    return "micro" == t && (i += ".zf-embed-iframe{border-radius:10px;}",
    i = i + "#ZfEmbedFlyoutCont span.zf-micro-close-button {background: " + zfem_cons.widgetCloseBgColor + "; width:26px; height:26px; line-height:26px; border-radius: 50%; display: inline-block; text-align: center; cursor: pointer;color:" + zfem_cons.widgetCloseFontColor + ";}.#ZfEmbedFlyoutCont zf-micro-close-button svg{display:inline-block;font-size:14px;  position: relative;  z-index:10; vertical-align: inherit;}.#ZfEmbedFlyoutCont zf-micro-close-button:hover{opacity:.9;background:" + zfem_cons.widgetCloseBgColor + "}",
    i += ".zf-embed-flyout-cont{border-radius:10px; box-shadow:  rgb(0 0 0 / 35%) 0 6px 70px 0;right:30px}"),
    "right" === e ? (i += ".zf-embed-flypop-button button{text-decoration: none;text-transform: capitalize;font-size:16px;position:relative;border:none;outline:0;padding:12px 12px 12px 10px;cursor:pointer;background-color:#1eb6e4;transition:.1s ease-in-out;width:40px;display:flex;flex-direction:column;align-items:flex-start;border-radius:6px 0px 0px 6px;letter-spacing:.2px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif!important;transform:translateX(2px);-webkit-transform:translateX(2px);min-height:65px;height:auto !important;text-align:center;justify-content:center;line-height: initial}",
    i += ".zf-embed-flypop-button button:hover{box-shadow:0 0 35px 2px rgb(0 0 0 / 20%)!important;transform:translateX(0px);-webkit-transform:translateX(0px)}",
    i += ".zf-embed-flypop-button button span{font-weight: normal;color:#fff;writing-mode:vertical-lr;-webkit-writing-mode:vertical-lr;transform:rotate(180deg);}",
    i += ".zf-embed-flypop-button{z-index:999;position:fixed;right:0px;top:50%;transform:translateY(-50%);display:block;direction:ltr!important;margin-top:-20px}",
    i += ".zf-embed-flyout-cont{visibility:hidden;position:fixed;box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 15px 0px;width:0;top:0%;margin-top:0px;height:100%;right:0px ;z-index: 2147483003;transition: width .6s ease-out;}",
    "micro" == t ? (("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && (i += ".zf-embed-flyout-cont{visibility:hidden;position:fixed;box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 15px 0px;width:100%;top:0%;margin-top:0px;height:0%;right:5%; left:5%;z-index: 2147483003; transition: none;}"),
    n = "top: -10px !important;right: 20px !important;right:unset;",
    o && (n = "top: -2px !important;right: 0px !important;left:unset!important;"),
    i = i + ".zf-embed-flyout-sub-cont {" + n + "display: none;position: absolute;cursor: pointer;}") : (n = "left: 6px;top: 6px;background: " + zfem_cons.widgetCloseBgColor + ";right:unset!important;",
    o && (n = "right: 0px;top: -2px; background: transparent;"),
    i = i + ".zf-embed-flyout-sub-cont {" + n + "display: none; position: absolute; cursor: pointer; width: 26px; height: 26px;line-height: 26px; border-radius: 50%; display:inline-block; text-align: center; color: " + zfem_cons.widgetCloseFontColor + ";}"),
    i += ".zf-embed-flypop-sub-cont-span{display: inline-block;}") : (i += ".zf-embed-flypop-button button{text-decoration: none;text-transform: capitalize;font-size:16px;position:relative;border:none;outline:0;padding:12px 12px 12px 10px;cursor:pointer;background-color:#1eb6e4;transition:.1s ease-in-out;width:42px;display:flex;flex-direction:column;align-items:flex-start;border-radius:0px 6px 6px 0px;letter-spacing:.2px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif!important;transform:translateX(0px);-webkit-transform:translateX(0px);min-height:65px;height:auto !important;text-align:center;justify-content:center;line-height: initial}",
    i += ".zf-embed-flypop-button button:hover{box-shadow:0 0 35px 2px rgb(0 0 0 / 20%)!important;transform:translateX(2px);-webkit-transform:translateX(2px)}",
    i += ".zf-embed-flypop-button button span{font-weight: normal;color:#fff;writing-mode:vertical-lr;-webkit-writing-mode:vertical-lr;transform:rotate(0deg)}",
    i += ".zf-embed-flypop-button{z-index:999;position:fixed;left:-2px;top:50%;transform:translateY(-50%);display:block;direction:ltr!important;margin-top:-20px}",
    i += ".zf-embed-flyout-cont{visibility:hidden;position:fixed;box-shadow: 0 6px 100px 0 rgba(0,0,0,.35)!important;width:0;top:0px;margin-top:0px;height:100%;left:0px;z-index: 2147483003;transition: width .6s ease-out;background:#fff;}",
    "micro" == t ? (("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && (i += ".zf-embed-flyout-cont{visibility:hidden;position:fixed;box-shadow: 0 6px 100px 0 rgba(0,0,0,.35)!important;width:100%;margin-top:0px;height:0%;right:5%; left:5%;z-index: 2147483003;transition: none;}"),
    n = "top: -10px !important;left: 20px !important;right:unset!important;",
    o && (n = "top: -2px !important;right: 0px !important;left:unset!important;"),
    i = i + ".zf-embed-flyout-sub-cont {" + n + "display:none;position:absolute;cursor: pointer;}") : (n = "right: 6px;top: 6px;background: " + zfem_cons.widgetCloseBgColor + ";left:unset!important;",
    o && (n = "right: 0px;top: -2px; background: transparent;"),
    i = i + ".zf-embed-flyout-sub-cont {" + n + "display: none; position: absolute; cursor: pointer; width: 26px; height: 26px;line-height: 26px; border-radius: 50%; display:inline-block; text-align: center; color: " + zfem_cons.widgetCloseFontColor + ";}"),
    i += ".zf-embed-flypop-sub-cont-span{display: inline-block;}"),
    i += ".zf-pre-loaded-text{position:absolute;top:52%;left:50%;transform:translate(-50%,-50%);margin:0px;color:#1ac3f4;}"
}
function _zfFlyoutBottomBarStyle(e, t="", o=!1) {
    var i = zfem_cons.workspaceDistrbutions.bottomBarWidget ? zfem_cons.workspaceDistrbutions.bottomBarWidget.fontColorLabel : "rgba(0,0,0,0.8)"
      , n = ""
      , s = '@import "//fonts.googleapis.com/css?family=Open+Sans";';
    if (s += ".zf-embed-loader{width:20px;height:20px;display:inline-block;position:relative}.zf-embed-box:nth-child(1){stop:0;left:0}.zf-embed-box:nth-child(2){top:0;right:0;-webkit-animation-delay:.4s;animation-delay:.4s}.zf-embed-box:nth-child(3){right:0;bottom:0;-webkit-animation-delay:.8s;animation-delay:.8s}.zf-embed-box:nth-child(4){bottom:0;left:0;-webkit-animation-delay:1.2s;animation-delay:1.2s}.zf-embed-loader .zf-embed-box{width:9px;height:9px;background:#2bc4f2;display:block;border-radius:50%;position:absolute;-webkit-transform:scale(0.75);-ms-transform:scale(0.75);transform:scale(0.75)}.zf-embed-loader-animation{-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:antRotate 1.2s infinite linear;animation:antRotate 1.2s infinite linear}@keyframes antRotate{100%{-webkit-transform:rotate(405deg);transform:rotate(405deg)}}",
    "micro" == t) {
        var a = "background: #000000;color:" + zfem_cons.widgetCloseFontColor + ";";
        o && (a = "color:" + i + ";background:transparent;"),
        s += ".zf-embed-iframe{border-radius:10px;}",
        s = s + ".zf-embed-flyout-bottom-bar-sub-cont span.zf-micro-close-button {" + a + "width:26px; height:26px; line-height:26px; border-radius: 50%; display: inline-block; text-align: center; cursor: pointer;}.zf-embed-flyout-bottom-bar-sub-cont .zf-micro-close-button svg{display:inline-block;font-size:14px;  position: relative;  z-index:10;}.zf-embed-flyout-bottom-bar-sub-cont .zf-micro-close-button:hover{opacity:.9;}",
        s += ".zf-embed-flyout-bottom-bar-cont{border-radius:10px; box-shadow:  rgb(0 0 0 / 35%) 0 6px 70px 0;right:30px}"
    }
    return "right" === e ? (s += ".zf-embed-flypop-bottom-button button{text-decoration: none;text-transform: unset;font-size:14px;position:relative;border:none;outline:0;padding:10px 10px 10px 10px;cursor:pointer;background-color:#1eb6e4;transition:.1s ease-in-out;width:320px;display:flex;flex-direction:column;align-items:center;border-radius:6px 6px 6px 6px;letter-spacing:.2px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif!important;min-height:45px;text-align:center;justify-content:center}",
    s += ".zf-embed-flypop-bottom-button button span{font-weight: normal;color:#fff;}",
    s += ".zf-embed-flypop-bottom-button{z-index:99;position:fixed;display:block;direction:ltr!important;}",
    s += ".zf-embed-flyout-bottom-bar-cont{visibility:hidden;position:fixed;box-shadow: rgb(0 0 0 / 40%) 0px 0px 15px 0px;width:100%;top:0%;margin-top:0px;height:100%;right:0px ;z-index: 2147483003;transition: bottom 0.3s ease-in;}",
    n = "right: 20px !important;top: -10px !important;",
    o && (n = "right: 0px !important;top: -2px !important;left: unset !important;"),
    "micro" == t ? (("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && (s += ".zf-embed-flyout-bottom-bar-cont{visibility:hidden;position:fixed;box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 15px 0px;width:100%;top:0%;margin-top:0px;height:0%;right:5%; left:5%;z-index: 2147483003; transition: none;}"),
    s = s + ".zf-embed-flyout-bottom-bar-sub-cont {" + n + "display: none;position: absolute;cursor: pointer;}") : s = s + ".zf-embed-flyout-bottom-bar-sub-cont {" + n + "display: none; position: absolute; cursor: pointer; background: " + zfem_cons.widgetCloseBgColor + ";width: 26px; height: 26px;line-height: 26px; border-radius: 50%; display:inline-block; text-align: center; color: " + zfem_cons.widgetCloseFontColor + ";}",
    s += ".zf-embed-flypop-sub-cont-span{display: inline-block;}") : (s += ".zf-embed-flypop-bottom-button button{text-decoration: none;text-transform: unset;font-size:14px;position:relative;border:none;outline:0;padding:10px 10px 10px 10px;cursor:pointer;background-color:#1eb6e4;transition:.1s ease-in-out;width:320px;display:flex;flex-direction:column;align-items:center;border-radius:6px 6px 6px 6px;letter-spacing:.2px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif!important;min-height:45px;text-align:center;justify-content:center}",
    s += ".zf-embed-flypop-bottom-button button span{font-weight: normal;color:#fff;}",
    s += ".zf-embed-flypop-bottom-button{z-index:99;position:fixed;display:block;direction:ltr!important;}",
    s += ".zf-embed-flyout-bottom-bar-cont{visibility:hidden;position:fixed;box-shadow: rgb(0 0 0 / 40%) 0px 0px 15px 0px!important;width:100%;left:0px;top:0px;margin-top:0px;height:100%;left:0px;z-index: 2147483003;transition: bottom 0.3s ease-in;background:#fff;}",
    n = "top: -10px !important;right: 20px !important;",
    o && (n = "left: unset !important;top: -2px !important;right: 0px !important;"),
    "micro" == t ? (("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && (s += ".zf-embed-flyout-bottom-bar-cont{visibility:hidden;position:fixed;box-shadow: 0 6px 100px 0 rgba(0,0,0,.35)!important;width:100%;margin-top:0px;height:0%;right:5%; left:5%;z-index: 2147483003;transition: none;}"),
    s = s + ".zf-embed-flyout-bottom-bar-sub-cont {" + n + "display:none;position:absolute;cursor: pointer;}") : s = s + ".zf-embed-flyout-bottom-bar-sub-cont {" + n + "display: none; position: absolute; cursor: pointer;width: 26px; height: 26px;line-height: 26px; border-radius: 50%; display:inline-block; text-align: center;}",
    s += ".zf-embed-flypop-sub-cont-span{display: inline-block;}"),
    s += ".zf-pre-loaded-text{position:absolute;top:52%;left:50%;transform:translate(-50%,-50%);margin:0px;color:#1ac3f4;}"
}
function _zfFlyoutSlideUpStyle(e, t="", o=!1) {
    var i = zfem_cons.workspaceDistrbutions.slideUpWidget ? zfem_cons.workspaceDistrbutions.slideUpWidget.fontColorLabel : "rgba(0,0,0,0.8)"
      , n = '@import "//fonts.googleapis.com/css?family=Open+Sans";';
    if (n += ".zf-embed-loader{width:20px;height:20px;display:inline-block;position:relative}.zf-embed-box:nth-child(1){stop:0;left:0}.zf-embed-box:nth-child(2){top:0;right:0;-webkit-animation-delay:.4s;animation-delay:.4s}.zf-embed-box:nth-child(3){right:0;bottom:0;-webkit-animation-delay:.8s;animation-delay:.8s}.zf-embed-box:nth-child(4){bottom:0;left:0;-webkit-animation-delay:1.2s;animation-delay:1.2s}.zf-embed-loader .zf-embed-box{width:9px;height:9px;background:#2bc4f2;display:block;border-radius:50%;position:absolute;-webkit-transform:scale(0.75);-ms-transform:scale(0.75);transform:scale(0.75)}.zf-embed-loader-animation{-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);-webkit-animation:antRotate 1.2s infinite linear;animation:antRotate 1.2s infinite linear}@keyframes antRotate{100%{-webkit-transform:rotate(405deg);transform:rotate(405deg)}}",
    "micro" == t) {
        var s = "background: #000000;color:" + zfem_cons.widgetCloseFontColor + ";";
        o && (s = "color:" + i + ";background:transparent;"),
        n += ".zf-embed-iframe{border-radius:10px;}",
        n = n + ".zf-embed-flyout-slideup-sub-cont span.zf-micro-close-button {" + s + "width:26px; height:26px; line-height:26px; border-radius: 50%; display: inline-block; text-align: center; cursor: pointer;}.zf-embed-flyout-slideup-sub-cont .zf-micro-close-button svg{display:inline-block;font-size:14px;  position: relative;  z-index:10;}.zf-embed-flyout-slideup-sub-cont .zf-micro-close-button:hover{opacity:.9;}",
        n += ".zf-embed-flyout-slideup-cont{border-radius:10px; box-shadow:  rgb(0 0 0 / 35%) 0 6px 70px 0;right:30px}"
    }
    return "right" === e || "center" === e || "large" == t ? (n += ".zf-embed-flypop-slideup-button button{text-decoration: none;text-transform: capitalize;font-size:16px;position:relative;border:none;outline:0;padding:12px 12px 12px 10px;cursor:pointer;background-color:#1eb6e4;transition:.1s ease-in-out;width:40px;display:flex;flex-direction:column;align-items:flex-start;border-radius:6px 0px 0px 6px;letter-spacing:.2px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif!important;transform:translateX(2px);-webkit-transform:translateX(2px);min-height:65px;text-align:center;justify-content:center}",
    n += ".zf-embed-flypop-slideup-button button:hover{box-shadow:0 0 35px 2px rgb(0 0 0 / 20%)!important;transform:translateX(0px);-webkit-transform:translateX(0px)}",
    n += ".zf-embed-flypop-slideup-button button span{font-weight: normal;color:#fff;writing-mode:vertical-lr;-webkit-writing-mode:vertical-lr;transform:rotate(180deg);}",
    n += ".zf-embed-flypop-slideup-button{z-index:99;position:fixed;right:0px;top:50%;transform:translateY(-50%);display:block;direction:ltr!important;margin-top:-20px}",
    n += ".zf-embed-flyout-slideup-cont{visibility:hidden;position:fixed;box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 15px 0px;width:0;top:0%;margin-top:0px;height:100%;right:0px ;z-index: 2147483003;transition: width .6s ease-out;}",
    "micro" == t ? (closeButPoitionSwitchCSS = "right: 20px !important;top: -10px !important;left: unset !important;",
    o && (closeButPoitionSwitchCSS = "right: 0px !important;top: -2px !important;left: unset !important;"),
    ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && (n += ".zf-embed-flyout-slideup-cont{visibility:hidden;position:fixed;box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 15px 0px;width:100%;top:0%;margin-top:0px;height:0%;right:5%; left:5%;z-index: 2147483003; transition: none;}"),
    n = n + ".zf-embed-flyout-slideup-sub-cont {" + closeButPoitionSwitchCSS + "display: none;position: absolute;cursor: pointer;}") : (closeButPoitionSwitchCSS = "right: 20px !important;top: -10px !important;background: #000000;",
    closeButPoitionSwitchCSSSvg = "color:" + zfem_cons.widgetCloseFontColor + ";",
    o && (closeButPoitionSwitchCSS = "right: 0px;top: -2px;background: transparent;",
    closeButPoitionSwitchCSSSvg = "color:" + i + ";"),
    n = n + ".zf-embed-flyout-slideup-sub-cont {" + closeButPoitionSwitchCSS + " display: none; position: absolute; cursor: pointer; width: 26px; height: 26px;line-height: 26px; border-radius: 50%; display:inline-block; text-align: center; color: " + zfem_cons.widgetCloseFontColor + ";}.zf-embed-flyout-slideup-sub-cont svg {" + closeButPoitionSwitchCSSSvg + "display: inline-block; font-size: 14px; position: relative; z-index: 10;}"),
    n += ".zf-embed-flypop-sub-cont-span{display: inline-block;}") : (n += ".zf-embed-flypop-slideup-button button{text-decoration: none;text-transform: capitalize;font-size:16px;position:relative;border:none;outline:0;padding:12px 12px 12px 10px;cursor:pointer;background-color:#1eb6e4;transition:.1s ease-in-out;width:42px;display:flex;flex-direction:column;align-items:flex-start;border-radius:0px 6px 6px 0px;letter-spacing:.2px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif!important;transform:translateX(0px);-webkit-transform:translateX(0px);min-height:65px;text-align:center;justify-content:center}",
    n += ".zf-embed-flypop-slideup-button button:hover{box-shadow:0 0 35px 2px rgb(0 0 0 / 20%)!important;transform:translateX(2px);-webkit-transform:translateX(2px)}",
    n += ".zf-embed-flypop-slideup-button button span{font-weight: normal;color:#fff;writing-mode:vertical-lr;-webkit-writing-mode:vertical-lr;transform:rotate(0deg)}",
    n += ".zf-embed-flypop-slideup-button{z-index:99;position:fixed;left:-2px;top:50%;transform:translateY(-50%);display:block;direction:ltr!important;margin-top:-20px}",
    n += ".zf-embed-flyout-slideup-cont{visibility:hidden;position:fixed;box-shadow: 0 6px 100px 0 rgba(0,0,0,.35)!important;width:0;top:0px;margin-top:0px;height:100%;left:0px;z-index: 2147483003;transition: width .6s ease-out;background:#fff;}",
    "micro" == t ? (closeButPoitionSwitchCSS = "left: unset !important;top: -10px !important;right: 20px !important;",
    o && (closeButPoitionSwitchCSS = "left: unset !important;top: -2px !important;right: 0px !important;"),
    ("mobile" == zfem_cons.deviceType || "tablet" == zfem_cons.deviceType) && (n += ".zf-embed-flyout-slideup-cont{visibility:hidden;position:fixed;box-shadow: 0 6px 100px 0 rgba(0,0,0,.35)!important;width:100%;margin-top:0px;height:0%;right:5%; left:5%;z-index: 2147483003;transition: none;}"),
    n = n + ".zf-embed-flyout-slideup-sub-cont {" + closeButPoitionSwitchCSS + "display:none;position:absolute;cursor: pointer;}") : n = n + ".zf-embed-flyout-slideup-sub-cont { display: none; position: absolute; right: 0px;top: -2px; cursor: pointer; background: transparent;width: 26px; height: 26px;line-height: 26px; border-radius: 50%; display:inline-block; text-align: center; color: " + zfem_cons.widgetCloseFontColor + ";}.zf-embed-flyout-slideup-sub-cont svg {display: inline-block; font-size: 14px; position: relative; z-index: 10;color: " + i + "}",
    n += ".zf-embed-flypop-sub-cont-span{display: inline-block;}"),
    n += ".zf-pre-loaded-text{position:absolute;top:52%;left:50%;transform:translate(-50%,-50%);margin:0px;color:#1ac3f4;}"
}
function _zfDetectDevice() {
    var e = "desktop";
    return (navigator.userAgent.match(/KFAPWI/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Macintosh/i) && navigator.maxTouchPoints > 0 || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) && (e = screen.width > 700 ? "tablet" : "mobile"),
    e
}
function _zfIsIOSDevice() {
    var e = !1;
    return navigator.userAgent.match(/Mac/i) && (e = !0),
    e
}
function _zfCheckTriggerFilter(e) {
    var e = e || zfem_cons.defaultEmbedSettings
      , t = !1
      , o = e.trigger && e.trigger.url && e.trigger.url.length > 0 ? e.trigger.url : null
      , i = e.trigger && e.trigger.keywords ? e.trigger.keywords : null;
    if (o) {
        for (var n = 0; n < o.length; n++)
            if (o[n].trim() == zfem_cons.sourceUrl) {
                t = !0;
                break
            }
    }
    var s = e.trigger && e.trigger.regexExpressions && e.trigger.regexExpressions.length ? e.trigger.regexExpressions : null;
    if (s && !t) {
        for (var n = 0; n < s.length; n++)
            if (s[n] && RegExp(s[n]).test(zfem_cons.sourceUrl)) {
                t = !0;
                break
            }
    }
    if (i) {
        for (var a = i.split(","), r = 0; r < a.length; r++)
            if (-1 != zfem_cons.sourceUrl.indexOf(a[r].trim())) {
                t = !0;
                break
            }
    }
    return o || i || s || (t = !0),
    t
}
function _zfSetZfEmbedSurveyCookie(e, t, o=31536e3, i=!1) {
    var n = new Date;
    n.setTime(n.getTime() + 1e3 * o);
    var s = "expires=" + n.toUTCString();
    i ? document.cookie = e + "=" + t + "; Secure; path=/;samesite=lax" : document.cookie = e + "=" + t + "; Secure; " + s + ";path=/;samesite=lax"
}
function _zfGetZfEmbedSurveyCookie(e) {
    for (var t = e + "=", o = document.cookie.split(";"), i = 0; i < o.length; i++) {
        for (var n = o[i]; " " == n.charAt(0); )
            n = n.substring(1);
        if (0 == n.indexOf(t))
            return n.substring(t.length, n.length)
    }
    return ""
}
function _zfClearZfEmbedSurveyCookies() {
    localStorage.removeItem(_zfGetZfEmbedSurveyCookie(zfem_cons.visCId)),
    _zfSetZfEmbedSurveyCookie(zfem_cons.usrSessCookieId, "", 0),
    _zfSetZfEmbedSurveyCookie(zfem_cons.visCId, "", 0)
}
function _zfCheckVerticalScrollExist() {
    var e = document.body.currentStyle || window.getComputedStyle(document.body, "")
      , t = "visible" == e.overflow || "visible" == e.overflowY || t && "auto" == e.overflow || t && "auto" == e.overflowY;
    return !t
}
function _zfIsHexColor(e) {
    let t = RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
    return t.test(e)
}
function _zfLockScroll() {
    window.scrollX;
    var e = window.scrollY;
    document.documentElement.style.overflow = "hidden",
    document.body.style.overflow = "hidden",
    document.body.style.position = "fixed",
    document.body.style.top = `-${e}px`,
    document.body.style.width = "100%",
    window._zfUnlockScroll = () => {
        document.body.style.removeProperty("overflow"),
        document.documentElement.style.removeProperty("overflow"),
        document.body.style.removeProperty("position"),
        document.body.style.removeProperty("top"),
        document.body.style.removeProperty("width"),
        window.scrollTo(0, e)
    }
}
function _zfSetUpdateVisitorData(e={}, t=!1, o=!1, i=!0, n=!1) {
    var s = ["email", "mobile", "uniqueId", "name", "contact_email", "contact_mobile", "contact_name"]
      , a = _zfGetZfEmbedSurveyCookie(zfem_cons.usrSessCookieId)
      , r = _zfGetZfEmbedSurveyCookie(zfem_cons.visCId)
      , l = localStorage.getItem(r)
      , d = l ? JSON.parse(l) : {}
      , c = !1;
    if (d && 0 == Object.keys(d).length && (zfem_cons.visitorLStorage = {
        workSpaceId: zfem_cons.wsId,
        companyId: zfem_cons.cmpId,
        cookieId: r,
        sessCookieId: a,
        firstPageQStr: window.location.search,
        firstSeen: new Date,
        firstSeenOnWeb: new Date,
        firstPage: window.location.href,
        pagesViewedCount: 0,
        webSessionCounts: 0,
        firstReferringSite: document.referrer,
        firstUserAgent: navigator.userAgent,
        firstBrowserLanguage: navigator.language,
        firstDevice: zfem_cons.deviceType,
        firstScreenSize: screen.width + "x" + screen.height
    },
    localStorage.setItem(r, JSON.stringify(zfem_cons.visitorLStorage)),
    d = zfem_cons.visitorLStorage,
    c = !0),
    e)
        for (let m in e)
            d[m] = e[m];
    d.sessCookieId !== _zfGetZfEmbedSurveyCookie(zfem_cons.usrSessCookieId) && (c = !0),
    d.workSpaceId = zfem_cons.wsId,
    d.companyId = zfem_cons.cmpId,
    d.sessCookieId = a,
    d.lastSeen = new Date,
    d.lastSeenOnWeb = new Date,
    d.lastPage = window.location.href,
    d.lastReferringSite = document.referrer,
    d.lastUserAgent = navigator.userAgent,
    d.lastDevice = zfem_cons.deviceType,
    d.lastScreenSize = screen.width + "x" + screen.height,
    d.lastBrowserLanguage = navigator.language;
    let f = d.pagesViewedCount ? d.pagesViewedCount : 0
      , p = d.webSessionCounts ? d.webSessionCounts : 0
      , $ = document.title
      , b = window.location.pathname;
    zfem_cons.customPageTitle && ($ = zfem_cons.customPageTitle),
    zfem_cons.customPagePath && (b = zfem_cons.customPagePath),
    n && (f += 1),
    d.pagesViewedCount = f,
    c && (p += 1),
    d.webSessionCounts = p;
    var _ = window._zfQueue.find(e => "variables" == e[0])
      , g = !1;
    if (_) {
        for (var u in _[1])
            if (_[1].hasOwnProperty(u) && (-1 !== s.indexOf(u) || u.startsWith("contact_")) && _[1][u]) {
                if (("email" == u || "contact_email" == u) && !_[1][u].match(zfem_cons.emailValidationRegex)) {
                    _zfPrintConsole("Invalid email address passed `" + u + "`:`" + _[1][u] + "`.");
                    continue
                }
                d[u] = _[1][u],
                _zfPrintConsole("Identity variable passed `" + u + "`:`" + _[1][u] + "`."),
                g = !0
            }
    }
    var y = !1;
    if (g && d.hasOwnProperty("contact_name") && "John Appleseed" == d.contact_name && (delete d.contact_name,
    localStorage.setItem(r, JSON.stringify(d)),
    zfem_cons.disableTracking = !0,
    y = !0),
    g && d.hasOwnProperty("contact_email") && "john@example.com" == d.contact_email && (delete d.contact_email,
    localStorage.setItem(r, JSON.stringify(d)),
    zfem_cons.disableTracking = !0,
    y = !0),
    zfem_cons.disableTracking || zfem_cons.temporaryBlockTracking || !c && !_zfIsEligibleForTrackingAPICall()) {
        let z = "Server call is paused.";
        return zfem_cons.disableTracking && (z = "Tracking is disabled"),
        _zfPrintConsole(z),
        o && (localStorage.setItem(r, JSON.stringify(d)),
        _zfInitiateWidgets()),
        !0
    }
    if (t || !d.contactId && g) {
        if (y)
            return;
        _zfPrintConsole("Communication happens with server, with data", d);
        var h = new XMLHttpRequest;
        h.open("POST", zfem_cons.apiGatewayBaseUrl + "/contacts/tracking"),
        h.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        var x = {
            ...d
        };
        x.segmentCall = i,
        x.sessionIncrement = c,
        h.send(JSON.stringify(x)),
        h.onload = function() {
            if (200 === h.status) {
                var e = JSON.parse(h.response);
                e.data.errorCode && "tracking-disabled" === e.data.errorCode && (zfem_cons.disableTracking = !0),
                e.data.contactInfo && (zfem_cons.identifiedVisitor = !0,
                d.contactId = e.data.contactInfo._id,
                d.dynamicList = e.data.contactInfo.lists,
                d.widgetsVisited = e.data.contactInfo.widgetsVisited ? e.data.contactInfo.widgetsVisited : [],
                d.widgetsAnswered = e.data.contactInfo.widgetsAnswered ? e.data.contactInfo.widgetsAnswered : [],
                _zfPrintConsole("Identified contact as Id: #" + e.data.contactInfo._id)),
                e.data.evd && (d.externalVisitorId = e.data.evd._id,
                d.dynamicList = e.data.evd.lists,
                _zfPrintConsole("Anonymous visitor set as Id: #" + e.data.evd._id)),
                e.data.errorCode && _zfClearWidgetsAndSourceJS(e.data.disableWidgetJS),
                localStorage.setItem(r, JSON.stringify(d)),
                o && _zfInitiateWidgets()
            }
        }
    }
    localStorage.setItem(r, JSON.stringify(d))
}
function _zfSessCntUpdate() {
    var e = _zfGetZfEmbedSurveyCookie(zfem_cons.visCId)
      , t = JSON.parse(localStorage.getItem(e));
    zfem_cons.onSamePage && (t.sessionCounts = t.sessionCounts ? parseInt(t.sessionCounts) + 1 : 1),
    localStorage.setItem(e, JSON.stringify(t))
}
function _zfHandleVisitorSessCookie(e=!1, t=!1) {
    if (t) {
        _zfSetZfEmbedSurveyCookie(o, i, 0);
        return
    }
    var o = zfem_cons.usrSessCookieId
      , i = Math.random().toString(36).slice(2) + Date.now();
    e || !_zfGetZfEmbedSurveyCookie(o) ? _zfSetZfEmbedSurveyCookie(o, i, 1800) : _zfSetZfEmbedSurveyCookie(o, _zfGetZfEmbedSurveyCookie(o), 1800)
}
function _zfActivityWatcher() {
    var e = 0;
    function t() {
        e = 0,
        zfem_cons.noActivityPeriod = 0
    }
    new ZfemClsWorkerInterval(function() {
        e < 60 && _zfHandleVisitorSessCookie()
    }
    ,6e4),
    new ZfemClsWorkerInterval(function() {
        e < 1800 && _zfSetUpdateVisitorData(null, !0, !1, !1)
    }
    ,174e4),
    new ZfemClsWorkerInterval(function() {
        e++,
        zfem_cons.noActivityPeriod++,
        e > 1800 && (e = 0,
        _zfHandleVisitorSessCookie(!0))
    }
    ,1e3),
    ["mousedown", "mousemove", "keydown", "scroll", "touchstart"].forEach(function(e) {
        document.addEventListener(e, t, !0)
    })
}
function _zfLogSurveyInteraction(e="", t="") {
    var o = _zfGetZfEmbedSurveyCookie(zfem_cons.visCId)
      , i = localStorage.getItem(o)
      , n = i ? JSON.parse(i) : {}
      , s = _zfGetMetaAndBrowserBasicInformation()
      , a = {
        activityType: t,
        surveyRefCode: e,
        ...s,
        ...n
    };
    _zfPrintConsole("Dismiss survey event logged with data", a);
    var r = new XMLHttpRequest;
    r.open("POST", zfem_cons.backendApiBaseUrl + "/surveys/logInteraction"),
    r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"),
    r.send(JSON.stringify(a)),
    r.onload = function() {}
}
function _zfGetMetaAndBrowserBasicInformation() {
    return {
        domain: window.location.hostname,
        url: window.location.origin + window.location.pathname,
        queryString: window.location.search,
        userAgent: navigator.userAgent,
        cookie: navigator.cookieEnabled,
        pageName: document.title,
        resolution: screen.width + "x" + screen.height,
        timeZone: new Date().getTimezoneOffset(),
        refferUrl: document.referrer,
        embed: "",
        trackRefCode: "",
        browserLanguage: navigator.language
    }
}
function _zfHandleDebugBanner() {
    var e = document.createElement("div");
    e.id = "zonka-feedback-client-debug-panel",
    e.style = "position: absolute; max-width: 600px; padding: 14px; background: #63C5F3; border: 1px solid rgb(2, 56, 255); box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 9px 0px; z-index: 2147483647; border-radius: 4px; max-height: 400px; top: 10px; left: 10px; line-height: 1.2; font-size: 14px; font-family: monospace;";
    var t = "";
    return t += "<br>✓ Zonka Feedback client loaded",
    t = (t = t + "<br>✓  Workspace ID: #<i>" + zfem_cons.wsId + "</i>") + "<br>✓  Account ID: #<i>" + zfem_cons.cmpId + "</i>",
    t += "<br>✓ Established connection with server<br>",
    e.innerHTML = "<strong>Zonka Feedback Debug Window</strong><br> " + t + "<br>Open the Developer Console of your browser for complete debug logs. To deactivate Debug Mode, set zf_debug=false in your URL.",
    document.body.appendChild(e),
    !0
}
function _zfPrintConsole(e, t=null) {
    if ("true" == zfem_cons.debugMode) {
        var o = "[ZonkaFeedback] ";
        o += e,
        t ? console.log(o, t) : console.log(o)
    }
    return !0
}
function _zfCheckLoggedCredChanges() {
    if (zfem_cons.localStorageDataSaved = localStorage.getItem(_zfGetZfEmbedSurveyCookie(zfem_cons.visCId)),
    zfem_cons.localStorageSavedDataObject = zfem_cons.localStorageDataSaved ? JSON.parse(zfem_cons.localStorageDataSaved) : {},
    zfem_cons.localStorageSavedDataObject.companyId && zfem_cons.cmpId !== zfem_cons.localStorageSavedDataObject.companyId) {
        _zfClearZfEmbedSurveyCookies();
        return
    }
    let e = zfem_cons.localStorageSavedDataObject.contact_email ? zfem_cons.localStorageSavedDataObject.contact_email : "";
    e = zfem_cons.localStorageSavedDataObject.email ? zfem_cons.localStorageSavedDataObject.email : e;
    let t = zfem_cons.localStorageSavedDataObject.contact_mobile ? zfem_cons.localStorageSavedDataObject.contact_mobile : "";
    t = zfem_cons.localStorageSavedDataObject.mobile ? zfem_cons.localStorageSavedDataObject.mobile : "";
    let o = zfem_cons.localStorageSavedDataObject.contact_uniqueId ? zfem_cons.localStorageSavedDataObject.contact_uniqueId : "";
    if (o = zfem_cons.localStorageSavedDataObject.uniqueId ? zfem_cons.localStorageSavedDataObject.uniqueId : "",
    zfem_cons.localStorageDataSaved && (zfem_cons.localStorageSavedDataObject = zfem_cons.localStorageDataSaved ? JSON.parse(zfem_cons.localStorageDataSaved) : {},
    zfem_cons.localStorageSavedDataObject.contactId)) {
        var i = window._zfQueue.find(e => "variables" == e[0]);
        if (i)
            for (var n in i[1])
                i[1].hasOwnProperty(n) && -1 !== zfem_cons.conCreatKeys.indexOf(n) && (i[1][n] && ("email" == n || "contact_email" == n) && e !== i[1][n] && (zfem_cons.temporaryBlockTracking = !0,
                _zfClearZfEmbedSurveyCookies()),
                i[1][n] && ("mobile" == n || "contact_mobile" == n) && t !== i[1][n] && (zfem_cons.temporaryBlockTracking = !0,
                _zfClearZfEmbedSurveyCookies()),
                i[1][n] && ("uniqueId" == n || "contact_uniqueId" == n) && o !== i[1][n] && (zfem_cons.temporaryBlockTracking = !0,
                _zfClearZfEmbedSurveyCookies()))
    }
}
function _zfRemoveElementById(e) {
    var t = document.getElementById(e);
    null !== t && t.remove()
}
function _zfIsEligibleForTrackingAPICall() {
    var e = ["email", "mobile", "uniqueId", "contact_email", "contact_mobile"]
      , t = _zfGetZfEmbedSurveyCookie(zfem_cons.visCId)
      , o = localStorage.getItem(t)
      , i = o ? JSON.parse(o) : {}
      , n = !1;
    i && i.contactId && (n = !0);
    var s = window._zfQueue.find(e => "variables" == e[0]);
    if (!n && s) {
        for (var a in s[1])
            if (s[1].hasOwnProperty(a) && -1 !== e.indexOf(a) && s[1][a]) {
                n = !0;
                break
            }
    }
    return n && (zfem_cons.identifiedVisitor = !0),
    n
}
function _zfDetectBoatCall(e=!0) {
    var t = RegExp("(googlebot/|bot|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)", "i")
      , o = navigator.userAgent
      , i = !1;
    return t.test(o) && (i = !0),
    i && e && (zfem_cons.disableTracking = !0),
    i
}
function _zfCheckSegmentConditions(e, t, o="include") {
    let i = !1
      , n = 0
      , s = "include" == o ? t.includeSegmentConditions : t.excludeSegmentConditions
      , a = s.length;
    for (let r = 0; r < a; r++) {
        let l = s[r];
        if (l.isAnonymousVisitor) {
            let d = l.conditions.length
              , c = 0
              , m = 0
              , f = l.matchFilterType
              , p = !1;
            for (let $ = 0; $ < l.conditions.length; $++) {
                let b = l.conditions[$]
                  , _ = l.conditions[$].type;
                if (l.conditions[$].filterId,
                "DATE" == _.toUpperCase()) {
                    let g = new Date
                      , u = b.fieldValue;
                    u = u ? new Date(u + "T00:00:00.000Z") : new Date;
                    let y = new Date
                      , z = new Date;
                    var h = y.getFullYear() + "-" + ("0" + (y.getMonth() + 1)).slice(-2) + "-" + ("0" + y.getDate()).slice(-2);
                    let x = Number(b.fieldValue) ? Number(b.fieldValue) : 0;
                    switch (b.filterOp) {
                    case "exactlyXDays":
                        "fromNow" == b.filterSubOp || ((z = new Date(g.getTime() - 864e5 * x)).setHours(0, 0, 0, 0),
                        (y = new Date(g.getTime() - 864e5 * x)).setHours(23, 59, 59, 999),
                        (dataItemDtTime = (dataItemDate = new Date(e[b.filterId])).getTime()) > z.getTime() && dataItemDtTime < y.getTime() ? c++ : m++);
                        break;
                    case "lessThanXDays":
                        "fromNow" == b.filterSubOp ? ((z = new Date(h)).setHours(0, 0, 0, 0),
                        (y = new Date(g.getTime() + 864e5 * x)).setHours(23, 59, 59, 999)) : ((z = new Date(g.getTime() - 864e5 * x)).setHours(0, 0, 0, 0),
                        (dataItemDate = new Date(e[b.filterId])).setHours(0, 0, 0, 0)),
                        z.getTime() <= dataItemDate.getTime() ? c++ : m++;
                        break;
                    case "moreThanXDays":
                        "fromNow" == b.filterSubOp ? (z = new Date(g.getTime() + 864e5 * x)).setHours(0, 0, 0, 0) : ((z = new Date(g.getTime() - 864e5 * x)).setHours(23, 59, 59, 999),
                        (dataItemDtTime = (dataItemDate = new Date(e[b.filterId])).getTime()) < z ? c++ : m++);
                        break;
                    case "isBetween":
                    case "isNotBetween":
                        (y = new Date(b.startValue)).setHours(0, 0, 0, 0),
                        (z = new Date(b.endValue)).setHours(23, 59, 59, 999),
                        (dataItemDtTime = (dataItemDate = new Date(e[b.filterId])).getTime()) > y.getTime() && dataItemDtTime < z.getTime() ? "isBetween" == b.filterOp ? c++ : "isNotBetween" == b.filterOp && m++ : "isBetween" == b.filterOp ? m++ : "isNotBetween" == b.filterOp && c++;
                        break;
                    case "before":
                        (y = new Date(u)).setHours(0, 0, 0, 0),
                        (z = new Date(e[b.filterId])).setHours(0, 0, 0, 0),
                        y.getTime() > z.getTime() ? c++ : m++;
                        break;
                    case "after":
                        (y = new Date(u)).setHours(0, 0, 0, 0),
                        (z = new Date(e[b.filterId])).setHours(0, 0, 0, 0),
                        y.getTime() < z.getTime() ? c++ : m++;
                        break;
                    case "on":
                        (y = new Date(u)).setHours(0, 0, 0, 0),
                        (z = new Date(e[b.filterId])).setHours(0, 0, 0, 0),
                        y.getTime() == z.getTime() ? c++ : m++;
                        break;
                    case "isKnown":
                    case "isUnknown":
                        e[b.filterId] ? "isKnown" == b.filterOp ? c++ : "isUnknown" == b.filterOp && m++ : "isKnown" == b.filterOp ? m++ : "isUnknown" == b.filterOp && c++
                    }
                }
                if ("NUMBER" == _.toUpperCase()) {
                    let v = b.filterValue ? parseInt(b.filterValue) : null
                      , C = e[b.filterId];
                    b.filterOp;
                    let w = b.filterValue1 ? parseInt(b.filterValue1) : null;
                    _zfDoNumberConditionCompare(C, v, b.filterOp, w) ? c++ : m++
                }
                if ("TEXT" == _.toUpperCase()) {
                    let k = b.filterOp
                      , E = b.filterValue;
                    switch (k) {
                    case "contains":
                        E = E.startsWith("+") ? "\\" + E : E;
                        let T = RegExp(E, "i");
                        null !== e[b.filterId].match(T) ? c++ : m++;
                        break;
                    case "isKnown":
                    case "isUnknown":
                        e[b.filterId] ? "isKnown" == b.filterOp ? c++ : "isUnknown" == b.filterOp && m++ : "isKnown" == b.filterOp ? m++ : "isUnknown" == b.filterOp && c++
                    }
                }
                if ("all" == f) {
                    if (m > 0) {
                        p = !1;
                        break
                    }
                    if (c == d) {
                        p = !0;
                        break
                    }
                } else if (c > 0) {
                    p = !0;
                    break
                }
            }
            if (p) {
                i = "include" === o;
                break
            }
        }
        a == ++n && "exclude" === o && (i = !0)
    }
    return i
}
function _zfDoNumberConditionCompare(e, t, o="isEqualTo", i=null) {
    let n = !1;
    switch (o) {
    case "isEqualTo":
        n = t === e;
        break;
    case "isNotEqualTo":
        n = t !== e;
        break;
    case "isLessThan":
        n = t > e;
        break;
    case "isMoreThan":
        n = t < e;
        break;
    case "isBetween":
        e >= t && e <= i && (n = !0);
        break;
    case "isKnown":
        n = void 0 !== e;
        break;
    case "isUnknown":
        n = void 0 === e
    }
    return n
}
function _zfClearWidgetsAndSourceJS(e=!1) {
    document.getElementById("zfEmbedScript").remove(),
    zfem_cons.disableTracking = !0,
    e && (_zfRemoveElementById("ZfEmbedFlypopButton"),
    _zfRemoveElementById("ZfEmbedFlyoutCont"),
    clearTimeout(zfem_cons.autoPopupDelayTimeout),
    clearTimeout(zfem_cons.exitIntentTimeout),
    _zfRemoveElementById("ZfEmbedFlypopBottomButton"),
    _zfRemoveElementById("ZfEmbedFlyoutBottomBarCont"),
    document.removeEventListener("mouseout", zfem_cons.mouseEvent),
    zfem_cons.pageScrollTicking = !0,
    zfem_cons.setDisableWidgets = !0)
}
function _zfSetInteractionLanguage(e="", t=!1, o=!1) {
    var i = e
      , n = zfem_cons.availableLanguages.split(",")
      , s = "";
    if (i.length > 3)
        i = i.replace("-", "_"),
        -1 !== (matchedLanguageIndex = n.indexOf(i)) && (s = n[matchedLanguageIndex]);
    else if (i.length > 0)
        for (var a = 0; a < n.length; a++)
            0 == n[a].search(i) && (s = n[a]);
    if (zfem_cons.detectedLang = s,
    zfem_cons.detectedLang && o && _zfInitiateWidgets(),
    t)
        return zfem_cons.detectedLang ? zfem_cons.detectedLang : ""
}
function _zfGetFieldHTML(e, t, o, i, n="#000000", s="#000000", a="Helvetica", r="#000000", l="#ffffff") {
    var d = '<svg fill=none height=20 viewBox="0 0 16 16" width=20 xmlns=http://www.w3.org/2000/svg><path d="M8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5Z" stroke="' + s + '" /><path d="M4 8C4 5.79086 5.79086 4 8 4V4C10.2091 4 12 5.79086 12 8V8C12 10.2091 10.2091 12 8 12V12C5.79086 12 4 10.2091 4 8V8Z" fill="transparent" /></svg>'
      , c = ['<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 59 59" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M29.5 57C44.6878 57 57 44.6878 57 29.5C57 14.3122 44.6878 2 29.5 2C14.3122 2 2 14.3122 2 29.5C2 44.6878 14.3122 57 29.5 57ZM43.5301 22.4034C43.8228 23.1784 43.4318 24.0439 42.6568 24.3366L39.4062 25.5641C40.3656 26.1884 41 27.2701 41 28.5C41 30.433 39.433 32 37.5 32C35.567 32 34 30.433 34 28.5C34 28.1529 34.0505 27.8176 34.1446 27.5011C33.48 27.5747 32.8244 27.1941 32.5772 26.5397C32.2846 25.7647 32.6756 24.8992 33.4506 24.6065L41.5969 21.53C42.3719 21.2374 43.2374 21.6284 43.5301 22.4034ZM15.3432 24.3366C14.5682 24.0439 14.1772 23.1784 14.4699 22.4034C14.7626 21.6284 15.6281 21.2374 16.4031 21.53L24.5494 24.6065C25.3244 24.8992 25.7154 25.7647 25.4228 26.5397C25.1756 27.1941 24.52 27.5747 23.8554 27.5011C23.9495 27.8176 24 28.1529 24 28.5C24 30.433 22.433 32 20.5 32C18.567 32 17 30.433 17 28.5C17 27.2701 17.6344 26.1884 18.5938 25.5641L15.3432 24.3366ZM22.2522 44.3261C23.7751 42.0178 26.3872 40.5 29.3531 40.5C32.319 40.5 34.9311 42.0178 36.4541 44.3261C36.9103 45.0176 37.8407 45.2083 38.5322 44.752C39.2237 44.2958 39.4144 43.3654 38.9582 42.6739C36.9036 39.56 33.3693 37.5 29.3531 37.5C25.337 37.5 21.8027 39.56 19.7481 42.6739C19.2919 43.3654 19.4826 44.2958 20.1741 44.752C20.8656 45.2083 21.796 45.0176 22.2522 44.3261Z"></path><circle style="stroke:' + _zfHexToRGB(s, 1) + ';" cx="29.5" cy="29.5" stroke-width="3" r="27.5"></circle><path style="fill:' + _zfHexToRGB(s, 1) + ';" fill-rule="evenodd" clip-rule="evenodd" d="M42.6567 24.3368C43.4317 24.0441 43.8227 23.1786 43.53 22.4036C43.2373 21.6286 42.3718 21.2376 41.5968 21.5302L33.4504 24.6067C32.6754 24.8994 32.2844 25.7649 32.5771 26.5399C32.8243 27.1943 33.4798 27.5749 34.1445 27.5013C34.0504 27.8178 33.9999 28.1531 33.9999 28.5002C33.9999 30.4332 35.5669 32.0002 37.4999 32.0002C39.4329 32.0002 40.9999 30.4332 40.9999 28.5002C40.9999 27.2703 40.3655 26.1886 39.4061 25.5643L42.6567 24.3368Z"></path><path style="fill:' + _zfHexToRGB(s, 1) + ';" fill-rule="evenodd" clip-rule="evenodd" d="M15.3433 24.3368C14.5683 24.0441 14.1773 23.1786 14.47 22.4036C14.7627 21.6286 15.6282 21.2376 16.4032 21.5302L24.5496 24.6067C25.3246 24.8994 25.7156 25.7649 25.4229 26.5399C25.1757 27.1943 24.5202 27.5749 23.8555 27.5013C23.9496 27.8178 24.0001 28.1531 24.0001 28.5002C24.0001 30.4332 22.4331 32.0002 20.5001 32.0002C18.5671 32.0002 17.0001 30.4332 17.0001 28.5002C17.0001 27.2703 17.6345 26.1886 18.5939 25.5643L15.3433 24.3368Z"></path><path style="fill:' + _zfHexToRGB(s, 1) + ';" fill-rule="evenodd" clip-rule="evenodd" d="M29.3531 40.5C26.3872 40.5 23.7751 42.0178 22.2522 44.3261C21.796 45.0176 20.8656 45.2083 20.1741 44.752C19.4826 44.2958 19.2919 43.3654 19.7481 42.6739C21.8027 39.56 25.337 37.5 29.3531 37.5C33.3693 37.5 36.9036 39.56 38.9582 42.6739C39.4144 43.3654 39.2237 44.2958 38.5322 44.752C37.8407 45.2083 36.9103 45.0176 36.4541 44.3261C34.9311 42.0178 32.319 40.5 29.3531 40.5Z"></path></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 59 59" fill="none"><circle style="stroke:' + _zfHexToRGB(s, 1) + ';" cx="29.5" cy="29.5" r="26" stroke-width="3"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M29.5 57C44.6878 57 57 44.6878 57 29.5C57 14.3122 44.6878 2 29.5 2C14.3122 2 2 14.3122 2 29.5C2 44.6878 14.3122 57 29.5 57ZM37.5 28C39.433 28 41 26.433 41 24.5C41 22.567 39.433 21 37.5 21C35.567 21 34 22.567 34 24.5C34 26.433 35.567 28 37.5 28ZM17 24.5C17 26.433 18.567 28 20.5 28C22.433 28 24 26.433 24 24.5C24 22.567 22.433 21 20.5 21C18.567 21 17 22.567 17 24.5ZM18.2666 43.8038C20.6894 39.9867 24.8277 37.5 29.5002 37.5C34.1726 37.5 38.311 39.9867 40.7338 43.8038C41.1777 44.5033 42.1046 44.7104 42.804 44.2664C43.5035 43.8225 43.7106 42.8956 43.2666 42.1962C40.3358 37.5787 35.2762 34.5 29.5002 34.5C23.7242 34.5 18.6645 37.5787 15.7338 42.1962C15.2898 42.8956 15.4969 43.8225 16.1964 44.2664C16.8958 44.7104 17.8227 44.5033 18.2666 43.8038Z"></path><circle style="fill:' + _zfHexToRGB(s, 1) + ';" cx="37.5" cy="24.5" r="3.5"></circle><circle style="fill:' + _zfHexToRGB(s, 1) + ';" r="3.5" transform="matrix(-1 0 0 1 20.5 24.5)"></circle><path style="fill:' + _zfHexToRGB(s, 1) + ';" fill-rule="evenodd" clip-rule="evenodd" d="M29.5002 37.5C24.8277 37.5 20.6894 39.9867 18.2666 43.8038C17.8227 44.5033 16.8958 44.7104 16.1964 44.2664C15.4969 43.8225 15.2898 42.8956 15.7338 42.1962C18.6645 37.5787 23.7242 34.5 29.5002 34.5C35.2762 34.5 40.3358 37.5787 43.2666 42.1962C43.7106 42.8956 43.5035 43.8225 42.804 44.2664C42.1046 44.7104 41.1777 44.5033 40.7338 43.8038C38.311 39.9867 34.1726 37.5 29.5002 37.5Z"></path></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 59 59" fill="none"><circle style="stroke:' + _zfHexToRGB(s, 1) + ';" cx="29.5" cy="29.5" r="26" stroke-width="3"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M29.5 57C44.6878 57 57 44.6878 57 29.5C57 14.3122 44.6878 2 29.5 2C14.3122 2 2 14.3122 2 29.5C2 44.6878 14.3122 57 29.5 57ZM37.5 28C39.433 28 41 26.433 41 24.5C41 22.567 39.433 21 37.5 21C35.567 21 34 22.567 34 24.5C34 26.433 35.567 28 37.5 28ZM17 24.5C17 26.433 18.567 28 20.5 28C22.433 28 24 26.433 24 24.5C24 22.567 22.433 21 20.5 21C18.567 21 17 22.567 17 24.5ZM18.5 38C17.6716 38 17 38.6716 17 39.5C17 40.3284 17.6716 41 18.5 41H40.5C41.3284 41 42 40.3284 42 39.5C42 38.6716 41.3284 38 40.5 38H18.5Z"></path><circle style="fill:' + _zfHexToRGB(s, 1) + ';" cx="37.5" cy="24.5" r="3.5"></circle><circle style="fill:' + _zfHexToRGB(s, 1) + ';" r="3.5" transform="matrix(-1 0 0 1 20.5 24.5)"></circle><path style="fill:' + _zfHexToRGB(s, 1) + ';" fill-rule="evenodd" clip-rule="evenodd" d="M17 39.5C17 38.6716 17.6716 38 18.5 38H40.5C41.3284 38 42 38.6716 42 39.5C42 40.3284 41.3284 41 40.5 41H18.5C17.6716 41 17 40.3284 17 39.5Z"></path></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 59 59" fill="none"><circle style="stroke:' + _zfHexToRGB(s, 1) + ';" cx="29.5" cy="29.5" r="26" stroke-width="3"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M29.5 57C44.6878 57 57 44.6878 57 29.5C57 14.3122 44.6878 2 29.5 2C14.3122 2 2 14.3122 2 29.5C2 44.6878 14.3122 57 29.5 57ZM37.5 28C39.433 28 41 26.433 41 24.5C41 22.567 39.433 21 37.5 21C35.567 21 34 22.567 34 24.5C34 26.433 35.567 28 37.5 28ZM17 24.5C17 26.433 18.567 28 20.5 28C22.433 28 24 26.433 24 24.5C24 22.567 22.433 21 20.5 21C18.567 21 17 22.567 17 24.5ZM44 38C43 41.5 39 48 30 48C21.1909 48 16.3333 41.1667 15 38C26.5 42.5 32.5 42.5 44 38Z"></path><path style="stroke:' + _zfHexToRGB(s, 1) + '" d="M30 48C39 48 43 41.5 44 38C32.5 42.5 26.5 42.5 15 38C16.3333 41.1667 21.1909 48 30 48Z" stroke-width="3" stroke-linejoin="round"></path><circle style="fill:' + _zfHexToRGB(s, 1) + ';" cx="37.5" cy="24.5" r="3.5"></circle><circle style="fill:' + _zfHexToRGB(s, 1) + ';" r="3.5" transform="matrix(-1 0 0 1 20.5 24.5)"></circle></svg>', '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 59 59" fill="none"><circle style="stroke:' + _zfHexToRGB(s, 1) + ';" cx="29.5" cy="29.5" r="26" stroke-width="3"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M29.5 57C44.6878 57 57 44.6878 57 29.5C57 14.3122 44.6878 2 29.5 2C14.3122 2 2 14.3122 2 29.5C2 44.6878 14.3122 57 29.5 57ZM44 37C43 40.5 38.8 47.4 30 47C21.2 46.6 16.3333 40.1667 15 37C19.5 39 31.6 41.8 44 37ZM47.1986 22.7464C47.0736 22.1945 46.8408 21.6709 46.5134 21.2055C46.186 20.7402 45.7704 20.3422 45.2903 20.0342C44.8103 19.7263 44.2753 19.5145 43.7158 19.4109C43.1563 19.3074 42.5833 19.3141 42.0295 19.4306L40.8805 19.6722L40.621 18.5271C40.3684 17.4125 39.6819 16.437 38.7125 15.8152C37.7431 15.1934 36.5702 14.9761 35.4519 15.2112C34.3335 15.4464 33.3613 16.1146 32.7491 17.069C32.1369 18.0233 31.9349 19.1856 32.1875 20.3001L32.447 21.4453L34.3517 29.85L42.7852 28.0769L43.9342 27.8353C44.488 27.719 45.0118 27.4951 45.4756 27.1764C45.9394 26.8577 46.3342 26.4504 46.6373 25.9779C46.9404 25.5053 47.146 24.9767 47.2424 24.4222C47.3387 23.8677 47.3238 23.2983 47.1986 22.7464ZM12.4764 21.0898C12.1558 21.5507 11.9293 22.0703 11.8096 22.6189C11.6897 23.1674 11.679 23.7341 11.7781 24.2868C11.8773 24.8394 12.0843 25.3671 12.3875 25.8396C12.6906 26.3122 13.0839 26.7204 13.5449 27.041C14.0058 27.3615 14.5254 27.5881 15.074 27.7078L16.2121 27.9564L24.5654 29.7809L26.3899 21.4276L26.6385 20.2895C26.8804 19.1818 26.6724 18.0233 26.0602 17.069C25.448 16.1146 24.4818 15.4425 23.3741 15.2006C22.2664 14.9586 21.1079 15.1666 20.1535 15.7788C19.1992 16.391 18.5271 17.3573 18.2852 18.465L18.0366 19.6031L16.8985 19.3545C16.35 19.2346 15.7832 19.2239 15.2306 19.323C14.678 19.4222 14.1503 19.6293 13.6777 19.9324C13.2052 20.2355 12.7969 20.6288 12.4764 21.0898Z"></path><path style="stroke:' + _zfHexToRGB(s, 1) + '" d="M30 47C38.8 47.4 43 40.5 44 37C31.6 41.8 19.5 39 15 37C16.3333 40.1667 21.2 46.6 30 47Z" stroke-width="3" stroke-linejoin="round"></path><path style="stroke:' + _zfHexToRGB(s, 1) + '" stroke-width="3" d="M47.1986 22.7464C47.0736 22.1945 46.8408 21.6709 46.5134 21.2055C46.186 20.7402 45.7704 20.3422 45.2903 20.0342C44.8103 19.7263 44.2753 19.5145 43.7158 19.4109C43.1563 19.3074 42.5833 19.3141 42.0295 19.4306L40.8805 19.6722L40.621 18.5271C40.3684 17.4125 39.6819 16.4371 38.7125 15.8152C37.7431 15.1934 36.5702 14.9761 35.4519 15.2112C34.3335 15.4464 33.3613 16.1146 32.7491 17.069C32.1369 18.0233 31.9349 19.1856 32.1875 20.3001L32.447 21.4453L34.3517 29.85L42.7852 28.0769L43.9342 27.8353C44.488 27.719 45.0118 27.4951 45.4756 27.1764C45.9394 26.8577 46.3342 26.4504 46.6373 25.9779C46.9405 25.5053 47.146 24.9767 47.2424 24.4222C47.3387 23.8677 47.3238 23.2983 47.1986 22.7464V22.7464Z"></path><path style="stroke:' + _zfHexToRGB(s, 1) + '" stroke-width="3" d="M11.8096 22.6189C11.9293 22.0703 12.1558 21.5507 12.4764 21.0898C12.7969 20.6288 13.2052 20.2355 13.6777 19.9324C14.1503 19.6293 14.678 19.4222 15.2306 19.323C15.7832 19.2239 16.35 19.2346 16.8985 19.3545L18.0366 19.6031L18.2852 18.465C18.5271 17.3573 19.1992 16.391 20.1535 15.7788C21.1079 15.1666 22.2664 14.9586 23.3741 15.2006C24.4818 15.4425 25.448 16.1146 26.0602 17.069C26.6724 18.0233 26.8804 19.1818 26.6385 20.2895L26.3899 21.4276L24.5654 29.7809L16.2121 27.9564L15.074 27.7078C14.5254 27.5881 14.0058 27.3615 13.5449 27.041C13.0839 26.7204 12.6906 26.3122 12.3875 25.8396C12.0843 25.3671 11.8773 24.8394 11.7781 24.2868C11.679 23.7341 11.6897 23.1674 11.8096 22.6189V22.6189Z"></path></svg>']
      , m = ['<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" height="38px" viewBox="0 0 32 32" width="38px" style="" stroke-width="2px"><circle style="fill:transparent;stroke:' + _zfHexToRGB("#D70000", 1) + ';" cx="16" cy="16" r="14.5"></circle></svg>', '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" height="38px" viewBox="0 0 32 32" width="38px" style="" stroke-width="2px"><circle style="fill:transparent;stroke:' + _zfHexToRGB("#D56200", 1) + ';" cx="16" cy="16" r="14.5"></circle></svg>', '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" height="38px" viewBox="0 0 32 32" width="38px" style="" stroke-width="2px"><circle style="fill:transparent;stroke:' + _zfHexToRGB("#E4FF00", 1) + ';" cx="16" cy="16" r="14.5"></circle></svg>', '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" height="38px" viewBox="0 0 32 32" width="38px" style="" stroke-width="2px"><circle style="fill:transparent;stroke:' + _zfHexToRGB("#BAFF00", 1) + ';" cx="16" cy="16" r="14.5"></circle></svg>', '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" height="38px" viewBox="0 0 32 32" width="38px" style="" stroke-width="2px"><circle style="fill:transparent;stroke:' + _zfHexToRGB("#8CFF00", 1) + ';" cx="16" cy="16" r="14.5"></circle></svg>']
      , f = '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="38px" viewBox="0 0 24 24" width="38px"><path style="fill:transparent" d="m22.128 3.901c-1.21-1.226-2.819-1.901-4.532-1.901s-3.321.675-4.531 1.9l-1.065 1.08-1.065-1.079c-1.21-1.226-2.819-1.901-4.531-1.901-1.713 0-3.322.675-4.532 1.901-2.491 2.524-2.491 6.631 0 9.153l9.594 9.722c.141.144.333.224.534.224s.393-.08.534-.224l9.594-9.721c2.491-2.523 2.491-6.629 0-9.154z" class="heart-outline"></path><path style="fill:' + _zfHexToRGB(s, 1) + ';" d="m11.466 22.776c.141.144.333.224.534.224s.393-.08.534-.224l9.594-9.721c2.491-2.523 2.491-6.63 0-9.154-1.21-1.226-2.819-1.901-4.532-1.901s-3.321.675-4.531 1.9l-1.065 1.08-1.065-1.079c-1.21-1.226-2.819-1.901-4.531-1.901-1.713 0-3.322.675-4.532 1.901-2.491 2.524-2.491 6.631 0 9.153zm-8.527-17.822c.926-.937 2.157-1.454 3.464-1.454 1.308 0 2.538.517 3.463 1.455l1.599 1.62c.281.285.786.285 1.067 0l1.599-1.621c.928-.937 2.158-1.454 3.465-1.454 1.308 0 2.538.517 3.464 1.454 1.917 1.943 1.917 5.104 0 7.048l-9.06 9.181-9.061-9.182c-1.917-1.942-1.917-5.104 0-7.047z" class="heart-outline-black"></path></svg>'
      , p = '<svg enable-background="new 0 0 32 32" height="40" viewBox="0 0 32 32" width="40" stroke-width="2px" xmlns="http://www.w3.org/2000/svg"><g id="star"><path stroke="' + _zfHexToRGB(s, 1) + '" style="fill:transparent" d="m29.911 13.75-6.229 6.072 1.471 8.576c.064.375-.09.754-.398.978-.174.127-.381.191-.588.191-.159 0-.319-.038-.465-.115l-7.702-4.049-7.701 4.048c-.336.178-.745.149-1.053-.076-.308-.224-.462-.603-.398-.978l1.471-8.576-6.23-6.071c-.272-.266-.371-.664-.253-1.025s.431-.626.808-.681l8.609-1.25 3.85-7.802c.337-.683 1.457-.683 1.794 0l3.85 7.802 8.609 1.25c.377.055.69.319.808.681s.019.758-.253 1.025z"></path></g></svg>';
    -1 === Object.keys(t.translations).indexOf(i) && (i = o);
    var $ = ""
      , b = zfem_cons.baseSurveyUrl + "/assets/survey/images/temp/";
    let _ = zfem_cons.cdnImgBaseSrc + "add-option-image.png";
    var g = t.choices.slice();
    "radio_rating" != t.fieldName || t.isNaChoiceVisible || g.pop();
    var u = g.length
      , y = !1
      , z = "";
    ("" !== g[0].translations[i].helpText || "" !== g[g.length - 1].translations[i].helpText) && (y = "true");
    var h = !1;
    t.options[0] && "" !== t.options[0].translations[i].name && (h = "true");
    var x = ""
      , v = !1;
    "right" == t.positiveOptionDirection && (x = "direction:rtl;",
    v = !0);
    var C = "";
    switch (C += '<table border="0" cellpadding="0" cellspacing="0" width="auto" style="margin: auto;">',
    C += '<tbody> <tr> <td style="padding-top:0; padding-right:18px; padding-bottom:0px;" valign="top" align="left">',
    C = C + ' <h2 style="font-size:15px; font-family:' + a + "; color:" + n + '; font-weight: 600;line-height: 22px;margin-bottom:20px;text-align:center;">' + t.translations[i].fieldLabel + "</h2>",
    t.fieldName) {
    case "star_rating":
    case "heart_rating":
    case "emotion_rating":
    case "circle_rating":
    case "button_rating":
    case "picture_rating":
    case "radio_rating":
        C = C + '<table style="' + x + 'margin:auto;" border="0" cellpadding="0" cellspacing="0">',
        (y && "top" == t.helpTextPlacement || "radio_rating" == t.fieldName) && (C += "<tr>",
        h && (C += '<td style="padding:0 5px;"></td>'),
        g.forEach(function(e, o) {
            z = e.translations[i].helpText,
            "radio_rating" == t.fieldName && (z = e.translations[i].name),
            C = C + '<td style="font-size:12px;font-family:' + a + ";color:" + s + ';text-align:center;width:70px;padding:0 0 5px;">' + z + "</td>"
        }),
        C += "</tr>"),
        C += "<tbody> <tr>",
        h && (C = C + '<td style="text-align:center;"> <a style="text-decoration:none;"><span style="line-height:25px;font-size:16px;font-family:' + a + ";color:" + s + ';text-align:center;vertical-align:top;" >' + t.options[0].translations[i].name + "</span></a> </td>"),
        "button_rating" == t.fieldName && (C += '<td style="padding:1px;"></td>'),
        g.forEach(function(o, n) {
            C = "button_rating" == t.fieldName ? C + '<td zf-embed-article-code="' + e + '" zf-embed-c-id="' + (n + 1) + '" valign="middle" style="cursor:pointer;border-radius:10px;font-size:12px;width:108px;display: table-cell;padding-right:5px;vertical-align: middle;">' : C + '<td zf-embed-article-code="' + e + '" zf-embed-c-id="' + (n + 1) + '" style="cursor:pointer;text-align:center;padding-right:5px;">',
            "svg" == t.iconType ? "emotion_rating" == t.fieldName ? $ = c[zfem_cons.arrEmotionOutlineBracket[u][n]] : "heart_rating" == t.fieldName ? $ = f : "star_rating" == t.fieldName ? $ = p : "circle_rating" == t.fieldName && ($ = m[zfem_cons.arrEmotionOutlineBracket[u][n]]) : "emotion_rating" == t.fieldName ? $ = '<img width="38" style="width:38px !important;" src="' + b + zfem_cons.arrEmotionEmoji[zfem_cons.arrEmotionEmojiBracket[u][n]] + '">' : "heart_rating" == t.fieldName ? $ = '<img width="38" style="width:38px !important;" src="' + b + 'heart-80x80.png">' : "star_rating" == t.fieldName ? $ = '<img width="38" style="width:38px !important;" src="' + b + 'Largestar-selected_Landscape@2x.png">' : "circle_rating" == t.fieldName && ($ = '<img width="38" style="width:38px !important;" src="' + b + zfem_cons.arrCircleEmoji[zfem_cons.arrCircleEmojiBracket[u][n]] + '">'),
            "radio_rating" == t.fieldName ? C = C + '<a style="text-decoration:none;font-size:20px;color:' + s + ';">' + d + "</a>" : "button_rating" == t.fieldName ? (C = (C = C + '<div style="font-size:12px;font-family:' + a + ";width:100%;background:" + _zfHexToRGB(s, .1) + ";text-align: center;border-radius:10px;border:1px solid " + s + ";color:" + s + ';margin-bottom:15px;height:60px;overflow:hidden;">') + '<a style="padding:1px 10px;display:block;text-decoration:none; height:60px;display: table-cell;vertical-align: middle;width: 108px; color:' + s + ';">' + o.translations[i].name + "</a>",
            C += "</div>") : C = C + '<a style="text-decoration:none;display:inline-block; width:100%; height:100%;">' + $ + "</a>",
            C += "</td>"
        }),
        "button_rating" == t.fieldName && (C += '<td style="padding:1px;"></td>'),
        y && "bottom" == t.helpTextPlacement && (C += "<tr>",
        h && (C += '<td style="padding:0 5px;"></td>'),
        g.forEach(function(e, t) {
            C = C + '<td style="font-size:12px;font-family:' + a + ";color:" + s + ';text-align:center;width:70px;padding:0 0 5px;">' + e.translations[i].helpText + "</td>"
        }),
        C += "</tr>"),
        C += "</tr> </tbody> </table> </td>";
        break;
    case "mcqquestion":
    case "radio":
        var w = 0
          , g = t.choices
          , k = []
          , E = 2;
        t.choicesHasImage && (E = 4);
        for (var T = 0; T < g.length; T += E)
            k.push(g.slice(T, T + E));
        C += '<table border="0" cellpadding="0" cellspacing="0">',
        C += "<tbody>",
        k.forEach(function(o) {
            C += "<tr>",
            Array.isArray(o) && o.forEach(function(o) {
                w++,
                "radio" == t.fieldName ? t.choicesHasImage ? (_ = zfem_cons.cdnImgBaseSrc + "add-option-image.png",
                o.optionGalleryImageId && (_ = zfem_cons.cdnImgBaseSrc + (o.optionGalleryImageId.companyId ? o.optionGalleryImageId.companyId : 0) + "/" + o.optionGalleryImageId.path),
                C += '<td style="cursor:pointer;text-align:center;background-color:' + _zfHexToRGB(s, .1) + ";border:1px solid;border-color:" + s + ";padding:2px;font-family:" + a + ';font-size:16px;width:134px;border-radius:10px;" zf-embed-article-code="' + e + '" zf-embed-c-id="' + w + '"> <a class="action-reference-point" style="text-decoration:none;"> <img src="' + _ + '" style="width:100%;height:76px;" width="100%"> <span style="font-family:' + a + ";font-size:12px;color:" + s + ";text-align:center;vertical-align:top;line-height: 16px;display:" + (!0 == t.hideChoiceLabelInSurvey ? "none" : "block") + '; padding: 4px 0;">' + o.translations[i].name + "</span></a> </td>",
                C += '<td style="padding:3px;"></td>') : (C += '<td style="cursor:pointer;padding:5px 5px;" valign="middle" zf-embed-article-code="' + e + '" zf-embed-c-id="' + w + '">',
                C += '<div style="background-color:' + _zfHexToRGB(s, .1) + ";border:1px solid;border-color:" + s + ";color:" + s + ';width:228px;margin-left: 1%;border-radius:10px;">',
                C += '<a style="text-decoration:1px solid #fff;padding:10px 5px 10px 30px;display:block;color:' + s + ';">' + d + '<span style="font-size:16px;font-family:' + a + ";color:" + s + ';text-align:center;vertical-align:top;padding-left:5px;">' + o.translations[i].name + "</span> </a>") : (C += '<td style="cursor:pointer;" valign="middle" zf-embed-article-code="' + e + '" zf-embed-c-id="' + w + '">',
                C += '<div style="font-size:15px;font-family:' + a + ";background: " + _zfHexToRGB(s, .2) + ";text-align: center;width:210px;border-radius:10px;border:1px solid " + s + ";color:" + s + ';margin:5px 5px;">',
                C += '<a style="padding:10px;display:block;text-decoration:none;color:' + s + ';">' + o.translations[i].name + "</a>"),
                C += "</div>",
                C += "</td>"
            }),
            C += "</tr>"
        }),
        C += "</tbody>",
        C += "</table>";
        break;
    case "cssquestion":
        C += '<table style="' + x + 'margin:auto" border="0" cellpadding="0" cellspacing="0"><tbody><tr>',
        g.forEach(function(o, n) {
            t.isButtonColored ? C += '<td zf-embed-article-code="' + e + '" zf-embed-c-id="' + (n + 1) + '" valign="middle" style="cursor:pointer;border-radius:10px;font-size:12px;height:58px;width:66px;display: table-cell;vertical-align: middle;background-color:' + zfem_cons.arrCESColors[n] + ';color:#FFFFFF;"> <a style="text-align: center; padding: 10px 3px;color: #ffffff;line-height: 14px;text-decoration:none;font-family:' + a + ';display: block;">' + o.translations[i].name + "</a> </td>" : C += '<td zf-embed-article-code="' + e + '" zf-embed-c-id="' + (n + 1) + '" valign="middle" style="cursor:pointer;border-radius:10px;font-size:12px;height:58px;width:66px;display: table-cell;vertical-align: middle;background-color:' + _zfHexToRGB(s, .1) + ";border:1px solid;border-color:" + s + ";color:" + s + ';"> <a style="text-align: center; padding: 10px 3px;color:' + s + ";line-height: 14px;text-decoration:none;font-family:" + a + ';display: block;">' + o.translations[i].name + "</a> </td>",
            C += '<td style="padding:3px;"></td>'
        }),
        C += "</tbody></tr></table>";
        break;
    case "npsquestion":
        C += '<table style="' + x + '"><tbody><tr>';
        var S = "border-radius:5px;";
        "round" == t.buttonStyle && (S = "border-radius:50%;"),
        g.forEach(function(o, n) {
            t.isButtonColored ? C += '<td zf-embed-article-code="' + e + '" zf-embed-c-id="' + (n + 1) + '" style="cursor:pointer;width:38px;line-height:normal;height:38px;vertical-align: middle;"> <a style="text-decoration:none;display:block;padding: 8px 0px;background-color:' + zfem_cons.arrNPSColors[n] + ";border-color:" + zfem_cons.arrNPSColors[n] + ";color:#FFFFFF;font-family: " + a + ";text-align:center;" + S + '">' + o.translations[i].name + "</a> </td>" : C += '<td zf-embed-article-code="' + e + '" zf-embed-c-id="' + (n + 1) + '" style="cursor:pointer;width:38px;line-height:normal;height:38px;vertical-align: middle;"> <a style="text-decoration:none;display:block;padding: 8px 0px;background-color:' + _zfHexToRGB(s, .1) + ";border:1px solid;border-color:" + s + ";color:" + s + ";font-family: " + a + ";text-align:center;" + S + '">' + o.translations[i].name + "</a> </td>"
        }),
        C += '<tr><td style="text-align:' + (v ? "right" : "left") + ";font-family:" + a + ';font-size:12px;padding:5px 0 0;" colspan="5"><a style="color:' + s + ';text-decoration:none;font-size:12px">' + t.translations[i].helpTextFirstOption + "</a></td>",
        C += '<td align="' + (v ? "left" : "right") + '" style="text-align:+(directionRTL?"left":"right")+;font-family:' + a + ';font-size:12px;padding:5px 0 0;" colspan="6"><a style="color:' + s + ";text-decoration:none;font-size:12px;font-family:" + a + ';">' + t.translations[i].helpTextLastOption + "</a></td></tr>",
        C += "</tbody></tr></table>"
    }
    return C += "</tr> </tbody> </table>"
}
function _zfHexToRGB(e, t) {
    let o = parseInt(e.slice(1, 3), 16)
      , i = parseInt(e.slice(3, 5), 16)
      , n = parseInt(e.slice(5, 7), 16);
    return t ? "rgba(" + o + ", " + i + ", " + n + ", " + t + ")" : "rgb(" + o + ", " + i + ", " + n + ")"
}
function _zfGetFieldSelectedChoiceHTML(e, t, o, i, n="hover") {
    "click" == n && (t.style.pointerEvents = "none");
    var s = "mouseout" === n
      , a = o.embedField.fieldName
      , r = o.fontColorValue
      , l = _zfGetContrastColor(o.fontColorValue)
      , d = o.embedField.choices.length
      , c = o.embedField.choicesHasImage
      , m = o.embedField.isButtonColored
      , f = ["heart_rating", "star_rating"]
      , p = d + "-" + i
      , $ = "";
    if ("heart_rating" == a && (p = "heart_rating"),
    "star_rating" == a && (p = "star_rating"),
    "svg" == o.embedField.iconType) {
        if (-1 == f.indexOf(a))
            "circle_rating" == a ? _zfOutlineCircleAnimation(e, s, d, i) : _zfOutlineEmojiAnimation(e, s, p, r);
        else
            for (var b = t.querySelectorAll('td[zf-embed-article-code="' + o.uniqueRefCode + '"]'), _ = 0; _ <= i; _++) {
                var e = b[_];
                _zfOutlineEmojiAnimation(e, s, p, r)
            }
    } else {
        var g = []
          , u = null
          , y = null
          , z = []
          , h = [];
        if (-1 == f.indexOf(a))
            switch (a) {
            case "emotion_rating":
            case "circle_rating":
                if (u = e.querySelector("img"),
                s)
                    u.style.webkitTransform = "scale(1)";
                else if ("click" == n) {
                    g = t.querySelectorAll("img");
                    for (var x = 0; x < g.length; x++)
                        g[x].style.opacity = "0.5";
                    u.style.opacity = "1",
                    u.style.webkitTransform = "scale(1)"
                } else
                    u.style.webkitTransform = "scale(1.1)";
                break;
            case "button_rating":
                u = e.querySelector("div"),
                y = e.querySelector("div a"),
                s ? (u.style.backgroundColor = _zfHexToRGB(r, .1),
                y.style.color = r) : "click" === n ? (u.style.backgroundColor = _zfHexToRGB(r, .9),
                y.style.color = l) : u.style.backgroundColor = _zfHexToRGB(r, .3);
                break;
            case "radio_rating":
                h = (u = e.querySelector("a")).querySelectorAll("svg path"),
                s ? h[1].setAttribute("style", "fill:transparent;") : h[1].setAttribute("style", "fill:" + r + ";");
                break;
            case "mcqquestion":
                if (e.hasAttribute("il"))
                    return !0;
                u = e.querySelector("div"),
                y = e.querySelector("div a"),
                z = e.querySelectorAll("div span"),
                s ? u.style.backgroundColor = _zfHexToRGB(r, .2) : "click" === n ? (u.style.backgroundColor = _zfHexToRGB(r, 1),
                y.style.color = l) : u.style.backgroundColor = _zfHexToRGB(r, .3);
                break;
            case "radio":
                c ? (u = e,
                y = e.querySelector("span"),
                s ? u.style.backgroundColor = _zfHexToRGB(r, .1) : "click" === n ? (u.style.backgroundColor = _zfHexToRGB(r, 1),
                y.style.color = l) : u.style.backgroundColor = _zfHexToRGB(r, .3)) : (u = e.querySelector("div"),
                h = (y = e.querySelector("div a")).querySelectorAll("svg path"),
                y = y.querySelector("span"),
                s ? (u.style.backgroundColor = _zfHexToRGB(r, .1),
                h[1].setAttribute("style", "fill:transparent;")) : "click" === n ? (u.style.backgroundColor = _zfHexToRGB(r, 1),
                h[1].setAttribute("style", "fill:" + l + ";"),
                h[0].setAttribute("style", "stroke:" + l + ";"),
                y.style.color = l) : (u.style.backgroundColor = _zfHexToRGB(r, .3),
                h[1].setAttribute("style", "fill:" + r + ";")));
                break;
            case "npsquestion":
            case "cssquestion":
                "cssquestion" === a ? (u = e,
                y = e.querySelector("a"),
                $ = "td[zf-embed-article-code]") : (u = e.querySelector("a"),
                $ = "a"),
                s ? m ? u.style.opacity = "1" : u.style.backgroundColor = _zfHexToRGB(r, .1) : "click" === n ? m ? (t.querySelectorAll($).forEach(function(e, t) {
                    t != i && (e.style.backgroundColor = "#d3910236")
                }),
                u.style.opacity = "1") : (u.style.backgroundColor = _zfHexToRGB(r, .9),
                "cssquestion" === a ? y.style.color = l : u.style.color = l) : m ? u.style.opacity = "0.7" : u.style.backgroundColor = _zfHexToRGB(r, .3)
            }
        else {
            var b = t.querySelectorAll('td[zf-embed-article-code="' + o.uniqueRefCode + '"]')
              , v = i;
            "click" === n && (v = d - 1);
            for (var _ = 0; _ <= v; _++) {
                var e = b[_]
                  , C = e.querySelector("img");
                s ? C.setAttribute("style", "-webkit-transform:scale(1)") : "click" === n ? _ <= i ? C.setAttribute("style", "opacity:1") : C.setAttribute("style", "opacity:0.5") : C.setAttribute("style", "-webkit-transform:scale(1.1)")
            }
        }
    }
}
function _zfOutlineEmojiAnimation(e, t, o, i) {
    var n = e.querySelectorAll("a svg path")
      , s = e.querySelectorAll("a svg circle")
      , a = "fill:" + _zfHexToRGB(i, 1) + ";"
      , r = "stroke:" + _zfHexToRGB(i, 1) + ";"
      , l = "fill:transparent;";
    switch (o) {
    case "5-0":
    case "4-0":
    case "3-0":
    case "2-0":
        t ? (n[0].setAttribute("style", l),
        n[1].setAttribute("style", a),
        n[2].setAttribute("style", a),
        n[3].setAttribute("style", a)) : (n[0].setAttribute("style", a),
        n[1].setAttribute("style", l),
        n[2].setAttribute("style", l),
        n[3].setAttribute("style", l));
        break;
    case "5-1":
    case "5-2":
    case "4-1":
    case "3-1":
        t ? (n[0].setAttribute("style", l),
        n[1].setAttribute("style", a),
        s[1].setAttribute("style", a),
        s[2].setAttribute("style", a)) : (n[0].setAttribute("style", a),
        n[1].setAttribute("style", l),
        s[1].setAttribute("style", l),
        s[2].setAttribute("style", l));
        break;
    case "5-3":
    case "4-2":
        t ? (n[0].setAttribute("style", l),
        n[1].setAttribute("style", l + r),
        s[1].setAttribute("style", a),
        s[2].setAttribute("style", a)) : (n[0].setAttribute("style", a),
        n[1].setAttribute("style", l),
        s[1].setAttribute("style", l),
        s[2].setAttribute("style", l));
        break;
    case "5-4":
    case "4-3":
    case "3-2":
    case "2-1":
        t ? (n[0].setAttribute("style", l),
        n[1].setAttribute("style", l + r),
        n[2].setAttribute("style", l + r),
        n[3].setAttribute("style", l + r)) : (n[0].setAttribute("style", a),
        n[1].setAttribute("style", l),
        n[2].setAttribute("style", l),
        n[3].setAttribute("style", l));
        break;
    case "heart_rating":
        t ? (n[0].setAttribute("style", l),
        n[1].setAttribute("style", a)) : (n[0].setAttribute("style", a),
        n[1].setAttribute("style", l));
        break;
    case "star_rating":
        t ? n[0].setAttribute("style", l) : n[0].setAttribute("style", a)
    }
}
function _zfOutlineCircleAnimation(e, t, o, i) {
    var n = e.querySelectorAll("a svg circle")
      , s = zfem_cons.arrCircleColors[zfem_cons.arrCircleEmojiBracket[o][i]];
    t ? n[0].setAttribute("style", "fill:transparent;stroke:" + _zfHexToRGB(s, 1) + ";") : n[0].setAttribute("style", "fill:" + _zfHexToRGB(s, 1) + ";stroke:" + _zfHexToRGB(s, 1) + ";")
}
function _zfGetContrastColor(e) {
    if (!RegExp("^#([0-9a-f]{6})$").test(e.toLowerCase()))
        return "#ffffff";
    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return parseInt(t[1], 16) + parseInt(t[2], 16) + parseInt(t[3], 16) > 370 ? "#000000" : "#ffffff"
}
function _zfSubmitArticleEmbedSurvey(e, t, o, i) {
    let n = new URLSearchParams(window.location.search);
    var s = {};
    s.utm_source = n.get("utm_source") ? n.get("utm_source") : void 0,
    s.utm_medium = n.get("utm_medium") ? n.get("utm_medium") : void 0,
    s.utm_campaign = n.get("utm_campaign") ? n.get("utm_campaign") : void 0,
    s.utm_content = n.get("utm_content") ? n.get("utm_content") : void 0,
    s.utm_term = n.get("utm_term") ? n.get("utm_term") : void 0,
    s.zfsource_pp_domain = window.location.hostname,
    s.zfsource_pp_url = encodeURIComponent(window.location.href),
    s.zfsource_pp_pageurl = window.location.origin + window.location.pathname,
    s.zfsource_pp_path = zfem_cons.customPagePath ? zfem_cons.customPagePath : window.location.pathname,
    s.zfsource_pp_pagename = zfem_cons.customPageTitle ? zfem_cons.customPageTitle : document.title;
    var a = _zfGetZfEmbedSurveyCookie(zfem_cons.visCId)
      , r = localStorage.getItem(a)
      , l = r ? JSON.parse(r) : {};
    l.contactId && (s.contactId = l.contactId),
    l.cookieId && (s.cookieId = l.cookieId);
    var d = {
        responseType: "Online",
        uniqueRefCode: t,
        trackRefCode: "",
        companyId: zfem_cons.cmpId,
        surveyId: e.surveyId,
        locationId: "",
        takenBy: "",
        language: e.defaultLanguageCode,
        timeZoneOffset: new Date().getTimezoneOffset(),
        timeZone: "temporary",
        surveyStartDateTime: _zfTimeConverter(parseInt(new Date().getTime())),
        surveyFillStartDateTime: _zfTimeConverter(parseInt(new Date().getTime())),
        surveySubmitDateTime: _zfTimeConverter(parseInt(new Date().getTime())),
        surveyResponse: [{
            fieldId: e.embedField._id,
            fieldValue: e.embedField.choices[o - 1]._id,
            choiceId: e.embedField.choices[o - 1]._id,
            optionId: e.embedField.options && e.embedField.options[0] ? e.embedField.options[0]._id : ""
        }],
        customer: {},
        queryParams: s,
        sourcePageTitle: zfem_cons.customPageTitle ? zfem_cons.customPageTitle : document.title,
        sourcePageUrl: window.location.origin + window.location.pathname,
        userAgent: navigator.userAgent,
        pageUrl: window.location.origin + window.location.pathname,
        domain: window.location.origin,
        pageName: s.zfsource_PageTitle ? s.zfsource_PageTitle : document.title,
        resolution: screen.width + "x" + screen.height,
        browserResolution: window.innerWidth + "x" + window.innerHeight,
        referralUrl: document.referrer,
        widgetType: "article",
        referrerUrl: document.referrer,
        browserResolution: window.innerWidth + "x" + window.innerHeight,
        browserLanguage: navigator.language
    };
    "npsquestion" == e.embedField.fieldName && e.embedField.isPrimaryField && (d.customer.nps = e.embedField.choices[o - 1].translations[e.defaultLanguageCode].name),
    "cssquestion" == e.embedField.fieldName && (d.customer.ces = e.embedField.choices[o - 1].choiceWeight);
    var c = new XMLHttpRequest;
    c.open("POST", zfem_cons.backendApiBaseUrl + "/responses/addWebResponse"),
    c.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    let m = zfem_cons.detectedLang;
    -1 == Object.keys(e.typt).indexOf(zfem_cons.detectedLang) && (m = e.defaultLanguageCode);
    var f = e.typt[m].upperText ? e.typt[m].upperText : "Thankyou !!";
    i.setAttribute("zf-hold-content", "true");
    var p = !1;
    if (i.hasAttribute("il") && (p = !0),
    !p) {
        let $ = i.closest("div[zf-embed-widget]").offsetHeight;
        i.closest("div[zf-embed-widget]").innerHTML = '<div class="zf-embed-html-submit-msg-holder" style="height:' + $ + 'px;display: flex; justify-content: center; align-items: center;"><span style="font-family:' + e.fontFamily + ";color:" + e.fontColorLabel + '">' + f + "</span></div>"
    }
    c.send(JSON.stringify({
        response: d
    })),
    c.onload = function() {
        if (201 === c.status) {
            var o = JSON.parse(c.response);
            o.data.contactId && (l.contactId = o.data.contactId,
            _zfPrintConsole("Identified contact as Id: #" + o.data.contactId)),
            localStorage.setItem(a, JSON.stringify(l)),
            e.embedSettings.visibleTill && "submit" == e.embedSettings.visibleTill && _zfSetZfEmbedSurveyCookie(zfem_cons.arrSubmitSurveyCookie[t], "hide")
        }
    }
}
function _zfTimeConverter(e) {
    var t, o = new Date(e), i = o.getFullYear(), n = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"][o.getMonth()], s = (10 > o.getDate() ? "0" : "") + o.getDate(), a = (10 > o.getHours() ? "0" : "") + o.getHours(), r = (10 > o.getMinutes() ? "0" : "") + o.getMinutes();
    return i + "-" + n + "-" + s + " " + a + ":" + r + ":" + ((10 > o.getSeconds() ? "0" : "") + o.getSeconds())
}
function _zfLogSureyVisit(e="article", t, o, i) {
    var n = {
        surveyId: t,
        contactId: i || "",
        surveyRefCode: o,
        companyId: zfem_cons.cmpId,
        domain: window.location.hostname,
        url: window.location.origin + window.location.pathname,
        queryString: window.location.search,
        userAgent: navigator.userAgent,
        cookie: navigator.cookieEnabled,
        pageName: document.title,
        resolution: screen.width + "x" + screen.height,
        timeZone: new Date().getTimezoneOffset(),
        refferUrl: document.referrer,
        embed: e,
        trackRefCode: "",
        browserLanguage: navigator.language,
        activityType: "surveyViewed",
        socketConnId: ""
    }
      , s = new XMLHttpRequest;
    s.open("POST", zfem_cons.backendApiBaseUrl + "/surveys/logVisit"),
    s.setRequestHeader("Content-Type", "application/json;charset=UTF-8"),
    s.send(JSON.stringify(n)),
    s.onload = function() {}
}
zfem_cons_observer.observe(document, zfem_cons.observerconfig),
_zfHandleVisitorSessCookie(),
_zfActivityWatcher(),
_zfGetZfEmbedSurveyCookie(zfem_cons.visCId) ? (_zfSetZfEmbedSurveyCookie(zfem_cons.visCId, _zfGetZfEmbedSurveyCookie(zfem_cons.visCId)),
_zfSetUpdateVisitorData(null, !0, !0, !0, !0)) : (_zfSetZfEmbedSurveyCookie(zfem_cons.visCId, Math.random().toString(36).slice(2) + Date.now()),
_zfSetUpdateVisitorData(null, !0, !0, !0, !0));
var style = document.createElement("style");
style.innerHTML = '@import url("//fonts.googleapis.com/css?family=Open+Sans|Oswald|Lato|Source+Sans+Pro|Lobster|Shadows+Into+Light|Indie+Flower|Gloria+Hallelujah|Pacifico|Josefin+Sans|Poiret+One");',
document.head.appendChild(style);
