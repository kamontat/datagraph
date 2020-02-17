/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/bintrees/index.js":
/*!****************************************!*\
  !*** ./node_modules/bintrees/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    RBTree: __webpack_require__(/*! ./lib/rbtree */ "./node_modules/bintrees/lib/rbtree.js"),
    BinTree: __webpack_require__(/*! ./lib/bintree */ "./node_modules/bintrees/lib/bintree.js")
};


/***/ }),

/***/ "./node_modules/bintrees/lib/bintree.js":
/*!**********************************************!*\
  !*** ./node_modules/bintrees/lib/bintree.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var TreeBase = __webpack_require__(/*! ./treebase */ "./node_modules/bintrees/lib/treebase.js");

function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
}

Node.prototype.get_child = function(dir) {
    return dir ? this.right : this.left;
};

Node.prototype.set_child = function(dir, val) {
    if(dir) {
        this.right = val;
    }
    else {
        this.left = val;
    }
};

function BinTree(comparator) {
    this._root = null;
    this._comparator = comparator;
    this.size = 0;
}

BinTree.prototype = new TreeBase();

// returns true if inserted, false if duplicate
BinTree.prototype.insert = function(data) {
    if(this._root === null) {
        // empty tree
        this._root = new Node(data);
        this.size++;
        return true;
    }

    var dir = 0;

    // setup
    var p = null; // parent
    var node = this._root;

    // search down
    while(true) {
        if(node === null) {
            // insert new node at the bottom
            node = new Node(data);
            p.set_child(dir, node);
            ret = true;
            this.size++;
            return true;
        }

        // stop if found
        if(this._comparator(node.data, data) === 0) {
            return false;
        }

        dir = this._comparator(node.data, data) < 0;

        // update helpers
        p = node;
        node = node.get_child(dir);
    }
};

// returns true if removed, false if not found
BinTree.prototype.remove = function(data) {
    if(this._root === null) {
        return false;
    }

    var head = new Node(undefined); // fake tree root
    var node = head;
    node.right = this._root;
    var p = null; // parent
    var found = null; // found item
    var dir = 1;

    while(node.get_child(dir) !== null) {
        p = node;
        node = node.get_child(dir);
        var cmp = this._comparator(data, node.data);
        dir = cmp > 0;

        if(cmp === 0) {
            found = node;
        }
    }

    if(found !== null) {
        found.data = node.data;
        p.set_child(p.right === node, node.get_child(node.left === null));

        this._root = head.right;
        this.size--;
        return true;
    }
    else {
        return false;
    }
};

module.exports = BinTree;



/***/ }),

/***/ "./node_modules/bintrees/lib/rbtree.js":
/*!*********************************************!*\
  !*** ./node_modules/bintrees/lib/rbtree.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var TreeBase = __webpack_require__(/*! ./treebase */ "./node_modules/bintrees/lib/treebase.js");

function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.red = true;
}

Node.prototype.get_child = function(dir) {
    return dir ? this.right : this.left;
};

Node.prototype.set_child = function(dir, val) {
    if(dir) {
        this.right = val;
    }
    else {
        this.left = val;
    }
};

function RBTree(comparator) {
    this._root = null;
    this._comparator = comparator;
    this.size = 0;
}

RBTree.prototype = new TreeBase();

// returns true if inserted, false if duplicate
RBTree.prototype.insert = function(data) {
    var ret = false;

    if(this._root === null) {
        // empty tree
        this._root = new Node(data);
        ret = true;
        this.size++;
    }
    else {
        var head = new Node(undefined); // fake tree root

        var dir = 0;
        var last = 0;

        // setup
        var gp = null; // grandparent
        var ggp = head; // grand-grand-parent
        var p = null; // parent
        var node = this._root;
        ggp.right = this._root;

        // search down
        while(true) {
            if(node === null) {
                // insert new node at the bottom
                node = new Node(data);
                p.set_child(dir, node);
                ret = true;
                this.size++;
            }
            else if(is_red(node.left) && is_red(node.right)) {
                // color flip
                node.red = true;
                node.left.red = false;
                node.right.red = false;
            }

            // fix red violation
            if(is_red(node) && is_red(p)) {
                var dir2 = ggp.right === gp;

                if(node === p.get_child(last)) {
                    ggp.set_child(dir2, single_rotate(gp, !last));
                }
                else {
                    ggp.set_child(dir2, double_rotate(gp, !last));
                }
            }

            var cmp = this._comparator(node.data, data);

            // stop if found
            if(cmp === 0) {
                break;
            }

            last = dir;
            dir = cmp < 0;

            // update helpers
            if(gp !== null) {
                ggp = gp;
            }
            gp = p;
            p = node;
            node = node.get_child(dir);
        }

        // update root
        this._root = head.right;
    }

    // make root black
    this._root.red = false;

    return ret;
};

// returns true if removed, false if not found
RBTree.prototype.remove = function(data) {
    if(this._root === null) {
        return false;
    }

    var head = new Node(undefined); // fake tree root
    var node = head;
    node.right = this._root;
    var p = null; // parent
    var gp = null; // grand parent
    var found = null; // found item
    var dir = 1;

    while(node.get_child(dir) !== null) {
        var last = dir;

        // update helpers
        gp = p;
        p = node;
        node = node.get_child(dir);

        var cmp = this._comparator(data, node.data);

        dir = cmp > 0;

        // save found node
        if(cmp === 0) {
            found = node;
        }

        // push the red node down
        if(!is_red(node) && !is_red(node.get_child(dir))) {
            if(is_red(node.get_child(!dir))) {
                var sr = single_rotate(node, dir);
                p.set_child(last, sr);
                p = sr;
            }
            else if(!is_red(node.get_child(!dir))) {
                var sibling = p.get_child(!last);
                if(sibling !== null) {
                    if(!is_red(sibling.get_child(!last)) && !is_red(sibling.get_child(last))) {
                        // color flip
                        p.red = false;
                        sibling.red = true;
                        node.red = true;
                    }
                    else {
                        var dir2 = gp.right === p;

                        if(is_red(sibling.get_child(last))) {
                            gp.set_child(dir2, double_rotate(p, last));
                        }
                        else if(is_red(sibling.get_child(!last))) {
                            gp.set_child(dir2, single_rotate(p, last));
                        }

                        // ensure correct coloring
                        var gpc = gp.get_child(dir2);
                        gpc.red = true;
                        node.red = true;
                        gpc.left.red = false;
                        gpc.right.red = false;
                    }
                }
            }
        }
    }

    // replace and remove if found
    if(found !== null) {
        found.data = node.data;
        p.set_child(p.right === node, node.get_child(node.left === null));
        this.size--;
    }

    // update root and make it black
    this._root = head.right;
    if(this._root !== null) {
        this._root.red = false;
    }

    return found !== null;
};

function is_red(node) {
    return node !== null && node.red;
}

function single_rotate(root, dir) {
    var save = root.get_child(!dir);

    root.set_child(!dir, save.get_child(dir));
    save.set_child(dir, root);

    root.red = true;
    save.red = false;

    return save;
}

function double_rotate(root, dir) {
    root.set_child(!dir, single_rotate(root.get_child(!dir), !dir));
    return single_rotate(root, dir);
}

module.exports = RBTree;


/***/ }),

/***/ "./node_modules/bintrees/lib/treebase.js":
/*!***********************************************!*\
  !*** ./node_modules/bintrees/lib/treebase.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


function TreeBase() {}

// removes all nodes from the tree
TreeBase.prototype.clear = function() {
    this._root = null;
    this.size = 0;
};

// returns node data if found, null otherwise
TreeBase.prototype.find = function(data) {
    var res = this._root;

    while(res !== null) {
        var c = this._comparator(data, res.data);
        if(c === 0) {
            return res.data;
        }
        else {
            res = res.get_child(c > 0);
        }
    }

    return null;
};

// returns iterator to node if found, null otherwise
TreeBase.prototype.findIter = function(data) {
    var res = this._root;
    var iter = this.iterator();

    while(res !== null) {
        var c = this._comparator(data, res.data);
        if(c === 0) {
            iter._cursor = res;
            return iter;
        }
        else {
            iter._ancestors.push(res);
            res = res.get_child(c > 0);
        }
    }

    return null;
};

// Returns an iterator to the tree node at or immediately after the item
TreeBase.prototype.lowerBound = function(item) {
    var cur = this._root;
    var iter = this.iterator();
    var cmp = this._comparator;

    while(cur !== null) {
        var c = cmp(item, cur.data);
        if(c === 0) {
            iter._cursor = cur;
            return iter;
        }
        iter._ancestors.push(cur);
        cur = cur.get_child(c > 0);
    }

    for(var i=iter._ancestors.length - 1; i >= 0; --i) {
        cur = iter._ancestors[i];
        if(cmp(item, cur.data) < 0) {
            iter._cursor = cur;
            iter._ancestors.length = i;
            return iter;
        }
    }

    iter._ancestors.length = 0;
    return iter;
};

// Returns an iterator to the tree node immediately after the item
TreeBase.prototype.upperBound = function(item) {
    var iter = this.lowerBound(item);
    var cmp = this._comparator;

    while(iter.data() !== null && cmp(iter.data(), item) === 0) {
        iter.next();
    }

    return iter;
};

// returns null if tree is empty
TreeBase.prototype.min = function() {
    var res = this._root;
    if(res === null) {
        return null;
    }

    while(res.left !== null) {
        res = res.left;
    }

    return res.data;
};

// returns null if tree is empty
TreeBase.prototype.max = function() {
    var res = this._root;
    if(res === null) {
        return null;
    }

    while(res.right !== null) {
        res = res.right;
    }

    return res.data;
};

// returns a null iterator
// call next() or prev() to point to an element
TreeBase.prototype.iterator = function() {
    return new Iterator(this);
};

// calls cb on each node's data, in order
TreeBase.prototype.each = function(cb) {
    var it=this.iterator(), data;
    while((data = it.next()) !== null) {
        cb(data);
    }
};

// calls cb on each node's data, in reverse order
TreeBase.prototype.reach = function(cb) {
    var it=this.iterator(), data;
    while((data = it.prev()) !== null) {
        cb(data);
    }
};


function Iterator(tree) {
    this._tree = tree;
    this._ancestors = [];
    this._cursor = null;
}

Iterator.prototype.data = function() {
    return this._cursor !== null ? this._cursor.data : null;
};

// if null-iterator, returns first node
// otherwise, returns next node
Iterator.prototype.next = function() {
    if(this._cursor === null) {
        var root = this._tree._root;
        if(root !== null) {
            this._minNode(root);
        }
    }
    else {
        if(this._cursor.right === null) {
            // no greater node in subtree, go up to parent
            // if coming from a right child, continue up the stack
            var save;
            do {
                save = this._cursor;
                if(this._ancestors.length) {
                    this._cursor = this._ancestors.pop();
                }
                else {
                    this._cursor = null;
                    break;
                }
            } while(this._cursor.right === save);
        }
        else {
            // get the next node from the subtree
            this._ancestors.push(this._cursor);
            this._minNode(this._cursor.right);
        }
    }
    return this._cursor !== null ? this._cursor.data : null;
};

// if null-iterator, returns last node
// otherwise, returns previous node
Iterator.prototype.prev = function() {
    if(this._cursor === null) {
        var root = this._tree._root;
        if(root !== null) {
            this._maxNode(root);
        }
    }
    else {
        if(this._cursor.left === null) {
            var save;
            do {
                save = this._cursor;
                if(this._ancestors.length) {
                    this._cursor = this._ancestors.pop();
                }
                else {
                    this._cursor = null;
                    break;
                }
            } while(this._cursor.left === save);
        }
        else {
            this._ancestors.push(this._cursor);
            this._maxNode(this._cursor.left);
        }
    }
    return this._cursor !== null ? this._cursor.data : null;
};

Iterator.prototype._minNode = function(start) {
    while(start.left !== null) {
        this._ancestors.push(start);
        start = start.left;
    }
    this._cursor = start;
};

Iterator.prototype._maxNode = function(start) {
    while(start.right !== null) {
        this._ancestors.push(start);
        start = start.right;
    }
    this._cursor = start;
};

module.exports = TreeBase;



/***/ }),

/***/ "./node_modules/debug/node_modules/ms/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/debug/node_modules/ms/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ "./node_modules/debug/src/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/debug/src/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */
function log(...args) {
	// This hackery is required for IE8/9, where
	// the `console.log` function doesn't have 'apply'
	return typeof console === 'object' &&
		console.log &&
		console.log(...args);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ "./node_modules/debug/src/common.js":
/*!******************************************!*\
  !*** ./node_modules/debug/src/common.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(/*! ms */ "./node_modules/debug/node_modules/ms/index.js");

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* Active `debug` instances.
	*/
	createDebug.instances = [];

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return match;
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
		debug.destroy = destroy;
		debug.extend = extend;
		// Debug.formatArgs = formatArgs;
		// debug.rawLog = rawLog;

		// env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		createDebug.instances.push(debug);

		return debug;
	}

	function destroy() {
		const index = createDebug.instances.indexOf(this);
		if (index !== -1) {
			createDebug.instances.splice(index, 1);
			return true;
		}
		return false;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}

		for (i = 0; i < createDebug.instances.length; i++) {
			const instance = createDebug.instances[i];
			instance.enabled = createDebug.enabled(instance.namespace);
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ "./node_modules/debug/src/index.js":
/*!*****************************************!*\
  !*** ./node_modules/debug/src/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __webpack_require__(/*! ./browser.js */ "./node_modules/debug/src/browser.js");
} else {
	module.exports = __webpack_require__(/*! ./node.js */ "./node_modules/debug/src/node.js");
}


/***/ }),

/***/ "./node_modules/debug/src/node.js":
/*!****************************************!*\
  !*** ./node_modules/debug/src/node.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

const tty = __webpack_require__(/*! tty */ "tty");
const util = __webpack_require__(/*! util */ "util");

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __webpack_require__(/*! supports-color */ "./node_modules/supports-color/index.js");

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __webpack_require__(/*! ./common */ "./node_modules/debug/src/common.js")(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.replace(/\s*\n\s*/g, ' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ "./node_modules/has-flag/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-flag/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),

/***/ "./node_modules/prom-client/index.js":
/*!*******************************************!*\
  !*** ./node_modules/prom-client/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Prometheus client
 * @module Prometheus client
 */



exports.register = __webpack_require__(/*! ./lib/registry */ "./node_modules/prom-client/lib/registry.js").globalRegistry;
exports.Registry = __webpack_require__(/*! ./lib/registry */ "./node_modules/prom-client/lib/registry.js");
exports.contentType = __webpack_require__(/*! ./lib/registry */ "./node_modules/prom-client/lib/registry.js").globalRegistry.contentType;
exports.validateMetricName = __webpack_require__(/*! ./lib/validation */ "./node_modules/prom-client/lib/validation.js").validateMetricName;

exports.Counter = __webpack_require__(/*! ./lib/counter */ "./node_modules/prom-client/lib/counter.js");
exports.Gauge = __webpack_require__(/*! ./lib/gauge */ "./node_modules/prom-client/lib/gauge.js");
exports.Histogram = __webpack_require__(/*! ./lib/histogram */ "./node_modules/prom-client/lib/histogram.js");
exports.Summary = __webpack_require__(/*! ./lib/summary */ "./node_modules/prom-client/lib/summary.js");
exports.Pushgateway = __webpack_require__(/*! ./lib/pushgateway */ "./node_modules/prom-client/lib/pushgateway.js");

exports.linearBuckets = __webpack_require__(/*! ./lib/bucketGenerators */ "./node_modules/prom-client/lib/bucketGenerators.js").linearBuckets;
exports.exponentialBuckets = __webpack_require__(/*! ./lib/bucketGenerators */ "./node_modules/prom-client/lib/bucketGenerators.js").exponentialBuckets;

exports.collectDefaultMetrics = __webpack_require__(/*! ./lib/defaultMetrics */ "./node_modules/prom-client/lib/defaultMetrics.js");

exports.aggregators = __webpack_require__(/*! ./lib/metricAggregators */ "./node_modules/prom-client/lib/metricAggregators.js").aggregators;
exports.AggregatorRegistry = __webpack_require__(/*! ./lib/cluster */ "./node_modules/prom-client/lib/cluster.js");


/***/ }),

/***/ "./node_modules/prom-client/lib/bucketGenerators.js":
/*!**********************************************************!*\
  !*** ./node_modules/prom-client/lib/bucketGenerators.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.linearBuckets = (start, width, count) => {
	if (count < 1) {
		throw new Error('Linear buckets needs a positive count');
	}

	const buckets = new Array(count);
	for (let i = 0; i < count; i++) {
		buckets[i] = start;
		start += width;
	}
	return buckets;
};

exports.exponentialBuckets = (start, factor, count) => {
	if (start <= 0) {
		throw new Error('Exponential buckets needs a positive start');
	}
	if (count < 1) {
		throw new Error('Exponential buckets needs a positive count');
	}
	if (factor <= 1) {
		throw new Error('Exponential buckets needs a factor greater than 1');
	}
	const buckets = new Array(count);
	for (let i = 0; i < count; i++) {
		buckets[i] = start;
		start *= factor;
	}
	return buckets;
};


/***/ }),

/***/ "./node_modules/prom-client/lib/cluster.js":
/*!*************************************************!*\
  !*** ./node_modules/prom-client/lib/cluster.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Extends the Registry class with a `clusterMetrics` method that returns
 * aggregated metrics for all workers.
 *
 * In cluster workers, listens for and responds to requests for metrics by the
 * cluster master.
 */

const cluster = __webpack_require__(/*! cluster */ "cluster");
const Registry = __webpack_require__(/*! ./registry */ "./node_modules/prom-client/lib/registry.js");
const { Grouper } = __webpack_require__(/*! ./util */ "./node_modules/prom-client/lib/util.js");
const { aggregators } = __webpack_require__(/*! ./metricAggregators */ "./node_modules/prom-client/lib/metricAggregators.js");

const GET_METRICS_REQ = 'prom-client:getMetricsReq';
const GET_METRICS_RES = 'prom-client:getMetricsRes';

let registries = [Registry.globalRegistry];
let requestCtr = 0; // Concurrency control
let listenersAdded = false;
const requests = new Map(); // Pending requests for workers' local metrics.

class AggregatorRegistry extends Registry {
	constructor() {
		super();
		addListeners();
	}

	/**
	 * Gets aggregated metrics for all workers. The optional callback and
	 * returned Promise resolve with the same value; either may be used.
	 * @param {Function?} callback (err, metrics) => any
	 * @return {Promise<string>} Promise that resolves with the aggregated
	 *   metrics.
	 */
	clusterMetrics(callback) {
		const requestId = requestCtr++;

		return new Promise((resolve, reject) => {
			function done(err, result) {
				// Don't resolve/reject the promise if a callback is provided
				if (typeof callback === 'function') {
					callback(err, result);
				} else {
					if (err) reject(err);
					else resolve(result);
				}
			}

			const request = {
				responses: [],
				pending: 0,
				done,
				errorTimeout: setTimeout(() => {
					request.failed = true;
					const err = new Error('Operation timed out.');
					request.done(err);
				}, 5000),
				failed: false
			};
			requests.set(requestId, request);

			const message = {
				type: GET_METRICS_REQ,
				requestId
			};

			for (const id in cluster.workers) {
				// If the worker exits abruptly, it may still be in the workers
				// list but not able to communicate.
				if (cluster.workers[id].isConnected()) {
					cluster.workers[id].send(message);
					request.pending++;
				}
			}

			if (request.pending === 0) {
				// No workers were up
				clearTimeout(request.errorTimeout);
				process.nextTick(() => done(null, ''));
			}
		});
	}

	/**
	 * Creates a new Registry instance from an array of metrics that were
	 * created by `registry.getMetricsAsJSON()`. Metrics are aggregated using
	 * the method specified by their `aggregator` property, or by summation if
	 * `aggregator` is undefined.
	 * @param {Array} metricsArr Array of metrics, each of which created by
	 *   `registry.getMetricsAsJSON()`.
	 * @return {Registry} aggregated registry.
	 */
	static aggregate(metricsArr) {
		const aggregatedRegistry = new Registry();
		const metricsByName = new Grouper();

		// Gather by name
		metricsArr.forEach(metrics => {
			metrics.forEach(metric => {
				metricsByName.add(metric.name, metric);
			});
		});

		// Aggregate gathered metrics.
		metricsByName.forEach(metrics => {
			const aggregatorName = metrics[0].aggregator;
			const aggregatorFn = aggregators[aggregatorName];
			if (typeof aggregatorFn !== 'function') {
				throw new Error(`'${aggregatorName}' is not a defined aggregator.`);
			}
			const aggregatedMetric = aggregatorFn(metrics);
			// NB: The 'omit' aggregator returns undefined.
			if (aggregatedMetric) {
				const aggregatedMetricWrapper = Object.assign(
					{
						get: () => aggregatedMetric
					},
					aggregatedMetric
				);
				aggregatedRegistry.registerMetric(aggregatedMetricWrapper);
			}
		});

		return aggregatedRegistry;
	}

	/**
	 * Sets the registry or registries to be aggregated. Call from workers to
	 * use a registry/registries other than the default global registry.
	 * @param {Array<Registry>|Registry} regs Registry or registries to be
	 *   aggregated.
	 * @return {void}
	 */
	static setRegistries(regs) {
		if (!Array.isArray(regs)) regs = [regs];
		regs.forEach(reg => {
			if (!(reg instanceof Registry)) {
				throw new TypeError(`Expected Registry, got ${typeof reg}`);
			}
		});
		registries = regs;
	}
}

/**
 * Adds event listeners for cluster aggregation. Idempotent (safe to call more
 * than once).
 * @return {void}
 */
function addListeners() {
	if (listenersAdded) return;
	listenersAdded = true;

	if (cluster.isMaster) {
		// Listen for worker responses to requests for local metrics
		cluster.on('message', (worker, message) => {
			if (message.type === GET_METRICS_RES) {
				const request = requests.get(message.requestId);
				message.metrics.forEach(registry => request.responses.push(registry));
				request.pending--;

				if (request.pending === 0) {
					// finalize
					requests.delete(message.requestId);
					clearTimeout(request.errorTimeout);

					if (request.failed) return; // Callback already run with Error.

					const registry = AggregatorRegistry.aggregate(request.responses);
					const promString = registry.metrics();
					request.done(null, promString);
				}
			}
		});
	}
}

if (cluster.isWorker) {
	// Respond to master's requests for worker's local metrics.
	process.on('message', message => {
		if (message.type === GET_METRICS_REQ) {
			process.send({
				type: GET_METRICS_RES,
				requestId: message.requestId,
				metrics: registries.map(r => r.getMetricsAsJSON())
			});
		}
	});
}

module.exports = AggregatorRegistry;


/***/ }),

/***/ "./node_modules/prom-client/lib/counter.js":
/*!*************************************************!*\
  !*** ./node_modules/prom-client/lib/counter.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Counter metric
 */


const util = __webpack_require__(/*! util */ "util");
const { globalRegistry } = __webpack_require__(/*! ./registry */ "./node_modules/prom-client/lib/registry.js");
const type = 'counter';
const {
	isDate,
	getPropertiesFromObj,
	hashObject,
	isObject,
	printDeprecationObjectConstructor,
	getLabels,
	removeLabels
} = __webpack_require__(/*! ./util */ "./node_modules/prom-client/lib/util.js");

const {
	validateLabel,
	validateMetricName,
	validateLabelName
} = __webpack_require__(/*! ./validation */ "./node_modules/prom-client/lib/validation.js");

class Counter {
	/**
	 * Counter
	 * @param {string} name - Name of the metric
	 * @param {string} help - Help description for the metric
	 * @param {Array.<string>} labels - Labels
	 */
	constructor(name, help, labels) {
		let config;
		if (isObject(name)) {
			config = Object.assign(
				{
					labelNames: []
				},
				name
			);

			if (!config.registers) {
				config.registers = [globalRegistry];
			}
		} else {
			printDeprecationObjectConstructor();

			config = {
				name,
				help,
				labelNames: labels,
				registers: [globalRegistry]
			};
		}

		if (!config.help) {
			throw new Error('Missing mandatory help parameter');
		}
		if (!config.name) {
			throw new Error('Missing mandatory name parameter');
		}
		if (!validateMetricName(config.name)) {
			throw new Error('Invalid metric name');
		}

		if (!validateLabelName(config.labelNames)) {
			throw new Error('Invalid label name');
		}

		this.name = config.name;

		this.labelNames = config.labelNames || [];

		this.reset();

		this.help = config.help;
		this.aggregator = config.aggregator || 'sum';

		config.registers.forEach(registryInstance =>
			registryInstance.registerMetric(this)
		);
	}

	/**
	 * Increment counter
	 * @param {object} labels - What label you want to be incremented
	 * @param {Number} value - Value to increment, if omitted increment with 1
	 * @param {(Number|Date)} timestamp - Timestamp to set the counter to
	 * @returns {void}
	 */
	inc(labels, value, timestamp) {
		if (!isObject(labels)) {
			return inc.call(this, null)(labels, value);
		}

		const hash = hashObject(labels);
		return inc.call(this, labels, hash)(value, timestamp);
	}

	/**
	 * Reset counter
	 * @returns {void}
	 */
	reset() {
		return reset.call(this);
	}

	get() {
		return {
			help: this.help,
			name: this.name,
			type,
			values: getPropertiesFromObj(this.hashMap),
			aggregator: this.aggregator
		};
	}

	labels() {
		const labels = getLabels(this.labelNames, arguments) || {};
		const hash = hashObject(labels);
		validateLabel(this.labelNames, labels);
		return {
			inc: inc.call(this, labels, hash)
		};
	}

	remove() {
		const labels = getLabels(this.labelNames, arguments) || {};
		return removeLabels.call(this, this.hashMap, labels);
	}
}

const reset = function() {
	this.hashMap = {};

	if (this.labelNames.length === 0) {
		this.hashMap = setValue({}, 0);
	}
};

const inc = function(labels, hash) {
	return (value, timestamp) => {
		if (value && !Number.isFinite(value)) {
			throw new TypeError(`Value is not a valid number: ${util.format(value)}`);
		}
		if (timestamp && !isDate(timestamp) && !Number.isFinite(timestamp)) {
			throw new TypeError(
				`Timestamp is not a valid date or number: ${util.format(timestamp)}`
			);
		}
		if (value < 0) {
			throw new Error('It is not possible to decrease a counter');
		}

		labels = labels || {};
		validateLabel(this.labelNames, labels);

		const incValue = value === null || value === undefined ? 1 : value;

		this.hashMap = setValue(this.hashMap, incValue, timestamp, labels, hash);
	};
};

function setValue(hashMap, value, timestamp, labels, hash) {
	hash = hash || '';
	timestamp = isDate(timestamp)
		? timestamp.valueOf()
		: Number.isFinite(timestamp)
		? timestamp
		: undefined;
	if (hashMap[hash]) {
		hashMap[hash].value += value;
		hashMap[hash].timestamp = timestamp;
	} else {
		hashMap[hash] = { value, labels: labels || {}, timestamp };
	}
	return hashMap;
}

module.exports = Counter;


/***/ }),

/***/ "./node_modules/prom-client/lib/defaultMetrics.js":
/*!********************************************************!*\
  !*** ./node_modules/prom-client/lib/defaultMetrics.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const processCpuTotal = __webpack_require__(/*! ./metrics/processCpuTotal */ "./node_modules/prom-client/lib/metrics/processCpuTotal.js");
const processStartTime = __webpack_require__(/*! ./metrics/processStartTime */ "./node_modules/prom-client/lib/metrics/processStartTime.js");
const osMemoryHeap = __webpack_require__(/*! ./metrics/osMemoryHeap */ "./node_modules/prom-client/lib/metrics/osMemoryHeap.js");
const processOpenFileDescriptors = __webpack_require__(/*! ./metrics/processOpenFileDescriptors */ "./node_modules/prom-client/lib/metrics/processOpenFileDescriptors.js");
const processMaxFileDescriptors = __webpack_require__(/*! ./metrics/processMaxFileDescriptors */ "./node_modules/prom-client/lib/metrics/processMaxFileDescriptors.js");
const eventLoopLag = __webpack_require__(/*! ./metrics/eventLoopLag */ "./node_modules/prom-client/lib/metrics/eventLoopLag.js");
const processHandles = __webpack_require__(/*! ./metrics/processHandles */ "./node_modules/prom-client/lib/metrics/processHandles.js");
const processRequests = __webpack_require__(/*! ./metrics/processRequests */ "./node_modules/prom-client/lib/metrics/processRequests.js");
const heapSizeAndUsed = __webpack_require__(/*! ./metrics/heapSizeAndUsed */ "./node_modules/prom-client/lib/metrics/heapSizeAndUsed.js");
const heapSpacesSizeAndUsed = __webpack_require__(/*! ./metrics/heapSpacesSizeAndUsed */ "./node_modules/prom-client/lib/metrics/heapSpacesSizeAndUsed.js");
const version = __webpack_require__(/*! ./metrics/version */ "./node_modules/prom-client/lib/metrics/version.js");
const { globalRegistry } = __webpack_require__(/*! ./registry */ "./node_modules/prom-client/lib/registry.js");
const { printDeprecationCollectDefaultMetricsNumber } = __webpack_require__(/*! ./util */ "./node_modules/prom-client/lib/util.js");

const metrics = {
	processCpuTotal,
	processStartTime,
	osMemoryHeap,
	processOpenFileDescriptors,
	processMaxFileDescriptors,
	eventLoopLag,
	processHandles,
	processRequests,
	heapSizeAndUsed,
	heapSpacesSizeAndUsed,
	version
};
const metricsList = Object.keys(metrics);

let existingInterval = null;
// This is used to ensure the program throws on duplicate metrics during first run
// We might want to consider not supporting running the default metrics function more than once
let init = true;

module.exports = function startDefaultMetrics(config) {
	let normalizedConfig = config;
	if (typeof config === 'number') {
		printDeprecationCollectDefaultMetricsNumber(config);

		normalizedConfig = { timeout: config };
	}

	normalizedConfig = Object.assign(
		{
			timestamps: true,
			timeout: 10000
		},
		normalizedConfig
	);

	if (existingInterval !== null) {
		clearInterval(existingInterval);
	}

	const initialisedMetrics = metricsList.map(metric => {
		const defaultMetric = metrics[metric];
		if (!init) {
			defaultMetric.metricNames.map(
				globalRegistry.removeSingleMetric,
				globalRegistry
			);
		}

		return defaultMetric(normalizedConfig.register, normalizedConfig);
	});

	function updateAllMetrics() {
		initialisedMetrics.forEach(metric => metric.call());
	}

	updateAllMetrics();

	existingInterval = setInterval(
		updateAllMetrics,
		normalizedConfig.timeout
	).unref();

	init = false;

	return existingInterval;
};

module.exports.metricsList = metricsList;


/***/ }),

/***/ "./node_modules/prom-client/lib/gauge.js":
/*!***********************************************!*\
  !*** ./node_modules/prom-client/lib/gauge.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Gauge metric
 */


const util = __webpack_require__(/*! util */ "util");
const { globalRegistry } = __webpack_require__(/*! ./registry */ "./node_modules/prom-client/lib/registry.js");
const type = 'gauge';

const {
	isDate,
	setValue,
	getPropertiesFromObj,
	getLabels,
	hashObject,
	isObject,
	printDeprecationObjectConstructor,
	removeLabels
} = __webpack_require__(/*! ./util */ "./node_modules/prom-client/lib/util.js");
const {
	validateMetricName,
	validateLabel,
	validateLabelName
} = __webpack_require__(/*! ./validation */ "./node_modules/prom-client/lib/validation.js");

class Gauge {
	/**
	 * Gauge
	 * @param {string} name - Name of the metric
	 * @param {string} help - Help for the metric
	 * @param {Array.<string>} labels - Array with strings, all label keywords supported
	 */
	constructor(name, help, labels) {
		let config;
		if (isObject(name)) {
			config = Object.assign(
				{
					labelNames: []
				},
				name
			);

			if (!config.registers) {
				config.registers = [globalRegistry];
			}
		} else {
			printDeprecationObjectConstructor();
			config = {
				name,
				help,
				labelNames: labels,
				registers: [globalRegistry]
			};
		}

		if (!config.help) {
			throw new Error('Missing mandatory help parameter');
		}
		if (!config.name) {
			throw new Error('Missing mandatory name parameter');
		}
		if (!validateMetricName(config.name)) {
			throw new Error('Invalid metric name');
		}
		if (!validateLabelName(config.labelNames)) {
			throw new Error('Invalid label name');
		}

		this.name = config.name;
		this.labelNames = config.labelNames || [];
		this.reset();
		this.help = config.help;
		this.aggregator = config.aggregator || 'sum';

		config.registers.forEach(registryInstance =>
			registryInstance.registerMetric(this)
		);
	}

	/**
	 * Set a gauge to a value
	 * @param {object} labels - Object with labels and their values
	 * @param {Number} value - Value to set the gauge to, must be positive
	 * @param {(Number|Date)} timestamp - Timestamp to set the gauge to
	 * @returns {void}
	 */
	set(labels, value, timestamp) {
		if (!isObject(labels)) {
			return set.call(this, null)(labels, value);
		}
		return set.call(this, labels)(value, timestamp);
	}

	/**
	 * Reset gauge
	 * @returns {void}
	 */
	reset() {
		return reset.call(this);
	}

	/**
	 * Increment a gauge value
	 * @param {object} labels - Object with labels where key is the label key and value is label value. Can only be one level deep
	 * @param {Number} value - Value to increment - if omitted, increment with 1
	 * @param {(Number|Date)} timestamp - Timestamp to set the gauge to
	 * @returns {void}
	 */
	inc(labels, value, timestamp) {
		inc.call(this, labels)(value, timestamp);
	}

	/**
	 * Decrement a gauge value
	 * @param {object} labels - Object with labels where key is the label key and value is label value. Can only be one level deep
	 * @param {Number} value - Value to decrement - if omitted, decrement with 1
	 * @param {(Number|Date)} timestamp - Timestamp to set the gauge to
	 * @returns {void}
	 */
	dec(labels, value, timestamp) {
		dec.call(this, labels)(value, timestamp);
	}

	/**
	 * Set the gauge to current unix epoch
	 * @param {object} labels - Object with labels where key is the label key and value is label value. Can only be one level deep
	 * @returns {void}
	 */
	setToCurrentTime(labels) {
		return setToCurrentTime.call(this, labels)();
	}

	/**
	 * Start a timer
	 * @param {object} labels - Object with labels where key is the label key and value is label value. Can only be one level deep
	 * @returns {function} - Invoke this function to set the duration in seconds since you started the timer.
	 * @example
	 * var done = gauge.startTimer();
	 * makeXHRRequest(function(err, response) {
	 *	done(); //Duration of the request will be saved
	 * });
	 */
	startTimer(labels) {
		return startTimer.call(this, labels)();
	}

	get() {
		return {
			help: this.help,
			name: this.name,
			type,
			values: getPropertiesFromObj(this.hashMap),
			aggregator: this.aggregator
		};
	}

	_getValue(labels) {
		const hash = hashObject(labels || {});
		return this.hashMap[hash] ? this.hashMap[hash].value : 0;
	}

	labels() {
		const labels = getLabels(this.labelNames, arguments);
		return {
			inc: inc.call(this, labels),
			dec: dec.call(this, labels),
			set: set.call(this, labels),
			setToCurrentTime: setToCurrentTime.call(this, labels),
			startTimer: startTimer.call(this, labels)
		};
	}

	remove() {
		const labels = getLabels(this.labelNames, arguments);
		removeLabels.call(this, this.hashMap, labels);
	}
}

function setToCurrentTime(labels) {
	return () => {
		const now = Date.now() / 1000;
		if (labels === undefined) {
			this.set(now);
		} else {
			this.set(labels, now);
		}
	};
}

function startTimer(startLabels) {
	return () => {
		const start = process.hrtime();
		return endLabels => {
			const delta = process.hrtime(start);
			this.set(
				Object.assign({}, startLabels, endLabels),
				delta[0] + delta[1] / 1e9
			);
		};
	};
}

function dec(labels) {
	return (value, timestamp) => {
		const data = convertLabelsAndValues(labels, value);
		this.set(
			data.labels,
			this._getValue(data.labels) - (data.value || 1),
			timestamp
		);
	};
}

function inc(labels) {
	return (value, timestamp) => {
		const data = convertLabelsAndValues(labels, value);
		this.set(
			data.labels,
			this._getValue(data.labels) + (data.value || 1),
			timestamp
		);
	};
}

function set(labels) {
	return (value, timestamp) => {
		if (typeof value !== 'number') {
			throw new TypeError(`Value is not a valid number: ${util.format(value)}`);
		}
		if (timestamp && !isDate(timestamp) && !Number.isFinite(timestamp)) {
			throw new TypeError(
				`Timestamp is not a valid date or number: ${util.format(timestamp)}`
			);
		}

		labels = labels || {};

		validateLabel(this.labelNames, labels);
		this.hashMap = setValue(this.hashMap, value, labels, timestamp);
	};
}

function reset() {
	this.hashMap = {};

	if (this.labelNames.length === 0) {
		this.hashMap = setValue({}, 0, {});
	}
}

function convertLabelsAndValues(labels, value) {
	if (!isObject(labels)) {
		return {
			value: labels,
			labels: {}
		};
	}
	return {
		labels,
		value
	};
}

module.exports = Gauge;


/***/ }),

/***/ "./node_modules/prom-client/lib/histogram.js":
/*!***************************************************!*\
  !*** ./node_modules/prom-client/lib/histogram.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Histogram
 */


const util = __webpack_require__(/*! util */ "util");
const globalRegistry = __webpack_require__(/*! ./registry */ "./node_modules/prom-client/lib/registry.js").globalRegistry;
const type = 'histogram';
const {
	getPropertiesFromObj,
	getLabels,
	hashObject,
	isObject,
	printDeprecationObjectConstructor,
	removeLabels
} = __webpack_require__(/*! ./util */ "./node_modules/prom-client/lib/util.js");
const {
	validateMetricName,
	validateLabel,
	validateLabelName
} = __webpack_require__(/*! ./validation */ "./node_modules/prom-client/lib/validation.js");

class Histogram {
	/**
	 * Histogram
	 * @param {string} name - Name of the metric
	 * @param {string} help - Help for the metric
	 * @param {object|Array.<string>} labelsOrConf - Either array of label names or config object as a key-value object
	 * @param {object} conf - Configuration object
	 */
	constructor(name, help, labelsOrConf, conf) {
		let config;

		if (isObject(name)) {
			config = Object.assign(
				{
					buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
					labelNames: []
				},
				name
			);

			if (!config.registers) {
				config.registers = [globalRegistry];
			}
		} else {
			let obj;
			let labels = [];

			if (Array.isArray(labelsOrConf)) {
				obj = conf || {};
				labels = labelsOrConf;
			} else {
				obj = labelsOrConf || {};
			}

			printDeprecationObjectConstructor();

			config = {
				name,
				labelNames: labels,
				help,
				buckets: configureUpperbounds(obj.buckets),
				registers: [globalRegistry]
			};
		}
		validateInput(config.name, config.help, config.labelNames);

		this.name = config.name;
		this.help = config.help;
		this.aggregator = config.aggregator || 'sum';

		this.upperBounds = config.buckets;
		this.bucketValues = this.upperBounds.reduce((acc, upperBound) => {
			acc[upperBound] = 0;
			return acc;
		}, {});

		Object.freeze(this.bucketValues);
		Object.freeze(this.upperBounds);
		this.sum = 0;
		this.count = 0;

		this.hashMap = {};
		this.labelNames = config.labelNames || [];

		if (this.labelNames.length === 0) {
			this.hashMap = {
				[hashObject({})]: createBaseValues(
					{},
					Object.assign({}, this.bucketValues)
				)
			};
		}

		config.registers.forEach(registryInstance =>
			registryInstance.registerMetric(this)
		);
	}

	/**
	 * Observe a value in histogram
	 * @param {object} labels - Object with labels where key is the label key and value is label value. Can only be one level deep
	 * @param {Number} value - Value to observe in the histogram
	 * @returns {void}
	 */
	observe(labels, value) {
		observe.call(this, labels === 0 ? 0 : labels || {})(value);
	}

	get() {
		const data = getPropertiesFromObj(this.hashMap);
		const values = data
			.map(extractBucketValuesForExport(this))
			.reduce(addSumAndCountForExport(this), []);

		return {
			name: this.name,
			help: this.help,
			type,
			values,
			aggregator: this.aggregator
		};
	}

	reset() {
		this.sum = 0;
		this.count = 0;
		this.hashMap = {};
	}

	/**
	 * Start a timer that could be used to logging durations
	 * @param {object} labels - Object with labels where key is the label key and value is label value. Can only be one level deep
	 * @returns {function} - Function to invoke when you want to stop the timer and observe the duration in seconds
	 * @example
	 * var end = histogram.startTimer();
	 * makeExpensiveXHRRequest(function(err, res) {
	 *	end(); //Observe the duration of expensiveXHRRequest
	 * });
	 */
	startTimer(labels) {
		return startTimer.call(this, labels)();
	}

	labels() {
		const labels = getLabels(this.labelNames, arguments);
		return {
			observe: observe.call(this, labels),
			startTimer: startTimer.call(this, labels)
		};
	}

	remove() {
		const labels = getLabels(this.labelNames, arguments);
		removeLabels.call(this, this.hashMap, labels);
	}
}

function startTimer(startLabels) {
	return () => {
		const start = process.hrtime();
		return endLabels => {
			const delta = process.hrtime(start);
			this.observe(
				Object.assign({}, startLabels, endLabels),
				delta[0] + delta[1] / 1e9
			);
		};
	};
}
function validateInput(name, help, labels) {
	if (!help) {
		throw new Error('Missing mandatory help parameter');
	}
	if (!name) {
		throw new Error('Missing mandatory name parameter');
	}

	if (!validateMetricName(name)) {
		throw new Error('Invalid metric name');
	}

	if (!validateLabelName(labels)) {
		throw new Error('Invalid label name');
	}

	labels.forEach(label => {
		if (label === 'le') {
			throw new Error('le is a reserved label keyword');
		}
	});
}

function configureUpperbounds(configuredBuckets) {
	const defaultBuckets = [
		0.005,
		0.01,
		0.025,
		0.05,
		0.1,
		0.25,
		0.5,
		1,
		2.5,
		5,
		10
	];
	return [].concat(configuredBuckets || defaultBuckets).sort(sortAscending);
}

function sortAscending(x, y) {
	return x - y;
}

function setValuePair(labels, value, metricName) {
	return {
		labels,
		value,
		metricName
	};
}

function findBound(upperBounds, value) {
	for (let i = 0; i < upperBounds.length; i++) {
		const bound = upperBounds[i];
		if (value <= bound) {
			return bound;
		}
	}
	return -1;
}

function observe(labels) {
	return value => {
		const labelValuePair = convertLabelsAndValues(labels, value);

		validateLabel(this.labelNames, labelValuePair.labels);
		if (!Number.isFinite(labelValuePair.value)) {
			throw new TypeError(
				`Value is not a valid number: ${util.format(labelValuePair.value)}`
			);
		}

		const hash = hashObject(labelValuePair.labels);
		let valueFromMap = this.hashMap[hash];
		if (!valueFromMap) {
			valueFromMap = createBaseValues(
				labelValuePair.labels,
				Object.assign({}, this.bucketValues)
			);
		}

		const b = findBound(this.upperBounds, labelValuePair.value);

		valueFromMap.sum += labelValuePair.value;
		valueFromMap.count += 1;

		if (valueFromMap.bucketValues.hasOwnProperty(b)) {
			valueFromMap.bucketValues[b] += 1;
		}

		this.hashMap[hash] = valueFromMap;
	};
}

function createBaseValues(labels, bucketValues) {
	return {
		labels,
		bucketValues,
		sum: 0,
		count: 0
	};
}

function convertLabelsAndValues(labels, value) {
	if (!isObject(labels)) {
		return {
			value: labels,
			labels: {}
		};
	}
	return {
		labels,
		value
	};
}

function extractBucketValuesForExport(histogram) {
	return bucketData => {
		const buckets = [];
		const bucketLabelNames = Object.keys(bucketData.labels);
		let acc = 0;
		for (const upperBound of histogram.upperBounds) {
			acc += bucketData.bucketValues[upperBound];
			const lbls = { le: upperBound };
			for (const labelName of bucketLabelNames) {
				lbls[labelName] = bucketData.labels[labelName];
			}
			buckets.push(setValuePair(lbls, acc, `${histogram.name}_bucket`));
		}
		return { buckets, data: bucketData };
	};
}

function addSumAndCountForExport(histogram) {
	return (acc, d) => {
		acc.push(...d.buckets);

		const infLabel = { le: '+Inf' };
		for (const label of Object.keys(d.data.labels)) {
			infLabel[label] = d.data.labels[label];
		}
		acc.push(
			setValuePair(infLabel, d.data.count, `${histogram.name}_bucket`),
			setValuePair(d.data.labels, d.data.sum, `${histogram.name}_sum`),
			setValuePair(d.data.labels, d.data.count, `${histogram.name}_count`)
		);
		return acc;
	};
}

module.exports = Histogram;


/***/ }),

/***/ "./node_modules/prom-client/lib/metricAggregators.js":
/*!***********************************************************!*\
  !*** ./node_modules/prom-client/lib/metricAggregators.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { Grouper, hashObject } = __webpack_require__(/*! ./util */ "./node_modules/prom-client/lib/util.js");

/**
 * Returns a new function that applies the `aggregatorFn` to the values.
 * @param {Function} aggregatorFn function to apply to values.
 * @return {Function} aggregator function
 */
function AggregatorFactory(aggregatorFn) {
	return metrics => {
		if (metrics.length === 0) return;
		const result = {
			help: metrics[0].help,
			name: metrics[0].name,
			type: metrics[0].type,
			values: [],
			aggregator: metrics[0].aggregator
		};
		// Gather metrics by metricName and labels.
		const byLabels = new Grouper();
		metrics.forEach(metric => {
			metric.values.forEach(value => {
				const key = hashObject(value.labels);
				byLabels.add(`${value.metricName}_${key}`, value);
			});
		});
		// Apply aggregator function to gathered metrics.
		byLabels.forEach(values => {
			if (values.length === 0) return;
			const valObj = {
				value: aggregatorFn(values),
				labels: values[0].labels
			};
			if (values[0].metricName) {
				valObj.metricName = values[0].metricName;
			}
			// NB: Timestamps are omitted.
			result.values.push(valObj);
		});
		return result;
	};
}
// Export for users to define their own aggregation methods.
exports.AggregatorFactory = AggregatorFactory;

/**
 * Functions that can be used to aggregate metrics from multiple registries.
 */
exports.aggregators = {
	/**
	 * @return The sum of values.
	 */
	sum: AggregatorFactory(v => v.reduce((p, c) => p + c.value, 0)),
	/**
	 * @return The first value.
	 */
	first: AggregatorFactory(v => v[0].value),
	/**
	 * @return {undefined} Undefined; omits the metric.
	 */
	omit: () => {},
	/**
	 * @return The arithmetic mean of the values.
	 */
	average: AggregatorFactory(
		v => v.reduce((p, c) => p + c.value, 0) / v.length
	),
	/**
	 * @return The minimum of the values.
	 */
	min: AggregatorFactory(v =>
		v.reduce((p, c) => Math.min(p, c.value), Infinity)
	),
	/**
	 * @return The maximum of the values.
	 */
	max: AggregatorFactory(v =>
		v.reduce((p, c) => Math.max(p, c.value), -Infinity)
	)
};


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/eventLoopLag.js":
/*!**************************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/eventLoopLag.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Gauge = __webpack_require__(/*! ../gauge */ "./node_modules/prom-client/lib/gauge.js");

const NODEJS_EVENTLOOP_LAG = 'nodejs_eventloop_lag_seconds';

function reportEventloopLag(start, gauge) {
	const delta = process.hrtime(start);
	const nanosec = delta[0] * 1e9 + delta[1];
	const seconds = nanosec / 1e9;

	gauge.set(seconds, Date.now());
}

module.exports = (registry, config = {}) => {
	const namePrefix = config.prefix ? config.prefix : '';

	const gauge = new Gauge({
		name: namePrefix + NODEJS_EVENTLOOP_LAG,
		help: 'Lag of event loop in seconds.',
		registers: registry ? [registry] : undefined,
		aggregator: 'average'
	});

	return () => {
		const start = process.hrtime();
		setImmediate(reportEventloopLag, start, gauge);
	};
};

module.exports.metricNames = [NODEJS_EVENTLOOP_LAG];


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/heapSizeAndUsed.js":
/*!*****************************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/heapSizeAndUsed.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Gauge = __webpack_require__(/*! ../gauge */ "./node_modules/prom-client/lib/gauge.js");
const safeMemoryUsage = __webpack_require__(/*! ./helpers/safeMemoryUsage */ "./node_modules/prom-client/lib/metrics/helpers/safeMemoryUsage.js");

const NODEJS_HEAP_SIZE_TOTAL = 'nodejs_heap_size_total_bytes';
const NODEJS_HEAP_SIZE_USED = 'nodejs_heap_size_used_bytes';
const NODEJS_EXTERNAL_MEMORY = 'nodejs_external_memory_bytes';

module.exports = (registry, config = {}) => {
	if (typeof process.memoryUsage !== 'function') {
		return () => {};
	}

	const registers = registry ? [registry] : undefined;
	const namePrefix = config.prefix ? config.prefix : '';

	const heapSizeTotal = new Gauge({
		name: namePrefix + NODEJS_HEAP_SIZE_TOTAL,
		help: 'Process heap size from node.js in bytes.',
		registers
	});
	const heapSizeUsed = new Gauge({
		name: namePrefix + NODEJS_HEAP_SIZE_USED,
		help: 'Process heap size used from node.js in bytes.',
		registers
	});
	let externalMemUsed;

	const usage = safeMemoryUsage();
	if (usage && usage.external) {
		externalMemUsed = new Gauge({
			name: namePrefix + NODEJS_EXTERNAL_MEMORY,
			help: 'Nodejs external memory size in bytes.',
			registers
		});
	}

	return () => {
		// process.memoryUsage() can throw EMFILE errors, see #67
		const memUsage = safeMemoryUsage();
		if (memUsage) {
			if (config.timestamps) {
				const now = Date.now();
				heapSizeTotal.set(memUsage.heapTotal, now);
				heapSizeUsed.set(memUsage.heapUsed, now);
				if (memUsage.external && externalMemUsed) {
					externalMemUsed.set(memUsage.external, now);
				}
			} else {
				heapSizeTotal.set(memUsage.heapTotal);
				heapSizeUsed.set(memUsage.heapUsed);
				if (memUsage.external && externalMemUsed) {
					externalMemUsed.set(memUsage.external);
				}
			}
		}

		return {
			total: heapSizeTotal,
			used: heapSizeUsed,
			external: externalMemUsed
		};
	};
};

module.exports.metricNames = [
	NODEJS_HEAP_SIZE_TOTAL,
	NODEJS_HEAP_SIZE_USED,
	NODEJS_EXTERNAL_MEMORY
];


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/heapSpacesSizeAndUsed.js":
/*!***********************************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/heapSpacesSizeAndUsed.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Gauge = __webpack_require__(/*! ../gauge */ "./node_modules/prom-client/lib/gauge.js");
let v8;

try {
	v8 = __webpack_require__(/*! v8 */ "v8");
} catch (e) {
	// node version is too old
	// probably we can use v8-heap-space-statistics for >=node-4.0.0 and <node-6.0.0
}

const METRICS = ['total', 'used', 'available'];

const NODEJS_HEAP_SIZE = {};

METRICS.forEach(metricType => {
	NODEJS_HEAP_SIZE[metricType] = `nodejs_heap_space_size_${metricType}_bytes`;
});

module.exports = (registry, config = {}) => {
	if (
		typeof v8 === 'undefined' ||
		typeof v8.getHeapSpaceStatistics !== 'function'
	) {
		return () => {};
	}

	const registers = registry ? [registry] : undefined;
	const namePrefix = config.prefix ? config.prefix : '';

	const gauges = {};

	METRICS.forEach(metricType => {
		gauges[metricType] = new Gauge({
			name: namePrefix + NODEJS_HEAP_SIZE[metricType],
			help: `Process heap space size ${metricType} from node.js in bytes.`,
			labelNames: ['space'],
			registers
		});
	});

	return () => {
		const data = {
			total: {},
			used: {},
			available: {}
		};
		const now = Date.now();

		v8.getHeapSpaceStatistics().forEach(space => {
			const spaceName = space.space_name.substr(
				0,
				space.space_name.indexOf('_space')
			);

			data.total[spaceName] = space.space_size;
			data.used[spaceName] = space.space_used_size;
			data.available[spaceName] = space.space_available_size;

			gauges.total.set({ space: spaceName }, space.space_size, now);
			gauges.used.set({ space: spaceName }, space.space_used_size, now);
			gauges.available.set(
				{ space: spaceName },
				space.space_available_size,
				now
			);
		});

		return data;
	};
};

module.exports.metricNames = METRICS.map(
	metricType => NODEJS_HEAP_SIZE[metricType]
);


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/helpers/processMetricsHelpers.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/helpers/processMetricsHelpers.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function aggregateByObjectName(list) {
	const data = {};

	for (let i = 0; i < list.length; i++) {
		const listElement = list[i];

		if (!listElement || typeof listElement.constructor === 'undefined') {
			continue;
		}

		if (data.hasOwnProperty(listElement.constructor.name)) {
			data[listElement.constructor.name] += 1;
		} else {
			data[listElement.constructor.name] = 1;
		}
	}
	return data;
}

function updateMetrics(gauge, data, includeTimestamp) {
	gauge.reset();
	for (const key in data) {
		if (includeTimestamp) {
			gauge.set({ type: key }, data[key], Date.now());
		} else {
			gauge.set({ type: key }, data[key]);
		}
	}
}

module.exports = {
	aggregateByObjectName,
	updateMetrics
};


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/helpers/safeMemoryUsage.js":
/*!*************************************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/helpers/safeMemoryUsage.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function safeMemoryUsage() {
	let memoryUsage;
	try {
		memoryUsage = process.memoryUsage();
	} catch (ex) {
		// empty
	}

	return memoryUsage;
}

module.exports = safeMemoryUsage;


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/osMemoryHeap.js":
/*!**************************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/osMemoryHeap.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Gauge = __webpack_require__(/*! ../gauge */ "./node_modules/prom-client/lib/gauge.js");
const linuxVariant = __webpack_require__(/*! ./osMemoryHeapLinux */ "./node_modules/prom-client/lib/metrics/osMemoryHeapLinux.js");
const safeMemoryUsage = __webpack_require__(/*! ./helpers/safeMemoryUsage */ "./node_modules/prom-client/lib/metrics/helpers/safeMemoryUsage.js");

const PROCESS_RESIDENT_MEMORY = 'process_resident_memory_bytes';

function notLinuxVariant(registry, config = {}) {
	const namePrefix = config.prefix ? config.prefix : '';

	const residentMemGauge = new Gauge({
		name: namePrefix + PROCESS_RESIDENT_MEMORY,
		help: 'Resident memory size in bytes.',
		registers: registry ? [registry] : undefined
	});

	return () => {
		const memUsage = safeMemoryUsage();

		// I don't think the other things returned from `process.memoryUsage()` is relevant to a standard export
		if (memUsage) {
			residentMemGauge.set(memUsage.rss, Date.now());
		}
	};
}

module.exports = (registry, config) =>
	process.platform === 'linux'
		? linuxVariant(registry, config)
		: notLinuxVariant(registry, config);

module.exports.metricNames =
	process.platform === 'linux'
		? linuxVariant.metricNames
		: [PROCESS_RESIDENT_MEMORY];


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/osMemoryHeapLinux.js":
/*!*******************************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/osMemoryHeapLinux.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Gauge = __webpack_require__(/*! ../gauge */ "./node_modules/prom-client/lib/gauge.js");
const fs = __webpack_require__(/*! fs */ "fs");

const values = ['VmSize', 'VmRSS', 'VmData'];

const PROCESS_RESIDENT_MEMORY = 'process_resident_memory_bytes';
const PROCESS_VIRTUAL_MEMORY = 'process_virtual_memory_bytes';
const PROCESS_HEAP = 'process_heap_bytes';

function structureOutput(input) {
	const returnValue = {};

	input
		.split('\n')
		.filter(s => values.some(value => s.indexOf(value) === 0))
		.forEach(string => {
			const split = string.split(':');

			// Get the value
			let value = split[1].trim();
			// Remove trailing ` kb`
			value = value.substr(0, value.length - 3);
			// Make it into a number in bytes bytes
			value = Number(value) * 1024;

			returnValue[split[0]] = value;
		});

	return returnValue;
}

module.exports = (registry, config = {}) => {
	const registers = registry ? [registry] : undefined;
	const namePrefix = config.prefix ? config.prefix : '';

	const residentMemGauge = new Gauge({
		name: namePrefix + PROCESS_RESIDENT_MEMORY,
		help: 'Resident memory size in bytes.',
		registers
	});
	const virtualMemGauge = new Gauge({
		name: namePrefix + PROCESS_VIRTUAL_MEMORY,
		help: 'Virtual memory size in bytes.',
		registers
	});
	const heapSizeMemGauge = new Gauge({
		name: namePrefix + PROCESS_HEAP,
		help: 'Process heap size in bytes.',
		registers
	});

	return () => {
		fs.readFile('/proc/self/status', 'utf8', (err, status) => {
			if (err) {
				return;
			}
			const now = Date.now();
			const structuredOutput = structureOutput(status);

			residentMemGauge.set(structuredOutput.VmRSS, now);
			virtualMemGauge.set(structuredOutput.VmSize, now);
			heapSizeMemGauge.set(structuredOutput.VmData, now);
		});
	};
};

module.exports.metricNames = [
	PROCESS_RESIDENT_MEMORY,
	PROCESS_VIRTUAL_MEMORY,
	PROCESS_HEAP
];


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/processCpuTotal.js":
/*!*****************************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/processCpuTotal.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Counter = __webpack_require__(/*! ../counter */ "./node_modules/prom-client/lib/counter.js");
const PROCESS_CPU_USER_SECONDS = 'process_cpu_user_seconds_total';
const PROCESS_CPU_SYSTEM_SECONDS = 'process_cpu_system_seconds_total';
const PROCESS_CPU_SECONDS = 'process_cpu_seconds_total';

module.exports = (registry, config = {}) => {
	// Don't do anything if the function doesn't exist (introduced in node@6.1.0)
	if (typeof process.cpuUsage !== 'function') {
		return () => {};
	}

	const registers = registry ? [registry] : undefined;
	const namePrefix = config.prefix ? config.prefix : '';

	const cpuUserUsageCounter = new Counter({
		name: namePrefix + PROCESS_CPU_USER_SECONDS,
		help: 'Total user CPU time spent in seconds.',
		registers
	});
	const cpuSystemUsageCounter = new Counter({
		name: namePrefix + PROCESS_CPU_SYSTEM_SECONDS,
		help: 'Total system CPU time spent in seconds.',
		registers
	});
	const cpuUsageCounter = new Counter({
		name: namePrefix + PROCESS_CPU_SECONDS,
		help: 'Total user and system CPU time spent in seconds.',
		registers
	});

	let lastCpuUsage = process.cpuUsage();

	return () => {
		const cpuUsage = process.cpuUsage();
		const now = Date.now();

		const userUsageMicros = cpuUsage.user - lastCpuUsage.user;
		const systemUsageMicros = cpuUsage.system - lastCpuUsage.system;

		lastCpuUsage = cpuUsage;

		cpuUserUsageCounter.inc(userUsageMicros / 1e6, now);
		cpuSystemUsageCounter.inc(systemUsageMicros / 1e6, now);
		cpuUsageCounter.inc((userUsageMicros + systemUsageMicros) / 1e6, now);
	};
};

module.exports.metricNames = [
	PROCESS_CPU_USER_SECONDS,
	PROCESS_CPU_SYSTEM_SECONDS,
	PROCESS_CPU_SECONDS
];


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/processHandles.js":
/*!****************************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/processHandles.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { aggregateByObjectName } = __webpack_require__(/*! ./helpers/processMetricsHelpers */ "./node_modules/prom-client/lib/metrics/helpers/processMetricsHelpers.js");
const { updateMetrics } = __webpack_require__(/*! ./helpers/processMetricsHelpers */ "./node_modules/prom-client/lib/metrics/helpers/processMetricsHelpers.js");
const Gauge = __webpack_require__(/*! ../gauge */ "./node_modules/prom-client/lib/gauge.js");

const NODEJS_ACTIVE_HANDLES = 'nodejs_active_handles';
const NODEJS_ACTIVE_HANDLES_TOTAL = 'nodejs_active_handles_total';

module.exports = (registry, config = {}) => {
	// Don't do anything if the function is removed in later nodes (exists in node@6)
	if (typeof process._getActiveHandles !== 'function') {
		return () => {};
	}

	const namePrefix = config.prefix ? config.prefix : '';

	const gauge = new Gauge({
		name: namePrefix + NODEJS_ACTIVE_HANDLES,
		help:
			'Number of active libuv handles grouped by handle type. Every handle type is C++ class name.',
		labelNames: ['type'],
		registers: registry ? [registry] : undefined
	});
	const totalGauge = new Gauge({
		name: namePrefix + NODEJS_ACTIVE_HANDLES_TOTAL,
		help: 'Total number of active handles.',
		registers: registry ? [registry] : undefined
	});

	const updater = config.timestamps
		? () => {
				const handles = process._getActiveHandles();
				updateMetrics(gauge, aggregateByObjectName(handles), true);
				totalGauge.set(handles.length, Date.now());
		  }
		: () => {
				const handles = process._getActiveHandles();
				updateMetrics(gauge, aggregateByObjectName(handles), false);
				totalGauge.set(handles.length);
		  };

	return updater;
};

module.exports.metricNames = [
	NODEJS_ACTIVE_HANDLES,
	NODEJS_ACTIVE_HANDLES_TOTAL
];


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/processMaxFileDescriptors.js":
/*!***************************************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/processMaxFileDescriptors.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Gauge = __webpack_require__(/*! ../gauge */ "./node_modules/prom-client/lib/gauge.js");
const fs = __webpack_require__(/*! fs */ "fs");

const PROCESS_MAX_FDS = 'process_max_fds';

module.exports = (registry, config = {}) => {
	let isSet = false;

	if (process.platform !== 'linux') {
		return () => {};
	}

	const namePrefix = config.prefix ? config.prefix : '';

	const fileDescriptorsGauge = new Gauge({
		name: namePrefix + PROCESS_MAX_FDS,
		help: 'Maximum number of open file descriptors.',
		registers: registry ? [registry] : undefined
	});

	return () => {
		if (isSet) {
			return;
		}

		fs.readFile('/proc/sys/fs/file-max', 'utf8', (err, maxFds) => {
			if (err) {
				return;
			}

			isSet = true;

			fileDescriptorsGauge.set(Number(maxFds));
		});
	};
};

module.exports.metricNames = [PROCESS_MAX_FDS];


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/processOpenFileDescriptors.js":
/*!****************************************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/processOpenFileDescriptors.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Gauge = __webpack_require__(/*! ../gauge */ "./node_modules/prom-client/lib/gauge.js");
const fs = __webpack_require__(/*! fs */ "fs");
const process = __webpack_require__(/*! process */ "process");

const PROCESS_OPEN_FDS = 'process_open_fds';

module.exports = (registry, config = {}) => {
	if (process.platform !== 'linux') {
		return () => {};
	}

	const namePrefix = config.prefix ? config.prefix : '';

	const fileDescriptorsGauge = new Gauge({
		name: namePrefix + PROCESS_OPEN_FDS,
		help: 'Number of open file descriptors.',
		registers: registry ? [registry] : undefined
	});

	return () => {
		fs.readdir('/proc/self/fd', (err, list) => {
			if (err) {
				return;
			}

			// Minus 1, as this invocation created one
			fileDescriptorsGauge.set(list.length - 1, Date.now());
		});
	};
};

module.exports.metricNames = [PROCESS_OPEN_FDS];


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/processRequests.js":
/*!*****************************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/processRequests.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const Gauge = __webpack_require__(/*! ../gauge */ "./node_modules/prom-client/lib/gauge.js");
const { aggregateByObjectName } = __webpack_require__(/*! ./helpers/processMetricsHelpers */ "./node_modules/prom-client/lib/metrics/helpers/processMetricsHelpers.js");
const { updateMetrics } = __webpack_require__(/*! ./helpers/processMetricsHelpers */ "./node_modules/prom-client/lib/metrics/helpers/processMetricsHelpers.js");

const NODEJS_ACTIVE_REQUESTS = 'nodejs_active_requests';
const NODEJS_ACTIVE_REQUESTS_TOTAL = 'nodejs_active_requests_total';

module.exports = (registry, config = {}) => {
	// Don't do anything if the function is removed in later nodes (exists in node@6)
	if (typeof process._getActiveRequests !== 'function') {
		return () => {};
	}

	const namePrefix = config.prefix ? config.prefix : '';

	const gauge = new Gauge({
		name: namePrefix + NODEJS_ACTIVE_REQUESTS,
		help:
			'Number of active libuv requests grouped by request type. Every request type is C++ class name.',
		labelNames: ['type'],
		registers: registry ? [registry] : undefined
	});

	const totalGauge = new Gauge({
		name: namePrefix + NODEJS_ACTIVE_REQUESTS_TOTAL,
		help: 'Total number of active requests.',
		registers: registry ? [registry] : undefined
	});

	return () => {
		const requests = process._getActiveRequests();
		updateMetrics(gauge, aggregateByObjectName(requests));
		totalGauge.set(requests.length, Date.now());
	};
};

module.exports.metricNames = [
	NODEJS_ACTIVE_REQUESTS,
	NODEJS_ACTIVE_REQUESTS_TOTAL
];


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/processStartTime.js":
/*!******************************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/processStartTime.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Gauge = __webpack_require__(/*! ../gauge */ "./node_modules/prom-client/lib/gauge.js");
const nowInSeconds = Math.round(Date.now() / 1000 - process.uptime());

const PROCESS_START_TIME = 'process_start_time_seconds';

module.exports = (registry, config = {}) => {
	const namePrefix = config.prefix ? config.prefix : '';

	const cpuUserGauge = new Gauge({
		name: namePrefix + PROCESS_START_TIME,
		help: 'Start time of the process since unix epoch in seconds.',
		registers: registry ? [registry] : undefined,
		aggregator: 'omit'
	});
	let isSet = false;

	return () => {
		if (isSet) {
			return;
		}
		cpuUserGauge.set(nowInSeconds);
		isSet = true;
	};
};

module.exports.metricNames = [PROCESS_START_TIME];


/***/ }),

/***/ "./node_modules/prom-client/lib/metrics/version.js":
/*!*********************************************************!*\
  !*** ./node_modules/prom-client/lib/metrics/version.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Gauge = __webpack_require__(/*! ../gauge */ "./node_modules/prom-client/lib/gauge.js");
const version = process.version;
const versionSegments = version
	.slice(1)
	.split('.')
	.map(Number);

const NODE_VERSION_INFO = 'nodejs_version_info';

module.exports = (registry, config = {}) => {
	const namePrefix = config.prefix ? config.prefix : '';

	const nodeVersionGauge = new Gauge({
		name: namePrefix + NODE_VERSION_INFO,
		help: 'Node.js version info.',
		labelNames: ['version', 'major', 'minor', 'patch'],
		registers: registry ? [registry] : undefined,
		aggregator: 'first'
	});
	let isSet = false;

	return () => {
		if (isSet) {
			return;
		}
		nodeVersionGauge
			.labels(
				version,
				versionSegments[0],
				versionSegments[1],
				versionSegments[2]
			)
			.set(1);
		isSet = true;
	};
};

module.exports.metricNames = [NODE_VERSION_INFO];


/***/ }),

/***/ "./node_modules/prom-client/lib/pushgateway.js":
/*!*****************************************************!*\
  !*** ./node_modules/prom-client/lib/pushgateway.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const url = __webpack_require__(/*! url */ "url");
const http = __webpack_require__(/*! http */ "http");
const https = __webpack_require__(/*! https */ "https");
const { globalRegistry } = __webpack_require__(/*! ./registry */ "./node_modules/prom-client/lib/registry.js");

class Pushgateway {
	constructor(gatewayUrl, options, registry) {
		if (!registry) {
			registry = globalRegistry;
		}
		this.registry = registry;
		this.gatewayUrl = gatewayUrl;
		this.requestOptions = Object.assign({}, options);
	}

	pushAdd(params, callback) {
		if (!params || !params.jobName) {
			throw new Error('Missing jobName parameter');
		}

		useGateway.call(this, 'POST', params.jobName, params.groupings, callback);
	}

	push(params, callback) {
		if (!params || !params.jobName) {
			throw new Error('Missing jobName parameter');
		}

		useGateway.call(this, 'PUT', params.jobName, params.groupings, callback);
	}

	delete(params, callback) {
		if (!params || !params.jobName) {
			throw new Error('Missing jobName parameter');
		}

		useGateway.call(this, 'DELETE', params.jobName, params.groupings, callback);
	}
}
function useGateway(method, job, groupings, callback) {
	// `URL` first added in v6.13.0
	// eslint-disable-next-line node/no-deprecated-api
	const gatewayUrlParsed = url.parse(this.gatewayUrl);
	const gatewayUrlPath =
		gatewayUrlParsed.pathname && gatewayUrlParsed.pathname !== '/'
			? gatewayUrlParsed.pathname
			: '';
	const path = `${gatewayUrlPath}/metrics/job/${encodeURIComponent(
		job
	)}${generateGroupings(groupings)}`;

	// eslint-disable-next-line node/no-deprecated-api
	const target = url.resolve(this.gatewayUrl, path);
	// eslint-disable-next-line node/no-deprecated-api
	const requestParams = url.parse(target);
	const httpModule = isHttps(requestParams.href) ? https : http;
	const options = Object.assign(requestParams, this.requestOptions, {
		method
	});

	const req = httpModule.request(options, res => {
		let body = '';
		res.setEncoding('utf8');
		res.on('data', chunk => {
			body += chunk;
		});
		res.on('end', () => {
			callback(null, res, body);
		});
	});
	req.on('error', err => {
		callback(err);
	});

	if (method !== 'DELETE') {
		req.write(this.registry.metrics({ timestamps: false }));
	}
	req.end();
}

function generateGroupings(groupings) {
	if (!groupings) {
		return '';
	}
	return Object.keys(groupings)
		.map(
			key => `/${encodeURIComponent(key)}/${encodeURIComponent(groupings[key])}`
		)
		.join('');
}

function isHttps(href) {
	return href.search(/^https/) !== -1;
}

module.exports = Pushgateway;


/***/ }),

/***/ "./node_modules/prom-client/lib/registry.js":
/*!**************************************************!*\
  !*** ./node_modules/prom-client/lib/registry.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const { getValueAsString } = __webpack_require__(/*! ./util */ "./node_modules/prom-client/lib/util.js");

function escapeString(str) {
	return str.replace(/\n/g, '\\n').replace(/\\(?!n)/g, '\\\\');
}
function escapeLabelValue(str) {
	if (typeof str !== 'string') {
		return str;
	}
	return escapeString(str).replace(/"/g, '\\"');
}

const defaultMetricsOpts = {
	timestamps: true
};

class Registry {
	constructor() {
		this._metrics = {};
		this._defaultLabels = {};
	}

	getMetricsAsArray() {
		return Object.keys(this._metrics).map(this.getSingleMetric, this);
	}

	getMetricAsPrometheusString(metric, conf) {
		const opts = Object.assign({}, defaultMetricsOpts, conf);
		const item = metric.get();
		const name = escapeString(item.name);
		const help = `# HELP ${name} ${escapeString(item.help)}`;
		const type = `# TYPE ${name} ${item.type}`;
		const defaultLabelNames = Object.keys(this._defaultLabels);

		let values = '';
		for (const val of item.values || []) {
			val.labels = val.labels || {};

			if (defaultLabelNames.length > 0) {
				// Make a copy before mutating
				val.labels = Object.assign({}, val.labels);
			}

			for (const labelName of defaultLabelNames) {
				val.labels[labelName] =
					val.labels[labelName] || this._defaultLabels[labelName];
			}

			let labels = '';
			for (const key of Object.keys(val.labels)) {
				labels += `${key}="${escapeLabelValue(val.labels[key])}",`;
			}

			let metricName = val.metricName || item.name;
			if (labels) {
				metricName += `{${labels.substring(0, labels.length - 1)}}`;
			}

			let line = `${metricName} ${getValueAsString(val.value)}`;
			if (opts.timestamps && val.timestamp) {
				line += ` ${val.timestamp}`;
			}
			values += `${line.trim()}\n`;
		}

		return `${help}\n${type}\n${values}`.trim();
	}

	metrics(opts) {
		let metrics = '';

		for (const metric of this.getMetricsAsArray()) {
			metrics += `${this.getMetricAsPrometheusString(metric, opts)}\n\n`;
		}

		return metrics.substring(0, metrics.length - 1);
	}

	registerMetric(metricFn) {
		if (
			this._metrics[metricFn.name] &&
			this._metrics[metricFn.name] !== metricFn
		) {
			throw new Error(
				`A metric with the name ${metricFn.name} has already been registered.`
			);
		}

		this._metrics[metricFn.name] = metricFn;
	}

	clear() {
		this._metrics = {};
		this._defaultLabels = {};
	}

	getMetricsAsJSON() {
		const metrics = [];
		const defaultLabelNames = Object.keys(this._defaultLabels);

		for (const metric of this.getMetricsAsArray()) {
			const item = metric.get();

			if (item.values) {
				for (const val of item.values) {
					for (const labelName of defaultLabelNames) {
						val.labels[labelName] =
							val.labels[labelName] || this._defaultLabels[labelName];
					}
				}
			}

			metrics.push(item);
		}

		return metrics;
	}

	removeSingleMetric(name) {
		delete this._metrics[name];
	}

	getSingleMetricAsString(name) {
		return this.getMetricAsPrometheusString(this._metrics[name]);
	}

	getSingleMetric(name) {
		return this._metrics[name];
	}

	setDefaultLabels(labels) {
		this._defaultLabels = labels;
	}

	resetMetrics() {
		for (const metric in this._metrics) {
			this._metrics[metric].reset();
		}
	}

	get contentType() {
		return 'text/plain; version=0.0.4; charset=utf-8';
	}

	static merge(registers) {
		const mergedRegistry = new Registry();

		const metricsToMerge = registers.reduce(
			(acc, reg) => acc.concat(reg.getMetricsAsArray()),
			[]
		);

		metricsToMerge.forEach(mergedRegistry.registerMetric, mergedRegistry);
		return mergedRegistry;
	}
}

module.exports = Registry;
module.exports.globalRegistry = new Registry();


/***/ }),

/***/ "./node_modules/prom-client/lib/summary.js":
/*!*************************************************!*\
  !*** ./node_modules/prom-client/lib/summary.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Summary
 */


const util = __webpack_require__(/*! util */ "util");
const { globalRegistry } = __webpack_require__(/*! ./registry */ "./node_modules/prom-client/lib/registry.js");
const type = 'summary';
const {
	getPropertiesFromObj,
	getLabels,
	hashObject,
	isObject,
	printDeprecationObjectConstructor,
	removeLabels
} = __webpack_require__(/*! ./util */ "./node_modules/prom-client/lib/util.js");
const {
	validateLabel,
	validateMetricName,
	validateLabelName
} = __webpack_require__(/*! ./validation */ "./node_modules/prom-client/lib/validation.js");
const timeWindowQuantiles = __webpack_require__(/*! ./timeWindowQuantiles */ "./node_modules/prom-client/lib/timeWindowQuantiles.js");

const DEFAULT_COMPRESS_COUNT = 1000; // every 1000 measurements

class Summary {
	/**
	 * Summary
	 * @param {string} name - Name of the metric
	 * @param {string} help - Help for the metric
	 * @param {object|Array.<string>} labelsOrConf - Either array of label names or config object as a key-value object
	 * @param {object} conf - Configuration object
	 */
	constructor(name, help, labelsOrConf, conf) {
		let config;
		if (isObject(name)) {
			config = Object.assign(
				{
					percentiles: [0.01, 0.05, 0.5, 0.9, 0.95, 0.99, 0.999],
					labelNames: []
				},
				name
			);

			if (!config.registers) {
				config.registers = [globalRegistry];
			}
		} else {
			let obj;
			let labels = [];

			if (Array.isArray(labelsOrConf)) {
				obj = conf || {};
				labels = labelsOrConf;
			} else {
				obj = labelsOrConf || {};
			}

			printDeprecationObjectConstructor();

			config = {
				name,
				help,
				labelNames: labels,
				percentiles: configurePercentiles(obj.percentiles),
				registers: [globalRegistry],
				maxAgeSeconds: obj.maxAgeSeconds,
				ageBuckets: obj.ageBuckets
			};
		}

		validateInput(config.name, config.help, config.labelNames);

		this.maxAgeSeconds = config.maxAgeSeconds;
		this.ageBuckets = config.ageBuckets;

		this.name = config.name;
		this.help = config.help;
		this.aggregator = config.aggregator || 'sum';

		this.percentiles = config.percentiles;
		this.hashMap = {};
		this.labelNames = config.labelNames || [];

		this.compressCount = config.compressCount || DEFAULT_COMPRESS_COUNT;

		if (this.labelNames.length === 0) {
			this.hashMap = {
				[hashObject({})]: {
					labels: {},
					td: new timeWindowQuantiles(this.maxAgeSeconds, this.ageBuckets),
					count: 0,
					sum: 0
				}
			};
		}

		config.registers.forEach(registryInstance =>
			registryInstance.registerMetric(this)
		);
	}

	/**
	 * Observe a value
	 * @param {object} labels - Object with labels where key is the label key and value is label value. Can only be one level deep
	 * @param {Number} value - Value to observe
	 * @returns {void}
	 */
	observe(labels, value) {
		observe.call(this, labels === 0 ? 0 : labels || {})(value);
	}

	get() {
		const data = getPropertiesFromObj(this.hashMap);
		const values = [];
		data.forEach(s => {
			extractSummariesForExport(s, this.percentiles).forEach(v => {
				values.push(v);
			});
			values.push(getSumForExport(s, this));
			values.push(getCountForExport(s, this));
		});

		return {
			name: this.name,
			help: this.help,
			type,
			values,
			aggregator: this.aggregator
		};
	}

	reset() {
		const data = getPropertiesFromObj(this.hashMap);
		data.forEach(s => {
			s.td.reset();
			s.count = 0;
			s.sum = 0;
		});
	}

	/**
	 * Start a timer that could be used to logging durations
	 * @param {object} labels - Object with labels where key is the label key and value is label value. Can only be one level deep
	 * @returns {function} - Function to invoke when you want to stop the timer and observe the duration in seconds
	 * @example
	 * var end = summary.startTimer();
	 * makeExpensiveXHRRequest(function(err, res) {
	 *	end(); //Observe the duration of expensiveXHRRequest
	 * });
	 */
	startTimer(labels) {
		return startTimer.call(this, labels)();
	}

	labels() {
		const labels = getLabels(this.labelNames, arguments);
		return {
			observe: observe.call(this, labels),
			startTimer: startTimer.call(this, labels)
		};
	}

	remove() {
		const labels = getLabels(this.labelNames, arguments);
		removeLabels.call(this, this.hashMap, labels);
	}
}

function extractSummariesForExport(summaryOfLabels, percentiles) {
	summaryOfLabels.td.compress();

	return percentiles.map(percentile => {
		const percentileValue = summaryOfLabels.td.percentile(percentile);
		return {
			labels: Object.assign({ quantile: percentile }, summaryOfLabels.labels),
			value: percentileValue ? percentileValue : 0
		};
	});
}

function getCountForExport(value, summary) {
	return {
		metricName: `${summary.name}_count`,
		labels: value.labels,
		value: value.count
	};
}

function getSumForExport(value, summary) {
	return {
		metricName: `${summary.name}_sum`,
		labels: value.labels,
		value: value.sum
	};
}

function startTimer(startLabels) {
	return () => {
		const start = process.hrtime();
		return endLabels => {
			const delta = process.hrtime(start);
			this.observe(
				Object.assign({}, startLabels, endLabels),
				delta[0] + delta[1] / 1e9
			);
		};
	};
}

function validateInput(name, help, labels) {
	if (!help) {
		throw new Error('Missing mandatory help parameter');
	}
	if (!name) {
		throw new Error('Missing mandatory name parameter');
	}

	if (!validateMetricName(name)) {
		throw new Error('Invalid metric name');
	}

	if (!validateLabelName(labels)) {
		throw new Error('Invalid label name');
	}

	labels.forEach(label => {
		if (label === 'quantile') {
			throw new Error('quantile is a reserved label keyword');
		}
	});
}

function configurePercentiles(configuredPercentiles) {
	const defaultPercentiles = [0.01, 0.05, 0.5, 0.9, 0.95, 0.99, 0.999];
	return []
		.concat(configuredPercentiles || defaultPercentiles)
		.sort(sortAscending);
}

function sortAscending(x, y) {
	return x - y;
}

function observe(labels) {
	return value => {
		const labelValuePair = convertLabelsAndValues(labels, value);

		validateLabel(this.labelNames, this.labels);
		if (!Number.isFinite(labelValuePair.value)) {
			throw new TypeError(
				`Value is not a valid number: ${util.format(labelValuePair.value)}`
			);
		}

		const hash = hashObject(labelValuePair.labels);
		let summaryOfLabel = this.hashMap[hash];
		if (!summaryOfLabel) {
			summaryOfLabel = {
				labels: labelValuePair.labels,
				td: new timeWindowQuantiles(this.maxAgeSeconds, this.ageBuckets),
				count: 0,
				sum: 0
			};
		}

		summaryOfLabel.td.push(labelValuePair.value);
		summaryOfLabel.count++;
		if (summaryOfLabel.count % this.compressCount === 0) {
			summaryOfLabel.td.compress();
		}
		summaryOfLabel.sum += labelValuePair.value;
		this.hashMap[hash] = summaryOfLabel;
	};
}

function convertLabelsAndValues(labels, value) {
	if (value === undefined) {
		return {
			value: labels,
			labels: {}
		};
	}

	return {
		labels,
		value
	};
}

module.exports = Summary;


/***/ }),

/***/ "./node_modules/prom-client/lib/timeWindowQuantiles.js":
/*!*************************************************************!*\
  !*** ./node_modules/prom-client/lib/timeWindowQuantiles.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { TDigest } = __webpack_require__(/*! tdigest */ "./node_modules/tdigest/tdigest.js");

class TimeWindowQuantiles {
	constructor(maxAgeSeconds, ageBuckets) {
		this.maxAgeSeconds = maxAgeSeconds || 0;
		this.ageBuckets = ageBuckets || 0;

		this.shouldRotate = maxAgeSeconds && ageBuckets;

		this.ringBuffer = Array(ageBuckets).fill(new TDigest());
		this.currentBuffer = 0;

		this.lastRotateTimestampMillis = Date.now();
		this.durationBetweenRotatesMillis =
			(maxAgeSeconds * 1000) / ageBuckets || Infinity;
	}

	percentile(quantile) {
		const bucket = rotate.call(this);
		return bucket.percentile(quantile);
	}

	push(value) {
		rotate.call(this);
		this.ringBuffer.forEach(bucket => {
			bucket.push(value);
		});
	}

	reset() {
		this.ringBuffer.forEach(bucket => {
			bucket.reset();
		});
	}

	compress() {
		this.ringBuffer.forEach(bucket => {
			bucket.compress();
		});
	}
}

function rotate() {
	let timeSinceLastRotateMillis = Date.now() - this.lastRotateTimestampMillis;
	while (
		timeSinceLastRotateMillis > this.durationBetweenRotatesMillis &&
		this.shouldRotate
	) {
		this.ringBuffer[this.currentBuffer] = new TDigest();

		if (++this.currentBuffer >= this.ringBuffer.length) {
			this.currentBuffer = 0;
		}
		timeSinceLastRotateMillis -= this.durationBetweenRotatesMillis;
		this.lastRotateTimestampMillis += this.durationBetweenRotatesMillis;
	}
	return this.ringBuffer[this.currentBuffer];
}

module.exports = TimeWindowQuantiles;


/***/ }),

/***/ "./node_modules/prom-client/lib/util.js":
/*!**********************************************!*\
  !*** ./node_modules/prom-client/lib/util.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const deprecationsEmitted = {};

exports.isDate = isDate;

exports.getPropertiesFromObj = function(hashMap) {
	const obj = Object.keys(hashMap).map(x => hashMap[x]);
	return obj;
};

exports.getValueAsString = function getValueString(value) {
	if (Number.isNaN(value)) {
		return 'Nan';
	} else if (!Number.isFinite(value)) {
		if (value < 0) {
			return '-Inf';
		} else {
			return '+Inf';
		}
	} else {
		return `${value}`;
	}
};

exports.removeLabels = function removeLabels(hashMap, labels) {
	const hash = hashObject(labels);
	delete hashMap[hash];
};

exports.setValue = function setValue(hashMap, value, labels, timestamp) {
	const hash = hashObject(labels);
	hashMap[hash] = {
		value: typeof value === 'number' ? value : 0,
		labels: labels || {},
		timestamp: isDate(timestamp)
			? timestamp.valueOf()
			: Number.isFinite(timestamp)
			? timestamp
			: undefined
	};
	return hashMap;
};

// TODO: For node 6, use rest params
exports.getLabels = function(labelNames, args) {
	if (labelNames.length !== args.length) {
		throw new Error('Invalid number of arguments');
	}

	const argsAsArray = Array.prototype.slice.call(args);
	return labelNames.reduce((acc, label, index) => {
		acc[label] = argsAsArray[index];
		return acc;
	}, {});
};

function hashObject(labels) {
	// We don't actually need a hash here. We just need a string that
	// is unique for each possible labels object and consistent across
	// calls with equivalent labels objects.
	let keys = Object.keys(labels);
	if (keys.length === 0) {
		return '';
	}
	// else
	if (keys.length > 1) {
		keys = keys.sort(); // need consistency across calls
	}

	let hash = '';
	let i = 0;
	const size = keys.length;
	for (; i < size - 1; i++) {
		hash += `${keys[i]}:${labels[keys[i]]},`;
	}
	hash += `${keys[i]}:${labels[keys[i]]}`;
	return hash;
}
exports.hashObject = hashObject;

function isDate(obj) {
	return obj instanceof Date && !isNaN(obj.valueOf());
}
exports.isObject = function isObject(obj) {
	return obj === Object(obj);
};

function printDeprecation(msg) {
	if (deprecationsEmitted[msg]) {
		return;
	}

	deprecationsEmitted[msg] = true;

	if (process.emitWarning) {
		process.emitWarning(msg, 'DeprecationWarning');
	} else {
		// Check can be removed when we only support node@>=6
		// eslint-disable-next-line no-console
		console.warn(new Error(msg));
	}
}

exports.printDeprecationObjectConstructor = () => {
	printDeprecation(
		'prom-client - Passing a non-object to metrics constructor is deprecated'
	);
};

exports.printDeprecationCollectDefaultMetricsNumber = timeout => {
	printDeprecation(
		`prom-client - A number to defaultMetrics is deprecated, please use \`collectDefaultMetrics({ timeout: ${timeout} })\`.`
	);
};

class Grouper extends Map {
	/**
	 * Adds the `value` to the `key`'s array of values.
	 * @param {*} key Key to set.
	 * @param {*} value Value to add to `key`'s array.
	 * @returns {undefined} undefined.
	 */
	add(key, value) {
		if (this.has(key)) {
			this.get(key).push(value);
		} else {
			this.set(key, [value]);
		}
	}
}

exports.Grouper = Grouper;


/***/ }),

/***/ "./node_modules/prom-client/lib/validation.js":
/*!****************************************************!*\
  !*** ./node_modules/prom-client/lib/validation.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const util = __webpack_require__(/*! util */ "util");

// These are from https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels
const metricRegexp = /^[a-zA-Z_:][a-zA-Z0-9_:]*$/;
const labelRegexp = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

exports.validateMetricName = function(name) {
	return metricRegexp.test(name);
};

exports.validateLabelName = function(names) {
	let valid = true;
	(names || []).forEach(name => {
		if (!labelRegexp.test(name)) {
			valid = false;
		}
	});
	return valid;
};

exports.validateLabel = function validateLabel(savedLabels, labels) {
	Object.keys(labels).forEach(label => {
		if (savedLabels.indexOf(label) === -1) {
			throw new Error(
				`Added label "${label}" is not included in initial labelset: ${util.inspect(
					savedLabels
				)}`
			);
		}
	});
};


/***/ }),

/***/ "./node_modules/supports-color/index.js":
/*!**********************************************!*\
  !*** ./node_modules/supports-color/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(/*! os */ "os");
const hasFlag = __webpack_require__(/*! has-flag */ "./node_modules/has-flag/index.js");

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}
if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === true || env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === false || env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),

/***/ "./node_modules/tdigest/tdigest.js":
/*!*****************************************!*\
  !*** ./node_modules/tdigest/tdigest.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//
// TDigest:
//
// approximate distribution percentiles from a stream of reals
//
var RBTree = __webpack_require__(/*! bintrees */ "./node_modules/bintrees/index.js").RBTree;

function TDigest(delta, K, CX) {
    // allocate a TDigest structure.
    //
    // delta is the compression factor, the max fraction of mass that
    // can be owned by one centroid (bigger, up to 1.0, means more
    // compression). delta=false switches off TDigest behavior and treats
    // the distribution as discrete, with no merging and exact values
    // reported.
    //
    // K is a size threshold that triggers recompression as the TDigest
    // grows during input.  (Set it to 0 to disable automatic recompression)
    //
    // CX specifies how often to update cached cumulative totals used
    // for quantile estimation during ingest (see cumulate()).  Set to
    // 0 to use exact quantiles for each new point.
    //
    this.discrete = (delta === false);
    this.delta = delta || 0.01;
    this.K = (K === undefined) ? 25 : K;
    this.CX = (CX === undefined) ? 1.1 : CX;
    this.centroids = new RBTree(compare_centroid_means);
    this.nreset = 0;
    this.reset();
}

TDigest.prototype.reset = function() {
    // prepare to digest new points.
    //
    this.centroids.clear();
    this.n = 0;
    this.nreset += 1;
    this.last_cumulate = 0;
};

TDigest.prototype.size = function() {
    return this.centroids.size;
};

TDigest.prototype.toArray = function(everything) {
    // return {mean,n} of centroids as an array ordered by mean.
    //
    var result = [];
    if (everything) {
        this._cumulate(true); // be sure cumns are exact
        this.centroids.each(function(c) { result.push(c); });
    } else {
        this.centroids.each(function(c) { result.push({mean:c.mean, n:c.n}); });
    }
    return result;
};

TDigest.prototype.summary = function() {
    var approx = (this.discrete) ? "exact " : "approximating ";
    var s = [approx + this.n + " samples using " + this.size() + " centroids",
             "min = "+this.percentile(0),
             "Q1  = "+this.percentile(0.25),
             "Q2  = "+this.percentile(0.5),
             "Q3  = "+this.percentile(0.75),
             "max = "+this.percentile(1.0)];
    return s.join('\n');
};

function compare_centroid_means(a, b) {
    // order two centroids by mean.
    //
    return (a.mean > b.mean) ? 1 : (a.mean < b.mean) ? -1 : 0;
}

function compare_centroid_mean_cumns(a, b) {
    // order two centroids by mean_cumn.
    //
    return (a.mean_cumn - b.mean_cumn);
}

TDigest.prototype.push = function(x, n) {
    // incorporate value or array of values x, having count n into the
    // TDigest. n defaults to 1.
    //
    n = n || 1;
    x = Array.isArray(x) ? x : [x];
    for (var i = 0 ; i < x.length ; i++) {
        this._digest(x[i], n);
    }
};

TDigest.prototype.push_centroid = function(c) {
    // incorporate centroid or array of centroids c
    //
    c = Array.isArray(c) ? c : [c];
    for (var i = 0 ; i < c.length ; i++) {
        this._digest(c[i].mean, c[i].n);
    }
};

TDigest.prototype._cumulate = function(exact) {
    // update cumulative counts for each centroid
    //
    // exact: falsey means only cumulate after sufficient
    // growth. During ingest, these counts are used as quantile
    // estimates, and they work well even when somewhat out of
    // date. (this is a departure from the publication, you may set CX
    // to 0 to disable).
    //
    if (this.n === this.last_cumulate ||
        !exact && this.CX && this.CX > (this.n / this.last_cumulate)) {
        return;
    }
    var cumn = 0;
    var self = this;
    this.centroids.each(function(c) {
        c.mean_cumn = cumn + c.n / 2; // half of n at the mean
        cumn = c.cumn = cumn + c.n;
    });
    this.n = this.last_cumulate = cumn;
};

TDigest.prototype.find_nearest = function(x) {
    // find the centroid closest to x. The assumption of
    // unique means and a unique nearest centroid departs from the
    // paper, see _digest() below
    //
    if (this.size() === 0) {
        return null;
    }
    var iter = this.centroids.lowerBound({mean:x}); // x <= iter || iter==null
    var c = (iter.data() === null) ? iter.prev() : iter.data();
    if (c.mean === x || this.discrete) {
        return c; // c is either x or a neighbor (discrete: no distance func)
    }
    var prev = iter.prev();
    if (prev && Math.abs(prev.mean - x) < Math.abs(c.mean - x)) {
        return prev;
    } else {
        return c;
    }
};

TDigest.prototype._new_centroid = function(x, n, cumn) {
    // create and insert a new centroid into the digest (don't update
    // cumulatives).
    //
    var c = {mean:x, n:n, cumn:cumn};
    this.centroids.insert(c);
    this.n += n;
    return c;
};

TDigest.prototype._addweight = function(nearest, x, n) {
    // add weight at location x to nearest centroid.  adding x to
    // nearest will not shift its relative position in the tree and
    // require reinsertion.
    //
    if (x !== nearest.mean) {
        nearest.mean += n * (x - nearest.mean) / (nearest.n + n);
    }
    nearest.cumn += n;
    nearest.mean_cumn += n / 2;
    nearest.n += n;
    this.n += n;
};

TDigest.prototype._digest = function(x, n) {
    // incorporate value x, having count n into the TDigest.
    //
    var min = this.centroids.min();
    var max = this.centroids.max();
    var nearest = this.find_nearest(x);
    if (nearest && nearest.mean === x) {
        // accumulate exact matches into the centroid without
        // limit. this is a departure from the paper, made so
        // centroids remain unique and code can be simple.
        this._addweight(nearest, x, n);
    } else if (nearest === min) {
        this._new_centroid(x, n, 0); // new point around min boundary
    } else if (nearest === max ) {
        this._new_centroid(x, n, this.n); // new point around max boundary
    } else if (this.discrete) {
        this._new_centroid(x, n, nearest.cumn); // never merge
    } else {
        // conider a merge based on nearest centroid's capacity. if
        // there's not room for all of n, don't bother merging any of
        // it into nearest, as we'll have to make a new centroid
        // anyway for the remainder (departure from the paper).
        var p = nearest.mean_cumn / this.n;
        var max_n = Math.floor(4 * this.n * this.delta * p * (1 - p));
        if (max_n - nearest.n >= n) {
            this._addweight(nearest, x, n);
        } else {
            this._new_centroid(x, n, nearest.cumn);
        }
    }
    this._cumulate(false);
    if (!this.discrete && this.K && this.size() > this.K / this.delta) {
        // re-process the centroids and hope for some compression.
        this.compress();
    }
};

TDigest.prototype.bound_mean = function(x) {
    // find centroids lower and upper such that lower.mean < x <
    // upper.mean or lower.mean === x === upper.mean. Don't call
    // this for x out of bounds.
    //
    var iter = this.centroids.upperBound({mean:x}); // x < iter
    var lower = iter.prev();      // lower <= x
    var upper = (lower.mean === x) ? lower : iter.next();
    return [lower, upper];
};

TDigest.prototype.p_rank = function(x_or_xlist) {
    // return approximate percentile-ranks (0..1) for data value x.
    // or list of x.  calculated according to
    // https://en.wikipedia.org/wiki/Percentile_rank
    //
    // (Note that in continuous mode, boundary sample values will
    // report half their centroid weight inward from 0/1 as the
    // percentile-rank. X values outside the observed range return
    // 0/1)
    //
    // this triggers cumulate() if cumn's are out of date.
    //
    var xs = Array.isArray(x_or_xlist) ? x_or_xlist : [x_or_xlist];
    var ps = xs.map(this._p_rank, this);
    return Array.isArray(x_or_xlist) ? ps : ps[0];
};

TDigest.prototype._p_rank = function(x) {
    if (this.size() === 0) {
        return undefined;
    } else if (x < this.centroids.min().mean) {
        return 0.0;
    } else if (x > this.centroids.max().mean) {
        return 1.0;
    }
    // find centroids that bracket x and interpolate x's cumn from
    // their cumn's.
    this._cumulate(true); // be sure cumns are exact
    var bound = this.bound_mean(x);
    var lower = bound[0], upper = bound[1];
    if (this.discrete) {
        return lower.cumn / this.n;
    } else {
        var cumn = lower.mean_cumn;
        if (lower !== upper) {
            cumn += (x - lower.mean) * (upper.mean_cumn - lower.mean_cumn) / (upper.mean - lower.mean);
        }
        return cumn / this.n;
    }
};

TDigest.prototype.bound_mean_cumn = function(cumn) {
    // find centroids lower and upper such that lower.mean_cumn < x <
    // upper.mean_cumn or lower.mean_cumn === x === upper.mean_cumn. Don't call
    // this for cumn out of bounds.
    //
    // XXX because mean and mean_cumn give rise to the same sort order
    // (up to identical means), use the mean rbtree for our search.
    this.centroids._comparator = compare_centroid_mean_cumns;
    var iter = this.centroids.upperBound({mean_cumn:cumn}); // cumn < iter
    this.centroids._comparator = compare_centroid_means;
    var lower = iter.prev();      // lower <= cumn
    var upper = (lower && lower.mean_cumn === cumn) ? lower : iter.next();
    return [lower, upper];
};

TDigest.prototype.percentile = function(p_or_plist) {
    // for percentage p (0..1), or for each p in a list of ps, return
    // the smallest data value q at which at least p percent of the
    // observations <= q.
    //
    // for discrete distributions, this selects q using the Nearest
    // Rank Method
    // (https://en.wikipedia.org/wiki/Percentile#The_Nearest_Rank_method)
    // (in scipy, same as percentile(...., interpolation='higher')
    //
    // for continuous distributions, interpolates data values between
    // count-weighted bracketing means.
    //
    // this triggers cumulate() if cumn's are out of date.
    //
    var ps = Array.isArray(p_or_plist) ? p_or_plist : [p_or_plist];
    var qs = ps.map(this._percentile, this);
    return Array.isArray(p_or_plist) ? qs : qs[0];
};

TDigest.prototype._percentile = function(p) {
    if (this.size() === 0) {
        return undefined;
    }
    this._cumulate(true); // be sure cumns are exact
    var min = this.centroids.min();
    var max = this.centroids.max();
    var h = this.n * p;
    var bound = this.bound_mean_cumn(h);
    var lower = bound[0], upper = bound[1];

    if (upper === lower || lower === null || upper === null) {
        return (lower || upper).mean;
    } else if (!this.discrete) {
        return lower.mean + (h - lower.mean_cumn) * (upper.mean - lower.mean) / (upper.mean_cumn - lower.mean_cumn);
    } else if (h <= lower.cumn) {
        return lower.mean;
    } else {
        return upper.mean;
    }
};

function pop_random(choices) {
    // remove and return an item randomly chosen from the array of choices
    // (mutates choices)
    //
    var idx = Math.floor(Math.random() * choices.length);
    return choices.splice(idx, 1)[0];
}

TDigest.prototype.compress = function() {
    // TDigests experience worst case compression (none) when input
    // increases monotonically.  Improve on any bad luck by
    // reconsuming digest centroids as if they were weighted points
    // while shuffling their order (and hope for the best).
    //
    if (this.compressing) {
        return;
    }
    var points = this.toArray();
    this.reset();
    this.compressing = true;
    while (points.length > 0) {
        this.push_centroid(pop_random(points));
    }
    this._cumulate(true);
    this.compressing = false;
};

function Digest(config) {
    // allocate a distribution digest structure. This is an extension
    // of a TDigest structure that starts in exact histogram (discrete)
    // mode, and automatically switches to TDigest mode for large
    // samples that appear to be from a continuous distribution.
    //
    this.config = config || {};
    this.mode = this.config.mode || 'auto'; // disc, cont, auto
    TDigest.call(this, this.mode === 'cont' ? config.delta : false);
    this.digest_ratio = this.config.ratio || 0.9;
    this.digest_thresh = this.config.thresh || 1000;
    this.n_unique = 0;
}
Digest.prototype = Object.create(TDigest.prototype);
Digest.prototype.constructor = Digest;

Digest.prototype.push = function(x_or_xlist) {
    TDigest.prototype.push.call(this, x_or_xlist);
    this.check_continuous();
};

Digest.prototype._new_centroid = function(x, n, cumn) {
    this.n_unique += 1;
    TDigest.prototype._new_centroid.call(this, x, n, cumn);
};

Digest.prototype._addweight = function(nearest, x, n) {
    if (nearest.n === 1) {
        this.n_unique -= 1;
    }
    TDigest.prototype._addweight.call(this, nearest, x, n);
};

Digest.prototype.check_continuous = function() {
    // while in 'auto' mode, if there are many unique elements, assume
    // they are from a continuous distribution and switch to 'cont'
    // mode (tdigest behavior). Return true on transition from
    // disctete to continuous.
    if (this.mode !== 'auto' || this.size() < this.digest_thresh) {
        return false;
    }
    if (this.n_unique / this.size() > this.digest_ratio) {
        this.mode = 'cont';
        this.discrete = false;
        this.delta = this.config.delta || 0.01;
        this.compress();
        return true;
    }
    return false;
};

module.exports = {
    'TDigest': TDigest,
    'Digest': Digest
};


/***/ }),

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/lib/rng.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

var crypto = __webpack_require__(/*! crypto */ "crypto");

module.exports = function nodeRNG() {
  return crypto.randomBytes(16);
};


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, main, author, license, private, dependencies, devDependencies, scripts, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"onuser\",\"version\":\"1.1.0\",\"main\":\"index.ts\",\"author\":\"Kamontat Chantrachirathumrong\",\"license\":\"MIT\",\"private\":true,\"dependencies\":{\"pm2\":\"4.2.3\",\"prom-client\":\"11.5.3\",\"uuid\":\"3.4.0\"},\"devDependencies\":{\"@types/debug\":\"4.1.5\",\"@types/node\":\"13.7.1\",\"@types/uuid\":\"3.4.7\",\"debug\":\"4.1.1\",\"ts-loader\":\"6.2.1\",\"typescript\":\"3.7.5\",\"webpack\":\"4.41.6\",\"webpack-cli\":\"3.3.11\"},\"scripts\":{\"compile\":\"webpack\",\"start\":\"node ./dist/index.js\",\"docker\":\"docker build --tag gcr.io/the-tokenizer-268111/onuser .\",\"deploy:docker\":\"docker push gcr.io/the-tokenizer-268111/onuser\"}}");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(__webpack_require__(/*! ./request */ "./src/request.ts"));
var server_1 = __importDefault(__webpack_require__(/*! ./server */ "./src/server.ts"));
var logger_1 = __importDefault(__webpack_require__(/*! ./logger */ "./src/logger.ts"));
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var prom_1 = __importDefault(__webpack_require__(/*! ./prom */ "./src/prom.ts"));
var pjson = __webpack_require__(/*! ../package.json */ "./package.json");
// Logger.enableAll();
var logger = logger_1.default.namespace("server");
logger.debug("Starting application...");
logger.debug(pjson);
var paymentplus_host = utils_1.O.ption(process.env.PAYMENTPLUS_HOST).getOrElse("paymentplus.heroapp.dev");
var paymentplus_path = utils_1.O.ption(process.env.PAYMENTPLUS_PATH).getOrElse("/api/online-users/?format=json");
var paymentplus_auth_username = utils_1.O.ption(process.env.PAYMENTPLUS_AUTH_USERNAME).getOrElse("admin");
var paymentplus_auth_password = utils_1.O.ption(process.env.PAYMENTPLUS_AUTH_PASSWORD).getOrElse("password");
var host = utils_1.O.ption(process.env.HOST).getOrElse("0.0.0.0");
var port = utils_1.T.ry(function () { return parseInt(utils_1.O.ption(process.env.PORT).getOrElse("")); }).getOrElse(1234);
var prom = new prom_1.default({
    paymentplus_online_user: prom_1.default.Gauge({
        name: "paymentplus_online_user_count",
        help: "currently online user in paymentplus"
    }),
    paymentplus_error: prom_1.default.Gauge({
        name: "paymentplus_system_failure",
        help: "paymentplus system failure"
    })
});
var timeout = prom.applyDefault();
prom.label({ appversion: pjson.version, appname: pjson.name });
prom.register();
var server = new server_1.default(function (req, res) {
    if (req.url !== "/metrics" && req.url !== "/") {
        logger.warn("Seem someone called " + req.url + " path");
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Not found");
        return;
    }
    var request = new request_1.default({
        hostname: "" + paymentplus_host,
        path: "" + paymentplus_path,
        auth: paymentplus_auth_username + ":" + paymentplus_auth_password
    });
    request.make().then(function (data) {
        utils_1.T.ry(function () {
            var trycatch = utils_1.T.ry(function () { return JSON.parse(data); });
            var response = trycatch.getOrElse({ count: 0 });
            var error = trycatch.failed() ? 1 : 0;
            prom.get("paymentplus_online_user").set(response.count, new Date());
            prom.get("paymentplus_error").set(error, new Date());
            res.writeHead(200, { "Content-Type": prom.contentType });
            res.end(prom.export());
        }).catch(function () {
            res.writeHead(200, { "Content-Type": prom.contentType });
            res.end(prom.export());
        });
    });
});
server.start(host, port).then(function (_a) {
    var host = _a.host, port = _a.port;
    logger.info("Start application at http://" + host + ":" + port);
});
process.on("SIGINT", function () {
    logger.debug("Stoping application...");
    clearInterval(timeout);
    server
        .stop()
        .then(function () {
        logger.info("Stop application");
        process.exit(0);
    })
        .catch(function (e) {
        logger.error(e);
        process.exit(1);
    });
});


/***/ }),

/***/ "./src/logger.ts":
/*!***********************!*\
  !*** ./src/logger.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(__webpack_require__(/*! debug */ "./node_modules/debug/src/index.js"));
var _Logger = /** @class */ (function () {
    function _Logger() {
        var _a;
        var namespaces = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            namespaces[_i] = arguments[_i];
        }
        this.namespace = (_a = [_Logger.ROOT_NAMESPACE]).concat.apply(_a, namespaces).join(_Logger.NAMESPACE_SEPERATOR);
    }
    Object.defineProperty(_Logger, "ROOT_NAMESPACE", {
        get: function () {
            return "onuser";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Logger, "NAMESPACE_SEPERATOR", {
        get: function () {
            return ":";
        },
        enumerable: true,
        configurable: true
    });
    _Logger.prototype.debug = function (format) {
        var msg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            msg[_i - 1] = arguments[_i];
        }
        if (!this._debug) {
            this._debug = debug_1.default(this.namespace.concat(_Logger.NAMESPACE_SEPERATOR, "debug"));
            this._debug.log = console.debug.bind(console);
        }
        this._debug.apply(this, __spreadArrays([format], msg));
    };
    _Logger.prototype.info = function (format) {
        var msg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            msg[_i - 1] = arguments[_i];
        }
        if (!this._info) {
            this._info = debug_1.default(this.namespace.concat(_Logger.NAMESPACE_SEPERATOR, "info"));
            this._info.log = console.info.bind(console);
        }
        this._info.apply(this, __spreadArrays([format], msg));
    };
    _Logger.prototype.warn = function (format) {
        var msg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            msg[_i - 1] = arguments[_i];
        }
        if (!this._warn) {
            this._warn = debug_1.default(this.namespace.concat(_Logger.NAMESPACE_SEPERATOR, "warn"));
            this._warn.log = console.warn.bind(console);
        }
        this._warn.apply(this, __spreadArrays([format], msg));
    };
    _Logger.prototype.error = function (format) {
        var msg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            msg[_i - 1] = arguments[_i];
        }
        if (!this._error) {
            this._error = debug_1.default(this.namespace.concat(_Logger.NAMESPACE_SEPERATOR, "error"));
            this._error.log = console.error.bind(console);
        }
        this._error.apply(this, __spreadArrays([format], msg));
    };
    return _Logger;
}());
exports._Logger = _Logger;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.namespace = function () {
        var name = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            name[_i] = arguments[_i];
        }
        return new (_Logger.bind.apply(_Logger, __spreadArrays([void 0], name)))();
    };
    Logger.enableAll = function () {
        debug_1.default.enable("" + _Logger.ROOT_NAMESPACE + _Logger.NAMESPACE_SEPERATOR + "*");
    };
    return Logger;
}());
exports.default = Logger;


/***/ }),

/***/ "./src/prom.ts":
/*!*********************!*\
  !*** ./src/prom.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prom_client_1 = __importDefault(__webpack_require__(/*! prom-client */ "./node_modules/prom-client/index.js"));
var logger_1 = __importDefault(__webpack_require__(/*! ./logger */ "./src/logger.ts"));
var logger = logger_1.default.namespace("prometheus");
var Prometheus = /** @class */ (function () {
    function Prometheus(_statistic) {
        this._statistic = _statistic;
        this._register = new prom_client_1.default.Registry();
    }
    Prometheus.Counter = function (options) {
        logger.debug("create new Counter of " + options.name);
        return new prom_client_1.default.Counter(options);
    };
    Prometheus.Gauge = function (options) {
        logger.debug("create new Gauge of " + options.name);
        return new prom_client_1.default.Gauge(options);
    };
    Prometheus.prototype.label = function (labels) {
        this._register.setDefaultLabels(labels);
    };
    Prometheus.prototype.get = function (name) {
        return this._statistic[name];
    };
    Prometheus.prototype.register = function () {
        var _this = this;
        Object.keys(this._statistic).map(function (k) {
            logger.debug("register " + k + " to prom register instance");
            _this._register.registerMetric(_this.get(k));
        });
    };
    Prometheus.prototype.applyDefault = function () {
        return prom_client_1.default.collectDefaultMetrics({ register: this._register });
    };
    Prometheus.prototype.merge = function (register) {
        this._register = prom_client_1.default.Registry.merge([this._register, register]);
    };
    Object.defineProperty(Prometheus.prototype, "contentType", {
        get: function () {
            return this._register.contentType;
        },
        enumerable: true,
        configurable: true
    });
    Prometheus.prototype.export = function () {
        return this._register.metrics();
    };
    return Prometheus;
}());
exports.default = Prometheus;


/***/ }),

/***/ "./src/request.ts":
/*!************************!*\
  !*** ./src/request.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var https_1 = __importDefault(__webpack_require__(/*! https */ "https"));
var Request = /** @class */ (function () {
    function Request(options) {
        this.options = options;
    }
    Request.prototype.make = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            https_1.default
                .get(_this.options, function (res) {
                var data = "";
                // A chunk of data has been recieved.
                res.on("data", function (chunk) {
                    data += chunk;
                });
                // The whole response has been received. Print out the result.
                res.on("end", function () {
                    resolve(data);
                });
            })
                .on("error", function (err) { return reject(err); });
        });
    };
    return Request;
}());
exports.default = Request;


/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(__webpack_require__(/*! http */ "http"));
var Server = /** @class */ (function () {
    function Server(listener) {
        this.instance = http_1.default.createServer(listener);
    }
    Server.prototype.start = function (host, port) {
        var _this = this;
        return new Promise(function (res) {
            _this.instance.listen(port, host, function () {
                res({ host: host, port: port });
            });
        });
    };
    Server.prototype.stop = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.instance.close(function (e) { return (e ? rej(e) : res()); });
        });
    };
    return Server;
}());
exports.default = Server;


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(__webpack_require__(/*! ./logger */ "./src/logger.ts"));
var uuid_1 = __importDefault(__webpack_require__(/*! uuid */ "./node_modules/uuid/index.js"));
var logger = logger_1.default.namespace("utils");
var Serialization = /** @class */ (function () {
    function Serialization(__name) {
        if (__name === void 0) { __name = "Serialization"; }
        this.__name = __name;
        this.__uuid = uuid_1.default.v4().slice(0, 8);
        logger.debug("create " + __name + "[" + this.__uuid + "] instance...");
    }
    Object.defineProperty(Serialization.prototype, "object", {
        get: function () {
            return this.name + "[" + this.uuid + "]";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Serialization.prototype, "name", {
        get: function () {
            return this.__name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Serialization.prototype, "uuid", {
        get: function () {
            return this.__uuid;
        },
        enumerable: true,
        configurable: true
    });
    return Serialization;
}());
exports.Serialization = Serialization;
var O = /** @class */ (function (_super) {
    __extends(O, _super);
    function O(t) {
        var _this = _super.call(this, "Option") || this;
        _this.t = t;
        logger.debug("  create option with " + t);
        return _this;
    }
    O.ption = function (t) {
        return new O(t);
    };
    O.prototype.getOrElse = function (t) {
        if (this.t === undefined ||
            this.t === null ||
            (typeof this.t === "number" && (isNaN(this.t) || isFinite(this.t)))) {
            logger.debug(this.object + " is falling back to default (" + t + ")");
            return t;
        }
        else {
            logger.debug(this.object + " is exist");
            return this.t;
        }
    };
    return O;
}(Serialization));
exports.O = O;
var T = /** @class */ (function (_super) {
    __extends(T, _super);
    function T(fn) {
        var _this = _super.call(this, "Try") || this;
        _this.fn = fn;
        logger.debug("  create try catch object");
        _this._failed = false; // default value
        return _this;
    }
    T.ry = function (fn) {
        return new T(fn);
    };
    T.prototype.__process = function (r) {
        if (this._returnData)
            return;
        try {
            var result = this.fn();
            logger.debug(this.object + " is successful run");
            this._returnData = result;
            this._failed = false;
        }
        catch (e) {
            this._failed = true;
            logger.warn(this.object + " catching some error\n %O", e);
            this._returnData = r;
        }
    };
    T.prototype.failed = function () {
        this.__process();
        return this._failed;
    };
    T.prototype.getOrElse = function (r) {
        this.__process(r);
        return O.ption(this._returnData).getOrElse(r);
    };
    T.prototype.catch = function (fn) {
        this.__process();
        if (this._failed)
            return fn();
        else
            return this._returnData;
    };
    return T;
}(Serialization));
exports.T = T;


/***/ }),

/***/ "cluster":
/*!**************************!*\
  !*** external "cluster" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cluster");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("process");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "v8":
/*!*********************!*\
  !*** external "v8" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("v8");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpbnRyZWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaW50cmVlcy9saWIvYmludHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmludHJlZXMvbGliL3JidHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmludHJlZXMvbGliL3RyZWViYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvY29tbW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9ub2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMtZmxhZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi9idWNrZXRHZW5lcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvY2x1c3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL2NvdW50ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi9kZWZhdWx0TWV0cmljcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL2dhdWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvaGlzdG9ncmFtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvbWV0cmljQWdncmVnYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi9tZXRyaWNzL2V2ZW50TG9vcExhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3MvaGVhcFNpemVBbmRVc2VkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvbWV0cmljcy9oZWFwU3BhY2VzU2l6ZUFuZFVzZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi9tZXRyaWNzL2hlbHBlcnMvcHJvY2Vzc01ldHJpY3NIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvbWV0cmljcy9oZWxwZXJzL3NhZmVNZW1vcnlVc2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3Mvb3NNZW1vcnlIZWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvbWV0cmljcy9vc01lbW9yeUhlYXBMaW51eC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3MvcHJvY2Vzc0NwdVRvdGFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvbWV0cmljcy9wcm9jZXNzSGFuZGxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3MvcHJvY2Vzc01heEZpbGVEZXNjcmlwdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3MvcHJvY2Vzc09wZW5GaWxlRGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi9tZXRyaWNzL3Byb2Nlc3NSZXF1ZXN0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3MvcHJvY2Vzc1N0YXJ0VGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3MvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL3B1c2hnYXRld2F5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvcmVnaXN0cnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi9zdW1tYXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvdGltZVdpbmRvd1F1YW50aWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi92YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdXBwb3J0cy1jb2xvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGRpZ2VzdC90ZGlnZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL3YxLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm9tLnRzIiwid2VicGFjazovLy8uL3NyYy9yZXF1ZXN0LnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNsdXN0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHJvY2Vzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInR0eVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInV0aWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ2OFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FB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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5QyxRQUFRO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDck9BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksTUFBTTtBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqS0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FB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Q0FBLGdDOzs7Ozs7Ozs7OztBQ0FBLGdDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLCtCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBSQlRyZWU6IHJlcXVpcmUoJy4vbGliL3JidHJlZScpLFxuICAgIEJpblRyZWU6IHJlcXVpcmUoJy4vbGliL2JpbnRyZWUnKVxufTtcbiIsIlxudmFyIFRyZWVCYXNlID0gcmVxdWlyZSgnLi90cmVlYmFzZScpO1xuXG5mdW5jdGlvbiBOb2RlKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMubGVmdCA9IG51bGw7XG4gICAgdGhpcy5yaWdodCA9IG51bGw7XG59XG5cbk5vZGUucHJvdG90eXBlLmdldF9jaGlsZCA9IGZ1bmN0aW9uKGRpcikge1xuICAgIHJldHVybiBkaXIgPyB0aGlzLnJpZ2h0IDogdGhpcy5sZWZ0O1xufTtcblxuTm9kZS5wcm90b3R5cGUuc2V0X2NoaWxkID0gZnVuY3Rpb24oZGlyLCB2YWwpIHtcbiAgICBpZihkaXIpIHtcbiAgICAgICAgdGhpcy5yaWdodCA9IHZhbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMubGVmdCA9IHZhbDtcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBCaW5UcmVlKGNvbXBhcmF0b3IpIHtcbiAgICB0aGlzLl9yb290ID0gbnVsbDtcbiAgICB0aGlzLl9jb21wYXJhdG9yID0gY29tcGFyYXRvcjtcbiAgICB0aGlzLnNpemUgPSAwO1xufVxuXG5CaW5UcmVlLnByb3RvdHlwZSA9IG5ldyBUcmVlQmFzZSgpO1xuXG4vLyByZXR1cm5zIHRydWUgaWYgaW5zZXJ0ZWQsIGZhbHNlIGlmIGR1cGxpY2F0ZVxuQmluVHJlZS5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmKHRoaXMuX3Jvb3QgPT09IG51bGwpIHtcbiAgICAgICAgLy8gZW1wdHkgdHJlZVxuICAgICAgICB0aGlzLl9yb290ID0gbmV3IE5vZGUoZGF0YSk7XG4gICAgICAgIHRoaXMuc2l6ZSsrO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgZGlyID0gMDtcblxuICAgIC8vIHNldHVwXG4gICAgdmFyIHAgPSBudWxsOyAvLyBwYXJlbnRcbiAgICB2YXIgbm9kZSA9IHRoaXMuX3Jvb3Q7XG5cbiAgICAvLyBzZWFyY2ggZG93blxuICAgIHdoaWxlKHRydWUpIHtcbiAgICAgICAgaWYobm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gaW5zZXJ0IG5ldyBub2RlIGF0IHRoZSBib3R0b21cbiAgICAgICAgICAgIG5vZGUgPSBuZXcgTm9kZShkYXRhKTtcbiAgICAgICAgICAgIHAuc2V0X2NoaWxkKGRpciwgbm9kZSk7XG4gICAgICAgICAgICByZXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zaXplKys7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0b3AgaWYgZm91bmRcbiAgICAgICAgaWYodGhpcy5fY29tcGFyYXRvcihub2RlLmRhdGEsIGRhdGEpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBkaXIgPSB0aGlzLl9jb21wYXJhdG9yKG5vZGUuZGF0YSwgZGF0YSkgPCAwO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBoZWxwZXJzXG4gICAgICAgIHAgPSBub2RlO1xuICAgICAgICBub2RlID0gbm9kZS5nZXRfY2hpbGQoZGlyKTtcbiAgICB9XG59O1xuXG4vLyByZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCwgZmFsc2UgaWYgbm90IGZvdW5kXG5CaW5UcmVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgaWYodGhpcy5fcm9vdCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGhlYWQgPSBuZXcgTm9kZSh1bmRlZmluZWQpOyAvLyBmYWtlIHRyZWUgcm9vdFxuICAgIHZhciBub2RlID0gaGVhZDtcbiAgICBub2RlLnJpZ2h0ID0gdGhpcy5fcm9vdDtcbiAgICB2YXIgcCA9IG51bGw7IC8vIHBhcmVudFxuICAgIHZhciBmb3VuZCA9IG51bGw7IC8vIGZvdW5kIGl0ZW1cbiAgICB2YXIgZGlyID0gMTtcblxuICAgIHdoaWxlKG5vZGUuZ2V0X2NoaWxkKGRpcikgIT09IG51bGwpIHtcbiAgICAgICAgcCA9IG5vZGU7XG4gICAgICAgIG5vZGUgPSBub2RlLmdldF9jaGlsZChkaXIpO1xuICAgICAgICB2YXIgY21wID0gdGhpcy5fY29tcGFyYXRvcihkYXRhLCBub2RlLmRhdGEpO1xuICAgICAgICBkaXIgPSBjbXAgPiAwO1xuXG4gICAgICAgIGlmKGNtcCA9PT0gMCkge1xuICAgICAgICAgICAgZm91bmQgPSBub2RlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoZm91bmQgIT09IG51bGwpIHtcbiAgICAgICAgZm91bmQuZGF0YSA9IG5vZGUuZGF0YTtcbiAgICAgICAgcC5zZXRfY2hpbGQocC5yaWdodCA9PT0gbm9kZSwgbm9kZS5nZXRfY2hpbGQobm9kZS5sZWZ0ID09PSBudWxsKSk7XG5cbiAgICAgICAgdGhpcy5fcm9vdCA9IGhlYWQucmlnaHQ7XG4gICAgICAgIHRoaXMuc2l6ZS0tO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJpblRyZWU7XG5cbiIsIlxudmFyIFRyZWVCYXNlID0gcmVxdWlyZSgnLi90cmVlYmFzZScpO1xuXG5mdW5jdGlvbiBOb2RlKGRhdGEpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMubGVmdCA9IG51bGw7XG4gICAgdGhpcy5yaWdodCA9IG51bGw7XG4gICAgdGhpcy5yZWQgPSB0cnVlO1xufVxuXG5Ob2RlLnByb3RvdHlwZS5nZXRfY2hpbGQgPSBmdW5jdGlvbihkaXIpIHtcbiAgICByZXR1cm4gZGlyID8gdGhpcy5yaWdodCA6IHRoaXMubGVmdDtcbn07XG5cbk5vZGUucHJvdG90eXBlLnNldF9jaGlsZCA9IGZ1bmN0aW9uKGRpciwgdmFsKSB7XG4gICAgaWYoZGlyKSB7XG4gICAgICAgIHRoaXMucmlnaHQgPSB2YWw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmxlZnQgPSB2YWw7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gUkJUcmVlKGNvbXBhcmF0b3IpIHtcbiAgICB0aGlzLl9yb290ID0gbnVsbDtcbiAgICB0aGlzLl9jb21wYXJhdG9yID0gY29tcGFyYXRvcjtcbiAgICB0aGlzLnNpemUgPSAwO1xufVxuXG5SQlRyZWUucHJvdG90eXBlID0gbmV3IFRyZWVCYXNlKCk7XG5cbi8vIHJldHVybnMgdHJ1ZSBpZiBpbnNlcnRlZCwgZmFsc2UgaWYgZHVwbGljYXRlXG5SQlRyZWUucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgcmV0ID0gZmFsc2U7XG5cbiAgICBpZih0aGlzLl9yb290ID09PSBudWxsKSB7XG4gICAgICAgIC8vIGVtcHR5IHRyZWVcbiAgICAgICAgdGhpcy5fcm9vdCA9IG5ldyBOb2RlKGRhdGEpO1xuICAgICAgICByZXQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNpemUrKztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBoZWFkID0gbmV3IE5vZGUodW5kZWZpbmVkKTsgLy8gZmFrZSB0cmVlIHJvb3RcblxuICAgICAgICB2YXIgZGlyID0gMDtcbiAgICAgICAgdmFyIGxhc3QgPSAwO1xuXG4gICAgICAgIC8vIHNldHVwXG4gICAgICAgIHZhciBncCA9IG51bGw7IC8vIGdyYW5kcGFyZW50XG4gICAgICAgIHZhciBnZ3AgPSBoZWFkOyAvLyBncmFuZC1ncmFuZC1wYXJlbnRcbiAgICAgICAgdmFyIHAgPSBudWxsOyAvLyBwYXJlbnRcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLl9yb290O1xuICAgICAgICBnZ3AucmlnaHQgPSB0aGlzLl9yb290O1xuXG4gICAgICAgIC8vIHNlYXJjaCBkb3duXG4gICAgICAgIHdoaWxlKHRydWUpIHtcbiAgICAgICAgICAgIGlmKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBpbnNlcnQgbmV3IG5vZGUgYXQgdGhlIGJvdHRvbVxuICAgICAgICAgICAgICAgIG5vZGUgPSBuZXcgTm9kZShkYXRhKTtcbiAgICAgICAgICAgICAgICBwLnNldF9jaGlsZChkaXIsIG5vZGUpO1xuICAgICAgICAgICAgICAgIHJldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaXplKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGlzX3JlZChub2RlLmxlZnQpICYmIGlzX3JlZChub2RlLnJpZ2h0KSkge1xuICAgICAgICAgICAgICAgIC8vIGNvbG9yIGZsaXBcbiAgICAgICAgICAgICAgICBub2RlLnJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgbm9kZS5sZWZ0LnJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG5vZGUucmlnaHQucmVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpeCByZWQgdmlvbGF0aW9uXG4gICAgICAgICAgICBpZihpc19yZWQobm9kZSkgJiYgaXNfcmVkKHApKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpcjIgPSBnZ3AucmlnaHQgPT09IGdwO1xuXG4gICAgICAgICAgICAgICAgaWYobm9kZSA9PT0gcC5nZXRfY2hpbGQobGFzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2dwLnNldF9jaGlsZChkaXIyLCBzaW5nbGVfcm90YXRlKGdwLCAhbGFzdCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2dwLnNldF9jaGlsZChkaXIyLCBkb3VibGVfcm90YXRlKGdwLCAhbGFzdCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNtcCA9IHRoaXMuX2NvbXBhcmF0b3Iobm9kZS5kYXRhLCBkYXRhKTtcblxuICAgICAgICAgICAgLy8gc3RvcCBpZiBmb3VuZFxuICAgICAgICAgICAgaWYoY21wID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxhc3QgPSBkaXI7XG4gICAgICAgICAgICBkaXIgPSBjbXAgPCAwO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgaGVscGVyc1xuICAgICAgICAgICAgaWYoZ3AgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBnZ3AgPSBncDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdwID0gcDtcbiAgICAgICAgICAgIHAgPSBub2RlO1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUuZ2V0X2NoaWxkKGRpcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgcm9vdFxuICAgICAgICB0aGlzLl9yb290ID0gaGVhZC5yaWdodDtcbiAgICB9XG5cbiAgICAvLyBtYWtlIHJvb3QgYmxhY2tcbiAgICB0aGlzLl9yb290LnJlZCA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHJldDtcbn07XG5cbi8vIHJldHVybnMgdHJ1ZSBpZiByZW1vdmVkLCBmYWxzZSBpZiBub3QgZm91bmRcblJCVHJlZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmKHRoaXMuX3Jvb3QgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBoZWFkID0gbmV3IE5vZGUodW5kZWZpbmVkKTsgLy8gZmFrZSB0cmVlIHJvb3RcbiAgICB2YXIgbm9kZSA9IGhlYWQ7XG4gICAgbm9kZS5yaWdodCA9IHRoaXMuX3Jvb3Q7XG4gICAgdmFyIHAgPSBudWxsOyAvLyBwYXJlbnRcbiAgICB2YXIgZ3AgPSBudWxsOyAvLyBncmFuZCBwYXJlbnRcbiAgICB2YXIgZm91bmQgPSBudWxsOyAvLyBmb3VuZCBpdGVtXG4gICAgdmFyIGRpciA9IDE7XG5cbiAgICB3aGlsZShub2RlLmdldF9jaGlsZChkaXIpICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBsYXN0ID0gZGlyO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBoZWxwZXJzXG4gICAgICAgIGdwID0gcDtcbiAgICAgICAgcCA9IG5vZGU7XG4gICAgICAgIG5vZGUgPSBub2RlLmdldF9jaGlsZChkaXIpO1xuXG4gICAgICAgIHZhciBjbXAgPSB0aGlzLl9jb21wYXJhdG9yKGRhdGEsIG5vZGUuZGF0YSk7XG5cbiAgICAgICAgZGlyID0gY21wID4gMDtcblxuICAgICAgICAvLyBzYXZlIGZvdW5kIG5vZGVcbiAgICAgICAgaWYoY21wID09PSAwKSB7XG4gICAgICAgICAgICBmb3VuZCA9IG5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwdXNoIHRoZSByZWQgbm9kZSBkb3duXG4gICAgICAgIGlmKCFpc19yZWQobm9kZSkgJiYgIWlzX3JlZChub2RlLmdldF9jaGlsZChkaXIpKSkge1xuICAgICAgICAgICAgaWYoaXNfcmVkKG5vZGUuZ2V0X2NoaWxkKCFkaXIpKSkge1xuICAgICAgICAgICAgICAgIHZhciBzciA9IHNpbmdsZV9yb3RhdGUobm9kZSwgZGlyKTtcbiAgICAgICAgICAgICAgICBwLnNldF9jaGlsZChsYXN0LCBzcik7XG4gICAgICAgICAgICAgICAgcCA9IHNyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZighaXNfcmVkKG5vZGUuZ2V0X2NoaWxkKCFkaXIpKSkge1xuICAgICAgICAgICAgICAgIHZhciBzaWJsaW5nID0gcC5nZXRfY2hpbGQoIWxhc3QpO1xuICAgICAgICAgICAgICAgIGlmKHNpYmxpbmcgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWlzX3JlZChzaWJsaW5nLmdldF9jaGlsZCghbGFzdCkpICYmICFpc19yZWQoc2libGluZy5nZXRfY2hpbGQobGFzdCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb2xvciBmbGlwXG4gICAgICAgICAgICAgICAgICAgICAgICBwLnJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZy5yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpcjIgPSBncC5yaWdodCA9PT0gcDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNfcmVkKHNpYmxpbmcuZ2V0X2NoaWxkKGxhc3QpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdwLnNldF9jaGlsZChkaXIyLCBkb3VibGVfcm90YXRlKHAsIGxhc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoaXNfcmVkKHNpYmxpbmcuZ2V0X2NoaWxkKCFsYXN0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncC5zZXRfY2hpbGQoZGlyMiwgc2luZ2xlX3JvdGF0ZShwLCBsYXN0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuc3VyZSBjb3JyZWN0IGNvbG9yaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3BjID0gZ3AuZ2V0X2NoaWxkKGRpcjIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3BjLnJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBncGMubGVmdC5yZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdwYy5yaWdodC5yZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHJlcGxhY2UgYW5kIHJlbW92ZSBpZiBmb3VuZFxuICAgIGlmKGZvdW5kICE9PSBudWxsKSB7XG4gICAgICAgIGZvdW5kLmRhdGEgPSBub2RlLmRhdGE7XG4gICAgICAgIHAuc2V0X2NoaWxkKHAucmlnaHQgPT09IG5vZGUsIG5vZGUuZ2V0X2NoaWxkKG5vZGUubGVmdCA9PT0gbnVsbCkpO1xuICAgICAgICB0aGlzLnNpemUtLTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgcm9vdCBhbmQgbWFrZSBpdCBibGFja1xuICAgIHRoaXMuX3Jvb3QgPSBoZWFkLnJpZ2h0O1xuICAgIGlmKHRoaXMuX3Jvb3QgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcm9vdC5yZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQgIT09IG51bGw7XG59O1xuXG5mdW5jdGlvbiBpc19yZWQobm9kZSkge1xuICAgIHJldHVybiBub2RlICE9PSBudWxsICYmIG5vZGUucmVkO1xufVxuXG5mdW5jdGlvbiBzaW5nbGVfcm90YXRlKHJvb3QsIGRpcikge1xuICAgIHZhciBzYXZlID0gcm9vdC5nZXRfY2hpbGQoIWRpcik7XG5cbiAgICByb290LnNldF9jaGlsZCghZGlyLCBzYXZlLmdldF9jaGlsZChkaXIpKTtcbiAgICBzYXZlLnNldF9jaGlsZChkaXIsIHJvb3QpO1xuXG4gICAgcm9vdC5yZWQgPSB0cnVlO1xuICAgIHNhdmUucmVkID0gZmFsc2U7XG5cbiAgICByZXR1cm4gc2F2ZTtcbn1cblxuZnVuY3Rpb24gZG91YmxlX3JvdGF0ZShyb290LCBkaXIpIHtcbiAgICByb290LnNldF9jaGlsZCghZGlyLCBzaW5nbGVfcm90YXRlKHJvb3QuZ2V0X2NoaWxkKCFkaXIpLCAhZGlyKSk7XG4gICAgcmV0dXJuIHNpbmdsZV9yb3RhdGUocm9vdCwgZGlyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSQlRyZWU7XG4iLCJcbmZ1bmN0aW9uIFRyZWVCYXNlKCkge31cblxuLy8gcmVtb3ZlcyBhbGwgbm9kZXMgZnJvbSB0aGUgdHJlZVxuVHJlZUJhc2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcm9vdCA9IG51bGw7XG4gICAgdGhpcy5zaXplID0gMDtcbn07XG5cbi8vIHJldHVybnMgbm9kZSBkYXRhIGlmIGZvdW5kLCBudWxsIG90aGVyd2lzZVxuVHJlZUJhc2UucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIHJlcyA9IHRoaXMuX3Jvb3Q7XG5cbiAgICB3aGlsZShyZXMgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLl9jb21wYXJhdG9yKGRhdGEsIHJlcy5kYXRhKTtcbiAgICAgICAgaWYoYyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzID0gcmVzLmdldF9jaGlsZChjID4gMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbi8vIHJldHVybnMgaXRlcmF0b3IgdG8gbm9kZSBpZiBmb3VuZCwgbnVsbCBvdGhlcndpc2VcblRyZWVCYXNlLnByb3RvdHlwZS5maW5kSXRlciA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgcmVzID0gdGhpcy5fcm9vdDtcbiAgICB2YXIgaXRlciA9IHRoaXMuaXRlcmF0b3IoKTtcblxuICAgIHdoaWxlKHJlcyAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgYyA9IHRoaXMuX2NvbXBhcmF0b3IoZGF0YSwgcmVzLmRhdGEpO1xuICAgICAgICBpZihjID09PSAwKSB7XG4gICAgICAgICAgICBpdGVyLl9jdXJzb3IgPSByZXM7XG4gICAgICAgICAgICByZXR1cm4gaXRlcjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGl0ZXIuX2FuY2VzdG9ycy5wdXNoKHJlcyk7XG4gICAgICAgICAgICByZXMgPSByZXMuZ2V0X2NoaWxkKGMgPiAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufTtcblxuLy8gUmV0dXJucyBhbiBpdGVyYXRvciB0byB0aGUgdHJlZSBub2RlIGF0IG9yIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBpdGVtXG5UcmVlQmFzZS5wcm90b3R5cGUubG93ZXJCb3VuZCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICB2YXIgY3VyID0gdGhpcy5fcm9vdDtcbiAgICB2YXIgaXRlciA9IHRoaXMuaXRlcmF0b3IoKTtcbiAgICB2YXIgY21wID0gdGhpcy5fY29tcGFyYXRvcjtcblxuICAgIHdoaWxlKGN1ciAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgYyA9IGNtcChpdGVtLCBjdXIuZGF0YSk7XG4gICAgICAgIGlmKGMgPT09IDApIHtcbiAgICAgICAgICAgIGl0ZXIuX2N1cnNvciA9IGN1cjtcbiAgICAgICAgICAgIHJldHVybiBpdGVyO1xuICAgICAgICB9XG4gICAgICAgIGl0ZXIuX2FuY2VzdG9ycy5wdXNoKGN1cik7XG4gICAgICAgIGN1ciA9IGN1ci5nZXRfY2hpbGQoYyA+IDApO1xuICAgIH1cblxuICAgIGZvcih2YXIgaT1pdGVyLl9hbmNlc3RvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgY3VyID0gaXRlci5fYW5jZXN0b3JzW2ldO1xuICAgICAgICBpZihjbXAoaXRlbSwgY3VyLmRhdGEpIDwgMCkge1xuICAgICAgICAgICAgaXRlci5fY3Vyc29yID0gY3VyO1xuICAgICAgICAgICAgaXRlci5fYW5jZXN0b3JzLmxlbmd0aCA9IGk7XG4gICAgICAgICAgICByZXR1cm4gaXRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGl0ZXIuX2FuY2VzdG9ycy5sZW5ndGggPSAwO1xuICAgIHJldHVybiBpdGVyO1xufTtcblxuLy8gUmV0dXJucyBhbiBpdGVyYXRvciB0byB0aGUgdHJlZSBub2RlIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBpdGVtXG5UcmVlQmFzZS5wcm90b3R5cGUudXBwZXJCb3VuZCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICB2YXIgaXRlciA9IHRoaXMubG93ZXJCb3VuZChpdGVtKTtcbiAgICB2YXIgY21wID0gdGhpcy5fY29tcGFyYXRvcjtcblxuICAgIHdoaWxlKGl0ZXIuZGF0YSgpICE9PSBudWxsICYmIGNtcChpdGVyLmRhdGEoKSwgaXRlbSkgPT09IDApIHtcbiAgICAgICAgaXRlci5uZXh0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZXI7XG59O1xuXG4vLyByZXR1cm5zIG51bGwgaWYgdHJlZSBpcyBlbXB0eVxuVHJlZUJhc2UucHJvdG90eXBlLm1pbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXMgPSB0aGlzLl9yb290O1xuICAgIGlmKHJlcyA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB3aGlsZShyZXMubGVmdCAhPT0gbnVsbCkge1xuICAgICAgICByZXMgPSByZXMubGVmdDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzLmRhdGE7XG59O1xuXG4vLyByZXR1cm5zIG51bGwgaWYgdHJlZSBpcyBlbXB0eVxuVHJlZUJhc2UucHJvdG90eXBlLm1heCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZXMgPSB0aGlzLl9yb290O1xuICAgIGlmKHJlcyA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB3aGlsZShyZXMucmlnaHQgIT09IG51bGwpIHtcbiAgICAgICAgcmVzID0gcmVzLnJpZ2h0O1xuICAgIH1cblxuICAgIHJldHVybiByZXMuZGF0YTtcbn07XG5cbi8vIHJldHVybnMgYSBudWxsIGl0ZXJhdG9yXG4vLyBjYWxsIG5leHQoKSBvciBwcmV2KCkgdG8gcG9pbnQgdG8gYW4gZWxlbWVudFxuVHJlZUJhc2UucHJvdG90eXBlLml0ZXJhdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBJdGVyYXRvcih0aGlzKTtcbn07XG5cbi8vIGNhbGxzIGNiIG9uIGVhY2ggbm9kZSdzIGRhdGEsIGluIG9yZGVyXG5UcmVlQmFzZS5wcm90b3R5cGUuZWFjaCA9IGZ1bmN0aW9uKGNiKSB7XG4gICAgdmFyIGl0PXRoaXMuaXRlcmF0b3IoKSwgZGF0YTtcbiAgICB3aGlsZSgoZGF0YSA9IGl0Lm5leHQoKSkgIT09IG51bGwpIHtcbiAgICAgICAgY2IoZGF0YSk7XG4gICAgfVxufTtcblxuLy8gY2FsbHMgY2Igb24gZWFjaCBub2RlJ3MgZGF0YSwgaW4gcmV2ZXJzZSBvcmRlclxuVHJlZUJhc2UucHJvdG90eXBlLnJlYWNoID0gZnVuY3Rpb24oY2IpIHtcbiAgICB2YXIgaXQ9dGhpcy5pdGVyYXRvcigpLCBkYXRhO1xuICAgIHdoaWxlKChkYXRhID0gaXQucHJldigpKSAhPT0gbnVsbCkge1xuICAgICAgICBjYihkYXRhKTtcbiAgICB9XG59O1xuXG5cbmZ1bmN0aW9uIEl0ZXJhdG9yKHRyZWUpIHtcbiAgICB0aGlzLl90cmVlID0gdHJlZTtcbiAgICB0aGlzLl9hbmNlc3RvcnMgPSBbXTtcbiAgICB0aGlzLl9jdXJzb3IgPSBudWxsO1xufVxuXG5JdGVyYXRvci5wcm90b3R5cGUuZGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJzb3IgIT09IG51bGwgPyB0aGlzLl9jdXJzb3IuZGF0YSA6IG51bGw7XG59O1xuXG4vLyBpZiBudWxsLWl0ZXJhdG9yLCByZXR1cm5zIGZpcnN0IG5vZGVcbi8vIG90aGVyd2lzZSwgcmV0dXJucyBuZXh0IG5vZGVcbkl0ZXJhdG9yLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5fY3Vyc29yID09PSBudWxsKSB7XG4gICAgICAgIHZhciByb290ID0gdGhpcy5fdHJlZS5fcm9vdDtcbiAgICAgICAgaWYocm9vdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbWluTm9kZShyb290KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYodGhpcy5fY3Vyc29yLnJpZ2h0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBubyBncmVhdGVyIG5vZGUgaW4gc3VidHJlZSwgZ28gdXAgdG8gcGFyZW50XG4gICAgICAgICAgICAvLyBpZiBjb21pbmcgZnJvbSBhIHJpZ2h0IGNoaWxkLCBjb250aW51ZSB1cCB0aGUgc3RhY2tcbiAgICAgICAgICAgIHZhciBzYXZlO1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHNhdmUgPSB0aGlzLl9jdXJzb3I7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5fYW5jZXN0b3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJzb3IgPSB0aGlzLl9hbmNlc3RvcnMucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJzb3IgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlKHRoaXMuX2N1cnNvci5yaWdodCA9PT0gc2F2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBnZXQgdGhlIG5leHQgbm9kZSBmcm9tIHRoZSBzdWJ0cmVlXG4gICAgICAgICAgICB0aGlzLl9hbmNlc3RvcnMucHVzaCh0aGlzLl9jdXJzb3IpO1xuICAgICAgICAgICAgdGhpcy5fbWluTm9kZSh0aGlzLl9jdXJzb3IucmlnaHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9jdXJzb3IgIT09IG51bGwgPyB0aGlzLl9jdXJzb3IuZGF0YSA6IG51bGw7XG59O1xuXG4vLyBpZiBudWxsLWl0ZXJhdG9yLCByZXR1cm5zIGxhc3Qgbm9kZVxuLy8gb3RoZXJ3aXNlLCByZXR1cm5zIHByZXZpb3VzIG5vZGVcbkl0ZXJhdG9yLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYodGhpcy5fY3Vyc29yID09PSBudWxsKSB7XG4gICAgICAgIHZhciByb290ID0gdGhpcy5fdHJlZS5fcm9vdDtcbiAgICAgICAgaWYocm9vdCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fbWF4Tm9kZShyb290KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYodGhpcy5fY3Vyc29yLmxlZnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBzYXZlO1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHNhdmUgPSB0aGlzLl9jdXJzb3I7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5fYW5jZXN0b3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJzb3IgPSB0aGlzLl9hbmNlc3RvcnMucG9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJzb3IgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlKHRoaXMuX2N1cnNvci5sZWZ0ID09PSBzYXZlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FuY2VzdG9ycy5wdXNoKHRoaXMuX2N1cnNvcik7XG4gICAgICAgICAgICB0aGlzLl9tYXhOb2RlKHRoaXMuX2N1cnNvci5sZWZ0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY3Vyc29yICE9PSBudWxsID8gdGhpcy5fY3Vyc29yLmRhdGEgOiBudWxsO1xufTtcblxuSXRlcmF0b3IucHJvdG90eXBlLl9taW5Ob2RlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICB3aGlsZShzdGFydC5sZWZ0ICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FuY2VzdG9ycy5wdXNoKHN0YXJ0KTtcbiAgICAgICAgc3RhcnQgPSBzdGFydC5sZWZ0O1xuICAgIH1cbiAgICB0aGlzLl9jdXJzb3IgPSBzdGFydDtcbn07XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS5fbWF4Tm9kZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgd2hpbGUoc3RhcnQucmlnaHQgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYW5jZXN0b3JzLnB1c2goc3RhcnQpO1xuICAgICAgICBzdGFydCA9IHN0YXJ0LnJpZ2h0O1xuICAgIH1cbiAgICB0aGlzLl9jdXJzb3IgPSBzdGFydDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVHJlZUJhc2U7XG5cbiIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgdyA9IGQgKiA3O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWwpKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigtPyg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8d2Vla3M/fHd8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ3dlZWtzJzpcbiAgICBjYXNlICd3ZWVrJzpcbiAgICBjYXNlICd3JzpcbiAgICAgIHJldHVybiBuICogdztcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXNBYnMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zQWJzID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcbiAgaWYgKG1zQWJzID49IGQpIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgZCwgJ2RheScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBoKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGgsICdob3VyJyk7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gcGx1cmFsKG1zLCBtc0FicywgbSwgJ21pbnV0ZScpO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIHMsICdzZWNvbmQnKTtcbiAgfVxuICByZXR1cm4gbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG1zQWJzLCBuLCBuYW1lKSB7XG4gIHZhciBpc1BsdXJhbCA9IG1zQWJzID49IG4gKiAxLjU7XG4gIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbikgKyAnICcgKyBuYW1lICsgKGlzUGx1cmFsID8gJ3MnIDogJycpO1xufVxuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICovXG5cbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG5cdCcjMDAwMENDJyxcblx0JyMwMDAwRkYnLFxuXHQnIzAwMzNDQycsXG5cdCcjMDAzM0ZGJyxcblx0JyMwMDY2Q0MnLFxuXHQnIzAwNjZGRicsXG5cdCcjMDA5OUNDJyxcblx0JyMwMDk5RkYnLFxuXHQnIzAwQ0MwMCcsXG5cdCcjMDBDQzMzJyxcblx0JyMwMENDNjYnLFxuXHQnIzAwQ0M5OScsXG5cdCcjMDBDQ0NDJyxcblx0JyMwMENDRkYnLFxuXHQnIzMzMDBDQycsXG5cdCcjMzMwMEZGJyxcblx0JyMzMzMzQ0MnLFxuXHQnIzMzMzNGRicsXG5cdCcjMzM2NkNDJyxcblx0JyMzMzY2RkYnLFxuXHQnIzMzOTlDQycsXG5cdCcjMzM5OUZGJyxcblx0JyMzM0NDMDAnLFxuXHQnIzMzQ0MzMycsXG5cdCcjMzNDQzY2Jyxcblx0JyMzM0NDOTknLFxuXHQnIzMzQ0NDQycsXG5cdCcjMzNDQ0ZGJyxcblx0JyM2NjAwQ0MnLFxuXHQnIzY2MDBGRicsXG5cdCcjNjYzM0NDJyxcblx0JyM2NjMzRkYnLFxuXHQnIzY2Q0MwMCcsXG5cdCcjNjZDQzMzJyxcblx0JyM5OTAwQ0MnLFxuXHQnIzk5MDBGRicsXG5cdCcjOTkzM0NDJyxcblx0JyM5OTMzRkYnLFxuXHQnIzk5Q0MwMCcsXG5cdCcjOTlDQzMzJyxcblx0JyNDQzAwMDAnLFxuXHQnI0NDMDAzMycsXG5cdCcjQ0MwMDY2Jyxcblx0JyNDQzAwOTknLFxuXHQnI0NDMDBDQycsXG5cdCcjQ0MwMEZGJyxcblx0JyNDQzMzMDAnLFxuXHQnI0NDMzMzMycsXG5cdCcjQ0MzMzY2Jyxcblx0JyNDQzMzOTknLFxuXHQnI0NDMzNDQycsXG5cdCcjQ0MzM0ZGJyxcblx0JyNDQzY2MDAnLFxuXHQnI0NDNjYzMycsXG5cdCcjQ0M5OTAwJyxcblx0JyNDQzk5MzMnLFxuXHQnI0NDQ0MwMCcsXG5cdCcjQ0NDQzMzJyxcblx0JyNGRjAwMDAnLFxuXHQnI0ZGMDAzMycsXG5cdCcjRkYwMDY2Jyxcblx0JyNGRjAwOTknLFxuXHQnI0ZGMDBDQycsXG5cdCcjRkYwMEZGJyxcblx0JyNGRjMzMDAnLFxuXHQnI0ZGMzMzMycsXG5cdCcjRkYzMzY2Jyxcblx0JyNGRjMzOTknLFxuXHQnI0ZGMzNDQycsXG5cdCcjRkYzM0ZGJyxcblx0JyNGRjY2MDAnLFxuXHQnI0ZGNjYzMycsXG5cdCcjRkY5OTAwJyxcblx0JyNGRjk5MzMnLFxuXHQnI0ZGQ0MwMCcsXG5cdCcjRkZDQzMzJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuXHQvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG5cdC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG5cdC8vIGV4cGxpY2l0bHlcblx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmICh3aW5kb3cucHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInIHx8IHdpbmRvdy5wcm9jZXNzLl9fbndqcykpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cblx0aWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC8oZWRnZXx0cmlkZW50KVxcLyhcXGQrKS8pKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gSXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcblx0Ly8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcblx0cmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG5cdFx0Ly8gSXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuXHRcdCh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG5cdFx0Ly8gSXMgZmlyZWZveCA+PSB2MzE/XG5cdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG5cdFx0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG5cdFx0Ly8gRG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuXHRcdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG5cdGFyZ3NbMF0gPSAodGhpcy51c2VDb2xvcnMgPyAnJWMnIDogJycpICtcblx0XHR0aGlzLm5hbWVzcGFjZSArXG5cdFx0KHRoaXMudXNlQ29sb3JzID8gJyAlYycgOiAnICcpICtcblx0XHRhcmdzWzBdICtcblx0XHQodGhpcy51c2VDb2xvcnMgPyAnJWMgJyA6ICcgJykgK1xuXHRcdCcrJyArIG1vZHVsZS5leHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cblx0aWYgKCF0aGlzLnVzZUNvbG9ycykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuXHRhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKTtcblxuXHQvLyBUaGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuXHQvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG5cdC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuXHRsZXQgaW5kZXggPSAwO1xuXHRsZXQgbGFzdEMgPSAwO1xuXHRhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgbWF0Y2ggPT4ge1xuXHRcdGlmIChtYXRjaCA9PT0gJyUlJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpbmRleCsrO1xuXHRcdGlmIChtYXRjaCA9PT0gJyVjJykge1xuXHRcdFx0Ly8gV2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG5cdFx0XHQvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuXHRcdFx0bGFzdEMgPSBpbmRleDtcblx0XHR9XG5cdH0pO1xuXG5cdGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gbG9nKC4uLmFyZ3MpIHtcblx0Ly8gVGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcblx0Ly8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcblx0cmV0dXJuIHR5cGVvZiBjb25zb2xlID09PSAnb2JqZWN0JyAmJlxuXHRcdGNvbnNvbGUubG9nICYmXG5cdFx0Y29uc29sZS5sb2coLi4uYXJncyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcblx0dHJ5IHtcblx0XHRpZiAobmFtZXNwYWNlcykge1xuXHRcdFx0ZXhwb3J0cy5zdG9yYWdlLnNldEl0ZW0oJ2RlYnVnJywgbmFtZXNwYWNlcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTd2FsbG93XG5cdFx0Ly8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG5cdH1cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbG9hZCgpIHtcblx0bGV0IHI7XG5cdHRyeSB7XG5cdFx0ciA9IGV4cG9ydHMuc3RvcmFnZS5nZXRJdGVtKCdkZWJ1ZycpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxuXG5cdC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcblx0aWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG5cdFx0ciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuXHR9XG5cblx0cmV0dXJuIHI7XG59XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuXHR0cnkge1xuXHRcdC8vIFRWTUxLaXQgKEFwcGxlIFRWIEpTIFJ1bnRpbWUpIGRvZXMgbm90IGhhdmUgYSB3aW5kb3cgb2JqZWN0LCBqdXN0IGxvY2FsU3RvcmFnZSBpbiB0aGUgZ2xvYmFsIGNvbnRleHRcblx0XHQvLyBUaGUgQnJvd3NlciBhbHNvIGhhcyBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0LlxuXHRcdHJldHVybiBsb2NhbFN0b3JhZ2U7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21tb24nKShleHBvcnRzKTtcblxuY29uc3Qge2Zvcm1hdHRlcnN9ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uICh2KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnJvci5tZXNzYWdlO1xuXHR9XG59O1xuIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKi9cblxuZnVuY3Rpb24gc2V0dXAoZW52KSB7XG5cdGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmRlZmF1bHQgPSBjcmVhdGVEZWJ1Zztcblx0Y3JlYXRlRGVidWcuY29lcmNlID0gY29lcmNlO1xuXHRjcmVhdGVEZWJ1Zy5kaXNhYmxlID0gZGlzYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlID0gZW5hYmxlO1xuXHRjcmVhdGVEZWJ1Zy5lbmFibGVkID0gZW5hYmxlZDtcblx0Y3JlYXRlRGVidWcuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG5cdE9iamVjdC5rZXlzKGVudikuZm9yRWFjaChrZXkgPT4ge1xuXHRcdGNyZWF0ZURlYnVnW2tleV0gPSBlbnZba2V5XTtcblx0fSk7XG5cblx0LyoqXG5cdCogQWN0aXZlIGBkZWJ1Z2AgaW5zdGFuY2VzLlxuXHQqL1xuXHRjcmVhdGVEZWJ1Zy5pbnN0YW5jZXMgPSBbXTtcblxuXHQvKipcblx0KiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cblx0Ki9cblxuXHRjcmVhdGVEZWJ1Zy5uYW1lcyA9IFtdO1xuXHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdC8qKlxuXHQqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cblx0KlxuXHQqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cblx0Ki9cblx0Y3JlYXRlRGVidWcuZm9ybWF0dGVycyA9IHt9O1xuXG5cdC8qKlxuXHQqIFNlbGVjdHMgYSBjb2xvciBmb3IgYSBkZWJ1ZyBuYW1lc3BhY2Vcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIFRoZSBuYW1lc3BhY2Ugc3RyaW5nIGZvciB0aGUgZm9yIHRoZSBkZWJ1ZyBpbnN0YW5jZSB0byBiZSBjb2xvcmVkXG5cdCogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gQW4gQU5TSSBjb2xvciBjb2RlIGZvciB0aGUgZ2l2ZW4gbmFtZXNwYWNlXG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuXHRcdGxldCBoYXNoID0gMDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXNwYWNlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcblx0XHRcdGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNyZWF0ZURlYnVnLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGNyZWF0ZURlYnVnLmNvbG9ycy5sZW5ndGhdO1xuXHR9XG5cdGNyZWF0ZURlYnVnLnNlbGVjdENvbG9yID0gc2VsZWN0Q29sb3I7XG5cblx0LyoqXG5cdCogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG5cdCogQHJldHVybiB7RnVuY3Rpb259XG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cdFx0bGV0IHByZXZUaW1lO1xuXG5cdFx0ZnVuY3Rpb24gZGVidWcoLi4uYXJncykge1xuXHRcdFx0Ly8gRGlzYWJsZWQ/XG5cdFx0XHRpZiAoIWRlYnVnLmVuYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBzZWxmID0gZGVidWc7XG5cblx0XHRcdC8vIFNldCBgZGlmZmAgdGltZXN0YW1wXG5cdFx0XHRjb25zdCBjdXJyID0gTnVtYmVyKG5ldyBEYXRlKCkpO1xuXHRcdFx0Y29uc3QgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuXHRcdFx0c2VsZi5kaWZmID0gbXM7XG5cdFx0XHRzZWxmLnByZXYgPSBwcmV2VGltZTtcblx0XHRcdHNlbGYuY3VyciA9IGN1cnI7XG5cdFx0XHRwcmV2VGltZSA9IGN1cnI7XG5cblx0XHRcdGFyZ3NbMF0gPSBjcmVhdGVEZWJ1Zy5jb2VyY2UoYXJnc1swXSk7XG5cblx0XHRcdGlmICh0eXBlb2YgYXJnc1swXSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdFx0Ly8gQW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cblx0XHRcdFx0YXJncy51bnNoaWZ0KCclTycpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuXHRcdFx0bGV0IGluZGV4ID0gMDtcblx0XHRcdGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCAobWF0Y2gsIGZvcm1hdCkgPT4ge1xuXHRcdFx0XHQvLyBJZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG5cdFx0XHRcdGlmIChtYXRjaCA9PT0gJyUlJykge1xuXHRcdFx0XHRcdHJldHVybiBtYXRjaDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0XHRjb25zdCBmb3JtYXR0ZXIgPSBjcmVhdGVEZWJ1Zy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG5cdFx0XHRcdGlmICh0eXBlb2YgZm9ybWF0dGVyID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsID0gYXJnc1tpbmRleF07XG5cdFx0XHRcdFx0bWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG5cdFx0XHRcdFx0Ly8gTm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuXHRcdFx0XHRcdGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRpbmRleC0tO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBtYXRjaDtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBBcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuXHRcdFx0Y3JlYXRlRGVidWcuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG5cdFx0XHRjb25zdCBsb2dGbiA9IHNlbGYubG9nIHx8IGNyZWF0ZURlYnVnLmxvZztcblx0XHRcdGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXHRcdH1cblxuXHRcdGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblx0XHRkZWJ1Zy5lbmFibGVkID0gY3JlYXRlRGVidWcuZW5hYmxlZChuYW1lc3BhY2UpO1xuXHRcdGRlYnVnLnVzZUNvbG9ycyA9IGNyZWF0ZURlYnVnLnVzZUNvbG9ycygpO1xuXHRcdGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcblx0XHRkZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblx0XHRkZWJ1Zy5leHRlbmQgPSBleHRlbmQ7XG5cdFx0Ly8gRGVidWcuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5cdFx0Ly8gZGVidWcucmF3TG9nID0gcmF3TG9nO1xuXG5cdFx0Ly8gZW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcblx0XHRpZiAodHlwZW9mIGNyZWF0ZURlYnVnLmluaXQgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNyZWF0ZURlYnVnLmluaXQoZGVidWcpO1xuXHRcdH1cblxuXHRcdGNyZWF0ZURlYnVnLmluc3RhbmNlcy5wdXNoKGRlYnVnKTtcblxuXHRcdHJldHVybiBkZWJ1Zztcblx0fVxuXG5cdGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cdFx0Y29uc3QgaW5kZXggPSBjcmVhdGVEZWJ1Zy5pbnN0YW5jZXMuaW5kZXhPZih0aGlzKTtcblx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRjcmVhdGVEZWJ1Zy5pbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRmdW5jdGlvbiBleHRlbmQobmFtZXNwYWNlLCBkZWxpbWl0ZXIpIHtcblx0XHRjb25zdCBuZXdEZWJ1ZyA9IGNyZWF0ZURlYnVnKHRoaXMubmFtZXNwYWNlICsgKHR5cGVvZiBkZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gJzonIDogZGVsaW1pdGVyKSArIG5hbWVzcGFjZSk7XG5cdFx0bmV3RGVidWcubG9nID0gdGhpcy5sb2c7XG5cdFx0cmV0dXJuIG5ld0RlYnVnO1xuXHR9XG5cblx0LyoqXG5cdCogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuXHQqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG5cdFx0Y3JlYXRlRGVidWcuc2F2ZShuYW1lc3BhY2VzKTtcblxuXHRcdGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG5cdFx0Y3JlYXRlRGVidWcuc2tpcHMgPSBbXTtcblxuXHRcdGxldCBpO1xuXHRcdGNvbnN0IHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcblx0XHRjb25zdCBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmICghc3BsaXRbaV0pIHtcblx0XHRcdFx0Ly8gaWdub3JlIGVtcHR5IHN0cmluZ3Ncblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuXG5cdFx0XHRpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG5cdFx0XHRcdGNyZWF0ZURlYnVnLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3JlYXRlRGVidWcubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgY3JlYXRlRGVidWcuaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBpbnN0YW5jZSA9IGNyZWF0ZURlYnVnLmluc3RhbmNlc1tpXTtcblx0XHRcdGluc3RhbmNlLmVuYWJsZWQgPSBjcmVhdGVEZWJ1Zy5lbmFibGVkKGluc3RhbmNlLm5hbWVzcGFjZSk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG5cdCpcblx0KiBAcmV0dXJuIHtTdHJpbmd9IG5hbWVzcGFjZXNcblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBkaXNhYmxlKCkge1xuXHRcdGNvbnN0IG5hbWVzcGFjZXMgPSBbXG5cdFx0XHQuLi5jcmVhdGVEZWJ1Zy5uYW1lcy5tYXAodG9OYW1lc3BhY2UpLFxuXHRcdFx0Li4uY3JlYXRlRGVidWcuc2tpcHMubWFwKHRvTmFtZXNwYWNlKS5tYXAobmFtZXNwYWNlID0+ICctJyArIG5hbWVzcGFjZSlcblx0XHRdLmpvaW4oJywnKTtcblx0XHRjcmVhdGVEZWJ1Zy5lbmFibGUoJycpO1xuXHRcdHJldHVybiBuYW1lc3BhY2VzO1xuXHR9XG5cblx0LyoqXG5cdCogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuXHQqXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVcblx0KiBAcmV0dXJuIHtCb29sZWFufVxuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuXHRcdGlmIChuYW1lW25hbWUubGVuZ3RoIC0gMV0gPT09ICcqJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0bGV0IGk7XG5cdFx0bGV0IGxlbjtcblxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNyZWF0ZURlYnVnLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoY3JlYXRlRGVidWcuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY3JlYXRlRGVidWcubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChjcmVhdGVEZWJ1Zy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQqIENvbnZlcnQgcmVnZXhwIHRvIG5hbWVzcGFjZVxuXHQqXG5cdCogQHBhcmFtIHtSZWdFeHB9IHJlZ3hlcFxuXHQqIEByZXR1cm4ge1N0cmluZ30gbmFtZXNwYWNlXG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIHRvTmFtZXNwYWNlKHJlZ2V4cCkge1xuXHRcdHJldHVybiByZWdleHAudG9TdHJpbmcoKVxuXHRcdFx0LnN1YnN0cmluZygyLCByZWdleHAudG9TdHJpbmcoKS5sZW5ndGggLSAyKVxuXHRcdFx0LnJlcGxhY2UoL1xcLlxcKlxcPyQvLCAnKicpO1xuXHR9XG5cblx0LyoqXG5cdCogQ29lcmNlIGB2YWxgLlxuXHQqXG5cdCogQHBhcmFtIHtNaXhlZH0gdmFsXG5cdCogQHJldHVybiB7TWl4ZWR9XG5cdCogQGFwaSBwcml2YXRlXG5cdCovXG5cdGZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcblx0XHRpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHtcblx0XHRcdHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG5cdFx0fVxuXHRcdHJldHVybiB2YWw7XG5cdH1cblxuXHRjcmVhdGVEZWJ1Zy5lbmFibGUoY3JlYXRlRGVidWcubG9hZCgpKTtcblxuXHRyZXR1cm4gY3JlYXRlRGVidWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dXA7XG4iLCIvKipcbiAqIERldGVjdCBFbGVjdHJvbiByZW5kZXJlciAvIG53anMgcHJvY2Vzcywgd2hpY2ggaXMgbm9kZSwgYnV0IHdlIHNob3VsZFxuICogdHJlYXQgYXMgYSBicm93c2VyLlxuICovXG5cbmlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInIHx8IHByb2Nlc3MuYnJvd3NlciA9PT0gdHJ1ZSB8fCBwcm9jZXNzLl9fbndqcykge1xuXHRtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYnJvd3Nlci5qcycpO1xufSBlbHNlIHtcblx0bW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL25vZGUuanMnKTtcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5jb25zdCB0dHkgPSByZXF1aXJlKCd0dHknKTtcbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgTm9kZS5qcyBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKi9cblxuZXhwb3J0cy5pbml0ID0gaW5pdDtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gWzYsIDIsIDMsIDQsIDUsIDFdO1xuXG50cnkge1xuXHQvLyBPcHRpb25hbCBkZXBlbmRlbmN5IChhcyBpbiwgZG9lc24ndCBuZWVkIHRvIGJlIGluc3RhbGxlZCwgTk9UIGxpa2Ugb3B0aW9uYWxEZXBlbmRlbmNpZXMgaW4gcGFja2FnZS5qc29uKVxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzXG5cdGNvbnN0IHN1cHBvcnRzQ29sb3IgPSByZXF1aXJlKCdzdXBwb3J0cy1jb2xvcicpO1xuXG5cdGlmIChzdXBwb3J0c0NvbG9yICYmIChzdXBwb3J0c0NvbG9yLnN0ZGVyciB8fCBzdXBwb3J0c0NvbG9yKS5sZXZlbCA+PSAyKSB7XG5cdFx0ZXhwb3J0cy5jb2xvcnMgPSBbXG5cdFx0XHQyMCxcblx0XHRcdDIxLFxuXHRcdFx0MjYsXG5cdFx0XHQyNyxcblx0XHRcdDMyLFxuXHRcdFx0MzMsXG5cdFx0XHQzOCxcblx0XHRcdDM5LFxuXHRcdFx0NDAsXG5cdFx0XHQ0MSxcblx0XHRcdDQyLFxuXHRcdFx0NDMsXG5cdFx0XHQ0NCxcblx0XHRcdDQ1LFxuXHRcdFx0NTYsXG5cdFx0XHQ1Nyxcblx0XHRcdDYyLFxuXHRcdFx0NjMsXG5cdFx0XHQ2OCxcblx0XHRcdDY5LFxuXHRcdFx0NzQsXG5cdFx0XHQ3NSxcblx0XHRcdDc2LFxuXHRcdFx0NzcsXG5cdFx0XHQ3OCxcblx0XHRcdDc5LFxuXHRcdFx0ODAsXG5cdFx0XHQ4MSxcblx0XHRcdDkyLFxuXHRcdFx0OTMsXG5cdFx0XHQ5OCxcblx0XHRcdDk5LFxuXHRcdFx0MTEyLFxuXHRcdFx0MTEzLFxuXHRcdFx0MTI4LFxuXHRcdFx0MTI5LFxuXHRcdFx0MTM0LFxuXHRcdFx0MTM1LFxuXHRcdFx0MTQ4LFxuXHRcdFx0MTQ5LFxuXHRcdFx0MTYwLFxuXHRcdFx0MTYxLFxuXHRcdFx0MTYyLFxuXHRcdFx0MTYzLFxuXHRcdFx0MTY0LFxuXHRcdFx0MTY1LFxuXHRcdFx0MTY2LFxuXHRcdFx0MTY3LFxuXHRcdFx0MTY4LFxuXHRcdFx0MTY5LFxuXHRcdFx0MTcwLFxuXHRcdFx0MTcxLFxuXHRcdFx0MTcyLFxuXHRcdFx0MTczLFxuXHRcdFx0MTc4LFxuXHRcdFx0MTc5LFxuXHRcdFx0MTg0LFxuXHRcdFx0MTg1LFxuXHRcdFx0MTk2LFxuXHRcdFx0MTk3LFxuXHRcdFx0MTk4LFxuXHRcdFx0MTk5LFxuXHRcdFx0MjAwLFxuXHRcdFx0MjAxLFxuXHRcdFx0MjAyLFxuXHRcdFx0MjAzLFxuXHRcdFx0MjA0LFxuXHRcdFx0MjA1LFxuXHRcdFx0MjA2LFxuXHRcdFx0MjA3LFxuXHRcdFx0MjA4LFxuXHRcdFx0MjA5LFxuXHRcdFx0MjE0LFxuXHRcdFx0MjE1LFxuXHRcdFx0MjIwLFxuXHRcdFx0MjIxXG5cdFx0XTtcblx0fVxufSBjYXRjaCAoZXJyb3IpIHtcblx0Ly8gU3dhbGxvdyAtIHdlIG9ubHkgY2FyZSBpZiBgc3VwcG9ydHMtY29sb3JgIGlzIGF2YWlsYWJsZTsgaXQgZG9lc24ndCBoYXZlIHRvIGJlLlxufVxuXG4vKipcbiAqIEJ1aWxkIHVwIHRoZSBkZWZhdWx0IGBpbnNwZWN0T3B0c2Agb2JqZWN0IGZyb20gdGhlIGVudmlyb25tZW50IHZhcmlhYmxlcy5cbiAqXG4gKiAgICQgREVCVUdfQ09MT1JTPW5vIERFQlVHX0RFUFRIPTEwIERFQlVHX1NIT1dfSElEREVOPWVuYWJsZWQgbm9kZSBzY3JpcHQuanNcbiAqL1xuXG5leHBvcnRzLmluc3BlY3RPcHRzID0gT2JqZWN0LmtleXMocHJvY2Vzcy5lbnYpLmZpbHRlcihrZXkgPT4ge1xuXHRyZXR1cm4gL15kZWJ1Z18vaS50ZXN0KGtleSk7XG59KS5yZWR1Y2UoKG9iaiwga2V5KSA9PiB7XG5cdC8vIENhbWVsLWNhc2Vcblx0Y29uc3QgcHJvcCA9IGtleVxuXHRcdC5zdWJzdHJpbmcoNilcblx0XHQudG9Mb3dlckNhc2UoKVxuXHRcdC5yZXBsYWNlKC9fKFthLXpdKS9nLCAoXywgaykgPT4ge1xuXHRcdFx0cmV0dXJuIGsudG9VcHBlckNhc2UoKTtcblx0XHR9KTtcblxuXHQvLyBDb2VyY2Ugc3RyaW5nIHZhbHVlIGludG8gSlMgdmFsdWVcblx0bGV0IHZhbCA9IHByb2Nlc3MuZW52W2tleV07XG5cdGlmICgvXih5ZXN8b258dHJ1ZXxlbmFibGVkKSQvaS50ZXN0KHZhbCkpIHtcblx0XHR2YWwgPSB0cnVlO1xuXHR9IGVsc2UgaWYgKC9eKG5vfG9mZnxmYWxzZXxkaXNhYmxlZCkkL2kudGVzdCh2YWwpKSB7XG5cdFx0dmFsID0gZmFsc2U7XG5cdH0gZWxzZSBpZiAodmFsID09PSAnbnVsbCcpIHtcblx0XHR2YWwgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdHZhbCA9IE51bWJlcih2YWwpO1xuXHR9XG5cblx0b2JqW3Byb3BdID0gdmFsO1xuXHRyZXR1cm4gb2JqO1xufSwge30pO1xuXG4vKipcbiAqIElzIHN0ZG91dCBhIFRUWT8gQ29sb3JlZCBvdXRwdXQgaXMgZW5hYmxlZCB3aGVuIGB0cnVlYC5cbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG5cdHJldHVybiAnY29sb3JzJyBpbiBleHBvcnRzLmluc3BlY3RPcHRzID9cblx0XHRCb29sZWFuKGV4cG9ydHMuaW5zcGVjdE9wdHMuY29sb3JzKSA6XG5cdFx0dHR5LmlzYXR0eShwcm9jZXNzLnN0ZGVyci5mZCk7XG59XG5cbi8qKlxuICogQWRkcyBBTlNJIGNvbG9yIGVzY2FwZSBjb2RlcyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG5cdGNvbnN0IHtuYW1lc3BhY2U6IG5hbWUsIHVzZUNvbG9yc30gPSB0aGlzO1xuXG5cdGlmICh1c2VDb2xvcnMpIHtcblx0XHRjb25zdCBjID0gdGhpcy5jb2xvcjtcblx0XHRjb25zdCBjb2xvckNvZGUgPSAnXFx1MDAxQlszJyArIChjIDwgOCA/IGMgOiAnODs1OycgKyBjKTtcblx0XHRjb25zdCBwcmVmaXggPSBgICAke2NvbG9yQ29kZX07MW0ke25hbWV9IFxcdTAwMUJbMG1gO1xuXG5cdFx0YXJnc1swXSA9IHByZWZpeCArIGFyZ3NbMF0uc3BsaXQoJ1xcbicpLmpvaW4oJ1xcbicgKyBwcmVmaXgpO1xuXHRcdGFyZ3MucHVzaChjb2xvckNvZGUgKyAnbSsnICsgbW9kdWxlLmV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKSArICdcXHUwMDFCWzBtJyk7XG5cdH0gZWxzZSB7XG5cdFx0YXJnc1swXSA9IGdldERhdGUoKSArIG5hbWUgKyAnICcgKyBhcmdzWzBdO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGdldERhdGUoKSB7XG5cdGlmIChleHBvcnRzLmluc3BlY3RPcHRzLmhpZGVEYXRlKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cdHJldHVybiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgKyAnICc7XG59XG5cbi8qKlxuICogSW52b2tlcyBgdXRpbC5mb3JtYXQoKWAgd2l0aCB0aGUgc3BlY2lmaWVkIGFyZ3VtZW50cyBhbmQgd3JpdGVzIHRvIHN0ZGVyci5cbiAqL1xuXG5mdW5jdGlvbiBsb2coLi4uYXJncykge1xuXHRyZXR1cm4gcHJvY2Vzcy5zdGRlcnIud3JpdGUodXRpbC5mb3JtYXQoLi4uYXJncykgKyAnXFxuJyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcblx0aWYgKG5hbWVzcGFjZXMpIHtcblx0XHRwcm9jZXNzLmVudi5ERUJVRyA9IG5hbWVzcGFjZXM7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gSWYgeW91IHNldCBhIHByb2Nlc3MuZW52IGZpZWxkIHRvIG51bGwgb3IgdW5kZWZpbmVkLCBpdCBnZXRzIGNhc3QgdG8gdGhlXG5cdFx0Ly8gc3RyaW5nICdudWxsJyBvciAndW5kZWZpbmVkJy4gSnVzdCBkZWxldGUgaW5zdGVhZC5cblx0XHRkZWxldGUgcHJvY2Vzcy5lbnYuREVCVUc7XG5cdH1cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRyZXR1cm4gcHJvY2Vzcy5lbnYuREVCVUc7XG59XG5cbi8qKlxuICogSW5pdCBsb2dpYyBmb3IgYGRlYnVnYCBpbnN0YW5jZXMuXG4gKlxuICogQ3JlYXRlIGEgbmV3IGBpbnNwZWN0T3B0c2Agb2JqZWN0IGluIGNhc2UgYHVzZUNvbG9yc2AgaXMgc2V0XG4gKiBkaWZmZXJlbnRseSBmb3IgYSBwYXJ0aWN1bGFyIGBkZWJ1Z2AgaW5zdGFuY2UuXG4gKi9cblxuZnVuY3Rpb24gaW5pdChkZWJ1Zykge1xuXHRkZWJ1Zy5pbnNwZWN0T3B0cyA9IHt9O1xuXG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhleHBvcnRzLmluc3BlY3RPcHRzKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0ZGVidWcuaW5zcGVjdE9wdHNba2V5c1tpXV0gPSBleHBvcnRzLmluc3BlY3RPcHRzW2tleXNbaV1dO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21tb24nKShleHBvcnRzKTtcblxuY29uc3Qge2Zvcm1hdHRlcnN9ID0gbW9kdWxlLmV4cG9ydHM7XG5cbi8qKlxuICogTWFwICVvIHRvIGB1dGlsLmluc3BlY3QoKWAsIGFsbCBvbiBhIHNpbmdsZSBsaW5lLlxuICovXG5cbmZvcm1hdHRlcnMubyA9IGZ1bmN0aW9uICh2KSB7XG5cdHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cdHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cylcblx0XHQucmVwbGFjZSgvXFxzKlxcblxccyovZywgJyAnKTtcbn07XG5cbi8qKlxuICogTWFwICVPIHRvIGB1dGlsLmluc3BlY3QoKWAsIGFsbG93aW5nIG11bHRpcGxlIGxpbmVzIGlmIG5lZWRlZC5cbiAqL1xuXG5mb3JtYXR0ZXJzLk8gPSBmdW5jdGlvbiAodikge1xuXHR0aGlzLmluc3BlY3RPcHRzLmNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXHRyZXR1cm4gdXRpbC5pbnNwZWN0KHYsIHRoaXMuaW5zcGVjdE9wdHMpO1xufTtcbiIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gKGZsYWcsIGFyZ3YpID0+IHtcblx0YXJndiA9IGFyZ3YgfHwgcHJvY2Vzcy5hcmd2O1xuXHRjb25zdCBwcmVmaXggPSBmbGFnLnN0YXJ0c1dpdGgoJy0nKSA/ICcnIDogKGZsYWcubGVuZ3RoID09PSAxID8gJy0nIDogJy0tJyk7XG5cdGNvbnN0IHBvcyA9IGFyZ3YuaW5kZXhPZihwcmVmaXggKyBmbGFnKTtcblx0Y29uc3QgdGVybWluYXRvclBvcyA9IGFyZ3YuaW5kZXhPZignLS0nKTtcblx0cmV0dXJuIHBvcyAhPT0gLTEgJiYgKHRlcm1pbmF0b3JQb3MgPT09IC0xID8gdHJ1ZSA6IHBvcyA8IHRlcm1pbmF0b3JQb3MpO1xufTtcbiIsIi8qKlxuICogUHJvbWV0aGV1cyBjbGllbnRcbiAqIEBtb2R1bGUgUHJvbWV0aGV1cyBjbGllbnRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMucmVnaXN0ZXIgPSByZXF1aXJlKCcuL2xpYi9yZWdpc3RyeScpLmdsb2JhbFJlZ2lzdHJ5O1xuZXhwb3J0cy5SZWdpc3RyeSA9IHJlcXVpcmUoJy4vbGliL3JlZ2lzdHJ5Jyk7XG5leHBvcnRzLmNvbnRlbnRUeXBlID0gcmVxdWlyZSgnLi9saWIvcmVnaXN0cnknKS5nbG9iYWxSZWdpc3RyeS5jb250ZW50VHlwZTtcbmV4cG9ydHMudmFsaWRhdGVNZXRyaWNOYW1lID0gcmVxdWlyZSgnLi9saWIvdmFsaWRhdGlvbicpLnZhbGlkYXRlTWV0cmljTmFtZTtcblxuZXhwb3J0cy5Db3VudGVyID0gcmVxdWlyZSgnLi9saWIvY291bnRlcicpO1xuZXhwb3J0cy5HYXVnZSA9IHJlcXVpcmUoJy4vbGliL2dhdWdlJyk7XG5leHBvcnRzLkhpc3RvZ3JhbSA9IHJlcXVpcmUoJy4vbGliL2hpc3RvZ3JhbScpO1xuZXhwb3J0cy5TdW1tYXJ5ID0gcmVxdWlyZSgnLi9saWIvc3VtbWFyeScpO1xuZXhwb3J0cy5QdXNoZ2F0ZXdheSA9IHJlcXVpcmUoJy4vbGliL3B1c2hnYXRld2F5Jyk7XG5cbmV4cG9ydHMubGluZWFyQnVja2V0cyA9IHJlcXVpcmUoJy4vbGliL2J1Y2tldEdlbmVyYXRvcnMnKS5saW5lYXJCdWNrZXRzO1xuZXhwb3J0cy5leHBvbmVudGlhbEJ1Y2tldHMgPSByZXF1aXJlKCcuL2xpYi9idWNrZXRHZW5lcmF0b3JzJykuZXhwb25lbnRpYWxCdWNrZXRzO1xuXG5leHBvcnRzLmNvbGxlY3REZWZhdWx0TWV0cmljcyA9IHJlcXVpcmUoJy4vbGliL2RlZmF1bHRNZXRyaWNzJyk7XG5cbmV4cG9ydHMuYWdncmVnYXRvcnMgPSByZXF1aXJlKCcuL2xpYi9tZXRyaWNBZ2dyZWdhdG9ycycpLmFnZ3JlZ2F0b3JzO1xuZXhwb3J0cy5BZ2dyZWdhdG9yUmVnaXN0cnkgPSByZXF1aXJlKCcuL2xpYi9jbHVzdGVyJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMubGluZWFyQnVja2V0cyA9IChzdGFydCwgd2lkdGgsIGNvdW50KSA9PiB7XG5cdGlmIChjb3VudCA8IDEpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0xpbmVhciBidWNrZXRzIG5lZWRzIGEgcG9zaXRpdmUgY291bnQnKTtcblx0fVxuXG5cdGNvbnN0IGJ1Y2tldHMgPSBuZXcgQXJyYXkoY291bnQpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcblx0XHRidWNrZXRzW2ldID0gc3RhcnQ7XG5cdFx0c3RhcnQgKz0gd2lkdGg7XG5cdH1cblx0cmV0dXJuIGJ1Y2tldHM7XG59O1xuXG5leHBvcnRzLmV4cG9uZW50aWFsQnVja2V0cyA9IChzdGFydCwgZmFjdG9yLCBjb3VudCkgPT4ge1xuXHRpZiAoc3RhcnQgPD0gMCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignRXhwb25lbnRpYWwgYnVja2V0cyBuZWVkcyBhIHBvc2l0aXZlIHN0YXJ0Jyk7XG5cdH1cblx0aWYgKGNvdW50IDwgMSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignRXhwb25lbnRpYWwgYnVja2V0cyBuZWVkcyBhIHBvc2l0aXZlIGNvdW50Jyk7XG5cdH1cblx0aWYgKGZhY3RvciA8PSAxKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdFeHBvbmVudGlhbCBidWNrZXRzIG5lZWRzIGEgZmFjdG9yIGdyZWF0ZXIgdGhhbiAxJyk7XG5cdH1cblx0Y29uc3QgYnVja2V0cyA9IG5ldyBBcnJheShjb3VudCk7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuXHRcdGJ1Y2tldHNbaV0gPSBzdGFydDtcblx0XHRzdGFydCAqPSBmYWN0b3I7XG5cdH1cblx0cmV0dXJuIGJ1Y2tldHM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEV4dGVuZHMgdGhlIFJlZ2lzdHJ5IGNsYXNzIHdpdGggYSBgY2x1c3Rlck1ldHJpY3NgIG1ldGhvZCB0aGF0IHJldHVybnNcbiAqIGFnZ3JlZ2F0ZWQgbWV0cmljcyBmb3IgYWxsIHdvcmtlcnMuXG4gKlxuICogSW4gY2x1c3RlciB3b3JrZXJzLCBsaXN0ZW5zIGZvciBhbmQgcmVzcG9uZHMgdG8gcmVxdWVzdHMgZm9yIG1ldHJpY3MgYnkgdGhlXG4gKiBjbHVzdGVyIG1hc3Rlci5cbiAqL1xuXG5jb25zdCBjbHVzdGVyID0gcmVxdWlyZSgnY2x1c3RlcicpO1xuY29uc3QgUmVnaXN0cnkgPSByZXF1aXJlKCcuL3JlZ2lzdHJ5Jyk7XG5jb25zdCB7IEdyb3VwZXIgfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuY29uc3QgeyBhZ2dyZWdhdG9ycyB9ID0gcmVxdWlyZSgnLi9tZXRyaWNBZ2dyZWdhdG9ycycpO1xuXG5jb25zdCBHRVRfTUVUUklDU19SRVEgPSAncHJvbS1jbGllbnQ6Z2V0TWV0cmljc1JlcSc7XG5jb25zdCBHRVRfTUVUUklDU19SRVMgPSAncHJvbS1jbGllbnQ6Z2V0TWV0cmljc1Jlcyc7XG5cbmxldCByZWdpc3RyaWVzID0gW1JlZ2lzdHJ5Lmdsb2JhbFJlZ2lzdHJ5XTtcbmxldCByZXF1ZXN0Q3RyID0gMDsgLy8gQ29uY3VycmVuY3kgY29udHJvbFxubGV0IGxpc3RlbmVyc0FkZGVkID0gZmFsc2U7XG5jb25zdCByZXF1ZXN0cyA9IG5ldyBNYXAoKTsgLy8gUGVuZGluZyByZXF1ZXN0cyBmb3Igd29ya2VycycgbG9jYWwgbWV0cmljcy5cblxuY2xhc3MgQWdncmVnYXRvclJlZ2lzdHJ5IGV4dGVuZHMgUmVnaXN0cnkge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdGFkZExpc3RlbmVycygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEdldHMgYWdncmVnYXRlZCBtZXRyaWNzIGZvciBhbGwgd29ya2Vycy4gVGhlIG9wdGlvbmFsIGNhbGxiYWNrIGFuZFxuXHQgKiByZXR1cm5lZCBQcm9taXNlIHJlc29sdmUgd2l0aCB0aGUgc2FtZSB2YWx1ZTsgZWl0aGVyIG1heSBiZSB1c2VkLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9uP30gY2FsbGJhY2sgKGVyciwgbWV0cmljcykgPT4gYW55XG5cdCAqIEByZXR1cm4ge1Byb21pc2U8c3RyaW5nPn0gUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGFnZ3JlZ2F0ZWRcblx0ICogICBtZXRyaWNzLlxuXHQgKi9cblx0Y2x1c3Rlck1ldHJpY3MoY2FsbGJhY2spIHtcblx0XHRjb25zdCByZXF1ZXN0SWQgPSByZXF1ZXN0Q3RyKys7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0ZnVuY3Rpb24gZG9uZShlcnIsIHJlc3VsdCkge1xuXHRcdFx0XHQvLyBEb24ndCByZXNvbHZlL3JlamVjdCB0aGUgcHJvbWlzZSBpZiBhIGNhbGxiYWNrIGlzIHByb3ZpZGVkXG5cdFx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRjYWxsYmFjayhlcnIsIHJlc3VsdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGVycikgcmVqZWN0KGVycik7XG5cdFx0XHRcdFx0ZWxzZSByZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgcmVxdWVzdCA9IHtcblx0XHRcdFx0cmVzcG9uc2VzOiBbXSxcblx0XHRcdFx0cGVuZGluZzogMCxcblx0XHRcdFx0ZG9uZSxcblx0XHRcdFx0ZXJyb3JUaW1lb3V0OiBzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRyZXF1ZXN0LmZhaWxlZCA9IHRydWU7XG5cdFx0XHRcdFx0Y29uc3QgZXJyID0gbmV3IEVycm9yKCdPcGVyYXRpb24gdGltZWQgb3V0LicpO1xuXHRcdFx0XHRcdHJlcXVlc3QuZG9uZShlcnIpO1xuXHRcdFx0XHR9LCA1MDAwKSxcblx0XHRcdFx0ZmFpbGVkOiBmYWxzZVxuXHRcdFx0fTtcblx0XHRcdHJlcXVlc3RzLnNldChyZXF1ZXN0SWQsIHJlcXVlc3QpO1xuXG5cdFx0XHRjb25zdCBtZXNzYWdlID0ge1xuXHRcdFx0XHR0eXBlOiBHRVRfTUVUUklDU19SRVEsXG5cdFx0XHRcdHJlcXVlc3RJZFxuXHRcdFx0fTtcblxuXHRcdFx0Zm9yIChjb25zdCBpZCBpbiBjbHVzdGVyLndvcmtlcnMpIHtcblx0XHRcdFx0Ly8gSWYgdGhlIHdvcmtlciBleGl0cyBhYnJ1cHRseSwgaXQgbWF5IHN0aWxsIGJlIGluIHRoZSB3b3JrZXJzXG5cdFx0XHRcdC8vIGxpc3QgYnV0IG5vdCBhYmxlIHRvIGNvbW11bmljYXRlLlxuXHRcdFx0XHRpZiAoY2x1c3Rlci53b3JrZXJzW2lkXS5pc0Nvbm5lY3RlZCgpKSB7XG5cdFx0XHRcdFx0Y2x1c3Rlci53b3JrZXJzW2lkXS5zZW5kKG1lc3NhZ2UpO1xuXHRcdFx0XHRcdHJlcXVlc3QucGVuZGluZysrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChyZXF1ZXN0LnBlbmRpbmcgPT09IDApIHtcblx0XHRcdFx0Ly8gTm8gd29ya2VycyB3ZXJlIHVwXG5cdFx0XHRcdGNsZWFyVGltZW91dChyZXF1ZXN0LmVycm9yVGltZW91dCk7XG5cdFx0XHRcdHByb2Nlc3MubmV4dFRpY2soKCkgPT4gZG9uZShudWxsLCAnJykpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgUmVnaXN0cnkgaW5zdGFuY2UgZnJvbSBhbiBhcnJheSBvZiBtZXRyaWNzIHRoYXQgd2VyZVxuXHQgKiBjcmVhdGVkIGJ5IGByZWdpc3RyeS5nZXRNZXRyaWNzQXNKU09OKClgLiBNZXRyaWNzIGFyZSBhZ2dyZWdhdGVkIHVzaW5nXG5cdCAqIHRoZSBtZXRob2Qgc3BlY2lmaWVkIGJ5IHRoZWlyIGBhZ2dyZWdhdG9yYCBwcm9wZXJ0eSwgb3IgYnkgc3VtbWF0aW9uIGlmXG5cdCAqIGBhZ2dyZWdhdG9yYCBpcyB1bmRlZmluZWQuXG5cdCAqIEBwYXJhbSB7QXJyYXl9IG1ldHJpY3NBcnIgQXJyYXkgb2YgbWV0cmljcywgZWFjaCBvZiB3aGljaCBjcmVhdGVkIGJ5XG5cdCAqICAgYHJlZ2lzdHJ5LmdldE1ldHJpY3NBc0pTT04oKWAuXG5cdCAqIEByZXR1cm4ge1JlZ2lzdHJ5fSBhZ2dyZWdhdGVkIHJlZ2lzdHJ5LlxuXHQgKi9cblx0c3RhdGljIGFnZ3JlZ2F0ZShtZXRyaWNzQXJyKSB7XG5cdFx0Y29uc3QgYWdncmVnYXRlZFJlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5KCk7XG5cdFx0Y29uc3QgbWV0cmljc0J5TmFtZSA9IG5ldyBHcm91cGVyKCk7XG5cblx0XHQvLyBHYXRoZXIgYnkgbmFtZVxuXHRcdG1ldHJpY3NBcnIuZm9yRWFjaChtZXRyaWNzID0+IHtcblx0XHRcdG1ldHJpY3MuZm9yRWFjaChtZXRyaWMgPT4ge1xuXHRcdFx0XHRtZXRyaWNzQnlOYW1lLmFkZChtZXRyaWMubmFtZSwgbWV0cmljKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQWdncmVnYXRlIGdhdGhlcmVkIG1ldHJpY3MuXG5cdFx0bWV0cmljc0J5TmFtZS5mb3JFYWNoKG1ldHJpY3MgPT4ge1xuXHRcdFx0Y29uc3QgYWdncmVnYXRvck5hbWUgPSBtZXRyaWNzWzBdLmFnZ3JlZ2F0b3I7XG5cdFx0XHRjb25zdCBhZ2dyZWdhdG9yRm4gPSBhZ2dyZWdhdG9yc1thZ2dyZWdhdG9yTmFtZV07XG5cdFx0XHRpZiAodHlwZW9mIGFnZ3JlZ2F0b3JGbiAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYCcke2FnZ3JlZ2F0b3JOYW1lfScgaXMgbm90IGEgZGVmaW5lZCBhZ2dyZWdhdG9yLmApO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgYWdncmVnYXRlZE1ldHJpYyA9IGFnZ3JlZ2F0b3JGbihtZXRyaWNzKTtcblx0XHRcdC8vIE5COiBUaGUgJ29taXQnIGFnZ3JlZ2F0b3IgcmV0dXJucyB1bmRlZmluZWQuXG5cdFx0XHRpZiAoYWdncmVnYXRlZE1ldHJpYykge1xuXHRcdFx0XHRjb25zdCBhZ2dyZWdhdGVkTWV0cmljV3JhcHBlciA9IE9iamVjdC5hc3NpZ24oXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Z2V0OiAoKSA9PiBhZ2dyZWdhdGVkTWV0cmljXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRhZ2dyZWdhdGVkTWV0cmljXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGFnZ3JlZ2F0ZWRSZWdpc3RyeS5yZWdpc3Rlck1ldHJpYyhhZ2dyZWdhdGVkTWV0cmljV3JhcHBlcik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gYWdncmVnYXRlZFJlZ2lzdHJ5O1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIHJlZ2lzdHJ5IG9yIHJlZ2lzdHJpZXMgdG8gYmUgYWdncmVnYXRlZC4gQ2FsbCBmcm9tIHdvcmtlcnMgdG9cblx0ICogdXNlIGEgcmVnaXN0cnkvcmVnaXN0cmllcyBvdGhlciB0aGFuIHRoZSBkZWZhdWx0IGdsb2JhbCByZWdpc3RyeS5cblx0ICogQHBhcmFtIHtBcnJheTxSZWdpc3RyeT58UmVnaXN0cnl9IHJlZ3MgUmVnaXN0cnkgb3IgcmVnaXN0cmllcyB0byBiZVxuXHQgKiAgIGFnZ3JlZ2F0ZWQuXG5cdCAqIEByZXR1cm4ge3ZvaWR9XG5cdCAqL1xuXHRzdGF0aWMgc2V0UmVnaXN0cmllcyhyZWdzKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KHJlZ3MpKSByZWdzID0gW3JlZ3NdO1xuXHRcdHJlZ3MuZm9yRWFjaChyZWcgPT4ge1xuXHRcdFx0aWYgKCEocmVnIGluc3RhbmNlb2YgUmVnaXN0cnkpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIFJlZ2lzdHJ5LCBnb3QgJHt0eXBlb2YgcmVnfWApO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJlZ2lzdHJpZXMgPSByZWdzO1xuXHR9XG59XG5cbi8qKlxuICogQWRkcyBldmVudCBsaXN0ZW5lcnMgZm9yIGNsdXN0ZXIgYWdncmVnYXRpb24uIElkZW1wb3RlbnQgKHNhZmUgdG8gY2FsbCBtb3JlXG4gKiB0aGFuIG9uY2UpLlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xuXHRpZiAobGlzdGVuZXJzQWRkZWQpIHJldHVybjtcblx0bGlzdGVuZXJzQWRkZWQgPSB0cnVlO1xuXG5cdGlmIChjbHVzdGVyLmlzTWFzdGVyKSB7XG5cdFx0Ly8gTGlzdGVuIGZvciB3b3JrZXIgcmVzcG9uc2VzIHRvIHJlcXVlc3RzIGZvciBsb2NhbCBtZXRyaWNzXG5cdFx0Y2x1c3Rlci5vbignbWVzc2FnZScsICh3b3JrZXIsIG1lc3NhZ2UpID0+IHtcblx0XHRcdGlmIChtZXNzYWdlLnR5cGUgPT09IEdFVF9NRVRSSUNTX1JFUykge1xuXHRcdFx0XHRjb25zdCByZXF1ZXN0ID0gcmVxdWVzdHMuZ2V0KG1lc3NhZ2UucmVxdWVzdElkKTtcblx0XHRcdFx0bWVzc2FnZS5tZXRyaWNzLmZvckVhY2gocmVnaXN0cnkgPT4gcmVxdWVzdC5yZXNwb25zZXMucHVzaChyZWdpc3RyeSkpO1xuXHRcdFx0XHRyZXF1ZXN0LnBlbmRpbmctLTtcblxuXHRcdFx0XHRpZiAocmVxdWVzdC5wZW5kaW5nID09PSAwKSB7XG5cdFx0XHRcdFx0Ly8gZmluYWxpemVcblx0XHRcdFx0XHRyZXF1ZXN0cy5kZWxldGUobWVzc2FnZS5yZXF1ZXN0SWQpO1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dChyZXF1ZXN0LmVycm9yVGltZW91dCk7XG5cblx0XHRcdFx0XHRpZiAocmVxdWVzdC5mYWlsZWQpIHJldHVybjsgLy8gQ2FsbGJhY2sgYWxyZWFkeSBydW4gd2l0aCBFcnJvci5cblxuXHRcdFx0XHRcdGNvbnN0IHJlZ2lzdHJ5ID0gQWdncmVnYXRvclJlZ2lzdHJ5LmFnZ3JlZ2F0ZShyZXF1ZXN0LnJlc3BvbnNlcyk7XG5cdFx0XHRcdFx0Y29uc3QgcHJvbVN0cmluZyA9IHJlZ2lzdHJ5Lm1ldHJpY3MoKTtcblx0XHRcdFx0XHRyZXF1ZXN0LmRvbmUobnVsbCwgcHJvbVN0cmluZyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5pZiAoY2x1c3Rlci5pc1dvcmtlcikge1xuXHQvLyBSZXNwb25kIHRvIG1hc3RlcidzIHJlcXVlc3RzIGZvciB3b3JrZXIncyBsb2NhbCBtZXRyaWNzLlxuXHRwcm9jZXNzLm9uKCdtZXNzYWdlJywgbWVzc2FnZSA9PiB7XG5cdFx0aWYgKG1lc3NhZ2UudHlwZSA9PT0gR0VUX01FVFJJQ1NfUkVRKSB7XG5cdFx0XHRwcm9jZXNzLnNlbmQoe1xuXHRcdFx0XHR0eXBlOiBHRVRfTUVUUklDU19SRVMsXG5cdFx0XHRcdHJlcXVlc3RJZDogbWVzc2FnZS5yZXF1ZXN0SWQsXG5cdFx0XHRcdG1ldHJpY3M6IHJlZ2lzdHJpZXMubWFwKHIgPT4gci5nZXRNZXRyaWNzQXNKU09OKCkpXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFnZ3JlZ2F0b3JSZWdpc3RyeTtcbiIsIi8qKlxuICogQ291bnRlciBtZXRyaWNcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgeyBnbG9iYWxSZWdpc3RyeSB9ID0gcmVxdWlyZSgnLi9yZWdpc3RyeScpO1xuY29uc3QgdHlwZSA9ICdjb3VudGVyJztcbmNvbnN0IHtcblx0aXNEYXRlLFxuXHRnZXRQcm9wZXJ0aWVzRnJvbU9iaixcblx0aGFzaE9iamVjdCxcblx0aXNPYmplY3QsXG5cdHByaW50RGVwcmVjYXRpb25PYmplY3RDb25zdHJ1Y3Rvcixcblx0Z2V0TGFiZWxzLFxuXHRyZW1vdmVMYWJlbHNcbn0gPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuY29uc3Qge1xuXHR2YWxpZGF0ZUxhYmVsLFxuXHR2YWxpZGF0ZU1ldHJpY05hbWUsXG5cdHZhbGlkYXRlTGFiZWxOYW1lXG59ID0gcmVxdWlyZSgnLi92YWxpZGF0aW9uJyk7XG5cbmNsYXNzIENvdW50ZXIge1xuXHQvKipcblx0ICogQ291bnRlclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIE5hbWUgb2YgdGhlIG1ldHJpY1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gaGVscCAtIEhlbHAgZGVzY3JpcHRpb24gZm9yIHRoZSBtZXRyaWNcblx0ICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gbGFiZWxzIC0gTGFiZWxzXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihuYW1lLCBoZWxwLCBsYWJlbHMpIHtcblx0XHRsZXQgY29uZmlnO1xuXHRcdGlmIChpc09iamVjdChuYW1lKSkge1xuXHRcdFx0Y29uZmlnID0gT2JqZWN0LmFzc2lnbihcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhYmVsTmFtZXM6IFtdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG5hbWVcblx0XHRcdCk7XG5cblx0XHRcdGlmICghY29uZmlnLnJlZ2lzdGVycykge1xuXHRcdFx0XHRjb25maWcucmVnaXN0ZXJzID0gW2dsb2JhbFJlZ2lzdHJ5XTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cHJpbnREZXByZWNhdGlvbk9iamVjdENvbnN0cnVjdG9yKCk7XG5cblx0XHRcdGNvbmZpZyA9IHtcblx0XHRcdFx0bmFtZSxcblx0XHRcdFx0aGVscCxcblx0XHRcdFx0bGFiZWxOYW1lczogbGFiZWxzLFxuXHRcdFx0XHRyZWdpc3RlcnM6IFtnbG9iYWxSZWdpc3RyeV1cblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0aWYgKCFjb25maWcuaGVscCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hbmRhdG9yeSBoZWxwIHBhcmFtZXRlcicpO1xuXHRcdH1cblx0XHRpZiAoIWNvbmZpZy5uYW1lKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFuZGF0b3J5IG5hbWUgcGFyYW1ldGVyJyk7XG5cdFx0fVxuXHRcdGlmICghdmFsaWRhdGVNZXRyaWNOYW1lKGNvbmZpZy5uYW1lKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG1ldHJpYyBuYW1lJyk7XG5cdFx0fVxuXG5cdFx0aWYgKCF2YWxpZGF0ZUxhYmVsTmFtZShjb25maWcubGFiZWxOYW1lcykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsYWJlbCBuYW1lJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5uYW1lID0gY29uZmlnLm5hbWU7XG5cblx0XHR0aGlzLmxhYmVsTmFtZXMgPSBjb25maWcubGFiZWxOYW1lcyB8fCBbXTtcblxuXHRcdHRoaXMucmVzZXQoKTtcblxuXHRcdHRoaXMuaGVscCA9IGNvbmZpZy5oZWxwO1xuXHRcdHRoaXMuYWdncmVnYXRvciA9IGNvbmZpZy5hZ2dyZWdhdG9yIHx8ICdzdW0nO1xuXG5cdFx0Y29uZmlnLnJlZ2lzdGVycy5mb3JFYWNoKHJlZ2lzdHJ5SW5zdGFuY2UgPT5cblx0XHRcdHJlZ2lzdHJ5SW5zdGFuY2UucmVnaXN0ZXJNZXRyaWModGhpcylcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluY3JlbWVudCBjb3VudGVyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBsYWJlbHMgLSBXaGF0IGxhYmVsIHlvdSB3YW50IHRvIGJlIGluY3JlbWVudGVkXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIFZhbHVlIHRvIGluY3JlbWVudCwgaWYgb21pdHRlZCBpbmNyZW1lbnQgd2l0aCAxXG5cdCAqIEBwYXJhbSB7KE51bWJlcnxEYXRlKX0gdGltZXN0YW1wIC0gVGltZXN0YW1wIHRvIHNldCB0aGUgY291bnRlciB0b1xuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGluYyhsYWJlbHMsIHZhbHVlLCB0aW1lc3RhbXApIHtcblx0XHRpZiAoIWlzT2JqZWN0KGxhYmVscykpIHtcblx0XHRcdHJldHVybiBpbmMuY2FsbCh0aGlzLCBudWxsKShsYWJlbHMsIHZhbHVlKTtcblx0XHR9XG5cblx0XHRjb25zdCBoYXNoID0gaGFzaE9iamVjdChsYWJlbHMpO1xuXHRcdHJldHVybiBpbmMuY2FsbCh0aGlzLCBsYWJlbHMsIGhhc2gpKHZhbHVlLCB0aW1lc3RhbXApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc2V0IGNvdW50ZXJcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRyZXNldCgpIHtcblx0XHRyZXR1cm4gcmVzZXQuY2FsbCh0aGlzKTtcblx0fVxuXG5cdGdldCgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aGVscDogdGhpcy5oZWxwLFxuXHRcdFx0bmFtZTogdGhpcy5uYW1lLFxuXHRcdFx0dHlwZSxcblx0XHRcdHZhbHVlczogZ2V0UHJvcGVydGllc0Zyb21PYmoodGhpcy5oYXNoTWFwKSxcblx0XHRcdGFnZ3JlZ2F0b3I6IHRoaXMuYWdncmVnYXRvclxuXHRcdH07XG5cdH1cblxuXHRsYWJlbHMoKSB7XG5cdFx0Y29uc3QgbGFiZWxzID0gZ2V0TGFiZWxzKHRoaXMubGFiZWxOYW1lcywgYXJndW1lbnRzKSB8fCB7fTtcblx0XHRjb25zdCBoYXNoID0gaGFzaE9iamVjdChsYWJlbHMpO1xuXHRcdHZhbGlkYXRlTGFiZWwodGhpcy5sYWJlbE5hbWVzLCBsYWJlbHMpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRpbmM6IGluYy5jYWxsKHRoaXMsIGxhYmVscywgaGFzaClcblx0XHR9O1xuXHR9XG5cblx0cmVtb3ZlKCkge1xuXHRcdGNvbnN0IGxhYmVscyA9IGdldExhYmVscyh0aGlzLmxhYmVsTmFtZXMsIGFyZ3VtZW50cykgfHwge307XG5cdFx0cmV0dXJuIHJlbW92ZUxhYmVscy5jYWxsKHRoaXMsIHRoaXMuaGFzaE1hcCwgbGFiZWxzKTtcblx0fVxufVxuXG5jb25zdCByZXNldCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmhhc2hNYXAgPSB7fTtcblxuXHRpZiAodGhpcy5sYWJlbE5hbWVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRoaXMuaGFzaE1hcCA9IHNldFZhbHVlKHt9LCAwKTtcblx0fVxufTtcblxuY29uc3QgaW5jID0gZnVuY3Rpb24obGFiZWxzLCBoYXNoKSB7XG5cdHJldHVybiAodmFsdWUsIHRpbWVzdGFtcCkgPT4ge1xuXHRcdGlmICh2YWx1ZSAmJiAhTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmFsdWUgaXMgbm90IGEgdmFsaWQgbnVtYmVyOiAke3V0aWwuZm9ybWF0KHZhbHVlKX1gKTtcblx0XHR9XG5cdFx0aWYgKHRpbWVzdGFtcCAmJiAhaXNEYXRlKHRpbWVzdGFtcCkgJiYgIU51bWJlci5pc0Zpbml0ZSh0aW1lc3RhbXApKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHRgVGltZXN0YW1wIGlzIG5vdCBhIHZhbGlkIGRhdGUgb3IgbnVtYmVyOiAke3V0aWwuZm9ybWF0KHRpbWVzdGFtcCl9YFxuXHRcdFx0KTtcblx0XHR9XG5cdFx0aWYgKHZhbHVlIDwgMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJdCBpcyBub3QgcG9zc2libGUgdG8gZGVjcmVhc2UgYSBjb3VudGVyJyk7XG5cdFx0fVxuXG5cdFx0bGFiZWxzID0gbGFiZWxzIHx8IHt9O1xuXHRcdHZhbGlkYXRlTGFiZWwodGhpcy5sYWJlbE5hbWVzLCBsYWJlbHMpO1xuXG5cdFx0Y29uc3QgaW5jVmFsdWUgPSB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gMSA6IHZhbHVlO1xuXG5cdFx0dGhpcy5oYXNoTWFwID0gc2V0VmFsdWUodGhpcy5oYXNoTWFwLCBpbmNWYWx1ZSwgdGltZXN0YW1wLCBsYWJlbHMsIGhhc2gpO1xuXHR9O1xufTtcblxuZnVuY3Rpb24gc2V0VmFsdWUoaGFzaE1hcCwgdmFsdWUsIHRpbWVzdGFtcCwgbGFiZWxzLCBoYXNoKSB7XG5cdGhhc2ggPSBoYXNoIHx8ICcnO1xuXHR0aW1lc3RhbXAgPSBpc0RhdGUodGltZXN0YW1wKVxuXHRcdD8gdGltZXN0YW1wLnZhbHVlT2YoKVxuXHRcdDogTnVtYmVyLmlzRmluaXRlKHRpbWVzdGFtcClcblx0XHQ/IHRpbWVzdGFtcFxuXHRcdDogdW5kZWZpbmVkO1xuXHRpZiAoaGFzaE1hcFtoYXNoXSkge1xuXHRcdGhhc2hNYXBbaGFzaF0udmFsdWUgKz0gdmFsdWU7XG5cdFx0aGFzaE1hcFtoYXNoXS50aW1lc3RhbXAgPSB0aW1lc3RhbXA7XG5cdH0gZWxzZSB7XG5cdFx0aGFzaE1hcFtoYXNoXSA9IHsgdmFsdWUsIGxhYmVsczogbGFiZWxzIHx8IHt9LCB0aW1lc3RhbXAgfTtcblx0fVxuXHRyZXR1cm4gaGFzaE1hcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb3VudGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBwcm9jZXNzQ3B1VG90YWwgPSByZXF1aXJlKCcuL21ldHJpY3MvcHJvY2Vzc0NwdVRvdGFsJyk7XG5jb25zdCBwcm9jZXNzU3RhcnRUaW1lID0gcmVxdWlyZSgnLi9tZXRyaWNzL3Byb2Nlc3NTdGFydFRpbWUnKTtcbmNvbnN0IG9zTWVtb3J5SGVhcCA9IHJlcXVpcmUoJy4vbWV0cmljcy9vc01lbW9yeUhlYXAnKTtcbmNvbnN0IHByb2Nlc3NPcGVuRmlsZURlc2NyaXB0b3JzID0gcmVxdWlyZSgnLi9tZXRyaWNzL3Byb2Nlc3NPcGVuRmlsZURlc2NyaXB0b3JzJyk7XG5jb25zdCBwcm9jZXNzTWF4RmlsZURlc2NyaXB0b3JzID0gcmVxdWlyZSgnLi9tZXRyaWNzL3Byb2Nlc3NNYXhGaWxlRGVzY3JpcHRvcnMnKTtcbmNvbnN0IGV2ZW50TG9vcExhZyA9IHJlcXVpcmUoJy4vbWV0cmljcy9ldmVudExvb3BMYWcnKTtcbmNvbnN0IHByb2Nlc3NIYW5kbGVzID0gcmVxdWlyZSgnLi9tZXRyaWNzL3Byb2Nlc3NIYW5kbGVzJyk7XG5jb25zdCBwcm9jZXNzUmVxdWVzdHMgPSByZXF1aXJlKCcuL21ldHJpY3MvcHJvY2Vzc1JlcXVlc3RzJyk7XG5jb25zdCBoZWFwU2l6ZUFuZFVzZWQgPSByZXF1aXJlKCcuL21ldHJpY3MvaGVhcFNpemVBbmRVc2VkJyk7XG5jb25zdCBoZWFwU3BhY2VzU2l6ZUFuZFVzZWQgPSByZXF1aXJlKCcuL21ldHJpY3MvaGVhcFNwYWNlc1NpemVBbmRVc2VkJyk7XG5jb25zdCB2ZXJzaW9uID0gcmVxdWlyZSgnLi9tZXRyaWNzL3ZlcnNpb24nKTtcbmNvbnN0IHsgZ2xvYmFsUmVnaXN0cnkgfSA9IHJlcXVpcmUoJy4vcmVnaXN0cnknKTtcbmNvbnN0IHsgcHJpbnREZXByZWNhdGlvbkNvbGxlY3REZWZhdWx0TWV0cmljc051bWJlciB9ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmNvbnN0IG1ldHJpY3MgPSB7XG5cdHByb2Nlc3NDcHVUb3RhbCxcblx0cHJvY2Vzc1N0YXJ0VGltZSxcblx0b3NNZW1vcnlIZWFwLFxuXHRwcm9jZXNzT3BlbkZpbGVEZXNjcmlwdG9ycyxcblx0cHJvY2Vzc01heEZpbGVEZXNjcmlwdG9ycyxcblx0ZXZlbnRMb29wTGFnLFxuXHRwcm9jZXNzSGFuZGxlcyxcblx0cHJvY2Vzc1JlcXVlc3RzLFxuXHRoZWFwU2l6ZUFuZFVzZWQsXG5cdGhlYXBTcGFjZXNTaXplQW5kVXNlZCxcblx0dmVyc2lvblxufTtcbmNvbnN0IG1ldHJpY3NMaXN0ID0gT2JqZWN0LmtleXMobWV0cmljcyk7XG5cbmxldCBleGlzdGluZ0ludGVydmFsID0gbnVsbDtcbi8vIFRoaXMgaXMgdXNlZCB0byBlbnN1cmUgdGhlIHByb2dyYW0gdGhyb3dzIG9uIGR1cGxpY2F0ZSBtZXRyaWNzIGR1cmluZyBmaXJzdCBydW5cbi8vIFdlIG1pZ2h0IHdhbnQgdG8gY29uc2lkZXIgbm90IHN1cHBvcnRpbmcgcnVubmluZyB0aGUgZGVmYXVsdCBtZXRyaWNzIGZ1bmN0aW9uIG1vcmUgdGhhbiBvbmNlXG5sZXQgaW5pdCA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RhcnREZWZhdWx0TWV0cmljcyhjb25maWcpIHtcblx0bGV0IG5vcm1hbGl6ZWRDb25maWcgPSBjb25maWc7XG5cdGlmICh0eXBlb2YgY29uZmlnID09PSAnbnVtYmVyJykge1xuXHRcdHByaW50RGVwcmVjYXRpb25Db2xsZWN0RGVmYXVsdE1ldHJpY3NOdW1iZXIoY29uZmlnKTtcblxuXHRcdG5vcm1hbGl6ZWRDb25maWcgPSB7IHRpbWVvdXQ6IGNvbmZpZyB9O1xuXHR9XG5cblx0bm9ybWFsaXplZENvbmZpZyA9IE9iamVjdC5hc3NpZ24oXG5cdFx0e1xuXHRcdFx0dGltZXN0YW1wczogdHJ1ZSxcblx0XHRcdHRpbWVvdXQ6IDEwMDAwXG5cdFx0fSxcblx0XHRub3JtYWxpemVkQ29uZmlnXG5cdCk7XG5cblx0aWYgKGV4aXN0aW5nSW50ZXJ2YWwgIT09IG51bGwpIHtcblx0XHRjbGVhckludGVydmFsKGV4aXN0aW5nSW50ZXJ2YWwpO1xuXHR9XG5cblx0Y29uc3QgaW5pdGlhbGlzZWRNZXRyaWNzID0gbWV0cmljc0xpc3QubWFwKG1ldHJpYyA9PiB7XG5cdFx0Y29uc3QgZGVmYXVsdE1ldHJpYyA9IG1ldHJpY3NbbWV0cmljXTtcblx0XHRpZiAoIWluaXQpIHtcblx0XHRcdGRlZmF1bHRNZXRyaWMubWV0cmljTmFtZXMubWFwKFxuXHRcdFx0XHRnbG9iYWxSZWdpc3RyeS5yZW1vdmVTaW5nbGVNZXRyaWMsXG5cdFx0XHRcdGdsb2JhbFJlZ2lzdHJ5XG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBkZWZhdWx0TWV0cmljKG5vcm1hbGl6ZWRDb25maWcucmVnaXN0ZXIsIG5vcm1hbGl6ZWRDb25maWcpO1xuXHR9KTtcblxuXHRmdW5jdGlvbiB1cGRhdGVBbGxNZXRyaWNzKCkge1xuXHRcdGluaXRpYWxpc2VkTWV0cmljcy5mb3JFYWNoKG1ldHJpYyA9PiBtZXRyaWMuY2FsbCgpKTtcblx0fVxuXG5cdHVwZGF0ZUFsbE1ldHJpY3MoKTtcblxuXHRleGlzdGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoXG5cdFx0dXBkYXRlQWxsTWV0cmljcyxcblx0XHRub3JtYWxpemVkQ29uZmlnLnRpbWVvdXRcblx0KS51bnJlZigpO1xuXG5cdGluaXQgPSBmYWxzZTtcblxuXHRyZXR1cm4gZXhpc3RpbmdJbnRlcnZhbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzLm1ldHJpY3NMaXN0ID0gbWV0cmljc0xpc3Q7XG4iLCIvKipcbiAqIEdhdWdlIG1ldHJpY1xuICovXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5jb25zdCB7IGdsb2JhbFJlZ2lzdHJ5IH0gPSByZXF1aXJlKCcuL3JlZ2lzdHJ5Jyk7XG5jb25zdCB0eXBlID0gJ2dhdWdlJztcblxuY29uc3Qge1xuXHRpc0RhdGUsXG5cdHNldFZhbHVlLFxuXHRnZXRQcm9wZXJ0aWVzRnJvbU9iaixcblx0Z2V0TGFiZWxzLFxuXHRoYXNoT2JqZWN0LFxuXHRpc09iamVjdCxcblx0cHJpbnREZXByZWNhdGlvbk9iamVjdENvbnN0cnVjdG9yLFxuXHRyZW1vdmVMYWJlbHNcbn0gPSByZXF1aXJlKCcuL3V0aWwnKTtcbmNvbnN0IHtcblx0dmFsaWRhdGVNZXRyaWNOYW1lLFxuXHR2YWxpZGF0ZUxhYmVsLFxuXHR2YWxpZGF0ZUxhYmVsTmFtZVxufSA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvbicpO1xuXG5jbGFzcyBHYXVnZSB7XG5cdC8qKlxuXHQgKiBHYXVnZVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIE5hbWUgb2YgdGhlIG1ldHJpY1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gaGVscCAtIEhlbHAgZm9yIHRoZSBtZXRyaWNcblx0ICogQHBhcmFtIHtBcnJheS48c3RyaW5nPn0gbGFiZWxzIC0gQXJyYXkgd2l0aCBzdHJpbmdzLCBhbGwgbGFiZWwga2V5d29yZHMgc3VwcG9ydGVkXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihuYW1lLCBoZWxwLCBsYWJlbHMpIHtcblx0XHRsZXQgY29uZmlnO1xuXHRcdGlmIChpc09iamVjdChuYW1lKSkge1xuXHRcdFx0Y29uZmlnID0gT2JqZWN0LmFzc2lnbihcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxhYmVsTmFtZXM6IFtdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG5hbWVcblx0XHRcdCk7XG5cblx0XHRcdGlmICghY29uZmlnLnJlZ2lzdGVycykge1xuXHRcdFx0XHRjb25maWcucmVnaXN0ZXJzID0gW2dsb2JhbFJlZ2lzdHJ5XTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cHJpbnREZXByZWNhdGlvbk9iamVjdENvbnN0cnVjdG9yKCk7XG5cdFx0XHRjb25maWcgPSB7XG5cdFx0XHRcdG5hbWUsXG5cdFx0XHRcdGhlbHAsXG5cdFx0XHRcdGxhYmVsTmFtZXM6IGxhYmVscyxcblx0XHRcdFx0cmVnaXN0ZXJzOiBbZ2xvYmFsUmVnaXN0cnldXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICghY29uZmlnLmhlbHApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYW5kYXRvcnkgaGVscCBwYXJhbWV0ZXInKTtcblx0XHR9XG5cdFx0aWYgKCFjb25maWcubmFtZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hbmRhdG9yeSBuYW1lIHBhcmFtZXRlcicpO1xuXHRcdH1cblx0XHRpZiAoIXZhbGlkYXRlTWV0cmljTmFtZShjb25maWcubmFtZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBtZXRyaWMgbmFtZScpO1xuXHRcdH1cblx0XHRpZiAoIXZhbGlkYXRlTGFiZWxOYW1lKGNvbmZpZy5sYWJlbE5hbWVzKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxhYmVsIG5hbWUnKTtcblx0XHR9XG5cblx0XHR0aGlzLm5hbWUgPSBjb25maWcubmFtZTtcblx0XHR0aGlzLmxhYmVsTmFtZXMgPSBjb25maWcubGFiZWxOYW1lcyB8fCBbXTtcblx0XHR0aGlzLnJlc2V0KCk7XG5cdFx0dGhpcy5oZWxwID0gY29uZmlnLmhlbHA7XG5cdFx0dGhpcy5hZ2dyZWdhdG9yID0gY29uZmlnLmFnZ3JlZ2F0b3IgfHwgJ3N1bSc7XG5cblx0XHRjb25maWcucmVnaXN0ZXJzLmZvckVhY2gocmVnaXN0cnlJbnN0YW5jZSA9PlxuXHRcdFx0cmVnaXN0cnlJbnN0YW5jZS5yZWdpc3Rlck1ldHJpYyh0aGlzKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IGEgZ2F1Z2UgdG8gYSB2YWx1ZVxuXHQgKiBAcGFyYW0ge29iamVjdH0gbGFiZWxzIC0gT2JqZWN0IHdpdGggbGFiZWxzIGFuZCB0aGVpciB2YWx1ZXNcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gVmFsdWUgdG8gc2V0IHRoZSBnYXVnZSB0bywgbXVzdCBiZSBwb3NpdGl2ZVxuXHQgKiBAcGFyYW0geyhOdW1iZXJ8RGF0ZSl9IHRpbWVzdGFtcCAtIFRpbWVzdGFtcCB0byBzZXQgdGhlIGdhdWdlIHRvXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0c2V0KGxhYmVscywgdmFsdWUsIHRpbWVzdGFtcCkge1xuXHRcdGlmICghaXNPYmplY3QobGFiZWxzKSkge1xuXHRcdFx0cmV0dXJuIHNldC5jYWxsKHRoaXMsIG51bGwpKGxhYmVscywgdmFsdWUpO1xuXHRcdH1cblx0XHRyZXR1cm4gc2V0LmNhbGwodGhpcywgbGFiZWxzKSh2YWx1ZSwgdGltZXN0YW1wKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXNldCBnYXVnZVxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdHJlc2V0KCkge1xuXHRcdHJldHVybiByZXNldC5jYWxsKHRoaXMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluY3JlbWVudCBhIGdhdWdlIHZhbHVlXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBsYWJlbHMgLSBPYmplY3Qgd2l0aCBsYWJlbHMgd2hlcmUga2V5IGlzIHRoZSBsYWJlbCBrZXkgYW5kIHZhbHVlIGlzIGxhYmVsIHZhbHVlLiBDYW4gb25seSBiZSBvbmUgbGV2ZWwgZGVlcFxuXHQgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBWYWx1ZSB0byBpbmNyZW1lbnQgLSBpZiBvbWl0dGVkLCBpbmNyZW1lbnQgd2l0aCAxXG5cdCAqIEBwYXJhbSB7KE51bWJlcnxEYXRlKX0gdGltZXN0YW1wIC0gVGltZXN0YW1wIHRvIHNldCB0aGUgZ2F1Z2UgdG9cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRpbmMobGFiZWxzLCB2YWx1ZSwgdGltZXN0YW1wKSB7XG5cdFx0aW5jLmNhbGwodGhpcywgbGFiZWxzKSh2YWx1ZSwgdGltZXN0YW1wKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWNyZW1lbnQgYSBnYXVnZSB2YWx1ZVxuXHQgKiBAcGFyYW0ge29iamVjdH0gbGFiZWxzIC0gT2JqZWN0IHdpdGggbGFiZWxzIHdoZXJlIGtleSBpcyB0aGUgbGFiZWwga2V5IGFuZCB2YWx1ZSBpcyBsYWJlbCB2YWx1ZS4gQ2FuIG9ubHkgYmUgb25lIGxldmVsIGRlZXBcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gVmFsdWUgdG8gZGVjcmVtZW50IC0gaWYgb21pdHRlZCwgZGVjcmVtZW50IHdpdGggMVxuXHQgKiBAcGFyYW0geyhOdW1iZXJ8RGF0ZSl9IHRpbWVzdGFtcCAtIFRpbWVzdGFtcCB0byBzZXQgdGhlIGdhdWdlIHRvXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0ZGVjKGxhYmVscywgdmFsdWUsIHRpbWVzdGFtcCkge1xuXHRcdGRlYy5jYWxsKHRoaXMsIGxhYmVscykodmFsdWUsIHRpbWVzdGFtcCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHRoZSBnYXVnZSB0byBjdXJyZW50IHVuaXggZXBvY2hcblx0ICogQHBhcmFtIHtvYmplY3R9IGxhYmVscyAtIE9iamVjdCB3aXRoIGxhYmVscyB3aGVyZSBrZXkgaXMgdGhlIGxhYmVsIGtleSBhbmQgdmFsdWUgaXMgbGFiZWwgdmFsdWUuIENhbiBvbmx5IGJlIG9uZSBsZXZlbCBkZWVwXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0c2V0VG9DdXJyZW50VGltZShsYWJlbHMpIHtcblx0XHRyZXR1cm4gc2V0VG9DdXJyZW50VGltZS5jYWxsKHRoaXMsIGxhYmVscykoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTdGFydCBhIHRpbWVyXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBsYWJlbHMgLSBPYmplY3Qgd2l0aCBsYWJlbHMgd2hlcmUga2V5IGlzIHRoZSBsYWJlbCBrZXkgYW5kIHZhbHVlIGlzIGxhYmVsIHZhbHVlLiBDYW4gb25seSBiZSBvbmUgbGV2ZWwgZGVlcFxuXHQgKiBAcmV0dXJucyB7ZnVuY3Rpb259IC0gSW52b2tlIHRoaXMgZnVuY3Rpb24gdG8gc2V0IHRoZSBkdXJhdGlvbiBpbiBzZWNvbmRzIHNpbmNlIHlvdSBzdGFydGVkIHRoZSB0aW1lci5cblx0ICogQGV4YW1wbGVcblx0ICogdmFyIGRvbmUgPSBnYXVnZS5zdGFydFRpbWVyKCk7XG5cdCAqIG1ha2VYSFJSZXF1ZXN0KGZ1bmN0aW9uKGVyciwgcmVzcG9uc2UpIHtcblx0ICpcdGRvbmUoKTsgLy9EdXJhdGlvbiBvZiB0aGUgcmVxdWVzdCB3aWxsIGJlIHNhdmVkXG5cdCAqIH0pO1xuXHQgKi9cblx0c3RhcnRUaW1lcihsYWJlbHMpIHtcblx0XHRyZXR1cm4gc3RhcnRUaW1lci5jYWxsKHRoaXMsIGxhYmVscykoKTtcblx0fVxuXG5cdGdldCgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aGVscDogdGhpcy5oZWxwLFxuXHRcdFx0bmFtZTogdGhpcy5uYW1lLFxuXHRcdFx0dHlwZSxcblx0XHRcdHZhbHVlczogZ2V0UHJvcGVydGllc0Zyb21PYmoodGhpcy5oYXNoTWFwKSxcblx0XHRcdGFnZ3JlZ2F0b3I6IHRoaXMuYWdncmVnYXRvclxuXHRcdH07XG5cdH1cblxuXHRfZ2V0VmFsdWUobGFiZWxzKSB7XG5cdFx0Y29uc3QgaGFzaCA9IGhhc2hPYmplY3QobGFiZWxzIHx8IHt9KTtcblx0XHRyZXR1cm4gdGhpcy5oYXNoTWFwW2hhc2hdID8gdGhpcy5oYXNoTWFwW2hhc2hdLnZhbHVlIDogMDtcblx0fVxuXG5cdGxhYmVscygpIHtcblx0XHRjb25zdCBsYWJlbHMgPSBnZXRMYWJlbHModGhpcy5sYWJlbE5hbWVzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRpbmM6IGluYy5jYWxsKHRoaXMsIGxhYmVscyksXG5cdFx0XHRkZWM6IGRlYy5jYWxsKHRoaXMsIGxhYmVscyksXG5cdFx0XHRzZXQ6IHNldC5jYWxsKHRoaXMsIGxhYmVscyksXG5cdFx0XHRzZXRUb0N1cnJlbnRUaW1lOiBzZXRUb0N1cnJlbnRUaW1lLmNhbGwodGhpcywgbGFiZWxzKSxcblx0XHRcdHN0YXJ0VGltZXI6IHN0YXJ0VGltZXIuY2FsbCh0aGlzLCBsYWJlbHMpXG5cdFx0fTtcblx0fVxuXG5cdHJlbW92ZSgpIHtcblx0XHRjb25zdCBsYWJlbHMgPSBnZXRMYWJlbHModGhpcy5sYWJlbE5hbWVzLCBhcmd1bWVudHMpO1xuXHRcdHJlbW92ZUxhYmVscy5jYWxsKHRoaXMsIHRoaXMuaGFzaE1hcCwgbGFiZWxzKTtcblx0fVxufVxuXG5mdW5jdGlvbiBzZXRUb0N1cnJlbnRUaW1lKGxhYmVscykge1xuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGNvbnN0IG5vdyA9IERhdGUubm93KCkgLyAxMDAwO1xuXHRcdGlmIChsYWJlbHMgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5zZXQobm93KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXQobGFiZWxzLCBub3cpO1xuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gc3RhcnRUaW1lcihzdGFydExhYmVscykge1xuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGNvbnN0IHN0YXJ0ID0gcHJvY2Vzcy5ocnRpbWUoKTtcblx0XHRyZXR1cm4gZW5kTGFiZWxzID0+IHtcblx0XHRcdGNvbnN0IGRlbHRhID0gcHJvY2Vzcy5ocnRpbWUoc3RhcnQpO1xuXHRcdFx0dGhpcy5zZXQoXG5cdFx0XHRcdE9iamVjdC5hc3NpZ24oe30sIHN0YXJ0TGFiZWxzLCBlbmRMYWJlbHMpLFxuXHRcdFx0XHRkZWx0YVswXSArIGRlbHRhWzFdIC8gMWU5XG5cdFx0XHQpO1xuXHRcdH07XG5cdH07XG59XG5cbmZ1bmN0aW9uIGRlYyhsYWJlbHMpIHtcblx0cmV0dXJuICh2YWx1ZSwgdGltZXN0YW1wKSA9PiB7XG5cdFx0Y29uc3QgZGF0YSA9IGNvbnZlcnRMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZSk7XG5cdFx0dGhpcy5zZXQoXG5cdFx0XHRkYXRhLmxhYmVscyxcblx0XHRcdHRoaXMuX2dldFZhbHVlKGRhdGEubGFiZWxzKSAtIChkYXRhLnZhbHVlIHx8IDEpLFxuXHRcdFx0dGltZXN0YW1wXG5cdFx0KTtcblx0fTtcbn1cblxuZnVuY3Rpb24gaW5jKGxhYmVscykge1xuXHRyZXR1cm4gKHZhbHVlLCB0aW1lc3RhbXApID0+IHtcblx0XHRjb25zdCBkYXRhID0gY29udmVydExhYmVsc0FuZFZhbHVlcyhsYWJlbHMsIHZhbHVlKTtcblx0XHR0aGlzLnNldChcblx0XHRcdGRhdGEubGFiZWxzLFxuXHRcdFx0dGhpcy5fZ2V0VmFsdWUoZGF0YS5sYWJlbHMpICsgKGRhdGEudmFsdWUgfHwgMSksXG5cdFx0XHR0aW1lc3RhbXBcblx0XHQpO1xuXHR9O1xufVxuXG5mdW5jdGlvbiBzZXQobGFiZWxzKSB7XG5cdHJldHVybiAodmFsdWUsIHRpbWVzdGFtcCkgPT4ge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBWYWx1ZSBpcyBub3QgYSB2YWxpZCBudW1iZXI6ICR7dXRpbC5mb3JtYXQodmFsdWUpfWApO1xuXHRcdH1cblx0XHRpZiAodGltZXN0YW1wICYmICFpc0RhdGUodGltZXN0YW1wKSAmJiAhTnVtYmVyLmlzRmluaXRlKHRpbWVzdGFtcCkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdGBUaW1lc3RhbXAgaXMgbm90IGEgdmFsaWQgZGF0ZSBvciBudW1iZXI6ICR7dXRpbC5mb3JtYXQodGltZXN0YW1wKX1gXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGxhYmVscyA9IGxhYmVscyB8fCB7fTtcblxuXHRcdHZhbGlkYXRlTGFiZWwodGhpcy5sYWJlbE5hbWVzLCBsYWJlbHMpO1xuXHRcdHRoaXMuaGFzaE1hcCA9IHNldFZhbHVlKHRoaXMuaGFzaE1hcCwgdmFsdWUsIGxhYmVscywgdGltZXN0YW1wKTtcblx0fTtcbn1cblxuZnVuY3Rpb24gcmVzZXQoKSB7XG5cdHRoaXMuaGFzaE1hcCA9IHt9O1xuXG5cdGlmICh0aGlzLmxhYmVsTmFtZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0dGhpcy5oYXNoTWFwID0gc2V0VmFsdWUoe30sIDAsIHt9KTtcblx0fVxufVxuXG5mdW5jdGlvbiBjb252ZXJ0TGFiZWxzQW5kVmFsdWVzKGxhYmVscywgdmFsdWUpIHtcblx0aWYgKCFpc09iamVjdChsYWJlbHMpKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiBsYWJlbHMsXG5cdFx0XHRsYWJlbHM6IHt9XG5cdFx0fTtcblx0fVxuXHRyZXR1cm4ge1xuXHRcdGxhYmVscyxcblx0XHR2YWx1ZVxuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhdWdlO1xuIiwiLyoqXG4gKiBIaXN0b2dyYW1cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgZ2xvYmFsUmVnaXN0cnkgPSByZXF1aXJlKCcuL3JlZ2lzdHJ5JykuZ2xvYmFsUmVnaXN0cnk7XG5jb25zdCB0eXBlID0gJ2hpc3RvZ3JhbSc7XG5jb25zdCB7XG5cdGdldFByb3BlcnRpZXNGcm9tT2JqLFxuXHRnZXRMYWJlbHMsXG5cdGhhc2hPYmplY3QsXG5cdGlzT2JqZWN0LFxuXHRwcmludERlcHJlY2F0aW9uT2JqZWN0Q29uc3RydWN0b3IsXG5cdHJlbW92ZUxhYmVsc1xufSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuY29uc3Qge1xuXHR2YWxpZGF0ZU1ldHJpY05hbWUsXG5cdHZhbGlkYXRlTGFiZWwsXG5cdHZhbGlkYXRlTGFiZWxOYW1lXG59ID0gcmVxdWlyZSgnLi92YWxpZGF0aW9uJyk7XG5cbmNsYXNzIEhpc3RvZ3JhbSB7XG5cdC8qKlxuXHQgKiBIaXN0b2dyYW1cblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBOYW1lIG9mIHRoZSBtZXRyaWNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGhlbHAgLSBIZWxwIGZvciB0aGUgbWV0cmljXG5cdCAqIEBwYXJhbSB7b2JqZWN0fEFycmF5LjxzdHJpbmc+fSBsYWJlbHNPckNvbmYgLSBFaXRoZXIgYXJyYXkgb2YgbGFiZWwgbmFtZXMgb3IgY29uZmlnIG9iamVjdCBhcyBhIGtleS12YWx1ZSBvYmplY3Rcblx0ICogQHBhcmFtIHtvYmplY3R9IGNvbmYgLSBDb25maWd1cmF0aW9uIG9iamVjdFxuXHQgKi9cblx0Y29uc3RydWN0b3IobmFtZSwgaGVscCwgbGFiZWxzT3JDb25mLCBjb25mKSB7XG5cdFx0bGV0IGNvbmZpZztcblxuXHRcdGlmIChpc09iamVjdChuYW1lKSkge1xuXHRcdFx0Y29uZmlnID0gT2JqZWN0LmFzc2lnbihcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGJ1Y2tldHM6IFswLjAwNSwgMC4wMSwgMC4wMjUsIDAuMDUsIDAuMSwgMC4yNSwgMC41LCAxLCAyLjUsIDUsIDEwXSxcblx0XHRcdFx0XHRsYWJlbE5hbWVzOiBbXVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRuYW1lXG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAoIWNvbmZpZy5yZWdpc3RlcnMpIHtcblx0XHRcdFx0Y29uZmlnLnJlZ2lzdGVycyA9IFtnbG9iYWxSZWdpc3RyeV07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBvYmo7XG5cdFx0XHRsZXQgbGFiZWxzID0gW107XG5cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGxhYmVsc09yQ29uZikpIHtcblx0XHRcdFx0b2JqID0gY29uZiB8fCB7fTtcblx0XHRcdFx0bGFiZWxzID0gbGFiZWxzT3JDb25mO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b2JqID0gbGFiZWxzT3JDb25mIHx8IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHRwcmludERlcHJlY2F0aW9uT2JqZWN0Q29uc3RydWN0b3IoKTtcblxuXHRcdFx0Y29uZmlnID0ge1xuXHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRsYWJlbE5hbWVzOiBsYWJlbHMsXG5cdFx0XHRcdGhlbHAsXG5cdFx0XHRcdGJ1Y2tldHM6IGNvbmZpZ3VyZVVwcGVyYm91bmRzKG9iai5idWNrZXRzKSxcblx0XHRcdFx0cmVnaXN0ZXJzOiBbZ2xvYmFsUmVnaXN0cnldXG5cdFx0XHR9O1xuXHRcdH1cblx0XHR2YWxpZGF0ZUlucHV0KGNvbmZpZy5uYW1lLCBjb25maWcuaGVscCwgY29uZmlnLmxhYmVsTmFtZXMpO1xuXG5cdFx0dGhpcy5uYW1lID0gY29uZmlnLm5hbWU7XG5cdFx0dGhpcy5oZWxwID0gY29uZmlnLmhlbHA7XG5cdFx0dGhpcy5hZ2dyZWdhdG9yID0gY29uZmlnLmFnZ3JlZ2F0b3IgfHwgJ3N1bSc7XG5cblx0XHR0aGlzLnVwcGVyQm91bmRzID0gY29uZmlnLmJ1Y2tldHM7XG5cdFx0dGhpcy5idWNrZXRWYWx1ZXMgPSB0aGlzLnVwcGVyQm91bmRzLnJlZHVjZSgoYWNjLCB1cHBlckJvdW5kKSA9PiB7XG5cdFx0XHRhY2NbdXBwZXJCb3VuZF0gPSAwO1xuXHRcdFx0cmV0dXJuIGFjYztcblx0XHR9LCB7fSk7XG5cblx0XHRPYmplY3QuZnJlZXplKHRoaXMuYnVja2V0VmFsdWVzKTtcblx0XHRPYmplY3QuZnJlZXplKHRoaXMudXBwZXJCb3VuZHMpO1xuXHRcdHRoaXMuc3VtID0gMDtcblx0XHR0aGlzLmNvdW50ID0gMDtcblxuXHRcdHRoaXMuaGFzaE1hcCA9IHt9O1xuXHRcdHRoaXMubGFiZWxOYW1lcyA9IGNvbmZpZy5sYWJlbE5hbWVzIHx8IFtdO1xuXG5cdFx0aWYgKHRoaXMubGFiZWxOYW1lcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMuaGFzaE1hcCA9IHtcblx0XHRcdFx0W2hhc2hPYmplY3Qoe30pXTogY3JlYXRlQmFzZVZhbHVlcyhcblx0XHRcdFx0XHR7fSxcblx0XHRcdFx0XHRPYmplY3QuYXNzaWduKHt9LCB0aGlzLmJ1Y2tldFZhbHVlcylcblx0XHRcdFx0KVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRjb25maWcucmVnaXN0ZXJzLmZvckVhY2gocmVnaXN0cnlJbnN0YW5jZSA9PlxuXHRcdFx0cmVnaXN0cnlJbnN0YW5jZS5yZWdpc3Rlck1ldHJpYyh0aGlzKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogT2JzZXJ2ZSBhIHZhbHVlIGluIGhpc3RvZ3JhbVxuXHQgKiBAcGFyYW0ge29iamVjdH0gbGFiZWxzIC0gT2JqZWN0IHdpdGggbGFiZWxzIHdoZXJlIGtleSBpcyB0aGUgbGFiZWwga2V5IGFuZCB2YWx1ZSBpcyBsYWJlbCB2YWx1ZS4gQ2FuIG9ubHkgYmUgb25lIGxldmVsIGRlZXBcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gVmFsdWUgdG8gb2JzZXJ2ZSBpbiB0aGUgaGlzdG9ncmFtXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0b2JzZXJ2ZShsYWJlbHMsIHZhbHVlKSB7XG5cdFx0b2JzZXJ2ZS5jYWxsKHRoaXMsIGxhYmVscyA9PT0gMCA/IDAgOiBsYWJlbHMgfHwge30pKHZhbHVlKTtcblx0fVxuXG5cdGdldCgpIHtcblx0XHRjb25zdCBkYXRhID0gZ2V0UHJvcGVydGllc0Zyb21PYmoodGhpcy5oYXNoTWFwKTtcblx0XHRjb25zdCB2YWx1ZXMgPSBkYXRhXG5cdFx0XHQubWFwKGV4dHJhY3RCdWNrZXRWYWx1ZXNGb3JFeHBvcnQodGhpcykpXG5cdFx0XHQucmVkdWNlKGFkZFN1bUFuZENvdW50Rm9yRXhwb3J0KHRoaXMpLCBbXSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bmFtZTogdGhpcy5uYW1lLFxuXHRcdFx0aGVscDogdGhpcy5oZWxwLFxuXHRcdFx0dHlwZSxcblx0XHRcdHZhbHVlcyxcblx0XHRcdGFnZ3JlZ2F0b3I6IHRoaXMuYWdncmVnYXRvclxuXHRcdH07XG5cdH1cblxuXHRyZXNldCgpIHtcblx0XHR0aGlzLnN1bSA9IDA7XG5cdFx0dGhpcy5jb3VudCA9IDA7XG5cdFx0dGhpcy5oYXNoTWFwID0ge307XG5cdH1cblxuXHQvKipcblx0ICogU3RhcnQgYSB0aW1lciB0aGF0IGNvdWxkIGJlIHVzZWQgdG8gbG9nZ2luZyBkdXJhdGlvbnNcblx0ICogQHBhcmFtIHtvYmplY3R9IGxhYmVscyAtIE9iamVjdCB3aXRoIGxhYmVscyB3aGVyZSBrZXkgaXMgdGhlIGxhYmVsIGtleSBhbmQgdmFsdWUgaXMgbGFiZWwgdmFsdWUuIENhbiBvbmx5IGJlIG9uZSBsZXZlbCBkZWVwXG5cdCAqIEByZXR1cm5zIHtmdW5jdGlvbn0gLSBGdW5jdGlvbiB0byBpbnZva2Ugd2hlbiB5b3Ugd2FudCB0byBzdG9wIHRoZSB0aW1lciBhbmQgb2JzZXJ2ZSB0aGUgZHVyYXRpb24gaW4gc2Vjb25kc1xuXHQgKiBAZXhhbXBsZVxuXHQgKiB2YXIgZW5kID0gaGlzdG9ncmFtLnN0YXJ0VGltZXIoKTtcblx0ICogbWFrZUV4cGVuc2l2ZVhIUlJlcXVlc3QoZnVuY3Rpb24oZXJyLCByZXMpIHtcblx0ICpcdGVuZCgpOyAvL09ic2VydmUgdGhlIGR1cmF0aW9uIG9mIGV4cGVuc2l2ZVhIUlJlcXVlc3Rcblx0ICogfSk7XG5cdCAqL1xuXHRzdGFydFRpbWVyKGxhYmVscykge1xuXHRcdHJldHVybiBzdGFydFRpbWVyLmNhbGwodGhpcywgbGFiZWxzKSgpO1xuXHR9XG5cblx0bGFiZWxzKCkge1xuXHRcdGNvbnN0IGxhYmVscyA9IGdldExhYmVscyh0aGlzLmxhYmVsTmFtZXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9ic2VydmU6IG9ic2VydmUuY2FsbCh0aGlzLCBsYWJlbHMpLFxuXHRcdFx0c3RhcnRUaW1lcjogc3RhcnRUaW1lci5jYWxsKHRoaXMsIGxhYmVscylcblx0XHR9O1xuXHR9XG5cblx0cmVtb3ZlKCkge1xuXHRcdGNvbnN0IGxhYmVscyA9IGdldExhYmVscyh0aGlzLmxhYmVsTmFtZXMsIGFyZ3VtZW50cyk7XG5cdFx0cmVtb3ZlTGFiZWxzLmNhbGwodGhpcywgdGhpcy5oYXNoTWFwLCBsYWJlbHMpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHN0YXJ0VGltZXIoc3RhcnRMYWJlbHMpIHtcblx0cmV0dXJuICgpID0+IHtcblx0XHRjb25zdCBzdGFydCA9IHByb2Nlc3MuaHJ0aW1lKCk7XG5cdFx0cmV0dXJuIGVuZExhYmVscyA9PiB7XG5cdFx0XHRjb25zdCBkZWx0YSA9IHByb2Nlc3MuaHJ0aW1lKHN0YXJ0KTtcblx0XHRcdHRoaXMub2JzZXJ2ZShcblx0XHRcdFx0T2JqZWN0LmFzc2lnbih7fSwgc3RhcnRMYWJlbHMsIGVuZExhYmVscyksXG5cdFx0XHRcdGRlbHRhWzBdICsgZGVsdGFbMV0gLyAxZTlcblx0XHRcdCk7XG5cdFx0fTtcblx0fTtcbn1cbmZ1bmN0aW9uIHZhbGlkYXRlSW5wdXQobmFtZSwgaGVscCwgbGFiZWxzKSB7XG5cdGlmICghaGVscCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYW5kYXRvcnkgaGVscCBwYXJhbWV0ZXInKTtcblx0fVxuXHRpZiAoIW5hbWUpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFuZGF0b3J5IG5hbWUgcGFyYW1ldGVyJyk7XG5cdH1cblxuXHRpZiAoIXZhbGlkYXRlTWV0cmljTmFtZShuYW1lKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBtZXRyaWMgbmFtZScpO1xuXHR9XG5cblx0aWYgKCF2YWxpZGF0ZUxhYmVsTmFtZShsYWJlbHMpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxhYmVsIG5hbWUnKTtcblx0fVxuXG5cdGxhYmVscy5mb3JFYWNoKGxhYmVsID0+IHtcblx0XHRpZiAobGFiZWwgPT09ICdsZScpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignbGUgaXMgYSByZXNlcnZlZCBsYWJlbCBrZXl3b3JkJyk7XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gY29uZmlndXJlVXBwZXJib3VuZHMoY29uZmlndXJlZEJ1Y2tldHMpIHtcblx0Y29uc3QgZGVmYXVsdEJ1Y2tldHMgPSBbXG5cdFx0MC4wMDUsXG5cdFx0MC4wMSxcblx0XHQwLjAyNSxcblx0XHQwLjA1LFxuXHRcdDAuMSxcblx0XHQwLjI1LFxuXHRcdDAuNSxcblx0XHQxLFxuXHRcdDIuNSxcblx0XHQ1LFxuXHRcdDEwXG5cdF07XG5cdHJldHVybiBbXS5jb25jYXQoY29uZmlndXJlZEJ1Y2tldHMgfHwgZGVmYXVsdEJ1Y2tldHMpLnNvcnQoc29ydEFzY2VuZGluZyk7XG59XG5cbmZ1bmN0aW9uIHNvcnRBc2NlbmRpbmcoeCwgeSkge1xuXHRyZXR1cm4geCAtIHk7XG59XG5cbmZ1bmN0aW9uIHNldFZhbHVlUGFpcihsYWJlbHMsIHZhbHVlLCBtZXRyaWNOYW1lKSB7XG5cdHJldHVybiB7XG5cdFx0bGFiZWxzLFxuXHRcdHZhbHVlLFxuXHRcdG1ldHJpY05hbWVcblx0fTtcbn1cblxuZnVuY3Rpb24gZmluZEJvdW5kKHVwcGVyQm91bmRzLCB2YWx1ZSkge1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IHVwcGVyQm91bmRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgYm91bmQgPSB1cHBlckJvdW5kc1tpXTtcblx0XHRpZiAodmFsdWUgPD0gYm91bmQpIHtcblx0XHRcdHJldHVybiBib3VuZDtcblx0XHR9XG5cdH1cblx0cmV0dXJuIC0xO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlKGxhYmVscykge1xuXHRyZXR1cm4gdmFsdWUgPT4ge1xuXHRcdGNvbnN0IGxhYmVsVmFsdWVQYWlyID0gY29udmVydExhYmVsc0FuZFZhbHVlcyhsYWJlbHMsIHZhbHVlKTtcblxuXHRcdHZhbGlkYXRlTGFiZWwodGhpcy5sYWJlbE5hbWVzLCBsYWJlbFZhbHVlUGFpci5sYWJlbHMpO1xuXHRcdGlmICghTnVtYmVyLmlzRmluaXRlKGxhYmVsVmFsdWVQYWlyLnZhbHVlKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0YFZhbHVlIGlzIG5vdCBhIHZhbGlkIG51bWJlcjogJHt1dGlsLmZvcm1hdChsYWJlbFZhbHVlUGFpci52YWx1ZSl9YFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBoYXNoID0gaGFzaE9iamVjdChsYWJlbFZhbHVlUGFpci5sYWJlbHMpO1xuXHRcdGxldCB2YWx1ZUZyb21NYXAgPSB0aGlzLmhhc2hNYXBbaGFzaF07XG5cdFx0aWYgKCF2YWx1ZUZyb21NYXApIHtcblx0XHRcdHZhbHVlRnJvbU1hcCA9IGNyZWF0ZUJhc2VWYWx1ZXMoXG5cdFx0XHRcdGxhYmVsVmFsdWVQYWlyLmxhYmVscyxcblx0XHRcdFx0T2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idWNrZXRWYWx1ZXMpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGIgPSBmaW5kQm91bmQodGhpcy51cHBlckJvdW5kcywgbGFiZWxWYWx1ZVBhaXIudmFsdWUpO1xuXG5cdFx0dmFsdWVGcm9tTWFwLnN1bSArPSBsYWJlbFZhbHVlUGFpci52YWx1ZTtcblx0XHR2YWx1ZUZyb21NYXAuY291bnQgKz0gMTtcblxuXHRcdGlmICh2YWx1ZUZyb21NYXAuYnVja2V0VmFsdWVzLmhhc093blByb3BlcnR5KGIpKSB7XG5cdFx0XHR2YWx1ZUZyb21NYXAuYnVja2V0VmFsdWVzW2JdICs9IDE7XG5cdFx0fVxuXG5cdFx0dGhpcy5oYXNoTWFwW2hhc2hdID0gdmFsdWVGcm9tTWFwO1xuXHR9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCYXNlVmFsdWVzKGxhYmVscywgYnVja2V0VmFsdWVzKSB7XG5cdHJldHVybiB7XG5cdFx0bGFiZWxzLFxuXHRcdGJ1Y2tldFZhbHVlcyxcblx0XHRzdW06IDAsXG5cdFx0Y291bnQ6IDBcblx0fTtcbn1cblxuZnVuY3Rpb24gY29udmVydExhYmVsc0FuZFZhbHVlcyhsYWJlbHMsIHZhbHVlKSB7XG5cdGlmICghaXNPYmplY3QobGFiZWxzKSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZTogbGFiZWxzLFxuXHRcdFx0bGFiZWxzOiB7fVxuXHRcdH07XG5cdH1cblx0cmV0dXJuIHtcblx0XHRsYWJlbHMsXG5cdFx0dmFsdWVcblx0fTtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdEJ1Y2tldFZhbHVlc0ZvckV4cG9ydChoaXN0b2dyYW0pIHtcblx0cmV0dXJuIGJ1Y2tldERhdGEgPT4ge1xuXHRcdGNvbnN0IGJ1Y2tldHMgPSBbXTtcblx0XHRjb25zdCBidWNrZXRMYWJlbE5hbWVzID0gT2JqZWN0LmtleXMoYnVja2V0RGF0YS5sYWJlbHMpO1xuXHRcdGxldCBhY2MgPSAwO1xuXHRcdGZvciAoY29uc3QgdXBwZXJCb3VuZCBvZiBoaXN0b2dyYW0udXBwZXJCb3VuZHMpIHtcblx0XHRcdGFjYyArPSBidWNrZXREYXRhLmJ1Y2tldFZhbHVlc1t1cHBlckJvdW5kXTtcblx0XHRcdGNvbnN0IGxibHMgPSB7IGxlOiB1cHBlckJvdW5kIH07XG5cdFx0XHRmb3IgKGNvbnN0IGxhYmVsTmFtZSBvZiBidWNrZXRMYWJlbE5hbWVzKSB7XG5cdFx0XHRcdGxibHNbbGFiZWxOYW1lXSA9IGJ1Y2tldERhdGEubGFiZWxzW2xhYmVsTmFtZV07XG5cdFx0XHR9XG5cdFx0XHRidWNrZXRzLnB1c2goc2V0VmFsdWVQYWlyKGxibHMsIGFjYywgYCR7aGlzdG9ncmFtLm5hbWV9X2J1Y2tldGApKTtcblx0XHR9XG5cdFx0cmV0dXJuIHsgYnVja2V0cywgZGF0YTogYnVja2V0RGF0YSB9O1xuXHR9O1xufVxuXG5mdW5jdGlvbiBhZGRTdW1BbmRDb3VudEZvckV4cG9ydChoaXN0b2dyYW0pIHtcblx0cmV0dXJuIChhY2MsIGQpID0+IHtcblx0XHRhY2MucHVzaCguLi5kLmJ1Y2tldHMpO1xuXG5cdFx0Y29uc3QgaW5mTGFiZWwgPSB7IGxlOiAnK0luZicgfTtcblx0XHRmb3IgKGNvbnN0IGxhYmVsIG9mIE9iamVjdC5rZXlzKGQuZGF0YS5sYWJlbHMpKSB7XG5cdFx0XHRpbmZMYWJlbFtsYWJlbF0gPSBkLmRhdGEubGFiZWxzW2xhYmVsXTtcblx0XHR9XG5cdFx0YWNjLnB1c2goXG5cdFx0XHRzZXRWYWx1ZVBhaXIoaW5mTGFiZWwsIGQuZGF0YS5jb3VudCwgYCR7aGlzdG9ncmFtLm5hbWV9X2J1Y2tldGApLFxuXHRcdFx0c2V0VmFsdWVQYWlyKGQuZGF0YS5sYWJlbHMsIGQuZGF0YS5zdW0sIGAke2hpc3RvZ3JhbS5uYW1lfV9zdW1gKSxcblx0XHRcdHNldFZhbHVlUGFpcihkLmRhdGEubGFiZWxzLCBkLmRhdGEuY291bnQsIGAke2hpc3RvZ3JhbS5uYW1lfV9jb3VudGApXG5cdFx0KTtcblx0XHRyZXR1cm4gYWNjO1xuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhpc3RvZ3JhbTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyBHcm91cGVyLCBoYXNoT2JqZWN0IH0gPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGZ1bmN0aW9uIHRoYXQgYXBwbGllcyB0aGUgYGFnZ3JlZ2F0b3JGbmAgdG8gdGhlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFnZ3JlZ2F0b3JGbiBmdW5jdGlvbiB0byBhcHBseSB0byB2YWx1ZXMuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gYWdncmVnYXRvciBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBBZ2dyZWdhdG9yRmFjdG9yeShhZ2dyZWdhdG9yRm4pIHtcblx0cmV0dXJuIG1ldHJpY3MgPT4ge1xuXHRcdGlmIChtZXRyaWNzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXHRcdGNvbnN0IHJlc3VsdCA9IHtcblx0XHRcdGhlbHA6IG1ldHJpY3NbMF0uaGVscCxcblx0XHRcdG5hbWU6IG1ldHJpY3NbMF0ubmFtZSxcblx0XHRcdHR5cGU6IG1ldHJpY3NbMF0udHlwZSxcblx0XHRcdHZhbHVlczogW10sXG5cdFx0XHRhZ2dyZWdhdG9yOiBtZXRyaWNzWzBdLmFnZ3JlZ2F0b3Jcblx0XHR9O1xuXHRcdC8vIEdhdGhlciBtZXRyaWNzIGJ5IG1ldHJpY05hbWUgYW5kIGxhYmVscy5cblx0XHRjb25zdCBieUxhYmVscyA9IG5ldyBHcm91cGVyKCk7XG5cdFx0bWV0cmljcy5mb3JFYWNoKG1ldHJpYyA9PiB7XG5cdFx0XHRtZXRyaWMudmFsdWVzLmZvckVhY2godmFsdWUgPT4ge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBoYXNoT2JqZWN0KHZhbHVlLmxhYmVscyk7XG5cdFx0XHRcdGJ5TGFiZWxzLmFkZChgJHt2YWx1ZS5tZXRyaWNOYW1lfV8ke2tleX1gLCB2YWx1ZSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHQvLyBBcHBseSBhZ2dyZWdhdG9yIGZ1bmN0aW9uIHRvIGdhdGhlcmVkIG1ldHJpY3MuXG5cdFx0YnlMYWJlbHMuZm9yRWFjaCh2YWx1ZXMgPT4ge1xuXHRcdFx0aWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHJldHVybjtcblx0XHRcdGNvbnN0IHZhbE9iaiA9IHtcblx0XHRcdFx0dmFsdWU6IGFnZ3JlZ2F0b3JGbih2YWx1ZXMpLFxuXHRcdFx0XHRsYWJlbHM6IHZhbHVlc1swXS5sYWJlbHNcblx0XHRcdH07XG5cdFx0XHRpZiAodmFsdWVzWzBdLm1ldHJpY05hbWUpIHtcblx0XHRcdFx0dmFsT2JqLm1ldHJpY05hbWUgPSB2YWx1ZXNbMF0ubWV0cmljTmFtZTtcblx0XHRcdH1cblx0XHRcdC8vIE5COiBUaW1lc3RhbXBzIGFyZSBvbWl0dGVkLlxuXHRcdFx0cmVzdWx0LnZhbHVlcy5wdXNoKHZhbE9iaik7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcbn1cbi8vIEV4cG9ydCBmb3IgdXNlcnMgdG8gZGVmaW5lIHRoZWlyIG93biBhZ2dyZWdhdGlvbiBtZXRob2RzLlxuZXhwb3J0cy5BZ2dyZWdhdG9yRmFjdG9yeSA9IEFnZ3JlZ2F0b3JGYWN0b3J5O1xuXG4vKipcbiAqIEZ1bmN0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIHRvIGFnZ3JlZ2F0ZSBtZXRyaWNzIGZyb20gbXVsdGlwbGUgcmVnaXN0cmllcy5cbiAqL1xuZXhwb3J0cy5hZ2dyZWdhdG9ycyA9IHtcblx0LyoqXG5cdCAqIEByZXR1cm4gVGhlIHN1bSBvZiB2YWx1ZXMuXG5cdCAqL1xuXHRzdW06IEFnZ3JlZ2F0b3JGYWN0b3J5KHYgPT4gdi5yZWR1Y2UoKHAsIGMpID0+IHAgKyBjLnZhbHVlLCAwKSksXG5cdC8qKlxuXHQgKiBAcmV0dXJuIFRoZSBmaXJzdCB2YWx1ZS5cblx0ICovXG5cdGZpcnN0OiBBZ2dyZWdhdG9yRmFjdG9yeSh2ID0+IHZbMF0udmFsdWUpLFxuXHQvKipcblx0ICogQHJldHVybiB7dW5kZWZpbmVkfSBVbmRlZmluZWQ7IG9taXRzIHRoZSBtZXRyaWMuXG5cdCAqL1xuXHRvbWl0OiAoKSA9PiB7fSxcblx0LyoqXG5cdCAqIEByZXR1cm4gVGhlIGFyaXRobWV0aWMgbWVhbiBvZiB0aGUgdmFsdWVzLlxuXHQgKi9cblx0YXZlcmFnZTogQWdncmVnYXRvckZhY3RvcnkoXG5cdFx0diA9PiB2LnJlZHVjZSgocCwgYykgPT4gcCArIGMudmFsdWUsIDApIC8gdi5sZW5ndGhcblx0KSxcblx0LyoqXG5cdCAqIEByZXR1cm4gVGhlIG1pbmltdW0gb2YgdGhlIHZhbHVlcy5cblx0ICovXG5cdG1pbjogQWdncmVnYXRvckZhY3RvcnkodiA9PlxuXHRcdHYucmVkdWNlKChwLCBjKSA9PiBNYXRoLm1pbihwLCBjLnZhbHVlKSwgSW5maW5pdHkpXG5cdCksXG5cdC8qKlxuXHQgKiBAcmV0dXJuIFRoZSBtYXhpbXVtIG9mIHRoZSB2YWx1ZXMuXG5cdCAqL1xuXHRtYXg6IEFnZ3JlZ2F0b3JGYWN0b3J5KHYgPT5cblx0XHR2LnJlZHVjZSgocCwgYykgPT4gTWF0aC5tYXgocCwgYy52YWx1ZSksIC1JbmZpbml0eSlcblx0KVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgR2F1Z2UgPSByZXF1aXJlKCcuLi9nYXVnZScpO1xuXG5jb25zdCBOT0RFSlNfRVZFTlRMT09QX0xBRyA9ICdub2RlanNfZXZlbnRsb29wX2xhZ19zZWNvbmRzJztcblxuZnVuY3Rpb24gcmVwb3J0RXZlbnRsb29wTGFnKHN0YXJ0LCBnYXVnZSkge1xuXHRjb25zdCBkZWx0YSA9IHByb2Nlc3MuaHJ0aW1lKHN0YXJ0KTtcblx0Y29uc3QgbmFub3NlYyA9IGRlbHRhWzBdICogMWU5ICsgZGVsdGFbMV07XG5cdGNvbnN0IHNlY29uZHMgPSBuYW5vc2VjIC8gMWU5O1xuXG5cdGdhdWdlLnNldChzZWNvbmRzLCBEYXRlLm5vdygpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSAocmVnaXN0cnksIGNvbmZpZyA9IHt9KSA9PiB7XG5cdGNvbnN0IG5hbWVQcmVmaXggPSBjb25maWcucHJlZml4ID8gY29uZmlnLnByZWZpeCA6ICcnO1xuXG5cdGNvbnN0IGdhdWdlID0gbmV3IEdhdWdlKHtcblx0XHRuYW1lOiBuYW1lUHJlZml4ICsgTk9ERUpTX0VWRU5UTE9PUF9MQUcsXG5cdFx0aGVscDogJ0xhZyBvZiBldmVudCBsb29wIGluIHNlY29uZHMuJyxcblx0XHRyZWdpc3RlcnM6IHJlZ2lzdHJ5ID8gW3JlZ2lzdHJ5XSA6IHVuZGVmaW5lZCxcblx0XHRhZ2dyZWdhdG9yOiAnYXZlcmFnZSdcblx0fSk7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRjb25zdCBzdGFydCA9IHByb2Nlc3MuaHJ0aW1lKCk7XG5cdFx0c2V0SW1tZWRpYXRlKHJlcG9ydEV2ZW50bG9vcExhZywgc3RhcnQsIGdhdWdlKTtcblx0fTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLm1ldHJpY05hbWVzID0gW05PREVKU19FVkVOVExPT1BfTEFHXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgR2F1Z2UgPSByZXF1aXJlKCcuLi9nYXVnZScpO1xuY29uc3Qgc2FmZU1lbW9yeVVzYWdlID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NhZmVNZW1vcnlVc2FnZScpO1xuXG5jb25zdCBOT0RFSlNfSEVBUF9TSVpFX1RPVEFMID0gJ25vZGVqc19oZWFwX3NpemVfdG90YWxfYnl0ZXMnO1xuY29uc3QgTk9ERUpTX0hFQVBfU0laRV9VU0VEID0gJ25vZGVqc19oZWFwX3NpemVfdXNlZF9ieXRlcyc7XG5jb25zdCBOT0RFSlNfRVhURVJOQUxfTUVNT1JZID0gJ25vZGVqc19leHRlcm5hbF9tZW1vcnlfYnl0ZXMnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZWdpc3RyeSwgY29uZmlnID0ge30pID0+IHtcblx0aWYgKHR5cGVvZiBwcm9jZXNzLm1lbW9yeVVzYWdlICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuICgpID0+IHt9O1xuXHR9XG5cblx0Y29uc3QgcmVnaXN0ZXJzID0gcmVnaXN0cnkgPyBbcmVnaXN0cnldIDogdW5kZWZpbmVkO1xuXHRjb25zdCBuYW1lUHJlZml4ID0gY29uZmlnLnByZWZpeCA/IGNvbmZpZy5wcmVmaXggOiAnJztcblxuXHRjb25zdCBoZWFwU2l6ZVRvdGFsID0gbmV3IEdhdWdlKHtcblx0XHRuYW1lOiBuYW1lUHJlZml4ICsgTk9ERUpTX0hFQVBfU0laRV9UT1RBTCxcblx0XHRoZWxwOiAnUHJvY2VzcyBoZWFwIHNpemUgZnJvbSBub2RlLmpzIGluIGJ5dGVzLicsXG5cdFx0cmVnaXN0ZXJzXG5cdH0pO1xuXHRjb25zdCBoZWFwU2l6ZVVzZWQgPSBuZXcgR2F1Z2Uoe1xuXHRcdG5hbWU6IG5hbWVQcmVmaXggKyBOT0RFSlNfSEVBUF9TSVpFX1VTRUQsXG5cdFx0aGVscDogJ1Byb2Nlc3MgaGVhcCBzaXplIHVzZWQgZnJvbSBub2RlLmpzIGluIGJ5dGVzLicsXG5cdFx0cmVnaXN0ZXJzXG5cdH0pO1xuXHRsZXQgZXh0ZXJuYWxNZW1Vc2VkO1xuXG5cdGNvbnN0IHVzYWdlID0gc2FmZU1lbW9yeVVzYWdlKCk7XG5cdGlmICh1c2FnZSAmJiB1c2FnZS5leHRlcm5hbCkge1xuXHRcdGV4dGVybmFsTWVtVXNlZCA9IG5ldyBHYXVnZSh7XG5cdFx0XHRuYW1lOiBuYW1lUHJlZml4ICsgTk9ERUpTX0VYVEVSTkFMX01FTU9SWSxcblx0XHRcdGhlbHA6ICdOb2RlanMgZXh0ZXJuYWwgbWVtb3J5IHNpemUgaW4gYnl0ZXMuJyxcblx0XHRcdHJlZ2lzdGVyc1xuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHQvLyBwcm9jZXNzLm1lbW9yeVVzYWdlKCkgY2FuIHRocm93IEVNRklMRSBlcnJvcnMsIHNlZSAjNjdcblx0XHRjb25zdCBtZW1Vc2FnZSA9IHNhZmVNZW1vcnlVc2FnZSgpO1xuXHRcdGlmIChtZW1Vc2FnZSkge1xuXHRcdFx0aWYgKGNvbmZpZy50aW1lc3RhbXBzKSB7XG5cdFx0XHRcdGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cdFx0XHRcdGhlYXBTaXplVG90YWwuc2V0KG1lbVVzYWdlLmhlYXBUb3RhbCwgbm93KTtcblx0XHRcdFx0aGVhcFNpemVVc2VkLnNldChtZW1Vc2FnZS5oZWFwVXNlZCwgbm93KTtcblx0XHRcdFx0aWYgKG1lbVVzYWdlLmV4dGVybmFsICYmIGV4dGVybmFsTWVtVXNlZCkge1xuXHRcdFx0XHRcdGV4dGVybmFsTWVtVXNlZC5zZXQobWVtVXNhZ2UuZXh0ZXJuYWwsIG5vdyk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGhlYXBTaXplVG90YWwuc2V0KG1lbVVzYWdlLmhlYXBUb3RhbCk7XG5cdFx0XHRcdGhlYXBTaXplVXNlZC5zZXQobWVtVXNhZ2UuaGVhcFVzZWQpO1xuXHRcdFx0XHRpZiAobWVtVXNhZ2UuZXh0ZXJuYWwgJiYgZXh0ZXJuYWxNZW1Vc2VkKSB7XG5cdFx0XHRcdFx0ZXh0ZXJuYWxNZW1Vc2VkLnNldChtZW1Vc2FnZS5leHRlcm5hbCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dG90YWw6IGhlYXBTaXplVG90YWwsXG5cdFx0XHR1c2VkOiBoZWFwU2l6ZVVzZWQsXG5cdFx0XHRleHRlcm5hbDogZXh0ZXJuYWxNZW1Vc2VkXG5cdFx0fTtcblx0fTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLm1ldHJpY05hbWVzID0gW1xuXHROT0RFSlNfSEVBUF9TSVpFX1RPVEFMLFxuXHROT0RFSlNfSEVBUF9TSVpFX1VTRUQsXG5cdE5PREVKU19FWFRFUk5BTF9NRU1PUllcbl07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEdhdWdlID0gcmVxdWlyZSgnLi4vZ2F1Z2UnKTtcbmxldCB2ODtcblxudHJ5IHtcblx0djggPSByZXF1aXJlKCd2OCcpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBub2RlIHZlcnNpb24gaXMgdG9vIG9sZFxuXHQvLyBwcm9iYWJseSB3ZSBjYW4gdXNlIHY4LWhlYXAtc3BhY2Utc3RhdGlzdGljcyBmb3IgPj1ub2RlLTQuMC4wIGFuZCA8bm9kZS02LjAuMFxufVxuXG5jb25zdCBNRVRSSUNTID0gWyd0b3RhbCcsICd1c2VkJywgJ2F2YWlsYWJsZSddO1xuXG5jb25zdCBOT0RFSlNfSEVBUF9TSVpFID0ge307XG5cbk1FVFJJQ1MuZm9yRWFjaChtZXRyaWNUeXBlID0+IHtcblx0Tk9ERUpTX0hFQVBfU0laRVttZXRyaWNUeXBlXSA9IGBub2RlanNfaGVhcF9zcGFjZV9zaXplXyR7bWV0cmljVHlwZX1fYnl0ZXNgO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlZ2lzdHJ5LCBjb25maWcgPSB7fSkgPT4ge1xuXHRpZiAoXG5cdFx0dHlwZW9mIHY4ID09PSAndW5kZWZpbmVkJyB8fFxuXHRcdHR5cGVvZiB2OC5nZXRIZWFwU3BhY2VTdGF0aXN0aWNzICE9PSAnZnVuY3Rpb24nXG5cdCkge1xuXHRcdHJldHVybiAoKSA9PiB7fTtcblx0fVxuXG5cdGNvbnN0IHJlZ2lzdGVycyA9IHJlZ2lzdHJ5ID8gW3JlZ2lzdHJ5XSA6IHVuZGVmaW5lZDtcblx0Y29uc3QgbmFtZVByZWZpeCA9IGNvbmZpZy5wcmVmaXggPyBjb25maWcucHJlZml4IDogJyc7XG5cblx0Y29uc3QgZ2F1Z2VzID0ge307XG5cblx0TUVUUklDUy5mb3JFYWNoKG1ldHJpY1R5cGUgPT4ge1xuXHRcdGdhdWdlc1ttZXRyaWNUeXBlXSA9IG5ldyBHYXVnZSh7XG5cdFx0XHRuYW1lOiBuYW1lUHJlZml4ICsgTk9ERUpTX0hFQVBfU0laRVttZXRyaWNUeXBlXSxcblx0XHRcdGhlbHA6IGBQcm9jZXNzIGhlYXAgc3BhY2Ugc2l6ZSAke21ldHJpY1R5cGV9IGZyb20gbm9kZS5qcyBpbiBieXRlcy5gLFxuXHRcdFx0bGFiZWxOYW1lczogWydzcGFjZSddLFxuXHRcdFx0cmVnaXN0ZXJzXG5cdFx0fSk7XG5cdH0pO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0Y29uc3QgZGF0YSA9IHtcblx0XHRcdHRvdGFsOiB7fSxcblx0XHRcdHVzZWQ6IHt9LFxuXHRcdFx0YXZhaWxhYmxlOiB7fVxuXHRcdH07XG5cdFx0Y29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuXHRcdHY4LmdldEhlYXBTcGFjZVN0YXRpc3RpY3MoKS5mb3JFYWNoKHNwYWNlID0+IHtcblx0XHRcdGNvbnN0IHNwYWNlTmFtZSA9IHNwYWNlLnNwYWNlX25hbWUuc3Vic3RyKFxuXHRcdFx0XHQwLFxuXHRcdFx0XHRzcGFjZS5zcGFjZV9uYW1lLmluZGV4T2YoJ19zcGFjZScpXG5cdFx0XHQpO1xuXG5cdFx0XHRkYXRhLnRvdGFsW3NwYWNlTmFtZV0gPSBzcGFjZS5zcGFjZV9zaXplO1xuXHRcdFx0ZGF0YS51c2VkW3NwYWNlTmFtZV0gPSBzcGFjZS5zcGFjZV91c2VkX3NpemU7XG5cdFx0XHRkYXRhLmF2YWlsYWJsZVtzcGFjZU5hbWVdID0gc3BhY2Uuc3BhY2VfYXZhaWxhYmxlX3NpemU7XG5cblx0XHRcdGdhdWdlcy50b3RhbC5zZXQoeyBzcGFjZTogc3BhY2VOYW1lIH0sIHNwYWNlLnNwYWNlX3NpemUsIG5vdyk7XG5cdFx0XHRnYXVnZXMudXNlZC5zZXQoeyBzcGFjZTogc3BhY2VOYW1lIH0sIHNwYWNlLnNwYWNlX3VzZWRfc2l6ZSwgbm93KTtcblx0XHRcdGdhdWdlcy5hdmFpbGFibGUuc2V0KFxuXHRcdFx0XHR7IHNwYWNlOiBzcGFjZU5hbWUgfSxcblx0XHRcdFx0c3BhY2Uuc3BhY2VfYXZhaWxhYmxlX3NpemUsXG5cdFx0XHRcdG5vd1xuXHRcdFx0KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBkYXRhO1xuXHR9O1xufTtcblxubW9kdWxlLmV4cG9ydHMubWV0cmljTmFtZXMgPSBNRVRSSUNTLm1hcChcblx0bWV0cmljVHlwZSA9PiBOT0RFSlNfSEVBUF9TSVpFW21ldHJpY1R5cGVdXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBhZ2dyZWdhdGVCeU9iamVjdE5hbWUobGlzdCkge1xuXHRjb25zdCBkYXRhID0ge307XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3QgbGlzdEVsZW1lbnQgPSBsaXN0W2ldO1xuXG5cdFx0aWYgKCFsaXN0RWxlbWVudCB8fCB0eXBlb2YgbGlzdEVsZW1lbnQuY29uc3RydWN0b3IgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShsaXN0RWxlbWVudC5jb25zdHJ1Y3Rvci5uYW1lKSkge1xuXHRcdFx0ZGF0YVtsaXN0RWxlbWVudC5jb25zdHJ1Y3Rvci5uYW1lXSArPSAxO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkYXRhW2xpc3RFbGVtZW50LmNvbnN0cnVjdG9yLm5hbWVdID0gMTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIGRhdGE7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU1ldHJpY3MoZ2F1Z2UsIGRhdGEsIGluY2x1ZGVUaW1lc3RhbXApIHtcblx0Z2F1Z2UucmVzZXQoKTtcblx0Zm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuXHRcdGlmIChpbmNsdWRlVGltZXN0YW1wKSB7XG5cdFx0XHRnYXVnZS5zZXQoeyB0eXBlOiBrZXkgfSwgZGF0YVtrZXldLCBEYXRlLm5vdygpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Z2F1Z2Uuc2V0KHsgdHlwZToga2V5IH0sIGRhdGFba2V5XSk7XG5cdFx0fVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRhZ2dyZWdhdGVCeU9iamVjdE5hbWUsXG5cdHVwZGF0ZU1ldHJpY3Ncbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHNhZmVNZW1vcnlVc2FnZSgpIHtcblx0bGV0IG1lbW9yeVVzYWdlO1xuXHR0cnkge1xuXHRcdG1lbW9yeVVzYWdlID0gcHJvY2Vzcy5tZW1vcnlVc2FnZSgpO1xuXHR9IGNhdGNoIChleCkge1xuXHRcdC8vIGVtcHR5XG5cdH1cblxuXHRyZXR1cm4gbWVtb3J5VXNhZ2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2FmZU1lbW9yeVVzYWdlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBHYXVnZSA9IHJlcXVpcmUoJy4uL2dhdWdlJyk7XG5jb25zdCBsaW51eFZhcmlhbnQgPSByZXF1aXJlKCcuL29zTWVtb3J5SGVhcExpbnV4Jyk7XG5jb25zdCBzYWZlTWVtb3J5VXNhZ2UgPSByZXF1aXJlKCcuL2hlbHBlcnMvc2FmZU1lbW9yeVVzYWdlJyk7XG5cbmNvbnN0IFBST0NFU1NfUkVTSURFTlRfTUVNT1JZID0gJ3Byb2Nlc3NfcmVzaWRlbnRfbWVtb3J5X2J5dGVzJztcblxuZnVuY3Rpb24gbm90TGludXhWYXJpYW50KHJlZ2lzdHJ5LCBjb25maWcgPSB7fSkge1xuXHRjb25zdCBuYW1lUHJlZml4ID0gY29uZmlnLnByZWZpeCA/IGNvbmZpZy5wcmVmaXggOiAnJztcblxuXHRjb25zdCByZXNpZGVudE1lbUdhdWdlID0gbmV3IEdhdWdlKHtcblx0XHRuYW1lOiBuYW1lUHJlZml4ICsgUFJPQ0VTU19SRVNJREVOVF9NRU1PUlksXG5cdFx0aGVscDogJ1Jlc2lkZW50IG1lbW9yeSBzaXplIGluIGJ5dGVzLicsXG5cdFx0cmVnaXN0ZXJzOiByZWdpc3RyeSA/IFtyZWdpc3RyeV0gOiB1bmRlZmluZWRcblx0fSk7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRjb25zdCBtZW1Vc2FnZSA9IHNhZmVNZW1vcnlVc2FnZSgpO1xuXG5cdFx0Ly8gSSBkb24ndCB0aGluayB0aGUgb3RoZXIgdGhpbmdzIHJldHVybmVkIGZyb20gYHByb2Nlc3MubWVtb3J5VXNhZ2UoKWAgaXMgcmVsZXZhbnQgdG8gYSBzdGFuZGFyZCBleHBvcnRcblx0XHRpZiAobWVtVXNhZ2UpIHtcblx0XHRcdHJlc2lkZW50TWVtR2F1Z2Uuc2V0KG1lbVVzYWdlLnJzcywgRGF0ZS5ub3coKSk7XG5cdFx0fVxuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IChyZWdpc3RyeSwgY29uZmlnKSA9PlxuXHRwcm9jZXNzLnBsYXRmb3JtID09PSAnbGludXgnXG5cdFx0PyBsaW51eFZhcmlhbnQocmVnaXN0cnksIGNvbmZpZylcblx0XHQ6IG5vdExpbnV4VmFyaWFudChyZWdpc3RyeSwgY29uZmlnKTtcblxubW9kdWxlLmV4cG9ydHMubWV0cmljTmFtZXMgPVxuXHRwcm9jZXNzLnBsYXRmb3JtID09PSAnbGludXgnXG5cdFx0PyBsaW51eFZhcmlhbnQubWV0cmljTmFtZXNcblx0XHQ6IFtQUk9DRVNTX1JFU0lERU5UX01FTU9SWV07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEdhdWdlID0gcmVxdWlyZSgnLi4vZ2F1Z2UnKTtcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcblxuY29uc3QgdmFsdWVzID0gWydWbVNpemUnLCAnVm1SU1MnLCAnVm1EYXRhJ107XG5cbmNvbnN0IFBST0NFU1NfUkVTSURFTlRfTUVNT1JZID0gJ3Byb2Nlc3NfcmVzaWRlbnRfbWVtb3J5X2J5dGVzJztcbmNvbnN0IFBST0NFU1NfVklSVFVBTF9NRU1PUlkgPSAncHJvY2Vzc192aXJ0dWFsX21lbW9yeV9ieXRlcyc7XG5jb25zdCBQUk9DRVNTX0hFQVAgPSAncHJvY2Vzc19oZWFwX2J5dGVzJztcblxuZnVuY3Rpb24gc3RydWN0dXJlT3V0cHV0KGlucHV0KSB7XG5cdGNvbnN0IHJldHVyblZhbHVlID0ge307XG5cblx0aW5wdXRcblx0XHQuc3BsaXQoJ1xcbicpXG5cdFx0LmZpbHRlcihzID0+IHZhbHVlcy5zb21lKHZhbHVlID0+IHMuaW5kZXhPZih2YWx1ZSkgPT09IDApKVxuXHRcdC5mb3JFYWNoKHN0cmluZyA9PiB7XG5cdFx0XHRjb25zdCBzcGxpdCA9IHN0cmluZy5zcGxpdCgnOicpO1xuXG5cdFx0XHQvLyBHZXQgdGhlIHZhbHVlXG5cdFx0XHRsZXQgdmFsdWUgPSBzcGxpdFsxXS50cmltKCk7XG5cdFx0XHQvLyBSZW1vdmUgdHJhaWxpbmcgYCBrYmBcblx0XHRcdHZhbHVlID0gdmFsdWUuc3Vic3RyKDAsIHZhbHVlLmxlbmd0aCAtIDMpO1xuXHRcdFx0Ly8gTWFrZSBpdCBpbnRvIGEgbnVtYmVyIGluIGJ5dGVzIGJ5dGVzXG5cdFx0XHR2YWx1ZSA9IE51bWJlcih2YWx1ZSkgKiAxMDI0O1xuXG5cdFx0XHRyZXR1cm5WYWx1ZVtzcGxpdFswXV0gPSB2YWx1ZTtcblx0XHR9KTtcblxuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlZ2lzdHJ5LCBjb25maWcgPSB7fSkgPT4ge1xuXHRjb25zdCByZWdpc3RlcnMgPSByZWdpc3RyeSA/IFtyZWdpc3RyeV0gOiB1bmRlZmluZWQ7XG5cdGNvbnN0IG5hbWVQcmVmaXggPSBjb25maWcucHJlZml4ID8gY29uZmlnLnByZWZpeCA6ICcnO1xuXG5cdGNvbnN0IHJlc2lkZW50TWVtR2F1Z2UgPSBuZXcgR2F1Z2Uoe1xuXHRcdG5hbWU6IG5hbWVQcmVmaXggKyBQUk9DRVNTX1JFU0lERU5UX01FTU9SWSxcblx0XHRoZWxwOiAnUmVzaWRlbnQgbWVtb3J5IHNpemUgaW4gYnl0ZXMuJyxcblx0XHRyZWdpc3RlcnNcblx0fSk7XG5cdGNvbnN0IHZpcnR1YWxNZW1HYXVnZSA9IG5ldyBHYXVnZSh7XG5cdFx0bmFtZTogbmFtZVByZWZpeCArIFBST0NFU1NfVklSVFVBTF9NRU1PUlksXG5cdFx0aGVscDogJ1ZpcnR1YWwgbWVtb3J5IHNpemUgaW4gYnl0ZXMuJyxcblx0XHRyZWdpc3RlcnNcblx0fSk7XG5cdGNvbnN0IGhlYXBTaXplTWVtR2F1Z2UgPSBuZXcgR2F1Z2Uoe1xuXHRcdG5hbWU6IG5hbWVQcmVmaXggKyBQUk9DRVNTX0hFQVAsXG5cdFx0aGVscDogJ1Byb2Nlc3MgaGVhcCBzaXplIGluIGJ5dGVzLicsXG5cdFx0cmVnaXN0ZXJzXG5cdH0pO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0ZnMucmVhZEZpbGUoJy9wcm9jL3NlbGYvc3RhdHVzJywgJ3V0ZjgnLCAoZXJyLCBzdGF0dXMpID0+IHtcblx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblx0XHRcdGNvbnN0IHN0cnVjdHVyZWRPdXRwdXQgPSBzdHJ1Y3R1cmVPdXRwdXQoc3RhdHVzKTtcblxuXHRcdFx0cmVzaWRlbnRNZW1HYXVnZS5zZXQoc3RydWN0dXJlZE91dHB1dC5WbVJTUywgbm93KTtcblx0XHRcdHZpcnR1YWxNZW1HYXVnZS5zZXQoc3RydWN0dXJlZE91dHB1dC5WbVNpemUsIG5vdyk7XG5cdFx0XHRoZWFwU2l6ZU1lbUdhdWdlLnNldChzdHJ1Y3R1cmVkT3V0cHV0LlZtRGF0YSwgbm93KTtcblx0XHR9KTtcblx0fTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLm1ldHJpY05hbWVzID0gW1xuXHRQUk9DRVNTX1JFU0lERU5UX01FTU9SWSxcblx0UFJPQ0VTU19WSVJUVUFMX01FTU9SWSxcblx0UFJPQ0VTU19IRUFQXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDb3VudGVyID0gcmVxdWlyZSgnLi4vY291bnRlcicpO1xuY29uc3QgUFJPQ0VTU19DUFVfVVNFUl9TRUNPTkRTID0gJ3Byb2Nlc3NfY3B1X3VzZXJfc2Vjb25kc190b3RhbCc7XG5jb25zdCBQUk9DRVNTX0NQVV9TWVNURU1fU0VDT05EUyA9ICdwcm9jZXNzX2NwdV9zeXN0ZW1fc2Vjb25kc190b3RhbCc7XG5jb25zdCBQUk9DRVNTX0NQVV9TRUNPTkRTID0gJ3Byb2Nlc3NfY3B1X3NlY29uZHNfdG90YWwnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZWdpc3RyeSwgY29uZmlnID0ge30pID0+IHtcblx0Ly8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhlIGZ1bmN0aW9uIGRvZXNuJ3QgZXhpc3QgKGludHJvZHVjZWQgaW4gbm9kZUA2LjEuMClcblx0aWYgKHR5cGVvZiBwcm9jZXNzLmNwdVVzYWdlICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuICgpID0+IHt9O1xuXHR9XG5cblx0Y29uc3QgcmVnaXN0ZXJzID0gcmVnaXN0cnkgPyBbcmVnaXN0cnldIDogdW5kZWZpbmVkO1xuXHRjb25zdCBuYW1lUHJlZml4ID0gY29uZmlnLnByZWZpeCA/IGNvbmZpZy5wcmVmaXggOiAnJztcblxuXHRjb25zdCBjcHVVc2VyVXNhZ2VDb3VudGVyID0gbmV3IENvdW50ZXIoe1xuXHRcdG5hbWU6IG5hbWVQcmVmaXggKyBQUk9DRVNTX0NQVV9VU0VSX1NFQ09ORFMsXG5cdFx0aGVscDogJ1RvdGFsIHVzZXIgQ1BVIHRpbWUgc3BlbnQgaW4gc2Vjb25kcy4nLFxuXHRcdHJlZ2lzdGVyc1xuXHR9KTtcblx0Y29uc3QgY3B1U3lzdGVtVXNhZ2VDb3VudGVyID0gbmV3IENvdW50ZXIoe1xuXHRcdG5hbWU6IG5hbWVQcmVmaXggKyBQUk9DRVNTX0NQVV9TWVNURU1fU0VDT05EUyxcblx0XHRoZWxwOiAnVG90YWwgc3lzdGVtIENQVSB0aW1lIHNwZW50IGluIHNlY29uZHMuJyxcblx0XHRyZWdpc3RlcnNcblx0fSk7XG5cdGNvbnN0IGNwdVVzYWdlQ291bnRlciA9IG5ldyBDb3VudGVyKHtcblx0XHRuYW1lOiBuYW1lUHJlZml4ICsgUFJPQ0VTU19DUFVfU0VDT05EUyxcblx0XHRoZWxwOiAnVG90YWwgdXNlciBhbmQgc3lzdGVtIENQVSB0aW1lIHNwZW50IGluIHNlY29uZHMuJyxcblx0XHRyZWdpc3RlcnNcblx0fSk7XG5cblx0bGV0IGxhc3RDcHVVc2FnZSA9IHByb2Nlc3MuY3B1VXNhZ2UoKTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGNvbnN0IGNwdVVzYWdlID0gcHJvY2Vzcy5jcHVVc2FnZSgpO1xuXHRcdGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cblx0XHRjb25zdCB1c2VyVXNhZ2VNaWNyb3MgPSBjcHVVc2FnZS51c2VyIC0gbGFzdENwdVVzYWdlLnVzZXI7XG5cdFx0Y29uc3Qgc3lzdGVtVXNhZ2VNaWNyb3MgPSBjcHVVc2FnZS5zeXN0ZW0gLSBsYXN0Q3B1VXNhZ2Uuc3lzdGVtO1xuXG5cdFx0bGFzdENwdVVzYWdlID0gY3B1VXNhZ2U7XG5cblx0XHRjcHVVc2VyVXNhZ2VDb3VudGVyLmluYyh1c2VyVXNhZ2VNaWNyb3MgLyAxZTYsIG5vdyk7XG5cdFx0Y3B1U3lzdGVtVXNhZ2VDb3VudGVyLmluYyhzeXN0ZW1Vc2FnZU1pY3JvcyAvIDFlNiwgbm93KTtcblx0XHRjcHVVc2FnZUNvdW50ZXIuaW5jKCh1c2VyVXNhZ2VNaWNyb3MgKyBzeXN0ZW1Vc2FnZU1pY3JvcykgLyAxZTYsIG5vdyk7XG5cdH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5tZXRyaWNOYW1lcyA9IFtcblx0UFJPQ0VTU19DUFVfVVNFUl9TRUNPTkRTLFxuXHRQUk9DRVNTX0NQVV9TWVNURU1fU0VDT05EUyxcblx0UFJPQ0VTU19DUFVfU0VDT05EU1xuXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyBhZ2dyZWdhdGVCeU9iamVjdE5hbWUgfSA9IHJlcXVpcmUoJy4vaGVscGVycy9wcm9jZXNzTWV0cmljc0hlbHBlcnMnKTtcbmNvbnN0IHsgdXBkYXRlTWV0cmljcyB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzL3Byb2Nlc3NNZXRyaWNzSGVscGVycycpO1xuY29uc3QgR2F1Z2UgPSByZXF1aXJlKCcuLi9nYXVnZScpO1xuXG5jb25zdCBOT0RFSlNfQUNUSVZFX0hBTkRMRVMgPSAnbm9kZWpzX2FjdGl2ZV9oYW5kbGVzJztcbmNvbnN0IE5PREVKU19BQ1RJVkVfSEFORExFU19UT1RBTCA9ICdub2RlanNfYWN0aXZlX2hhbmRsZXNfdG90YWwnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZWdpc3RyeSwgY29uZmlnID0ge30pID0+IHtcblx0Ly8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhlIGZ1bmN0aW9uIGlzIHJlbW92ZWQgaW4gbGF0ZXIgbm9kZXMgKGV4aXN0cyBpbiBub2RlQDYpXG5cdGlmICh0eXBlb2YgcHJvY2Vzcy5fZ2V0QWN0aXZlSGFuZGxlcyAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiAoKSA9PiB7fTtcblx0fVxuXG5cdGNvbnN0IG5hbWVQcmVmaXggPSBjb25maWcucHJlZml4ID8gY29uZmlnLnByZWZpeCA6ICcnO1xuXG5cdGNvbnN0IGdhdWdlID0gbmV3IEdhdWdlKHtcblx0XHRuYW1lOiBuYW1lUHJlZml4ICsgTk9ERUpTX0FDVElWRV9IQU5ETEVTLFxuXHRcdGhlbHA6XG5cdFx0XHQnTnVtYmVyIG9mIGFjdGl2ZSBsaWJ1diBoYW5kbGVzIGdyb3VwZWQgYnkgaGFuZGxlIHR5cGUuIEV2ZXJ5IGhhbmRsZSB0eXBlIGlzIEMrKyBjbGFzcyBuYW1lLicsXG5cdFx0bGFiZWxOYW1lczogWyd0eXBlJ10sXG5cdFx0cmVnaXN0ZXJzOiByZWdpc3RyeSA/IFtyZWdpc3RyeV0gOiB1bmRlZmluZWRcblx0fSk7XG5cdGNvbnN0IHRvdGFsR2F1Z2UgPSBuZXcgR2F1Z2Uoe1xuXHRcdG5hbWU6IG5hbWVQcmVmaXggKyBOT0RFSlNfQUNUSVZFX0hBTkRMRVNfVE9UQUwsXG5cdFx0aGVscDogJ1RvdGFsIG51bWJlciBvZiBhY3RpdmUgaGFuZGxlcy4nLFxuXHRcdHJlZ2lzdGVyczogcmVnaXN0cnkgPyBbcmVnaXN0cnldIDogdW5kZWZpbmVkXG5cdH0pO1xuXG5cdGNvbnN0IHVwZGF0ZXIgPSBjb25maWcudGltZXN0YW1wc1xuXHRcdD8gKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBoYW5kbGVzID0gcHJvY2Vzcy5fZ2V0QWN0aXZlSGFuZGxlcygpO1xuXHRcdFx0XHR1cGRhdGVNZXRyaWNzKGdhdWdlLCBhZ2dyZWdhdGVCeU9iamVjdE5hbWUoaGFuZGxlcyksIHRydWUpO1xuXHRcdFx0XHR0b3RhbEdhdWdlLnNldChoYW5kbGVzLmxlbmd0aCwgRGF0ZS5ub3coKSk7XG5cdFx0ICB9XG5cdFx0OiAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGhhbmRsZXMgPSBwcm9jZXNzLl9nZXRBY3RpdmVIYW5kbGVzKCk7XG5cdFx0XHRcdHVwZGF0ZU1ldHJpY3MoZ2F1Z2UsIGFnZ3JlZ2F0ZUJ5T2JqZWN0TmFtZShoYW5kbGVzKSwgZmFsc2UpO1xuXHRcdFx0XHR0b3RhbEdhdWdlLnNldChoYW5kbGVzLmxlbmd0aCk7XG5cdFx0ICB9O1xuXG5cdHJldHVybiB1cGRhdGVyO1xufTtcblxubW9kdWxlLmV4cG9ydHMubWV0cmljTmFtZXMgPSBbXG5cdE5PREVKU19BQ1RJVkVfSEFORExFUyxcblx0Tk9ERUpTX0FDVElWRV9IQU5ETEVTX1RPVEFMXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBHYXVnZSA9IHJlcXVpcmUoJy4uL2dhdWdlJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNvbnN0IFBST0NFU1NfTUFYX0ZEUyA9ICdwcm9jZXNzX21heF9mZHMnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZWdpc3RyeSwgY29uZmlnID0ge30pID0+IHtcblx0bGV0IGlzU2V0ID0gZmFsc2U7XG5cblx0aWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICdsaW51eCcpIHtcblx0XHRyZXR1cm4gKCkgPT4ge307XG5cdH1cblxuXHRjb25zdCBuYW1lUHJlZml4ID0gY29uZmlnLnByZWZpeCA/IGNvbmZpZy5wcmVmaXggOiAnJztcblxuXHRjb25zdCBmaWxlRGVzY3JpcHRvcnNHYXVnZSA9IG5ldyBHYXVnZSh7XG5cdFx0bmFtZTogbmFtZVByZWZpeCArIFBST0NFU1NfTUFYX0ZEUyxcblx0XHRoZWxwOiAnTWF4aW11bSBudW1iZXIgb2Ygb3BlbiBmaWxlIGRlc2NyaXB0b3JzLicsXG5cdFx0cmVnaXN0ZXJzOiByZWdpc3RyeSA/IFtyZWdpc3RyeV0gOiB1bmRlZmluZWRcblx0fSk7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoaXNTZXQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRmcy5yZWFkRmlsZSgnL3Byb2Mvc3lzL2ZzL2ZpbGUtbWF4JywgJ3V0ZjgnLCAoZXJyLCBtYXhGZHMpID0+IHtcblx0XHRcdGlmIChlcnIpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpc1NldCA9IHRydWU7XG5cblx0XHRcdGZpbGVEZXNjcmlwdG9yc0dhdWdlLnNldChOdW1iZXIobWF4RmRzKSk7XG5cdFx0fSk7XG5cdH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5tZXRyaWNOYW1lcyA9IFtQUk9DRVNTX01BWF9GRFNdO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBHYXVnZSA9IHJlcXVpcmUoJy4uL2dhdWdlJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5jb25zdCBwcm9jZXNzID0gcmVxdWlyZSgncHJvY2VzcycpO1xuXG5jb25zdCBQUk9DRVNTX09QRU5fRkRTID0gJ3Byb2Nlc3Nfb3Blbl9mZHMnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZWdpc3RyeSwgY29uZmlnID0ge30pID0+IHtcblx0aWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICdsaW51eCcpIHtcblx0XHRyZXR1cm4gKCkgPT4ge307XG5cdH1cblxuXHRjb25zdCBuYW1lUHJlZml4ID0gY29uZmlnLnByZWZpeCA/IGNvbmZpZy5wcmVmaXggOiAnJztcblxuXHRjb25zdCBmaWxlRGVzY3JpcHRvcnNHYXVnZSA9IG5ldyBHYXVnZSh7XG5cdFx0bmFtZTogbmFtZVByZWZpeCArIFBST0NFU1NfT1BFTl9GRFMsXG5cdFx0aGVscDogJ051bWJlciBvZiBvcGVuIGZpbGUgZGVzY3JpcHRvcnMuJyxcblx0XHRyZWdpc3RlcnM6IHJlZ2lzdHJ5ID8gW3JlZ2lzdHJ5XSA6IHVuZGVmaW5lZFxuXHR9KTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGZzLnJlYWRkaXIoJy9wcm9jL3NlbGYvZmQnLCAoZXJyLCBsaXN0KSA9PiB7XG5cdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTWludXMgMSwgYXMgdGhpcyBpbnZvY2F0aW9uIGNyZWF0ZWQgb25lXG5cdFx0XHRmaWxlRGVzY3JpcHRvcnNHYXVnZS5zZXQobGlzdC5sZW5ndGggLSAxLCBEYXRlLm5vdygpKTtcblx0XHR9KTtcblx0fTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLm1ldHJpY05hbWVzID0gW1BST0NFU1NfT1BFTl9GRFNdO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgR2F1Z2UgPSByZXF1aXJlKCcuLi9nYXVnZScpO1xuY29uc3QgeyBhZ2dyZWdhdGVCeU9iamVjdE5hbWUgfSA9IHJlcXVpcmUoJy4vaGVscGVycy9wcm9jZXNzTWV0cmljc0hlbHBlcnMnKTtcbmNvbnN0IHsgdXBkYXRlTWV0cmljcyB9ID0gcmVxdWlyZSgnLi9oZWxwZXJzL3Byb2Nlc3NNZXRyaWNzSGVscGVycycpO1xuXG5jb25zdCBOT0RFSlNfQUNUSVZFX1JFUVVFU1RTID0gJ25vZGVqc19hY3RpdmVfcmVxdWVzdHMnO1xuY29uc3QgTk9ERUpTX0FDVElWRV9SRVFVRVNUU19UT1RBTCA9ICdub2RlanNfYWN0aXZlX3JlcXVlc3RzX3RvdGFsJztcblxubW9kdWxlLmV4cG9ydHMgPSAocmVnaXN0cnksIGNvbmZpZyA9IHt9KSA9PiB7XG5cdC8vIERvbid0IGRvIGFueXRoaW5nIGlmIHRoZSBmdW5jdGlvbiBpcyByZW1vdmVkIGluIGxhdGVyIG5vZGVzIChleGlzdHMgaW4gbm9kZUA2KVxuXHRpZiAodHlwZW9mIHByb2Nlc3MuX2dldEFjdGl2ZVJlcXVlc3RzICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0cmV0dXJuICgpID0+IHt9O1xuXHR9XG5cblx0Y29uc3QgbmFtZVByZWZpeCA9IGNvbmZpZy5wcmVmaXggPyBjb25maWcucHJlZml4IDogJyc7XG5cblx0Y29uc3QgZ2F1Z2UgPSBuZXcgR2F1Z2Uoe1xuXHRcdG5hbWU6IG5hbWVQcmVmaXggKyBOT0RFSlNfQUNUSVZFX1JFUVVFU1RTLFxuXHRcdGhlbHA6XG5cdFx0XHQnTnVtYmVyIG9mIGFjdGl2ZSBsaWJ1diByZXF1ZXN0cyBncm91cGVkIGJ5IHJlcXVlc3QgdHlwZS4gRXZlcnkgcmVxdWVzdCB0eXBlIGlzIEMrKyBjbGFzcyBuYW1lLicsXG5cdFx0bGFiZWxOYW1lczogWyd0eXBlJ10sXG5cdFx0cmVnaXN0ZXJzOiByZWdpc3RyeSA/IFtyZWdpc3RyeV0gOiB1bmRlZmluZWRcblx0fSk7XG5cblx0Y29uc3QgdG90YWxHYXVnZSA9IG5ldyBHYXVnZSh7XG5cdFx0bmFtZTogbmFtZVByZWZpeCArIE5PREVKU19BQ1RJVkVfUkVRVUVTVFNfVE9UQUwsXG5cdFx0aGVscDogJ1RvdGFsIG51bWJlciBvZiBhY3RpdmUgcmVxdWVzdHMuJyxcblx0XHRyZWdpc3RlcnM6IHJlZ2lzdHJ5ID8gW3JlZ2lzdHJ5XSA6IHVuZGVmaW5lZFxuXHR9KTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGNvbnN0IHJlcXVlc3RzID0gcHJvY2Vzcy5fZ2V0QWN0aXZlUmVxdWVzdHMoKTtcblx0XHR1cGRhdGVNZXRyaWNzKGdhdWdlLCBhZ2dyZWdhdGVCeU9iamVjdE5hbWUocmVxdWVzdHMpKTtcblx0XHR0b3RhbEdhdWdlLnNldChyZXF1ZXN0cy5sZW5ndGgsIERhdGUubm93KCkpO1xuXHR9O1xufTtcblxubW9kdWxlLmV4cG9ydHMubWV0cmljTmFtZXMgPSBbXG5cdE5PREVKU19BQ1RJVkVfUkVRVUVTVFMsXG5cdE5PREVKU19BQ1RJVkVfUkVRVUVTVFNfVE9UQUxcbl07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEdhdWdlID0gcmVxdWlyZSgnLi4vZ2F1Z2UnKTtcbmNvbnN0IG5vd0luU2Vjb25kcyA9IE1hdGgucm91bmQoRGF0ZS5ub3coKSAvIDEwMDAgLSBwcm9jZXNzLnVwdGltZSgpKTtcblxuY29uc3QgUFJPQ0VTU19TVEFSVF9USU1FID0gJ3Byb2Nlc3Nfc3RhcnRfdGltZV9zZWNvbmRzJztcblxubW9kdWxlLmV4cG9ydHMgPSAocmVnaXN0cnksIGNvbmZpZyA9IHt9KSA9PiB7XG5cdGNvbnN0IG5hbWVQcmVmaXggPSBjb25maWcucHJlZml4ID8gY29uZmlnLnByZWZpeCA6ICcnO1xuXG5cdGNvbnN0IGNwdVVzZXJHYXVnZSA9IG5ldyBHYXVnZSh7XG5cdFx0bmFtZTogbmFtZVByZWZpeCArIFBST0NFU1NfU1RBUlRfVElNRSxcblx0XHRoZWxwOiAnU3RhcnQgdGltZSBvZiB0aGUgcHJvY2VzcyBzaW5jZSB1bml4IGVwb2NoIGluIHNlY29uZHMuJyxcblx0XHRyZWdpc3RlcnM6IHJlZ2lzdHJ5ID8gW3JlZ2lzdHJ5XSA6IHVuZGVmaW5lZCxcblx0XHRhZ2dyZWdhdG9yOiAnb21pdCdcblx0fSk7XG5cdGxldCBpc1NldCA9IGZhbHNlO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0aWYgKGlzU2V0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNwdVVzZXJHYXVnZS5zZXQobm93SW5TZWNvbmRzKTtcblx0XHRpc1NldCA9IHRydWU7XG5cdH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5tZXRyaWNOYW1lcyA9IFtQUk9DRVNTX1NUQVJUX1RJTUVdO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBHYXVnZSA9IHJlcXVpcmUoJy4uL2dhdWdlJyk7XG5jb25zdCB2ZXJzaW9uID0gcHJvY2Vzcy52ZXJzaW9uO1xuY29uc3QgdmVyc2lvblNlZ21lbnRzID0gdmVyc2lvblxuXHQuc2xpY2UoMSlcblx0LnNwbGl0KCcuJylcblx0Lm1hcChOdW1iZXIpO1xuXG5jb25zdCBOT0RFX1ZFUlNJT05fSU5GTyA9ICdub2RlanNfdmVyc2lvbl9pbmZvJztcblxubW9kdWxlLmV4cG9ydHMgPSAocmVnaXN0cnksIGNvbmZpZyA9IHt9KSA9PiB7XG5cdGNvbnN0IG5hbWVQcmVmaXggPSBjb25maWcucHJlZml4ID8gY29uZmlnLnByZWZpeCA6ICcnO1xuXG5cdGNvbnN0IG5vZGVWZXJzaW9uR2F1Z2UgPSBuZXcgR2F1Z2Uoe1xuXHRcdG5hbWU6IG5hbWVQcmVmaXggKyBOT0RFX1ZFUlNJT05fSU5GTyxcblx0XHRoZWxwOiAnTm9kZS5qcyB2ZXJzaW9uIGluZm8uJyxcblx0XHRsYWJlbE5hbWVzOiBbJ3ZlcnNpb24nLCAnbWFqb3InLCAnbWlub3InLCAncGF0Y2gnXSxcblx0XHRyZWdpc3RlcnM6IHJlZ2lzdHJ5ID8gW3JlZ2lzdHJ5XSA6IHVuZGVmaW5lZCxcblx0XHRhZ2dyZWdhdG9yOiAnZmlyc3QnXG5cdH0pO1xuXHRsZXQgaXNTZXQgPSBmYWxzZTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGlmIChpc1NldCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRub2RlVmVyc2lvbkdhdWdlXG5cdFx0XHQubGFiZWxzKFxuXHRcdFx0XHR2ZXJzaW9uLFxuXHRcdFx0XHR2ZXJzaW9uU2VnbWVudHNbMF0sXG5cdFx0XHRcdHZlcnNpb25TZWdtZW50c1sxXSxcblx0XHRcdFx0dmVyc2lvblNlZ21lbnRzWzJdXG5cdFx0XHQpXG5cdFx0XHQuc2V0KDEpO1xuXHRcdGlzU2V0ID0gdHJ1ZTtcblx0fTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLm1ldHJpY05hbWVzID0gW05PREVfVkVSU0lPTl9JTkZPXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdXJsID0gcmVxdWlyZSgndXJsJyk7XG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xuY29uc3QgaHR0cHMgPSByZXF1aXJlKCdodHRwcycpO1xuY29uc3QgeyBnbG9iYWxSZWdpc3RyeSB9ID0gcmVxdWlyZSgnLi9yZWdpc3RyeScpO1xuXG5jbGFzcyBQdXNoZ2F0ZXdheSB7XG5cdGNvbnN0cnVjdG9yKGdhdGV3YXlVcmwsIG9wdGlvbnMsIHJlZ2lzdHJ5KSB7XG5cdFx0aWYgKCFyZWdpc3RyeSkge1xuXHRcdFx0cmVnaXN0cnkgPSBnbG9iYWxSZWdpc3RyeTtcblx0XHR9XG5cdFx0dGhpcy5yZWdpc3RyeSA9IHJlZ2lzdHJ5O1xuXHRcdHRoaXMuZ2F0ZXdheVVybCA9IGdhdGV3YXlVcmw7XG5cdFx0dGhpcy5yZXF1ZXN0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuXHR9XG5cblx0cHVzaEFkZChwYXJhbXMsIGNhbGxiYWNrKSB7XG5cdFx0aWYgKCFwYXJhbXMgfHwgIXBhcmFtcy5qb2JOYW1lKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgam9iTmFtZSBwYXJhbWV0ZXInKTtcblx0XHR9XG5cblx0XHR1c2VHYXRld2F5LmNhbGwodGhpcywgJ1BPU1QnLCBwYXJhbXMuam9iTmFtZSwgcGFyYW1zLmdyb3VwaW5ncywgY2FsbGJhY2spO1xuXHR9XG5cblx0cHVzaChwYXJhbXMsIGNhbGxiYWNrKSB7XG5cdFx0aWYgKCFwYXJhbXMgfHwgIXBhcmFtcy5qb2JOYW1lKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgam9iTmFtZSBwYXJhbWV0ZXInKTtcblx0XHR9XG5cblx0XHR1c2VHYXRld2F5LmNhbGwodGhpcywgJ1BVVCcsIHBhcmFtcy5qb2JOYW1lLCBwYXJhbXMuZ3JvdXBpbmdzLCBjYWxsYmFjayk7XG5cdH1cblxuXHRkZWxldGUocGFyYW1zLCBjYWxsYmFjaykge1xuXHRcdGlmICghcGFyYW1zIHx8ICFwYXJhbXMuam9iTmFtZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGpvYk5hbWUgcGFyYW1ldGVyJyk7XG5cdFx0fVxuXG5cdFx0dXNlR2F0ZXdheS5jYWxsKHRoaXMsICdERUxFVEUnLCBwYXJhbXMuam9iTmFtZSwgcGFyYW1zLmdyb3VwaW5ncywgY2FsbGJhY2spO1xuXHR9XG59XG5mdW5jdGlvbiB1c2VHYXRld2F5KG1ldGhvZCwgam9iLCBncm91cGluZ3MsIGNhbGxiYWNrKSB7XG5cdC8vIGBVUkxgIGZpcnN0IGFkZGVkIGluIHY2LjEzLjBcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tZGVwcmVjYXRlZC1hcGlcblx0Y29uc3QgZ2F0ZXdheVVybFBhcnNlZCA9IHVybC5wYXJzZSh0aGlzLmdhdGV3YXlVcmwpO1xuXHRjb25zdCBnYXRld2F5VXJsUGF0aCA9XG5cdFx0Z2F0ZXdheVVybFBhcnNlZC5wYXRobmFtZSAmJiBnYXRld2F5VXJsUGFyc2VkLnBhdGhuYW1lICE9PSAnLydcblx0XHRcdD8gZ2F0ZXdheVVybFBhcnNlZC5wYXRobmFtZVxuXHRcdFx0OiAnJztcblx0Y29uc3QgcGF0aCA9IGAke2dhdGV3YXlVcmxQYXRofS9tZXRyaWNzL2pvYi8ke2VuY29kZVVSSUNvbXBvbmVudChcblx0XHRqb2Jcblx0KX0ke2dlbmVyYXRlR3JvdXBpbmdzKGdyb3VwaW5ncyl9YDtcblxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby1kZXByZWNhdGVkLWFwaVxuXHRjb25zdCB0YXJnZXQgPSB1cmwucmVzb2x2ZSh0aGlzLmdhdGV3YXlVcmwsIHBhdGgpO1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm9kZS9uby1kZXByZWNhdGVkLWFwaVxuXHRjb25zdCByZXF1ZXN0UGFyYW1zID0gdXJsLnBhcnNlKHRhcmdldCk7XG5cdGNvbnN0IGh0dHBNb2R1bGUgPSBpc0h0dHBzKHJlcXVlc3RQYXJhbXMuaHJlZikgPyBodHRwcyA6IGh0dHA7XG5cdGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHJlcXVlc3RQYXJhbXMsIHRoaXMucmVxdWVzdE9wdGlvbnMsIHtcblx0XHRtZXRob2Rcblx0fSk7XG5cblx0Y29uc3QgcmVxID0gaHR0cE1vZHVsZS5yZXF1ZXN0KG9wdGlvbnMsIHJlcyA9PiB7XG5cdFx0bGV0IGJvZHkgPSAnJztcblx0XHRyZXMuc2V0RW5jb2RpbmcoJ3V0ZjgnKTtcblx0XHRyZXMub24oJ2RhdGEnLCBjaHVuayA9PiB7XG5cdFx0XHRib2R5ICs9IGNodW5rO1xuXHRcdH0pO1xuXHRcdHJlcy5vbignZW5kJywgKCkgPT4ge1xuXHRcdFx0Y2FsbGJhY2sobnVsbCwgcmVzLCBib2R5KTtcblx0XHR9KTtcblx0fSk7XG5cdHJlcS5vbignZXJyb3InLCBlcnIgPT4ge1xuXHRcdGNhbGxiYWNrKGVycik7XG5cdH0pO1xuXG5cdGlmIChtZXRob2QgIT09ICdERUxFVEUnKSB7XG5cdFx0cmVxLndyaXRlKHRoaXMucmVnaXN0cnkubWV0cmljcyh7IHRpbWVzdGFtcHM6IGZhbHNlIH0pKTtcblx0fVxuXHRyZXEuZW5kKCk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlR3JvdXBpbmdzKGdyb3VwaW5ncykge1xuXHRpZiAoIWdyb3VwaW5ncykge1xuXHRcdHJldHVybiAnJztcblx0fVxuXHRyZXR1cm4gT2JqZWN0LmtleXMoZ3JvdXBpbmdzKVxuXHRcdC5tYXAoXG5cdFx0XHRrZXkgPT4gYC8ke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfS8ke2VuY29kZVVSSUNvbXBvbmVudChncm91cGluZ3Nba2V5XSl9YFxuXHRcdClcblx0XHQuam9pbignJyk7XG59XG5cbmZ1bmN0aW9uIGlzSHR0cHMoaHJlZikge1xuXHRyZXR1cm4gaHJlZi5zZWFyY2goL15odHRwcy8pICE9PSAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQdXNoZ2F0ZXdheTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IHsgZ2V0VmFsdWVBc1N0cmluZyB9ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmZ1bmN0aW9uIGVzY2FwZVN0cmluZyhzdHIpIHtcblx0cmV0dXJuIHN0ci5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJykucmVwbGFjZSgvXFxcXCg/IW4pL2csICdcXFxcXFxcXCcpO1xufVxuZnVuY3Rpb24gZXNjYXBlTGFiZWxWYWx1ZShzdHIpIHtcblx0aWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIHN0cjtcblx0fVxuXHRyZXR1cm4gZXNjYXBlU3RyaW5nKHN0cikucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpO1xufVxuXG5jb25zdCBkZWZhdWx0TWV0cmljc09wdHMgPSB7XG5cdHRpbWVzdGFtcHM6IHRydWVcbn07XG5cbmNsYXNzIFJlZ2lzdHJ5IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fbWV0cmljcyA9IHt9O1xuXHRcdHRoaXMuX2RlZmF1bHRMYWJlbHMgPSB7fTtcblx0fVxuXG5cdGdldE1ldHJpY3NBc0FycmF5KCkge1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9tZXRyaWNzKS5tYXAodGhpcy5nZXRTaW5nbGVNZXRyaWMsIHRoaXMpO1xuXHR9XG5cblx0Z2V0TWV0cmljQXNQcm9tZXRoZXVzU3RyaW5nKG1ldHJpYywgY29uZikge1xuXHRcdGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0TWV0cmljc09wdHMsIGNvbmYpO1xuXHRcdGNvbnN0IGl0ZW0gPSBtZXRyaWMuZ2V0KCk7XG5cdFx0Y29uc3QgbmFtZSA9IGVzY2FwZVN0cmluZyhpdGVtLm5hbWUpO1xuXHRcdGNvbnN0IGhlbHAgPSBgIyBIRUxQICR7bmFtZX0gJHtlc2NhcGVTdHJpbmcoaXRlbS5oZWxwKX1gO1xuXHRcdGNvbnN0IHR5cGUgPSBgIyBUWVBFICR7bmFtZX0gJHtpdGVtLnR5cGV9YDtcblx0XHRjb25zdCBkZWZhdWx0TGFiZWxOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuX2RlZmF1bHRMYWJlbHMpO1xuXG5cdFx0bGV0IHZhbHVlcyA9ICcnO1xuXHRcdGZvciAoY29uc3QgdmFsIG9mIGl0ZW0udmFsdWVzIHx8IFtdKSB7XG5cdFx0XHR2YWwubGFiZWxzID0gdmFsLmxhYmVscyB8fCB7fTtcblxuXHRcdFx0aWYgKGRlZmF1bHRMYWJlbE5hbWVzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0Ly8gTWFrZSBhIGNvcHkgYmVmb3JlIG11dGF0aW5nXG5cdFx0XHRcdHZhbC5sYWJlbHMgPSBPYmplY3QuYXNzaWduKHt9LCB2YWwubGFiZWxzKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChjb25zdCBsYWJlbE5hbWUgb2YgZGVmYXVsdExhYmVsTmFtZXMpIHtcblx0XHRcdFx0dmFsLmxhYmVsc1tsYWJlbE5hbWVdID1cblx0XHRcdFx0XHR2YWwubGFiZWxzW2xhYmVsTmFtZV0gfHwgdGhpcy5fZGVmYXVsdExhYmVsc1tsYWJlbE5hbWVdO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgbGFiZWxzID0gJyc7XG5cdFx0XHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh2YWwubGFiZWxzKSkge1xuXHRcdFx0XHRsYWJlbHMgKz0gYCR7a2V5fT1cIiR7ZXNjYXBlTGFiZWxWYWx1ZSh2YWwubGFiZWxzW2tleV0pfVwiLGA7XG5cdFx0XHR9XG5cblx0XHRcdGxldCBtZXRyaWNOYW1lID0gdmFsLm1ldHJpY05hbWUgfHwgaXRlbS5uYW1lO1xuXHRcdFx0aWYgKGxhYmVscykge1xuXHRcdFx0XHRtZXRyaWNOYW1lICs9IGB7JHtsYWJlbHMuc3Vic3RyaW5nKDAsIGxhYmVscy5sZW5ndGggLSAxKX19YDtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGxpbmUgPSBgJHttZXRyaWNOYW1lfSAke2dldFZhbHVlQXNTdHJpbmcodmFsLnZhbHVlKX1gO1xuXHRcdFx0aWYgKG9wdHMudGltZXN0YW1wcyAmJiB2YWwudGltZXN0YW1wKSB7XG5cdFx0XHRcdGxpbmUgKz0gYCAke3ZhbC50aW1lc3RhbXB9YDtcblx0XHRcdH1cblx0XHRcdHZhbHVlcyArPSBgJHtsaW5lLnRyaW0oKX1cXG5gO1xuXHRcdH1cblxuXHRcdHJldHVybiBgJHtoZWxwfVxcbiR7dHlwZX1cXG4ke3ZhbHVlc31gLnRyaW0oKTtcblx0fVxuXG5cdG1ldHJpY3Mob3B0cykge1xuXHRcdGxldCBtZXRyaWNzID0gJyc7XG5cblx0XHRmb3IgKGNvbnN0IG1ldHJpYyBvZiB0aGlzLmdldE1ldHJpY3NBc0FycmF5KCkpIHtcblx0XHRcdG1ldHJpY3MgKz0gYCR7dGhpcy5nZXRNZXRyaWNBc1Byb21ldGhldXNTdHJpbmcobWV0cmljLCBvcHRzKX1cXG5cXG5gO1xuXHRcdH1cblxuXHRcdHJldHVybiBtZXRyaWNzLnN1YnN0cmluZygwLCBtZXRyaWNzLmxlbmd0aCAtIDEpO1xuXHR9XG5cblx0cmVnaXN0ZXJNZXRyaWMobWV0cmljRm4pIHtcblx0XHRpZiAoXG5cdFx0XHR0aGlzLl9tZXRyaWNzW21ldHJpY0ZuLm5hbWVdICYmXG5cdFx0XHR0aGlzLl9tZXRyaWNzW21ldHJpY0ZuLm5hbWVdICE9PSBtZXRyaWNGblxuXHRcdCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRgQSBtZXRyaWMgd2l0aCB0aGUgbmFtZSAke21ldHJpY0ZuLm5hbWV9IGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZC5gXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHRoaXMuX21ldHJpY3NbbWV0cmljRm4ubmFtZV0gPSBtZXRyaWNGbjtcblx0fVxuXG5cdGNsZWFyKCkge1xuXHRcdHRoaXMuX21ldHJpY3MgPSB7fTtcblx0XHR0aGlzLl9kZWZhdWx0TGFiZWxzID0ge307XG5cdH1cblxuXHRnZXRNZXRyaWNzQXNKU09OKCkge1xuXHRcdGNvbnN0IG1ldHJpY3MgPSBbXTtcblx0XHRjb25zdCBkZWZhdWx0TGFiZWxOYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuX2RlZmF1bHRMYWJlbHMpO1xuXG5cdFx0Zm9yIChjb25zdCBtZXRyaWMgb2YgdGhpcy5nZXRNZXRyaWNzQXNBcnJheSgpKSB7XG5cdFx0XHRjb25zdCBpdGVtID0gbWV0cmljLmdldCgpO1xuXG5cdFx0XHRpZiAoaXRlbS52YWx1ZXMpIHtcblx0XHRcdFx0Zm9yIChjb25zdCB2YWwgb2YgaXRlbS52YWx1ZXMpIHtcblx0XHRcdFx0XHRmb3IgKGNvbnN0IGxhYmVsTmFtZSBvZiBkZWZhdWx0TGFiZWxOYW1lcykge1xuXHRcdFx0XHRcdFx0dmFsLmxhYmVsc1tsYWJlbE5hbWVdID1cblx0XHRcdFx0XHRcdFx0dmFsLmxhYmVsc1tsYWJlbE5hbWVdIHx8IHRoaXMuX2RlZmF1bHRMYWJlbHNbbGFiZWxOYW1lXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bWV0cmljcy5wdXNoKGl0ZW0pO1xuXHRcdH1cblxuXHRcdHJldHVybiBtZXRyaWNzO1xuXHR9XG5cblx0cmVtb3ZlU2luZ2xlTWV0cmljKG5hbWUpIHtcblx0XHRkZWxldGUgdGhpcy5fbWV0cmljc1tuYW1lXTtcblx0fVxuXG5cdGdldFNpbmdsZU1ldHJpY0FzU3RyaW5nKG5hbWUpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRNZXRyaWNBc1Byb21ldGhldXNTdHJpbmcodGhpcy5fbWV0cmljc1tuYW1lXSk7XG5cdH1cblxuXHRnZXRTaW5nbGVNZXRyaWMobmFtZSkge1xuXHRcdHJldHVybiB0aGlzLl9tZXRyaWNzW25hbWVdO1xuXHR9XG5cblx0c2V0RGVmYXVsdExhYmVscyhsYWJlbHMpIHtcblx0XHR0aGlzLl9kZWZhdWx0TGFiZWxzID0gbGFiZWxzO1xuXHR9XG5cblx0cmVzZXRNZXRyaWNzKCkge1xuXHRcdGZvciAoY29uc3QgbWV0cmljIGluIHRoaXMuX21ldHJpY3MpIHtcblx0XHRcdHRoaXMuX21ldHJpY3NbbWV0cmljXS5yZXNldCgpO1xuXHRcdH1cblx0fVxuXG5cdGdldCBjb250ZW50VHlwZSgpIHtcblx0XHRyZXR1cm4gJ3RleHQvcGxhaW47IHZlcnNpb249MC4wLjQ7IGNoYXJzZXQ9dXRmLTgnO1xuXHR9XG5cblx0c3RhdGljIG1lcmdlKHJlZ2lzdGVycykge1xuXHRcdGNvbnN0IG1lcmdlZFJlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5KCk7XG5cblx0XHRjb25zdCBtZXRyaWNzVG9NZXJnZSA9IHJlZ2lzdGVycy5yZWR1Y2UoXG5cdFx0XHQoYWNjLCByZWcpID0+IGFjYy5jb25jYXQocmVnLmdldE1ldHJpY3NBc0FycmF5KCkpLFxuXHRcdFx0W11cblx0XHQpO1xuXG5cdFx0bWV0cmljc1RvTWVyZ2UuZm9yRWFjaChtZXJnZWRSZWdpc3RyeS5yZWdpc3Rlck1ldHJpYywgbWVyZ2VkUmVnaXN0cnkpO1xuXHRcdHJldHVybiBtZXJnZWRSZWdpc3RyeTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZ2lzdHJ5O1xubW9kdWxlLmV4cG9ydHMuZ2xvYmFsUmVnaXN0cnkgPSBuZXcgUmVnaXN0cnkoKTtcbiIsIi8qKlxuICogU3VtbWFyeVxuICovXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5jb25zdCB7IGdsb2JhbFJlZ2lzdHJ5IH0gPSByZXF1aXJlKCcuL3JlZ2lzdHJ5Jyk7XG5jb25zdCB0eXBlID0gJ3N1bW1hcnknO1xuY29uc3Qge1xuXHRnZXRQcm9wZXJ0aWVzRnJvbU9iaixcblx0Z2V0TGFiZWxzLFxuXHRoYXNoT2JqZWN0LFxuXHRpc09iamVjdCxcblx0cHJpbnREZXByZWNhdGlvbk9iamVjdENvbnN0cnVjdG9yLFxuXHRyZW1vdmVMYWJlbHNcbn0gPSByZXF1aXJlKCcuL3V0aWwnKTtcbmNvbnN0IHtcblx0dmFsaWRhdGVMYWJlbCxcblx0dmFsaWRhdGVNZXRyaWNOYW1lLFxuXHR2YWxpZGF0ZUxhYmVsTmFtZVxufSA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvbicpO1xuY29uc3QgdGltZVdpbmRvd1F1YW50aWxlcyA9IHJlcXVpcmUoJy4vdGltZVdpbmRvd1F1YW50aWxlcycpO1xuXG5jb25zdCBERUZBVUxUX0NPTVBSRVNTX0NPVU5UID0gMTAwMDsgLy8gZXZlcnkgMTAwMCBtZWFzdXJlbWVudHNcblxuY2xhc3MgU3VtbWFyeSB7XG5cdC8qKlxuXHQgKiBTdW1tYXJ5XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUgbWV0cmljXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBoZWxwIC0gSGVscCBmb3IgdGhlIG1ldHJpY1xuXHQgKiBAcGFyYW0ge29iamVjdHxBcnJheS48c3RyaW5nPn0gbGFiZWxzT3JDb25mIC0gRWl0aGVyIGFycmF5IG9mIGxhYmVsIG5hbWVzIG9yIGNvbmZpZyBvYmplY3QgYXMgYSBrZXktdmFsdWUgb2JqZWN0XG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBjb25mIC0gQ29uZmlndXJhdGlvbiBvYmplY3Rcblx0ICovXG5cdGNvbnN0cnVjdG9yKG5hbWUsIGhlbHAsIGxhYmVsc09yQ29uZiwgY29uZikge1xuXHRcdGxldCBjb25maWc7XG5cdFx0aWYgKGlzT2JqZWN0KG5hbWUpKSB7XG5cdFx0XHRjb25maWcgPSBPYmplY3QuYXNzaWduKFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0cGVyY2VudGlsZXM6IFswLjAxLCAwLjA1LCAwLjUsIDAuOSwgMC45NSwgMC45OSwgMC45OTldLFxuXHRcdFx0XHRcdGxhYmVsTmFtZXM6IFtdXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG5hbWVcblx0XHRcdCk7XG5cblx0XHRcdGlmICghY29uZmlnLnJlZ2lzdGVycykge1xuXHRcdFx0XHRjb25maWcucmVnaXN0ZXJzID0gW2dsb2JhbFJlZ2lzdHJ5XTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IG9iajtcblx0XHRcdGxldCBsYWJlbHMgPSBbXTtcblxuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkobGFiZWxzT3JDb25mKSkge1xuXHRcdFx0XHRvYmogPSBjb25mIHx8IHt9O1xuXHRcdFx0XHRsYWJlbHMgPSBsYWJlbHNPckNvbmY7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRvYmogPSBsYWJlbHNPckNvbmYgfHwge307XG5cdFx0XHR9XG5cblx0XHRcdHByaW50RGVwcmVjYXRpb25PYmplY3RDb25zdHJ1Y3RvcigpO1xuXG5cdFx0XHRjb25maWcgPSB7XG5cdFx0XHRcdG5hbWUsXG5cdFx0XHRcdGhlbHAsXG5cdFx0XHRcdGxhYmVsTmFtZXM6IGxhYmVscyxcblx0XHRcdFx0cGVyY2VudGlsZXM6IGNvbmZpZ3VyZVBlcmNlbnRpbGVzKG9iai5wZXJjZW50aWxlcyksXG5cdFx0XHRcdHJlZ2lzdGVyczogW2dsb2JhbFJlZ2lzdHJ5XSxcblx0XHRcdFx0bWF4QWdlU2Vjb25kczogb2JqLm1heEFnZVNlY29uZHMsXG5cdFx0XHRcdGFnZUJ1Y2tldHM6IG9iai5hZ2VCdWNrZXRzXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHZhbGlkYXRlSW5wdXQoY29uZmlnLm5hbWUsIGNvbmZpZy5oZWxwLCBjb25maWcubGFiZWxOYW1lcyk7XG5cblx0XHR0aGlzLm1heEFnZVNlY29uZHMgPSBjb25maWcubWF4QWdlU2Vjb25kcztcblx0XHR0aGlzLmFnZUJ1Y2tldHMgPSBjb25maWcuYWdlQnVja2V0cztcblxuXHRcdHRoaXMubmFtZSA9IGNvbmZpZy5uYW1lO1xuXHRcdHRoaXMuaGVscCA9IGNvbmZpZy5oZWxwO1xuXHRcdHRoaXMuYWdncmVnYXRvciA9IGNvbmZpZy5hZ2dyZWdhdG9yIHx8ICdzdW0nO1xuXG5cdFx0dGhpcy5wZXJjZW50aWxlcyA9IGNvbmZpZy5wZXJjZW50aWxlcztcblx0XHR0aGlzLmhhc2hNYXAgPSB7fTtcblx0XHR0aGlzLmxhYmVsTmFtZXMgPSBjb25maWcubGFiZWxOYW1lcyB8fCBbXTtcblxuXHRcdHRoaXMuY29tcHJlc3NDb3VudCA9IGNvbmZpZy5jb21wcmVzc0NvdW50IHx8IERFRkFVTFRfQ09NUFJFU1NfQ09VTlQ7XG5cblx0XHRpZiAodGhpcy5sYWJlbE5hbWVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dGhpcy5oYXNoTWFwID0ge1xuXHRcdFx0XHRbaGFzaE9iamVjdCh7fSldOiB7XG5cdFx0XHRcdFx0bGFiZWxzOiB7fSxcblx0XHRcdFx0XHR0ZDogbmV3IHRpbWVXaW5kb3dRdWFudGlsZXModGhpcy5tYXhBZ2VTZWNvbmRzLCB0aGlzLmFnZUJ1Y2tldHMpLFxuXHRcdFx0XHRcdGNvdW50OiAwLFxuXHRcdFx0XHRcdHN1bTogMFxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGNvbmZpZy5yZWdpc3RlcnMuZm9yRWFjaChyZWdpc3RyeUluc3RhbmNlID0+XG5cdFx0XHRyZWdpc3RyeUluc3RhbmNlLnJlZ2lzdGVyTWV0cmljKHRoaXMpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBPYnNlcnZlIGEgdmFsdWVcblx0ICogQHBhcmFtIHtvYmplY3R9IGxhYmVscyAtIE9iamVjdCB3aXRoIGxhYmVscyB3aGVyZSBrZXkgaXMgdGhlIGxhYmVsIGtleSBhbmQgdmFsdWUgaXMgbGFiZWwgdmFsdWUuIENhbiBvbmx5IGJlIG9uZSBsZXZlbCBkZWVwXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIFZhbHVlIHRvIG9ic2VydmVcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRvYnNlcnZlKGxhYmVscywgdmFsdWUpIHtcblx0XHRvYnNlcnZlLmNhbGwodGhpcywgbGFiZWxzID09PSAwID8gMCA6IGxhYmVscyB8fCB7fSkodmFsdWUpO1xuXHR9XG5cblx0Z2V0KCkge1xuXHRcdGNvbnN0IGRhdGEgPSBnZXRQcm9wZXJ0aWVzRnJvbU9iaih0aGlzLmhhc2hNYXApO1xuXHRcdGNvbnN0IHZhbHVlcyA9IFtdO1xuXHRcdGRhdGEuZm9yRWFjaChzID0+IHtcblx0XHRcdGV4dHJhY3RTdW1tYXJpZXNGb3JFeHBvcnQocywgdGhpcy5wZXJjZW50aWxlcykuZm9yRWFjaCh2ID0+IHtcblx0XHRcdFx0dmFsdWVzLnB1c2godik7XG5cdFx0XHR9KTtcblx0XHRcdHZhbHVlcy5wdXNoKGdldFN1bUZvckV4cG9ydChzLCB0aGlzKSk7XG5cdFx0XHR2YWx1ZXMucHVzaChnZXRDb3VudEZvckV4cG9ydChzLCB0aGlzKSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bmFtZTogdGhpcy5uYW1lLFxuXHRcdFx0aGVscDogdGhpcy5oZWxwLFxuXHRcdFx0dHlwZSxcblx0XHRcdHZhbHVlcyxcblx0XHRcdGFnZ3JlZ2F0b3I6IHRoaXMuYWdncmVnYXRvclxuXHRcdH07XG5cdH1cblxuXHRyZXNldCgpIHtcblx0XHRjb25zdCBkYXRhID0gZ2V0UHJvcGVydGllc0Zyb21PYmoodGhpcy5oYXNoTWFwKTtcblx0XHRkYXRhLmZvckVhY2gocyA9PiB7XG5cdFx0XHRzLnRkLnJlc2V0KCk7XG5cdFx0XHRzLmNvdW50ID0gMDtcblx0XHRcdHMuc3VtID0gMDtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTdGFydCBhIHRpbWVyIHRoYXQgY291bGQgYmUgdXNlZCB0byBsb2dnaW5nIGR1cmF0aW9uc1xuXHQgKiBAcGFyYW0ge29iamVjdH0gbGFiZWxzIC0gT2JqZWN0IHdpdGggbGFiZWxzIHdoZXJlIGtleSBpcyB0aGUgbGFiZWwga2V5IGFuZCB2YWx1ZSBpcyBsYWJlbCB2YWx1ZS4gQ2FuIG9ubHkgYmUgb25lIGxldmVsIGRlZXBcblx0ICogQHJldHVybnMge2Z1bmN0aW9ufSAtIEZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHlvdSB3YW50IHRvIHN0b3AgdGhlIHRpbWVyIGFuZCBvYnNlcnZlIHRoZSBkdXJhdGlvbiBpbiBzZWNvbmRzXG5cdCAqIEBleGFtcGxlXG5cdCAqIHZhciBlbmQgPSBzdW1tYXJ5LnN0YXJ0VGltZXIoKTtcblx0ICogbWFrZUV4cGVuc2l2ZVhIUlJlcXVlc3QoZnVuY3Rpb24oZXJyLCByZXMpIHtcblx0ICpcdGVuZCgpOyAvL09ic2VydmUgdGhlIGR1cmF0aW9uIG9mIGV4cGVuc2l2ZVhIUlJlcXVlc3Rcblx0ICogfSk7XG5cdCAqL1xuXHRzdGFydFRpbWVyKGxhYmVscykge1xuXHRcdHJldHVybiBzdGFydFRpbWVyLmNhbGwodGhpcywgbGFiZWxzKSgpO1xuXHR9XG5cblx0bGFiZWxzKCkge1xuXHRcdGNvbnN0IGxhYmVscyA9IGdldExhYmVscyh0aGlzLmxhYmVsTmFtZXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9ic2VydmU6IG9ic2VydmUuY2FsbCh0aGlzLCBsYWJlbHMpLFxuXHRcdFx0c3RhcnRUaW1lcjogc3RhcnRUaW1lci5jYWxsKHRoaXMsIGxhYmVscylcblx0XHR9O1xuXHR9XG5cblx0cmVtb3ZlKCkge1xuXHRcdGNvbnN0IGxhYmVscyA9IGdldExhYmVscyh0aGlzLmxhYmVsTmFtZXMsIGFyZ3VtZW50cyk7XG5cdFx0cmVtb3ZlTGFiZWxzLmNhbGwodGhpcywgdGhpcy5oYXNoTWFwLCBsYWJlbHMpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RTdW1tYXJpZXNGb3JFeHBvcnQoc3VtbWFyeU9mTGFiZWxzLCBwZXJjZW50aWxlcykge1xuXHRzdW1tYXJ5T2ZMYWJlbHMudGQuY29tcHJlc3MoKTtcblxuXHRyZXR1cm4gcGVyY2VudGlsZXMubWFwKHBlcmNlbnRpbGUgPT4ge1xuXHRcdGNvbnN0IHBlcmNlbnRpbGVWYWx1ZSA9IHN1bW1hcnlPZkxhYmVscy50ZC5wZXJjZW50aWxlKHBlcmNlbnRpbGUpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRsYWJlbHM6IE9iamVjdC5hc3NpZ24oeyBxdWFudGlsZTogcGVyY2VudGlsZSB9LCBzdW1tYXJ5T2ZMYWJlbHMubGFiZWxzKSxcblx0XHRcdHZhbHVlOiBwZXJjZW50aWxlVmFsdWUgPyBwZXJjZW50aWxlVmFsdWUgOiAwXG5cdFx0fTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGdldENvdW50Rm9yRXhwb3J0KHZhbHVlLCBzdW1tYXJ5KSB7XG5cdHJldHVybiB7XG5cdFx0bWV0cmljTmFtZTogYCR7c3VtbWFyeS5uYW1lfV9jb3VudGAsXG5cdFx0bGFiZWxzOiB2YWx1ZS5sYWJlbHMsXG5cdFx0dmFsdWU6IHZhbHVlLmNvdW50XG5cdH07XG59XG5cbmZ1bmN0aW9uIGdldFN1bUZvckV4cG9ydCh2YWx1ZSwgc3VtbWFyeSkge1xuXHRyZXR1cm4ge1xuXHRcdG1ldHJpY05hbWU6IGAke3N1bW1hcnkubmFtZX1fc3VtYCxcblx0XHRsYWJlbHM6IHZhbHVlLmxhYmVscyxcblx0XHR2YWx1ZTogdmFsdWUuc3VtXG5cdH07XG59XG5cbmZ1bmN0aW9uIHN0YXJ0VGltZXIoc3RhcnRMYWJlbHMpIHtcblx0cmV0dXJuICgpID0+IHtcblx0XHRjb25zdCBzdGFydCA9IHByb2Nlc3MuaHJ0aW1lKCk7XG5cdFx0cmV0dXJuIGVuZExhYmVscyA9PiB7XG5cdFx0XHRjb25zdCBkZWx0YSA9IHByb2Nlc3MuaHJ0aW1lKHN0YXJ0KTtcblx0XHRcdHRoaXMub2JzZXJ2ZShcblx0XHRcdFx0T2JqZWN0LmFzc2lnbih7fSwgc3RhcnRMYWJlbHMsIGVuZExhYmVscyksXG5cdFx0XHRcdGRlbHRhWzBdICsgZGVsdGFbMV0gLyAxZTlcblx0XHRcdCk7XG5cdFx0fTtcblx0fTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVJbnB1dChuYW1lLCBoZWxwLCBsYWJlbHMpIHtcblx0aWYgKCFoZWxwKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hbmRhdG9yeSBoZWxwIHBhcmFtZXRlcicpO1xuXHR9XG5cdGlmICghbmFtZSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYW5kYXRvcnkgbmFtZSBwYXJhbWV0ZXInKTtcblx0fVxuXG5cdGlmICghdmFsaWRhdGVNZXRyaWNOYW1lKG5hbWUpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG1ldHJpYyBuYW1lJyk7XG5cdH1cblxuXHRpZiAoIXZhbGlkYXRlTGFiZWxOYW1lKGxhYmVscykpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGFiZWwgbmFtZScpO1xuXHR9XG5cblx0bGFiZWxzLmZvckVhY2gobGFiZWwgPT4ge1xuXHRcdGlmIChsYWJlbCA9PT0gJ3F1YW50aWxlJykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdxdWFudGlsZSBpcyBhIHJlc2VydmVkIGxhYmVsIGtleXdvcmQnKTtcblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBjb25maWd1cmVQZXJjZW50aWxlcyhjb25maWd1cmVkUGVyY2VudGlsZXMpIHtcblx0Y29uc3QgZGVmYXVsdFBlcmNlbnRpbGVzID0gWzAuMDEsIDAuMDUsIDAuNSwgMC45LCAwLjk1LCAwLjk5LCAwLjk5OV07XG5cdHJldHVybiBbXVxuXHRcdC5jb25jYXQoY29uZmlndXJlZFBlcmNlbnRpbGVzIHx8IGRlZmF1bHRQZXJjZW50aWxlcylcblx0XHQuc29ydChzb3J0QXNjZW5kaW5nKTtcbn1cblxuZnVuY3Rpb24gc29ydEFzY2VuZGluZyh4LCB5KSB7XG5cdHJldHVybiB4IC0geTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZShsYWJlbHMpIHtcblx0cmV0dXJuIHZhbHVlID0+IHtcblx0XHRjb25zdCBsYWJlbFZhbHVlUGFpciA9IGNvbnZlcnRMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZSk7XG5cblx0XHR2YWxpZGF0ZUxhYmVsKHRoaXMubGFiZWxOYW1lcywgdGhpcy5sYWJlbHMpO1xuXHRcdGlmICghTnVtYmVyLmlzRmluaXRlKGxhYmVsVmFsdWVQYWlyLnZhbHVlKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0YFZhbHVlIGlzIG5vdCBhIHZhbGlkIG51bWJlcjogJHt1dGlsLmZvcm1hdChsYWJlbFZhbHVlUGFpci52YWx1ZSl9YFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBoYXNoID0gaGFzaE9iamVjdChsYWJlbFZhbHVlUGFpci5sYWJlbHMpO1xuXHRcdGxldCBzdW1tYXJ5T2ZMYWJlbCA9IHRoaXMuaGFzaE1hcFtoYXNoXTtcblx0XHRpZiAoIXN1bW1hcnlPZkxhYmVsKSB7XG5cdFx0XHRzdW1tYXJ5T2ZMYWJlbCA9IHtcblx0XHRcdFx0bGFiZWxzOiBsYWJlbFZhbHVlUGFpci5sYWJlbHMsXG5cdFx0XHRcdHRkOiBuZXcgdGltZVdpbmRvd1F1YW50aWxlcyh0aGlzLm1heEFnZVNlY29uZHMsIHRoaXMuYWdlQnVja2V0cyksXG5cdFx0XHRcdGNvdW50OiAwLFxuXHRcdFx0XHRzdW06IDBcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0c3VtbWFyeU9mTGFiZWwudGQucHVzaChsYWJlbFZhbHVlUGFpci52YWx1ZSk7XG5cdFx0c3VtbWFyeU9mTGFiZWwuY291bnQrKztcblx0XHRpZiAoc3VtbWFyeU9mTGFiZWwuY291bnQgJSB0aGlzLmNvbXByZXNzQ291bnQgPT09IDApIHtcblx0XHRcdHN1bW1hcnlPZkxhYmVsLnRkLmNvbXByZXNzKCk7XG5cdFx0fVxuXHRcdHN1bW1hcnlPZkxhYmVsLnN1bSArPSBsYWJlbFZhbHVlUGFpci52YWx1ZTtcblx0XHR0aGlzLmhhc2hNYXBbaGFzaF0gPSBzdW1tYXJ5T2ZMYWJlbDtcblx0fTtcbn1cblxuZnVuY3Rpb24gY29udmVydExhYmVsc0FuZFZhbHVlcyhsYWJlbHMsIHZhbHVlKSB7XG5cdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiBsYWJlbHMsXG5cdFx0XHRsYWJlbHM6IHt9XG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0bGFiZWxzLFxuXHRcdHZhbHVlXG5cdH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3VtbWFyeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyBURGlnZXN0IH0gPSByZXF1aXJlKCd0ZGlnZXN0Jyk7XG5cbmNsYXNzIFRpbWVXaW5kb3dRdWFudGlsZXMge1xuXHRjb25zdHJ1Y3RvcihtYXhBZ2VTZWNvbmRzLCBhZ2VCdWNrZXRzKSB7XG5cdFx0dGhpcy5tYXhBZ2VTZWNvbmRzID0gbWF4QWdlU2Vjb25kcyB8fCAwO1xuXHRcdHRoaXMuYWdlQnVja2V0cyA9IGFnZUJ1Y2tldHMgfHwgMDtcblxuXHRcdHRoaXMuc2hvdWxkUm90YXRlID0gbWF4QWdlU2Vjb25kcyAmJiBhZ2VCdWNrZXRzO1xuXG5cdFx0dGhpcy5yaW5nQnVmZmVyID0gQXJyYXkoYWdlQnVja2V0cykuZmlsbChuZXcgVERpZ2VzdCgpKTtcblx0XHR0aGlzLmN1cnJlbnRCdWZmZXIgPSAwO1xuXG5cdFx0dGhpcy5sYXN0Um90YXRlVGltZXN0YW1wTWlsbGlzID0gRGF0ZS5ub3coKTtcblx0XHR0aGlzLmR1cmF0aW9uQmV0d2VlblJvdGF0ZXNNaWxsaXMgPVxuXHRcdFx0KG1heEFnZVNlY29uZHMgKiAxMDAwKSAvIGFnZUJ1Y2tldHMgfHwgSW5maW5pdHk7XG5cdH1cblxuXHRwZXJjZW50aWxlKHF1YW50aWxlKSB7XG5cdFx0Y29uc3QgYnVja2V0ID0gcm90YXRlLmNhbGwodGhpcyk7XG5cdFx0cmV0dXJuIGJ1Y2tldC5wZXJjZW50aWxlKHF1YW50aWxlKTtcblx0fVxuXG5cdHB1c2godmFsdWUpIHtcblx0XHRyb3RhdGUuY2FsbCh0aGlzKTtcblx0XHR0aGlzLnJpbmdCdWZmZXIuZm9yRWFjaChidWNrZXQgPT4ge1xuXHRcdFx0YnVja2V0LnB1c2godmFsdWUpO1xuXHRcdH0pO1xuXHR9XG5cblx0cmVzZXQoKSB7XG5cdFx0dGhpcy5yaW5nQnVmZmVyLmZvckVhY2goYnVja2V0ID0+IHtcblx0XHRcdGJ1Y2tldC5yZXNldCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0Y29tcHJlc3MoKSB7XG5cdFx0dGhpcy5yaW5nQnVmZmVyLmZvckVhY2goYnVja2V0ID0+IHtcblx0XHRcdGJ1Y2tldC5jb21wcmVzcygpO1xuXHRcdH0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJvdGF0ZSgpIHtcblx0bGV0IHRpbWVTaW5jZUxhc3RSb3RhdGVNaWxsaXMgPSBEYXRlLm5vdygpIC0gdGhpcy5sYXN0Um90YXRlVGltZXN0YW1wTWlsbGlzO1xuXHR3aGlsZSAoXG5cdFx0dGltZVNpbmNlTGFzdFJvdGF0ZU1pbGxpcyA+IHRoaXMuZHVyYXRpb25CZXR3ZWVuUm90YXRlc01pbGxpcyAmJlxuXHRcdHRoaXMuc2hvdWxkUm90YXRlXG5cdCkge1xuXHRcdHRoaXMucmluZ0J1ZmZlclt0aGlzLmN1cnJlbnRCdWZmZXJdID0gbmV3IFREaWdlc3QoKTtcblxuXHRcdGlmICgrK3RoaXMuY3VycmVudEJ1ZmZlciA+PSB0aGlzLnJpbmdCdWZmZXIubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRCdWZmZXIgPSAwO1xuXHRcdH1cblx0XHR0aW1lU2luY2VMYXN0Um90YXRlTWlsbGlzIC09IHRoaXMuZHVyYXRpb25CZXR3ZWVuUm90YXRlc01pbGxpcztcblx0XHR0aGlzLmxhc3RSb3RhdGVUaW1lc3RhbXBNaWxsaXMgKz0gdGhpcy5kdXJhdGlvbkJldHdlZW5Sb3RhdGVzTWlsbGlzO1xuXHR9XG5cdHJldHVybiB0aGlzLnJpbmdCdWZmZXJbdGhpcy5jdXJyZW50QnVmZmVyXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUaW1lV2luZG93UXVhbnRpbGVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBkZXByZWNhdGlvbnNFbWl0dGVkID0ge307XG5cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5leHBvcnRzLmdldFByb3BlcnRpZXNGcm9tT2JqID0gZnVuY3Rpb24oaGFzaE1hcCkge1xuXHRjb25zdCBvYmogPSBPYmplY3Qua2V5cyhoYXNoTWFwKS5tYXAoeCA9PiBoYXNoTWFwW3hdKTtcblx0cmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydHMuZ2V0VmFsdWVBc1N0cmluZyA9IGZ1bmN0aW9uIGdldFZhbHVlU3RyaW5nKHZhbHVlKSB7XG5cdGlmIChOdW1iZXIuaXNOYU4odmFsdWUpKSB7XG5cdFx0cmV0dXJuICdOYW4nO1xuXHR9IGVsc2UgaWYgKCFOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSB7XG5cdFx0aWYgKHZhbHVlIDwgMCkge1xuXHRcdFx0cmV0dXJuICctSW5mJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuICcrSW5mJztcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGAke3ZhbHVlfWA7XG5cdH1cbn07XG5cbmV4cG9ydHMucmVtb3ZlTGFiZWxzID0gZnVuY3Rpb24gcmVtb3ZlTGFiZWxzKGhhc2hNYXAsIGxhYmVscykge1xuXHRjb25zdCBoYXNoID0gaGFzaE9iamVjdChsYWJlbHMpO1xuXHRkZWxldGUgaGFzaE1hcFtoYXNoXTtcbn07XG5cbmV4cG9ydHMuc2V0VmFsdWUgPSBmdW5jdGlvbiBzZXRWYWx1ZShoYXNoTWFwLCB2YWx1ZSwgbGFiZWxzLCB0aW1lc3RhbXApIHtcblx0Y29uc3QgaGFzaCA9IGhhc2hPYmplY3QobGFiZWxzKTtcblx0aGFzaE1hcFtoYXNoXSA9IHtcblx0XHR2YWx1ZTogdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyA/IHZhbHVlIDogMCxcblx0XHRsYWJlbHM6IGxhYmVscyB8fCB7fSxcblx0XHR0aW1lc3RhbXA6IGlzRGF0ZSh0aW1lc3RhbXApXG5cdFx0XHQ/IHRpbWVzdGFtcC52YWx1ZU9mKClcblx0XHRcdDogTnVtYmVyLmlzRmluaXRlKHRpbWVzdGFtcClcblx0XHRcdD8gdGltZXN0YW1wXG5cdFx0XHQ6IHVuZGVmaW5lZFxuXHR9O1xuXHRyZXR1cm4gaGFzaE1hcDtcbn07XG5cbi8vIFRPRE86IEZvciBub2RlIDYsIHVzZSByZXN0IHBhcmFtc1xuZXhwb3J0cy5nZXRMYWJlbHMgPSBmdW5jdGlvbihsYWJlbE5hbWVzLCBhcmdzKSB7XG5cdGlmIChsYWJlbE5hbWVzLmxlbmd0aCAhPT0gYXJncy5sZW5ndGgpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbnVtYmVyIG9mIGFyZ3VtZW50cycpO1xuXHR9XG5cblx0Y29uc3QgYXJnc0FzQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcblx0cmV0dXJuIGxhYmVsTmFtZXMucmVkdWNlKChhY2MsIGxhYmVsLCBpbmRleCkgPT4ge1xuXHRcdGFjY1tsYWJlbF0gPSBhcmdzQXNBcnJheVtpbmRleF07XG5cdFx0cmV0dXJuIGFjYztcblx0fSwge30pO1xufTtcblxuZnVuY3Rpb24gaGFzaE9iamVjdChsYWJlbHMpIHtcblx0Ly8gV2UgZG9uJ3QgYWN0dWFsbHkgbmVlZCBhIGhhc2ggaGVyZS4gV2UganVzdCBuZWVkIGEgc3RyaW5nIHRoYXRcblx0Ly8gaXMgdW5pcXVlIGZvciBlYWNoIHBvc3NpYmxlIGxhYmVscyBvYmplY3QgYW5kIGNvbnNpc3RlbnQgYWNyb3NzXG5cdC8vIGNhbGxzIHdpdGggZXF1aXZhbGVudCBsYWJlbHMgb2JqZWN0cy5cblx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyhsYWJlbHMpO1xuXHRpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblx0Ly8gZWxzZVxuXHRpZiAoa2V5cy5sZW5ndGggPiAxKSB7XG5cdFx0a2V5cyA9IGtleXMuc29ydCgpOyAvLyBuZWVkIGNvbnNpc3RlbmN5IGFjcm9zcyBjYWxsc1xuXHR9XG5cblx0bGV0IGhhc2ggPSAnJztcblx0bGV0IGkgPSAwO1xuXHRjb25zdCBzaXplID0ga2V5cy5sZW5ndGg7XG5cdGZvciAoOyBpIDwgc2l6ZSAtIDE7IGkrKykge1xuXHRcdGhhc2ggKz0gYCR7a2V5c1tpXX06JHtsYWJlbHNba2V5c1tpXV19LGA7XG5cdH1cblx0aGFzaCArPSBgJHtrZXlzW2ldfToke2xhYmVsc1trZXlzW2ldXX1gO1xuXHRyZXR1cm4gaGFzaDtcbn1cbmV4cG9ydHMuaGFzaE9iamVjdCA9IGhhc2hPYmplY3Q7XG5cbmZ1bmN0aW9uIGlzRGF0ZShvYmopIHtcblx0cmV0dXJuIG9iaiBpbnN0YW5jZW9mIERhdGUgJiYgIWlzTmFOKG9iai52YWx1ZU9mKCkpO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuXHRyZXR1cm4gb2JqID09PSBPYmplY3Qob2JqKTtcbn07XG5cbmZ1bmN0aW9uIHByaW50RGVwcmVjYXRpb24obXNnKSB7XG5cdGlmIChkZXByZWNhdGlvbnNFbWl0dGVkW21zZ10pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRkZXByZWNhdGlvbnNFbWl0dGVkW21zZ10gPSB0cnVlO1xuXG5cdGlmIChwcm9jZXNzLmVtaXRXYXJuaW5nKSB7XG5cdFx0cHJvY2Vzcy5lbWl0V2FybmluZyhtc2csICdEZXByZWNhdGlvbldhcm5pbmcnKTtcblx0fSBlbHNlIHtcblx0XHQvLyBDaGVjayBjYW4gYmUgcmVtb3ZlZCB3aGVuIHdlIG9ubHkgc3VwcG9ydCBub2RlQD49NlxuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5cdFx0Y29uc29sZS53YXJuKG5ldyBFcnJvcihtc2cpKTtcblx0fVxufVxuXG5leHBvcnRzLnByaW50RGVwcmVjYXRpb25PYmplY3RDb25zdHJ1Y3RvciA9ICgpID0+IHtcblx0cHJpbnREZXByZWNhdGlvbihcblx0XHQncHJvbS1jbGllbnQgLSBQYXNzaW5nIGEgbm9uLW9iamVjdCB0byBtZXRyaWNzIGNvbnN0cnVjdG9yIGlzIGRlcHJlY2F0ZWQnXG5cdCk7XG59O1xuXG5leHBvcnRzLnByaW50RGVwcmVjYXRpb25Db2xsZWN0RGVmYXVsdE1ldHJpY3NOdW1iZXIgPSB0aW1lb3V0ID0+IHtcblx0cHJpbnREZXByZWNhdGlvbihcblx0XHRgcHJvbS1jbGllbnQgLSBBIG51bWJlciB0byBkZWZhdWx0TWV0cmljcyBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIFxcYGNvbGxlY3REZWZhdWx0TWV0cmljcyh7IHRpbWVvdXQ6ICR7dGltZW91dH0gfSlcXGAuYFxuXHQpO1xufTtcblxuY2xhc3MgR3JvdXBlciBleHRlbmRzIE1hcCB7XG5cdC8qKlxuXHQgKiBBZGRzIHRoZSBgdmFsdWVgIHRvIHRoZSBga2V5YCdzIGFycmF5IG9mIHZhbHVlcy5cblx0ICogQHBhcmFtIHsqfSBrZXkgS2V5IHRvIHNldC5cblx0ICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBhZGQgdG8gYGtleWAncyBhcnJheS5cblx0ICogQHJldHVybnMge3VuZGVmaW5lZH0gdW5kZWZpbmVkLlxuXHQgKi9cblx0YWRkKGtleSwgdmFsdWUpIHtcblx0XHRpZiAodGhpcy5oYXMoa2V5KSkge1xuXHRcdFx0dGhpcy5nZXQoa2V5KS5wdXNoKHZhbHVlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXQoa2V5LCBbdmFsdWVdKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0cy5Hcm91cGVyID0gR3JvdXBlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuLy8gVGhlc2UgYXJlIGZyb20gaHR0cHM6Ly9wcm9tZXRoZXVzLmlvL2RvY3MvY29uY2VwdHMvZGF0YV9tb2RlbC8jbWV0cmljLW5hbWVzLWFuZC1sYWJlbHNcbmNvbnN0IG1ldHJpY1JlZ2V4cCA9IC9eW2EtekEtWl86XVthLXpBLVowLTlfOl0qJC87XG5jb25zdCBsYWJlbFJlZ2V4cCA9IC9eW2EtekEtWl9dW2EtekEtWjAtOV9dKiQvO1xuXG5leHBvcnRzLnZhbGlkYXRlTWV0cmljTmFtZSA9IGZ1bmN0aW9uKG5hbWUpIHtcblx0cmV0dXJuIG1ldHJpY1JlZ2V4cC50ZXN0KG5hbWUpO1xufTtcblxuZXhwb3J0cy52YWxpZGF0ZUxhYmVsTmFtZSA9IGZ1bmN0aW9uKG5hbWVzKSB7XG5cdGxldCB2YWxpZCA9IHRydWU7XG5cdChuYW1lcyB8fCBbXSkuZm9yRWFjaChuYW1lID0+IHtcblx0XHRpZiAoIWxhYmVsUmVnZXhwLnRlc3QobmFtZSkpIHtcblx0XHRcdHZhbGlkID0gZmFsc2U7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIHZhbGlkO1xufTtcblxuZXhwb3J0cy52YWxpZGF0ZUxhYmVsID0gZnVuY3Rpb24gdmFsaWRhdGVMYWJlbChzYXZlZExhYmVscywgbGFiZWxzKSB7XG5cdE9iamVjdC5rZXlzKGxhYmVscykuZm9yRWFjaChsYWJlbCA9PiB7XG5cdFx0aWYgKHNhdmVkTGFiZWxzLmluZGV4T2YobGFiZWwpID09PSAtMSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRgQWRkZWQgbGFiZWwgXCIke2xhYmVsfVwiIGlzIG5vdCBpbmNsdWRlZCBpbiBpbml0aWFsIGxhYmVsc2V0OiAke3V0aWwuaW5zcGVjdChcblx0XHRcdFx0XHRzYXZlZExhYmVsc1xuXHRcdFx0XHQpfWBcblx0XHRcdCk7XG5cdFx0fVxuXHR9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBvcyA9IHJlcXVpcmUoJ29zJyk7XG5jb25zdCBoYXNGbGFnID0gcmVxdWlyZSgnaGFzLWZsYWcnKTtcblxuY29uc3Qge2Vudn0gPSBwcm9jZXNzO1xuXG5sZXQgZm9yY2VDb2xvcjtcbmlmIChoYXNGbGFnKCduby1jb2xvcicpIHx8XG5cdGhhc0ZsYWcoJ25vLWNvbG9ycycpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9yPWZhbHNlJykgfHxcblx0aGFzRmxhZygnY29sb3I9bmV2ZXInKSkge1xuXHRmb3JjZUNvbG9yID0gMDtcbn0gZWxzZSBpZiAoaGFzRmxhZygnY29sb3InKSB8fFxuXHRoYXNGbGFnKCdjb2xvcnMnKSB8fFxuXHRoYXNGbGFnKCdjb2xvcj10cnVlJykgfHxcblx0aGFzRmxhZygnY29sb3I9YWx3YXlzJykpIHtcblx0Zm9yY2VDb2xvciA9IDE7XG59XG5pZiAoJ0ZPUkNFX0NPTE9SJyBpbiBlbnYpIHtcblx0aWYgKGVudi5GT1JDRV9DT0xPUiA9PT0gdHJ1ZSB8fCBlbnYuRk9SQ0VfQ09MT1IgPT09ICd0cnVlJykge1xuXHRcdGZvcmNlQ29sb3IgPSAxO1xuXHR9IGVsc2UgaWYgKGVudi5GT1JDRV9DT0xPUiA9PT0gZmFsc2UgfHwgZW52LkZPUkNFX0NPTE9SID09PSAnZmFsc2UnKSB7XG5cdFx0Zm9yY2VDb2xvciA9IDA7XG5cdH0gZWxzZSB7XG5cdFx0Zm9yY2VDb2xvciA9IGVudi5GT1JDRV9DT0xPUi5sZW5ndGggPT09IDAgPyAxIDogTWF0aC5taW4ocGFyc2VJbnQoZW52LkZPUkNFX0NPTE9SLCAxMCksIDMpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHRyYW5zbGF0ZUxldmVsKGxldmVsKSB7XG5cdGlmIChsZXZlbCA9PT0gMCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0bGV2ZWwsXG5cdFx0aGFzQmFzaWM6IHRydWUsXG5cdFx0aGFzMjU2OiBsZXZlbCA+PSAyLFxuXHRcdGhhczE2bTogbGV2ZWwgPj0gM1xuXHR9O1xufVxuXG5mdW5jdGlvbiBzdXBwb3J0c0NvbG9yKHN0cmVhbSkge1xuXHRpZiAoZm9yY2VDb2xvciA9PT0gMCkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0aWYgKGhhc0ZsYWcoJ2NvbG9yPTE2bScpIHx8XG5cdFx0aGFzRmxhZygnY29sb3I9ZnVsbCcpIHx8XG5cdFx0aGFzRmxhZygnY29sb3I9dHJ1ZWNvbG9yJykpIHtcblx0XHRyZXR1cm4gMztcblx0fVxuXG5cdGlmIChoYXNGbGFnKCdjb2xvcj0yNTYnKSkge1xuXHRcdHJldHVybiAyO1xuXHR9XG5cblx0aWYgKHN0cmVhbSAmJiAhc3RyZWFtLmlzVFRZICYmIGZvcmNlQ29sb3IgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0Y29uc3QgbWluID0gZm9yY2VDb2xvciB8fCAwO1xuXG5cdGlmIChlbnYuVEVSTSA9PT0gJ2R1bWInKSB7XG5cdFx0cmV0dXJuIG1pbjtcblx0fVxuXG5cdGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG5cdFx0Ly8gTm9kZS5qcyA3LjUuMCBpcyB0aGUgZmlyc3QgdmVyc2lvbiBvZiBOb2RlLmpzIHRvIGluY2x1ZGUgYSBwYXRjaCB0b1xuXHRcdC8vIGxpYnV2IHRoYXQgZW5hYmxlcyAyNTYgY29sb3Igb3V0cHV0IG9uIFdpbmRvd3MuIEFueXRoaW5nIGVhcmxpZXIgYW5kIGl0XG5cdFx0Ly8gd29uJ3Qgd29yay4gSG93ZXZlciwgaGVyZSB3ZSB0YXJnZXQgTm9kZS5qcyA4IGF0IG1pbmltdW0gYXMgaXQgaXMgYW4gTFRTXG5cdFx0Ly8gcmVsZWFzZSwgYW5kIE5vZGUuanMgNyBpcyBub3QuIFdpbmRvd3MgMTAgYnVpbGQgMTA1ODYgaXMgdGhlIGZpcnN0IFdpbmRvd3Ncblx0XHQvLyByZWxlYXNlIHRoYXQgc3VwcG9ydHMgMjU2IGNvbG9ycy4gV2luZG93cyAxMCBidWlsZCAxNDkzMSBpcyB0aGUgZmlyc3QgcmVsZWFzZVxuXHRcdC8vIHRoYXQgc3VwcG9ydHMgMTZtL1RydWVDb2xvci5cblx0XHRjb25zdCBvc1JlbGVhc2UgPSBvcy5yZWxlYXNlKCkuc3BsaXQoJy4nKTtcblx0XHRpZiAoXG5cdFx0XHROdW1iZXIocHJvY2Vzcy52ZXJzaW9ucy5ub2RlLnNwbGl0KCcuJylbMF0pID49IDggJiZcblx0XHRcdE51bWJlcihvc1JlbGVhc2VbMF0pID49IDEwICYmXG5cdFx0XHROdW1iZXIob3NSZWxlYXNlWzJdKSA+PSAxMDU4NlxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIE51bWJlcihvc1JlbGVhc2VbMl0pID49IDE0OTMxID8gMyA6IDI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRpZiAoJ0NJJyBpbiBlbnYpIHtcblx0XHRpZiAoWydUUkFWSVMnLCAnQ0lSQ0xFQ0knLCAnQVBQVkVZT1InLCAnR0lUTEFCX0NJJ10uc29tZShzaWduID0+IHNpZ24gaW4gZW52KSB8fCBlbnYuQ0lfTkFNRSA9PT0gJ2NvZGVzaGlwJykge1xuXHRcdFx0cmV0dXJuIDE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1pbjtcblx0fVxuXG5cdGlmICgnVEVBTUNJVFlfVkVSU0lPTicgaW4gZW52KSB7XG5cdFx0cmV0dXJuIC9eKDlcXC4oMCpbMS05XVxcZCopXFwufFxcZHsyLH1cXC4pLy50ZXN0KGVudi5URUFNQ0lUWV9WRVJTSU9OKSA/IDEgOiAwO1xuXHR9XG5cblx0aWYgKGVudi5DT0xPUlRFUk0gPT09ICd0cnVlY29sb3InKSB7XG5cdFx0cmV0dXJuIDM7XG5cdH1cblxuXHRpZiAoJ1RFUk1fUFJPR1JBTScgaW4gZW52KSB7XG5cdFx0Y29uc3QgdmVyc2lvbiA9IHBhcnNlSW50KChlbnYuVEVSTV9QUk9HUkFNX1ZFUlNJT04gfHwgJycpLnNwbGl0KCcuJylbMF0sIDEwKTtcblxuXHRcdHN3aXRjaCAoZW52LlRFUk1fUFJPR1JBTSkge1xuXHRcdFx0Y2FzZSAnaVRlcm0uYXBwJzpcblx0XHRcdFx0cmV0dXJuIHZlcnNpb24gPj0gMyA/IDMgOiAyO1xuXHRcdFx0Y2FzZSAnQXBwbGVfVGVybWluYWwnOlxuXHRcdFx0XHRyZXR1cm4gMjtcblx0XHRcdC8vIE5vIGRlZmF1bHRcblx0XHR9XG5cdH1cblxuXHRpZiAoLy0yNTYoY29sb3IpPyQvaS50ZXN0KGVudi5URVJNKSkge1xuXHRcdHJldHVybiAyO1xuXHR9XG5cblx0aWYgKC9ec2NyZWVufF54dGVybXxednQxMDB8XnZ0MjIwfF5yeHZ0fGNvbG9yfGFuc2l8Y3lnd2lufGxpbnV4L2kudGVzdChlbnYuVEVSTSkpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdGlmICgnQ09MT1JURVJNJyBpbiBlbnYpIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXG5cdHJldHVybiBtaW47XG59XG5cbmZ1bmN0aW9uIGdldFN1cHBvcnRMZXZlbChzdHJlYW0pIHtcblx0Y29uc3QgbGV2ZWwgPSBzdXBwb3J0c0NvbG9yKHN0cmVhbSk7XG5cdHJldHVybiB0cmFuc2xhdGVMZXZlbChsZXZlbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRzdXBwb3J0c0NvbG9yOiBnZXRTdXBwb3J0TGV2ZWwsXG5cdHN0ZG91dDogZ2V0U3VwcG9ydExldmVsKHByb2Nlc3Muc3Rkb3V0KSxcblx0c3RkZXJyOiBnZXRTdXBwb3J0TGV2ZWwocHJvY2Vzcy5zdGRlcnIpXG59O1xuIiwiLy9cbi8vIFREaWdlc3Q6XG4vL1xuLy8gYXBwcm94aW1hdGUgZGlzdHJpYnV0aW9uIHBlcmNlbnRpbGVzIGZyb20gYSBzdHJlYW0gb2YgcmVhbHNcbi8vXG52YXIgUkJUcmVlID0gcmVxdWlyZSgnYmludHJlZXMnKS5SQlRyZWU7XG5cbmZ1bmN0aW9uIFREaWdlc3QoZGVsdGEsIEssIENYKSB7XG4gICAgLy8gYWxsb2NhdGUgYSBURGlnZXN0IHN0cnVjdHVyZS5cbiAgICAvL1xuICAgIC8vIGRlbHRhIGlzIHRoZSBjb21wcmVzc2lvbiBmYWN0b3IsIHRoZSBtYXggZnJhY3Rpb24gb2YgbWFzcyB0aGF0XG4gICAgLy8gY2FuIGJlIG93bmVkIGJ5IG9uZSBjZW50cm9pZCAoYmlnZ2VyLCB1cCB0byAxLjAsIG1lYW5zIG1vcmVcbiAgICAvLyBjb21wcmVzc2lvbikuIGRlbHRhPWZhbHNlIHN3aXRjaGVzIG9mZiBURGlnZXN0IGJlaGF2aW9yIGFuZCB0cmVhdHNcbiAgICAvLyB0aGUgZGlzdHJpYnV0aW9uIGFzIGRpc2NyZXRlLCB3aXRoIG5vIG1lcmdpbmcgYW5kIGV4YWN0IHZhbHVlc1xuICAgIC8vIHJlcG9ydGVkLlxuICAgIC8vXG4gICAgLy8gSyBpcyBhIHNpemUgdGhyZXNob2xkIHRoYXQgdHJpZ2dlcnMgcmVjb21wcmVzc2lvbiBhcyB0aGUgVERpZ2VzdFxuICAgIC8vIGdyb3dzIGR1cmluZyBpbnB1dC4gIChTZXQgaXQgdG8gMCB0byBkaXNhYmxlIGF1dG9tYXRpYyByZWNvbXByZXNzaW9uKVxuICAgIC8vXG4gICAgLy8gQ1ggc3BlY2lmaWVzIGhvdyBvZnRlbiB0byB1cGRhdGUgY2FjaGVkIGN1bXVsYXRpdmUgdG90YWxzIHVzZWRcbiAgICAvLyBmb3IgcXVhbnRpbGUgZXN0aW1hdGlvbiBkdXJpbmcgaW5nZXN0IChzZWUgY3VtdWxhdGUoKSkuICBTZXQgdG9cbiAgICAvLyAwIHRvIHVzZSBleGFjdCBxdWFudGlsZXMgZm9yIGVhY2ggbmV3IHBvaW50LlxuICAgIC8vXG4gICAgdGhpcy5kaXNjcmV0ZSA9IChkZWx0YSA9PT0gZmFsc2UpO1xuICAgIHRoaXMuZGVsdGEgPSBkZWx0YSB8fCAwLjAxO1xuICAgIHRoaXMuSyA9IChLID09PSB1bmRlZmluZWQpID8gMjUgOiBLO1xuICAgIHRoaXMuQ1ggPSAoQ1ggPT09IHVuZGVmaW5lZCkgPyAxLjEgOiBDWDtcbiAgICB0aGlzLmNlbnRyb2lkcyA9IG5ldyBSQlRyZWUoY29tcGFyZV9jZW50cm9pZF9tZWFucyk7XG4gICAgdGhpcy5ucmVzZXQgPSAwO1xuICAgIHRoaXMucmVzZXQoKTtcbn1cblxuVERpZ2VzdC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBwcmVwYXJlIHRvIGRpZ2VzdCBuZXcgcG9pbnRzLlxuICAgIC8vXG4gICAgdGhpcy5jZW50cm9pZHMuY2xlYXIoKTtcbiAgICB0aGlzLm4gPSAwO1xuICAgIHRoaXMubnJlc2V0ICs9IDE7XG4gICAgdGhpcy5sYXN0X2N1bXVsYXRlID0gMDtcbn07XG5cblREaWdlc3QucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5jZW50cm9pZHMuc2l6ZTtcbn07XG5cblREaWdlc3QucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbihldmVyeXRoaW5nKSB7XG4gICAgLy8gcmV0dXJuIHttZWFuLG59IG9mIGNlbnRyb2lkcyBhcyBhbiBhcnJheSBvcmRlcmVkIGJ5IG1lYW4uXG4gICAgLy9cbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgaWYgKGV2ZXJ5dGhpbmcpIHtcbiAgICAgICAgdGhpcy5fY3VtdWxhdGUodHJ1ZSk7IC8vIGJlIHN1cmUgY3VtbnMgYXJlIGV4YWN0XG4gICAgICAgIHRoaXMuY2VudHJvaWRzLmVhY2goZnVuY3Rpb24oYykgeyByZXN1bHQucHVzaChjKTsgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jZW50cm9pZHMuZWFjaChmdW5jdGlvbihjKSB7IHJlc3VsdC5wdXNoKHttZWFuOmMubWVhbiwgbjpjLm59KTsgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5URGlnZXN0LnByb3RvdHlwZS5zdW1tYXJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFwcHJveCA9ICh0aGlzLmRpc2NyZXRlKSA/IFwiZXhhY3QgXCIgOiBcImFwcHJveGltYXRpbmcgXCI7XG4gICAgdmFyIHMgPSBbYXBwcm94ICsgdGhpcy5uICsgXCIgc2FtcGxlcyB1c2luZyBcIiArIHRoaXMuc2l6ZSgpICsgXCIgY2VudHJvaWRzXCIsXG4gICAgICAgICAgICAgXCJtaW4gPSBcIit0aGlzLnBlcmNlbnRpbGUoMCksXG4gICAgICAgICAgICAgXCJRMSAgPSBcIit0aGlzLnBlcmNlbnRpbGUoMC4yNSksXG4gICAgICAgICAgICAgXCJRMiAgPSBcIit0aGlzLnBlcmNlbnRpbGUoMC41KSxcbiAgICAgICAgICAgICBcIlEzICA9IFwiK3RoaXMucGVyY2VudGlsZSgwLjc1KSxcbiAgICAgICAgICAgICBcIm1heCA9IFwiK3RoaXMucGVyY2VudGlsZSgxLjApXTtcbiAgICByZXR1cm4gcy5qb2luKCdcXG4nKTtcbn07XG5cbmZ1bmN0aW9uIGNvbXBhcmVfY2VudHJvaWRfbWVhbnMoYSwgYikge1xuICAgIC8vIG9yZGVyIHR3byBjZW50cm9pZHMgYnkgbWVhbi5cbiAgICAvL1xuICAgIHJldHVybiAoYS5tZWFuID4gYi5tZWFuKSA/IDEgOiAoYS5tZWFuIDwgYi5tZWFuKSA/IC0xIDogMDtcbn1cblxuZnVuY3Rpb24gY29tcGFyZV9jZW50cm9pZF9tZWFuX2N1bW5zKGEsIGIpIHtcbiAgICAvLyBvcmRlciB0d28gY2VudHJvaWRzIGJ5IG1lYW5fY3Vtbi5cbiAgICAvL1xuICAgIHJldHVybiAoYS5tZWFuX2N1bW4gLSBiLm1lYW5fY3Vtbik7XG59XG5cblREaWdlc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbih4LCBuKSB7XG4gICAgLy8gaW5jb3Jwb3JhdGUgdmFsdWUgb3IgYXJyYXkgb2YgdmFsdWVzIHgsIGhhdmluZyBjb3VudCBuIGludG8gdGhlXG4gICAgLy8gVERpZ2VzdC4gbiBkZWZhdWx0cyB0byAxLlxuICAgIC8vXG4gICAgbiA9IG4gfHwgMTtcbiAgICB4ID0gQXJyYXkuaXNBcnJheSh4KSA/IHggOiBbeF07XG4gICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgeC5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgdGhpcy5fZGlnZXN0KHhbaV0sIG4pO1xuICAgIH1cbn07XG5cblREaWdlc3QucHJvdG90eXBlLnB1c2hfY2VudHJvaWQgPSBmdW5jdGlvbihjKSB7XG4gICAgLy8gaW5jb3Jwb3JhdGUgY2VudHJvaWQgb3IgYXJyYXkgb2YgY2VudHJvaWRzIGNcbiAgICAvL1xuICAgIGMgPSBBcnJheS5pc0FycmF5KGMpID8gYyA6IFtjXTtcbiAgICBmb3IgKHZhciBpID0gMCA7IGkgPCBjLmxlbmd0aCA7IGkrKykge1xuICAgICAgICB0aGlzLl9kaWdlc3QoY1tpXS5tZWFuLCBjW2ldLm4pO1xuICAgIH1cbn07XG5cblREaWdlc3QucHJvdG90eXBlLl9jdW11bGF0ZSA9IGZ1bmN0aW9uKGV4YWN0KSB7XG4gICAgLy8gdXBkYXRlIGN1bXVsYXRpdmUgY291bnRzIGZvciBlYWNoIGNlbnRyb2lkXG4gICAgLy9cbiAgICAvLyBleGFjdDogZmFsc2V5IG1lYW5zIG9ubHkgY3VtdWxhdGUgYWZ0ZXIgc3VmZmljaWVudFxuICAgIC8vIGdyb3d0aC4gRHVyaW5nIGluZ2VzdCwgdGhlc2UgY291bnRzIGFyZSB1c2VkIGFzIHF1YW50aWxlXG4gICAgLy8gZXN0aW1hdGVzLCBhbmQgdGhleSB3b3JrIHdlbGwgZXZlbiB3aGVuIHNvbWV3aGF0IG91dCBvZlxuICAgIC8vIGRhdGUuICh0aGlzIGlzIGEgZGVwYXJ0dXJlIGZyb20gdGhlIHB1YmxpY2F0aW9uLCB5b3UgbWF5IHNldCBDWFxuICAgIC8vIHRvIDAgdG8gZGlzYWJsZSkuXG4gICAgLy9cbiAgICBpZiAodGhpcy5uID09PSB0aGlzLmxhc3RfY3VtdWxhdGUgfHxcbiAgICAgICAgIWV4YWN0ICYmIHRoaXMuQ1ggJiYgdGhpcy5DWCA+ICh0aGlzLm4gLyB0aGlzLmxhc3RfY3VtdWxhdGUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGN1bW4gPSAwO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmNlbnRyb2lkcy5lYWNoKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgYy5tZWFuX2N1bW4gPSBjdW1uICsgYy5uIC8gMjsgLy8gaGFsZiBvZiBuIGF0IHRoZSBtZWFuXG4gICAgICAgIGN1bW4gPSBjLmN1bW4gPSBjdW1uICsgYy5uO1xuICAgIH0pO1xuICAgIHRoaXMubiA9IHRoaXMubGFzdF9jdW11bGF0ZSA9IGN1bW47XG59O1xuXG5URGlnZXN0LnByb3RvdHlwZS5maW5kX25lYXJlc3QgPSBmdW5jdGlvbih4KSB7XG4gICAgLy8gZmluZCB0aGUgY2VudHJvaWQgY2xvc2VzdCB0byB4LiBUaGUgYXNzdW1wdGlvbiBvZlxuICAgIC8vIHVuaXF1ZSBtZWFucyBhbmQgYSB1bmlxdWUgbmVhcmVzdCBjZW50cm9pZCBkZXBhcnRzIGZyb20gdGhlXG4gICAgLy8gcGFwZXIsIHNlZSBfZGlnZXN0KCkgYmVsb3dcbiAgICAvL1xuICAgIGlmICh0aGlzLnNpemUoKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIGl0ZXIgPSB0aGlzLmNlbnRyb2lkcy5sb3dlckJvdW5kKHttZWFuOnh9KTsgLy8geCA8PSBpdGVyIHx8IGl0ZXI9PW51bGxcbiAgICB2YXIgYyA9IChpdGVyLmRhdGEoKSA9PT0gbnVsbCkgPyBpdGVyLnByZXYoKSA6IGl0ZXIuZGF0YSgpO1xuICAgIGlmIChjLm1lYW4gPT09IHggfHwgdGhpcy5kaXNjcmV0ZSkge1xuICAgICAgICByZXR1cm4gYzsgLy8gYyBpcyBlaXRoZXIgeCBvciBhIG5laWdoYm9yIChkaXNjcmV0ZTogbm8gZGlzdGFuY2UgZnVuYylcbiAgICB9XG4gICAgdmFyIHByZXYgPSBpdGVyLnByZXYoKTtcbiAgICBpZiAocHJldiAmJiBNYXRoLmFicyhwcmV2Lm1lYW4gLSB4KSA8IE1hdGguYWJzKGMubWVhbiAtIHgpKSB7XG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cbn07XG5cblREaWdlc3QucHJvdG90eXBlLl9uZXdfY2VudHJvaWQgPSBmdW5jdGlvbih4LCBuLCBjdW1uKSB7XG4gICAgLy8gY3JlYXRlIGFuZCBpbnNlcnQgYSBuZXcgY2VudHJvaWQgaW50byB0aGUgZGlnZXN0IChkb24ndCB1cGRhdGVcbiAgICAvLyBjdW11bGF0aXZlcykuXG4gICAgLy9cbiAgICB2YXIgYyA9IHttZWFuOngsIG46biwgY3VtbjpjdW1ufTtcbiAgICB0aGlzLmNlbnRyb2lkcy5pbnNlcnQoYyk7XG4gICAgdGhpcy5uICs9IG47XG4gICAgcmV0dXJuIGM7XG59O1xuXG5URGlnZXN0LnByb3RvdHlwZS5fYWRkd2VpZ2h0ID0gZnVuY3Rpb24obmVhcmVzdCwgeCwgbikge1xuICAgIC8vIGFkZCB3ZWlnaHQgYXQgbG9jYXRpb24geCB0byBuZWFyZXN0IGNlbnRyb2lkLiAgYWRkaW5nIHggdG9cbiAgICAvLyBuZWFyZXN0IHdpbGwgbm90IHNoaWZ0IGl0cyByZWxhdGl2ZSBwb3NpdGlvbiBpbiB0aGUgdHJlZSBhbmRcbiAgICAvLyByZXF1aXJlIHJlaW5zZXJ0aW9uLlxuICAgIC8vXG4gICAgaWYgKHggIT09IG5lYXJlc3QubWVhbikge1xuICAgICAgICBuZWFyZXN0Lm1lYW4gKz0gbiAqICh4IC0gbmVhcmVzdC5tZWFuKSAvIChuZWFyZXN0Lm4gKyBuKTtcbiAgICB9XG4gICAgbmVhcmVzdC5jdW1uICs9IG47XG4gICAgbmVhcmVzdC5tZWFuX2N1bW4gKz0gbiAvIDI7XG4gICAgbmVhcmVzdC5uICs9IG47XG4gICAgdGhpcy5uICs9IG47XG59O1xuXG5URGlnZXN0LnByb3RvdHlwZS5fZGlnZXN0ID0gZnVuY3Rpb24oeCwgbikge1xuICAgIC8vIGluY29ycG9yYXRlIHZhbHVlIHgsIGhhdmluZyBjb3VudCBuIGludG8gdGhlIFREaWdlc3QuXG4gICAgLy9cbiAgICB2YXIgbWluID0gdGhpcy5jZW50cm9pZHMubWluKCk7XG4gICAgdmFyIG1heCA9IHRoaXMuY2VudHJvaWRzLm1heCgpO1xuICAgIHZhciBuZWFyZXN0ID0gdGhpcy5maW5kX25lYXJlc3QoeCk7XG4gICAgaWYgKG5lYXJlc3QgJiYgbmVhcmVzdC5tZWFuID09PSB4KSB7XG4gICAgICAgIC8vIGFjY3VtdWxhdGUgZXhhY3QgbWF0Y2hlcyBpbnRvIHRoZSBjZW50cm9pZCB3aXRob3V0XG4gICAgICAgIC8vIGxpbWl0LiB0aGlzIGlzIGEgZGVwYXJ0dXJlIGZyb20gdGhlIHBhcGVyLCBtYWRlIHNvXG4gICAgICAgIC8vIGNlbnRyb2lkcyByZW1haW4gdW5pcXVlIGFuZCBjb2RlIGNhbiBiZSBzaW1wbGUuXG4gICAgICAgIHRoaXMuX2FkZHdlaWdodChuZWFyZXN0LCB4LCBuKTtcbiAgICB9IGVsc2UgaWYgKG5lYXJlc3QgPT09IG1pbikge1xuICAgICAgICB0aGlzLl9uZXdfY2VudHJvaWQoeCwgbiwgMCk7IC8vIG5ldyBwb2ludCBhcm91bmQgbWluIGJvdW5kYXJ5XG4gICAgfSBlbHNlIGlmIChuZWFyZXN0ID09PSBtYXggKSB7XG4gICAgICAgIHRoaXMuX25ld19jZW50cm9pZCh4LCBuLCB0aGlzLm4pOyAvLyBuZXcgcG9pbnQgYXJvdW5kIG1heCBib3VuZGFyeVxuICAgIH0gZWxzZSBpZiAodGhpcy5kaXNjcmV0ZSkge1xuICAgICAgICB0aGlzLl9uZXdfY2VudHJvaWQoeCwgbiwgbmVhcmVzdC5jdW1uKTsgLy8gbmV2ZXIgbWVyZ2VcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjb25pZGVyIGEgbWVyZ2UgYmFzZWQgb24gbmVhcmVzdCBjZW50cm9pZCdzIGNhcGFjaXR5LiBpZlxuICAgICAgICAvLyB0aGVyZSdzIG5vdCByb29tIGZvciBhbGwgb2YgbiwgZG9uJ3QgYm90aGVyIG1lcmdpbmcgYW55IG9mXG4gICAgICAgIC8vIGl0IGludG8gbmVhcmVzdCwgYXMgd2UnbGwgaGF2ZSB0byBtYWtlIGEgbmV3IGNlbnRyb2lkXG4gICAgICAgIC8vIGFueXdheSBmb3IgdGhlIHJlbWFpbmRlciAoZGVwYXJ0dXJlIGZyb20gdGhlIHBhcGVyKS5cbiAgICAgICAgdmFyIHAgPSBuZWFyZXN0Lm1lYW5fY3VtbiAvIHRoaXMubjtcbiAgICAgICAgdmFyIG1heF9uID0gTWF0aC5mbG9vcig0ICogdGhpcy5uICogdGhpcy5kZWx0YSAqIHAgKiAoMSAtIHApKTtcbiAgICAgICAgaWYgKG1heF9uIC0gbmVhcmVzdC5uID49IG4pIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZHdlaWdodChuZWFyZXN0LCB4LCBuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX25ld19jZW50cm9pZCh4LCBuLCBuZWFyZXN0LmN1bW4pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2N1bXVsYXRlKGZhbHNlKTtcbiAgICBpZiAoIXRoaXMuZGlzY3JldGUgJiYgdGhpcy5LICYmIHRoaXMuc2l6ZSgpID4gdGhpcy5LIC8gdGhpcy5kZWx0YSkge1xuICAgICAgICAvLyByZS1wcm9jZXNzIHRoZSBjZW50cm9pZHMgYW5kIGhvcGUgZm9yIHNvbWUgY29tcHJlc3Npb24uXG4gICAgICAgIHRoaXMuY29tcHJlc3MoKTtcbiAgICB9XG59O1xuXG5URGlnZXN0LnByb3RvdHlwZS5ib3VuZF9tZWFuID0gZnVuY3Rpb24oeCkge1xuICAgIC8vIGZpbmQgY2VudHJvaWRzIGxvd2VyIGFuZCB1cHBlciBzdWNoIHRoYXQgbG93ZXIubWVhbiA8IHggPFxuICAgIC8vIHVwcGVyLm1lYW4gb3IgbG93ZXIubWVhbiA9PT0geCA9PT0gdXBwZXIubWVhbi4gRG9uJ3QgY2FsbFxuICAgIC8vIHRoaXMgZm9yIHggb3V0IG9mIGJvdW5kcy5cbiAgICAvL1xuICAgIHZhciBpdGVyID0gdGhpcy5jZW50cm9pZHMudXBwZXJCb3VuZCh7bWVhbjp4fSk7IC8vIHggPCBpdGVyXG4gICAgdmFyIGxvd2VyID0gaXRlci5wcmV2KCk7ICAgICAgLy8gbG93ZXIgPD0geFxuICAgIHZhciB1cHBlciA9IChsb3dlci5tZWFuID09PSB4KSA/IGxvd2VyIDogaXRlci5uZXh0KCk7XG4gICAgcmV0dXJuIFtsb3dlciwgdXBwZXJdO1xufTtcblxuVERpZ2VzdC5wcm90b3R5cGUucF9yYW5rID0gZnVuY3Rpb24oeF9vcl94bGlzdCkge1xuICAgIC8vIHJldHVybiBhcHByb3hpbWF0ZSBwZXJjZW50aWxlLXJhbmtzICgwLi4xKSBmb3IgZGF0YSB2YWx1ZSB4LlxuICAgIC8vIG9yIGxpc3Qgb2YgeC4gIGNhbGN1bGF0ZWQgYWNjb3JkaW5nIHRvXG4gICAgLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUGVyY2VudGlsZV9yYW5rXG4gICAgLy9cbiAgICAvLyAoTm90ZSB0aGF0IGluIGNvbnRpbnVvdXMgbW9kZSwgYm91bmRhcnkgc2FtcGxlIHZhbHVlcyB3aWxsXG4gICAgLy8gcmVwb3J0IGhhbGYgdGhlaXIgY2VudHJvaWQgd2VpZ2h0IGlud2FyZCBmcm9tIDAvMSBhcyB0aGVcbiAgICAvLyBwZXJjZW50aWxlLXJhbmsuIFggdmFsdWVzIG91dHNpZGUgdGhlIG9ic2VydmVkIHJhbmdlIHJldHVyblxuICAgIC8vIDAvMSlcbiAgICAvL1xuICAgIC8vIHRoaXMgdHJpZ2dlcnMgY3VtdWxhdGUoKSBpZiBjdW1uJ3MgYXJlIG91dCBvZiBkYXRlLlxuICAgIC8vXG4gICAgdmFyIHhzID0gQXJyYXkuaXNBcnJheSh4X29yX3hsaXN0KSA/IHhfb3JfeGxpc3QgOiBbeF9vcl94bGlzdF07XG4gICAgdmFyIHBzID0geHMubWFwKHRoaXMuX3BfcmFuaywgdGhpcyk7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoeF9vcl94bGlzdCkgPyBwcyA6IHBzWzBdO1xufTtcblxuVERpZ2VzdC5wcm90b3R5cGUuX3BfcmFuayA9IGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAodGhpcy5zaXplKCkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2UgaWYgKHggPCB0aGlzLmNlbnRyb2lkcy5taW4oKS5tZWFuKSB7XG4gICAgICAgIHJldHVybiAwLjA7XG4gICAgfSBlbHNlIGlmICh4ID4gdGhpcy5jZW50cm9pZHMubWF4KCkubWVhbikge1xuICAgICAgICByZXR1cm4gMS4wO1xuICAgIH1cbiAgICAvLyBmaW5kIGNlbnRyb2lkcyB0aGF0IGJyYWNrZXQgeCBhbmQgaW50ZXJwb2xhdGUgeCdzIGN1bW4gZnJvbVxuICAgIC8vIHRoZWlyIGN1bW4ncy5cbiAgICB0aGlzLl9jdW11bGF0ZSh0cnVlKTsgLy8gYmUgc3VyZSBjdW1ucyBhcmUgZXhhY3RcbiAgICB2YXIgYm91bmQgPSB0aGlzLmJvdW5kX21lYW4oeCk7XG4gICAgdmFyIGxvd2VyID0gYm91bmRbMF0sIHVwcGVyID0gYm91bmRbMV07XG4gICAgaWYgKHRoaXMuZGlzY3JldGUpIHtcbiAgICAgICAgcmV0dXJuIGxvd2VyLmN1bW4gLyB0aGlzLm47XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGN1bW4gPSBsb3dlci5tZWFuX2N1bW47XG4gICAgICAgIGlmIChsb3dlciAhPT0gdXBwZXIpIHtcbiAgICAgICAgICAgIGN1bW4gKz0gKHggLSBsb3dlci5tZWFuKSAqICh1cHBlci5tZWFuX2N1bW4gLSBsb3dlci5tZWFuX2N1bW4pIC8gKHVwcGVyLm1lYW4gLSBsb3dlci5tZWFuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VtbiAvIHRoaXMubjtcbiAgICB9XG59O1xuXG5URGlnZXN0LnByb3RvdHlwZS5ib3VuZF9tZWFuX2N1bW4gPSBmdW5jdGlvbihjdW1uKSB7XG4gICAgLy8gZmluZCBjZW50cm9pZHMgbG93ZXIgYW5kIHVwcGVyIHN1Y2ggdGhhdCBsb3dlci5tZWFuX2N1bW4gPCB4IDxcbiAgICAvLyB1cHBlci5tZWFuX2N1bW4gb3IgbG93ZXIubWVhbl9jdW1uID09PSB4ID09PSB1cHBlci5tZWFuX2N1bW4uIERvbid0IGNhbGxcbiAgICAvLyB0aGlzIGZvciBjdW1uIG91dCBvZiBib3VuZHMuXG4gICAgLy9cbiAgICAvLyBYWFggYmVjYXVzZSBtZWFuIGFuZCBtZWFuX2N1bW4gZ2l2ZSByaXNlIHRvIHRoZSBzYW1lIHNvcnQgb3JkZXJcbiAgICAvLyAodXAgdG8gaWRlbnRpY2FsIG1lYW5zKSwgdXNlIHRoZSBtZWFuIHJidHJlZSBmb3Igb3VyIHNlYXJjaC5cbiAgICB0aGlzLmNlbnRyb2lkcy5fY29tcGFyYXRvciA9IGNvbXBhcmVfY2VudHJvaWRfbWVhbl9jdW1ucztcbiAgICB2YXIgaXRlciA9IHRoaXMuY2VudHJvaWRzLnVwcGVyQm91bmQoe21lYW5fY3VtbjpjdW1ufSk7IC8vIGN1bW4gPCBpdGVyXG4gICAgdGhpcy5jZW50cm9pZHMuX2NvbXBhcmF0b3IgPSBjb21wYXJlX2NlbnRyb2lkX21lYW5zO1xuICAgIHZhciBsb3dlciA9IGl0ZXIucHJldigpOyAgICAgIC8vIGxvd2VyIDw9IGN1bW5cbiAgICB2YXIgdXBwZXIgPSAobG93ZXIgJiYgbG93ZXIubWVhbl9jdW1uID09PSBjdW1uKSA/IGxvd2VyIDogaXRlci5uZXh0KCk7XG4gICAgcmV0dXJuIFtsb3dlciwgdXBwZXJdO1xufTtcblxuVERpZ2VzdC5wcm90b3R5cGUucGVyY2VudGlsZSA9IGZ1bmN0aW9uKHBfb3JfcGxpc3QpIHtcbiAgICAvLyBmb3IgcGVyY2VudGFnZSBwICgwLi4xKSwgb3IgZm9yIGVhY2ggcCBpbiBhIGxpc3Qgb2YgcHMsIHJldHVyblxuICAgIC8vIHRoZSBzbWFsbGVzdCBkYXRhIHZhbHVlIHEgYXQgd2hpY2ggYXQgbGVhc3QgcCBwZXJjZW50IG9mIHRoZVxuICAgIC8vIG9ic2VydmF0aW9ucyA8PSBxLlxuICAgIC8vXG4gICAgLy8gZm9yIGRpc2NyZXRlIGRpc3RyaWJ1dGlvbnMsIHRoaXMgc2VsZWN0cyBxIHVzaW5nIHRoZSBOZWFyZXN0XG4gICAgLy8gUmFuayBNZXRob2RcbiAgICAvLyAoaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUGVyY2VudGlsZSNUaGVfTmVhcmVzdF9SYW5rX21ldGhvZClcbiAgICAvLyAoaW4gc2NpcHksIHNhbWUgYXMgcGVyY2VudGlsZSguLi4uLCBpbnRlcnBvbGF0aW9uPSdoaWdoZXInKVxuICAgIC8vXG4gICAgLy8gZm9yIGNvbnRpbnVvdXMgZGlzdHJpYnV0aW9ucywgaW50ZXJwb2xhdGVzIGRhdGEgdmFsdWVzIGJldHdlZW5cbiAgICAvLyBjb3VudC13ZWlnaHRlZCBicmFja2V0aW5nIG1lYW5zLlxuICAgIC8vXG4gICAgLy8gdGhpcyB0cmlnZ2VycyBjdW11bGF0ZSgpIGlmIGN1bW4ncyBhcmUgb3V0IG9mIGRhdGUuXG4gICAgLy9cbiAgICB2YXIgcHMgPSBBcnJheS5pc0FycmF5KHBfb3JfcGxpc3QpID8gcF9vcl9wbGlzdCA6IFtwX29yX3BsaXN0XTtcbiAgICB2YXIgcXMgPSBwcy5tYXAodGhpcy5fcGVyY2VudGlsZSwgdGhpcyk7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocF9vcl9wbGlzdCkgPyBxcyA6IHFzWzBdO1xufTtcblxuVERpZ2VzdC5wcm90b3R5cGUuX3BlcmNlbnRpbGUgPSBmdW5jdGlvbihwKSB7XG4gICAgaWYgKHRoaXMuc2l6ZSgpID09PSAwKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuX2N1bXVsYXRlKHRydWUpOyAvLyBiZSBzdXJlIGN1bW5zIGFyZSBleGFjdFxuICAgIHZhciBtaW4gPSB0aGlzLmNlbnRyb2lkcy5taW4oKTtcbiAgICB2YXIgbWF4ID0gdGhpcy5jZW50cm9pZHMubWF4KCk7XG4gICAgdmFyIGggPSB0aGlzLm4gKiBwO1xuICAgIHZhciBib3VuZCA9IHRoaXMuYm91bmRfbWVhbl9jdW1uKGgpO1xuICAgIHZhciBsb3dlciA9IGJvdW5kWzBdLCB1cHBlciA9IGJvdW5kWzFdO1xuXG4gICAgaWYgKHVwcGVyID09PSBsb3dlciB8fCBsb3dlciA9PT0gbnVsbCB8fCB1cHBlciA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gKGxvd2VyIHx8IHVwcGVyKS5tZWFuO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuZGlzY3JldGUpIHtcbiAgICAgICAgcmV0dXJuIGxvd2VyLm1lYW4gKyAoaCAtIGxvd2VyLm1lYW5fY3VtbikgKiAodXBwZXIubWVhbiAtIGxvd2VyLm1lYW4pIC8gKHVwcGVyLm1lYW5fY3VtbiAtIGxvd2VyLm1lYW5fY3Vtbik7XG4gICAgfSBlbHNlIGlmIChoIDw9IGxvd2VyLmN1bW4pIHtcbiAgICAgICAgcmV0dXJuIGxvd2VyLm1lYW47XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVwcGVyLm1lYW47XG4gICAgfVxufTtcblxuZnVuY3Rpb24gcG9wX3JhbmRvbShjaG9pY2VzKSB7XG4gICAgLy8gcmVtb3ZlIGFuZCByZXR1cm4gYW4gaXRlbSByYW5kb21seSBjaG9zZW4gZnJvbSB0aGUgYXJyYXkgb2YgY2hvaWNlc1xuICAgIC8vIChtdXRhdGVzIGNob2ljZXMpXG4gICAgLy9cbiAgICB2YXIgaWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hvaWNlcy5sZW5ndGgpO1xuICAgIHJldHVybiBjaG9pY2VzLnNwbGljZShpZHgsIDEpWzBdO1xufVxuXG5URGlnZXN0LnByb3RvdHlwZS5jb21wcmVzcyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIFREaWdlc3RzIGV4cGVyaWVuY2Ugd29yc3QgY2FzZSBjb21wcmVzc2lvbiAobm9uZSkgd2hlbiBpbnB1dFxuICAgIC8vIGluY3JlYXNlcyBtb25vdG9uaWNhbGx5LiAgSW1wcm92ZSBvbiBhbnkgYmFkIGx1Y2sgYnlcbiAgICAvLyByZWNvbnN1bWluZyBkaWdlc3QgY2VudHJvaWRzIGFzIGlmIHRoZXkgd2VyZSB3ZWlnaHRlZCBwb2ludHNcbiAgICAvLyB3aGlsZSBzaHVmZmxpbmcgdGhlaXIgb3JkZXIgKGFuZCBob3BlIGZvciB0aGUgYmVzdCkuXG4gICAgLy9cbiAgICBpZiAodGhpcy5jb21wcmVzc2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBwb2ludHMgPSB0aGlzLnRvQXJyYXkoKTtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgdGhpcy5jb21wcmVzc2luZyA9IHRydWU7XG4gICAgd2hpbGUgKHBvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMucHVzaF9jZW50cm9pZChwb3BfcmFuZG9tKHBvaW50cykpO1xuICAgIH1cbiAgICB0aGlzLl9jdW11bGF0ZSh0cnVlKTtcbiAgICB0aGlzLmNvbXByZXNzaW5nID0gZmFsc2U7XG59O1xuXG5mdW5jdGlvbiBEaWdlc3QoY29uZmlnKSB7XG4gICAgLy8gYWxsb2NhdGUgYSBkaXN0cmlidXRpb24gZGlnZXN0IHN0cnVjdHVyZS4gVGhpcyBpcyBhbiBleHRlbnNpb25cbiAgICAvLyBvZiBhIFREaWdlc3Qgc3RydWN0dXJlIHRoYXQgc3RhcnRzIGluIGV4YWN0IGhpc3RvZ3JhbSAoZGlzY3JldGUpXG4gICAgLy8gbW9kZSwgYW5kIGF1dG9tYXRpY2FsbHkgc3dpdGNoZXMgdG8gVERpZ2VzdCBtb2RlIGZvciBsYXJnZVxuICAgIC8vIHNhbXBsZXMgdGhhdCBhcHBlYXIgdG8gYmUgZnJvbSBhIGNvbnRpbnVvdXMgZGlzdHJpYnV0aW9uLlxuICAgIC8vXG4gICAgdGhpcy5jb25maWcgPSBjb25maWcgfHwge307XG4gICAgdGhpcy5tb2RlID0gdGhpcy5jb25maWcubW9kZSB8fCAnYXV0byc7IC8vIGRpc2MsIGNvbnQsIGF1dG9cbiAgICBURGlnZXN0LmNhbGwodGhpcywgdGhpcy5tb2RlID09PSAnY29udCcgPyBjb25maWcuZGVsdGEgOiBmYWxzZSk7XG4gICAgdGhpcy5kaWdlc3RfcmF0aW8gPSB0aGlzLmNvbmZpZy5yYXRpbyB8fCAwLjk7XG4gICAgdGhpcy5kaWdlc3RfdGhyZXNoID0gdGhpcy5jb25maWcudGhyZXNoIHx8IDEwMDA7XG4gICAgdGhpcy5uX3VuaXF1ZSA9IDA7XG59XG5EaWdlc3QucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShURGlnZXN0LnByb3RvdHlwZSk7XG5EaWdlc3QucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRGlnZXN0O1xuXG5EaWdlc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbih4X29yX3hsaXN0KSB7XG4gICAgVERpZ2VzdC5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIHhfb3JfeGxpc3QpO1xuICAgIHRoaXMuY2hlY2tfY29udGludW91cygpO1xufTtcblxuRGlnZXN0LnByb3RvdHlwZS5fbmV3X2NlbnRyb2lkID0gZnVuY3Rpb24oeCwgbiwgY3Vtbikge1xuICAgIHRoaXMubl91bmlxdWUgKz0gMTtcbiAgICBURGlnZXN0LnByb3RvdHlwZS5fbmV3X2NlbnRyb2lkLmNhbGwodGhpcywgeCwgbiwgY3Vtbik7XG59O1xuXG5EaWdlc3QucHJvdG90eXBlLl9hZGR3ZWlnaHQgPSBmdW5jdGlvbihuZWFyZXN0LCB4LCBuKSB7XG4gICAgaWYgKG5lYXJlc3QubiA9PT0gMSkge1xuICAgICAgICB0aGlzLm5fdW5pcXVlIC09IDE7XG4gICAgfVxuICAgIFREaWdlc3QucHJvdG90eXBlLl9hZGR3ZWlnaHQuY2FsbCh0aGlzLCBuZWFyZXN0LCB4LCBuKTtcbn07XG5cbkRpZ2VzdC5wcm90b3R5cGUuY2hlY2tfY29udGludW91cyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIHdoaWxlIGluICdhdXRvJyBtb2RlLCBpZiB0aGVyZSBhcmUgbWFueSB1bmlxdWUgZWxlbWVudHMsIGFzc3VtZVxuICAgIC8vIHRoZXkgYXJlIGZyb20gYSBjb250aW51b3VzIGRpc3RyaWJ1dGlvbiBhbmQgc3dpdGNoIHRvICdjb250J1xuICAgIC8vIG1vZGUgKHRkaWdlc3QgYmVoYXZpb3IpLiBSZXR1cm4gdHJ1ZSBvbiB0cmFuc2l0aW9uIGZyb21cbiAgICAvLyBkaXNjdGV0ZSB0byBjb250aW51b3VzLlxuICAgIGlmICh0aGlzLm1vZGUgIT09ICdhdXRvJyB8fCB0aGlzLnNpemUoKSA8IHRoaXMuZGlnZXN0X3RocmVzaCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLm5fdW5pcXVlIC8gdGhpcy5zaXplKCkgPiB0aGlzLmRpZ2VzdF9yYXRpbykge1xuICAgICAgICB0aGlzLm1vZGUgPSAnY29udCc7XG4gICAgICAgIHRoaXMuZGlzY3JldGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kZWx0YSA9IHRoaXMuY29uZmlnLmRlbHRhIHx8IDAuMDE7XG4gICAgICAgIHRoaXMuY29tcHJlc3MoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdURGlnZXN0JzogVERpZ2VzdCxcbiAgICAnRGlnZXN0JzogRGlnZXN0XG59O1xuIiwidmFyIHYxID0gcmVxdWlyZSgnLi92MScpO1xudmFyIHY0ID0gcmVxdWlyZSgnLi92NCcpO1xuXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG4iLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cbnZhciBieXRlVG9IZXggPSBbXTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gYnl0ZXNUb1V1aWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGJ0aCA9IGJ5dGVUb0hleDtcbiAgLy8gam9pbiB1c2VkIHRvIGZpeCBtZW1vcnkgaXNzdWUgY2F1c2VkIGJ5IGNvbmNhdGVuYXRpb246IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMxNzUjYzRcbiAgcmV0dXJuIChbXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV1cbiAgXSkuam9pbignJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnl0ZXNUb1V1aWQ7XG4iLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gbm9kZS5qc1xuLy8gdGhpcyBpcyBwcmV0dHkgc3RyYWlnaHQtZm9yd2FyZCAtIHdlIHVzZSB0aGUgY3J5cHRvIEFQSS5cblxudmFyIGNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vZGVSTkcoKSB7XG4gIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMoMTYpO1xufTtcbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG52YXIgX2Nsb2Nrc2VxO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAvLyBub2RlIGFuZCBjbG9ja3NlcSBuZWVkIHRvIGJlIGluaXRpYWxpemVkIHRvIHJhbmRvbSB2YWx1ZXMgaWYgdGhleSdyZSBub3RcbiAgLy8gc3BlY2lmaWVkLiAgV2UgZG8gdGhpcyBsYXppbHkgdG8gbWluaW1pemUgaXNzdWVzIHJlbGF0ZWQgdG8gaW5zdWZmaWNpZW50XG4gIC8vIHN5c3RlbSBlbnRyb3B5LiAgU2VlICMxODlcbiAgaWYgKG5vZGUgPT0gbnVsbCB8fCBjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgdmFyIHNlZWRCeXRlcyA9IHJuZygpO1xuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICAgICAgbm9kZSA9IF9ub2RlSWQgPSBbXG4gICAgICAgIHNlZWRCeXRlc1swXSB8IDB4MDEsXG4gICAgICAgIHNlZWRCeXRlc1sxXSwgc2VlZEJ5dGVzWzJdLCBzZWVkQnl0ZXNbM10sIHNlZWRCeXRlc1s0XSwgc2VlZEJ5dGVzWzVdXG4gICAgICBdO1xuICAgIH1cbiAgICBpZiAoY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbiAgICAgIGNsb2Nrc2VxID0gX2Nsb2Nrc2VxID0gKHNlZWRCeXRlc1s2XSA8PCA4IHwgc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcbiAgICB9XG4gIH1cblxuICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH1cblxuICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9XG5cbiAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gIC8vIGBub2RlYFxuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgPyBidWYgOiBieXRlc1RvVXVpZChiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2MTtcbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyArK2lpKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgYnl0ZXNUb1V1aWQocm5kcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjQ7XG4iLCJpbXBvcnQgUmVxdWVzdCBmcm9tIFwiLi9yZXF1ZXN0XCI7XG5pbXBvcnQgU2VydmVyIGZyb20gXCIuL3NlcnZlclwiO1xuaW1wb3J0IExvZ2dlciwgeyBfTG9nZ2VyIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5pbXBvcnQgeyBULCBPIH0gZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBQcm9tZXRoZXVzIGZyb20gXCIuL3Byb21cIjtcblxuY29uc3QgcGpzb24gPSByZXF1aXJlKFwiLi4vcGFja2FnZS5qc29uXCIpO1xuXG4vLyBMb2dnZXIuZW5hYmxlQWxsKCk7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5uYW1lc3BhY2UoXCJzZXJ2ZXJcIik7XG5sb2dnZXIuZGVidWcoXCJTdGFydGluZyBhcHBsaWNhdGlvbi4uLlwiKTtcbmxvZ2dlci5kZWJ1ZyhwanNvbik7XG5cbmNvbnN0IHBheW1lbnRwbHVzX2hvc3QgPSBPLnB0aW9uKHByb2Nlc3MuZW52LlBBWU1FTlRQTFVTX0hPU1QpLmdldE9yRWxzZShcInBheW1lbnRwbHVzLmhlcm9hcHAuZGV2XCIpO1xuY29uc3QgcGF5bWVudHBsdXNfcGF0aCA9IE8ucHRpb24ocHJvY2Vzcy5lbnYuUEFZTUVOVFBMVVNfUEFUSCkuZ2V0T3JFbHNlKFwiL2FwaS9vbmxpbmUtdXNlcnMvP2Zvcm1hdD1qc29uXCIpO1xuY29uc3QgcGF5bWVudHBsdXNfYXV0aF91c2VybmFtZSA9IE8ucHRpb24ocHJvY2Vzcy5lbnYuUEFZTUVOVFBMVVNfQVVUSF9VU0VSTkFNRSkuZ2V0T3JFbHNlKFwiYWRtaW5cIik7XG5jb25zdCBwYXltZW50cGx1c19hdXRoX3Bhc3N3b3JkID0gTy5wdGlvbihwcm9jZXNzLmVudi5QQVlNRU5UUExVU19BVVRIX1BBU1NXT1JEKS5nZXRPckVsc2UoXCJwYXNzd29yZFwiKTtcblxuY29uc3QgaG9zdCA9IE8ucHRpb24ocHJvY2Vzcy5lbnYuSE9TVCkuZ2V0T3JFbHNlKFwiMC4wLjAuMFwiKTtcbmNvbnN0IHBvcnQgPSBULnJ5KCgpID0+IHBhcnNlSW50KE8ucHRpb24ocHJvY2Vzcy5lbnYuUE9SVCkuZ2V0T3JFbHNlKFwiXCIpKSkuZ2V0T3JFbHNlKDEyMzQpO1xuXG5jb25zdCBwcm9tID0gbmV3IFByb21ldGhldXMoe1xuICBwYXltZW50cGx1c19vbmxpbmVfdXNlcjogUHJvbWV0aGV1cy5HYXVnZSh7XG4gICAgbmFtZTogXCJwYXltZW50cGx1c19vbmxpbmVfdXNlcl9jb3VudFwiLFxuICAgIGhlbHA6IFwiY3VycmVudGx5IG9ubGluZSB1c2VyIGluIHBheW1lbnRwbHVzXCJcbiAgfSksXG4gIHBheW1lbnRwbHVzX2Vycm9yOiBQcm9tZXRoZXVzLkdhdWdlKHtcbiAgICBuYW1lOiBcInBheW1lbnRwbHVzX3N5c3RlbV9mYWlsdXJlXCIsXG4gICAgaGVscDogXCJwYXltZW50cGx1cyBzeXN0ZW0gZmFpbHVyZVwiXG4gIH0pXG59KTtcblxuY29uc3QgdGltZW91dCA9IHByb20uYXBwbHlEZWZhdWx0KCk7XG5wcm9tLmxhYmVsKHsgYXBwdmVyc2lvbjogcGpzb24udmVyc2lvbiwgYXBwbmFtZTogcGpzb24ubmFtZSB9KTtcbnByb20ucmVnaXN0ZXIoKTtcblxuY29uc3Qgc2VydmVyID0gbmV3IFNlcnZlcigocmVxLCByZXMpID0+IHtcbiAgaWYgKHJlcS51cmwgIT09IFwiL21ldHJpY3NcIiAmJiByZXEudXJsICE9PSBcIi9cIikge1xuICAgIGxvZ2dlci53YXJuKGBTZWVtIHNvbWVvbmUgY2FsbGVkICR7cmVxLnVybH0gcGF0aGApO1xuICAgIHJlcy53cml0ZUhlYWQoNDAwLCB7IFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9wbGFpblwiIH0pO1xuICAgIHJlcy5lbmQoYE5vdCBmb3VuZGApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh7XG4gICAgaG9zdG5hbWU6IGAke3BheW1lbnRwbHVzX2hvc3R9YCxcbiAgICBwYXRoOiBgJHtwYXltZW50cGx1c19wYXRofWAsXG4gICAgYXV0aDogYCR7cGF5bWVudHBsdXNfYXV0aF91c2VybmFtZX06JHtwYXltZW50cGx1c19hdXRoX3Bhc3N3b3JkfWBcbiAgfSk7XG5cbiAgcmVxdWVzdC5tYWtlKCkudGhlbihkYXRhID0+IHtcbiAgICBULnJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IHRyeWNhdGNoID0gVC5yeSgoKSA9PiBKU09OLnBhcnNlKGRhdGEpKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlOiB7IGNvdW50OiBudW1iZXIgfSA9IHRyeWNhdGNoLmdldE9yRWxzZSh7IGNvdW50OiAwIH0pO1xuICAgICAgY29uc3QgZXJyb3IgPSB0cnljYXRjaC5mYWlsZWQoKSA/IDEgOiAwO1xuXG4gICAgICBwcm9tLmdldChcInBheW1lbnRwbHVzX29ubGluZV91c2VyXCIpLnNldChyZXNwb25zZS5jb3VudCwgbmV3IERhdGUoKSk7XG4gICAgICBwcm9tLmdldChcInBheW1lbnRwbHVzX2Vycm9yXCIpLnNldChlcnJvciwgbmV3IERhdGUoKSk7XG5cbiAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7IFwiQ29udGVudC1UeXBlXCI6IHByb20uY29udGVudFR5cGUgfSk7XG4gICAgICByZXMuZW5kKHByb20uZXhwb3J0KCkpO1xuICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7IFwiQ29udGVudC1UeXBlXCI6IHByb20uY29udGVudFR5cGUgfSk7XG4gICAgICByZXMuZW5kKHByb20uZXhwb3J0KCkpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG5zZXJ2ZXIuc3RhcnQoaG9zdCwgcG9ydCkudGhlbigoeyBob3N0LCBwb3J0IH0pID0+IHtcbiAgbG9nZ2VyLmluZm8oYFN0YXJ0IGFwcGxpY2F0aW9uIGF0IGh0dHA6Ly8ke2hvc3R9OiR7cG9ydH1gKTtcbn0pO1xuXG5wcm9jZXNzLm9uKFwiU0lHSU5UXCIsIGZ1bmN0aW9uKCkge1xuICBsb2dnZXIuZGVidWcoXCJTdG9waW5nIGFwcGxpY2F0aW9uLi4uXCIpO1xuXG4gIGNsZWFySW50ZXJ2YWwodGltZW91dCk7XG4gIHNlcnZlclxuICAgIC5zdG9wKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBsb2dnZXIuaW5mbyhcIlN0b3AgYXBwbGljYXRpb25cIik7XG4gICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgfSlcbiAgICAuY2F0Y2goZSA9PiB7XG4gICAgICBsb2dnZXIuZXJyb3IoZSk7XG4gICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfSk7XG59KTtcbiIsImltcG9ydCBkZWJ1ZyBmcm9tIFwiZGVidWdcIjtcblxuZXhwb3J0IGNsYXNzIF9Mb2dnZXIge1xuICBwdWJsaWMgc3RhdGljIGdldCBST09UX05BTUVTUEFDRSgpIHtcbiAgICByZXR1cm4gXCJvbnVzZXJcIjtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IE5BTUVTUEFDRV9TRVBFUkFUT1IoKSB7XG4gICAgcmV0dXJuIFwiOlwiO1xuICB9XG5cbiAgcHJpdmF0ZSBuYW1lc3BhY2U6IHN0cmluZztcblxuICBwcml2YXRlIF9kZWJ1Zz86IGRlYnVnLkRlYnVnZ2VyO1xuICBwcml2YXRlIF9pbmZvPzogZGVidWcuRGVidWdnZXI7XG4gIHByaXZhdGUgX3dhcm4/OiBkZWJ1Zy5EZWJ1Z2dlcjtcbiAgcHJpdmF0ZSBfZXJyb3I/OiBkZWJ1Zy5EZWJ1Z2dlcjtcblxuICBjb25zdHJ1Y3RvciguLi5uYW1lc3BhY2VzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMubmFtZXNwYWNlID0gW19Mb2dnZXIuUk9PVF9OQU1FU1BBQ0VdLmNvbmNhdCguLi5uYW1lc3BhY2VzKS5qb2luKF9Mb2dnZXIuTkFNRVNQQUNFX1NFUEVSQVRPUik7XG4gIH1cblxuICBkZWJ1Zyhmb3JtYXQ6IGFueSwgLi4ubXNnOiBhbnlbXSkge1xuICAgIGlmICghdGhpcy5fZGVidWcpIHtcbiAgICAgIHRoaXMuX2RlYnVnID0gZGVidWcodGhpcy5uYW1lc3BhY2UuY29uY2F0KF9Mb2dnZXIuTkFNRVNQQUNFX1NFUEVSQVRPUiwgXCJkZWJ1Z1wiKSk7XG4gICAgICB0aGlzLl9kZWJ1Zy5sb2cgPSBjb25zb2xlLmRlYnVnLmJpbmQoY29uc29sZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGVidWcoZm9ybWF0LCAuLi5tc2cpO1xuICB9XG5cbiAgaW5mbyhmb3JtYXQ6IGFueSwgLi4ubXNnOiBhbnlbXSkge1xuICAgIGlmICghdGhpcy5faW5mbykge1xuICAgICAgdGhpcy5faW5mbyA9IGRlYnVnKHRoaXMubmFtZXNwYWNlLmNvbmNhdChfTG9nZ2VyLk5BTUVTUEFDRV9TRVBFUkFUT1IsIFwiaW5mb1wiKSk7XG4gICAgICB0aGlzLl9pbmZvLmxvZyA9IGNvbnNvbGUuaW5mby5iaW5kKGNvbnNvbGUpO1xuICAgIH1cblxuICAgIHRoaXMuX2luZm8oZm9ybWF0LCAuLi5tc2cpO1xuICB9XG5cbiAgd2Fybihmb3JtYXQ6IGFueSwgLi4ubXNnOiBhbnlbXSkge1xuICAgIGlmICghdGhpcy5fd2Fybikge1xuICAgICAgdGhpcy5fd2FybiA9IGRlYnVnKHRoaXMubmFtZXNwYWNlLmNvbmNhdChfTG9nZ2VyLk5BTUVTUEFDRV9TRVBFUkFUT1IsIFwid2FyblwiKSk7XG4gICAgICB0aGlzLl93YXJuLmxvZyA9IGNvbnNvbGUud2Fybi5iaW5kKGNvbnNvbGUpO1xuICAgIH1cblxuICAgIHRoaXMuX3dhcm4oZm9ybWF0LCAuLi5tc2cpO1xuICB9XG5cbiAgZXJyb3IoZm9ybWF0OiBhbnksIC4uLm1zZzogYW55W10pIHtcbiAgICBpZiAoIXRoaXMuX2Vycm9yKSB7XG4gICAgICB0aGlzLl9lcnJvciA9IGRlYnVnKHRoaXMubmFtZXNwYWNlLmNvbmNhdChfTG9nZ2VyLk5BTUVTUEFDRV9TRVBFUkFUT1IsIFwiZXJyb3JcIikpO1xuICAgICAgdGhpcy5fZXJyb3IubG9nID0gY29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUpO1xuICAgIH1cblxuICAgIHRoaXMuX2Vycm9yKGZvcm1hdCwgLi4ubXNnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dnZXIge1xuICBwdWJsaWMgc3RhdGljIG5hbWVzcGFjZSguLi5uYW1lOiBzdHJpbmdbXSkge1xuICAgIHJldHVybiBuZXcgX0xvZ2dlciguLi5uYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5hYmxlQWxsKCkge1xuICAgIGRlYnVnLmVuYWJsZShgJHtfTG9nZ2VyLlJPT1RfTkFNRVNQQUNFfSR7X0xvZ2dlci5OQU1FU1BBQ0VfU0VQRVJBVE9SfSpgKTtcbiAgfVxufVxuIiwiaW1wb3J0IGNsaWVudCwgeyBNZXRyaWMgfSBmcm9tIFwicHJvbS1jbGllbnRcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5uYW1lc3BhY2UoXCJwcm9tZXRoZXVzXCIpO1xuXG5pbnRlcmZhY2UgUHJvbWV0aGV1c09iamVjdCB7XG4gIFtrZXk6IHN0cmluZ106IE1ldHJpYztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvbWV0aGV1czxUIGV4dGVuZHMgUHJvbWV0aGV1c09iamVjdD4ge1xuICBwdWJsaWMgc3RhdGljIENvdW50ZXIob3B0aW9uczogY2xpZW50LkNvdW50ZXJDb25maWd1cmF0aW9uKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBjcmVhdGUgbmV3IENvdW50ZXIgb2YgJHtvcHRpb25zLm5hbWV9YCk7XG4gICAgcmV0dXJuIG5ldyBjbGllbnQuQ291bnRlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgR2F1Z2Uob3B0aW9uczogY2xpZW50LkdhdWdlQ29uZmlndXJhdGlvbikge1xuICAgIGxvZ2dlci5kZWJ1ZyhgY3JlYXRlIG5ldyBHYXVnZSBvZiAke29wdGlvbnMubmFtZX1gKTtcbiAgICByZXR1cm4gbmV3IGNsaWVudC5HYXVnZShvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZ2lzdGVyOiBjbGllbnQuUmVnaXN0cnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc3RhdGlzdGljOiBUKSB7XG4gICAgdGhpcy5fcmVnaXN0ZXIgPSBuZXcgY2xpZW50LlJlZ2lzdHJ5KCk7XG4gIH1cblxuICBwdWJsaWMgbGFiZWwobGFiZWxzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XG4gICAgdGhpcy5fcmVnaXN0ZXIuc2V0RGVmYXVsdExhYmVscyhsYWJlbHMpO1xuICB9XG5cbiAgcHVibGljIGdldDxLIGV4dGVuZHMga2V5b2YgVD4obmFtZTogSyk6IFRbS10ge1xuICAgIHJldHVybiB0aGlzLl9zdGF0aXN0aWNbbmFtZV07XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXIoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5fc3RhdGlzdGljKS5tYXAoayA9PiB7XG4gICAgICBsb2dnZXIuZGVidWcoYHJlZ2lzdGVyICR7a30gdG8gcHJvbSByZWdpc3RlciBpbnN0YW5jZWApO1xuICAgICAgdGhpcy5fcmVnaXN0ZXIucmVnaXN0ZXJNZXRyaWModGhpcy5nZXQoaykpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFwcGx5RGVmYXVsdCgpIHtcbiAgICByZXR1cm4gY2xpZW50LmNvbGxlY3REZWZhdWx0TWV0cmljcyh7IHJlZ2lzdGVyOiB0aGlzLl9yZWdpc3RlciB9KTtcbiAgfVxuXG4gIHB1YmxpYyBtZXJnZShyZWdpc3RlcjogY2xpZW50LlJlZ2lzdHJ5KSB7XG4gICAgdGhpcy5fcmVnaXN0ZXIgPSBjbGllbnQuUmVnaXN0cnkubWVyZ2UoW3RoaXMuX3JlZ2lzdGVyLCByZWdpc3Rlcl0pO1xuICB9XG5cbiAgcHVibGljIGdldCBjb250ZW50VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9yZWdpc3Rlci5jb250ZW50VHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBleHBvcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0ZXIubWV0cmljcygpO1xuICB9XG59XG4iLCJpbXBvcnQgaHR0cHMgZnJvbSBcImh0dHBzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcXVlc3Qge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG9wdGlvbnM6IGh0dHBzLlJlcXVlc3RPcHRpb25zKSB7fVxuXG4gIG1ha2UoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaHR0cHNcbiAgICAgICAgLmdldCh0aGlzLm9wdGlvbnMsIHJlcyA9PiB7XG4gICAgICAgICAgbGV0IGRhdGEgPSBcIlwiO1xuXG4gICAgICAgICAgLy8gQSBjaHVuayBvZiBkYXRhIGhhcyBiZWVuIHJlY2lldmVkLlxuICAgICAgICAgIHJlcy5vbihcImRhdGFcIiwgY2h1bmsgPT4ge1xuICAgICAgICAgICAgZGF0YSArPSBjaHVuaztcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFRoZSB3aG9sZSByZXNwb25zZSBoYXMgYmVlbiByZWNlaXZlZC4gUHJpbnQgb3V0IHRoZSByZXN1bHQuXG4gICAgICAgICAgcmVzLm9uKFwiZW5kXCIsICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbihcImVycm9yXCIsIGVyciA9PiByZWplY3QoZXJyKSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBodHRwIGZyb20gXCJodHRwXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlciB7XG4gIHByaXZhdGUgaW5zdGFuY2U6IGh0dHAuU2VydmVyO1xuXG4gIGNvbnN0cnVjdG9yKGxpc3RlbmVyOiBodHRwLlJlcXVlc3RMaXN0ZW5lcikge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBodHRwLmNyZWF0ZVNlcnZlcihsaXN0ZW5lcik7XG4gIH1cblxuICBzdGFydChob3N0OiBzdHJpbmcsIHBvcnQ6IG51bWJlcik6IFByb21pc2U8eyBob3N0OiBzdHJpbmc7IHBvcnQ6IG51bWJlciB9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlcyA9PiB7XG4gICAgICB0aGlzLmluc3RhbmNlLmxpc3Rlbihwb3J0LCBob3N0LCAoKSA9PiB7XG4gICAgICAgIHJlcyh7IGhvc3QsIHBvcnQgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3AoKTogUHJvbWlzZTxFcnJvciB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxFcnJvciB8IHVuZGVmaW5lZD4oKHJlcywgcmVqKSA9PiB7XG4gICAgICB0aGlzLmluc3RhbmNlLmNsb3NlKGUgPT4gKGUgPyByZWooZSkgOiByZXMoKSkpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuaW1wb3J0IHV1aWQgZnJvbSBcInV1aWRcIjtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLm5hbWVzcGFjZShcInV0aWxzXCIpO1xuXG5leHBvcnQgY2xhc3MgU2VyaWFsaXphdGlvbiB7XG4gIHByaXZhdGUgX191dWlkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfX25hbWU6IHN0cmluZyA9IFwiU2VyaWFsaXphdGlvblwiKSB7XG4gICAgdGhpcy5fX3V1aWQgPSB1dWlkLnY0KCkuc2xpY2UoMCwgOCk7XG4gICAgbG9nZ2VyLmRlYnVnKGBjcmVhdGUgJHtfX25hbWV9WyR7dGhpcy5fX3V1aWR9XSBpbnN0YW5jZS4uLmApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCBvYmplY3QoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMubmFtZX1bJHt0aGlzLnV1aWR9XWA7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19uYW1lO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCB1dWlkKCkge1xuICAgIHJldHVybiB0aGlzLl9fdXVpZDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTzxUPiBleHRlbmRzIFNlcmlhbGl6YXRpb24ge1xuICBwdWJsaWMgc3RhdGljIHB0aW9uPFQ+KHQ6IFQgfCB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbmV3IE88VD4odCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHQ6IFQgfCB1bmRlZmluZWQpIHtcbiAgICBzdXBlcihcIk9wdGlvblwiKTtcbiAgICBsb2dnZXIuZGVidWcoYCAgY3JlYXRlIG9wdGlvbiB3aXRoICR7dH1gKTtcbiAgfVxuXG4gIGdldE9yRWxzZSh0OiBUKTogVCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy50ID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMudCA9PT0gbnVsbCB8fFxuICAgICAgKHR5cGVvZiB0aGlzLnQgPT09IFwibnVtYmVyXCIgJiYgKGlzTmFOKHRoaXMudCBhcyBhbnkpIHx8IGlzRmluaXRlKHRoaXMudCBhcyBhbnkpKSlcbiAgICApIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgJHt0aGlzLm9iamVjdH0gaXMgZmFsbGluZyBiYWNrIHRvIGRlZmF1bHQgKCR7dH0pYCk7XG4gICAgICByZXR1cm4gdDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmRlYnVnKGAke3RoaXMub2JqZWN0fSBpcyBleGlzdGApO1xuICAgICAgcmV0dXJuIHRoaXMudDtcbiAgICB9XG4gIH1cbn1cblxudHlwZSBGbjxSPiA9ICgpID0+IFI7XG5cbmV4cG9ydCBjbGFzcyBUPFI+IGV4dGVuZHMgU2VyaWFsaXphdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcnk8Uj4oZm46IEZuPFIgfCB1bmRlZmluZWQ+KSB7XG4gICAgcmV0dXJuIG5ldyBUPFI+KGZuKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JldHVybkRhdGE/OiBSO1xuICBwcml2YXRlIF9mYWlsZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmbjogRm48UiB8IHVuZGVmaW5lZD4pIHtcbiAgICBzdXBlcihcIlRyeVwiKTtcbiAgICBsb2dnZXIuZGVidWcoYCAgY3JlYXRlIHRyeSBjYXRjaCBvYmplY3RgKTtcblxuICAgIHRoaXMuX2ZhaWxlZCA9IGZhbHNlOyAvLyBkZWZhdWx0IHZhbHVlXG4gIH1cblxuICBwcml2YXRlIF9fcHJvY2VzcyhyPzogUikge1xuICAgIGlmICh0aGlzLl9yZXR1cm5EYXRhKSByZXR1cm47XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5mbigpO1xuICAgICAgbG9nZ2VyLmRlYnVnKGAke3RoaXMub2JqZWN0fSBpcyBzdWNjZXNzZnVsIHJ1bmApO1xuICAgICAgdGhpcy5fcmV0dXJuRGF0YSA9IHJlc3VsdDtcbiAgICAgIHRoaXMuX2ZhaWxlZCA9IGZhbHNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX2ZhaWxlZCA9IHRydWU7XG4gICAgICBsb2dnZXIud2FybihgJHt0aGlzLm9iamVjdH0gY2F0Y2hpbmcgc29tZSBlcnJvclxcbiAlT2AsIGUpO1xuICAgICAgdGhpcy5fcmV0dXJuRGF0YSA9IHI7XG4gICAgfVxuICB9XG5cbiAgZmFpbGVkKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuX19wcm9jZXNzKCk7XG4gICAgcmV0dXJuIHRoaXMuX2ZhaWxlZDtcbiAgfVxuXG4gIGdldE9yRWxzZShyOiBSKTogUiB7XG4gICAgdGhpcy5fX3Byb2Nlc3Mocik7XG4gICAgcmV0dXJuIE8ucHRpb24odGhpcy5fcmV0dXJuRGF0YSkuZ2V0T3JFbHNlKHIpO1xuICB9XG5cbiAgY2F0Y2goZm46IEZuPFI+KSB7XG4gICAgdGhpcy5fX3Byb2Nlc3MoKTtcbiAgICBpZiAodGhpcy5fZmFpbGVkKSByZXR1cm4gZm4oKTtcbiAgICBlbHNlIHJldHVybiB0aGlzLl9yZXR1cm5EYXRhIGFzIFI7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsdXN0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0dHlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidjhcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==