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
    var lastToken = 0; // For internal use, incremented for every subscription and returned from subscribe method

    // Subscribe the callback function to the message
    pubsub.subscribe = function (message, callback) {
        if (typeof message !== "string") {
            throw new Error("Provide a valid message to subscribe to.");
        }

        if (typeof callback !== "function") {
            throw new Error("Provide a valid callback to subscribe to the message");
        }

        var token = lastToken + 1;
        lastToken = token;

        subscriptions[message] = subscriptions[message] || [];
        subscriptions[message].push({
            token: token,
            callback: callback
        });

        return token;
    };

    // Unsubscribe callback passed by reference or identified by token from the message
    pubsub.unsubscribe = function (message, callbackOrToken) {
        if (typeof message !== "string") {
            throw new Error("Provide a valid message to unsubscribe.");
        }

        // Determine whether token or reference to the function has been passed as the argument
        var hasCallback = false;
        var hasToken = false;
        if (typeof callbackOrToken === "function") {
            hasCallback = true;
        } else if (typeof callbackOrToken === "number") {
            hasToken = true;
        } else {
            throw new Error("Provide a valid callback or token of a subscription to unsubscribe.");
        }

        // Do nothing, if no callbacks has been subscribed to the message yet
        if (!subscriptions.hasOwnProperty(message)) {
            return;
        }

        // Remove references to the function from subscriptions[message]
        subscriptions[message] = subscriptions[message].filter(function (subscription) {
            if (hasCallback) {
                return subscription.callback !== callbackOrToken;
            } else if (hasToken) {
                return subscription.token !== callbackOrToken;
            }
        });
    };

    // Publish message, passing data as an argument
    pubsub.publish = function (message, data) {
        if (typeof message !== "string") {
            throw new Error("Provide a valid topic name to publish.");
        }

        // Do nothing, when a message with no subscriptions is published
        if (!subscriptions.hasOwnProperty(message)) {
            return;
        }

        // Fire all callbacks subscribed to the message
        subscriptions[message].forEach(function (subscription) {
            subscription.callback(data);
        });
    };

    return pubsub;
}));
