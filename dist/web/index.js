(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rosbag"] = factory();
	else
		root["rosbag"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/web/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/heap/index.js":
/*!************************************!*\
  !*** ./node_modules/heap/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/heap */ "./node_modules/heap/lib/heap.js");


/***/ }),

/***/ "./node_modules/heap/lib/heap.js":
/*!***************************************!*\
  !*** ./node_modules/heap/lib/heap.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.8.0
(function() {
  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

  floor = Math.floor, min = Math.min;


  /*
  Default comparison function to be used
   */

  defaultCmp = function(x, y) {
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };


  /*
  Insert item x in list a, and keep it sorted assuming a is sorted.
  
  If x is already in a, insert it to the right of the rightmost x.
  
  Optional args lo (default 0) and hi (default a.length) bound the slice
  of a to be searched.
   */

  insort = function(a, x, lo, hi, cmp) {
    var mid;
    if (lo == null) {
      lo = 0;
    }
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (lo < 0) {
      throw new Error('lo must be non-negative');
    }
    if (hi == null) {
      hi = a.length;
    }
    while (lo < hi) {
      mid = floor((lo + hi) / 2);
      if (cmp(x, a[mid]) < 0) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);
  };


  /*
  Push item onto heap, maintaining the heap invariant.
   */

  heappush = function(array, item, cmp) {
    if (cmp == null) {
      cmp = defaultCmp;
    }
    array.push(item);
    return _siftdown(array, 0, array.length - 1, cmp);
  };


  /*
  Pop the smallest item off the heap, maintaining the heap invariant.
   */

  heappop = function(array, cmp) {
    var lastelt, returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    lastelt = array.pop();
    if (array.length) {
      returnitem = array[0];
      array[0] = lastelt;
      _siftup(array, 0, cmp);
    } else {
      returnitem = lastelt;
    }
    return returnitem;
  };


  /*
  Pop and return the current smallest value, and add the new item.
  
  This is more efficient than heappop() followed by heappush(), and can be
  more appropriate when using a fixed size heap. Note that the value
  returned may be larger than item! That constrains reasonable use of
  this routine unless written as part of a conditional replacement:
      if item > array[0]
        item = heapreplace(array, item)
   */

  heapreplace = function(array, item, cmp) {
    var returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    returnitem = array[0];
    array[0] = item;
    _siftup(array, 0, cmp);
    return returnitem;
  };


  /*
  Fast version of a heappush followed by a heappop.
   */

  heappushpop = function(array, item, cmp) {
    var _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (array.length && cmp(array[0], item) < 0) {
      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
      _siftup(array, 0, cmp);
    }
    return item;
  };


  /*
  Transform list into a heap, in-place, in O(array.length) time.
   */

  heapify = function(array, cmp) {
    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    _ref1 = (function() {
      _results1 = [];
      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
      return _results1;
    }).apply(this).reverse();
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      i = _ref1[_i];
      _results.push(_siftup(array, i, cmp));
    }
    return _results;
  };


  /*
  Update the position of the given item in the heap.
  This function should be called every time the item is being modified.
   */

  updateItem = function(array, item, cmp) {
    var pos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    pos = array.indexOf(item);
    if (pos === -1) {
      return;
    }
    _siftdown(array, 0, pos, cmp);
    return _siftup(array, pos, cmp);
  };


  /*
  Find the n largest elements in a dataset.
   */

  nlargest = function(array, n, cmp) {
    var elem, result, _i, _len, _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    result = array.slice(0, n);
    if (!result.length) {
      return result;
    }
    heapify(result, cmp);
    _ref = array.slice(n);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      elem = _ref[_i];
      heappushpop(result, elem, cmp);
    }
    return result.sort(cmp).reverse();
  };


  /*
  Find the n smallest elements in a dataset.
   */

  nsmallest = function(array, n, cmp) {
    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (n * 10 <= array.length) {
      result = array.slice(0, n).sort(cmp);
      if (!result.length) {
        return result;
      }
      los = result[result.length - 1];
      _ref = array.slice(n);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        if (cmp(elem, los) < 0) {
          insort(result, elem, 0, null, cmp);
          result.pop();
          los = result[result.length - 1];
        }
      }
      return result;
    }
    heapify(array, cmp);
    _results = [];
    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      _results.push(heappop(array, cmp));
    }
    return _results;
  };

  _siftdown = function(array, startpos, pos, cmp) {
    var newitem, parent, parentpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    newitem = array[pos];
    while (pos > startpos) {
      parentpos = (pos - 1) >> 1;
      parent = array[parentpos];
      if (cmp(newitem, parent) < 0) {
        array[pos] = parent;
        pos = parentpos;
        continue;
      }
      break;
    }
    return array[pos] = newitem;
  };

  _siftup = function(array, pos, cmp) {
    var childpos, endpos, newitem, rightpos, startpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    endpos = array.length;
    startpos = pos;
    newitem = array[pos];
    childpos = 2 * pos + 1;
    while (childpos < endpos) {
      rightpos = childpos + 1;
      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
        childpos = rightpos;
      }
      array[pos] = array[childpos];
      pos = childpos;
      childpos = 2 * pos + 1;
    }
    array[pos] = newitem;
    return _siftdown(array, startpos, pos, cmp);
  };

  Heap = (function() {
    Heap.push = heappush;

    Heap.pop = heappop;

    Heap.replace = heapreplace;

    Heap.pushpop = heappushpop;

    Heap.heapify = heapify;

    Heap.updateItem = updateItem;

    Heap.nlargest = nlargest;

    Heap.nsmallest = nsmallest;

    function Heap(cmp) {
      this.cmp = cmp != null ? cmp : defaultCmp;
      this.nodes = [];
    }

    Heap.prototype.push = function(x) {
      return heappush(this.nodes, x, this.cmp);
    };

    Heap.prototype.pop = function() {
      return heappop(this.nodes, this.cmp);
    };

    Heap.prototype.peek = function() {
      return this.nodes[0];
    };

    Heap.prototype.contains = function(x) {
      return this.nodes.indexOf(x) !== -1;
    };

    Heap.prototype.replace = function(x) {
      return heapreplace(this.nodes, x, this.cmp);
    };

    Heap.prototype.pushpop = function(x) {
      return heappushpop(this.nodes, x, this.cmp);
    };

    Heap.prototype.heapify = function() {
      return heapify(this.nodes, this.cmp);
    };

    Heap.prototype.updateItem = function(x) {
      return updateItem(this.nodes, x, this.cmp);
    };

    Heap.prototype.clear = function() {
      return this.nodes = [];
    };

    Heap.prototype.empty = function() {
      return this.nodes.length === 0;
    };

    Heap.prototype.size = function() {
      return this.nodes.length;
    };

    Heap.prototype.clone = function() {
      var heap;
      heap = new Heap();
      heap.nodes = this.nodes.slice(0);
      return heap;
    };

    Heap.prototype.toArray = function() {
      return this.nodes.slice(0);
    };

    Heap.prototype.insert = Heap.prototype.push;

    Heap.prototype.top = Heap.prototype.peek;

    Heap.prototype.front = Heap.prototype.peek;

    Heap.prototype.has = Heap.prototype.contains;

    Heap.prototype.copy = Heap.prototype.clone;

    return Heap;

  })();

  (function(root, factory) {
    if (true) {
      return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(this, function() {
    return Heap;
  });

}).call(this);


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/int53/index.js":
/*!*************************************!*\
  !*** ./node_modules/int53/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var int53 = {}

var MAX_UINT32 = 0x00000000FFFFFFFF
var MAX_INT53 =  0x001FFFFFFFFFFFFF

function onesComplement(number) {
	number = ~number
	if (number < 0) {
		number = (number & 0x7FFFFFFF) + 0x80000000
	}
	return number
}

function uintHighLow(number) {
	console.assert(number > -1 && number <= MAX_INT53, "number out of range")
	console.assert(Math.floor(number) === number, "number must be an integer")
	var high = 0
	var signbit = number & 0xFFFFFFFF
	var low = signbit < 0 ? (number & 0x7FFFFFFF) + 0x80000000 : signbit
	if (number > MAX_UINT32) {
		high = (number - low) / (MAX_UINT32 + 1)
	}
	return [high, low]
}

function intHighLow(number) {
	if (number > -1) {
		return uintHighLow(number)
	}
	var hl = uintHighLow(-number)
	var high = onesComplement(hl[0])
	var low = onesComplement(hl[1])
	if (low === MAX_UINT32) {
		high += 1
		low = 0
	}
	else {
		low += 1
	}
	return [high, low]
}

function toDouble(high, low, signed) {
	if (signed && (high & 0x80000000) !== 0) {
		high = onesComplement(high)
		low = onesComplement(low)
		console.assert(high < 0x00200000, "number too small")
		return -((high * (MAX_UINT32 + 1)) + low + 1)
	}
	else { //positive
		console.assert(high < 0x00200000, "number too large")
		return (high * (MAX_UINT32 + 1)) + low
	}
}

int53.readInt64BE = function (buffer, offset) {
	offset = offset || 0
	var high = buffer.readUInt32BE(offset)
	var low = buffer.readUInt32BE(offset + 4)
	return toDouble(high, low, true)
}

int53.readInt64LE = function (buffer, offset) {
	offset = offset || 0
	var low = buffer.readUInt32LE(offset)
	var high = buffer.readUInt32LE(offset + 4)
	return toDouble(high, low, true)
}

int53.readUInt64BE = function (buffer, offset) {
	offset = offset || 0
	var high = buffer.readUInt32BE(offset)
	var low = buffer.readUInt32BE(offset + 4)
	return toDouble(high, low, false)
}

int53.readUInt64LE = function (buffer, offset) {
	offset = offset || 0
	var low = buffer.readUInt32LE(offset)
	var high = buffer.readUInt32LE(offset + 4)
	return toDouble(high, low, false)
}

int53.writeInt64BE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = intHighLow(number)
	buffer.writeUInt32BE(hl[0], offset)
	buffer.writeUInt32BE(hl[1], offset + 4)
}

int53.writeInt64LE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = intHighLow(number)
	buffer.writeUInt32LE(hl[1], offset)
	buffer.writeUInt32LE(hl[0], offset + 4)
}

int53.writeUInt64BE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = uintHighLow(number)
	buffer.writeUInt32BE(hl[0], offset)
	buffer.writeUInt32BE(hl[1], offset + 4)
}

int53.writeUInt64LE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = uintHighLow(number)
	buffer.writeUInt32LE(hl[1], offset)
	buffer.writeUInt32LE(hl[0], offset + 4)
}

module.exports = int53


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/buffer/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/buffer/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/BagReader.js":
/*!**************************!*\
  !*** ./src/BagReader.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(setImmediate) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BagReader; });
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _nmerge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nmerge */ "./src/nmerge.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./record */ "./src/record.js");
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




const HEADER_READAHEAD = 4096;
const HEADER_OFFSET = 13; // BagReader is a lower level interface for reading specific sections & chunks
// from a rosbag file - generally it is consumed through the Bag class, but
// can be useful to use directly for efficiently accessing raw pieces from
// within the bag

class BagReader {
  constructor(filelike) {
    _defineProperty(this, "_lastReadResult", void 0);

    _defineProperty(this, "_file", void 0);

    _defineProperty(this, "_lastChunkInfo", void 0);

    this._file = filelike;
    this._lastChunkInfo = undefined;
  }

  verifyBagHeader(callback, next) {
    this._file.read(0, HEADER_OFFSET, (error, buffer) => {
      if (error || !buffer) {
        return callback(error || new Error("Missing both error and buffer"));
      }

      if (this._file.size() < HEADER_OFFSET) {
        return callback(new Error("Missing file header."));
      }

      if (buffer.toString() !== "#ROSBAG V2.0\n") {
        return callback(new Error("Cannot identify bag format."));
      }

      next();
    });
  } // reads the header block from the rosbag file
  // generally you call this first
  // because you need the header information to call readConnectionsAndChunkInfo


  readHeader(callback) {
    this.verifyBagHeader(callback, () => {
      return this._file.read(HEADER_OFFSET, HEADER_READAHEAD, (error, buffer) => {
        if (error || !buffer) {
          return callback(error || new Error("Missing both error and buffer"));
        }

        const read = buffer.length;

        if (read < 8) {
          return callback(new Error(`Record at position ${HEADER_OFFSET} is truncated.`));
        }

        const headerLength = buffer.readInt32LE(0);

        if (read < headerLength + 8) {
          return callback(new Error(`Record at position ${HEADER_OFFSET} header too large: ${headerLength}.`));
        }

        const header = this.readRecordFromBuffer(buffer, HEADER_OFFSET, _record__WEBPACK_IMPORTED_MODULE_2__["BagHeader"]);
        return callback(null, header);
      });
    });
  } // promisified version of readHeader


  readHeaderAsync() {
    return new Promise((resolve, reject) => this.readHeader((err, header) => err || !header ? reject(err) : resolve(header)));
  } // reads connection and chunk information from the bag
  // you'll generally call this after reading the header so you can get
  // connection metadata and chunkInfos which allow you to seek to individual
  // chunks & read them


  readConnectionsAndChunkInfo(fileOffset, connectionCount, chunkCount, callback) {
    this._file.read(fileOffset, this._file.size() - fileOffset, (err, buffer) => {
      if (err || !buffer) {
        return callback(err || new Error("Missing both error and buffer"));
      }

      if (connectionCount === 0) {
        return callback(null, {
          connections: [],
          chunkInfos: []
        });
      }

      const connections = this.readRecordsFromBuffer(buffer, connectionCount, fileOffset, _record__WEBPACK_IMPORTED_MODULE_2__["Connection"]);
      const connectionBlockLength = connections[connectionCount - 1].end - connections[0].offset;
      const chunkInfos = this.readRecordsFromBuffer(buffer.slice(connectionBlockLength), chunkCount, fileOffset + connectionBlockLength, _record__WEBPACK_IMPORTED_MODULE_2__["ChunkInfo"]);

      if (chunkCount > 0) {
        for (let i = 0; i < chunkCount - 1; i++) {
          chunkInfos[i].nextChunk = chunkInfos[i + 1];
        }

        chunkInfos[chunkCount - 1].nextChunk = null;
      }

      return callback(null, {
        connections,
        chunkInfos
      });
    });
  } // promisified version of readConnectionsAndChunkInfo


  readConnectionsAndChunkInfoAsync(fileOffset, connectionCount, chunkCount) {
    return new Promise((resolve, reject) => {
      this.readConnectionsAndChunkInfo(fileOffset, connectionCount, chunkCount, (err, result) => err || !result ? reject(err) : resolve(result));
    });
  } // read individual raw messages from the bag at a given chunk
  // filters to a specific set of connection ids, start time, & end time
  // generally the records will be of type MessageData


  readChunkMessages(chunkInfo, connections, startTime, endTime, decompress, callback) {
    const start = startTime || {
      sec: 0,
      nsec: 0
    };
    const end = endTime || {
      sec: Number.MAX_VALUE,
      nsec: Number.MAX_VALUE
    };
    const conns = connections || chunkInfo.connections.map(connection => {
      return connection.conn;
    });
    this.readChunk(chunkInfo, decompress, (error, result) => {
      if (error || !result) {
        return callback(error || new Error("Missing both error and result"));
      }

      const chunk = result.chunk;
      const indices = {};
      result.indices.forEach(index => {
        indices[index.conn] = index;
      });
      const presentConnections = conns.filter(conn => {
        return indices[conn] !== undefined;
      });
      const iterables = presentConnections.map(conn => {
        // $FlowFixMe https://github.com/facebook/flow/issues/1163
        return indices[conn].indices[Symbol.iterator]();
      }); //messages should be merge by file offset so the messages are replayed in
      // their original order, similar to 'rosbag play'

      const iter = Object(_nmerge__WEBPACK_IMPORTED_MODULE_1__["default"])((a, b) => a.offset - b.offset, ...iterables);
      const entries = [];
      let item = iter.next();

      while (!item.done) {
        const {
          value
        } = item;
        item = iter.next();

        if (!value || _TimeUtil__WEBPACK_IMPORTED_MODULE_3__["isGreaterThan"](start, value.time)) {
          continue;
        }

        if (_TimeUtil__WEBPACK_IMPORTED_MODULE_3__["isGreaterThan"](value.time, end)) {
          break;
        }

        entries.push(value);
      }

      const messages = entries.map(entry => {
        return this.readRecordFromBuffer(chunk.data.slice(entry.offset), chunk.dataOffset, _record__WEBPACK_IMPORTED_MODULE_2__["MessageData"]);
      });
      return callback(null, messages);
    });
  } // promisified version of readChunkMessages


  readChunkMessagesAsync(chunkInfo, connections, startTime, endTime, decompress) {
    return new Promise((resolve, reject) => {
      this.readChunkMessages(chunkInfo, connections, startTime, endTime, decompress, (err, messages) => err || !messages ? reject(err) : resolve(messages));
    });
  } // reads a single chunk record && its index records given a chunkInfo


  readChunk(chunkInfo, decompress, callback) {
    // if we're reading the same chunk a second time return the cached version
    // to avoid doing decompression on the same chunk multiple times which is
    // expensive
    if (chunkInfo === this._lastChunkInfo && this._lastReadResult) {
      // always callback async, even if we have the result
      // https://oren.github.io/blog/zalgo.html
      const lastReadResult = this._lastReadResult;
      return setImmediate(() => callback(null, lastReadResult));
    }

    const {
      nextChunk
    } = chunkInfo;
    const readLength = nextChunk ? nextChunk.chunkPosition - chunkInfo.chunkPosition : this._file.size() - chunkInfo.chunkPosition;

    this._file.read(chunkInfo.chunkPosition, readLength, (err, buffer) => {
      if (err || !buffer) {
        return callback(err || new Error("Missing both error and buffer"));
      }

      const chunk = this.readRecordFromBuffer(buffer, chunkInfo.chunkPosition, _record__WEBPACK_IMPORTED_MODULE_2__["Chunk"]);
      const {
        compression
      } = chunk;

      if (compression !== "none") {
        const decompressFn = decompress[compression];

        if (!decompressFn) {
          return callback(new Error(`Unsupported compression type ${chunk.compression}`));
        }

        const result = decompressFn(chunk.data, chunk.size);
        chunk.data = result;
      }

      const indices = this.readRecordsFromBuffer(buffer.slice(chunk.length), chunkInfo.count, chunkInfo.chunkPosition + chunk.length, _record__WEBPACK_IMPORTED_MODULE_2__["IndexData"]);
      this._lastChunkInfo = chunkInfo;
      this._lastReadResult = {
        chunk,
        indices
      };
      return callback(null, this._lastReadResult);
    });
  } // reads count records from a buffer starting at fileOffset


  readRecordsFromBuffer(buffer, count, fileOffset, cls) {
    const records = [];
    let bufferOffset = 0;

    for (let i = 0; i < count; i++) {
      const record = this.readRecordFromBuffer(buffer.slice(bufferOffset), fileOffset + bufferOffset, cls);
      bufferOffset += record.end - record.offset;
      records.push(record);
    }

    return records;
  } // read an individual record from a buffer


  readRecordFromBuffer(buffer, fileOffset, cls) {
    const headerLength = buffer.readInt32LE(0);
    const record = Object(_header__WEBPACK_IMPORTED_MODULE_0__["parseHeader"])(buffer.slice(4, 4 + headerLength), cls);
    const dataOffset = 4 + headerLength + 4;
    const dataLength = buffer.readInt32LE(4 + headerLength);
    const data = buffer.slice(dataOffset, dataOffset + dataLength);
    record.parseData(data);
    record.offset = fileOffset;
    record.dataOffset = record.offset + 4 + headerLength + 4;
    record.end = record.dataOffset + dataLength;
    record.length = record.end - record.offset;
    return record;
  }

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./src/MessageReader.js":
/*!******************************!*\
  !*** ./src/MessageReader.js ***!
  \******************************/
/*! exports provided: MessageReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return MessageReader; });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "./node_modules/int53/index.js");
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(int53__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fields */ "./src/fields.js");
/* harmony import */ var _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parseMessageDefinition */ "./src/parseMessageDefinition.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




// this has hard-coded buffer reading functions for each
// of the standard message types http://docs.ros.org/api/std_msgs/html/index-msg.html
// eventually custom types decompose into these standard types
class StandardTypeReader {
  constructor(buffer) {
    _defineProperty(this, "buffer", void 0);

    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "view", void 0);

    this.buffer = buffer;
    this.offset = 0;
    this.view = new DataView(buffer.buffer, buffer.byteOffset);
  }

  string() {
    const len = this.int32();
    const codePoints = new Uint8Array(this.buffer.buffer, this.buffer.byteOffset + this.offset, len);
    this.offset += len; // if the string is relatively short we can use apply
    // but very long strings can cause a stack overflow due to too many arguments
    // in those cases revert to a slower itterative string building approach

    if (codePoints.length < 1000) {
      return String.fromCharCode.apply(null, codePoints);
    }

    let data = "";

    for (let i = 0; i < len; i++) {
      data += String.fromCharCode(codePoints[i]);
    }

    return data;
  }

  bool() {
    return this.uint8() !== 0;
  }

  int8() {
    return this.view.getInt8(this.offset++);
  }

  uint8() {
    return this.view.getUint8(this.offset++);
  }

  typedArray(len, arrayType) {
    const arrayLength = len == null ? this.uint32() : len;
    const data = new arrayType(this.view.buffer, this.offset + this.view.byteOffset, arrayLength);
    this.offset += arrayLength;
    return data;
  }

  int16() {
    const result = this.view.getInt16(this.offset, true);
    this.offset += 2;
    return result;
  }

  uint16() {
    const result = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return result;
  }

  int32() {
    const result = this.view.getInt32(this.offset, true);
    this.offset += 4;
    return result;
  }

  uint32() {
    const result = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return result;
  }

  float32() {
    const result = this.view.getFloat32(this.offset, true);
    this.offset += 4;
    return result;
  }

  float64() {
    const result = this.view.getFloat64(this.offset, true);
    this.offset += 8;
    return result;
  }

  int64() {
    const offset = this.offset;
    this.offset += 8;
    return int53__WEBPACK_IMPORTED_MODULE_0___default.a.readInt64LE(this.buffer, offset);
  }

  uint64() {
    const offset = this.offset;
    this.offset += 8;
    return int53__WEBPACK_IMPORTED_MODULE_0___default.a.readUInt64LE(this.buffer, offset);
  }

  time() {
    const offset = this.offset;
    this.offset += 8;
    return Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(this.buffer, offset);
  }

  duration() {
    const offset = this.offset;
    this.offset += 8;
    return Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(this.buffer, offset);
  }

}

const findTypeByName = (types, name = "") => {
  let foundName = ""; // track name separately in a non-null variable to appease Flow

  const matches = types.filter(type => {
    const typeName = type.name || ""; // if the search is empty, return unnamed types

    if (!name) {
      return !typeName;
    } // return if the search is in the type name
    // or matches exactly if a fully-qualified name match is passed to us


    const nameEnd = name.indexOf("/") > -1 ? name : `/${name}`;

    if (typeName.endsWith(nameEnd)) {
      foundName = typeName;
      return true;
    }

    return false;
  });

  if (matches.length !== 1) {
    throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}`);
  }

  return { ...matches[0],
    name: foundName
  };
};

const constructorBody = type => {
  return type.definitions.filter(def => !def.isConstant).map(def => {
    return `this.${def.name} = undefined`;
  }).join(";\n");
};

const friendlyName = name => name.replace("/", "_");

const createParser = types => {
  const unnamedTypes = types.filter(type => !type.name);

  if (unnamedTypes.length !== 1) {
    throw new Error("multiple unnamed types");
  }

  const [unnamedType] = unnamedTypes;
  const namedTypes = types.filter(type => !!type.name);
  let js = `
  var Record = function () {
    ${constructorBody(unnamedType)}
  };\n`;
  namedTypes.forEach(t => {
    js += `
Record.${friendlyName(t.name)} = function() {
  ${constructorBody(t)}
};\n`;
  });
  let stack = 0;

  const getReaderLines = (type, fieldName = "record") => {
    let readerLines = [];
    type.definitions.forEach(def => {
      if (def.isConstant) {
        return;
      }

      if (def.isArray) {
        if (def.type === "uint8" || def.type === "int8") {
          const arrayType = def.type === "uint8" ? "Uint8Array" : "Int8Array";
          readerLines.push(`${fieldName}.${def.name} = reader.typedArray(${String(def.arrayLength)}, ${arrayType});`);
          return;
        } // because we might have nested arrays
        // we need to incrementally number varaibles so they aren't
        // stomped on by other variables in the function


        stack++; // name for the length field in the for-loop

        const lenField = `length_${stack}`; // name for a child collection

        const childName = `cplx_${stack}`; // name to the itterator in the for-loop

        const incName = `${childName}_inc_${stack}`; // set a variable pointing to the parsed fixed array length
        // or read the byte indicating the dynamic length

        readerLines.push(`var ${lenField} = ${def.arrayLength ? def.arrayLength : "reader.uint32();"}`); // only allocate an array if there is a length - skips empty allocations

        const arrayName = `${fieldName}.${def.name}`; // allocate the new array to a fixed length since we know it ahead of time

        readerLines.push(`${arrayName} = new Array(${lenField})`); // start the for-loop

        readerLines.push(`for (var ${incName} = 0; ${incName} < ${lenField}; ${incName}++) {`); // if the sub type is complex we need to allocate it and parse its values

        if (def.isComplex) {
          const defType = findTypeByName(types, def.type);
          readerLines.push(`var ${childName} = new Record.${friendlyName(defType.name)}();`); // recursively generate the parse instructions for the sub-type

          readerLines = readerLines.concat(getReaderLines(defType, `${childName}`));
          readerLines.push(`${arrayName}[${incName}] = ${childName}`);
        } else {
          // if the subtype is not complex its a simple low-level reader operation
          readerLines.push(`${arrayName}[${incName}] = reader.${def.type}();`);
        }

        readerLines.push("}"); // close the for-loop
      } else if (def.isComplex) {
        const defType = findTypeByName(types, def.type);
        readerLines.push(`${fieldName}.${def.name} = new Record.${friendlyName(defType.name)}();`);
        readerLines = readerLines.concat(getReaderLines(defType, `${fieldName}.${def.name}`));
      } else {
        readerLines.push(`${fieldName}.${def.name} = reader.${def.type}();`);
      }
    });
    return readerLines;
  };

  const lines = getReaderLines(unnamedType).join("\n");
  const readerFn = `
  return function read(reader) {
    var record = new Record();
    ${lines}
    return record;
  };`;
  js += readerFn;

  let _read;

  try {
    _read = eval(`(function buildReader() { ${js} })()`);
  } catch (e) {
    console.error("error building parser:", js); // eslint-disable-line

    throw e;
  }

  return function (buffer) {
    const reader = new StandardTypeReader(buffer);
    return _read(reader);
  };
};

class MessageReader {
  // takes a multi-line string message definition and returns
  // a message reader which can be used to read messages based
  // on the message definition
  constructor(messageDefinition) {
    _defineProperty(this, "reader", void 0);

    const definitions = Object(_parseMessageDefinition__WEBPACK_IMPORTED_MODULE_2__["parseMessageDefinition"])(messageDefinition);
    this.reader = createParser(definitions);
  }

  readMessage(buffer) {
    return this.reader(buffer);
  }

}

/***/ }),

/***/ "./src/ReadResult.js":
/*!***************************!*\
  !*** ./src/ReadResult.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReadResult; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
// represents a result passed to the callback from the high-level call:
// bag.readMessages({ opts: any }, callback: (ReadResult) => void) => Promise<void>
class ReadResult {
  constructor(topic, message, timestamp, data, chunkOffset, totalChunks) {
    _defineProperty(this, "topic", void 0);

    _defineProperty(this, "message", void 0);

    _defineProperty(this, "timestamp", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "chunkOffset", void 0);

    _defineProperty(this, "totalChunks", void 0);

    // string: the topic the message was on
    this.topic = topic; // any: the parsed body of the message based on connection.messageDefinition

    this.message = message; // time: the timestamp of the message

    this.timestamp = timestamp; // buffer: raw buffer data of the message

    this.data = data; // the offset of the currently read chunk

    this.chunkOffset = chunkOffset; // the total number of chunks in the read operation

    this.totalChunks = totalChunks;
  }

}

/***/ }),

/***/ "./src/TimeUtil.js":
/*!*************************!*\
  !*** ./src/TimeUtil.js ***!
  \*************************/
/*! exports provided: fromDate, toDate, compare, isLessThan, isGreaterThan, areSame, add */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromDate", function() { return fromDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDate", function() { return toDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compare", function() { return compare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLessThan", function() { return isLessThan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGreaterThan", function() { return isGreaterThan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areSame", function() { return areSame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
function fromDate(date) {
  const sec = Math.floor(date.getTime() / 1000);
  const nsec = date.getMilliseconds() * 1e6;
  return {
    sec,
    nsec
  };
}
function toDate(time) {
  return new Date(time.sec * 1e3 + time.nsec / 1e6);
} // compare two times, returning a negative value if the right is greater
// or a positive value if the left is greater or 0 if the times are equal
// useful to supply to Array.prototype.sort

function compare(left, right) {
  const secDiff = left.sec - right.sec;
  return secDiff || left.nsec - right.nsec;
} // returns true if the left time is less than the right time, otherwise false

function isLessThan(left, right) {
  return this.compare(left, right) < 0;
} // returns true if the left time is greater than the right time, otherwise false

function isGreaterThan(left, right) {
  return this.compare(left, right) > 0;
} // returns true if both times have the same number of seconds and nanoseconds

function areSame(left, right) {
  return left.sec === right.sec && left.nsec === right.nsec;
}

function toString(time) {
  return `{${time.sec}, ${time.nsec}}`;
} // computes the sum of two times or durations and returns a new time
// throws an exception if the resulting time is negative


function add(left, right) {
  const durationNanos = left.nsec + right.nsec;
  const secsFromNanos = Math.floor(durationNanos / 1e9);
  const newSecs = left.sec + right.sec + secsFromNanos;
  const remainingDurationNanos = durationNanos % 1e9; // use Math.abs here to prevent -0 when there is exactly 1 second of negative nanoseconds passed in

  const newNanos = Math.abs(Math.sign(remainingDurationNanos) === -1 ? 1e9 + remainingDurationNanos : remainingDurationNanos);
  const result = {
    sec: newSecs,
    nsec: newNanos
  };

  if (result.sec < 0 || result.nsec < 0) {
    throw new Error(`Invalid time: ${toString(result)} produced from TimeUtil.add(${toString(left)}, ${toString(right)}})`);
  }

  return result;
}

/***/ }),

/***/ "./src/bag.js":
/*!********************!*\
  !*** ./src/bag.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Bag; });
/* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BagReader */ "./src/BagReader.js");
/* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.js");
/* harmony import */ var _ReadResult__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReadResult */ "./src/ReadResult.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./record */ "./src/record.js");
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.





// the high level rosbag interface
// create a new bag by calling:
// `const bag = await Bag.open('./path-to-file.bag')` in node or
// `const bag = await Bag.open(files[0])` in the browser
//
// after that you can consume messages by calling
// `await bag.readMessages({ topics: ['/foo'] },
//    (result) => console.log(result.topic, result.message))`
class Bag {
  // you can optionally create a bag manually passing in a bagReader instance
  constructor(bagReader) {
    _defineProperty(this, "reader", void 0);

    _defineProperty(this, "header", void 0);

    _defineProperty(this, "connections", void 0);

    _defineProperty(this, "chunkInfos", void 0);

    _defineProperty(this, "startTime", void 0);

    _defineProperty(this, "endTime", void 0);

    this.reader = bagReader;
  } // eslint-disable-next-line no-unused-vars


  // if the bag is manually created with the constructor, you must call `await open()` on the bag
  // generally this is called for you if you're using `const bag = await Bag.open()`
  async open() {
    this.header = await this.reader.readHeaderAsync();
    const {
      connectionCount,
      chunkCount,
      indexPosition
    } = this.header;
    const result = await this.reader.readConnectionsAndChunkInfoAsync(indexPosition, connectionCount, chunkCount);
    this.connections = {};
    result.connections.forEach(connection => {
      this.connections[connection.conn] = connection;
    });
    this.chunkInfos = result.chunkInfos;

    if (chunkCount > 0) {
      this.startTime = this.chunkInfos[0].startTime;
      this.endTime = this.chunkInfos[chunkCount - 1].endTime;
    }
  }

  async readMessages(opts, callback) {
    const connections = this.connections;
    const startTime = opts.startTime || {
      sec: 0,
      nsec: 0
    };
    const endTime = opts.endTime || {
      sec: Number.MAX_VALUE,
      nsec: Number.MAX_VALUE
    };
    const topics = opts.topics || Object.keys(connections).map(id => {
      return connections[id].topic;
    });
    const filteredConnections = Object.keys(connections).filter(id => {
      return topics.indexOf(connections[id].topic) !== -1;
    }).map(id => +id);
    const {
      decompress = {}
    } = opts; // filter chunks to those which fall within the time range we're attempting to read

    const chunkInfos = this.chunkInfos.filter(info => {
      return _TimeUtil__WEBPACK_IMPORTED_MODULE_4__["compare"](info.startTime, endTime) <= 0 && _TimeUtil__WEBPACK_IMPORTED_MODULE_4__["compare"](startTime, info.endTime) <= 0;
    });

    function parseMsg(msg, chunkOffset) {
      const connection = connections[msg.conn];
      const {
        topic
      } = connection;
      const {
        data,
        time: timestamp
      } = msg;
      let message = null;

      if (!opts.noParse) {
        // lazily create a reader for this connection if it doesn't exist
        connection.reader = connection.reader || new _MessageReader__WEBPACK_IMPORTED_MODULE_1__["MessageReader"](connection.messageDefinition);
        message = connection.reader.readMessage(data);
      }

      return new _ReadResult__WEBPACK_IMPORTED_MODULE_2__["default"](topic, message, timestamp, data, chunkOffset, chunkInfos.length);
    }

    for (let i = 0; i < chunkInfos.length; i++) {
      const info = chunkInfos[i];
      const messages = await this.reader.readChunkMessagesAsync(info, filteredConnections, startTime, endTime, decompress);
      messages.forEach(msg => callback(parseMsg(msg, i)));
    }
  }

}

_defineProperty(Bag, "open", file => {
  throw new Error("This method should have been overridden based on the environment. Make sure you are correctly importing the node or web version of Bag.");
});

/***/ }),

/***/ "./src/fields.js":
/*!***********************!*\
  !*** ./src/fields.js ***!
  \***********************/
/*! exports provided: extractFields, extractTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractFields", function() { return extractFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractTime", function() { return extractTime; });
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
// reads through a buffer and extracts { [key: string]: value: string }
// pairs - the buffer is expected to have length prefixed utf8 strings
// with a '=' separating the key and value
function extractFields(buffer) {
  if (buffer.length < 4) {
    throw new Error("Header fields are truncated.");
  }

  let i = 0;
  const fields = {};

  while (i < buffer.length) {
    const length = buffer.readInt32LE(i);
    i += 4;

    if (i + length > buffer.length) {
      throw new Error("Header fields are corrupt.");
    }

    const field = buffer.slice(i, i + length);
    const index = field.indexOf("=");

    if (index === -1) {
      throw new Error("Header field is missing equals sign.");
    }

    fields[field.slice(0, index).toString()] = field.slice(index + 1);
    i += length;
  }

  return fields;
} // reads a Time object out of a buffer at the given offset

function extractTime(buffer, offset) {
  const sec = buffer.readUInt32LE(offset);
  const nsec = buffer.readUInt32LE(offset + 4);
  return {
    sec,
    nsec
  };
}

/***/ }),

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/*! exports provided: parseHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHeader", function() { return parseHeader; });
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fields */ "./src/fields.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./record */ "./src/record.js");
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.

 // given a buffer parses out the record within the buffer
// based on the opcode type bit

function parseHeader(buffer, cls) {
  const fields = Object(_fields__WEBPACK_IMPORTED_MODULE_0__["extractFields"])(buffer);

  if (fields.op === undefined) {
    throw new Error("Header is missing 'op' field.");
  }

  const opcode = fields.op.readUInt8(0);

  if (opcode !== cls.opcode) {
    throw new Error(`Expected ${cls.name} (${cls.opcode}) but found ${opcode}`);
  }

  return new cls(fields);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "TimeUtil", function() { return _TimeUtil__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _bag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bag */ "./src/bag.js");
/* empty/unused harmony star reexport *//* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BagReader */ "./src/BagReader.js");
/* empty/unused harmony star reexport *//* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return _MessageReader__WEBPACK_IMPORTED_MODULE_3__["MessageReader"]; });

/* harmony import */ var _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parseMessageDefinition */ "./src/parseMessageDefinition.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rosPrimitiveTypes", function() { return _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_4__["rosPrimitiveTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseMessageDefinition", function() { return _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_4__["parseMessageDefinition"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "./src/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_5__) if(["TimeUtil","default","MessageReader","rosPrimitiveTypes","parseMessageDefinition","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_5__[key]; }) }(__WEBPACK_IMPORT_KEY__));
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.








/***/ }),

/***/ "./src/nmerge.js":
/*!***********************!*\
  !*** ./src/nmerge.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! heap */ "./node_modules/heap/index.js");
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(heap__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.


function nmerge(key, ...iterables) {
  const heap = new heap__WEBPACK_IMPORTED_MODULE_0___default.a((a, b) => {
    return key(a.value, b.value);
  });

  for (let i = 0; i < iterables.length; i++) {
    const {
      value,
      done
    } = iterables[i].next();

    if (!done) {
      heap.push({
        i,
        value
      });
    }
  }

  return {
    next: () => {
      if (heap.empty()) {
        return {
          done: true
        };
      }

      const {
        i
      } = heap.front();
      const next = iterables[i].next();

      if (next.done) {
        return {
          value: heap.pop().value,
          done: false
        };
      }

      return {
        value: heap.replace({
          i,
          value: next.value
        }).value,
        done: false
      };
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (nmerge);

/***/ }),

/***/ "./src/parseMessageDefinition.js":
/*!***************************************!*\
  !*** ./src/parseMessageDefinition.js ***!
  \***************************************/
/*! exports provided: rosPrimitiveTypes, parseMessageDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rosPrimitiveTypes", function() { return rosPrimitiveTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseMessageDefinition", function() { return parseMessageDefinition; });
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
// Set of built-in ros types. See http://wiki.ros.org/msg#Field_Types
const rosPrimitiveTypes = new Set(["string", "bool", "int8", "uint8", "int16", "uint16", "int32", "uint32", "float32", "float64", "int64", "uint64", "time", "duration"]);

function normalizeType(type) {
  // Normalize deprecated aliases.
  let normalizedType = type;

  if (type === "char") {
    normalizedType = "uint8";
  }

  if (type === "byte") {
    normalizedType = "int8";
  }

  return normalizedType;
} // represents a single line in a message definition type
// e.g. 'string name' 'CustomType[] foo' 'string[3] names'


function newArrayDefinition(type, name, arrayLength) {
  const normalizedType = normalizeType(type);
  return {
    type: normalizedType,
    name,
    isArray: true,
    arrayLength: arrayLength === null ? undefined : arrayLength,
    isComplex: !rosPrimitiveTypes.has(normalizedType)
  };
}

function newDefinition(type, name) {
  const normalizedType = normalizeType(type);
  return {
    type: normalizedType,
    name,
    isArray: false,
    isComplex: !rosPrimitiveTypes.has(normalizedType)
  };
}

const buildType = lines => {
  const definitions = [];
  let complexTypeName;
  lines.forEach(line => {
    // remove comments and extra whitespace from each line
    const splits = line.replace(/#.*/gi, "").split(" ").filter(word => word);

    if (!splits[1]) {
      return;
    } // consume comments


    const type = splits[0].trim();
    const name = splits[1].trim();

    if (type === "MSG:") {
      complexTypeName = name;
    } else if (name.indexOf("=") > -1 || splits.indexOf("=") > -1) {
      // constant type parsing
      const matches = line.match(/(\S+)\s*=\s*(.*)\s*/);

      if (!matches) {
        throw new Error("Malformed line: " + line);
      }

      let value = matches[2];

      if (type !== "string") {
        try {
          value = JSON.parse(value.replace(/\s*#.*/g, ""));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn(`Error in this constant definition: ${line}`);
          throw error;
        }

        if (type === "bool") {
          value = Boolean(value);
        }
      }

      if (type.includes("int") && value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
        // eslint-disable-next-line no-console
        console.warn(`Found integer constant outside safe integer range: ${line}`);
      }

      definitions.push({
        type: normalizeType(type),
        name: matches[1],
        isConstant: true,
        value
      });
    } else if (type.indexOf("]") === type.length - 1) {
      // array type parsing
      const typeSplits = type.split("[");
      const baseType = typeSplits[0];
      const len = typeSplits[1].replace("]", "");
      definitions.push(newArrayDefinition(baseType, name, len ? parseInt(len, 10) : undefined));
    } else {
      definitions.push(newDefinition(type, name));
    }
  });
  return {
    name: complexTypeName,
    definitions
  };
};

const findTypeByName = (types, name) => {
  const matches = types.filter(type => {
    const typeName = type.name || ""; // if the search is empty, return unnamed types

    if (!name) {
      return !typeName;
    } // return if the search is in the type name
    // or matches exactly if a fully-qualified name match is passed to us


    const nameEnd = name.indexOf("/") > -1 ? name : `/${name}`;
    return typeName.endsWith(nameEnd);
  });

  if (matches.length !== 1) {
    throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}`);
  }

  return matches[0];
}; // Given a raw message definition string, parse it into an object representation.
// Example return value:
// [{
//   name: undefined,
//   definitions: [
//     {
//       arrayLength: undefined,
//       isArray: false,
//       isComplex: false,
//       name: "name",
//       type: "string",
//     }, ...
//   ],
// }, ... ]
//
// See unit tests for more examples.


function parseMessageDefinition(messageDefinition) {
  // read all the lines and remove empties
  const allLines = messageDefinition.split("\n").map(line => line.trim()).filter(line => line);
  let definitionLines = [];
  const types = []; // group lines into individual definitions

  allLines.forEach(line => {
    // skip comment lines
    if (line.indexOf("#") === 0) {
      return;
    } // definitions are split by equal signs


    if (line.indexOf("==") === 0) {
      types.push(buildType(definitionLines));
      definitionLines = [];
    } else {
      definitionLines.push(line);
    }
  });
  types.push(buildType(definitionLines)); // Fix up complex type names

  types.forEach(({
    definitions
  }) => {
    definitions.forEach(definition => {
      if (definition.isComplex) {
        const foundName = findTypeByName(types, definition.type).name;

        if (foundName === undefined) {
          throw new Error(`Missing type definition for ${definition.type}`);
        }

        definition.type = foundName;
      }
    });
  });
  return types;
}

/***/ }),

/***/ "./src/record.js":
/*!***********************!*\
  !*** ./src/record.js ***!
  \***********************/
/*! exports provided: Record, BagHeader, Chunk, Connection, MessageData, IndexData, ChunkInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Record", function() { return Record; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BagHeader", function() { return BagHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chunk", function() { return Chunk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Connection", function() { return Connection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageData", function() { return MessageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexData", function() { return IndexData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChunkInfo", function() { return ChunkInfo; });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "./node_modules/int53/index.js");
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(int53__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fields */ "./src/fields.js");
/* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




const readUInt64LE = buffer => {
  return int53__WEBPACK_IMPORTED_MODULE_0___default.a.readUInt64LE(buffer, 0);
};

class Record {
  constructor(_fields) {
    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "dataOffset", void 0);

    _defineProperty(this, "end", void 0);

    _defineProperty(this, "length", void 0);
  }

  parseData(_buffer) {}

}
class BagHeader extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "indexPosition", void 0);

    _defineProperty(this, "connectionCount", void 0);

    _defineProperty(this, "chunkCount", void 0);

    this.indexPosition = readUInt64LE(fields.index_pos);
    this.connectionCount = fields.conn_count.readInt32LE(0);
    this.chunkCount = fields.chunk_count.readInt32LE(0);
  }

}

_defineProperty(BagHeader, "opcode", 3);

class Chunk extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "compression", void 0);

    _defineProperty(this, "size", void 0);

    _defineProperty(this, "data", void 0);

    this.compression = fields.compression.toString();
    this.size = fields.size.readUInt32LE(0);
  }

  parseData(buffer) {
    this.data = buffer;
  }

}

_defineProperty(Chunk, "opcode", 5);

const getField = (fields, key) => {
  if (fields[key] === undefined) {
    throw new Error(`Connection header is missing ${key}.`);
  }

  return fields[key].toString();
};

class Connection extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "conn", void 0);

    _defineProperty(this, "topic", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "md5sum", void 0);

    _defineProperty(this, "messageDefinition", void 0);

    _defineProperty(this, "callerid", void 0);

    _defineProperty(this, "latching", void 0);

    _defineProperty(this, "reader", void 0);

    this.conn = fields.conn.readUInt32LE(0);
    this.topic = fields.topic.toString();
    this.type = undefined;
    this.md5sum = undefined;
    this.messageDefinition = "";
  }

  parseData(buffer) {
    const fields = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractFields"])(buffer);
    this.type = getField(fields, "type");
    this.md5sum = getField(fields, "md5sum");
    this.messageDefinition = getField(fields, "message_definition");

    if (fields.callerid !== undefined) {
      this.callerid = fields.callerid.toString();
    }

    if (fields.latching !== undefined) {
      this.latching = fields.latching.toString() === "1";
    }
  }

}

_defineProperty(Connection, "opcode", 7);

class MessageData extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "conn", void 0);

    _defineProperty(this, "time", void 0);

    _defineProperty(this, "data", void 0);

    this.conn = fields.conn.readUInt32LE(0);
    this.time = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(fields.time, 0);
  }

  parseData(buffer) {
    this.data = buffer;
  }

}

_defineProperty(MessageData, "opcode", 2);

class IndexData extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "ver", void 0);

    _defineProperty(this, "conn", void 0);

    _defineProperty(this, "count", void 0);

    _defineProperty(this, "indices", void 0);

    this.ver = fields.ver.readUInt32LE(0);
    this.conn = fields.conn.readUInt32LE(0);
    this.count = fields.count.readUInt32LE(0);
  }

  parseData(buffer) {
    this.indices = [];

    for (let i = 0; i < this.count; i++) {
      this.indices.push({
        time: Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(buffer, i * 12),
        offset: buffer.readUInt32LE(i * 12 + 8)
      });
    }
  }

}

_defineProperty(IndexData, "opcode", 4);

class ChunkInfo extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "ver", void 0);

    _defineProperty(this, "chunkPosition", void 0);

    _defineProperty(this, "startTime", void 0);

    _defineProperty(this, "endTime", void 0);

    _defineProperty(this, "count", void 0);

    _defineProperty(this, "connections", void 0);

    _defineProperty(this, "nextChunk", void 0);

    this.ver = fields.ver.readUInt32LE(0);
    this.chunkPosition = readUInt64LE(fields.chunk_pos);
    this.startTime = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(fields.start_time, 0);
    this.endTime = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(fields.end_time, 0);
    this.count = fields.count.readUInt32LE(0);
  }

  parseData(buffer) {
    this.connections = [];

    for (let i = 0; i < this.count; i++) {
      this.connections.push({
        conn: buffer.readUInt32LE(i * 8),
        count: buffer.readUInt32LE(i * 8 + 4)
      });
    }
  }

}

_defineProperty(ChunkInfo, "opcode", 6);

/***/ }),

/***/ "./src/types.js":
/*!**********************!*\
  !*** ./src/types.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/web/index.js":
/*!**************************!*\
  !*** ./src/web/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(setImmediate) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reader", function() { return Reader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "open", function() { return open; });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buffer */ "./node_modules/node-libs-browser/node_modules/buffer/index.js");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ "./src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeUtil", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["TimeUtil"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["MessageReader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseMessageDefinition", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["parseMessageDefinition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rosPrimitiveTypes", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["rosPrimitiveTypes"]; });

/* harmony import */ var _bag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bag */ "./src/bag.js");
/* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../BagReader */ "./src/BagReader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BagReader", function() { return _BagReader__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_4__) if(["Reader","TimeUtil","BagReader","MessageReader","open","parseMessageDefinition","rosPrimitiveTypes","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_4__[key]; }) }(__WEBPACK_IMPORT_KEY__));
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.



 // browser reader for Blob|File objects

class Reader {
  constructor(blob) {
    _defineProperty(this, "_blob", void 0);

    _defineProperty(this, "_size", void 0);

    this._blob = blob;
    this._size = blob.size;
  } // read length (bytes) starting from offset (bytes)
  // callback(err, buffer)


  read(offset, length, cb) {
    const reader = new FileReader();

    reader.onload = function () {
      // $FlowFixMe - flow doesn't allow null
      reader.onload = null; // $FlowFixMe - flow doesn't allow null

      reader.onerror = null;
      setImmediate(cb, null, buffer__WEBPACK_IMPORTED_MODULE_0__["Buffer"].from(reader.result));
    };

    reader.onerror = function () {
      // $FlowFixMe - flow doesn't allow null
      reader.onload = null; // $FlowFixMe - flow doesn't allow null

      reader.onerror = null;
      setImmediate(cb, new Error(reader.error));
    };

    reader.readAsArrayBuffer(this._blob.slice(offset, offset + length));
  } // return the size of the file


  size() {
    return this._size;
  }

}

const open = async file => {
  if (!(file instanceof Blob)) {
    throw new Error("Expected file to be a File or Blob. Make sure you are correctly importing the node or web version of Bag.");
  }

  const bag = new _bag__WEBPACK_IMPORTED_MODULE_2__["default"](new _BagReader__WEBPACK_IMPORTED_MODULE_3__["default"](new Reader(file)));
  await bag.open();
  return bag;
};

_bag__WEBPACK_IMPORTED_MODULE_2__["default"].open = open;


/* harmony default export */ __webpack_exports__["default"] = (_bag__WEBPACK_IMPORTED_MODULE_2__["default"]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb3NiYWcvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Jvc2JhZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yb3NiYWcvLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9oZWFwL2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9oZWFwL2xpYi9oZWFwLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9pbnQ1My9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9ub2RlX21vZHVsZXMvbm9kZS1saWJzLWJyb3dzZXIvbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovL3Jvc2JhZy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL0JhZ1JlYWRlci5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvTWVzc2FnZVJlYWRlci5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvUmVhZFJlc3VsdC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvVGltZVV0aWwuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL2JhZy5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvZmllbGRzLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9ubWVyZ2UuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL3BhcnNlTWVzc2FnZURlZmluaXRpb24uanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL3JlY29yZC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvd2ViL2luZGV4LmpzIl0sIm5hbWVzIjpbIkhFQURFUl9SRUFEQUhFQUQiLCJIRUFERVJfT0ZGU0VUIiwiQmFnUmVhZGVyIiwiY29uc3RydWN0b3IiLCJmaWxlbGlrZSIsIl9maWxlIiwiX2xhc3RDaHVua0luZm8iLCJ1bmRlZmluZWQiLCJ2ZXJpZnlCYWdIZWFkZXIiLCJjYWxsYmFjayIsIm5leHQiLCJyZWFkIiwiZXJyb3IiLCJidWZmZXIiLCJFcnJvciIsInNpemUiLCJ0b1N0cmluZyIsInJlYWRIZWFkZXIiLCJsZW5ndGgiLCJoZWFkZXJMZW5ndGgiLCJyZWFkSW50MzJMRSIsImhlYWRlciIsInJlYWRSZWNvcmRGcm9tQnVmZmVyIiwiQmFnSGVhZGVyIiwicmVhZEhlYWRlckFzeW5jIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlcnIiLCJyZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm8iLCJmaWxlT2Zmc2V0IiwiY29ubmVjdGlvbkNvdW50IiwiY2h1bmtDb3VudCIsImNvbm5lY3Rpb25zIiwiY2h1bmtJbmZvcyIsInJlYWRSZWNvcmRzRnJvbUJ1ZmZlciIsIkNvbm5lY3Rpb24iLCJjb25uZWN0aW9uQmxvY2tMZW5ndGgiLCJlbmQiLCJvZmZzZXQiLCJzbGljZSIsIkNodW5rSW5mbyIsImkiLCJuZXh0Q2h1bmsiLCJyZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm9Bc3luYyIsInJlc3VsdCIsInJlYWRDaHVua01lc3NhZ2VzIiwiY2h1bmtJbmZvIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImRlY29tcHJlc3MiLCJzdGFydCIsInNlYyIsIm5zZWMiLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJjb25ucyIsIm1hcCIsImNvbm5lY3Rpb24iLCJjb25uIiwicmVhZENodW5rIiwiY2h1bmsiLCJpbmRpY2VzIiwiZm9yRWFjaCIsImluZGV4IiwicHJlc2VudENvbm5lY3Rpb25zIiwiZmlsdGVyIiwiaXRlcmFibGVzIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJpdGVyIiwibm1lcmdlIiwiYSIsImIiLCJlbnRyaWVzIiwiaXRlbSIsImRvbmUiLCJ2YWx1ZSIsIlRpbWVVdGlsIiwidGltZSIsInB1c2giLCJtZXNzYWdlcyIsImVudHJ5IiwiZGF0YSIsImRhdGFPZmZzZXQiLCJNZXNzYWdlRGF0YSIsInJlYWRDaHVua01lc3NhZ2VzQXN5bmMiLCJfbGFzdFJlYWRSZXN1bHQiLCJsYXN0UmVhZFJlc3VsdCIsInNldEltbWVkaWF0ZSIsInJlYWRMZW5ndGgiLCJjaHVua1Bvc2l0aW9uIiwiQ2h1bmsiLCJjb21wcmVzc2lvbiIsImRlY29tcHJlc3NGbiIsImNvdW50IiwiSW5kZXhEYXRhIiwiY2xzIiwicmVjb3JkcyIsImJ1ZmZlck9mZnNldCIsInJlY29yZCIsInBhcnNlSGVhZGVyIiwiZGF0YUxlbmd0aCIsInBhcnNlRGF0YSIsIlN0YW5kYXJkVHlwZVJlYWRlciIsInZpZXciLCJEYXRhVmlldyIsImJ5dGVPZmZzZXQiLCJzdHJpbmciLCJsZW4iLCJpbnQzMiIsImNvZGVQb2ludHMiLCJVaW50OEFycmF5IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiYXBwbHkiLCJib29sIiwidWludDgiLCJpbnQ4IiwiZ2V0SW50OCIsImdldFVpbnQ4IiwidHlwZWRBcnJheSIsImFycmF5VHlwZSIsImFycmF5TGVuZ3RoIiwidWludDMyIiwiaW50MTYiLCJnZXRJbnQxNiIsInVpbnQxNiIsImdldFVpbnQxNiIsImdldEludDMyIiwiZ2V0VWludDMyIiwiZmxvYXQzMiIsImdldEZsb2F0MzIiLCJmbG9hdDY0IiwiZ2V0RmxvYXQ2NCIsImludDY0IiwiaW50NTMiLCJyZWFkSW50NjRMRSIsInVpbnQ2NCIsInJlYWRVSW50NjRMRSIsImV4dHJhY3RUaW1lIiwiZHVyYXRpb24iLCJmaW5kVHlwZUJ5TmFtZSIsInR5cGVzIiwibmFtZSIsImZvdW5kTmFtZSIsIm1hdGNoZXMiLCJ0eXBlIiwidHlwZU5hbWUiLCJuYW1lRW5kIiwiaW5kZXhPZiIsImVuZHNXaXRoIiwiY29uc3RydWN0b3JCb2R5IiwiZGVmaW5pdGlvbnMiLCJkZWYiLCJpc0NvbnN0YW50Iiwiam9pbiIsImZyaWVuZGx5TmFtZSIsInJlcGxhY2UiLCJjcmVhdGVQYXJzZXIiLCJ1bm5hbWVkVHlwZXMiLCJ1bm5hbWVkVHlwZSIsIm5hbWVkVHlwZXMiLCJqcyIsInQiLCJzdGFjayIsImdldFJlYWRlckxpbmVzIiwiZmllbGROYW1lIiwicmVhZGVyTGluZXMiLCJpc0FycmF5IiwibGVuRmllbGQiLCJjaGlsZE5hbWUiLCJpbmNOYW1lIiwiYXJyYXlOYW1lIiwiaXNDb21wbGV4IiwiZGVmVHlwZSIsImNvbmNhdCIsImxpbmVzIiwicmVhZGVyRm4iLCJfcmVhZCIsImV2YWwiLCJlIiwiY29uc29sZSIsInJlYWRlciIsIk1lc3NhZ2VSZWFkZXIiLCJtZXNzYWdlRGVmaW5pdGlvbiIsInBhcnNlTWVzc2FnZURlZmluaXRpb24iLCJyZWFkTWVzc2FnZSIsIlJlYWRSZXN1bHQiLCJ0b3BpYyIsIm1lc3NhZ2UiLCJ0aW1lc3RhbXAiLCJjaHVua09mZnNldCIsInRvdGFsQ2h1bmtzIiwiZnJvbURhdGUiLCJkYXRlIiwiTWF0aCIsImZsb29yIiwiZ2V0VGltZSIsImdldE1pbGxpc2Vjb25kcyIsInRvRGF0ZSIsIkRhdGUiLCJjb21wYXJlIiwibGVmdCIsInJpZ2h0Iiwic2VjRGlmZiIsImlzTGVzc1RoYW4iLCJpc0dyZWF0ZXJUaGFuIiwiYXJlU2FtZSIsImFkZCIsImR1cmF0aW9uTmFub3MiLCJzZWNzRnJvbU5hbm9zIiwibmV3U2VjcyIsInJlbWFpbmluZ0R1cmF0aW9uTmFub3MiLCJuZXdOYW5vcyIsImFicyIsInNpZ24iLCJCYWciLCJiYWdSZWFkZXIiLCJvcGVuIiwiaW5kZXhQb3NpdGlvbiIsInJlYWRNZXNzYWdlcyIsIm9wdHMiLCJ0b3BpY3MiLCJPYmplY3QiLCJrZXlzIiwiaWQiLCJmaWx0ZXJlZENvbm5lY3Rpb25zIiwiaW5mbyIsInBhcnNlTXNnIiwibXNnIiwibm9QYXJzZSIsImZpbGUiLCJleHRyYWN0RmllbGRzIiwiZmllbGRzIiwiZmllbGQiLCJyZWFkVUludDMyTEUiLCJvcCIsIm9wY29kZSIsInJlYWRVSW50OCIsImtleSIsImhlYXAiLCJIZWFwIiwiZW1wdHkiLCJmcm9udCIsInBvcCIsInJvc1ByaW1pdGl2ZVR5cGVzIiwiU2V0Iiwibm9ybWFsaXplVHlwZSIsIm5vcm1hbGl6ZWRUeXBlIiwibmV3QXJyYXlEZWZpbml0aW9uIiwiaGFzIiwibmV3RGVmaW5pdGlvbiIsImJ1aWxkVHlwZSIsImNvbXBsZXhUeXBlTmFtZSIsImxpbmUiLCJzcGxpdHMiLCJzcGxpdCIsIndvcmQiLCJ0cmltIiwibWF0Y2giLCJKU09OIiwicGFyc2UiLCJ3YXJuIiwiQm9vbGVhbiIsImluY2x1ZGVzIiwiTUFYX1NBRkVfSU5URUdFUiIsIk1JTl9TQUZFX0lOVEVHRVIiLCJ0eXBlU3BsaXRzIiwiYmFzZVR5cGUiLCJwYXJzZUludCIsImFsbExpbmVzIiwiZGVmaW5pdGlvbkxpbmVzIiwiZGVmaW5pdGlvbiIsIlJlY29yZCIsIl9maWVsZHMiLCJfYnVmZmVyIiwiaW5kZXhfcG9zIiwiY29ubl9jb3VudCIsImNodW5rX2NvdW50IiwiZ2V0RmllbGQiLCJtZDVzdW0iLCJjYWxsZXJpZCIsImxhdGNoaW5nIiwidmVyIiwiY2h1bmtfcG9zIiwic3RhcnRfdGltZSIsImVuZF90aW1lIiwiUmVhZGVyIiwiYmxvYiIsIl9ibG9iIiwiX3NpemUiLCJjYiIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJvbmVycm9yIiwiQnVmZmVyIiwiZnJvbSIsInJlYWRBc0FycmF5QnVmZmVyIiwiQmxvYiIsImJhZyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRlk7O0FBRVo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQyxTQUFTO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsVUFBVTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEpBLGlCQUFpQixtQkFBTyxDQUFDLG1EQUFZOzs7Ozs7Ozs7Ozs7QUNBckM7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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QSxxQkFBcUIsbURBQW1EO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzV2REE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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RUFBNkI7QUFDM0IsVUFBTSxJQUFJN1IsS0FBSixDQUNKLDJHQURJLENBQU47QUFHRDs7QUFDRCxRQUFNOFIsR0FBRyxHQUFHLElBQUluRiw0Q0FBSixDQUFRLElBQUl2TixrREFBSixDQUFjLElBQUk4UixNQUFKLENBQVd4RCxJQUFYLENBQWQsQ0FBUixDQUFaO0FBQ0EsUUFBTW9FLEdBQUcsQ0FBQ2pGLElBQUosRUFBTjtBQUNBLFNBQU9pRixHQUFQO0FBQ0QsQ0FURDs7QUFVQW5GLDRDQUFHLENBQUNFLElBQUosR0FBV0EsSUFBWDtBQUVBO0FBQ0E7QUFDZUYsMkdBQWYsRSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInJvc2JhZ1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJyb3NiYWdcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvd2ViL2luZGV4LmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxuLy8gU3VwcG9ydCBkZWNvZGluZyBVUkwtc2FmZSBiYXNlNjQgc3RyaW5ncywgYXMgTm9kZS5qcyBkb2VzLlxuLy8gU2VlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQjVVJMX2FwcGxpY2F0aW9uc1xucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gZ2V0TGVucyAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cbiAgaWYgKGxlbiAlIDQgPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0JylcbiAgfVxuXG4gIC8vIFRyaW0gb2ZmIGV4dHJhIGJ5dGVzIGFmdGVyIHBsYWNlaG9sZGVyIGJ5dGVzIGFyZSBmb3VuZFxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9iZWF0Z2FtbWl0L2Jhc2U2NC1qcy9pc3N1ZXMvNDJcbiAgdmFyIHZhbGlkTGVuID0gYjY0LmluZGV4T2YoJz0nKVxuICBpZiAodmFsaWRMZW4gPT09IC0xKSB2YWxpZExlbiA9IGxlblxuXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSB2YWxpZExlbiA9PT0gbGVuXG4gICAgPyAwXG4gICAgOiA0IC0gKHZhbGlkTGVuICUgNClcblxuICByZXR1cm4gW3ZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW5dXG59XG5cbi8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIF9ieXRlTGVuZ3RoIChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pIHtcbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG5cbiAgdmFyIGFyciA9IG5ldyBBcnIoX2J5dGVMZW5ndGgoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSlcblxuICB2YXIgY3VyQnl0ZSA9IDBcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIHZhciBsZW4gPSBwbGFjZUhvbGRlcnNMZW4gPiAwXG4gICAgPyB2YWxpZExlbiAtIDRcbiAgICA6IHZhbGlkTGVuXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayhcbiAgICAgIHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aClcbiAgICApKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXSArXG4gICAgICAnPT0nXG4gICAgKVxuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDEwXSArXG4gICAgICBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl0gK1xuICAgICAgJz0nXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2hlYXAnKTtcbiIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS44LjBcbihmdW5jdGlvbigpIHtcbiAgdmFyIEhlYXAsIGRlZmF1bHRDbXAsIGZsb29yLCBoZWFwaWZ5LCBoZWFwcG9wLCBoZWFwcHVzaCwgaGVhcHB1c2hwb3AsIGhlYXByZXBsYWNlLCBpbnNvcnQsIG1pbiwgbmxhcmdlc3QsIG5zbWFsbGVzdCwgdXBkYXRlSXRlbSwgX3NpZnRkb3duLCBfc2lmdHVwO1xuXG4gIGZsb29yID0gTWF0aC5mbG9vciwgbWluID0gTWF0aC5taW47XG5cblxuICAvKlxuICBEZWZhdWx0IGNvbXBhcmlzb24gZnVuY3Rpb24gdG8gYmUgdXNlZFxuICAgKi9cblxuICBkZWZhdWx0Q21wID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIGlmICh4IDwgeSkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBpZiAoeCA+IHkpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfTtcblxuXG4gIC8qXG4gIEluc2VydCBpdGVtIHggaW4gbGlzdCBhLCBhbmQga2VlcCBpdCBzb3J0ZWQgYXNzdW1pbmcgYSBpcyBzb3J0ZWQuXG4gIFxuICBJZiB4IGlzIGFscmVhZHkgaW4gYSwgaW5zZXJ0IGl0IHRvIHRoZSByaWdodCBvZiB0aGUgcmlnaHRtb3N0IHguXG4gIFxuICBPcHRpb25hbCBhcmdzIGxvIChkZWZhdWx0IDApIGFuZCBoaSAoZGVmYXVsdCBhLmxlbmd0aCkgYm91bmQgdGhlIHNsaWNlXG4gIG9mIGEgdG8gYmUgc2VhcmNoZWQuXG4gICAqL1xuXG4gIGluc29ydCA9IGZ1bmN0aW9uKGEsIHgsIGxvLCBoaSwgY21wKSB7XG4gICAgdmFyIG1pZDtcbiAgICBpZiAobG8gPT0gbnVsbCkge1xuICAgICAgbG8gPSAwO1xuICAgIH1cbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIGlmIChsbyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbG8gbXVzdCBiZSBub24tbmVnYXRpdmUnKTtcbiAgICB9XG4gICAgaWYgKGhpID09IG51bGwpIHtcbiAgICAgIGhpID0gYS5sZW5ndGg7XG4gICAgfVxuICAgIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgICBtaWQgPSBmbG9vcigobG8gKyBoaSkgLyAyKTtcbiAgICAgIGlmIChjbXAoeCwgYVttaWRdKSA8IDApIHtcbiAgICAgICAgaGkgPSBtaWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsbyA9IG1pZCArIDE7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAoW10uc3BsaWNlLmFwcGx5KGEsIFtsbywgbG8gLSBsb10uY29uY2F0KHgpKSwgeCk7XG4gIH07XG5cblxuICAvKlxuICBQdXNoIGl0ZW0gb250byBoZWFwLCBtYWludGFpbmluZyB0aGUgaGVhcCBpbnZhcmlhbnQuXG4gICAqL1xuXG4gIGhlYXBwdXNoID0gZnVuY3Rpb24oYXJyYXksIGl0ZW0sIGNtcCkge1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgYXJyYXkucHVzaChpdGVtKTtcbiAgICByZXR1cm4gX3NpZnRkb3duKGFycmF5LCAwLCBhcnJheS5sZW5ndGggLSAxLCBjbXApO1xuICB9O1xuXG5cbiAgLypcbiAgUG9wIHRoZSBzbWFsbGVzdCBpdGVtIG9mZiB0aGUgaGVhcCwgbWFpbnRhaW5pbmcgdGhlIGhlYXAgaW52YXJpYW50LlxuICAgKi9cblxuICBoZWFwcG9wID0gZnVuY3Rpb24oYXJyYXksIGNtcCkge1xuICAgIHZhciBsYXN0ZWx0LCByZXR1cm5pdGVtO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgbGFzdGVsdCA9IGFycmF5LnBvcCgpO1xuICAgIGlmIChhcnJheS5sZW5ndGgpIHtcbiAgICAgIHJldHVybml0ZW0gPSBhcnJheVswXTtcbiAgICAgIGFycmF5WzBdID0gbGFzdGVsdDtcbiAgICAgIF9zaWZ0dXAoYXJyYXksIDAsIGNtcCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybml0ZW0gPSBsYXN0ZWx0O1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuaXRlbTtcbiAgfTtcblxuXG4gIC8qXG4gIFBvcCBhbmQgcmV0dXJuIHRoZSBjdXJyZW50IHNtYWxsZXN0IHZhbHVlLCBhbmQgYWRkIHRoZSBuZXcgaXRlbS5cbiAgXG4gIFRoaXMgaXMgbW9yZSBlZmZpY2llbnQgdGhhbiBoZWFwcG9wKCkgZm9sbG93ZWQgYnkgaGVhcHB1c2goKSwgYW5kIGNhbiBiZVxuICBtb3JlIGFwcHJvcHJpYXRlIHdoZW4gdXNpbmcgYSBmaXhlZCBzaXplIGhlYXAuIE5vdGUgdGhhdCB0aGUgdmFsdWVcbiAgcmV0dXJuZWQgbWF5IGJlIGxhcmdlciB0aGFuIGl0ZW0hIFRoYXQgY29uc3RyYWlucyByZWFzb25hYmxlIHVzZSBvZlxuICB0aGlzIHJvdXRpbmUgdW5sZXNzIHdyaXR0ZW4gYXMgcGFydCBvZiBhIGNvbmRpdGlvbmFsIHJlcGxhY2VtZW50OlxuICAgICAgaWYgaXRlbSA+IGFycmF5WzBdXG4gICAgICAgIGl0ZW0gPSBoZWFwcmVwbGFjZShhcnJheSwgaXRlbSlcbiAgICovXG5cbiAgaGVhcHJlcGxhY2UgPSBmdW5jdGlvbihhcnJheSwgaXRlbSwgY21wKSB7XG4gICAgdmFyIHJldHVybml0ZW07XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICByZXR1cm5pdGVtID0gYXJyYXlbMF07XG4gICAgYXJyYXlbMF0gPSBpdGVtO1xuICAgIF9zaWZ0dXAoYXJyYXksIDAsIGNtcCk7XG4gICAgcmV0dXJuIHJldHVybml0ZW07XG4gIH07XG5cblxuICAvKlxuICBGYXN0IHZlcnNpb24gb2YgYSBoZWFwcHVzaCBmb2xsb3dlZCBieSBhIGhlYXBwb3AuXG4gICAqL1xuXG4gIGhlYXBwdXNocG9wID0gZnVuY3Rpb24oYXJyYXksIGl0ZW0sIGNtcCkge1xuICAgIHZhciBfcmVmO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgaWYgKGFycmF5Lmxlbmd0aCAmJiBjbXAoYXJyYXlbMF0sIGl0ZW0pIDwgMCkge1xuICAgICAgX3JlZiA9IFthcnJheVswXSwgaXRlbV0sIGl0ZW0gPSBfcmVmWzBdLCBhcnJheVswXSA9IF9yZWZbMV07XG4gICAgICBfc2lmdHVwKGFycmF5LCAwLCBjbXApO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbTtcbiAgfTtcblxuXG4gIC8qXG4gIFRyYW5zZm9ybSBsaXN0IGludG8gYSBoZWFwLCBpbi1wbGFjZSwgaW4gTyhhcnJheS5sZW5ndGgpIHRpbWUuXG4gICAqL1xuXG4gIGhlYXBpZnkgPSBmdW5jdGlvbihhcnJheSwgY21wKSB7XG4gICAgdmFyIGksIF9pLCBfaiwgX2xlbiwgX3JlZiwgX3JlZjEsIF9yZXN1bHRzLCBfcmVzdWx0czE7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBfcmVmMSA9IChmdW5jdGlvbigpIHtcbiAgICAgIF9yZXN1bHRzMSA9IFtdO1xuICAgICAgZm9yICh2YXIgX2ogPSAwLCBfcmVmID0gZmxvb3IoYXJyYXkubGVuZ3RoIC8gMik7IDAgPD0gX3JlZiA/IF9qIDwgX3JlZiA6IF9qID4gX3JlZjsgMCA8PSBfcmVmID8gX2orKyA6IF9qLS0peyBfcmVzdWx0czEucHVzaChfaik7IH1cbiAgICAgIHJldHVybiBfcmVzdWx0czE7XG4gICAgfSkuYXBwbHkodGhpcykucmV2ZXJzZSgpO1xuICAgIF9yZXN1bHRzID0gW107XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmMS5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgaSA9IF9yZWYxW19pXTtcbiAgICAgIF9yZXN1bHRzLnB1c2goX3NpZnR1cChhcnJheSwgaSwgY21wKSk7XG4gICAgfVxuICAgIHJldHVybiBfcmVzdWx0cztcbiAgfTtcblxuXG4gIC8qXG4gIFVwZGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGdpdmVuIGl0ZW0gaW4gdGhlIGhlYXAuXG4gIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIGNhbGxlZCBldmVyeSB0aW1lIHRoZSBpdGVtIGlzIGJlaW5nIG1vZGlmaWVkLlxuICAgKi9cblxuICB1cGRhdGVJdGVtID0gZnVuY3Rpb24oYXJyYXksIGl0ZW0sIGNtcCkge1xuICAgIHZhciBwb3M7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBwb3MgPSBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIF9zaWZ0ZG93bihhcnJheSwgMCwgcG9zLCBjbXApO1xuICAgIHJldHVybiBfc2lmdHVwKGFycmF5LCBwb3MsIGNtcCk7XG4gIH07XG5cblxuICAvKlxuICBGaW5kIHRoZSBuIGxhcmdlc3QgZWxlbWVudHMgaW4gYSBkYXRhc2V0LlxuICAgKi9cblxuICBubGFyZ2VzdCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBjbXApIHtcbiAgICB2YXIgZWxlbSwgcmVzdWx0LCBfaSwgX2xlbiwgX3JlZjtcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIHJlc3VsdCA9IGFycmF5LnNsaWNlKDAsIG4pO1xuICAgIGlmICghcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaGVhcGlmeShyZXN1bHQsIGNtcCk7XG4gICAgX3JlZiA9IGFycmF5LnNsaWNlKG4pO1xuICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgZWxlbSA9IF9yZWZbX2ldO1xuICAgICAgaGVhcHB1c2hwb3AocmVzdWx0LCBlbGVtLCBjbXApO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LnNvcnQoY21wKS5yZXZlcnNlKCk7XG4gIH07XG5cblxuICAvKlxuICBGaW5kIHRoZSBuIHNtYWxsZXN0IGVsZW1lbnRzIGluIGEgZGF0YXNldC5cbiAgICovXG5cbiAgbnNtYWxsZXN0ID0gZnVuY3Rpb24oYXJyYXksIG4sIGNtcCkge1xuICAgIHZhciBlbGVtLCBpLCBsb3MsIHJlc3VsdCwgX2ksIF9qLCBfbGVuLCBfcmVmLCBfcmVmMSwgX3Jlc3VsdHM7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBpZiAobiAqIDEwIDw9IGFycmF5Lmxlbmd0aCkge1xuICAgICAgcmVzdWx0ID0gYXJyYXkuc2xpY2UoMCwgbikuc29ydChjbXApO1xuICAgICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICBsb3MgPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdO1xuICAgICAgX3JlZiA9IGFycmF5LnNsaWNlKG4pO1xuICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICAgIGVsZW0gPSBfcmVmW19pXTtcbiAgICAgICAgaWYgKGNtcChlbGVtLCBsb3MpIDwgMCkge1xuICAgICAgICAgIGluc29ydChyZXN1bHQsIGVsZW0sIDAsIG51bGwsIGNtcCk7XG4gICAgICAgICAgcmVzdWx0LnBvcCgpO1xuICAgICAgICAgIGxvcyA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGhlYXBpZnkoYXJyYXksIGNtcCk7XG4gICAgX3Jlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSBfaiA9IDAsIF9yZWYxID0gbWluKG4sIGFycmF5Lmxlbmd0aCk7IDAgPD0gX3JlZjEgPyBfaiA8IF9yZWYxIDogX2ogPiBfcmVmMTsgaSA9IDAgPD0gX3JlZjEgPyArK19qIDogLS1faikge1xuICAgICAgX3Jlc3VsdHMucHVzaChoZWFwcG9wKGFycmF5LCBjbXApKTtcbiAgICB9XG4gICAgcmV0dXJuIF9yZXN1bHRzO1xuICB9O1xuXG4gIF9zaWZ0ZG93biA9IGZ1bmN0aW9uKGFycmF5LCBzdGFydHBvcywgcG9zLCBjbXApIHtcbiAgICB2YXIgbmV3aXRlbSwgcGFyZW50LCBwYXJlbnRwb3M7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBuZXdpdGVtID0gYXJyYXlbcG9zXTtcbiAgICB3aGlsZSAocG9zID4gc3RhcnRwb3MpIHtcbiAgICAgIHBhcmVudHBvcyA9IChwb3MgLSAxKSA+PiAxO1xuICAgICAgcGFyZW50ID0gYXJyYXlbcGFyZW50cG9zXTtcbiAgICAgIGlmIChjbXAobmV3aXRlbSwgcGFyZW50KSA8IDApIHtcbiAgICAgICAgYXJyYXlbcG9zXSA9IHBhcmVudDtcbiAgICAgICAgcG9zID0gcGFyZW50cG9zO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXlbcG9zXSA9IG5ld2l0ZW07XG4gIH07XG5cbiAgX3NpZnR1cCA9IGZ1bmN0aW9uKGFycmF5LCBwb3MsIGNtcCkge1xuICAgIHZhciBjaGlsZHBvcywgZW5kcG9zLCBuZXdpdGVtLCByaWdodHBvcywgc3RhcnRwb3M7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBlbmRwb3MgPSBhcnJheS5sZW5ndGg7XG4gICAgc3RhcnRwb3MgPSBwb3M7XG4gICAgbmV3aXRlbSA9IGFycmF5W3Bvc107XG4gICAgY2hpbGRwb3MgPSAyICogcG9zICsgMTtcbiAgICB3aGlsZSAoY2hpbGRwb3MgPCBlbmRwb3MpIHtcbiAgICAgIHJpZ2h0cG9zID0gY2hpbGRwb3MgKyAxO1xuICAgICAgaWYgKHJpZ2h0cG9zIDwgZW5kcG9zICYmICEoY21wKGFycmF5W2NoaWxkcG9zXSwgYXJyYXlbcmlnaHRwb3NdKSA8IDApKSB7XG4gICAgICAgIGNoaWxkcG9zID0gcmlnaHRwb3M7XG4gICAgICB9XG4gICAgICBhcnJheVtwb3NdID0gYXJyYXlbY2hpbGRwb3NdO1xuICAgICAgcG9zID0gY2hpbGRwb3M7XG4gICAgICBjaGlsZHBvcyA9IDIgKiBwb3MgKyAxO1xuICAgIH1cbiAgICBhcnJheVtwb3NdID0gbmV3aXRlbTtcbiAgICByZXR1cm4gX3NpZnRkb3duKGFycmF5LCBzdGFydHBvcywgcG9zLCBjbXApO1xuICB9O1xuXG4gIEhlYXAgPSAoZnVuY3Rpb24oKSB7XG4gICAgSGVhcC5wdXNoID0gaGVhcHB1c2g7XG5cbiAgICBIZWFwLnBvcCA9IGhlYXBwb3A7XG5cbiAgICBIZWFwLnJlcGxhY2UgPSBoZWFwcmVwbGFjZTtcblxuICAgIEhlYXAucHVzaHBvcCA9IGhlYXBwdXNocG9wO1xuXG4gICAgSGVhcC5oZWFwaWZ5ID0gaGVhcGlmeTtcblxuICAgIEhlYXAudXBkYXRlSXRlbSA9IHVwZGF0ZUl0ZW07XG5cbiAgICBIZWFwLm5sYXJnZXN0ID0gbmxhcmdlc3Q7XG5cbiAgICBIZWFwLm5zbWFsbGVzdCA9IG5zbWFsbGVzdDtcblxuICAgIGZ1bmN0aW9uIEhlYXAoY21wKSB7XG4gICAgICB0aGlzLmNtcCA9IGNtcCAhPSBudWxsID8gY21wIDogZGVmYXVsdENtcDtcbiAgICAgIHRoaXMubm9kZXMgPSBbXTtcbiAgICB9XG5cbiAgICBIZWFwLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGhlYXBwdXNoKHRoaXMubm9kZXMsIHgsIHRoaXMuY21wKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gaGVhcHBvcCh0aGlzLm5vZGVzLCB0aGlzLmNtcCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzWzBdO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzLmluZGV4T2YoeCkgIT09IC0xO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGhlYXByZXBsYWNlKHRoaXMubm9kZXMsIHgsIHRoaXMuY21wKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUucHVzaHBvcCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBoZWFwcHVzaHBvcCh0aGlzLm5vZGVzLCB4LCB0aGlzLmNtcCk7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLmhlYXBpZnkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBoZWFwaWZ5KHRoaXMubm9kZXMsIHRoaXMuY21wKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUudXBkYXRlSXRlbSA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB1cGRhdGVJdGVtKHRoaXMubm9kZXMsIHgsIHRoaXMuY21wKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzID0gW107XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlcy5sZW5ndGggPT09IDA7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzLmxlbmd0aDtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBoZWFwO1xuICAgICAgaGVhcCA9IG5ldyBIZWFwKCk7XG4gICAgICBoZWFwLm5vZGVzID0gdGhpcy5ub2Rlcy5zbGljZSgwKTtcbiAgICAgIHJldHVybiBoZWFwO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2Rlcy5zbGljZSgwKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuaW5zZXJ0ID0gSGVhcC5wcm90b3R5cGUucHVzaDtcblxuICAgIEhlYXAucHJvdG90eXBlLnRvcCA9IEhlYXAucHJvdG90eXBlLnBlZWs7XG5cbiAgICBIZWFwLnByb3RvdHlwZS5mcm9udCA9IEhlYXAucHJvdG90eXBlLnBlZWs7XG5cbiAgICBIZWFwLnByb3RvdHlwZS5oYXMgPSBIZWFwLnByb3RvdHlwZS5jb250YWlucztcblxuICAgIEhlYXAucHJvdG90eXBlLmNvcHkgPSBIZWFwLnByb3RvdHlwZS5jbG9uZTtcblxuICAgIHJldHVybiBIZWFwO1xuXG4gIH0pKCk7XG5cbiAgKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICByZXR1cm4gZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcm9vdC5IZWFwID0gZmFjdG9yeSgpO1xuICAgIH1cbiAgfSkodGhpcywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEhlYXA7XG4gIH0pO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwidmFyIGludDUzID0ge31cblxudmFyIE1BWF9VSU5UMzIgPSAweDAwMDAwMDAwRkZGRkZGRkZcbnZhciBNQVhfSU5UNTMgPSAgMHgwMDFGRkZGRkZGRkZGRkZGXG5cbmZ1bmN0aW9uIG9uZXNDb21wbGVtZW50KG51bWJlcikge1xuXHRudW1iZXIgPSB+bnVtYmVyXG5cdGlmIChudW1iZXIgPCAwKSB7XG5cdFx0bnVtYmVyID0gKG51bWJlciAmIDB4N0ZGRkZGRkYpICsgMHg4MDAwMDAwMFxuXHR9XG5cdHJldHVybiBudW1iZXJcbn1cblxuZnVuY3Rpb24gdWludEhpZ2hMb3cobnVtYmVyKSB7XG5cdGNvbnNvbGUuYXNzZXJ0KG51bWJlciA+IC0xICYmIG51bWJlciA8PSBNQVhfSU5UNTMsIFwibnVtYmVyIG91dCBvZiByYW5nZVwiKVxuXHRjb25zb2xlLmFzc2VydChNYXRoLmZsb29yKG51bWJlcikgPT09IG51bWJlciwgXCJudW1iZXIgbXVzdCBiZSBhbiBpbnRlZ2VyXCIpXG5cdHZhciBoaWdoID0gMFxuXHR2YXIgc2lnbmJpdCA9IG51bWJlciAmIDB4RkZGRkZGRkZcblx0dmFyIGxvdyA9IHNpZ25iaXQgPCAwID8gKG51bWJlciAmIDB4N0ZGRkZGRkYpICsgMHg4MDAwMDAwMCA6IHNpZ25iaXRcblx0aWYgKG51bWJlciA+IE1BWF9VSU5UMzIpIHtcblx0XHRoaWdoID0gKG51bWJlciAtIGxvdykgLyAoTUFYX1VJTlQzMiArIDEpXG5cdH1cblx0cmV0dXJuIFtoaWdoLCBsb3ddXG59XG5cbmZ1bmN0aW9uIGludEhpZ2hMb3cobnVtYmVyKSB7XG5cdGlmIChudW1iZXIgPiAtMSkge1xuXHRcdHJldHVybiB1aW50SGlnaExvdyhudW1iZXIpXG5cdH1cblx0dmFyIGhsID0gdWludEhpZ2hMb3coLW51bWJlcilcblx0dmFyIGhpZ2ggPSBvbmVzQ29tcGxlbWVudChobFswXSlcblx0dmFyIGxvdyA9IG9uZXNDb21wbGVtZW50KGhsWzFdKVxuXHRpZiAobG93ID09PSBNQVhfVUlOVDMyKSB7XG5cdFx0aGlnaCArPSAxXG5cdFx0bG93ID0gMFxuXHR9XG5cdGVsc2Uge1xuXHRcdGxvdyArPSAxXG5cdH1cblx0cmV0dXJuIFtoaWdoLCBsb3ddXG59XG5cbmZ1bmN0aW9uIHRvRG91YmxlKGhpZ2gsIGxvdywgc2lnbmVkKSB7XG5cdGlmIChzaWduZWQgJiYgKGhpZ2ggJiAweDgwMDAwMDAwKSAhPT0gMCkge1xuXHRcdGhpZ2ggPSBvbmVzQ29tcGxlbWVudChoaWdoKVxuXHRcdGxvdyA9IG9uZXNDb21wbGVtZW50KGxvdylcblx0XHRjb25zb2xlLmFzc2VydChoaWdoIDwgMHgwMDIwMDAwMCwgXCJudW1iZXIgdG9vIHNtYWxsXCIpXG5cdFx0cmV0dXJuIC0oKGhpZ2ggKiAoTUFYX1VJTlQzMiArIDEpKSArIGxvdyArIDEpXG5cdH1cblx0ZWxzZSB7IC8vcG9zaXRpdmVcblx0XHRjb25zb2xlLmFzc2VydChoaWdoIDwgMHgwMDIwMDAwMCwgXCJudW1iZXIgdG9vIGxhcmdlXCIpXG5cdFx0cmV0dXJuIChoaWdoICogKE1BWF9VSU5UMzIgKyAxKSkgKyBsb3dcblx0fVxufVxuXG5pbnQ1My5yZWFkSW50NjRCRSA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCkge1xuXHRvZmZzZXQgPSBvZmZzZXQgfHwgMFxuXHR2YXIgaGlnaCA9IGJ1ZmZlci5yZWFkVUludDMyQkUob2Zmc2V0KVxuXHR2YXIgbG93ID0gYnVmZmVyLnJlYWRVSW50MzJCRShvZmZzZXQgKyA0KVxuXHRyZXR1cm4gdG9Eb3VibGUoaGlnaCwgbG93LCB0cnVlKVxufVxuXG5pbnQ1My5yZWFkSW50NjRMRSA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCkge1xuXHRvZmZzZXQgPSBvZmZzZXQgfHwgMFxuXHR2YXIgbG93ID0gYnVmZmVyLnJlYWRVSW50MzJMRShvZmZzZXQpXG5cdHZhciBoaWdoID0gYnVmZmVyLnJlYWRVSW50MzJMRShvZmZzZXQgKyA0KVxuXHRyZXR1cm4gdG9Eb3VibGUoaGlnaCwgbG93LCB0cnVlKVxufVxuXG5pbnQ1My5yZWFkVUludDY0QkUgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQpIHtcblx0b2Zmc2V0ID0gb2Zmc2V0IHx8IDBcblx0dmFyIGhpZ2ggPSBidWZmZXIucmVhZFVJbnQzMkJFKG9mZnNldClcblx0dmFyIGxvdyA9IGJ1ZmZlci5yZWFkVUludDMyQkUob2Zmc2V0ICsgNClcblx0cmV0dXJuIHRvRG91YmxlKGhpZ2gsIGxvdywgZmFsc2UpXG59XG5cbmludDUzLnJlYWRVSW50NjRMRSA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCkge1xuXHRvZmZzZXQgPSBvZmZzZXQgfHwgMFxuXHR2YXIgbG93ID0gYnVmZmVyLnJlYWRVSW50MzJMRShvZmZzZXQpXG5cdHZhciBoaWdoID0gYnVmZmVyLnJlYWRVSW50MzJMRShvZmZzZXQgKyA0KVxuXHRyZXR1cm4gdG9Eb3VibGUoaGlnaCwgbG93LCBmYWxzZSlcbn1cblxuaW50NTMud3JpdGVJbnQ2NEJFID0gZnVuY3Rpb24gKG51bWJlciwgYnVmZmVyLCBvZmZzZXQpIHtcblx0b2Zmc2V0ID0gb2Zmc2V0IHx8IDBcblx0dmFyIGhsID0gaW50SGlnaExvdyhudW1iZXIpXG5cdGJ1ZmZlci53cml0ZVVJbnQzMkJFKGhsWzBdLCBvZmZzZXQpXG5cdGJ1ZmZlci53cml0ZVVJbnQzMkJFKGhsWzFdLCBvZmZzZXQgKyA0KVxufVxuXG5pbnQ1My53cml0ZUludDY0TEUgPSBmdW5jdGlvbiAobnVtYmVyLCBidWZmZXIsIG9mZnNldCkge1xuXHRvZmZzZXQgPSBvZmZzZXQgfHwgMFxuXHR2YXIgaGwgPSBpbnRIaWdoTG93KG51bWJlcilcblx0YnVmZmVyLndyaXRlVUludDMyTEUoaGxbMV0sIG9mZnNldClcblx0YnVmZmVyLndyaXRlVUludDMyTEUoaGxbMF0sIG9mZnNldCArIDQpXG59XG5cbmludDUzLndyaXRlVUludDY0QkUgPSBmdW5jdGlvbiAobnVtYmVyLCBidWZmZXIsIG9mZnNldCkge1xuXHRvZmZzZXQgPSBvZmZzZXQgfHwgMFxuXHR2YXIgaGwgPSB1aW50SGlnaExvdyhudW1iZXIpXG5cdGJ1ZmZlci53cml0ZVVJbnQzMkJFKGhsWzBdLCBvZmZzZXQpXG5cdGJ1ZmZlci53cml0ZVVJbnQzMkJFKGhsWzFdLCBvZmZzZXQgKyA0KVxufVxuXG5pbnQ1My53cml0ZVVJbnQ2NExFID0gZnVuY3Rpb24gKG51bWJlciwgYnVmZmVyLCBvZmZzZXQpIHtcblx0b2Zmc2V0ID0gb2Zmc2V0IHx8IDBcblx0dmFyIGhsID0gdWludEhpZ2hMb3cobnVtYmVyKVxuXHRidWZmZXIud3JpdGVVSW50MzJMRShobFsxXSwgb2Zmc2V0KVxuXHRidWZmZXIud3JpdGVVSW50MzJMRShobFswXSwgb2Zmc2V0ICsgNClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnQ1M1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBEdWUgdG8gdmFyaW91cyBicm93c2VyIGJ1Z3MsIHNvbWV0aW1lcyB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uIHdpbGwgYmUgdXNlZCBldmVuXG4gKiB3aGVuIHRoZSBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cy5cbiAqXG4gKiBOb3RlOlxuICpcbiAqICAgLSBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsXG4gKiAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzguXG4gKlxuICogICAtIENocm9tZSA5LTEwIGlzIG1pc3NpbmcgdGhlIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24uXG4gKlxuICogICAtIElFMTAgaGFzIGEgYnJva2VuIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhcnJheXMgb2ZcbiAqICAgICBpbmNvcnJlY3QgbGVuZ3RoIGluIHNvbWUgc2l0dWF0aW9ucy5cblxuICogV2UgZGV0ZWN0IHRoZXNlIGJ1Z2d5IGJyb3dzZXJzIGFuZCBzZXQgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYCB0byBgZmFsc2VgIHNvIHRoZXlcbiAqIGdldCB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uLCB3aGljaCBpcyBzbG93ZXIgYnV0IGJlaGF2ZXMgY29ycmVjdGx5LlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUICE9PSB1bmRlZmluZWRcbiAgPyBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVFxuICA6IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuLypcbiAqIEV4cG9ydCBrTWF4TGVuZ3RoIGFmdGVyIHR5cGVkIGFycmF5IHN1cHBvcnQgaXMgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0cy5rTWF4TGVuZ3RoID0ga01heExlbmd0aCgpXG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBhcnIuX19wcm90b19fID0ge19fcHJvdG9fXzogVWludDhBcnJheS5wcm90b3R5cGUsIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfX1cbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MiAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoa01heExlbmd0aCgpIDwgbGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICBpZiAodGhhdCA9PT0gbnVsbCkge1xuICAgICAgdGhhdCA9IG5ldyBCdWZmZXIobGVuZ3RoKVxuICAgIH1cbiAgICB0aGF0Lmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0lmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUodGhpcywgYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKHRoaXMsIGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuLy8gVE9ETzogTGVnYWN5LCBub3QgbmVlZGVkIGFueW1vcmUuIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb24uXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gZnJvbSAodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHRoYXQsIHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKG51bGwsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbmlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICBCdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG4gIEJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgICAgQnVmZmVyW1N5bWJvbC5zcGVjaWVzXSA9PT0gQnVmZmVyKSB7XG4gICAgLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAodGhhdCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2MobnVsbCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlICh0aGF0LCBzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICB0aGF0W2ldID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHRoYXQsIHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJlbmNvZGluZ1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgZW5jb2RpbmcnKVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuXG4gIHZhciBhY3R1YWwgPSB0aGF0LndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICB0aGF0ID0gdGhhdC5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlICh0aGF0LCBhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyICh0aGF0LCBhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGFycmF5LmJ5dGVMZW5ndGggLy8gdGhpcyB0aHJvd3MgaWYgYGFycmF5YCBpcyBub3QgYSB2YWxpZCBBcnJheUJ1ZmZlclxuXG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdvZmZzZXRcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2xlbmd0aFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gYXJyYXlcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgdGhhdCA9IGZyb21BcnJheUxpa2UodGhhdCwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAodGhhdCwgb2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIHZhciBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuKVxuXG4gICAgaWYgKHRoYXQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhhdFxuICAgIH1cblxuICAgIG9iai5jb3B5KHRoYXQsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gdGhhdFxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBpc25hbihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBpc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBrTWF4TGVuZ3RoKClgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0ga01heExlbmd0aCgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgoKS50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJlxuICAgICAgICB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICAvLyBsZWdhY3kgd3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpIC0gcmVtb3ZlIGluIHYwLjEzXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgdmFyIHJlcyA9IFtdXG5cbiAgdmFyIGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIHZhciBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICB2YXIgY29kZVBvaW50ID0gbnVsbFxuICAgIHZhciBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERikgPyAzXG4gICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKSA/IDJcbiAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgdmFyIHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxudmFyIE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICB2YXIgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICB2YXIgcmVzID0gJydcbiAgdmFyIGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47ICsraSkge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgdmFyIG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGlzbmFuICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuIiwidmFyIHNjb3BlID0gKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsKSB8fFxuICAgICAgICAgICAgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYpIHx8XG4gICAgICAgICAgICB3aW5kb3c7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkge1xuICBpZiAodGltZW91dCkge1xuICAgIHRpbWVvdXQuY2xvc2UoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbChzY29wZSwgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG4vLyBPbiBzb21lIGV4b3RpYyBlbnZpcm9ubWVudHMsIGl0J3Mgbm90IGNsZWFyIHdoaWNoIG9iamVjdCBgc2V0aW1tZWRpYXRlYCB3YXNcbi8vIGFibGUgdG8gaW5zdGFsbCBvbnRvLiAgU2VhcmNoIGVhY2ggcG9zc2liaWxpdHkgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlXG4vLyBgc2V0aW1tZWRpYXRlYCBsaWJyYXJ5LlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuc2V0SW1tZWRpYXRlKTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5jbGVhckltbWVkaWF0ZSk7XG4iLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoIChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHsgVGltZSwgQ2FsbGJhY2ssIEZpbGVsaWtlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuaW1wb3J0IHsgcGFyc2VIZWFkZXIgfSBmcm9tIFwiLi9oZWFkZXJcIjtcbmltcG9ydCBubWVyZ2UgZnJvbSBcIi4vbm1lcmdlXCI7XG5pbXBvcnQgeyBSZWNvcmQsIEJhZ0hlYWRlciwgQ2h1bmssIENodW5rSW5mbywgQ29ubmVjdGlvbiwgSW5kZXhEYXRhLCBNZXNzYWdlRGF0YSB9IGZyb20gXCIuL3JlY29yZFwiO1xuaW1wb3J0ICogYXMgVGltZVV0aWwgZnJvbSBcIi4vVGltZVV0aWxcIjtcblxuaW50ZXJmYWNlIENodW5rUmVhZFJlc3VsdCB7XG4gIGNodW5rOiBDaHVuaztcbiAgaW5kaWNlczogSW5kZXhEYXRhW107XG59XG5cbmV4cG9ydCB0eXBlIERlY29tcHJlc3MgPSB7XG4gIFtjb21wcmVzc2lvbjogc3RyaW5nXTogKGJ1ZmZlcjogQnVmZmVyLCBzaXplOiBudW1iZXIpID0+IEJ1ZmZlcixcbn07XG5cbmNvbnN0IEhFQURFUl9SRUFEQUhFQUQgPSA0MDk2O1xuY29uc3QgSEVBREVSX09GRlNFVCA9IDEzO1xuXG4vLyBCYWdSZWFkZXIgaXMgYSBsb3dlciBsZXZlbCBpbnRlcmZhY2UgZm9yIHJlYWRpbmcgc3BlY2lmaWMgc2VjdGlvbnMgJiBjaHVua3Ncbi8vIGZyb20gYSByb3NiYWcgZmlsZSAtIGdlbmVyYWxseSBpdCBpcyBjb25zdW1lZCB0aHJvdWdoIHRoZSBCYWcgY2xhc3MsIGJ1dFxuLy8gY2FuIGJlIHVzZWZ1bCB0byB1c2UgZGlyZWN0bHkgZm9yIGVmZmljaWVudGx5IGFjY2Vzc2luZyByYXcgcGllY2VzIGZyb21cbi8vIHdpdGhpbiB0aGUgYmFnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWdSZWFkZXIge1xuICBfbGFzdFJlYWRSZXN1bHQ6IENodW5rUmVhZFJlc3VsdDtcbiAgX2ZpbGU6IEZpbGVsaWtlO1xuICBfbGFzdENodW5rSW5mbzogP0NodW5rSW5mbztcblxuICBjb25zdHJ1Y3RvcihmaWxlbGlrZTogRmlsZWxpa2UpIHtcbiAgICB0aGlzLl9maWxlID0gZmlsZWxpa2U7XG4gICAgdGhpcy5fbGFzdENodW5rSW5mbyA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZlcmlmeUJhZ0hlYWRlcihjYWxsYmFjazogQ2FsbGJhY2s8QmFnSGVhZGVyPiwgbmV4dDogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuX2ZpbGUucmVhZCgwLCBIRUFERVJfT0ZGU0VULCAoZXJyb3I6IEVycm9yIHwgbnVsbCwgYnVmZmVyPzogQnVmZmVyKSA9PiB7XG4gICAgICBpZiAoZXJyb3IgfHwgIWJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IgfHwgbmV3IEVycm9yKFwiTWlzc2luZyBib3RoIGVycm9yIGFuZCBidWZmZXJcIikpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZmlsZS5zaXplKCkgPCBIRUFERVJfT0ZGU0VUKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJNaXNzaW5nIGZpbGUgaGVhZGVyLlwiKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChidWZmZXIudG9TdHJpbmcoKSAhPT0gXCIjUk9TQkFHIFYyLjBcXG5cIikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKFwiQ2Fubm90IGlkZW50aWZ5IGJhZyBmb3JtYXQuXCIpKTtcbiAgICAgIH1cbiAgICAgIG5leHQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlYWRzIHRoZSBoZWFkZXIgYmxvY2sgZnJvbSB0aGUgcm9zYmFnIGZpbGVcbiAgLy8gZ2VuZXJhbGx5IHlvdSBjYWxsIHRoaXMgZmlyc3RcbiAgLy8gYmVjYXVzZSB5b3UgbmVlZCB0aGUgaGVhZGVyIGluZm9ybWF0aW9uIHRvIGNhbGwgcmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvXG4gIHJlYWRIZWFkZXIoY2FsbGJhY2s6IENhbGxiYWNrPEJhZ0hlYWRlcj4pIHtcbiAgICB0aGlzLnZlcmlmeUJhZ0hlYWRlcihjYWxsYmFjaywgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2ZpbGUucmVhZChIRUFERVJfT0ZGU0VULCBIRUFERVJfUkVBREFIRUFELCAoZXJyb3I6IEVycm9yIHwgbnVsbCwgYnVmZmVyPzogQnVmZmVyKSA9PiB7XG4gICAgICAgIGlmIChlcnJvciB8fCAhYnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9yIHx8IG5ldyBFcnJvcihcIk1pc3NpbmcgYm90aCBlcnJvciBhbmQgYnVmZmVyXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlYWQgPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICBpZiAocmVhZCA8IDgpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKGBSZWNvcmQgYXQgcG9zaXRpb24gJHtIRUFERVJfT0ZGU0VUfSBpcyB0cnVuY2F0ZWQuYCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaGVhZGVyTGVuZ3RoID0gYnVmZmVyLnJlYWRJbnQzMkxFKDApO1xuICAgICAgICBpZiAocmVhZCA8IGhlYWRlckxlbmd0aCArIDgpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKGBSZWNvcmQgYXQgcG9zaXRpb24gJHtIRUFERVJfT0ZGU0VUfSBoZWFkZXIgdG9vIGxhcmdlOiAke2hlYWRlckxlbmd0aH0uYCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMucmVhZFJlY29yZEZyb21CdWZmZXIoYnVmZmVyLCBIRUFERVJfT0ZGU0VULCBCYWdIZWFkZXIpO1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgaGVhZGVyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcHJvbWlzaWZpZWQgdmVyc2lvbiBvZiByZWFkSGVhZGVyXG4gIHJlYWRIZWFkZXJBc3luYygpOiBQcm9taXNlPEJhZ0hlYWRlcj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgdGhpcy5yZWFkSGVhZGVyKChlcnI6IEVycm9yIHwgbnVsbCwgaGVhZGVyPzogQmFnSGVhZGVyKSA9PiAoZXJyIHx8ICFoZWFkZXIgPyByZWplY3QoZXJyKSA6IHJlc29sdmUoaGVhZGVyKSkpXG4gICAgKTtcbiAgfVxuXG4gIC8vIHJlYWRzIGNvbm5lY3Rpb24gYW5kIGNodW5rIGluZm9ybWF0aW9uIGZyb20gdGhlIGJhZ1xuICAvLyB5b3UnbGwgZ2VuZXJhbGx5IGNhbGwgdGhpcyBhZnRlciByZWFkaW5nIHRoZSBoZWFkZXIgc28geW91IGNhbiBnZXRcbiAgLy8gY29ubmVjdGlvbiBtZXRhZGF0YSBhbmQgY2h1bmtJbmZvcyB3aGljaCBhbGxvdyB5b3UgdG8gc2VlayB0byBpbmRpdmlkdWFsXG4gIC8vIGNodW5rcyAmIHJlYWQgdGhlbVxuICByZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm8oXG4gICAgZmlsZU9mZnNldDogbnVtYmVyLFxuICAgIGNvbm5lY3Rpb25Db3VudDogbnVtYmVyLFxuICAgIGNodW5rQ291bnQ6IG51bWJlcixcbiAgICBjYWxsYmFjazogQ2FsbGJhY2s8eyBjb25uZWN0aW9uczogQ29ubmVjdGlvbltdLCBjaHVua0luZm9zOiBDaHVua0luZm9bXSB9PlxuICApIHtcbiAgICB0aGlzLl9maWxlLnJlYWQoZmlsZU9mZnNldCwgdGhpcy5fZmlsZS5zaXplKCkgLSBmaWxlT2Zmc2V0LCAoZXJyOiBFcnJvciB8IG51bGwsIGJ1ZmZlcj86IEJ1ZmZlcikgPT4ge1xuICAgICAgaWYgKGVyciB8fCAhYnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIgfHwgbmV3IEVycm9yKFwiTWlzc2luZyBib3RoIGVycm9yIGFuZCBidWZmZXJcIikpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29ubmVjdGlvbkNvdW50ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB7IGNvbm5lY3Rpb25zOiBbXSwgY2h1bmtJbmZvczogW10gfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbm5lY3Rpb25zID0gdGhpcy5yZWFkUmVjb3Jkc0Zyb21CdWZmZXIoYnVmZmVyLCBjb25uZWN0aW9uQ291bnQsIGZpbGVPZmZzZXQsIENvbm5lY3Rpb24pO1xuICAgICAgY29uc3QgY29ubmVjdGlvbkJsb2NrTGVuZ3RoID0gY29ubmVjdGlvbnNbY29ubmVjdGlvbkNvdW50IC0gMV0uZW5kIC0gY29ubmVjdGlvbnNbMF0ub2Zmc2V0O1xuICAgICAgY29uc3QgY2h1bmtJbmZvcyA9IHRoaXMucmVhZFJlY29yZHNGcm9tQnVmZmVyKFxuICAgICAgICBidWZmZXIuc2xpY2UoY29ubmVjdGlvbkJsb2NrTGVuZ3RoKSxcbiAgICAgICAgY2h1bmtDb3VudCxcbiAgICAgICAgZmlsZU9mZnNldCArIGNvbm5lY3Rpb25CbG9ja0xlbmd0aCxcbiAgICAgICAgQ2h1bmtJbmZvXG4gICAgICApO1xuXG4gICAgICBpZiAoY2h1bmtDb3VudCA+IDApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaHVua0NvdW50IC0gMTsgaSsrKSB7XG4gICAgICAgICAgY2h1bmtJbmZvc1tpXS5uZXh0Q2h1bmsgPSBjaHVua0luZm9zW2kgKyAxXTtcbiAgICAgICAgfVxuICAgICAgICBjaHVua0luZm9zW2NodW5rQ291bnQgLSAxXS5uZXh0Q2h1bmsgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2FsbGJhY2sobnVsbCwgeyBjb25uZWN0aW9ucywgY2h1bmtJbmZvcyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHByb21pc2lmaWVkIHZlcnNpb24gb2YgcmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvXG4gIHJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mb0FzeW5jKFxuICAgIGZpbGVPZmZzZXQ6IG51bWJlcixcbiAgICBjb25uZWN0aW9uQ291bnQ6IG51bWJlcixcbiAgICBjaHVua0NvdW50OiBudW1iZXJcbiAgKTogUHJvbWlzZTx7IGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW10sIGNodW5rSW5mb3M6IENodW5rSW5mb1tdIH0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5yZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm8oXG4gICAgICAgIGZpbGVPZmZzZXQsXG4gICAgICAgIGNvbm5lY3Rpb25Db3VudCxcbiAgICAgICAgY2h1bmtDb3VudCxcbiAgICAgICAgKGVycjogRXJyb3IgfCBudWxsLCByZXN1bHQ/OiB7IGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW10sIGNodW5rSW5mb3M6IENodW5rSW5mb1tdIH0pID0+XG4gICAgICAgICAgZXJyIHx8ICFyZXN1bHQgPyByZWplY3QoZXJyKSA6IHJlc29sdmUocmVzdWx0KVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlYWQgaW5kaXZpZHVhbCByYXcgbWVzc2FnZXMgZnJvbSB0aGUgYmFnIGF0IGEgZ2l2ZW4gY2h1bmtcbiAgLy8gZmlsdGVycyB0byBhIHNwZWNpZmljIHNldCBvZiBjb25uZWN0aW9uIGlkcywgc3RhcnQgdGltZSwgJiBlbmQgdGltZVxuICAvLyBnZW5lcmFsbHkgdGhlIHJlY29yZHMgd2lsbCBiZSBvZiB0eXBlIE1lc3NhZ2VEYXRhXG4gIHJlYWRDaHVua01lc3NhZ2VzKFxuICAgIGNodW5rSW5mbzogQ2h1bmtJbmZvLFxuICAgIGNvbm5lY3Rpb25zOiBudW1iZXJbXSxcbiAgICBzdGFydFRpbWU6IFRpbWUgfCBudWxsLFxuICAgIGVuZFRpbWU6IFRpbWUgfCBudWxsLFxuICAgIGRlY29tcHJlc3M6IERlY29tcHJlc3MsXG4gICAgY2FsbGJhY2s6IENhbGxiYWNrPE1lc3NhZ2VEYXRhW10+XG4gICkge1xuICAgIGNvbnN0IHN0YXJ0ID0gc3RhcnRUaW1lIHx8IHsgc2VjOiAwLCBuc2VjOiAwIH07XG4gICAgY29uc3QgZW5kID0gZW5kVGltZSB8fCB7IHNlYzogTnVtYmVyLk1BWF9WQUxVRSwgbnNlYzogTnVtYmVyLk1BWF9WQUxVRSB9O1xuICAgIGNvbnN0IGNvbm5zID1cbiAgICAgIGNvbm5lY3Rpb25zIHx8XG4gICAgICBjaHVua0luZm8uY29ubmVjdGlvbnMubWFwKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBjb25uZWN0aW9uLmNvbm47XG4gICAgICB9KTtcblxuICAgIHRoaXMucmVhZENodW5rKGNodW5rSW5mbywgZGVjb21wcmVzcywgKGVycm9yOiBFcnJvciB8IG51bGwsIHJlc3VsdD86IENodW5rUmVhZFJlc3VsdCkgPT4ge1xuICAgICAgaWYgKGVycm9yIHx8ICFyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycm9yIHx8IG5ldyBFcnJvcihcIk1pc3NpbmcgYm90aCBlcnJvciBhbmQgcmVzdWx0XCIpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2h1bmsgPSByZXN1bHQuY2h1bms7XG4gICAgICBjb25zdCBpbmRpY2VzOiB7IFtjb25uOiBudW1iZXJdOiBJbmRleERhdGEgfSA9IHt9O1xuICAgICAgcmVzdWx0LmluZGljZXMuZm9yRWFjaCgoaW5kZXgpID0+IHtcbiAgICAgICAgaW5kaWNlc1tpbmRleC5jb25uXSA9IGluZGV4O1xuICAgICAgfSk7XG4gICAgICBjb25zdCBwcmVzZW50Q29ubmVjdGlvbnMgPSBjb25ucy5maWx0ZXIoKGNvbm4pID0+IHtcbiAgICAgICAgcmV0dXJuIGluZGljZXNbY29ubl0gIT09IHVuZGVmaW5lZDtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaXRlcmFibGVzID0gcHJlc2VudENvbm5lY3Rpb25zLm1hcCgoY29ubikgPT4ge1xuICAgICAgICAvLyAkRmxvd0ZpeE1lIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8xMTYzXG4gICAgICAgIHJldHVybiBpbmRpY2VzW2Nvbm5dLmluZGljZXNbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vbWVzc2FnZXMgc2hvdWxkIGJlIG1lcmdlIGJ5IGZpbGUgb2Zmc2V0IHNvIHRoZSBtZXNzYWdlcyBhcmUgcmVwbGF5ZWQgaW5cbiAgICAgIC8vIHRoZWlyIG9yaWdpbmFsIG9yZGVyLCBzaW1pbGFyIHRvICdyb3NiYWcgcGxheSdcbiAgICAgIGNvbnN0IGl0ZXIgPSBubWVyZ2UoKGEsIGIpID0+IGEub2Zmc2V0IC0gYi5vZmZzZXQsIC4uLml0ZXJhYmxlcyk7XG5cbiAgICAgIGNvbnN0IGVudHJpZXMgPSBbXTtcbiAgICAgIGxldCBpdGVtID0gaXRlci5uZXh0KCk7XG4gICAgICB3aGlsZSAoIWl0ZW0uZG9uZSkge1xuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBpdGVtO1xuICAgICAgICBpdGVtID0gaXRlci5uZXh0KCk7XG4gICAgICAgIGlmICghdmFsdWUgfHwgVGltZVV0aWwuaXNHcmVhdGVyVGhhbihzdGFydCwgdmFsdWUudGltZSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoVGltZVV0aWwuaXNHcmVhdGVyVGhhbih2YWx1ZS50aW1lLCBlbmQpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZW50cmllcy5wdXNoKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBlbnRyaWVzLm1hcCgoZW50cnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZFJlY29yZEZyb21CdWZmZXIoY2h1bmsuZGF0YS5zbGljZShlbnRyeS5vZmZzZXQpLCBjaHVuay5kYXRhT2Zmc2V0LCBNZXNzYWdlRGF0YSk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIG1lc3NhZ2VzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHByb21pc2lmaWVkIHZlcnNpb24gb2YgcmVhZENodW5rTWVzc2FnZXNcbiAgcmVhZENodW5rTWVzc2FnZXNBc3luYyhcbiAgICBjaHVua0luZm86IENodW5rSW5mbyxcbiAgICBjb25uZWN0aW9uczogbnVtYmVyW10sXG4gICAgc3RhcnRUaW1lOiBUaW1lLFxuICAgIGVuZFRpbWU6IFRpbWUsXG4gICAgZGVjb21wcmVzczogRGVjb21wcmVzc1xuICApOiBQcm9taXNlPE1lc3NhZ2VEYXRhW10+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5yZWFkQ2h1bmtNZXNzYWdlcyhcbiAgICAgICAgY2h1bmtJbmZvLFxuICAgICAgICBjb25uZWN0aW9ucyxcbiAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICBlbmRUaW1lLFxuICAgICAgICBkZWNvbXByZXNzLFxuICAgICAgICAoZXJyOiBFcnJvciB8IG51bGwsIG1lc3NhZ2VzPzogTWVzc2FnZURhdGFbXSkgPT4gKGVyciB8fCAhbWVzc2FnZXMgPyByZWplY3QoZXJyKSA6IHJlc29sdmUobWVzc2FnZXMpKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlYWRzIGEgc2luZ2xlIGNodW5rIHJlY29yZCAmJiBpdHMgaW5kZXggcmVjb3JkcyBnaXZlbiBhIGNodW5rSW5mb1xuICByZWFkQ2h1bmsoY2h1bmtJbmZvOiBDaHVua0luZm8sIGRlY29tcHJlc3M6IERlY29tcHJlc3MsIGNhbGxiYWNrOiBDYWxsYmFjazxDaHVua1JlYWRSZXN1bHQ+KSB7XG4gICAgLy8gaWYgd2UncmUgcmVhZGluZyB0aGUgc2FtZSBjaHVuayBhIHNlY29uZCB0aW1lIHJldHVybiB0aGUgY2FjaGVkIHZlcnNpb25cbiAgICAvLyB0byBhdm9pZCBkb2luZyBkZWNvbXByZXNzaW9uIG9uIHRoZSBzYW1lIGNodW5rIG11bHRpcGxlIHRpbWVzIHdoaWNoIGlzXG4gICAgLy8gZXhwZW5zaXZlXG4gICAgaWYgKGNodW5rSW5mbyA9PT0gdGhpcy5fbGFzdENodW5rSW5mbyAmJiB0aGlzLl9sYXN0UmVhZFJlc3VsdCkge1xuICAgICAgLy8gYWx3YXlzIGNhbGxiYWNrIGFzeW5jLCBldmVuIGlmIHdlIGhhdmUgdGhlIHJlc3VsdFxuICAgICAgLy8gaHR0cHM6Ly9vcmVuLmdpdGh1Yi5pby9ibG9nL3phbGdvLmh0bWxcbiAgICAgIGNvbnN0IGxhc3RSZWFkUmVzdWx0ID0gdGhpcy5fbGFzdFJlYWRSZXN1bHQ7XG4gICAgICByZXR1cm4gc2V0SW1tZWRpYXRlKCgpID0+IGNhbGxiYWNrKG51bGwsIGxhc3RSZWFkUmVzdWx0KSk7XG4gICAgfVxuICAgIGNvbnN0IHsgbmV4dENodW5rIH0gPSBjaHVua0luZm87XG5cbiAgICBjb25zdCByZWFkTGVuZ3RoID0gbmV4dENodW5rXG4gICAgICA/IG5leHRDaHVuay5jaHVua1Bvc2l0aW9uIC0gY2h1bmtJbmZvLmNodW5rUG9zaXRpb25cbiAgICAgIDogdGhpcy5fZmlsZS5zaXplKCkgLSBjaHVua0luZm8uY2h1bmtQb3NpdGlvbjtcblxuICAgIHRoaXMuX2ZpbGUucmVhZChjaHVua0luZm8uY2h1bmtQb3NpdGlvbiwgcmVhZExlbmd0aCwgKGVycjogRXJyb3IgfCBudWxsLCBidWZmZXI/OiBCdWZmZXIpID0+IHtcbiAgICAgIGlmIChlcnIgfHwgIWJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyIHx8IG5ldyBFcnJvcihcIk1pc3NpbmcgYm90aCBlcnJvciBhbmQgYnVmZmVyXCIpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2h1bmsgPSB0aGlzLnJlYWRSZWNvcmRGcm9tQnVmZmVyKGJ1ZmZlciwgY2h1bmtJbmZvLmNodW5rUG9zaXRpb24sIENodW5rKTtcbiAgICAgIGNvbnN0IHsgY29tcHJlc3Npb24gfSA9IGNodW5rO1xuICAgICAgaWYgKGNvbXByZXNzaW9uICE9PSBcIm5vbmVcIikge1xuICAgICAgICBjb25zdCBkZWNvbXByZXNzRm4gPSBkZWNvbXByZXNzW2NvbXByZXNzaW9uXTtcbiAgICAgICAgaWYgKCFkZWNvbXByZXNzRm4pIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEVycm9yKGBVbnN1cHBvcnRlZCBjb21wcmVzc2lvbiB0eXBlICR7Y2h1bmsuY29tcHJlc3Npb259YCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGRlY29tcHJlc3NGbihjaHVuay5kYXRhLCBjaHVuay5zaXplKTtcbiAgICAgICAgY2h1bmsuZGF0YSA9IHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluZGljZXMgPSB0aGlzLnJlYWRSZWNvcmRzRnJvbUJ1ZmZlcihcbiAgICAgICAgYnVmZmVyLnNsaWNlKGNodW5rLmxlbmd0aCksXG4gICAgICAgIGNodW5rSW5mby5jb3VudCxcbiAgICAgICAgY2h1bmtJbmZvLmNodW5rUG9zaXRpb24gKyBjaHVuay5sZW5ndGgsXG4gICAgICAgIEluZGV4RGF0YVxuICAgICAgKTtcblxuICAgICAgdGhpcy5fbGFzdENodW5rSW5mbyA9IGNodW5rSW5mbztcbiAgICAgIHRoaXMuX2xhc3RSZWFkUmVzdWx0ID0geyBjaHVuaywgaW5kaWNlcyB9O1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHRoaXMuX2xhc3RSZWFkUmVzdWx0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHJlYWRzIGNvdW50IHJlY29yZHMgZnJvbSBhIGJ1ZmZlciBzdGFydGluZyBhdCBmaWxlT2Zmc2V0XG4gIHJlYWRSZWNvcmRzRnJvbUJ1ZmZlcjxUOiBSZWNvcmQ+KFxuICAgIGJ1ZmZlcjogQnVmZmVyLFxuICAgIGNvdW50OiBudW1iZXIsXG4gICAgZmlsZU9mZnNldDogbnVtYmVyLFxuICAgIGNsczogQ2xhc3M8VD4gJiB7IG9wY29kZTogbnVtYmVyIH1cbiAgKTogVFtdIHtcbiAgICBjb25zdCByZWNvcmRzID0gW107XG4gICAgbGV0IGJ1ZmZlck9mZnNldCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCByZWNvcmQgPSB0aGlzLnJlYWRSZWNvcmRGcm9tQnVmZmVyKGJ1ZmZlci5zbGljZShidWZmZXJPZmZzZXQpLCBmaWxlT2Zmc2V0ICsgYnVmZmVyT2Zmc2V0LCBjbHMpO1xuICAgICAgYnVmZmVyT2Zmc2V0ICs9IHJlY29yZC5lbmQgLSByZWNvcmQub2Zmc2V0O1xuICAgICAgcmVjb3Jkcy5wdXNoKHJlY29yZCk7XG4gICAgfVxuICAgIHJldHVybiByZWNvcmRzO1xuICB9XG5cbiAgLy8gcmVhZCBhbiBpbmRpdmlkdWFsIHJlY29yZCBmcm9tIGEgYnVmZmVyXG4gIHJlYWRSZWNvcmRGcm9tQnVmZmVyPFQ6IFJlY29yZD4oYnVmZmVyOiBCdWZmZXIsIGZpbGVPZmZzZXQ6IG51bWJlciwgY2xzOiBDbGFzczxUPiAmIHsgb3Bjb2RlOiBudW1iZXIgfSk6IFQge1xuICAgIGNvbnN0IGhlYWRlckxlbmd0aCA9IGJ1ZmZlci5yZWFkSW50MzJMRSgwKTtcbiAgICBjb25zdCByZWNvcmQgPSBwYXJzZUhlYWRlcihidWZmZXIuc2xpY2UoNCwgNCArIGhlYWRlckxlbmd0aCksIGNscyk7XG5cbiAgICBjb25zdCBkYXRhT2Zmc2V0ID0gNCArIGhlYWRlckxlbmd0aCArIDQ7XG4gICAgY29uc3QgZGF0YUxlbmd0aCA9IGJ1ZmZlci5yZWFkSW50MzJMRSg0ICsgaGVhZGVyTGVuZ3RoKTtcbiAgICBjb25zdCBkYXRhID0gYnVmZmVyLnNsaWNlKGRhdGFPZmZzZXQsIGRhdGFPZmZzZXQgKyBkYXRhTGVuZ3RoKTtcblxuICAgIHJlY29yZC5wYXJzZURhdGEoZGF0YSk7XG5cbiAgICByZWNvcmQub2Zmc2V0ID0gZmlsZU9mZnNldDtcbiAgICByZWNvcmQuZGF0YU9mZnNldCA9IHJlY29yZC5vZmZzZXQgKyA0ICsgaGVhZGVyTGVuZ3RoICsgNDtcbiAgICByZWNvcmQuZW5kID0gcmVjb3JkLmRhdGFPZmZzZXQgKyBkYXRhTGVuZ3RoO1xuICAgIHJlY29yZC5sZW5ndGggPSByZWNvcmQuZW5kIC0gcmVjb3JkLm9mZnNldDtcblxuICAgIHJldHVybiByZWNvcmQ7XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCBpbnQ1MyBmcm9tIFwiaW50NTNcIjtcbmltcG9ydCB7IGV4dHJhY3RUaW1lIH0gZnJvbSBcIi4vZmllbGRzXCI7XG5pbXBvcnQgeyBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uLCB0eXBlIFJvc01zZ0RlZmluaXRpb24sIHR5cGUgTmFtZWRSb3NNc2dEZWZpbml0aW9uIH0gZnJvbSBcIi4vcGFyc2VNZXNzYWdlRGVmaW5pdGlvblwiO1xuXG50eXBlIFR5cGVkQXJyYXlDb25zdHJ1Y3RvciA9IChcbiAgYnVmZmVyOiBBcnJheUJ1ZmZlcixcbiAgYnl0ZU9mZnNldDogbnVtYmVyLFxuICBsZW5ndGg6IG51bWJlclxuKSA9PlxuICB8IEludDhBcnJheVxuICB8IFVpbnQ4QXJyYXlcbiAgfCBJbnQxNkFycmF5XG4gIHwgVWludDE2QXJyYXlcbiAgfCBJbnQzMkFycmF5XG4gIHwgVWludDMyQXJyYXlcbiAgfCBVaW50OENsYW1wZWRBcnJheVxuICB8IEZsb2F0MzJBcnJheVxuICB8IEZsb2F0NjRBcnJheTtcblxuLy8gdGhpcyBoYXMgaGFyZC1jb2RlZCBidWZmZXIgcmVhZGluZyBmdW5jdGlvbnMgZm9yIGVhY2hcbi8vIG9mIHRoZSBzdGFuZGFyZCBtZXNzYWdlIHR5cGVzIGh0dHA6Ly9kb2NzLnJvcy5vcmcvYXBpL3N0ZF9tc2dzL2h0bWwvaW5kZXgtbXNnLmh0bWxcbi8vIGV2ZW50dWFsbHkgY3VzdG9tIHR5cGVzIGRlY29tcG9zZSBpbnRvIHRoZXNlIHN0YW5kYXJkIHR5cGVzXG5jbGFzcyBTdGFuZGFyZFR5cGVSZWFkZXIge1xuICBidWZmZXI6IEJ1ZmZlcjtcbiAgb2Zmc2V0OiBudW1iZXI7XG4gIHZpZXc6IERhdGFWaWV3O1xuXG4gIGNvbnN0cnVjdG9yKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgIHRoaXMudmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIuYnVmZmVyLCBidWZmZXIuYnl0ZU9mZnNldCk7XG4gIH1cblxuICBzdHJpbmcoKSB7XG4gICAgY29uc3QgbGVuID0gdGhpcy5pbnQzMigpO1xuICAgIGNvbnN0IGNvZGVQb2ludHMgPSBuZXcgVWludDhBcnJheSh0aGlzLmJ1ZmZlci5idWZmZXIsIHRoaXMuYnVmZmVyLmJ5dGVPZmZzZXQgKyB0aGlzLm9mZnNldCwgbGVuKTtcbiAgICB0aGlzLm9mZnNldCArPSBsZW47XG4gICAgLy8gaWYgdGhlIHN0cmluZyBpcyByZWxhdGl2ZWx5IHNob3J0IHdlIGNhbiB1c2UgYXBwbHlcbiAgICAvLyBidXQgdmVyeSBsb25nIHN0cmluZ3MgY2FuIGNhdXNlIGEgc3RhY2sgb3ZlcmZsb3cgZHVlIHRvIHRvbyBtYW55IGFyZ3VtZW50c1xuICAgIC8vIGluIHRob3NlIGNhc2VzIHJldmVydCB0byBhIHNsb3dlciBpdHRlcmF0aXZlIHN0cmluZyBidWlsZGluZyBhcHByb2FjaFxuICAgIGlmIChjb2RlUG9pbnRzLmxlbmd0aCA8IDEwMDApIHtcbiAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGNvZGVQb2ludHMpO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gXCJcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBkYXRhICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZVBvaW50c1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgYm9vbCgpIHtcbiAgICByZXR1cm4gdGhpcy51aW50OCgpICE9PSAwO1xuICB9XG5cbiAgaW50OCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldEludDgodGhpcy5vZmZzZXQrKyk7XG4gIH1cblxuICB1aW50OCgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3LmdldFVpbnQ4KHRoaXMub2Zmc2V0KyspO1xuICB9XG5cbiAgdHlwZWRBcnJheShsZW46ID9udW1iZXIsIGFycmF5VHlwZTogVHlwZWRBcnJheUNvbnN0cnVjdG9yKSB7XG4gICAgY29uc3QgYXJyYXlMZW5ndGggPSBsZW4gPT0gbnVsbCA/IHRoaXMudWludDMyKCkgOiBsZW47XG4gICAgY29uc3QgZGF0YSA9IG5ldyBhcnJheVR5cGUodGhpcy52aWV3LmJ1ZmZlciwgdGhpcy5vZmZzZXQgKyB0aGlzLnZpZXcuYnl0ZU9mZnNldCwgYXJyYXlMZW5ndGgpO1xuICAgIHRoaXMub2Zmc2V0ICs9IGFycmF5TGVuZ3RoO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBpbnQxNigpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpZXcuZ2V0SW50MTYodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDI7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHVpbnQxNigpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpZXcuZ2V0VWludDE2KHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAyO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpbnQzMigpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpZXcuZ2V0SW50MzIodGhpcy5vZmZzZXQsIHRydWUpO1xuICAgIHRoaXMub2Zmc2V0ICs9IDQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHVpbnQzMigpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpZXcuZ2V0VWludDMyKHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmbG9hdDMyKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmlldy5nZXRGbG9hdDMyKHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmbG9hdDY0KCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMudmlldy5nZXRGbG9hdDY0KHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpbnQ2NCgpIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICAgIHJldHVybiBpbnQ1My5yZWFkSW50NjRMRSh0aGlzLmJ1ZmZlciwgb2Zmc2V0KTtcbiAgfVxuXG4gIHVpbnQ2NCgpIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICAgIHJldHVybiBpbnQ1My5yZWFkVUludDY0TEUodGhpcy5idWZmZXIsIG9mZnNldCk7XG4gIH1cblxuICB0aW1lKCkge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHRoaXMub2Zmc2V0ICs9IDg7XG4gICAgcmV0dXJuIGV4dHJhY3RUaW1lKHRoaXMuYnVmZmVyLCBvZmZzZXQpO1xuICB9XG5cbiAgZHVyYXRpb24oKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgICByZXR1cm4gZXh0cmFjdFRpbWUodGhpcy5idWZmZXIsIG9mZnNldCk7XG4gIH1cbn1cblxuY29uc3QgZmluZFR5cGVCeU5hbWUgPSAodHlwZXM6IFJvc01zZ0RlZmluaXRpb25bXSwgbmFtZSA9IFwiXCIpOiBOYW1lZFJvc01zZ0RlZmluaXRpb24gPT4ge1xuICBsZXQgZm91bmROYW1lID0gXCJcIjsgLy8gdHJhY2sgbmFtZSBzZXBhcmF0ZWx5IGluIGEgbm9uLW51bGwgdmFyaWFibGUgdG8gYXBwZWFzZSBGbG93XG4gIGNvbnN0IG1hdGNoZXMgPSB0eXBlcy5maWx0ZXIoKHR5cGUpID0+IHtcbiAgICBjb25zdCB0eXBlTmFtZSA9IHR5cGUubmFtZSB8fCBcIlwiO1xuICAgIC8vIGlmIHRoZSBzZWFyY2ggaXMgZW1wdHksIHJldHVybiB1bm5hbWVkIHR5cGVzXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICByZXR1cm4gIXR5cGVOYW1lO1xuICAgIH1cbiAgICAvLyByZXR1cm4gaWYgdGhlIHNlYXJjaCBpcyBpbiB0aGUgdHlwZSBuYW1lXG4gICAgLy8gb3IgbWF0Y2hlcyBleGFjdGx5IGlmIGEgZnVsbHktcXVhbGlmaWVkIG5hbWUgbWF0Y2ggaXMgcGFzc2VkIHRvIHVzXG4gICAgY29uc3QgbmFtZUVuZCA9IG5hbWUuaW5kZXhPZihcIi9cIikgPiAtMSA/IG5hbWUgOiBgLyR7bmFtZX1gO1xuICAgIGlmICh0eXBlTmFtZS5lbmRzV2l0aChuYW1lRW5kKSkge1xuICAgICAgZm91bmROYW1lID0gdHlwZU5hbWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCAxIHRvcCBsZXZlbCB0eXBlIGRlZmluaXRpb24gZm9yICcke25hbWV9JyBidXQgZm91bmQgJHttYXRjaGVzLmxlbmd0aH1gKTtcbiAgfVxuICByZXR1cm4geyAuLi5tYXRjaGVzWzBdLCBuYW1lOiBmb3VuZE5hbWUgfTtcbn07XG5cbmNvbnN0IGNvbnN0cnVjdG9yQm9keSA9ICh0eXBlOiAkUmVhZE9ubHk8Um9zTXNnRGVmaW5pdGlvbj4pID0+IHtcbiAgcmV0dXJuIHR5cGUuZGVmaW5pdGlvbnNcbiAgICAuZmlsdGVyKChkZWYpID0+ICFkZWYuaXNDb25zdGFudClcbiAgICAubWFwKChkZWYpID0+IHtcbiAgICAgIHJldHVybiBgdGhpcy4ke2RlZi5uYW1lfSA9IHVuZGVmaW5lZGA7XG4gICAgfSlcbiAgICAuam9pbihcIjtcXG5cIik7XG59O1xuXG5jb25zdCBmcmllbmRseU5hbWUgPSAobmFtZTogc3RyaW5nKSA9PiBuYW1lLnJlcGxhY2UoXCIvXCIsIFwiX1wiKTtcblxuY29uc3QgY3JlYXRlUGFyc2VyID0gKHR5cGVzOiBSb3NNc2dEZWZpbml0aW9uW10pID0+IHtcbiAgY29uc3QgdW5uYW1lZFR5cGVzID0gdHlwZXMuZmlsdGVyKCh0eXBlKSA9PiAhdHlwZS5uYW1lKTtcbiAgaWYgKHVubmFtZWRUeXBlcy5sZW5ndGggIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJtdWx0aXBsZSB1bm5hbWVkIHR5cGVzXCIpO1xuICB9XG5cbiAgY29uc3QgW3VubmFtZWRUeXBlXSA9IHVubmFtZWRUeXBlcztcblxuICBjb25zdCBuYW1lZFR5cGVzOiBOYW1lZFJvc01zZ0RlZmluaXRpb25bXSA9ICh0eXBlcy5maWx0ZXIoKHR5cGUpID0+ICEhdHlwZS5uYW1lKTogYW55W10pO1xuXG4gIGxldCBqcyA9IGBcbiAgdmFyIFJlY29yZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAke2NvbnN0cnVjdG9yQm9keSh1bm5hbWVkVHlwZSl9XG4gIH07XFxuYDtcblxuICBuYW1lZFR5cGVzLmZvckVhY2goKHQpID0+IHtcbiAgICBqcyArPSBgXG5SZWNvcmQuJHtmcmllbmRseU5hbWUodC5uYW1lKX0gPSBmdW5jdGlvbigpIHtcbiAgJHtjb25zdHJ1Y3RvckJvZHkodCl9XG59O1xcbmA7XG4gIH0pO1xuXG4gIGxldCBzdGFjayA9IDA7XG4gIGNvbnN0IGdldFJlYWRlckxpbmVzID0gKHR5cGU6IFJvc01zZ0RlZmluaXRpb24gfCBOYW1lZFJvc01zZ0RlZmluaXRpb24sIGZpZWxkTmFtZSA9IFwicmVjb3JkXCIpID0+IHtcbiAgICBsZXQgcmVhZGVyTGluZXM6IHN0cmluZ1tdID0gW107XG4gICAgdHlwZS5kZWZpbml0aW9ucy5mb3JFYWNoKChkZWYpID0+IHtcbiAgICAgIGlmIChkZWYuaXNDb25zdGFudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZGVmLmlzQXJyYXkpIHtcbiAgICAgICAgaWYgKGRlZi50eXBlID09PSBcInVpbnQ4XCIgfHwgZGVmLnR5cGUgPT09IFwiaW50OFwiKSB7XG4gICAgICAgICAgY29uc3QgYXJyYXlUeXBlID0gZGVmLnR5cGUgPT09IFwidWludDhcIiA/IFwiVWludDhBcnJheVwiIDogXCJJbnQ4QXJyYXlcIjtcbiAgICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGAke2ZpZWxkTmFtZX0uJHtkZWYubmFtZX0gPSByZWFkZXIudHlwZWRBcnJheSgke1N0cmluZyhkZWYuYXJyYXlMZW5ndGgpfSwgJHthcnJheVR5cGV9KTtgKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gYmVjYXVzZSB3ZSBtaWdodCBoYXZlIG5lc3RlZCBhcnJheXNcbiAgICAgICAgLy8gd2UgbmVlZCB0byBpbmNyZW1lbnRhbGx5IG51bWJlciB2YXJhaWJsZXMgc28gdGhleSBhcmVuJ3RcbiAgICAgICAgLy8gc3RvbXBlZCBvbiBieSBvdGhlciB2YXJpYWJsZXMgaW4gdGhlIGZ1bmN0aW9uXG4gICAgICAgIHN0YWNrKys7XG5cbiAgICAgICAgLy8gbmFtZSBmb3IgdGhlIGxlbmd0aCBmaWVsZCBpbiB0aGUgZm9yLWxvb3BcbiAgICAgICAgY29uc3QgbGVuRmllbGQgPSBgbGVuZ3RoXyR7c3RhY2t9YDtcbiAgICAgICAgLy8gbmFtZSBmb3IgYSBjaGlsZCBjb2xsZWN0aW9uXG4gICAgICAgIGNvbnN0IGNoaWxkTmFtZSA9IGBjcGx4XyR7c3RhY2t9YDtcbiAgICAgICAgLy8gbmFtZSB0byB0aGUgaXR0ZXJhdG9yIGluIHRoZSBmb3ItbG9vcFxuICAgICAgICBjb25zdCBpbmNOYW1lID0gYCR7Y2hpbGROYW1lfV9pbmNfJHtzdGFja31gO1xuXG4gICAgICAgIC8vIHNldCBhIHZhcmlhYmxlIHBvaW50aW5nIHRvIHRoZSBwYXJzZWQgZml4ZWQgYXJyYXkgbGVuZ3RoXG4gICAgICAgIC8vIG9yIHJlYWQgdGhlIGJ5dGUgaW5kaWNhdGluZyB0aGUgZHluYW1pYyBsZW5ndGhcbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChgdmFyICR7bGVuRmllbGR9ID0gJHtkZWYuYXJyYXlMZW5ndGggPyBkZWYuYXJyYXlMZW5ndGggOiBcInJlYWRlci51aW50MzIoKTtcIn1gKTtcblxuICAgICAgICAvLyBvbmx5IGFsbG9jYXRlIGFuIGFycmF5IGlmIHRoZXJlIGlzIGEgbGVuZ3RoIC0gc2tpcHMgZW1wdHkgYWxsb2NhdGlvbnNcbiAgICAgICAgY29uc3QgYXJyYXlOYW1lID0gYCR7ZmllbGROYW1lfS4ke2RlZi5uYW1lfWA7XG5cbiAgICAgICAgLy8gYWxsb2NhdGUgdGhlIG5ldyBhcnJheSB0byBhIGZpeGVkIGxlbmd0aCBzaW5jZSB3ZSBrbm93IGl0IGFoZWFkIG9mIHRpbWVcbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChgJHthcnJheU5hbWV9ID0gbmV3IEFycmF5KCR7bGVuRmllbGR9KWApO1xuICAgICAgICAvLyBzdGFydCB0aGUgZm9yLWxvb3BcbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChgZm9yICh2YXIgJHtpbmNOYW1lfSA9IDA7ICR7aW5jTmFtZX0gPCAke2xlbkZpZWxkfTsgJHtpbmNOYW1lfSsrKSB7YCk7XG4gICAgICAgIC8vIGlmIHRoZSBzdWIgdHlwZSBpcyBjb21wbGV4IHdlIG5lZWQgdG8gYWxsb2NhdGUgaXQgYW5kIHBhcnNlIGl0cyB2YWx1ZXNcbiAgICAgICAgaWYgKGRlZi5pc0NvbXBsZXgpIHtcbiAgICAgICAgICBjb25zdCBkZWZUeXBlID0gZmluZFR5cGVCeU5hbWUodHlwZXMsIGRlZi50eXBlKTtcbiAgICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGB2YXIgJHtjaGlsZE5hbWV9ID0gbmV3IFJlY29yZC4ke2ZyaWVuZGx5TmFtZShkZWZUeXBlLm5hbWUpfSgpO2ApO1xuICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGdlbmVyYXRlIHRoZSBwYXJzZSBpbnN0cnVjdGlvbnMgZm9yIHRoZSBzdWItdHlwZVxuICAgICAgICAgIHJlYWRlckxpbmVzID0gcmVhZGVyTGluZXMuY29uY2F0KGdldFJlYWRlckxpbmVzKGRlZlR5cGUsIGAke2NoaWxkTmFtZX1gKSk7XG4gICAgICAgICAgcmVhZGVyTGluZXMucHVzaChgJHthcnJheU5hbWV9WyR7aW5jTmFtZX1dID0gJHtjaGlsZE5hbWV9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaWYgdGhlIHN1YnR5cGUgaXMgbm90IGNvbXBsZXggaXRzIGEgc2ltcGxlIGxvdy1sZXZlbCByZWFkZXIgb3BlcmF0aW9uXG4gICAgICAgICAgcmVhZGVyTGluZXMucHVzaChgJHthcnJheU5hbWV9WyR7aW5jTmFtZX1dID0gcmVhZGVyLiR7ZGVmLnR5cGV9KCk7YCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChcIn1cIik7IC8vIGNsb3NlIHRoZSBmb3ItbG9vcFxuICAgICAgfSBlbHNlIGlmIChkZWYuaXNDb21wbGV4KSB7XG4gICAgICAgIGNvbnN0IGRlZlR5cGUgPSBmaW5kVHlwZUJ5TmFtZSh0eXBlcywgZGVmLnR5cGUpO1xuICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGAke2ZpZWxkTmFtZX0uJHtkZWYubmFtZX0gPSBuZXcgUmVjb3JkLiR7ZnJpZW5kbHlOYW1lKGRlZlR5cGUubmFtZSl9KCk7YCk7XG4gICAgICAgIHJlYWRlckxpbmVzID0gcmVhZGVyTGluZXMuY29uY2F0KGdldFJlYWRlckxpbmVzKGRlZlR5cGUsIGAke2ZpZWxkTmFtZX0uJHtkZWYubmFtZX1gKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWFkZXJMaW5lcy5wdXNoKGAke2ZpZWxkTmFtZX0uJHtkZWYubmFtZX0gPSByZWFkZXIuJHtkZWYudHlwZX0oKTtgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVhZGVyTGluZXM7XG4gIH07XG5cbiAgY29uc3QgbGluZXMgPSBnZXRSZWFkZXJMaW5lcyh1bm5hbWVkVHlwZSkuam9pbihcIlxcblwiKTtcbiAgY29uc3QgcmVhZGVyRm4gPSBgXG4gIHJldHVybiBmdW5jdGlvbiByZWFkKHJlYWRlcikge1xuICAgIHZhciByZWNvcmQgPSBuZXcgUmVjb3JkKCk7XG4gICAgJHtsaW5lc31cbiAgICByZXR1cm4gcmVjb3JkO1xuICB9O2A7XG5cbiAganMgKz0gcmVhZGVyRm47XG5cbiAgbGV0IF9yZWFkOiAocmVhZGVyOiBTdGFuZGFyZFR5cGVSZWFkZXIpID0+IGFueTtcbiAgdHJ5IHtcbiAgICBfcmVhZCA9IGV2YWwoYChmdW5jdGlvbiBidWlsZFJlYWRlcigpIHsgJHtqc30gfSkoKWApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcImVycm9yIGJ1aWxkaW5nIHBhcnNlcjpcIiwganMpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgdGhyb3cgZTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihidWZmZXI6IEJ1ZmZlcikge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBTdGFuZGFyZFR5cGVSZWFkZXIoYnVmZmVyKTtcbiAgICByZXR1cm4gX3JlYWQocmVhZGVyKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlUmVhZGVyIHtcbiAgcmVhZGVyOiAoYnVmZmVyOiBCdWZmZXIpID0+IGFueTtcblxuICAvLyB0YWtlcyBhIG11bHRpLWxpbmUgc3RyaW5nIG1lc3NhZ2UgZGVmaW5pdGlvbiBhbmQgcmV0dXJuc1xuICAvLyBhIG1lc3NhZ2UgcmVhZGVyIHdoaWNoIGNhbiBiZSB1c2VkIHRvIHJlYWQgbWVzc2FnZXMgYmFzZWRcbiAgLy8gb24gdGhlIG1lc3NhZ2UgZGVmaW5pdGlvblxuICBjb25zdHJ1Y3RvcihtZXNzYWdlRGVmaW5pdGlvbjogc3RyaW5nKSB7XG4gICAgY29uc3QgZGVmaW5pdGlvbnMgPSBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uKG1lc3NhZ2VEZWZpbml0aW9uKTtcbiAgICB0aGlzLnJlYWRlciA9IGNyZWF0ZVBhcnNlcihkZWZpbml0aW9ucyk7XG4gIH1cblxuICByZWFkTWVzc2FnZShidWZmZXI6IEJ1ZmZlcikge1xuICAgIHJldHVybiB0aGlzLnJlYWRlcihidWZmZXIpO1xuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgR00gQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSB7IFRpbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vLyByZXByZXNlbnRzIGEgcmVzdWx0IHBhc3NlZCB0byB0aGUgY2FsbGJhY2sgZnJvbSB0aGUgaGlnaC1sZXZlbCBjYWxsOlxuLy8gYmFnLnJlYWRNZXNzYWdlcyh7IG9wdHM6IGFueSB9LCBjYWxsYmFjazogKFJlYWRSZXN1bHQpID0+IHZvaWQpID0+IFByb21pc2U8dm9pZD5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWRSZXN1bHQ8VD4ge1xuICB0b3BpYzogc3RyaW5nO1xuICBtZXNzYWdlOiBUO1xuICB0aW1lc3RhbXA6IFRpbWU7XG4gIGRhdGE6IEJ1ZmZlcjtcbiAgY2h1bmtPZmZzZXQ6IG51bWJlcjtcbiAgdG90YWxDaHVua3M6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcih0b3BpYzogc3RyaW5nLCBtZXNzYWdlOiBULCB0aW1lc3RhbXA6IFRpbWUsIGRhdGE6IEJ1ZmZlciwgY2h1bmtPZmZzZXQ6IG51bWJlciwgdG90YWxDaHVua3M6IG51bWJlcikge1xuICAgIC8vIHN0cmluZzogdGhlIHRvcGljIHRoZSBtZXNzYWdlIHdhcyBvblxuICAgIHRoaXMudG9waWMgPSB0b3BpYztcblxuICAgIC8vIGFueTogdGhlIHBhcnNlZCBib2R5IG9mIHRoZSBtZXNzYWdlIGJhc2VkIG9uIGNvbm5lY3Rpb24ubWVzc2FnZURlZmluaXRpb25cbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gICAgLy8gdGltZTogdGhlIHRpbWVzdGFtcCBvZiB0aGUgbWVzc2FnZVxuICAgIHRoaXMudGltZXN0YW1wID0gdGltZXN0YW1wO1xuXG4gICAgLy8gYnVmZmVyOiByYXcgYnVmZmVyIGRhdGEgb2YgdGhlIG1lc3NhZ2VcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuXG4gICAgLy8gdGhlIG9mZnNldCBvZiB0aGUgY3VycmVudGx5IHJlYWQgY2h1bmtcbiAgICB0aGlzLmNodW5rT2Zmc2V0ID0gY2h1bmtPZmZzZXQ7XG5cbiAgICAvLyB0aGUgdG90YWwgbnVtYmVyIG9mIGNodW5rcyBpbiB0aGUgcmVhZCBvcGVyYXRpb25cbiAgICB0aGlzLnRvdGFsQ2h1bmtzID0gdG90YWxDaHVua3M7XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHsgVGltZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmcm9tRGF0ZShkYXRlOiBEYXRlKSB7XG4gIGNvbnN0IHNlYyA9IE1hdGguZmxvb3IoZGF0ZS5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgY29uc3QgbnNlYyA9IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgKiAxZTY7XG4gIHJldHVybiB7IHNlYywgbnNlYyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9EYXRlKHRpbWU6IFRpbWUpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKHRpbWUuc2VjICogMWUzICsgdGltZS5uc2VjIC8gMWU2KTtcbn1cblxuLy8gY29tcGFyZSB0d28gdGltZXMsIHJldHVybmluZyBhIG5lZ2F0aXZlIHZhbHVlIGlmIHRoZSByaWdodCBpcyBncmVhdGVyXG4vLyBvciBhIHBvc2l0aXZlIHZhbHVlIGlmIHRoZSBsZWZ0IGlzIGdyZWF0ZXIgb3IgMCBpZiB0aGUgdGltZXMgYXJlIGVxdWFsXG4vLyB1c2VmdWwgdG8gc3VwcGx5IHRvIEFycmF5LnByb3RvdHlwZS5zb3J0XG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZShsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xuICBjb25zdCBzZWNEaWZmID0gbGVmdC5zZWMgLSByaWdodC5zZWM7XG4gIHJldHVybiBzZWNEaWZmIHx8IGxlZnQubnNlYyAtIHJpZ2h0Lm5zZWM7XG59XG5cbi8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgbGVmdCB0aW1lIGlzIGxlc3MgdGhhbiB0aGUgcmlnaHQgdGltZSwgb3RoZXJ3aXNlIGZhbHNlXG5leHBvcnQgZnVuY3Rpb24gaXNMZXNzVGhhbihsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xuICByZXR1cm4gdGhpcy5jb21wYXJlKGxlZnQsIHJpZ2h0KSA8IDA7XG59XG5cbi8vIHJldHVybnMgdHJ1ZSBpZiB0aGUgbGVmdCB0aW1lIGlzIGdyZWF0ZXIgdGhhbiB0aGUgcmlnaHQgdGltZSwgb3RoZXJ3aXNlIGZhbHNlXG5leHBvcnQgZnVuY3Rpb24gaXNHcmVhdGVyVGhhbihsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xuICByZXR1cm4gdGhpcy5jb21wYXJlKGxlZnQsIHJpZ2h0KSA+IDA7XG59XG5cbi8vIHJldHVybnMgdHJ1ZSBpZiBib3RoIHRpbWVzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIHNlY29uZHMgYW5kIG5hbm9zZWNvbmRzXG5leHBvcnQgZnVuY3Rpb24gYXJlU2FtZShsZWZ0OiBUaW1lLCByaWdodDogVGltZSkge1xuICByZXR1cm4gbGVmdC5zZWMgPT09IHJpZ2h0LnNlYyAmJiBsZWZ0Lm5zZWMgPT09IHJpZ2h0Lm5zZWM7XG59XG5cbmZ1bmN0aW9uIHRvU3RyaW5nKHRpbWU6IFRpbWUpIHtcbiAgcmV0dXJuIGB7JHt0aW1lLnNlY30sICR7dGltZS5uc2VjfX1gO1xufVxuXG4vLyBjb21wdXRlcyB0aGUgc3VtIG9mIHR3byB0aW1lcyBvciBkdXJhdGlvbnMgYW5kIHJldHVybnMgYSBuZXcgdGltZVxuLy8gdGhyb3dzIGFuIGV4Y2VwdGlvbiBpZiB0aGUgcmVzdWx0aW5nIHRpbWUgaXMgbmVnYXRpdmVcbmV4cG9ydCBmdW5jdGlvbiBhZGQobGVmdDogVGltZSwgcmlnaHQ6IFRpbWUpIHtcbiAgY29uc3QgZHVyYXRpb25OYW5vcyA9IGxlZnQubnNlYyArIHJpZ2h0Lm5zZWM7XG4gIGNvbnN0IHNlY3NGcm9tTmFub3MgPSBNYXRoLmZsb29yKGR1cmF0aW9uTmFub3MgLyAxZTkpO1xuICBjb25zdCBuZXdTZWNzID0gbGVmdC5zZWMgKyByaWdodC5zZWMgKyBzZWNzRnJvbU5hbm9zO1xuICBjb25zdCByZW1haW5pbmdEdXJhdGlvbk5hbm9zID0gZHVyYXRpb25OYW5vcyAlIDFlOTtcbiAgLy8gdXNlIE1hdGguYWJzIGhlcmUgdG8gcHJldmVudCAtMCB3aGVuIHRoZXJlIGlzIGV4YWN0bHkgMSBzZWNvbmQgb2YgbmVnYXRpdmUgbmFub3NlY29uZHMgcGFzc2VkIGluXG4gIGNvbnN0IG5ld05hbm9zID0gTWF0aC5hYnMoXG4gICAgTWF0aC5zaWduKHJlbWFpbmluZ0R1cmF0aW9uTmFub3MpID09PSAtMSA/IDFlOSArIHJlbWFpbmluZ0R1cmF0aW9uTmFub3MgOiByZW1haW5pbmdEdXJhdGlvbk5hbm9zXG4gICk7XG4gIGNvbnN0IHJlc3VsdCA9IHsgc2VjOiBuZXdTZWNzLCBuc2VjOiBuZXdOYW5vcyB9O1xuICBpZiAocmVzdWx0LnNlYyA8IDAgfHwgcmVzdWx0Lm5zZWMgPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEludmFsaWQgdGltZTogJHt0b1N0cmluZyhyZXN1bHQpfSBwcm9kdWNlZCBmcm9tIFRpbWVVdGlsLmFkZCgke3RvU3RyaW5nKGxlZnQpfSwgJHt0b1N0cmluZyhyaWdodCl9fSlgXG4gICAgKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIEdNIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IEJhZ1JlYWRlciwgeyB0eXBlIERlY29tcHJlc3MgfSBmcm9tIFwiLi9CYWdSZWFkZXJcIjtcbmltcG9ydCB7IE1lc3NhZ2VSZWFkZXIgfSBmcm9tIFwiLi9NZXNzYWdlUmVhZGVyXCI7XG5pbXBvcnQgUmVhZFJlc3VsdCBmcm9tIFwiLi9SZWFkUmVzdWx0XCI7XG5pbXBvcnQgeyBCYWdIZWFkZXIsIENodW5rSW5mbywgQ29ubmVjdGlvbiwgTWVzc2FnZURhdGEgfSBmcm9tIFwiLi9yZWNvcmRcIjtcbmltcG9ydCB0eXBlIHsgVGltZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgKiBhcyBUaW1lVXRpbCBmcm9tIFwiLi9UaW1lVXRpbFwiO1xuXG5leHBvcnQgdHlwZSBSZWFkT3B0aW9ucyA9IHt8XG4gIGRlY29tcHJlc3M/OiBEZWNvbXByZXNzLFxuICBub1BhcnNlPzogYm9vbGVhbixcbiAgdG9waWNzPzogc3RyaW5nW10sXG4gIHN0YXJ0VGltZT86IFRpbWUsXG4gIGVuZFRpbWU/OiBUaW1lLFxufH07XG5cbi8vIHRoZSBoaWdoIGxldmVsIHJvc2JhZyBpbnRlcmZhY2Vcbi8vIGNyZWF0ZSBhIG5ldyBiYWcgYnkgY2FsbGluZzpcbi8vIGBjb25zdCBiYWcgPSBhd2FpdCBCYWcub3BlbignLi9wYXRoLXRvLWZpbGUuYmFnJylgIGluIG5vZGUgb3Jcbi8vIGBjb25zdCBiYWcgPSBhd2FpdCBCYWcub3BlbihmaWxlc1swXSlgIGluIHRoZSBicm93c2VyXG4vL1xuLy8gYWZ0ZXIgdGhhdCB5b3UgY2FuIGNvbnN1bWUgbWVzc2FnZXMgYnkgY2FsbGluZ1xuLy8gYGF3YWl0IGJhZy5yZWFkTWVzc2FnZXMoeyB0b3BpY3M6IFsnL2ZvbyddIH0sXG4vLyAgICAocmVzdWx0KSA9PiBjb25zb2xlLmxvZyhyZXN1bHQudG9waWMsIHJlc3VsdC5tZXNzYWdlKSlgXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWcge1xuICByZWFkZXI6IEJhZ1JlYWRlcjtcbiAgaGVhZGVyOiBCYWdIZWFkZXI7XG4gIGNvbm5lY3Rpb25zOiB7IFtjb25uOiBudW1iZXJdOiBDb25uZWN0aW9uIH07XG4gIGNodW5rSW5mb3M6IENodW5rSW5mb1tdO1xuICBzdGFydFRpbWU6ID9UaW1lO1xuICBlbmRUaW1lOiA/VGltZTtcblxuICAvLyB5b3UgY2FuIG9wdGlvbmFsbHkgY3JlYXRlIGEgYmFnIG1hbnVhbGx5IHBhc3NpbmcgaW4gYSBiYWdSZWFkZXIgaW5zdGFuY2VcbiAgY29uc3RydWN0b3IoYmFnUmVhZGVyOiBCYWdSZWFkZXIpIHtcbiAgICB0aGlzLnJlYWRlciA9IGJhZ1JlYWRlcjtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBzdGF0aWMgb3BlbiA9IChmaWxlOiBGaWxlIHwgc3RyaW5nKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJUaGlzIG1ldGhvZCBzaG91bGQgaGF2ZSBiZWVuIG92ZXJyaWRkZW4gYmFzZWQgb24gdGhlIGVudmlyb25tZW50LiBNYWtlIHN1cmUgeW91IGFyZSBjb3JyZWN0bHkgaW1wb3J0aW5nIHRoZSBub2RlIG9yIHdlYiB2ZXJzaW9uIG9mIEJhZy5cIlxuICAgICk7XG4gIH07XG5cbiAgLy8gaWYgdGhlIGJhZyBpcyBtYW51YWxseSBjcmVhdGVkIHdpdGggdGhlIGNvbnN0cnVjdG9yLCB5b3UgbXVzdCBjYWxsIGBhd2FpdCBvcGVuKClgIG9uIHRoZSBiYWdcbiAgLy8gZ2VuZXJhbGx5IHRoaXMgaXMgY2FsbGVkIGZvciB5b3UgaWYgeW91J3JlIHVzaW5nIGBjb25zdCBiYWcgPSBhd2FpdCBCYWcub3BlbigpYFxuICBhc3luYyBvcGVuKCkge1xuICAgIHRoaXMuaGVhZGVyID0gYXdhaXQgdGhpcy5yZWFkZXIucmVhZEhlYWRlckFzeW5jKCk7XG4gICAgY29uc3QgeyBjb25uZWN0aW9uQ291bnQsIGNodW5rQ291bnQsIGluZGV4UG9zaXRpb24gfSA9IHRoaXMuaGVhZGVyO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5yZWFkZXIucmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvQXN5bmMoaW5kZXhQb3NpdGlvbiwgY29ubmVjdGlvbkNvdW50LCBjaHVua0NvdW50KTtcblxuICAgIHRoaXMuY29ubmVjdGlvbnMgPSB7fTtcblxuICAgIHJlc3VsdC5jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uZWN0aW9uKSA9PiB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25zW2Nvbm5lY3Rpb24uY29ubl0gPSBjb25uZWN0aW9uO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jaHVua0luZm9zID0gcmVzdWx0LmNodW5rSW5mb3M7XG5cbiAgICBpZiAoY2h1bmtDb3VudCA+IDApIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5jaHVua0luZm9zWzBdLnN0YXJ0VGltZTtcbiAgICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuY2h1bmtJbmZvc1tjaHVua0NvdW50IC0gMV0uZW5kVGltZTtcbiAgICB9XG4gIH1cblxuICBhc3luYyByZWFkTWVzc2FnZXMob3B0czogUmVhZE9wdGlvbnMsIGNhbGxiYWNrOiAobXNnOiBSZWFkUmVzdWx0PGFueT4pID0+IHZvaWQpIHtcbiAgICBjb25zdCBjb25uZWN0aW9ucyA9IHRoaXMuY29ubmVjdGlvbnM7XG5cbiAgICBjb25zdCBzdGFydFRpbWUgPSBvcHRzLnN0YXJ0VGltZSB8fCB7IHNlYzogMCwgbnNlYzogMCB9O1xuICAgIGNvbnN0IGVuZFRpbWUgPSBvcHRzLmVuZFRpbWUgfHwgeyBzZWM6IE51bWJlci5NQVhfVkFMVUUsIG5zZWM6IE51bWJlci5NQVhfVkFMVUUgfTtcbiAgICBjb25zdCB0b3BpY3MgPVxuICAgICAgb3B0cy50b3BpY3MgfHxcbiAgICAgIE9iamVjdC5rZXlzKGNvbm5lY3Rpb25zKS5tYXAoKGlkOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb25zW2lkXS50b3BpYztcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgZmlsdGVyZWRDb25uZWN0aW9ucyA9IE9iamVjdC5rZXlzKGNvbm5lY3Rpb25zKVxuICAgICAgLmZpbHRlcigoaWQ6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gdG9waWNzLmluZGV4T2YoY29ubmVjdGlvbnNbaWRdLnRvcGljKSAhPT0gLTE7XG4gICAgICB9KVxuICAgICAgLm1hcCgoaWQpID0+ICtpZCk7XG5cbiAgICBjb25zdCB7IGRlY29tcHJlc3MgPSB7fSB9ID0gb3B0cztcblxuICAgIC8vIGZpbHRlciBjaHVua3MgdG8gdGhvc2Ugd2hpY2ggZmFsbCB3aXRoaW4gdGhlIHRpbWUgcmFuZ2Ugd2UncmUgYXR0ZW1wdGluZyB0byByZWFkXG4gICAgY29uc3QgY2h1bmtJbmZvcyA9IHRoaXMuY2h1bmtJbmZvcy5maWx0ZXIoKGluZm8pID0+IHtcbiAgICAgIHJldHVybiBUaW1lVXRpbC5jb21wYXJlKGluZm8uc3RhcnRUaW1lLCBlbmRUaW1lKSA8PSAwICYmIFRpbWVVdGlsLmNvbXBhcmUoc3RhcnRUaW1lLCBpbmZvLmVuZFRpbWUpIDw9IDA7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBwYXJzZU1zZyhtc2c6IE1lc3NhZ2VEYXRhLCBjaHVua09mZnNldDogbnVtYmVyKTogUmVhZFJlc3VsdDxhbnk+IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBjb25uZWN0aW9uc1ttc2cuY29ubl07XG4gICAgICBjb25zdCB7IHRvcGljIH0gPSBjb25uZWN0aW9uO1xuICAgICAgY29uc3QgeyBkYXRhLCB0aW1lOiB0aW1lc3RhbXAgfSA9IG1zZztcbiAgICAgIGxldCBtZXNzYWdlID0gbnVsbDtcbiAgICAgIGlmICghb3B0cy5ub1BhcnNlKSB7XG4gICAgICAgIC8vIGxhemlseSBjcmVhdGUgYSByZWFkZXIgZm9yIHRoaXMgY29ubmVjdGlvbiBpZiBpdCBkb2Vzbid0IGV4aXN0XG4gICAgICAgIGNvbm5lY3Rpb24ucmVhZGVyID0gY29ubmVjdGlvbi5yZWFkZXIgfHwgbmV3IE1lc3NhZ2VSZWFkZXIoY29ubmVjdGlvbi5tZXNzYWdlRGVmaW5pdGlvbik7XG4gICAgICAgIG1lc3NhZ2UgPSBjb25uZWN0aW9uLnJlYWRlci5yZWFkTWVzc2FnZShkYXRhKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUmVhZFJlc3VsdCh0b3BpYywgbWVzc2FnZSwgdGltZXN0YW1wLCBkYXRhLCBjaHVua09mZnNldCwgY2h1bmtJbmZvcy5sZW5ndGgpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2h1bmtJbmZvcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaW5mbyA9IGNodW5rSW5mb3NbaV07XG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IHRoaXMucmVhZGVyLnJlYWRDaHVua01lc3NhZ2VzQXN5bmMoXG4gICAgICAgIGluZm8sXG4gICAgICAgIGZpbHRlcmVkQ29ubmVjdGlvbnMsXG4gICAgICAgIHN0YXJ0VGltZSxcbiAgICAgICAgZW5kVGltZSxcbiAgICAgICAgZGVjb21wcmVzc1xuICAgICAgKTtcbiAgICAgIG1lc3NhZ2VzLmZvckVhY2goKG1zZykgPT4gY2FsbGJhY2socGFyc2VNc2cobXNnLCBpKSkpO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIEdNIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUgeyBUaW1lIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLy8gcmVhZHMgdGhyb3VnaCBhIGJ1ZmZlciBhbmQgZXh0cmFjdHMgeyBba2V5OiBzdHJpbmddOiB2YWx1ZTogc3RyaW5nIH1cbi8vIHBhaXJzIC0gdGhlIGJ1ZmZlciBpcyBleHBlY3RlZCB0byBoYXZlIGxlbmd0aCBwcmVmaXhlZCB1dGY4IHN0cmluZ3Ncbi8vIHdpdGggYSAnPScgc2VwYXJhdGluZyB0aGUga2V5IGFuZCB2YWx1ZVxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RGaWVsZHMoYnVmZmVyOiBCdWZmZXIpIHtcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPCA0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVyIGZpZWxkcyBhcmUgdHJ1bmNhdGVkLlwiKTtcbiAgfVxuXG4gIGxldCBpID0gMDtcbiAgY29uc3QgZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9ID0ge307XG5cbiAgd2hpbGUgKGkgPCBidWZmZXIubGVuZ3RoKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gYnVmZmVyLnJlYWRJbnQzMkxFKGkpO1xuICAgIGkgKz0gNDtcblxuICAgIGlmIChpICsgbGVuZ3RoID4gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVyIGZpZWxkcyBhcmUgY29ycnVwdC5cIik7XG4gICAgfVxuXG4gICAgY29uc3QgZmllbGQgPSBidWZmZXIuc2xpY2UoaSwgaSArIGxlbmd0aCk7XG4gICAgY29uc3QgaW5kZXggPSBmaWVsZC5pbmRleE9mKFwiPVwiKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIZWFkZXIgZmllbGQgaXMgbWlzc2luZyBlcXVhbHMgc2lnbi5cIik7XG4gICAgfVxuXG4gICAgZmllbGRzW2ZpZWxkLnNsaWNlKDAsIGluZGV4KS50b1N0cmluZygpXSA9IGZpZWxkLnNsaWNlKGluZGV4ICsgMSk7XG4gICAgaSArPSBsZW5ndGg7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vLyByZWFkcyBhIFRpbWUgb2JqZWN0IG91dCBvZiBhIGJ1ZmZlciBhdCB0aGUgZ2l2ZW4gb2Zmc2V0XG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdFRpbWUoYnVmZmVyOiBCdWZmZXIsIG9mZnNldDogbnVtYmVyKTogVGltZSB7XG4gIGNvbnN0IHNlYyA9IGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0KTtcbiAgY29uc3QgbnNlYyA9IGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0ICsgNCk7XG4gIHJldHVybiB7IHNlYywgbnNlYyB9O1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIEdNIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IHsgZXh0cmFjdEZpZWxkcyB9IGZyb20gXCIuL2ZpZWxkc1wiO1xuaW1wb3J0IHsgUmVjb3JkIH0gZnJvbSBcIi4vcmVjb3JkXCI7XG5cbi8vIGdpdmVuIGEgYnVmZmVyIHBhcnNlcyBvdXQgdGhlIHJlY29yZCB3aXRoaW4gdGhlIGJ1ZmZlclxuLy8gYmFzZWQgb24gdGhlIG9wY29kZSB0eXBlIGJpdFxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlSGVhZGVyPFQ6IFJlY29yZD4oYnVmZmVyOiBCdWZmZXIsIGNsczogQ2xhc3M8VD4gJiB7IG9wY29kZTogbnVtYmVyIH0pOiBUIHtcbiAgY29uc3QgZmllbGRzID0gZXh0cmFjdEZpZWxkcyhidWZmZXIpO1xuICBpZiAoZmllbGRzLm9wID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJIZWFkZXIgaXMgbWlzc2luZyAnb3AnIGZpZWxkLlwiKTtcbiAgfVxuICBjb25zdCBvcGNvZGUgPSBmaWVsZHMub3AucmVhZFVJbnQ4KDApO1xuICBpZiAob3Bjb2RlICE9PSBjbHMub3Bjb2RlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCAke2Nscy5uYW1lfSAoJHtjbHMub3Bjb2RlfSkgYnV0IGZvdW5kICR7b3Bjb2RlfWApO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBjbHMoZmllbGRzKTtcbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCAqIGFzIFRpbWVVdGlsIGZyb20gXCIuL1RpbWVVdGlsXCI7XG5cbmV4cG9ydCAqIGZyb20gXCIuL2JhZ1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vQmFnUmVhZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9NZXNzYWdlUmVhZGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9wYXJzZU1lc3NhZ2VEZWZpbml0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi90eXBlc1wiO1xuZXhwb3J0IHsgVGltZVV0aWwgfTtcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCBIZWFwIGZyb20gXCJoZWFwXCI7XG5cbmZ1bmN0aW9uIG5tZXJnZTxUPihrZXk6IChhOiBULCBiOiBUKSA9PiBudW1iZXIsIC4uLml0ZXJhYmxlczogQXJyYXk8SXRlcmF0b3I8VD4+KSB7XG4gIGNvbnN0IGhlYXA6IEhlYXA8eyBpOiBudW1iZXIsIHZhbHVlOiBUIH0+ID0gbmV3IEhlYXAoKGEsIGIpID0+IHtcbiAgICByZXR1cm4ga2V5KGEudmFsdWUsIGIudmFsdWUpO1xuICB9KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB7IHZhbHVlLCBkb25lIH0gPSBpdGVyYWJsZXNbaV0ubmV4dCgpO1xuICAgIGlmICghZG9uZSkge1xuICAgICAgaGVhcC5wdXNoKHsgaSwgdmFsdWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuZXh0OiAoKSA9PiB7XG4gICAgICBpZiAoaGVhcC5lbXB0eSgpKSB7XG4gICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUgfTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgaSB9ID0gaGVhcC5mcm9udCgpO1xuICAgICAgY29uc3QgbmV4dCA9IGl0ZXJhYmxlc1tpXS5uZXh0KCk7XG4gICAgICBpZiAobmV4dC5kb25lKSB7XG4gICAgICAgIHJldHVybiB7IHZhbHVlOiBoZWFwLnBvcCgpLnZhbHVlLCBkb25lOiBmYWxzZSB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgdmFsdWU6IGhlYXAucmVwbGFjZSh7IGksIHZhbHVlOiBuZXh0LnZhbHVlIH0pLnZhbHVlLCBkb25lOiBmYWxzZSB9O1xuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5tZXJnZTtcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbi8vIFNldCBvZiBidWlsdC1pbiByb3MgdHlwZXMuIFNlZSBodHRwOi8vd2lraS5yb3Mub3JnL21zZyNGaWVsZF9UeXBlc1xuZXhwb3J0IGNvbnN0IHJvc1ByaW1pdGl2ZVR5cGVzOiBTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoW1xuICBcInN0cmluZ1wiLFxuICBcImJvb2xcIixcbiAgXCJpbnQ4XCIsXG4gIFwidWludDhcIixcbiAgXCJpbnQxNlwiLFxuICBcInVpbnQxNlwiLFxuICBcImludDMyXCIsXG4gIFwidWludDMyXCIsXG4gIFwiZmxvYXQzMlwiLFxuICBcImZsb2F0NjRcIixcbiAgXCJpbnQ2NFwiLFxuICBcInVpbnQ2NFwiLFxuICBcInRpbWVcIixcbiAgXCJkdXJhdGlvblwiLFxuXSk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVR5cGUodHlwZTogc3RyaW5nKSB7XG4gIC8vIE5vcm1hbGl6ZSBkZXByZWNhdGVkIGFsaWFzZXMuXG4gIGxldCBub3JtYWxpemVkVHlwZSA9IHR5cGU7XG4gIGlmICh0eXBlID09PSBcImNoYXJcIikge1xuICAgIG5vcm1hbGl6ZWRUeXBlID0gXCJ1aW50OFwiO1xuICB9XG4gIGlmICh0eXBlID09PSBcImJ5dGVcIikge1xuICAgIG5vcm1hbGl6ZWRUeXBlID0gXCJpbnQ4XCI7XG4gIH1cbiAgcmV0dXJuIG5vcm1hbGl6ZWRUeXBlO1xufVxuXG4vLyByZXByZXNlbnRzIGEgc2luZ2xlIGxpbmUgaW4gYSBtZXNzYWdlIGRlZmluaXRpb24gdHlwZVxuLy8gZS5nLiAnc3RyaW5nIG5hbWUnICdDdXN0b21UeXBlW10gZm9vJyAnc3RyaW5nWzNdIG5hbWVzJ1xuZnVuY3Rpb24gbmV3QXJyYXlEZWZpbml0aW9uKHR5cGU6IHN0cmluZywgbmFtZTogc3RyaW5nLCBhcnJheUxlbmd0aDogP251bWJlcik6IFJvc01zZ0ZpZWxkIHtcbiAgY29uc3Qgbm9ybWFsaXplZFR5cGUgPSBub3JtYWxpemVUeXBlKHR5cGUpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IG5vcm1hbGl6ZWRUeXBlLFxuICAgIG5hbWUsXG4gICAgaXNBcnJheTogdHJ1ZSxcbiAgICBhcnJheUxlbmd0aDogYXJyYXlMZW5ndGggPT09IG51bGwgPyB1bmRlZmluZWQgOiBhcnJheUxlbmd0aCxcbiAgICBpc0NvbXBsZXg6ICFyb3NQcmltaXRpdmVUeXBlcy5oYXMobm9ybWFsaXplZFR5cGUpLFxuICB9O1xufVxuZnVuY3Rpb24gbmV3RGVmaW5pdGlvbih0eXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IFJvc01zZ0ZpZWxkIHtcbiAgY29uc3Qgbm9ybWFsaXplZFR5cGUgPSBub3JtYWxpemVUeXBlKHR5cGUpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IG5vcm1hbGl6ZWRUeXBlLFxuICAgIG5hbWUsXG4gICAgaXNBcnJheTogZmFsc2UsXG4gICAgaXNDb21wbGV4OiAhcm9zUHJpbWl0aXZlVHlwZXMuaGFzKG5vcm1hbGl6ZWRUeXBlKSxcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgUm9zTXNnRmllbGQgPVxuICB8IHt8XG4gICAgICB0eXBlOiBzdHJpbmcsXG4gICAgICBuYW1lOiBzdHJpbmcsXG4gICAgICBpc0NvbnN0YW50PzogYm9vbGVhbixcbiAgICAgIGlzQ29tcGxleD86IGJvb2xlYW4sXG4gICAgICB2YWx1ZT86IG1peGVkLFxuICAgICAgaXNBcnJheT86IGZhbHNlLFxuICAgICAgYXJyYXlMZW5ndGg/OiB2b2lkLFxuICAgIHx9XG4gIHwge3xcbiAgICAgIHR5cGU6IHN0cmluZyxcbiAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgIGlzQ29uc3RhbnQ/OiBib29sZWFuLFxuICAgICAgaXNDb21wbGV4PzogYm9vbGVhbixcbiAgICAgIHZhbHVlPzogbWl4ZWQsXG4gICAgICBpc0FycmF5OiB0cnVlLFxuICAgICAgYXJyYXlMZW5ndGg6ID9udW1iZXIsXG4gICAgfH07XG5cbmV4cG9ydCB0eXBlIFJvc01zZ0RlZmluaXRpb24gPSB7fFxuICBuYW1lPzogc3RyaW5nLFxuICBkZWZpbml0aW9uczogUm9zTXNnRmllbGRbXSxcbnx9O1xuZXhwb3J0IHR5cGUgTmFtZWRSb3NNc2dEZWZpbml0aW9uID0ge3xcbiAgbmFtZTogc3RyaW5nLFxuICBkZWZpbml0aW9uczogUm9zTXNnRmllbGRbXSxcbnx9O1xuXG5jb25zdCBidWlsZFR5cGUgPSAobGluZXM6IHN0cmluZ1tdKTogUm9zTXNnRGVmaW5pdGlvbiA9PiB7XG4gIGNvbnN0IGRlZmluaXRpb25zOiBSb3NNc2dGaWVsZFtdID0gW107XG4gIGxldCBjb21wbGV4VHlwZU5hbWU6ID9zdHJpbmc7XG4gIGxpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAvLyByZW1vdmUgY29tbWVudHMgYW5kIGV4dHJhIHdoaXRlc3BhY2UgZnJvbSBlYWNoIGxpbmVcbiAgICBjb25zdCBzcGxpdHMgPSBsaW5lXG4gICAgICAucmVwbGFjZSgvIy4qL2dpLCBcIlwiKVxuICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgLmZpbHRlcigod29yZCkgPT4gd29yZCk7XG4gICAgaWYgKCFzcGxpdHNbMV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gY29uc3VtZSBjb21tZW50c1xuICAgIGNvbnN0IHR5cGUgPSBzcGxpdHNbMF0udHJpbSgpO1xuICAgIGNvbnN0IG5hbWUgPSBzcGxpdHNbMV0udHJpbSgpO1xuICAgIGlmICh0eXBlID09PSBcIk1TRzpcIikge1xuICAgICAgY29tcGxleFR5cGVOYW1lID0gbmFtZTtcbiAgICB9IGVsc2UgaWYgKG5hbWUuaW5kZXhPZihcIj1cIikgPiAtMSB8fCBzcGxpdHMuaW5kZXhPZihcIj1cIikgPiAtMSkge1xuICAgICAgLy8gY29uc3RhbnQgdHlwZSBwYXJzaW5nXG4gICAgICBjb25zdCBtYXRjaGVzID0gbGluZS5tYXRjaCgvKFxcUyspXFxzKj1cXHMqKC4qKVxccyovKTtcbiAgICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNYWxmb3JtZWQgbGluZTogXCIgKyBsaW5lKTtcbiAgICAgIH1cbiAgICAgIGxldCB2YWx1ZTogYW55ID0gbWF0Y2hlc1syXTtcbiAgICAgIGlmICh0eXBlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlLnJlcGxhY2UoL1xccyojLiovZywgXCJcIikpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgY29uc29sZS53YXJuKGBFcnJvciBpbiB0aGlzIGNvbnN0YW50IGRlZmluaXRpb246ICR7bGluZX1gKTtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gXCJib29sXCIpIHtcbiAgICAgICAgICB2YWx1ZSA9IEJvb2xlYW4odmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoKHR5cGUuaW5jbHVkZXMoXCJpbnRcIikgJiYgdmFsdWUgPiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikgfHwgdmFsdWUgPCBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUikge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICBjb25zb2xlLndhcm4oYEZvdW5kIGludGVnZXIgY29uc3RhbnQgb3V0c2lkZSBzYWZlIGludGVnZXIgcmFuZ2U6ICR7bGluZX1gKTtcbiAgICAgIH1cbiAgICAgIGRlZmluaXRpb25zLnB1c2goe1xuICAgICAgICB0eXBlOiBub3JtYWxpemVUeXBlKHR5cGUpLFxuICAgICAgICBuYW1lOiBtYXRjaGVzWzFdLFxuICAgICAgICBpc0NvbnN0YW50OiB0cnVlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZS5pbmRleE9mKFwiXVwiKSA9PT0gdHlwZS5sZW5ndGggLSAxKSB7XG4gICAgICAvLyBhcnJheSB0eXBlIHBhcnNpbmdcbiAgICAgIGNvbnN0IHR5cGVTcGxpdHMgPSB0eXBlLnNwbGl0KFwiW1wiKTtcbiAgICAgIGNvbnN0IGJhc2VUeXBlID0gdHlwZVNwbGl0c1swXTtcbiAgICAgIGNvbnN0IGxlbiA9IHR5cGVTcGxpdHNbMV0ucmVwbGFjZShcIl1cIiwgXCJcIik7XG4gICAgICBkZWZpbml0aW9ucy5wdXNoKG5ld0FycmF5RGVmaW5pdGlvbihiYXNlVHlwZSwgbmFtZSwgbGVuID8gcGFyc2VJbnQobGVuLCAxMCkgOiB1bmRlZmluZWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmaW5pdGlvbnMucHVzaChuZXdEZWZpbml0aW9uKHR5cGUsIG5hbWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4geyBuYW1lOiBjb21wbGV4VHlwZU5hbWUsIGRlZmluaXRpb25zIH07XG59O1xuXG5jb25zdCBmaW5kVHlwZUJ5TmFtZSA9ICh0eXBlczogUm9zTXNnRGVmaW5pdGlvbltdLCBuYW1lOiBzdHJpbmcpOiBSb3NNc2dEZWZpbml0aW9uID0+IHtcbiAgY29uc3QgbWF0Y2hlcyA9IHR5cGVzLmZpbHRlcigodHlwZSkgPT4ge1xuICAgIGNvbnN0IHR5cGVOYW1lID0gdHlwZS5uYW1lIHx8IFwiXCI7XG4gICAgLy8gaWYgdGhlIHNlYXJjaCBpcyBlbXB0eSwgcmV0dXJuIHVubmFtZWQgdHlwZXNcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHJldHVybiAhdHlwZU5hbWU7XG4gICAgfVxuICAgIC8vIHJldHVybiBpZiB0aGUgc2VhcmNoIGlzIGluIHRoZSB0eXBlIG5hbWVcbiAgICAvLyBvciBtYXRjaGVzIGV4YWN0bHkgaWYgYSBmdWxseS1xdWFsaWZpZWQgbmFtZSBtYXRjaCBpcyBwYXNzZWQgdG8gdXNcbiAgICBjb25zdCBuYW1lRW5kID0gbmFtZS5pbmRleE9mKFwiL1wiKSA+IC0xID8gbmFtZSA6IGAvJHtuYW1lfWA7XG4gICAgcmV0dXJuIHR5cGVOYW1lLmVuZHNXaXRoKG5hbWVFbmQpO1xuICB9KTtcbiAgaWYgKG1hdGNoZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCAxIHRvcCBsZXZlbCB0eXBlIGRlZmluaXRpb24gZm9yICcke25hbWV9JyBidXQgZm91bmQgJHttYXRjaGVzLmxlbmd0aH1gKTtcbiAgfVxuICByZXR1cm4gbWF0Y2hlc1swXTtcbn07XG5cbi8vIEdpdmVuIGEgcmF3IG1lc3NhZ2UgZGVmaW5pdGlvbiBzdHJpbmcsIHBhcnNlIGl0IGludG8gYW4gb2JqZWN0IHJlcHJlc2VudGF0aW9uLlxuLy8gRXhhbXBsZSByZXR1cm4gdmFsdWU6XG4vLyBbe1xuLy8gICBuYW1lOiB1bmRlZmluZWQsXG4vLyAgIGRlZmluaXRpb25zOiBbXG4vLyAgICAge1xuLy8gICAgICAgYXJyYXlMZW5ndGg6IHVuZGVmaW5lZCxcbi8vICAgICAgIGlzQXJyYXk6IGZhbHNlLFxuLy8gICAgICAgaXNDb21wbGV4OiBmYWxzZSxcbi8vICAgICAgIG5hbWU6IFwibmFtZVwiLFxuLy8gICAgICAgdHlwZTogXCJzdHJpbmdcIixcbi8vICAgICB9LCAuLi5cbi8vICAgXSxcbi8vIH0sIC4uLiBdXG4vL1xuLy8gU2VlIHVuaXQgdGVzdHMgZm9yIG1vcmUgZXhhbXBsZXMuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VNZXNzYWdlRGVmaW5pdGlvbihtZXNzYWdlRGVmaW5pdGlvbjogc3RyaW5nKSB7XG4gIC8vIHJlYWQgYWxsIHRoZSBsaW5lcyBhbmQgcmVtb3ZlIGVtcHRpZXNcbiAgY29uc3QgYWxsTGluZXMgPSBtZXNzYWdlRGVmaW5pdGlvblxuICAgIC5zcGxpdChcIlxcblwiKVxuICAgIC5tYXAoKGxpbmUpID0+IGxpbmUudHJpbSgpKVxuICAgIC5maWx0ZXIoKGxpbmUpID0+IGxpbmUpO1xuXG4gIGxldCBkZWZpbml0aW9uTGluZXM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IHR5cGVzOiBSb3NNc2dEZWZpbml0aW9uW10gPSBbXTtcbiAgLy8gZ3JvdXAgbGluZXMgaW50byBpbmRpdmlkdWFsIGRlZmluaXRpb25zXG4gIGFsbExpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAvLyBza2lwIGNvbW1lbnQgbGluZXNcbiAgICBpZiAobGluZS5pbmRleE9mKFwiI1wiKSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBkZWZpbml0aW9ucyBhcmUgc3BsaXQgYnkgZXF1YWwgc2lnbnNcbiAgICBpZiAobGluZS5pbmRleE9mKFwiPT1cIikgPT09IDApIHtcbiAgICAgIHR5cGVzLnB1c2goYnVpbGRUeXBlKGRlZmluaXRpb25MaW5lcykpO1xuICAgICAgZGVmaW5pdGlvbkxpbmVzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlZmluaXRpb25MaW5lcy5wdXNoKGxpbmUpO1xuICAgIH1cbiAgfSk7XG4gIHR5cGVzLnB1c2goYnVpbGRUeXBlKGRlZmluaXRpb25MaW5lcykpO1xuXG4gIC8vIEZpeCB1cCBjb21wbGV4IHR5cGUgbmFtZXNcbiAgdHlwZXMuZm9yRWFjaCgoeyBkZWZpbml0aW9ucyB9KSA9PiB7XG4gICAgZGVmaW5pdGlvbnMuZm9yRWFjaCgoZGVmaW5pdGlvbikgPT4ge1xuICAgICAgaWYgKGRlZmluaXRpb24uaXNDb21wbGV4KSB7XG4gICAgICAgIGNvbnN0IGZvdW5kTmFtZSA9IGZpbmRUeXBlQnlOYW1lKHR5cGVzLCBkZWZpbml0aW9uLnR5cGUpLm5hbWU7XG4gICAgICAgIGlmIChmb3VuZE5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyB0eXBlIGRlZmluaXRpb24gZm9yICR7ZGVmaW5pdGlvbi50eXBlfWApO1xuICAgICAgICB9XG4gICAgICAgIGRlZmluaXRpb24udHlwZSA9IGZvdW5kTmFtZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHR5cGVzO1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIEdNIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IGludDUzIGZyb20gXCJpbnQ1M1wiO1xuXG5pbXBvcnQgeyBleHRyYWN0RmllbGRzLCBleHRyYWN0VGltZSB9IGZyb20gXCIuL2ZpZWxkc1wiO1xuaW1wb3J0IHsgTWVzc2FnZVJlYWRlciB9IGZyb20gXCIuL01lc3NhZ2VSZWFkZXJcIjtcbmltcG9ydCB0eXBlIHsgVGltZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IHJlYWRVSW50NjRMRSA9IChidWZmZXI6IEJ1ZmZlcikgPT4ge1xuICByZXR1cm4gaW50NTMucmVhZFVJbnQ2NExFKGJ1ZmZlciwgMCk7XG59O1xuXG5leHBvcnQgY2xhc3MgUmVjb3JkIHtcbiAgb2Zmc2V0OiBudW1iZXI7XG4gIGRhdGFPZmZzZXQ6IG51bWJlcjtcbiAgZW5kOiBudW1iZXI7XG4gIGxlbmd0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKF9maWVsZHM6IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHt9XG5cbiAgcGFyc2VEYXRhKF9idWZmZXI6IEJ1ZmZlcikge31cbn1cblxuZXhwb3J0IGNsYXNzIEJhZ0hlYWRlciBleHRlbmRzIFJlY29yZCB7XG4gIHN0YXRpYyBvcGNvZGUgPSAzO1xuICBpbmRleFBvc2l0aW9uOiBudW1iZXI7XG4gIGNvbm5lY3Rpb25Db3VudDogbnVtYmVyO1xuICBjaHVua0NvdW50OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9KSB7XG4gICAgc3VwZXIoZmllbGRzKTtcbiAgICB0aGlzLmluZGV4UG9zaXRpb24gPSByZWFkVUludDY0TEUoZmllbGRzLmluZGV4X3Bvcyk7XG4gICAgdGhpcy5jb25uZWN0aW9uQ291bnQgPSBmaWVsZHMuY29ubl9jb3VudC5yZWFkSW50MzJMRSgwKTtcbiAgICB0aGlzLmNodW5rQ291bnQgPSBmaWVsZHMuY2h1bmtfY291bnQucmVhZEludDMyTEUoMCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENodW5rIGV4dGVuZHMgUmVjb3JkIHtcbiAgc3RhdGljIG9wY29kZSA9IDU7XG4gIGNvbXByZXNzaW9uOiBzdHJpbmc7XG4gIHNpemU6IG51bWJlcjtcbiAgZGF0YTogQnVmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSkge1xuICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgdGhpcy5jb21wcmVzc2lvbiA9IGZpZWxkcy5jb21wcmVzc2lvbi50b1N0cmluZygpO1xuICAgIHRoaXMuc2l6ZSA9IGZpZWxkcy5zaXplLnJlYWRVSW50MzJMRSgwKTtcbiAgfVxuXG4gIHBhcnNlRGF0YShidWZmZXI6IEJ1ZmZlcikge1xuICAgIHRoaXMuZGF0YSA9IGJ1ZmZlcjtcbiAgfVxufVxuXG5jb25zdCBnZXRGaWVsZCA9IChmaWVsZHM6IHsgW2tleTogc3RyaW5nXTogQnVmZmVyIH0sIGtleTogc3RyaW5nKSA9PiB7XG4gIGlmIChmaWVsZHNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBDb25uZWN0aW9uIGhlYWRlciBpcyBtaXNzaW5nICR7a2V5fS5gKTtcbiAgfVxuICByZXR1cm4gZmllbGRzW2tleV0udG9TdHJpbmcoKTtcbn07XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uIGV4dGVuZHMgUmVjb3JkIHtcbiAgc3RhdGljIG9wY29kZSA9IDc7XG4gIGNvbm46IG51bWJlcjtcbiAgdG9waWM6IHN0cmluZztcbiAgdHlwZTogP3N0cmluZztcbiAgbWQ1c3VtOiA/c3RyaW5nO1xuICBtZXNzYWdlRGVmaW5pdGlvbjogc3RyaW5nO1xuICBjYWxsZXJpZDogP3N0cmluZztcbiAgbGF0Y2hpbmc6ID9ib29sZWFuO1xuICByZWFkZXI6ID9NZXNzYWdlUmVhZGVyO1xuXG4gIGNvbnN0cnVjdG9yKGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSkge1xuICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgdGhpcy5jb25uID0gZmllbGRzLmNvbm4ucmVhZFVJbnQzMkxFKDApO1xuICAgIHRoaXMudG9waWMgPSBmaWVsZHMudG9waWMudG9TdHJpbmcoKTtcbiAgICB0aGlzLnR5cGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5tZDVzdW0gPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5tZXNzYWdlRGVmaW5pdGlvbiA9IFwiXCI7XG4gIH1cblxuICBwYXJzZURhdGEoYnVmZmVyOiBCdWZmZXIpIHtcbiAgICBjb25zdCBmaWVsZHMgPSBleHRyYWN0RmllbGRzKGJ1ZmZlcik7XG4gICAgdGhpcy50eXBlID0gZ2V0RmllbGQoZmllbGRzLCBcInR5cGVcIik7XG4gICAgdGhpcy5tZDVzdW0gPSBnZXRGaWVsZChmaWVsZHMsIFwibWQ1c3VtXCIpO1xuICAgIHRoaXMubWVzc2FnZURlZmluaXRpb24gPSBnZXRGaWVsZChmaWVsZHMsIFwibWVzc2FnZV9kZWZpbml0aW9uXCIpO1xuICAgIGlmIChmaWVsZHMuY2FsbGVyaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jYWxsZXJpZCA9IGZpZWxkcy5jYWxsZXJpZC50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAoZmllbGRzLmxhdGNoaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubGF0Y2hpbmcgPSBmaWVsZHMubGF0Y2hpbmcudG9TdHJpbmcoKSA9PT0gXCIxXCI7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlRGF0YSBleHRlbmRzIFJlY29yZCB7XG4gIHN0YXRpYyBvcGNvZGUgPSAyO1xuICBjb25uOiBudW1iZXI7XG4gIHRpbWU6IFRpbWU7XG4gIGRhdGE6IEJ1ZmZlcjtcblxuICBjb25zdHJ1Y3RvcihmaWVsZHM6IHsgW2tleTogc3RyaW5nXTogQnVmZmVyIH0pIHtcbiAgICBzdXBlcihmaWVsZHMpO1xuICAgIHRoaXMuY29ubiA9IGZpZWxkcy5jb25uLnJlYWRVSW50MzJMRSgwKTtcbiAgICB0aGlzLnRpbWUgPSBleHRyYWN0VGltZShmaWVsZHMudGltZSwgMCk7XG4gIH1cblxuICBwYXJzZURhdGEoYnVmZmVyOiBCdWZmZXIpIHtcbiAgICB0aGlzLmRhdGEgPSBidWZmZXI7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEluZGV4RGF0YSBleHRlbmRzIFJlY29yZCB7XG4gIHN0YXRpYyBvcGNvZGUgPSA0O1xuICB2ZXI6IG51bWJlcjtcbiAgY29ubjogbnVtYmVyO1xuICBjb3VudDogbnVtYmVyO1xuICBpbmRpY2VzOiBBcnJheTx7IHRpbWU6IFRpbWUsIG9mZnNldDogbnVtYmVyIH0+O1xuXG4gIGNvbnN0cnVjdG9yKGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSkge1xuICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgdGhpcy52ZXIgPSBmaWVsZHMudmVyLnJlYWRVSW50MzJMRSgwKTtcbiAgICB0aGlzLmNvbm4gPSBmaWVsZHMuY29ubi5yZWFkVUludDMyTEUoMCk7XG4gICAgdGhpcy5jb3VudCA9IGZpZWxkcy5jb3VudC5yZWFkVUludDMyTEUoMCk7XG4gIH1cblxuICBwYXJzZURhdGEoYnVmZmVyOiBCdWZmZXIpIHtcbiAgICB0aGlzLmluZGljZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY291bnQ7IGkrKykge1xuICAgICAgdGhpcy5pbmRpY2VzLnB1c2goe1xuICAgICAgICB0aW1lOiBleHRyYWN0VGltZShidWZmZXIsIGkgKiAxMiksXG4gICAgICAgIG9mZnNldDogYnVmZmVyLnJlYWRVSW50MzJMRShpICogMTIgKyA4KSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2h1bmtJbmZvIGV4dGVuZHMgUmVjb3JkIHtcbiAgc3RhdGljIG9wY29kZSA9IDY7XG4gIHZlcjogbnVtYmVyO1xuICBjaHVua1Bvc2l0aW9uOiBudW1iZXI7XG4gIHN0YXJ0VGltZTogVGltZTtcbiAgZW5kVGltZTogVGltZTtcbiAgY291bnQ6IG51bWJlcjtcbiAgY29ubmVjdGlvbnM6IEFycmF5PHsgY29ubjogbnVtYmVyLCBjb3VudDogbnVtYmVyIH0+O1xuICBuZXh0Q2h1bms6ID9DaHVua0luZm87XG5cbiAgY29uc3RydWN0b3IoZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9KSB7XG4gICAgc3VwZXIoZmllbGRzKTtcbiAgICB0aGlzLnZlciA9IGZpZWxkcy52ZXIucmVhZFVJbnQzMkxFKDApO1xuICAgIHRoaXMuY2h1bmtQb3NpdGlvbiA9IHJlYWRVSW50NjRMRShmaWVsZHMuY2h1bmtfcG9zKTtcbiAgICB0aGlzLnN0YXJ0VGltZSA9IGV4dHJhY3RUaW1lKGZpZWxkcy5zdGFydF90aW1lLCAwKTtcbiAgICB0aGlzLmVuZFRpbWUgPSBleHRyYWN0VGltZShmaWVsZHMuZW5kX3RpbWUsIDApO1xuICAgIHRoaXMuY291bnQgPSBmaWVsZHMuY291bnQucmVhZFVJbnQzMkxFKDApO1xuICB9XG5cbiAgcGFyc2VEYXRhKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgdGhpcy5jb25uZWN0aW9ucyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb3VudDsgaSsrKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25zLnB1c2goe1xuICAgICAgICBjb25uOiBidWZmZXIucmVhZFVJbnQzMkxFKGkgKiA4KSxcbiAgICAgICAgY291bnQ6IGJ1ZmZlci5yZWFkVUludDMyTEUoaSAqIDggKyA0KSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIEdNIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSBcImJ1ZmZlclwiO1xuaW1wb3J0IHsgTWVzc2FnZVJlYWRlciwgcGFyc2VNZXNzYWdlRGVmaW5pdGlvbiwgcm9zUHJpbWl0aXZlVHlwZXMsIFRpbWVVdGlsIH0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgeyB0eXBlIENhbGxiYWNrIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgQmFnIGZyb20gXCIuLi9iYWdcIjtcbmltcG9ydCBCYWdSZWFkZXIgZnJvbSBcIi4uL0JhZ1JlYWRlclwiO1xuXG4vLyBicm93c2VyIHJlYWRlciBmb3IgQmxvYnxGaWxlIG9iamVjdHNcbmV4cG9ydCBjbGFzcyBSZWFkZXIge1xuICBfYmxvYjogQmxvYjtcbiAgX3NpemU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihibG9iOiBCbG9iKSB7XG4gICAgdGhpcy5fYmxvYiA9IGJsb2I7XG4gICAgdGhpcy5fc2l6ZSA9IGJsb2Iuc2l6ZTtcbiAgfVxuXG4gIC8vIHJlYWQgbGVuZ3RoIChieXRlcykgc3RhcnRpbmcgZnJvbSBvZmZzZXQgKGJ5dGVzKVxuICAvLyBjYWxsYmFjayhlcnIsIGJ1ZmZlcilcbiAgcmVhZChvZmZzZXQ6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIsIGNiOiBDYWxsYmFjazxCdWZmZXI+KSB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lIC0gZmxvdyBkb2Vzbid0IGFsbG93IG51bGxcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBudWxsO1xuICAgICAgLy8gJEZsb3dGaXhNZSAtIGZsb3cgZG9lc24ndCBhbGxvdyBudWxsXG4gICAgICByZWFkZXIub25lcnJvciA9IG51bGw7XG4gICAgICBzZXRJbW1lZGlhdGUoY2IsIG51bGwsIEJ1ZmZlci5mcm9tKHJlYWRlci5yZXN1bHQpKTtcbiAgICB9O1xuICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lIC0gZmxvdyBkb2Vzbid0IGFsbG93IG51bGxcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBudWxsO1xuICAgICAgLy8gJEZsb3dGaXhNZSAtIGZsb3cgZG9lc24ndCBhbGxvdyBudWxsXG4gICAgICByZWFkZXIub25lcnJvciA9IG51bGw7XG4gICAgICBzZXRJbW1lZGlhdGUoY2IsIG5ldyBFcnJvcihyZWFkZXIuZXJyb3IpKTtcbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcih0aGlzLl9ibG9iLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgbGVuZ3RoKSk7XG4gIH1cblxuICAvLyByZXR1cm4gdGhlIHNpemUgb2YgdGhlIGZpbGVcbiAgc2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxufVxuXG5jb25zdCBvcGVuID0gYXN5bmMgKGZpbGU6IEZpbGUgfCBzdHJpbmcpID0+IHtcbiAgaWYgKCEoZmlsZSBpbnN0YW5jZW9mIEJsb2IpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJFeHBlY3RlZCBmaWxlIHRvIGJlIGEgRmlsZSBvciBCbG9iLiBNYWtlIHN1cmUgeW91IGFyZSBjb3JyZWN0bHkgaW1wb3J0aW5nIHRoZSBub2RlIG9yIHdlYiB2ZXJzaW9uIG9mIEJhZy5cIlxuICAgICk7XG4gIH1cbiAgY29uc3QgYmFnID0gbmV3IEJhZyhuZXcgQmFnUmVhZGVyKG5ldyBSZWFkZXIoZmlsZSkpKTtcbiAgYXdhaXQgYmFnLm9wZW4oKTtcbiAgcmV0dXJuIGJhZztcbn07XG5CYWcub3BlbiA9IG9wZW47XG5cbmV4cG9ydCAqIGZyb20gXCIuLi90eXBlc1wiO1xuZXhwb3J0IHsgVGltZVV0aWwsIEJhZ1JlYWRlciwgTWVzc2FnZVJlYWRlciwgb3BlbiwgcGFyc2VNZXNzYWdlRGVmaW5pdGlvbiwgcm9zUHJpbWl0aXZlVHlwZXMgfTtcbmV4cG9ydCBkZWZhdWx0IEJhZztcbiJdLCJzb3VyY2VSb290IjoiIn0=