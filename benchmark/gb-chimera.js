"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("chiml/dist/index.js");
var __isCompiled = true;
/* Series */
function __unit_0() {
    var genres = null;
    var __first_0 = true;
    function __fn_0() {
        if ((__first_0 && (true)) || (!__first_0 && false)) {
            /* JS Function with Node Callback : sys.httpRequest */
            function __unit_0_0() {
                var __first_0_0 = true;
                function __fn_0_0() {
                    if ((__first_0_0 && (true)) || (!__first_0_0 && false)) {
                        var __promise_0_0 = new Promise(function (__resolve, __reject) {
                            (index_js_1.sys.httpRequest)('http://localhost:3000/genres', function (__error) {
                                var __result = [];
                                for (var _i = 1; _i < arguments.length; _i++) {
                                    __result[_i - 1] = arguments[_i];
                                }
                                if (__error) {
                                    return __reject(__error);
                                }
                                genres = __result.length === 0 ? undefined : (__result.length === 1 ? __result[0] : __result);
                                return __resolve(true);
                            });
                        });
                        __first_0_0 = false;
                        return __promise_0_0.then(function () { return __fn_0_0(); });
                    }
                    return Promise.resolve(genres);
                }
                return __fn_0_0().catch(function (__error) {
                    __error = __error && 'message' in __error ? __error : new Error(__error);
                    if (__error && !__error.__propagated) {
                        __error.message = [
                            "",
                            "MODE    : " + "Normal",
                            "INPUT   : " + JSON.stringify([], null, 2).split("\n").join("\n  "),
                            "PROCESS : " + "JS Function with Node Callback : sys.httpRequest".split("\n").join("\n  "),
                            "ERROR   : " + (__error.message).split("\n").join("\n  "),
                        ].join("\n");
                        __error.__propagated = true;
                    }
                    throw (__error);
                });
            }
            function __main_0_0() {
                var __ins = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    __ins[_i] = arguments[_i];
                }
                return __unit_0_0.apply(void 0, __ins);
            }
            function __main_0_1(__src) {
                if (__src === void 0) { __src = genres; }
                /* Series */
                function __unit_0_1(raw) {
                    var result = null;
                    var books = null;
                    var __first_0_1 = true;
                    function __fn_0_1() {
                        if ((__first_0_1 && (true)) || (!__first_0_1 && false)) {
                            /* JS Function with Node Callback : sys.httpRequest */
                            function __unit_0_1_0() {
                                var __first_0_1_0 = true;
                                function __fn_0_1_0() {
                                    if ((__first_0_1_0 && (true)) || (!__first_0_1_0 && false)) {
                                        var __promise_0_1_0 = new Promise(function (__resolve, __reject) {
                                            (index_js_1.sys.httpRequest)('http://localhost:3000/books?genreId=' + raw.id, function (__error) {
                                                var __result = [];
                                                for (var _i = 1; _i < arguments.length; _i++) {
                                                    __result[_i - 1] = arguments[_i];
                                                }
                                                if (__error) {
                                                    return __reject(__error);
                                                }
                                                books = __result.length === 0 ? undefined : (__result.length === 1 ? __result[0] : __result);
                                                return __resolve(true);
                                            });
                                        });
                                        __first_0_1_0 = false;
                                        return __promise_0_1_0.then(function () { return __fn_0_1_0(); });
                                    }
                                    return Promise.resolve(books);
                                }
                                return __fn_0_1_0().catch(function (__error) {
                                    __error = __error && 'message' in __error ? __error : new Error(__error);
                                    if (__error && !__error.__propagated) {
                                        __error.message = [
                                            "",
                                            "MODE    : " + "Normal",
                                            "INPUT   : " + JSON.stringify([], null, 2).split("\n").join("\n  "),
                                            "PROCESS : " + "JS Function with Node Callback : sys.httpRequest".split("\n").join("\n  "),
                                            "ERROR   : " + (__error.message).split("\n").join("\n  "),
                                        ].join("\n");
                                        __error.__propagated = true;
                                    }
                                    throw (__error);
                                });
                            }
                            function __main_0_1_0() {
                                var __ins = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    __ins[_i] = arguments[_i];
                                }
                                return __unit_0_1_0.apply(void 0, __ins);
                            }
                            function __main_0_1_1(__src) {
                                if (__src === void 0) { __src = books; }
                                /* JS Function : (x) => x.title */
                                function __unit_0_1_1(book) {
                                    var __first_0_1_1 = true;
                                    function __fn_0_1_1() {
                                        if ((__first_0_1_1 && (true)) || (!__first_0_1_1 && false)) {
                                            var __promise_0_1_1 = new Promise(function (__resolve, __reject) {
                                                try {
                                                    book = (function (x) { return x.title; })(book);
                                                    __resolve(true);
                                                }
                                                catch (__error) {
                                                    __reject(__error);
                                                }
                                            });
                                            __first_0_1_1 = false;
                                            return __promise_0_1_1.then(function () { return __fn_0_1_1(); });
                                        }
                                        return Promise.resolve(book);
                                    }
                                    return __fn_0_1_1().catch(function (__error) {
                                        __error = __error && 'message' in __error ? __error : new Error(__error);
                                        if (__error && !__error.__propagated) {
                                            __error.message = [
                                                "",
                                                "MODE    : " + "Map" + JSON.stringify(books),
                                                "INPUT   : " + JSON.stringify([book], null, 2).split("\n").join("\n  "),
                                                "PROCESS : " + "JS Function : (x) => x.title".split("\n").join("\n  "),
                                                "ERROR   : " + (__error.message).split("\n").join("\n  "),
                                            ].join("\n");
                                            __error.__propagated = true;
                                        }
                                        throw (__error);
                                    });
                                }
                                var __promises = __src.map(function (__element) { return __unit_0_1_1(__element); });
                                return Promise.all(__promises).then(function (__result) {
                                    books = __result;
                                }).then(function () { return Promise.resolve(books); });
                            }
                            /* JS Function : (x) => x */
                            function __unit_0_1_2() {
                                var __first_0_1_2 = true;
                                function __fn_0_1_2() {
                                    if ((__first_0_1_2 && (true)) || (!__first_0_1_2 && false)) {
                                        var __promise_0_1_2 = new Promise(function (__resolve, __reject) {
                                            try {
                                                result = (function (x) { return x; })({ genre: raw.name, books: books });
                                                __resolve(true);
                                            }
                                            catch (__error) {
                                                __reject(__error);
                                            }
                                        });
                                        __first_0_1_2 = false;
                                        return __promise_0_1_2.then(function () { return __fn_0_1_2(); });
                                    }
                                    return Promise.resolve(result);
                                }
                                return __fn_0_1_2().catch(function (__error) {
                                    __error = __error && 'message' in __error ? __error : new Error(__error);
                                    if (__error && !__error.__propagated) {
                                        __error.message = [
                                            "",
                                            "MODE    : " + "Normal",
                                            "INPUT   : " + JSON.stringify([], null, 2).split("\n").join("\n  "),
                                            "PROCESS : " + "JS Function : (x) => x".split("\n").join("\n  "),
                                            "ERROR   : " + (__error.message).split("\n").join("\n  "),
                                        ].join("\n");
                                        __error.__propagated = true;
                                    }
                                    throw (__error);
                                });
                            }
                            function __main_0_1_2() {
                                var __ins = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    __ins[_i] = arguments[_i];
                                }
                                return __unit_0_1_2.apply(void 0, __ins);
                            }
                            var __promise_0_1 = Promise.resolve(true).then(function () { return __main_0_1_0(); }).then(function () { return __main_0_1_1(); }).then(function () { return __main_0_1_2(); });
                            __first_0_1 = false;
                            return __promise_0_1.then(function () { return __fn_0_1(); });
                        }
                        return Promise.resolve(result);
                    }
                    return __fn_0_1().catch(function (__error) {
                        __error = __error && 'message' in __error ? __error : new Error(__error);
                        if (__error && !__error.__propagated) {
                            __error.message = [
                                "",
                                "MODE    : " + "Map" + JSON.stringify(genres),
                                "INPUT   : " + JSON.stringify([raw], null, 2).split("\n").join("\n  "),
                                "PROCESS : " + "Series".split("\n").join("\n  "),
                                "ERROR   : " + (__error.message).split("\n").join("\n  "),
                            ].join("\n");
                            __error.__propagated = true;
                        }
                        throw (__error);
                    });
                }
                var __promises = __src.map(function (__element) { return __unit_0_1(__element); });
                return Promise.all(__promises).then(function (__result) {
                    genres = __result;
                }).then(function () { return Promise.resolve(genres); });
            }
            var __promise_0 = Promise.resolve(true).then(function () { return __main_0_0(); }).then(function () { return __main_0_1(); });
            __first_0 = false;
            return __promise_0.then(function () { return __fn_0(); });
        }
        return Promise.resolve(genres);
    }
    return __fn_0().catch(function (__error) {
        __error = __error && 'message' in __error ? __error : new Error(__error);
        if (__error && !__error.__propagated) {
            __error.message = [
                "",
                "MODE    : " + "Normal",
                "INPUT   : " + JSON.stringify([], null, 2).split("\n").join("\n  "),
                "PROCESS : " + "Series".split("\n").join("\n  "),
                "ERROR   : " + (__error.message).split("\n").join("\n  "),
            ].join("\n");
            __error.__propagated = true;
        }
        throw (__error);
    });
}
function __main_0() {
    var __ins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        __ins[_i] = arguments[_i];
    }
    return __unit_0.apply(void 0, __ins);
}
module.exports = __main_0;
if (require.main === module) {
    var args = index_js_1.__parseIns(process.argv.slice(2));
    __main_0.apply(void 0, args).then(function (result) {
        var shownResult = Array.isArray(result) || typeof result === "object" ?
            JSON.stringify(result, null, 2) : result;
        console.log(shownResult);
    }).catch(function (error) { return console.error(error); });
}
