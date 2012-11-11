/* PubSub - v0.1.0 - 2012-11-11
* Copyright (c) 2012 Adam Zamozniewicz <zamozniewicz@gmail.com>
* Released under the MIT License */

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
        "use strict";

        for (var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    };
}

if (!Array.prototype.filter) {
    Array.prototype.filter = function (fn /*, thisp */) {
        "use strict";

        if (this == null) {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fn !== "function") {
            throw new TypeError();
        }

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i]; // in case fn mutates this
                if (fn.call(thisp, val, i, t)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
}

(function (definition) {
    "use strict";

    var global = (typeof window !== "undefined" && window) || this;
    var isCommonJSModule = (typeof module === "object" && typeof exports === "object");
    var isAMDModule = (typeof define === "function" && define.amd);

    if (isCommonJSModule) {
        // CommonJS
        module.exports = definition();
    } else if (isAMDModule) {
        // AMD
        define(definition);
    } else {
        // Browser global
        global.pubsub = definition();
    }
}(function (undefined) {
    "use strict";

    var subscriptions = {};
    var pubsub = {};

    pubsub.subscribe = function (message, callback) {
        if (typeof message !== "string") {
            throw new Error("Provide a valid message to subscribe to.");
        }

        subscriptions[message] = subscriptions[message] || [];
        subscriptions[message].push(callback);
    };

    pubsub.unsubscribe = function (message, callback) {
        if (typeof message !== "string") {
            throw new Error("Provide a valid message to unsubscribe.");
        }

        if (!subscriptions[message]) {
            return;
        }

        subscriptions[message] = subscriptions[message].filter(function (subscription) {
            return subscription !== callback;
        });
    };

    pubsub.publish = function (message, data) {
        if (typeof message !== "string") {
            throw new Error("Provide a valid topic name to publish.");
        }

        if (!subscriptions[message]) {
            return;
        }

        subscriptions[message].forEach(function (callback) {
            callback(data);
        });
    };

    return pubsub;
}));
