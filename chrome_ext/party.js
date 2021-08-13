(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("party", [], factory);
	else if(typeof exports === 'object')
		exports["party"] = factory();
	else
		root["party"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/colour.ts":
/*!**********************************!*\
  !*** ./src/components/colour.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Colour = void 0;
var math_1 = __webpack_require__(/*! ../systems/math */ "./src/systems/math.ts");
/**
 * Represents a colour consisting of RGB values.
 * The components of the colour are represented as
 * integers in the range 0 to 255.
 *
 * @example
 * ```ts
 * const a = new Colour(12, 59, 219);
 * const b = Colour.fromHex("#ffa68d");
 * const result = a.mix(b);
 * ```
 */
var Colour = /** @class */ (function () {
    /**
     * Creates a new colour instance from the specified RGB components.
     */
    function Colour(r, g, b) {
        this.values = new Float32Array(3);
        this.rgb = [r, g, b];
    }
    Object.defineProperty(Colour.prototype, "r", {
        /**
         * Returns the r-component of the colour.
         */
        get: function () {
            return this.values[0];
        },
        /**
         * Modifies the r-component of the colour.
         * Note that this also floors the value.
         */
        set: function (value) {
            this.values[0] = Math.floor(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Colour.prototype, "g", {
        /**
         * Returns the g-component of the colour.
         */
        get: function () {
            return this.values[1];
        },
        /**
         * Modifies the g-component of the colour.
         * Note that this also floors the value.
         */
        set: function (value) {
            this.values[1] = Math.floor(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Colour.prototype, "b", {
        /**
         * Returns the b-component of the colour.
         * Note that this also floors the value.
         */
        get: function () {
            return this.values[2];
        },
        /**
         * Modifies the b-component of the colour.
         */
        set: function (value) {
            this.values[2] = Math.floor(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Colour.prototype, "rgb", {
        /**
         * Returns the rgb-components of the colour, bundled as a copied array.
         */
        get: function () {
            return [this.r, this.g, this.b];
        },
        /**
         * Simultaneously updates the rgb-components of the colour, by passing an array.
         */
        set: function (values) {
            this.r = values[0];
            this.g = values[1];
            this.b = values[2];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Mixes the two colours together with an optional mixing weight.
     * This weight is 0.5 by default, perfectly averaging the colours.
     */
    Colour.prototype.mix = function (colour, weight) {
        if (weight === void 0) { weight = 0.5; }
        return new Colour(math_1.lerp(this.r, colour.r, weight), math_1.lerp(this.g, colour.g, weight), math_1.lerp(this.b, colour.b, weight));
    };
    /**
     * Returns the hexadecimal representation of the colour, prefixed by '#'.
     */
    Colour.prototype.toHex = function () {
        var hex = function (v) { return v.toString(16).padStart(2, "0"); };
        return "#" + hex(this.r) + hex(this.g) + hex(this.b);
    };
    /**
     * Returns a formatted representation of the colour.
     */
    Colour.prototype.toString = function () {
        return "rgb(" + this.values.join(", ") + ")";
    };
    /**
     * Creates a colour from the specified hexadecimal string.
     * This string can optionally be prefixed by '#'.
     */
    Colour.fromHex = function (hex) {
        if (hex.startsWith("#")) {
            hex = hex.substr(1);
        }
        return new Colour(parseInt(hex.substr(0, 2), 16), parseInt(hex.substr(2, 2), 16), parseInt(hex.substr(4, 2), 16));
    };
    /**
     * Creates a colour from the specified HSL components.
     *
     * @see https://stackoverflow.com/a/9493060/5507624
     */
    Colour.fromHsl = function (h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        if (s === 0) {
            return new Colour(l, l, l);
        }
        else {
            var hue2rgb = function (p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            var to255 = function (v) { return Math.min(255, 256 * v); };
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            return new Colour(to255(hue2rgb(p, q, h + 1 / 3)), to255(hue2rgb(p, q, h)), to255(hue2rgb(p, q, h - 1 / 3)));
        }
    };
    /**
     * Returns (1, 1, 1).
     */
    Colour.white = new Colour(255, 255, 255);
    /**
     * Returns (0, 0, 0).
     */
    Colour.black = new Colour(0, 0, 0);
    return Colour;
}());
exports.Colour = Colour;


/***/ }),

/***/ "./src/components/gradient.ts":
/*!************************************!*\
  !*** ./src/components/gradient.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gradient = void 0;
var spline_1 = __webpack_require__(/*! ./spline */ "./src/components/spline.ts");
/**
 * Represents a gradient that can be used to interpolate between multiple colours.
 */
var Gradient = /** @class */ (function (_super) {
    __extends(Gradient, _super);
    function Gradient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Interpolates between two colours on the gradient. Note that the interpolation
     * will have easing applied to it.
     */
    Gradient.prototype.interpolate = function (a, b, t) {
        return a.mix(b, t);
    };
    /**
     * Returns a solid gradient from the given colour.
     */
    Gradient.solid = function (colour) {
        return new Gradient({ value: colour, time: 0.5 });
    };
    /**
     * Returns a gradient with evenly spaced keys from the given colours.
     */
    Gradient.simple = function () {
        var colours = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            colours[_i] = arguments[_i];
        }
        var step = 1 / (colours.length - 1);
        return new (Gradient.bind.apply(Gradient, __spreadArray([void 0], colours.map(function (colour, index) { return ({
            value: colour,
            time: index * step,
        }); }))))();
    };
    return Gradient;
}(spline_1.Spline));
exports.Gradient = Gradient;


/***/ }),

/***/ "./src/components/index.ts":
/*!*********************************!*\
  !*** ./src/components/index.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./colour */ "./src/components/colour.ts"), exports);
__exportStar(__webpack_require__(/*! ./gradient */ "./src/components/gradient.ts"), exports);
__exportStar(__webpack_require__(/*! ./numericSpline */ "./src/components/numericSpline.ts"), exports);
__exportStar(__webpack_require__(/*! ./rect */ "./src/components/rect.ts"), exports);
__exportStar(__webpack_require__(/*! ./vector */ "./src/components/vector.ts"), exports);


/***/ }),

/***/ "./src/components/numericSpline.ts":
/*!*****************************************!*\
  !*** ./src/components/numericSpline.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumericSpline = void 0;
var math_1 = __webpack_require__(/*! ../systems/math */ "./src/systems/math.ts");
var spline_1 = __webpack_require__(/*! ./spline */ "./src/components/spline.ts");
/**
 * Represents a spline that can take numeric values.
 */
var NumericSpline = /** @class */ (function (_super) {
    __extends(NumericSpline, _super);
    function NumericSpline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Smoothly interpolates between two keys on the spline.
     */
    NumericSpline.prototype.interpolate = function (a, b, t) {
        return math_1.slerp(a, b, t);
    };
    return NumericSpline;
}(spline_1.Spline));
exports.NumericSpline = NumericSpline;


/***/ }),

/***/ "./src/components/rect.ts":
/*!********************************!*\
  !*** ./src/components/rect.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/components/spline.ts":
/*!**********************************!*\
  !*** ./src/components/spline.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Spline = void 0;
var math_1 = __webpack_require__(/*! ../systems/math */ "./src/systems/math.ts");
/**
 * Represents a spline that can be used to continueously evaluate a function
 * between keys. The base implementation is kept generic, so the functionality
 * can easily be implemented for similar constructs, such as gradients.
 */
var Spline = /** @class */ (function () {
    /**
     * Creates a new spline instance, using the specified keys.
     * Note that you have to pass at least one key.
     */
    function Spline() {
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            keys[_i] = arguments[_i];
        }
        if (keys.length === 0) {
            throw new Error("Splines require at least one key.");
        }
        if (Array.isArray(keys[0])) {
            throw new Error("You are trying to pass an array to the spline constructor, which is not supported. " +
                "Try to spread the array into the constructor instead.");
        }
        this.keys = keys;
    }
    /**
     * Evaluates the spline at the given time.
     */
    Spline.prototype.evaluate = function (time) {
        if (this.keys.length === 0) {
            throw new Error("Attempt to evaluate a spline with no keys.");
        }
        if (this.keys.length === 1) {
            // The spline only contains one key, therefore is constant.
            return this.keys[0].value;
        }
        // Sort the keys and figure out the first key above the passed time.
        var ascendingKeys = this.keys.sort(function (a, b) { return a.time - b.time; });
        var upperKeyIndex = ascendingKeys.findIndex(function (g) { return g.time > time; });
        // If the found index is either 0 or -1, the specified time falls out
        // of the range of the supplied keys. In that case, the value of the
        // nearest applicant key is returned.
        if (upperKeyIndex === 0) {
            return ascendingKeys[0].value;
        }
        if (upperKeyIndex === -1) {
            return ascendingKeys[ascendingKeys.length - 1].value;
        }
        // Otherwise, find the bounding keys, and extrapolate the time between
        // the two. This is then used to interpolate between the two keys,
        // using the provided implementation.
        var lowerKey = ascendingKeys[upperKeyIndex - 1];
        var upperKey = ascendingKeys[upperKeyIndex];
        var containedTime = math_1.invlerp(lowerKey.time, upperKey.time, time);
        return this.interpolate(lowerKey.value, upperKey.value, containedTime);
    };
    return Spline;
}());
exports.Spline = Spline;


/***/ }),

/***/ "./src/components/vector.ts":
/*!**********************************!*\
  !*** ./src/components/vector.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vector = void 0;
var math_1 = __webpack_require__(/*! ../systems/math */ "./src/systems/math.ts");
/**
 * Represents a structure used to process vectors.
 *
 * @remarks
 * Note that the operations in this class will **not** modify the original vector,
 * except for the property assignments. This is to ensure that vectors are not
 * unintentionally modified.
 *
 * @example
 * ```ts
 * const vectorA = new Vector(1, 3, 5);
 * const vectorB = new Vector(2, 3, 1);
 * const vectorC = vectorA.add(vectorB); // (3, 6, 6)
 * ```
 */
var Vector = /** @class */ (function () {
    /**
     * Creates a new vector with optional x-, y-, and z-components.
     * Omitted components are defaulted to 0.
     */
    function Vector(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.values = new Float32Array(3);
        this.xyz = [x, y, z];
    }
    Object.defineProperty(Vector.prototype, "x", {
        /**
         * Returns the x-component of the vector.
         */
        get: function () {
            return this.values[0];
        },
        /**
         * Modifies the x-component of the vector.
         */
        set: function (value) {
            this.values[0] = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "y", {
        /**
         * Returns the y-component of the vector.
         */
        get: function () {
            return this.values[1];
        },
        /**
         * Modifies the y-component of the vector.
         */
        set: function (value) {
            this.values[1] = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "z", {
        /**
         * Returns the z-component of the vector.
         */
        get: function () {
            return this.values[2];
        },
        /**
         * Modifies the z-component of the vector.
         */
        set: function (value) {
            this.values[2] = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vector.prototype, "xyz", {
        /**
         * Returns the xyz-components of the vector, bundled as a copied array.
         */
        get: function () {
            return [this.x, this.y, this.z];
        },
        /**
         * Simultaneously updates the xyz-components of the vector, by passing an array.
         */
        set: function (values) {
            this.values[0] = values[0];
            this.values[1] = values[1];
            this.values[2] = values[2];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the length of the vector.
     */
    Vector.prototype.magnitude = function () {
        return Math.sqrt(this.sqrMagnitude());
    };
    /**
     * Returns the squared length of the vector.
     */
    Vector.prototype.sqrMagnitude = function () {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    };
    /**
     * Adds the two vectors together, component-wise.
     */
    Vector.prototype.add = function (vector) {
        return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    };
    /**
     * Subtracts the right vector from the left one, component-wise.
     */
    Vector.prototype.subtract = function (vector) {
        return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    };
    /**
     * Scales the lefthand vector by another vector or by a number.
     */
    Vector.prototype.scale = function (scalar) {
        if (typeof scalar === "number") {
            return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
        }
        else {
            return new Vector(this.x * scalar.x, this.y * scalar.y, this.z * scalar.z);
        }
    };
    /**
     * Normalizes the vector to a length of 1. If the length was previously zero,
     * then a zero-length vector will be returned.
     */
    Vector.prototype.normalized = function () {
        var magnitude = this.magnitude();
        if (magnitude !== 0) {
            return this.scale(1 / magnitude);
        }
        return new (Vector.bind.apply(Vector, __spreadArray([void 0], this.xyz)))();
    };
    /**
     * Returns the angle between two vectors, in degrees.
     */
    Vector.prototype.angle = function (vector) {
        return (math_1.rad2deg *
            Math.acos((this.x * vector.x + this.y * vector.y + this.z * vector.z) /
                (this.magnitude() * vector.magnitude())));
    };
    /**
     * Returns the cross-product of two vectors.
     */
    Vector.prototype.cross = function (vector) {
        return new Vector(this.y * vector.z - this.z * vector.y, this.z * vector.x - this.x * vector.z, this.x * vector.y - this.y * vector.x);
    };
    /**
     * returns the dot-product of two vectors.
     */
    Vector.prototype.dot = function (vector) {
        return (this.magnitude() *
            vector.magnitude() *
            Math.cos(math_1.deg2rad * this.angle(vector)));
    };
    /**
     * Returns a formatted representation of the vector.
     */
    Vector.prototype.toString = function () {
        return "Vector(" + this.values.join(", ") + ")";
    };
    /**
     * Creates a new vector from an angle, in degrees. Note that the z-component will be zero.
     */
    Vector.from2dAngle = function (angle) {
        return new Vector(Math.cos(angle * math_1.deg2rad), Math.sin(angle * math_1.deg2rad));
    };
    /**
     * Returns (0, 0, 0).
     */
    Vector.zero = new Vector(0, 0, 0);
    /**
     * Returns (1, 1, 1).
     */
    Vector.one = new Vector(1, 1, 1);
    /**
     * Returns (1, 0, 0).
     */
    Vector.right = new Vector(1, 0, 0);
    /**
     * Returns (0, 1, 0).
     */
    Vector.up = new Vector(0, 1, 0);
    /**
     * Returns (0, 0, 1).
     */
    Vector.forward = new Vector(0, 0, 1);
    return Vector;
}());
exports.Vector = Vector;


/***/ }),

/***/ "./src/containers.ts":
/*!***************************!*\
  !*** ./src/containers.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getParticleContainer = exports.getDebugContainer = exports.getRootContainer = void 0;
var _1 = __webpack_require__(/*! . */ "./src/index.ts");
/**
 * The prefix to apply to the containers.
 */
var elementPrefix = "party-js-";
// Internal container variables. These should not be directly used outside of this module.
// When requesting a container, these variables are checked first, and if they dont exist
// or are detached from the DOM, they will be created.
var __rootContainer;
var __debugContainer;
var __particleContainer;
/**
 * A utility method to partially update the style of the specified element.
 */
function partialUpdateStyle(element, style) {
    Object.assign(element.style, style);
}
/**
 * Checks if the specified container is 'active', meaning not undefined and attached to the DOM.
 */
function isContainerActive(container) {
    return container && container.isConnected;
}
/**
 * Returns the root container of the library. Creates it, if it doesn't exist yet.
 */
function getRootContainer() {
    if (!isContainerActive(__rootContainer)) {
        __rootContainer = document.createElement("div");
        __rootContainer.id = elementPrefix + "container";
        // Style the container to stretch across the full screen, without being interactable
        // by the user. Also apply the z-index from the global settings.
        partialUpdateStyle(__rootContainer, {
            position: "fixed",
            left: "0",
            top: "0",
            bottom: "0",
            right: "0",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: _1.settings.zIndex.toString(),
        });
        document.body.appendChild(__rootContainer);
    }
    return __rootContainer;
}
exports.getRootContainer = getRootContainer;
/**
 * Returns the debugging container of the library. Creates it, if it doesn't exist yet.
 */
function getDebugContainer() {
    if (!isContainerActive(__debugContainer)) {
        __debugContainer = document.createElement("div");
        __debugContainer.id = elementPrefix + "debug";
        // Style the container in a non-prominent, simplistic, yet clean way, in the top-left corner.
        partialUpdateStyle(__debugContainer, {
            position: "absolute",
            top: "0",
            left: "0",
            margin: "0.5em",
            padding: "0.5em 1em",
            border: "2px solid rgb(0, 0, 0, 0.2)",
            background: "rgb(0, 0, 0, 0.1)",
            color: "#555",
            fontFamily: "monospace",
        });
        getRootContainer().appendChild(__debugContainer);
    }
    return __debugContainer;
}
exports.getDebugContainer = getDebugContainer;
/**
 * Returns the particles container of the library. Creates it, if it doesn't exist yet.
 */
function getParticleContainer() {
    if (!isContainerActive(__particleContainer)) {
        __particleContainer = document.createElement("div");
        __particleContainer.id = elementPrefix + "particles";
        // Style the container to stretch the full parent width, and apply a perspective distortion.
        partialUpdateStyle(__particleContainer, {
            width: "100%",
            height: "100%",
            perspective: "400px",
        });
        getRootContainer().appendChild(__particleContainer);
    }
    return __particleContainer;
}
exports.getParticleContainer = getParticleContainer;


/***/ }),

/***/ "./src/debug.ts":
/*!**********************!*\
  !*** ./src/debug.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Debug = void 0;
var containers_1 = __webpack_require__(/*! ./containers */ "./src/containers.ts");
var settings_1 = __webpack_require__(/*! ./settings */ "./src/settings.ts");
/**
 * Represents a utility module to view debug information inside the DOM.
 * This is disabled by default and needs to manually be enabled by setting
 * the '.enabled' field to true.
 *
 * While disabled, the utility will not fetch stats and update itself.
 */
var Debug = /** @class */ (function () {
    /**
     * Registers a new debug utility that is attached to the given scene.
     *
     * @param scene The scene to attach to.
     */
    function Debug(scene) {
        this.scene = scene;
        /**
         * The rate at which the debug interface should refresh itself (per second).
         */
        this.refreshRate = 8;
        /**
         * The timer counting down to refreshes.
         */
        this.refreshTimer = 1 / this.refreshRate;
    }
    /**
     * Processes a tick event in the interface. This checks if enough has passed to
     * trigger a refresh, and if so, fetches the debug information and updates the DOM.
     *
     * @param delta The time that has elapsed since the last tick.
     */
    Debug.prototype.tick = function (delta) {
        var container = containers_1.getDebugContainer();
        // If the current display style does not match the style inferred from the
        // enabled-state, update it.
        var displayStyle = settings_1.settings.debug ? "block" : "none";
        if (container.style.display !== displayStyle) {
            container.style.display = displayStyle;
        }
        if (!settings_1.settings.debug) {
            // If the interface is not enabled, don't fetch or update any infos.
            return;
        }
        this.refreshTimer += delta;
        if (this.refreshTimer > 1 / this.refreshRate) {
            this.refreshTimer = 0;
            // Update the container with the fetched information joined on line breaks.
            container.innerHTML = this.getDebugInformation(delta).join("<br>");
        }
    };
    /**
     * Fetches the debug information from the specified delta and the linked scene.
     *
     * @returns An array of debugging information, formatted as HTML.
     */
    Debug.prototype.getDebugInformation = function (delta) {
        // Count emitters and particles.
        var emitters = this.scene.emitters.length;
        var particles = this.scene.emitters.reduce(function (acc, cur) { return acc + cur.particles.length; }, 0);
        var infos = [
            "<b>party.js Debug</b>",
            "--------------",
            "FPS: " + Math.round(1 / delta),
            "Emitters: " + emitters,
            "Particles: " + particles,
        ];
        // Emitter informations are formatted using their index, internal timer
        // and total particle count.
        var emitterInfos = this.scene.emitters.map(function (emitter, index) {
            return ("Emitter #" + (index + 1) + " (" +
                [
                    "\u03A3p: " + emitter.particles.length,
                    "\u03A3t: " + emitter["durationTimer"].toFixed(3) + "s",
                ].join(", ") +
                ")");
        });
        infos.push.apply(infos, __spreadArray(["--------------"], emitterInfos));
        return infos;
    };
    return Debug;
}());
exports.Debug = Debug;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.scene = exports.util = exports.math = exports.random = exports.modules = exports.modifier = exports.variation = exports.settings = void 0;
var scene_1 = __webpack_require__(/*! ./scene */ "./src/scene.ts");
// The library requires the use of the DOM, hence it cannot run in non-browser environments.
if (typeof document === "undefined" || typeof window === "undefined") {
    throw new Error("It seems like you are trying to run party.js in a non-browser environment, which is not supported.");
}
// Export the configurable settings object.
var settings_1 = __webpack_require__(/*! ./settings */ "./src/settings.ts");
Object.defineProperty(exports, "settings", ({ enumerable: true, get: function () { return settings_1.settings; } }));
// Export the emitter and particle types.
__exportStar(__webpack_require__(/*! ./particles/particle */ "./src/particles/particle.ts"), exports);
__exportStar(__webpack_require__(/*! ./particles/emitter */ "./src/particles/emitter.ts"), exports);
// Export various utilities and objects.
exports.variation = __webpack_require__(/*! ./systems/variation */ "./src/systems/variation.ts");
exports.modifier = __webpack_require__(/*! ./systems/modifiers */ "./src/systems/modifiers.ts");
exports.modules = __webpack_require__(/*! ./particles/modules */ "./src/particles/modules/index.ts");
exports.random = __webpack_require__(/*! ./systems/random */ "./src/systems/random.ts");
exports.math = __webpack_require__(/*! ./systems/math */ "./src/systems/math.ts");
exports.util = __webpack_require__(/*! ./util */ "./src/util/index.ts");
__exportStar(__webpack_require__(/*! ./components */ "./src/components/index.ts"), exports);
// Export templates to quickly & easily create sample systems.
__exportStar(__webpack_require__(/*! ./templates */ "./src/templates/index.ts"), exports);
// Export shapes so new ones can be registered easily.
__exportStar(__webpack_require__(/*! ./shapes */ "./src/shapes.ts"), exports);
// Export and create the main scene.
exports.scene = new scene_1.Scene();


/***/ }),

/***/ "./src/particles/emitter.ts":
/*!**********************************!*\
  !*** ./src/particles/emitter.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Emitter = void 0;
var vector_1 = __webpack_require__(/*! ../components/vector */ "./src/components/vector.ts");
var settings_1 = __webpack_require__(/*! ../settings */ "./src/settings.ts");
var random_1 = __webpack_require__(/*! ../systems/random */ "./src/systems/random.ts");
var variation_1 = __webpack_require__(/*! ../systems/variation */ "./src/systems/variation.ts");
var config_1 = __webpack_require__(/*! ../util/config */ "./src/util/config.ts");
var options_1 = __webpack_require__(/*! ./options */ "./src/particles/options/index.ts");
var particle_1 = __webpack_require__(/*! ./particle */ "./src/particles/particle.ts");
/**
 * Represents an emitter that is responsible for spawning and updating particles.
 *
 * Particles themselves are just data-holders, with the system acting upon them and
 * modifying them. The modifications are done mainly via modules, that use the
 * particle's data together with some function to apply temporal transitions.
 *
 * @see Particle
 * @see ParticleModifierModule
 */
var Emitter = /** @class */ (function () {
    /**
     * Creates a new emitter, using default options.
     */
    function Emitter(options) {
        /**
         * The particles currently contained within the system.
         */
        this.particles = [];
        /**
         * The array of modules used to modify particles during their lifetime.
         */
        this.modules = [];
        this.durationTimer = 0; // Measures the current runtime duration, to allow loops to reset.
        this.emissionTimer = 0; // Measures the current emission timer, to allow spawning particles in intervals.
        this.currentLoop = 0; // The current loop index.
        this.attemptedBurstIndices = []; // The indices of the particle bursts that were attempted this loop.
        this.options = config_1.overrideDefaults(options_1.getDefaultEmitterOptions(), options === null || options === void 0 ? void 0 : options.emitterOptions);
        this.emission = config_1.overrideDefaults(options_1.getDefaultEmissionOptions(), options === null || options === void 0 ? void 0 : options.emissionOptions);
        this.shape = config_1.overrideDefaults(options_1.getDefaultShapeOptions(), options === null || options === void 0 ? void 0 : options.shapeOptions);
        this.renderer = config_1.overrideDefaults(options_1.getDefaultRendererOptions(), options === null || options === void 0 ? void 0 : options.rendererOptions);
    }
    Object.defineProperty(Emitter.prototype, "isExpired", {
        /**
         * Checks if the emitter is already expired and can be removed.
         * Expired emitters are not updated.
         */
        get: function () {
            return (this.options.loops >= 0 && this.currentLoop >= this.options.loops);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds a particle modifier module of the specified type to the emitter and returns it.
     */
    Emitter.prototype.addModule = function (moduleType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var module = new moduleType(args);
        this.modules.push(module);
        return module;
    };
    /**
     * Processes a tick of the emitter, using the elapsed time.
     *
     * @remarks
     * This handles a few things, namely:
     * - Incrementing the duration timer and potentially incrementing the loop.
     * - Handling particle bursts & emissions.
     * - Despawning particles conditionally.
     *
     * @param delta The time, in seconds, passed since the last tick.
     */
    Emitter.prototype.tick = function (delta) {
        // Do not update expired particle systems.
        if (this.isExpired) {
            return;
        }
        this.durationTimer += delta;
        if (this.durationTimer >= this.options.duration) {
            this.currentLoop++;
            if (this.isExpired) {
                return;
            }
            // To start a new loop, the duration timer and attempted bursts are reset.
            this.durationTimer = 0;
            this.attemptedBurstIndices = [];
        }
        // Iterate over the bursts, attempting to execute them if the time is ready.
        var burstIndex = 0;
        for (var _i = 0, _a = this.emission.bursts; _i < _a.length; _i++) {
            var burst = _a[_i];
            if (burst.time <= this.durationTimer) {
                // Has the burst already been attempted? If not ...
                if (!this.attemptedBurstIndices.includes(burstIndex)) {
                    // Perform the burst, emitting a variable amount of particles.
                    var count = variation_1.evaluateVariation(burst.count);
                    for (var i = 0; i < count; i++) {
                        this.emitParticle();
                    }
                    // Mark the burst as attempted.
                    this.attemptedBurstIndices.push(burstIndex);
                }
            }
            burstIndex++;
        }
        // Handle the 'emission over time'. By using a while-loop instead of a simple
        // if-condition, we take high deltas into account, and ensure that the correct
        // number of particles will consistently be emitted.
        this.emissionTimer += delta;
        var delay = 1 / this.emission.rate;
        while (this.emissionTimer > delay) {
            this.emissionTimer -= delay;
            this.emitParticle();
        }
        var _loop_1 = function (i) {
            var particle = this_1.particles[i];
            this_1.tickParticle(particle, delta);
            // Particles should be despawned (i.e. removed from the collection) if any of
            // the despawning rules apply to them.
            if (this_1.options.despawningRules.some(function (rule) { return rule(particle); })) {
                this_1.particles.splice(i, 1);
            }
        };
        var this_1 = this;
        for (var i = this.particles.length - 1; i >= 0; i--) {
            _loop_1(i);
        }
    };
    /**
     * Performs an internal tick for the particle.
     *
     * @remarks
     * This method controls the particle's lifetime, location and velocity, according
     * to the elapsed delta and the configuration. Additionally, each of the emitter's
     * modules is applied to the particle.
     *
     * @param particle The particle to apply the tick for.
     * @param delta The time, in seconds, passed since the last tick.
     */
    Emitter.prototype.tickParticle = function (particle, delta) {
        particle.lifetime -= delta;
        if (this.options.useGravity) {
            // Apply gravitational acceleration to the particle.
            particle.velocity = particle.velocity.add(vector_1.Vector.up.scale(settings_1.settings.gravity * delta));
        }
        // Apply the particle's velocity to its location.
        particle.location = particle.location.add(particle.velocity.scale(delta));
        for (var _i = 0, _a = this.modules; _i < _a.length; _i++) {
            var module_1 = _a[_i];
            module_1.apply(particle);
        }
    };
    /**
     * Emits a particle using the registered settings.
     * Also may despawn a particle if the maximum number of particles is exceeded.
     */
    Emitter.prototype.emitParticle = function () {
        var particle = particle_1.createParticle({
            location: random_1.randomInsideRect(this.shape.source),
            lifetime: variation_1.evaluateVariation(this.options.initialLifetime),
            velocity: vector_1.Vector.from2dAngle(variation_1.evaluateVariation(this.shape.angle)).scale(variation_1.evaluateVariation(this.options.initialSpeed)),
            size: variation_1.evaluateVariation(this.options.initialSize),
            rotation: variation_1.evaluateVariation(this.options.initialRotation),
            colour: variation_1.evaluateVariation(this.options.initialColour),
        });
        this.particles.push(particle);
        // Ensure that no more particles than 'maxParticles' can exist.
        if (this.particles.length > this.options.maxParticles) {
            this.particles.shift();
        }
        return particle;
    };
    return Emitter;
}());
exports.Emitter = Emitter;


/***/ }),

/***/ "./src/particles/modules/customModifierModule.ts":
/*!*******************************************************!*\
  !*** ./src/particles/modules/customModifierModule.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomModifier = void 0;
var particleModifierModule_1 = __webpack_require__(/*! ./particleModifierModule */ "./src/particles/modules/particleModifierModule.ts");
/**
 * Represents a module that allows a custom modifier implementation.
 */
var CustomModifier = /** @class */ (function (_super) {
    __extends(CustomModifier, _super);
    function CustomModifier() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * The modifier function controlling the particles.
         */
        _this.modifier = undefined;
        return _this;
    }
    /**
     * Applies the modifier function to the specified particle.
     */
    CustomModifier.prototype.apply = function (particle) {
        this.modifier && this.modifier(particle);
    };
    return CustomModifier;
}(particleModifierModule_1.ParticleModifierModule));
exports.CustomModifier = CustomModifier;


/***/ }),

/***/ "./src/particles/modules/index.ts":
/*!****************************************!*\
  !*** ./src/particles/modules/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./customModifierModule */ "./src/particles/modules/customModifierModule.ts"), exports);
__exportStar(__webpack_require__(/*! ./sizeOverLifetime */ "./src/particles/modules/sizeOverLifetime.ts"), exports);
__exportStar(__webpack_require__(/*! ./rotationOverLifetime */ "./src/particles/modules/rotationOverLifetime.ts"), exports);


/***/ }),

/***/ "./src/particles/modules/particleModifierModule.ts":
/*!*********************************************************!*\
  !*** ./src/particles/modules/particleModifierModule.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParticleModifierModule = void 0;
/**
 * Represents a module that can be used to modify the
 * properties of a particle over time.
 */
var ParticleModifierModule = /** @class */ (function () {
    function ParticleModifierModule() {
    }
    return ParticleModifierModule;
}());
exports.ParticleModifierModule = ParticleModifierModule;


/***/ }),

/***/ "./src/particles/modules/rotationOverLifetime.ts":
/*!*******************************************************!*\
  !*** ./src/particles/modules/rotationOverLifetime.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RotationModifier = void 0;
var vector_1 = __webpack_require__(/*! ../../components/vector */ "./src/components/vector.ts");
var modifiers_1 = __webpack_require__(/*! ../../systems/modifiers */ "./src/systems/modifiers.ts");
var particleModifierModule_1 = __webpack_require__(/*! ./particleModifierModule */ "./src/particles/modules/particleModifierModule.ts");
/**
 * Represents a module that rotates a particle consistently over it's lifetime.
 */
var RotationModifier = /** @class */ (function (_super) {
    __extends(RotationModifier, _super);
    function RotationModifier() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * The variation controlling the rotation of the particle.
         */
        _this.rotation = vector_1.Vector.zero;
        return _this;
    }
    /**
     * Applies the rotation over lifetime to the specified particle.
     */
    RotationModifier.prototype.apply = function (particle) {
        particle.rotation = particle.initialRotation.add(modifiers_1.evaluateModifier(this.rotation, particle));
    };
    return RotationModifier;
}(particleModifierModule_1.ParticleModifierModule));
exports.RotationModifier = RotationModifier;


/***/ }),

/***/ "./src/particles/modules/sizeOverLifetime.ts":
/*!***************************************************!*\
  !*** ./src/particles/modules/sizeOverLifetime.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SizeModifier = void 0;
var modifiers_1 = __webpack_require__(/*! ../../systems/modifiers */ "./src/systems/modifiers.ts");
var particleModifierModule_1 = __webpack_require__(/*! ./particleModifierModule */ "./src/particles/modules/particleModifierModule.ts");
/**
 * Represents a module that can be used to scale the size of a particle over its lifetime.
 */
var SizeModifier = /** @class */ (function (_super) {
    __extends(SizeModifier, _super);
    function SizeModifier() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * The variation controlling the size of the particle.
         */
        _this.size = 1;
        return _this;
    }
    /**
     * Applies the size over lifetime to the specified particle.
     */
    SizeModifier.prototype.apply = function (particle) {
        particle.size =
            particle.initialSize * modifiers_1.evaluateModifier(this.size, particle);
    };
    return SizeModifier;
}(particleModifierModule_1.ParticleModifierModule));
exports.SizeModifier = SizeModifier;


/***/ }),

/***/ "./src/particles/options/emissionOptions.ts":
/*!**************************************************!*\
  !*** ./src/particles/options/emissionOptions.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDefaultEmissionOptions = void 0;
/**
 * Returns the default set of emission options.
 */
function getDefaultEmissionOptions() {
    return {
        rate: 10,
        bursts: [],
    };
}
exports.getDefaultEmissionOptions = getDefaultEmissionOptions;


/***/ }),

/***/ "./src/particles/options/emitterOptions.ts":
/*!*************************************************!*\
  !*** ./src/particles/options/emitterOptions.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDefaultEmitterOptions = void 0;
var colour_1 = __webpack_require__(/*! ../../components/colour */ "./src/components/colour.ts");
var vector_1 = __webpack_require__(/*! ../../components/vector */ "./src/components/vector.ts");
var rules_1 = __webpack_require__(/*! ../../util/rules */ "./src/util/rules.ts");
/**
 * Returns the default set of emitter options.
 */
function getDefaultEmitterOptions() {
    return {
        duration: 5,
        loops: -1,
        initialLifetime: 5,
        initialSpeed: 5,
        initialSize: 1,
        initialRotation: vector_1.Vector.zero,
        initialColour: colour_1.Colour.white,
        useGravity: true,
        maxParticles: 300,
        despawningRules: [rules_1.despawningRules.lifetime, rules_1.despawningRules.bounds],
    };
}
exports.getDefaultEmitterOptions = getDefaultEmitterOptions;


/***/ }),

/***/ "./src/particles/options/index.ts":
/*!****************************************!*\
  !*** ./src/particles/options/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./emitterOptions */ "./src/particles/options/emitterOptions.ts"), exports);
__exportStar(__webpack_require__(/*! ./shapeOptions */ "./src/particles/options/shapeOptions.ts"), exports);
__exportStar(__webpack_require__(/*! ./emissionOptions */ "./src/particles/options/emissionOptions.ts"), exports);
__exportStar(__webpack_require__(/*! ./rendererOptions */ "./src/particles/options/rendererOptions.ts"), exports);


/***/ }),

/***/ "./src/particles/options/rendererOptions.ts":
/*!**************************************************!*\
  !*** ./src/particles/options/rendererOptions.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDefaultRendererOptions = void 0;
/**
 * Returns the default set of renderer options.
 */
function getDefaultRendererOptions() {
    return {
        shapeFactory: "square",
        applyColour: defaultApplyColour,
        applyLighting: defaultApplyLighting,
        applyTransform: defaultApplyTransform,
    };
}
exports.getDefaultRendererOptions = getDefaultRendererOptions;
/**
 * Applies the specified colour to the element.
 *
 * @remarks
 * This function is aware of the element's node type:
 * - `div` elements have their `background` set.
 * - `svg` elements have their `fill` and `color` set.
 * - Other elements have their `color` set.
 */
function defaultApplyColour(colour, element) {
    var hex = colour.toHex();
    // Note that by default, HTML node names are uppercase.
    switch (element.nodeName.toLowerCase()) {
        case "div":
            element.style.background = hex;
            break;
        case "svg":
            element.style.fill = element.style.color = hex;
            break;
        default:
            element.style.color = hex;
            break;
    }
}
/**
 * Applies the specified lighting to the element as a brightness filter.
 *
 * @remarks
 * This function assumes an ambient light with intensity 0.5, and that the
 * particle should be lit from both sides. The brightness filter can exceed 1,
 * to give the particles a "glossy" feel.
 */
function defaultApplyLighting(lighting, element) {
    element.style.filter = "brightness(" + (0.5 + Math.abs(lighting)) + ")";
}
/**
 * Applies the specified transform to the element as a 3D CSS transform.
 */
function defaultApplyTransform(particle, element) {
    element.style.transform =
        "translateX(" + particle.location.x.toFixed(3) + "px) " +
            ("translateY(" + particle.location.y.toFixed(3) + "px) ") +
            ("translateZ(" + particle.location.z.toFixed(3) + "px) ") +
            ("rotateX(" + particle.rotation.x.toFixed(3) + "deg) ") +
            ("rotateY(" + particle.rotation.y.toFixed(3) + "deg) ") +
            ("rotateZ(" + particle.rotation.z.toFixed(3) + "deg) ") +
            ("scale(" + particle.size.toFixed(3) + ")");
}


/***/ }),

/***/ "./src/particles/options/shapeOptions.ts":
/*!***********************************************!*\
  !*** ./src/particles/options/shapeOptions.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDefaultShapeOptions = void 0;
/**
 * Returns the default set of shape options.
 */
function getDefaultShapeOptions() {
    return {
        source: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        },
        angle: 0,
    };
}
exports.getDefaultShapeOptions = getDefaultShapeOptions;


/***/ }),

/***/ "./src/particles/particle.ts":
/*!***********************************!*\
  !*** ./src/particles/particle.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createParticle = void 0;
var colour_1 = __webpack_require__(/*! ../components/colour */ "./src/components/colour.ts");
var vector_1 = __webpack_require__(/*! ../components/vector */ "./src/components/vector.ts");
var config_1 = __webpack_require__(/*! ../util/config */ "./src/util/config.ts");
/**
 * Creates a new particle object, using the specified creation options.
 */
function createParticle(options) {
    var filledOptions = config_1.overrideDefaults({
        lifetime: 0,
        size: 1,
        location: vector_1.Vector.zero,
        rotation: vector_1.Vector.zero,
        velocity: vector_1.Vector.zero,
        colour: colour_1.Colour.white,
    }, options);
    // Generate an ID symbol and fill in the initial values.
    return __assign(__assign({ id: Symbol() }, filledOptions), { initialLifetime: filledOptions.lifetime, initialSize: filledOptions.size, initialRotation: filledOptions.rotation });
}
exports.createParticle = createParticle;


/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Renderer = void 0;
var vector_1 = __webpack_require__(/*! ./components/vector */ "./src/components/vector.ts");
var containers_1 = __webpack_require__(/*! ./containers */ "./src/containers.ts");
var shapes_1 = __webpack_require__(/*! ./shapes */ "./src/shapes.ts");
var util_1 = __webpack_require__(/*! ./util */ "./src/util/index.ts");
/**
 * Represents a renderer used to draw particles to the DOM via HTML
 * elements. Additionally, it is responsible for purging the elements
 * of destroyed particles from the DOM.
 */
var Renderer = /** @class */ (function () {
    function Renderer() {
        /**
         * The lookup of elements currently handled by the renderer, with the
         * particle ID as key and a HTMLElement as the value.
         */
        this.elements = new Map();
        /**
         * The normalized direction the light comes from.
         */
        this.light = new vector_1.Vector(0, 0, 1);
    }
    /**
     * Begins a new render block.
     */
    Renderer.prototype.begin = function () {
        this.renderedParticles = [];
    };
    /**
     * Terminates an existing render block. This checks which particles were rendered
     * during the block and purges all unused HTMLElements from the DOM.
     *
     * @returns The amount of particles that were rendered.
     */
    Renderer.prototype.end = function () {
        var it = this.elements.keys();
        var result = it.next();
        while (!result.done) {
            var id = result.value;
            if (!this.renderedParticles.includes(id)) {
                this.elements.get(id).remove();
                this.elements.delete(id);
            }
            result = it.next();
        }
        return this.renderedParticles.length;
    };
    /**
     * Renders an individual particle to the DOM. If the particle is rendered for the first
     * time, a HTMLElement will be created using the emitter's render settings.
     *
     * @param particle The particle to be rendered.
     * @param emitter The system containing the particle.
     */
    Renderer.prototype.renderParticle = function (particle, emitter) {
        var options = emitter.renderer;
        // Ensure that an element for the particle exists.
        var element = this.elements.has(particle.id)
            ? this.elements.get(particle.id)
            : this.createParticleElement(particle, options);
        if (options.applyColour) {
            // If the options offer a colouring method, apply it.
            options.applyColour(particle.colour, element);
        }
        if (options.applyLighting) {
            // If the options offer a lighting method, apply it.
            // Lighting is calculated as a combination of the particle's normal
            // direction and the lighting direction.
            var normal = util_1.rotationToNormal(particle.rotation);
            var lightingCoefficient = normal.dot(this.light);
            options.applyLighting(lightingCoefficient, element);
        }
        if (options.applyTransform) {
            // If the options offer a transformation method, apply it.
            // This ensures the particle is rendered at the correct position with the correct rotation.
            options.applyTransform(particle, element);
        }
        // Mark the particle as rendered.
        this.renderedParticles.push(particle.id);
    };
    /**
     * Creates the HTMLElement for a particle that does not have one already.
     */
    Renderer.prototype.createParticleElement = function (particle, options) {
        // Resolve the element returned from the factory.
        var resolved = shapes_1.resolveShapeFactory(options.shapeFactory);
        // Clone the node to ensure we do not break existing elements.
        var element = resolved.cloneNode(true);
        // Ensure that the elements can be "stacked" ontop of eachother.
        element.style.position = "absolute";
        // Register the new element in the map, while appending the new element to the DOM.
        this.elements.set(particle.id, containers_1.getParticleContainer().appendChild(element));
        return element;
    };
    return Renderer;
}());
exports.Renderer = Renderer;


/***/ }),

/***/ "./src/scene.ts":
/*!**********************!*\
  !*** ./src/scene.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Scene = void 0;
var debug_1 = __webpack_require__(/*! ./debug */ "./src/debug.ts");
var emitter_1 = __webpack_require__(/*! ./particles/emitter */ "./src/particles/emitter.ts");
var renderer_1 = __webpack_require__(/*! ./renderer */ "./src/renderer.ts");
/**
 * Represents a scene that contains emitters and their particles.
 *
 * Scenes are responsible for spawning and updating emitters, and
 * removing them once they are done.
 *
 * Scenes are not explicitely present in the DOM as an element, only
 * the contained particles are.
 */
var Scene = /** @class */ (function () {
    /**
     * Initializes a new scene and starts the ticking job.
     */
    function Scene() {
        /**
         * The emitters currently present in the scene.
         */
        this.emitters = [];
        /**
         * The debug instance associated with the scene.
         */
        this.debug = new debug_1.Debug(this);
        /**
         * The renderer associated with the scene.
         */
        this.renderer = new renderer_1.Renderer();
        /**
         * The ID of the currently scheduled tick.
         */
        this.scheduledTickId = undefined;
        /**
         * The timestamp of the last tick, used to calculate deltas.
         */
        this.lastTickTimestamp = 0;
        // Ensure the scene context is preserved on the tick.
        this.tick = this.tick.bind(this);
        this.scheduleTick();
    }
    /**
     * Creates and returns a new, default emitter object.
     */
    Scene.prototype.createEmitter = function (options) {
        var emitter = new emitter_1.Emitter(options);
        this.emitters.push(emitter);
        return emitter;
    };
    /**
     * Schedules a tick in the scene.
     */
    Scene.prototype.scheduleTick = function () {
        this.scheduledTickId = window.requestAnimationFrame(this.tick);
    };
    /**
     * Cancels a pending tick operation.
     */
    Scene.prototype.cancelTick = function () {
        window.cancelAnimationFrame(this.scheduledTickId);
    };
    /**
     * Processes a tick cycle, updating all emitters contained in the scene.
     * This is handled as a JS animation frame event, hence the passed timestamp.
     *
     * @remarks
     * The emitter ticking and particle rendering is run using try-catch blocks,
     * to ensure that we can recover from potential errors.
     *
     * @param timestamp The current timestamp of the animation frame.
     */
    Scene.prototype.tick = function (timestamp) {
        // Calculate the elapsed delta and convert it to seconds.
        var delta = (timestamp - this.lastTickTimestamp) / 1000;
        try {
            // Perform ticks for all the emitters in the scene.
            for (var i = 0; i < this.emitters.length; i++) {
                var emitter = this.emitters[i];
                emitter.tick(delta);
                if (emitter.isExpired) {
                    this.emitters.splice(i--, 1);
                }
            }
        }
        catch (error) {
            console.error("An error occurred while updating the scene's emitters:\n\"" + error + "\"");
        }
        try {
            // Instruct the renderer to draw the particles of all systems.
            this.renderer.begin();
            for (var _i = 0, _a = this.emitters; _i < _a.length; _i++) {
                var emitter = _a[_i];
                for (var _b = 0, _c = emitter.particles; _b < _c.length; _b++) {
                    var particle = _c[_b];
                    this.renderer.renderParticle(particle, emitter);
                }
            }
            this.renderer.end();
        }
        catch (error) {
            console.error("An error occurred while rendering the scene's particles:\n\"" + error + "\"");
        }
        // Perform a tick on the debug interface
        this.debug.tick(delta);
        // Save the timestamp as the last tick timestamp and schedule a new tick.
        this.lastTickTimestamp = timestamp;
        this.scheduleTick();
    };
    return Scene;
}());
exports.Scene = Scene;


/***/ }),

/***/ "./src/settings.ts":
/*!*************************!*\
  !*** ./src/settings.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.settings = void 0;
/**
 * Represents global settings used throughout the library.
 */
exports.settings = {
    /**
     * Whether the debugging mode should be enabled.
     */
    debug: false,
    /**
     * The amount of gravity to apply to particles in the scene, in pixels.
     * Note that this value is positive by default, since the y-axis increases
     * downwards in a DOM.
     */
    gravity: 800,
    /**
     * The z-index to place the DOM containers at.
     */
    zIndex: 99999,
};


/***/ }),

/***/ "./src/shapes.ts":
/*!***********************!*\
  !*** ./src/shapes.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveShapeFactory = exports.resolvableShapes = void 0;
var variation_1 = __webpack_require__(/*! ./systems/variation */ "./src/systems/variation.ts");
/**
 * Represents the lookup that maps resolveable element keys to HTML strings.
 */
exports.resolvableShapes = {
    square: "<div style=\"height: 10px; width: 10px;\"></div>",
    rectangle: "<div style=\"height: 6px; width: 10px;\"></div>",
    circle: "<svg viewBox=\"-1 -1 2 2\" width=\"10\" height=\"10\"><path fill=\"currentColor\" d=\"M0,1 C0.551915024494,1 1,0.551915024494 1,0 C1,-0.551915024494 0.551915024494,-1 0,-1 C-0.551915024494,-1 -1,-0.551915024494 -1,0 C-1,0.551915024494 -0.551915024494,1 0,1 Z\"/></svg>",
    roundedSquare: "<div style=\"height: 10px; width: 10px; border-radius: 3px;\"></div>",
    roundedRectangle: "<div style=\"height: 6px; width: 10px; border-radius: 3px;\"></div>",
    star: "<svg viewBox=\"0 0 512 512\" width=\"20\" height=\"20\"><polygon fill=\"currentColor\" points=\"512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 255.898,401.21 416.035,502.431 369.263,318.842\"/></svg>",
};
/**
 * Resolves the specified element factory using the resolvable elements, if needed.
 */
function resolveShapeFactory(factory) {
    // Retrieve the unresolved element from the factory.
    var shape = variation_1.evaluateVariation(factory);
    // If a string is returned, we need to resolve the element. This means
    // looking up the string in the resolver lookup. If the key was not
    // resolvable, we throw an error.
    if (typeof shape === "string") {
        var resolved = exports.resolvableShapes[shape];
        if (!resolved) {
            throw new Error("Failed to resolve shape key '" + shape + "'.");
        }
        // We're in luck, we can resolve the element! We create a dummy <div> element
        // to set the innerHTML of, and return the first element child.
        var dummy = document.createElement("div");
        dummy.innerHTML = resolved;
        return dummy.firstElementChild;
    }
    return shape;
}
exports.resolveShapeFactory = resolveShapeFactory;
// TODO: Rename "elements" to shapes.


/***/ }),

/***/ "./src/systems/math.ts":
/*!*****************************!*\
  !*** ./src/systems/math.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.approximately = exports.clamp = exports.invlerp = exports.slerp = exports.lerp = exports.epsilon = exports.rad2deg = exports.deg2rad = void 0;
/**
 * Constant coefficient to convert degrees to radians.
 */
exports.deg2rad = Math.PI / 180;
/**
 * Constant coefficient to convert radians to degrees.
 */
exports.rad2deg = 180 / Math.PI;
/**
 * A small value to approximately compare values.
 */
exports.epsilon = 0.000001;
/**
 * Linearly interpolates between a and b by t.
 */
function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}
exports.lerp = lerp;
/**
 * Smoothly interpolates between a and b by t (using cosine interpolation).
 */
function slerp(a, b, t) {
    return lerp(a, b, (1 - Math.cos(t * Math.PI)) / 2);
}
exports.slerp = slerp;
/**
 * Inversely lerps v between a and b to find t.
 */
function invlerp(a, b, v) {
    return (v - a) / (b - a);
}
exports.invlerp = invlerp;
/**
 * Clamps the specified value between a minimum and a maximum.
 */
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
exports.clamp = clamp;
/**
 * Checks if a is approximately equal to b.
 */
function approximately(a, b) {
    return Math.abs(a - b) < exports.epsilon;
}
exports.approximately = approximately;


/***/ }),

/***/ "./src/systems/modifiers.ts":
/*!**********************************!*\
  !*** ./src/systems/modifiers.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.evaluateModifier = void 0;
/**
 * Evaluates a particle modifier using the specified particle context.
 *
 * @param modifier The modifier to evaluate.
 * @param particle The particle to evaluate the modifier with.
 */
function evaluateModifier(modifier, particle) {
    if (typeof modifier === "object" && "evaluate" in modifier) {
        var elapsedLifetime = particle.initialLifetime - particle.lifetime;
        var lifetimePercentage = elapsedLifetime / particle.lifetime;
        return modifier.evaluate(lifetimePercentage);
    }
    if (typeof modifier === "function")
        return modifier(particle);
    return modifier;
}
exports.evaluateModifier = evaluateModifier;


/***/ }),

/***/ "./src/systems/random.ts":
/*!*******************************!*\
  !*** ./src/systems/random.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randomInsideRect = exports.randomUnitVector = exports.pick = exports.randomRange = void 0;
var vector_1 = __webpack_require__(/*! ../components/vector */ "./src/components/vector.ts");
var math_1 = __webpack_require__(/*! ./math */ "./src/systems/math.ts");
/**
 * Returns a random value from min to max.
 */
function randomRange(min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    return math_1.lerp(min, max, Math.random());
}
exports.randomRange = randomRange;
/**
 * Picks a random element from the specified array. Returns undefined if the array is empty.
 */
function pick(arr) {
    return arr.length === 0
        ? undefined
        : arr[Math.floor(Math.random() * arr.length)];
}
exports.pick = pick;
/**
 * Returns a random unit vector.
 */
function randomUnitVector() {
    var theta = randomRange(0, 2 * Math.PI);
    var z = randomRange(-1, 1);
    return new vector_1.Vector(Math.sqrt(1 - z * z) * Math.cos(theta), Math.sqrt(1 - z * z) * Math.sin(theta), z);
}
exports.randomUnitVector = randomUnitVector;
/**
 * Returns a random point inside the given rect.
 */
function randomInsideRect(rect) {
    return new vector_1.Vector(rect.x + randomRange(0, rect.width), rect.y + randomRange(0, rect.height));
}
exports.randomInsideRect = randomInsideRect;


/***/ }),

/***/ "./src/systems/variation.ts":
/*!**********************************!*\
  !*** ./src/systems/variation.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.gradientSample = exports.splineSample = exports.skewRelative = exports.skew = exports.range = exports.evaluateVariation = void 0;
var random_1 = __webpack_require__(/*! ./random */ "./src/systems/random.ts");
/**
 * Returns a value instance of a variation.
 */
function evaluateVariation(variation) {
    if (Array.isArray(variation))
        return random_1.pick(variation);
    if (typeof variation === "function")
        return variation();
    return variation;
}
exports.evaluateVariation = evaluateVariation;
/**
 * Creates a variation function that returns a random number from min to max.
 */
function range(min, max) {
    return function () { return random_1.randomRange(min, max); };
}
exports.range = range;
/**
 * Creates a variation function that skews the specified value by a specified, absolute
 * amount. This means that instead of the value itself, a random number that deviates
 * at most by the specified amount is returned.
 *
 * @remarks
 * If you want to skew by a percentage instead, use `skewRelative`.
 */
function skew(value, amount) {
    return function () { return value + random_1.randomRange(-amount, amount); };
}
exports.skew = skew;
/**
 * Creates a variation function that skews the specified value by a specified percentage.
 * This means that instead of the value itself, a random number that deviates by a maximum
 * of the specified percentage is returned.
 */
function skewRelative(value, percentage) {
    return function () { return value * (1 + random_1.randomRange(-percentage, percentage)); };
}
exports.skewRelative = skewRelative;
/**
 * Creates a variation function that returns a random sample from the given spline.
 *
 * @param spline The spline to sample from.
 */
function splineSample(spline) {
    return function () { return spline.evaluate(Math.random()); };
}
exports.splineSample = splineSample;
/**
 * Creates a variation function that returns a random sample from the given gradient.
 *
 * @remarks
 * This function is an alias for the spline variation, since a gradient is just
 * a spline under the hood.
 *
 * @param gradient The gradient to sample from.
 */
function gradientSample(gradient) {
    return splineSample(gradient);
}
exports.gradientSample = gradientSample;


/***/ }),

/***/ "./src/templates/confetti.ts":
/*!***********************************!*\
  !*** ./src/templates/confetti.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.confetti = void 0;
var components_1 = __webpack_require__(/*! ../components */ "./src/components/index.ts");
var variation_1 = __webpack_require__(/*! ../systems/variation */ "./src/systems/variation.ts");
var util_1 = __webpack_require__(/*! ../util */ "./src/util/index.ts");
var config_1 = __webpack_require__(/*! ../util/config */ "./src/util/config.ts");
var __1 = __webpack_require__(/*! .. */ "./src/index.ts");
/**
 * The standard confetti template.
 *
 * @param source The source to emit the confetti from.
 * @param options The (optional) configuration overrides.
 */
function confetti(source, options) {
    var config = config_1.overrideDefaults({
        count: variation_1.range(20, 40),
        spread: 40,
        speed: variation_1.range(300, 600),
        size: variation_1.skew(1, 0.2),
        rotation: function () { return __1.random.randomUnitVector().scale(180); },
        colour: function () { return components_1.Colour.fromHsl(__1.random.randomRange(0, 360), 100, 70); },
        sizeOverLifetime: function (p) {
            return Math.min(1, (p.initialLifetime - p.lifetime) * 3);
        },
        rotationOverLifetime: function (p) {
            return new components_1.Vector(140, 200, 260).scale(p.initialLifetime - p.lifetime);
        },
        shapes: ["square", "circle"],
    }, options);
    var rect = util_1.sourceToRect(source);
    var emitter = __1.scene.createEmitter({
        emitterOptions: {
            loops: 1,
            duration: 8,
            initialLifetime: variation_1.range(6, 8),
            initialSpeed: config.speed,
            initialSize: config.size,
            initialRotation: config.rotation,
            initialColour: config.colour,
        },
        emissionOptions: {
            rate: 0,
            bursts: [{ time: 0, count: config.count }],
        },
        shapeOptions: {
            angle: variation_1.skew(-90, variation_1.evaluateVariation(config.spread)),
            source: rect,
        },
        rendererOptions: {
            shapeFactory: config.shapes,
        },
    });
    var rotationModule = emitter.addModule(__1.modules.RotationModifier);
    rotationModule.rotation = config.rotationOverLifetime;
    var sizeModule = emitter.addModule(__1.modules.SizeModifier);
    sizeModule.size = config.sizeOverLifetime;
    return emitter;
}
exports.confetti = confetti;


/***/ }),

/***/ "./src/templates/index.ts":
/*!********************************!*\
  !*** ./src/templates/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sparkles = exports.confetti = void 0;
var confetti_1 = __webpack_require__(/*! ./confetti */ "./src/templates/confetti.ts");
Object.defineProperty(exports, "confetti", ({ enumerable: true, get: function () { return confetti_1.confetti; } }));
var sparkles_1 = __webpack_require__(/*! ./sparkles */ "./src/templates/sparkles.ts");
Object.defineProperty(exports, "sparkles", ({ enumerable: true, get: function () { return sparkles_1.sparkles; } }));


/***/ }),

/***/ "./src/templates/sparkles.ts":
/*!***********************************!*\
  !*** ./src/templates/sparkles.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sparkles = void 0;
var components_1 = __webpack_require__(/*! ../components */ "./src/components/index.ts");
var variation_1 = __webpack_require__(/*! ../systems/variation */ "./src/systems/variation.ts");
var util_1 = __webpack_require__(/*! ../util */ "./src/util/index.ts");
var config_1 = __webpack_require__(/*! ../util/config */ "./src/util/config.ts");
var __1 = __webpack_require__(/*! .. */ "./src/index.ts");
/**
 * The standard sparkles template.
 *
 * @param source The source to emit the sparkles from.
 * @param options The (optional) configuration overrides.
 */
function sparkles(source, options) {
    var config = config_1.overrideDefaults({
        count: variation_1.range(10, 20),
        speed: variation_1.range(100, 200),
        size: variation_1.range(0.5, 1.5),
        rotation: function () { return new components_1.Vector(0, 0, __1.random.randomRange(0, 360)); },
        colour: function () { return components_1.Colour.fromHsl(50, 100, __1.random.randomRange(55, 85)); },
        sizeOverLifetime: new components_1.NumericSpline({ time: 0, value: 0 }, { time: 0.3, value: 1 }, { time: 0.7, value: 1 }, { time: 1, value: 0 }),
        rotationOverLifetime: function (p) {
            return new components_1.Vector(0, 0, 200).scale(p.initialLifetime - p.lifetime);
        },
    }, options);
    var rect = util_1.sourceToRect(source);
    var emitter = __1.scene.createEmitter({
        emitterOptions: {
            loops: 1,
            duration: 3,
            useGravity: false,
            initialLifetime: variation_1.range(1, 2),
            initialSpeed: config.speed,
            initialSize: config.size,
            initialRotation: config.rotation,
            initialColour: config.colour,
        },
        emissionOptions: {
            rate: 0,
            bursts: [{ time: 0, count: config.count }],
        },
        shapeOptions: {
            angle: variation_1.range(0, 360),
            source: rect,
        },
        rendererOptions: {
            applyLighting: undefined,
            shapeFactory: "star",
        },
    });
    var rotationModule = emitter.addModule(__1.modules.RotationModifier);
    rotationModule.rotation = config.rotationOverLifetime;
    var sizeModule = emitter.addModule(__1.modules.SizeModifier);
    sizeModule.size = config.sizeOverLifetime;
    return emitter;
}
exports.sparkles = sparkles;


/***/ }),

/***/ "./src/util/config.ts":
/*!****************************!*\
  !*** ./src/util/config.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.overrideDefaults = void 0;
function overrideDefaults(defaults, overrides) {
    return Object.assign({}, defaults, overrides);
}
exports.overrideDefaults = overrideDefaults;


/***/ }),

/***/ "./src/util/index.ts":
/*!***************************!*\
  !*** ./src/util/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./config */ "./src/util/config.ts"), exports);
__exportStar(__webpack_require__(/*! ./rotation */ "./src/util/rotation.ts"), exports);
__exportStar(__webpack_require__(/*! ./rules */ "./src/util/rules.ts"), exports);
__exportStar(__webpack_require__(/*! ./source */ "./src/util/source.ts"), exports);


/***/ }),

/***/ "./src/util/rotation.ts":
/*!******************************!*\
  !*** ./src/util/rotation.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rotationToNormal = void 0;
var components_1 = __webpack_require__(/*! ../components */ "./src/components/index.ts");
var math_1 = __webpack_require__(/*! ../systems/math */ "./src/systems/math.ts");
/**
 * Converts the specified euler rotation (in degrees) into the corresponding normal vector.
 *
 * @remarks
 * The normal is calculated by placing a (figurative) plane in a coordinate-system's
 * origin, and rotating it by the specified angles. Note that the z-component of the
 * rotation is irrelevant for the normal and can be ignored. Then, two vectors
 * describing the orientation of the plane are calculated. Their cross product
 * denotes the normal vector.
 *
 * @param rotation The euler rotation angles (in degrees) to calculate the normal for.
 */
function rotationToNormal(rotation) {
    var alpha = rotation.x * math_1.deg2rad;
    var beta = rotation.y * math_1.deg2rad;
    var a = new components_1.Vector(Math.cos(beta), 0, Math.sin(beta));
    var b = new components_1.Vector(0, Math.cos(alpha), Math.sin(alpha));
    return a.cross(b);
}
exports.rotationToNormal = rotationToNormal;


/***/ }),

/***/ "./src/util/rules.ts":
/*!***************************!*\
  !*** ./src/util/rules.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.despawningRules = void 0;
/**
 * Contains a set of pre-defined particle despawning rules.
 */
exports.despawningRules = {
    /**
     * A rule that despawns a particle once its lifetime is over.
     */
    lifetime: function (particle) {
        return particle.lifetime <= 0;
    },
    /**
     * A rule that despawns a particle once its y-coordinate is outside of the document.
     */
    bounds: function (particle) {
        // Get document height: https://stackoverflow.com/a/44077777/5507624
        var height = document.documentElement.scrollHeight;
        return particle.location.y > height;
    },
};


/***/ }),

/***/ "./src/util/source.ts":
/*!****************************!*\
  !*** ./src/util/source.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sourceToRect = void 0;
/**
 * Converts a particle system source to an actual rectangle.
 *
 * @param source The source to convert to a rectangle.
 * @returns A rectangle representing the converted source.
 */
function sourceToRect(source) {
    if ("x" in source && "y" in source) {
        // Handle the source as a point.
        return {
            x: source.x,
            y: source.y,
            width: 0,
            height: 0,
        };
    }
    else if ("clientLeft" in source && "clientTop" in source) {
        // Handle the source as an HTMLElement.
        return source.getBoundingClientRect();
    }
    else {
        // Handle the source as a mouse event.
        return {
            x: source.clientX,
            y: source.clientY,
            width: 0,
            height: 0,
        };
    }
}
exports.sourceToRect = sourceToRect;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=party.js.map