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
