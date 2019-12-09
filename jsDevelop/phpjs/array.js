(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function _phpCastString(value) {
  // original by: Rafał Kukawski
  //   example 1: _phpCastString(true)
  //   returns 1: '1'
  //   example 2: _phpCastString(false)
  //   returns 2: ''
  //   example 3: _phpCastString('foo')
  //   returns 3: 'foo'
  //   example 4: _phpCastString(0/0)
  //   returns 4: 'NAN'
  //   example 5: _phpCastString(1/0)
  //   returns 5: 'INF'
  //   example 6: _phpCastString(-1/0)
  //   returns 6: '-INF'
  //   example 7: _phpCastString(null)
  //   returns 7: ''
  //   example 8: _phpCastString(undefined)
  //   returns 8: ''
  //   example 9: _phpCastString([])
  //   returns 9: 'Array'
  //   example 10: _phpCastString({})
  //   returns 10: 'Object'
  //   example 11: _phpCastString(0)
  //   returns 11: '0'
  //   example 12: _phpCastString(1)
  //   returns 12: '1'
  //   example 13: _phpCastString(3.14)
  //   returns 13: '3.14'

  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

  switch (type) {
    case 'boolean':
      return value ? '1' : '';
    case 'string':
      return value;
    case 'number':
      if (isNaN(value)) {
        return 'NAN';
      }

      if (!isFinite(value)) {
        return (value < 0 ? '-' : '') + 'INF';
      }

      return value + '';
    case 'undefined':
      return '';
    case 'object':
      if (Array.isArray(value)) {
        return 'Array';
      }

      if (value !== null) {
        return 'Object';
      }

      return '';
    case 'function':
    // fall through
    default:
      throw new Error('Unsupported value type');
  }
};

},{}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_change_key_case(array, cs) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_change_key_case/
  // original by: Ates Goral (http://magnetiq.com)
  // improved by: marrtins
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_change_key_case(42)
  //   returns 1: false
  //   example 2: array_change_key_case([ 3, 5 ])
  //   returns 2: [3, 5]
  //   example 3: array_change_key_case({ FuBaR: 42 })
  //   returns 3: {"fubar": 42}
  //   example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER')
  //   returns 4: {"fubar": 42}
  //   example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER')
  //   returns 5: {"FUBAR": 42}
  //   example 6: array_change_key_case({ FuBaR: 42 }, 2)
  //   returns 6: {"FUBAR": 42}

  var caseFnc;
  var key;
  var tmpArr = {};

  if (Object.prototype.toString.call(array) === '[object Array]') {
    return array;
  }

  if (array && (typeof array === 'undefined' ? 'undefined' : _typeof(array)) === 'object') {
    caseFnc = !cs || cs === 'CASE_LOWER' ? 'toLowerCase' : 'toUpperCase';
    for (key in array) {
      tmpArr[key[caseFnc]()] = array[key];
    }
    return tmpArr;
  }

  return false;
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function array_chunk(input, size, preserveKeys) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_chunk/
  // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Important note: Per the ECMAScript specification,
  //      note 1: objects may not always iterate in a predictable order
  //   example 1: array_chunk(['Kevin', 'van', 'Zonneveld'], 2)
  //   returns 1: [['Kevin', 'van'], ['Zonneveld']]
  //   example 2: array_chunk(['Kevin', 'van', 'Zonneveld'], 2, true)
  //   returns 2: [{0:'Kevin', 1:'van'}, {2: 'Zonneveld'}]
  //   example 3: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2)
  //   returns 3: [['Kevin', 'van'], ['Zonneveld']]
  //   example 4: array_chunk({1:'Kevin', 2:'van', 3:'Zonneveld'}, 2, true)
  //   returns 4: [{1: 'Kevin', 2: 'van'}, {3: 'Zonneveld'}]

  var x;
  var p = '';
  var i = 0;
  var c = -1;
  var l = input.length || 0;
  var n = [];

  if (size < 1) {
    return null;
  }

  if (Object.prototype.toString.call(input) === '[object Array]') {
    if (preserveKeys) {
      while (i < l) {
        (x = i % size) ? n[c][i] = input[i] : n[++c] = {};n[c][i] = input[i];
        i++;
      }
    } else {
      while (i < l) {
        (x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
        i++;
      }
    }
  } else {
    if (preserveKeys) {
      for (p in input) {
        if (input.hasOwnProperty(p)) {
          (x = i % size) ? n[c][p] = input[p] : n[++c] = {};n[c][p] = input[p];
          i++;
        }
      }
    } else {
      for (p in input) {
        if (input.hasOwnProperty(p)) {
          (x = i % size) ? n[c][x] = input[p] : n[++c] = [input[p]];
          i++;
        }
      }
    }
  }

  return n;
};

},{}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_combine(keys, values) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_combine/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_combine([0,1,2], ['kevin','van','zonneveld'])
  //   returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}

  var newArray = {};
  var i = 0;

  // input sanitation
  // Only accept arrays or array-like objects
  // Require arrays to have a count
  if ((typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) !== 'object') {
    return false;
  }
  if ((typeof values === 'undefined' ? 'undefined' : _typeof(values)) !== 'object') {
    return false;
  }
  if (typeof keys.length !== 'number') {
    return false;
  }
  if (typeof values.length !== 'number') {
    return false;
  }
  if (!keys.length) {
    return false;
  }

  // number of elements does not match
  if (keys.length !== values.length) {
    return false;
  }

  for (i = 0; i < keys.length; i++) {
    newArray[keys[i]] = values[i];
  }

  return newArray;
};

},{}],5:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_count_values(array) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_count_values/
  // original by: Ates Goral (http://magnetiq.com)
  // improved by: Michael White (http://getsprink.com)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  //    input by: sankai
  //    input by: Shingo
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_count_values([ 3, 5, 3, "foo", "bar", "foo" ])
  //   returns 1: {3:2, 5:1, "foo":2, "bar":1}
  //   example 2: array_count_values({ p1: 3, p2: 5, p3: 3, p4: "foo", p5: "bar", p6: "foo" })
  //   returns 2: {3:2, 5:1, "foo":2, "bar":1}
  //   example 3: array_count_values([ true, 4.2, 42, "fubar" ])
  //   returns 3: {42:1, "fubar":1}

  var tmpArr = {};
  var key = '';
  var t = '';

  var _getType = function _getType(obj) {
    // Objects are php associative arrays.
    var t = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    t = t.toLowerCase();
    if (t === 'object') {
      t = 'array';
    }
    return t;
  };

  var _countValue = function _countValue(tmpArr, value) {
    if (typeof value === 'number') {
      if (Math.floor(value) !== value) {
        return;
      }
    } else if (typeof value !== 'string') {
      return;
    }

    if (value in tmpArr && tmpArr.hasOwnProperty(value)) {
      ++tmpArr[value];
    } else {
      tmpArr[value] = 1;
    }
  };

  t = _getType(array);
  if (t === 'array') {
    for (key in array) {
      if (array.hasOwnProperty(key)) {
        _countValue.call(this, tmpArr, array[key]);
      }
    }
  }

  return tmpArr;
};

},{}],6:[function(require,module,exports){
'use strict';

module.exports = function array_diff(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_diff/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Sanjoy Roy
  //  revised by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld'])
  //   returns 1: {0:'Kevin'}

  var retArr = {};
  var argl = arguments.length;
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < argl; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1]) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

},{}],7:[function(require,module,exports){
'use strict';

module.exports = function array_diff_assoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_diff_assoc/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: 0m3r
  //  revised by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'})
  //   returns 1: {1: 'van', 2: 'Zonneveld'}

  var retArr = {};
  var argl = arguments.length;
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < argl; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1] && k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

},{}],8:[function(require,module,exports){
'use strict';

module.exports = function array_diff_key(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_diff_key/
  // original by: Ates Goral (http://magnetiq.com)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  //    input by: Everlasto
  //   example 1: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5})
  //   returns 1: {"green":2, "blue":3, "white":4}
  //   example 2: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {red: 5})
  //   returns 2: {"green":2, "blue":3, "white":4}

  var argl = arguments.length;
  var retArr = {};
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < argl; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

},{}],9:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_diff_uassoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_diff_uassoc/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_diff_uassoc($array1, $array2, function (key1, key2) { return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)) })
  //   returns 1: {b: 'brown', c: 'blue', 0: 'red'}
  //        test: skip-1

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var cb = arguments[arglm1];
  var arr = {};
  var i = 1;
  var k1 = '';
  var k = '';

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],10:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_diff_ukey(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_diff_ukey/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {blue: 1, red: 2, green: 3, purple: 4}
  //   example 1: var $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
  //   example 1: array_diff_ukey($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
  //   returns 1: {red: 2, purple: 4}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  // var arglm2 = arglm1 - 1
  var cb = arguments[arglm1];
  var k1 = '';
  var i = 1;
  var arr = {};
  var k = '';

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (cb(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],11:[function(require,module,exports){
"use strict";

module.exports = function array_fill(startIndex, num, mixedVal) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_fill/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Waldo Malqui Silva (http://waldo.malqui.info)
  //   example 1: array_fill(5, 6, 'banana')
  //   returns 1: { 5: 'banana', 6: 'banana', 7: 'banana', 8: 'banana', 9: 'banana', 10: 'banana' }

  var key;
  var tmpArr = {};

  if (!isNaN(startIndex) && !isNaN(num)) {
    for (key = 0; key < num; key++) {
      tmpArr[key + startIndex] = mixedVal;
    }
  }

  return tmpArr;
};

},{}],12:[function(require,module,exports){
'use strict';

module.exports = function array_fill_keys(keys, value) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_fill_keys/
  // original by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $keys = {'a': 'foo', 2: 5, 3: 10, 4: 'bar'}
  //   example 1: array_fill_keys($keys, 'banana')
  //   returns 1: {"foo": "banana", 5: "banana", 10: "banana", "bar": "banana"}

  var retObj = {};
  var key = '';

  for (key in keys) {
    retObj[keys[key]] = value;
  }

  return retObj;
};

},{}],13:[function(require,module,exports){
'use strict';

module.exports = function array_filter(arr, func) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_filter/
  // original by: Brett Zamir (http://brett-zamir.me)
  //    input by: max4ever
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Takes a function as an argument, not a function's name
  //   example 1: var odd = function (num) {return (num & 1);}
  //   example 1: array_filter({"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}, odd)
  //   returns 1: {"a": 1, "c": 3, "e": 5}
  //   example 2: var even = function (num) {return (!(num & 1));}
  //   example 2: array_filter([6, 7, 8, 9, 10, 11, 12], even)
  //   returns 2: [ 6, , 8, , 10, , 12 ]
  //   example 3: array_filter({"a": 1, "b": false, "c": -1, "d": 0, "e": null, "f":'', "g":undefined})
  //   returns 3: {"a":1, "c":-1}

  var retObj = {};
  var k;

  func = func || function (v) {
    return v;
  };

  // @todo: Issue #73
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    retObj = [];
  }

  for (k in arr) {
    if (func(arr[k])) {
      retObj[k] = arr[k];
    }
  }

  return retObj;
};

},{}],14:[function(require,module,exports){
"use strict";

module.exports = function array_flip(trans) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_flip/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Pier Paolo Ramon (http://www.mastersoup.com/)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_flip( {a: 1, b: 1, c: 2} )
  //   returns 1: {1: 'b', 2: 'c'}

  var key;
  var tmpArr = {};

  for (key in trans) {
    if (!trans.hasOwnProperty(key)) {
      continue;
    }
    tmpArr[trans[key]] = key;
  }

  return tmpArr;
};

},{}],15:[function(require,module,exports){
'use strict';

module.exports = function array_intersect(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_intersect/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: These only output associative arrays (would need to be
  //      note 1: all numeric and counting from zero to be numeric)
  //   example 1: var $array1 = {'a' : 'green', 0:'red', 1: 'blue'}
  //   example 1: var $array2 = {'b' : 'green', 0:'yellow', 1:'red'}
  //   example 1: var $array3 = ['green', 'red']
  //   example 1: var $result = array_intersect($array1, $array2, $array3)
  //   returns 1: {0: 'red', a: 'green'}

  var retArr = {};
  var argl = arguments.length;
  var arglm1 = argl - 1;
  var k1 = '';
  var arr = {};
  var i = 0;
  var k = '';

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    arrs: for (i = 1; i < argl; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1]) {
          if (i === arglm1) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

},{}],16:[function(require,module,exports){
'use strict';

module.exports = function array_intersect_assoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_intersect_assoc/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: These only output associative arrays (would need to be
  //      note 1: all numeric and counting from zero to be numeric)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
  //   example 1: array_intersect_assoc($array1, $array2)
  //   returns 1: {a: 'green'}

  var retArr = {};
  var argl = arguments.length;
  var arglm1 = argl - 1;
  var k1 = '';
  var arr = {};
  var i = 0;
  var k = '';

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    arrs: for (i = 1; i < argl; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1] && k === k1) {
          if (i === arglm1) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

},{}],17:[function(require,module,exports){
'use strict';

module.exports = function array_intersect_key(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_intersect_key/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: These only output associative arrays (would need to be
  //      note 1: all numeric and counting from zero to be numeric)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
  //   example 1: array_intersect_key($array1, $array2)
  //   returns 1: {0: 'red', a: 'green'}

  var retArr = {};
  var argl = arguments.length;
  var arglm1 = argl - 1;
  var k1 = '';
  var arr = {};
  var i = 0;
  var k = '';

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    if (!arr1.hasOwnProperty(k1)) {
      continue;
    }
    arrs: for (i = 1; i < argl; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (!arr.hasOwnProperty(k)) {
          continue;
        }
        if (k === k1) {
          if (i === arglm1) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

},{}],18:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_intersect_uassoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_intersect_uassoc/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_intersect_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {b: 'brown'}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var arglm2 = arglm1 - 1;
  var cb = arguments[arglm1];
  // var cb0 = arguments[arglm2]
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  // cb0 = (typeof cb0 === 'string')
  //   ? $global[cb0]
  //   : (Object.prototype.toString.call(cb0) === '[object Array]')
  //     ? $global[cb0[0]][cb0[1]]
  //     : cb0

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    arrs: for (i = 1; i < arglm1; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],19:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_intersect_ukey(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_intersect_ukey/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {blue: 1, red: 2, green: 3, purple: 4}
  //   example 1: var $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
  //   example 1: array_intersect_ukey ($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
  //   returns 1: {blue: 1, green: 3}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var arglm2 = arglm1 - 1;
  var cb = arguments[arglm1];
  // var cb0 = arguments[arglm2]
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  // cb0 = (typeof cb0 === 'string')
  //   ? $global[cb0]
  //   : (Object.prototype.toString.call(cb0) === '[object Array]')
  //     ? $global[cb0[0]][cb0[1]]
  //     : cb0

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    arrs: for (i = 1; i < arglm1; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (cb(k, k1) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],20:[function(require,module,exports){
"use strict";

module.exports = function array_key_exists(key, search) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_key_exists/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Felix Geisendoerfer (http://www.debuggable.com/felix)
  //   example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'})
  //   returns 1: true

  if (!search || search.constructor !== Array && search.constructor !== Object) {
    return false;
  }

  return key in search;
};

},{}],21:[function(require,module,exports){
'use strict';

module.exports = function array_keys(input, searchValue, argStrict) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_keys/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //    input by: P
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // improved by: jd
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} )
  //   returns 1: [ 'firstname', 'surname' ]

  var search = typeof searchValue !== 'undefined';
  var tmpArr = [];
  var strict = !!argStrict;
  var include = true;
  var key = '';

  for (key in input) {
    if (input.hasOwnProperty(key)) {
      include = true;
      if (search) {
        if (strict && input[key] !== searchValue) {
          include = false;
        } else if (input[key] !== searchValue) {
          include = false;
        }
      }

      if (include) {
        tmpArr[tmpArr.length] = key;
      }
    }
  }

  return tmpArr;
};

},{}],22:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_map(callback) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_map/
  // original by: Andrea Giammarchi (http://webreflection.blogspot.com)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //    input by: thekid
  //      note 1: If the callback is a string (or object, if an array is supplied),
  //      note 1: it can only work if the function name is in the global context
  //   example 1: array_map( function (a){return (a * a * a)}, [1, 2, 3, 4, 5] )
  //   returns 1: [ 1, 8, 27, 64, 125 ]

  var argc = arguments.length;
  var argv = arguments;
  var obj = null;
  var cb = callback;
  var j = argv[1].length;
  var i = 0;
  var k = 1;
  var m = 0;
  var tmp = [];
  var tmpArr = [];

  var $global = typeof window !== 'undefined' ? window : global;

  while (i < j) {
    while (k < argc) {
      tmp[m++] = argv[k++][i];
    }

    m = 0;
    k = 1;

    if (callback) {
      if (typeof callback === 'string') {
        cb = $global[callback];
      } else if ((typeof callback === 'undefined' ? 'undefined' : _typeof(callback)) === 'object' && callback.length) {
        obj = typeof callback[0] === 'string' ? $global[callback[0]] : callback[0];
        if (typeof obj === 'undefined') {
          throw new Error('Object not found: ' + callback[0]);
        }
        cb = typeof callback[1] === 'string' ? obj[callback[1]] : callback[1];
      }
      tmpArr[i++] = cb.apply(obj, tmp);
    } else {
      tmpArr[i++] = tmp;
    }

    tmp = [];
  }

  return tmpArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],23:[function(require,module,exports){
'use strict';

module.exports = function array_merge() {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_merge/
  // original by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Nate
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //    input by: josh
  //   example 1: var $arr1 = {"color": "red", 0: 2, 1: 4}
  //   example 1: var $arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
  //   example 1: array_merge($arr1, $arr2)
  //   returns 1: {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
  //   example 2: var $arr1 = []
  //   example 2: var $arr2 = {1: "data"}
  //   example 2: array_merge($arr1, $arr2)
  //   returns 2: {0: "data"}

  var args = Array.prototype.slice.call(arguments);
  var argl = args.length;
  var arg;
  var retObj = {};
  var k = '';
  var argil = 0;
  var j = 0;
  var i = 0;
  var ct = 0;
  var toStr = Object.prototype.toString;
  var retArr = true;

  for (i = 0; i < argl; i++) {
    if (toStr.call(args[i]) !== '[object Array]') {
      retArr = false;
      break;
    }
  }

  if (retArr) {
    retArr = [];
    for (i = 0; i < argl; i++) {
      retArr = retArr.concat(args[i]);
    }
    return retArr;
  }

  for (i = 0, ct = 0; i < argl; i++) {
    arg = args[i];
    if (toStr.call(arg) === '[object Array]') {
      for (j = 0, argil = arg.length; j < argil; j++) {
        retObj[ct++] = arg[j];
      }
    } else {
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          if (parseInt(k, 10) + '' === k) {
            retObj[ct++] = arg[k];
          } else {
            retObj[k] = arg[k];
          }
        }
      }
    }
  }

  return retObj;
};

},{}],24:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_merge_recursive(arr1, arr2) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_merge_recursive/
  // original by: Subhasis Deb
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  //   example 1: var $arr1 = {'color': {'favorite': 'red'}, 0: 5}
  //   example 1: var $arr2 = {0: 10, 'color': {'favorite': 'green', 0: 'blue'}}
  //   example 1: array_merge_recursive($arr1, $arr2)
  //   returns 1: {'color': {'favorite': {0: 'red', 1: 'green'}, 0: 'blue'}, 1: 5, 1: 10}
  //        test: skip-1

  var arrayMerge = require('../array/array_merge');
  var idx = '';

  if (arr1 && Object.prototype.toString.call(arr1) === '[object Array]' && arr2 && Object.prototype.toString.call(arr2) === '[object Array]') {
    for (idx in arr2) {
      arr1.push(arr2[idx]);
    }
  } else if (arr1 && arr1 instanceof Object && arr2 && arr2 instanceof Object) {
    for (idx in arr2) {
      if (idx in arr1) {
        if (_typeof(arr1[idx]) === 'object' && (typeof arr2 === 'undefined' ? 'undefined' : _typeof(arr2)) === 'object') {
          arr1[idx] = arrayMerge(arr1[idx], arr2[idx]);
        } else {
          arr1[idx] = arr2[idx];
        }
      } else {
        arr1[idx] = arr2[idx];
      }
    }
  }

  return arr1;
};

},{"../array/array_merge":23}],25:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_multisort(arr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_multisort/
  // original by: Theriault (https://github.com/Theriault)
  // improved by: Oleg Andreyev (https://github.com/oleg-andreyev)
  //   example 1: array_multisort([1, 2, 1, 2, 1, 2], [1, 2, 3, 4, 5, 6])
  //   returns 1: true
  //   example 2: var $characters = {A: 'Edward', B: 'Locke', C: 'Sabin', D: 'Terra', E: 'Edward'}
  //   example 2: var $jobs = {A: 'Warrior', B: 'Thief', C: 'Monk', D: 'Mage', E: 'Knight'}
  //   example 2: array_multisort($characters, 'SORT_DESC', 'SORT_STRING', $jobs, 'SORT_ASC', 'SORT_STRING')
  //   returns 2: true
  //   example 3: var $lastnames = [ 'Carter','Adams','Monroe','Tyler','Madison','Kennedy','Adams']
  //   example 3: var $firstnames = ['James', 'John' ,'James', 'John', 'James',  'John',   'John']
  //   example 3: var $president = [ 39, 6, 5, 10, 4, 35, 2 ]
  //   example 3: array_multisort($firstnames, 'SORT_DESC', 'SORT_STRING', $lastnames, 'SORT_ASC', 'SORT_STRING', $president, 'SORT_NUMERIC')
  //   returns 3: true
  //      note 1: flags: Translation table for sort arguments.
  //      note 1: Each argument turns on certain bits in the flag byte through addition.
  //      note 1: bits: HGFE DCBA
  //      note 1: args: Holds pointer to arguments for reassignment

  var g;
  var i;
  var j;
  var k;
  var l;
  var sal;
  var vkey;
  var elIndex;
  var lastSorts;
  var tmpArray;
  var zlast;

  var sortFlag = [0];
  var thingsToSort = [];
  var nLastSort = [];
  var lastSort = [];
  // possibly redundant
  var args = arguments;

  var flags = {
    'SORT_REGULAR': 16,
    'SORT_NUMERIC': 17,
    'SORT_STRING': 18,
    'SORT_ASC': 32,
    'SORT_DESC': 40
  };

  var sortDuplicator = function sortDuplicator(a, b) {
    return nLastSort.shift();
  };

  var sortFunctions = [[function (a, b) {
    lastSort.push(a > b ? 1 : a < b ? -1 : 0);
    return a > b ? 1 : a < b ? -1 : 0;
  }, function (a, b) {
    lastSort.push(b > a ? 1 : b < a ? -1 : 0);
    return b > a ? 1 : b < a ? -1 : 0;
  }], [function (a, b) {
    lastSort.push(a - b);
    return a - b;
  }, function (a, b) {
    lastSort.push(b - a);
    return b - a;
  }], [function (a, b) {
    lastSort.push(a + '' > b + '' ? 1 : a + '' < b + '' ? -1 : 0);
    return a + '' > b + '' ? 1 : a + '' < b + '' ? -1 : 0;
  }, function (a, b) {
    lastSort.push(b + '' > a + '' ? 1 : b + '' < a + '' ? -1 : 0);
    return b + '' > a + '' ? 1 : b + '' < a + '' ? -1 : 0;
  }]];

  var sortArrs = [[]];

  var sortKeys = [[]];

  // Store first argument into sortArrs and sortKeys if an Object.
  // First Argument should be either a Javascript Array or an Object,
  // otherwise function would return FALSE like in PHP
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    sortArrs[0] = arr;
  } else if (arr && (typeof arr === 'undefined' ? 'undefined' : _typeof(arr)) === 'object') {
    for (i in arr) {
      if (arr.hasOwnProperty(i)) {
        sortKeys[0].push(i);
        sortArrs[0].push(arr[i]);
      }
    }
  } else {
    return false;
  }

  // arrMainLength: Holds the length of the first array.
  // All other arrays must be of equal length, otherwise function would return FALSE like in PHP
  // sortComponents: Holds 2 indexes per every section of the array
  // that can be sorted. As this is the start, the whole array can be sorted.
  var arrMainLength = sortArrs[0].length;
  var sortComponents = [0, arrMainLength];

  // Loop through all other arguments, checking lengths and sort flags
  // of arrays and adding them to the above variables.
  var argl = arguments.length;
  for (j = 1; j < argl; j++) {
    if (Object.prototype.toString.call(arguments[j]) === '[object Array]') {
      sortArrs[j] = arguments[j];
      sortFlag[j] = 0;
      if (arguments[j].length !== arrMainLength) {
        return false;
      }
    } else if (arguments[j] && _typeof(arguments[j]) === 'object') {
      sortKeys[j] = [];
      sortArrs[j] = [];
      sortFlag[j] = 0;
      for (i in arguments[j]) {
        if (arguments[j].hasOwnProperty(i)) {
          sortKeys[j].push(i);
          sortArrs[j].push(arguments[j][i]);
        }
      }
      if (sortArrs[j].length !== arrMainLength) {
        return false;
      }
    } else if (typeof arguments[j] === 'string') {
      var lFlag = sortFlag.pop();
      // Keep extra parentheses around latter flags check
      // to avoid minimization leading to CDATA closer
      if (typeof flags[arguments[j]] === 'undefined' || (flags[arguments[j]] >>> 4 & lFlag >>> 4) > 0) {
        return false;
      }
      sortFlag.push(lFlag + flags[arguments[j]]);
    } else {
      return false;
    }
  }

  for (i = 0; i !== arrMainLength; i++) {
    thingsToSort.push(true);
  }

  // Sort all the arrays....
  for (i in sortArrs) {
    if (sortArrs.hasOwnProperty(i)) {
      lastSorts = [];
      tmpArray = [];
      elIndex = 0;
      nLastSort = [];
      lastSort = [];

      // If there are no sortComponents, then no more sorting is neeeded.
      // Copy the array back to the argument.
      if (sortComponents.length === 0) {
        if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
          args[i] = sortArrs[i];
        } else {
          for (k in arguments[i]) {
            if (arguments[i].hasOwnProperty(k)) {
              delete arguments[i][k];
            }
          }
          sal = sortArrs[i].length;
          for (j = 0, vkey = 0; j < sal; j++) {
            vkey = sortKeys[i][j];
            args[i][vkey] = sortArrs[i][j];
          }
        }
        sortArrs.splice(i, 1);
        sortKeys.splice(i, 1);
        continue;
      }

      // Sort function for sorting. Either sorts asc or desc, regular/string or numeric.
      var sFunction = sortFunctions[sortFlag[i] & 3][(sortFlag[i] & 8) > 0 ? 1 : 0];

      // Sort current array.
      for (l = 0; l !== sortComponents.length; l += 2) {
        tmpArray = sortArrs[i].slice(sortComponents[l], sortComponents[l + 1] + 1);
        tmpArray.sort(sFunction);
        // Is there a better way to copy an array in Javascript?
        lastSorts[l] = [].concat(lastSort);
        elIndex = sortComponents[l];
        for (g in tmpArray) {
          if (tmpArray.hasOwnProperty(g)) {
            sortArrs[i][elIndex] = tmpArray[g];
            elIndex++;
          }
        }
      }

      // Duplicate the sorting of the current array on future arrays.
      sFunction = sortDuplicator;
      for (j in sortArrs) {
        if (sortArrs.hasOwnProperty(j)) {
          if (sortArrs[j] === sortArrs[i]) {
            continue;
          }
          for (l = 0; l !== sortComponents.length; l += 2) {
            tmpArray = sortArrs[j].slice(sortComponents[l], sortComponents[l + 1] + 1);
            // alert(l + ':' + nLastSort);
            nLastSort = [].concat(lastSorts[l]);
            tmpArray.sort(sFunction);
            elIndex = sortComponents[l];
            for (g in tmpArray) {
              if (tmpArray.hasOwnProperty(g)) {
                sortArrs[j][elIndex] = tmpArray[g];
                elIndex++;
              }
            }
          }
        }
      }

      // Duplicate the sorting of the current array on array keys
      for (j in sortKeys) {
        if (sortKeys.hasOwnProperty(j)) {
          for (l = 0; l !== sortComponents.length; l += 2) {
            tmpArray = sortKeys[j].slice(sortComponents[l], sortComponents[l + 1] + 1);
            nLastSort = [].concat(lastSorts[l]);
            tmpArray.sort(sFunction);
            elIndex = sortComponents[l];
            for (g in tmpArray) {
              if (tmpArray.hasOwnProperty(g)) {
                sortKeys[j][elIndex] = tmpArray[g];
                elIndex++;
              }
            }
          }
        }
      }

      // Generate the next sortComponents
      zlast = null;
      sortComponents = [];
      for (j in sortArrs[i]) {
        if (sortArrs[i].hasOwnProperty(j)) {
          if (!thingsToSort[j]) {
            if (sortComponents.length & 1) {
              sortComponents.push(j - 1);
            }
            zlast = null;
            continue;
          }
          if (!(sortComponents.length & 1)) {
            if (zlast !== null) {
              if (sortArrs[i][j] === zlast) {
                sortComponents.push(j - 1);
              } else {
                thingsToSort[j] = false;
              }
            }
            zlast = sortArrs[i][j];
          } else {
            if (sortArrs[i][j] !== zlast) {
              sortComponents.push(j - 1);
              zlast = sortArrs[i][j];
            }
          }
        }
      }

      if (sortComponents.length & 1) {
        sortComponents.push(j);
      }
      if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
        args[i] = sortArrs[i];
      } else {
        for (j in arguments[i]) {
          if (arguments[i].hasOwnProperty(j)) {
            delete arguments[i][j];
          }
        }

        sal = sortArrs[i].length;
        for (j = 0, vkey = 0; j < sal; j++) {
          vkey = sortKeys[i][j];
          args[i][vkey] = sortArrs[i][j];
        }
      }
      sortArrs.splice(i, 1);
      sortKeys.splice(i, 1);
    }
  }
  return true;
};

},{}],26:[function(require,module,exports){
'use strict';

module.exports = function array_pad(input, padSize, padValue) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_pad/
  // original by: Waldo Malqui Silva (http://waldo.malqui.info)
  //   example 1: array_pad([ 7, 8, 9 ], 2, 'a')
  //   returns 1: [ 7, 8, 9]
  //   example 2: array_pad([ 7, 8, 9 ], 5, 'a')
  //   returns 2: [ 7, 8, 9, 'a', 'a']
  //   example 3: array_pad([ 7, 8, 9 ], 5, 2)
  //   returns 3: [ 7, 8, 9, 2, 2]
  //   example 4: array_pad([ 7, 8, 9 ], -5, 'a')
  //   returns 4: [ 'a', 'a', 7, 8, 9 ]

  var pad = [];
  var newArray = [];
  var newLength;
  var diff = 0;
  var i = 0;

  if (Object.prototype.toString.call(input) === '[object Array]' && !isNaN(padSize)) {
    newLength = padSize < 0 ? padSize * -1 : padSize;
    diff = newLength - input.length;

    if (diff > 0) {
      for (i = 0; i < diff; i++) {
        newArray[i] = padValue;
      }
      pad = padSize < 0 ? newArray.concat(input) : input.concat(newArray);
    } else {
      pad = input;
    }
  }

  return pad;
};

},{}],27:[function(require,module,exports){
'use strict';

module.exports = function array_pop(inputArr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_pop/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Brett Zamir (http://brett-zamir.me)
  //    input by: Theriault (https://github.com/Theriault)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //      note 1: While IE (and other browsers) support iterating an object's
  //      note 1: own properties in order, if one attempts to add back properties
  //      note 1: in IE, they may end up in their former position due to their position
  //      note 1: being retained. So use of this function with "associative arrays"
  //      note 1: (objects) may lead to unexpected behavior in an IE environment if
  //      note 1: you add back properties with the same keys that you removed
  //   example 1: array_pop([0,1,2])
  //   returns 1: 2
  //   example 2: var $data = {firstName: 'Kevin', surName: 'van Zonneveld'}
  //   example 2: var $lastElem = array_pop($data)
  //   example 2: var $result = $data
  //   returns 2: {firstName: 'Kevin'}

  var key = '';
  var lastKey = '';

  if (inputArr.hasOwnProperty('length')) {
    // Indexed
    if (!inputArr.length) {
      // Done popping, are we?
      return null;
    }
    return inputArr.pop();
  } else {
    // Associative
    for (key in inputArr) {
      if (inputArr.hasOwnProperty(key)) {
        lastKey = key;
      }
    }
    if (lastKey) {
      var tmp = inputArr[lastKey];
      delete inputArr[lastKey];
      return tmp;
    } else {
      return null;
    }
  }
};

},{}],28:[function(require,module,exports){
'use strict';

module.exports = function array_product(input) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_product/
  // original by: Waldo Malqui Silva (http://waldo.malqui.info)
  //   example 1: array_product([ 2, 4, 6, 8 ])
  //   returns 1: 384

  var idx = 0;
  var product = 1;
  var il = 0;

  if (Object.prototype.toString.call(input) !== '[object Array]') {
    return null;
  }

  il = input.length;
  while (idx < il) {
    product *= !isNaN(input[idx]) ? input[idx] : 0;
    idx++;
  }

  return product;
};

},{}],29:[function(require,module,exports){
'use strict';

module.exports = function array_push(inputArr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_push/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Note also that IE retains information about property position even
  //      note 1: after being supposedly deleted, so if you delete properties and then
  //      note 1: add back properties with the same keys (including numeric) that had
  //      note 1: been deleted, the order will be as before; thus, this function is not
  //      note 1: really recommended with associative arrays (objects) in IE environments
  //   example 1: array_push(['kevin','van'], 'zonneveld')
  //   returns 1: 3

  var i = 0;
  var pr = '';
  var argv = arguments;
  var argc = argv.length;
  var allDigits = /^\d$/;
  var size = 0;
  var highestIdx = 0;
  var len = 0;

  if (inputArr.hasOwnProperty('length')) {
    for (i = 1; i < argc; i++) {
      inputArr[inputArr.length] = argv[i];
    }
    return inputArr.length;
  }

  // Associative (object)
  for (pr in inputArr) {
    if (inputArr.hasOwnProperty(pr)) {
      ++len;
      if (pr.search(allDigits) !== -1) {
        size = parseInt(pr, 10);
        highestIdx = size > highestIdx ? size : highestIdx;
      }
    }
  }
  for (i = 1; i < argc; i++) {
    inputArr[++highestIdx] = argv[i];
  }

  return len + i - 1;
};

},{}],30:[function(require,module,exports){
'use strict';

module.exports = function array_rand(array, num) {
  // eslint-disable-line camelcase
  //       discuss at: http://locutus.io/php/array_rand/
  //      original by: Waldo Malqui Silva (http://waldo.malqui.info)
  // reimplemented by: Rafał Kukawski
  //        example 1: array_rand( ['Kevin'], 1 )
  //        returns 1: '0'

  // By using Object.keys we support both, arrays and objects
  // which phpjs wants to support
  var keys = Object.keys(array);

  if (typeof num === 'undefined' || num === null) {
    num = 1;
  } else {
    num = +num;
  }

  if (isNaN(num) || num < 1 || num > keys.length) {
    return null;
  }

  // shuffle the array of keys
  for (var i = keys.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1)); // 0 ≤ j ≤ i

    var tmp = keys[j];
    keys[j] = keys[i];
    keys[i] = tmp;
  }

  return num === 1 ? keys[0] : keys.slice(0, num);
};

},{}],31:[function(require,module,exports){
"use strict";

module.exports = function array_reduce(aInput, callback) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_reduce/
  // original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
  //      note 1: Takes a function as an argument, not a function's name
  //   example 1: array_reduce([1, 2, 3, 4, 5], function (v, w){v += w;return v;})
  //   returns 1: 15

  var lon = aInput.length;
  var res = 0;
  var i = 0;
  var tmp = [];

  for (i = 0; i < lon; i += 2) {
    tmp[0] = aInput[i];
    if (aInput[i + 1]) {
      tmp[1] = aInput[i + 1];
    } else {
      tmp[1] = 0;
    }
    res += callback.apply(null, tmp);
    tmp = [];
  }

  return res;
};

},{}],32:[function(require,module,exports){
'use strict';

module.exports = function array_replace(arr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_replace/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_replace(["orange", "banana", "apple", "raspberry"], {0 : "pineapple", 4 : "cherry"}, {0:"grape"})
  //   returns 1: {0: 'grape', 1: 'banana', 2: 'apple', 3: 'raspberry', 4: 'cherry'}

  var retObj = {};
  var i = 0;
  var p = '';
  var argl = arguments.length;

  if (argl < 2) {
    throw new Error('There should be at least 2 arguments passed to array_replace()');
  }

  // Although docs state that the arguments are passed in by reference,
  // it seems they are not altered, but rather the copy that is returned
  // (just guessing), so we make a copy here, instead of acting on arr itself
  for (p in arr) {
    retObj[p] = arr[p];
  }

  for (i = 1; i < argl; i++) {
    for (p in arguments[i]) {
      retObj[p] = arguments[i][p];
    }
  }

  return retObj;
};

},{}],33:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_replace_recursive(arr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_replace_recursive/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_replace_recursive({'citrus' : ['orange'], 'berries' : ['blackberry', 'raspberry']}, {'citrus' : ['pineapple'], 'berries' : ['blueberry']})
  //   returns 1: {citrus : ['pineapple'], berries : ['blueberry', 'raspberry']}

  var i = 0;
  var p = '';
  var argl = arguments.length;
  var retObj;

  if (argl < 2) {
    throw new Error('There should be at least 2 arguments passed to array_replace_recursive()');
  }

  // Although docs state that the arguments are passed in by reference,
  // it seems they are not altered, but rather the copy that is returned
  // So we make a copy here, instead of acting on arr itself
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    retObj = [];
    for (p in arr) {
      retObj.push(arr[p]);
    }
  } else {
    retObj = {};
    for (p in arr) {
      retObj[p] = arr[p];
    }
  }

  for (i = 1; i < argl; i++) {
    for (p in arguments[i]) {
      if (retObj[p] && _typeof(retObj[p]) === 'object') {
        retObj[p] = array_replace_recursive(retObj[p], arguments[i][p]);
      } else {
        retObj[p] = arguments[i][p];
      }
    }
  }

  return retObj;
};

},{}],34:[function(require,module,exports){
'use strict';

module.exports = function array_reverse(array, preserveKeys) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_reverse/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Karol Kowalski
  //   example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true)
  //   returns 1: { 2: ['green', 'red'], 1: '4.0', 0: 'php'}

  var isArray = Object.prototype.toString.call(array) === '[object Array]';
  var tmpArr = preserveKeys ? {} : [];
  var key;

  if (isArray && !preserveKeys) {
    return array.slice(0).reverse();
  }

  if (preserveKeys) {
    var keys = [];
    for (key in array) {
      keys.push(key);
    }

    var i = keys.length;
    while (i--) {
      key = keys[i];
      // @todo: don't rely on browsers keeping keys in insertion order
      // it's implementation specific
      // eg. the result will differ from expected in Google Chrome
      tmpArr[key] = array[key];
    }
  } else {
    for (key in array) {
      tmpArr.unshift(array[key]);
    }
  }

  return tmpArr;
};

},{}],35:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_search(needle, haystack, argStrict) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_search/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Reynier de la Rosa (http://scriptinside.blogspot.com.es/)
  //        test: skip-all
  //   example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'})
  //   returns 1: 'surname'
  //   example 2: array_search('3', {a: 3, b: 5, c: 7})
  //   returns 2: 'a'

  var strict = !!argStrict;
  var key = '';

  if ((typeof needle === 'undefined' ? 'undefined' : _typeof(needle)) === 'object' && needle.exec) {
    // Duck-type for RegExp
    if (!strict) {
      // Let's consider case sensitive searches as strict
      var flags = 'i' + (needle.global ? 'g' : '') + (needle.multiline ? 'm' : '') + (
      // sticky is FF only
      needle.sticky ? 'y' : '');
      needle = new RegExp(needle.source, flags);
    }
    for (key in haystack) {
      if (haystack.hasOwnProperty(key)) {
        if (needle.test(haystack[key])) {
          return key;
        }
      }
    }
    return false;
  }

  for (key in haystack) {
    if (haystack.hasOwnProperty(key)) {
      if (strict && haystack[key] === needle || !strict && haystack[key] == needle) {
        // eslint-disable-line eqeqeq
        return key;
      }
    }
  }

  return false;
};

},{}],36:[function(require,module,exports){
"use strict";

module.exports = function array_shift(inputArr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_shift/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Martijn Wieringa
  //      note 1: Currently does not handle objects
  //   example 1: array_shift(['Kevin', 'van', 'Zonneveld'])
  //   returns 1: 'Kevin'

  var _checkToUpIndices = function _checkToUpIndices(arr, ct, key) {
    // Deal with situation, e.g., if encounter index 4 and try
    // to set it to 0, but 0 exists later in loop (need to
    // increment all subsequent (skipping current key, since
    // we need its value below) until find unused)
    if (arr[ct] !== undefined) {
      var tmp = ct;
      ct += 1;
      if (ct === key) {
        ct += 1;
      }
      ct = _checkToUpIndices(arr, ct, key);
      arr[ct] = arr[tmp];
      delete arr[tmp];
    }

    return ct;
  };

  if (inputArr.length === 0) {
    return null;
  }
  if (inputArr.length > 0) {
    return inputArr.shift();
  }
};

},{}],37:[function(require,module,exports){
'use strict';

module.exports = function array_slice(arr, offst, lgth, preserveKeys) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_slice/
  // original by: Brett Zamir (http://brett-zamir.me)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  //      note 1: Relies on is_int because !isNaN accepts floats
  //   example 1: array_slice(["a", "b", "c", "d", "e"], 2, -1)
  //   returns 1: [ 'c', 'd' ]
  //   example 2: array_slice(["a", "b", "c", "d", "e"], 2, -1, true)
  //   returns 2: {2: 'c', 3: 'd'}

  var isInt = require('../var/is_int');

  /*
    if ('callee' in arr && 'length' in arr) {
      arr = Array.prototype.slice.call(arr);
    }
  */

  var key = '';

  if (Object.prototype.toString.call(arr) !== '[object Array]' || preserveKeys && offst !== 0) {
    // Assoc. array as input or if required as output
    var lgt = 0;
    var newAssoc = {};
    for (key in arr) {
      lgt += 1;
      newAssoc[key] = arr[key];
    }
    arr = newAssoc;

    offst = offst < 0 ? lgt + offst : offst;
    lgth = lgth === undefined ? lgt : lgth < 0 ? lgt + lgth - offst : lgth;

    var assoc = {};
    var start = false;
    var it = -1;
    var arrlgth = 0;
    var noPkIdx = 0;

    for (key in arr) {
      ++it;
      if (arrlgth >= lgth) {
        break;
      }
      if (it === offst) {
        start = true;
      }
      if (!start) {
        continue;
      }++arrlgth;
      if (isInt(key) && !preserveKeys) {
        assoc[noPkIdx++] = arr[key];
      } else {
        assoc[key] = arr[key];
      }
    }
    // Make as array-like object (though length will not be dynamic)
    // assoc.length = arrlgth;
    return assoc;
  }

  if (lgth === undefined) {
    return arr.slice(offst);
  } else if (lgth >= 0) {
    return arr.slice(offst, offst + lgth);
  } else {
    return arr.slice(offst, lgth);
  }
};

},{"../var/is_int":79}],38:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_splice(arr, offst, lgth, replacement) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_splice/
  // original by: Brett Zamir (http://brett-zamir.me)
  //    input by: Theriault (https://github.com/Theriault)
  //      note 1: Order does get shifted in associative array input with numeric indices,
  //      note 1: since PHP behavior doesn't preserve keys, but I understand order is
  //      note 1: not reliable anyways
  //      note 1: Note also that IE retains information about property position even
  //      note 1: after being supposedly deleted, so use of this function may produce
  //      note 1: unexpected results in IE if you later attempt to add back properties
  //      note 1: with the same keys that had been deleted
  //   example 1: var $input = {4: "red", 'abc': "green", 2: "blue", 'dud': "yellow"}
  //   example 1: array_splice($input, 2)
  //   returns 1: {4: "red", 'abc': "green"}
  //   example 2: var $input = ["red", "green", "blue", "yellow"]
  //   example 2: array_splice($input, 3, 0, "purple")
  //   returns 2: []
  //   example 3: var $input = ["red", "green", "blue", "yellow"]
  //   example 3: array_splice($input, -1, 1, ["black", "maroon"])
  //   returns 3: ["yellow"]
  //        test: skip-1

  var isInt = require('../var/is_int');

  var _checkToUpIndices = function _checkToUpIndices(arr, ct, key) {
    // Deal with situation, e.g., if encounter index 4 and try
    // to set it to 0, but 0 exists later in loop (need to
    // increment all subsequent (skipping current key,
    // since we need its value below) until find unused)
    if (arr[ct] !== undefined) {
      var tmp = ct;
      ct += 1;
      if (ct === key) {
        ct += 1;
      }
      ct = _checkToUpIndices(arr, ct, key);
      arr[ct] = arr[tmp];
      delete arr[tmp];
    }
    return ct;
  };

  if (replacement && (typeof replacement === 'undefined' ? 'undefined' : _typeof(replacement)) !== 'object') {
    replacement = [replacement];
  }
  if (lgth === undefined) {
    lgth = offst >= 0 ? arr.length - offst : -offst;
  } else if (lgth < 0) {
    lgth = (offst >= 0 ? arr.length - offst : -offst) + lgth;
  }

  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    /* if (arr.length !== undefined) {
     // Deal with array-like objects as input
    delete arr.length;
    } */
    var lgt = 0;
    var ct = -1;
    var rmvd = [];
    var rmvdObj = {};
    var replCt = -1;
    var intCt = -1;
    var returnArr = true;
    var rmvdCt = 0;
    // var rmvdLngth = 0
    var key = '';
    // rmvdObj.length = 0;
    for (key in arr) {
      // Can do arr.__count__ in some browsers
      lgt += 1;
    }
    offst = offst >= 0 ? offst : lgt + offst;
    for (key in arr) {
      ct += 1;
      if (ct < offst) {
        if (isInt(key)) {
          intCt += 1;
          if (parseInt(key, 10) === intCt) {
            // Key is already numbered ok, so don't need to change key for value
            continue;
          }
          // Deal with situation, e.g.,
          _checkToUpIndices(arr, intCt, key);
          // if encounter index 4 and try to set it to 0, but 0 exists later in loop
          arr[intCt] = arr[key];
          delete arr[key];
        }
        continue;
      }
      if (returnArr && isInt(key)) {
        rmvd.push(arr[key]);
        // PHP starts over here too
        rmvdObj[rmvdCt++] = arr[key];
      } else {
        rmvdObj[key] = arr[key];
        returnArr = false;
      }
      // rmvdLngth += 1
      // rmvdObj.length += 1;
      if (replacement && replacement[++replCt]) {
        arr[key] = replacement[replCt];
      } else {
        delete arr[key];
      }
    }
    // Make (back) into an array-like object
    // arr.length = lgt - rmvdLngth + (replacement ? replacement.length : 0);
    return returnArr ? rmvd : rmvdObj;
  }

  if (replacement) {
    replacement.unshift(offst, lgth);
    return Array.prototype.splice.apply(arr, replacement);
  }

  return arr.splice(offst, lgth);
};

},{"../var/is_int":79}],39:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_sum(array) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_sum/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Nate
  // bugfixed by: Gilbert
  // improved by: David Pilia (http://www.beteck.it/)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_sum([4, 9, 182.6])
  //   returns 1: 195.6
  //   example 2: var $total = []
  //   example 2: var $index = 0.1
  //   example 2: for (var $y = 0; $y < 12; $y++){ $total[$y] = $y + $index }
  //   example 2: array_sum($total)
  //   returns 2: 67.2

  var key;
  var sum = 0;

  // input sanitation
  if ((typeof array === 'undefined' ? 'undefined' : _typeof(array)) !== 'object') {
    return null;
  }

  for (key in array) {
    if (!isNaN(parseFloat(array[key]))) {
      sum += parseFloat(array[key]);
    }
  }

  return sum;
};

},{}],40:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_udiff(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_udiff/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_udiff($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {c: 'blue'}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var cb = arguments[arglm1];
  var arr = '';
  var i = 1;
  var k1 = '';
  var k = '';

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < arglm1; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (cb(arr[k], arr1[k1]) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],41:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_udiff_assoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_udiff_assoc/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_udiff_assoc({0: 'kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {1: 'van', 2: 'Zonneveld'}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var cb = arguments[arglm1];
  var arr = {};
  var i = 1;
  var k1 = '';
  var k = '';

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < arglm1; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (cb(arr[k], arr1[k1]) === 0 && k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],42:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_udiff_uassoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_udiff_uassoc/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_udiff_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {0: 'red', c: 'blue'}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var arglm2 = arglm1 - 1;
  var cb = arguments[arglm1];
  var cb0 = arguments[arglm2];
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  cb0 = typeof cb0 === 'string' ? $global[cb0] : Object.prototype.toString.call(cb0) === '[object Array]' ? $global[cb0[0]][cb0[1]] : cb0;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < arglm2; i++) {
      arr = arguments[i];
      for (k in arr) {
        if (cb0(arr[k], arr1[k1]) === 0 && cb(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys; // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1];
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],43:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_uintersect(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_uintersect/
  // original by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Demosthenes Koptsis
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_uintersect($array1, $array2, function( f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {a: 'green', b: 'brown', 0: 'red'}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var arglm2 = arglm1 - 1;
  var cb = arguments[arglm1];
  var k1 = '';
  var i = 1;
  var arr = {};
  var k = '';

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    arrs: for (i = 1; i < arglm1; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (cb(arr[k], arr1[k1]) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],44:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function array_uintersect_uassoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_uintersect_uassoc/
  // original by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_uintersect_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {a: 'green', b: 'brown'}

  var retArr = {};
  var arglm1 = arguments.length - 1;
  var arglm2 = arglm1 - 1;
  var cb = arguments[arglm1];
  var cb0 = arguments[arglm2];
  var k1 = '';
  var i = 1;
  var k = '';
  var arr = {};

  var $global = typeof window !== 'undefined' ? window : global;

  cb = typeof cb === 'string' ? $global[cb] : Object.prototype.toString.call(cb) === '[object Array]' ? $global[cb[0]][cb[1]] : cb;

  cb0 = typeof cb0 === 'string' ? $global[cb0] : Object.prototype.toString.call(cb0) === '[object Array]' ? $global[cb0[0]][cb0[1]] : cb0;

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    arrs: for (i = 1; i < arglm2; i++) {
      // eslint-disable-line no-labels
      arr = arguments[i];
      for (k in arr) {
        if (cb0(arr[k], arr1[k1]) === 0 && cb(k, k1) === 0) {
          if (i === arguments.length - 3) {
            retArr[k1] = arr1[k1];
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs; // eslint-disable-line no-labels
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys; // eslint-disable-line no-labels
    }
  }

  return retArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],45:[function(require,module,exports){
'use strict';

module.exports = function array_unique(inputArr) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_unique/
  // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
  //    input by: duncan
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Nate
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  // improved by: Michael Grier
  //      note 1: The second argument, sort_flags is not implemented;
  //      note 1: also should be sorted (asort?) first according to docs
  //   example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin'])
  //   returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
  //   example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'})
  //   returns 2: {a: 'green', 0: 'red', 1: 'blue'}

  var key = '';
  var tmpArr2 = {};
  var val = '';

  var _arraySearch = function _arraySearch(needle, haystack) {
    var fkey = '';
    for (fkey in haystack) {
      if (haystack.hasOwnProperty(fkey)) {
        if (haystack[fkey] + '' === needle + '') {
          return fkey;
        }
      }
    }
    return false;
  };

  for (key in inputArr) {
    if (inputArr.hasOwnProperty(key)) {
      val = inputArr[key];
      if (_arraySearch(val, tmpArr2) === false) {
        tmpArr2[key] = val;
      }
    }
  }

  return tmpArr2;
};

},{}],46:[function(require,module,exports){
"use strict";

module.exports = function array_unshift(array) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_unshift/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Martijn Wieringa
  // improved by: jmweb
  //      note 1: Currently does not handle objects
  //   example 1: array_unshift(['van', 'Zonneveld'], 'Kevin')
  //   returns 1: 3

  var i = arguments.length;

  while (--i !== 0) {
    arguments[0].unshift(arguments[i]);
  }

  return arguments[0].length;
};

},{}],47:[function(require,module,exports){
'use strict';

module.exports = function array_values(input) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_values/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} )
  //   returns 1: [ 'Kevin', 'van Zonneveld' ]

  var tmpArr = [];
  var key = '';

  for (key in input) {
    tmpArr[tmpArr.length] = input[key];
  }

  return tmpArr;
};

},{}],48:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_walk(array, funcname, userdata) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/array_walk/
  // original by: Johnny Mast (http://www.phpvrouwen.nl)
  // bugfixed by: David
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Only works with user-defined functions, not built-in functions like void()
  //   example 1: array_walk ([3, 4], function () {}, 'userdata')
  //   returns 1: true
  //   example 2: array_walk ('mystring', function () {})
  //   returns 2: false
  //   example 3: array_walk ({"title":"my title"}, function () {})
  //   returns 3: true

  if (!array || (typeof array === 'undefined' ? 'undefined' : _typeof(array)) !== 'object') {
    return false;
  }

  try {
    if (typeof funcname === 'function') {
      for (var key in array) {
        if (arguments.length > 2) {
          funcname(array[key], key, userdata);
        } else {
          funcname(array[key], key);
        }
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

},{}],49:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function array_walk_recursive(array, funcname, userdata) {
  // eslint-disable-line camelcase
  // original by: Hugues Peccatte
  //      note 1: Only works with user-defined functions, not built-in functions like void()
  //   example 1: array_walk_recursive([3, 4], function () {}, 'userdata')
  //   returns 1: true
  //   example 2: array_walk_recursive([3, [4]], function () {}, 'userdata')
  //   returns 2: true
  //   example 3: array_walk_recursive([3, []], function () {}, 'userdata')
  //   returns 3: true

  if (!array || (typeof array === 'undefined' ? 'undefined' : _typeof(array)) !== 'object') {
    return false;
  }

  if (typeof funcname !== 'function') {
    return false;
  }

  for (var key in array) {
    // apply "funcname" recursively only on arrays
    if (Object.prototype.toString.call(array[key]) === '[object Array]') {
      var funcArgs = [array[key], funcname];
      if (arguments.length > 2) {
        funcArgs.push(userdata);
      }
      if (array_walk_recursive.apply(null, funcArgs) === false) {
        return false;
      }
      continue;
    }
    try {
      if (arguments.length > 2) {
        funcname(array[key], key, userdata);
      } else {
        funcname(array[key], key);
      }
    } catch (e) {
      return false;
    }
  }

  return true;
};

},{}],50:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function arsort(inputArr, sortFlags) {
  //  discuss at: http://locutus.io/php/arsort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //      note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  //      note 1: integrated into all of these functions by adapting the code at
  //      note 1: http://sourcefrog.net/projects/natsort/natcompare.js
  //      note 1: The examples are correct, this is a new way
  //      note 1: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: Since JS objects' keys are always strings, and (the
  //      note 1: default) SORT_REGULAR flag distinguishes by key type,
  //      note 1: if the content is a numeric string, we treat the
  //      note 1: "original type" as numeric.
  //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: arsort($data)
  //   example 1: var $result = $data
  //   returns 1: {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 2: arsort($data)
  //   example 2: var $result = $data
  //   returns 2: {a: 'orange', d: 'lemon', b: 'banana', c: 'apple'}
  //        test: skip-1

  var i18lgd = require('../i18n/i18n_loc_get_default');
  var strnatcmp = require('../strings/strnatcmp');
  var valArr = [];
  var valArrLen = 0;
  var k;
  var i;
  var sorter;
  var sortByReference = false;
  var populateArr = {};

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  switch (sortFlags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function sorter(a, b) {
        return strnatcmp(b, a);
      };
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, based on the current locale
      // (set with i18n_loc_set_default() as of PHP6)
      var loc = i18lgd();
      sorter = $locutus.php.locales[loc].sorting;
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function sorter(a, b) {
        return a - b;
      };
      break;
    case 'SORT_REGULAR':
      // compare items normally (don't change types)
      break;
    default:
      sorter = function sorter(b, a) {
        var aFloat = parseFloat(a);
        var bFloat = parseFloat(b);
        var aNumeric = aFloat + '' === a;
        var bNumeric = bFloat + '' === b;

        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }

        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function (a, b) {
    return sorter(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0, valArrLen = valArr.length; i < valArrLen; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
    if (sortByReference) {
      inputArr[valArr[i][0]] = valArr[i][1];
    }
  }

  return sortByReference || populateArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../i18n/i18n_loc_get_default":75,"../info/ini_get":76,"../strings/strnatcmp":78}],51:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function asort(inputArr, sortFlags) {
  //  discuss at: http://locutus.io/php/asort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //    input by: paulo kuong
  // bugfixed by: Adam Wallner (http://web2.bitbaro.hu/)
  //      note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  //      note 1: integrated into all of these functions by adapting the code at
  //      note 1: http://sourcefrog.net/projects/natsort/natcompare.js
  //      note 1: The examples are correct, this is a new way
  //      note 1: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: Since JS objects' keys are always strings, and (the
  //      note 1: default) SORT_REGULAR flag distinguishes by key type,
  //      note 1: if the content is a numeric string, we treat the
  //      note 1: "original type" as numeric.
  //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: asort($data)
  //   example 1: var $result = $data
  //   returns 1: {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 2: asort($data)
  //   example 2: var $result = $data
  //   returns 2: {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}

  var strnatcmp = require('../strings/strnatcmp');
  var i18nlgd = require('../i18n/i18n_loc_get_default');

  var valArr = [];
  var valArrLen = 0;
  var k;
  var i;
  var sorter;
  var sortByReference = false;
  var populateArr = {};

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  switch (sortFlags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function sorter(a, b) {
        return strnatcmp(a, b);
      };
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, based on the current locale
      // (set with i18n_loc_set_default() as of PHP6)
      var loc = i18nlgd();
      sorter = $locutus.php.locales[loc].sorting;
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function sorter(a, b) {
        return a - b;
      };
      break;
    case 'SORT_REGULAR':
      // compare items normally (don't change types)
      break;
    default:
      sorter = function sorter(a, b) {
        var aFloat = parseFloat(a);
        var bFloat = parseFloat(b);
        var aNumeric = aFloat + '' === a;
        var bNumeric = bFloat + '' === b;
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }

  valArr.sort(function (a, b) {
    return sorter(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0, valArrLen = valArr.length; i < valArrLen; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return sortByReference || populateArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../i18n/i18n_loc_get_default":75,"../info/ini_get":76,"../strings/strnatcmp":78}],52:[function(require,module,exports){
'use strict';

module.exports = function count(mixedVar, mode) {
  //  discuss at: http://locutus.io/php/count/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Waldo Malqui Silva (http://waldo.malqui.info)
  //    input by: merabi
  // bugfixed by: Soren Hansen
  // bugfixed by: Olivier Louvignes (http://mg-crea.com/)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE')
  //   returns 1: 6
  //   example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE')
  //   returns 2: 6

  var key;
  var cnt = 0;

  if (mixedVar === null || typeof mixedVar === 'undefined') {
    return 0;
  } else if (mixedVar.constructor !== Array && mixedVar.constructor !== Object) {
    return 1;
  }

  if (mode === 'COUNT_RECURSIVE') {
    mode = 1;
  }
  if (mode !== 1) {
    mode = 0;
  }

  for (key in mixedVar) {
    if (mixedVar.hasOwnProperty(key)) {
      cnt++;
      if (mode === 1 && mixedVar[key] && (mixedVar[key].constructor === Array || mixedVar[key].constructor === Object)) {
        cnt += count(mixedVar[key], 1);
      }
    }
  }

  return cnt;
};

},{}],53:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function current(arr) {
  //  discuss at: http://locutus.io/php/current/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //   example 1: current($transport)
  //   returns 1: 'foot'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  var cursor = pointers[arrpos + 1];
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    return arr[cursor] || false;
  }
  var ct = 0;
  for (var k in arr) {
    if (ct === cursor) {
      return arr[k];
    }
    ct++;
  }
  // Empty
  return false;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],54:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function each(arr) {
  //  discuss at: http://locutus.io/php/each/
  // original by: Ates Goral (http://magnetiq.com)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: each({a: "apple", b: "balloon"})
  //   returns 1: {0: "a", 1: "apple", key: "a", value: "apple"}

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  var cursor = pointers[arrpos + 1];
  var pos = 0;

  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      if (ct === cursor) {
        pointers[arrpos + 1] += 1;
        if (each.returnArrayOnly) {
          return [k, arr[k]];
        } else {
          return {
            1: arr[k],
            value: arr[k],
            0: k,
            key: k
          };
        }
      }
      ct++;
    }
    // Empty
    return false;
  }
  if (arr.length === 0 || cursor === arr.length) {
    return false;
  }
  pos = cursor;
  pointers[arrpos + 1] += 1;
  if (each.returnArrayOnly) {
    return [pos, arr[pos]];
  } else {
    return {
      1: arr[pos],
      value: arr[pos],
      0: pos,
      key: pos
    };
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],55:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function end(arr) {
  //  discuss at: http://locutus.io/php/end/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Legaev Andrey
  //  revised by: J A R
  //  revised by: Brett Zamir (http://brett-zamir.me)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: end({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
  //   returns 1: 'Zonneveld'
  //   example 2: end(['Kevin', 'van', 'Zonneveld'])
  //   returns 2: 'Zonneveld'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    var val;
    for (var k in arr) {
      ct++;
      val = arr[k];
    }
    if (ct === 0) {
      // Empty
      return false;
    }
    pointers[arrpos + 1] = ct - 1;
    return val;
  }
  if (arr.length === 0) {
    return false;
  }
  pointers[arrpos + 1] = arr.length - 1;
  return arr[pointers[arrpos + 1]];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],56:[function(require,module,exports){
'use strict';

module.exports = function in_array(needle, haystack, argStrict) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/in_array/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // improved by: vlado houba
  // improved by: Jonas Sciangula Street (Joni2Back)
  //    input by: Billy
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //   example 1: in_array('van', ['Kevin', 'van', 'Zonneveld'])
  //   returns 1: true
  //   example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'})
  //   returns 2: false
  //   example 3: in_array(1, ['1', '2', '3'])
  //   example 3: in_array(1, ['1', '2', '3'], false)
  //   returns 3: true
  //   returns 3: true
  //   example 4: in_array(1, ['1', '2', '3'], true)
  //   returns 4: false

  var key = '';
  var strict = !!argStrict;

  // we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] === ndl)
  // in just one for, in order to improve the performance
  // deciding wich type of comparation will do before walk array
  if (strict) {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true;
      }
    }
  } else {
    for (key in haystack) {
      if (haystack[key] == needle) {
        // eslint-disable-line eqeqeq
        return true;
      }
    }
  }

  return false;
};

},{}],57:[function(require,module,exports){
'use strict';

module.exports['array_change_key_case'] = require('./array_change_key_case');
module.exports['array_chunk'] = require('./array_chunk');
module.exports['array_combine'] = require('./array_combine');
module.exports['array_count_values'] = require('./array_count_values');
module.exports['array_diff'] = require('./array_diff');
module.exports['array_diff_assoc'] = require('./array_diff_assoc');
module.exports['array_diff_key'] = require('./array_diff_key');
module.exports['array_diff_uassoc'] = require('./array_diff_uassoc');
module.exports['array_diff_ukey'] = require('./array_diff_ukey');
module.exports['array_fill'] = require('./array_fill');
module.exports['array_fill_keys'] = require('./array_fill_keys');
module.exports['array_filter'] = require('./array_filter');
module.exports['array_flip'] = require('./array_flip');
module.exports['array_intersect'] = require('./array_intersect');
module.exports['array_intersect_assoc'] = require('./array_intersect_assoc');
module.exports['array_intersect_key'] = require('./array_intersect_key');
module.exports['array_intersect_uassoc'] = require('./array_intersect_uassoc');
module.exports['array_intersect_ukey'] = require('./array_intersect_ukey');
module.exports['array_key_exists'] = require('./array_key_exists');
module.exports['array_keys'] = require('./array_keys');
module.exports['array_map'] = require('./array_map');
module.exports['array_merge'] = require('./array_merge');
module.exports['array_merge_recursive'] = require('./array_merge_recursive');
module.exports['array_multisort'] = require('./array_multisort');
module.exports['array_pad'] = require('./array_pad');
module.exports['array_pop'] = require('./array_pop');
module.exports['array_product'] = require('./array_product');
module.exports['array_push'] = require('./array_push');
module.exports['array_rand'] = require('./array_rand');
module.exports['array_reduce'] = require('./array_reduce');
module.exports['array_replace'] = require('./array_replace');
module.exports['array_replace_recursive'] = require('./array_replace_recursive');
module.exports['array_reverse'] = require('./array_reverse');
module.exports['array_search'] = require('./array_search');
module.exports['array_shift'] = require('./array_shift');
module.exports['array_slice'] = require('./array_slice');
module.exports['array_splice'] = require('./array_splice');
module.exports['array_sum'] = require('./array_sum');
module.exports['array_udiff'] = require('./array_udiff');
module.exports['array_udiff_assoc'] = require('./array_udiff_assoc');
module.exports['array_udiff_uassoc'] = require('./array_udiff_uassoc');
module.exports['array_uintersect'] = require('./array_uintersect');
module.exports['array_uintersect_uassoc'] = require('./array_uintersect_uassoc');
module.exports['array_unique'] = require('./array_unique');
module.exports['array_unshift'] = require('./array_unshift');
module.exports['array_values'] = require('./array_values');
module.exports['array_walk'] = require('./array_walk');
module.exports['array_walk_recursive'] = require('./array_walk_recursive');
module.exports['arsort'] = require('./arsort');
module.exports['asort'] = require('./asort');
module.exports['count'] = require('./count');
module.exports['current'] = require('./current');
module.exports['each'] = require('./each');
module.exports['end'] = require('./end');
module.exports['in_array'] = require('./in_array');
module.exports['key'] = require('./key');
module.exports['krsort'] = require('./krsort');
module.exports['ksort'] = require('./ksort');
module.exports['natcasesort'] = require('./natcasesort');
module.exports['natsort'] = require('./natsort');
module.exports['next'] = require('./next');
module.exports['pos'] = require('./pos');
module.exports['prev'] = require('./prev');
module.exports['range'] = require('./range');
module.exports['reset'] = require('./reset');
module.exports['rsort'] = require('./rsort');
module.exports['shuffle'] = require('./shuffle');
module.exports['sizeof'] = require('./sizeof');
module.exports['sort'] = require('./sort');
module.exports['uasort'] = require('./uasort');
module.exports['uksort'] = require('./uksort');
module.exports['usort'] = require('./usort');

},{"./array_change_key_case":2,"./array_chunk":3,"./array_combine":4,"./array_count_values":5,"./array_diff":6,"./array_diff_assoc":7,"./array_diff_key":8,"./array_diff_uassoc":9,"./array_diff_ukey":10,"./array_fill":11,"./array_fill_keys":12,"./array_filter":13,"./array_flip":14,"./array_intersect":15,"./array_intersect_assoc":16,"./array_intersect_key":17,"./array_intersect_uassoc":18,"./array_intersect_ukey":19,"./array_key_exists":20,"./array_keys":21,"./array_map":22,"./array_merge":23,"./array_merge_recursive":24,"./array_multisort":25,"./array_pad":26,"./array_pop":27,"./array_product":28,"./array_push":29,"./array_rand":30,"./array_reduce":31,"./array_replace":32,"./array_replace_recursive":33,"./array_reverse":34,"./array_search":35,"./array_shift":36,"./array_slice":37,"./array_splice":38,"./array_sum":39,"./array_udiff":40,"./array_udiff_assoc":41,"./array_udiff_uassoc":42,"./array_uintersect":43,"./array_uintersect_uassoc":44,"./array_unique":45,"./array_unshift":46,"./array_values":47,"./array_walk":48,"./array_walk_recursive":49,"./arsort":50,"./asort":51,"./count":52,"./current":53,"./each":54,"./end":55,"./in_array":56,"./key":58,"./krsort":59,"./ksort":60,"./natcasesort":61,"./natsort":62,"./next":63,"./pos":64,"./prev":65,"./range":66,"./reset":67,"./rsort":68,"./shuffle":69,"./sizeof":70,"./sort":71,"./uasort":72,"./uksort":73,"./usort":74}],58:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function key(arr) {
  //  discuss at: http://locutus.io/php/key/
  // original by: Brett Zamir (http://brett-zamir.me)
  //    input by: Riddler (http://www.frontierwebdev.com/)
  // bugfixed by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: var $array = {fruit1: 'apple', 'fruit2': 'orange'}
  //   example 1: key($array)
  //   returns 1: 'fruit1'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }

  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var cursor = pointers[pointers.indexOf(arr) + 1];
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      if (ct === cursor) {
        return k;
      }
      ct++;
    }
    // Empty
    return false;
  }
  if (arr.length === 0) {
    return false;
  }

  return cursor;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],59:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function krsort(inputArr, sortFlags) {
  //  discuss at: http://locutus.io/php/krsort/
  // original by: GeekFG (http://geekfg.blogspot.com)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: pseudaria (https://github.com/pseudaria)
  //      note 1: The examples are correct, this is a new way
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: Since JS objects' keys are always strings, and (the
  //      note 1: default) SORT_REGULAR flag distinguishes by key type,
  //      note 1: if the content is a numeric string, we treat the
  //      note 1: "original type" as numeric.
  //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: krsort($data)
  //   example 1: var $result = $data
  //   returns 1: {d: 'lemon', c: 'apple', b: 'banana', a: 'orange'}
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'}
  //   example 2: krsort($data)
  //   example 2: var $result = $data
  //   returns 2: {3: 'Zonneveld', 2: 'van', 1: 'Kevin'}

  var i18nlgd = require('../i18n/i18n_loc_get_default');
  var strnatcmp = require('../strings/strnatcmp');

  var tmpArr = {};
  var keys = [];
  var sorter;
  var i;
  var k;
  var sortByReference = false;
  var populateArr = {};

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  switch (sortFlags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function sorter(a, b) {
        return strnatcmp(b, a);
      };
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, based on the current locale
      // (set with i18n_loc_set_default() as of PHP6)
      var loc = i18nlgd();
      sorter = $locutus.locales[loc].sorting;
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function sorter(a, b) {
        return b - a;
      };
      break;
    case 'SORT_REGULAR':
    default:
      // compare items normally (don't change types)
      sorter = function sorter(b, a) {
        var aFloat = parseFloat(a);
        var bFloat = parseFloat(b);
        var aNumeric = aFloat + '' === a;
        var bNumeric = bFloat + '' === b;
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k);
    }
  }
  keys.sort(sorter);

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    tmpArr[k] = inputArr[k];
    if (sortByReference) {
      delete inputArr[k];
    }
  }
  for (i in tmpArr) {
    if (tmpArr.hasOwnProperty(i)) {
      populateArr[i] = tmpArr[i];
    }
  }

  return sortByReference || populateArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../i18n/i18n_loc_get_default":75,"../info/ini_get":76,"../strings/strnatcmp":78}],60:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function ksort(inputArr, sortFlags) {
  //  discuss at: http://locutus.io/php/ksort/
  // original by: GeekFG (http://geekfg.blogspot.com)
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: Since JS objects' keys are always strings, and (the
  //      note 1: default) SORT_REGULAR flag distinguishes by key type,
  //      note 1: if the content is a numeric string, we treat the
  //      note 1: "original type" as numeric.
  //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: ksort($data)
  //   example 1: var $result = $data
  //   returns 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'}
  //   example 2: ksort($data)
  //   example 2: var $result = $data
  //   returns 2: {1: 'Kevin', 2: 'van', 3: 'Zonneveld'}

  var i18nlgd = require('../i18n/i18n_loc_get_default');
  var strnatcmp = require('../strings/strnatcmp');

  var tmpArr = {};
  var keys = [];
  var sorter;
  var i;
  var k;
  var sortByReference = false;
  var populateArr = {};

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  switch (sortFlags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function sorter(a, b) {
        return strnatcmp(b, a);
      };
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, based on the current locale
      // (set with i18n_loc_set_default() as of PHP6)
      var loc = i18nlgd();
      sorter = $locutus.locales[loc].sorting;
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function sorter(a, b) {
        return a + 0 - (b + 0);
      };
      break;
    default:
      // case 'SORT_REGULAR': // compare items normally (don't change types)
      sorter = function sorter(a, b) {
        var aFloat = parseFloat(a);
        var bFloat = parseFloat(b);
        var aNumeric = aFloat + '' === a;
        var bNumeric = bFloat + '' === b;
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k);
    }
  }
  keys.sort(sorter);

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    tmpArr[k] = inputArr[k];
    if (sortByReference) {
      delete inputArr[k];
    }
  }
  for (i in tmpArr) {
    if (tmpArr.hasOwnProperty(i)) {
      populateArr[i] = tmpArr[i];
    }
  }

  return sortByReference || populateArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../i18n/i18n_loc_get_default":75,"../info/ini_get":76,"../strings/strnatcmp":78}],61:[function(require,module,exports){
'use strict';

module.exports = function natcasesort(inputArr) {
  //  discuss at: http://locutus.io/php/natcasesort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: We cannot use numbers as keys and have them be reordered since they
  //      note 1: adhere to numerical order in some implementations
  //   example 1: var $array1 = {a:'IMG0.png', b:'img12.png', c:'img10.png', d:'img2.png', e:'img1.png', f:'IMG3.png'}
  //   example 1: natcasesort($array1)
  //   example 1: var $result = $array1
  //   returns 1: {a: 'IMG0.png', e: 'img1.png', d: 'img2.png', f: 'IMG3.png', c: 'img10.png', b: 'img12.png'}

  var strnatcasecmp = require('../strings/strnatcasecmp');
  var valArr = [];
  var k;
  var i;
  var sortByReference = false;
  var populateArr = {};

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function (a, b) {
    return strnatcasecmp(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0; i < valArr.length; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return sortByReference || populateArr;
};

},{"../info/ini_get":76,"../strings/strnatcasecmp":77}],62:[function(require,module,exports){
'use strict';

module.exports = function natsort(inputArr) {
  //  discuss at: http://locutus.io/php/natsort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $array1 = {a:"img12.png", b:"img10.png", c:"img2.png", d:"img1.png"}
  //   example 1: natsort($array1)
  //   example 1: var $result = $array1
  //   returns 1: {d: 'img1.png', c: 'img2.png', b: 'img10.png', a: 'img12.png'}

  var strnatcmp = require('../strings/strnatcmp');

  var valArr = [];
  var k;
  var i;
  var sortByReference = false;
  var populateArr = {};

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  // Get key and value arrays
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function (a, b) {
    return strnatcmp(a[1], b[1]);
  });

  // Repopulate the old array
  for (i = 0; i < valArr.length; i++) {
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return sortByReference || populateArr;
};

},{"../info/ini_get":76,"../strings/strnatcmp":78}],63:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function next(arr) {
  //  discuss at: http://locutus.io/php/next/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //   example 1: next($transport)
  //   example 1: next($transport)
  //   returns 1: 'car'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  var cursor = pointers[arrpos + 1];
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      if (ct === cursor + 1) {
        pointers[arrpos + 1] += 1;
        return arr[k];
      }
      ct++;
    }
    // End
    return false;
  }
  if (arr.length === 0 || cursor === arr.length - 1) {
    return false;
  }
  pointers[arrpos + 1] += 1;
  return arr[pointers[arrpos + 1]];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],64:[function(require,module,exports){
'use strict';

module.exports = function pos(arr) {
  //  discuss at: http://locutus.io/php/pos/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //   example 1: pos($transport)
  //   returns 1: 'foot'

  var current = require('../array/current');
  return current(arr);
};

},{"../array/current":53}],65:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function prev(arr) {
  //  discuss at: http://locutus.io/php/prev/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: var $transport = ['foot', 'bike', 'car', 'plane']
  //   example 1: prev($transport)
  //   returns 1: false

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  var arrpos = pointers.indexOf(arr);
  var cursor = pointers[arrpos + 1];
  if (pointers.indexOf(arr) === -1 || cursor === 0) {
    return false;
  }
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      if (ct === cursor - 1) {
        pointers[arrpos + 1] -= 1;
        return arr[k];
      }
      ct++;
    }
    // Shouldn't reach here
  }
  if (arr.length === 0) {
    return false;
  }
  pointers[arrpos + 1] -= 1;
  return arr[pointers[arrpos + 1]];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],66:[function(require,module,exports){
"use strict";

module.exports = function range(low, high, step) {
  //  discuss at: http://locutus.io/php/range/
  // original by: Waldo Malqui Silva (http://waldo.malqui.info)
  //   example 1: range ( 0, 12 )
  //   returns 1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  //   example 2: range( 0, 100, 10 )
  //   returns 2: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
  //   example 3: range( 'a', 'i' )
  //   returns 3: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
  //   example 4: range( 'c', 'a' )
  //   returns 4: ['c', 'b', 'a']

  var matrix = [];
  var iVal;
  var endval;
  var plus;
  var walker = step || 1;
  var chars = false;

  if (!isNaN(low) && !isNaN(high)) {
    iVal = low;
    endval = high;
  } else if (isNaN(low) && isNaN(high)) {
    chars = true;
    iVal = low.charCodeAt(0);
    endval = high.charCodeAt(0);
  } else {
    iVal = isNaN(low) ? 0 : low;
    endval = isNaN(high) ? 0 : high;
  }

  plus = !(iVal > endval);
  if (plus) {
    while (iVal <= endval) {
      matrix.push(chars ? String.fromCharCode(iVal) : iVal);
      iVal += walker;
    }
  } else {
    while (iVal >= endval) {
      matrix.push(chars ? String.fromCharCode(iVal) : iVal);
      iVal -= walker;
    }
  }

  return matrix;
};

},{}],67:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function reset(arr) {
  //  discuss at: http://locutus.io/php/reset/
  // original by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Legaev Andrey
  //  revised by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Uses global: locutus to store the array pointer
  //   example 1: reset({0: 'Kevin', 1: 'van', 2: 'Zonneveld'})
  //   returns 1: 'Kevin'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.pointers = $locutus.php.pointers || [];
  var pointers = $locutus.php.pointers;

  var indexOf = function indexOf(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };

  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    for (var k in arr) {
      if (pointers.indexOf(arr) === -1) {
        pointers.push(arr, 0);
      } else {
        pointers[arrpos + 1] = 0;
      }
      return arr[k];
    }
    // Empty
    return false;
  }
  if (arr.length === 0) {
    return false;
  }
  pointers[arrpos + 1] = 0;
  return arr[pointers[arrpos + 1]];
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],68:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function rsort(inputArr, sortFlags) {
  //  discuss at: http://locutus.io/php/rsort/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  //      note 1: integrated into all of these functions by adapting the code at
  //      note 1: http://sourcefrog.net/projects/natsort/natcompare.js
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: Since JS objects' keys are always strings, and (the
  //      note 1: default) SORT_REGULAR flag distinguishes by key type,
  //      note 1: if the content is a numeric string, we treat the
  //      note 1: "original type" as numeric.
  //   example 1: var $arr = ['Kevin', 'van', 'Zonneveld']
  //   example 1: rsort($arr)
  //   example 1: var $result = $arr
  //   returns 1: ['van', 'Zonneveld', 'Kevin']
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 2: rsort($fruits)
  //   example 2: var $result = $fruits
  //   returns 2: {0: 'orange', 1: 'lemon', 2: 'banana', 3: 'apple'}
  //        test: skip-1

  var i18nlgd = require('../i18n/i18n_loc_get_default');
  var strnatcmp = require('../strings/strnatcmp');

  var sorter;
  var i;
  var k;
  var sortByReference = false;
  var populateArr = {};

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  switch (sortFlags) {
    case 'SORT_STRING':
      // compare items as strings
      sorter = function sorter(a, b) {
        return strnatcmp(b, a);
      };
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, based on the current locale
      // (set with i18n_loc_set_default() as of PHP6)
      var loc = i18nlgd();
      sorter = $locutus.locales[loc].sorting;
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function sorter(a, b) {
        return b - a;
      };
      break;
    case 'SORT_REGULAR':
    default:
      // compare items normally (don't change types)
      sorter = function sorter(b, a) {
        var aFloat = parseFloat(a);
        var bFloat = parseFloat(b);
        var aNumeric = aFloat + '' === a;
        var bNumeric = bFloat + '' === b;
        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }
        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;
  var valArr = [];

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }

  valArr.sort(sorter);

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[i] = valArr[i];
  }

  return sortByReference || populateArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../i18n/i18n_loc_get_default":75,"../info/ini_get":76,"../strings/strnatcmp":78}],69:[function(require,module,exports){
'use strict';

module.exports = function shuffle(inputArr) {
  //  discuss at: http://locutus.io/php/shuffle/
  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  //  revised by: Kevin van Zonneveld (http://kvz.io)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: var $data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5}
  //   example 1: ini_set('locutus.sortByReference', true)
  //   example 1: shuffle($data)
  //   example 1: var $result = $data.q
  //   returns 1: 5

  var valArr = [];
  var k = '';
  var i = 0;
  var sortByReference = false;
  var populateArr = [];

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function () {
    return 0.5 - Math.random();
  });

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[i] = valArr[i];
  }

  return sortByReference || populateArr;
};

},{"../info/ini_get":76}],70:[function(require,module,exports){
'use strict';

module.exports = function sizeof(mixedVar, mode) {
  //  discuss at: http://locutus.io/php/sizeof/
  // original by: Philip Peterson
  //   example 1: sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE')
  //   returns 1: 6
  //   example 2: sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE')
  //   returns 2: 6

  var count = require('../array/count');

  return count(mixedVar, mode);
};

},{"../array/count":52}],71:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function sort(inputArr, sortFlags) {
  //  discuss at: http://locutus.io/php/sort/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  //      note 1: integrated into all of these functions by adapting the code at
  //      note 1: http://sourcefrog.net/projects/natsort/natcompare.js
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: Since JS objects' keys are always strings, and (the
  //      note 1: default) SORT_REGULAR flag distinguishes by key type,
  //      note 1: if the content is a numeric string, we treat the
  //      note 1: "original type" as numeric.
  //   example 1: var $arr = ['Kevin', 'van', 'Zonneveld']
  //   example 1: sort($arr)
  //   example 1: var $result = $arr
  //   returns 1: ['Kevin', 'Zonneveld', 'van']
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 2: sort($fruits)
  //   example 2: var $result = $fruits
  //   returns 2: {0: 'apple', 1: 'banana', 2: 'lemon', 3: 'orange'}
  //        test: skip-1

  var i18nlgd = require('../i18n/i18n_loc_get_default');

  var sorter;
  var i;
  var k;
  var sortByReference = false;
  var populateArr = {};

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  switch (sortFlags) {
    case 'SORT_STRING':
      // compare items as strings
      // leave sorter undefined, so built-in comparison is used
      break;
    case 'SORT_LOCALE_STRING':
      // compare items as strings, based on the current locale
      // (set with i18n_loc_set_default() as of PHP6)
      var loc = $locutus.php.locales[i18nlgd()];

      if (loc && loc.sorting) {
        // if sorting exists on locale object, use it
        // otherwise let sorter be undefined
        // to fallback to built-in behavior
        sorter = loc.sorting;
      }
      break;
    case 'SORT_NUMERIC':
      // compare items numerically
      sorter = function sorter(a, b) {
        return a - b;
      };
      break;
    case 'SORT_REGULAR':
    default:
      sorter = function sorter(a, b) {
        var aFloat = parseFloat(a);
        var bFloat = parseFloat(b);
        var aNumeric = aFloat + '' === a;
        var bNumeric = bFloat + '' === b;

        if (aNumeric && bNumeric) {
          return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
        } else if (aNumeric && !bNumeric) {
          return 1;
        } else if (!aNumeric && bNumeric) {
          return -1;
        }

        return a > b ? 1 : a < b ? -1 : 0;
      };
      break;
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  var valArr = [];
  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }

  valArr.sort(sorter);

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[i] = valArr[i];
  }
  return sortByReference || populateArr;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../i18n/i18n_loc_get_default":75,"../info/ini_get":76}],72:[function(require,module,exports){
'use strict';

module.exports = function uasort(inputArr, sorter) {
  //  discuss at: http://locutus.io/php/uasort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $sorter = function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;}
  //   example 1: var $fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: uasort($fruits, $sorter)
  //   example 1: var $result = $fruits
  //   returns 1: {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}

  var valArr = [];
  var k = '';
  var i = 0;
  var sortByReference = false;
  var populateArr = {};

  if (typeof sorter === 'string') {
    sorter = this[sorter];
  } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
    sorter = this[sorter[0]][sorter[1]];
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }
  valArr.sort(function (a, b) {
    return sorter(a[1], b[1]);
  });

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[valArr[i][0]] = valArr[i][1];
  }

  return sortByReference || populateArr;
};

},{"../info/ini_get":76}],73:[function(require,module,exports){
'use strict';

module.exports = function uksort(inputArr, sorter) {
  //  discuss at: http://locutus.io/php/uksort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: The examples are correct, this is a new way
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: uksort($data, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
  //   example 1: var $result = $data
  //   returns 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}

  var tmpArr = {};
  var keys = [];
  var i = 0;
  var k = '';
  var sortByReference = false;
  var populateArr = {};

  if (typeof sorter === 'string') {
    sorter = this.window[sorter];
  }

  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k);
    }
  }

  // Sort key names
  try {
    if (sorter) {
      keys.sort(sorter);
    } else {
      keys.sort();
    }
  } catch (e) {
    return false;
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    k = keys[i];
    tmpArr[k] = inputArr[k];
    if (sortByReference) {
      delete inputArr[k];
    }
  }
  for (i in tmpArr) {
    if (tmpArr.hasOwnProperty(i)) {
      populateArr[i] = tmpArr[i];
    }
  }

  return sortByReference || populateArr;
};

},{"../info/ini_get":76}],74:[function(require,module,exports){
'use strict';

module.exports = function usort(inputArr, sorter) {
  //  discuss at: http://locutus.io/php/usort/
  // original by: Brett Zamir (http://brett-zamir.me)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $stuff = {d: '3', a: '1', b: '11', c: '4'}
  //   example 1: usort($stuff, function (a, b) { return (a - b) })
  //   example 1: var $result = $stuff
  //   returns 1: {0: '1', 1: '3', 2: '4', 3: '11'}

  var valArr = [];
  var k = '';
  var i = 0;
  var sortByReference = false;
  var populateArr = {};

  if (typeof sorter === 'string') {
    sorter = this[sorter];
  } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
    sorter = this[sorter[0]][sorter[1]];
  }

  var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')('locutus.sortByReference') : undefined) || 'on';
  sortByReference = iniVal === 'on';
  populateArr = sortByReference ? inputArr : populateArr;

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k]);
      if (sortByReference) {
        delete inputArr[k];
      }
    }
  }
  try {
    valArr.sort(sorter);
  } catch (e) {
    return false;
  }
  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[i] = valArr[i];
  }

  return sortByReference || populateArr;
};

},{"../info/ini_get":76}],75:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function i18n_loc_get_default() {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/i18n_loc_get_default/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: Renamed in PHP6 from locale_get_default(). Not listed yet at php.net.
  //      note 1: List of locales at <http://demo.icu-project.org/icu-bin/locexp>
  //      note 1: To be usable with sort() if it is passed the `SORT_LOCALE_STRING`
  //      note 1: sorting flag: http://php.net/manual/en/function.sort.php
  //   example 1: i18n_loc_get_default()
  //   returns 1: 'en_US_POSIX'
  //   example 2: i18n_loc_set_default('pt_PT')
  //   example 2: i18n_loc_get_default()
  //   returns 2: 'pt_PT'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.locales = $locutus.php.locales || {};

  return $locutus.php.locale_default || 'en_US_POSIX';
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],76:[function(require,module,exports){
(function (global){
'use strict';

module.exports = function ini_get(varname) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/ini_get/
  // original by: Brett Zamir (http://brett-zamir.me)
  //      note 1: The ini values must be set by ini_set or manually within an ini file
  //   example 1: ini_set('date.timezone', 'Asia/Hong_Kong')
  //   example 1: ini_get('date.timezone')
  //   returns 1: 'Asia/Hong_Kong'

  var $global = typeof window !== 'undefined' ? window : global;
  $global.$locutus = $global.$locutus || {};
  var $locutus = $global.$locutus;
  $locutus.php = $locutus.php || {};
  $locutus.php.ini = $locutus.php.ini || {};

  if ($locutus.php.ini[varname] && $locutus.php.ini[varname].local_value !== undefined) {
    if ($locutus.php.ini[varname].local_value === null) {
      return '';
    }
    return $locutus.php.ini[varname].local_value;
  }

  return '';
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],77:[function(require,module,exports){
'use strict';

module.exports = function strnatcasecmp(a, b) {
  //       discuss at: http://locutus.io/php/strnatcasecmp/
  //      original by: Martin Pool
  // reimplemented by: Pierre-Luc Paour
  // reimplemented by: Kristof Coomans (SCK-CEN (Belgian Nucleair Research Centre))
  // reimplemented by: Brett Zamir (http://brett-zamir.me)
  //      bugfixed by: Kevin van Zonneveld (http://kvz.io)
  //         input by: Devan Penner-Woelk
  //      improved by: Kevin van Zonneveld (http://kvz.io)
  // reimplemented by: Rafał Kukawski
  //        example 1: strnatcasecmp(10, 1)
  //        returns 1: 1
  //        example 2: strnatcasecmp('1', '10')
  //        returns 2: -1

  var strnatcmp = require('../strings/strnatcmp');
  var _phpCastString = require('../_helpers/_phpCastString');

  if (arguments.length !== 2) {
    return null;
  }

  return strnatcmp(_phpCastString(a).toLowerCase(), _phpCastString(b).toLowerCase());
};

},{"../_helpers/_phpCastString":1,"../strings/strnatcmp":78}],78:[function(require,module,exports){
'use strict';

module.exports = function strnatcmp(a, b) {
  //       discuss at: http://locutus.io/php/strnatcmp/
  //      original by: Martijn Wieringa
  //      improved by: Michael White (http://getsprink.com)
  //      improved by: Jack
  //      bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // reimplemented by: Rafał Kukawski
  //        example 1: strnatcmp('abc', 'abc')
  //        returns 1: 0
  //        example 2: strnatcmp('a', 'b')
  //        returns 2: -1
  //        example 3: strnatcmp('10', '1')
  //        returns 3: 1
  //        example 4: strnatcmp('0000abc', '0abc')
  //        returns 4: 0
  //        example 5: strnatcmp('1239', '12345')
  //        returns 5: -1
  //        example 6: strnatcmp('t01239', 't012345')
  //        returns 6: 1
  //        example 7: strnatcmp('0A', '5N')
  //        returns 7: -1

  var _phpCastString = require('../_helpers/_phpCastString');

  var leadingZeros = /^0+(?=\d)/;
  var whitespace = /^\s/;
  var digit = /^\d/;

  if (arguments.length !== 2) {
    return null;
  }

  a = _phpCastString(a);
  b = _phpCastString(b);

  if (!a.length || !b.length) {
    return a.length - b.length;
  }

  var i = 0;
  var j = 0;

  a = a.replace(leadingZeros, '');
  b = b.replace(leadingZeros, '');

  while (i < a.length && j < b.length) {
    // skip consecutive whitespace
    while (whitespace.test(a.charAt(i))) {
      i++;
    }while (whitespace.test(b.charAt(j))) {
      j++;
    }var ac = a.charAt(i);
    var bc = b.charAt(j);
    var aIsDigit = digit.test(ac);
    var bIsDigit = digit.test(bc);

    if (aIsDigit && bIsDigit) {
      var bias = 0;
      var fractional = ac === '0' || bc === '0';

      do {
        if (!aIsDigit) {
          return -1;
        } else if (!bIsDigit) {
          return 1;
        } else if (ac < bc) {
          if (!bias) {
            bias = -1;
          }

          if (fractional) {
            return -1;
          }
        } else if (ac > bc) {
          if (!bias) {
            bias = 1;
          }

          if (fractional) {
            return 1;
          }
        }

        ac = a.charAt(++i);
        bc = b.charAt(++j);

        aIsDigit = digit.test(ac);
        bIsDigit = digit.test(bc);
      } while (aIsDigit || bIsDigit);

      if (!fractional && bias) {
        return bias;
      }

      continue;
    }

    if (!ac || !bc) {
      continue;
    } else if (ac < bc) {
      return -1;
    } else if (ac > bc) {
      return 1;
    }

    i++;
    j++;
  }

  var iBeforeStrEnd = i < a.length;
  var jBeforeStrEnd = j < b.length;

  // Check which string ended first
  // return -1 if a, 1 if b, 0 otherwise
  return (iBeforeStrEnd > jBeforeStrEnd) - (iBeforeStrEnd < jBeforeStrEnd);
};

},{"../_helpers/_phpCastString":1}],79:[function(require,module,exports){
"use strict";

module.exports = function is_int(mixedVar) {
  // eslint-disable-line camelcase
  //  discuss at: http://locutus.io/php/is_int/
  // original by: Alex
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
  // improved by: Rafał Kukawski (http://blog.kukawski.pl)
  //  revised by: Matt Bradley
  // bugfixed by: Kevin van Zonneveld (http://kvz.io)
  //      note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //      note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //   example 1: is_int(23)
  //   returns 1: true
  //   example 2: is_int('23')
  //   returns 2: false
  //   example 3: is_int(23.5)
  //   returns 3: false
  //   example 4: is_int(true)
  //   returns 4: false

  return mixedVar === +mixedVar && isFinite(mixedVar) && !(mixedVar % 1);
};

},{}],80:[function(require,module,exports){
var phpArray=require('locutus/php/array/index');
},{"locutus/php/array/index":57}]},{},[80])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9faGVscGVycy9fcGhwQ2FzdFN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9jaGFuZ2Vfa2V5X2Nhc2UuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvYXJyYXlfY2h1bmsuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvYXJyYXlfY29tYmluZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9jb3VudF92YWx1ZXMuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvYXJyYXlfZGlmZi5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9kaWZmX2Fzc29jLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X2RpZmZfa2V5LmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X2RpZmZfdWFzc29jLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X2RpZmZfdWtleS5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9maWxsLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X2ZpbGxfa2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9maWx0ZXIuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvYXJyYXlfZmxpcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9pbnRlcnNlY3QuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvYXJyYXlfaW50ZXJzZWN0X2Fzc29jLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X2ludGVyc2VjdF9rZXkuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvYXJyYXlfaW50ZXJzZWN0X3Vhc3NvYy5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9pbnRlcnNlY3RfdWtleS5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9rZXlfZXhpc3RzLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X2tleXMuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvYXJyYXlfbWFwLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X21lcmdlLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X21lcmdlX3JlY3Vyc2l2ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9tdWx0aXNvcnQuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvYXJyYXlfcGFkLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X3BvcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9wcm9kdWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X3B1c2guanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvYXJyYXlfcmFuZC5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9yZWR1Y2UuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvYXJyYXlfcmVwbGFjZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9yZXBsYWNlX3JlY3Vyc2l2ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9yZXZlcnNlLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X3NlYXJjaC5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9zaGlmdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9zbGljZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV9zcGxpY2UuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvYXJyYXlfc3VtLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X3VkaWZmLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X3VkaWZmX2Fzc29jLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X3VkaWZmX3Vhc3NvYy5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV91aW50ZXJzZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X3VpbnRlcnNlY3RfdWFzc29jLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X3VuaXF1ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV91bnNoaWZ0LmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X3ZhbHVlcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hcnJheV93YWxrLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2FycmF5X3dhbGtfcmVjdXJzaXZlLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2Fyc29ydC5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9hc29ydC5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9jb3VudC5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9jdXJyZW50LmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2VhY2guanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvZW5kLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2luX2FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L2tleS5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9rcnNvcnQuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkva3NvcnQuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvbmF0Y2FzZXNvcnQuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvbmF0c29ydC5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9uZXh0LmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L3Bvcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS9wcmV2LmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L3JhbmdlLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L3Jlc2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L3Jzb3J0LmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L3NodWZmbGUuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvc2l6ZW9mLmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L3NvcnQuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvYXJyYXkvdWFzb3J0LmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2FycmF5L3Vrc29ydC5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9hcnJheS91c29ydC5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9pMThuL2kxOG5fbG9jX2dldF9kZWZhdWx0LmpzIiwibm9kZV9tb2R1bGVzL2xvY3V0dXMvcGhwL2luZm8vaW5pX2dldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2N1dHVzL3BocC9zdHJpbmdzL3N0cm5hdGNhc2VjbXAuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvc3RyaW5ncy9zdHJuYXRjbXAuanMiLCJub2RlX21vZHVsZXMvbG9jdXR1cy9waHAvdmFyL2lzX2ludC5qcyIsInBocEFycmF5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX3BocENhc3RTdHJpbmcodmFsdWUpIHtcbiAgLy8gb3JpZ2luYWwgYnk6IFJhZmHFgiBLdWthd3NraVxuICAvLyAgIGV4YW1wbGUgMTogX3BocENhc3RTdHJpbmcodHJ1ZSlcbiAgLy8gICByZXR1cm5zIDE6ICcxJ1xuICAvLyAgIGV4YW1wbGUgMjogX3BocENhc3RTdHJpbmcoZmFsc2UpXG4gIC8vICAgcmV0dXJucyAyOiAnJ1xuICAvLyAgIGV4YW1wbGUgMzogX3BocENhc3RTdHJpbmcoJ2ZvbycpXG4gIC8vICAgcmV0dXJucyAzOiAnZm9vJ1xuICAvLyAgIGV4YW1wbGUgNDogX3BocENhc3RTdHJpbmcoMC8wKVxuICAvLyAgIHJldHVybnMgNDogJ05BTidcbiAgLy8gICBleGFtcGxlIDU6IF9waHBDYXN0U3RyaW5nKDEvMClcbiAgLy8gICByZXR1cm5zIDU6ICdJTkYnXG4gIC8vICAgZXhhbXBsZSA2OiBfcGhwQ2FzdFN0cmluZygtMS8wKVxuICAvLyAgIHJldHVybnMgNjogJy1JTkYnXG4gIC8vICAgZXhhbXBsZSA3OiBfcGhwQ2FzdFN0cmluZyhudWxsKVxuICAvLyAgIHJldHVybnMgNzogJydcbiAgLy8gICBleGFtcGxlIDg6IF9waHBDYXN0U3RyaW5nKHVuZGVmaW5lZClcbiAgLy8gICByZXR1cm5zIDg6ICcnXG4gIC8vICAgZXhhbXBsZSA5OiBfcGhwQ2FzdFN0cmluZyhbXSlcbiAgLy8gICByZXR1cm5zIDk6ICdBcnJheSdcbiAgLy8gICBleGFtcGxlIDEwOiBfcGhwQ2FzdFN0cmluZyh7fSlcbiAgLy8gICByZXR1cm5zIDEwOiAnT2JqZWN0J1xuICAvLyAgIGV4YW1wbGUgMTE6IF9waHBDYXN0U3RyaW5nKDApXG4gIC8vICAgcmV0dXJucyAxMTogJzAnXG4gIC8vICAgZXhhbXBsZSAxMjogX3BocENhc3RTdHJpbmcoMSlcbiAgLy8gICByZXR1cm5zIDEyOiAnMSdcbiAgLy8gICBleGFtcGxlIDEzOiBfcGhwQ2FzdFN0cmluZygzLjE0KVxuICAvLyAgIHJldHVybnMgMTM6ICczLjE0J1xuXG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih2YWx1ZSk7XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gdmFsdWUgPyAnMScgOiAnJztcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgIHJldHVybiAnTkFOJztcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuICh2YWx1ZSA8IDAgPyAnLScgOiAnJykgKyAnSU5GJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlICsgJyc7XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgIHJldHVybiAnJztcbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiAnQXJyYXknO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdPYmplY3QnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJyc7XG4gICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHZhbHVlIHR5cGUnKTtcbiAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPV9waHBDYXN0U3RyaW5nLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X2NoYW5nZV9rZXlfY2FzZShhcnJheSwgY3MpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9jaGFuZ2Vfa2V5X2Nhc2UvXG4gIC8vIG9yaWdpbmFsIGJ5OiBBdGVzIEdvcmFsIChodHRwOi8vbWFnbmV0aXEuY29tKVxuICAvLyBpbXByb3ZlZCBieTogbWFycnRpbnNcbiAgLy8gaW1wcm92ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgZXhhbXBsZSAxOiBhcnJheV9jaGFuZ2Vfa2V5X2Nhc2UoNDIpXG4gIC8vICAgcmV0dXJucyAxOiBmYWxzZVxuICAvLyAgIGV4YW1wbGUgMjogYXJyYXlfY2hhbmdlX2tleV9jYXNlKFsgMywgNSBdKVxuICAvLyAgIHJldHVybnMgMjogWzMsIDVdXG4gIC8vICAgZXhhbXBsZSAzOiBhcnJheV9jaGFuZ2Vfa2V5X2Nhc2UoeyBGdUJhUjogNDIgfSlcbiAgLy8gICByZXR1cm5zIDM6IHtcImZ1YmFyXCI6IDQyfVxuICAvLyAgIGV4YW1wbGUgNDogYXJyYXlfY2hhbmdlX2tleV9jYXNlKHsgRnVCYVI6IDQyIH0sICdDQVNFX0xPV0VSJylcbiAgLy8gICByZXR1cm5zIDQ6IHtcImZ1YmFyXCI6IDQyfVxuICAvLyAgIGV4YW1wbGUgNTogYXJyYXlfY2hhbmdlX2tleV9jYXNlKHsgRnVCYVI6IDQyIH0sICdDQVNFX1VQUEVSJylcbiAgLy8gICByZXR1cm5zIDU6IHtcIkZVQkFSXCI6IDQyfVxuICAvLyAgIGV4YW1wbGUgNjogYXJyYXlfY2hhbmdlX2tleV9jYXNlKHsgRnVCYVI6IDQyIH0sIDIpXG4gIC8vICAgcmV0dXJucyA2OiB7XCJGVUJBUlwiOiA0Mn1cblxuICB2YXIgY2FzZUZuYztcbiAgdmFyIGtleTtcbiAgdmFyIHRtcEFyciA9IHt9O1xuXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyYXkpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG5cbiAgaWYgKGFycmF5ICYmICh0eXBlb2YgYXJyYXkgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGFycmF5KSkgPT09ICdvYmplY3QnKSB7XG4gICAgY2FzZUZuYyA9ICFjcyB8fCBjcyA9PT0gJ0NBU0VfTE9XRVInID8gJ3RvTG93ZXJDYXNlJyA6ICd0b1VwcGVyQ2FzZSc7XG4gICAgZm9yIChrZXkgaW4gYXJyYXkpIHtcbiAgICAgIHRtcEFycltrZXlbY2FzZUZuY10oKV0gPSBhcnJheVtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gdG1wQXJyO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X2NoYW5nZV9rZXlfY2FzZS5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfY2h1bmsoaW5wdXQsIHNpemUsIHByZXNlcnZlS2V5cykge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X2NodW5rL1xuICAvLyBvcmlnaW5hbCBieTogQ2FybG9zIFIuIEwuIFJvZHJpZ3VlcyAoaHR0cDovL3d3dy5qc2Zyb21oZWxsLmNvbSlcbiAgLy8gaW1wcm92ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgICAgbm90ZSAxOiBJbXBvcnRhbnQgbm90ZTogUGVyIHRoZSBFQ01BU2NyaXB0IHNwZWNpZmljYXRpb24sXG4gIC8vICAgICAgbm90ZSAxOiBvYmplY3RzIG1heSBub3QgYWx3YXlzIGl0ZXJhdGUgaW4gYSBwcmVkaWN0YWJsZSBvcmRlclxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfY2h1bmsoWydLZXZpbicsICd2YW4nLCAnWm9ubmV2ZWxkJ10sIDIpXG4gIC8vICAgcmV0dXJucyAxOiBbWydLZXZpbicsICd2YW4nXSwgWydab25uZXZlbGQnXV1cbiAgLy8gICBleGFtcGxlIDI6IGFycmF5X2NodW5rKFsnS2V2aW4nLCAndmFuJywgJ1pvbm5ldmVsZCddLCAyLCB0cnVlKVxuICAvLyAgIHJldHVybnMgMjogW3swOidLZXZpbicsIDE6J3Zhbid9LCB7MjogJ1pvbm5ldmVsZCd9XVxuICAvLyAgIGV4YW1wbGUgMzogYXJyYXlfY2h1bmsoezE6J0tldmluJywgMjondmFuJywgMzonWm9ubmV2ZWxkJ30sIDIpXG4gIC8vICAgcmV0dXJucyAzOiBbWydLZXZpbicsICd2YW4nXSwgWydab25uZXZlbGQnXV1cbiAgLy8gICBleGFtcGxlIDQ6IGFycmF5X2NodW5rKHsxOidLZXZpbicsIDI6J3ZhbicsIDM6J1pvbm5ldmVsZCd9LCAyLCB0cnVlKVxuICAvLyAgIHJldHVybnMgNDogW3sxOiAnS2V2aW4nLCAyOiAndmFuJ30sIHszOiAnWm9ubmV2ZWxkJ31dXG5cbiAgdmFyIHg7XG4gIHZhciBwID0gJyc7XG4gIHZhciBpID0gMDtcbiAgdmFyIGMgPSAtMTtcbiAgdmFyIGwgPSBpbnB1dC5sZW5ndGggfHwgMDtcbiAgdmFyIG4gPSBbXTtcblxuICBpZiAoc2l6ZSA8IDEpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgaWYgKHByZXNlcnZlS2V5cykge1xuICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICh4ID0gaSAlIHNpemUpID8gbltjXVtpXSA9IGlucHV0W2ldIDogblsrK2NdID0ge307bltjXVtpXSA9IGlucHV0W2ldO1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAoeCA9IGkgJSBzaXplKSA/IG5bY11beF0gPSBpbnB1dFtpXSA6IG5bKytjXSA9IFtpbnB1dFtpXV07XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHByZXNlcnZlS2V5cykge1xuICAgICAgZm9yIChwIGluIGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dC5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgICh4ID0gaSAlIHNpemUpID8gbltjXVtwXSA9IGlucHV0W3BdIDogblsrK2NdID0ge307bltjXVtwXSA9IGlucHV0W3BdO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHAgaW4gaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0Lmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgICAgKHggPSBpICUgc2l6ZSkgPyBuW2NdW3hdID0gaW5wdXRbcF0gOiBuWysrY10gPSBbaW5wdXRbcF1dO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X2NodW5rLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X2NvbWJpbmUoa2V5cywgdmFsdWVzKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvYXJyYXlfY29tYmluZS9cbiAgLy8gb3JpZ2luYWwgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rdnouaW8pXG4gIC8vIGltcHJvdmVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfY29tYmluZShbMCwxLDJdLCBbJ2tldmluJywndmFuJywnem9ubmV2ZWxkJ10pXG4gIC8vICAgcmV0dXJucyAxOiB7MDogJ2tldmluJywgMTogJ3ZhbicsIDI6ICd6b25uZXZlbGQnfVxuXG4gIHZhciBuZXdBcnJheSA9IHt9O1xuICB2YXIgaSA9IDA7XG5cbiAgLy8gaW5wdXQgc2FuaXRhdGlvblxuICAvLyBPbmx5IGFjY2VwdCBhcnJheXMgb3IgYXJyYXktbGlrZSBvYmplY3RzXG4gIC8vIFJlcXVpcmUgYXJyYXlzIHRvIGhhdmUgYSBjb3VudFxuICBpZiAoKHR5cGVvZiBrZXlzID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihrZXlzKSkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICgodHlwZW9mIHZhbHVlcyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YodmFsdWVzKSkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2Yga2V5cy5sZW5ndGggIT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWVzLmxlbmd0aCAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCFrZXlzLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIG51bWJlciBvZiBlbGVtZW50cyBkb2VzIG5vdCBtYXRjaFxuICBpZiAoa2V5cy5sZW5ndGggIT09IHZhbHVlcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIG5ld0FycmF5W2tleXNbaV1dID0gdmFsdWVzW2ldO1xuICB9XG5cbiAgcmV0dXJuIG5ld0FycmF5O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X2NvbWJpbmUuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfY291bnRfdmFsdWVzKGFycmF5KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvYXJyYXlfY291bnRfdmFsdWVzL1xuICAvLyBvcmlnaW5hbCBieTogQXRlcyBHb3JhbCAoaHR0cDovL21hZ25ldGlxLmNvbSlcbiAgLy8gaW1wcm92ZWQgYnk6IE1pY2hhZWwgV2hpdGUgKGh0dHA6Ly9nZXRzcHJpbmsuY29tKVxuICAvLyBpbXByb3ZlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gICAgaW5wdXQgYnk6IHNhbmthaVxuICAvLyAgICBpbnB1dCBieTogU2hpbmdvXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfY291bnRfdmFsdWVzKFsgMywgNSwgMywgXCJmb29cIiwgXCJiYXJcIiwgXCJmb29cIiBdKVxuICAvLyAgIHJldHVybnMgMTogezM6MiwgNToxLCBcImZvb1wiOjIsIFwiYmFyXCI6MX1cbiAgLy8gICBleGFtcGxlIDI6IGFycmF5X2NvdW50X3ZhbHVlcyh7IHAxOiAzLCBwMjogNSwgcDM6IDMsIHA0OiBcImZvb1wiLCBwNTogXCJiYXJcIiwgcDY6IFwiZm9vXCIgfSlcbiAgLy8gICByZXR1cm5zIDI6IHszOjIsIDU6MSwgXCJmb29cIjoyLCBcImJhclwiOjF9XG4gIC8vICAgZXhhbXBsZSAzOiBhcnJheV9jb3VudF92YWx1ZXMoWyB0cnVlLCA0LjIsIDQyLCBcImZ1YmFyXCIgXSlcbiAgLy8gICByZXR1cm5zIDM6IHs0MjoxLCBcImZ1YmFyXCI6MX1cblxuICB2YXIgdG1wQXJyID0ge307XG4gIHZhciBrZXkgPSAnJztcbiAgdmFyIHQgPSAnJztcblxuICB2YXIgX2dldFR5cGUgPSBmdW5jdGlvbiBfZ2V0VHlwZShvYmopIHtcbiAgICAvLyBPYmplY3RzIGFyZSBwaHAgYXNzb2NpYXRpdmUgYXJyYXlzLlxuICAgIHZhciB0ID0gdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob2JqKTtcbiAgICB0ID0gdC50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgdCA9ICdhcnJheSc7XG4gICAgfVxuICAgIHJldHVybiB0O1xuICB9O1xuXG4gIHZhciBfY291bnRWYWx1ZSA9IGZ1bmN0aW9uIF9jb3VudFZhbHVlKHRtcEFyciwgdmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgaWYgKE1hdGguZmxvb3IodmFsdWUpICE9PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHZhbHVlIGluIHRtcEFyciAmJiB0bXBBcnIuaGFzT3duUHJvcGVydHkodmFsdWUpKSB7XG4gICAgICArK3RtcEFyclt2YWx1ZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRtcEFyclt2YWx1ZV0gPSAxO1xuICAgIH1cbiAgfTtcblxuICB0ID0gX2dldFR5cGUoYXJyYXkpO1xuICBpZiAodCA9PT0gJ2FycmF5Jykge1xuICAgIGZvciAoa2V5IGluIGFycmF5KSB7XG4gICAgICBpZiAoYXJyYXkuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICBfY291bnRWYWx1ZS5jYWxsKHRoaXMsIHRtcEFyciwgYXJyYXlba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRtcEFycjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV9jb3VudF92YWx1ZXMuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X2RpZmYoYXJyMSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X2RpZmYvXG4gIC8vIG9yaWdpbmFsIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyBpbXByb3ZlZCBieTogU2Fuam95IFJveVxuICAvLyAgcmV2aXNlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X2RpZmYoWydLZXZpbicsICd2YW4nLCAnWm9ubmV2ZWxkJ10sIFsndmFuJywgJ1pvbm5ldmVsZCddKVxuICAvLyAgIHJldHVybnMgMTogezA6J0tldmluJ31cblxuICB2YXIgcmV0QXJyID0ge307XG4gIHZhciBhcmdsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGsxID0gJyc7XG4gIHZhciBpID0gMTtcbiAgdmFyIGsgPSAnJztcbiAgdmFyIGFyciA9IHt9O1xuXG4gIGFycjFrZXlzOiBmb3IgKGsxIGluIGFycjEpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgIGZvciAoaSA9IDE7IGkgPCBhcmdsOyBpKyspIHtcbiAgICAgIGFyciA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAoayBpbiBhcnIpIHtcbiAgICAgICAgaWYgKGFycltrXSA9PT0gYXJyMVtrMV0pIHtcbiAgICAgICAgICAvLyBJZiBpdCByZWFjaGVzIGhlcmUsIGl0IHdhcyBmb3VuZCBpbiBhdCBsZWFzdCBvbmUgYXJyYXksIHNvIHRyeSBuZXh0IHZhbHVlXG4gICAgICAgICAgY29udGludWUgYXJyMWtleXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldEFycltrMV0gPSBhcnIxW2sxXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0QXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X2RpZmYuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X2RpZmZfYXNzb2MoYXJyMSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X2RpZmZfYXNzb2MvXG4gIC8vIG9yaWdpbmFsIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyBidWdmaXhlZCBieTogMG0zclxuICAvLyAgcmV2aXNlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X2RpZmZfYXNzb2MoezA6ICdLZXZpbicsIDE6ICd2YW4nLCAyOiAnWm9ubmV2ZWxkJ30sIHswOiAnS2V2aW4nLCA0OiAndmFuJywgNTogJ1pvbm5ldmVsZCd9KVxuICAvLyAgIHJldHVybnMgMTogezE6ICd2YW4nLCAyOiAnWm9ubmV2ZWxkJ31cblxuICB2YXIgcmV0QXJyID0ge307XG4gIHZhciBhcmdsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGsxID0gJyc7XG4gIHZhciBpID0gMTtcbiAgdmFyIGsgPSAnJztcbiAgdmFyIGFyciA9IHt9O1xuXG4gIGFycjFrZXlzOiBmb3IgKGsxIGluIGFycjEpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgIGZvciAoaSA9IDE7IGkgPCBhcmdsOyBpKyspIHtcbiAgICAgIGFyciA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAoayBpbiBhcnIpIHtcbiAgICAgICAgaWYgKGFycltrXSA9PT0gYXJyMVtrMV0gJiYgayA9PT0gazEpIHtcbiAgICAgICAgICAvLyBJZiBpdCByZWFjaGVzIGhlcmUsIGl0IHdhcyBmb3VuZCBpbiBhdCBsZWFzdCBvbmUgYXJyYXksIHNvIHRyeSBuZXh0IHZhbHVlXG4gICAgICAgICAgY29udGludWUgYXJyMWtleXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldEFycltrMV0gPSBhcnIxW2sxXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0QXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X2RpZmZfYXNzb2MuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X2RpZmZfa2V5KGFycjEpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9kaWZmX2tleS9cbiAgLy8gb3JpZ2luYWwgYnk6IEF0ZXMgR29yYWwgKGh0dHA6Ly9tYWduZXRpcS5jb20pXG4gIC8vICByZXZpc2VkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICBpbnB1dCBieTogRXZlcmxhc3RvXG4gIC8vICAgZXhhbXBsZSAxOiBhcnJheV9kaWZmX2tleSh7cmVkOiAxLCBncmVlbjogMiwgYmx1ZTogMywgd2hpdGU6IDR9LCB7cmVkOiA1fSlcbiAgLy8gICByZXR1cm5zIDE6IHtcImdyZWVuXCI6MiwgXCJibHVlXCI6MywgXCJ3aGl0ZVwiOjR9XG4gIC8vICAgZXhhbXBsZSAyOiBhcnJheV9kaWZmX2tleSh7cmVkOiAxLCBncmVlbjogMiwgYmx1ZTogMywgd2hpdGU6IDR9LCB7cmVkOiA1fSwge3JlZDogNX0pXG4gIC8vICAgcmV0dXJucyAyOiB7XCJncmVlblwiOjIsIFwiYmx1ZVwiOjMsIFwid2hpdGVcIjo0fVxuXG4gIHZhciBhcmdsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIHJldEFyciA9IHt9O1xuICB2YXIgazEgPSAnJztcbiAgdmFyIGkgPSAxO1xuICB2YXIgayA9ICcnO1xuICB2YXIgYXJyID0ge307XG5cbiAgYXJyMWtleXM6IGZvciAoazEgaW4gYXJyMSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgZm9yIChpID0gMTsgaSA8IGFyZ2w7IGkrKykge1xuICAgICAgYXJyID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yIChrIGluIGFycikge1xuICAgICAgICBpZiAoayA9PT0gazEpIHtcbiAgICAgICAgICAvLyBJZiBpdCByZWFjaGVzIGhlcmUsIGl0IHdhcyBmb3VuZCBpbiBhdCBsZWFzdCBvbmUgYXJyYXksIHNvIHRyeSBuZXh0IHZhbHVlXG4gICAgICAgICAgY29udGludWUgYXJyMWtleXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldEFycltrMV0gPSBhcnIxW2sxXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0QXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X2RpZmZfa2V5LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheV9kaWZmX3Vhc3NvYyhhcnIxKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvYXJyYXlfZGlmZl91YXNzb2MvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRhcnJheTEgPSB7YTogJ2dyZWVuJywgYjogJ2Jyb3duJywgYzogJ2JsdWUnLCAwOiAncmVkJ31cbiAgLy8gICBleGFtcGxlIDE6IHZhciAkYXJyYXkyID0ge2E6ICdHUkVFTicsIEI6ICdicm93bicsIDA6ICd5ZWxsb3cnLCAxOiAncmVkJ31cbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X2RpZmZfdWFzc29jKCRhcnJheTEsICRhcnJheTIsIGZ1bmN0aW9uIChrZXkxLCBrZXkyKSB7IHJldHVybiAoa2V5MSA9PT0ga2V5MiA/IDAgOiAoa2V5MSA+IGtleTIgPyAxIDogLTEpKSB9KVxuICAvLyAgIHJldHVybnMgMToge2I6ICdicm93bicsIGM6ICdibHVlJywgMDogJ3JlZCd9XG4gIC8vICAgICAgICB0ZXN0OiBza2lwLTFcblxuICB2YXIgcmV0QXJyID0ge307XG4gIHZhciBhcmdsbTEgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgdmFyIGNiID0gYXJndW1lbnRzW2FyZ2xtMV07XG4gIHZhciBhcnIgPSB7fTtcbiAgdmFyIGkgPSAxO1xuICB2YXIgazEgPSAnJztcbiAgdmFyIGsgPSAnJztcblxuICB2YXIgJGdsb2JhbCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsO1xuXG4gIGNiID0gdHlwZW9mIGNiID09PSAnc3RyaW5nJyA/ICRnbG9iYWxbY2JdIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNiKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA/ICRnbG9iYWxbY2JbMF1dW2NiWzFdXSA6IGNiO1xuXG4gIGFycjFrZXlzOiBmb3IgKGsxIGluIGFycjEpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgIGZvciAoaSA9IDE7IGkgPCBhcmdsbTE7IGkrKykge1xuICAgICAgYXJyID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yIChrIGluIGFycikge1xuICAgICAgICBpZiAoYXJyW2tdID09PSBhcnIxW2sxXSAmJiBjYihrLCBrMSkgPT09IDApIHtcbiAgICAgICAgICAvLyBJZiBpdCByZWFjaGVzIGhlcmUsIGl0IHdhcyBmb3VuZCBpbiBhdCBsZWFzdCBvbmUgYXJyYXksIHNvIHRyeSBuZXh0IHZhbHVlXG4gICAgICAgICAgY29udGludWUgYXJyMWtleXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldEFycltrMV0gPSBhcnIxW2sxXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0QXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X2RpZmZfdWFzc29jLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheV9kaWZmX3VrZXkoYXJyMSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X2RpZmZfdWtleS9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGFycmF5MSA9IHtibHVlOiAxLCByZWQ6IDIsIGdyZWVuOiAzLCBwdXJwbGU6IDR9XG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGFycmF5MiA9IHtncmVlbjogNSwgYmx1ZTogNiwgeWVsbG93OiA3LCBjeWFuOiA4fVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfZGlmZl91a2V5KCRhcnJheTEsICRhcnJheTIsIGZ1bmN0aW9uIChrZXkxLCBrZXkyKXsgcmV0dXJuIChrZXkxID09PSBrZXkyID8gMCA6IChrZXkxID4ga2V5MiA/IDEgOiAtMSkpOyB9KVxuICAvLyAgIHJldHVybnMgMToge3JlZDogMiwgcHVycGxlOiA0fVxuXG4gIHZhciByZXRBcnIgPSB7fTtcbiAgdmFyIGFyZ2xtMSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICAvLyB2YXIgYXJnbG0yID0gYXJnbG0xIC0gMVxuICB2YXIgY2IgPSBhcmd1bWVudHNbYXJnbG0xXTtcbiAgdmFyIGsxID0gJyc7XG4gIHZhciBpID0gMTtcbiAgdmFyIGFyciA9IHt9O1xuICB2YXIgayA9ICcnO1xuXG4gIHZhciAkZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWw7XG5cbiAgY2IgPSB0eXBlb2YgY2IgPT09ICdzdHJpbmcnID8gJGdsb2JhbFtjYl0gOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY2IpID09PSAnW29iamVjdCBBcnJheV0nID8gJGdsb2JhbFtjYlswXV1bY2JbMV1dIDogY2I7XG5cbiAgYXJyMWtleXM6IGZvciAoazEgaW4gYXJyMSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgZm9yIChpID0gMTsgaSA8IGFyZ2xtMTsgaSsrKSB7XG4gICAgICBhcnIgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKGsgaW4gYXJyKSB7XG4gICAgICAgIGlmIChjYihrLCBrMSkgPT09IDApIHtcbiAgICAgICAgICAvLyBJZiBpdCByZWFjaGVzIGhlcmUsIGl0IHdhcyBmb3VuZCBpbiBhdCBsZWFzdCBvbmUgYXJyYXksIHNvIHRyeSBuZXh0IHZhbHVlXG4gICAgICAgICAgY29udGludWUgYXJyMWtleXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldEFycltrMV0gPSBhcnIxW2sxXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0QXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X2RpZmZfdWtleS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheV9maWxsKHN0YXJ0SW5kZXgsIG51bSwgbWl4ZWRWYWwpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9maWxsL1xuICAvLyBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gaW1wcm92ZWQgYnk6IFdhbGRvIE1hbHF1aSBTaWx2YSAoaHR0cDovL3dhbGRvLm1hbHF1aS5pbmZvKVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfZmlsbCg1LCA2LCAnYmFuYW5hJylcbiAgLy8gICByZXR1cm5zIDE6IHsgNTogJ2JhbmFuYScsIDY6ICdiYW5hbmEnLCA3OiAnYmFuYW5hJywgODogJ2JhbmFuYScsIDk6ICdiYW5hbmEnLCAxMDogJ2JhbmFuYScgfVxuXG4gIHZhciBrZXk7XG4gIHZhciB0bXBBcnIgPSB7fTtcblxuICBpZiAoIWlzTmFOKHN0YXJ0SW5kZXgpICYmICFpc05hTihudW0pKSB7XG4gICAgZm9yIChrZXkgPSAwOyBrZXkgPCBudW07IGtleSsrKSB7XG4gICAgICB0bXBBcnJba2V5ICsgc3RhcnRJbmRleF0gPSBtaXhlZFZhbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG1wQXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X2ZpbGwuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X2ZpbGxfa2V5cyhrZXlzLCB2YWx1ZSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X2ZpbGxfa2V5cy9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRrZXlzID0geydhJzogJ2ZvbycsIDI6IDUsIDM6IDEwLCA0OiAnYmFyJ31cbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X2ZpbGxfa2V5cygka2V5cywgJ2JhbmFuYScpXG4gIC8vICAgcmV0dXJucyAxOiB7XCJmb29cIjogXCJiYW5hbmFcIiwgNTogXCJiYW5hbmFcIiwgMTA6IFwiYmFuYW5hXCIsIFwiYmFyXCI6IFwiYmFuYW5hXCJ9XG5cbiAgdmFyIHJldE9iaiA9IHt9O1xuICB2YXIga2V5ID0gJyc7XG5cbiAgZm9yIChrZXkgaW4ga2V5cykge1xuICAgIHJldE9ialtrZXlzW2tleV1dID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gcmV0T2JqO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X2ZpbGxfa2V5cy5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfZmlsdGVyKGFyciwgZnVuYykge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X2ZpbHRlci9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgIGlucHV0IGJ5OiBtYXg0ZXZlclxuICAvLyBpbXByb3ZlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgICBub3RlIDE6IFRha2VzIGEgZnVuY3Rpb24gYXMgYW4gYXJndW1lbnQsIG5vdCBhIGZ1bmN0aW9uJ3MgbmFtZVxuICAvLyAgIGV4YW1wbGUgMTogdmFyIG9kZCA9IGZ1bmN0aW9uIChudW0pIHtyZXR1cm4gKG51bSAmIDEpO31cbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X2ZpbHRlcih7XCJhXCI6IDEsIFwiYlwiOiAyLCBcImNcIjogMywgXCJkXCI6IDQsIFwiZVwiOiA1fSwgb2RkKVxuICAvLyAgIHJldHVybnMgMToge1wiYVwiOiAxLCBcImNcIjogMywgXCJlXCI6IDV9XG4gIC8vICAgZXhhbXBsZSAyOiB2YXIgZXZlbiA9IGZ1bmN0aW9uIChudW0pIHtyZXR1cm4gKCEobnVtICYgMSkpO31cbiAgLy8gICBleGFtcGxlIDI6IGFycmF5X2ZpbHRlcihbNiwgNywgOCwgOSwgMTAsIDExLCAxMl0sIGV2ZW4pXG4gIC8vICAgcmV0dXJucyAyOiBbIDYsICwgOCwgLCAxMCwgLCAxMiBdXG4gIC8vICAgZXhhbXBsZSAzOiBhcnJheV9maWx0ZXIoe1wiYVwiOiAxLCBcImJcIjogZmFsc2UsIFwiY1wiOiAtMSwgXCJkXCI6IDAsIFwiZVwiOiBudWxsLCBcImZcIjonJywgXCJnXCI6dW5kZWZpbmVkfSlcbiAgLy8gICByZXR1cm5zIDM6IHtcImFcIjoxLCBcImNcIjotMX1cblxuICB2YXIgcmV0T2JqID0ge307XG4gIHZhciBrO1xuXG4gIGZ1bmMgPSBmdW5jIHx8IGZ1bmN0aW9uICh2KSB7XG4gICAgcmV0dXJuIHY7XG4gIH07XG5cbiAgLy8gQHRvZG86IElzc3VlICM3M1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICByZXRPYmogPSBbXTtcbiAgfVxuXG4gIGZvciAoayBpbiBhcnIpIHtcbiAgICBpZiAoZnVuYyhhcnJba10pKSB7XG4gICAgICByZXRPYmpba10gPSBhcnJba107XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldE9iajtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV9maWx0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfZmxpcCh0cmFucykge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X2ZsaXAvXG4gIC8vIG9yaWdpbmFsIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyBpbXByb3ZlZCBieTogUGllciBQYW9sbyBSYW1vbiAoaHR0cDovL3d3dy5tYXN0ZXJzb3VwLmNvbS8pXG4gIC8vIGltcHJvdmVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfZmxpcCgge2E6IDEsIGI6IDEsIGM6IDJ9IClcbiAgLy8gICByZXR1cm5zIDE6IHsxOiAnYicsIDI6ICdjJ31cblxuICB2YXIga2V5O1xuICB2YXIgdG1wQXJyID0ge307XG5cbiAgZm9yIChrZXkgaW4gdHJhbnMpIHtcbiAgICBpZiAoIXRyYW5zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB0bXBBcnJbdHJhbnNba2V5XV0gPSBrZXk7XG4gIH1cblxuICByZXR1cm4gdG1wQXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X2ZsaXAuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X2ludGVyc2VjdChhcnIxKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvYXJyYXlfaW50ZXJzZWN0L1xuICAvLyBvcmlnaW5hbCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgICBub3RlIDE6IFRoZXNlIG9ubHkgb3V0cHV0IGFzc29jaWF0aXZlIGFycmF5cyAod291bGQgbmVlZCB0byBiZVxuICAvLyAgICAgIG5vdGUgMTogYWxsIG51bWVyaWMgYW5kIGNvdW50aW5nIGZyb20gemVybyB0byBiZSBudW1lcmljKVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRhcnJheTEgPSB7J2EnIDogJ2dyZWVuJywgMDoncmVkJywgMTogJ2JsdWUnfVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRhcnJheTIgPSB7J2InIDogJ2dyZWVuJywgMDoneWVsbG93JywgMToncmVkJ31cbiAgLy8gICBleGFtcGxlIDE6IHZhciAkYXJyYXkzID0gWydncmVlbicsICdyZWQnXVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRyZXN1bHQgPSBhcnJheV9pbnRlcnNlY3QoJGFycmF5MSwgJGFycmF5MiwgJGFycmF5MylcbiAgLy8gICByZXR1cm5zIDE6IHswOiAncmVkJywgYTogJ2dyZWVuJ31cblxuICB2YXIgcmV0QXJyID0ge307XG4gIHZhciBhcmdsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGFyZ2xtMSA9IGFyZ2wgLSAxO1xuICB2YXIgazEgPSAnJztcbiAgdmFyIGFyciA9IHt9O1xuICB2YXIgaSA9IDA7XG4gIHZhciBrID0gJyc7XG5cbiAgYXJyMWtleXM6IGZvciAoazEgaW4gYXJyMSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgYXJyczogZm9yIChpID0gMTsgaSA8IGFyZ2w7IGkrKykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sYWJlbHNcbiAgICAgIGFyciA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAoayBpbiBhcnIpIHtcbiAgICAgICAgaWYgKGFycltrXSA9PT0gYXJyMVtrMV0pIHtcbiAgICAgICAgICBpZiAoaSA9PT0gYXJnbG0xKSB7XG4gICAgICAgICAgICByZXRBcnJbazFdID0gYXJyMVtrMV07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIElmIHRoZSBpbm5lcm1vc3QgbG9vcCBhbHdheXMgbGVhZHMgYXQgbGVhc3Qgb25jZSB0byBhbiBlcXVhbCB2YWx1ZSxcbiAgICAgICAgICAvLyBjb250aW51ZSB0aGUgbG9vcCB1bnRpbCBkb25lXG4gICAgICAgICAgY29udGludWUgYXJyczsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sYWJlbHNcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gSWYgaXQgcmVhY2hlcyBoZXJlLCBpdCB3YXNuJ3QgZm91bmQgaW4gYXQgbGVhc3Qgb25lIGFycmF5LCBzbyB0cnkgbmV4dCB2YWx1ZVxuICAgICAgY29udGludWUgYXJyMWtleXM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldEFycjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV9pbnRlcnNlY3QuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X2ludGVyc2VjdF9hc3NvYyhhcnIxKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvYXJyYXlfaW50ZXJzZWN0X2Fzc29jL1xuICAvLyBvcmlnaW5hbCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgICBub3RlIDE6IFRoZXNlIG9ubHkgb3V0cHV0IGFzc29jaWF0aXZlIGFycmF5cyAod291bGQgbmVlZCB0byBiZVxuICAvLyAgICAgIG5vdGUgMTogYWxsIG51bWVyaWMgYW5kIGNvdW50aW5nIGZyb20gemVybyB0byBiZSBudW1lcmljKVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRhcnJheTEgPSB7YTogJ2dyZWVuJywgYjogJ2Jyb3duJywgYzogJ2JsdWUnLCAwOiAncmVkJ31cbiAgLy8gICBleGFtcGxlIDE6IHZhciAkYXJyYXkyID0ge2E6ICdncmVlbicsIDA6ICd5ZWxsb3cnLCAxOiAncmVkJ31cbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X2ludGVyc2VjdF9hc3NvYygkYXJyYXkxLCAkYXJyYXkyKVxuICAvLyAgIHJldHVybnMgMToge2E6ICdncmVlbid9XG5cbiAgdmFyIHJldEFyciA9IHt9O1xuICB2YXIgYXJnbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBhcmdsbTEgPSBhcmdsIC0gMTtcbiAgdmFyIGsxID0gJyc7XG4gIHZhciBhcnIgPSB7fTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgayA9ICcnO1xuXG4gIGFycjFrZXlzOiBmb3IgKGsxIGluIGFycjEpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgIGFycnM6IGZvciAoaSA9IDE7IGkgPCBhcmdsOyBpKyspIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgICBhcnIgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKGsgaW4gYXJyKSB7XG4gICAgICAgIGlmIChhcnJba10gPT09IGFycjFbazFdICYmIGsgPT09IGsxKSB7XG4gICAgICAgICAgaWYgKGkgPT09IGFyZ2xtMSkge1xuICAgICAgICAgICAgcmV0QXJyW2sxXSA9IGFycjFbazFdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJZiB0aGUgaW5uZXJtb3N0IGxvb3AgYWx3YXlzIGxlYWRzIGF0IGxlYXN0IG9uY2UgdG8gYW4gZXF1YWwgdmFsdWUsXG4gICAgICAgICAgLy8gY29udGludWUgdGhlIGxvb3AgdW50aWwgZG9uZVxuICAgICAgICAgIGNvbnRpbnVlIGFycnM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIElmIGl0IHJlYWNoZXMgaGVyZSwgaXQgd2Fzbid0IGZvdW5kIGluIGF0IGxlYXN0IG9uZSBhcnJheSwgc28gdHJ5IG5leHQgdmFsdWVcbiAgICAgIGNvbnRpbnVlIGFycjFrZXlzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXRBcnI7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlfaW50ZXJzZWN0X2Fzc29jLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheV9pbnRlcnNlY3Rfa2V5KGFycjEpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9pbnRlcnNlY3Rfa2V5L1xuICAvLyBvcmlnaW5hbCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgICBub3RlIDE6IFRoZXNlIG9ubHkgb3V0cHV0IGFzc29jaWF0aXZlIGFycmF5cyAod291bGQgbmVlZCB0byBiZVxuICAvLyAgICAgIG5vdGUgMTogYWxsIG51bWVyaWMgYW5kIGNvdW50aW5nIGZyb20gemVybyB0byBiZSBudW1lcmljKVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRhcnJheTEgPSB7YTogJ2dyZWVuJywgYjogJ2Jyb3duJywgYzogJ2JsdWUnLCAwOiAncmVkJ31cbiAgLy8gICBleGFtcGxlIDE6IHZhciAkYXJyYXkyID0ge2E6ICdncmVlbicsIDA6ICd5ZWxsb3cnLCAxOiAncmVkJ31cbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X2ludGVyc2VjdF9rZXkoJGFycmF5MSwgJGFycmF5MilcbiAgLy8gICByZXR1cm5zIDE6IHswOiAncmVkJywgYTogJ2dyZWVuJ31cblxuICB2YXIgcmV0QXJyID0ge307XG4gIHZhciBhcmdsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGFyZ2xtMSA9IGFyZ2wgLSAxO1xuICB2YXIgazEgPSAnJztcbiAgdmFyIGFyciA9IHt9O1xuICB2YXIgaSA9IDA7XG4gIHZhciBrID0gJyc7XG5cbiAgYXJyMWtleXM6IGZvciAoazEgaW4gYXJyMSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgaWYgKCFhcnIxLmhhc093blByb3BlcnR5KGsxKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGFycnM6IGZvciAoaSA9IDE7IGkgPCBhcmdsOyBpKyspIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgICBhcnIgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKGsgaW4gYXJyKSB7XG4gICAgICAgIGlmICghYXJyLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGsgPT09IGsxKSB7XG4gICAgICAgICAgaWYgKGkgPT09IGFyZ2xtMSkge1xuICAgICAgICAgICAgcmV0QXJyW2sxXSA9IGFycjFbazFdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJZiB0aGUgaW5uZXJtb3N0IGxvb3AgYWx3YXlzIGxlYWRzIGF0IGxlYXN0IG9uY2UgdG8gYW4gZXF1YWwgdmFsdWUsXG4gICAgICAgICAgLy8gY29udGludWUgdGhlIGxvb3AgdW50aWwgZG9uZVxuICAgICAgICAgIGNvbnRpbnVlIGFycnM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIElmIGl0IHJlYWNoZXMgaGVyZSwgaXQgd2Fzbid0IGZvdW5kIGluIGF0IGxlYXN0IG9uZSBhcnJheSwgc28gdHJ5IG5leHQgdmFsdWVcbiAgICAgIGNvbnRpbnVlIGFycjFrZXlzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXRBcnI7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlfaW50ZXJzZWN0X2tleS5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfaW50ZXJzZWN0X3Vhc3NvYyhhcnIxKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvYXJyYXlfaW50ZXJzZWN0X3Vhc3NvYy9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGFycmF5MSA9IHthOiAnZ3JlZW4nLCBiOiAnYnJvd24nLCBjOiAnYmx1ZScsIDA6ICdyZWQnfVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRhcnJheTIgPSB7YTogJ0dSRUVOJywgQjogJ2Jyb3duJywgMDogJ3llbGxvdycsIDE6ICdyZWQnfVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfaW50ZXJzZWN0X3Vhc3NvYygkYXJyYXkxLCAkYXJyYXkyLCBmdW5jdGlvbiAoZl9zdHJpbmcxLCBmX3N0cmluZzIpe3ZhciBzdHJpbmcxID0gKGZfc3RyaW5nMSsnJykudG9Mb3dlckNhc2UoKTsgdmFyIHN0cmluZzIgPSAoZl9zdHJpbmcyKycnKS50b0xvd2VyQ2FzZSgpOyBpZiAoc3RyaW5nMSA+IHN0cmluZzIpIHJldHVybiAxOyBpZiAoc3RyaW5nMSA9PT0gc3RyaW5nMikgcmV0dXJuIDA7IHJldHVybiAtMTt9KVxuICAvLyAgIHJldHVybnMgMToge2I6ICdicm93bid9XG5cbiAgdmFyIHJldEFyciA9IHt9O1xuICB2YXIgYXJnbG0xID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gIHZhciBhcmdsbTIgPSBhcmdsbTEgLSAxO1xuICB2YXIgY2IgPSBhcmd1bWVudHNbYXJnbG0xXTtcbiAgLy8gdmFyIGNiMCA9IGFyZ3VtZW50c1thcmdsbTJdXG4gIHZhciBrMSA9ICcnO1xuICB2YXIgaSA9IDE7XG4gIHZhciBrID0gJyc7XG4gIHZhciBhcnIgPSB7fTtcblxuICB2YXIgJGdsb2JhbCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsO1xuXG4gIGNiID0gdHlwZW9mIGNiID09PSAnc3RyaW5nJyA/ICRnbG9iYWxbY2JdIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNiKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA/ICRnbG9iYWxbY2JbMF1dW2NiWzFdXSA6IGNiO1xuXG4gIC8vIGNiMCA9ICh0eXBlb2YgY2IwID09PSAnc3RyaW5nJylcbiAgLy8gICA/ICRnbG9iYWxbY2IwXVxuICAvLyAgIDogKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjYjApID09PSAnW29iamVjdCBBcnJheV0nKVxuICAvLyAgICAgPyAkZ2xvYmFsW2NiMFswXV1bY2IwWzFdXVxuICAvLyAgICAgOiBjYjBcblxuICBhcnIxa2V5czogZm9yIChrMSBpbiBhcnIxKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sYWJlbHNcbiAgICBhcnJzOiBmb3IgKGkgPSAxOyBpIDwgYXJnbG0xOyBpKyspIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgICBhcnIgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKGsgaW4gYXJyKSB7XG4gICAgICAgIGlmIChhcnJba10gPT09IGFycjFbazFdICYmIGNiKGssIGsxKSA9PT0gMCkge1xuICAgICAgICAgIGlmIChpID09PSBhcmdsbTIpIHtcbiAgICAgICAgICAgIHJldEFycltrMV0gPSBhcnIxW2sxXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSWYgdGhlIGlubmVybW9zdCBsb29wIGFsd2F5cyBsZWFkcyBhdCBsZWFzdCBvbmNlIHRvIGFuIGVxdWFsIHZhbHVlLFxuICAgICAgICAgIC8vIGNvbnRpbnVlIHRoZSBsb29wIHVudGlsIGRvbmVcbiAgICAgICAgICBjb250aW51ZSBhcnJzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBJZiBpdCByZWFjaGVzIGhlcmUsIGl0IHdhc24ndCBmb3VuZCBpbiBhdCBsZWFzdCBvbmUgYXJyYXksIHNvIHRyeSBuZXh0IHZhbHVlXG4gICAgICBjb250aW51ZSBhcnIxa2V5czsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sYWJlbHNcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0QXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X2ludGVyc2VjdF91YXNzb2MuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X2ludGVyc2VjdF91a2V5KGFycjEpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9pbnRlcnNlY3RfdWtleS9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGFycmF5MSA9IHtibHVlOiAxLCByZWQ6IDIsIGdyZWVuOiAzLCBwdXJwbGU6IDR9XG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGFycmF5MiA9IHtncmVlbjogNSwgYmx1ZTogNiwgeWVsbG93OiA3LCBjeWFuOiA4fVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfaW50ZXJzZWN0X3VrZXkgKCRhcnJheTEsICRhcnJheTIsIGZ1bmN0aW9uIChrZXkxLCBrZXkyKXsgcmV0dXJuIChrZXkxID09PSBrZXkyID8gMCA6IChrZXkxID4ga2V5MiA/IDEgOiAtMSkpOyB9KVxuICAvLyAgIHJldHVybnMgMToge2JsdWU6IDEsIGdyZWVuOiAzfVxuXG4gIHZhciByZXRBcnIgPSB7fTtcbiAgdmFyIGFyZ2xtMSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICB2YXIgYXJnbG0yID0gYXJnbG0xIC0gMTtcbiAgdmFyIGNiID0gYXJndW1lbnRzW2FyZ2xtMV07XG4gIC8vIHZhciBjYjAgPSBhcmd1bWVudHNbYXJnbG0yXVxuICB2YXIgazEgPSAnJztcbiAgdmFyIGkgPSAxO1xuICB2YXIgayA9ICcnO1xuICB2YXIgYXJyID0ge307XG5cbiAgdmFyICRnbG9iYWwgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbDtcblxuICBjYiA9IHR5cGVvZiBjYiA9PT0gJ3N0cmluZycgPyAkZ2xvYmFsW2NiXSA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjYikgPT09ICdbb2JqZWN0IEFycmF5XScgPyAkZ2xvYmFsW2NiWzBdXVtjYlsxXV0gOiBjYjtcblxuICAvLyBjYjAgPSAodHlwZW9mIGNiMCA9PT0gJ3N0cmluZycpXG4gIC8vICAgPyAkZ2xvYmFsW2NiMF1cbiAgLy8gICA6IChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY2IwKSA9PT0gJ1tvYmplY3QgQXJyYXldJylcbiAgLy8gICAgID8gJGdsb2JhbFtjYjBbMF1dW2NiMFsxXV1cbiAgLy8gICAgIDogY2IwXG5cbiAgYXJyMWtleXM6IGZvciAoazEgaW4gYXJyMSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgYXJyczogZm9yIChpID0gMTsgaSA8IGFyZ2xtMTsgaSsrKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgICAgYXJyID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yIChrIGluIGFycikge1xuICAgICAgICBpZiAoY2IoaywgazEpID09PSAwKSB7XG4gICAgICAgICAgaWYgKGkgPT09IGFyZ2xtMikge1xuICAgICAgICAgICAgcmV0QXJyW2sxXSA9IGFycjFbazFdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJZiB0aGUgaW5uZXJtb3N0IGxvb3AgYWx3YXlzIGxlYWRzIGF0IGxlYXN0IG9uY2UgdG8gYW4gZXF1YWwgdmFsdWUsXG4gICAgICAgICAgLy8gY29udGludWUgdGhlIGxvb3AgdW50aWwgZG9uZVxuICAgICAgICAgIGNvbnRpbnVlIGFycnM7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIElmIGl0IHJlYWNoZXMgaGVyZSwgaXQgd2Fzbid0IGZvdW5kIGluIGF0IGxlYXN0IG9uZSBhcnJheSwgc28gdHJ5IG5leHQgdmFsdWVcbiAgICAgIGNvbnRpbnVlIGFycjFrZXlzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXRBcnI7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlfaW50ZXJzZWN0X3VrZXkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfa2V5X2V4aXN0cyhrZXksIHNlYXJjaCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X2tleV9leGlzdHMvXG4gIC8vIG9yaWdpbmFsIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyBpbXByb3ZlZCBieTogRmVsaXggR2Vpc2VuZG9lcmZlciAoaHR0cDovL3d3dy5kZWJ1Z2dhYmxlLmNvbS9mZWxpeClcbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X2tleV9leGlzdHMoJ2tldmluJywgeydrZXZpbic6ICd2YW4gWm9ubmV2ZWxkJ30pXG4gIC8vICAgcmV0dXJucyAxOiB0cnVlXG5cbiAgaWYgKCFzZWFyY2ggfHwgc2VhcmNoLmNvbnN0cnVjdG9yICE9PSBBcnJheSAmJiBzZWFyY2guY29uc3RydWN0b3IgIT09IE9iamVjdCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBrZXkgaW4gc2VhcmNoO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X2tleV9leGlzdHMuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X2tleXMoaW5wdXQsIHNlYXJjaFZhbHVlLCBhcmdTdHJpY3QpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9rZXlzL1xuICAvLyBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gICAgaW5wdXQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgIGlucHV0IGJ5OiBQXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyBidWdmaXhlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gaW1wcm92ZWQgYnk6IGpkXG4gIC8vIGltcHJvdmVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfa2V5cygge2ZpcnN0bmFtZTogJ0tldmluJywgc3VybmFtZTogJ3ZhbiBab25uZXZlbGQnfSApXG4gIC8vICAgcmV0dXJucyAxOiBbICdmaXJzdG5hbWUnLCAnc3VybmFtZScgXVxuXG4gIHZhciBzZWFyY2ggPSB0eXBlb2Ygc2VhcmNoVmFsdWUgIT09ICd1bmRlZmluZWQnO1xuICB2YXIgdG1wQXJyID0gW107XG4gIHZhciBzdHJpY3QgPSAhIWFyZ1N0cmljdDtcbiAgdmFyIGluY2x1ZGUgPSB0cnVlO1xuICB2YXIga2V5ID0gJyc7XG5cbiAgZm9yIChrZXkgaW4gaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaW5jbHVkZSA9IHRydWU7XG4gICAgICBpZiAoc2VhcmNoKSB7XG4gICAgICAgIGlmIChzdHJpY3QgJiYgaW5wdXRba2V5XSAhPT0gc2VhcmNoVmFsdWUpIHtcbiAgICAgICAgICBpbmNsdWRlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5wdXRba2V5XSAhPT0gc2VhcmNoVmFsdWUpIHtcbiAgICAgICAgICBpbmNsdWRlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGluY2x1ZGUpIHtcbiAgICAgICAgdG1wQXJyW3RtcEFyci5sZW5ndGhdID0ga2V5O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0bXBBcnI7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlfa2V5cy5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheV9tYXAoY2FsbGJhY2spIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9tYXAvXG4gIC8vIG9yaWdpbmFsIGJ5OiBBbmRyZWEgR2lhbW1hcmNoaSAoaHR0cDovL3dlYnJlZmxlY3Rpb24uYmxvZ3Nwb3QuY29tKVxuICAvLyBpbXByb3ZlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gaW1wcm92ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgIGlucHV0IGJ5OiB0aGVraWRcbiAgLy8gICAgICBub3RlIDE6IElmIHRoZSBjYWxsYmFjayBpcyBhIHN0cmluZyAob3Igb2JqZWN0LCBpZiBhbiBhcnJheSBpcyBzdXBwbGllZCksXG4gIC8vICAgICAgbm90ZSAxOiBpdCBjYW4gb25seSB3b3JrIGlmIHRoZSBmdW5jdGlvbiBuYW1lIGlzIGluIHRoZSBnbG9iYWwgY29udGV4dFxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfbWFwKCBmdW5jdGlvbiAoYSl7cmV0dXJuIChhICogYSAqIGEpfSwgWzEsIDIsIDMsIDQsIDVdIClcbiAgLy8gICByZXR1cm5zIDE6IFsgMSwgOCwgMjcsIDY0LCAxMjUgXVxuXG4gIHZhciBhcmdjID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGFyZ3YgPSBhcmd1bWVudHM7XG4gIHZhciBvYmogPSBudWxsO1xuICB2YXIgY2IgPSBjYWxsYmFjaztcbiAgdmFyIGogPSBhcmd2WzFdLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgayA9IDE7XG4gIHZhciBtID0gMDtcbiAgdmFyIHRtcCA9IFtdO1xuICB2YXIgdG1wQXJyID0gW107XG5cbiAgdmFyICRnbG9iYWwgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbDtcblxuICB3aGlsZSAoaSA8IGopIHtcbiAgICB3aGlsZSAoayA8IGFyZ2MpIHtcbiAgICAgIHRtcFttKytdID0gYXJndltrKytdW2ldO1xuICAgIH1cblxuICAgIG0gPSAwO1xuICAgIGsgPSAxO1xuXG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJykge1xuICAgICAgICBjYiA9ICRnbG9iYWxbY2FsbGJhY2tdO1xuICAgICAgfSBlbHNlIGlmICgodHlwZW9mIGNhbGxiYWNrID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihjYWxsYmFjaykpID09PSAnb2JqZWN0JyAmJiBjYWxsYmFjay5sZW5ndGgpIHtcbiAgICAgICAgb2JqID0gdHlwZW9mIGNhbGxiYWNrWzBdID09PSAnc3RyaW5nJyA/ICRnbG9iYWxbY2FsbGJhY2tbMF1dIDogY2FsbGJhY2tbMF07XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT2JqZWN0IG5vdCBmb3VuZDogJyArIGNhbGxiYWNrWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBjYiA9IHR5cGVvZiBjYWxsYmFja1sxXSA9PT0gJ3N0cmluZycgPyBvYmpbY2FsbGJhY2tbMV1dIDogY2FsbGJhY2tbMV07XG4gICAgICB9XG4gICAgICB0bXBBcnJbaSsrXSA9IGNiLmFwcGx5KG9iaiwgdG1wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG1wQXJyW2krK10gPSB0bXA7XG4gICAgfVxuXG4gICAgdG1wID0gW107XG4gIH1cblxuICByZXR1cm4gdG1wQXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X21hcC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfbWVyZ2UoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvYXJyYXlfbWVyZ2UvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBidWdmaXhlZCBieTogTmF0ZVxuICAvLyBidWdmaXhlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgaW5wdXQgYnk6IGpvc2hcbiAgLy8gICBleGFtcGxlIDE6IHZhciAkYXJyMSA9IHtcImNvbG9yXCI6IFwicmVkXCIsIDA6IDIsIDE6IDR9XG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGFycjIgPSB7MDogXCJhXCIsIDE6IFwiYlwiLCBcImNvbG9yXCI6IFwiZ3JlZW5cIiwgXCJzaGFwZVwiOiBcInRyYXBlem9pZFwiLCAyOiA0fVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfbWVyZ2UoJGFycjEsICRhcnIyKVxuICAvLyAgIHJldHVybnMgMToge1wiY29sb3JcIjogXCJncmVlblwiLCAwOiAyLCAxOiA0LCAyOiBcImFcIiwgMzogXCJiXCIsIFwic2hhcGVcIjogXCJ0cmFwZXpvaWRcIiwgNDogNH1cbiAgLy8gICBleGFtcGxlIDI6IHZhciAkYXJyMSA9IFtdXG4gIC8vICAgZXhhbXBsZSAyOiB2YXIgJGFycjIgPSB7MTogXCJkYXRhXCJ9XG4gIC8vICAgZXhhbXBsZSAyOiBhcnJheV9tZXJnZSgkYXJyMSwgJGFycjIpXG4gIC8vICAgcmV0dXJucyAyOiB7MDogXCJkYXRhXCJ9XG5cbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICB2YXIgYXJnbCA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgYXJnO1xuICB2YXIgcmV0T2JqID0ge307XG4gIHZhciBrID0gJyc7XG4gIHZhciBhcmdpbCA9IDA7XG4gIHZhciBqID0gMDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgY3QgPSAwO1xuICB2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgcmV0QXJyID0gdHJ1ZTtcblxuICBmb3IgKGkgPSAwOyBpIDwgYXJnbDsgaSsrKSB7XG4gICAgaWYgKHRvU3RyLmNhbGwoYXJnc1tpXSkgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIHJldEFyciA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHJldEFycikge1xuICAgIHJldEFyciA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCBhcmdsOyBpKyspIHtcbiAgICAgIHJldEFyciA9IHJldEFyci5jb25jYXQoYXJnc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXRBcnI7XG4gIH1cblxuICBmb3IgKGkgPSAwLCBjdCA9IDA7IGkgPCBhcmdsOyBpKyspIHtcbiAgICBhcmcgPSBhcmdzW2ldO1xuICAgIGlmICh0b1N0ci5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIGZvciAoaiA9IDAsIGFyZ2lsID0gYXJnLmxlbmd0aDsgaiA8IGFyZ2lsOyBqKyspIHtcbiAgICAgICAgcmV0T2JqW2N0KytdID0gYXJnW2pdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGsgaW4gYXJnKSB7XG4gICAgICAgIGlmIChhcmcuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICBpZiAocGFyc2VJbnQoaywgMTApICsgJycgPT09IGspIHtcbiAgICAgICAgICAgIHJldE9ialtjdCsrXSA9IGFyZ1trXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0T2JqW2tdID0gYXJnW2tdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXRPYmo7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlfbWVyZ2UuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfbWVyZ2VfcmVjdXJzaXZlKGFycjEsIGFycjIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9tZXJnZV9yZWN1cnNpdmUvXG4gIC8vIG9yaWdpbmFsIGJ5OiBTdWJoYXNpcyBEZWJcbiAgLy8gICAgaW5wdXQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRhcnIxID0geydjb2xvcic6IHsnZmF2b3JpdGUnOiAncmVkJ30sIDA6IDV9XG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGFycjIgPSB7MDogMTAsICdjb2xvcic6IHsnZmF2b3JpdGUnOiAnZ3JlZW4nLCAwOiAnYmx1ZSd9fVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfbWVyZ2VfcmVjdXJzaXZlKCRhcnIxLCAkYXJyMilcbiAgLy8gICByZXR1cm5zIDE6IHsnY29sb3InOiB7J2Zhdm9yaXRlJzogezA6ICdyZWQnLCAxOiAnZ3JlZW4nfSwgMDogJ2JsdWUnfSwgMTogNSwgMTogMTB9XG4gIC8vICAgICAgICB0ZXN0OiBza2lwLTFcblxuICB2YXIgYXJyYXlNZXJnZSA9IHJlcXVpcmUoJy4uL2FycmF5L2FycmF5X21lcmdlJyk7XG4gIHZhciBpZHggPSAnJztcblxuICBpZiAoYXJyMSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyMSkgPT09ICdbb2JqZWN0IEFycmF5XScgJiYgYXJyMiAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyMikgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICBmb3IgKGlkeCBpbiBhcnIyKSB7XG4gICAgICBhcnIxLnB1c2goYXJyMltpZHhdKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoYXJyMSAmJiBhcnIxIGluc3RhbmNlb2YgT2JqZWN0ICYmIGFycjIgJiYgYXJyMiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgIGZvciAoaWR4IGluIGFycjIpIHtcbiAgICAgIGlmIChpZHggaW4gYXJyMSkge1xuICAgICAgICBpZiAoX3R5cGVvZihhcnIxW2lkeF0pID09PSAnb2JqZWN0JyAmJiAodHlwZW9mIGFycjIgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGFycjIpKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBhcnIxW2lkeF0gPSBhcnJheU1lcmdlKGFycjFbaWR4XSwgYXJyMltpZHhdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnIxW2lkeF0gPSBhcnIyW2lkeF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycjFbaWR4XSA9IGFycjJbaWR4XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXJyMTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV9tZXJnZV9yZWN1cnNpdmUuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfbXVsdGlzb3J0KGFycikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X211bHRpc29ydC9cbiAgLy8gb3JpZ2luYWwgYnk6IFRoZXJpYXVsdCAoaHR0cHM6Ly9naXRodWIuY29tL1RoZXJpYXVsdClcbiAgLy8gaW1wcm92ZWQgYnk6IE9sZWcgQW5kcmV5ZXYgKGh0dHBzOi8vZ2l0aHViLmNvbS9vbGVnLWFuZHJleWV2KVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfbXVsdGlzb3J0KFsxLCAyLCAxLCAyLCAxLCAyXSwgWzEsIDIsIDMsIDQsIDUsIDZdKVxuICAvLyAgIHJldHVybnMgMTogdHJ1ZVxuICAvLyAgIGV4YW1wbGUgMjogdmFyICRjaGFyYWN0ZXJzID0ge0E6ICdFZHdhcmQnLCBCOiAnTG9ja2UnLCBDOiAnU2FiaW4nLCBEOiAnVGVycmEnLCBFOiAnRWR3YXJkJ31cbiAgLy8gICBleGFtcGxlIDI6IHZhciAkam9icyA9IHtBOiAnV2FycmlvcicsIEI6ICdUaGllZicsIEM6ICdNb25rJywgRDogJ01hZ2UnLCBFOiAnS25pZ2h0J31cbiAgLy8gICBleGFtcGxlIDI6IGFycmF5X211bHRpc29ydCgkY2hhcmFjdGVycywgJ1NPUlRfREVTQycsICdTT1JUX1NUUklORycsICRqb2JzLCAnU09SVF9BU0MnLCAnU09SVF9TVFJJTkcnKVxuICAvLyAgIHJldHVybnMgMjogdHJ1ZVxuICAvLyAgIGV4YW1wbGUgMzogdmFyICRsYXN0bmFtZXMgPSBbICdDYXJ0ZXInLCdBZGFtcycsJ01vbnJvZScsJ1R5bGVyJywnTWFkaXNvbicsJ0tlbm5lZHknLCdBZGFtcyddXG4gIC8vICAgZXhhbXBsZSAzOiB2YXIgJGZpcnN0bmFtZXMgPSBbJ0phbWVzJywgJ0pvaG4nICwnSmFtZXMnLCAnSm9obicsICdKYW1lcycsICAnSm9obicsICAgJ0pvaG4nXVxuICAvLyAgIGV4YW1wbGUgMzogdmFyICRwcmVzaWRlbnQgPSBbIDM5LCA2LCA1LCAxMCwgNCwgMzUsIDIgXVxuICAvLyAgIGV4YW1wbGUgMzogYXJyYXlfbXVsdGlzb3J0KCRmaXJzdG5hbWVzLCAnU09SVF9ERVNDJywgJ1NPUlRfU1RSSU5HJywgJGxhc3RuYW1lcywgJ1NPUlRfQVNDJywgJ1NPUlRfU1RSSU5HJywgJHByZXNpZGVudCwgJ1NPUlRfTlVNRVJJQycpXG4gIC8vICAgcmV0dXJucyAzOiB0cnVlXG4gIC8vICAgICAgbm90ZSAxOiBmbGFnczogVHJhbnNsYXRpb24gdGFibGUgZm9yIHNvcnQgYXJndW1lbnRzLlxuICAvLyAgICAgIG5vdGUgMTogRWFjaCBhcmd1bWVudCB0dXJucyBvbiBjZXJ0YWluIGJpdHMgaW4gdGhlIGZsYWcgYnl0ZSB0aHJvdWdoIGFkZGl0aW9uLlxuICAvLyAgICAgIG5vdGUgMTogYml0czogSEdGRSBEQ0JBXG4gIC8vICAgICAgbm90ZSAxOiBhcmdzOiBIb2xkcyBwb2ludGVyIHRvIGFyZ3VtZW50cyBmb3IgcmVhc3NpZ25tZW50XG5cbiAgdmFyIGc7XG4gIHZhciBpO1xuICB2YXIgajtcbiAgdmFyIGs7XG4gIHZhciBsO1xuICB2YXIgc2FsO1xuICB2YXIgdmtleTtcbiAgdmFyIGVsSW5kZXg7XG4gIHZhciBsYXN0U29ydHM7XG4gIHZhciB0bXBBcnJheTtcbiAgdmFyIHpsYXN0O1xuXG4gIHZhciBzb3J0RmxhZyA9IFswXTtcbiAgdmFyIHRoaW5nc1RvU29ydCA9IFtdO1xuICB2YXIgbkxhc3RTb3J0ID0gW107XG4gIHZhciBsYXN0U29ydCA9IFtdO1xuICAvLyBwb3NzaWJseSByZWR1bmRhbnRcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgdmFyIGZsYWdzID0ge1xuICAgICdTT1JUX1JFR1VMQVInOiAxNixcbiAgICAnU09SVF9OVU1FUklDJzogMTcsXG4gICAgJ1NPUlRfU1RSSU5HJzogMTgsXG4gICAgJ1NPUlRfQVNDJzogMzIsXG4gICAgJ1NPUlRfREVTQyc6IDQwXG4gIH07XG5cbiAgdmFyIHNvcnREdXBsaWNhdG9yID0gZnVuY3Rpb24gc29ydER1cGxpY2F0b3IoYSwgYikge1xuICAgIHJldHVybiBuTGFzdFNvcnQuc2hpZnQoKTtcbiAgfTtcblxuICB2YXIgc29ydEZ1bmN0aW9ucyA9IFtbZnVuY3Rpb24gKGEsIGIpIHtcbiAgICBsYXN0U29ydC5wdXNoKGEgPiBiID8gMSA6IGEgPCBiID8gLTEgOiAwKTtcbiAgICByZXR1cm4gYSA+IGIgPyAxIDogYSA8IGIgPyAtMSA6IDA7XG4gIH0sIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgbGFzdFNvcnQucHVzaChiID4gYSA/IDEgOiBiIDwgYSA/IC0xIDogMCk7XG4gICAgcmV0dXJuIGIgPiBhID8gMSA6IGIgPCBhID8gLTEgOiAwO1xuICB9XSwgW2Z1bmN0aW9uIChhLCBiKSB7XG4gICAgbGFzdFNvcnQucHVzaChhIC0gYik7XG4gICAgcmV0dXJuIGEgLSBiO1xuICB9LCBmdW5jdGlvbiAoYSwgYikge1xuICAgIGxhc3RTb3J0LnB1c2goYiAtIGEpO1xuICAgIHJldHVybiBiIC0gYTtcbiAgfV0sIFtmdW5jdGlvbiAoYSwgYikge1xuICAgIGxhc3RTb3J0LnB1c2goYSArICcnID4gYiArICcnID8gMSA6IGEgKyAnJyA8IGIgKyAnJyA/IC0xIDogMCk7XG4gICAgcmV0dXJuIGEgKyAnJyA+IGIgKyAnJyA/IDEgOiBhICsgJycgPCBiICsgJycgPyAtMSA6IDA7XG4gIH0sIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgbGFzdFNvcnQucHVzaChiICsgJycgPiBhICsgJycgPyAxIDogYiArICcnIDwgYSArICcnID8gLTEgOiAwKTtcbiAgICByZXR1cm4gYiArICcnID4gYSArICcnID8gMSA6IGIgKyAnJyA8IGEgKyAnJyA/IC0xIDogMDtcbiAgfV1dO1xuXG4gIHZhciBzb3J0QXJycyA9IFtbXV07XG5cbiAgdmFyIHNvcnRLZXlzID0gW1tdXTtcblxuICAvLyBTdG9yZSBmaXJzdCBhcmd1bWVudCBpbnRvIHNvcnRBcnJzIGFuZCBzb3J0S2V5cyBpZiBhbiBPYmplY3QuXG4gIC8vIEZpcnN0IEFyZ3VtZW50IHNob3VsZCBiZSBlaXRoZXIgYSBKYXZhc2NyaXB0IEFycmF5IG9yIGFuIE9iamVjdCxcbiAgLy8gb3RoZXJ3aXNlIGZ1bmN0aW9uIHdvdWxkIHJldHVybiBGQUxTRSBsaWtlIGluIFBIUFxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICBzb3J0QXJyc1swXSA9IGFycjtcbiAgfSBlbHNlIGlmIChhcnIgJiYgKHR5cGVvZiBhcnIgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGFycikpID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAoaSBpbiBhcnIpIHtcbiAgICAgIGlmIChhcnIuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgc29ydEtleXNbMF0ucHVzaChpKTtcbiAgICAgICAgc29ydEFycnNbMF0ucHVzaChhcnJbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBhcnJNYWluTGVuZ3RoOiBIb2xkcyB0aGUgbGVuZ3RoIG9mIHRoZSBmaXJzdCBhcnJheS5cbiAgLy8gQWxsIG90aGVyIGFycmF5cyBtdXN0IGJlIG9mIGVxdWFsIGxlbmd0aCwgb3RoZXJ3aXNlIGZ1bmN0aW9uIHdvdWxkIHJldHVybiBGQUxTRSBsaWtlIGluIFBIUFxuICAvLyBzb3J0Q29tcG9uZW50czogSG9sZHMgMiBpbmRleGVzIHBlciBldmVyeSBzZWN0aW9uIG9mIHRoZSBhcnJheVxuICAvLyB0aGF0IGNhbiBiZSBzb3J0ZWQuIEFzIHRoaXMgaXMgdGhlIHN0YXJ0LCB0aGUgd2hvbGUgYXJyYXkgY2FuIGJlIHNvcnRlZC5cbiAgdmFyIGFyck1haW5MZW5ndGggPSBzb3J0QXJyc1swXS5sZW5ndGg7XG4gIHZhciBzb3J0Q29tcG9uZW50cyA9IFswLCBhcnJNYWluTGVuZ3RoXTtcblxuICAvLyBMb29wIHRocm91Z2ggYWxsIG90aGVyIGFyZ3VtZW50cywgY2hlY2tpbmcgbGVuZ3RocyBhbmQgc29ydCBmbGFnc1xuICAvLyBvZiBhcnJheXMgYW5kIGFkZGluZyB0aGVtIHRvIHRoZSBhYm92ZSB2YXJpYWJsZXMuXG4gIHZhciBhcmdsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgZm9yIChqID0gMTsgaiA8IGFyZ2w7IGorKykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnRzW2pdKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgc29ydEFycnNbal0gPSBhcmd1bWVudHNbal07XG4gICAgICBzb3J0RmxhZ1tqXSA9IDA7XG4gICAgICBpZiAoYXJndW1lbnRzW2pdLmxlbmd0aCAhPT0gYXJyTWFpbkxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHNbal0gJiYgX3R5cGVvZihhcmd1bWVudHNbal0pID09PSAnb2JqZWN0Jykge1xuICAgICAgc29ydEtleXNbal0gPSBbXTtcbiAgICAgIHNvcnRBcnJzW2pdID0gW107XG4gICAgICBzb3J0RmxhZ1tqXSA9IDA7XG4gICAgICBmb3IgKGkgaW4gYXJndW1lbnRzW2pdKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHNbal0uaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICBzb3J0S2V5c1tqXS5wdXNoKGkpO1xuICAgICAgICAgIHNvcnRBcnJzW2pdLnB1c2goYXJndW1lbnRzW2pdW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHNvcnRBcnJzW2pdLmxlbmd0aCAhPT0gYXJyTWFpbkxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnRzW2pdID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIGxGbGFnID0gc29ydEZsYWcucG9wKCk7XG4gICAgICAvLyBLZWVwIGV4dHJhIHBhcmVudGhlc2VzIGFyb3VuZCBsYXR0ZXIgZmxhZ3MgY2hlY2tcbiAgICAgIC8vIHRvIGF2b2lkIG1pbmltaXphdGlvbiBsZWFkaW5nIHRvIENEQVRBIGNsb3NlclxuICAgICAgaWYgKHR5cGVvZiBmbGFnc1thcmd1bWVudHNbal1dID09PSAndW5kZWZpbmVkJyB8fCAoZmxhZ3NbYXJndW1lbnRzW2pdXSA+Pj4gNCAmIGxGbGFnID4+PiA0KSA+IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgc29ydEZsYWcucHVzaChsRmxhZyArIGZsYWdzW2FyZ3VtZW50c1tqXV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSAhPT0gYXJyTWFpbkxlbmd0aDsgaSsrKSB7XG4gICAgdGhpbmdzVG9Tb3J0LnB1c2godHJ1ZSk7XG4gIH1cblxuICAvLyBTb3J0IGFsbCB0aGUgYXJyYXlzLi4uLlxuICBmb3IgKGkgaW4gc29ydEFycnMpIHtcbiAgICBpZiAoc29ydEFycnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIGxhc3RTb3J0cyA9IFtdO1xuICAgICAgdG1wQXJyYXkgPSBbXTtcbiAgICAgIGVsSW5kZXggPSAwO1xuICAgICAgbkxhc3RTb3J0ID0gW107XG4gICAgICBsYXN0U29ydCA9IFtdO1xuXG4gICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gc29ydENvbXBvbmVudHMsIHRoZW4gbm8gbW9yZSBzb3J0aW5nIGlzIG5lZWVkZWQuXG4gICAgICAvLyBDb3B5IHRoZSBhcnJheSBiYWNrIHRvIHRoZSBhcmd1bWVudC5cbiAgICAgIGlmIChzb3J0Q29tcG9uZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudHNbaV0pID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IHNvcnRBcnJzW2ldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAoayBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0uaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIGFyZ3VtZW50c1tpXVtrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc2FsID0gc29ydEFycnNbaV0ubGVuZ3RoO1xuICAgICAgICAgIGZvciAoaiA9IDAsIHZrZXkgPSAwOyBqIDwgc2FsOyBqKyspIHtcbiAgICAgICAgICAgIHZrZXkgPSBzb3J0S2V5c1tpXVtqXTtcbiAgICAgICAgICAgIGFyZ3NbaV1bdmtleV0gPSBzb3J0QXJyc1tpXVtqXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc29ydEFycnMuc3BsaWNlKGksIDEpO1xuICAgICAgICBzb3J0S2V5cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBTb3J0IGZ1bmN0aW9uIGZvciBzb3J0aW5nLiBFaXRoZXIgc29ydHMgYXNjIG9yIGRlc2MsIHJlZ3VsYXIvc3RyaW5nIG9yIG51bWVyaWMuXG4gICAgICB2YXIgc0Z1bmN0aW9uID0gc29ydEZ1bmN0aW9uc1tzb3J0RmxhZ1tpXSAmIDNdWyhzb3J0RmxhZ1tpXSAmIDgpID4gMCA/IDEgOiAwXTtcblxuICAgICAgLy8gU29ydCBjdXJyZW50IGFycmF5LlxuICAgICAgZm9yIChsID0gMDsgbCAhPT0gc29ydENvbXBvbmVudHMubGVuZ3RoOyBsICs9IDIpIHtcbiAgICAgICAgdG1wQXJyYXkgPSBzb3J0QXJyc1tpXS5zbGljZShzb3J0Q29tcG9uZW50c1tsXSwgc29ydENvbXBvbmVudHNbbCArIDFdICsgMSk7XG4gICAgICAgIHRtcEFycmF5LnNvcnQoc0Z1bmN0aW9uKTtcbiAgICAgICAgLy8gSXMgdGhlcmUgYSBiZXR0ZXIgd2F5IHRvIGNvcHkgYW4gYXJyYXkgaW4gSmF2YXNjcmlwdD9cbiAgICAgICAgbGFzdFNvcnRzW2xdID0gW10uY29uY2F0KGxhc3RTb3J0KTtcbiAgICAgICAgZWxJbmRleCA9IHNvcnRDb21wb25lbnRzW2xdO1xuICAgICAgICBmb3IgKGcgaW4gdG1wQXJyYXkpIHtcbiAgICAgICAgICBpZiAodG1wQXJyYXkuaGFzT3duUHJvcGVydHkoZykpIHtcbiAgICAgICAgICAgIHNvcnRBcnJzW2ldW2VsSW5kZXhdID0gdG1wQXJyYXlbZ107XG4gICAgICAgICAgICBlbEluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIER1cGxpY2F0ZSB0aGUgc29ydGluZyBvZiB0aGUgY3VycmVudCBhcnJheSBvbiBmdXR1cmUgYXJyYXlzLlxuICAgICAgc0Z1bmN0aW9uID0gc29ydER1cGxpY2F0b3I7XG4gICAgICBmb3IgKGogaW4gc29ydEFycnMpIHtcbiAgICAgICAgaWYgKHNvcnRBcnJzLmhhc093blByb3BlcnR5KGopKSB7XG4gICAgICAgICAgaWYgKHNvcnRBcnJzW2pdID09PSBzb3J0QXJyc1tpXSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAobCA9IDA7IGwgIT09IHNvcnRDb21wb25lbnRzLmxlbmd0aDsgbCArPSAyKSB7XG4gICAgICAgICAgICB0bXBBcnJheSA9IHNvcnRBcnJzW2pdLnNsaWNlKHNvcnRDb21wb25lbnRzW2xdLCBzb3J0Q29tcG9uZW50c1tsICsgMV0gKyAxKTtcbiAgICAgICAgICAgIC8vIGFsZXJ0KGwgKyAnOicgKyBuTGFzdFNvcnQpO1xuICAgICAgICAgICAgbkxhc3RTb3J0ID0gW10uY29uY2F0KGxhc3RTb3J0c1tsXSk7XG4gICAgICAgICAgICB0bXBBcnJheS5zb3J0KHNGdW5jdGlvbik7XG4gICAgICAgICAgICBlbEluZGV4ID0gc29ydENvbXBvbmVudHNbbF07XG4gICAgICAgICAgICBmb3IgKGcgaW4gdG1wQXJyYXkpIHtcbiAgICAgICAgICAgICAgaWYgKHRtcEFycmF5Lmhhc093blByb3BlcnR5KGcpKSB7XG4gICAgICAgICAgICAgICAgc29ydEFycnNbal1bZWxJbmRleF0gPSB0bXBBcnJheVtnXTtcbiAgICAgICAgICAgICAgICBlbEluZGV4Kys7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRHVwbGljYXRlIHRoZSBzb3J0aW5nIG9mIHRoZSBjdXJyZW50IGFycmF5IG9uIGFycmF5IGtleXNcbiAgICAgIGZvciAoaiBpbiBzb3J0S2V5cykge1xuICAgICAgICBpZiAoc29ydEtleXMuaGFzT3duUHJvcGVydHkoaikpIHtcbiAgICAgICAgICBmb3IgKGwgPSAwOyBsICE9PSBzb3J0Q29tcG9uZW50cy5sZW5ndGg7IGwgKz0gMikge1xuICAgICAgICAgICAgdG1wQXJyYXkgPSBzb3J0S2V5c1tqXS5zbGljZShzb3J0Q29tcG9uZW50c1tsXSwgc29ydENvbXBvbmVudHNbbCArIDFdICsgMSk7XG4gICAgICAgICAgICBuTGFzdFNvcnQgPSBbXS5jb25jYXQobGFzdFNvcnRzW2xdKTtcbiAgICAgICAgICAgIHRtcEFycmF5LnNvcnQoc0Z1bmN0aW9uKTtcbiAgICAgICAgICAgIGVsSW5kZXggPSBzb3J0Q29tcG9uZW50c1tsXTtcbiAgICAgICAgICAgIGZvciAoZyBpbiB0bXBBcnJheSkge1xuICAgICAgICAgICAgICBpZiAodG1wQXJyYXkuaGFzT3duUHJvcGVydHkoZykpIHtcbiAgICAgICAgICAgICAgICBzb3J0S2V5c1tqXVtlbEluZGV4XSA9IHRtcEFycmF5W2ddO1xuICAgICAgICAgICAgICAgIGVsSW5kZXgrKztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBHZW5lcmF0ZSB0aGUgbmV4dCBzb3J0Q29tcG9uZW50c1xuICAgICAgemxhc3QgPSBudWxsO1xuICAgICAgc29ydENvbXBvbmVudHMgPSBbXTtcbiAgICAgIGZvciAoaiBpbiBzb3J0QXJyc1tpXSkge1xuICAgICAgICBpZiAoc29ydEFycnNbaV0uaGFzT3duUHJvcGVydHkoaikpIHtcbiAgICAgICAgICBpZiAoIXRoaW5nc1RvU29ydFtqXSkge1xuICAgICAgICAgICAgaWYgKHNvcnRDb21wb25lbnRzLmxlbmd0aCAmIDEpIHtcbiAgICAgICAgICAgICAgc29ydENvbXBvbmVudHMucHVzaChqIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB6bGFzdCA9IG51bGw7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEoc29ydENvbXBvbmVudHMubGVuZ3RoICYgMSkpIHtcbiAgICAgICAgICAgIGlmICh6bGFzdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBpZiAoc29ydEFycnNbaV1bal0gPT09IHpsYXN0KSB7XG4gICAgICAgICAgICAgICAgc29ydENvbXBvbmVudHMucHVzaChqIC0gMSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpbmdzVG9Tb3J0W2pdID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHpsYXN0ID0gc29ydEFycnNbaV1bal07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzb3J0QXJyc1tpXVtqXSAhPT0gemxhc3QpIHtcbiAgICAgICAgICAgICAgc29ydENvbXBvbmVudHMucHVzaChqIC0gMSk7XG4gICAgICAgICAgICAgIHpsYXN0ID0gc29ydEFycnNbaV1bal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzb3J0Q29tcG9uZW50cy5sZW5ndGggJiAxKSB7XG4gICAgICAgIHNvcnRDb21wb25lbnRzLnB1c2goaik7XG4gICAgICB9XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50c1tpXSkgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgYXJnc1tpXSA9IHNvcnRBcnJzW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChqIGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0uaGFzT3duUHJvcGVydHkoaikpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBhcmd1bWVudHNbaV1bal07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2FsID0gc29ydEFycnNbaV0ubGVuZ3RoO1xuICAgICAgICBmb3IgKGogPSAwLCB2a2V5ID0gMDsgaiA8IHNhbDsgaisrKSB7XG4gICAgICAgICAgdmtleSA9IHNvcnRLZXlzW2ldW2pdO1xuICAgICAgICAgIGFyZ3NbaV1bdmtleV0gPSBzb3J0QXJyc1tpXVtqXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc29ydEFycnMuc3BsaWNlKGksIDEpO1xuICAgICAgc29ydEtleXMuc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV9tdWx0aXNvcnQuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X3BhZChpbnB1dCwgcGFkU2l6ZSwgcGFkVmFsdWUpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9wYWQvXG4gIC8vIG9yaWdpbmFsIGJ5OiBXYWxkbyBNYWxxdWkgU2lsdmEgKGh0dHA6Ly93YWxkby5tYWxxdWkuaW5mbylcbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X3BhZChbIDcsIDgsIDkgXSwgMiwgJ2EnKVxuICAvLyAgIHJldHVybnMgMTogWyA3LCA4LCA5XVxuICAvLyAgIGV4YW1wbGUgMjogYXJyYXlfcGFkKFsgNywgOCwgOSBdLCA1LCAnYScpXG4gIC8vICAgcmV0dXJucyAyOiBbIDcsIDgsIDksICdhJywgJ2EnXVxuICAvLyAgIGV4YW1wbGUgMzogYXJyYXlfcGFkKFsgNywgOCwgOSBdLCA1LCAyKVxuICAvLyAgIHJldHVybnMgMzogWyA3LCA4LCA5LCAyLCAyXVxuICAvLyAgIGV4YW1wbGUgNDogYXJyYXlfcGFkKFsgNywgOCwgOSBdLCAtNSwgJ2EnKVxuICAvLyAgIHJldHVybnMgNDogWyAnYScsICdhJywgNywgOCwgOSBdXG5cbiAgdmFyIHBhZCA9IFtdO1xuICB2YXIgbmV3QXJyYXkgPSBbXTtcbiAgdmFyIG5ld0xlbmd0aDtcbiAgdmFyIGRpZmYgPSAwO1xuICB2YXIgaSA9IDA7XG5cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEFycmF5XScgJiYgIWlzTmFOKHBhZFNpemUpKSB7XG4gICAgbmV3TGVuZ3RoID0gcGFkU2l6ZSA8IDAgPyBwYWRTaXplICogLTEgOiBwYWRTaXplO1xuICAgIGRpZmYgPSBuZXdMZW5ndGggLSBpbnB1dC5sZW5ndGg7XG5cbiAgICBpZiAoZGlmZiA+IDApIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBkaWZmOyBpKyspIHtcbiAgICAgICAgbmV3QXJyYXlbaV0gPSBwYWRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIHBhZCA9IHBhZFNpemUgPCAwID8gbmV3QXJyYXkuY29uY2F0KGlucHV0KSA6IGlucHV0LmNvbmNhdChuZXdBcnJheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZCA9IGlucHV0O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYWQ7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlfcGFkLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheV9wb3AoaW5wdXRBcnIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9wb3AvXG4gIC8vIG9yaWdpbmFsIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyBpbXByb3ZlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gICAgaW5wdXQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgIGlucHV0IGJ5OiBUaGVyaWF1bHQgKGh0dHBzOi8vZ2l0aHViLmNvbS9UaGVyaWF1bHQpXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyBidWdmaXhlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgICBub3RlIDE6IFdoaWxlIElFIChhbmQgb3RoZXIgYnJvd3NlcnMpIHN1cHBvcnQgaXRlcmF0aW5nIGFuIG9iamVjdCdzXG4gIC8vICAgICAgbm90ZSAxOiBvd24gcHJvcGVydGllcyBpbiBvcmRlciwgaWYgb25lIGF0dGVtcHRzIHRvIGFkZCBiYWNrIHByb3BlcnRpZXNcbiAgLy8gICAgICBub3RlIDE6IGluIElFLCB0aGV5IG1heSBlbmQgdXAgaW4gdGhlaXIgZm9ybWVyIHBvc2l0aW9uIGR1ZSB0byB0aGVpciBwb3NpdGlvblxuICAvLyAgICAgIG5vdGUgMTogYmVpbmcgcmV0YWluZWQuIFNvIHVzZSBvZiB0aGlzIGZ1bmN0aW9uIHdpdGggXCJhc3NvY2lhdGl2ZSBhcnJheXNcIlxuICAvLyAgICAgIG5vdGUgMTogKG9iamVjdHMpIG1heSBsZWFkIHRvIHVuZXhwZWN0ZWQgYmVoYXZpb3IgaW4gYW4gSUUgZW52aXJvbm1lbnQgaWZcbiAgLy8gICAgICBub3RlIDE6IHlvdSBhZGQgYmFjayBwcm9wZXJ0aWVzIHdpdGggdGhlIHNhbWUga2V5cyB0aGF0IHlvdSByZW1vdmVkXG4gIC8vICAgZXhhbXBsZSAxOiBhcnJheV9wb3AoWzAsMSwyXSlcbiAgLy8gICByZXR1cm5zIDE6IDJcbiAgLy8gICBleGFtcGxlIDI6IHZhciAkZGF0YSA9IHtmaXJzdE5hbWU6ICdLZXZpbicsIHN1ck5hbWU6ICd2YW4gWm9ubmV2ZWxkJ31cbiAgLy8gICBleGFtcGxlIDI6IHZhciAkbGFzdEVsZW0gPSBhcnJheV9wb3AoJGRhdGEpXG4gIC8vICAgZXhhbXBsZSAyOiB2YXIgJHJlc3VsdCA9ICRkYXRhXG4gIC8vICAgcmV0dXJucyAyOiB7Zmlyc3ROYW1lOiAnS2V2aW4nfVxuXG4gIHZhciBrZXkgPSAnJztcbiAgdmFyIGxhc3RLZXkgPSAnJztcblxuICBpZiAoaW5wdXRBcnIuaGFzT3duUHJvcGVydHkoJ2xlbmd0aCcpKSB7XG4gICAgLy8gSW5kZXhlZFxuICAgIGlmICghaW5wdXRBcnIubGVuZ3RoKSB7XG4gICAgICAvLyBEb25lIHBvcHBpbmcsIGFyZSB3ZT9cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXRBcnIucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQXNzb2NpYXRpdmVcbiAgICBmb3IgKGtleSBpbiBpbnB1dEFycikge1xuICAgICAgaWYgKGlucHV0QXJyLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgbGFzdEtleSA9IGtleTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxhc3RLZXkpIHtcbiAgICAgIHZhciB0bXAgPSBpbnB1dEFycltsYXN0S2V5XTtcbiAgICAgIGRlbGV0ZSBpbnB1dEFycltsYXN0S2V5XTtcbiAgICAgIHJldHVybiB0bXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X3BvcC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfcHJvZHVjdChpbnB1dCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X3Byb2R1Y3QvXG4gIC8vIG9yaWdpbmFsIGJ5OiBXYWxkbyBNYWxxdWkgU2lsdmEgKGh0dHA6Ly93YWxkby5tYWxxdWkuaW5mbylcbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X3Byb2R1Y3QoWyAyLCA0LCA2LCA4IF0pXG4gIC8vICAgcmV0dXJucyAxOiAzODRcblxuICB2YXIgaWR4ID0gMDtcbiAgdmFyIHByb2R1Y3QgPSAxO1xuICB2YXIgaWwgPSAwO1xuXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpICE9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpbCA9IGlucHV0Lmxlbmd0aDtcbiAgd2hpbGUgKGlkeCA8IGlsKSB7XG4gICAgcHJvZHVjdCAqPSAhaXNOYU4oaW5wdXRbaWR4XSkgPyBpbnB1dFtpZHhdIDogMDtcbiAgICBpZHgrKztcbiAgfVxuXG4gIHJldHVybiBwcm9kdWN0O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X3Byb2R1Y3QuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X3B1c2goaW5wdXRBcnIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9wdXNoL1xuICAvLyBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gaW1wcm92ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgICAgbm90ZSAxOiBOb3RlIGFsc28gdGhhdCBJRSByZXRhaW5zIGluZm9ybWF0aW9uIGFib3V0IHByb3BlcnR5IHBvc2l0aW9uIGV2ZW5cbiAgLy8gICAgICBub3RlIDE6IGFmdGVyIGJlaW5nIHN1cHBvc2VkbHkgZGVsZXRlZCwgc28gaWYgeW91IGRlbGV0ZSBwcm9wZXJ0aWVzIGFuZCB0aGVuXG4gIC8vICAgICAgbm90ZSAxOiBhZGQgYmFjayBwcm9wZXJ0aWVzIHdpdGggdGhlIHNhbWUga2V5cyAoaW5jbHVkaW5nIG51bWVyaWMpIHRoYXQgaGFkXG4gIC8vICAgICAgbm90ZSAxOiBiZWVuIGRlbGV0ZWQsIHRoZSBvcmRlciB3aWxsIGJlIGFzIGJlZm9yZTsgdGh1cywgdGhpcyBmdW5jdGlvbiBpcyBub3RcbiAgLy8gICAgICBub3RlIDE6IHJlYWxseSByZWNvbW1lbmRlZCB3aXRoIGFzc29jaWF0aXZlIGFycmF5cyAob2JqZWN0cykgaW4gSUUgZW52aXJvbm1lbnRzXG4gIC8vICAgZXhhbXBsZSAxOiBhcnJheV9wdXNoKFsna2V2aW4nLCd2YW4nXSwgJ3pvbm5ldmVsZCcpXG4gIC8vICAgcmV0dXJucyAxOiAzXG5cbiAgdmFyIGkgPSAwO1xuICB2YXIgcHIgPSAnJztcbiAgdmFyIGFyZ3YgPSBhcmd1bWVudHM7XG4gIHZhciBhcmdjID0gYXJndi5sZW5ndGg7XG4gIHZhciBhbGxEaWdpdHMgPSAvXlxcZCQvO1xuICB2YXIgc2l6ZSA9IDA7XG4gIHZhciBoaWdoZXN0SWR4ID0gMDtcbiAgdmFyIGxlbiA9IDA7XG5cbiAgaWYgKGlucHV0QXJyLmhhc093blByb3BlcnR5KCdsZW5ndGgnKSkge1xuICAgIGZvciAoaSA9IDE7IGkgPCBhcmdjOyBpKyspIHtcbiAgICAgIGlucHV0QXJyW2lucHV0QXJyLmxlbmd0aF0gPSBhcmd2W2ldO1xuICAgIH1cbiAgICByZXR1cm4gaW5wdXRBcnIubGVuZ3RoO1xuICB9XG5cbiAgLy8gQXNzb2NpYXRpdmUgKG9iamVjdClcbiAgZm9yIChwciBpbiBpbnB1dEFycikge1xuICAgIGlmIChpbnB1dEFyci5oYXNPd25Qcm9wZXJ0eShwcikpIHtcbiAgICAgICsrbGVuO1xuICAgICAgaWYgKHByLnNlYXJjaChhbGxEaWdpdHMpICE9PSAtMSkge1xuICAgICAgICBzaXplID0gcGFyc2VJbnQocHIsIDEwKTtcbiAgICAgICAgaGlnaGVzdElkeCA9IHNpemUgPiBoaWdoZXN0SWR4ID8gc2l6ZSA6IGhpZ2hlc3RJZHg7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvciAoaSA9IDE7IGkgPCBhcmdjOyBpKyspIHtcbiAgICBpbnB1dEFyclsrK2hpZ2hlc3RJZHhdID0gYXJndltpXTtcbiAgfVxuXG4gIHJldHVybiBsZW4gKyBpIC0gMTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV9wdXNoLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheV9yYW5kKGFycmF5LCBudW0pIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gICAgICAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X3JhbmQvXG4gIC8vICAgICAgb3JpZ2luYWwgYnk6IFdhbGRvIE1hbHF1aSBTaWx2YSAoaHR0cDovL3dhbGRvLm1hbHF1aS5pbmZvKVxuICAvLyByZWltcGxlbWVudGVkIGJ5OiBSYWZhxYIgS3VrYXdza2lcbiAgLy8gICAgICAgIGV4YW1wbGUgMTogYXJyYXlfcmFuZCggWydLZXZpbiddLCAxIClcbiAgLy8gICAgICAgIHJldHVybnMgMTogJzAnXG5cbiAgLy8gQnkgdXNpbmcgT2JqZWN0LmtleXMgd2Ugc3VwcG9ydCBib3RoLCBhcnJheXMgYW5kIG9iamVjdHNcbiAgLy8gd2hpY2ggcGhwanMgd2FudHMgdG8gc3VwcG9ydFxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFycmF5KTtcblxuICBpZiAodHlwZW9mIG51bSA9PT0gJ3VuZGVmaW5lZCcgfHwgbnVtID09PSBudWxsKSB7XG4gICAgbnVtID0gMTtcbiAgfSBlbHNlIHtcbiAgICBudW0gPSArbnVtO1xuICB9XG5cbiAgaWYgKGlzTmFOKG51bSkgfHwgbnVtIDwgMSB8fCBudW0gPiBrZXlzLmxlbmd0aCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gc2h1ZmZsZSB0aGUgYXJyYXkgb2Yga2V5c1xuICBmb3IgKHZhciBpID0ga2V5cy5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgdmFyIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTsgLy8gMCDiiaQgaiDiiaQgaVxuXG4gICAgdmFyIHRtcCA9IGtleXNbal07XG4gICAga2V5c1tqXSA9IGtleXNbaV07XG4gICAga2V5c1tpXSA9IHRtcDtcbiAgfVxuXG4gIHJldHVybiBudW0gPT09IDEgPyBrZXlzWzBdIDoga2V5cy5zbGljZSgwLCBudW0pO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X3JhbmQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfcmVkdWNlKGFJbnB1dCwgY2FsbGJhY2spIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9yZWR1Y2UvXG4gIC8vIG9yaWdpbmFsIGJ5OiBBbGZvbnNvIEppbWVuZXogKGh0dHA6Ly93d3cuYWxmb25zb2ppbWVuZXouY29tKVxuICAvLyAgICAgIG5vdGUgMTogVGFrZXMgYSBmdW5jdGlvbiBhcyBhbiBhcmd1bWVudCwgbm90IGEgZnVuY3Rpb24ncyBuYW1lXG4gIC8vICAgZXhhbXBsZSAxOiBhcnJheV9yZWR1Y2UoWzEsIDIsIDMsIDQsIDVdLCBmdW5jdGlvbiAodiwgdyl7diArPSB3O3JldHVybiB2O30pXG4gIC8vICAgcmV0dXJucyAxOiAxNVxuXG4gIHZhciBsb24gPSBhSW5wdXQubGVuZ3RoO1xuICB2YXIgcmVzID0gMDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgdG1wID0gW107XG5cbiAgZm9yIChpID0gMDsgaSA8IGxvbjsgaSArPSAyKSB7XG4gICAgdG1wWzBdID0gYUlucHV0W2ldO1xuICAgIGlmIChhSW5wdXRbaSArIDFdKSB7XG4gICAgICB0bXBbMV0gPSBhSW5wdXRbaSArIDFdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0bXBbMV0gPSAwO1xuICAgIH1cbiAgICByZXMgKz0gY2FsbGJhY2suYXBwbHkobnVsbCwgdG1wKTtcbiAgICB0bXAgPSBbXTtcbiAgfVxuXG4gIHJldHVybiByZXM7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlfcmVkdWNlLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheV9yZXBsYWNlKGFycikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X3JlcGxhY2UvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfcmVwbGFjZShbXCJvcmFuZ2VcIiwgXCJiYW5hbmFcIiwgXCJhcHBsZVwiLCBcInJhc3BiZXJyeVwiXSwgezAgOiBcInBpbmVhcHBsZVwiLCA0IDogXCJjaGVycnlcIn0sIHswOlwiZ3JhcGVcIn0pXG4gIC8vICAgcmV0dXJucyAxOiB7MDogJ2dyYXBlJywgMTogJ2JhbmFuYScsIDI6ICdhcHBsZScsIDM6ICdyYXNwYmVycnknLCA0OiAnY2hlcnJ5J31cblxuICB2YXIgcmV0T2JqID0ge307XG4gIHZhciBpID0gMDtcbiAgdmFyIHAgPSAnJztcbiAgdmFyIGFyZ2wgPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gIGlmIChhcmdsIDwgMikge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlcmUgc2hvdWxkIGJlIGF0IGxlYXN0IDIgYXJndW1lbnRzIHBhc3NlZCB0byBhcnJheV9yZXBsYWNlKCknKTtcbiAgfVxuXG4gIC8vIEFsdGhvdWdoIGRvY3Mgc3RhdGUgdGhhdCB0aGUgYXJndW1lbnRzIGFyZSBwYXNzZWQgaW4gYnkgcmVmZXJlbmNlLFxuICAvLyBpdCBzZWVtcyB0aGV5IGFyZSBub3QgYWx0ZXJlZCwgYnV0IHJhdGhlciB0aGUgY29weSB0aGF0IGlzIHJldHVybmVkXG4gIC8vIChqdXN0IGd1ZXNzaW5nKSwgc28gd2UgbWFrZSBhIGNvcHkgaGVyZSwgaW5zdGVhZCBvZiBhY3Rpbmcgb24gYXJyIGl0c2VsZlxuICBmb3IgKHAgaW4gYXJyKSB7XG4gICAgcmV0T2JqW3BdID0gYXJyW3BdO1xuICB9XG5cbiAgZm9yIChpID0gMTsgaSA8IGFyZ2w7IGkrKykge1xuICAgIGZvciAocCBpbiBhcmd1bWVudHNbaV0pIHtcbiAgICAgIHJldE9ialtwXSA9IGFyZ3VtZW50c1tpXVtwXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0T2JqO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X3JlcGxhY2UuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfcmVwbGFjZV9yZWN1cnNpdmUoYXJyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvYXJyYXlfcmVwbGFjZV9yZWN1cnNpdmUvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfcmVwbGFjZV9yZWN1cnNpdmUoeydjaXRydXMnIDogWydvcmFuZ2UnXSwgJ2JlcnJpZXMnIDogWydibGFja2JlcnJ5JywgJ3Jhc3BiZXJyeSddfSwgeydjaXRydXMnIDogWydwaW5lYXBwbGUnXSwgJ2JlcnJpZXMnIDogWydibHVlYmVycnknXX0pXG4gIC8vICAgcmV0dXJucyAxOiB7Y2l0cnVzIDogWydwaW5lYXBwbGUnXSwgYmVycmllcyA6IFsnYmx1ZWJlcnJ5JywgJ3Jhc3BiZXJyeSddfVxuXG4gIHZhciBpID0gMDtcbiAgdmFyIHAgPSAnJztcbiAgdmFyIGFyZ2wgPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgcmV0T2JqO1xuXG4gIGlmIChhcmdsIDwgMikge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhlcmUgc2hvdWxkIGJlIGF0IGxlYXN0IDIgYXJndW1lbnRzIHBhc3NlZCB0byBhcnJheV9yZXBsYWNlX3JlY3Vyc2l2ZSgpJyk7XG4gIH1cblxuICAvLyBBbHRob3VnaCBkb2NzIHN0YXRlIHRoYXQgdGhlIGFyZ3VtZW50cyBhcmUgcGFzc2VkIGluIGJ5IHJlZmVyZW5jZSxcbiAgLy8gaXQgc2VlbXMgdGhleSBhcmUgbm90IGFsdGVyZWQsIGJ1dCByYXRoZXIgdGhlIGNvcHkgdGhhdCBpcyByZXR1cm5lZFxuICAvLyBTbyB3ZSBtYWtlIGEgY29weSBoZXJlLCBpbnN0ZWFkIG9mIGFjdGluZyBvbiBhcnIgaXRzZWxmXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgIHJldE9iaiA9IFtdO1xuICAgIGZvciAocCBpbiBhcnIpIHtcbiAgICAgIHJldE9iai5wdXNoKGFycltwXSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldE9iaiA9IHt9O1xuICAgIGZvciAocCBpbiBhcnIpIHtcbiAgICAgIHJldE9ialtwXSA9IGFycltwXTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAxOyBpIDwgYXJnbDsgaSsrKSB7XG4gICAgZm9yIChwIGluIGFyZ3VtZW50c1tpXSkge1xuICAgICAgaWYgKHJldE9ialtwXSAmJiBfdHlwZW9mKHJldE9ialtwXSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldE9ialtwXSA9IGFycmF5X3JlcGxhY2VfcmVjdXJzaXZlKHJldE9ialtwXSwgYXJndW1lbnRzW2ldW3BdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldE9ialtwXSA9IGFyZ3VtZW50c1tpXVtwXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0T2JqO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X3JlcGxhY2VfcmVjdXJzaXZlLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheV9yZXZlcnNlKGFycmF5LCBwcmVzZXJ2ZUtleXMpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9yZXZlcnNlL1xuICAvLyBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gaW1wcm92ZWQgYnk6IEthcm9sIEtvd2Fsc2tpXG4gIC8vICAgZXhhbXBsZSAxOiBhcnJheV9yZXZlcnNlKCBbICdwaHAnLCAnNC4wJywgWydncmVlbicsICdyZWQnXSBdLCB0cnVlKVxuICAvLyAgIHJldHVybnMgMTogeyAyOiBbJ2dyZWVuJywgJ3JlZCddLCAxOiAnNC4wJywgMDogJ3BocCd9XG5cbiAgdmFyIGlzQXJyYXkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyYXkpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB2YXIgdG1wQXJyID0gcHJlc2VydmVLZXlzID8ge30gOiBbXTtcbiAgdmFyIGtleTtcblxuICBpZiAoaXNBcnJheSAmJiAhcHJlc2VydmVLZXlzKSB7XG4gICAgcmV0dXJuIGFycmF5LnNsaWNlKDApLnJldmVyc2UoKTtcbiAgfVxuXG4gIGlmIChwcmVzZXJ2ZUtleXMpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAoa2V5IGluIGFycmF5KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAvLyBAdG9kbzogZG9uJ3QgcmVseSBvbiBicm93c2VycyBrZWVwaW5nIGtleXMgaW4gaW5zZXJ0aW9uIG9yZGVyXG4gICAgICAvLyBpdCdzIGltcGxlbWVudGF0aW9uIHNwZWNpZmljXG4gICAgICAvLyBlZy4gdGhlIHJlc3VsdCB3aWxsIGRpZmZlciBmcm9tIGV4cGVjdGVkIGluIEdvb2dsZSBDaHJvbWVcbiAgICAgIHRtcEFycltrZXldID0gYXJyYXlba2V5XTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChrZXkgaW4gYXJyYXkpIHtcbiAgICAgIHRtcEFyci51bnNoaWZ0KGFycmF5W2tleV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0bXBBcnI7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlfcmV2ZXJzZS5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheV9zZWFyY2gobmVlZGxlLCBoYXlzdGFjaywgYXJnU3RyaWN0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvYXJyYXlfc2VhcmNoL1xuICAvLyBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gICAgaW5wdXQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyBidWdmaXhlZCBieTogUmV5bmllciBkZSBsYSBSb3NhIChodHRwOi8vc2NyaXB0aW5zaWRlLmJsb2dzcG90LmNvbS5lcy8pXG4gIC8vICAgICAgICB0ZXN0OiBza2lwLWFsbFxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfc2VhcmNoKCd6b25uZXZlbGQnLCB7Zmlyc3RuYW1lOiAna2V2aW4nLCBtaWRkbGU6ICd2YW4nLCBzdXJuYW1lOiAnem9ubmV2ZWxkJ30pXG4gIC8vICAgcmV0dXJucyAxOiAnc3VybmFtZSdcbiAgLy8gICBleGFtcGxlIDI6IGFycmF5X3NlYXJjaCgnMycsIHthOiAzLCBiOiA1LCBjOiA3fSlcbiAgLy8gICByZXR1cm5zIDI6ICdhJ1xuXG4gIHZhciBzdHJpY3QgPSAhIWFyZ1N0cmljdDtcbiAgdmFyIGtleSA9ICcnO1xuXG4gIGlmICgodHlwZW9mIG5lZWRsZSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YobmVlZGxlKSkgPT09ICdvYmplY3QnICYmIG5lZWRsZS5leGVjKSB7XG4gICAgLy8gRHVjay10eXBlIGZvciBSZWdFeHBcbiAgICBpZiAoIXN0cmljdCkge1xuICAgICAgLy8gTGV0J3MgY29uc2lkZXIgY2FzZSBzZW5zaXRpdmUgc2VhcmNoZXMgYXMgc3RyaWN0XG4gICAgICB2YXIgZmxhZ3MgPSAnaScgKyAobmVlZGxlLmdsb2JhbCA/ICdnJyA6ICcnKSArIChuZWVkbGUubXVsdGlsaW5lID8gJ20nIDogJycpICsgKFxuICAgICAgLy8gc3RpY2t5IGlzIEZGIG9ubHlcbiAgICAgIG5lZWRsZS5zdGlja3kgPyAneScgOiAnJyk7XG4gICAgICBuZWVkbGUgPSBuZXcgUmVnRXhwKG5lZWRsZS5zb3VyY2UsIGZsYWdzKTtcbiAgICB9XG4gICAgZm9yIChrZXkgaW4gaGF5c3RhY2spIHtcbiAgICAgIGlmIChoYXlzdGFjay5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGlmIChuZWVkbGUudGVzdChoYXlzdGFja1trZXldKSkge1xuICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZm9yIChrZXkgaW4gaGF5c3RhY2spIHtcbiAgICBpZiAoaGF5c3RhY2suaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKHN0cmljdCAmJiBoYXlzdGFja1trZXldID09PSBuZWVkbGUgfHwgIXN0cmljdCAmJiBoYXlzdGFja1trZXldID09IG5lZWRsZSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV9zZWFyY2guanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfc2hpZnQoaW5wdXRBcnIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV9zaGlmdC9cbiAgLy8gb3JpZ2luYWwgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rdnouaW8pXG4gIC8vIGltcHJvdmVkIGJ5OiBNYXJ0aWpuIFdpZXJpbmdhXG4gIC8vICAgICAgbm90ZSAxOiBDdXJyZW50bHkgZG9lcyBub3QgaGFuZGxlIG9iamVjdHNcbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X3NoaWZ0KFsnS2V2aW4nLCAndmFuJywgJ1pvbm5ldmVsZCddKVxuICAvLyAgIHJldHVybnMgMTogJ0tldmluJ1xuXG4gIHZhciBfY2hlY2tUb1VwSW5kaWNlcyA9IGZ1bmN0aW9uIF9jaGVja1RvVXBJbmRpY2VzKGFyciwgY3QsIGtleSkge1xuICAgIC8vIERlYWwgd2l0aCBzaXR1YXRpb24sIGUuZy4sIGlmIGVuY291bnRlciBpbmRleCA0IGFuZCB0cnlcbiAgICAvLyB0byBzZXQgaXQgdG8gMCwgYnV0IDAgZXhpc3RzIGxhdGVyIGluIGxvb3AgKG5lZWQgdG9cbiAgICAvLyBpbmNyZW1lbnQgYWxsIHN1YnNlcXVlbnQgKHNraXBwaW5nIGN1cnJlbnQga2V5LCBzaW5jZVxuICAgIC8vIHdlIG5lZWQgaXRzIHZhbHVlIGJlbG93KSB1bnRpbCBmaW5kIHVudXNlZClcbiAgICBpZiAoYXJyW2N0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgdG1wID0gY3Q7XG4gICAgICBjdCArPSAxO1xuICAgICAgaWYgKGN0ID09PSBrZXkpIHtcbiAgICAgICAgY3QgKz0gMTtcbiAgICAgIH1cbiAgICAgIGN0ID0gX2NoZWNrVG9VcEluZGljZXMoYXJyLCBjdCwga2V5KTtcbiAgICAgIGFycltjdF0gPSBhcnJbdG1wXTtcbiAgICAgIGRlbGV0ZSBhcnJbdG1wXTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3Q7XG4gIH07XG5cbiAgaWYgKGlucHV0QXJyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChpbnB1dEFyci5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGlucHV0QXJyLnNoaWZ0KCk7XG4gIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV9zaGlmdC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfc2xpY2UoYXJyLCBvZmZzdCwgbGd0aCwgcHJlc2VydmVLZXlzKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvYXJyYXlfc2xpY2UvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICBpbnB1dCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rdnouaW8pXG4gIC8vICAgICAgbm90ZSAxOiBSZWxpZXMgb24gaXNfaW50IGJlY2F1c2UgIWlzTmFOIGFjY2VwdHMgZmxvYXRzXG4gIC8vICAgZXhhbXBsZSAxOiBhcnJheV9zbGljZShbXCJhXCIsIFwiYlwiLCBcImNcIiwgXCJkXCIsIFwiZVwiXSwgMiwgLTEpXG4gIC8vICAgcmV0dXJucyAxOiBbICdjJywgJ2QnIF1cbiAgLy8gICBleGFtcGxlIDI6IGFycmF5X3NsaWNlKFtcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCJdLCAyLCAtMSwgdHJ1ZSlcbiAgLy8gICByZXR1cm5zIDI6IHsyOiAnYycsIDM6ICdkJ31cblxuICB2YXIgaXNJbnQgPSByZXF1aXJlKCcuLi92YXIvaXNfaW50Jyk7XG5cbiAgLypcbiAgICBpZiAoJ2NhbGxlZScgaW4gYXJyICYmICdsZW5ndGgnIGluIGFycikge1xuICAgICAgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKTtcbiAgICB9XG4gICovXG5cbiAgdmFyIGtleSA9ICcnO1xuXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSAhPT0gJ1tvYmplY3QgQXJyYXldJyB8fCBwcmVzZXJ2ZUtleXMgJiYgb2Zmc3QgIT09IDApIHtcbiAgICAvLyBBc3NvYy4gYXJyYXkgYXMgaW5wdXQgb3IgaWYgcmVxdWlyZWQgYXMgb3V0cHV0XG4gICAgdmFyIGxndCA9IDA7XG4gICAgdmFyIG5ld0Fzc29jID0ge307XG4gICAgZm9yIChrZXkgaW4gYXJyKSB7XG4gICAgICBsZ3QgKz0gMTtcbiAgICAgIG5ld0Fzc29jW2tleV0gPSBhcnJba2V5XTtcbiAgICB9XG4gICAgYXJyID0gbmV3QXNzb2M7XG5cbiAgICBvZmZzdCA9IG9mZnN0IDwgMCA/IGxndCArIG9mZnN0IDogb2Zmc3Q7XG4gICAgbGd0aCA9IGxndGggPT09IHVuZGVmaW5lZCA/IGxndCA6IGxndGggPCAwID8gbGd0ICsgbGd0aCAtIG9mZnN0IDogbGd0aDtcblxuICAgIHZhciBhc3NvYyA9IHt9O1xuICAgIHZhciBzdGFydCA9IGZhbHNlO1xuICAgIHZhciBpdCA9IC0xO1xuICAgIHZhciBhcnJsZ3RoID0gMDtcbiAgICB2YXIgbm9Qa0lkeCA9IDA7XG5cbiAgICBmb3IgKGtleSBpbiBhcnIpIHtcbiAgICAgICsraXQ7XG4gICAgICBpZiAoYXJybGd0aCA+PSBsZ3RoKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGl0ID09PSBvZmZzdCkge1xuICAgICAgICBzdGFydCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoIXN0YXJ0KSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSsrYXJybGd0aDtcbiAgICAgIGlmIChpc0ludChrZXkpICYmICFwcmVzZXJ2ZUtleXMpIHtcbiAgICAgICAgYXNzb2Nbbm9Qa0lkeCsrXSA9IGFycltrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXNzb2Nba2V5XSA9IGFycltrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBNYWtlIGFzIGFycmF5LWxpa2Ugb2JqZWN0ICh0aG91Z2ggbGVuZ3RoIHdpbGwgbm90IGJlIGR5bmFtaWMpXG4gICAgLy8gYXNzb2MubGVuZ3RoID0gYXJybGd0aDtcbiAgICByZXR1cm4gYXNzb2M7XG4gIH1cblxuICBpZiAobGd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGFyci5zbGljZShvZmZzdCk7XG4gIH0gZWxzZSBpZiAobGd0aCA+PSAwKSB7XG4gICAgcmV0dXJuIGFyci5zbGljZShvZmZzdCwgb2Zmc3QgKyBsZ3RoKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYXJyLnNsaWNlKG9mZnN0LCBsZ3RoKTtcbiAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X3NsaWNlLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X3NwbGljZShhcnIsIG9mZnN0LCBsZ3RoLCByZXBsYWNlbWVudCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X3NwbGljZS9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgIGlucHV0IGJ5OiBUaGVyaWF1bHQgKGh0dHBzOi8vZ2l0aHViLmNvbS9UaGVyaWF1bHQpXG4gIC8vICAgICAgbm90ZSAxOiBPcmRlciBkb2VzIGdldCBzaGlmdGVkIGluIGFzc29jaWF0aXZlIGFycmF5IGlucHV0IHdpdGggbnVtZXJpYyBpbmRpY2VzLFxuICAvLyAgICAgIG5vdGUgMTogc2luY2UgUEhQIGJlaGF2aW9yIGRvZXNuJ3QgcHJlc2VydmUga2V5cywgYnV0IEkgdW5kZXJzdGFuZCBvcmRlciBpc1xuICAvLyAgICAgIG5vdGUgMTogbm90IHJlbGlhYmxlIGFueXdheXNcbiAgLy8gICAgICBub3RlIDE6IE5vdGUgYWxzbyB0aGF0IElFIHJldGFpbnMgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydHkgcG9zaXRpb24gZXZlblxuICAvLyAgICAgIG5vdGUgMTogYWZ0ZXIgYmVpbmcgc3VwcG9zZWRseSBkZWxldGVkLCBzbyB1c2Ugb2YgdGhpcyBmdW5jdGlvbiBtYXkgcHJvZHVjZVxuICAvLyAgICAgIG5vdGUgMTogdW5leHBlY3RlZCByZXN1bHRzIGluIElFIGlmIHlvdSBsYXRlciBhdHRlbXB0IHRvIGFkZCBiYWNrIHByb3BlcnRpZXNcbiAgLy8gICAgICBub3RlIDE6IHdpdGggdGhlIHNhbWUga2V5cyB0aGF0IGhhZCBiZWVuIGRlbGV0ZWRcbiAgLy8gICBleGFtcGxlIDE6IHZhciAkaW5wdXQgPSB7NDogXCJyZWRcIiwgJ2FiYyc6IFwiZ3JlZW5cIiwgMjogXCJibHVlXCIsICdkdWQnOiBcInllbGxvd1wifVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfc3BsaWNlKCRpbnB1dCwgMilcbiAgLy8gICByZXR1cm5zIDE6IHs0OiBcInJlZFwiLCAnYWJjJzogXCJncmVlblwifVxuICAvLyAgIGV4YW1wbGUgMjogdmFyICRpbnB1dCA9IFtcInJlZFwiLCBcImdyZWVuXCIsIFwiYmx1ZVwiLCBcInllbGxvd1wiXVxuICAvLyAgIGV4YW1wbGUgMjogYXJyYXlfc3BsaWNlKCRpbnB1dCwgMywgMCwgXCJwdXJwbGVcIilcbiAgLy8gICByZXR1cm5zIDI6IFtdXG4gIC8vICAgZXhhbXBsZSAzOiB2YXIgJGlucHV0ID0gW1wicmVkXCIsIFwiZ3JlZW5cIiwgXCJibHVlXCIsIFwieWVsbG93XCJdXG4gIC8vICAgZXhhbXBsZSAzOiBhcnJheV9zcGxpY2UoJGlucHV0LCAtMSwgMSwgW1wiYmxhY2tcIiwgXCJtYXJvb25cIl0pXG4gIC8vICAgcmV0dXJucyAzOiBbXCJ5ZWxsb3dcIl1cbiAgLy8gICAgICAgIHRlc3Q6IHNraXAtMVxuXG4gIHZhciBpc0ludCA9IHJlcXVpcmUoJy4uL3Zhci9pc19pbnQnKTtcblxuICB2YXIgX2NoZWNrVG9VcEluZGljZXMgPSBmdW5jdGlvbiBfY2hlY2tUb1VwSW5kaWNlcyhhcnIsIGN0LCBrZXkpIHtcbiAgICAvLyBEZWFsIHdpdGggc2l0dWF0aW9uLCBlLmcuLCBpZiBlbmNvdW50ZXIgaW5kZXggNCBhbmQgdHJ5XG4gICAgLy8gdG8gc2V0IGl0IHRvIDAsIGJ1dCAwIGV4aXN0cyBsYXRlciBpbiBsb29wIChuZWVkIHRvXG4gICAgLy8gaW5jcmVtZW50IGFsbCBzdWJzZXF1ZW50IChza2lwcGluZyBjdXJyZW50IGtleSxcbiAgICAvLyBzaW5jZSB3ZSBuZWVkIGl0cyB2YWx1ZSBiZWxvdykgdW50aWwgZmluZCB1bnVzZWQpXG4gICAgaWYgKGFycltjdF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHRtcCA9IGN0O1xuICAgICAgY3QgKz0gMTtcbiAgICAgIGlmIChjdCA9PT0ga2V5KSB7XG4gICAgICAgIGN0ICs9IDE7XG4gICAgICB9XG4gICAgICBjdCA9IF9jaGVja1RvVXBJbmRpY2VzKGFyciwgY3QsIGtleSk7XG4gICAgICBhcnJbY3RdID0gYXJyW3RtcF07XG4gICAgICBkZWxldGUgYXJyW3RtcF07XG4gICAgfVxuICAgIHJldHVybiBjdDtcbiAgfTtcblxuICBpZiAocmVwbGFjZW1lbnQgJiYgKHR5cGVvZiByZXBsYWNlbWVudCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YocmVwbGFjZW1lbnQpKSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXBsYWNlbWVudCA9IFtyZXBsYWNlbWVudF07XG4gIH1cbiAgaWYgKGxndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxndGggPSBvZmZzdCA+PSAwID8gYXJyLmxlbmd0aCAtIG9mZnN0IDogLW9mZnN0O1xuICB9IGVsc2UgaWYgKGxndGggPCAwKSB7XG4gICAgbGd0aCA9IChvZmZzdCA+PSAwID8gYXJyLmxlbmd0aCAtIG9mZnN0IDogLW9mZnN0KSArIGxndGg7XG4gIH1cblxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAvKiBpZiAoYXJyLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgIC8vIERlYWwgd2l0aCBhcnJheS1saWtlIG9iamVjdHMgYXMgaW5wdXRcbiAgICBkZWxldGUgYXJyLmxlbmd0aDtcbiAgICB9ICovXG4gICAgdmFyIGxndCA9IDA7XG4gICAgdmFyIGN0ID0gLTE7XG4gICAgdmFyIHJtdmQgPSBbXTtcbiAgICB2YXIgcm12ZE9iaiA9IHt9O1xuICAgIHZhciByZXBsQ3QgPSAtMTtcbiAgICB2YXIgaW50Q3QgPSAtMTtcbiAgICB2YXIgcmV0dXJuQXJyID0gdHJ1ZTtcbiAgICB2YXIgcm12ZEN0ID0gMDtcbiAgICAvLyB2YXIgcm12ZExuZ3RoID0gMFxuICAgIHZhciBrZXkgPSAnJztcbiAgICAvLyBybXZkT2JqLmxlbmd0aCA9IDA7XG4gICAgZm9yIChrZXkgaW4gYXJyKSB7XG4gICAgICAvLyBDYW4gZG8gYXJyLl9fY291bnRfXyBpbiBzb21lIGJyb3dzZXJzXG4gICAgICBsZ3QgKz0gMTtcbiAgICB9XG4gICAgb2Zmc3QgPSBvZmZzdCA+PSAwID8gb2Zmc3QgOiBsZ3QgKyBvZmZzdDtcbiAgICBmb3IgKGtleSBpbiBhcnIpIHtcbiAgICAgIGN0ICs9IDE7XG4gICAgICBpZiAoY3QgPCBvZmZzdCkge1xuICAgICAgICBpZiAoaXNJbnQoa2V5KSkge1xuICAgICAgICAgIGludEN0ICs9IDE7XG4gICAgICAgICAgaWYgKHBhcnNlSW50KGtleSwgMTApID09PSBpbnRDdCkge1xuICAgICAgICAgICAgLy8gS2V5IGlzIGFscmVhZHkgbnVtYmVyZWQgb2ssIHNvIGRvbid0IG5lZWQgdG8gY2hhbmdlIGtleSBmb3IgdmFsdWVcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBEZWFsIHdpdGggc2l0dWF0aW9uLCBlLmcuLFxuICAgICAgICAgIF9jaGVja1RvVXBJbmRpY2VzKGFyciwgaW50Q3QsIGtleSk7XG4gICAgICAgICAgLy8gaWYgZW5jb3VudGVyIGluZGV4IDQgYW5kIHRyeSB0byBzZXQgaXQgdG8gMCwgYnV0IDAgZXhpc3RzIGxhdGVyIGluIGxvb3BcbiAgICAgICAgICBhcnJbaW50Q3RdID0gYXJyW2tleV07XG4gICAgICAgICAgZGVsZXRlIGFycltrZXldO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHJldHVybkFyciAmJiBpc0ludChrZXkpKSB7XG4gICAgICAgIHJtdmQucHVzaChhcnJba2V5XSk7XG4gICAgICAgIC8vIFBIUCBzdGFydHMgb3ZlciBoZXJlIHRvb1xuICAgICAgICBybXZkT2JqW3JtdmRDdCsrXSA9IGFycltrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm12ZE9ialtrZXldID0gYXJyW2tleV07XG4gICAgICAgIHJldHVybkFyciA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gcm12ZExuZ3RoICs9IDFcbiAgICAgIC8vIHJtdmRPYmoubGVuZ3RoICs9IDE7XG4gICAgICBpZiAocmVwbGFjZW1lbnQgJiYgcmVwbGFjZW1lbnRbKytyZXBsQ3RdKSB7XG4gICAgICAgIGFycltrZXldID0gcmVwbGFjZW1lbnRbcmVwbEN0XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBhcnJba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gTWFrZSAoYmFjaykgaW50byBhbiBhcnJheS1saWtlIG9iamVjdFxuICAgIC8vIGFyci5sZW5ndGggPSBsZ3QgLSBybXZkTG5ndGggKyAocmVwbGFjZW1lbnQgPyByZXBsYWNlbWVudC5sZW5ndGggOiAwKTtcbiAgICByZXR1cm4gcmV0dXJuQXJyID8gcm12ZCA6IHJtdmRPYmo7XG4gIH1cblxuICBpZiAocmVwbGFjZW1lbnQpIHtcbiAgICByZXBsYWNlbWVudC51bnNoaWZ0KG9mZnN0LCBsZ3RoKTtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseShhcnIsIHJlcGxhY2VtZW50KTtcbiAgfVxuXG4gIHJldHVybiBhcnIuc3BsaWNlKG9mZnN0LCBsZ3RoKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV9zcGxpY2UuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfc3VtKGFycmF5KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvYXJyYXlfc3VtL1xuICAvLyBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gYnVnZml4ZWQgYnk6IE5hdGVcbiAgLy8gYnVnZml4ZWQgYnk6IEdpbGJlcnRcbiAgLy8gaW1wcm92ZWQgYnk6IERhdmlkIFBpbGlhIChodHRwOi8vd3d3LmJldGVjay5pdC8pXG4gIC8vIGltcHJvdmVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfc3VtKFs0LCA5LCAxODIuNl0pXG4gIC8vICAgcmV0dXJucyAxOiAxOTUuNlxuICAvLyAgIGV4YW1wbGUgMjogdmFyICR0b3RhbCA9IFtdXG4gIC8vICAgZXhhbXBsZSAyOiB2YXIgJGluZGV4ID0gMC4xXG4gIC8vICAgZXhhbXBsZSAyOiBmb3IgKHZhciAkeSA9IDA7ICR5IDwgMTI7ICR5KyspeyAkdG90YWxbJHldID0gJHkgKyAkaW5kZXggfVxuICAvLyAgIGV4YW1wbGUgMjogYXJyYXlfc3VtKCR0b3RhbClcbiAgLy8gICByZXR1cm5zIDI6IDY3LjJcblxuICB2YXIga2V5O1xuICB2YXIgc3VtID0gMDtcblxuICAvLyBpbnB1dCBzYW5pdGF0aW9uXG4gIGlmICgodHlwZW9mIGFycmF5ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihhcnJheSkpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZm9yIChrZXkgaW4gYXJyYXkpIHtcbiAgICBpZiAoIWlzTmFOKHBhcnNlRmxvYXQoYXJyYXlba2V5XSkpKSB7XG4gICAgICBzdW0gKz0gcGFyc2VGbG9hdChhcnJheVtrZXldKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VtO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X3N1bS5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfdWRpZmYoYXJyMSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X3VkaWZmL1xuICAvLyBvcmlnaW5hbCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICBleGFtcGxlIDE6IHZhciAkYXJyYXkxID0ge2E6ICdncmVlbicsIGI6ICdicm93bicsIGM6ICdibHVlJywgMDogJ3JlZCd9XG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGFycmF5MiA9IHthOiAnR1JFRU4nLCBCOiAnYnJvd24nLCAwOiAneWVsbG93JywgMTogJ3JlZCd9XG4gIC8vICAgZXhhbXBsZSAxOiBhcnJheV91ZGlmZigkYXJyYXkxLCAkYXJyYXkyLCBmdW5jdGlvbiAoZl9zdHJpbmcxLCBmX3N0cmluZzIpe3ZhciBzdHJpbmcxID0gKGZfc3RyaW5nMSsnJykudG9Mb3dlckNhc2UoKTsgdmFyIHN0cmluZzIgPSAoZl9zdHJpbmcyKycnKS50b0xvd2VyQ2FzZSgpOyBpZiAoc3RyaW5nMSA+IHN0cmluZzIpIHJldHVybiAxOyBpZiAoc3RyaW5nMSA9PT0gc3RyaW5nMikgcmV0dXJuIDA7IHJldHVybiAtMTt9KVxuICAvLyAgIHJldHVybnMgMToge2M6ICdibHVlJ31cblxuICB2YXIgcmV0QXJyID0ge307XG4gIHZhciBhcmdsbTEgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgdmFyIGNiID0gYXJndW1lbnRzW2FyZ2xtMV07XG4gIHZhciBhcnIgPSAnJztcbiAgdmFyIGkgPSAxO1xuICB2YXIgazEgPSAnJztcbiAgdmFyIGsgPSAnJztcblxuICB2YXIgJGdsb2JhbCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsO1xuXG4gIGNiID0gdHlwZW9mIGNiID09PSAnc3RyaW5nJyA/ICRnbG9iYWxbY2JdIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNiKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA/ICRnbG9iYWxbY2JbMF1dW2NiWzFdXSA6IGNiO1xuXG4gIGFycjFrZXlzOiBmb3IgKGsxIGluIGFycjEpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgIGZvciAoaSA9IDE7IGkgPCBhcmdsbTE7IGkrKykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sYWJlbHNcbiAgICAgIGFyciA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAoayBpbiBhcnIpIHtcbiAgICAgICAgaWYgKGNiKGFycltrXSwgYXJyMVtrMV0pID09PSAwKSB7XG4gICAgICAgICAgLy8gSWYgaXQgcmVhY2hlcyBoZXJlLCBpdCB3YXMgZm91bmQgaW4gYXQgbGVhc3Qgb25lIGFycmF5LCBzbyB0cnkgbmV4dCB2YWx1ZVxuICAgICAgICAgIGNvbnRpbnVlIGFycjFrZXlzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXRBcnJbazFdID0gYXJyMVtrMV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldEFycjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV91ZGlmZi5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfdWRpZmZfYXNzb2MoYXJyMSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X3VkaWZmX2Fzc29jL1xuICAvLyBvcmlnaW5hbCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X3VkaWZmX2Fzc29jKHswOiAna2V2aW4nLCAxOiAndmFuJywgMjogJ1pvbm5ldmVsZCd9LCB7MDogJ0tldmluJywgNDogJ3ZhbicsIDU6ICdab25uZXZlbGQnfSwgZnVuY3Rpb24gKGZfc3RyaW5nMSwgZl9zdHJpbmcyKXt2YXIgc3RyaW5nMSA9IChmX3N0cmluZzErJycpLnRvTG93ZXJDYXNlKCk7IHZhciBzdHJpbmcyID0gKGZfc3RyaW5nMisnJykudG9Mb3dlckNhc2UoKTsgaWYgKHN0cmluZzEgPiBzdHJpbmcyKSByZXR1cm4gMTsgaWYgKHN0cmluZzEgPT09IHN0cmluZzIpIHJldHVybiAwOyByZXR1cm4gLTE7fSlcbiAgLy8gICByZXR1cm5zIDE6IHsxOiAndmFuJywgMjogJ1pvbm5ldmVsZCd9XG5cbiAgdmFyIHJldEFyciA9IHt9O1xuICB2YXIgYXJnbG0xID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gIHZhciBjYiA9IGFyZ3VtZW50c1thcmdsbTFdO1xuICB2YXIgYXJyID0ge307XG4gIHZhciBpID0gMTtcbiAgdmFyIGsxID0gJyc7XG4gIHZhciBrID0gJyc7XG5cbiAgdmFyICRnbG9iYWwgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbDtcblxuICBjYiA9IHR5cGVvZiBjYiA9PT0gJ3N0cmluZycgPyAkZ2xvYmFsW2NiXSA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjYikgPT09ICdbb2JqZWN0IEFycmF5XScgPyAkZ2xvYmFsW2NiWzBdXVtjYlsxXV0gOiBjYjtcblxuICBhcnIxa2V5czogZm9yIChrMSBpbiBhcnIxKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sYWJlbHNcbiAgICBmb3IgKGkgPSAxOyBpIDwgYXJnbG0xOyBpKyspIHtcbiAgICAgIGFyciA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAoayBpbiBhcnIpIHtcbiAgICAgICAgaWYgKGNiKGFycltrXSwgYXJyMVtrMV0pID09PSAwICYmIGsgPT09IGsxKSB7XG4gICAgICAgICAgLy8gSWYgaXQgcmVhY2hlcyBoZXJlLCBpdCB3YXMgZm91bmQgaW4gYXQgbGVhc3Qgb25lIGFycmF5LCBzbyB0cnkgbmV4dCB2YWx1ZVxuICAgICAgICAgIGNvbnRpbnVlIGFycjFrZXlzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXRBcnJbazFdID0gYXJyMVtrMV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldEFycjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV91ZGlmZl9hc3NvYy5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfdWRpZmZfdWFzc29jKGFycjEpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV91ZGlmZl91YXNzb2MvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRhcnJheTEgPSB7YTogJ2dyZWVuJywgYjogJ2Jyb3duJywgYzogJ2JsdWUnLCAwOiAncmVkJ31cbiAgLy8gICBleGFtcGxlIDE6IHZhciAkYXJyYXkyID0ge2E6ICdHUkVFTicsIEI6ICdicm93bicsIDA6ICd5ZWxsb3cnLCAxOiAncmVkJ31cbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X3VkaWZmX3Vhc3NvYygkYXJyYXkxLCAkYXJyYXkyLCBmdW5jdGlvbiAoZl9zdHJpbmcxLCBmX3N0cmluZzIpe3ZhciBzdHJpbmcxID0gKGZfc3RyaW5nMSsnJykudG9Mb3dlckNhc2UoKTsgdmFyIHN0cmluZzIgPSAoZl9zdHJpbmcyKycnKS50b0xvd2VyQ2FzZSgpOyBpZiAoc3RyaW5nMSA+IHN0cmluZzIpIHJldHVybiAxOyBpZiAoc3RyaW5nMSA9PT0gc3RyaW5nMikgcmV0dXJuIDA7IHJldHVybiAtMTt9LCBmdW5jdGlvbiAoZl9zdHJpbmcxLCBmX3N0cmluZzIpe3ZhciBzdHJpbmcxID0gKGZfc3RyaW5nMSsnJykudG9Mb3dlckNhc2UoKTsgdmFyIHN0cmluZzIgPSAoZl9zdHJpbmcyKycnKS50b0xvd2VyQ2FzZSgpOyBpZiAoc3RyaW5nMSA+IHN0cmluZzIpIHJldHVybiAxOyBpZiAoc3RyaW5nMSA9PT0gc3RyaW5nMikgcmV0dXJuIDA7IHJldHVybiAtMTt9KVxuICAvLyAgIHJldHVybnMgMTogezA6ICdyZWQnLCBjOiAnYmx1ZSd9XG5cbiAgdmFyIHJldEFyciA9IHt9O1xuICB2YXIgYXJnbG0xID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gIHZhciBhcmdsbTIgPSBhcmdsbTEgLSAxO1xuICB2YXIgY2IgPSBhcmd1bWVudHNbYXJnbG0xXTtcbiAgdmFyIGNiMCA9IGFyZ3VtZW50c1thcmdsbTJdO1xuICB2YXIgazEgPSAnJztcbiAgdmFyIGkgPSAxO1xuICB2YXIgayA9ICcnO1xuICB2YXIgYXJyID0ge307XG5cbiAgdmFyICRnbG9iYWwgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbDtcblxuICBjYiA9IHR5cGVvZiBjYiA9PT0gJ3N0cmluZycgPyAkZ2xvYmFsW2NiXSA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjYikgPT09ICdbb2JqZWN0IEFycmF5XScgPyAkZ2xvYmFsW2NiWzBdXVtjYlsxXV0gOiBjYjtcblxuICBjYjAgPSB0eXBlb2YgY2IwID09PSAnc3RyaW5nJyA/ICRnbG9iYWxbY2IwXSA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjYjApID09PSAnW29iamVjdCBBcnJheV0nID8gJGdsb2JhbFtjYjBbMF1dW2NiMFsxXV0gOiBjYjA7XG5cbiAgYXJyMWtleXM6IGZvciAoazEgaW4gYXJyMSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgZm9yIChpID0gMTsgaSA8IGFyZ2xtMjsgaSsrKSB7XG4gICAgICBhcnIgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKGsgaW4gYXJyKSB7XG4gICAgICAgIGlmIChjYjAoYXJyW2tdLCBhcnIxW2sxXSkgPT09IDAgJiYgY2IoaywgazEpID09PSAwKSB7XG4gICAgICAgICAgLy8gSWYgaXQgcmVhY2hlcyBoZXJlLCBpdCB3YXMgZm91bmQgaW4gYXQgbGVhc3Qgb25lIGFycmF5LCBzbyB0cnkgbmV4dCB2YWx1ZVxuICAgICAgICAgIGNvbnRpbnVlIGFycjFrZXlzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXRBcnJbazFdID0gYXJyMVtrMV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldEFycjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV91ZGlmZl91YXNzb2MuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X3VpbnRlcnNlY3QoYXJyMSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X3VpbnRlcnNlY3QvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBidWdmaXhlZCBieTogRGVtb3N0aGVuZXMgS29wdHNpc1xuICAvLyAgIGV4YW1wbGUgMTogdmFyICRhcnJheTEgPSB7YTogJ2dyZWVuJywgYjogJ2Jyb3duJywgYzogJ2JsdWUnLCAwOiAncmVkJ31cbiAgLy8gICBleGFtcGxlIDE6IHZhciAkYXJyYXkyID0ge2E6ICdHUkVFTicsIEI6ICdicm93bicsIDA6ICd5ZWxsb3cnLCAxOiAncmVkJ31cbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X3VpbnRlcnNlY3QoJGFycmF5MSwgJGFycmF5MiwgZnVuY3Rpb24oIGZfc3RyaW5nMSwgZl9zdHJpbmcyKXt2YXIgc3RyaW5nMSA9IChmX3N0cmluZzErJycpLnRvTG93ZXJDYXNlKCk7IHZhciBzdHJpbmcyID0gKGZfc3RyaW5nMisnJykudG9Mb3dlckNhc2UoKTsgaWYgKHN0cmluZzEgPiBzdHJpbmcyKSByZXR1cm4gMTsgaWYgKHN0cmluZzEgPT09IHN0cmluZzIpIHJldHVybiAwOyByZXR1cm4gLTE7fSlcbiAgLy8gICByZXR1cm5zIDE6IHthOiAnZ3JlZW4nLCBiOiAnYnJvd24nLCAwOiAncmVkJ31cblxuICB2YXIgcmV0QXJyID0ge307XG4gIHZhciBhcmdsbTEgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgdmFyIGFyZ2xtMiA9IGFyZ2xtMSAtIDE7XG4gIHZhciBjYiA9IGFyZ3VtZW50c1thcmdsbTFdO1xuICB2YXIgazEgPSAnJztcbiAgdmFyIGkgPSAxO1xuICB2YXIgYXJyID0ge307XG4gIHZhciBrID0gJyc7XG5cbiAgdmFyICRnbG9iYWwgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbDtcblxuICBjYiA9IHR5cGVvZiBjYiA9PT0gJ3N0cmluZycgPyAkZ2xvYmFsW2NiXSA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChjYikgPT09ICdbb2JqZWN0IEFycmF5XScgPyAkZ2xvYmFsW2NiWzBdXVtjYlsxXV0gOiBjYjtcblxuICBhcnIxa2V5czogZm9yIChrMSBpbiBhcnIxKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sYWJlbHNcbiAgICBhcnJzOiBmb3IgKGkgPSAxOyBpIDwgYXJnbG0xOyBpKyspIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbGFiZWxzXG4gICAgICBhcnIgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKGsgaW4gYXJyKSB7XG4gICAgICAgIGlmIChjYihhcnJba10sIGFycjFbazFdKSA9PT0gMCkge1xuICAgICAgICAgIGlmIChpID09PSBhcmdsbTIpIHtcbiAgICAgICAgICAgIHJldEFycltrMV0gPSBhcnIxW2sxXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSWYgdGhlIGlubmVybW9zdCBsb29wIGFsd2F5cyBsZWFkcyBhdCBsZWFzdCBvbmNlIHRvIGFuIGVxdWFsIHZhbHVlLFxuICAgICAgICAgIC8vIGNvbnRpbnVlIHRoZSBsb29wIHVudGlsIGRvbmVcbiAgICAgICAgICBjb250aW51ZSBhcnJzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBJZiBpdCByZWFjaGVzIGhlcmUsIGl0IHdhc24ndCBmb3VuZCBpbiBhdCBsZWFzdCBvbmUgYXJyYXksIHNvIHRyeSBuZXh0IHZhbHVlXG4gICAgICBjb250aW51ZSBhcnIxa2V5czsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sYWJlbHNcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0QXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X3VpbnRlcnNlY3QuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFycmF5X3VpbnRlcnNlY3RfdWFzc29jKGFycjEpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV91aW50ZXJzZWN0X3Vhc3NvYy9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGFycmF5MSA9IHthOiAnZ3JlZW4nLCBiOiAnYnJvd24nLCBjOiAnYmx1ZScsIDA6ICdyZWQnfVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRhcnJheTIgPSB7YTogJ0dSRUVOJywgQjogJ2Jyb3duJywgMDogJ3llbGxvdycsIDE6ICdyZWQnfVxuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfdWludGVyc2VjdF91YXNzb2MoJGFycmF5MSwgJGFycmF5MiwgZnVuY3Rpb24gKGZfc3RyaW5nMSwgZl9zdHJpbmcyKXt2YXIgc3RyaW5nMSA9IChmX3N0cmluZzErJycpLnRvTG93ZXJDYXNlKCk7IHZhciBzdHJpbmcyID0gKGZfc3RyaW5nMisnJykudG9Mb3dlckNhc2UoKTsgaWYgKHN0cmluZzEgPiBzdHJpbmcyKSByZXR1cm4gMTsgaWYgKHN0cmluZzEgPT09IHN0cmluZzIpIHJldHVybiAwOyByZXR1cm4gLTE7fSwgZnVuY3Rpb24gKGZfc3RyaW5nMSwgZl9zdHJpbmcyKXt2YXIgc3RyaW5nMSA9IChmX3N0cmluZzErJycpLnRvTG93ZXJDYXNlKCk7IHZhciBzdHJpbmcyID0gKGZfc3RyaW5nMisnJykudG9Mb3dlckNhc2UoKTsgaWYgKHN0cmluZzEgPiBzdHJpbmcyKSByZXR1cm4gMTsgaWYgKHN0cmluZzEgPT09IHN0cmluZzIpIHJldHVybiAwOyByZXR1cm4gLTE7fSlcbiAgLy8gICByZXR1cm5zIDE6IHthOiAnZ3JlZW4nLCBiOiAnYnJvd24nfVxuXG4gIHZhciByZXRBcnIgPSB7fTtcbiAgdmFyIGFyZ2xtMSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuICB2YXIgYXJnbG0yID0gYXJnbG0xIC0gMTtcbiAgdmFyIGNiID0gYXJndW1lbnRzW2FyZ2xtMV07XG4gIHZhciBjYjAgPSBhcmd1bWVudHNbYXJnbG0yXTtcbiAgdmFyIGsxID0gJyc7XG4gIHZhciBpID0gMTtcbiAgdmFyIGsgPSAnJztcbiAgdmFyIGFyciA9IHt9O1xuXG4gIHZhciAkZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWw7XG5cbiAgY2IgPSB0eXBlb2YgY2IgPT09ICdzdHJpbmcnID8gJGdsb2JhbFtjYl0gOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY2IpID09PSAnW29iamVjdCBBcnJheV0nID8gJGdsb2JhbFtjYlswXV1bY2JbMV1dIDogY2I7XG5cbiAgY2IwID0gdHlwZW9mIGNiMCA9PT0gJ3N0cmluZycgPyAkZ2xvYmFsW2NiMF0gOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoY2IwKSA9PT0gJ1tvYmplY3QgQXJyYXldJyA/ICRnbG9iYWxbY2IwWzBdXVtjYjBbMV1dIDogY2IwO1xuXG4gIGFycjFrZXlzOiBmb3IgKGsxIGluIGFycjEpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgIGFycnM6IGZvciAoaSA9IDE7IGkgPCBhcmdsbTI7IGkrKykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sYWJlbHNcbiAgICAgIGFyciA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAoayBpbiBhcnIpIHtcbiAgICAgICAgaWYgKGNiMChhcnJba10sIGFycjFbazFdKSA9PT0gMCAmJiBjYihrLCBrMSkgPT09IDApIHtcbiAgICAgICAgICBpZiAoaSA9PT0gYXJndW1lbnRzLmxlbmd0aCAtIDMpIHtcbiAgICAgICAgICAgIHJldEFycltrMV0gPSBhcnIxW2sxXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSWYgdGhlIGlubmVybW9zdCBsb29wIGFsd2F5cyBsZWFkcyBhdCBsZWFzdCBvbmNlIHRvIGFuIGVxdWFsIHZhbHVlLFxuICAgICAgICAgIC8vIGNvbnRpbnVlIHRoZSBsb29wIHVudGlsIGRvbmVcbiAgICAgICAgICBjb250aW51ZSBhcnJzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxhYmVsc1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBJZiBpdCByZWFjaGVzIGhlcmUsIGl0IHdhc24ndCBmb3VuZCBpbiBhdCBsZWFzdCBvbmUgYXJyYXksIHNvIHRyeSBuZXh0IHZhbHVlXG4gICAgICBjb250aW51ZSBhcnIxa2V5czsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1sYWJlbHNcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0QXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFycmF5X3VpbnRlcnNlY3RfdWFzc29jLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheV91bmlxdWUoaW5wdXRBcnIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV91bmlxdWUvXG4gIC8vIG9yaWdpbmFsIGJ5OiBDYXJsb3MgUi4gTC4gUm9kcmlndWVzIChodHRwOi8vd3d3LmpzZnJvbWhlbGwuY29tKVxuICAvLyAgICBpbnB1dCBieTogZHVuY2FuXG4gIC8vICAgIGlucHV0IGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gYnVnZml4ZWQgYnk6IE5hdGVcbiAgLy8gYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rdnouaW8pXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBpbXByb3ZlZCBieTogTWljaGFlbCBHcmllclxuICAvLyAgICAgIG5vdGUgMTogVGhlIHNlY29uZCBhcmd1bWVudCwgc29ydF9mbGFncyBpcyBub3QgaW1wbGVtZW50ZWQ7XG4gIC8vICAgICAgbm90ZSAxOiBhbHNvIHNob3VsZCBiZSBzb3J0ZWQgKGFzb3J0PykgZmlyc3QgYWNjb3JkaW5nIHRvIGRvY3NcbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X3VuaXF1ZShbJ0tldmluJywnS2V2aW4nLCd2YW4nLCdab25uZXZlbGQnLCdLZXZpbiddKVxuICAvLyAgIHJldHVybnMgMTogezA6ICdLZXZpbicsIDI6ICd2YW4nLCAzOiAnWm9ubmV2ZWxkJ31cbiAgLy8gICBleGFtcGxlIDI6IGFycmF5X3VuaXF1ZSh7J2EnOiAnZ3JlZW4nLCAwOiAncmVkJywgJ2InOiAnZ3JlZW4nLCAxOiAnYmx1ZScsIDI6ICdyZWQnfSlcbiAgLy8gICByZXR1cm5zIDI6IHthOiAnZ3JlZW4nLCAwOiAncmVkJywgMTogJ2JsdWUnfVxuXG4gIHZhciBrZXkgPSAnJztcbiAgdmFyIHRtcEFycjIgPSB7fTtcbiAgdmFyIHZhbCA9ICcnO1xuXG4gIHZhciBfYXJyYXlTZWFyY2ggPSBmdW5jdGlvbiBfYXJyYXlTZWFyY2gobmVlZGxlLCBoYXlzdGFjaykge1xuICAgIHZhciBma2V5ID0gJyc7XG4gICAgZm9yIChma2V5IGluIGhheXN0YWNrKSB7XG4gICAgICBpZiAoaGF5c3RhY2suaGFzT3duUHJvcGVydHkoZmtleSkpIHtcbiAgICAgICAgaWYgKGhheXN0YWNrW2ZrZXldICsgJycgPT09IG5lZWRsZSArICcnKSB7XG4gICAgICAgICAgcmV0dXJuIGZrZXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGZvciAoa2V5IGluIGlucHV0QXJyKSB7XG4gICAgaWYgKGlucHV0QXJyLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHZhbCA9IGlucHV0QXJyW2tleV07XG4gICAgICBpZiAoX2FycmF5U2VhcmNoKHZhbCwgdG1wQXJyMikgPT09IGZhbHNlKSB7XG4gICAgICAgIHRtcEFycjJba2V5XSA9IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG1wQXJyMjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV91bmlxdWUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfdW5zaGlmdChhcnJheSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2FycmF5X3Vuc2hpZnQvXG4gIC8vIG9yaWdpbmFsIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyBpbXByb3ZlZCBieTogTWFydGlqbiBXaWVyaW5nYVxuICAvLyBpbXByb3ZlZCBieTogam13ZWJcbiAgLy8gICAgICBub3RlIDE6IEN1cnJlbnRseSBkb2VzIG5vdCBoYW5kbGUgb2JqZWN0c1xuICAvLyAgIGV4YW1wbGUgMTogYXJyYXlfdW5zaGlmdChbJ3ZhbicsICdab25uZXZlbGQnXSwgJ0tldmluJylcbiAgLy8gICByZXR1cm5zIDE6IDNcblxuICB2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgd2hpbGUgKC0taSAhPT0gMCkge1xuICAgIGFyZ3VtZW50c1swXS51bnNoaWZ0KGFyZ3VtZW50c1tpXSk7XG4gIH1cblxuICByZXR1cm4gYXJndW1lbnRzWzBdLmxlbmd0aDtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV91bnNoaWZ0LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheV92YWx1ZXMoaW5wdXQpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnJheV92YWx1ZXMvXG4gIC8vIG9yaWdpbmFsIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyBpbXByb3ZlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICBleGFtcGxlIDE6IGFycmF5X3ZhbHVlcygge2ZpcnN0bmFtZTogJ0tldmluJywgc3VybmFtZTogJ3ZhbiBab25uZXZlbGQnfSApXG4gIC8vICAgcmV0dXJucyAxOiBbICdLZXZpbicsICd2YW4gWm9ubmV2ZWxkJyBdXG5cbiAgdmFyIHRtcEFyciA9IFtdO1xuICB2YXIga2V5ID0gJyc7XG5cbiAgZm9yIChrZXkgaW4gaW5wdXQpIHtcbiAgICB0bXBBcnJbdG1wQXJyLmxlbmd0aF0gPSBpbnB1dFtrZXldO1xuICB9XG5cbiAgcmV0dXJuIHRtcEFycjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV92YWx1ZXMuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJyYXlfd2FsayhhcnJheSwgZnVuY25hbWUsIHVzZXJkYXRhKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvYXJyYXlfd2Fsay9cbiAgLy8gb3JpZ2luYWwgYnk6IEpvaG5ueSBNYXN0IChodHRwOi8vd3d3LnBocHZyb3V3ZW4ubmwpXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBEYXZpZFxuICAvLyBpbXByb3ZlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgICBub3RlIDE6IE9ubHkgd29ya3Mgd2l0aCB1c2VyLWRlZmluZWQgZnVuY3Rpb25zLCBub3QgYnVpbHQtaW4gZnVuY3Rpb25zIGxpa2Ugdm9pZCgpXG4gIC8vICAgZXhhbXBsZSAxOiBhcnJheV93YWxrIChbMywgNF0sIGZ1bmN0aW9uICgpIHt9LCAndXNlcmRhdGEnKVxuICAvLyAgIHJldHVybnMgMTogdHJ1ZVxuICAvLyAgIGV4YW1wbGUgMjogYXJyYXlfd2FsayAoJ215c3RyaW5nJywgZnVuY3Rpb24gKCkge30pXG4gIC8vICAgcmV0dXJucyAyOiBmYWxzZVxuICAvLyAgIGV4YW1wbGUgMzogYXJyYXlfd2FsayAoe1widGl0bGVcIjpcIm15IHRpdGxlXCJ9LCBmdW5jdGlvbiAoKSB7fSlcbiAgLy8gICByZXR1cm5zIDM6IHRydWVcblxuICBpZiAoIWFycmF5IHx8ICh0eXBlb2YgYXJyYXkgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGFycmF5KSkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIGZ1bmNuYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYXJyYXkpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgZnVuY25hbWUoYXJyYXlba2V5XSwga2V5LCB1c2VyZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZnVuY25hbWUoYXJyYXlba2V5XSwga2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlfd2Fsay5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhcnJheV93YWxrX3JlY3Vyc2l2ZShhcnJheSwgZnVuY25hbWUsIHVzZXJkYXRhKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vIG9yaWdpbmFsIGJ5OiBIdWd1ZXMgUGVjY2F0dGVcbiAgLy8gICAgICBub3RlIDE6IE9ubHkgd29ya3Mgd2l0aCB1c2VyLWRlZmluZWQgZnVuY3Rpb25zLCBub3QgYnVpbHQtaW4gZnVuY3Rpb25zIGxpa2Ugdm9pZCgpXG4gIC8vICAgZXhhbXBsZSAxOiBhcnJheV93YWxrX3JlY3Vyc2l2ZShbMywgNF0sIGZ1bmN0aW9uICgpIHt9LCAndXNlcmRhdGEnKVxuICAvLyAgIHJldHVybnMgMTogdHJ1ZVxuICAvLyAgIGV4YW1wbGUgMjogYXJyYXlfd2Fsa19yZWN1cnNpdmUoWzMsIFs0XV0sIGZ1bmN0aW9uICgpIHt9LCAndXNlcmRhdGEnKVxuICAvLyAgIHJldHVybnMgMjogdHJ1ZVxuICAvLyAgIGV4YW1wbGUgMzogYXJyYXlfd2Fsa19yZWN1cnNpdmUoWzMsIFtdXSwgZnVuY3Rpb24gKCkge30sICd1c2VyZGF0YScpXG4gIC8vICAgcmV0dXJucyAzOiB0cnVlXG5cbiAgaWYgKCFhcnJheSB8fCAodHlwZW9mIGFycmF5ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihhcnJheSkpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZnVuY25hbWUgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYXJyYXkpIHtcbiAgICAvLyBhcHBseSBcImZ1bmNuYW1lXCIgcmVjdXJzaXZlbHkgb25seSBvbiBhcnJheXNcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycmF5W2tleV0pID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICB2YXIgZnVuY0FyZ3MgPSBbYXJyYXlba2V5XSwgZnVuY25hbWVdO1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgIGZ1bmNBcmdzLnB1c2godXNlcmRhdGEpO1xuICAgICAgfVxuICAgICAgaWYgKGFycmF5X3dhbGtfcmVjdXJzaXZlLmFwcGx5KG51bGwsIGZ1bmNBcmdzKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgZnVuY25hbWUoYXJyYXlba2V5XSwga2V5LCB1c2VyZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdW5jbmFtZShhcnJheVtrZXldLCBrZXkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcnJheV93YWxrX3JlY3Vyc2l2ZS5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXJzb3J0KGlucHV0QXJyLCBzb3J0RmxhZ3MpIHtcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9hcnNvcnQvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBpbXByb3ZlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gaW1wcm92ZWQgYnk6IFRoZXJpYXVsdCAoaHR0cHM6Ly9naXRodWIuY29tL1RoZXJpYXVsdClcbiAgLy8gICAgICBub3RlIDE6IFNPUlRfU1RSSU5HIChhcyB3ZWxsIGFzIG5hdHNvcnQgYW5kIG5hdGNhc2Vzb3J0KSBtaWdodCBhbHNvIGJlXG4gIC8vICAgICAgbm90ZSAxOiBpbnRlZ3JhdGVkIGludG8gYWxsIG9mIHRoZXNlIGZ1bmN0aW9ucyBieSBhZGFwdGluZyB0aGUgY29kZSBhdFxuICAvLyAgICAgIG5vdGUgMTogaHR0cDovL3NvdXJjZWZyb2cubmV0L3Byb2plY3RzL25hdHNvcnQvbmF0Y29tcGFyZS5qc1xuICAvLyAgICAgIG5vdGUgMTogVGhlIGV4YW1wbGVzIGFyZSBjb3JyZWN0LCB0aGlzIGlzIGEgbmV3IHdheVxuICAvLyAgICAgIG5vdGUgMTogQ3JlZGl0cyB0bzogaHR0cDovL2phdmFzY3JpcHQuaW50ZXJuZXQuY29tL21hdGgtcmVsYXRlZC9idWJibGUtc29ydC5odG1sXG4gIC8vICAgICAgbm90ZSAxOiBUaGlzIGZ1bmN0aW9uIGRldmlhdGVzIGZyb20gUEhQIGluIHJldHVybmluZyBhIGNvcHkgb2YgdGhlIGFycmF5IGluc3RlYWRcbiAgLy8gICAgICBub3RlIDE6IG9mIGFjdGluZyBieSByZWZlcmVuY2UgYW5kIHJldHVybmluZyB0cnVlOyB0aGlzIHdhcyBuZWNlc3NhcnkgYmVjYXVzZVxuICAvLyAgICAgIG5vdGUgMTogSUUgZG9lcyBub3QgYWxsb3cgZGVsZXRpbmcgYW5kIHJlLWFkZGluZyBvZiBwcm9wZXJ0aWVzIHdpdGhvdXQgY2FjaGluZ1xuICAvLyAgICAgIG5vdGUgMTogb2YgcHJvcGVydHkgcG9zaXRpb247IHlvdSBjYW4gc2V0IHRoZSBpbmkgb2YgXCJsb2N1dHVzLnNvcnRCeVJlZmVyZW5jZVwiIHRvIHRydWUgdG9cbiAgLy8gICAgICBub3RlIDE6IGdldCB0aGUgUEhQIGJlaGF2aW9yLCBidXQgdXNlIHRoaXMgb25seSBpZiB5b3UgYXJlIGluIGFuIGVudmlyb25tZW50XG4gIC8vICAgICAgbm90ZSAxOiBzdWNoIGFzIEZpcmVmb3ggZXh0ZW5zaW9ucyB3aGVyZSBmb3ItaW4gaXRlcmF0aW9uIG9yZGVyIGlzIGZpeGVkIGFuZCB0cnVlXG4gIC8vICAgICAgbm90ZSAxOiBwcm9wZXJ0eSBkZWxldGlvbiBpcyBzdXBwb3J0ZWQuIE5vdGUgdGhhdCB3ZSBpbnRlbmQgdG8gaW1wbGVtZW50IHRoZSBQSFBcbiAgLy8gICAgICBub3RlIDE6IGJlaGF2aW9yIGJ5IGRlZmF1bHQgaWYgSUUgZXZlciBkb2VzIGFsbG93IGl0OyBvbmx5IGdpdmVzIHNoYWxsb3cgY29weSBzaW5jZVxuICAvLyAgICAgIG5vdGUgMTogaXMgYnkgcmVmZXJlbmNlIGluIFBIUCBhbnl3YXlzXG4gIC8vICAgICAgbm90ZSAxOiBTaW5jZSBKUyBvYmplY3RzJyBrZXlzIGFyZSBhbHdheXMgc3RyaW5ncywgYW5kICh0aGVcbiAgLy8gICAgICBub3RlIDE6IGRlZmF1bHQpIFNPUlRfUkVHVUxBUiBmbGFnIGRpc3Rpbmd1aXNoZXMgYnkga2V5IHR5cGUsXG4gIC8vICAgICAgbm90ZSAxOiBpZiB0aGUgY29udGVudCBpcyBhIG51bWVyaWMgc3RyaW5nLCB3ZSB0cmVhdCB0aGVcbiAgLy8gICAgICBub3RlIDE6IFwib3JpZ2luYWwgdHlwZVwiIGFzIG51bWVyaWMuXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGRhdGEgPSB7ZDogJ2xlbW9uJywgYTogJ29yYW5nZScsIGI6ICdiYW5hbmEnLCBjOiAnYXBwbGUnfVxuICAvLyAgIGV4YW1wbGUgMTogYXJzb3J0KCRkYXRhKVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRyZXN1bHQgPSAkZGF0YVxuICAvLyAgIHJldHVybnMgMToge2E6ICdvcmFuZ2UnLCBkOiAnbGVtb24nLCBiOiAnYmFuYW5hJywgYzogJ2FwcGxlJ31cbiAgLy8gICBleGFtcGxlIDI6IGluaV9zZXQoJ2xvY3V0dXMuc29ydEJ5UmVmZXJlbmNlJywgdHJ1ZSlcbiAgLy8gICBleGFtcGxlIDI6IHZhciAkZGF0YSA9IHtkOiAnbGVtb24nLCBhOiAnb3JhbmdlJywgYjogJ2JhbmFuYScsIGM6ICdhcHBsZSd9XG4gIC8vICAgZXhhbXBsZSAyOiBhcnNvcnQoJGRhdGEpXG4gIC8vICAgZXhhbXBsZSAyOiB2YXIgJHJlc3VsdCA9ICRkYXRhXG4gIC8vICAgcmV0dXJucyAyOiB7YTogJ29yYW5nZScsIGQ6ICdsZW1vbicsIGI6ICdiYW5hbmEnLCBjOiAnYXBwbGUnfVxuICAvLyAgICAgICAgdGVzdDogc2tpcC0xXG5cbiAgdmFyIGkxOGxnZCA9IHJlcXVpcmUoJy4uL2kxOG4vaTE4bl9sb2NfZ2V0X2RlZmF1bHQnKTtcbiAgdmFyIHN0cm5hdGNtcCA9IHJlcXVpcmUoJy4uL3N0cmluZ3Mvc3RybmF0Y21wJyk7XG4gIHZhciB2YWxBcnIgPSBbXTtcbiAgdmFyIHZhbEFyckxlbiA9IDA7XG4gIHZhciBrO1xuICB2YXIgaTtcbiAgdmFyIHNvcnRlcjtcbiAgdmFyIHNvcnRCeVJlZmVyZW5jZSA9IGZhbHNlO1xuICB2YXIgcG9wdWxhdGVBcnIgPSB7fTtcblxuICB2YXIgJGdsb2JhbCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsO1xuICAkZ2xvYmFsLiRsb2N1dHVzID0gJGdsb2JhbC4kbG9jdXR1cyB8fCB7fTtcbiAgdmFyICRsb2N1dHVzID0gJGdsb2JhbC4kbG9jdXR1cztcbiAgJGxvY3V0dXMucGhwID0gJGxvY3V0dXMucGhwIHx8IHt9O1xuICAkbG9jdXR1cy5waHAubG9jYWxlcyA9ICRsb2N1dHVzLnBocC5sb2NhbGVzIHx8IHt9O1xuXG4gIHN3aXRjaCAoc29ydEZsYWdzKSB7XG4gICAgY2FzZSAnU09SVF9TVFJJTkcnOlxuICAgICAgLy8gY29tcGFyZSBpdGVtcyBhcyBzdHJpbmdzXG4gICAgICBzb3J0ZXIgPSBmdW5jdGlvbiBzb3J0ZXIoYSwgYikge1xuICAgICAgICByZXR1cm4gc3RybmF0Y21wKGIsIGEpO1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1NPUlRfTE9DQUxFX1NUUklORyc6XG4gICAgICAvLyBjb21wYXJlIGl0ZW1zIGFzIHN0cmluZ3MsIGJhc2VkIG9uIHRoZSBjdXJyZW50IGxvY2FsZVxuICAgICAgLy8gKHNldCB3aXRoIGkxOG5fbG9jX3NldF9kZWZhdWx0KCkgYXMgb2YgUEhQNilcbiAgICAgIHZhciBsb2MgPSBpMThsZ2QoKTtcbiAgICAgIHNvcnRlciA9ICRsb2N1dHVzLnBocC5sb2NhbGVzW2xvY10uc29ydGluZztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1NPUlRfTlVNRVJJQyc6XG4gICAgICAvLyBjb21wYXJlIGl0ZW1zIG51bWVyaWNhbGx5XG4gICAgICBzb3J0ZXIgPSBmdW5jdGlvbiBzb3J0ZXIoYSwgYikge1xuICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnU09SVF9SRUdVTEFSJzpcbiAgICAgIC8vIGNvbXBhcmUgaXRlbXMgbm9ybWFsbHkgKGRvbid0IGNoYW5nZSB0eXBlcylcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBzb3J0ZXIgPSBmdW5jdGlvbiBzb3J0ZXIoYiwgYSkge1xuICAgICAgICB2YXIgYUZsb2F0ID0gcGFyc2VGbG9hdChhKTtcbiAgICAgICAgdmFyIGJGbG9hdCA9IHBhcnNlRmxvYXQoYik7XG4gICAgICAgIHZhciBhTnVtZXJpYyA9IGFGbG9hdCArICcnID09PSBhO1xuICAgICAgICB2YXIgYk51bWVyaWMgPSBiRmxvYXQgKyAnJyA9PT0gYjtcblxuICAgICAgICBpZiAoYU51bWVyaWMgJiYgYk51bWVyaWMpIHtcbiAgICAgICAgICByZXR1cm4gYUZsb2F0ID4gYkZsb2F0ID8gMSA6IGFGbG9hdCA8IGJGbG9hdCA/IC0xIDogMDtcbiAgICAgICAgfSBlbHNlIGlmIChhTnVtZXJpYyAmJiAhYk51bWVyaWMpIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIGlmICghYU51bWVyaWMgJiYgYk51bWVyaWMpIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYSA+IGIgPyAxIDogYSA8IGIgPyAtMSA6IDA7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gIH1cblxuICB2YXIgaW5pVmFsID0gKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJyA/IHJlcXVpcmUoJy4uL2luZm8vaW5pX2dldCcpKCdsb2N1dHVzLnNvcnRCeVJlZmVyZW5jZScpIDogdW5kZWZpbmVkKSB8fCAnb24nO1xuICBzb3J0QnlSZWZlcmVuY2UgPSBpbmlWYWwgPT09ICdvbic7XG5cbiAgLy8gR2V0IGtleSBhbmQgdmFsdWUgYXJyYXlzXG4gIGZvciAoayBpbiBpbnB1dEFycikge1xuICAgIGlmIChpbnB1dEFyci5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgdmFsQXJyLnB1c2goW2ssIGlucHV0QXJyW2tdXSk7XG4gICAgICBpZiAoc29ydEJ5UmVmZXJlbmNlKSB7XG4gICAgICAgIGRlbGV0ZSBpbnB1dEFycltrXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFsQXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gc29ydGVyKGFbMV0sIGJbMV0pO1xuICB9KTtcblxuICAvLyBSZXBvcHVsYXRlIHRoZSBvbGQgYXJyYXlcbiAgZm9yIChpID0gMCwgdmFsQXJyTGVuID0gdmFsQXJyLmxlbmd0aDsgaSA8IHZhbEFyckxlbjsgaSsrKSB7XG4gICAgcG9wdWxhdGVBcnJbdmFsQXJyW2ldWzBdXSA9IHZhbEFycltpXVsxXTtcbiAgICBpZiAoc29ydEJ5UmVmZXJlbmNlKSB7XG4gICAgICBpbnB1dEFyclt2YWxBcnJbaV1bMF1dID0gdmFsQXJyW2ldWzFdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzb3J0QnlSZWZlcmVuY2UgfHwgcG9wdWxhdGVBcnI7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJzb3J0LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhc29ydChpbnB1dEFyciwgc29ydEZsYWdzKSB7XG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvYXNvcnQvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBpbXByb3ZlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gaW1wcm92ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vIGltcHJvdmVkIGJ5OiBUaGVyaWF1bHQgKGh0dHBzOi8vZ2l0aHViLmNvbS9UaGVyaWF1bHQpXG4gIC8vICAgIGlucHV0IGJ5OiBwYXVsbyBrdW9uZ1xuICAvLyBidWdmaXhlZCBieTogQWRhbSBXYWxsbmVyIChodHRwOi8vd2ViMi5iaXRiYXJvLmh1LylcbiAgLy8gICAgICBub3RlIDE6IFNPUlRfU1RSSU5HIChhcyB3ZWxsIGFzIG5hdHNvcnQgYW5kIG5hdGNhc2Vzb3J0KSBtaWdodCBhbHNvIGJlXG4gIC8vICAgICAgbm90ZSAxOiBpbnRlZ3JhdGVkIGludG8gYWxsIG9mIHRoZXNlIGZ1bmN0aW9ucyBieSBhZGFwdGluZyB0aGUgY29kZSBhdFxuICAvLyAgICAgIG5vdGUgMTogaHR0cDovL3NvdXJjZWZyb2cubmV0L3Byb2plY3RzL25hdHNvcnQvbmF0Y29tcGFyZS5qc1xuICAvLyAgICAgIG5vdGUgMTogVGhlIGV4YW1wbGVzIGFyZSBjb3JyZWN0LCB0aGlzIGlzIGEgbmV3IHdheVxuICAvLyAgICAgIG5vdGUgMTogQ3JlZGl0cyB0bzogaHR0cDovL2phdmFzY3JpcHQuaW50ZXJuZXQuY29tL21hdGgtcmVsYXRlZC9idWJibGUtc29ydC5odG1sXG4gIC8vICAgICAgbm90ZSAxOiBUaGlzIGZ1bmN0aW9uIGRldmlhdGVzIGZyb20gUEhQIGluIHJldHVybmluZyBhIGNvcHkgb2YgdGhlIGFycmF5IGluc3RlYWRcbiAgLy8gICAgICBub3RlIDE6IG9mIGFjdGluZyBieSByZWZlcmVuY2UgYW5kIHJldHVybmluZyB0cnVlOyB0aGlzIHdhcyBuZWNlc3NhcnkgYmVjYXVzZVxuICAvLyAgICAgIG5vdGUgMTogSUUgZG9lcyBub3QgYWxsb3cgZGVsZXRpbmcgYW5kIHJlLWFkZGluZyBvZiBwcm9wZXJ0aWVzIHdpdGhvdXQgY2FjaGluZ1xuICAvLyAgICAgIG5vdGUgMTogb2YgcHJvcGVydHkgcG9zaXRpb247IHlvdSBjYW4gc2V0IHRoZSBpbmkgb2YgXCJsb2N1dHVzLnNvcnRCeVJlZmVyZW5jZVwiIHRvIHRydWUgdG9cbiAgLy8gICAgICBub3RlIDE6IGdldCB0aGUgUEhQIGJlaGF2aW9yLCBidXQgdXNlIHRoaXMgb25seSBpZiB5b3UgYXJlIGluIGFuIGVudmlyb25tZW50XG4gIC8vICAgICAgbm90ZSAxOiBzdWNoIGFzIEZpcmVmb3ggZXh0ZW5zaW9ucyB3aGVyZSBmb3ItaW4gaXRlcmF0aW9uIG9yZGVyIGlzIGZpeGVkIGFuZCB0cnVlXG4gIC8vICAgICAgbm90ZSAxOiBwcm9wZXJ0eSBkZWxldGlvbiBpcyBzdXBwb3J0ZWQuIE5vdGUgdGhhdCB3ZSBpbnRlbmQgdG8gaW1wbGVtZW50IHRoZSBQSFBcbiAgLy8gICAgICBub3RlIDE6IGJlaGF2aW9yIGJ5IGRlZmF1bHQgaWYgSUUgZXZlciBkb2VzIGFsbG93IGl0OyBvbmx5IGdpdmVzIHNoYWxsb3cgY29weSBzaW5jZVxuICAvLyAgICAgIG5vdGUgMTogaXMgYnkgcmVmZXJlbmNlIGluIFBIUCBhbnl3YXlzXG4gIC8vICAgICAgbm90ZSAxOiBTaW5jZSBKUyBvYmplY3RzJyBrZXlzIGFyZSBhbHdheXMgc3RyaW5ncywgYW5kICh0aGVcbiAgLy8gICAgICBub3RlIDE6IGRlZmF1bHQpIFNPUlRfUkVHVUxBUiBmbGFnIGRpc3Rpbmd1aXNoZXMgYnkga2V5IHR5cGUsXG4gIC8vICAgICAgbm90ZSAxOiBpZiB0aGUgY29udGVudCBpcyBhIG51bWVyaWMgc3RyaW5nLCB3ZSB0cmVhdCB0aGVcbiAgLy8gICAgICBub3RlIDE6IFwib3JpZ2luYWwgdHlwZVwiIGFzIG51bWVyaWMuXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGRhdGEgPSB7ZDogJ2xlbW9uJywgYTogJ29yYW5nZScsIGI6ICdiYW5hbmEnLCBjOiAnYXBwbGUnfVxuICAvLyAgIGV4YW1wbGUgMTogYXNvcnQoJGRhdGEpXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJHJlc3VsdCA9ICRkYXRhXG4gIC8vICAgcmV0dXJucyAxOiB7YzogJ2FwcGxlJywgYjogJ2JhbmFuYScsIGQ6ICdsZW1vbicsIGE6ICdvcmFuZ2UnfVxuICAvLyAgIGV4YW1wbGUgMjogaW5pX3NldCgnbG9jdXR1cy5zb3J0QnlSZWZlcmVuY2UnLCB0cnVlKVxuICAvLyAgIGV4YW1wbGUgMjogdmFyICRkYXRhID0ge2Q6ICdsZW1vbicsIGE6ICdvcmFuZ2UnLCBiOiAnYmFuYW5hJywgYzogJ2FwcGxlJ31cbiAgLy8gICBleGFtcGxlIDI6IGFzb3J0KCRkYXRhKVxuICAvLyAgIGV4YW1wbGUgMjogdmFyICRyZXN1bHQgPSAkZGF0YVxuICAvLyAgIHJldHVybnMgMjoge2M6ICdhcHBsZScsIGI6ICdiYW5hbmEnLCBkOiAnbGVtb24nLCBhOiAnb3JhbmdlJ31cblxuICB2YXIgc3RybmF0Y21wID0gcmVxdWlyZSgnLi4vc3RyaW5ncy9zdHJuYXRjbXAnKTtcbiAgdmFyIGkxOG5sZ2QgPSByZXF1aXJlKCcuLi9pMThuL2kxOG5fbG9jX2dldF9kZWZhdWx0Jyk7XG5cbiAgdmFyIHZhbEFyciA9IFtdO1xuICB2YXIgdmFsQXJyTGVuID0gMDtcbiAgdmFyIGs7XG4gIHZhciBpO1xuICB2YXIgc29ydGVyO1xuICB2YXIgc29ydEJ5UmVmZXJlbmNlID0gZmFsc2U7XG4gIHZhciBwb3B1bGF0ZUFyciA9IHt9O1xuXG4gIHZhciAkZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWw7XG4gICRnbG9iYWwuJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzIHx8IHt9O1xuICB2YXIgJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzO1xuICAkbG9jdXR1cy5waHAgPSAkbG9jdXR1cy5waHAgfHwge307XG4gICRsb2N1dHVzLnBocC5sb2NhbGVzID0gJGxvY3V0dXMucGhwLmxvY2FsZXMgfHwge307XG5cbiAgc3dpdGNoIChzb3J0RmxhZ3MpIHtcbiAgICBjYXNlICdTT1JUX1NUUklORyc6XG4gICAgICAvLyBjb21wYXJlIGl0ZW1zIGFzIHN0cmluZ3NcbiAgICAgIHNvcnRlciA9IGZ1bmN0aW9uIHNvcnRlcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBzdHJuYXRjbXAoYSwgYik7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnU09SVF9MT0NBTEVfU1RSSU5HJzpcbiAgICAgIC8vIGNvbXBhcmUgaXRlbXMgYXMgc3RyaW5ncywgYmFzZWQgb24gdGhlIGN1cnJlbnQgbG9jYWxlXG4gICAgICAvLyAoc2V0IHdpdGggaTE4bl9sb2Nfc2V0X2RlZmF1bHQoKSBhcyBvZiBQSFA2KVxuICAgICAgdmFyIGxvYyA9IGkxOG5sZ2QoKTtcbiAgICAgIHNvcnRlciA9ICRsb2N1dHVzLnBocC5sb2NhbGVzW2xvY10uc29ydGluZztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1NPUlRfTlVNRVJJQyc6XG4gICAgICAvLyBjb21wYXJlIGl0ZW1zIG51bWVyaWNhbGx5XG4gICAgICBzb3J0ZXIgPSBmdW5jdGlvbiBzb3J0ZXIoYSwgYikge1xuICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnU09SVF9SRUdVTEFSJzpcbiAgICAgIC8vIGNvbXBhcmUgaXRlbXMgbm9ybWFsbHkgKGRvbid0IGNoYW5nZSB0eXBlcylcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBzb3J0ZXIgPSBmdW5jdGlvbiBzb3J0ZXIoYSwgYikge1xuICAgICAgICB2YXIgYUZsb2F0ID0gcGFyc2VGbG9hdChhKTtcbiAgICAgICAgdmFyIGJGbG9hdCA9IHBhcnNlRmxvYXQoYik7XG4gICAgICAgIHZhciBhTnVtZXJpYyA9IGFGbG9hdCArICcnID09PSBhO1xuICAgICAgICB2YXIgYk51bWVyaWMgPSBiRmxvYXQgKyAnJyA9PT0gYjtcbiAgICAgICAgaWYgKGFOdW1lcmljICYmIGJOdW1lcmljKSB7XG4gICAgICAgICAgcmV0dXJuIGFGbG9hdCA+IGJGbG9hdCA/IDEgOiBhRmxvYXQgPCBiRmxvYXQgPyAtMSA6IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoYU51bWVyaWMgJiYgIWJOdW1lcmljKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoIWFOdW1lcmljICYmIGJOdW1lcmljKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhID4gYiA/IDEgOiBhIDwgYiA/IC0xIDogMDtcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHZhciBpbmlWYWwgPSAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnID8gcmVxdWlyZSgnLi4vaW5mby9pbmlfZ2V0JykoJ2xvY3V0dXMuc29ydEJ5UmVmZXJlbmNlJykgOiB1bmRlZmluZWQpIHx8ICdvbic7XG4gIHNvcnRCeVJlZmVyZW5jZSA9IGluaVZhbCA9PT0gJ29uJztcbiAgcG9wdWxhdGVBcnIgPSBzb3J0QnlSZWZlcmVuY2UgPyBpbnB1dEFyciA6IHBvcHVsYXRlQXJyO1xuXG4gIC8vIEdldCBrZXkgYW5kIHZhbHVlIGFycmF5c1xuICBmb3IgKGsgaW4gaW5wdXRBcnIpIHtcbiAgICBpZiAoaW5wdXRBcnIuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgIHZhbEFyci5wdXNoKFtrLCBpbnB1dEFycltrXV0pO1xuICAgICAgaWYgKHNvcnRCeVJlZmVyZW5jZSkge1xuICAgICAgICBkZWxldGUgaW5wdXRBcnJba107XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFsQXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gc29ydGVyKGFbMV0sIGJbMV0pO1xuICB9KTtcblxuICAvLyBSZXBvcHVsYXRlIHRoZSBvbGQgYXJyYXlcbiAgZm9yIChpID0gMCwgdmFsQXJyTGVuID0gdmFsQXJyLmxlbmd0aDsgaSA8IHZhbEFyckxlbjsgaSsrKSB7XG4gICAgcG9wdWxhdGVBcnJbdmFsQXJyW2ldWzBdXSA9IHZhbEFycltpXVsxXTtcbiAgfVxuXG4gIHJldHVybiBzb3J0QnlSZWZlcmVuY2UgfHwgcG9wdWxhdGVBcnI7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXNvcnQuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvdW50KG1peGVkVmFyLCBtb2RlKSB7XG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvY291bnQvXG4gIC8vIG9yaWdpbmFsIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyAgICBpbnB1dCBieTogV2FsZG8gTWFscXVpIFNpbHZhIChodHRwOi8vd2FsZG8ubWFscXVpLmluZm8pXG4gIC8vICAgIGlucHV0IGJ5OiBtZXJhYmlcbiAgLy8gYnVnZml4ZWQgYnk6IFNvcmVuIEhhbnNlblxuICAvLyBidWdmaXhlZCBieTogT2xpdmllciBMb3V2aWduZXMgKGh0dHA6Ly9tZy1jcmVhLmNvbS8pXG4gIC8vIGltcHJvdmVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogY291bnQoW1swLDBdLFswLC00XV0sICdDT1VOVF9SRUNVUlNJVkUnKVxuICAvLyAgIHJldHVybnMgMTogNlxuICAvLyAgIGV4YW1wbGUgMjogY291bnQoeydvbmUnIDogWzEsMiwzLDQsNV19LCAnQ09VTlRfUkVDVVJTSVZFJylcbiAgLy8gICByZXR1cm5zIDI6IDZcblxuICB2YXIga2V5O1xuICB2YXIgY250ID0gMDtcblxuICBpZiAobWl4ZWRWYXIgPT09IG51bGwgfHwgdHlwZW9mIG1peGVkVmFyID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiAwO1xuICB9IGVsc2UgaWYgKG1peGVkVmFyLmNvbnN0cnVjdG9yICE9PSBBcnJheSAmJiBtaXhlZFZhci5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBpZiAobW9kZSA9PT0gJ0NPVU5UX1JFQ1VSU0lWRScpIHtcbiAgICBtb2RlID0gMTtcbiAgfVxuICBpZiAobW9kZSAhPT0gMSkge1xuICAgIG1vZGUgPSAwO1xuICB9XG5cbiAgZm9yIChrZXkgaW4gbWl4ZWRWYXIpIHtcbiAgICBpZiAobWl4ZWRWYXIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY250Kys7XG4gICAgICBpZiAobW9kZSA9PT0gMSAmJiBtaXhlZFZhcltrZXldICYmIChtaXhlZFZhcltrZXldLmNvbnN0cnVjdG9yID09PSBBcnJheSB8fCBtaXhlZFZhcltrZXldLmNvbnN0cnVjdG9yID09PSBPYmplY3QpKSB7XG4gICAgICAgIGNudCArPSBjb3VudChtaXhlZFZhcltrZXldLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gY250O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvdW50LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjdXJyZW50KGFycikge1xuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2N1cnJlbnQvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICAgIG5vdGUgMTogVXNlcyBnbG9iYWw6IGxvY3V0dXMgdG8gc3RvcmUgdGhlIGFycmF5IHBvaW50ZXJcbiAgLy8gICBleGFtcGxlIDE6IHZhciAkdHJhbnNwb3J0ID0gWydmb290JywgJ2Jpa2UnLCAnY2FyJywgJ3BsYW5lJ11cbiAgLy8gICBleGFtcGxlIDE6IGN1cnJlbnQoJHRyYW5zcG9ydClcbiAgLy8gICByZXR1cm5zIDE6ICdmb290J1xuXG4gIHZhciAkZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWw7XG4gICRnbG9iYWwuJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzIHx8IHt9O1xuICB2YXIgJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzO1xuICAkbG9jdXR1cy5waHAgPSAkbG9jdXR1cy5waHAgfHwge307XG4gICRsb2N1dHVzLnBocC5wb2ludGVycyA9ICRsb2N1dHVzLnBocC5wb2ludGVycyB8fCBbXTtcbiAgdmFyIHBvaW50ZXJzID0gJGxvY3V0dXMucGhwLnBvaW50ZXJzO1xuXG4gIHZhciBpbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZih2YWx1ZSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSB0aGlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpc1tpXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfTtcbiAgaWYgKCFwb2ludGVycy5pbmRleE9mKSB7XG4gICAgcG9pbnRlcnMuaW5kZXhPZiA9IGluZGV4T2Y7XG4gIH1cbiAgaWYgKHBvaW50ZXJzLmluZGV4T2YoYXJyKSA9PT0gLTEpIHtcbiAgICBwb2ludGVycy5wdXNoKGFyciwgMCk7XG4gIH1cbiAgdmFyIGFycnBvcyA9IHBvaW50ZXJzLmluZGV4T2YoYXJyKTtcbiAgdmFyIGN1cnNvciA9IHBvaW50ZXJzW2FycnBvcyArIDFdO1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICByZXR1cm4gYXJyW2N1cnNvcl0gfHwgZmFsc2U7XG4gIH1cbiAgdmFyIGN0ID0gMDtcbiAgZm9yICh2YXIgayBpbiBhcnIpIHtcbiAgICBpZiAoY3QgPT09IGN1cnNvcikge1xuICAgICAgcmV0dXJuIGFycltrXTtcbiAgICB9XG4gICAgY3QrKztcbiAgfVxuICAvLyBFbXB0eVxuICByZXR1cm4gZmFsc2U7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3VycmVudC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZWFjaChhcnIpIHtcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9lYWNoL1xuICAvLyBvcmlnaW5hbCBieTogQXRlcyBHb3JhbCAoaHR0cDovL21hZ25ldGlxLmNvbSlcbiAgLy8gIHJldmlzZWQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgICAgbm90ZSAxOiBVc2VzIGdsb2JhbDogbG9jdXR1cyB0byBzdG9yZSB0aGUgYXJyYXkgcG9pbnRlclxuICAvLyAgIGV4YW1wbGUgMTogZWFjaCh7YTogXCJhcHBsZVwiLCBiOiBcImJhbGxvb25cIn0pXG4gIC8vICAgcmV0dXJucyAxOiB7MDogXCJhXCIsIDE6IFwiYXBwbGVcIiwga2V5OiBcImFcIiwgdmFsdWU6IFwiYXBwbGVcIn1cblxuICB2YXIgJGdsb2JhbCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsO1xuICAkZ2xvYmFsLiRsb2N1dHVzID0gJGdsb2JhbC4kbG9jdXR1cyB8fCB7fTtcbiAgdmFyICRsb2N1dHVzID0gJGdsb2JhbC4kbG9jdXR1cztcbiAgJGxvY3V0dXMucGhwID0gJGxvY3V0dXMucGhwIHx8IHt9O1xuICAkbG9jdXR1cy5waHAucG9pbnRlcnMgPSAkbG9jdXR1cy5waHAucG9pbnRlcnMgfHwgW107XG4gIHZhciBwb2ludGVycyA9ICRsb2N1dHVzLnBocC5wb2ludGVycztcblxuICB2YXIgaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YodmFsdWUpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gdGhpcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXNbaV0gPT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgaWYgKCFwb2ludGVycy5pbmRleE9mKSB7XG4gICAgcG9pbnRlcnMuaW5kZXhPZiA9IGluZGV4T2Y7XG4gIH1cbiAgaWYgKHBvaW50ZXJzLmluZGV4T2YoYXJyKSA9PT0gLTEpIHtcbiAgICBwb2ludGVycy5wdXNoKGFyciwgMCk7XG4gIH1cbiAgdmFyIGFycnBvcyA9IHBvaW50ZXJzLmluZGV4T2YoYXJyKTtcbiAgdmFyIGN1cnNvciA9IHBvaW50ZXJzW2FycnBvcyArIDFdO1xuICB2YXIgcG9zID0gMDtcblxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICB2YXIgY3QgPSAwO1xuICAgIGZvciAodmFyIGsgaW4gYXJyKSB7XG4gICAgICBpZiAoY3QgPT09IGN1cnNvcikge1xuICAgICAgICBwb2ludGVyc1thcnJwb3MgKyAxXSArPSAxO1xuICAgICAgICBpZiAoZWFjaC5yZXR1cm5BcnJheU9ubHkpIHtcbiAgICAgICAgICByZXR1cm4gW2ssIGFycltrXV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIDE6IGFycltrXSxcbiAgICAgICAgICAgIHZhbHVlOiBhcnJba10sXG4gICAgICAgICAgICAwOiBrLFxuICAgICAgICAgICAga2V5OiBrXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY3QrKztcbiAgICB9XG4gICAgLy8gRW1wdHlcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGFyci5sZW5ndGggPT09IDAgfHwgY3Vyc29yID09PSBhcnIubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHBvcyA9IGN1cnNvcjtcbiAgcG9pbnRlcnNbYXJycG9zICsgMV0gKz0gMTtcbiAgaWYgKGVhY2gucmV0dXJuQXJyYXlPbmx5KSB7XG4gICAgcmV0dXJuIFtwb3MsIGFycltwb3NdXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgMTogYXJyW3Bvc10sXG4gICAgICB2YWx1ZTogYXJyW3Bvc10sXG4gICAgICAwOiBwb3MsXG4gICAgICBrZXk6IHBvc1xuICAgIH07XG4gIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lYWNoLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmQoYXJyKSB7XG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvZW5kL1xuICAvLyBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gYnVnZml4ZWQgYnk6IExlZ2FldiBBbmRyZXlcbiAgLy8gIHJldmlzZWQgYnk6IEogQSBSXG4gIC8vICByZXZpc2VkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBpbXByb3ZlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gaW1wcm92ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rdnouaW8pXG4gIC8vICAgICAgbm90ZSAxOiBVc2VzIGdsb2JhbDogbG9jdXR1cyB0byBzdG9yZSB0aGUgYXJyYXkgcG9pbnRlclxuICAvLyAgIGV4YW1wbGUgMTogZW5kKHswOiAnS2V2aW4nLCAxOiAndmFuJywgMjogJ1pvbm5ldmVsZCd9KVxuICAvLyAgIHJldHVybnMgMTogJ1pvbm5ldmVsZCdcbiAgLy8gICBleGFtcGxlIDI6IGVuZChbJ0tldmluJywgJ3ZhbicsICdab25uZXZlbGQnXSlcbiAgLy8gICByZXR1cm5zIDI6ICdab25uZXZlbGQnXG5cbiAgdmFyICRnbG9iYWwgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbDtcbiAgJGdsb2JhbC4kbG9jdXR1cyA9ICRnbG9iYWwuJGxvY3V0dXMgfHwge307XG4gIHZhciAkbG9jdXR1cyA9ICRnbG9iYWwuJGxvY3V0dXM7XG4gICRsb2N1dHVzLnBocCA9ICRsb2N1dHVzLnBocCB8fCB7fTtcbiAgJGxvY3V0dXMucGhwLnBvaW50ZXJzID0gJGxvY3V0dXMucGhwLnBvaW50ZXJzIHx8IFtdO1xuICB2YXIgcG9pbnRlcnMgPSAkbG9jdXR1cy5waHAucG9pbnRlcnM7XG5cbiAgdmFyIGluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mKHZhbHVlKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzW2ldID09PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG4gIGlmICghcG9pbnRlcnMuaW5kZXhPZikge1xuICAgIHBvaW50ZXJzLmluZGV4T2YgPSBpbmRleE9mO1xuICB9XG4gIGlmIChwb2ludGVycy5pbmRleE9mKGFycikgPT09IC0xKSB7XG4gICAgcG9pbnRlcnMucHVzaChhcnIsIDApO1xuICB9XG4gIHZhciBhcnJwb3MgPSBwb2ludGVycy5pbmRleE9mKGFycik7XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgIHZhciBjdCA9IDA7XG4gICAgdmFyIHZhbDtcbiAgICBmb3IgKHZhciBrIGluIGFycikge1xuICAgICAgY3QrKztcbiAgICAgIHZhbCA9IGFycltrXTtcbiAgICB9XG4gICAgaWYgKGN0ID09PSAwKSB7XG4gICAgICAvLyBFbXB0eVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBwb2ludGVyc1thcnJwb3MgKyAxXSA9IGN0IC0gMTtcbiAgICByZXR1cm4gdmFsO1xuICB9XG4gIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHBvaW50ZXJzW2FycnBvcyArIDFdID0gYXJyLmxlbmd0aCAtIDE7XG4gIHJldHVybiBhcnJbcG9pbnRlcnNbYXJycG9zICsgMV1dO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVuZC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5fYXJyYXkobmVlZGxlLCBoYXlzdGFjaywgYXJnU3RyaWN0KSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvaW5fYXJyYXkvXG4gIC8vIG9yaWdpbmFsIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyBpbXByb3ZlZCBieTogdmxhZG8gaG91YmFcbiAgLy8gaW1wcm92ZWQgYnk6IEpvbmFzIFNjaWFuZ3VsYSBTdHJlZXQgKEpvbmkyQmFjaylcbiAgLy8gICAgaW5wdXQgYnk6IEJpbGx5XG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgIGV4YW1wbGUgMTogaW5fYXJyYXkoJ3ZhbicsIFsnS2V2aW4nLCAndmFuJywgJ1pvbm5ldmVsZCddKVxuICAvLyAgIHJldHVybnMgMTogdHJ1ZVxuICAvLyAgIGV4YW1wbGUgMjogaW5fYXJyYXkoJ3ZsYWRvJywgezA6ICdLZXZpbicsIHZsYWRvOiAndmFuJywgMTogJ1pvbm5ldmVsZCd9KVxuICAvLyAgIHJldHVybnMgMjogZmFsc2VcbiAgLy8gICBleGFtcGxlIDM6IGluX2FycmF5KDEsIFsnMScsICcyJywgJzMnXSlcbiAgLy8gICBleGFtcGxlIDM6IGluX2FycmF5KDEsIFsnMScsICcyJywgJzMnXSwgZmFsc2UpXG4gIC8vICAgcmV0dXJucyAzOiB0cnVlXG4gIC8vICAgcmV0dXJucyAzOiB0cnVlXG4gIC8vICAgZXhhbXBsZSA0OiBpbl9hcnJheSgxLCBbJzEnLCAnMicsICczJ10sIHRydWUpXG4gIC8vICAgcmV0dXJucyA0OiBmYWxzZVxuXG4gIHZhciBrZXkgPSAnJztcbiAgdmFyIHN0cmljdCA9ICEhYXJnU3RyaWN0O1xuXG4gIC8vIHdlIHByZXZlbnQgdGhlIGRvdWJsZSBjaGVjayAoc3RyaWN0ICYmIGFycltrZXldID09PSBuZGwpIHx8ICghc3RyaWN0ICYmIGFycltrZXldID09PSBuZGwpXG4gIC8vIGluIGp1c3Qgb25lIGZvciwgaW4gb3JkZXIgdG8gaW1wcm92ZSB0aGUgcGVyZm9ybWFuY2VcbiAgLy8gZGVjaWRpbmcgd2ljaCB0eXBlIG9mIGNvbXBhcmF0aW9uIHdpbGwgZG8gYmVmb3JlIHdhbGsgYXJyYXlcbiAgaWYgKHN0cmljdCkge1xuICAgIGZvciAoa2V5IGluIGhheXN0YWNrKSB7XG4gICAgICBpZiAoaGF5c3RhY2tba2V5XSA9PT0gbmVlZGxlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKGtleSBpbiBoYXlzdGFjaykge1xuICAgICAgaWYgKGhheXN0YWNrW2tleV0gPT0gbmVlZGxlKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbl9hcnJheS5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzWydhcnJheV9jaGFuZ2Vfa2V5X2Nhc2UnXSA9IHJlcXVpcmUoJy4vYXJyYXlfY2hhbmdlX2tleV9jYXNlJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfY2h1bmsnXSA9IHJlcXVpcmUoJy4vYXJyYXlfY2h1bmsnKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV9jb21iaW5lJ10gPSByZXF1aXJlKCcuL2FycmF5X2NvbWJpbmUnKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV9jb3VudF92YWx1ZXMnXSA9IHJlcXVpcmUoJy4vYXJyYXlfY291bnRfdmFsdWVzJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfZGlmZiddID0gcmVxdWlyZSgnLi9hcnJheV9kaWZmJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfZGlmZl9hc3NvYyddID0gcmVxdWlyZSgnLi9hcnJheV9kaWZmX2Fzc29jJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfZGlmZl9rZXknXSA9IHJlcXVpcmUoJy4vYXJyYXlfZGlmZl9rZXknKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV9kaWZmX3Vhc3NvYyddID0gcmVxdWlyZSgnLi9hcnJheV9kaWZmX3Vhc3NvYycpO1xubW9kdWxlLmV4cG9ydHNbJ2FycmF5X2RpZmZfdWtleSddID0gcmVxdWlyZSgnLi9hcnJheV9kaWZmX3VrZXknKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV9maWxsJ10gPSByZXF1aXJlKCcuL2FycmF5X2ZpbGwnKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV9maWxsX2tleXMnXSA9IHJlcXVpcmUoJy4vYXJyYXlfZmlsbF9rZXlzJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfZmlsdGVyJ10gPSByZXF1aXJlKCcuL2FycmF5X2ZpbHRlcicpO1xubW9kdWxlLmV4cG9ydHNbJ2FycmF5X2ZsaXAnXSA9IHJlcXVpcmUoJy4vYXJyYXlfZmxpcCcpO1xubW9kdWxlLmV4cG9ydHNbJ2FycmF5X2ludGVyc2VjdCddID0gcmVxdWlyZSgnLi9hcnJheV9pbnRlcnNlY3QnKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV9pbnRlcnNlY3RfYXNzb2MnXSA9IHJlcXVpcmUoJy4vYXJyYXlfaW50ZXJzZWN0X2Fzc29jJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfaW50ZXJzZWN0X2tleSddID0gcmVxdWlyZSgnLi9hcnJheV9pbnRlcnNlY3Rfa2V5Jyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfaW50ZXJzZWN0X3Vhc3NvYyddID0gcmVxdWlyZSgnLi9hcnJheV9pbnRlcnNlY3RfdWFzc29jJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfaW50ZXJzZWN0X3VrZXknXSA9IHJlcXVpcmUoJy4vYXJyYXlfaW50ZXJzZWN0X3VrZXknKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV9rZXlfZXhpc3RzJ10gPSByZXF1aXJlKCcuL2FycmF5X2tleV9leGlzdHMnKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV9rZXlzJ10gPSByZXF1aXJlKCcuL2FycmF5X2tleXMnKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV9tYXAnXSA9IHJlcXVpcmUoJy4vYXJyYXlfbWFwJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfbWVyZ2UnXSA9IHJlcXVpcmUoJy4vYXJyYXlfbWVyZ2UnKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV9tZXJnZV9yZWN1cnNpdmUnXSA9IHJlcXVpcmUoJy4vYXJyYXlfbWVyZ2VfcmVjdXJzaXZlJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfbXVsdGlzb3J0J10gPSByZXF1aXJlKCcuL2FycmF5X211bHRpc29ydCcpO1xubW9kdWxlLmV4cG9ydHNbJ2FycmF5X3BhZCddID0gcmVxdWlyZSgnLi9hcnJheV9wYWQnKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV9wb3AnXSA9IHJlcXVpcmUoJy4vYXJyYXlfcG9wJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfcHJvZHVjdCddID0gcmVxdWlyZSgnLi9hcnJheV9wcm9kdWN0Jyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfcHVzaCddID0gcmVxdWlyZSgnLi9hcnJheV9wdXNoJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfcmFuZCddID0gcmVxdWlyZSgnLi9hcnJheV9yYW5kJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfcmVkdWNlJ10gPSByZXF1aXJlKCcuL2FycmF5X3JlZHVjZScpO1xubW9kdWxlLmV4cG9ydHNbJ2FycmF5X3JlcGxhY2UnXSA9IHJlcXVpcmUoJy4vYXJyYXlfcmVwbGFjZScpO1xubW9kdWxlLmV4cG9ydHNbJ2FycmF5X3JlcGxhY2VfcmVjdXJzaXZlJ10gPSByZXF1aXJlKCcuL2FycmF5X3JlcGxhY2VfcmVjdXJzaXZlJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfcmV2ZXJzZSddID0gcmVxdWlyZSgnLi9hcnJheV9yZXZlcnNlJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfc2VhcmNoJ10gPSByZXF1aXJlKCcuL2FycmF5X3NlYXJjaCcpO1xubW9kdWxlLmV4cG9ydHNbJ2FycmF5X3NoaWZ0J10gPSByZXF1aXJlKCcuL2FycmF5X3NoaWZ0Jyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfc2xpY2UnXSA9IHJlcXVpcmUoJy4vYXJyYXlfc2xpY2UnKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV9zcGxpY2UnXSA9IHJlcXVpcmUoJy4vYXJyYXlfc3BsaWNlJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfc3VtJ10gPSByZXF1aXJlKCcuL2FycmF5X3N1bScpO1xubW9kdWxlLmV4cG9ydHNbJ2FycmF5X3VkaWZmJ10gPSByZXF1aXJlKCcuL2FycmF5X3VkaWZmJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfdWRpZmZfYXNzb2MnXSA9IHJlcXVpcmUoJy4vYXJyYXlfdWRpZmZfYXNzb2MnKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV91ZGlmZl91YXNzb2MnXSA9IHJlcXVpcmUoJy4vYXJyYXlfdWRpZmZfdWFzc29jJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfdWludGVyc2VjdCddID0gcmVxdWlyZSgnLi9hcnJheV91aW50ZXJzZWN0Jyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfdWludGVyc2VjdF91YXNzb2MnXSA9IHJlcXVpcmUoJy4vYXJyYXlfdWludGVyc2VjdF91YXNzb2MnKTtcbm1vZHVsZS5leHBvcnRzWydhcnJheV91bmlxdWUnXSA9IHJlcXVpcmUoJy4vYXJyYXlfdW5pcXVlJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfdW5zaGlmdCddID0gcmVxdWlyZSgnLi9hcnJheV91bnNoaWZ0Jyk7XG5tb2R1bGUuZXhwb3J0c1snYXJyYXlfdmFsdWVzJ10gPSByZXF1aXJlKCcuL2FycmF5X3ZhbHVlcycpO1xubW9kdWxlLmV4cG9ydHNbJ2FycmF5X3dhbGsnXSA9IHJlcXVpcmUoJy4vYXJyYXlfd2FsaycpO1xubW9kdWxlLmV4cG9ydHNbJ2FycmF5X3dhbGtfcmVjdXJzaXZlJ10gPSByZXF1aXJlKCcuL2FycmF5X3dhbGtfcmVjdXJzaXZlJyk7XG5tb2R1bGUuZXhwb3J0c1snYXJzb3J0J10gPSByZXF1aXJlKCcuL2Fyc29ydCcpO1xubW9kdWxlLmV4cG9ydHNbJ2Fzb3J0J10gPSByZXF1aXJlKCcuL2Fzb3J0Jyk7XG5tb2R1bGUuZXhwb3J0c1snY291bnQnXSA9IHJlcXVpcmUoJy4vY291bnQnKTtcbm1vZHVsZS5leHBvcnRzWydjdXJyZW50J10gPSByZXF1aXJlKCcuL2N1cnJlbnQnKTtcbm1vZHVsZS5leHBvcnRzWydlYWNoJ10gPSByZXF1aXJlKCcuL2VhY2gnKTtcbm1vZHVsZS5leHBvcnRzWydlbmQnXSA9IHJlcXVpcmUoJy4vZW5kJyk7XG5tb2R1bGUuZXhwb3J0c1snaW5fYXJyYXknXSA9IHJlcXVpcmUoJy4vaW5fYXJyYXknKTtcbm1vZHVsZS5leHBvcnRzWydrZXknXSA9IHJlcXVpcmUoJy4va2V5Jyk7XG5tb2R1bGUuZXhwb3J0c1sna3Jzb3J0J10gPSByZXF1aXJlKCcuL2tyc29ydCcpO1xubW9kdWxlLmV4cG9ydHNbJ2tzb3J0J10gPSByZXF1aXJlKCcuL2tzb3J0Jyk7XG5tb2R1bGUuZXhwb3J0c1snbmF0Y2FzZXNvcnQnXSA9IHJlcXVpcmUoJy4vbmF0Y2FzZXNvcnQnKTtcbm1vZHVsZS5leHBvcnRzWyduYXRzb3J0J10gPSByZXF1aXJlKCcuL25hdHNvcnQnKTtcbm1vZHVsZS5leHBvcnRzWyduZXh0J10gPSByZXF1aXJlKCcuL25leHQnKTtcbm1vZHVsZS5leHBvcnRzWydwb3MnXSA9IHJlcXVpcmUoJy4vcG9zJyk7XG5tb2R1bGUuZXhwb3J0c1sncHJldiddID0gcmVxdWlyZSgnLi9wcmV2Jyk7XG5tb2R1bGUuZXhwb3J0c1sncmFuZ2UnXSA9IHJlcXVpcmUoJy4vcmFuZ2UnKTtcbm1vZHVsZS5leHBvcnRzWydyZXNldCddID0gcmVxdWlyZSgnLi9yZXNldCcpO1xubW9kdWxlLmV4cG9ydHNbJ3Jzb3J0J10gPSByZXF1aXJlKCcuL3Jzb3J0Jyk7XG5tb2R1bGUuZXhwb3J0c1snc2h1ZmZsZSddID0gcmVxdWlyZSgnLi9zaHVmZmxlJyk7XG5tb2R1bGUuZXhwb3J0c1snc2l6ZW9mJ10gPSByZXF1aXJlKCcuL3NpemVvZicpO1xubW9kdWxlLmV4cG9ydHNbJ3NvcnQnXSA9IHJlcXVpcmUoJy4vc29ydCcpO1xubW9kdWxlLmV4cG9ydHNbJ3Vhc29ydCddID0gcmVxdWlyZSgnLi91YXNvcnQnKTtcbm1vZHVsZS5leHBvcnRzWyd1a3NvcnQnXSA9IHJlcXVpcmUoJy4vdWtzb3J0Jyk7XG5tb2R1bGUuZXhwb3J0c1sndXNvcnQnXSA9IHJlcXVpcmUoJy4vdXNvcnQnKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBrZXkoYXJyKSB7XG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAva2V5L1xuICAvLyBvcmlnaW5hbCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgaW5wdXQgYnk6IFJpZGRsZXIgKGh0dHA6Ly93d3cuZnJvbnRpZXJ3ZWJkZXYuY29tLylcbiAgLy8gYnVnZml4ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgICAgbm90ZSAxOiBVc2VzIGdsb2JhbDogbG9jdXR1cyB0byBzdG9yZSB0aGUgYXJyYXkgcG9pbnRlclxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRhcnJheSA9IHtmcnVpdDE6ICdhcHBsZScsICdmcnVpdDInOiAnb3JhbmdlJ31cbiAgLy8gICBleGFtcGxlIDE6IGtleSgkYXJyYXkpXG4gIC8vICAgcmV0dXJucyAxOiAnZnJ1aXQxJ1xuXG4gIHZhciAkZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWw7XG4gICRnbG9iYWwuJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzIHx8IHt9O1xuICB2YXIgJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzO1xuICAkbG9jdXR1cy5waHAgPSAkbG9jdXR1cy5waHAgfHwge307XG4gICRsb2N1dHVzLnBocC5wb2ludGVycyA9ICRsb2N1dHVzLnBocC5wb2ludGVycyB8fCBbXTtcbiAgdmFyIHBvaW50ZXJzID0gJGxvY3V0dXMucGhwLnBvaW50ZXJzO1xuXG4gIHZhciBpbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZih2YWx1ZSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSB0aGlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpc1tpXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfTtcblxuICBpZiAoIXBvaW50ZXJzLmluZGV4T2YpIHtcbiAgICBwb2ludGVycy5pbmRleE9mID0gaW5kZXhPZjtcbiAgfVxuXG4gIGlmIChwb2ludGVycy5pbmRleE9mKGFycikgPT09IC0xKSB7XG4gICAgcG9pbnRlcnMucHVzaChhcnIsIDApO1xuICB9XG4gIHZhciBjdXJzb3IgPSBwb2ludGVyc1twb2ludGVycy5pbmRleE9mKGFycikgKyAxXTtcbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpICE9PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgdmFyIGN0ID0gMDtcbiAgICBmb3IgKHZhciBrIGluIGFycikge1xuICAgICAgaWYgKGN0ID09PSBjdXJzb3IpIHtcbiAgICAgICAgcmV0dXJuIGs7XG4gICAgICB9XG4gICAgICBjdCsrO1xuICAgIH1cbiAgICAvLyBFbXB0eVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBjdXJzb3I7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a2V5LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBrcnNvcnQoaW5wdXRBcnIsIHNvcnRGbGFncykge1xuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2tyc29ydC9cbiAgLy8gb3JpZ2luYWwgYnk6IEdlZWtGRyAoaHR0cDovL2dlZWtmZy5ibG9nc3BvdC5jb20pXG4gIC8vIGltcHJvdmVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyBpbXByb3ZlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gYnVnZml4ZWQgYnk6IHBzZXVkYXJpYSAoaHR0cHM6Ly9naXRodWIuY29tL3BzZXVkYXJpYSlcbiAgLy8gICAgICBub3RlIDE6IFRoZSBleGFtcGxlcyBhcmUgY29ycmVjdCwgdGhpcyBpcyBhIG5ldyB3YXlcbiAgLy8gICAgICBub3RlIDE6IFRoaXMgZnVuY3Rpb24gZGV2aWF0ZXMgZnJvbSBQSFAgaW4gcmV0dXJuaW5nIGEgY29weSBvZiB0aGUgYXJyYXkgaW5zdGVhZFxuICAvLyAgICAgIG5vdGUgMTogb2YgYWN0aW5nIGJ5IHJlZmVyZW5jZSBhbmQgcmV0dXJuaW5nIHRydWU7IHRoaXMgd2FzIG5lY2Vzc2FyeSBiZWNhdXNlXG4gIC8vICAgICAgbm90ZSAxOiBJRSBkb2VzIG5vdCBhbGxvdyBkZWxldGluZyBhbmQgcmUtYWRkaW5nIG9mIHByb3BlcnRpZXMgd2l0aG91dCBjYWNoaW5nXG4gIC8vICAgICAgbm90ZSAxOiBvZiBwcm9wZXJ0eSBwb3NpdGlvbjsgeW91IGNhbiBzZXQgdGhlIGluaSBvZiBcImxvY3V0dXMuc29ydEJ5UmVmZXJlbmNlXCIgdG8gdHJ1ZSB0b1xuICAvLyAgICAgIG5vdGUgMTogZ2V0IHRoZSBQSFAgYmVoYXZpb3IsIGJ1dCB1c2UgdGhpcyBvbmx5IGlmIHlvdSBhcmUgaW4gYW4gZW52aXJvbm1lbnRcbiAgLy8gICAgICBub3RlIDE6IHN1Y2ggYXMgRmlyZWZveCBleHRlbnNpb25zIHdoZXJlIGZvci1pbiBpdGVyYXRpb24gb3JkZXIgaXMgZml4ZWQgYW5kIHRydWVcbiAgLy8gICAgICBub3RlIDE6IHByb3BlcnR5IGRlbGV0aW9uIGlzIHN1cHBvcnRlZC4gTm90ZSB0aGF0IHdlIGludGVuZCB0byBpbXBsZW1lbnQgdGhlIFBIUFxuICAvLyAgICAgIG5vdGUgMTogYmVoYXZpb3IgYnkgZGVmYXVsdCBpZiBJRSBldmVyIGRvZXMgYWxsb3cgaXQ7IG9ubHkgZ2l2ZXMgc2hhbGxvdyBjb3B5IHNpbmNlXG4gIC8vICAgICAgbm90ZSAxOiBpcyBieSByZWZlcmVuY2UgaW4gUEhQIGFueXdheXNcbiAgLy8gICAgICBub3RlIDE6IFNpbmNlIEpTIG9iamVjdHMnIGtleXMgYXJlIGFsd2F5cyBzdHJpbmdzLCBhbmQgKHRoZVxuICAvLyAgICAgIG5vdGUgMTogZGVmYXVsdCkgU09SVF9SRUdVTEFSIGZsYWcgZGlzdGluZ3Vpc2hlcyBieSBrZXkgdHlwZSxcbiAgLy8gICAgICBub3RlIDE6IGlmIHRoZSBjb250ZW50IGlzIGEgbnVtZXJpYyBzdHJpbmcsIHdlIHRyZWF0IHRoZVxuICAvLyAgICAgIG5vdGUgMTogXCJvcmlnaW5hbCB0eXBlXCIgYXMgbnVtZXJpYy5cbiAgLy8gICBleGFtcGxlIDE6IHZhciAkZGF0YSA9IHtkOiAnbGVtb24nLCBhOiAnb3JhbmdlJywgYjogJ2JhbmFuYScsIGM6ICdhcHBsZSd9XG4gIC8vICAgZXhhbXBsZSAxOiBrcnNvcnQoJGRhdGEpXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJHJlc3VsdCA9ICRkYXRhXG4gIC8vICAgcmV0dXJucyAxOiB7ZDogJ2xlbW9uJywgYzogJ2FwcGxlJywgYjogJ2JhbmFuYScsIGE6ICdvcmFuZ2UnfVxuICAvLyAgIGV4YW1wbGUgMjogaW5pX3NldCgnbG9jdXR1cy5zb3J0QnlSZWZlcmVuY2UnLCB0cnVlKVxuICAvLyAgIGV4YW1wbGUgMjogdmFyICRkYXRhID0gezI6ICd2YW4nLCAzOiAnWm9ubmV2ZWxkJywgMTogJ0tldmluJ31cbiAgLy8gICBleGFtcGxlIDI6IGtyc29ydCgkZGF0YSlcbiAgLy8gICBleGFtcGxlIDI6IHZhciAkcmVzdWx0ID0gJGRhdGFcbiAgLy8gICByZXR1cm5zIDI6IHszOiAnWm9ubmV2ZWxkJywgMjogJ3ZhbicsIDE6ICdLZXZpbid9XG5cbiAgdmFyIGkxOG5sZ2QgPSByZXF1aXJlKCcuLi9pMThuL2kxOG5fbG9jX2dldF9kZWZhdWx0Jyk7XG4gIHZhciBzdHJuYXRjbXAgPSByZXF1aXJlKCcuLi9zdHJpbmdzL3N0cm5hdGNtcCcpO1xuXG4gIHZhciB0bXBBcnIgPSB7fTtcbiAgdmFyIGtleXMgPSBbXTtcbiAgdmFyIHNvcnRlcjtcbiAgdmFyIGk7XG4gIHZhciBrO1xuICB2YXIgc29ydEJ5UmVmZXJlbmNlID0gZmFsc2U7XG4gIHZhciBwb3B1bGF0ZUFyciA9IHt9O1xuXG4gIHZhciAkZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWw7XG4gICRnbG9iYWwuJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzIHx8IHt9O1xuICB2YXIgJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzO1xuICAkbG9jdXR1cy5waHAgPSAkbG9jdXR1cy5waHAgfHwge307XG4gICRsb2N1dHVzLnBocC5sb2NhbGVzID0gJGxvY3V0dXMucGhwLmxvY2FsZXMgfHwge307XG5cbiAgc3dpdGNoIChzb3J0RmxhZ3MpIHtcbiAgICBjYXNlICdTT1JUX1NUUklORyc6XG4gICAgICAvLyBjb21wYXJlIGl0ZW1zIGFzIHN0cmluZ3NcbiAgICAgIHNvcnRlciA9IGZ1bmN0aW9uIHNvcnRlcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBzdHJuYXRjbXAoYiwgYSk7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnU09SVF9MT0NBTEVfU1RSSU5HJzpcbiAgICAgIC8vIGNvbXBhcmUgaXRlbXMgYXMgc3RyaW5ncywgYmFzZWQgb24gdGhlIGN1cnJlbnQgbG9jYWxlXG4gICAgICAvLyAoc2V0IHdpdGggaTE4bl9sb2Nfc2V0X2RlZmF1bHQoKSBhcyBvZiBQSFA2KVxuICAgICAgdmFyIGxvYyA9IGkxOG5sZ2QoKTtcbiAgICAgIHNvcnRlciA9ICRsb2N1dHVzLmxvY2FsZXNbbG9jXS5zb3J0aW5nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnU09SVF9OVU1FUklDJzpcbiAgICAgIC8vIGNvbXBhcmUgaXRlbXMgbnVtZXJpY2FsbHlcbiAgICAgIHNvcnRlciA9IGZ1bmN0aW9uIHNvcnRlcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBiIC0gYTtcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlICdTT1JUX1JFR1VMQVInOlxuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBjb21wYXJlIGl0ZW1zIG5vcm1hbGx5IChkb24ndCBjaGFuZ2UgdHlwZXMpXG4gICAgICBzb3J0ZXIgPSBmdW5jdGlvbiBzb3J0ZXIoYiwgYSkge1xuICAgICAgICB2YXIgYUZsb2F0ID0gcGFyc2VGbG9hdChhKTtcbiAgICAgICAgdmFyIGJGbG9hdCA9IHBhcnNlRmxvYXQoYik7XG4gICAgICAgIHZhciBhTnVtZXJpYyA9IGFGbG9hdCArICcnID09PSBhO1xuICAgICAgICB2YXIgYk51bWVyaWMgPSBiRmxvYXQgKyAnJyA9PT0gYjtcbiAgICAgICAgaWYgKGFOdW1lcmljICYmIGJOdW1lcmljKSB7XG4gICAgICAgICAgcmV0dXJuIGFGbG9hdCA+IGJGbG9hdCA/IDEgOiBhRmxvYXQgPCBiRmxvYXQgPyAtMSA6IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoYU51bWVyaWMgJiYgIWJOdW1lcmljKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoIWFOdW1lcmljICYmIGJOdW1lcmljKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhID4gYiA/IDEgOiBhIDwgYiA/IC0xIDogMDtcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgfVxuXG4gIC8vIE1ha2UgYSBsaXN0IG9mIGtleSBuYW1lc1xuICBmb3IgKGsgaW4gaW5wdXRBcnIpIHtcbiAgICBpZiAoaW5wdXRBcnIuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgIGtleXMucHVzaChrKTtcbiAgICB9XG4gIH1cbiAga2V5cy5zb3J0KHNvcnRlcik7XG5cbiAgdmFyIGluaVZhbCA9ICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCcuLi9pbmZvL2luaV9nZXQnKSgnbG9jdXR1cy5zb3J0QnlSZWZlcmVuY2UnKSA6IHVuZGVmaW5lZCkgfHwgJ29uJztcbiAgc29ydEJ5UmVmZXJlbmNlID0gaW5pVmFsID09PSAnb24nO1xuICBwb3B1bGF0ZUFyciA9IHNvcnRCeVJlZmVyZW5jZSA/IGlucHV0QXJyIDogcG9wdWxhdGVBcnI7XG5cbiAgLy8gUmVidWlsZCBhcnJheSB3aXRoIHNvcnRlZCBrZXkgbmFtZXNcbiAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrID0ga2V5c1tpXTtcbiAgICB0bXBBcnJba10gPSBpbnB1dEFycltrXTtcbiAgICBpZiAoc29ydEJ5UmVmZXJlbmNlKSB7XG4gICAgICBkZWxldGUgaW5wdXRBcnJba107XG4gICAgfVxuICB9XG4gIGZvciAoaSBpbiB0bXBBcnIpIHtcbiAgICBpZiAodG1wQXJyLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICBwb3B1bGF0ZUFycltpXSA9IHRtcEFycltpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc29ydEJ5UmVmZXJlbmNlIHx8IHBvcHVsYXRlQXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWtyc29ydC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ga3NvcnQoaW5wdXRBcnIsIHNvcnRGbGFncykge1xuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2tzb3J0L1xuICAvLyBvcmlnaW5hbCBieTogR2Vla0ZHIChodHRwOi8vZ2Vla2ZnLmJsb2dzcG90LmNvbSlcbiAgLy8gaW1wcm92ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rdnouaW8pXG4gIC8vIGltcHJvdmVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICAgIG5vdGUgMTogVGhpcyBmdW5jdGlvbiBkZXZpYXRlcyBmcm9tIFBIUCBpbiByZXR1cm5pbmcgYSBjb3B5IG9mIHRoZSBhcnJheSBpbnN0ZWFkXG4gIC8vICAgICAgbm90ZSAxOiBvZiBhY3RpbmcgYnkgcmVmZXJlbmNlIGFuZCByZXR1cm5pbmcgdHJ1ZTsgdGhpcyB3YXMgbmVjZXNzYXJ5IGJlY2F1c2VcbiAgLy8gICAgICBub3RlIDE6IElFIGRvZXMgbm90IGFsbG93IGRlbGV0aW5nIGFuZCByZS1hZGRpbmcgb2YgcHJvcGVydGllcyB3aXRob3V0IGNhY2hpbmdcbiAgLy8gICAgICBub3RlIDE6IG9mIHByb3BlcnR5IHBvc2l0aW9uOyB5b3UgY2FuIHNldCB0aGUgaW5pIG9mIFwibG9jdXR1cy5zb3J0QnlSZWZlcmVuY2VcIiB0byB0cnVlIHRvXG4gIC8vICAgICAgbm90ZSAxOiBnZXQgdGhlIFBIUCBiZWhhdmlvciwgYnV0IHVzZSB0aGlzIG9ubHkgaWYgeW91IGFyZSBpbiBhbiBlbnZpcm9ubWVudFxuICAvLyAgICAgIG5vdGUgMTogc3VjaCBhcyBGaXJlZm94IGV4dGVuc2lvbnMgd2hlcmUgZm9yLWluIGl0ZXJhdGlvbiBvcmRlciBpcyBmaXhlZCBhbmQgdHJ1ZVxuICAvLyAgICAgIG5vdGUgMTogcHJvcGVydHkgZGVsZXRpb24gaXMgc3VwcG9ydGVkLiBOb3RlIHRoYXQgd2UgaW50ZW5kIHRvIGltcGxlbWVudCB0aGUgUEhQXG4gIC8vICAgICAgbm90ZSAxOiBiZWhhdmlvciBieSBkZWZhdWx0IGlmIElFIGV2ZXIgZG9lcyBhbGxvdyBpdDsgb25seSBnaXZlcyBzaGFsbG93IGNvcHkgc2luY2VcbiAgLy8gICAgICBub3RlIDE6IGlzIGJ5IHJlZmVyZW5jZSBpbiBQSFAgYW55d2F5c1xuICAvLyAgICAgIG5vdGUgMTogU2luY2UgSlMgb2JqZWN0cycga2V5cyBhcmUgYWx3YXlzIHN0cmluZ3MsIGFuZCAodGhlXG4gIC8vICAgICAgbm90ZSAxOiBkZWZhdWx0KSBTT1JUX1JFR1VMQVIgZmxhZyBkaXN0aW5ndWlzaGVzIGJ5IGtleSB0eXBlLFxuICAvLyAgICAgIG5vdGUgMTogaWYgdGhlIGNvbnRlbnQgaXMgYSBudW1lcmljIHN0cmluZywgd2UgdHJlYXQgdGhlXG4gIC8vICAgICAgbm90ZSAxOiBcIm9yaWdpbmFsIHR5cGVcIiBhcyBudW1lcmljLlxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRkYXRhID0ge2Q6ICdsZW1vbicsIGE6ICdvcmFuZ2UnLCBiOiAnYmFuYW5hJywgYzogJ2FwcGxlJ31cbiAgLy8gICBleGFtcGxlIDE6IGtzb3J0KCRkYXRhKVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRyZXN1bHQgPSAkZGF0YVxuICAvLyAgIHJldHVybnMgMToge2E6ICdvcmFuZ2UnLCBiOiAnYmFuYW5hJywgYzogJ2FwcGxlJywgZDogJ2xlbW9uJ31cbiAgLy8gICBleGFtcGxlIDI6IGluaV9zZXQoJ2xvY3V0dXMuc29ydEJ5UmVmZXJlbmNlJywgdHJ1ZSlcbiAgLy8gICBleGFtcGxlIDI6IHZhciAkZGF0YSA9IHsyOiAndmFuJywgMzogJ1pvbm5ldmVsZCcsIDE6ICdLZXZpbid9XG4gIC8vICAgZXhhbXBsZSAyOiBrc29ydCgkZGF0YSlcbiAgLy8gICBleGFtcGxlIDI6IHZhciAkcmVzdWx0ID0gJGRhdGFcbiAgLy8gICByZXR1cm5zIDI6IHsxOiAnS2V2aW4nLCAyOiAndmFuJywgMzogJ1pvbm5ldmVsZCd9XG5cbiAgdmFyIGkxOG5sZ2QgPSByZXF1aXJlKCcuLi9pMThuL2kxOG5fbG9jX2dldF9kZWZhdWx0Jyk7XG4gIHZhciBzdHJuYXRjbXAgPSByZXF1aXJlKCcuLi9zdHJpbmdzL3N0cm5hdGNtcCcpO1xuXG4gIHZhciB0bXBBcnIgPSB7fTtcbiAgdmFyIGtleXMgPSBbXTtcbiAgdmFyIHNvcnRlcjtcbiAgdmFyIGk7XG4gIHZhciBrO1xuICB2YXIgc29ydEJ5UmVmZXJlbmNlID0gZmFsc2U7XG4gIHZhciBwb3B1bGF0ZUFyciA9IHt9O1xuXG4gIHZhciAkZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWw7XG4gICRnbG9iYWwuJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzIHx8IHt9O1xuICB2YXIgJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzO1xuICAkbG9jdXR1cy5waHAgPSAkbG9jdXR1cy5waHAgfHwge307XG4gICRsb2N1dHVzLnBocC5sb2NhbGVzID0gJGxvY3V0dXMucGhwLmxvY2FsZXMgfHwge307XG5cbiAgc3dpdGNoIChzb3J0RmxhZ3MpIHtcbiAgICBjYXNlICdTT1JUX1NUUklORyc6XG4gICAgICAvLyBjb21wYXJlIGl0ZW1zIGFzIHN0cmluZ3NcbiAgICAgIHNvcnRlciA9IGZ1bmN0aW9uIHNvcnRlcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBzdHJuYXRjbXAoYiwgYSk7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnU09SVF9MT0NBTEVfU1RSSU5HJzpcbiAgICAgIC8vIGNvbXBhcmUgaXRlbXMgYXMgc3RyaW5ncywgYmFzZWQgb24gdGhlIGN1cnJlbnQgbG9jYWxlXG4gICAgICAvLyAoc2V0IHdpdGggaTE4bl9sb2Nfc2V0X2RlZmF1bHQoKSBhcyBvZiBQSFA2KVxuICAgICAgdmFyIGxvYyA9IGkxOG5sZ2QoKTtcbiAgICAgIHNvcnRlciA9ICRsb2N1dHVzLmxvY2FsZXNbbG9jXS5zb3J0aW5nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnU09SVF9OVU1FUklDJzpcbiAgICAgIC8vIGNvbXBhcmUgaXRlbXMgbnVtZXJpY2FsbHlcbiAgICAgIHNvcnRlciA9IGZ1bmN0aW9uIHNvcnRlcihhLCBiKSB7XG4gICAgICAgIHJldHVybiBhICsgMCAtIChiICsgMCk7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIGNhc2UgJ1NPUlRfUkVHVUxBUic6IC8vIGNvbXBhcmUgaXRlbXMgbm9ybWFsbHkgKGRvbid0IGNoYW5nZSB0eXBlcylcbiAgICAgIHNvcnRlciA9IGZ1bmN0aW9uIHNvcnRlcihhLCBiKSB7XG4gICAgICAgIHZhciBhRmxvYXQgPSBwYXJzZUZsb2F0KGEpO1xuICAgICAgICB2YXIgYkZsb2F0ID0gcGFyc2VGbG9hdChiKTtcbiAgICAgICAgdmFyIGFOdW1lcmljID0gYUZsb2F0ICsgJycgPT09IGE7XG4gICAgICAgIHZhciBiTnVtZXJpYyA9IGJGbG9hdCArICcnID09PSBiO1xuICAgICAgICBpZiAoYU51bWVyaWMgJiYgYk51bWVyaWMpIHtcbiAgICAgICAgICByZXR1cm4gYUZsb2F0ID4gYkZsb2F0ID8gMSA6IGFGbG9hdCA8IGJGbG9hdCA/IC0xIDogMDtcbiAgICAgICAgfSBlbHNlIGlmIChhTnVtZXJpYyAmJiAhYk51bWVyaWMpIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIGlmICghYU51bWVyaWMgJiYgYk51bWVyaWMpIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGEgPiBiID8gMSA6IGEgPCBiID8gLTEgOiAwO1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLy8gTWFrZSBhIGxpc3Qgb2Yga2V5IG5hbWVzXG4gIGZvciAoayBpbiBpbnB1dEFycikge1xuICAgIGlmIChpbnB1dEFyci5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAga2V5cy5wdXNoKGspO1xuICAgIH1cbiAgfVxuICBrZXlzLnNvcnQoc29ydGVyKTtcblxuICB2YXIgaW5pVmFsID0gKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJyA/IHJlcXVpcmUoJy4uL2luZm8vaW5pX2dldCcpKCdsb2N1dHVzLnNvcnRCeVJlZmVyZW5jZScpIDogdW5kZWZpbmVkKSB8fCAnb24nO1xuICBzb3J0QnlSZWZlcmVuY2UgPSBpbmlWYWwgPT09ICdvbic7XG4gIHBvcHVsYXRlQXJyID0gc29ydEJ5UmVmZXJlbmNlID8gaW5wdXRBcnIgOiBwb3B1bGF0ZUFycjtcblxuICAvLyBSZWJ1aWxkIGFycmF5IHdpdGggc29ydGVkIGtleSBuYW1lc1xuICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGsgPSBrZXlzW2ldO1xuICAgIHRtcEFycltrXSA9IGlucHV0QXJyW2tdO1xuICAgIGlmIChzb3J0QnlSZWZlcmVuY2UpIHtcbiAgICAgIGRlbGV0ZSBpbnB1dEFycltrXTtcbiAgICB9XG4gIH1cbiAgZm9yIChpIGluIHRtcEFycikge1xuICAgIGlmICh0bXBBcnIuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIHBvcHVsYXRlQXJyW2ldID0gdG1wQXJyW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzb3J0QnlSZWZlcmVuY2UgfHwgcG9wdWxhdGVBcnI7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a3NvcnQuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5hdGNhc2Vzb3J0KGlucHV0QXJyKSB7XG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvbmF0Y2FzZXNvcnQvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBpbXByb3ZlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gaW1wcm92ZWQgYnk6IFRoZXJpYXVsdCAoaHR0cHM6Ly9naXRodWIuY29tL1RoZXJpYXVsdClcbiAgLy8gICAgICBub3RlIDE6IFRoaXMgZnVuY3Rpb24gZGV2aWF0ZXMgZnJvbSBQSFAgaW4gcmV0dXJuaW5nIGEgY29weSBvZiB0aGUgYXJyYXkgaW5zdGVhZFxuICAvLyAgICAgIG5vdGUgMTogb2YgYWN0aW5nIGJ5IHJlZmVyZW5jZSBhbmQgcmV0dXJuaW5nIHRydWU7IHRoaXMgd2FzIG5lY2Vzc2FyeSBiZWNhdXNlXG4gIC8vICAgICAgbm90ZSAxOiBJRSBkb2VzIG5vdCBhbGxvdyBkZWxldGluZyBhbmQgcmUtYWRkaW5nIG9mIHByb3BlcnRpZXMgd2l0aG91dCBjYWNoaW5nXG4gIC8vICAgICAgbm90ZSAxOiBvZiBwcm9wZXJ0eSBwb3NpdGlvbjsgeW91IGNhbiBzZXQgdGhlIGluaSBvZiBcImxvY3V0dXMuc29ydEJ5UmVmZXJlbmNlXCIgdG8gdHJ1ZSB0b1xuICAvLyAgICAgIG5vdGUgMTogZ2V0IHRoZSBQSFAgYmVoYXZpb3IsIGJ1dCB1c2UgdGhpcyBvbmx5IGlmIHlvdSBhcmUgaW4gYW4gZW52aXJvbm1lbnRcbiAgLy8gICAgICBub3RlIDE6IHN1Y2ggYXMgRmlyZWZveCBleHRlbnNpb25zIHdoZXJlIGZvci1pbiBpdGVyYXRpb24gb3JkZXIgaXMgZml4ZWQgYW5kIHRydWVcbiAgLy8gICAgICBub3RlIDE6IHByb3BlcnR5IGRlbGV0aW9uIGlzIHN1cHBvcnRlZC4gTm90ZSB0aGF0IHdlIGludGVuZCB0byBpbXBsZW1lbnQgdGhlIFBIUFxuICAvLyAgICAgIG5vdGUgMTogYmVoYXZpb3IgYnkgZGVmYXVsdCBpZiBJRSBldmVyIGRvZXMgYWxsb3cgaXQ7IG9ubHkgZ2l2ZXMgc2hhbGxvdyBjb3B5IHNpbmNlXG4gIC8vICAgICAgbm90ZSAxOiBpcyBieSByZWZlcmVuY2UgaW4gUEhQIGFueXdheXNcbiAgLy8gICAgICBub3RlIDE6IFdlIGNhbm5vdCB1c2UgbnVtYmVycyBhcyBrZXlzIGFuZCBoYXZlIHRoZW0gYmUgcmVvcmRlcmVkIHNpbmNlIHRoZXlcbiAgLy8gICAgICBub3RlIDE6IGFkaGVyZSB0byBudW1lcmljYWwgb3JkZXIgaW4gc29tZSBpbXBsZW1lbnRhdGlvbnNcbiAgLy8gICBleGFtcGxlIDE6IHZhciAkYXJyYXkxID0ge2E6J0lNRzAucG5nJywgYjonaW1nMTIucG5nJywgYzonaW1nMTAucG5nJywgZDonaW1nMi5wbmcnLCBlOidpbWcxLnBuZycsIGY6J0lNRzMucG5nJ31cbiAgLy8gICBleGFtcGxlIDE6IG5hdGNhc2Vzb3J0KCRhcnJheTEpXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJHJlc3VsdCA9ICRhcnJheTFcbiAgLy8gICByZXR1cm5zIDE6IHthOiAnSU1HMC5wbmcnLCBlOiAnaW1nMS5wbmcnLCBkOiAnaW1nMi5wbmcnLCBmOiAnSU1HMy5wbmcnLCBjOiAnaW1nMTAucG5nJywgYjogJ2ltZzEyLnBuZyd9XG5cbiAgdmFyIHN0cm5hdGNhc2VjbXAgPSByZXF1aXJlKCcuLi9zdHJpbmdzL3N0cm5hdGNhc2VjbXAnKTtcbiAgdmFyIHZhbEFyciA9IFtdO1xuICB2YXIgaztcbiAgdmFyIGk7XG4gIHZhciBzb3J0QnlSZWZlcmVuY2UgPSBmYWxzZTtcbiAgdmFyIHBvcHVsYXRlQXJyID0ge307XG5cbiAgdmFyIGluaVZhbCA9ICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCcuLi9pbmZvL2luaV9nZXQnKSgnbG9jdXR1cy5zb3J0QnlSZWZlcmVuY2UnKSA6IHVuZGVmaW5lZCkgfHwgJ29uJztcbiAgc29ydEJ5UmVmZXJlbmNlID0gaW5pVmFsID09PSAnb24nO1xuICBwb3B1bGF0ZUFyciA9IHNvcnRCeVJlZmVyZW5jZSA/IGlucHV0QXJyIDogcG9wdWxhdGVBcnI7XG5cbiAgLy8gR2V0IGtleSBhbmQgdmFsdWUgYXJyYXlzXG4gIGZvciAoayBpbiBpbnB1dEFycikge1xuICAgIGlmIChpbnB1dEFyci5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgdmFsQXJyLnB1c2goW2ssIGlucHV0QXJyW2tdXSk7XG4gICAgICBpZiAoc29ydEJ5UmVmZXJlbmNlKSB7XG4gICAgICAgIGRlbGV0ZSBpbnB1dEFycltrXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFsQXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gc3RybmF0Y2FzZWNtcChhWzFdLCBiWzFdKTtcbiAgfSk7XG5cbiAgLy8gUmVwb3B1bGF0ZSB0aGUgb2xkIGFycmF5XG4gIGZvciAoaSA9IDA7IGkgPCB2YWxBcnIubGVuZ3RoOyBpKyspIHtcbiAgICBwb3B1bGF0ZUFyclt2YWxBcnJbaV1bMF1dID0gdmFsQXJyW2ldWzFdO1xuICB9XG5cbiAgcmV0dXJuIHNvcnRCeVJlZmVyZW5jZSB8fCBwb3B1bGF0ZUFycjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1uYXRjYXNlc29ydC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbmF0c29ydChpbnB1dEFycikge1xuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL25hdHNvcnQvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBpbXByb3ZlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gaW1wcm92ZWQgYnk6IFRoZXJpYXVsdCAoaHR0cHM6Ly9naXRodWIuY29tL1RoZXJpYXVsdClcbiAgLy8gICAgICBub3RlIDE6IFRoaXMgZnVuY3Rpb24gZGV2aWF0ZXMgZnJvbSBQSFAgaW4gcmV0dXJuaW5nIGEgY29weSBvZiB0aGUgYXJyYXkgaW5zdGVhZFxuICAvLyAgICAgIG5vdGUgMTogb2YgYWN0aW5nIGJ5IHJlZmVyZW5jZSBhbmQgcmV0dXJuaW5nIHRydWU7IHRoaXMgd2FzIG5lY2Vzc2FyeSBiZWNhdXNlXG4gIC8vICAgICAgbm90ZSAxOiBJRSBkb2VzIG5vdCBhbGxvdyBkZWxldGluZyBhbmQgcmUtYWRkaW5nIG9mIHByb3BlcnRpZXMgd2l0aG91dCBjYWNoaW5nXG4gIC8vICAgICAgbm90ZSAxOiBvZiBwcm9wZXJ0eSBwb3NpdGlvbjsgeW91IGNhbiBzZXQgdGhlIGluaSBvZiBcImxvY3V0dXMuc29ydEJ5UmVmZXJlbmNlXCIgdG8gdHJ1ZSB0b1xuICAvLyAgICAgIG5vdGUgMTogZ2V0IHRoZSBQSFAgYmVoYXZpb3IsIGJ1dCB1c2UgdGhpcyBvbmx5IGlmIHlvdSBhcmUgaW4gYW4gZW52aXJvbm1lbnRcbiAgLy8gICAgICBub3RlIDE6IHN1Y2ggYXMgRmlyZWZveCBleHRlbnNpb25zIHdoZXJlIGZvci1pbiBpdGVyYXRpb24gb3JkZXIgaXMgZml4ZWQgYW5kIHRydWVcbiAgLy8gICAgICBub3RlIDE6IHByb3BlcnR5IGRlbGV0aW9uIGlzIHN1cHBvcnRlZC4gTm90ZSB0aGF0IHdlIGludGVuZCB0byBpbXBsZW1lbnQgdGhlIFBIUFxuICAvLyAgICAgIG5vdGUgMTogYmVoYXZpb3IgYnkgZGVmYXVsdCBpZiBJRSBldmVyIGRvZXMgYWxsb3cgaXQ7IG9ubHkgZ2l2ZXMgc2hhbGxvdyBjb3B5IHNpbmNlXG4gIC8vICAgICAgbm90ZSAxOiBpcyBieSByZWZlcmVuY2UgaW4gUEhQIGFueXdheXNcbiAgLy8gICBleGFtcGxlIDE6IHZhciAkYXJyYXkxID0ge2E6XCJpbWcxMi5wbmdcIiwgYjpcImltZzEwLnBuZ1wiLCBjOlwiaW1nMi5wbmdcIiwgZDpcImltZzEucG5nXCJ9XG4gIC8vICAgZXhhbXBsZSAxOiBuYXRzb3J0KCRhcnJheTEpXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJHJlc3VsdCA9ICRhcnJheTFcbiAgLy8gICByZXR1cm5zIDE6IHtkOiAnaW1nMS5wbmcnLCBjOiAnaW1nMi5wbmcnLCBiOiAnaW1nMTAucG5nJywgYTogJ2ltZzEyLnBuZyd9XG5cbiAgdmFyIHN0cm5hdGNtcCA9IHJlcXVpcmUoJy4uL3N0cmluZ3Mvc3RybmF0Y21wJyk7XG5cbiAgdmFyIHZhbEFyciA9IFtdO1xuICB2YXIgaztcbiAgdmFyIGk7XG4gIHZhciBzb3J0QnlSZWZlcmVuY2UgPSBmYWxzZTtcbiAgdmFyIHBvcHVsYXRlQXJyID0ge307XG5cbiAgdmFyIGluaVZhbCA9ICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCcuLi9pbmZvL2luaV9nZXQnKSgnbG9jdXR1cy5zb3J0QnlSZWZlcmVuY2UnKSA6IHVuZGVmaW5lZCkgfHwgJ29uJztcbiAgc29ydEJ5UmVmZXJlbmNlID0gaW5pVmFsID09PSAnb24nO1xuICBwb3B1bGF0ZUFyciA9IHNvcnRCeVJlZmVyZW5jZSA/IGlucHV0QXJyIDogcG9wdWxhdGVBcnI7XG5cbiAgLy8gR2V0IGtleSBhbmQgdmFsdWUgYXJyYXlzXG4gIGZvciAoayBpbiBpbnB1dEFycikge1xuICAgIGlmIChpbnB1dEFyci5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgdmFsQXJyLnB1c2goW2ssIGlucHV0QXJyW2tdXSk7XG4gICAgICBpZiAoc29ydEJ5UmVmZXJlbmNlKSB7XG4gICAgICAgIGRlbGV0ZSBpbnB1dEFycltrXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFsQXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gc3RybmF0Y21wKGFbMV0sIGJbMV0pO1xuICB9KTtcblxuICAvLyBSZXBvcHVsYXRlIHRoZSBvbGQgYXJyYXlcbiAgZm9yIChpID0gMDsgaSA8IHZhbEFyci5sZW5ndGg7IGkrKykge1xuICAgIHBvcHVsYXRlQXJyW3ZhbEFycltpXVswXV0gPSB2YWxBcnJbaV1bMV07XG4gIH1cblxuICByZXR1cm4gc29ydEJ5UmVmZXJlbmNlIHx8IHBvcHVsYXRlQXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5hdHNvcnQuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5leHQoYXJyKSB7XG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvbmV4dC9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgICAgbm90ZSAxOiBVc2VzIGdsb2JhbDogbG9jdXR1cyB0byBzdG9yZSB0aGUgYXJyYXkgcG9pbnRlclxuICAvLyAgIGV4YW1wbGUgMTogdmFyICR0cmFuc3BvcnQgPSBbJ2Zvb3QnLCAnYmlrZScsICdjYXInLCAncGxhbmUnXVxuICAvLyAgIGV4YW1wbGUgMTogbmV4dCgkdHJhbnNwb3J0KVxuICAvLyAgIGV4YW1wbGUgMTogbmV4dCgkdHJhbnNwb3J0KVxuICAvLyAgIHJldHVybnMgMTogJ2NhcidcblxuICB2YXIgJGdsb2JhbCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsO1xuICAkZ2xvYmFsLiRsb2N1dHVzID0gJGdsb2JhbC4kbG9jdXR1cyB8fCB7fTtcbiAgdmFyICRsb2N1dHVzID0gJGdsb2JhbC4kbG9jdXR1cztcbiAgJGxvY3V0dXMucGhwID0gJGxvY3V0dXMucGhwIHx8IHt9O1xuICAkbG9jdXR1cy5waHAucG9pbnRlcnMgPSAkbG9jdXR1cy5waHAucG9pbnRlcnMgfHwgW107XG4gIHZhciBwb2ludGVycyA9ICRsb2N1dHVzLnBocC5wb2ludGVycztcblxuICB2YXIgaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YodmFsdWUpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gdGhpcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXNbaV0gPT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH07XG5cbiAgaWYgKCFwb2ludGVycy5pbmRleE9mKSB7XG4gICAgcG9pbnRlcnMuaW5kZXhPZiA9IGluZGV4T2Y7XG4gIH1cbiAgaWYgKHBvaW50ZXJzLmluZGV4T2YoYXJyKSA9PT0gLTEpIHtcbiAgICBwb2ludGVycy5wdXNoKGFyciwgMCk7XG4gIH1cbiAgdmFyIGFycnBvcyA9IHBvaW50ZXJzLmluZGV4T2YoYXJyKTtcbiAgdmFyIGN1cnNvciA9IHBvaW50ZXJzW2FycnBvcyArIDFdO1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICB2YXIgY3QgPSAwO1xuICAgIGZvciAodmFyIGsgaW4gYXJyKSB7XG4gICAgICBpZiAoY3QgPT09IGN1cnNvciArIDEpIHtcbiAgICAgICAgcG9pbnRlcnNbYXJycG9zICsgMV0gKz0gMTtcbiAgICAgICAgcmV0dXJuIGFycltrXTtcbiAgICAgIH1cbiAgICAgIGN0Kys7XG4gICAgfVxuICAgIC8vIEVuZFxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoYXJyLmxlbmd0aCA9PT0gMCB8fCBjdXJzb3IgPT09IGFyci5sZW5ndGggLSAxKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHBvaW50ZXJzW2FycnBvcyArIDFdICs9IDE7XG4gIHJldHVybiBhcnJbcG9pbnRlcnNbYXJycG9zICsgMV1dO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW5leHQuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBvcyhhcnIpIHtcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9wb3MvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICAgIG5vdGUgMTogVXNlcyBnbG9iYWw6IGxvY3V0dXMgdG8gc3RvcmUgdGhlIGFycmF5IHBvaW50ZXJcbiAgLy8gICBleGFtcGxlIDE6IHZhciAkdHJhbnNwb3J0ID0gWydmb290JywgJ2Jpa2UnLCAnY2FyJywgJ3BsYW5lJ11cbiAgLy8gICBleGFtcGxlIDE6IHBvcygkdHJhbnNwb3J0KVxuICAvLyAgIHJldHVybnMgMTogJ2Zvb3QnXG5cbiAgdmFyIGN1cnJlbnQgPSByZXF1aXJlKCcuLi9hcnJheS9jdXJyZW50Jyk7XG4gIHJldHVybiBjdXJyZW50KGFycik7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cG9zLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwcmV2KGFycikge1xuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL3ByZXYvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICAgIG5vdGUgMTogVXNlcyBnbG9iYWw6IGxvY3V0dXMgdG8gc3RvcmUgdGhlIGFycmF5IHBvaW50ZXJcbiAgLy8gICBleGFtcGxlIDE6IHZhciAkdHJhbnNwb3J0ID0gWydmb290JywgJ2Jpa2UnLCAnY2FyJywgJ3BsYW5lJ11cbiAgLy8gICBleGFtcGxlIDE6IHByZXYoJHRyYW5zcG9ydClcbiAgLy8gICByZXR1cm5zIDE6IGZhbHNlXG5cbiAgdmFyICRnbG9iYWwgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbDtcbiAgJGdsb2JhbC4kbG9jdXR1cyA9ICRnbG9iYWwuJGxvY3V0dXMgfHwge307XG4gIHZhciAkbG9jdXR1cyA9ICRnbG9iYWwuJGxvY3V0dXM7XG4gICRsb2N1dHVzLnBocCA9ICRsb2N1dHVzLnBocCB8fCB7fTtcbiAgJGxvY3V0dXMucGhwLnBvaW50ZXJzID0gJGxvY3V0dXMucGhwLnBvaW50ZXJzIHx8IFtdO1xuICB2YXIgcG9pbnRlcnMgPSAkbG9jdXR1cy5waHAucG9pbnRlcnM7XG5cbiAgdmFyIGluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mKHZhbHVlKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzW2ldID09PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG4gIGlmICghcG9pbnRlcnMuaW5kZXhPZikge1xuICAgIHBvaW50ZXJzLmluZGV4T2YgPSBpbmRleE9mO1xuICB9XG4gIHZhciBhcnJwb3MgPSBwb2ludGVycy5pbmRleE9mKGFycik7XG4gIHZhciBjdXJzb3IgPSBwb2ludGVyc1thcnJwb3MgKyAxXTtcbiAgaWYgKHBvaW50ZXJzLmluZGV4T2YoYXJyKSA9PT0gLTEgfHwgY3Vyc29yID09PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgIHZhciBjdCA9IDA7XG4gICAgZm9yICh2YXIgayBpbiBhcnIpIHtcbiAgICAgIGlmIChjdCA9PT0gY3Vyc29yIC0gMSkge1xuICAgICAgICBwb2ludGVyc1thcnJwb3MgKyAxXSAtPSAxO1xuICAgICAgICByZXR1cm4gYXJyW2tdO1xuICAgICAgfVxuICAgICAgY3QrKztcbiAgICB9XG4gICAgLy8gU2hvdWxkbid0IHJlYWNoIGhlcmVcbiAgfVxuICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBwb2ludGVyc1thcnJwb3MgKyAxXSAtPSAxO1xuICByZXR1cm4gYXJyW3BvaW50ZXJzW2FycnBvcyArIDFdXTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmV2LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJhbmdlKGxvdywgaGlnaCwgc3RlcCkge1xuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL3JhbmdlL1xuICAvLyBvcmlnaW5hbCBieTogV2FsZG8gTWFscXVpIFNpbHZhIChodHRwOi8vd2FsZG8ubWFscXVpLmluZm8pXG4gIC8vICAgZXhhbXBsZSAxOiByYW5nZSAoIDAsIDEyIClcbiAgLy8gICByZXR1cm5zIDE6IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyXVxuICAvLyAgIGV4YW1wbGUgMjogcmFuZ2UoIDAsIDEwMCwgMTAgKVxuICAvLyAgIHJldHVybnMgMjogWzAsIDEwLCAyMCwgMzAsIDQwLCA1MCwgNjAsIDcwLCA4MCwgOTAsIDEwMF1cbiAgLy8gICBleGFtcGxlIDM6IHJhbmdlKCAnYScsICdpJyApXG4gIC8vICAgcmV0dXJucyAzOiBbJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJywgJ2cnLCAnaCcsICdpJ11cbiAgLy8gICBleGFtcGxlIDQ6IHJhbmdlKCAnYycsICdhJyApXG4gIC8vICAgcmV0dXJucyA0OiBbJ2MnLCAnYicsICdhJ11cblxuICB2YXIgbWF0cml4ID0gW107XG4gIHZhciBpVmFsO1xuICB2YXIgZW5kdmFsO1xuICB2YXIgcGx1cztcbiAgdmFyIHdhbGtlciA9IHN0ZXAgfHwgMTtcbiAgdmFyIGNoYXJzID0gZmFsc2U7XG5cbiAgaWYgKCFpc05hTihsb3cpICYmICFpc05hTihoaWdoKSkge1xuICAgIGlWYWwgPSBsb3c7XG4gICAgZW5kdmFsID0gaGlnaDtcbiAgfSBlbHNlIGlmIChpc05hTihsb3cpICYmIGlzTmFOKGhpZ2gpKSB7XG4gICAgY2hhcnMgPSB0cnVlO1xuICAgIGlWYWwgPSBsb3cuY2hhckNvZGVBdCgwKTtcbiAgICBlbmR2YWwgPSBoaWdoLmNoYXJDb2RlQXQoMCk7XG4gIH0gZWxzZSB7XG4gICAgaVZhbCA9IGlzTmFOKGxvdykgPyAwIDogbG93O1xuICAgIGVuZHZhbCA9IGlzTmFOKGhpZ2gpID8gMCA6IGhpZ2g7XG4gIH1cblxuICBwbHVzID0gIShpVmFsID4gZW5kdmFsKTtcbiAgaWYgKHBsdXMpIHtcbiAgICB3aGlsZSAoaVZhbCA8PSBlbmR2YWwpIHtcbiAgICAgIG1hdHJpeC5wdXNoKGNoYXJzID8gU3RyaW5nLmZyb21DaGFyQ29kZShpVmFsKSA6IGlWYWwpO1xuICAgICAgaVZhbCArPSB3YWxrZXI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHdoaWxlIChpVmFsID49IGVuZHZhbCkge1xuICAgICAgbWF0cml4LnB1c2goY2hhcnMgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKGlWYWwpIDogaVZhbCk7XG4gICAgICBpVmFsIC09IHdhbGtlcjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWF0cml4O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJhbmdlLmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXNldChhcnIpIHtcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9yZXNldC9cbiAgLy8gb3JpZ2luYWwgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rdnouaW8pXG4gIC8vIGJ1Z2ZpeGVkIGJ5OiBMZWdhZXYgQW5kcmV5XG4gIC8vICByZXZpc2VkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICAgIG5vdGUgMTogVXNlcyBnbG9iYWw6IGxvY3V0dXMgdG8gc3RvcmUgdGhlIGFycmF5IHBvaW50ZXJcbiAgLy8gICBleGFtcGxlIDE6IHJlc2V0KHswOiAnS2V2aW4nLCAxOiAndmFuJywgMjogJ1pvbm5ldmVsZCd9KVxuICAvLyAgIHJldHVybnMgMTogJ0tldmluJ1xuXG4gIHZhciAkZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWw7XG4gICRnbG9iYWwuJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzIHx8IHt9O1xuICB2YXIgJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzO1xuICAkbG9jdXR1cy5waHAgPSAkbG9jdXR1cy5waHAgfHwge307XG4gICRsb2N1dHVzLnBocC5wb2ludGVycyA9ICRsb2N1dHVzLnBocC5wb2ludGVycyB8fCBbXTtcbiAgdmFyIHBvaW50ZXJzID0gJGxvY3V0dXMucGhwLnBvaW50ZXJzO1xuXG4gIHZhciBpbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZih2YWx1ZSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSB0aGlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpc1tpXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfTtcblxuICBpZiAoIXBvaW50ZXJzLmluZGV4T2YpIHtcbiAgICBwb2ludGVycy5pbmRleE9mID0gaW5kZXhPZjtcbiAgfVxuICBpZiAocG9pbnRlcnMuaW5kZXhPZihhcnIpID09PSAtMSkge1xuICAgIHBvaW50ZXJzLnB1c2goYXJyLCAwKTtcbiAgfVxuICB2YXIgYXJycG9zID0gcG9pbnRlcnMuaW5kZXhPZihhcnIpO1xuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgIT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICBmb3IgKHZhciBrIGluIGFycikge1xuICAgICAgaWYgKHBvaW50ZXJzLmluZGV4T2YoYXJyKSA9PT0gLTEpIHtcbiAgICAgICAgcG9pbnRlcnMucHVzaChhcnIsIDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9pbnRlcnNbYXJycG9zICsgMV0gPSAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFycltrXTtcbiAgICB9XG4gICAgLy8gRW1wdHlcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcG9pbnRlcnNbYXJycG9zICsgMV0gPSAwO1xuICByZXR1cm4gYXJyW3BvaW50ZXJzW2FycnBvcyArIDFdXTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZXNldC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcnNvcnQoaW5wdXRBcnIsIHNvcnRGbGFncykge1xuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL3Jzb3J0L1xuICAvLyBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gIHJldmlzZWQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vIGltcHJvdmVkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyAgICAgIG5vdGUgMTogU09SVF9TVFJJTkcgKGFzIHdlbGwgYXMgbmF0c29ydCBhbmQgbmF0Y2FzZXNvcnQpIG1pZ2h0IGFsc28gYmVcbiAgLy8gICAgICBub3RlIDE6IGludGVncmF0ZWQgaW50byBhbGwgb2YgdGhlc2UgZnVuY3Rpb25zIGJ5IGFkYXB0aW5nIHRoZSBjb2RlIGF0XG4gIC8vICAgICAgbm90ZSAxOiBodHRwOi8vc291cmNlZnJvZy5uZXQvcHJvamVjdHMvbmF0c29ydC9uYXRjb21wYXJlLmpzXG4gIC8vICAgICAgbm90ZSAxOiBUaGlzIGZ1bmN0aW9uIGRldmlhdGVzIGZyb20gUEhQIGluIHJldHVybmluZyBhIGNvcHkgb2YgdGhlIGFycmF5IGluc3RlYWRcbiAgLy8gICAgICBub3RlIDE6IG9mIGFjdGluZyBieSByZWZlcmVuY2UgYW5kIHJldHVybmluZyB0cnVlOyB0aGlzIHdhcyBuZWNlc3NhcnkgYmVjYXVzZVxuICAvLyAgICAgIG5vdGUgMTogSUUgZG9lcyBub3QgYWxsb3cgZGVsZXRpbmcgYW5kIHJlLWFkZGluZyBvZiBwcm9wZXJ0aWVzIHdpdGhvdXQgY2FjaGluZ1xuICAvLyAgICAgIG5vdGUgMTogb2YgcHJvcGVydHkgcG9zaXRpb247IHlvdSBjYW4gc2V0IHRoZSBpbmkgb2YgXCJsb2N1dHVzLnNvcnRCeVJlZmVyZW5jZVwiIHRvIHRydWUgdG9cbiAgLy8gICAgICBub3RlIDE6IGdldCB0aGUgUEhQIGJlaGF2aW9yLCBidXQgdXNlIHRoaXMgb25seSBpZiB5b3UgYXJlIGluIGFuIGVudmlyb25tZW50XG4gIC8vICAgICAgbm90ZSAxOiBzdWNoIGFzIEZpcmVmb3ggZXh0ZW5zaW9ucyB3aGVyZSBmb3ItaW4gaXRlcmF0aW9uIG9yZGVyIGlzIGZpeGVkIGFuZCB0cnVlXG4gIC8vICAgICAgbm90ZSAxOiBwcm9wZXJ0eSBkZWxldGlvbiBpcyBzdXBwb3J0ZWQuIE5vdGUgdGhhdCB3ZSBpbnRlbmQgdG8gaW1wbGVtZW50IHRoZSBQSFBcbiAgLy8gICAgICBub3RlIDE6IGJlaGF2aW9yIGJ5IGRlZmF1bHQgaWYgSUUgZXZlciBkb2VzIGFsbG93IGl0OyBvbmx5IGdpdmVzIHNoYWxsb3cgY29weSBzaW5jZVxuICAvLyAgICAgIG5vdGUgMTogaXMgYnkgcmVmZXJlbmNlIGluIFBIUCBhbnl3YXlzXG4gIC8vICAgICAgbm90ZSAxOiBTaW5jZSBKUyBvYmplY3RzJyBrZXlzIGFyZSBhbHdheXMgc3RyaW5ncywgYW5kICh0aGVcbiAgLy8gICAgICBub3RlIDE6IGRlZmF1bHQpIFNPUlRfUkVHVUxBUiBmbGFnIGRpc3Rpbmd1aXNoZXMgYnkga2V5IHR5cGUsXG4gIC8vICAgICAgbm90ZSAxOiBpZiB0aGUgY29udGVudCBpcyBhIG51bWVyaWMgc3RyaW5nLCB3ZSB0cmVhdCB0aGVcbiAgLy8gICAgICBub3RlIDE6IFwib3JpZ2luYWwgdHlwZVwiIGFzIG51bWVyaWMuXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGFyciA9IFsnS2V2aW4nLCAndmFuJywgJ1pvbm5ldmVsZCddXG4gIC8vICAgZXhhbXBsZSAxOiByc29ydCgkYXJyKVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRyZXN1bHQgPSAkYXJyXG4gIC8vICAgcmV0dXJucyAxOiBbJ3ZhbicsICdab25uZXZlbGQnLCAnS2V2aW4nXVxuICAvLyAgIGV4YW1wbGUgMjogaW5pX3NldCgnbG9jdXR1cy5zb3J0QnlSZWZlcmVuY2UnLCB0cnVlKVxuICAvLyAgIGV4YW1wbGUgMjogdmFyICRmcnVpdHMgPSB7ZDogJ2xlbW9uJywgYTogJ29yYW5nZScsIGI6ICdiYW5hbmEnLCBjOiAnYXBwbGUnfVxuICAvLyAgIGV4YW1wbGUgMjogcnNvcnQoJGZydWl0cylcbiAgLy8gICBleGFtcGxlIDI6IHZhciAkcmVzdWx0ID0gJGZydWl0c1xuICAvLyAgIHJldHVybnMgMjogezA6ICdvcmFuZ2UnLCAxOiAnbGVtb24nLCAyOiAnYmFuYW5hJywgMzogJ2FwcGxlJ31cbiAgLy8gICAgICAgIHRlc3Q6IHNraXAtMVxuXG4gIHZhciBpMThubGdkID0gcmVxdWlyZSgnLi4vaTE4bi9pMThuX2xvY19nZXRfZGVmYXVsdCcpO1xuICB2YXIgc3RybmF0Y21wID0gcmVxdWlyZSgnLi4vc3RyaW5ncy9zdHJuYXRjbXAnKTtcblxuICB2YXIgc29ydGVyO1xuICB2YXIgaTtcbiAgdmFyIGs7XG4gIHZhciBzb3J0QnlSZWZlcmVuY2UgPSBmYWxzZTtcbiAgdmFyIHBvcHVsYXRlQXJyID0ge307XG5cbiAgdmFyICRnbG9iYWwgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbDtcbiAgJGdsb2JhbC4kbG9jdXR1cyA9ICRnbG9iYWwuJGxvY3V0dXMgfHwge307XG4gIHZhciAkbG9jdXR1cyA9ICRnbG9iYWwuJGxvY3V0dXM7XG4gICRsb2N1dHVzLnBocCA9ICRsb2N1dHVzLnBocCB8fCB7fTtcbiAgJGxvY3V0dXMucGhwLmxvY2FsZXMgPSAkbG9jdXR1cy5waHAubG9jYWxlcyB8fCB7fTtcblxuICBzd2l0Y2ggKHNvcnRGbGFncykge1xuICAgIGNhc2UgJ1NPUlRfU1RSSU5HJzpcbiAgICAgIC8vIGNvbXBhcmUgaXRlbXMgYXMgc3RyaW5nc1xuICAgICAgc29ydGVyID0gZnVuY3Rpb24gc29ydGVyKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIHN0cm5hdGNtcChiLCBhKTtcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlICdTT1JUX0xPQ0FMRV9TVFJJTkcnOlxuICAgICAgLy8gY29tcGFyZSBpdGVtcyBhcyBzdHJpbmdzLCBiYXNlZCBvbiB0aGUgY3VycmVudCBsb2NhbGVcbiAgICAgIC8vIChzZXQgd2l0aCBpMThuX2xvY19zZXRfZGVmYXVsdCgpIGFzIG9mIFBIUDYpXG4gICAgICB2YXIgbG9jID0gaTE4bmxnZCgpO1xuICAgICAgc29ydGVyID0gJGxvY3V0dXMubG9jYWxlc1tsb2NdLnNvcnRpbmc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdTT1JUX05VTUVSSUMnOlxuICAgICAgLy8gY29tcGFyZSBpdGVtcyBudW1lcmljYWxseVxuICAgICAgc29ydGVyID0gZnVuY3Rpb24gc29ydGVyKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGIgLSBhO1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1NPUlRfUkVHVUxBUic6XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIGNvbXBhcmUgaXRlbXMgbm9ybWFsbHkgKGRvbid0IGNoYW5nZSB0eXBlcylcbiAgICAgIHNvcnRlciA9IGZ1bmN0aW9uIHNvcnRlcihiLCBhKSB7XG4gICAgICAgIHZhciBhRmxvYXQgPSBwYXJzZUZsb2F0KGEpO1xuICAgICAgICB2YXIgYkZsb2F0ID0gcGFyc2VGbG9hdChiKTtcbiAgICAgICAgdmFyIGFOdW1lcmljID0gYUZsb2F0ICsgJycgPT09IGE7XG4gICAgICAgIHZhciBiTnVtZXJpYyA9IGJGbG9hdCArICcnID09PSBiO1xuICAgICAgICBpZiAoYU51bWVyaWMgJiYgYk51bWVyaWMpIHtcbiAgICAgICAgICByZXR1cm4gYUZsb2F0ID4gYkZsb2F0ID8gMSA6IGFGbG9hdCA8IGJGbG9hdCA/IC0xIDogMDtcbiAgICAgICAgfSBlbHNlIGlmIChhTnVtZXJpYyAmJiAhYk51bWVyaWMpIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIGlmICghYU51bWVyaWMgJiYgYk51bWVyaWMpIHtcbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGEgPiBiID8gMSA6IGEgPCBiID8gLTEgOiAwO1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgdmFyIGluaVZhbCA9ICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCcuLi9pbmZvL2luaV9nZXQnKSgnbG9jdXR1cy5zb3J0QnlSZWZlcmVuY2UnKSA6IHVuZGVmaW5lZCkgfHwgJ29uJztcbiAgc29ydEJ5UmVmZXJlbmNlID0gaW5pVmFsID09PSAnb24nO1xuICBwb3B1bGF0ZUFyciA9IHNvcnRCeVJlZmVyZW5jZSA/IGlucHV0QXJyIDogcG9wdWxhdGVBcnI7XG4gIHZhciB2YWxBcnIgPSBbXTtcblxuICBmb3IgKGsgaW4gaW5wdXRBcnIpIHtcbiAgICAvLyBHZXQga2V5IGFuZCB2YWx1ZSBhcnJheXNcbiAgICBpZiAoaW5wdXRBcnIuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgIHZhbEFyci5wdXNoKGlucHV0QXJyW2tdKTtcbiAgICAgIGlmIChzb3J0QnlSZWZlcmVuY2UpIHtcbiAgICAgICAgZGVsZXRlIGlucHV0QXJyW2tdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhbEFyci5zb3J0KHNvcnRlcik7XG5cbiAgZm9yIChpID0gMDsgaSA8IHZhbEFyci5sZW5ndGg7IGkrKykge1xuICAgIC8vIFJlcG9wdWxhdGUgdGhlIG9sZCBhcnJheVxuICAgIHBvcHVsYXRlQXJyW2ldID0gdmFsQXJyW2ldO1xuICB9XG5cbiAgcmV0dXJuIHNvcnRCeVJlZmVyZW5jZSB8fCBwb3B1bGF0ZUFycjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yc29ydC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2h1ZmZsZShpbnB1dEFycikge1xuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL3NodWZmbGUvXG4gIC8vIG9yaWdpbmFsIGJ5OiBKb25hcyBSYW9uaSBTb2FyZXMgU2lsdmEgKGh0dHA6Ly93d3cuanNmcm9taGVsbC5jb20pXG4gIC8vICByZXZpc2VkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va3Z6LmlvKVxuICAvLyAgcmV2aXNlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gaW1wcm92ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGRhdGEgPSB7NTonYScsIDI6JzMnLCAzOidjJywgNDo1LCAncSc6NX1cbiAgLy8gICBleGFtcGxlIDE6IGluaV9zZXQoJ2xvY3V0dXMuc29ydEJ5UmVmZXJlbmNlJywgdHJ1ZSlcbiAgLy8gICBleGFtcGxlIDE6IHNodWZmbGUoJGRhdGEpXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJHJlc3VsdCA9ICRkYXRhLnFcbiAgLy8gICByZXR1cm5zIDE6IDVcblxuICB2YXIgdmFsQXJyID0gW107XG4gIHZhciBrID0gJyc7XG4gIHZhciBpID0gMDtcbiAgdmFyIHNvcnRCeVJlZmVyZW5jZSA9IGZhbHNlO1xuICB2YXIgcG9wdWxhdGVBcnIgPSBbXTtcblxuICBmb3IgKGsgaW4gaW5wdXRBcnIpIHtcbiAgICAvLyBHZXQga2V5IGFuZCB2YWx1ZSBhcnJheXNcbiAgICBpZiAoaW5wdXRBcnIuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgIHZhbEFyci5wdXNoKGlucHV0QXJyW2tdKTtcbiAgICAgIGlmIChzb3J0QnlSZWZlcmVuY2UpIHtcbiAgICAgICAgZGVsZXRlIGlucHV0QXJyW2tdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB2YWxBcnIuc29ydChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIDAuNSAtIE1hdGgucmFuZG9tKCk7XG4gIH0pO1xuXG4gIHZhciBpbmlWYWwgPSAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnID8gcmVxdWlyZSgnLi4vaW5mby9pbmlfZ2V0JykoJ2xvY3V0dXMuc29ydEJ5UmVmZXJlbmNlJykgOiB1bmRlZmluZWQpIHx8ICdvbic7XG4gIHNvcnRCeVJlZmVyZW5jZSA9IGluaVZhbCA9PT0gJ29uJztcbiAgcG9wdWxhdGVBcnIgPSBzb3J0QnlSZWZlcmVuY2UgPyBpbnB1dEFyciA6IHBvcHVsYXRlQXJyO1xuXG4gIGZvciAoaSA9IDA7IGkgPCB2YWxBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBSZXBvcHVsYXRlIHRoZSBvbGQgYXJyYXlcbiAgICBwb3B1bGF0ZUFycltpXSA9IHZhbEFycltpXTtcbiAgfVxuXG4gIHJldHVybiBzb3J0QnlSZWZlcmVuY2UgfHwgcG9wdWxhdGVBcnI7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2h1ZmZsZS5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2l6ZW9mKG1peGVkVmFyLCBtb2RlKSB7XG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvc2l6ZW9mL1xuICAvLyBvcmlnaW5hbCBieTogUGhpbGlwIFBldGVyc29uXG4gIC8vICAgZXhhbXBsZSAxOiBzaXplb2YoW1swLDBdLFswLC00XV0sICdDT1VOVF9SRUNVUlNJVkUnKVxuICAvLyAgIHJldHVybnMgMTogNlxuICAvLyAgIGV4YW1wbGUgMjogc2l6ZW9mKHsnb25lJyA6IFsxLDIsMyw0LDVdfSwgJ0NPVU5UX1JFQ1VSU0lWRScpXG4gIC8vICAgcmV0dXJucyAyOiA2XG5cbiAgdmFyIGNvdW50ID0gcmVxdWlyZSgnLi4vYXJyYXkvY291bnQnKTtcblxuICByZXR1cm4gY291bnQobWl4ZWRWYXIsIG1vZGUpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpemVvZi5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc29ydChpbnB1dEFyciwgc29ydEZsYWdzKSB7XG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvc29ydC9cbiAgLy8gb3JpZ2luYWwgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rdnouaW8pXG4gIC8vICByZXZpc2VkIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBpbXByb3ZlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgICBub3RlIDE6IFNPUlRfU1RSSU5HIChhcyB3ZWxsIGFzIG5hdHNvcnQgYW5kIG5hdGNhc2Vzb3J0KSBtaWdodCBhbHNvIGJlXG4gIC8vICAgICAgbm90ZSAxOiBpbnRlZ3JhdGVkIGludG8gYWxsIG9mIHRoZXNlIGZ1bmN0aW9ucyBieSBhZGFwdGluZyB0aGUgY29kZSBhdFxuICAvLyAgICAgIG5vdGUgMTogaHR0cDovL3NvdXJjZWZyb2cubmV0L3Byb2plY3RzL25hdHNvcnQvbmF0Y29tcGFyZS5qc1xuICAvLyAgICAgIG5vdGUgMTogVGhpcyBmdW5jdGlvbiBkZXZpYXRlcyBmcm9tIFBIUCBpbiByZXR1cm5pbmcgYSBjb3B5IG9mIHRoZSBhcnJheSBpbnN0ZWFkXG4gIC8vICAgICAgbm90ZSAxOiBvZiBhY3RpbmcgYnkgcmVmZXJlbmNlIGFuZCByZXR1cm5pbmcgdHJ1ZTsgdGhpcyB3YXMgbmVjZXNzYXJ5IGJlY2F1c2VcbiAgLy8gICAgICBub3RlIDE6IElFIGRvZXMgbm90IGFsbG93IGRlbGV0aW5nIGFuZCByZS1hZGRpbmcgb2YgcHJvcGVydGllcyB3aXRob3V0IGNhY2hpbmdcbiAgLy8gICAgICBub3RlIDE6IG9mIHByb3BlcnR5IHBvc2l0aW9uOyB5b3UgY2FuIHNldCB0aGUgaW5pIG9mIFwibG9jdXR1cy5zb3J0QnlSZWZlcmVuY2VcIiB0byB0cnVlIHRvXG4gIC8vICAgICAgbm90ZSAxOiBnZXQgdGhlIFBIUCBiZWhhdmlvciwgYnV0IHVzZSB0aGlzIG9ubHkgaWYgeW91IGFyZSBpbiBhbiBlbnZpcm9ubWVudFxuICAvLyAgICAgIG5vdGUgMTogc3VjaCBhcyBGaXJlZm94IGV4dGVuc2lvbnMgd2hlcmUgZm9yLWluIGl0ZXJhdGlvbiBvcmRlciBpcyBmaXhlZCBhbmQgdHJ1ZVxuICAvLyAgICAgIG5vdGUgMTogcHJvcGVydHkgZGVsZXRpb24gaXMgc3VwcG9ydGVkLiBOb3RlIHRoYXQgd2UgaW50ZW5kIHRvIGltcGxlbWVudCB0aGUgUEhQXG4gIC8vICAgICAgbm90ZSAxOiBiZWhhdmlvciBieSBkZWZhdWx0IGlmIElFIGV2ZXIgZG9lcyBhbGxvdyBpdDsgb25seSBnaXZlcyBzaGFsbG93IGNvcHkgc2luY2VcbiAgLy8gICAgICBub3RlIDE6IGlzIGJ5IHJlZmVyZW5jZSBpbiBQSFAgYW55d2F5c1xuICAvLyAgICAgIG5vdGUgMTogU2luY2UgSlMgb2JqZWN0cycga2V5cyBhcmUgYWx3YXlzIHN0cmluZ3MsIGFuZCAodGhlXG4gIC8vICAgICAgbm90ZSAxOiBkZWZhdWx0KSBTT1JUX1JFR1VMQVIgZmxhZyBkaXN0aW5ndWlzaGVzIGJ5IGtleSB0eXBlLFxuICAvLyAgICAgIG5vdGUgMTogaWYgdGhlIGNvbnRlbnQgaXMgYSBudW1lcmljIHN0cmluZywgd2UgdHJlYXQgdGhlXG4gIC8vICAgICAgbm90ZSAxOiBcIm9yaWdpbmFsIHR5cGVcIiBhcyBudW1lcmljLlxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRhcnIgPSBbJ0tldmluJywgJ3ZhbicsICdab25uZXZlbGQnXVxuICAvLyAgIGV4YW1wbGUgMTogc29ydCgkYXJyKVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRyZXN1bHQgPSAkYXJyXG4gIC8vICAgcmV0dXJucyAxOiBbJ0tldmluJywgJ1pvbm5ldmVsZCcsICd2YW4nXVxuICAvLyAgIGV4YW1wbGUgMjogaW5pX3NldCgnbG9jdXR1cy5zb3J0QnlSZWZlcmVuY2UnLCB0cnVlKVxuICAvLyAgIGV4YW1wbGUgMjogdmFyICRmcnVpdHMgPSB7ZDogJ2xlbW9uJywgYTogJ29yYW5nZScsIGI6ICdiYW5hbmEnLCBjOiAnYXBwbGUnfVxuICAvLyAgIGV4YW1wbGUgMjogc29ydCgkZnJ1aXRzKVxuICAvLyAgIGV4YW1wbGUgMjogdmFyICRyZXN1bHQgPSAkZnJ1aXRzXG4gIC8vICAgcmV0dXJucyAyOiB7MDogJ2FwcGxlJywgMTogJ2JhbmFuYScsIDI6ICdsZW1vbicsIDM6ICdvcmFuZ2UnfVxuICAvLyAgICAgICAgdGVzdDogc2tpcC0xXG5cbiAgdmFyIGkxOG5sZ2QgPSByZXF1aXJlKCcuLi9pMThuL2kxOG5fbG9jX2dldF9kZWZhdWx0Jyk7XG5cbiAgdmFyIHNvcnRlcjtcbiAgdmFyIGk7XG4gIHZhciBrO1xuICB2YXIgc29ydEJ5UmVmZXJlbmNlID0gZmFsc2U7XG4gIHZhciBwb3B1bGF0ZUFyciA9IHt9O1xuXG4gIHZhciAkZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWw7XG4gICRnbG9iYWwuJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzIHx8IHt9O1xuICB2YXIgJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzO1xuICAkbG9jdXR1cy5waHAgPSAkbG9jdXR1cy5waHAgfHwge307XG4gICRsb2N1dHVzLnBocC5sb2NhbGVzID0gJGxvY3V0dXMucGhwLmxvY2FsZXMgfHwge307XG5cbiAgc3dpdGNoIChzb3J0RmxhZ3MpIHtcbiAgICBjYXNlICdTT1JUX1NUUklORyc6XG4gICAgICAvLyBjb21wYXJlIGl0ZW1zIGFzIHN0cmluZ3NcbiAgICAgIC8vIGxlYXZlIHNvcnRlciB1bmRlZmluZWQsIHNvIGJ1aWx0LWluIGNvbXBhcmlzb24gaXMgdXNlZFxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnU09SVF9MT0NBTEVfU1RSSU5HJzpcbiAgICAgIC8vIGNvbXBhcmUgaXRlbXMgYXMgc3RyaW5ncywgYmFzZWQgb24gdGhlIGN1cnJlbnQgbG9jYWxlXG4gICAgICAvLyAoc2V0IHdpdGggaTE4bl9sb2Nfc2V0X2RlZmF1bHQoKSBhcyBvZiBQSFA2KVxuICAgICAgdmFyIGxvYyA9ICRsb2N1dHVzLnBocC5sb2NhbGVzW2kxOG5sZ2QoKV07XG5cbiAgICAgIGlmIChsb2MgJiYgbG9jLnNvcnRpbmcpIHtcbiAgICAgICAgLy8gaWYgc29ydGluZyBleGlzdHMgb24gbG9jYWxlIG9iamVjdCwgdXNlIGl0XG4gICAgICAgIC8vIG90aGVyd2lzZSBsZXQgc29ydGVyIGJlIHVuZGVmaW5lZFxuICAgICAgICAvLyB0byBmYWxsYmFjayB0byBidWlsdC1pbiBiZWhhdmlvclxuICAgICAgICBzb3J0ZXIgPSBsb2Muc29ydGluZztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1NPUlRfTlVNRVJJQyc6XG4gICAgICAvLyBjb21wYXJlIGl0ZW1zIG51bWVyaWNhbGx5XG4gICAgICBzb3J0ZXIgPSBmdW5jdGlvbiBzb3J0ZXIoYSwgYikge1xuICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnU09SVF9SRUdVTEFSJzpcbiAgICBkZWZhdWx0OlxuICAgICAgc29ydGVyID0gZnVuY3Rpb24gc29ydGVyKGEsIGIpIHtcbiAgICAgICAgdmFyIGFGbG9hdCA9IHBhcnNlRmxvYXQoYSk7XG4gICAgICAgIHZhciBiRmxvYXQgPSBwYXJzZUZsb2F0KGIpO1xuICAgICAgICB2YXIgYU51bWVyaWMgPSBhRmxvYXQgKyAnJyA9PT0gYTtcbiAgICAgICAgdmFyIGJOdW1lcmljID0gYkZsb2F0ICsgJycgPT09IGI7XG5cbiAgICAgICAgaWYgKGFOdW1lcmljICYmIGJOdW1lcmljKSB7XG4gICAgICAgICAgcmV0dXJuIGFGbG9hdCA+IGJGbG9hdCA/IDEgOiBhRmxvYXQgPCBiRmxvYXQgPyAtMSA6IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoYU51bWVyaWMgJiYgIWJOdW1lcmljKSB7XG4gICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSBpZiAoIWFOdW1lcmljICYmIGJOdW1lcmljKSB7XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGEgPiBiID8gMSA6IGEgPCBiID8gLTEgOiAwO1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgdmFyIGluaVZhbCA9ICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCcuLi9pbmZvL2luaV9nZXQnKSgnbG9jdXR1cy5zb3J0QnlSZWZlcmVuY2UnKSA6IHVuZGVmaW5lZCkgfHwgJ29uJztcbiAgc29ydEJ5UmVmZXJlbmNlID0gaW5pVmFsID09PSAnb24nO1xuICBwb3B1bGF0ZUFyciA9IHNvcnRCeVJlZmVyZW5jZSA/IGlucHV0QXJyIDogcG9wdWxhdGVBcnI7XG5cbiAgdmFyIHZhbEFyciA9IFtdO1xuICBmb3IgKGsgaW4gaW5wdXRBcnIpIHtcbiAgICAvLyBHZXQga2V5IGFuZCB2YWx1ZSBhcnJheXNcbiAgICBpZiAoaW5wdXRBcnIuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgIHZhbEFyci5wdXNoKGlucHV0QXJyW2tdKTtcbiAgICAgIGlmIChzb3J0QnlSZWZlcmVuY2UpIHtcbiAgICAgICAgZGVsZXRlIGlucHV0QXJyW2tdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhbEFyci5zb3J0KHNvcnRlcik7XG5cbiAgZm9yIChpID0gMDsgaSA8IHZhbEFyci5sZW5ndGg7IGkrKykge1xuICAgIC8vIFJlcG9wdWxhdGUgdGhlIG9sZCBhcnJheVxuICAgIHBvcHVsYXRlQXJyW2ldID0gdmFsQXJyW2ldO1xuICB9XG4gIHJldHVybiBzb3J0QnlSZWZlcmVuY2UgfHwgcG9wdWxhdGVBcnI7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c29ydC5qcy5tYXAiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdWFzb3J0KGlucHV0QXJyLCBzb3J0ZXIpIHtcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC91YXNvcnQvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBpbXByb3ZlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gaW1wcm92ZWQgYnk6IFRoZXJpYXVsdCAoaHR0cHM6Ly9naXRodWIuY29tL1RoZXJpYXVsdClcbiAgLy8gICAgICBub3RlIDE6IFRoaXMgZnVuY3Rpb24gZGV2aWF0ZXMgZnJvbSBQSFAgaW4gcmV0dXJuaW5nIGEgY29weSBvZiB0aGUgYXJyYXkgaW5zdGVhZFxuICAvLyAgICAgIG5vdGUgMTogb2YgYWN0aW5nIGJ5IHJlZmVyZW5jZSBhbmQgcmV0dXJuaW5nIHRydWU7IHRoaXMgd2FzIG5lY2Vzc2FyeSBiZWNhdXNlXG4gIC8vICAgICAgbm90ZSAxOiBJRSBkb2VzIG5vdCBhbGxvdyBkZWxldGluZyBhbmQgcmUtYWRkaW5nIG9mIHByb3BlcnRpZXMgd2l0aG91dCBjYWNoaW5nXG4gIC8vICAgICAgbm90ZSAxOiBvZiBwcm9wZXJ0eSBwb3NpdGlvbjsgeW91IGNhbiBzZXQgdGhlIGluaSBvZiBcImxvY3V0dXMuc29ydEJ5UmVmZXJlbmNlXCIgdG8gdHJ1ZSB0b1xuICAvLyAgICAgIG5vdGUgMTogZ2V0IHRoZSBQSFAgYmVoYXZpb3IsIGJ1dCB1c2UgdGhpcyBvbmx5IGlmIHlvdSBhcmUgaW4gYW4gZW52aXJvbm1lbnRcbiAgLy8gICAgICBub3RlIDE6IHN1Y2ggYXMgRmlyZWZveCBleHRlbnNpb25zIHdoZXJlIGZvci1pbiBpdGVyYXRpb24gb3JkZXIgaXMgZml4ZWQgYW5kIHRydWVcbiAgLy8gICAgICBub3RlIDE6IHByb3BlcnR5IGRlbGV0aW9uIGlzIHN1cHBvcnRlZC4gTm90ZSB0aGF0IHdlIGludGVuZCB0byBpbXBsZW1lbnQgdGhlIFBIUFxuICAvLyAgICAgIG5vdGUgMTogYmVoYXZpb3IgYnkgZGVmYXVsdCBpZiBJRSBldmVyIGRvZXMgYWxsb3cgaXQ7IG9ubHkgZ2l2ZXMgc2hhbGxvdyBjb3B5IHNpbmNlXG4gIC8vICAgICAgbm90ZSAxOiBpcyBieSByZWZlcmVuY2UgaW4gUEhQIGFueXdheXNcbiAgLy8gICBleGFtcGxlIDE6IHZhciAkc29ydGVyID0gZnVuY3Rpb24gKGEsIGIpIHsgaWYgKGEgPiBiKSB7cmV0dXJuIDE7fWlmIChhIDwgYikge3JldHVybiAtMTt9IHJldHVybiAwO31cbiAgLy8gICBleGFtcGxlIDE6IHZhciAkZnJ1aXRzID0ge2Q6ICdsZW1vbicsIGE6ICdvcmFuZ2UnLCBiOiAnYmFuYW5hJywgYzogJ2FwcGxlJ31cbiAgLy8gICBleGFtcGxlIDE6IHVhc29ydCgkZnJ1aXRzLCAkc29ydGVyKVxuICAvLyAgIGV4YW1wbGUgMTogdmFyICRyZXN1bHQgPSAkZnJ1aXRzXG4gIC8vICAgcmV0dXJucyAxOiB7YzogJ2FwcGxlJywgYjogJ2JhbmFuYScsIGQ6ICdsZW1vbicsIGE6ICdvcmFuZ2UnfVxuXG4gIHZhciB2YWxBcnIgPSBbXTtcbiAgdmFyIGsgPSAnJztcbiAgdmFyIGkgPSAwO1xuICB2YXIgc29ydEJ5UmVmZXJlbmNlID0gZmFsc2U7XG4gIHZhciBwb3B1bGF0ZUFyciA9IHt9O1xuXG4gIGlmICh0eXBlb2Ygc29ydGVyID09PSAnc3RyaW5nJykge1xuICAgIHNvcnRlciA9IHRoaXNbc29ydGVyXTtcbiAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc29ydGVyKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgIHNvcnRlciA9IHRoaXNbc29ydGVyWzBdXVtzb3J0ZXJbMV1dO1xuICB9XG5cbiAgdmFyIGluaVZhbCA9ICh0eXBlb2YgcmVxdWlyZSAhPT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCcuLi9pbmZvL2luaV9nZXQnKSgnbG9jdXR1cy5zb3J0QnlSZWZlcmVuY2UnKSA6IHVuZGVmaW5lZCkgfHwgJ29uJztcbiAgc29ydEJ5UmVmZXJlbmNlID0gaW5pVmFsID09PSAnb24nO1xuICBwb3B1bGF0ZUFyciA9IHNvcnRCeVJlZmVyZW5jZSA/IGlucHV0QXJyIDogcG9wdWxhdGVBcnI7XG5cbiAgZm9yIChrIGluIGlucHV0QXJyKSB7XG4gICAgLy8gR2V0IGtleSBhbmQgdmFsdWUgYXJyYXlzXG4gICAgaWYgKGlucHV0QXJyLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICB2YWxBcnIucHVzaChbaywgaW5wdXRBcnJba11dKTtcbiAgICAgIGlmIChzb3J0QnlSZWZlcmVuY2UpIHtcbiAgICAgICAgZGVsZXRlIGlucHV0QXJyW2tdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB2YWxBcnIuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBzb3J0ZXIoYVsxXSwgYlsxXSk7XG4gIH0pO1xuXG4gIGZvciAoaSA9IDA7IGkgPCB2YWxBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBSZXBvcHVsYXRlIHRoZSBvbGQgYXJyYXlcbiAgICBwb3B1bGF0ZUFyclt2YWxBcnJbaV1bMF1dID0gdmFsQXJyW2ldWzFdO1xuICB9XG5cbiAgcmV0dXJuIHNvcnRCeVJlZmVyZW5jZSB8fCBwb3B1bGF0ZUFycjtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11YXNvcnQuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHVrc29ydChpbnB1dEFyciwgc29ydGVyKSB7XG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvdWtzb3J0L1xuICAvLyBvcmlnaW5hbCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gaW1wcm92ZWQgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgICAgbm90ZSAxOiBUaGUgZXhhbXBsZXMgYXJlIGNvcnJlY3QsIHRoaXMgaXMgYSBuZXcgd2F5XG4gIC8vICAgICAgbm90ZSAxOiBUaGlzIGZ1bmN0aW9uIGRldmlhdGVzIGZyb20gUEhQIGluIHJldHVybmluZyBhIGNvcHkgb2YgdGhlIGFycmF5IGluc3RlYWRcbiAgLy8gICAgICBub3RlIDE6IG9mIGFjdGluZyBieSByZWZlcmVuY2UgYW5kIHJldHVybmluZyB0cnVlOyB0aGlzIHdhcyBuZWNlc3NhcnkgYmVjYXVzZVxuICAvLyAgICAgIG5vdGUgMTogSUUgZG9lcyBub3QgYWxsb3cgZGVsZXRpbmcgYW5kIHJlLWFkZGluZyBvZiBwcm9wZXJ0aWVzIHdpdGhvdXQgY2FjaGluZ1xuICAvLyAgICAgIG5vdGUgMTogb2YgcHJvcGVydHkgcG9zaXRpb247IHlvdSBjYW4gc2V0IHRoZSBpbmkgb2YgXCJsb2N1dHVzLnNvcnRCeVJlZmVyZW5jZVwiIHRvIHRydWUgdG9cbiAgLy8gICAgICBub3RlIDE6IGdldCB0aGUgUEhQIGJlaGF2aW9yLCBidXQgdXNlIHRoaXMgb25seSBpZiB5b3UgYXJlIGluIGFuIGVudmlyb25tZW50XG4gIC8vICAgICAgbm90ZSAxOiBzdWNoIGFzIEZpcmVmb3ggZXh0ZW5zaW9ucyB3aGVyZSBmb3ItaW4gaXRlcmF0aW9uIG9yZGVyIGlzIGZpeGVkIGFuZCB0cnVlXG4gIC8vICAgICAgbm90ZSAxOiBwcm9wZXJ0eSBkZWxldGlvbiBpcyBzdXBwb3J0ZWQuIE5vdGUgdGhhdCB3ZSBpbnRlbmQgdG8gaW1wbGVtZW50IHRoZSBQSFBcbiAgLy8gICAgICBub3RlIDE6IGJlaGF2aW9yIGJ5IGRlZmF1bHQgaWYgSUUgZXZlciBkb2VzIGFsbG93IGl0OyBvbmx5IGdpdmVzIHNoYWxsb3cgY29weSBzaW5jZVxuICAvLyAgICAgIG5vdGUgMTogaXMgYnkgcmVmZXJlbmNlIGluIFBIUCBhbnl3YXlzXG4gIC8vICAgZXhhbXBsZSAxOiB2YXIgJGRhdGEgPSB7ZDogJ2xlbW9uJywgYTogJ29yYW5nZScsIGI6ICdiYW5hbmEnLCBjOiAnYXBwbGUnfVxuICAvLyAgIGV4YW1wbGUgMTogdWtzb3J0KCRkYXRhLCBmdW5jdGlvbiAoa2V5MSwga2V5Mil7IHJldHVybiAoa2V5MSA9PT0ga2V5MiA/IDAgOiAoa2V5MSA+IGtleTIgPyAxIDogLTEpKTsgfSlcbiAgLy8gICBleGFtcGxlIDE6IHZhciAkcmVzdWx0ID0gJGRhdGFcbiAgLy8gICByZXR1cm5zIDE6IHthOiAnb3JhbmdlJywgYjogJ2JhbmFuYScsIGM6ICdhcHBsZScsIGQ6ICdsZW1vbid9XG5cbiAgdmFyIHRtcEFyciA9IHt9O1xuICB2YXIga2V5cyA9IFtdO1xuICB2YXIgaSA9IDA7XG4gIHZhciBrID0gJyc7XG4gIHZhciBzb3J0QnlSZWZlcmVuY2UgPSBmYWxzZTtcbiAgdmFyIHBvcHVsYXRlQXJyID0ge307XG5cbiAgaWYgKHR5cGVvZiBzb3J0ZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgc29ydGVyID0gdGhpcy53aW5kb3dbc29ydGVyXTtcbiAgfVxuXG4gIC8vIE1ha2UgYSBsaXN0IG9mIGtleSBuYW1lc1xuICBmb3IgKGsgaW4gaW5wdXRBcnIpIHtcbiAgICBpZiAoaW5wdXRBcnIuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgIGtleXMucHVzaChrKTtcbiAgICB9XG4gIH1cblxuICAvLyBTb3J0IGtleSBuYW1lc1xuICB0cnkge1xuICAgIGlmIChzb3J0ZXIpIHtcbiAgICAgIGtleXMuc29ydChzb3J0ZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrZXlzLnNvcnQoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgaW5pVmFsID0gKHR5cGVvZiByZXF1aXJlICE9PSAndW5kZWZpbmVkJyA/IHJlcXVpcmUoJy4uL2luZm8vaW5pX2dldCcpKCdsb2N1dHVzLnNvcnRCeVJlZmVyZW5jZScpIDogdW5kZWZpbmVkKSB8fCAnb24nO1xuICBzb3J0QnlSZWZlcmVuY2UgPSBpbmlWYWwgPT09ICdvbic7XG4gIHBvcHVsYXRlQXJyID0gc29ydEJ5UmVmZXJlbmNlID8gaW5wdXRBcnIgOiBwb3B1bGF0ZUFycjtcblxuICAvLyBSZWJ1aWxkIGFycmF5IHdpdGggc29ydGVkIGtleSBuYW1lc1xuICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGsgPSBrZXlzW2ldO1xuICAgIHRtcEFycltrXSA9IGlucHV0QXJyW2tdO1xuICAgIGlmIChzb3J0QnlSZWZlcmVuY2UpIHtcbiAgICAgIGRlbGV0ZSBpbnB1dEFycltrXTtcbiAgICB9XG4gIH1cbiAgZm9yIChpIGluIHRtcEFycikge1xuICAgIGlmICh0bXBBcnIuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIHBvcHVsYXRlQXJyW2ldID0gdG1wQXJyW2ldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzb3J0QnlSZWZlcmVuY2UgfHwgcG9wdWxhdGVBcnI7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dWtzb3J0LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB1c29ydChpbnB1dEFyciwgc29ydGVyKSB7XG4gIC8vICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvdXNvcnQvXG4gIC8vIG9yaWdpbmFsIGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAvLyBpbXByb3ZlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgICBub3RlIDE6IFRoaXMgZnVuY3Rpb24gZGV2aWF0ZXMgZnJvbSBQSFAgaW4gcmV0dXJuaW5nIGEgY29weSBvZiB0aGUgYXJyYXkgaW5zdGVhZFxuICAvLyAgICAgIG5vdGUgMTogb2YgYWN0aW5nIGJ5IHJlZmVyZW5jZSBhbmQgcmV0dXJuaW5nIHRydWU7IHRoaXMgd2FzIG5lY2Vzc2FyeSBiZWNhdXNlXG4gIC8vICAgICAgbm90ZSAxOiBJRSBkb2VzIG5vdCBhbGxvdyBkZWxldGluZyBhbmQgcmUtYWRkaW5nIG9mIHByb3BlcnRpZXMgd2l0aG91dCBjYWNoaW5nXG4gIC8vICAgICAgbm90ZSAxOiBvZiBwcm9wZXJ0eSBwb3NpdGlvbjsgeW91IGNhbiBzZXQgdGhlIGluaSBvZiBcImxvY3V0dXMuc29ydEJ5UmVmZXJlbmNlXCIgdG8gdHJ1ZSB0b1xuICAvLyAgICAgIG5vdGUgMTogZ2V0IHRoZSBQSFAgYmVoYXZpb3IsIGJ1dCB1c2UgdGhpcyBvbmx5IGlmIHlvdSBhcmUgaW4gYW4gZW52aXJvbm1lbnRcbiAgLy8gICAgICBub3RlIDE6IHN1Y2ggYXMgRmlyZWZveCBleHRlbnNpb25zIHdoZXJlIGZvci1pbiBpdGVyYXRpb24gb3JkZXIgaXMgZml4ZWQgYW5kIHRydWVcbiAgLy8gICAgICBub3RlIDE6IHByb3BlcnR5IGRlbGV0aW9uIGlzIHN1cHBvcnRlZC4gTm90ZSB0aGF0IHdlIGludGVuZCB0byBpbXBsZW1lbnQgdGhlIFBIUFxuICAvLyAgICAgIG5vdGUgMTogYmVoYXZpb3IgYnkgZGVmYXVsdCBpZiBJRSBldmVyIGRvZXMgYWxsb3cgaXQ7IG9ubHkgZ2l2ZXMgc2hhbGxvdyBjb3B5IHNpbmNlXG4gIC8vICAgICAgbm90ZSAxOiBpcyBieSByZWZlcmVuY2UgaW4gUEhQIGFueXdheXNcbiAgLy8gICBleGFtcGxlIDE6IHZhciAkc3R1ZmYgPSB7ZDogJzMnLCBhOiAnMScsIGI6ICcxMScsIGM6ICc0J31cbiAgLy8gICBleGFtcGxlIDE6IHVzb3J0KCRzdHVmZiwgZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIChhIC0gYikgfSlcbiAgLy8gICBleGFtcGxlIDE6IHZhciAkcmVzdWx0ID0gJHN0dWZmXG4gIC8vICAgcmV0dXJucyAxOiB7MDogJzEnLCAxOiAnMycsIDI6ICc0JywgMzogJzExJ31cblxuICB2YXIgdmFsQXJyID0gW107XG4gIHZhciBrID0gJyc7XG4gIHZhciBpID0gMDtcbiAgdmFyIHNvcnRCeVJlZmVyZW5jZSA9IGZhbHNlO1xuICB2YXIgcG9wdWxhdGVBcnIgPSB7fTtcblxuICBpZiAodHlwZW9mIHNvcnRlciA9PT0gJ3N0cmluZycpIHtcbiAgICBzb3J0ZXIgPSB0aGlzW3NvcnRlcl07XG4gIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNvcnRlcikgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICBzb3J0ZXIgPSB0aGlzW3NvcnRlclswXV1bc29ydGVyWzFdXTtcbiAgfVxuXG4gIHZhciBpbmlWYWwgPSAodHlwZW9mIHJlcXVpcmUgIT09ICd1bmRlZmluZWQnID8gcmVxdWlyZSgnLi4vaW5mby9pbmlfZ2V0JykoJ2xvY3V0dXMuc29ydEJ5UmVmZXJlbmNlJykgOiB1bmRlZmluZWQpIHx8ICdvbic7XG4gIHNvcnRCeVJlZmVyZW5jZSA9IGluaVZhbCA9PT0gJ29uJztcbiAgcG9wdWxhdGVBcnIgPSBzb3J0QnlSZWZlcmVuY2UgPyBpbnB1dEFyciA6IHBvcHVsYXRlQXJyO1xuXG4gIGZvciAoayBpbiBpbnB1dEFycikge1xuICAgIC8vIEdldCBrZXkgYW5kIHZhbHVlIGFycmF5c1xuICAgIGlmIChpbnB1dEFyci5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgdmFsQXJyLnB1c2goaW5wdXRBcnJba10pO1xuICAgICAgaWYgKHNvcnRCeVJlZmVyZW5jZSkge1xuICAgICAgICBkZWxldGUgaW5wdXRBcnJba107XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHRyeSB7XG4gICAgdmFsQXJyLnNvcnQoc29ydGVyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgdmFsQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gUmVwb3B1bGF0ZSB0aGUgb2xkIGFycmF5XG4gICAgcG9wdWxhdGVBcnJbaV0gPSB2YWxBcnJbaV07XG4gIH1cblxuICByZXR1cm4gc29ydEJ5UmVmZXJlbmNlIHx8IHBvcHVsYXRlQXJyO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzb3J0LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpMThuX2xvY19nZXRfZGVmYXVsdCgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9pMThuX2xvY19nZXRfZGVmYXVsdC9cbiAgLy8gb3JpZ2luYWwgYnk6IEJyZXR0IFphbWlyIChodHRwOi8vYnJldHQtemFtaXIubWUpXG4gIC8vICAgICAgbm90ZSAxOiBSZW5hbWVkIGluIFBIUDYgZnJvbSBsb2NhbGVfZ2V0X2RlZmF1bHQoKS4gTm90IGxpc3RlZCB5ZXQgYXQgcGhwLm5ldC5cbiAgLy8gICAgICBub3RlIDE6IExpc3Qgb2YgbG9jYWxlcyBhdCA8aHR0cDovL2RlbW8uaWN1LXByb2plY3Qub3JnL2ljdS1iaW4vbG9jZXhwPlxuICAvLyAgICAgIG5vdGUgMTogVG8gYmUgdXNhYmxlIHdpdGggc29ydCgpIGlmIGl0IGlzIHBhc3NlZCB0aGUgYFNPUlRfTE9DQUxFX1NUUklOR2BcbiAgLy8gICAgICBub3RlIDE6IHNvcnRpbmcgZmxhZzogaHR0cDovL3BocC5uZXQvbWFudWFsL2VuL2Z1bmN0aW9uLnNvcnQucGhwXG4gIC8vICAgZXhhbXBsZSAxOiBpMThuX2xvY19nZXRfZGVmYXVsdCgpXG4gIC8vICAgcmV0dXJucyAxOiAnZW5fVVNfUE9TSVgnXG4gIC8vICAgZXhhbXBsZSAyOiBpMThuX2xvY19zZXRfZGVmYXVsdCgncHRfUFQnKVxuICAvLyAgIGV4YW1wbGUgMjogaTE4bl9sb2NfZ2V0X2RlZmF1bHQoKVxuICAvLyAgIHJldHVybnMgMjogJ3B0X1BUJ1xuXG4gIHZhciAkZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWw7XG4gICRnbG9iYWwuJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzIHx8IHt9O1xuICB2YXIgJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzO1xuICAkbG9jdXR1cy5waHAgPSAkbG9jdXR1cy5waHAgfHwge307XG4gICRsb2N1dHVzLnBocC5sb2NhbGVzID0gJGxvY3V0dXMucGhwLmxvY2FsZXMgfHwge307XG5cbiAgcmV0dXJuICRsb2N1dHVzLnBocC5sb2NhbGVfZGVmYXVsdCB8fCAnZW5fVVNfUE9TSVgnO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWkxOG5fbG9jX2dldF9kZWZhdWx0LmpzLm1hcCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmlfZ2V0KHZhcm5hbWUpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgLy8gIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9pbmlfZ2V0L1xuICAvLyBvcmlnaW5hbCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgICBub3RlIDE6IFRoZSBpbmkgdmFsdWVzIG11c3QgYmUgc2V0IGJ5IGluaV9zZXQgb3IgbWFudWFsbHkgd2l0aGluIGFuIGluaSBmaWxlXG4gIC8vICAgZXhhbXBsZSAxOiBpbmlfc2V0KCdkYXRlLnRpbWV6b25lJywgJ0FzaWEvSG9uZ19Lb25nJylcbiAgLy8gICBleGFtcGxlIDE6IGluaV9nZXQoJ2RhdGUudGltZXpvbmUnKVxuICAvLyAgIHJldHVybnMgMTogJ0FzaWEvSG9uZ19Lb25nJ1xuXG4gIHZhciAkZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWw7XG4gICRnbG9iYWwuJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzIHx8IHt9O1xuICB2YXIgJGxvY3V0dXMgPSAkZ2xvYmFsLiRsb2N1dHVzO1xuICAkbG9jdXR1cy5waHAgPSAkbG9jdXR1cy5waHAgfHwge307XG4gICRsb2N1dHVzLnBocC5pbmkgPSAkbG9jdXR1cy5waHAuaW5pIHx8IHt9O1xuXG4gIGlmICgkbG9jdXR1cy5waHAuaW5pW3Zhcm5hbWVdICYmICRsb2N1dHVzLnBocC5pbmlbdmFybmFtZV0ubG9jYWxfdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICgkbG9jdXR1cy5waHAuaW5pW3Zhcm5hbWVdLmxvY2FsX3ZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiAkbG9jdXR1cy5waHAuaW5pW3Zhcm5hbWVdLmxvY2FsX3ZhbHVlO1xuICB9XG5cbiAgcmV0dXJuICcnO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluaV9nZXQuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cm5hdGNhc2VjbXAoYSwgYikge1xuICAvLyAgICAgICBkaXNjdXNzIGF0OiBodHRwOi8vbG9jdXR1cy5pby9waHAvc3RybmF0Y2FzZWNtcC9cbiAgLy8gICAgICBvcmlnaW5hbCBieTogTWFydGluIFBvb2xcbiAgLy8gcmVpbXBsZW1lbnRlZCBieTogUGllcnJlLUx1YyBQYW91clxuICAvLyByZWltcGxlbWVudGVkIGJ5OiBLcmlzdG9mIENvb21hbnMgKFNDSy1DRU4gKEJlbGdpYW4gTnVjbGVhaXIgUmVzZWFyY2ggQ2VudHJlKSlcbiAgLy8gcmVpbXBsZW1lbnRlZCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcbiAgLy8gICAgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gICAgICAgICBpbnB1dCBieTogRGV2YW4gUGVubmVyLVdvZWxrXG4gIC8vICAgICAgaW1wcm92ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rdnouaW8pXG4gIC8vIHJlaW1wbGVtZW50ZWQgYnk6IFJhZmHFgiBLdWthd3NraVxuICAvLyAgICAgICAgZXhhbXBsZSAxOiBzdHJuYXRjYXNlY21wKDEwLCAxKVxuICAvLyAgICAgICAgcmV0dXJucyAxOiAxXG4gIC8vICAgICAgICBleGFtcGxlIDI6IHN0cm5hdGNhc2VjbXAoJzEnLCAnMTAnKVxuICAvLyAgICAgICAgcmV0dXJucyAyOiAtMVxuXG4gIHZhciBzdHJuYXRjbXAgPSByZXF1aXJlKCcuLi9zdHJpbmdzL3N0cm5hdGNtcCcpO1xuICB2YXIgX3BocENhc3RTdHJpbmcgPSByZXF1aXJlKCcuLi9faGVscGVycy9fcGhwQ2FzdFN0cmluZycpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoICE9PSAyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gc3RybmF0Y21wKF9waHBDYXN0U3RyaW5nKGEpLnRvTG93ZXJDYXNlKCksIF9waHBDYXN0U3RyaW5nKGIpLnRvTG93ZXJDYXNlKCkpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0cm5hdGNhc2VjbXAuanMubWFwIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cm5hdGNtcChhLCBiKSB7XG4gIC8vICAgICAgIGRpc2N1c3MgYXQ6IGh0dHA6Ly9sb2N1dHVzLmlvL3BocC9zdHJuYXRjbXAvXG4gIC8vICAgICAgb3JpZ2luYWwgYnk6IE1hcnRpam4gV2llcmluZ2FcbiAgLy8gICAgICBpbXByb3ZlZCBieTogTWljaGFlbCBXaGl0ZSAoaHR0cDovL2dldHNwcmluay5jb20pXG4gIC8vICAgICAgaW1wcm92ZWQgYnk6IEphY2tcbiAgLy8gICAgICBidWdmaXhlZCBieTogT25ubyBNYXJzbWFuIChodHRwczovL3R3aXR0ZXIuY29tL29ubm9tYXJzbWFuKVxuICAvLyByZWltcGxlbWVudGVkIGJ5OiBSYWZhxYIgS3VrYXdza2lcbiAgLy8gICAgICAgIGV4YW1wbGUgMTogc3RybmF0Y21wKCdhYmMnLCAnYWJjJylcbiAgLy8gICAgICAgIHJldHVybnMgMTogMFxuICAvLyAgICAgICAgZXhhbXBsZSAyOiBzdHJuYXRjbXAoJ2EnLCAnYicpXG4gIC8vICAgICAgICByZXR1cm5zIDI6IC0xXG4gIC8vICAgICAgICBleGFtcGxlIDM6IHN0cm5hdGNtcCgnMTAnLCAnMScpXG4gIC8vICAgICAgICByZXR1cm5zIDM6IDFcbiAgLy8gICAgICAgIGV4YW1wbGUgNDogc3RybmF0Y21wKCcwMDAwYWJjJywgJzBhYmMnKVxuICAvLyAgICAgICAgcmV0dXJucyA0OiAwXG4gIC8vICAgICAgICBleGFtcGxlIDU6IHN0cm5hdGNtcCgnMTIzOScsICcxMjM0NScpXG4gIC8vICAgICAgICByZXR1cm5zIDU6IC0xXG4gIC8vICAgICAgICBleGFtcGxlIDY6IHN0cm5hdGNtcCgndDAxMjM5JywgJ3QwMTIzNDUnKVxuICAvLyAgICAgICAgcmV0dXJucyA2OiAxXG4gIC8vICAgICAgICBleGFtcGxlIDc6IHN0cm5hdGNtcCgnMEEnLCAnNU4nKVxuICAvLyAgICAgICAgcmV0dXJucyA3OiAtMVxuXG4gIHZhciBfcGhwQ2FzdFN0cmluZyA9IHJlcXVpcmUoJy4uL19oZWxwZXJzL19waHBDYXN0U3RyaW5nJyk7XG5cbiAgdmFyIGxlYWRpbmdaZXJvcyA9IC9eMCsoPz1cXGQpLztcbiAgdmFyIHdoaXRlc3BhY2UgPSAvXlxccy87XG4gIHZhciBkaWdpdCA9IC9eXFxkLztcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPT0gMikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgYSA9IF9waHBDYXN0U3RyaW5nKGEpO1xuICBiID0gX3BocENhc3RTdHJpbmcoYik7XG5cbiAgaWYgKCFhLmxlbmd0aCB8fCAhYi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYS5sZW5ndGggLSBiLmxlbmd0aDtcbiAgfVxuXG4gIHZhciBpID0gMDtcbiAgdmFyIGogPSAwO1xuXG4gIGEgPSBhLnJlcGxhY2UobGVhZGluZ1plcm9zLCAnJyk7XG4gIGIgPSBiLnJlcGxhY2UobGVhZGluZ1plcm9zLCAnJyk7XG5cbiAgd2hpbGUgKGkgPCBhLmxlbmd0aCAmJiBqIDwgYi5sZW5ndGgpIHtcbiAgICAvLyBza2lwIGNvbnNlY3V0aXZlIHdoaXRlc3BhY2VcbiAgICB3aGlsZSAod2hpdGVzcGFjZS50ZXN0KGEuY2hhckF0KGkpKSkge1xuICAgICAgaSsrO1xuICAgIH13aGlsZSAod2hpdGVzcGFjZS50ZXN0KGIuY2hhckF0KGopKSkge1xuICAgICAgaisrO1xuICAgIH12YXIgYWMgPSBhLmNoYXJBdChpKTtcbiAgICB2YXIgYmMgPSBiLmNoYXJBdChqKTtcbiAgICB2YXIgYUlzRGlnaXQgPSBkaWdpdC50ZXN0KGFjKTtcbiAgICB2YXIgYklzRGlnaXQgPSBkaWdpdC50ZXN0KGJjKTtcblxuICAgIGlmIChhSXNEaWdpdCAmJiBiSXNEaWdpdCkge1xuICAgICAgdmFyIGJpYXMgPSAwO1xuICAgICAgdmFyIGZyYWN0aW9uYWwgPSBhYyA9PT0gJzAnIHx8IGJjID09PSAnMCc7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKCFhSXNEaWdpdCkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmICghYklzRGlnaXQpIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIGlmIChhYyA8IGJjKSB7XG4gICAgICAgICAgaWYgKCFiaWFzKSB7XG4gICAgICAgICAgICBiaWFzID0gLTE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGZyYWN0aW9uYWwpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYWMgPiBiYykge1xuICAgICAgICAgIGlmICghYmlhcykge1xuICAgICAgICAgICAgYmlhcyA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGZyYWN0aW9uYWwpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFjID0gYS5jaGFyQXQoKytpKTtcbiAgICAgICAgYmMgPSBiLmNoYXJBdCgrK2opO1xuXG4gICAgICAgIGFJc0RpZ2l0ID0gZGlnaXQudGVzdChhYyk7XG4gICAgICAgIGJJc0RpZ2l0ID0gZGlnaXQudGVzdChiYyk7XG4gICAgICB9IHdoaWxlIChhSXNEaWdpdCB8fCBiSXNEaWdpdCk7XG5cbiAgICAgIGlmICghZnJhY3Rpb25hbCAmJiBiaWFzKSB7XG4gICAgICAgIHJldHVybiBiaWFzO1xuICAgICAgfVxuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoIWFjIHx8ICFiYykge1xuICAgICAgY29udGludWU7XG4gICAgfSBlbHNlIGlmIChhYyA8IGJjKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSBlbHNlIGlmIChhYyA+IGJjKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBpKys7XG4gICAgaisrO1xuICB9XG5cbiAgdmFyIGlCZWZvcmVTdHJFbmQgPSBpIDwgYS5sZW5ndGg7XG4gIHZhciBqQmVmb3JlU3RyRW5kID0gaiA8IGIubGVuZ3RoO1xuXG4gIC8vIENoZWNrIHdoaWNoIHN0cmluZyBlbmRlZCBmaXJzdFxuICAvLyByZXR1cm4gLTEgaWYgYSwgMSBpZiBiLCAwIG90aGVyd2lzZVxuICByZXR1cm4gKGlCZWZvcmVTdHJFbmQgPiBqQmVmb3JlU3RyRW5kKSAtIChpQmVmb3JlU3RyRW5kIDwgakJlZm9yZVN0ckVuZCk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RybmF0Y21wLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzX2ludChtaXhlZFZhcikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAvLyAgZGlzY3VzcyBhdDogaHR0cDovL2xvY3V0dXMuaW8vcGhwL2lzX2ludC9cbiAgLy8gb3JpZ2luYWwgYnk6IEFsZXhcbiAgLy8gaW1wcm92ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rdnouaW8pXG4gIC8vIGltcHJvdmVkIGJ5OiBXZWJEZXZIb2JvIChodHRwOi8vd2ViZGV2aG9iby5ibG9nc3BvdC5jb20vKVxuICAvLyBpbXByb3ZlZCBieTogUmFmYcWCIEt1a2F3c2tpIChodHRwOi8vYmxvZy5rdWthd3NraS5wbClcbiAgLy8gIHJldmlzZWQgYnk6IE1hdHQgQnJhZGxleVxuICAvLyBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2t2ei5pbylcbiAgLy8gICAgICBub3RlIDE6IDEuMCBpcyBzaW1wbGlmaWVkIHRvIDEgYmVmb3JlIGl0IGNhbiBiZSBhY2Nlc3NlZCBieSB0aGUgZnVuY3Rpb24sIHRoaXMgbWFrZXNcbiAgLy8gICAgICBub3RlIDE6IGl0IGRpZmZlcmVudCBmcm9tIHRoZSBQSFAgaW1wbGVtZW50YXRpb24uIFdlIGNhbid0IGZpeCB0aGlzIHVuZm9ydHVuYXRlbHkuXG4gIC8vICAgZXhhbXBsZSAxOiBpc19pbnQoMjMpXG4gIC8vICAgcmV0dXJucyAxOiB0cnVlXG4gIC8vICAgZXhhbXBsZSAyOiBpc19pbnQoJzIzJylcbiAgLy8gICByZXR1cm5zIDI6IGZhbHNlXG4gIC8vICAgZXhhbXBsZSAzOiBpc19pbnQoMjMuNSlcbiAgLy8gICByZXR1cm5zIDM6IGZhbHNlXG4gIC8vICAgZXhhbXBsZSA0OiBpc19pbnQodHJ1ZSlcbiAgLy8gICByZXR1cm5zIDQ6IGZhbHNlXG5cbiAgcmV0dXJuIG1peGVkVmFyID09PSArbWl4ZWRWYXIgJiYgaXNGaW5pdGUobWl4ZWRWYXIpICYmICEobWl4ZWRWYXIgJSAxKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc19pbnQuanMubWFwIiwidmFyIHBocEFycmF5PXJlcXVpcmUoJ2xvY3V0dXMvcGhwL2FycmF5L2luZGV4Jyk7Il19
