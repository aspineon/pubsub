/*global setTimeout, module, exports, define, window */

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
