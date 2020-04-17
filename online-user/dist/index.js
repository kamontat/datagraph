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

module.exports = JSON.parse("{\"name\":\"onuser\",\"version\":\"1.2.0\",\"main\":\"index.ts\",\"author\":\"Kamontat Chantrachirathumrong\",\"license\":\"MIT\",\"private\":true,\"dependencies\":{\"pm2\":\"4.2.3\",\"prom-client\":\"11.5.3\",\"uuid\":\"3.4.0\"},\"devDependencies\":{\"@types/debug\":\"4.1.5\",\"@types/node\":\"13.7.1\",\"@types/uuid\":\"3.4.7\",\"debug\":\"4.1.1\",\"ts-loader\":\"6.2.1\",\"typescript\":\"3.7.5\",\"webpack\":\"4.41.6\",\"webpack-cli\":\"3.3.11\"},\"scripts\":{\"compile\":\"webpack\",\"start\":\"node ./dist/index.js\",\"start:docker\":\"docker run -it --rm -p 1234:1234 --name onuser gcr.io/the-tokenizer-268111/onuser\",\"docker\":\"docker build --tag gcr.io/the-tokenizer-268111/onuser .\",\"deploy:docker\":\"docker push gcr.io/the-tokenizer-268111/onuser\"}}");

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
var parser_1 = __importDefault(__webpack_require__(/*! ./parser */ "./src/parser.ts"));
var pjson = __webpack_require__(/*! ../package.json */ "./package.json");
// Logger.enableAll();
var logger = logger_1.default.namespace("server");
logger.debug("Starting application...");
logger.debug(JSON.stringify(pjson));
var production = {
    host: utils_1.O.ption(process.env.PAYMENTPLUS_HOST).getOrElse("paymentplus.heroapp.dev"),
    path: utils_1.O.ption(process.env.PAYMENTPLUS_PATH).getOrElse("/api/online-users/?format=json"),
    auth: {
        username: utils_1.O.ption(process.env.PAYMENTPLUS_AUTH_USERNAME).getOrElse("admin"),
        password: utils_1.O.ption(process.env.PAYMENTPLUS_AUTH_PASSWORD).getOrElse("admin")
    }
};
var staging = {
    host: utils_1.O.ption(process.env.PAYMENTPLUS_STAGING_HOST).getOrElse("paymentplus.heroapp.dev"),
    path: utils_1.O.ption(process.env.PAYMENTPLUS_STAGING_PATH).getOrElse("/api/online-users/?format=json"),
    auth: {
        username: utils_1.O.ption(process.env.PAYMENTPLUS_STAGING_AUTH_USERNAME).getOrElse("admin"),
        password: utils_1.O.ption(process.env.PAYMENTPLUS_STAGING_AUTH_PASSWORD).getOrElse("admin")
    }
};
var host = utils_1.O.ption(process.env.HOST).getOrElse("0.0.0.0");
var port = utils_1.T.ry(function () { return parseInt(utils_1.O.ption(process.env.PORT).getOrElse("")); }).getOrElse(1234);
var prom = new prom_1.default({
    paymentplus_online_user: prom_1.default.Gauge({
        name: "paymentplus_online_user_count",
        help: "currently online user in paymentplus",
        labelNames: ["env"]
    }),
    paymentplus_error: prom_1.default.Gauge({
        name: "paymentplus_system_failure",
        help: "paymentplus system failure",
        labelNames: ["env"]
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
        hostname: "" + production.host,
        path: "" + production.path,
        auth: production.auth.username + ":" + production.auth.password,
        port: 443,
        method: "GET",
        timeout: 5000 // ms
    });
    var requestStaging = new request_1.default({
        hostname: "" + staging.host,
        path: "" + staging.path,
        auth: staging.auth.username + ":" + staging.auth.password,
        port: 443,
        method: "GET",
        timeout: 5000 // ms
    });
    var prodPromise = request.make();
    var stagPromise = requestStaging.make();
    return Promise.all([prodPromise, stagPromise])
        .then(function (values) {
        var prod = values[0];
        var stag = values[1];
        utils_1.T.ry(function () {
            var parser = new parser_1.default(logger);
            var production = parser.parse(prod, "paymentplus production");
            var staging = parser.parse(stag, "paymentplus staging");
            prom.get("paymentplus_online_user").set({ env: "production" }, production.user.count, new Date());
            prom.get("paymentplus_error").set({ env: "production" }, production.status ? 0 : 1, new Date());
            prom.get("paymentplus_online_user").set({ env: "staging" }, staging.user.count, new Date());
            prom.get("paymentplus_error").set({ env: "staging" }, staging.status ? 0 : 1, new Date());
            res.writeHead(200, { "Content-Type": prom.contentType });
            res.end(prom.export());
        }).catch(function () {
            res.writeHead(200, { "Content-Type": prom.contentType });
            res.end(prom.export());
        });
    })
        .catch(function (e) {
        logger.error(e);
        res.writeHead(200, { "Content-Type": prom.contentType });
        res.end(prom.export());
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
        var namespaces = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            namespaces[_i] = arguments[_i];
        }
        this._namespace = namespaces.join(_Logger.NAMESPACE_SEPERATOR);
        this._fullNamespace = [_Logger.ROOT_NAMESPACE].concat(this._namespace).join(_Logger.NAMESPACE_SEPERATOR);
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
    Object.defineProperty(_Logger.prototype, "namespace", {
        get: function () {
            return this._namespace;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_Logger.prototype, "fullNamespace", {
        get: function () {
            return this._fullNamespace;
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
            this._debug = debug_1.default(this.fullNamespace.concat(_Logger.NAMESPACE_SEPERATOR, "debug"));
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
            this._info = debug_1.default(this.fullNamespace.concat(_Logger.NAMESPACE_SEPERATOR, "info"));
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
            this._warn = debug_1.default(this.fullNamespace.concat(_Logger.NAMESPACE_SEPERATOR, "warn"));
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
            this._error = debug_1.default(this.fullNamespace.concat(_Logger.NAMESPACE_SEPERATOR, "error"));
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
    Logger.append = function (logger) {
        var name = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            name[_i - 1] = arguments[_i];
        }
        return Logger.namespace.apply(Logger, __spreadArrays([logger.namespace], name));
    };
    Logger.enableAll = function () {
        debug_1.default.enable("" + _Logger.ROOT_NAMESPACE + _Logger.NAMESPACE_SEPERATOR + "*");
    };
    return Logger;
}());
exports.default = Logger;


/***/ }),

/***/ "./src/parser.ts":
/*!***********************!*\
  !*** ./src/parser.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var PaymentPlusParser = /** @class */ (function () {
    function PaymentPlusParser(logger) {
        this.logger = logger;
    }
    PaymentPlusParser.prototype.parse = function (data, name) {
        this.logger.debug(name + " raw response is " + data);
        var trycatch = utils_1.T.ry(function () { return JSON.parse(data); });
        var response = trycatch.getOrElse({ count: 0 });
        var error = trycatch.failed();
        if (error)
            this.logger.error("cannot parse data from " + name);
        else
            this.logger.debug(name + " current data is %o", response);
        if (response.detail) {
            this.logger.error(name + " response contains error: " + response.detail);
            response.count = 0;
        }
        return {
            status: !error,
            user: {
                count: response.count
            }
        };
    };
    return PaymentPlusParser;
}());
exports.default = PaymentPlusParser;


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
var https_1 = __importDefault(__webpack_require__(/*! https */ "https"));
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var Request = /** @class */ (function (_super) {
    __extends(Request, _super);
    function Request(options) {
        var _this = _super.call(this, "Request", logger_1.default.namespace("request")) || this;
        _this.options = options;
        _this.logger.debug("  with %o", options);
        return _this;
    }
    Request.prototype.make = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var req = https_1.default.request(_this.options, function (res) {
                _this.logger.debug("information: code=" + res.statusCode + " msg=" + res.statusMessage);
                var statusCode = res.statusCode;
                // const contentType = res.headers["content-type"];
                var error;
                if (statusCode !== 200) {
                    error = new Error("Request Failed.\n" + ("Status Code: " + statusCode));
                }
                if (error) {
                    _this.logger.error(error.message);
                    // Consume response data to free up memory
                    res.resume();
                    return reject(error);
                }
                res.setEncoding("utf8");
                var data = "";
                res.on("error", function (err) {
                    _this.logger.debug("received error response, logging to console");
                    _this.logger.error("Error: %O", err);
                    return reject(err);
                });
                // A chunk of data has been recieved.
                res.on("data", function (chunk) {
                    _this.logger.debug("received new data chunk, add to data object");
                    data += chunk;
                });
                // The whole response has been received. Print out the result.
                res.on("end", function () {
                    _this.logger.debug("received all response, running Promise resolve");
                    return resolve(data);
                });
                res.on("close", function () { return _this.logger.debug("connection closed"); });
                res.on("readable", function () { return _this.logger.debug("receive readable events"); });
            });
            req.on("error", function (e) {
                _this.logger.error(e);
            });
            req.end();
        });
    };
    return Request;
}(utils_1.Serialization));
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
var _logger = logger_1.default.namespace("utils");
var Serialization = /** @class */ (function () {
    function Serialization(__name, logger) {
        if (__name === void 0) { __name = "Serialization"; }
        if (logger === void 0) { logger = _logger; }
        this.__name = __name;
        this.logger = logger;
        this.__uuid = uuid_1.default.v4().slice(0, 8);
        this.logger = logger_1.default.append(logger, this.__uuid);
        this.logger.debug("create " + __name + " instance...");
    }
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
        _this.logger.debug("  create option with " + t);
        return _this;
    }
    O.ption = function (t) {
        return new O(t);
    };
    O.prototype.getOrElse = function (t) {
        if (this.t === undefined) {
            this.logger.debug("is 'undefined' so falling back to default (" + t + ")");
            return t;
        }
        else if (this.t === null) {
            this.logger.debug(this.name + " is 'null' so falling back to default (" + t + ")");
            return t;
        }
        else if (typeof this.t === "number" && isNaN(this.t)) {
            this.logger.debug(this.name + " is 'NaN' so falling back to default (" + t + ")");
            return t;
        }
        else {
            this.logger.debug(this.name + " is exist");
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
        _this.logger.debug("  create try catch object");
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
            this.logger.debug("is successful run");
            this._returnData = result;
            this._failed = false;
        }
        catch (e) {
            this._failed = true;
            this.logger.warn("catching some error\n %O", e);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpbnRyZWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iaW50cmVlcy9saWIvYmludHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmludHJlZXMvbGliL3JidHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmludHJlZXMvbGliL3RyZWViYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvY29tbW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9ub2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMtZmxhZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi9idWNrZXRHZW5lcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvY2x1c3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL2NvdW50ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi9kZWZhdWx0TWV0cmljcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL2dhdWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvaGlzdG9ncmFtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvbWV0cmljQWdncmVnYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi9tZXRyaWNzL2V2ZW50TG9vcExhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3MvaGVhcFNpemVBbmRVc2VkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvbWV0cmljcy9oZWFwU3BhY2VzU2l6ZUFuZFVzZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi9tZXRyaWNzL2hlbHBlcnMvcHJvY2Vzc01ldHJpY3NIZWxwZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvbWV0cmljcy9oZWxwZXJzL3NhZmVNZW1vcnlVc2FnZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3Mvb3NNZW1vcnlIZWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvbWV0cmljcy9vc01lbW9yeUhlYXBMaW51eC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3MvcHJvY2Vzc0NwdVRvdGFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvbWV0cmljcy9wcm9jZXNzSGFuZGxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3MvcHJvY2Vzc01heEZpbGVEZXNjcmlwdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3MvcHJvY2Vzc09wZW5GaWxlRGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi9tZXRyaWNzL3Byb2Nlc3NSZXF1ZXN0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3MvcHJvY2Vzc1N0YXJ0VGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL21ldHJpY3MvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL3B1c2hnYXRld2F5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvcmVnaXN0cnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi9zdW1tYXJ5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9tLWNsaWVudC9saWIvdGltZVdpbmRvd1F1YW50aWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvbS1jbGllbnQvbGliL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb20tY2xpZW50L2xpYi92YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdXBwb3J0cy1jb2xvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGRpZ2VzdC90ZGlnZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL3YxLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9wYXJzZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlcXVlc3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2x1c3RlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImNyeXB0b1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwib3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHR5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXJsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXRpbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInY4XCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUNBQXlDLFFBQVE7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNyT0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLE9BQU87QUFDbEIsWUFBWSxNQUFNO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pLQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQU8sQ0FBQyxvREFBVTs7QUFFbkMsT0FBTyxXQUFXOztBQUVsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RRQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBTyxDQUFDLHlEQUFJOztBQUVwQztBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLGNBQWM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLGtDQUFrQztBQUMvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw2Q0FBNkMsU0FBUztBQUN0RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2Q0FBNkMsU0FBUztBQUN0RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3pRQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixtQkFBTyxDQUFDLHlEQUFjO0FBQ3hDLENBQUM7QUFDRCxrQkFBa0IsbUJBQU8sQ0FBQyxtREFBVztBQUNyQzs7Ozs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUNBOztBQUVBLFlBQVksbUJBQU8sQ0FBQyxnQkFBSztBQUN6QixhQUFhLG1CQUFPLENBQUMsa0JBQU07O0FBRTNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixtQkFBTyxDQUFDLDhEQUFnQjs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCw0REFBNEQ7QUFDNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQyxJQUFJOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLDJCQUEyQjs7QUFFbkM7QUFDQTtBQUNBLGlEQUFpRCxFQUFFO0FBQ25ELHNCQUFzQixXQUFXLElBQUksS0FBSzs7QUFFMUM7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQU8sQ0FBQyxvREFBVTs7QUFFbkMsT0FBTyxXQUFXOztBQUVsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoUWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLG1CQUFtQixtQkFBTyxDQUFDLGtFQUFnQjtBQUMzQyxtQkFBbUIsbUJBQU8sQ0FBQyxrRUFBZ0I7QUFDM0Msc0JBQXNCLG1CQUFPLENBQUMsa0VBQWdCO0FBQzlDLDZCQUE2QixtQkFBTyxDQUFDLHNFQUFrQjs7QUFFdkQsa0JBQWtCLG1CQUFPLENBQUMsZ0VBQWU7QUFDekMsZ0JBQWdCLG1CQUFPLENBQUMsNERBQWE7QUFDckMsb0JBQW9CLG1CQUFPLENBQUMsb0VBQWlCO0FBQzdDLGtCQUFrQixtQkFBTyxDQUFDLGdFQUFlO0FBQ3pDLHNCQUFzQixtQkFBTyxDQUFDLHdFQUFtQjs7QUFFakQsd0JBQXdCLG1CQUFPLENBQUMsa0ZBQXdCO0FBQ3hELDZCQUE2QixtQkFBTyxDQUFDLGtGQUF3Qjs7QUFFN0QsZ0NBQWdDLG1CQUFPLENBQUMsOEVBQXNCOztBQUU5RCxzQkFBc0IsbUJBQU8sQ0FBQyxvRkFBeUI7QUFDdkQsNkJBQTZCLG1CQUFPLENBQUMsZ0VBQWU7Ozs7Ozs7Ozs7Ozs7QUN4QnZDOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFdBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9CYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsbUJBQU8sQ0FBQyx3QkFBUztBQUNqQyxpQkFBaUIsbUJBQU8sQ0FBQyw4REFBWTtBQUNyQyxPQUFPLFVBQVUsR0FBRyxtQkFBTyxDQUFDLHNEQUFRO0FBQ3BDLE9BQU8sY0FBYyxHQUFHLG1CQUFPLENBQUMsZ0ZBQXFCOztBQUVyRDtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQsWUFBWSxVQUFVO0FBQ3RCLGFBQWEsZ0JBQWdCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE1BQU07QUFDbEI7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSx5QkFBeUI7QUFDckM7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxXQUFXO0FBQzdEO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQWdDOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEVBQUU7QUFDRjs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ2hNQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYixhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsT0FBTyxpQkFBaUIsR0FBRyxtQkFBTyxDQUFDLDhEQUFZO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsR0FBRyxtQkFBTyxDQUFDLHNEQUFROztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsR0FBRyxtQkFBTyxDQUFDLGtFQUFjOztBQUUxQjtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWSxPQUFPO0FBQ25CLFlBQVksZUFBZTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkIsWUFBWSxjQUFjO0FBQzFCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxtQkFBbUI7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELHVCQUF1QjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLG1CQUFtQiw0QkFBNEI7QUFDL0M7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDbkxhOztBQUViLHdCQUF3QixtQkFBTyxDQUFDLDRGQUEyQjtBQUMzRCx5QkFBeUIsbUJBQU8sQ0FBQyw4RkFBNEI7QUFDN0QscUJBQXFCLG1CQUFPLENBQUMsc0ZBQXdCO0FBQ3JELG1DQUFtQyxtQkFBTyxDQUFDLGtIQUFzQztBQUNqRixrQ0FBa0MsbUJBQU8sQ0FBQyxnSEFBcUM7QUFDL0UscUJBQXFCLG1CQUFPLENBQUMsc0ZBQXdCO0FBQ3JELHVCQUF1QixtQkFBTyxDQUFDLDBGQUEwQjtBQUN6RCx3QkFBd0IsbUJBQU8sQ0FBQyw0RkFBMkI7QUFDM0Qsd0JBQXdCLG1CQUFPLENBQUMsNEZBQTJCO0FBQzNELDhCQUE4QixtQkFBTyxDQUFDLHdHQUFpQztBQUN2RSxnQkFBZ0IsbUJBQU8sQ0FBQyw0RUFBbUI7QUFDM0MsT0FBTyxpQkFBaUIsR0FBRyxtQkFBTyxDQUFDLDhEQUFZO0FBQy9DLE9BQU8sOENBQThDLEdBQUcsbUJBQU8sQ0FBQyxzREFBUTs7QUFFeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNwRkE7QUFDQTtBQUNBO0FBQ2E7O0FBRWIsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLE9BQU8saUJBQWlCLEdBQUcsbUJBQU8sQ0FBQyw4REFBWTtBQUMvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEdBQUcsbUJBQU8sQ0FBQyxzREFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsR0FBRyxtQkFBTyxDQUFDLGtFQUFjOztBQUUxQjtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWSxPQUFPO0FBQ25CLFlBQVksZUFBZTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWSxPQUFPO0FBQ25CLFlBQVksY0FBYztBQUMxQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksT0FBTztBQUNuQixZQUFZLGNBQWM7QUFDMUIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWSxPQUFPO0FBQ25CLFlBQVksY0FBYztBQUMxQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdURBQXVELG1CQUFtQjtBQUMxRTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsdUJBQXVCO0FBQ3ZFO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QixPQUFPO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDdlFBO0FBQ0E7QUFDQTtBQUNhOztBQUViLGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTtBQUMzQix1QkFBdUIsbUJBQU8sQ0FBQyw4REFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxHQUFHLG1CQUFPLENBQUMsc0RBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEdBQUcsbUJBQU8sQ0FBQyxrRUFBYzs7QUFFMUI7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksT0FBTztBQUNuQixZQUFZLHNCQUFzQjtBQUNsQyxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxJQUFJOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixPQUFPO0FBQ1AscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksT0FBTztBQUNuQixjQUFjO0FBQ2Q7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQix3QkFBd0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxrQ0FBa0M7QUFDdEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxlQUFlO0FBQzFEO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxlQUFlO0FBQzFELDhDQUE4QyxlQUFlO0FBQzdELGdEQUFnRCxlQUFlO0FBQy9EO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDbFVhOztBQUViLE9BQU8sc0JBQXNCLEdBQUcsbUJBQU8sQ0FBQyxzREFBUTs7QUFFaEQ7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixZQUFZLFNBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCLEdBQUcsSUFBSTtBQUM1QyxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVLFdBQVc7QUFDbEM7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoRmE7O0FBRWIsY0FBYyxtQkFBTyxDQUFDLHlEQUFVOztBQUVoQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDOUJhOztBQUViLGNBQWMsbUJBQU8sQ0FBQyx5REFBVTtBQUNoQyx3QkFBd0IsbUJBQU8sQ0FBQyxvR0FBMkI7O0FBRTNEO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RFYTs7QUFFYixjQUFjLG1CQUFPLENBQUMseURBQVU7QUFDaEM7O0FBRUE7QUFDQSxNQUFNLG1CQUFPLENBQUMsY0FBSTtBQUNsQixDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsMERBQTBELFdBQVc7QUFDckUsQ0FBQzs7QUFFRCx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFdBQVc7QUFDL0M7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQSxZQUFZO0FBQ1osV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsbUJBQW1CO0FBQ3hDLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQSxLQUFLLG1CQUFtQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzRWE7O0FBRWI7QUFDQTs7QUFFQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUIsR0FBRztBQUNILGNBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDYmE7O0FBRWIsY0FBYyxtQkFBTyxDQUFDLHlEQUFVO0FBQ2hDLHFCQUFxQixtQkFBTyxDQUFDLHdGQUFxQjtBQUNsRCx3QkFBd0IsbUJBQU8sQ0FBQyxvR0FBMkI7O0FBRTNEOztBQUVBLDhDQUE4QztBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQ2E7O0FBRWIsY0FBYyxtQkFBTyxDQUFDLHlEQUFVO0FBQ2hDLFdBQVcsbUJBQU8sQ0FBQyxjQUFJOztBQUV2Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQSx1Q0FBdUM7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3hFYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyw2REFBWTtBQUNwQztBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3JEYTs7QUFFYixPQUFPLHdCQUF3QixHQUFHLG1CQUFPLENBQUMsZ0hBQWlDO0FBQzNFLE9BQU8sZ0JBQWdCLEdBQUcsbUJBQU8sQ0FBQyxnSEFBaUM7QUFDbkUsY0FBYyxtQkFBTyxDQUFDLHlEQUFVOztBQUVoQztBQUNBOztBQUVBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hEYTs7QUFFYixjQUFjLG1CQUFPLENBQUMseURBQVU7QUFDaEMsV0FBVyxtQkFBTyxDQUFDLGNBQUk7O0FBRXZCOztBQUVBLHVDQUF1QztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUN2Q2E7O0FBRWIsY0FBYyxtQkFBTyxDQUFDLHlEQUFVO0FBQ2hDLFdBQVcsbUJBQU8sQ0FBQyxjQUFJO0FBQ3ZCLGdCQUFnQixtQkFBTyxDQUFDLHdCQUFTOztBQUVqQzs7QUFFQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ2pDYTtBQUNiLGNBQWMsbUJBQU8sQ0FBQyx5REFBVTtBQUNoQyxPQUFPLHdCQUF3QixHQUFHLG1CQUFPLENBQUMsZ0hBQWlDO0FBQzNFLE9BQU8sZ0JBQWdCLEdBQUcsbUJBQU8sQ0FBQyxnSEFBaUM7O0FBRW5FO0FBQ0E7O0FBRUEsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3hDYTs7QUFFYixjQUFjLG1CQUFPLENBQUMseURBQVU7QUFDaEM7O0FBRUE7O0FBRUEsdUNBQXVDO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQzNCYTs7QUFFYixjQUFjLG1CQUFPLENBQUMseURBQVU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx1Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ3ZDYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsZ0JBQUs7QUFDekIsYUFBYSxtQkFBTyxDQUFDLGtCQUFNO0FBQzNCLGNBQWMsbUJBQU8sQ0FBQyxvQkFBTztBQUM3QixPQUFPLGlCQUFpQixHQUFHLG1CQUFPLENBQUMsOERBQVk7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGVBQWUsZUFBZTtBQUMvQztBQUNBLEdBQUcsRUFBRSw2QkFBNkI7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0EsbUNBQW1DLG9CQUFvQjtBQUN2RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyx3QkFBd0IsR0FBRyxtQ0FBbUM7QUFDNUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ2pHYTtBQUNiLE9BQU8sbUJBQW1CLEdBQUcsbUJBQU8sQ0FBQyxzREFBUTs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0EseUJBQXlCLEtBQUssR0FBRyx3QkFBd0I7QUFDekQseUJBQXlCLEtBQUssR0FBRyxVQUFVO0FBQzNDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsSUFBSSxJQUFJLGtDQUFrQztBQUMzRDs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLEVBQUUsd0NBQXdDO0FBQzlEOztBQUVBLGlCQUFpQixXQUFXLEdBQUcsNEJBQTRCO0FBQzNEO0FBQ0EsZ0JBQWdCLGNBQWM7QUFDOUI7QUFDQSxnQkFBZ0IsWUFBWTtBQUM1Qjs7QUFFQSxZQUFZLEtBQUssSUFBSSxLQUFLLElBQUksT0FBTztBQUNyQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLCtDQUErQztBQUNoRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixlQUFlO0FBQ3BDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9KQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYixhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsT0FBTyxpQkFBaUIsR0FBRyxtQkFBTyxDQUFDLDhEQUFZO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEdBQUcsbUJBQU8sQ0FBQyxzREFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsR0FBRyxtQkFBTyxDQUFDLGtFQUFjO0FBQzFCLDRCQUE0QixtQkFBTyxDQUFDLG9GQUF1Qjs7QUFFM0Qsb0NBQW9DOztBQUVwQztBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWSxPQUFPO0FBQ25CLFlBQVksc0JBQXNCO0FBQ2xDLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksT0FBTztBQUNuQixjQUFjO0FBQ2Q7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixjQUFjLFNBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVCQUF1QjtBQUNqRDtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsYUFBYTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLGFBQWE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0Msa0NBQWtDO0FBQ3RFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNsU2E7O0FBRWIsT0FBTyxVQUFVLEdBQUcsbUJBQU8sQ0FBQyxrREFBUzs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQzdEYTs7QUFFYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGLFlBQVksTUFBTTtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsSUFBSTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sY0FBYztBQUNyQixhQUFhLFFBQVEsR0FBRyxnQkFBZ0I7QUFDeEM7QUFDQSxZQUFZLFFBQVEsR0FBRyxnQkFBZ0I7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0ZBQStGLFlBQVksUUFBUSxFQUFFO0FBQ3JIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxFQUFFO0FBQ2QsWUFBWSxFQUFFO0FBQ2QsY0FBYyxVQUFVO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDcElhOztBQUViLGFBQWEsbUJBQU8sQ0FBQyxrQkFBTTs7QUFFM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixNQUFNLHlDQUF5QztBQUNuRTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsRUFBRTtBQUNGOzs7Ozs7Ozs7Ozs7O0FDaENhO0FBQ2IsV0FBVyxtQkFBTyxDQUFDLGNBQUk7QUFDdkIsZ0JBQWdCLG1CQUFPLENBQUMsa0RBQVU7O0FBRWxDLE9BQU8sSUFBSTs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUNBQWlDLEdBQUc7QUFDcEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLGtEQUFVOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLHlDQUF5QyxnQkFBZ0IsRUFBRTtBQUMzRCxLQUFLO0FBQ0wseUNBQXlDLGNBQWMsbUJBQW1CLEVBQUUsRUFBRTtBQUM5RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixlQUFlO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixlQUFlO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsT0FBTyxFQUFFO0FBQ25EO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsb0NBQW9DO0FBQ3BDLEtBQUs7QUFDTCx5Q0FBeUM7QUFDekMsS0FBSztBQUNMLCtDQUErQztBQUMvQyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxPQUFPLEVBQUU7QUFDbkQsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxlQUFlLEVBQUU7QUFDM0Q7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzWUEsU0FBUyxtQkFB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Qzs7Ozs7Ozs7Ozs7QUNBQSwrQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgUkJUcmVlOiByZXF1aXJlKCcuL2xpYi9yYnRyZWUnKSxcbiAgICBCaW5UcmVlOiByZXF1aXJlKCcuL2xpYi9iaW50cmVlJylcbn07XG4iLCJcbnZhciBUcmVlQmFzZSA9IHJlcXVpcmUoJy4vdHJlZWJhc2UnKTtcblxuZnVuY3Rpb24gTm9kZShkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLmxlZnQgPSBudWxsO1xuICAgIHRoaXMucmlnaHQgPSBudWxsO1xufVxuXG5Ob2RlLnByb3RvdHlwZS5nZXRfY2hpbGQgPSBmdW5jdGlvbihkaXIpIHtcbiAgICByZXR1cm4gZGlyID8gdGhpcy5yaWdodCA6IHRoaXMubGVmdDtcbn07XG5cbk5vZGUucHJvdG90eXBlLnNldF9jaGlsZCA9IGZ1bmN0aW9uKGRpciwgdmFsKSB7XG4gICAgaWYoZGlyKSB7XG4gICAgICAgIHRoaXMucmlnaHQgPSB2YWw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmxlZnQgPSB2YWw7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gQmluVHJlZShjb21wYXJhdG9yKSB7XG4gICAgdGhpcy5fcm9vdCA9IG51bGw7XG4gICAgdGhpcy5fY29tcGFyYXRvciA9IGNvbXBhcmF0b3I7XG4gICAgdGhpcy5zaXplID0gMDtcbn1cblxuQmluVHJlZS5wcm90b3R5cGUgPSBuZXcgVHJlZUJhc2UoKTtcblxuLy8gcmV0dXJucyB0cnVlIGlmIGluc2VydGVkLCBmYWxzZSBpZiBkdXBsaWNhdGVcbkJpblRyZWUucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZih0aGlzLl9yb290ID09PSBudWxsKSB7XG4gICAgICAgIC8vIGVtcHR5IHRyZWVcbiAgICAgICAgdGhpcy5fcm9vdCA9IG5ldyBOb2RlKGRhdGEpO1xuICAgICAgICB0aGlzLnNpemUrKztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGRpciA9IDA7XG5cbiAgICAvLyBzZXR1cFxuICAgIHZhciBwID0gbnVsbDsgLy8gcGFyZW50XG4gICAgdmFyIG5vZGUgPSB0aGlzLl9yb290O1xuXG4gICAgLy8gc2VhcmNoIGRvd25cbiAgICB3aGlsZSh0cnVlKSB7XG4gICAgICAgIGlmKG5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIGluc2VydCBuZXcgbm9kZSBhdCB0aGUgYm90dG9tXG4gICAgICAgICAgICBub2RlID0gbmV3IE5vZGUoZGF0YSk7XG4gICAgICAgICAgICBwLnNldF9jaGlsZChkaXIsIG5vZGUpO1xuICAgICAgICAgICAgcmV0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSsrO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdG9wIGlmIGZvdW5kXG4gICAgICAgIGlmKHRoaXMuX2NvbXBhcmF0b3Iobm9kZS5kYXRhLCBkYXRhKSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZGlyID0gdGhpcy5fY29tcGFyYXRvcihub2RlLmRhdGEsIGRhdGEpIDwgMDtcblxuICAgICAgICAvLyB1cGRhdGUgaGVscGVyc1xuICAgICAgICBwID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IG5vZGUuZ2V0X2NoaWxkKGRpcik7XG4gICAgfVxufTtcblxuLy8gcmV0dXJucyB0cnVlIGlmIHJlbW92ZWQsIGZhbHNlIGlmIG5vdCBmb3VuZFxuQmluVHJlZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmKHRoaXMuX3Jvb3QgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBoZWFkID0gbmV3IE5vZGUodW5kZWZpbmVkKTsgLy8gZmFrZSB0cmVlIHJvb3RcbiAgICB2YXIgbm9kZSA9IGhlYWQ7XG4gICAgbm9kZS5yaWdodCA9IHRoaXMuX3Jvb3Q7XG4gICAgdmFyIHAgPSBudWxsOyAvLyBwYXJlbnRcbiAgICB2YXIgZm91bmQgPSBudWxsOyAvLyBmb3VuZCBpdGVtXG4gICAgdmFyIGRpciA9IDE7XG5cbiAgICB3aGlsZShub2RlLmdldF9jaGlsZChkaXIpICE9PSBudWxsKSB7XG4gICAgICAgIHAgPSBub2RlO1xuICAgICAgICBub2RlID0gbm9kZS5nZXRfY2hpbGQoZGlyKTtcbiAgICAgICAgdmFyIGNtcCA9IHRoaXMuX2NvbXBhcmF0b3IoZGF0YSwgbm9kZS5kYXRhKTtcbiAgICAgICAgZGlyID0gY21wID4gMDtcblxuICAgICAgICBpZihjbXAgPT09IDApIHtcbiAgICAgICAgICAgIGZvdW5kID0gbm9kZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKGZvdW5kICE9PSBudWxsKSB7XG4gICAgICAgIGZvdW5kLmRhdGEgPSBub2RlLmRhdGE7XG4gICAgICAgIHAuc2V0X2NoaWxkKHAucmlnaHQgPT09IG5vZGUsIG5vZGUuZ2V0X2NoaWxkKG5vZGUubGVmdCA9PT0gbnVsbCkpO1xuXG4gICAgICAgIHRoaXMuX3Jvb3QgPSBoZWFkLnJpZ2h0O1xuICAgICAgICB0aGlzLnNpemUtLTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBCaW5UcmVlO1xuXG4iLCJcbnZhciBUcmVlQmFzZSA9IHJlcXVpcmUoJy4vdHJlZWJhc2UnKTtcblxuZnVuY3Rpb24gTm9kZShkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLmxlZnQgPSBudWxsO1xuICAgIHRoaXMucmlnaHQgPSBudWxsO1xuICAgIHRoaXMucmVkID0gdHJ1ZTtcbn1cblxuTm9kZS5wcm90b3R5cGUuZ2V0X2NoaWxkID0gZnVuY3Rpb24oZGlyKSB7XG4gICAgcmV0dXJuIGRpciA/IHRoaXMucmlnaHQgOiB0aGlzLmxlZnQ7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5zZXRfY2hpbGQgPSBmdW5jdGlvbihkaXIsIHZhbCkge1xuICAgIGlmKGRpcikge1xuICAgICAgICB0aGlzLnJpZ2h0ID0gdmFsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5sZWZ0ID0gdmFsO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIFJCVHJlZShjb21wYXJhdG9yKSB7XG4gICAgdGhpcy5fcm9vdCA9IG51bGw7XG4gICAgdGhpcy5fY29tcGFyYXRvciA9IGNvbXBhcmF0b3I7XG4gICAgdGhpcy5zaXplID0gMDtcbn1cblxuUkJUcmVlLnByb3RvdHlwZSA9IG5ldyBUcmVlQmFzZSgpO1xuXG4vLyByZXR1cm5zIHRydWUgaWYgaW5zZXJ0ZWQsIGZhbHNlIGlmIGR1cGxpY2F0ZVxuUkJUcmVlLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIHJldCA9IGZhbHNlO1xuXG4gICAgaWYodGhpcy5fcm9vdCA9PT0gbnVsbCkge1xuICAgICAgICAvLyBlbXB0eSB0cmVlXG4gICAgICAgIHRoaXMuX3Jvb3QgPSBuZXcgTm9kZShkYXRhKTtcbiAgICAgICAgcmV0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaXplKys7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgaGVhZCA9IG5ldyBOb2RlKHVuZGVmaW5lZCk7IC8vIGZha2UgdHJlZSByb290XG5cbiAgICAgICAgdmFyIGRpciA9IDA7XG4gICAgICAgIHZhciBsYXN0ID0gMDtcblxuICAgICAgICAvLyBzZXR1cFxuICAgICAgICB2YXIgZ3AgPSBudWxsOyAvLyBncmFuZHBhcmVudFxuICAgICAgICB2YXIgZ2dwID0gaGVhZDsgLy8gZ3JhbmQtZ3JhbmQtcGFyZW50XG4gICAgICAgIHZhciBwID0gbnVsbDsgLy8gcGFyZW50XG4gICAgICAgIHZhciBub2RlID0gdGhpcy5fcm9vdDtcbiAgICAgICAgZ2dwLnJpZ2h0ID0gdGhpcy5fcm9vdDtcblxuICAgICAgICAvLyBzZWFyY2ggZG93blxuICAgICAgICB3aGlsZSh0cnVlKSB7XG4gICAgICAgICAgICBpZihub2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgLy8gaW5zZXJ0IG5ldyBub2RlIGF0IHRoZSBib3R0b21cbiAgICAgICAgICAgICAgICBub2RlID0gbmV3IE5vZGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgcC5zZXRfY2hpbGQoZGlyLCBub2RlKTtcbiAgICAgICAgICAgICAgICByZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihpc19yZWQobm9kZS5sZWZ0KSAmJiBpc19yZWQobm9kZS5yaWdodCkpIHtcbiAgICAgICAgICAgICAgICAvLyBjb2xvciBmbGlwXG4gICAgICAgICAgICAgICAgbm9kZS5yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5vZGUubGVmdC5yZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBub2RlLnJpZ2h0LnJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBmaXggcmVkIHZpb2xhdGlvblxuICAgICAgICAgICAgaWYoaXNfcmVkKG5vZGUpICYmIGlzX3JlZChwKSkge1xuICAgICAgICAgICAgICAgIHZhciBkaXIyID0gZ2dwLnJpZ2h0ID09PSBncDtcblxuICAgICAgICAgICAgICAgIGlmKG5vZGUgPT09IHAuZ2V0X2NoaWxkKGxhc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIGdncC5zZXRfY2hpbGQoZGlyMiwgc2luZ2xlX3JvdGF0ZShncCwgIWxhc3QpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdncC5zZXRfY2hpbGQoZGlyMiwgZG91YmxlX3JvdGF0ZShncCwgIWxhc3QpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjbXAgPSB0aGlzLl9jb21wYXJhdG9yKG5vZGUuZGF0YSwgZGF0YSk7XG5cbiAgICAgICAgICAgIC8vIHN0b3AgaWYgZm91bmRcbiAgICAgICAgICAgIGlmKGNtcCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsYXN0ID0gZGlyO1xuICAgICAgICAgICAgZGlyID0gY21wIDwgMDtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGhlbHBlcnNcbiAgICAgICAgICAgIGlmKGdwICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZ2dwID0gZ3A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBncCA9IHA7XG4gICAgICAgICAgICBwID0gbm9kZTtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmdldF9jaGlsZChkaXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHJvb3RcbiAgICAgICAgdGhpcy5fcm9vdCA9IGhlYWQucmlnaHQ7XG4gICAgfVxuXG4gICAgLy8gbWFrZSByb290IGJsYWNrXG4gICAgdGhpcy5fcm9vdC5yZWQgPSBmYWxzZTtcblxuICAgIHJldHVybiByZXQ7XG59O1xuXG4vLyByZXR1cm5zIHRydWUgaWYgcmVtb3ZlZCwgZmFsc2UgaWYgbm90IGZvdW5kXG5SQlRyZWUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZih0aGlzLl9yb290ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgaGVhZCA9IG5ldyBOb2RlKHVuZGVmaW5lZCk7IC8vIGZha2UgdHJlZSByb290XG4gICAgdmFyIG5vZGUgPSBoZWFkO1xuICAgIG5vZGUucmlnaHQgPSB0aGlzLl9yb290O1xuICAgIHZhciBwID0gbnVsbDsgLy8gcGFyZW50XG4gICAgdmFyIGdwID0gbnVsbDsgLy8gZ3JhbmQgcGFyZW50XG4gICAgdmFyIGZvdW5kID0gbnVsbDsgLy8gZm91bmQgaXRlbVxuICAgIHZhciBkaXIgPSAxO1xuXG4gICAgd2hpbGUobm9kZS5nZXRfY2hpbGQoZGlyKSAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgbGFzdCA9IGRpcjtcblxuICAgICAgICAvLyB1cGRhdGUgaGVscGVyc1xuICAgICAgICBncCA9IHA7XG4gICAgICAgIHAgPSBub2RlO1xuICAgICAgICBub2RlID0gbm9kZS5nZXRfY2hpbGQoZGlyKTtcblxuICAgICAgICB2YXIgY21wID0gdGhpcy5fY29tcGFyYXRvcihkYXRhLCBub2RlLmRhdGEpO1xuXG4gICAgICAgIGRpciA9IGNtcCA+IDA7XG5cbiAgICAgICAgLy8gc2F2ZSBmb3VuZCBub2RlXG4gICAgICAgIGlmKGNtcCA9PT0gMCkge1xuICAgICAgICAgICAgZm91bmQgPSBub2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHVzaCB0aGUgcmVkIG5vZGUgZG93blxuICAgICAgICBpZighaXNfcmVkKG5vZGUpICYmICFpc19yZWQobm9kZS5nZXRfY2hpbGQoZGlyKSkpIHtcbiAgICAgICAgICAgIGlmKGlzX3JlZChub2RlLmdldF9jaGlsZCghZGlyKSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3IgPSBzaW5nbGVfcm90YXRlKG5vZGUsIGRpcik7XG4gICAgICAgICAgICAgICAgcC5zZXRfY2hpbGQobGFzdCwgc3IpO1xuICAgICAgICAgICAgICAgIHAgPSBzcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoIWlzX3JlZChub2RlLmdldF9jaGlsZCghZGlyKSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2libGluZyA9IHAuZ2V0X2NoaWxkKCFsYXN0KTtcbiAgICAgICAgICAgICAgICBpZihzaWJsaW5nICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFpc19yZWQoc2libGluZy5nZXRfY2hpbGQoIWxhc3QpKSAmJiAhaXNfcmVkKHNpYmxpbmcuZ2V0X2NoaWxkKGxhc3QpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29sb3IgZmxpcFxuICAgICAgICAgICAgICAgICAgICAgICAgcC5yZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmcucmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXIyID0gZ3AucmlnaHQgPT09IHA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzX3JlZChzaWJsaW5nLmdldF9jaGlsZChsYXN0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncC5zZXRfY2hpbGQoZGlyMiwgZG91YmxlX3JvdGF0ZShwLCBsYXN0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGlzX3JlZChzaWJsaW5nLmdldF9jaGlsZCghbGFzdCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3Auc2V0X2NoaWxkKGRpcjIsIHNpbmdsZV9yb3RhdGUocCwgbGFzdCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbnN1cmUgY29ycmVjdCBjb2xvcmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdwYyA9IGdwLmdldF9jaGlsZChkaXIyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdwYy5yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3BjLmxlZnQucmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBncGMucmlnaHQucmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZXBsYWNlIGFuZCByZW1vdmUgaWYgZm91bmRcbiAgICBpZihmb3VuZCAhPT0gbnVsbCkge1xuICAgICAgICBmb3VuZC5kYXRhID0gbm9kZS5kYXRhO1xuICAgICAgICBwLnNldF9jaGlsZChwLnJpZ2h0ID09PSBub2RlLCBub2RlLmdldF9jaGlsZChub2RlLmxlZnQgPT09IG51bGwpKTtcbiAgICAgICAgdGhpcy5zaXplLS07XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHJvb3QgYW5kIG1ha2UgaXQgYmxhY2tcbiAgICB0aGlzLl9yb290ID0gaGVhZC5yaWdodDtcbiAgICBpZih0aGlzLl9yb290ICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3Jvb3QucmVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvdW5kICE9PSBudWxsO1xufTtcblxuZnVuY3Rpb24gaXNfcmVkKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZSAhPT0gbnVsbCAmJiBub2RlLnJlZDtcbn1cblxuZnVuY3Rpb24gc2luZ2xlX3JvdGF0ZShyb290LCBkaXIpIHtcbiAgICB2YXIgc2F2ZSA9IHJvb3QuZ2V0X2NoaWxkKCFkaXIpO1xuXG4gICAgcm9vdC5zZXRfY2hpbGQoIWRpciwgc2F2ZS5nZXRfY2hpbGQoZGlyKSk7XG4gICAgc2F2ZS5zZXRfY2hpbGQoZGlyLCByb290KTtcblxuICAgIHJvb3QucmVkID0gdHJ1ZTtcbiAgICBzYXZlLnJlZCA9IGZhbHNlO1xuXG4gICAgcmV0dXJuIHNhdmU7XG59XG5cbmZ1bmN0aW9uIGRvdWJsZV9yb3RhdGUocm9vdCwgZGlyKSB7XG4gICAgcm9vdC5zZXRfY2hpbGQoIWRpciwgc2luZ2xlX3JvdGF0ZShyb290LmdldF9jaGlsZCghZGlyKSwgIWRpcikpO1xuICAgIHJldHVybiBzaW5nbGVfcm90YXRlKHJvb3QsIGRpcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUkJUcmVlO1xuIiwiXG5mdW5jdGlvbiBUcmVlQmFzZSgpIHt9XG5cbi8vIHJlbW92ZXMgYWxsIG5vZGVzIGZyb20gdGhlIHRyZWVcblRyZWVCYXNlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3Jvb3QgPSBudWxsO1xuICAgIHRoaXMuc2l6ZSA9IDA7XG59O1xuXG4vLyByZXR1cm5zIG5vZGUgZGF0YSBpZiBmb3VuZCwgbnVsbCBvdGhlcndpc2VcblRyZWVCYXNlLnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciByZXMgPSB0aGlzLl9yb290O1xuXG4gICAgd2hpbGUocmVzICE9PSBudWxsKSB7XG4gICAgICAgIHZhciBjID0gdGhpcy5fY29tcGFyYXRvcihkYXRhLCByZXMuZGF0YSk7XG4gICAgICAgIGlmKGMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlcyA9IHJlcy5nZXRfY2hpbGQoYyA+IDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyByZXR1cm5zIGl0ZXJhdG9yIHRvIG5vZGUgaWYgZm91bmQsIG51bGwgb3RoZXJ3aXNlXG5UcmVlQmFzZS5wcm90b3R5cGUuZmluZEl0ZXIgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIHJlcyA9IHRoaXMuX3Jvb3Q7XG4gICAgdmFyIGl0ZXIgPSB0aGlzLml0ZXJhdG9yKCk7XG5cbiAgICB3aGlsZShyZXMgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIGMgPSB0aGlzLl9jb21wYXJhdG9yKGRhdGEsIHJlcy5kYXRhKTtcbiAgICAgICAgaWYoYyA9PT0gMCkge1xuICAgICAgICAgICAgaXRlci5fY3Vyc29yID0gcmVzO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpdGVyLl9hbmNlc3RvcnMucHVzaChyZXMpO1xuICAgICAgICAgICAgcmVzID0gcmVzLmdldF9jaGlsZChjID4gMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbi8vIFJldHVybnMgYW4gaXRlcmF0b3IgdG8gdGhlIHRyZWUgbm9kZSBhdCBvciBpbW1lZGlhdGVseSBhZnRlciB0aGUgaXRlbVxuVHJlZUJhc2UucHJvdG90eXBlLmxvd2VyQm91bmQgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgdmFyIGN1ciA9IHRoaXMuX3Jvb3Q7XG4gICAgdmFyIGl0ZXIgPSB0aGlzLml0ZXJhdG9yKCk7XG4gICAgdmFyIGNtcCA9IHRoaXMuX2NvbXBhcmF0b3I7XG5cbiAgICB3aGlsZShjdXIgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIGMgPSBjbXAoaXRlbSwgY3VyLmRhdGEpO1xuICAgICAgICBpZihjID09PSAwKSB7XG4gICAgICAgICAgICBpdGVyLl9jdXJzb3IgPSBjdXI7XG4gICAgICAgICAgICByZXR1cm4gaXRlcjtcbiAgICAgICAgfVxuICAgICAgICBpdGVyLl9hbmNlc3RvcnMucHVzaChjdXIpO1xuICAgICAgICBjdXIgPSBjdXIuZ2V0X2NoaWxkKGMgPiAwKTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGk9aXRlci5fYW5jZXN0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIGN1ciA9IGl0ZXIuX2FuY2VzdG9yc1tpXTtcbiAgICAgICAgaWYoY21wKGl0ZW0sIGN1ci5kYXRhKSA8IDApIHtcbiAgICAgICAgICAgIGl0ZXIuX2N1cnNvciA9IGN1cjtcbiAgICAgICAgICAgIGl0ZXIuX2FuY2VzdG9ycy5sZW5ndGggPSBpO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpdGVyLl9hbmNlc3RvcnMubGVuZ3RoID0gMDtcbiAgICByZXR1cm4gaXRlcjtcbn07XG5cbi8vIFJldHVybnMgYW4gaXRlcmF0b3IgdG8gdGhlIHRyZWUgbm9kZSBpbW1lZGlhdGVseSBhZnRlciB0aGUgaXRlbVxuVHJlZUJhc2UucHJvdG90eXBlLnVwcGVyQm91bmQgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgdmFyIGl0ZXIgPSB0aGlzLmxvd2VyQm91bmQoaXRlbSk7XG4gICAgdmFyIGNtcCA9IHRoaXMuX2NvbXBhcmF0b3I7XG5cbiAgICB3aGlsZShpdGVyLmRhdGEoKSAhPT0gbnVsbCAmJiBjbXAoaXRlci5kYXRhKCksIGl0ZW0pID09PSAwKSB7XG4gICAgICAgIGl0ZXIubmV4dCgpO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVyO1xufTtcblxuLy8gcmV0dXJucyBudWxsIGlmIHRyZWUgaXMgZW1wdHlcblRyZWVCYXNlLnByb3RvdHlwZS5taW4gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzID0gdGhpcy5fcm9vdDtcbiAgICBpZihyZXMgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgd2hpbGUocmVzLmxlZnQgIT09IG51bGwpIHtcbiAgICAgICAgcmVzID0gcmVzLmxlZnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5kYXRhO1xufTtcblxuLy8gcmV0dXJucyBudWxsIGlmIHRyZWUgaXMgZW1wdHlcblRyZWVCYXNlLnByb3RvdHlwZS5tYXggPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzID0gdGhpcy5fcm9vdDtcbiAgICBpZihyZXMgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgd2hpbGUocmVzLnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgIHJlcyA9IHJlcy5yaWdodDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzLmRhdGE7XG59O1xuXG4vLyByZXR1cm5zIGEgbnVsbCBpdGVyYXRvclxuLy8gY2FsbCBuZXh0KCkgb3IgcHJldigpIHRvIHBvaW50IHRvIGFuIGVsZW1lbnRcblRyZWVCYXNlLnByb3RvdHlwZS5pdGVyYXRvciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgSXRlcmF0b3IodGhpcyk7XG59O1xuXG4vLyBjYWxscyBjYiBvbiBlYWNoIG5vZGUncyBkYXRhLCBpbiBvcmRlclxuVHJlZUJhc2UucHJvdG90eXBlLmVhY2ggPSBmdW5jdGlvbihjYikge1xuICAgIHZhciBpdD10aGlzLml0ZXJhdG9yKCksIGRhdGE7XG4gICAgd2hpbGUoKGRhdGEgPSBpdC5uZXh0KCkpICE9PSBudWxsKSB7XG4gICAgICAgIGNiKGRhdGEpO1xuICAgIH1cbn07XG5cbi8vIGNhbGxzIGNiIG9uIGVhY2ggbm9kZSdzIGRhdGEsIGluIHJldmVyc2Ugb3JkZXJcblRyZWVCYXNlLnByb3RvdHlwZS5yZWFjaCA9IGZ1bmN0aW9uKGNiKSB7XG4gICAgdmFyIGl0PXRoaXMuaXRlcmF0b3IoKSwgZGF0YTtcbiAgICB3aGlsZSgoZGF0YSA9IGl0LnByZXYoKSkgIT09IG51bGwpIHtcbiAgICAgICAgY2IoZGF0YSk7XG4gICAgfVxufTtcblxuXG5mdW5jdGlvbiBJdGVyYXRvcih0cmVlKSB7XG4gICAgdGhpcy5fdHJlZSA9IHRyZWU7XG4gICAgdGhpcy5fYW5jZXN0b3JzID0gW107XG4gICAgdGhpcy5fY3Vyc29yID0gbnVsbDtcbn1cblxuSXRlcmF0b3IucHJvdG90eXBlLmRhdGEgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fY3Vyc29yICE9PSBudWxsID8gdGhpcy5fY3Vyc29yLmRhdGEgOiBudWxsO1xufTtcblxuLy8gaWYgbnVsbC1pdGVyYXRvciwgcmV0dXJucyBmaXJzdCBub2RlXG4vLyBvdGhlcndpc2UsIHJldHVybnMgbmV4dCBub2RlXG5JdGVyYXRvci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuX2N1cnNvciA9PT0gbnVsbCkge1xuICAgICAgICB2YXIgcm9vdCA9IHRoaXMuX3RyZWUuX3Jvb3Q7XG4gICAgICAgIGlmKHJvb3QgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21pbk5vZGUocm9vdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmKHRoaXMuX2N1cnNvci5yaWdodCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gbm8gZ3JlYXRlciBub2RlIGluIHN1YnRyZWUsIGdvIHVwIHRvIHBhcmVudFxuICAgICAgICAgICAgLy8gaWYgY29taW5nIGZyb20gYSByaWdodCBjaGlsZCwgY29udGludWUgdXAgdGhlIHN0YWNrXG4gICAgICAgICAgICB2YXIgc2F2ZTtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBzYXZlID0gdGhpcy5fY3Vyc29yO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2FuY2VzdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3Vyc29yID0gdGhpcy5fYW5jZXN0b3JzLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3Vyc29yID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSh0aGlzLl9jdXJzb3IucmlnaHQgPT09IHNhdmUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZ2V0IHRoZSBuZXh0IG5vZGUgZnJvbSB0aGUgc3VidHJlZVxuICAgICAgICAgICAgdGhpcy5fYW5jZXN0b3JzLnB1c2godGhpcy5fY3Vyc29yKTtcbiAgICAgICAgICAgIHRoaXMuX21pbk5vZGUodGhpcy5fY3Vyc29yLnJpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fY3Vyc29yICE9PSBudWxsID8gdGhpcy5fY3Vyc29yLmRhdGEgOiBudWxsO1xufTtcblxuLy8gaWYgbnVsbC1pdGVyYXRvciwgcmV0dXJucyBsYXN0IG5vZGVcbi8vIG90aGVyd2lzZSwgcmV0dXJucyBwcmV2aW91cyBub2RlXG5JdGVyYXRvci5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uKCkge1xuICAgIGlmKHRoaXMuX2N1cnNvciA9PT0gbnVsbCkge1xuICAgICAgICB2YXIgcm9vdCA9IHRoaXMuX3RyZWUuX3Jvb3Q7XG4gICAgICAgIGlmKHJvb3QgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX21heE5vZGUocm9vdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmKHRoaXMuX2N1cnNvci5sZWZ0ID09PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgc2F2ZTtcbiAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICBzYXZlID0gdGhpcy5fY3Vyc29yO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2FuY2VzdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3Vyc29yID0gdGhpcy5fYW5jZXN0b3JzLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3Vyc29yID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSh0aGlzLl9jdXJzb3IubGVmdCA9PT0gc2F2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbmNlc3RvcnMucHVzaCh0aGlzLl9jdXJzb3IpO1xuICAgICAgICAgICAgdGhpcy5fbWF4Tm9kZSh0aGlzLl9jdXJzb3IubGVmdCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2N1cnNvciAhPT0gbnVsbCA/IHRoaXMuX2N1cnNvci5kYXRhIDogbnVsbDtcbn07XG5cbkl0ZXJhdG9yLnByb3RvdHlwZS5fbWluTm9kZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgd2hpbGUoc3RhcnQubGVmdCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hbmNlc3RvcnMucHVzaChzdGFydCk7XG4gICAgICAgIHN0YXJ0ID0gc3RhcnQubGVmdDtcbiAgICB9XG4gICAgdGhpcy5fY3Vyc29yID0gc3RhcnQ7XG59O1xuXG5JdGVyYXRvci5wcm90b3R5cGUuX21heE5vZGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHdoaWxlKHN0YXJ0LnJpZ2h0ICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FuY2VzdG9ycy5wdXNoKHN0YXJ0KTtcbiAgICAgICAgc3RhcnQgPSBzdGFydC5yaWdodDtcbiAgICB9XG4gICAgdGhpcy5fY3Vyc29yID0gc3RhcnQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyZWVCYXNlO1xuXG4iLCIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwO1xudmFyIG0gPSBzICogNjA7XG52YXIgaCA9IG0gKiA2MDtcbnZhciBkID0gaCAqIDI0O1xudmFyIHcgPSBkICogNztcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodmFsKSkge1xuICAgIHJldHVybiBvcHRpb25zLmxvbmcgPyBmbXRMb25nKHZhbCkgOiBmbXRTaG9ydCh2YWwpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAndmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSB2YWxpZCBudW1iZXIuIHZhbD0nICtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHZhbClcbiAgKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHN0ci5sZW5ndGggPiAxMDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1hdGNoID0gL14oLT8oPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHdlZWtzP3x3fHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKFxuICAgIHN0clxuICApO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeTtcbiAgICBjYXNlICd3ZWVrcyc6XG4gICAgY2FzZSAnd2Vlayc6XG4gICAgY2FzZSAndyc6XG4gICAgICByZXR1cm4gbiAqIHc7XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkJzpcbiAgICAgIHJldHVybiBuICogZDtcbiAgICBjYXNlICdob3Vycyc6XG4gICAgY2FzZSAnaG91cic6XG4gICAgY2FzZSAnaHJzJzpcbiAgICBjYXNlICdocic6XG4gICAgY2FzZSAnaCc6XG4gICAgICByZXR1cm4gbiAqIGg7XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW5zJzpcbiAgICBjYXNlICdtaW4nOlxuICAgIGNhc2UgJ20nOlxuICAgICAgcmV0dXJuIG4gKiBtO1xuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjcyc6XG4gICAgY2FzZSAnc2VjJzpcbiAgICBjYXNlICdzJzpcbiAgICAgIHJldHVybiBuICogcztcbiAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgIGNhc2UgJ21pbGxpc2Vjb25kJzpcbiAgICBjYXNlICdtc2Vjcyc6XG4gICAgY2FzZSAnbXNlYyc6XG4gICAgY2FzZSAnbXMnOlxuICAgICAgcmV0dXJuIG47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRTaG9ydChtcykge1xuICB2YXIgbXNBYnMgPSBNYXRoLmFicyhtcyk7XG4gIGlmIChtc0FicyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJztcbiAgfVxuICBpZiAobXNBYnMgPj0gaCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJztcbiAgfVxuICByZXR1cm4gbXMgKyAnbXMnO1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xuICB2YXIgbXNBYnMgPSBNYXRoLmFicyhtcyk7XG4gIGlmIChtc0FicyA+PSBkKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGQsICdkYXknKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gaCkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBoLCAnaG91cicpO1xuICB9XG4gIGlmIChtc0FicyA+PSBtKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIG0sICdtaW51dGUnKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gcykge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBzLCAnc2Vjb25kJyk7XG4gIH1cbiAgcmV0dXJuIG1zICsgJyBtcyc7XG59XG5cbi8qKlxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXG4gKi9cblxuZnVuY3Rpb24gcGx1cmFsKG1zLCBtc0FicywgbiwgbmFtZSkge1xuICB2YXIgaXNQbHVyYWwgPSBtc0FicyA+PSBuICogMS41O1xuICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG4pICsgJyAnICsgbmFtZSArIChpc1BsdXJhbCA/ICdzJyA6ICcnKTtcbn1cbiIsIi8qIGVzbGludC1lbnYgYnJvd3NlciAqL1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqL1xuXG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuXHQnIzAwMDBDQycsXG5cdCcjMDAwMEZGJyxcblx0JyMwMDMzQ0MnLFxuXHQnIzAwMzNGRicsXG5cdCcjMDA2NkNDJyxcblx0JyMwMDY2RkYnLFxuXHQnIzAwOTlDQycsXG5cdCcjMDA5OUZGJyxcblx0JyMwMENDMDAnLFxuXHQnIzAwQ0MzMycsXG5cdCcjMDBDQzY2Jyxcblx0JyMwMENDOTknLFxuXHQnIzAwQ0NDQycsXG5cdCcjMDBDQ0ZGJyxcblx0JyMzMzAwQ0MnLFxuXHQnIzMzMDBGRicsXG5cdCcjMzMzM0NDJyxcblx0JyMzMzMzRkYnLFxuXHQnIzMzNjZDQycsXG5cdCcjMzM2NkZGJyxcblx0JyMzMzk5Q0MnLFxuXHQnIzMzOTlGRicsXG5cdCcjMzNDQzAwJyxcblx0JyMzM0NDMzMnLFxuXHQnIzMzQ0M2NicsXG5cdCcjMzNDQzk5Jyxcblx0JyMzM0NDQ0MnLFxuXHQnIzMzQ0NGRicsXG5cdCcjNjYwMENDJyxcblx0JyM2NjAwRkYnLFxuXHQnIzY2MzNDQycsXG5cdCcjNjYzM0ZGJyxcblx0JyM2NkNDMDAnLFxuXHQnIzY2Q0MzMycsXG5cdCcjOTkwMENDJyxcblx0JyM5OTAwRkYnLFxuXHQnIzk5MzNDQycsXG5cdCcjOTkzM0ZGJyxcblx0JyM5OUNDMDAnLFxuXHQnIzk5Q0MzMycsXG5cdCcjQ0MwMDAwJyxcblx0JyNDQzAwMzMnLFxuXHQnI0NDMDA2NicsXG5cdCcjQ0MwMDk5Jyxcblx0JyNDQzAwQ0MnLFxuXHQnI0NDMDBGRicsXG5cdCcjQ0MzMzAwJyxcblx0JyNDQzMzMzMnLFxuXHQnI0NDMzM2NicsXG5cdCcjQ0MzMzk5Jyxcblx0JyNDQzMzQ0MnLFxuXHQnI0NDMzNGRicsXG5cdCcjQ0M2NjAwJyxcblx0JyNDQzY2MzMnLFxuXHQnI0NDOTkwMCcsXG5cdCcjQ0M5OTMzJyxcblx0JyNDQ0NDMDAnLFxuXHQnI0NDQ0MzMycsXG5cdCcjRkYwMDAwJyxcblx0JyNGRjAwMzMnLFxuXHQnI0ZGMDA2NicsXG5cdCcjRkYwMDk5Jyxcblx0JyNGRjAwQ0MnLFxuXHQnI0ZGMDBGRicsXG5cdCcjRkYzMzAwJyxcblx0JyNGRjMzMzMnLFxuXHQnI0ZGMzM2NicsXG5cdCcjRkYzMzk5Jyxcblx0JyNGRjMzQ0MnLFxuXHQnI0ZGMzNGRicsXG5cdCcjRkY2NjAwJyxcblx0JyNGRjY2MzMnLFxuXHQnI0ZGOTkwMCcsXG5cdCcjRkY5OTMzJyxcblx0JyNGRkNDMDAnLFxuXHQnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcblx0Ly8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuXHQvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuXHQvLyBleHBsaWNpdGx5XG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiAod2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJyB8fCB3aW5kb3cucHJvY2Vzcy5fX253anMpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBjb2xvcnMuXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIElzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG5cdC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG5cdHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuXHRcdC8vIElzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcblx0XHQodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuXHRcdC8vIElzIGZpcmVmb3ggPj0gdjMxP1xuXHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuXHRcdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuXHRcdC8vIERvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcblx0XHQodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuXHRhcmdzWzBdID0gKHRoaXMudXNlQ29sb3JzID8gJyVjJyA6ICcnKSArXG5cdFx0dGhpcy5uYW1lc3BhY2UgK1xuXHRcdCh0aGlzLnVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKSArXG5cdFx0YXJnc1swXSArXG5cdFx0KHRoaXMudXNlQ29sb3JzID8gJyVjICcgOiAnICcpICtcblx0XHQnKycgKyBtb2R1bGUuZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG5cdGlmICghdGhpcy51c2VDb2xvcnMpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcblx0YXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0Jyk7XG5cblx0Ly8gVGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcblx0Ly8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuXHQvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cblx0bGV0IGluZGV4ID0gMDtcblx0bGV0IGxhc3RDID0gMDtcblx0YXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIG1hdGNoID0+IHtcblx0XHRpZiAobWF0Y2ggPT09ICclJScpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aW5kZXgrKztcblx0XHRpZiAobWF0Y2ggPT09ICclYycpIHtcblx0XHRcdC8vIFdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuXHRcdFx0Ly8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcblx0XHRcdGxhc3RDID0gaW5kZXg7XG5cdFx0fVxuXHR9KTtcblxuXHRhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIGxvZyguLi5hcmdzKSB7XG5cdC8vIFRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG5cdC8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG5cdHJldHVybiB0eXBlb2YgY29uc29sZSA9PT0gJ29iamVjdCcgJiZcblx0XHRjb25zb2xlLmxvZyAmJlxuXHRcdGNvbnNvbGUubG9nKC4uLmFyZ3MpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG5cdHRyeSB7XG5cdFx0aWYgKG5hbWVzcGFjZXMpIHtcblx0XHRcdGV4cG9ydHMuc3RvcmFnZS5zZXRJdGVtKCdkZWJ1ZycsIG5hbWVzcGFjZXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxvYWQoKSB7XG5cdGxldCByO1xuXHR0cnkge1xuXHRcdHIgPSBleHBvcnRzLnN0b3JhZ2UuZ2V0SXRlbSgnZGVidWcnKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTd2FsbG93XG5cdFx0Ly8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG5cdH1cblxuXHQvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG5cdGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuXHRcdHIgPSBwcm9jZXNzLmVudi5ERUJVRztcblx0fVxuXG5cdHJldHVybiByO1xufVxuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcblx0dHJ5IHtcblx0XHQvLyBUVk1MS2l0IChBcHBsZSBUViBKUyBSdW50aW1lKSBkb2VzIG5vdCBoYXZlIGEgd2luZG93IG9iamVjdCwganVzdCBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0XG5cdFx0Ly8gVGhlIEJyb3dzZXIgYWxzbyBoYXMgbG9jYWxTdG9yYWdlIGluIHRoZSBnbG9iYWwgY29udGV4dC5cblx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29tbW9uJykoZXhwb3J0cyk7XG5cbmNvbnN0IHtmb3JtYXR0ZXJzfSA9IG1vZHVsZS5leHBvcnRzO1xuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbiAodikge1xuXHR0cnkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyb3IubWVzc2FnZTtcblx0fVxufTtcbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICovXG5cbmZ1bmN0aW9uIHNldHVwKGVudikge1xuXHRjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnO1xuXHRjcmVhdGVEZWJ1Zy5kZWZhdWx0ID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmNvZXJjZSA9IGNvZXJjZTtcblx0Y3JlYXRlRGVidWcuZGlzYWJsZSA9IGRpc2FibGU7XG5cdGNyZWF0ZURlYnVnLmVuYWJsZSA9IGVuYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cdGNyZWF0ZURlYnVnLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblxuXHRPYmplY3Qua2V5cyhlbnYpLmZvckVhY2goa2V5ID0+IHtcblx0XHRjcmVhdGVEZWJ1Z1trZXldID0gZW52W2tleV07XG5cdH0pO1xuXG5cdC8qKlxuXHQqIEFjdGl2ZSBgZGVidWdgIGluc3RhbmNlcy5cblx0Ki9cblx0Y3JlYXRlRGVidWcuaW5zdGFuY2VzID0gW107XG5cblx0LyoqXG5cdCogVGhlIGN1cnJlbnRseSBhY3RpdmUgZGVidWcgbW9kZSBuYW1lcywgYW5kIG5hbWVzIHRvIHNraXAuXG5cdCovXG5cblx0Y3JlYXRlRGVidWcubmFtZXMgPSBbXTtcblx0Y3JlYXRlRGVidWcuc2tpcHMgPSBbXTtcblxuXHQvKipcblx0KiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG5cdCpcblx0KiBWYWxpZCBrZXkgbmFtZXMgYXJlIGEgc2luZ2xlLCBsb3dlciBvciB1cHBlci1jYXNlIGxldHRlciwgaS5lLiBcIm5cIiBhbmQgXCJOXCIuXG5cdCovXG5cdGNyZWF0ZURlYnVnLmZvcm1hdHRlcnMgPSB7fTtcblxuXHQvKipcblx0KiBTZWxlY3RzIGEgY29sb3IgZm9yIGEgZGVidWcgbmFtZXNwYWNlXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZSBUaGUgbmFtZXNwYWNlIHN0cmluZyBmb3IgdGhlIGZvciB0aGUgZGVidWcgaW5zdGFuY2UgdG8gYmUgY29sb3JlZFxuXHQqIEByZXR1cm4ge051bWJlcnxTdHJpbmd9IEFuIEFOU0kgY29sb3IgY29kZSBmb3IgdGhlIGdpdmVuIG5hbWVzcGFjZVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBzZWxlY3RDb2xvcihuYW1lc3BhY2UpIHtcblx0XHRsZXQgaGFzaCA9IDA7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzcGFjZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0aGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgbmFtZXNwYWNlLmNoYXJDb2RlQXQoaSk7XG5cdFx0XHRoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuXHRcdH1cblxuXHRcdHJldHVybiBjcmVhdGVEZWJ1Zy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBjcmVhdGVEZWJ1Zy5jb2xvcnMubGVuZ3RoXTtcblx0fVxuXHRjcmVhdGVEZWJ1Zy5zZWxlY3RDb2xvciA9IHNlbGVjdENvbG9yO1xuXG5cdC8qKlxuXHQqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuXHQqXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuXHQqIEByZXR1cm4ge0Z1bmN0aW9ufVxuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGNyZWF0ZURlYnVnKG5hbWVzcGFjZSkge1xuXHRcdGxldCBwcmV2VGltZTtcblxuXHRcdGZ1bmN0aW9uIGRlYnVnKC4uLmFyZ3MpIHtcblx0XHRcdC8vIERpc2FibGVkP1xuXHRcdFx0aWYgKCFkZWJ1Zy5lbmFibGVkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgc2VsZiA9IGRlYnVnO1xuXG5cdFx0XHQvLyBTZXQgYGRpZmZgIHRpbWVzdGFtcFxuXHRcdFx0Y29uc3QgY3VyciA9IE51bWJlcihuZXcgRGF0ZSgpKTtcblx0XHRcdGNvbnN0IG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcblx0XHRcdHNlbGYuZGlmZiA9IG1zO1xuXHRcdFx0c2VsZi5wcmV2ID0gcHJldlRpbWU7XG5cdFx0XHRzZWxmLmN1cnIgPSBjdXJyO1xuXHRcdFx0cHJldlRpbWUgPSBjdXJyO1xuXG5cdFx0XHRhcmdzWzBdID0gY3JlYXRlRGVidWcuY29lcmNlKGFyZ3NbMF0pO1xuXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3NbMF0gIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdC8vIEFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG5cdFx0XHRcdGFyZ3MudW5zaGlmdCgnJU8nKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcblx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHRhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgKG1hdGNoLCBmb3JtYXQpID0+IHtcblx0XHRcdFx0Ly8gSWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuXHRcdFx0XHRpZiAobWF0Y2ggPT09ICclJScpIHtcblx0XHRcdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0XHRcdH1cblx0XHRcdFx0aW5kZXgrKztcblx0XHRcdFx0Y29uc3QgZm9ybWF0dGVyID0gY3JlYXRlRGVidWcuZm9ybWF0dGVyc1tmb3JtYXRdO1xuXHRcdFx0XHRpZiAodHlwZW9mIGZvcm1hdHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdGNvbnN0IHZhbCA9IGFyZ3NbaW5kZXhdO1xuXHRcdFx0XHRcdG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuXHRcdFx0XHRcdC8vIE5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcblx0XHRcdFx0XHRhcmdzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRcdFx0aW5kZXgtLTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcblx0XHRcdGNyZWF0ZURlYnVnLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuXHRcdFx0Y29uc3QgbG9nRm4gPSBzZWxmLmxvZyB8fCBjcmVhdGVEZWJ1Zy5sb2c7XG5cdFx0XHRsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcblx0XHR9XG5cblx0XHRkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG5cdFx0ZGVidWcuZW5hYmxlZCA9IGNyZWF0ZURlYnVnLmVuYWJsZWQobmFtZXNwYWNlKTtcblx0XHRkZWJ1Zy51c2VDb2xvcnMgPSBjcmVhdGVEZWJ1Zy51c2VDb2xvcnMoKTtcblx0XHRkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG5cdFx0ZGVidWcuZGVzdHJveSA9IGRlc3Ryb3k7XG5cdFx0ZGVidWcuZXh0ZW5kID0gZXh0ZW5kO1xuXHRcdC8vIERlYnVnLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuXHRcdC8vIGRlYnVnLnJhd0xvZyA9IHJhd0xvZztcblxuXHRcdC8vIGVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG5cdFx0aWYgKHR5cGVvZiBjcmVhdGVEZWJ1Zy5pbml0ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjcmVhdGVEZWJ1Zy5pbml0KGRlYnVnKTtcblx0XHR9XG5cblx0XHRjcmVhdGVEZWJ1Zy5pbnN0YW5jZXMucHVzaChkZWJ1Zyk7XG5cblx0XHRyZXR1cm4gZGVidWc7XG5cdH1cblxuXHRmdW5jdGlvbiBkZXN0cm95KCkge1xuXHRcdGNvbnN0IGluZGV4ID0gY3JlYXRlRGVidWcuaW5zdGFuY2VzLmluZGV4T2YodGhpcyk7XG5cdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0Y3JlYXRlRGVidWcuaW5zdGFuY2VzLnNwbGljZShpbmRleCwgMSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0ZnVuY3Rpb24gZXh0ZW5kKG5hbWVzcGFjZSwgZGVsaW1pdGVyKSB7XG5cdFx0Y29uc3QgbmV3RGVidWcgPSBjcmVhdGVEZWJ1Zyh0aGlzLm5hbWVzcGFjZSArICh0eXBlb2YgZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/ICc6JyA6IGRlbGltaXRlcikgKyBuYW1lc3BhY2UpO1xuXHRcdG5ld0RlYnVnLmxvZyA9IHRoaXMubG9nO1xuXHRcdHJldHVybiBuZXdEZWJ1Zztcblx0fVxuXG5cdC8qKlxuXHQqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcblx0KiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuXHQqXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuXHRcdGNyZWF0ZURlYnVnLnNhdmUobmFtZXNwYWNlcyk7XG5cblx0XHRjcmVhdGVEZWJ1Zy5uYW1lcyA9IFtdO1xuXHRcdGNyZWF0ZURlYnVnLnNraXBzID0gW107XG5cblx0XHRsZXQgaTtcblx0XHRjb25zdCBzcGxpdCA9ICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBuYW1lc3BhY2VzIDogJycpLnNwbGl0KC9bXFxzLF0rLyk7XG5cdFx0Y29uc3QgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoIXNwbGl0W2ldKSB7XG5cdFx0XHRcdC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcblxuXHRcdFx0aWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuXHRcdFx0XHRjcmVhdGVEZWJ1Zy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNyZWF0ZURlYnVnLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGNyZWF0ZURlYnVnLmluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgaW5zdGFuY2UgPSBjcmVhdGVEZWJ1Zy5pbnN0YW5jZXNbaV07XG5cdFx0XHRpbnN0YW5jZS5lbmFibGVkID0gY3JlYXRlRGVidWcuZW5hYmxlZChpbnN0YW5jZS5uYW1lc3BhY2UpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuXHQqXG5cdCogQHJldHVybiB7U3RyaW5nfSBuYW1lc3BhY2VzXG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZGlzYWJsZSgpIHtcblx0XHRjb25zdCBuYW1lc3BhY2VzID0gW1xuXHRcdFx0Li4uY3JlYXRlRGVidWcubmFtZXMubWFwKHRvTmFtZXNwYWNlKSxcblx0XHRcdC4uLmNyZWF0ZURlYnVnLnNraXBzLm1hcCh0b05hbWVzcGFjZSkubWFwKG5hbWVzcGFjZSA9PiAnLScgKyBuYW1lc3BhY2UpXG5cdFx0XS5qb2luKCcsJyk7XG5cdFx0Y3JlYXRlRGVidWcuZW5hYmxlKCcnKTtcblx0XHRyZXR1cm4gbmFtZXNwYWNlcztcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG5cdCogQHJldHVybiB7Qm9vbGVhbn1cblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcblx0XHRpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGxldCBpO1xuXHRcdGxldCBsZW47XG5cblx0XHRmb3IgKGkgPSAwLCBsZW4gPSBjcmVhdGVEZWJ1Zy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKGNyZWF0ZURlYnVnLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNyZWF0ZURlYnVnLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoY3JlYXRlRGVidWcubmFtZXNbaV0udGVzdChuYW1lKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0KiBDb252ZXJ0IHJlZ2V4cCB0byBuYW1lc3BhY2Vcblx0KlxuXHQqIEBwYXJhbSB7UmVnRXhwfSByZWd4ZXBcblx0KiBAcmV0dXJuIHtTdHJpbmd9IG5hbWVzcGFjZVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiB0b05hbWVzcGFjZShyZWdleHApIHtcblx0XHRyZXR1cm4gcmVnZXhwLnRvU3RyaW5nKClcblx0XHRcdC5zdWJzdHJpbmcoMiwgcmVnZXhwLnRvU3RyaW5nKCkubGVuZ3RoIC0gMilcblx0XHRcdC5yZXBsYWNlKC9cXC5cXCpcXD8kLywgJyonKTtcblx0fVxuXG5cdC8qKlxuXHQqIENvZXJjZSBgdmFsYC5cblx0KlxuXHQqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuXHQqIEByZXR1cm4ge01peGVkfVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBjb2VyY2UodmFsKSB7XG5cdFx0aWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHRyZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG5cblx0Y3JlYXRlRGVidWcuZW5hYmxlKGNyZWF0ZURlYnVnLmxvYWQoKSk7XG5cblx0cmV0dXJuIGNyZWF0ZURlYnVnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldHVwO1xuIiwiLyoqXG4gKiBEZXRlY3QgRWxlY3Ryb24gcmVuZGVyZXIgLyBud2pzIHByb2Nlc3MsIHdoaWNoIGlzIG5vZGUsIGJ1dCB3ZSBzaG91bGRcbiAqIHRyZWF0IGFzIGEgYnJvd3Nlci5cbiAqL1xuXG5pZiAodHlwZW9mIHByb2Nlc3MgPT09ICd1bmRlZmluZWQnIHx8IHByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJyB8fCBwcm9jZXNzLmJyb3dzZXIgPT09IHRydWUgfHwgcHJvY2Vzcy5fX253anMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Jyb3dzZXIuanMnKTtcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9ub2RlLmpzJyk7XG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuY29uc3QgdHR5ID0gcmVxdWlyZSgndHR5Jyk7XG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIE5vZGUuanMgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICovXG5cbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFs2LCAyLCAzLCA0LCA1LCAxXTtcblxudHJ5IHtcblx0Ly8gT3B0aW9uYWwgZGVwZW5kZW5jeSAoYXMgaW4sIGRvZXNuJ3QgbmVlZCB0byBiZSBpbnN0YWxsZWQsIE5PVCBsaWtlIG9wdGlvbmFsRGVwZW5kZW5jaWVzIGluIHBhY2thZ2UuanNvbilcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuXHRjb25zdCBzdXBwb3J0c0NvbG9yID0gcmVxdWlyZSgnc3VwcG9ydHMtY29sb3InKTtcblxuXHRpZiAoc3VwcG9ydHNDb2xvciAmJiAoc3VwcG9ydHNDb2xvci5zdGRlcnIgfHwgc3VwcG9ydHNDb2xvcikubGV2ZWwgPj0gMikge1xuXHRcdGV4cG9ydHMuY29sb3JzID0gW1xuXHRcdFx0MjAsXG5cdFx0XHQyMSxcblx0XHRcdDI2LFxuXHRcdFx0MjcsXG5cdFx0XHQzMixcblx0XHRcdDMzLFxuXHRcdFx0MzgsXG5cdFx0XHQzOSxcblx0XHRcdDQwLFxuXHRcdFx0NDEsXG5cdFx0XHQ0Mixcblx0XHRcdDQzLFxuXHRcdFx0NDQsXG5cdFx0XHQ0NSxcblx0XHRcdDU2LFxuXHRcdFx0NTcsXG5cdFx0XHQ2Mixcblx0XHRcdDYzLFxuXHRcdFx0NjgsXG5cdFx0XHQ2OSxcblx0XHRcdDc0LFxuXHRcdFx0NzUsXG5cdFx0XHQ3Nixcblx0XHRcdDc3LFxuXHRcdFx0NzgsXG5cdFx0XHQ3OSxcblx0XHRcdDgwLFxuXHRcdFx0ODEsXG5cdFx0XHQ5Mixcblx0XHRcdDkzLFxuXHRcdFx0OTgsXG5cdFx0XHQ5OSxcblx0XHRcdDExMixcblx0XHRcdDExMyxcblx0XHRcdDEyOCxcblx0XHRcdDEyOSxcblx0XHRcdDEzNCxcblx0XHRcdDEzNSxcblx0XHRcdDE0OCxcblx0XHRcdDE0OSxcblx0XHRcdDE2MCxcblx0XHRcdDE2MSxcblx0XHRcdDE2Mixcblx0XHRcdDE2Myxcblx0XHRcdDE2NCxcblx0XHRcdDE2NSxcblx0XHRcdDE2Nixcblx0XHRcdDE2Nyxcblx0XHRcdDE2OCxcblx0XHRcdDE2OSxcblx0XHRcdDE3MCxcblx0XHRcdDE3MSxcblx0XHRcdDE3Mixcblx0XHRcdDE3Myxcblx0XHRcdDE3OCxcblx0XHRcdDE3OSxcblx0XHRcdDE4NCxcblx0XHRcdDE4NSxcblx0XHRcdDE5Nixcblx0XHRcdDE5Nyxcblx0XHRcdDE5OCxcblx0XHRcdDE5OSxcblx0XHRcdDIwMCxcblx0XHRcdDIwMSxcblx0XHRcdDIwMixcblx0XHRcdDIwMyxcblx0XHRcdDIwNCxcblx0XHRcdDIwNSxcblx0XHRcdDIwNixcblx0XHRcdDIwNyxcblx0XHRcdDIwOCxcblx0XHRcdDIwOSxcblx0XHRcdDIxNCxcblx0XHRcdDIxNSxcblx0XHRcdDIyMCxcblx0XHRcdDIyMVxuXHRcdF07XG5cdH1cbn0gY2F0Y2ggKGVycm9yKSB7XG5cdC8vIFN3YWxsb3cgLSB3ZSBvbmx5IGNhcmUgaWYgYHN1cHBvcnRzLWNvbG9yYCBpcyBhdmFpbGFibGU7IGl0IGRvZXNuJ3QgaGF2ZSB0byBiZS5cbn1cblxuLyoqXG4gKiBCdWlsZCB1cCB0aGUgZGVmYXVsdCBgaW5zcGVjdE9wdHNgIG9iamVjdCBmcm9tIHRoZSBlbnZpcm9ubWVudCB2YXJpYWJsZXMuXG4gKlxuICogICAkIERFQlVHX0NPTE9SUz1ubyBERUJVR19ERVBUSD0xMCBERUJVR19TSE9XX0hJRERFTj1lbmFibGVkIG5vZGUgc2NyaXB0LmpzXG4gKi9cblxuZXhwb3J0cy5pbnNwZWN0T3B0cyA9IE9iamVjdC5rZXlzKHByb2Nlc3MuZW52KS5maWx0ZXIoa2V5ID0+IHtcblx0cmV0dXJuIC9eZGVidWdfL2kudGVzdChrZXkpO1xufSkucmVkdWNlKChvYmosIGtleSkgPT4ge1xuXHQvLyBDYW1lbC1jYXNlXG5cdGNvbnN0IHByb3AgPSBrZXlcblx0XHQuc3Vic3RyaW5nKDYpXG5cdFx0LnRvTG93ZXJDYXNlKClcblx0XHQucmVwbGFjZSgvXyhbYS16XSkvZywgKF8sIGspID0+IHtcblx0XHRcdHJldHVybiBrLnRvVXBwZXJDYXNlKCk7XG5cdFx0fSk7XG5cblx0Ly8gQ29lcmNlIHN0cmluZyB2YWx1ZSBpbnRvIEpTIHZhbHVlXG5cdGxldCB2YWwgPSBwcm9jZXNzLmVudltrZXldO1xuXHRpZiAoL14oeWVzfG9ufHRydWV8ZW5hYmxlZCkkL2kudGVzdCh2YWwpKSB7XG5cdFx0dmFsID0gdHJ1ZTtcblx0fSBlbHNlIGlmICgvXihub3xvZmZ8ZmFsc2V8ZGlzYWJsZWQpJC9pLnRlc3QodmFsKSkge1xuXHRcdHZhbCA9IGZhbHNlO1xuXHR9IGVsc2UgaWYgKHZhbCA9PT0gJ251bGwnKSB7XG5cdFx0dmFsID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHR2YWwgPSBOdW1iZXIodmFsKTtcblx0fVxuXG5cdG9ialtwcm9wXSA9IHZhbDtcblx0cmV0dXJuIG9iajtcbn0sIHt9KTtcblxuLyoqXG4gKiBJcyBzdGRvdXQgYSBUVFk/IENvbG9yZWQgb3V0cHV0IGlzIGVuYWJsZWQgd2hlbiBgdHJ1ZWAuXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuXHRyZXR1cm4gJ2NvbG9ycycgaW4gZXhwb3J0cy5pbnNwZWN0T3B0cyA/XG5cdFx0Qm9vbGVhbihleHBvcnRzLmluc3BlY3RPcHRzLmNvbG9ycykgOlxuXHRcdHR0eS5pc2F0dHkocHJvY2Vzcy5zdGRlcnIuZmQpO1xufVxuXG4vKipcbiAqIEFkZHMgQU5TSSBjb2xvciBlc2NhcGUgY29kZXMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuXHRjb25zdCB7bmFtZXNwYWNlOiBuYW1lLCB1c2VDb2xvcnN9ID0gdGhpcztcblxuXHRpZiAodXNlQ29sb3JzKSB7XG5cdFx0Y29uc3QgYyA9IHRoaXMuY29sb3I7XG5cdFx0Y29uc3QgY29sb3JDb2RlID0gJ1xcdTAwMUJbMycgKyAoYyA8IDggPyBjIDogJzg7NTsnICsgYyk7XG5cdFx0Y29uc3QgcHJlZml4ID0gYCAgJHtjb2xvckNvZGV9OzFtJHtuYW1lfSBcXHUwMDFCWzBtYDtcblxuXHRcdGFyZ3NbMF0gPSBwcmVmaXggKyBhcmdzWzBdLnNwbGl0KCdcXG4nKS5qb2luKCdcXG4nICsgcHJlZml4KTtcblx0XHRhcmdzLnB1c2goY29sb3JDb2RlICsgJ20rJyArIG1vZHVsZS5leHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZikgKyAnXFx1MDAxQlswbScpO1xuXHR9IGVsc2Uge1xuXHRcdGFyZ3NbMF0gPSBnZXREYXRlKCkgKyBuYW1lICsgJyAnICsgYXJnc1swXTtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXREYXRlKCkge1xuXHRpZiAoZXhwb3J0cy5pbnNwZWN0T3B0cy5oaWRlRGF0ZSkge1xuXHRcdHJldHVybiAnJztcblx0fVxuXHRyZXR1cm4gbmV3IERhdGUoKS50b0lTT1N0cmluZygpICsgJyAnO1xufVxuXG4vKipcbiAqIEludm9rZXMgYHV0aWwuZm9ybWF0KClgIHdpdGggdGhlIHNwZWNpZmllZCBhcmd1bWVudHMgYW5kIHdyaXRlcyB0byBzdGRlcnIuXG4gKi9cblxuZnVuY3Rpb24gbG9nKC4uLmFyZ3MpIHtcblx0cmV0dXJuIHByb2Nlc3Muc3RkZXJyLndyaXRlKHV0aWwuZm9ybWF0KC4uLmFyZ3MpICsgJ1xcbicpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG5cdGlmIChuYW1lc3BhY2VzKSB7XG5cdFx0cHJvY2Vzcy5lbnYuREVCVUcgPSBuYW1lc3BhY2VzO1xuXHR9IGVsc2Uge1xuXHRcdC8vIElmIHlvdSBzZXQgYSBwcm9jZXNzLmVudiBmaWVsZCB0byBudWxsIG9yIHVuZGVmaW5lZCwgaXQgZ2V0cyBjYXN0IHRvIHRoZVxuXHRcdC8vIHN0cmluZyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuIEp1c3QgZGVsZXRlIGluc3RlYWQuXG5cdFx0ZGVsZXRlIHByb2Nlc3MuZW52LkRFQlVHO1xuXHR9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcblx0cmV0dXJuIHByb2Nlc3MuZW52LkRFQlVHO1xufVxuXG4vKipcbiAqIEluaXQgbG9naWMgZm9yIGBkZWJ1Z2AgaW5zdGFuY2VzLlxuICpcbiAqIENyZWF0ZSBhIG5ldyBgaW5zcGVjdE9wdHNgIG9iamVjdCBpbiBjYXNlIGB1c2VDb2xvcnNgIGlzIHNldFxuICogZGlmZmVyZW50bHkgZm9yIGEgcGFydGljdWxhciBgZGVidWdgIGluc3RhbmNlLlxuICovXG5cbmZ1bmN0aW9uIGluaXQoZGVidWcpIHtcblx0ZGVidWcuaW5zcGVjdE9wdHMgPSB7fTtcblxuXHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5pbnNwZWN0T3B0cyk7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdGRlYnVnLmluc3BlY3RPcHRzW2tleXNbaV1dID0gZXhwb3J0cy5pbnNwZWN0T3B0c1trZXlzW2ldXTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29tbW9uJykoZXhwb3J0cyk7XG5cbmNvbnN0IHtmb3JtYXR0ZXJzfSA9IG1vZHVsZS5leHBvcnRzO1xuXG4vKipcbiAqIE1hcCAlbyB0byBgdXRpbC5pbnNwZWN0KClgLCBhbGwgb24gYSBzaW5nbGUgbGluZS5cbiAqL1xuXG5mb3JtYXR0ZXJzLm8gPSBmdW5jdGlvbiAodikge1xuXHR0aGlzLmluc3BlY3RPcHRzLmNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXHRyZXR1cm4gdXRpbC5pbnNwZWN0KHYsIHRoaXMuaW5zcGVjdE9wdHMpXG5cdFx0LnJlcGxhY2UoL1xccypcXG5cXHMqL2csICcgJyk7XG59O1xuXG4vKipcbiAqIE1hcCAlTyB0byBgdXRpbC5pbnNwZWN0KClgLCBhbGxvd2luZyBtdWx0aXBsZSBsaW5lcyBpZiBuZWVkZWQuXG4gKi9cblxuZm9ybWF0dGVycy5PID0gZnVuY3Rpb24gKHYpIHtcblx0dGhpcy5pbnNwZWN0T3B0cy5jb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblx0cmV0dXJuIHV0aWwuaW5zcGVjdCh2LCB0aGlzLmluc3BlY3RPcHRzKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IChmbGFnLCBhcmd2KSA9PiB7XG5cdGFyZ3YgPSBhcmd2IHx8IHByb2Nlc3MuYXJndjtcblx0Y29uc3QgcHJlZml4ID0gZmxhZy5zdGFydHNXaXRoKCctJykgPyAnJyA6IChmbGFnLmxlbmd0aCA9PT0gMSA/ICctJyA6ICctLScpO1xuXHRjb25zdCBwb3MgPSBhcmd2LmluZGV4T2YocHJlZml4ICsgZmxhZyk7XG5cdGNvbnN0IHRlcm1pbmF0b3JQb3MgPSBhcmd2LmluZGV4T2YoJy0tJyk7XG5cdHJldHVybiBwb3MgIT09IC0xICYmICh0ZXJtaW5hdG9yUG9zID09PSAtMSA/IHRydWUgOiBwb3MgPCB0ZXJtaW5hdG9yUG9zKTtcbn07XG4iLCIvKipcbiAqIFByb21ldGhldXMgY2xpZW50XG4gKiBAbW9kdWxlIFByb21ldGhldXMgY2xpZW50XG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLnJlZ2lzdGVyID0gcmVxdWlyZSgnLi9saWIvcmVnaXN0cnknKS5nbG9iYWxSZWdpc3RyeTtcbmV4cG9ydHMuUmVnaXN0cnkgPSByZXF1aXJlKCcuL2xpYi9yZWdpc3RyeScpO1xuZXhwb3J0cy5jb250ZW50VHlwZSA9IHJlcXVpcmUoJy4vbGliL3JlZ2lzdHJ5JykuZ2xvYmFsUmVnaXN0cnkuY29udGVudFR5cGU7XG5leHBvcnRzLnZhbGlkYXRlTWV0cmljTmFtZSA9IHJlcXVpcmUoJy4vbGliL3ZhbGlkYXRpb24nKS52YWxpZGF0ZU1ldHJpY05hbWU7XG5cbmV4cG9ydHMuQ291bnRlciA9IHJlcXVpcmUoJy4vbGliL2NvdW50ZXInKTtcbmV4cG9ydHMuR2F1Z2UgPSByZXF1aXJlKCcuL2xpYi9nYXVnZScpO1xuZXhwb3J0cy5IaXN0b2dyYW0gPSByZXF1aXJlKCcuL2xpYi9oaXN0b2dyYW0nKTtcbmV4cG9ydHMuU3VtbWFyeSA9IHJlcXVpcmUoJy4vbGliL3N1bW1hcnknKTtcbmV4cG9ydHMuUHVzaGdhdGV3YXkgPSByZXF1aXJlKCcuL2xpYi9wdXNoZ2F0ZXdheScpO1xuXG5leHBvcnRzLmxpbmVhckJ1Y2tldHMgPSByZXF1aXJlKCcuL2xpYi9idWNrZXRHZW5lcmF0b3JzJykubGluZWFyQnVja2V0cztcbmV4cG9ydHMuZXhwb25lbnRpYWxCdWNrZXRzID0gcmVxdWlyZSgnLi9saWIvYnVja2V0R2VuZXJhdG9ycycpLmV4cG9uZW50aWFsQnVja2V0cztcblxuZXhwb3J0cy5jb2xsZWN0RGVmYXVsdE1ldHJpY3MgPSByZXF1aXJlKCcuL2xpYi9kZWZhdWx0TWV0cmljcycpO1xuXG5leHBvcnRzLmFnZ3JlZ2F0b3JzID0gcmVxdWlyZSgnLi9saWIvbWV0cmljQWdncmVnYXRvcnMnKS5hZ2dyZWdhdG9ycztcbmV4cG9ydHMuQWdncmVnYXRvclJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi9saWIvY2x1c3RlcicpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmxpbmVhckJ1Y2tldHMgPSAoc3RhcnQsIHdpZHRoLCBjb3VudCkgPT4ge1xuXHRpZiAoY291bnQgPCAxKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdMaW5lYXIgYnVja2V0cyBuZWVkcyBhIHBvc2l0aXZlIGNvdW50Jyk7XG5cdH1cblxuXHRjb25zdCBidWNrZXRzID0gbmV3IEFycmF5KGNvdW50KTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG5cdFx0YnVja2V0c1tpXSA9IHN0YXJ0O1xuXHRcdHN0YXJ0ICs9IHdpZHRoO1xuXHR9XG5cdHJldHVybiBidWNrZXRzO1xufTtcblxuZXhwb3J0cy5leHBvbmVudGlhbEJ1Y2tldHMgPSAoc3RhcnQsIGZhY3RvciwgY291bnQpID0+IHtcblx0aWYgKHN0YXJ0IDw9IDApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0V4cG9uZW50aWFsIGJ1Y2tldHMgbmVlZHMgYSBwb3NpdGl2ZSBzdGFydCcpO1xuXHR9XG5cdGlmIChjb3VudCA8IDEpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0V4cG9uZW50aWFsIGJ1Y2tldHMgbmVlZHMgYSBwb3NpdGl2ZSBjb3VudCcpO1xuXHR9XG5cdGlmIChmYWN0b3IgPD0gMSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignRXhwb25lbnRpYWwgYnVja2V0cyBuZWVkcyBhIGZhY3RvciBncmVhdGVyIHRoYW4gMScpO1xuXHR9XG5cdGNvbnN0IGJ1Y2tldHMgPSBuZXcgQXJyYXkoY291bnQpO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcblx0XHRidWNrZXRzW2ldID0gc3RhcnQ7XG5cdFx0c3RhcnQgKj0gZmFjdG9yO1xuXHR9XG5cdHJldHVybiBidWNrZXRzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBFeHRlbmRzIHRoZSBSZWdpc3RyeSBjbGFzcyB3aXRoIGEgYGNsdXN0ZXJNZXRyaWNzYCBtZXRob2QgdGhhdCByZXR1cm5zXG4gKiBhZ2dyZWdhdGVkIG1ldHJpY3MgZm9yIGFsbCB3b3JrZXJzLlxuICpcbiAqIEluIGNsdXN0ZXIgd29ya2VycywgbGlzdGVucyBmb3IgYW5kIHJlc3BvbmRzIHRvIHJlcXVlc3RzIGZvciBtZXRyaWNzIGJ5IHRoZVxuICogY2x1c3RlciBtYXN0ZXIuXG4gKi9cblxuY29uc3QgY2x1c3RlciA9IHJlcXVpcmUoJ2NsdXN0ZXInKTtcbmNvbnN0IFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi9yZWdpc3RyeScpO1xuY29uc3QgeyBHcm91cGVyIH0gPSByZXF1aXJlKCcuL3V0aWwnKTtcbmNvbnN0IHsgYWdncmVnYXRvcnMgfSA9IHJlcXVpcmUoJy4vbWV0cmljQWdncmVnYXRvcnMnKTtcblxuY29uc3QgR0VUX01FVFJJQ1NfUkVRID0gJ3Byb20tY2xpZW50OmdldE1ldHJpY3NSZXEnO1xuY29uc3QgR0VUX01FVFJJQ1NfUkVTID0gJ3Byb20tY2xpZW50OmdldE1ldHJpY3NSZXMnO1xuXG5sZXQgcmVnaXN0cmllcyA9IFtSZWdpc3RyeS5nbG9iYWxSZWdpc3RyeV07XG5sZXQgcmVxdWVzdEN0ciA9IDA7IC8vIENvbmN1cnJlbmN5IGNvbnRyb2xcbmxldCBsaXN0ZW5lcnNBZGRlZCA9IGZhbHNlO1xuY29uc3QgcmVxdWVzdHMgPSBuZXcgTWFwKCk7IC8vIFBlbmRpbmcgcmVxdWVzdHMgZm9yIHdvcmtlcnMnIGxvY2FsIG1ldHJpY3MuXG5cbmNsYXNzIEFnZ3JlZ2F0b3JSZWdpc3RyeSBleHRlbmRzIFJlZ2lzdHJ5IHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRhZGRMaXN0ZW5lcnMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXRzIGFnZ3JlZ2F0ZWQgbWV0cmljcyBmb3IgYWxsIHdvcmtlcnMuIFRoZSBvcHRpb25hbCBjYWxsYmFjayBhbmRcblx0ICogcmV0dXJuZWQgUHJvbWlzZSByZXNvbHZlIHdpdGggdGhlIHNhbWUgdmFsdWU7IGVpdGhlciBtYXkgYmUgdXNlZC5cblx0ICogQHBhcmFtIHtGdW5jdGlvbj99IGNhbGxiYWNrIChlcnIsIG1ldHJpY3MpID0+IGFueVxuXHQgKiBAcmV0dXJuIHtQcm9taXNlPHN0cmluZz59IFByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBhZ2dyZWdhdGVkXG5cdCAqICAgbWV0cmljcy5cblx0ICovXG5cdGNsdXN0ZXJNZXRyaWNzKGNhbGxiYWNrKSB7XG5cdFx0Y29uc3QgcmVxdWVzdElkID0gcmVxdWVzdEN0cisrO1xuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGZ1bmN0aW9uIGRvbmUoZXJyLCByZXN1bHQpIHtcblx0XHRcdFx0Ly8gRG9uJ3QgcmVzb2x2ZS9yZWplY3QgdGhlIHByb21pc2UgaWYgYSBjYWxsYmFjayBpcyBwcm92aWRlZFxuXHRcdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2soZXJyLCByZXN1bHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmIChlcnIpIHJlamVjdChlcnIpO1xuXHRcdFx0XHRcdGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHJlcXVlc3QgPSB7XG5cdFx0XHRcdHJlc3BvbnNlczogW10sXG5cdFx0XHRcdHBlbmRpbmc6IDAsXG5cdFx0XHRcdGRvbmUsXG5cdFx0XHRcdGVycm9yVGltZW91dDogc2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0cmVxdWVzdC5mYWlsZWQgPSB0cnVlO1xuXHRcdFx0XHRcdGNvbnN0IGVyciA9IG5ldyBFcnJvcignT3BlcmF0aW9uIHRpbWVkIG91dC4nKTtcblx0XHRcdFx0XHRyZXF1ZXN0LmRvbmUoZXJyKTtcblx0XHRcdFx0fSwgNTAwMCksXG5cdFx0XHRcdGZhaWxlZDogZmFsc2Vcblx0XHRcdH07XG5cdFx0XHRyZXF1ZXN0cy5zZXQocmVxdWVzdElkLCByZXF1ZXN0KTtcblxuXHRcdFx0Y29uc3QgbWVzc2FnZSA9IHtcblx0XHRcdFx0dHlwZTogR0VUX01FVFJJQ1NfUkVRLFxuXHRcdFx0XHRyZXF1ZXN0SWRcblx0XHRcdH07XG5cblx0XHRcdGZvciAoY29uc3QgaWQgaW4gY2x1c3Rlci53b3JrZXJzKSB7XG5cdFx0XHRcdC8vIElmIHRoZSB3b3JrZXIgZXhpdHMgYWJydXB0bHksIGl0IG1heSBzdGlsbCBiZSBpbiB0aGUgd29ya2Vyc1xuXHRcdFx0XHQvLyBsaXN0IGJ1dCBub3QgYWJsZSB0byBjb21tdW5pY2F0ZS5cblx0XHRcdFx0aWYgKGNsdXN0ZXIud29ya2Vyc1tpZF0uaXNDb25uZWN0ZWQoKSkge1xuXHRcdFx0XHRcdGNsdXN0ZXIud29ya2Vyc1tpZF0uc2VuZChtZXNzYWdlKTtcblx0XHRcdFx0XHRyZXF1ZXN0LnBlbmRpbmcrKztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAocmVxdWVzdC5wZW5kaW5nID09PSAwKSB7XG5cdFx0XHRcdC8vIE5vIHdvcmtlcnMgd2VyZSB1cFxuXHRcdFx0XHRjbGVhclRpbWVvdXQocmVxdWVzdC5lcnJvclRpbWVvdXQpO1xuXHRcdFx0XHRwcm9jZXNzLm5leHRUaWNrKCgpID0+IGRvbmUobnVsbCwgJycpKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IFJlZ2lzdHJ5IGluc3RhbmNlIGZyb20gYW4gYXJyYXkgb2YgbWV0cmljcyB0aGF0IHdlcmVcblx0ICogY3JlYXRlZCBieSBgcmVnaXN0cnkuZ2V0TWV0cmljc0FzSlNPTigpYC4gTWV0cmljcyBhcmUgYWdncmVnYXRlZCB1c2luZ1xuXHQgKiB0aGUgbWV0aG9kIHNwZWNpZmllZCBieSB0aGVpciBgYWdncmVnYXRvcmAgcHJvcGVydHksIG9yIGJ5IHN1bW1hdGlvbiBpZlxuXHQgKiBgYWdncmVnYXRvcmAgaXMgdW5kZWZpbmVkLlxuXHQgKiBAcGFyYW0ge0FycmF5fSBtZXRyaWNzQXJyIEFycmF5IG9mIG1ldHJpY3MsIGVhY2ggb2Ygd2hpY2ggY3JlYXRlZCBieVxuXHQgKiAgIGByZWdpc3RyeS5nZXRNZXRyaWNzQXNKU09OKClgLlxuXHQgKiBAcmV0dXJuIHtSZWdpc3RyeX0gYWdncmVnYXRlZCByZWdpc3RyeS5cblx0ICovXG5cdHN0YXRpYyBhZ2dyZWdhdGUobWV0cmljc0Fycikge1xuXHRcdGNvbnN0IGFnZ3JlZ2F0ZWRSZWdpc3RyeSA9IG5ldyBSZWdpc3RyeSgpO1xuXHRcdGNvbnN0IG1ldHJpY3NCeU5hbWUgPSBuZXcgR3JvdXBlcigpO1xuXG5cdFx0Ly8gR2F0aGVyIGJ5IG5hbWVcblx0XHRtZXRyaWNzQXJyLmZvckVhY2gobWV0cmljcyA9PiB7XG5cdFx0XHRtZXRyaWNzLmZvckVhY2gobWV0cmljID0+IHtcblx0XHRcdFx0bWV0cmljc0J5TmFtZS5hZGQobWV0cmljLm5hbWUsIG1ldHJpYyk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdC8vIEFnZ3JlZ2F0ZSBnYXRoZXJlZCBtZXRyaWNzLlxuXHRcdG1ldHJpY3NCeU5hbWUuZm9yRWFjaChtZXRyaWNzID0+IHtcblx0XHRcdGNvbnN0IGFnZ3JlZ2F0b3JOYW1lID0gbWV0cmljc1swXS5hZ2dyZWdhdG9yO1xuXHRcdFx0Y29uc3QgYWdncmVnYXRvckZuID0gYWdncmVnYXRvcnNbYWdncmVnYXRvck5hbWVdO1xuXHRcdFx0aWYgKHR5cGVvZiBhZ2dyZWdhdG9yRm4gIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGAnJHthZ2dyZWdhdG9yTmFtZX0nIGlzIG5vdCBhIGRlZmluZWQgYWdncmVnYXRvci5gKTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGFnZ3JlZ2F0ZWRNZXRyaWMgPSBhZ2dyZWdhdG9yRm4obWV0cmljcyk7XG5cdFx0XHQvLyBOQjogVGhlICdvbWl0JyBhZ2dyZWdhdG9yIHJldHVybnMgdW5kZWZpbmVkLlxuXHRcdFx0aWYgKGFnZ3JlZ2F0ZWRNZXRyaWMpIHtcblx0XHRcdFx0Y29uc3QgYWdncmVnYXRlZE1ldHJpY1dyYXBwZXIgPSBPYmplY3QuYXNzaWduKFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGdldDogKCkgPT4gYWdncmVnYXRlZE1ldHJpY1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0YWdncmVnYXRlZE1ldHJpY1xuXHRcdFx0XHQpO1xuXHRcdFx0XHRhZ2dyZWdhdGVkUmVnaXN0cnkucmVnaXN0ZXJNZXRyaWMoYWdncmVnYXRlZE1ldHJpY1dyYXBwZXIpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGFnZ3JlZ2F0ZWRSZWdpc3RyeTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSByZWdpc3RyeSBvciByZWdpc3RyaWVzIHRvIGJlIGFnZ3JlZ2F0ZWQuIENhbGwgZnJvbSB3b3JrZXJzIHRvXG5cdCAqIHVzZSBhIHJlZ2lzdHJ5L3JlZ2lzdHJpZXMgb3RoZXIgdGhhbiB0aGUgZGVmYXVsdCBnbG9iYWwgcmVnaXN0cnkuXG5cdCAqIEBwYXJhbSB7QXJyYXk8UmVnaXN0cnk+fFJlZ2lzdHJ5fSByZWdzIFJlZ2lzdHJ5IG9yIHJlZ2lzdHJpZXMgdG8gYmVcblx0ICogICBhZ2dyZWdhdGVkLlxuXHQgKiBAcmV0dXJuIHt2b2lkfVxuXHQgKi9cblx0c3RhdGljIHNldFJlZ2lzdHJpZXMocmVncykge1xuXHRcdGlmICghQXJyYXkuaXNBcnJheShyZWdzKSkgcmVncyA9IFtyZWdzXTtcblx0XHRyZWdzLmZvckVhY2gocmVnID0+IHtcblx0XHRcdGlmICghKHJlZyBpbnN0YW5jZW9mIFJlZ2lzdHJ5KSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBSZWdpc3RyeSwgZ290ICR7dHlwZW9mIHJlZ31gKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZWdpc3RyaWVzID0gcmVncztcblx0fVxufVxuXG4vKipcbiAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIGZvciBjbHVzdGVyIGFnZ3JlZ2F0aW9uLiBJZGVtcG90ZW50IChzYWZlIHRvIGNhbGwgbW9yZVxuICogdGhhbiBvbmNlKS5cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcblx0aWYgKGxpc3RlbmVyc0FkZGVkKSByZXR1cm47XG5cdGxpc3RlbmVyc0FkZGVkID0gdHJ1ZTtcblxuXHRpZiAoY2x1c3Rlci5pc01hc3Rlcikge1xuXHRcdC8vIExpc3RlbiBmb3Igd29ya2VyIHJlc3BvbnNlcyB0byByZXF1ZXN0cyBmb3IgbG9jYWwgbWV0cmljc1xuXHRcdGNsdXN0ZXIub24oJ21lc3NhZ2UnLCAod29ya2VyLCBtZXNzYWdlKSA9PiB7XG5cdFx0XHRpZiAobWVzc2FnZS50eXBlID09PSBHRVRfTUVUUklDU19SRVMpIHtcblx0XHRcdFx0Y29uc3QgcmVxdWVzdCA9IHJlcXVlc3RzLmdldChtZXNzYWdlLnJlcXVlc3RJZCk7XG5cdFx0XHRcdG1lc3NhZ2UubWV0cmljcy5mb3JFYWNoKHJlZ2lzdHJ5ID0+IHJlcXVlc3QucmVzcG9uc2VzLnB1c2gocmVnaXN0cnkpKTtcblx0XHRcdFx0cmVxdWVzdC5wZW5kaW5nLS07XG5cblx0XHRcdFx0aWYgKHJlcXVlc3QucGVuZGluZyA9PT0gMCkge1xuXHRcdFx0XHRcdC8vIGZpbmFsaXplXG5cdFx0XHRcdFx0cmVxdWVzdHMuZGVsZXRlKG1lc3NhZ2UucmVxdWVzdElkKTtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQocmVxdWVzdC5lcnJvclRpbWVvdXQpO1xuXG5cdFx0XHRcdFx0aWYgKHJlcXVlc3QuZmFpbGVkKSByZXR1cm47IC8vIENhbGxiYWNrIGFscmVhZHkgcnVuIHdpdGggRXJyb3IuXG5cblx0XHRcdFx0XHRjb25zdCByZWdpc3RyeSA9IEFnZ3JlZ2F0b3JSZWdpc3RyeS5hZ2dyZWdhdGUocmVxdWVzdC5yZXNwb25zZXMpO1xuXHRcdFx0XHRcdGNvbnN0IHByb21TdHJpbmcgPSByZWdpc3RyeS5tZXRyaWNzKCk7XG5cdFx0XHRcdFx0cmVxdWVzdC5kb25lKG51bGwsIHByb21TdHJpbmcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuaWYgKGNsdXN0ZXIuaXNXb3JrZXIpIHtcblx0Ly8gUmVzcG9uZCB0byBtYXN0ZXIncyByZXF1ZXN0cyBmb3Igd29ya2VyJ3MgbG9jYWwgbWV0cmljcy5cblx0cHJvY2Vzcy5vbignbWVzc2FnZScsIG1lc3NhZ2UgPT4ge1xuXHRcdGlmIChtZXNzYWdlLnR5cGUgPT09IEdFVF9NRVRSSUNTX1JFUSkge1xuXHRcdFx0cHJvY2Vzcy5zZW5kKHtcblx0XHRcdFx0dHlwZTogR0VUX01FVFJJQ1NfUkVTLFxuXHRcdFx0XHRyZXF1ZXN0SWQ6IG1lc3NhZ2UucmVxdWVzdElkLFxuXHRcdFx0XHRtZXRyaWNzOiByZWdpc3RyaWVzLm1hcChyID0+IHIuZ2V0TWV0cmljc0FzSlNPTigpKVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBZ2dyZWdhdG9yUmVnaXN0cnk7XG4iLCIvKipcbiAqIENvdW50ZXIgbWV0cmljXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbmNvbnN0IHsgZ2xvYmFsUmVnaXN0cnkgfSA9IHJlcXVpcmUoJy4vcmVnaXN0cnknKTtcbmNvbnN0IHR5cGUgPSAnY291bnRlcic7XG5jb25zdCB7XG5cdGlzRGF0ZSxcblx0Z2V0UHJvcGVydGllc0Zyb21PYmosXG5cdGhhc2hPYmplY3QsXG5cdGlzT2JqZWN0LFxuXHRwcmludERlcHJlY2F0aW9uT2JqZWN0Q29uc3RydWN0b3IsXG5cdGdldExhYmVscyxcblx0cmVtb3ZlTGFiZWxzXG59ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmNvbnN0IHtcblx0dmFsaWRhdGVMYWJlbCxcblx0dmFsaWRhdGVNZXRyaWNOYW1lLFxuXHR2YWxpZGF0ZUxhYmVsTmFtZVxufSA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvbicpO1xuXG5jbGFzcyBDb3VudGVyIHtcblx0LyoqXG5cdCAqIENvdW50ZXJcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBOYW1lIG9mIHRoZSBtZXRyaWNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGhlbHAgLSBIZWxwIGRlc2NyaXB0aW9uIGZvciB0aGUgbWV0cmljXG5cdCAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGxhYmVscyAtIExhYmVsc1xuXHQgKi9cblx0Y29uc3RydWN0b3IobmFtZSwgaGVscCwgbGFiZWxzKSB7XG5cdFx0bGV0IGNvbmZpZztcblx0XHRpZiAoaXNPYmplY3QobmFtZSkpIHtcblx0XHRcdGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsYWJlbE5hbWVzOiBbXVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRuYW1lXG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAoIWNvbmZpZy5yZWdpc3RlcnMpIHtcblx0XHRcdFx0Y29uZmlnLnJlZ2lzdGVycyA9IFtnbG9iYWxSZWdpc3RyeV07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHByaW50RGVwcmVjYXRpb25PYmplY3RDb25zdHJ1Y3RvcigpO1xuXG5cdFx0XHRjb25maWcgPSB7XG5cdFx0XHRcdG5hbWUsXG5cdFx0XHRcdGhlbHAsXG5cdFx0XHRcdGxhYmVsTmFtZXM6IGxhYmVscyxcblx0XHRcdFx0cmVnaXN0ZXJzOiBbZ2xvYmFsUmVnaXN0cnldXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdGlmICghY29uZmlnLmhlbHApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYW5kYXRvcnkgaGVscCBwYXJhbWV0ZXInKTtcblx0XHR9XG5cdFx0aWYgKCFjb25maWcubmFtZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hbmRhdG9yeSBuYW1lIHBhcmFtZXRlcicpO1xuXHRcdH1cblx0XHRpZiAoIXZhbGlkYXRlTWV0cmljTmFtZShjb25maWcubmFtZSkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBtZXRyaWMgbmFtZScpO1xuXHRcdH1cblxuXHRcdGlmICghdmFsaWRhdGVMYWJlbE5hbWUoY29uZmlnLmxhYmVsTmFtZXMpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbGFiZWwgbmFtZScpO1xuXHRcdH1cblxuXHRcdHRoaXMubmFtZSA9IGNvbmZpZy5uYW1lO1xuXG5cdFx0dGhpcy5sYWJlbE5hbWVzID0gY29uZmlnLmxhYmVsTmFtZXMgfHwgW107XG5cblx0XHR0aGlzLnJlc2V0KCk7XG5cblx0XHR0aGlzLmhlbHAgPSBjb25maWcuaGVscDtcblx0XHR0aGlzLmFnZ3JlZ2F0b3IgPSBjb25maWcuYWdncmVnYXRvciB8fCAnc3VtJztcblxuXHRcdGNvbmZpZy5yZWdpc3RlcnMuZm9yRWFjaChyZWdpc3RyeUluc3RhbmNlID0+XG5cdFx0XHRyZWdpc3RyeUluc3RhbmNlLnJlZ2lzdGVyTWV0cmljKHRoaXMpXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmNyZW1lbnQgY291bnRlclxuXHQgKiBAcGFyYW0ge29iamVjdH0gbGFiZWxzIC0gV2hhdCBsYWJlbCB5b3Ugd2FudCB0byBiZSBpbmNyZW1lbnRlZFxuXHQgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBWYWx1ZSB0byBpbmNyZW1lbnQsIGlmIG9taXR0ZWQgaW5jcmVtZW50IHdpdGggMVxuXHQgKiBAcGFyYW0geyhOdW1iZXJ8RGF0ZSl9IHRpbWVzdGFtcCAtIFRpbWVzdGFtcCB0byBzZXQgdGhlIGNvdW50ZXIgdG9cblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRpbmMobGFiZWxzLCB2YWx1ZSwgdGltZXN0YW1wKSB7XG5cdFx0aWYgKCFpc09iamVjdChsYWJlbHMpKSB7XG5cdFx0XHRyZXR1cm4gaW5jLmNhbGwodGhpcywgbnVsbCkobGFiZWxzLCB2YWx1ZSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaGFzaCA9IGhhc2hPYmplY3QobGFiZWxzKTtcblx0XHRyZXR1cm4gaW5jLmNhbGwodGhpcywgbGFiZWxzLCBoYXNoKSh2YWx1ZSwgdGltZXN0YW1wKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXNldCBjb3VudGVyXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0cmVzZXQoKSB7XG5cdFx0cmV0dXJuIHJlc2V0LmNhbGwodGhpcyk7XG5cdH1cblxuXHRnZXQoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhlbHA6IHRoaXMuaGVscCxcblx0XHRcdG5hbWU6IHRoaXMubmFtZSxcblx0XHRcdHR5cGUsXG5cdFx0XHR2YWx1ZXM6IGdldFByb3BlcnRpZXNGcm9tT2JqKHRoaXMuaGFzaE1hcCksXG5cdFx0XHRhZ2dyZWdhdG9yOiB0aGlzLmFnZ3JlZ2F0b3Jcblx0XHR9O1xuXHR9XG5cblx0bGFiZWxzKCkge1xuXHRcdGNvbnN0IGxhYmVscyA9IGdldExhYmVscyh0aGlzLmxhYmVsTmFtZXMsIGFyZ3VtZW50cykgfHwge307XG5cdFx0Y29uc3QgaGFzaCA9IGhhc2hPYmplY3QobGFiZWxzKTtcblx0XHR2YWxpZGF0ZUxhYmVsKHRoaXMubGFiZWxOYW1lcywgbGFiZWxzKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5jOiBpbmMuY2FsbCh0aGlzLCBsYWJlbHMsIGhhc2gpXG5cdFx0fTtcblx0fVxuXG5cdHJlbW92ZSgpIHtcblx0XHRjb25zdCBsYWJlbHMgPSBnZXRMYWJlbHModGhpcy5sYWJlbE5hbWVzLCBhcmd1bWVudHMpIHx8IHt9O1xuXHRcdHJldHVybiByZW1vdmVMYWJlbHMuY2FsbCh0aGlzLCB0aGlzLmhhc2hNYXAsIGxhYmVscyk7XG5cdH1cbn1cblxuY29uc3QgcmVzZXQgPSBmdW5jdGlvbigpIHtcblx0dGhpcy5oYXNoTWFwID0ge307XG5cblx0aWYgKHRoaXMubGFiZWxOYW1lcy5sZW5ndGggPT09IDApIHtcblx0XHR0aGlzLmhhc2hNYXAgPSBzZXRWYWx1ZSh7fSwgMCk7XG5cdH1cbn07XG5cbmNvbnN0IGluYyA9IGZ1bmN0aW9uKGxhYmVscywgaGFzaCkge1xuXHRyZXR1cm4gKHZhbHVlLCB0aW1lc3RhbXApID0+IHtcblx0XHRpZiAodmFsdWUgJiYgIU51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYFZhbHVlIGlzIG5vdCBhIHZhbGlkIG51bWJlcjogJHt1dGlsLmZvcm1hdCh2YWx1ZSl9YCk7XG5cdFx0fVxuXHRcdGlmICh0aW1lc3RhbXAgJiYgIWlzRGF0ZSh0aW1lc3RhbXApICYmICFOdW1iZXIuaXNGaW5pdGUodGltZXN0YW1wKSkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0YFRpbWVzdGFtcCBpcyBub3QgYSB2YWxpZCBkYXRlIG9yIG51bWJlcjogJHt1dGlsLmZvcm1hdCh0aW1lc3RhbXApfWBcblx0XHRcdCk7XG5cdFx0fVxuXHRcdGlmICh2YWx1ZSA8IDApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSXQgaXMgbm90IHBvc3NpYmxlIHRvIGRlY3JlYXNlIGEgY291bnRlcicpO1xuXHRcdH1cblxuXHRcdGxhYmVscyA9IGxhYmVscyB8fCB7fTtcblx0XHR2YWxpZGF0ZUxhYmVsKHRoaXMubGFiZWxOYW1lcywgbGFiZWxzKTtcblxuXHRcdGNvbnN0IGluY1ZhbHVlID0gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCA/IDEgOiB2YWx1ZTtcblxuXHRcdHRoaXMuaGFzaE1hcCA9IHNldFZhbHVlKHRoaXMuaGFzaE1hcCwgaW5jVmFsdWUsIHRpbWVzdGFtcCwgbGFiZWxzLCBoYXNoKTtcblx0fTtcbn07XG5cbmZ1bmN0aW9uIHNldFZhbHVlKGhhc2hNYXAsIHZhbHVlLCB0aW1lc3RhbXAsIGxhYmVscywgaGFzaCkge1xuXHRoYXNoID0gaGFzaCB8fCAnJztcblx0dGltZXN0YW1wID0gaXNEYXRlKHRpbWVzdGFtcClcblx0XHQ/IHRpbWVzdGFtcC52YWx1ZU9mKClcblx0XHQ6IE51bWJlci5pc0Zpbml0ZSh0aW1lc3RhbXApXG5cdFx0PyB0aW1lc3RhbXBcblx0XHQ6IHVuZGVmaW5lZDtcblx0aWYgKGhhc2hNYXBbaGFzaF0pIHtcblx0XHRoYXNoTWFwW2hhc2hdLnZhbHVlICs9IHZhbHVlO1xuXHRcdGhhc2hNYXBbaGFzaF0udGltZXN0YW1wID0gdGltZXN0YW1wO1xuXHR9IGVsc2Uge1xuXHRcdGhhc2hNYXBbaGFzaF0gPSB7IHZhbHVlLCBsYWJlbHM6IGxhYmVscyB8fCB7fSwgdGltZXN0YW1wIH07XG5cdH1cblx0cmV0dXJuIGhhc2hNYXA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ291bnRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcHJvY2Vzc0NwdVRvdGFsID0gcmVxdWlyZSgnLi9tZXRyaWNzL3Byb2Nlc3NDcHVUb3RhbCcpO1xuY29uc3QgcHJvY2Vzc1N0YXJ0VGltZSA9IHJlcXVpcmUoJy4vbWV0cmljcy9wcm9jZXNzU3RhcnRUaW1lJyk7XG5jb25zdCBvc01lbW9yeUhlYXAgPSByZXF1aXJlKCcuL21ldHJpY3Mvb3NNZW1vcnlIZWFwJyk7XG5jb25zdCBwcm9jZXNzT3BlbkZpbGVEZXNjcmlwdG9ycyA9IHJlcXVpcmUoJy4vbWV0cmljcy9wcm9jZXNzT3BlbkZpbGVEZXNjcmlwdG9ycycpO1xuY29uc3QgcHJvY2Vzc01heEZpbGVEZXNjcmlwdG9ycyA9IHJlcXVpcmUoJy4vbWV0cmljcy9wcm9jZXNzTWF4RmlsZURlc2NyaXB0b3JzJyk7XG5jb25zdCBldmVudExvb3BMYWcgPSByZXF1aXJlKCcuL21ldHJpY3MvZXZlbnRMb29wTGFnJyk7XG5jb25zdCBwcm9jZXNzSGFuZGxlcyA9IHJlcXVpcmUoJy4vbWV0cmljcy9wcm9jZXNzSGFuZGxlcycpO1xuY29uc3QgcHJvY2Vzc1JlcXVlc3RzID0gcmVxdWlyZSgnLi9tZXRyaWNzL3Byb2Nlc3NSZXF1ZXN0cycpO1xuY29uc3QgaGVhcFNpemVBbmRVc2VkID0gcmVxdWlyZSgnLi9tZXRyaWNzL2hlYXBTaXplQW5kVXNlZCcpO1xuY29uc3QgaGVhcFNwYWNlc1NpemVBbmRVc2VkID0gcmVxdWlyZSgnLi9tZXRyaWNzL2hlYXBTcGFjZXNTaXplQW5kVXNlZCcpO1xuY29uc3QgdmVyc2lvbiA9IHJlcXVpcmUoJy4vbWV0cmljcy92ZXJzaW9uJyk7XG5jb25zdCB7IGdsb2JhbFJlZ2lzdHJ5IH0gPSByZXF1aXJlKCcuL3JlZ2lzdHJ5Jyk7XG5jb25zdCB7IHByaW50RGVwcmVjYXRpb25Db2xsZWN0RGVmYXVsdE1ldHJpY3NOdW1iZXIgfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jb25zdCBtZXRyaWNzID0ge1xuXHRwcm9jZXNzQ3B1VG90YWwsXG5cdHByb2Nlc3NTdGFydFRpbWUsXG5cdG9zTWVtb3J5SGVhcCxcblx0cHJvY2Vzc09wZW5GaWxlRGVzY3JpcHRvcnMsXG5cdHByb2Nlc3NNYXhGaWxlRGVzY3JpcHRvcnMsXG5cdGV2ZW50TG9vcExhZyxcblx0cHJvY2Vzc0hhbmRsZXMsXG5cdHByb2Nlc3NSZXF1ZXN0cyxcblx0aGVhcFNpemVBbmRVc2VkLFxuXHRoZWFwU3BhY2VzU2l6ZUFuZFVzZWQsXG5cdHZlcnNpb25cbn07XG5jb25zdCBtZXRyaWNzTGlzdCA9IE9iamVjdC5rZXlzKG1ldHJpY3MpO1xuXG5sZXQgZXhpc3RpbmdJbnRlcnZhbCA9IG51bGw7XG4vLyBUaGlzIGlzIHVzZWQgdG8gZW5zdXJlIHRoZSBwcm9ncmFtIHRocm93cyBvbiBkdXBsaWNhdGUgbWV0cmljcyBkdXJpbmcgZmlyc3QgcnVuXG4vLyBXZSBtaWdodCB3YW50IHRvIGNvbnNpZGVyIG5vdCBzdXBwb3J0aW5nIHJ1bm5pbmcgdGhlIGRlZmF1bHQgbWV0cmljcyBmdW5jdGlvbiBtb3JlIHRoYW4gb25jZVxubGV0IGluaXQgPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0YXJ0RGVmYXVsdE1ldHJpY3MoY29uZmlnKSB7XG5cdGxldCBub3JtYWxpemVkQ29uZmlnID0gY29uZmlnO1xuXHRpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ251bWJlcicpIHtcblx0XHRwcmludERlcHJlY2F0aW9uQ29sbGVjdERlZmF1bHRNZXRyaWNzTnVtYmVyKGNvbmZpZyk7XG5cblx0XHRub3JtYWxpemVkQ29uZmlnID0geyB0aW1lb3V0OiBjb25maWcgfTtcblx0fVxuXG5cdG5vcm1hbGl6ZWRDb25maWcgPSBPYmplY3QuYXNzaWduKFxuXHRcdHtcblx0XHRcdHRpbWVzdGFtcHM6IHRydWUsXG5cdFx0XHR0aW1lb3V0OiAxMDAwMFxuXHRcdH0sXG5cdFx0bm9ybWFsaXplZENvbmZpZ1xuXHQpO1xuXG5cdGlmIChleGlzdGluZ0ludGVydmFsICE9PSBudWxsKSB7XG5cdFx0Y2xlYXJJbnRlcnZhbChleGlzdGluZ0ludGVydmFsKTtcblx0fVxuXG5cdGNvbnN0IGluaXRpYWxpc2VkTWV0cmljcyA9IG1ldHJpY3NMaXN0Lm1hcChtZXRyaWMgPT4ge1xuXHRcdGNvbnN0IGRlZmF1bHRNZXRyaWMgPSBtZXRyaWNzW21ldHJpY107XG5cdFx0aWYgKCFpbml0KSB7XG5cdFx0XHRkZWZhdWx0TWV0cmljLm1ldHJpY05hbWVzLm1hcChcblx0XHRcdFx0Z2xvYmFsUmVnaXN0cnkucmVtb3ZlU2luZ2xlTWV0cmljLFxuXHRcdFx0XHRnbG9iYWxSZWdpc3RyeVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGVmYXVsdE1ldHJpYyhub3JtYWxpemVkQ29uZmlnLnJlZ2lzdGVyLCBub3JtYWxpemVkQ29uZmlnKTtcblx0fSk7XG5cblx0ZnVuY3Rpb24gdXBkYXRlQWxsTWV0cmljcygpIHtcblx0XHRpbml0aWFsaXNlZE1ldHJpY3MuZm9yRWFjaChtZXRyaWMgPT4gbWV0cmljLmNhbGwoKSk7XG5cdH1cblxuXHR1cGRhdGVBbGxNZXRyaWNzKCk7XG5cblx0ZXhpc3RpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKFxuXHRcdHVwZGF0ZUFsbE1ldHJpY3MsXG5cdFx0bm9ybWFsaXplZENvbmZpZy50aW1lb3V0XG5cdCkudW5yZWYoKTtcblxuXHRpbml0ID0gZmFsc2U7XG5cblx0cmV0dXJuIGV4aXN0aW5nSW50ZXJ2YWw7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5tZXRyaWNzTGlzdCA9IG1ldHJpY3NMaXN0O1xuIiwiLyoqXG4gKiBHYXVnZSBtZXRyaWNcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgeyBnbG9iYWxSZWdpc3RyeSB9ID0gcmVxdWlyZSgnLi9yZWdpc3RyeScpO1xuY29uc3QgdHlwZSA9ICdnYXVnZSc7XG5cbmNvbnN0IHtcblx0aXNEYXRlLFxuXHRzZXRWYWx1ZSxcblx0Z2V0UHJvcGVydGllc0Zyb21PYmosXG5cdGdldExhYmVscyxcblx0aGFzaE9iamVjdCxcblx0aXNPYmplY3QsXG5cdHByaW50RGVwcmVjYXRpb25PYmplY3RDb25zdHJ1Y3Rvcixcblx0cmVtb3ZlTGFiZWxzXG59ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5jb25zdCB7XG5cdHZhbGlkYXRlTWV0cmljTmFtZSxcblx0dmFsaWRhdGVMYWJlbCxcblx0dmFsaWRhdGVMYWJlbE5hbWVcbn0gPSByZXF1aXJlKCcuL3ZhbGlkYXRpb24nKTtcblxuY2xhc3MgR2F1Z2Uge1xuXHQvKipcblx0ICogR2F1Z2Vcblx0ICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBOYW1lIG9mIHRoZSBtZXRyaWNcblx0ICogQHBhcmFtIHtzdHJpbmd9IGhlbHAgLSBIZWxwIGZvciB0aGUgbWV0cmljXG5cdCAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IGxhYmVscyAtIEFycmF5IHdpdGggc3RyaW5ncywgYWxsIGxhYmVsIGtleXdvcmRzIHN1cHBvcnRlZFxuXHQgKi9cblx0Y29uc3RydWN0b3IobmFtZSwgaGVscCwgbGFiZWxzKSB7XG5cdFx0bGV0IGNvbmZpZztcblx0XHRpZiAoaXNPYmplY3QobmFtZSkpIHtcblx0XHRcdGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsYWJlbE5hbWVzOiBbXVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRuYW1lXG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAoIWNvbmZpZy5yZWdpc3RlcnMpIHtcblx0XHRcdFx0Y29uZmlnLnJlZ2lzdGVycyA9IFtnbG9iYWxSZWdpc3RyeV07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHByaW50RGVwcmVjYXRpb25PYmplY3RDb25zdHJ1Y3RvcigpO1xuXHRcdFx0Y29uZmlnID0ge1xuXHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRoZWxwLFxuXHRcdFx0XHRsYWJlbE5hbWVzOiBsYWJlbHMsXG5cdFx0XHRcdHJlZ2lzdGVyczogW2dsb2JhbFJlZ2lzdHJ5XVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRpZiAoIWNvbmZpZy5oZWxwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFuZGF0b3J5IGhlbHAgcGFyYW1ldGVyJyk7XG5cdFx0fVxuXHRcdGlmICghY29uZmlnLm5hbWUpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYW5kYXRvcnkgbmFtZSBwYXJhbWV0ZXInKTtcblx0XHR9XG5cdFx0aWYgKCF2YWxpZGF0ZU1ldHJpY05hbWUoY29uZmlnLm5hbWUpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWV0cmljIG5hbWUnKTtcblx0XHR9XG5cdFx0aWYgKCF2YWxpZGF0ZUxhYmVsTmFtZShjb25maWcubGFiZWxOYW1lcykpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsYWJlbCBuYW1lJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5uYW1lID0gY29uZmlnLm5hbWU7XG5cdFx0dGhpcy5sYWJlbE5hbWVzID0gY29uZmlnLmxhYmVsTmFtZXMgfHwgW107XG5cdFx0dGhpcy5yZXNldCgpO1xuXHRcdHRoaXMuaGVscCA9IGNvbmZpZy5oZWxwO1xuXHRcdHRoaXMuYWdncmVnYXRvciA9IGNvbmZpZy5hZ2dyZWdhdG9yIHx8ICdzdW0nO1xuXG5cdFx0Y29uZmlnLnJlZ2lzdGVycy5mb3JFYWNoKHJlZ2lzdHJ5SW5zdGFuY2UgPT5cblx0XHRcdHJlZ2lzdHJ5SW5zdGFuY2UucmVnaXN0ZXJNZXRyaWModGhpcylcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBhIGdhdWdlIHRvIGEgdmFsdWVcblx0ICogQHBhcmFtIHtvYmplY3R9IGxhYmVscyAtIE9iamVjdCB3aXRoIGxhYmVscyBhbmQgdGhlaXIgdmFsdWVzXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIFZhbHVlIHRvIHNldCB0aGUgZ2F1Z2UgdG8sIG11c3QgYmUgcG9zaXRpdmVcblx0ICogQHBhcmFtIHsoTnVtYmVyfERhdGUpfSB0aW1lc3RhbXAgLSBUaW1lc3RhbXAgdG8gc2V0IHRoZSBnYXVnZSB0b1xuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdHNldChsYWJlbHMsIHZhbHVlLCB0aW1lc3RhbXApIHtcblx0XHRpZiAoIWlzT2JqZWN0KGxhYmVscykpIHtcblx0XHRcdHJldHVybiBzZXQuY2FsbCh0aGlzLCBudWxsKShsYWJlbHMsIHZhbHVlKTtcblx0XHR9XG5cdFx0cmV0dXJuIHNldC5jYWxsKHRoaXMsIGxhYmVscykodmFsdWUsIHRpbWVzdGFtcCk7XG5cdH1cblxuXHQvKipcblx0ICogUmVzZXQgZ2F1Z2Vcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRyZXNldCgpIHtcblx0XHRyZXR1cm4gcmVzZXQuY2FsbCh0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbmNyZW1lbnQgYSBnYXVnZSB2YWx1ZVxuXHQgKiBAcGFyYW0ge29iamVjdH0gbGFiZWxzIC0gT2JqZWN0IHdpdGggbGFiZWxzIHdoZXJlIGtleSBpcyB0aGUgbGFiZWwga2V5IGFuZCB2YWx1ZSBpcyBsYWJlbCB2YWx1ZS4gQ2FuIG9ubHkgYmUgb25lIGxldmVsIGRlZXBcblx0ICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlIC0gVmFsdWUgdG8gaW5jcmVtZW50IC0gaWYgb21pdHRlZCwgaW5jcmVtZW50IHdpdGggMVxuXHQgKiBAcGFyYW0geyhOdW1iZXJ8RGF0ZSl9IHRpbWVzdGFtcCAtIFRpbWVzdGFtcCB0byBzZXQgdGhlIGdhdWdlIHRvXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0aW5jKGxhYmVscywgdmFsdWUsIHRpbWVzdGFtcCkge1xuXHRcdGluYy5jYWxsKHRoaXMsIGxhYmVscykodmFsdWUsIHRpbWVzdGFtcCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVjcmVtZW50IGEgZ2F1Z2UgdmFsdWVcblx0ICogQHBhcmFtIHtvYmplY3R9IGxhYmVscyAtIE9iamVjdCB3aXRoIGxhYmVscyB3aGVyZSBrZXkgaXMgdGhlIGxhYmVsIGtleSBhbmQgdmFsdWUgaXMgbGFiZWwgdmFsdWUuIENhbiBvbmx5IGJlIG9uZSBsZXZlbCBkZWVwXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIFZhbHVlIHRvIGRlY3JlbWVudCAtIGlmIG9taXR0ZWQsIGRlY3JlbWVudCB3aXRoIDFcblx0ICogQHBhcmFtIHsoTnVtYmVyfERhdGUpfSB0aW1lc3RhbXAgLSBUaW1lc3RhbXAgdG8gc2V0IHRoZSBnYXVnZSB0b1xuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdGRlYyhsYWJlbHMsIHZhbHVlLCB0aW1lc3RhbXApIHtcblx0XHRkZWMuY2FsbCh0aGlzLCBsYWJlbHMpKHZhbHVlLCB0aW1lc3RhbXApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB0aGUgZ2F1Z2UgdG8gY3VycmVudCB1bml4IGVwb2NoXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBsYWJlbHMgLSBPYmplY3Qgd2l0aCBsYWJlbHMgd2hlcmUga2V5IGlzIHRoZSBsYWJlbCBrZXkgYW5kIHZhbHVlIGlzIGxhYmVsIHZhbHVlLiBDYW4gb25seSBiZSBvbmUgbGV2ZWwgZGVlcFxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdHNldFRvQ3VycmVudFRpbWUobGFiZWxzKSB7XG5cdFx0cmV0dXJuIHNldFRvQ3VycmVudFRpbWUuY2FsbCh0aGlzLCBsYWJlbHMpKCk7XG5cdH1cblxuXHQvKipcblx0ICogU3RhcnQgYSB0aW1lclxuXHQgKiBAcGFyYW0ge29iamVjdH0gbGFiZWxzIC0gT2JqZWN0IHdpdGggbGFiZWxzIHdoZXJlIGtleSBpcyB0aGUgbGFiZWwga2V5IGFuZCB2YWx1ZSBpcyBsYWJlbCB2YWx1ZS4gQ2FuIG9ubHkgYmUgb25lIGxldmVsIGRlZXBcblx0ICogQHJldHVybnMge2Z1bmN0aW9ufSAtIEludm9rZSB0aGlzIGZ1bmN0aW9uIHRvIHNldCB0aGUgZHVyYXRpb24gaW4gc2Vjb25kcyBzaW5jZSB5b3Ugc3RhcnRlZCB0aGUgdGltZXIuXG5cdCAqIEBleGFtcGxlXG5cdCAqIHZhciBkb25lID0gZ2F1Z2Uuc3RhcnRUaW1lcigpO1xuXHQgKiBtYWtlWEhSUmVxdWVzdChmdW5jdGlvbihlcnIsIHJlc3BvbnNlKSB7XG5cdCAqXHRkb25lKCk7IC8vRHVyYXRpb24gb2YgdGhlIHJlcXVlc3Qgd2lsbCBiZSBzYXZlZFxuXHQgKiB9KTtcblx0ICovXG5cdHN0YXJ0VGltZXIobGFiZWxzKSB7XG5cdFx0cmV0dXJuIHN0YXJ0VGltZXIuY2FsbCh0aGlzLCBsYWJlbHMpKCk7XG5cdH1cblxuXHRnZXQoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGhlbHA6IHRoaXMuaGVscCxcblx0XHRcdG5hbWU6IHRoaXMubmFtZSxcblx0XHRcdHR5cGUsXG5cdFx0XHR2YWx1ZXM6IGdldFByb3BlcnRpZXNGcm9tT2JqKHRoaXMuaGFzaE1hcCksXG5cdFx0XHRhZ2dyZWdhdG9yOiB0aGlzLmFnZ3JlZ2F0b3Jcblx0XHR9O1xuXHR9XG5cblx0X2dldFZhbHVlKGxhYmVscykge1xuXHRcdGNvbnN0IGhhc2ggPSBoYXNoT2JqZWN0KGxhYmVscyB8fCB7fSk7XG5cdFx0cmV0dXJuIHRoaXMuaGFzaE1hcFtoYXNoXSA/IHRoaXMuaGFzaE1hcFtoYXNoXS52YWx1ZSA6IDA7XG5cdH1cblxuXHRsYWJlbHMoKSB7XG5cdFx0Y29uc3QgbGFiZWxzID0gZ2V0TGFiZWxzKHRoaXMubGFiZWxOYW1lcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5jOiBpbmMuY2FsbCh0aGlzLCBsYWJlbHMpLFxuXHRcdFx0ZGVjOiBkZWMuY2FsbCh0aGlzLCBsYWJlbHMpLFxuXHRcdFx0c2V0OiBzZXQuY2FsbCh0aGlzLCBsYWJlbHMpLFxuXHRcdFx0c2V0VG9DdXJyZW50VGltZTogc2V0VG9DdXJyZW50VGltZS5jYWxsKHRoaXMsIGxhYmVscyksXG5cdFx0XHRzdGFydFRpbWVyOiBzdGFydFRpbWVyLmNhbGwodGhpcywgbGFiZWxzKVxuXHRcdH07XG5cdH1cblxuXHRyZW1vdmUoKSB7XG5cdFx0Y29uc3QgbGFiZWxzID0gZ2V0TGFiZWxzKHRoaXMubGFiZWxOYW1lcywgYXJndW1lbnRzKTtcblx0XHRyZW1vdmVMYWJlbHMuY2FsbCh0aGlzLCB0aGlzLmhhc2hNYXAsIGxhYmVscyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gc2V0VG9DdXJyZW50VGltZShsYWJlbHMpIHtcblx0cmV0dXJuICgpID0+IHtcblx0XHRjb25zdCBub3cgPSBEYXRlLm5vdygpIC8gMTAwMDtcblx0XHRpZiAobGFiZWxzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuc2V0KG5vdyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0KGxhYmVscywgbm93KTtcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIHN0YXJ0VGltZXIoc3RhcnRMYWJlbHMpIHtcblx0cmV0dXJuICgpID0+IHtcblx0XHRjb25zdCBzdGFydCA9IHByb2Nlc3MuaHJ0aW1lKCk7XG5cdFx0cmV0dXJuIGVuZExhYmVscyA9PiB7XG5cdFx0XHRjb25zdCBkZWx0YSA9IHByb2Nlc3MuaHJ0aW1lKHN0YXJ0KTtcblx0XHRcdHRoaXMuc2V0KFxuXHRcdFx0XHRPYmplY3QuYXNzaWduKHt9LCBzdGFydExhYmVscywgZW5kTGFiZWxzKSxcblx0XHRcdFx0ZGVsdGFbMF0gKyBkZWx0YVsxXSAvIDFlOVxuXHRcdFx0KTtcblx0XHR9O1xuXHR9O1xufVxuXG5mdW5jdGlvbiBkZWMobGFiZWxzKSB7XG5cdHJldHVybiAodmFsdWUsIHRpbWVzdGFtcCkgPT4ge1xuXHRcdGNvbnN0IGRhdGEgPSBjb252ZXJ0TGFiZWxzQW5kVmFsdWVzKGxhYmVscywgdmFsdWUpO1xuXHRcdHRoaXMuc2V0KFxuXHRcdFx0ZGF0YS5sYWJlbHMsXG5cdFx0XHR0aGlzLl9nZXRWYWx1ZShkYXRhLmxhYmVscykgLSAoZGF0YS52YWx1ZSB8fCAxKSxcblx0XHRcdHRpbWVzdGFtcFxuXHRcdCk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIGluYyhsYWJlbHMpIHtcblx0cmV0dXJuICh2YWx1ZSwgdGltZXN0YW1wKSA9PiB7XG5cdFx0Y29uc3QgZGF0YSA9IGNvbnZlcnRMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZSk7XG5cdFx0dGhpcy5zZXQoXG5cdFx0XHRkYXRhLmxhYmVscyxcblx0XHRcdHRoaXMuX2dldFZhbHVlKGRhdGEubGFiZWxzKSArIChkYXRhLnZhbHVlIHx8IDEpLFxuXHRcdFx0dGltZXN0YW1wXG5cdFx0KTtcblx0fTtcbn1cblxuZnVuY3Rpb24gc2V0KGxhYmVscykge1xuXHRyZXR1cm4gKHZhbHVlLCB0aW1lc3RhbXApID0+IHtcblx0XHRpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgVmFsdWUgaXMgbm90IGEgdmFsaWQgbnVtYmVyOiAke3V0aWwuZm9ybWF0KHZhbHVlKX1gKTtcblx0XHR9XG5cdFx0aWYgKHRpbWVzdGFtcCAmJiAhaXNEYXRlKHRpbWVzdGFtcCkgJiYgIU51bWJlci5pc0Zpbml0ZSh0aW1lc3RhbXApKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHRgVGltZXN0YW1wIGlzIG5vdCBhIHZhbGlkIGRhdGUgb3IgbnVtYmVyOiAke3V0aWwuZm9ybWF0KHRpbWVzdGFtcCl9YFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRsYWJlbHMgPSBsYWJlbHMgfHwge307XG5cblx0XHR2YWxpZGF0ZUxhYmVsKHRoaXMubGFiZWxOYW1lcywgbGFiZWxzKTtcblx0XHR0aGlzLmhhc2hNYXAgPSBzZXRWYWx1ZSh0aGlzLmhhc2hNYXAsIHZhbHVlLCBsYWJlbHMsIHRpbWVzdGFtcCk7XG5cdH07XG59XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuXHR0aGlzLmhhc2hNYXAgPSB7fTtcblxuXHRpZiAodGhpcy5sYWJlbE5hbWVzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRoaXMuaGFzaE1hcCA9IHNldFZhbHVlKHt9LCAwLCB7fSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY29udmVydExhYmVsc0FuZFZhbHVlcyhsYWJlbHMsIHZhbHVlKSB7XG5cdGlmICghaXNPYmplY3QobGFiZWxzKSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZTogbGFiZWxzLFxuXHRcdFx0bGFiZWxzOiB7fVxuXHRcdH07XG5cdH1cblx0cmV0dXJuIHtcblx0XHRsYWJlbHMsXG5cdFx0dmFsdWVcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYXVnZTtcbiIsIi8qKlxuICogSGlzdG9ncmFtXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbmNvbnN0IGdsb2JhbFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi9yZWdpc3RyeScpLmdsb2JhbFJlZ2lzdHJ5O1xuY29uc3QgdHlwZSA9ICdoaXN0b2dyYW0nO1xuY29uc3Qge1xuXHRnZXRQcm9wZXJ0aWVzRnJvbU9iaixcblx0Z2V0TGFiZWxzLFxuXHRoYXNoT2JqZWN0LFxuXHRpc09iamVjdCxcblx0cHJpbnREZXByZWNhdGlvbk9iamVjdENvbnN0cnVjdG9yLFxuXHRyZW1vdmVMYWJlbHNcbn0gPSByZXF1aXJlKCcuL3V0aWwnKTtcbmNvbnN0IHtcblx0dmFsaWRhdGVNZXRyaWNOYW1lLFxuXHR2YWxpZGF0ZUxhYmVsLFxuXHR2YWxpZGF0ZUxhYmVsTmFtZVxufSA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvbicpO1xuXG5jbGFzcyBIaXN0b2dyYW0ge1xuXHQvKipcblx0ICogSGlzdG9ncmFtXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gTmFtZSBvZiB0aGUgbWV0cmljXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBoZWxwIC0gSGVscCBmb3IgdGhlIG1ldHJpY1xuXHQgKiBAcGFyYW0ge29iamVjdHxBcnJheS48c3RyaW5nPn0gbGFiZWxzT3JDb25mIC0gRWl0aGVyIGFycmF5IG9mIGxhYmVsIG5hbWVzIG9yIGNvbmZpZyBvYmplY3QgYXMgYSBrZXktdmFsdWUgb2JqZWN0XG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBjb25mIC0gQ29uZmlndXJhdGlvbiBvYmplY3Rcblx0ICovXG5cdGNvbnN0cnVjdG9yKG5hbWUsIGhlbHAsIGxhYmVsc09yQ29uZiwgY29uZikge1xuXHRcdGxldCBjb25maWc7XG5cblx0XHRpZiAoaXNPYmplY3QobmFtZSkpIHtcblx0XHRcdGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRidWNrZXRzOiBbMC4wMDUsIDAuMDEsIDAuMDI1LCAwLjA1LCAwLjEsIDAuMjUsIDAuNSwgMSwgMi41LCA1LCAxMF0sXG5cdFx0XHRcdFx0bGFiZWxOYW1lczogW11cblx0XHRcdFx0fSxcblx0XHRcdFx0bmFtZVxuXHRcdFx0KTtcblxuXHRcdFx0aWYgKCFjb25maWcucmVnaXN0ZXJzKSB7XG5cdFx0XHRcdGNvbmZpZy5yZWdpc3RlcnMgPSBbZ2xvYmFsUmVnaXN0cnldO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgb2JqO1xuXHRcdFx0bGV0IGxhYmVscyA9IFtdO1xuXG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShsYWJlbHNPckNvbmYpKSB7XG5cdFx0XHRcdG9iaiA9IGNvbmYgfHwge307XG5cdFx0XHRcdGxhYmVscyA9IGxhYmVsc09yQ29uZjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9iaiA9IGxhYmVsc09yQ29uZiB8fCB7fTtcblx0XHRcdH1cblxuXHRcdFx0cHJpbnREZXByZWNhdGlvbk9iamVjdENvbnN0cnVjdG9yKCk7XG5cblx0XHRcdGNvbmZpZyA9IHtcblx0XHRcdFx0bmFtZSxcblx0XHRcdFx0bGFiZWxOYW1lczogbGFiZWxzLFxuXHRcdFx0XHRoZWxwLFxuXHRcdFx0XHRidWNrZXRzOiBjb25maWd1cmVVcHBlcmJvdW5kcyhvYmouYnVja2V0cyksXG5cdFx0XHRcdHJlZ2lzdGVyczogW2dsb2JhbFJlZ2lzdHJ5XVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0dmFsaWRhdGVJbnB1dChjb25maWcubmFtZSwgY29uZmlnLmhlbHAsIGNvbmZpZy5sYWJlbE5hbWVzKTtcblxuXHRcdHRoaXMubmFtZSA9IGNvbmZpZy5uYW1lO1xuXHRcdHRoaXMuaGVscCA9IGNvbmZpZy5oZWxwO1xuXHRcdHRoaXMuYWdncmVnYXRvciA9IGNvbmZpZy5hZ2dyZWdhdG9yIHx8ICdzdW0nO1xuXG5cdFx0dGhpcy51cHBlckJvdW5kcyA9IGNvbmZpZy5idWNrZXRzO1xuXHRcdHRoaXMuYnVja2V0VmFsdWVzID0gdGhpcy51cHBlckJvdW5kcy5yZWR1Y2UoKGFjYywgdXBwZXJCb3VuZCkgPT4ge1xuXHRcdFx0YWNjW3VwcGVyQm91bmRdID0gMDtcblx0XHRcdHJldHVybiBhY2M7XG5cdFx0fSwge30pO1xuXG5cdFx0T2JqZWN0LmZyZWV6ZSh0aGlzLmJ1Y2tldFZhbHVlcyk7XG5cdFx0T2JqZWN0LmZyZWV6ZSh0aGlzLnVwcGVyQm91bmRzKTtcblx0XHR0aGlzLnN1bSA9IDA7XG5cdFx0dGhpcy5jb3VudCA9IDA7XG5cblx0XHR0aGlzLmhhc2hNYXAgPSB7fTtcblx0XHR0aGlzLmxhYmVsTmFtZXMgPSBjb25maWcubGFiZWxOYW1lcyB8fCBbXTtcblxuXHRcdGlmICh0aGlzLmxhYmVsTmFtZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHR0aGlzLmhhc2hNYXAgPSB7XG5cdFx0XHRcdFtoYXNoT2JqZWN0KHt9KV06IGNyZWF0ZUJhc2VWYWx1ZXMoXG5cdFx0XHRcdFx0e30sXG5cdFx0XHRcdFx0T2JqZWN0LmFzc2lnbih7fSwgdGhpcy5idWNrZXRWYWx1ZXMpXG5cdFx0XHRcdClcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Y29uZmlnLnJlZ2lzdGVycy5mb3JFYWNoKHJlZ2lzdHJ5SW5zdGFuY2UgPT5cblx0XHRcdHJlZ2lzdHJ5SW5zdGFuY2UucmVnaXN0ZXJNZXRyaWModGhpcylcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE9ic2VydmUgYSB2YWx1ZSBpbiBoaXN0b2dyYW1cblx0ICogQHBhcmFtIHtvYmplY3R9IGxhYmVscyAtIE9iamVjdCB3aXRoIGxhYmVscyB3aGVyZSBrZXkgaXMgdGhlIGxhYmVsIGtleSBhbmQgdmFsdWUgaXMgbGFiZWwgdmFsdWUuIENhbiBvbmx5IGJlIG9uZSBsZXZlbCBkZWVwXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZSAtIFZhbHVlIHRvIG9ic2VydmUgaW4gdGhlIGhpc3RvZ3JhbVxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdG9ic2VydmUobGFiZWxzLCB2YWx1ZSkge1xuXHRcdG9ic2VydmUuY2FsbCh0aGlzLCBsYWJlbHMgPT09IDAgPyAwIDogbGFiZWxzIHx8IHt9KSh2YWx1ZSk7XG5cdH1cblxuXHRnZXQoKSB7XG5cdFx0Y29uc3QgZGF0YSA9IGdldFByb3BlcnRpZXNGcm9tT2JqKHRoaXMuaGFzaE1hcCk7XG5cdFx0Y29uc3QgdmFsdWVzID0gZGF0YVxuXHRcdFx0Lm1hcChleHRyYWN0QnVja2V0VmFsdWVzRm9yRXhwb3J0KHRoaXMpKVxuXHRcdFx0LnJlZHVjZShhZGRTdW1BbmRDb3VudEZvckV4cG9ydCh0aGlzKSwgW10pO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdG5hbWU6IHRoaXMubmFtZSxcblx0XHRcdGhlbHA6IHRoaXMuaGVscCxcblx0XHRcdHR5cGUsXG5cdFx0XHR2YWx1ZXMsXG5cdFx0XHRhZ2dyZWdhdG9yOiB0aGlzLmFnZ3JlZ2F0b3Jcblx0XHR9O1xuXHR9XG5cblx0cmVzZXQoKSB7XG5cdFx0dGhpcy5zdW0gPSAwO1xuXHRcdHRoaXMuY291bnQgPSAwO1xuXHRcdHRoaXMuaGFzaE1hcCA9IHt9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFN0YXJ0IGEgdGltZXIgdGhhdCBjb3VsZCBiZSB1c2VkIHRvIGxvZ2dpbmcgZHVyYXRpb25zXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBsYWJlbHMgLSBPYmplY3Qgd2l0aCBsYWJlbHMgd2hlcmUga2V5IGlzIHRoZSBsYWJlbCBrZXkgYW5kIHZhbHVlIGlzIGxhYmVsIHZhbHVlLiBDYW4gb25seSBiZSBvbmUgbGV2ZWwgZGVlcFxuXHQgKiBAcmV0dXJucyB7ZnVuY3Rpb259IC0gRnVuY3Rpb24gdG8gaW52b2tlIHdoZW4geW91IHdhbnQgdG8gc3RvcCB0aGUgdGltZXIgYW5kIG9ic2VydmUgdGhlIGR1cmF0aW9uIGluIHNlY29uZHNcblx0ICogQGV4YW1wbGVcblx0ICogdmFyIGVuZCA9IGhpc3RvZ3JhbS5zdGFydFRpbWVyKCk7XG5cdCAqIG1ha2VFeHBlbnNpdmVYSFJSZXF1ZXN0KGZ1bmN0aW9uKGVyciwgcmVzKSB7XG5cdCAqXHRlbmQoKTsgLy9PYnNlcnZlIHRoZSBkdXJhdGlvbiBvZiBleHBlbnNpdmVYSFJSZXF1ZXN0XG5cdCAqIH0pO1xuXHQgKi9cblx0c3RhcnRUaW1lcihsYWJlbHMpIHtcblx0XHRyZXR1cm4gc3RhcnRUaW1lci5jYWxsKHRoaXMsIGxhYmVscykoKTtcblx0fVxuXG5cdGxhYmVscygpIHtcblx0XHRjb25zdCBsYWJlbHMgPSBnZXRMYWJlbHModGhpcy5sYWJlbE5hbWVzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRvYnNlcnZlOiBvYnNlcnZlLmNhbGwodGhpcywgbGFiZWxzKSxcblx0XHRcdHN0YXJ0VGltZXI6IHN0YXJ0VGltZXIuY2FsbCh0aGlzLCBsYWJlbHMpXG5cdFx0fTtcblx0fVxuXG5cdHJlbW92ZSgpIHtcblx0XHRjb25zdCBsYWJlbHMgPSBnZXRMYWJlbHModGhpcy5sYWJlbE5hbWVzLCBhcmd1bWVudHMpO1xuXHRcdHJlbW92ZUxhYmVscy5jYWxsKHRoaXMsIHRoaXMuaGFzaE1hcCwgbGFiZWxzKTtcblx0fVxufVxuXG5mdW5jdGlvbiBzdGFydFRpbWVyKHN0YXJ0TGFiZWxzKSB7XG5cdHJldHVybiAoKSA9PiB7XG5cdFx0Y29uc3Qgc3RhcnQgPSBwcm9jZXNzLmhydGltZSgpO1xuXHRcdHJldHVybiBlbmRMYWJlbHMgPT4ge1xuXHRcdFx0Y29uc3QgZGVsdGEgPSBwcm9jZXNzLmhydGltZShzdGFydCk7XG5cdFx0XHR0aGlzLm9ic2VydmUoXG5cdFx0XHRcdE9iamVjdC5hc3NpZ24oe30sIHN0YXJ0TGFiZWxzLCBlbmRMYWJlbHMpLFxuXHRcdFx0XHRkZWx0YVswXSArIGRlbHRhWzFdIC8gMWU5XG5cdFx0XHQpO1xuXHRcdH07XG5cdH07XG59XG5mdW5jdGlvbiB2YWxpZGF0ZUlucHV0KG5hbWUsIGhlbHAsIGxhYmVscykge1xuXHRpZiAoIWhlbHApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFuZGF0b3J5IGhlbHAgcGFyYW1ldGVyJyk7XG5cdH1cblx0aWYgKCFuYW1lKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIG1hbmRhdG9yeSBuYW1lIHBhcmFtZXRlcicpO1xuXHR9XG5cblx0aWYgKCF2YWxpZGF0ZU1ldHJpY05hbWUobmFtZSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWV0cmljIG5hbWUnKTtcblx0fVxuXG5cdGlmICghdmFsaWRhdGVMYWJlbE5hbWUobGFiZWxzKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsYWJlbCBuYW1lJyk7XG5cdH1cblxuXHRsYWJlbHMuZm9yRWFjaChsYWJlbCA9PiB7XG5cdFx0aWYgKGxhYmVsID09PSAnbGUnKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2xlIGlzIGEgcmVzZXJ2ZWQgbGFiZWwga2V5d29yZCcpO1xuXHRcdH1cblx0fSk7XG59XG5cbmZ1bmN0aW9uIGNvbmZpZ3VyZVVwcGVyYm91bmRzKGNvbmZpZ3VyZWRCdWNrZXRzKSB7XG5cdGNvbnN0IGRlZmF1bHRCdWNrZXRzID0gW1xuXHRcdDAuMDA1LFxuXHRcdDAuMDEsXG5cdFx0MC4wMjUsXG5cdFx0MC4wNSxcblx0XHQwLjEsXG5cdFx0MC4yNSxcblx0XHQwLjUsXG5cdFx0MSxcblx0XHQyLjUsXG5cdFx0NSxcblx0XHQxMFxuXHRdO1xuXHRyZXR1cm4gW10uY29uY2F0KGNvbmZpZ3VyZWRCdWNrZXRzIHx8IGRlZmF1bHRCdWNrZXRzKS5zb3J0KHNvcnRBc2NlbmRpbmcpO1xufVxuXG5mdW5jdGlvbiBzb3J0QXNjZW5kaW5nKHgsIHkpIHtcblx0cmV0dXJuIHggLSB5O1xufVxuXG5mdW5jdGlvbiBzZXRWYWx1ZVBhaXIobGFiZWxzLCB2YWx1ZSwgbWV0cmljTmFtZSkge1xuXHRyZXR1cm4ge1xuXHRcdGxhYmVscyxcblx0XHR2YWx1ZSxcblx0XHRtZXRyaWNOYW1lXG5cdH07XG59XG5cbmZ1bmN0aW9uIGZpbmRCb3VuZCh1cHBlckJvdW5kcywgdmFsdWUpIHtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCB1cHBlckJvdW5kcy5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IGJvdW5kID0gdXBwZXJCb3VuZHNbaV07XG5cdFx0aWYgKHZhbHVlIDw9IGJvdW5kKSB7XG5cdFx0XHRyZXR1cm4gYm91bmQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZShsYWJlbHMpIHtcblx0cmV0dXJuIHZhbHVlID0+IHtcblx0XHRjb25zdCBsYWJlbFZhbHVlUGFpciA9IGNvbnZlcnRMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZSk7XG5cblx0XHR2YWxpZGF0ZUxhYmVsKHRoaXMubGFiZWxOYW1lcywgbGFiZWxWYWx1ZVBhaXIubGFiZWxzKTtcblx0XHRpZiAoIU51bWJlci5pc0Zpbml0ZShsYWJlbFZhbHVlUGFpci52YWx1ZSkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdGBWYWx1ZSBpcyBub3QgYSB2YWxpZCBudW1iZXI6ICR7dXRpbC5mb3JtYXQobGFiZWxWYWx1ZVBhaXIudmFsdWUpfWBcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaGFzaCA9IGhhc2hPYmplY3QobGFiZWxWYWx1ZVBhaXIubGFiZWxzKTtcblx0XHRsZXQgdmFsdWVGcm9tTWFwID0gdGhpcy5oYXNoTWFwW2hhc2hdO1xuXHRcdGlmICghdmFsdWVGcm9tTWFwKSB7XG5cdFx0XHR2YWx1ZUZyb21NYXAgPSBjcmVhdGVCYXNlVmFsdWVzKFxuXHRcdFx0XHRsYWJlbFZhbHVlUGFpci5sYWJlbHMsXG5cdFx0XHRcdE9iamVjdC5hc3NpZ24oe30sIHRoaXMuYnVja2V0VmFsdWVzKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBiID0gZmluZEJvdW5kKHRoaXMudXBwZXJCb3VuZHMsIGxhYmVsVmFsdWVQYWlyLnZhbHVlKTtcblxuXHRcdHZhbHVlRnJvbU1hcC5zdW0gKz0gbGFiZWxWYWx1ZVBhaXIudmFsdWU7XG5cdFx0dmFsdWVGcm9tTWFwLmNvdW50ICs9IDE7XG5cblx0XHRpZiAodmFsdWVGcm9tTWFwLmJ1Y2tldFZhbHVlcy5oYXNPd25Qcm9wZXJ0eShiKSkge1xuXHRcdFx0dmFsdWVGcm9tTWFwLmJ1Y2tldFZhbHVlc1tiXSArPSAxO1xuXHRcdH1cblxuXHRcdHRoaXMuaGFzaE1hcFtoYXNoXSA9IHZhbHVlRnJvbU1hcDtcblx0fTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQmFzZVZhbHVlcyhsYWJlbHMsIGJ1Y2tldFZhbHVlcykge1xuXHRyZXR1cm4ge1xuXHRcdGxhYmVscyxcblx0XHRidWNrZXRWYWx1ZXMsXG5cdFx0c3VtOiAwLFxuXHRcdGNvdW50OiAwXG5cdH07XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZSkge1xuXHRpZiAoIWlzT2JqZWN0KGxhYmVscykpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IGxhYmVscyxcblx0XHRcdGxhYmVsczoge31cblx0XHR9O1xuXHR9XG5cdHJldHVybiB7XG5cdFx0bGFiZWxzLFxuXHRcdHZhbHVlXG5cdH07XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RCdWNrZXRWYWx1ZXNGb3JFeHBvcnQoaGlzdG9ncmFtKSB7XG5cdHJldHVybiBidWNrZXREYXRhID0+IHtcblx0XHRjb25zdCBidWNrZXRzID0gW107XG5cdFx0Y29uc3QgYnVja2V0TGFiZWxOYW1lcyA9IE9iamVjdC5rZXlzKGJ1Y2tldERhdGEubGFiZWxzKTtcblx0XHRsZXQgYWNjID0gMDtcblx0XHRmb3IgKGNvbnN0IHVwcGVyQm91bmQgb2YgaGlzdG9ncmFtLnVwcGVyQm91bmRzKSB7XG5cdFx0XHRhY2MgKz0gYnVja2V0RGF0YS5idWNrZXRWYWx1ZXNbdXBwZXJCb3VuZF07XG5cdFx0XHRjb25zdCBsYmxzID0geyBsZTogdXBwZXJCb3VuZCB9O1xuXHRcdFx0Zm9yIChjb25zdCBsYWJlbE5hbWUgb2YgYnVja2V0TGFiZWxOYW1lcykge1xuXHRcdFx0XHRsYmxzW2xhYmVsTmFtZV0gPSBidWNrZXREYXRhLmxhYmVsc1tsYWJlbE5hbWVdO1xuXHRcdFx0fVxuXHRcdFx0YnVja2V0cy5wdXNoKHNldFZhbHVlUGFpcihsYmxzLCBhY2MsIGAke2hpc3RvZ3JhbS5uYW1lfV9idWNrZXRgKSk7XG5cdFx0fVxuXHRcdHJldHVybiB7IGJ1Y2tldHMsIGRhdGE6IGJ1Y2tldERhdGEgfTtcblx0fTtcbn1cblxuZnVuY3Rpb24gYWRkU3VtQW5kQ291bnRGb3JFeHBvcnQoaGlzdG9ncmFtKSB7XG5cdHJldHVybiAoYWNjLCBkKSA9PiB7XG5cdFx0YWNjLnB1c2goLi4uZC5idWNrZXRzKTtcblxuXHRcdGNvbnN0IGluZkxhYmVsID0geyBsZTogJytJbmYnIH07XG5cdFx0Zm9yIChjb25zdCBsYWJlbCBvZiBPYmplY3Qua2V5cyhkLmRhdGEubGFiZWxzKSkge1xuXHRcdFx0aW5mTGFiZWxbbGFiZWxdID0gZC5kYXRhLmxhYmVsc1tsYWJlbF07XG5cdFx0fVxuXHRcdGFjYy5wdXNoKFxuXHRcdFx0c2V0VmFsdWVQYWlyKGluZkxhYmVsLCBkLmRhdGEuY291bnQsIGAke2hpc3RvZ3JhbS5uYW1lfV9idWNrZXRgKSxcblx0XHRcdHNldFZhbHVlUGFpcihkLmRhdGEubGFiZWxzLCBkLmRhdGEuc3VtLCBgJHtoaXN0b2dyYW0ubmFtZX1fc3VtYCksXG5cdFx0XHRzZXRWYWx1ZVBhaXIoZC5kYXRhLmxhYmVscywgZC5kYXRhLmNvdW50LCBgJHtoaXN0b2dyYW0ubmFtZX1fY291bnRgKVxuXHRcdCk7XG5cdFx0cmV0dXJuIGFjYztcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIaXN0b2dyYW07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgR3JvdXBlciwgaGFzaE9iamVjdCB9ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBmdW5jdGlvbiB0aGF0IGFwcGxpZXMgdGhlIGBhZ2dyZWdhdG9yRm5gIHRvIHRoZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhZ2dyZWdhdG9yRm4gZnVuY3Rpb24gdG8gYXBwbHkgdG8gdmFsdWVzLlxuICogQHJldHVybiB7RnVuY3Rpb259IGFnZ3JlZ2F0b3IgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gQWdncmVnYXRvckZhY3RvcnkoYWdncmVnYXRvckZuKSB7XG5cdHJldHVybiBtZXRyaWNzID0+IHtcblx0XHRpZiAobWV0cmljcy5sZW5ndGggPT09IDApIHJldHVybjtcblx0XHRjb25zdCByZXN1bHQgPSB7XG5cdFx0XHRoZWxwOiBtZXRyaWNzWzBdLmhlbHAsXG5cdFx0XHRuYW1lOiBtZXRyaWNzWzBdLm5hbWUsXG5cdFx0XHR0eXBlOiBtZXRyaWNzWzBdLnR5cGUsXG5cdFx0XHR2YWx1ZXM6IFtdLFxuXHRcdFx0YWdncmVnYXRvcjogbWV0cmljc1swXS5hZ2dyZWdhdG9yXG5cdFx0fTtcblx0XHQvLyBHYXRoZXIgbWV0cmljcyBieSBtZXRyaWNOYW1lIGFuZCBsYWJlbHMuXG5cdFx0Y29uc3QgYnlMYWJlbHMgPSBuZXcgR3JvdXBlcigpO1xuXHRcdG1ldHJpY3MuZm9yRWFjaChtZXRyaWMgPT4ge1xuXHRcdFx0bWV0cmljLnZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcblx0XHRcdFx0Y29uc3Qga2V5ID0gaGFzaE9iamVjdCh2YWx1ZS5sYWJlbHMpO1xuXHRcdFx0XHRieUxhYmVscy5hZGQoYCR7dmFsdWUubWV0cmljTmFtZX1fJHtrZXl9YCwgdmFsdWUpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0Ly8gQXBwbHkgYWdncmVnYXRvciBmdW5jdGlvbiB0byBnYXRoZXJlZCBtZXRyaWNzLlxuXHRcdGJ5TGFiZWxzLmZvckVhY2godmFsdWVzID0+IHtcblx0XHRcdGlmICh2YWx1ZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cdFx0XHRjb25zdCB2YWxPYmogPSB7XG5cdFx0XHRcdHZhbHVlOiBhZ2dyZWdhdG9yRm4odmFsdWVzKSxcblx0XHRcdFx0bGFiZWxzOiB2YWx1ZXNbMF0ubGFiZWxzXG5cdFx0XHR9O1xuXHRcdFx0aWYgKHZhbHVlc1swXS5tZXRyaWNOYW1lKSB7XG5cdFx0XHRcdHZhbE9iai5tZXRyaWNOYW1lID0gdmFsdWVzWzBdLm1ldHJpY05hbWU7XG5cdFx0XHR9XG5cdFx0XHQvLyBOQjogVGltZXN0YW1wcyBhcmUgb21pdHRlZC5cblx0XHRcdHJlc3VsdC52YWx1ZXMucHVzaCh2YWxPYmopO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG59XG4vLyBFeHBvcnQgZm9yIHVzZXJzIHRvIGRlZmluZSB0aGVpciBvd24gYWdncmVnYXRpb24gbWV0aG9kcy5cbmV4cG9ydHMuQWdncmVnYXRvckZhY3RvcnkgPSBBZ2dyZWdhdG9yRmFjdG9yeTtcblxuLyoqXG4gKiBGdW5jdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBhZ2dyZWdhdGUgbWV0cmljcyBmcm9tIG11bHRpcGxlIHJlZ2lzdHJpZXMuXG4gKi9cbmV4cG9ydHMuYWdncmVnYXRvcnMgPSB7XG5cdC8qKlxuXHQgKiBAcmV0dXJuIFRoZSBzdW0gb2YgdmFsdWVzLlxuXHQgKi9cblx0c3VtOiBBZ2dyZWdhdG9yRmFjdG9yeSh2ID0+IHYucmVkdWNlKChwLCBjKSA9PiBwICsgYy52YWx1ZSwgMCkpLFxuXHQvKipcblx0ICogQHJldHVybiBUaGUgZmlyc3QgdmFsdWUuXG5cdCAqL1xuXHRmaXJzdDogQWdncmVnYXRvckZhY3RvcnkodiA9PiB2WzBdLnZhbHVlKSxcblx0LyoqXG5cdCAqIEByZXR1cm4ge3VuZGVmaW5lZH0gVW5kZWZpbmVkOyBvbWl0cyB0aGUgbWV0cmljLlxuXHQgKi9cblx0b21pdDogKCkgPT4ge30sXG5cdC8qKlxuXHQgKiBAcmV0dXJuIFRoZSBhcml0aG1ldGljIG1lYW4gb2YgdGhlIHZhbHVlcy5cblx0ICovXG5cdGF2ZXJhZ2U6IEFnZ3JlZ2F0b3JGYWN0b3J5KFxuXHRcdHYgPT4gdi5yZWR1Y2UoKHAsIGMpID0+IHAgKyBjLnZhbHVlLCAwKSAvIHYubGVuZ3RoXG5cdCksXG5cdC8qKlxuXHQgKiBAcmV0dXJuIFRoZSBtaW5pbXVtIG9mIHRoZSB2YWx1ZXMuXG5cdCAqL1xuXHRtaW46IEFnZ3JlZ2F0b3JGYWN0b3J5KHYgPT5cblx0XHR2LnJlZHVjZSgocCwgYykgPT4gTWF0aC5taW4ocCwgYy52YWx1ZSksIEluZmluaXR5KVxuXHQpLFxuXHQvKipcblx0ICogQHJldHVybiBUaGUgbWF4aW11bSBvZiB0aGUgdmFsdWVzLlxuXHQgKi9cblx0bWF4OiBBZ2dyZWdhdG9yRmFjdG9yeSh2ID0+XG5cdFx0di5yZWR1Y2UoKHAsIGMpID0+IE1hdGgubWF4KHAsIGMudmFsdWUpLCAtSW5maW5pdHkpXG5cdClcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEdhdWdlID0gcmVxdWlyZSgnLi4vZ2F1Z2UnKTtcblxuY29uc3QgTk9ERUpTX0VWRU5UTE9PUF9MQUcgPSAnbm9kZWpzX2V2ZW50bG9vcF9sYWdfc2Vjb25kcyc7XG5cbmZ1bmN0aW9uIHJlcG9ydEV2ZW50bG9vcExhZyhzdGFydCwgZ2F1Z2UpIHtcblx0Y29uc3QgZGVsdGEgPSBwcm9jZXNzLmhydGltZShzdGFydCk7XG5cdGNvbnN0IG5hbm9zZWMgPSBkZWx0YVswXSAqIDFlOSArIGRlbHRhWzFdO1xuXHRjb25zdCBzZWNvbmRzID0gbmFub3NlYyAvIDFlOTtcblxuXHRnYXVnZS5zZXQoc2Vjb25kcywgRGF0ZS5ub3coKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlZ2lzdHJ5LCBjb25maWcgPSB7fSkgPT4ge1xuXHRjb25zdCBuYW1lUHJlZml4ID0gY29uZmlnLnByZWZpeCA/IGNvbmZpZy5wcmVmaXggOiAnJztcblxuXHRjb25zdCBnYXVnZSA9IG5ldyBHYXVnZSh7XG5cdFx0bmFtZTogbmFtZVByZWZpeCArIE5PREVKU19FVkVOVExPT1BfTEFHLFxuXHRcdGhlbHA6ICdMYWcgb2YgZXZlbnQgbG9vcCBpbiBzZWNvbmRzLicsXG5cdFx0cmVnaXN0ZXJzOiByZWdpc3RyeSA/IFtyZWdpc3RyeV0gOiB1bmRlZmluZWQsXG5cdFx0YWdncmVnYXRvcjogJ2F2ZXJhZ2UnXG5cdH0pO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0Y29uc3Qgc3RhcnQgPSBwcm9jZXNzLmhydGltZSgpO1xuXHRcdHNldEltbWVkaWF0ZShyZXBvcnRFdmVudGxvb3BMYWcsIHN0YXJ0LCBnYXVnZSk7XG5cdH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5tZXRyaWNOYW1lcyA9IFtOT0RFSlNfRVZFTlRMT09QX0xBR107XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEdhdWdlID0gcmVxdWlyZSgnLi4vZ2F1Z2UnKTtcbmNvbnN0IHNhZmVNZW1vcnlVc2FnZSA9IHJlcXVpcmUoJy4vaGVscGVycy9zYWZlTWVtb3J5VXNhZ2UnKTtcblxuY29uc3QgTk9ERUpTX0hFQVBfU0laRV9UT1RBTCA9ICdub2RlanNfaGVhcF9zaXplX3RvdGFsX2J5dGVzJztcbmNvbnN0IE5PREVKU19IRUFQX1NJWkVfVVNFRCA9ICdub2RlanNfaGVhcF9zaXplX3VzZWRfYnl0ZXMnO1xuY29uc3QgTk9ERUpTX0VYVEVSTkFMX01FTU9SWSA9ICdub2RlanNfZXh0ZXJuYWxfbWVtb3J5X2J5dGVzJztcblxubW9kdWxlLmV4cG9ydHMgPSAocmVnaXN0cnksIGNvbmZpZyA9IHt9KSA9PiB7XG5cdGlmICh0eXBlb2YgcHJvY2Vzcy5tZW1vcnlVc2FnZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiAoKSA9PiB7fTtcblx0fVxuXG5cdGNvbnN0IHJlZ2lzdGVycyA9IHJlZ2lzdHJ5ID8gW3JlZ2lzdHJ5XSA6IHVuZGVmaW5lZDtcblx0Y29uc3QgbmFtZVByZWZpeCA9IGNvbmZpZy5wcmVmaXggPyBjb25maWcucHJlZml4IDogJyc7XG5cblx0Y29uc3QgaGVhcFNpemVUb3RhbCA9IG5ldyBHYXVnZSh7XG5cdFx0bmFtZTogbmFtZVByZWZpeCArIE5PREVKU19IRUFQX1NJWkVfVE9UQUwsXG5cdFx0aGVscDogJ1Byb2Nlc3MgaGVhcCBzaXplIGZyb20gbm9kZS5qcyBpbiBieXRlcy4nLFxuXHRcdHJlZ2lzdGVyc1xuXHR9KTtcblx0Y29uc3QgaGVhcFNpemVVc2VkID0gbmV3IEdhdWdlKHtcblx0XHRuYW1lOiBuYW1lUHJlZml4ICsgTk9ERUpTX0hFQVBfU0laRV9VU0VELFxuXHRcdGhlbHA6ICdQcm9jZXNzIGhlYXAgc2l6ZSB1c2VkIGZyb20gbm9kZS5qcyBpbiBieXRlcy4nLFxuXHRcdHJlZ2lzdGVyc1xuXHR9KTtcblx0bGV0IGV4dGVybmFsTWVtVXNlZDtcblxuXHRjb25zdCB1c2FnZSA9IHNhZmVNZW1vcnlVc2FnZSgpO1xuXHRpZiAodXNhZ2UgJiYgdXNhZ2UuZXh0ZXJuYWwpIHtcblx0XHRleHRlcm5hbE1lbVVzZWQgPSBuZXcgR2F1Z2Uoe1xuXHRcdFx0bmFtZTogbmFtZVByZWZpeCArIE5PREVKU19FWFRFUk5BTF9NRU1PUlksXG5cdFx0XHRoZWxwOiAnTm9kZWpzIGV4dGVybmFsIG1lbW9yeSBzaXplIGluIGJ5dGVzLicsXG5cdFx0XHRyZWdpc3RlcnNcblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0Ly8gcHJvY2Vzcy5tZW1vcnlVc2FnZSgpIGNhbiB0aHJvdyBFTUZJTEUgZXJyb3JzLCBzZWUgIzY3XG5cdFx0Y29uc3QgbWVtVXNhZ2UgPSBzYWZlTWVtb3J5VXNhZ2UoKTtcblx0XHRpZiAobWVtVXNhZ2UpIHtcblx0XHRcdGlmIChjb25maWcudGltZXN0YW1wcykge1xuXHRcdFx0XHRjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXHRcdFx0XHRoZWFwU2l6ZVRvdGFsLnNldChtZW1Vc2FnZS5oZWFwVG90YWwsIG5vdyk7XG5cdFx0XHRcdGhlYXBTaXplVXNlZC5zZXQobWVtVXNhZ2UuaGVhcFVzZWQsIG5vdyk7XG5cdFx0XHRcdGlmIChtZW1Vc2FnZS5leHRlcm5hbCAmJiBleHRlcm5hbE1lbVVzZWQpIHtcblx0XHRcdFx0XHRleHRlcm5hbE1lbVVzZWQuc2V0KG1lbVVzYWdlLmV4dGVybmFsLCBub3cpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRoZWFwU2l6ZVRvdGFsLnNldChtZW1Vc2FnZS5oZWFwVG90YWwpO1xuXHRcdFx0XHRoZWFwU2l6ZVVzZWQuc2V0KG1lbVVzYWdlLmhlYXBVc2VkKTtcblx0XHRcdFx0aWYgKG1lbVVzYWdlLmV4dGVybmFsICYmIGV4dGVybmFsTWVtVXNlZCkge1xuXHRcdFx0XHRcdGV4dGVybmFsTWVtVXNlZC5zZXQobWVtVXNhZ2UuZXh0ZXJuYWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHRvdGFsOiBoZWFwU2l6ZVRvdGFsLFxuXHRcdFx0dXNlZDogaGVhcFNpemVVc2VkLFxuXHRcdFx0ZXh0ZXJuYWw6IGV4dGVybmFsTWVtVXNlZFxuXHRcdH07XG5cdH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5tZXRyaWNOYW1lcyA9IFtcblx0Tk9ERUpTX0hFQVBfU0laRV9UT1RBTCxcblx0Tk9ERUpTX0hFQVBfU0laRV9VU0VELFxuXHROT0RFSlNfRVhURVJOQUxfTUVNT1JZXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBHYXVnZSA9IHJlcXVpcmUoJy4uL2dhdWdlJyk7XG5sZXQgdjg7XG5cbnRyeSB7XG5cdHY4ID0gcmVxdWlyZSgndjgnKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gbm9kZSB2ZXJzaW9uIGlzIHRvbyBvbGRcblx0Ly8gcHJvYmFibHkgd2UgY2FuIHVzZSB2OC1oZWFwLXNwYWNlLXN0YXRpc3RpY3MgZm9yID49bm9kZS00LjAuMCBhbmQgPG5vZGUtNi4wLjBcbn1cblxuY29uc3QgTUVUUklDUyA9IFsndG90YWwnLCAndXNlZCcsICdhdmFpbGFibGUnXTtcblxuY29uc3QgTk9ERUpTX0hFQVBfU0laRSA9IHt9O1xuXG5NRVRSSUNTLmZvckVhY2gobWV0cmljVHlwZSA9PiB7XG5cdE5PREVKU19IRUFQX1NJWkVbbWV0cmljVHlwZV0gPSBgbm9kZWpzX2hlYXBfc3BhY2Vfc2l6ZV8ke21ldHJpY1R5cGV9X2J5dGVzYDtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChyZWdpc3RyeSwgY29uZmlnID0ge30pID0+IHtcblx0aWYgKFxuXHRcdHR5cGVvZiB2OCA9PT0gJ3VuZGVmaW5lZCcgfHxcblx0XHR0eXBlb2YgdjguZ2V0SGVhcFNwYWNlU3RhdGlzdGljcyAhPT0gJ2Z1bmN0aW9uJ1xuXHQpIHtcblx0XHRyZXR1cm4gKCkgPT4ge307XG5cdH1cblxuXHRjb25zdCByZWdpc3RlcnMgPSByZWdpc3RyeSA/IFtyZWdpc3RyeV0gOiB1bmRlZmluZWQ7XG5cdGNvbnN0IG5hbWVQcmVmaXggPSBjb25maWcucHJlZml4ID8gY29uZmlnLnByZWZpeCA6ICcnO1xuXG5cdGNvbnN0IGdhdWdlcyA9IHt9O1xuXG5cdE1FVFJJQ1MuZm9yRWFjaChtZXRyaWNUeXBlID0+IHtcblx0XHRnYXVnZXNbbWV0cmljVHlwZV0gPSBuZXcgR2F1Z2Uoe1xuXHRcdFx0bmFtZTogbmFtZVByZWZpeCArIE5PREVKU19IRUFQX1NJWkVbbWV0cmljVHlwZV0sXG5cdFx0XHRoZWxwOiBgUHJvY2VzcyBoZWFwIHNwYWNlIHNpemUgJHttZXRyaWNUeXBlfSBmcm9tIG5vZGUuanMgaW4gYnl0ZXMuYCxcblx0XHRcdGxhYmVsTmFtZXM6IFsnc3BhY2UnXSxcblx0XHRcdHJlZ2lzdGVyc1xuXHRcdH0pO1xuXHR9KTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGNvbnN0IGRhdGEgPSB7XG5cdFx0XHR0b3RhbDoge30sXG5cdFx0XHR1c2VkOiB7fSxcblx0XHRcdGF2YWlsYWJsZToge31cblx0XHR9O1xuXHRcdGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cblx0XHR2OC5nZXRIZWFwU3BhY2VTdGF0aXN0aWNzKCkuZm9yRWFjaChzcGFjZSA9PiB7XG5cdFx0XHRjb25zdCBzcGFjZU5hbWUgPSBzcGFjZS5zcGFjZV9uYW1lLnN1YnN0cihcblx0XHRcdFx0MCxcblx0XHRcdFx0c3BhY2Uuc3BhY2VfbmFtZS5pbmRleE9mKCdfc3BhY2UnKVxuXHRcdFx0KTtcblxuXHRcdFx0ZGF0YS50b3RhbFtzcGFjZU5hbWVdID0gc3BhY2Uuc3BhY2Vfc2l6ZTtcblx0XHRcdGRhdGEudXNlZFtzcGFjZU5hbWVdID0gc3BhY2Uuc3BhY2VfdXNlZF9zaXplO1xuXHRcdFx0ZGF0YS5hdmFpbGFibGVbc3BhY2VOYW1lXSA9IHNwYWNlLnNwYWNlX2F2YWlsYWJsZV9zaXplO1xuXG5cdFx0XHRnYXVnZXMudG90YWwuc2V0KHsgc3BhY2U6IHNwYWNlTmFtZSB9LCBzcGFjZS5zcGFjZV9zaXplLCBub3cpO1xuXHRcdFx0Z2F1Z2VzLnVzZWQuc2V0KHsgc3BhY2U6IHNwYWNlTmFtZSB9LCBzcGFjZS5zcGFjZV91c2VkX3NpemUsIG5vdyk7XG5cdFx0XHRnYXVnZXMuYXZhaWxhYmxlLnNldChcblx0XHRcdFx0eyBzcGFjZTogc3BhY2VOYW1lIH0sXG5cdFx0XHRcdHNwYWNlLnNwYWNlX2F2YWlsYWJsZV9zaXplLFxuXHRcdFx0XHRub3dcblx0XHRcdCk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZGF0YTtcblx0fTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLm1ldHJpY05hbWVzID0gTUVUUklDUy5tYXAoXG5cdG1ldHJpY1R5cGUgPT4gTk9ERUpTX0hFQVBfU0laRVttZXRyaWNUeXBlXVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gYWdncmVnYXRlQnlPYmplY3ROYW1lKGxpc3QpIHtcblx0Y29uc3QgZGF0YSA9IHt9O1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IGxpc3RFbGVtZW50ID0gbGlzdFtpXTtcblxuXHRcdGlmICghbGlzdEVsZW1lbnQgfHwgdHlwZW9mIGxpc3RFbGVtZW50LmNvbnN0cnVjdG9yID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkobGlzdEVsZW1lbnQuY29uc3RydWN0b3IubmFtZSkpIHtcblx0XHRcdGRhdGFbbGlzdEVsZW1lbnQuY29uc3RydWN0b3IubmFtZV0gKz0gMTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YVtsaXN0RWxlbWVudC5jb25zdHJ1Y3Rvci5uYW1lXSA9IDE7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVNZXRyaWNzKGdhdWdlLCBkYXRhLCBpbmNsdWRlVGltZXN0YW1wKSB7XG5cdGdhdWdlLnJlc2V0KCk7XG5cdGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcblx0XHRpZiAoaW5jbHVkZVRpbWVzdGFtcCkge1xuXHRcdFx0Z2F1Z2Uuc2V0KHsgdHlwZToga2V5IH0sIGRhdGFba2V5XSwgRGF0ZS5ub3coKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGdhdWdlLnNldCh7IHR5cGU6IGtleSB9LCBkYXRhW2tleV0pO1xuXHRcdH1cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0YWdncmVnYXRlQnlPYmplY3ROYW1lLFxuXHR1cGRhdGVNZXRyaWNzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBzYWZlTWVtb3J5VXNhZ2UoKSB7XG5cdGxldCBtZW1vcnlVc2FnZTtcblx0dHJ5IHtcblx0XHRtZW1vcnlVc2FnZSA9IHByb2Nlc3MubWVtb3J5VXNhZ2UoKTtcblx0fSBjYXRjaCAoZXgpIHtcblx0XHQvLyBlbXB0eVxuXHR9XG5cblx0cmV0dXJuIG1lbW9yeVVzYWdlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNhZmVNZW1vcnlVc2FnZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgR2F1Z2UgPSByZXF1aXJlKCcuLi9nYXVnZScpO1xuY29uc3QgbGludXhWYXJpYW50ID0gcmVxdWlyZSgnLi9vc01lbW9yeUhlYXBMaW51eCcpO1xuY29uc3Qgc2FmZU1lbW9yeVVzYWdlID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NhZmVNZW1vcnlVc2FnZScpO1xuXG5jb25zdCBQUk9DRVNTX1JFU0lERU5UX01FTU9SWSA9ICdwcm9jZXNzX3Jlc2lkZW50X21lbW9yeV9ieXRlcyc7XG5cbmZ1bmN0aW9uIG5vdExpbnV4VmFyaWFudChyZWdpc3RyeSwgY29uZmlnID0ge30pIHtcblx0Y29uc3QgbmFtZVByZWZpeCA9IGNvbmZpZy5wcmVmaXggPyBjb25maWcucHJlZml4IDogJyc7XG5cblx0Y29uc3QgcmVzaWRlbnRNZW1HYXVnZSA9IG5ldyBHYXVnZSh7XG5cdFx0bmFtZTogbmFtZVByZWZpeCArIFBST0NFU1NfUkVTSURFTlRfTUVNT1JZLFxuXHRcdGhlbHA6ICdSZXNpZGVudCBtZW1vcnkgc2l6ZSBpbiBieXRlcy4nLFxuXHRcdHJlZ2lzdGVyczogcmVnaXN0cnkgPyBbcmVnaXN0cnldIDogdW5kZWZpbmVkXG5cdH0pO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0Y29uc3QgbWVtVXNhZ2UgPSBzYWZlTWVtb3J5VXNhZ2UoKTtcblxuXHRcdC8vIEkgZG9uJ3QgdGhpbmsgdGhlIG90aGVyIHRoaW5ncyByZXR1cm5lZCBmcm9tIGBwcm9jZXNzLm1lbW9yeVVzYWdlKClgIGlzIHJlbGV2YW50IHRvIGEgc3RhbmRhcmQgZXhwb3J0XG5cdFx0aWYgKG1lbVVzYWdlKSB7XG5cdFx0XHRyZXNpZGVudE1lbUdhdWdlLnNldChtZW1Vc2FnZS5yc3MsIERhdGUubm93KCkpO1xuXHRcdH1cblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSAocmVnaXN0cnksIGNvbmZpZykgPT5cblx0cHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2xpbnV4J1xuXHRcdD8gbGludXhWYXJpYW50KHJlZ2lzdHJ5LCBjb25maWcpXG5cdFx0OiBub3RMaW51eFZhcmlhbnQocmVnaXN0cnksIGNvbmZpZyk7XG5cbm1vZHVsZS5leHBvcnRzLm1ldHJpY05hbWVzID1cblx0cHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2xpbnV4J1xuXHRcdD8gbGludXhWYXJpYW50Lm1ldHJpY05hbWVzXG5cdFx0OiBbUFJPQ0VTU19SRVNJREVOVF9NRU1PUlldO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBHYXVnZSA9IHJlcXVpcmUoJy4uL2dhdWdlJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG5cbmNvbnN0IHZhbHVlcyA9IFsnVm1TaXplJywgJ1ZtUlNTJywgJ1ZtRGF0YSddO1xuXG5jb25zdCBQUk9DRVNTX1JFU0lERU5UX01FTU9SWSA9ICdwcm9jZXNzX3Jlc2lkZW50X21lbW9yeV9ieXRlcyc7XG5jb25zdCBQUk9DRVNTX1ZJUlRVQUxfTUVNT1JZID0gJ3Byb2Nlc3NfdmlydHVhbF9tZW1vcnlfYnl0ZXMnO1xuY29uc3QgUFJPQ0VTU19IRUFQID0gJ3Byb2Nlc3NfaGVhcF9ieXRlcyc7XG5cbmZ1bmN0aW9uIHN0cnVjdHVyZU91dHB1dChpbnB1dCkge1xuXHRjb25zdCByZXR1cm5WYWx1ZSA9IHt9O1xuXG5cdGlucHV0XG5cdFx0LnNwbGl0KCdcXG4nKVxuXHRcdC5maWx0ZXIocyA9PiB2YWx1ZXMuc29tZSh2YWx1ZSA9PiBzLmluZGV4T2YodmFsdWUpID09PSAwKSlcblx0XHQuZm9yRWFjaChzdHJpbmcgPT4ge1xuXHRcdFx0Y29uc3Qgc3BsaXQgPSBzdHJpbmcuc3BsaXQoJzonKTtcblxuXHRcdFx0Ly8gR2V0IHRoZSB2YWx1ZVxuXHRcdFx0bGV0IHZhbHVlID0gc3BsaXRbMV0udHJpbSgpO1xuXHRcdFx0Ly8gUmVtb3ZlIHRyYWlsaW5nIGAga2JgXG5cdFx0XHR2YWx1ZSA9IHZhbHVlLnN1YnN0cigwLCB2YWx1ZS5sZW5ndGggLSAzKTtcblx0XHRcdC8vIE1ha2UgaXQgaW50byBhIG51bWJlciBpbiBieXRlcyBieXRlc1xuXHRcdFx0dmFsdWUgPSBOdW1iZXIodmFsdWUpICogMTAyNDtcblxuXHRcdFx0cmV0dXJuVmFsdWVbc3BsaXRbMF1dID0gdmFsdWU7XG5cdFx0fSk7XG5cblx0cmV0dXJuIHJldHVyblZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IChyZWdpc3RyeSwgY29uZmlnID0ge30pID0+IHtcblx0Y29uc3QgcmVnaXN0ZXJzID0gcmVnaXN0cnkgPyBbcmVnaXN0cnldIDogdW5kZWZpbmVkO1xuXHRjb25zdCBuYW1lUHJlZml4ID0gY29uZmlnLnByZWZpeCA/IGNvbmZpZy5wcmVmaXggOiAnJztcblxuXHRjb25zdCByZXNpZGVudE1lbUdhdWdlID0gbmV3IEdhdWdlKHtcblx0XHRuYW1lOiBuYW1lUHJlZml4ICsgUFJPQ0VTU19SRVNJREVOVF9NRU1PUlksXG5cdFx0aGVscDogJ1Jlc2lkZW50IG1lbW9yeSBzaXplIGluIGJ5dGVzLicsXG5cdFx0cmVnaXN0ZXJzXG5cdH0pO1xuXHRjb25zdCB2aXJ0dWFsTWVtR2F1Z2UgPSBuZXcgR2F1Z2Uoe1xuXHRcdG5hbWU6IG5hbWVQcmVmaXggKyBQUk9DRVNTX1ZJUlRVQUxfTUVNT1JZLFxuXHRcdGhlbHA6ICdWaXJ0dWFsIG1lbW9yeSBzaXplIGluIGJ5dGVzLicsXG5cdFx0cmVnaXN0ZXJzXG5cdH0pO1xuXHRjb25zdCBoZWFwU2l6ZU1lbUdhdWdlID0gbmV3IEdhdWdlKHtcblx0XHRuYW1lOiBuYW1lUHJlZml4ICsgUFJPQ0VTU19IRUFQLFxuXHRcdGhlbHA6ICdQcm9jZXNzIGhlYXAgc2l6ZSBpbiBieXRlcy4nLFxuXHRcdHJlZ2lzdGVyc1xuXHR9KTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGZzLnJlYWRGaWxlKCcvcHJvYy9zZWxmL3N0YXR1cycsICd1dGY4JywgKGVyciwgc3RhdHVzKSA9PiB7XG5cdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cdFx0XHRjb25zdCBzdHJ1Y3R1cmVkT3V0cHV0ID0gc3RydWN0dXJlT3V0cHV0KHN0YXR1cyk7XG5cblx0XHRcdHJlc2lkZW50TWVtR2F1Z2Uuc2V0KHN0cnVjdHVyZWRPdXRwdXQuVm1SU1MsIG5vdyk7XG5cdFx0XHR2aXJ0dWFsTWVtR2F1Z2Uuc2V0KHN0cnVjdHVyZWRPdXRwdXQuVm1TaXplLCBub3cpO1xuXHRcdFx0aGVhcFNpemVNZW1HYXVnZS5zZXQoc3RydWN0dXJlZE91dHB1dC5WbURhdGEsIG5vdyk7XG5cdFx0fSk7XG5cdH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5tZXRyaWNOYW1lcyA9IFtcblx0UFJPQ0VTU19SRVNJREVOVF9NRU1PUlksXG5cdFBST0NFU1NfVklSVFVBTF9NRU1PUlksXG5cdFBST0NFU1NfSEVBUFxuXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQ291bnRlciA9IHJlcXVpcmUoJy4uL2NvdW50ZXInKTtcbmNvbnN0IFBST0NFU1NfQ1BVX1VTRVJfU0VDT05EUyA9ICdwcm9jZXNzX2NwdV91c2VyX3NlY29uZHNfdG90YWwnO1xuY29uc3QgUFJPQ0VTU19DUFVfU1lTVEVNX1NFQ09ORFMgPSAncHJvY2Vzc19jcHVfc3lzdGVtX3NlY29uZHNfdG90YWwnO1xuY29uc3QgUFJPQ0VTU19DUFVfU0VDT05EUyA9ICdwcm9jZXNzX2NwdV9zZWNvbmRzX3RvdGFsJztcblxubW9kdWxlLmV4cG9ydHMgPSAocmVnaXN0cnksIGNvbmZpZyA9IHt9KSA9PiB7XG5cdC8vIERvbid0IGRvIGFueXRoaW5nIGlmIHRoZSBmdW5jdGlvbiBkb2Vzbid0IGV4aXN0IChpbnRyb2R1Y2VkIGluIG5vZGVANi4xLjApXG5cdGlmICh0eXBlb2YgcHJvY2Vzcy5jcHVVc2FnZSAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiAoKSA9PiB7fTtcblx0fVxuXG5cdGNvbnN0IHJlZ2lzdGVycyA9IHJlZ2lzdHJ5ID8gW3JlZ2lzdHJ5XSA6IHVuZGVmaW5lZDtcblx0Y29uc3QgbmFtZVByZWZpeCA9IGNvbmZpZy5wcmVmaXggPyBjb25maWcucHJlZml4IDogJyc7XG5cblx0Y29uc3QgY3B1VXNlclVzYWdlQ291bnRlciA9IG5ldyBDb3VudGVyKHtcblx0XHRuYW1lOiBuYW1lUHJlZml4ICsgUFJPQ0VTU19DUFVfVVNFUl9TRUNPTkRTLFxuXHRcdGhlbHA6ICdUb3RhbCB1c2VyIENQVSB0aW1lIHNwZW50IGluIHNlY29uZHMuJyxcblx0XHRyZWdpc3RlcnNcblx0fSk7XG5cdGNvbnN0IGNwdVN5c3RlbVVzYWdlQ291bnRlciA9IG5ldyBDb3VudGVyKHtcblx0XHRuYW1lOiBuYW1lUHJlZml4ICsgUFJPQ0VTU19DUFVfU1lTVEVNX1NFQ09ORFMsXG5cdFx0aGVscDogJ1RvdGFsIHN5c3RlbSBDUFUgdGltZSBzcGVudCBpbiBzZWNvbmRzLicsXG5cdFx0cmVnaXN0ZXJzXG5cdH0pO1xuXHRjb25zdCBjcHVVc2FnZUNvdW50ZXIgPSBuZXcgQ291bnRlcih7XG5cdFx0bmFtZTogbmFtZVByZWZpeCArIFBST0NFU1NfQ1BVX1NFQ09ORFMsXG5cdFx0aGVscDogJ1RvdGFsIHVzZXIgYW5kIHN5c3RlbSBDUFUgdGltZSBzcGVudCBpbiBzZWNvbmRzLicsXG5cdFx0cmVnaXN0ZXJzXG5cdH0pO1xuXG5cdGxldCBsYXN0Q3B1VXNhZ2UgPSBwcm9jZXNzLmNwdVVzYWdlKCk7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRjb25zdCBjcHVVc2FnZSA9IHByb2Nlc3MuY3B1VXNhZ2UoKTtcblx0XHRjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG5cdFx0Y29uc3QgdXNlclVzYWdlTWljcm9zID0gY3B1VXNhZ2UudXNlciAtIGxhc3RDcHVVc2FnZS51c2VyO1xuXHRcdGNvbnN0IHN5c3RlbVVzYWdlTWljcm9zID0gY3B1VXNhZ2Uuc3lzdGVtIC0gbGFzdENwdVVzYWdlLnN5c3RlbTtcblxuXHRcdGxhc3RDcHVVc2FnZSA9IGNwdVVzYWdlO1xuXG5cdFx0Y3B1VXNlclVzYWdlQ291bnRlci5pbmModXNlclVzYWdlTWljcm9zIC8gMWU2LCBub3cpO1xuXHRcdGNwdVN5c3RlbVVzYWdlQ291bnRlci5pbmMoc3lzdGVtVXNhZ2VNaWNyb3MgLyAxZTYsIG5vdyk7XG5cdFx0Y3B1VXNhZ2VDb3VudGVyLmluYygodXNlclVzYWdlTWljcm9zICsgc3lzdGVtVXNhZ2VNaWNyb3MpIC8gMWU2LCBub3cpO1xuXHR9O1xufTtcblxubW9kdWxlLmV4cG9ydHMubWV0cmljTmFtZXMgPSBbXG5cdFBST0NFU1NfQ1BVX1VTRVJfU0VDT05EUyxcblx0UFJPQ0VTU19DUFVfU1lTVEVNX1NFQ09ORFMsXG5cdFBST0NFU1NfQ1BVX1NFQ09ORFNcbl07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgYWdncmVnYXRlQnlPYmplY3ROYW1lIH0gPSByZXF1aXJlKCcuL2hlbHBlcnMvcHJvY2Vzc01ldHJpY3NIZWxwZXJzJyk7XG5jb25zdCB7IHVwZGF0ZU1ldHJpY3MgfSA9IHJlcXVpcmUoJy4vaGVscGVycy9wcm9jZXNzTWV0cmljc0hlbHBlcnMnKTtcbmNvbnN0IEdhdWdlID0gcmVxdWlyZSgnLi4vZ2F1Z2UnKTtcblxuY29uc3QgTk9ERUpTX0FDVElWRV9IQU5ETEVTID0gJ25vZGVqc19hY3RpdmVfaGFuZGxlcyc7XG5jb25zdCBOT0RFSlNfQUNUSVZFX0hBTkRMRVNfVE9UQUwgPSAnbm9kZWpzX2FjdGl2ZV9oYW5kbGVzX3RvdGFsJztcblxubW9kdWxlLmV4cG9ydHMgPSAocmVnaXN0cnksIGNvbmZpZyA9IHt9KSA9PiB7XG5cdC8vIERvbid0IGRvIGFueXRoaW5nIGlmIHRoZSBmdW5jdGlvbiBpcyByZW1vdmVkIGluIGxhdGVyIG5vZGVzIChleGlzdHMgaW4gbm9kZUA2KVxuXHRpZiAodHlwZW9mIHByb2Nlc3MuX2dldEFjdGl2ZUhhbmRsZXMgIT09ICdmdW5jdGlvbicpIHtcblx0XHRyZXR1cm4gKCkgPT4ge307XG5cdH1cblxuXHRjb25zdCBuYW1lUHJlZml4ID0gY29uZmlnLnByZWZpeCA/IGNvbmZpZy5wcmVmaXggOiAnJztcblxuXHRjb25zdCBnYXVnZSA9IG5ldyBHYXVnZSh7XG5cdFx0bmFtZTogbmFtZVByZWZpeCArIE5PREVKU19BQ1RJVkVfSEFORExFUyxcblx0XHRoZWxwOlxuXHRcdFx0J051bWJlciBvZiBhY3RpdmUgbGlidXYgaGFuZGxlcyBncm91cGVkIGJ5IGhhbmRsZSB0eXBlLiBFdmVyeSBoYW5kbGUgdHlwZSBpcyBDKysgY2xhc3MgbmFtZS4nLFxuXHRcdGxhYmVsTmFtZXM6IFsndHlwZSddLFxuXHRcdHJlZ2lzdGVyczogcmVnaXN0cnkgPyBbcmVnaXN0cnldIDogdW5kZWZpbmVkXG5cdH0pO1xuXHRjb25zdCB0b3RhbEdhdWdlID0gbmV3IEdhdWdlKHtcblx0XHRuYW1lOiBuYW1lUHJlZml4ICsgTk9ERUpTX0FDVElWRV9IQU5ETEVTX1RPVEFMLFxuXHRcdGhlbHA6ICdUb3RhbCBudW1iZXIgb2YgYWN0aXZlIGhhbmRsZXMuJyxcblx0XHRyZWdpc3RlcnM6IHJlZ2lzdHJ5ID8gW3JlZ2lzdHJ5XSA6IHVuZGVmaW5lZFxuXHR9KTtcblxuXHRjb25zdCB1cGRhdGVyID0gY29uZmlnLnRpbWVzdGFtcHNcblx0XHQ/ICgpID0+IHtcblx0XHRcdFx0Y29uc3QgaGFuZGxlcyA9IHByb2Nlc3MuX2dldEFjdGl2ZUhhbmRsZXMoKTtcblx0XHRcdFx0dXBkYXRlTWV0cmljcyhnYXVnZSwgYWdncmVnYXRlQnlPYmplY3ROYW1lKGhhbmRsZXMpLCB0cnVlKTtcblx0XHRcdFx0dG90YWxHYXVnZS5zZXQoaGFuZGxlcy5sZW5ndGgsIERhdGUubm93KCkpO1xuXHRcdCAgfVxuXHRcdDogKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBoYW5kbGVzID0gcHJvY2Vzcy5fZ2V0QWN0aXZlSGFuZGxlcygpO1xuXHRcdFx0XHR1cGRhdGVNZXRyaWNzKGdhdWdlLCBhZ2dyZWdhdGVCeU9iamVjdE5hbWUoaGFuZGxlcyksIGZhbHNlKTtcblx0XHRcdFx0dG90YWxHYXVnZS5zZXQoaGFuZGxlcy5sZW5ndGgpO1xuXHRcdCAgfTtcblxuXHRyZXR1cm4gdXBkYXRlcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzLm1ldHJpY05hbWVzID0gW1xuXHROT0RFSlNfQUNUSVZFX0hBTkRMRVMsXG5cdE5PREVKU19BQ1RJVkVfSEFORExFU19UT1RBTFxuXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgR2F1Z2UgPSByZXF1aXJlKCcuLi9nYXVnZScpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5jb25zdCBQUk9DRVNTX01BWF9GRFMgPSAncHJvY2Vzc19tYXhfZmRzJztcblxubW9kdWxlLmV4cG9ydHMgPSAocmVnaXN0cnksIGNvbmZpZyA9IHt9KSA9PiB7XG5cdGxldCBpc1NldCA9IGZhbHNlO1xuXG5cdGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSAnbGludXgnKSB7XG5cdFx0cmV0dXJuICgpID0+IHt9O1xuXHR9XG5cblx0Y29uc3QgbmFtZVByZWZpeCA9IGNvbmZpZy5wcmVmaXggPyBjb25maWcucHJlZml4IDogJyc7XG5cblx0Y29uc3QgZmlsZURlc2NyaXB0b3JzR2F1Z2UgPSBuZXcgR2F1Z2Uoe1xuXHRcdG5hbWU6IG5hbWVQcmVmaXggKyBQUk9DRVNTX01BWF9GRFMsXG5cdFx0aGVscDogJ01heGltdW0gbnVtYmVyIG9mIG9wZW4gZmlsZSBkZXNjcmlwdG9ycy4nLFxuXHRcdHJlZ2lzdGVyczogcmVnaXN0cnkgPyBbcmVnaXN0cnldIDogdW5kZWZpbmVkXG5cdH0pO1xuXG5cdHJldHVybiAoKSA9PiB7XG5cdFx0aWYgKGlzU2V0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0ZnMucmVhZEZpbGUoJy9wcm9jL3N5cy9mcy9maWxlLW1heCcsICd1dGY4JywgKGVyciwgbWF4RmRzKSA9PiB7XG5cdFx0XHRpZiAoZXJyKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aXNTZXQgPSB0cnVlO1xuXG5cdFx0XHRmaWxlRGVzY3JpcHRvcnNHYXVnZS5zZXQoTnVtYmVyKG1heEZkcykpO1xuXHRcdH0pO1xuXHR9O1xufTtcblxubW9kdWxlLmV4cG9ydHMubWV0cmljTmFtZXMgPSBbUFJPQ0VTU19NQVhfRkRTXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgR2F1Z2UgPSByZXF1aXJlKCcuLi9nYXVnZScpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcHJvY2VzcyA9IHJlcXVpcmUoJ3Byb2Nlc3MnKTtcblxuY29uc3QgUFJPQ0VTU19PUEVOX0ZEUyA9ICdwcm9jZXNzX29wZW5fZmRzJztcblxubW9kdWxlLmV4cG9ydHMgPSAocmVnaXN0cnksIGNvbmZpZyA9IHt9KSA9PiB7XG5cdGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSAnbGludXgnKSB7XG5cdFx0cmV0dXJuICgpID0+IHt9O1xuXHR9XG5cblx0Y29uc3QgbmFtZVByZWZpeCA9IGNvbmZpZy5wcmVmaXggPyBjb25maWcucHJlZml4IDogJyc7XG5cblx0Y29uc3QgZmlsZURlc2NyaXB0b3JzR2F1Z2UgPSBuZXcgR2F1Z2Uoe1xuXHRcdG5hbWU6IG5hbWVQcmVmaXggKyBQUk9DRVNTX09QRU5fRkRTLFxuXHRcdGhlbHA6ICdOdW1iZXIgb2Ygb3BlbiBmaWxlIGRlc2NyaXB0b3JzLicsXG5cdFx0cmVnaXN0ZXJzOiByZWdpc3RyeSA/IFtyZWdpc3RyeV0gOiB1bmRlZmluZWRcblx0fSk7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRmcy5yZWFkZGlyKCcvcHJvYy9zZWxmL2ZkJywgKGVyciwgbGlzdCkgPT4ge1xuXHRcdFx0aWYgKGVycikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIE1pbnVzIDEsIGFzIHRoaXMgaW52b2NhdGlvbiBjcmVhdGVkIG9uZVxuXHRcdFx0ZmlsZURlc2NyaXB0b3JzR2F1Z2Uuc2V0KGxpc3QubGVuZ3RoIC0gMSwgRGF0ZS5ub3coKSk7XG5cdFx0fSk7XG5cdH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5tZXRyaWNOYW1lcyA9IFtQUk9DRVNTX09QRU5fRkRTXTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IEdhdWdlID0gcmVxdWlyZSgnLi4vZ2F1Z2UnKTtcbmNvbnN0IHsgYWdncmVnYXRlQnlPYmplY3ROYW1lIH0gPSByZXF1aXJlKCcuL2hlbHBlcnMvcHJvY2Vzc01ldHJpY3NIZWxwZXJzJyk7XG5jb25zdCB7IHVwZGF0ZU1ldHJpY3MgfSA9IHJlcXVpcmUoJy4vaGVscGVycy9wcm9jZXNzTWV0cmljc0hlbHBlcnMnKTtcblxuY29uc3QgTk9ERUpTX0FDVElWRV9SRVFVRVNUUyA9ICdub2RlanNfYWN0aXZlX3JlcXVlc3RzJztcbmNvbnN0IE5PREVKU19BQ1RJVkVfUkVRVUVTVFNfVE9UQUwgPSAnbm9kZWpzX2FjdGl2ZV9yZXF1ZXN0c190b3RhbCc7XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlZ2lzdHJ5LCBjb25maWcgPSB7fSkgPT4ge1xuXHQvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGUgZnVuY3Rpb24gaXMgcmVtb3ZlZCBpbiBsYXRlciBub2RlcyAoZXhpc3RzIGluIG5vZGVANilcblx0aWYgKHR5cGVvZiBwcm9jZXNzLl9nZXRBY3RpdmVSZXF1ZXN0cyAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJldHVybiAoKSA9PiB7fTtcblx0fVxuXG5cdGNvbnN0IG5hbWVQcmVmaXggPSBjb25maWcucHJlZml4ID8gY29uZmlnLnByZWZpeCA6ICcnO1xuXG5cdGNvbnN0IGdhdWdlID0gbmV3IEdhdWdlKHtcblx0XHRuYW1lOiBuYW1lUHJlZml4ICsgTk9ERUpTX0FDVElWRV9SRVFVRVNUUyxcblx0XHRoZWxwOlxuXHRcdFx0J051bWJlciBvZiBhY3RpdmUgbGlidXYgcmVxdWVzdHMgZ3JvdXBlZCBieSByZXF1ZXN0IHR5cGUuIEV2ZXJ5IHJlcXVlc3QgdHlwZSBpcyBDKysgY2xhc3MgbmFtZS4nLFxuXHRcdGxhYmVsTmFtZXM6IFsndHlwZSddLFxuXHRcdHJlZ2lzdGVyczogcmVnaXN0cnkgPyBbcmVnaXN0cnldIDogdW5kZWZpbmVkXG5cdH0pO1xuXG5cdGNvbnN0IHRvdGFsR2F1Z2UgPSBuZXcgR2F1Z2Uoe1xuXHRcdG5hbWU6IG5hbWVQcmVmaXggKyBOT0RFSlNfQUNUSVZFX1JFUVVFU1RTX1RPVEFMLFxuXHRcdGhlbHA6ICdUb3RhbCBudW1iZXIgb2YgYWN0aXZlIHJlcXVlc3RzLicsXG5cdFx0cmVnaXN0ZXJzOiByZWdpc3RyeSA/IFtyZWdpc3RyeV0gOiB1bmRlZmluZWRcblx0fSk7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRjb25zdCByZXF1ZXN0cyA9IHByb2Nlc3MuX2dldEFjdGl2ZVJlcXVlc3RzKCk7XG5cdFx0dXBkYXRlTWV0cmljcyhnYXVnZSwgYWdncmVnYXRlQnlPYmplY3ROYW1lKHJlcXVlc3RzKSk7XG5cdFx0dG90YWxHYXVnZS5zZXQocmVxdWVzdHMubGVuZ3RoLCBEYXRlLm5vdygpKTtcblx0fTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLm1ldHJpY05hbWVzID0gW1xuXHROT0RFSlNfQUNUSVZFX1JFUVVFU1RTLFxuXHROT0RFSlNfQUNUSVZFX1JFUVVFU1RTX1RPVEFMXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBHYXVnZSA9IHJlcXVpcmUoJy4uL2dhdWdlJyk7XG5jb25zdCBub3dJblNlY29uZHMgPSBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwIC0gcHJvY2Vzcy51cHRpbWUoKSk7XG5cbmNvbnN0IFBST0NFU1NfU1RBUlRfVElNRSA9ICdwcm9jZXNzX3N0YXJ0X3RpbWVfc2Vjb25kcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlZ2lzdHJ5LCBjb25maWcgPSB7fSkgPT4ge1xuXHRjb25zdCBuYW1lUHJlZml4ID0gY29uZmlnLnByZWZpeCA/IGNvbmZpZy5wcmVmaXggOiAnJztcblxuXHRjb25zdCBjcHVVc2VyR2F1Z2UgPSBuZXcgR2F1Z2Uoe1xuXHRcdG5hbWU6IG5hbWVQcmVmaXggKyBQUk9DRVNTX1NUQVJUX1RJTUUsXG5cdFx0aGVscDogJ1N0YXJ0IHRpbWUgb2YgdGhlIHByb2Nlc3Mgc2luY2UgdW5peCBlcG9jaCBpbiBzZWNvbmRzLicsXG5cdFx0cmVnaXN0ZXJzOiByZWdpc3RyeSA/IFtyZWdpc3RyeV0gOiB1bmRlZmluZWQsXG5cdFx0YWdncmVnYXRvcjogJ29taXQnXG5cdH0pO1xuXHRsZXQgaXNTZXQgPSBmYWxzZTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGlmIChpc1NldCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjcHVVc2VyR2F1Z2Uuc2V0KG5vd0luU2Vjb25kcyk7XG5cdFx0aXNTZXQgPSB0cnVlO1xuXHR9O1xufTtcblxubW9kdWxlLmV4cG9ydHMubWV0cmljTmFtZXMgPSBbUFJPQ0VTU19TVEFSVF9USU1FXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgR2F1Z2UgPSByZXF1aXJlKCcuLi9nYXVnZScpO1xuY29uc3QgdmVyc2lvbiA9IHByb2Nlc3MudmVyc2lvbjtcbmNvbnN0IHZlcnNpb25TZWdtZW50cyA9IHZlcnNpb25cblx0LnNsaWNlKDEpXG5cdC5zcGxpdCgnLicpXG5cdC5tYXAoTnVtYmVyKTtcblxuY29uc3QgTk9ERV9WRVJTSU9OX0lORk8gPSAnbm9kZWpzX3ZlcnNpb25faW5mbyc7XG5cbm1vZHVsZS5leHBvcnRzID0gKHJlZ2lzdHJ5LCBjb25maWcgPSB7fSkgPT4ge1xuXHRjb25zdCBuYW1lUHJlZml4ID0gY29uZmlnLnByZWZpeCA/IGNvbmZpZy5wcmVmaXggOiAnJztcblxuXHRjb25zdCBub2RlVmVyc2lvbkdhdWdlID0gbmV3IEdhdWdlKHtcblx0XHRuYW1lOiBuYW1lUHJlZml4ICsgTk9ERV9WRVJTSU9OX0lORk8sXG5cdFx0aGVscDogJ05vZGUuanMgdmVyc2lvbiBpbmZvLicsXG5cdFx0bGFiZWxOYW1lczogWyd2ZXJzaW9uJywgJ21ham9yJywgJ21pbm9yJywgJ3BhdGNoJ10sXG5cdFx0cmVnaXN0ZXJzOiByZWdpc3RyeSA/IFtyZWdpc3RyeV0gOiB1bmRlZmluZWQsXG5cdFx0YWdncmVnYXRvcjogJ2ZpcnN0J1xuXHR9KTtcblx0bGV0IGlzU2V0ID0gZmFsc2U7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoaXNTZXQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bm9kZVZlcnNpb25HYXVnZVxuXHRcdFx0LmxhYmVscyhcblx0XHRcdFx0dmVyc2lvbixcblx0XHRcdFx0dmVyc2lvblNlZ21lbnRzWzBdLFxuXHRcdFx0XHR2ZXJzaW9uU2VnbWVudHNbMV0sXG5cdFx0XHRcdHZlcnNpb25TZWdtZW50c1syXVxuXHRcdFx0KVxuXHRcdFx0LnNldCgxKTtcblx0XHRpc1NldCA9IHRydWU7XG5cdH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5tZXRyaWNOYW1lcyA9IFtOT0RFX1ZFUlNJT05fSU5GT107XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHVybCA9IHJlcXVpcmUoJ3VybCcpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IGh0dHBzID0gcmVxdWlyZSgnaHR0cHMnKTtcbmNvbnN0IHsgZ2xvYmFsUmVnaXN0cnkgfSA9IHJlcXVpcmUoJy4vcmVnaXN0cnknKTtcblxuY2xhc3MgUHVzaGdhdGV3YXkge1xuXHRjb25zdHJ1Y3RvcihnYXRld2F5VXJsLCBvcHRpb25zLCByZWdpc3RyeSkge1xuXHRcdGlmICghcmVnaXN0cnkpIHtcblx0XHRcdHJlZ2lzdHJ5ID0gZ2xvYmFsUmVnaXN0cnk7XG5cdFx0fVxuXHRcdHRoaXMucmVnaXN0cnkgPSByZWdpc3RyeTtcblx0XHR0aGlzLmdhdGV3YXlVcmwgPSBnYXRld2F5VXJsO1xuXHRcdHRoaXMucmVxdWVzdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcblx0fVxuXG5cdHB1c2hBZGQocGFyYW1zLCBjYWxsYmFjaykge1xuXHRcdGlmICghcGFyYW1zIHx8ICFwYXJhbXMuam9iTmFtZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGpvYk5hbWUgcGFyYW1ldGVyJyk7XG5cdFx0fVxuXG5cdFx0dXNlR2F0ZXdheS5jYWxsKHRoaXMsICdQT1NUJywgcGFyYW1zLmpvYk5hbWUsIHBhcmFtcy5ncm91cGluZ3MsIGNhbGxiYWNrKTtcblx0fVxuXG5cdHB1c2gocGFyYW1zLCBjYWxsYmFjaykge1xuXHRcdGlmICghcGFyYW1zIHx8ICFwYXJhbXMuam9iTmFtZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGpvYk5hbWUgcGFyYW1ldGVyJyk7XG5cdFx0fVxuXG5cdFx0dXNlR2F0ZXdheS5jYWxsKHRoaXMsICdQVVQnLCBwYXJhbXMuam9iTmFtZSwgcGFyYW1zLmdyb3VwaW5ncywgY2FsbGJhY2spO1xuXHR9XG5cblx0ZGVsZXRlKHBhcmFtcywgY2FsbGJhY2spIHtcblx0XHRpZiAoIXBhcmFtcyB8fCAhcGFyYW1zLmpvYk5hbWUpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignTWlzc2luZyBqb2JOYW1lIHBhcmFtZXRlcicpO1xuXHRcdH1cblxuXHRcdHVzZUdhdGV3YXkuY2FsbCh0aGlzLCAnREVMRVRFJywgcGFyYW1zLmpvYk5hbWUsIHBhcmFtcy5ncm91cGluZ3MsIGNhbGxiYWNrKTtcblx0fVxufVxuZnVuY3Rpb24gdXNlR2F0ZXdheShtZXRob2QsIGpvYiwgZ3JvdXBpbmdzLCBjYWxsYmFjaykge1xuXHQvLyBgVVJMYCBmaXJzdCBhZGRlZCBpbiB2Ni4xMy4wXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBub2RlL25vLWRlcHJlY2F0ZWQtYXBpXG5cdGNvbnN0IGdhdGV3YXlVcmxQYXJzZWQgPSB1cmwucGFyc2UodGhpcy5nYXRld2F5VXJsKTtcblx0Y29uc3QgZ2F0ZXdheVVybFBhdGggPVxuXHRcdGdhdGV3YXlVcmxQYXJzZWQucGF0aG5hbWUgJiYgZ2F0ZXdheVVybFBhcnNlZC5wYXRobmFtZSAhPT0gJy8nXG5cdFx0XHQ/IGdhdGV3YXlVcmxQYXJzZWQucGF0aG5hbWVcblx0XHRcdDogJyc7XG5cdGNvbnN0IHBhdGggPSBgJHtnYXRld2F5VXJsUGF0aH0vbWV0cmljcy9qb2IvJHtlbmNvZGVVUklDb21wb25lbnQoXG5cdFx0am9iXG5cdCl9JHtnZW5lcmF0ZUdyb3VwaW5ncyhncm91cGluZ3MpfWA7XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tZGVwcmVjYXRlZC1hcGlcblx0Y29uc3QgdGFyZ2V0ID0gdXJsLnJlc29sdmUodGhpcy5nYXRld2F5VXJsLCBwYXRoKTtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvbm8tZGVwcmVjYXRlZC1hcGlcblx0Y29uc3QgcmVxdWVzdFBhcmFtcyA9IHVybC5wYXJzZSh0YXJnZXQpO1xuXHRjb25zdCBodHRwTW9kdWxlID0gaXNIdHRwcyhyZXF1ZXN0UGFyYW1zLmhyZWYpID8gaHR0cHMgOiBodHRwO1xuXHRjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbihyZXF1ZXN0UGFyYW1zLCB0aGlzLnJlcXVlc3RPcHRpb25zLCB7XG5cdFx0bWV0aG9kXG5cdH0pO1xuXG5cdGNvbnN0IHJlcSA9IGh0dHBNb2R1bGUucmVxdWVzdChvcHRpb25zLCByZXMgPT4ge1xuXHRcdGxldCBib2R5ID0gJyc7XG5cdFx0cmVzLnNldEVuY29kaW5nKCd1dGY4Jyk7XG5cdFx0cmVzLm9uKCdkYXRhJywgY2h1bmsgPT4ge1xuXHRcdFx0Ym9keSArPSBjaHVuaztcblx0XHR9KTtcblx0XHRyZXMub24oJ2VuZCcsICgpID0+IHtcblx0XHRcdGNhbGxiYWNrKG51bGwsIHJlcywgYm9keSk7XG5cdFx0fSk7XG5cdH0pO1xuXHRyZXEub24oJ2Vycm9yJywgZXJyID0+IHtcblx0XHRjYWxsYmFjayhlcnIpO1xuXHR9KTtcblxuXHRpZiAobWV0aG9kICE9PSAnREVMRVRFJykge1xuXHRcdHJlcS53cml0ZSh0aGlzLnJlZ2lzdHJ5Lm1ldHJpY3MoeyB0aW1lc3RhbXBzOiBmYWxzZSB9KSk7XG5cdH1cblx0cmVxLmVuZCgpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUdyb3VwaW5ncyhncm91cGluZ3MpIHtcblx0aWYgKCFncm91cGluZ3MpIHtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblx0cmV0dXJuIE9iamVjdC5rZXlzKGdyb3VwaW5ncylcblx0XHQubWFwKFxuXHRcdFx0a2V5ID0+IGAvJHtlbmNvZGVVUklDb21wb25lbnQoa2V5KX0vJHtlbmNvZGVVUklDb21wb25lbnQoZ3JvdXBpbmdzW2tleV0pfWBcblx0XHQpXG5cdFx0LmpvaW4oJycpO1xufVxuXG5mdW5jdGlvbiBpc0h0dHBzKGhyZWYpIHtcblx0cmV0dXJuIGhyZWYuc2VhcmNoKC9eaHR0cHMvKSAhPT0gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHVzaGdhdGV3YXk7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCB7IGdldFZhbHVlQXNTdHJpbmcgfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcoc3RyKSB7XG5cdHJldHVybiBzdHIucmVwbGFjZSgvXFxuL2csICdcXFxcbicpLnJlcGxhY2UoL1xcXFwoPyFuKS9nLCAnXFxcXFxcXFwnKTtcbn1cbmZ1bmN0aW9uIGVzY2FwZUxhYmVsVmFsdWUoc3RyKSB7XG5cdGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBzdHI7XG5cdH1cblx0cmV0dXJuIGVzY2FwZVN0cmluZyhzdHIpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKTtcbn1cblxuY29uc3QgZGVmYXVsdE1ldHJpY3NPcHRzID0ge1xuXHR0aW1lc3RhbXBzOiB0cnVlXG59O1xuXG5jbGFzcyBSZWdpc3RyeSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX21ldHJpY3MgPSB7fTtcblx0XHR0aGlzLl9kZWZhdWx0TGFiZWxzID0ge307XG5cdH1cblxuXHRnZXRNZXRyaWNzQXNBcnJheSgpIHtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5fbWV0cmljcykubWFwKHRoaXMuZ2V0U2luZ2xlTWV0cmljLCB0aGlzKTtcblx0fVxuXG5cdGdldE1ldHJpY0FzUHJvbWV0aGV1c1N0cmluZyhtZXRyaWMsIGNvbmYpIHtcblx0XHRjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE1ldHJpY3NPcHRzLCBjb25mKTtcblx0XHRjb25zdCBpdGVtID0gbWV0cmljLmdldCgpO1xuXHRcdGNvbnN0IG5hbWUgPSBlc2NhcGVTdHJpbmcoaXRlbS5uYW1lKTtcblx0XHRjb25zdCBoZWxwID0gYCMgSEVMUCAke25hbWV9ICR7ZXNjYXBlU3RyaW5nKGl0ZW0uaGVscCl9YDtcblx0XHRjb25zdCB0eXBlID0gYCMgVFlQRSAke25hbWV9ICR7aXRlbS50eXBlfWA7XG5cdFx0Y29uc3QgZGVmYXVsdExhYmVsTmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLl9kZWZhdWx0TGFiZWxzKTtcblxuXHRcdGxldCB2YWx1ZXMgPSAnJztcblx0XHRmb3IgKGNvbnN0IHZhbCBvZiBpdGVtLnZhbHVlcyB8fCBbXSkge1xuXHRcdFx0dmFsLmxhYmVscyA9IHZhbC5sYWJlbHMgfHwge307XG5cblx0XHRcdGlmIChkZWZhdWx0TGFiZWxOYW1lcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdC8vIE1ha2UgYSBjb3B5IGJlZm9yZSBtdXRhdGluZ1xuXHRcdFx0XHR2YWwubGFiZWxzID0gT2JqZWN0LmFzc2lnbih7fSwgdmFsLmxhYmVscyk7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoY29uc3QgbGFiZWxOYW1lIG9mIGRlZmF1bHRMYWJlbE5hbWVzKSB7XG5cdFx0XHRcdHZhbC5sYWJlbHNbbGFiZWxOYW1lXSA9XG5cdFx0XHRcdFx0dmFsLmxhYmVsc1tsYWJlbE5hbWVdIHx8IHRoaXMuX2RlZmF1bHRMYWJlbHNbbGFiZWxOYW1lXTtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGxhYmVscyA9ICcnO1xuXHRcdFx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModmFsLmxhYmVscykpIHtcblx0XHRcdFx0bGFiZWxzICs9IGAke2tleX09XCIke2VzY2FwZUxhYmVsVmFsdWUodmFsLmxhYmVsc1trZXldKX1cIixgO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgbWV0cmljTmFtZSA9IHZhbC5tZXRyaWNOYW1lIHx8IGl0ZW0ubmFtZTtcblx0XHRcdGlmIChsYWJlbHMpIHtcblx0XHRcdFx0bWV0cmljTmFtZSArPSBgeyR7bGFiZWxzLnN1YnN0cmluZygwLCBsYWJlbHMubGVuZ3RoIC0gMSl9fWA7XG5cdFx0XHR9XG5cblx0XHRcdGxldCBsaW5lID0gYCR7bWV0cmljTmFtZX0gJHtnZXRWYWx1ZUFzU3RyaW5nKHZhbC52YWx1ZSl9YDtcblx0XHRcdGlmIChvcHRzLnRpbWVzdGFtcHMgJiYgdmFsLnRpbWVzdGFtcCkge1xuXHRcdFx0XHRsaW5lICs9IGAgJHt2YWwudGltZXN0YW1wfWA7XG5cdFx0XHR9XG5cdFx0XHR2YWx1ZXMgKz0gYCR7bGluZS50cmltKCl9XFxuYDtcblx0XHR9XG5cblx0XHRyZXR1cm4gYCR7aGVscH1cXG4ke3R5cGV9XFxuJHt2YWx1ZXN9YC50cmltKCk7XG5cdH1cblxuXHRtZXRyaWNzKG9wdHMpIHtcblx0XHRsZXQgbWV0cmljcyA9ICcnO1xuXG5cdFx0Zm9yIChjb25zdCBtZXRyaWMgb2YgdGhpcy5nZXRNZXRyaWNzQXNBcnJheSgpKSB7XG5cdFx0XHRtZXRyaWNzICs9IGAke3RoaXMuZ2V0TWV0cmljQXNQcm9tZXRoZXVzU3RyaW5nKG1ldHJpYywgb3B0cyl9XFxuXFxuYDtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWV0cmljcy5zdWJzdHJpbmcoMCwgbWV0cmljcy5sZW5ndGggLSAxKTtcblx0fVxuXG5cdHJlZ2lzdGVyTWV0cmljKG1ldHJpY0ZuKSB7XG5cdFx0aWYgKFxuXHRcdFx0dGhpcy5fbWV0cmljc1ttZXRyaWNGbi5uYW1lXSAmJlxuXHRcdFx0dGhpcy5fbWV0cmljc1ttZXRyaWNGbi5uYW1lXSAhPT0gbWV0cmljRm5cblx0XHQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0YEEgbWV0cmljIHdpdGggdGhlIG5hbWUgJHttZXRyaWNGbi5uYW1lfSBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWQuYFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHR0aGlzLl9tZXRyaWNzW21ldHJpY0ZuLm5hbWVdID0gbWV0cmljRm47XG5cdH1cblxuXHRjbGVhcigpIHtcblx0XHR0aGlzLl9tZXRyaWNzID0ge307XG5cdFx0dGhpcy5fZGVmYXVsdExhYmVscyA9IHt9O1xuXHR9XG5cblx0Z2V0TWV0cmljc0FzSlNPTigpIHtcblx0XHRjb25zdCBtZXRyaWNzID0gW107XG5cdFx0Y29uc3QgZGVmYXVsdExhYmVsTmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLl9kZWZhdWx0TGFiZWxzKTtcblxuXHRcdGZvciAoY29uc3QgbWV0cmljIG9mIHRoaXMuZ2V0TWV0cmljc0FzQXJyYXkoKSkge1xuXHRcdFx0Y29uc3QgaXRlbSA9IG1ldHJpYy5nZXQoKTtcblxuXHRcdFx0aWYgKGl0ZW0udmFsdWVzKSB7XG5cdFx0XHRcdGZvciAoY29uc3QgdmFsIG9mIGl0ZW0udmFsdWVzKSB7XG5cdFx0XHRcdFx0Zm9yIChjb25zdCBsYWJlbE5hbWUgb2YgZGVmYXVsdExhYmVsTmFtZXMpIHtcblx0XHRcdFx0XHRcdHZhbC5sYWJlbHNbbGFiZWxOYW1lXSA9XG5cdFx0XHRcdFx0XHRcdHZhbC5sYWJlbHNbbGFiZWxOYW1lXSB8fCB0aGlzLl9kZWZhdWx0TGFiZWxzW2xhYmVsTmFtZV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG1ldHJpY3MucHVzaChpdGVtKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbWV0cmljcztcblx0fVxuXG5cdHJlbW92ZVNpbmdsZU1ldHJpYyhuYW1lKSB7XG5cdFx0ZGVsZXRlIHRoaXMuX21ldHJpY3NbbmFtZV07XG5cdH1cblxuXHRnZXRTaW5nbGVNZXRyaWNBc1N0cmluZyhuYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0TWV0cmljQXNQcm9tZXRoZXVzU3RyaW5nKHRoaXMuX21ldHJpY3NbbmFtZV0pO1xuXHR9XG5cblx0Z2V0U2luZ2xlTWV0cmljKG5hbWUpIHtcblx0XHRyZXR1cm4gdGhpcy5fbWV0cmljc1tuYW1lXTtcblx0fVxuXG5cdHNldERlZmF1bHRMYWJlbHMobGFiZWxzKSB7XG5cdFx0dGhpcy5fZGVmYXVsdExhYmVscyA9IGxhYmVscztcblx0fVxuXG5cdHJlc2V0TWV0cmljcygpIHtcblx0XHRmb3IgKGNvbnN0IG1ldHJpYyBpbiB0aGlzLl9tZXRyaWNzKSB7XG5cdFx0XHR0aGlzLl9tZXRyaWNzW21ldHJpY10ucmVzZXQoKTtcblx0XHR9XG5cdH1cblxuXHRnZXQgY29udGVudFR5cGUoKSB7XG5cdFx0cmV0dXJuICd0ZXh0L3BsYWluOyB2ZXJzaW9uPTAuMC40OyBjaGFyc2V0PXV0Zi04Jztcblx0fVxuXG5cdHN0YXRpYyBtZXJnZShyZWdpc3RlcnMpIHtcblx0XHRjb25zdCBtZXJnZWRSZWdpc3RyeSA9IG5ldyBSZWdpc3RyeSgpO1xuXG5cdFx0Y29uc3QgbWV0cmljc1RvTWVyZ2UgPSByZWdpc3RlcnMucmVkdWNlKFxuXHRcdFx0KGFjYywgcmVnKSA9PiBhY2MuY29uY2F0KHJlZy5nZXRNZXRyaWNzQXNBcnJheSgpKSxcblx0XHRcdFtdXG5cdFx0KTtcblxuXHRcdG1ldHJpY3NUb01lcmdlLmZvckVhY2gobWVyZ2VkUmVnaXN0cnkucmVnaXN0ZXJNZXRyaWMsIG1lcmdlZFJlZ2lzdHJ5KTtcblx0XHRyZXR1cm4gbWVyZ2VkUmVnaXN0cnk7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWdpc3RyeTtcbm1vZHVsZS5leHBvcnRzLmdsb2JhbFJlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5KCk7XG4iLCIvKipcbiAqIFN1bW1hcnlcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuY29uc3QgeyBnbG9iYWxSZWdpc3RyeSB9ID0gcmVxdWlyZSgnLi9yZWdpc3RyeScpO1xuY29uc3QgdHlwZSA9ICdzdW1tYXJ5JztcbmNvbnN0IHtcblx0Z2V0UHJvcGVydGllc0Zyb21PYmosXG5cdGdldExhYmVscyxcblx0aGFzaE9iamVjdCxcblx0aXNPYmplY3QsXG5cdHByaW50RGVwcmVjYXRpb25PYmplY3RDb25zdHJ1Y3Rvcixcblx0cmVtb3ZlTGFiZWxzXG59ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5jb25zdCB7XG5cdHZhbGlkYXRlTGFiZWwsXG5cdHZhbGlkYXRlTWV0cmljTmFtZSxcblx0dmFsaWRhdGVMYWJlbE5hbWVcbn0gPSByZXF1aXJlKCcuL3ZhbGlkYXRpb24nKTtcbmNvbnN0IHRpbWVXaW5kb3dRdWFudGlsZXMgPSByZXF1aXJlKCcuL3RpbWVXaW5kb3dRdWFudGlsZXMnKTtcblxuY29uc3QgREVGQVVMVF9DT01QUkVTU19DT1VOVCA9IDEwMDA7IC8vIGV2ZXJ5IDEwMDAgbWVhc3VyZW1lbnRzXG5cbmNsYXNzIFN1bW1hcnkge1xuXHQvKipcblx0ICogU3VtbWFyeVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIE5hbWUgb2YgdGhlIG1ldHJpY1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gaGVscCAtIEhlbHAgZm9yIHRoZSBtZXRyaWNcblx0ICogQHBhcmFtIHtvYmplY3R8QXJyYXkuPHN0cmluZz59IGxhYmVsc09yQ29uZiAtIEVpdGhlciBhcnJheSBvZiBsYWJlbCBuYW1lcyBvciBjb25maWcgb2JqZWN0IGFzIGEga2V5LXZhbHVlIG9iamVjdFxuXHQgKiBAcGFyYW0ge29iamVjdH0gY29uZiAtIENvbmZpZ3VyYXRpb24gb2JqZWN0XG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihuYW1lLCBoZWxwLCBsYWJlbHNPckNvbmYsIGNvbmYpIHtcblx0XHRsZXQgY29uZmlnO1xuXHRcdGlmIChpc09iamVjdChuYW1lKSkge1xuXHRcdFx0Y29uZmlnID0gT2JqZWN0LmFzc2lnbihcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHBlcmNlbnRpbGVzOiBbMC4wMSwgMC4wNSwgMC41LCAwLjksIDAuOTUsIDAuOTksIDAuOTk5XSxcblx0XHRcdFx0XHRsYWJlbE5hbWVzOiBbXVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRuYW1lXG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAoIWNvbmZpZy5yZWdpc3RlcnMpIHtcblx0XHRcdFx0Y29uZmlnLnJlZ2lzdGVycyA9IFtnbG9iYWxSZWdpc3RyeV07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBvYmo7XG5cdFx0XHRsZXQgbGFiZWxzID0gW107XG5cblx0XHRcdGlmIChBcnJheS5pc0FycmF5KGxhYmVsc09yQ29uZikpIHtcblx0XHRcdFx0b2JqID0gY29uZiB8fCB7fTtcblx0XHRcdFx0bGFiZWxzID0gbGFiZWxzT3JDb25mO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b2JqID0gbGFiZWxzT3JDb25mIHx8IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHRwcmludERlcHJlY2F0aW9uT2JqZWN0Q29uc3RydWN0b3IoKTtcblxuXHRcdFx0Y29uZmlnID0ge1xuXHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRoZWxwLFxuXHRcdFx0XHRsYWJlbE5hbWVzOiBsYWJlbHMsXG5cdFx0XHRcdHBlcmNlbnRpbGVzOiBjb25maWd1cmVQZXJjZW50aWxlcyhvYmoucGVyY2VudGlsZXMpLFxuXHRcdFx0XHRyZWdpc3RlcnM6IFtnbG9iYWxSZWdpc3RyeV0sXG5cdFx0XHRcdG1heEFnZVNlY29uZHM6IG9iai5tYXhBZ2VTZWNvbmRzLFxuXHRcdFx0XHRhZ2VCdWNrZXRzOiBvYmouYWdlQnVja2V0c1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHR2YWxpZGF0ZUlucHV0KGNvbmZpZy5uYW1lLCBjb25maWcuaGVscCwgY29uZmlnLmxhYmVsTmFtZXMpO1xuXG5cdFx0dGhpcy5tYXhBZ2VTZWNvbmRzID0gY29uZmlnLm1heEFnZVNlY29uZHM7XG5cdFx0dGhpcy5hZ2VCdWNrZXRzID0gY29uZmlnLmFnZUJ1Y2tldHM7XG5cblx0XHR0aGlzLm5hbWUgPSBjb25maWcubmFtZTtcblx0XHR0aGlzLmhlbHAgPSBjb25maWcuaGVscDtcblx0XHR0aGlzLmFnZ3JlZ2F0b3IgPSBjb25maWcuYWdncmVnYXRvciB8fCAnc3VtJztcblxuXHRcdHRoaXMucGVyY2VudGlsZXMgPSBjb25maWcucGVyY2VudGlsZXM7XG5cdFx0dGhpcy5oYXNoTWFwID0ge307XG5cdFx0dGhpcy5sYWJlbE5hbWVzID0gY29uZmlnLmxhYmVsTmFtZXMgfHwgW107XG5cblx0XHR0aGlzLmNvbXByZXNzQ291bnQgPSBjb25maWcuY29tcHJlc3NDb3VudCB8fCBERUZBVUxUX0NPTVBSRVNTX0NPVU5UO1xuXG5cdFx0aWYgKHRoaXMubGFiZWxOYW1lcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMuaGFzaE1hcCA9IHtcblx0XHRcdFx0W2hhc2hPYmplY3Qoe30pXToge1xuXHRcdFx0XHRcdGxhYmVsczoge30sXG5cdFx0XHRcdFx0dGQ6IG5ldyB0aW1lV2luZG93UXVhbnRpbGVzKHRoaXMubWF4QWdlU2Vjb25kcywgdGhpcy5hZ2VCdWNrZXRzKSxcblx0XHRcdFx0XHRjb3VudDogMCxcblx0XHRcdFx0XHRzdW06IDBcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRjb25maWcucmVnaXN0ZXJzLmZvckVhY2gocmVnaXN0cnlJbnN0YW5jZSA9PlxuXHRcdFx0cmVnaXN0cnlJbnN0YW5jZS5yZWdpc3Rlck1ldHJpYyh0aGlzKVxuXHRcdCk7XG5cdH1cblxuXHQvKipcblx0ICogT2JzZXJ2ZSBhIHZhbHVlXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBsYWJlbHMgLSBPYmplY3Qgd2l0aCBsYWJlbHMgd2hlcmUga2V5IGlzIHRoZSBsYWJlbCBrZXkgYW5kIHZhbHVlIGlzIGxhYmVsIHZhbHVlLiBDYW4gb25seSBiZSBvbmUgbGV2ZWwgZGVlcFxuXHQgKiBAcGFyYW0ge051bWJlcn0gdmFsdWUgLSBWYWx1ZSB0byBvYnNlcnZlXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0b2JzZXJ2ZShsYWJlbHMsIHZhbHVlKSB7XG5cdFx0b2JzZXJ2ZS5jYWxsKHRoaXMsIGxhYmVscyA9PT0gMCA/IDAgOiBsYWJlbHMgfHwge30pKHZhbHVlKTtcblx0fVxuXG5cdGdldCgpIHtcblx0XHRjb25zdCBkYXRhID0gZ2V0UHJvcGVydGllc0Zyb21PYmoodGhpcy5oYXNoTWFwKTtcblx0XHRjb25zdCB2YWx1ZXMgPSBbXTtcblx0XHRkYXRhLmZvckVhY2gocyA9PiB7XG5cdFx0XHRleHRyYWN0U3VtbWFyaWVzRm9yRXhwb3J0KHMsIHRoaXMucGVyY2VudGlsZXMpLmZvckVhY2godiA9PiB7XG5cdFx0XHRcdHZhbHVlcy5wdXNoKHYpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YWx1ZXMucHVzaChnZXRTdW1Gb3JFeHBvcnQocywgdGhpcykpO1xuXHRcdFx0dmFsdWVzLnB1c2goZ2V0Q291bnRGb3JFeHBvcnQocywgdGhpcykpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdG5hbWU6IHRoaXMubmFtZSxcblx0XHRcdGhlbHA6IHRoaXMuaGVscCxcblx0XHRcdHR5cGUsXG5cdFx0XHR2YWx1ZXMsXG5cdFx0XHRhZ2dyZWdhdG9yOiB0aGlzLmFnZ3JlZ2F0b3Jcblx0XHR9O1xuXHR9XG5cblx0cmVzZXQoKSB7XG5cdFx0Y29uc3QgZGF0YSA9IGdldFByb3BlcnRpZXNGcm9tT2JqKHRoaXMuaGFzaE1hcCk7XG5cdFx0ZGF0YS5mb3JFYWNoKHMgPT4ge1xuXHRcdFx0cy50ZC5yZXNldCgpO1xuXHRcdFx0cy5jb3VudCA9IDA7XG5cdFx0XHRzLnN1bSA9IDA7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogU3RhcnQgYSB0aW1lciB0aGF0IGNvdWxkIGJlIHVzZWQgdG8gbG9nZ2luZyBkdXJhdGlvbnNcblx0ICogQHBhcmFtIHtvYmplY3R9IGxhYmVscyAtIE9iamVjdCB3aXRoIGxhYmVscyB3aGVyZSBrZXkgaXMgdGhlIGxhYmVsIGtleSBhbmQgdmFsdWUgaXMgbGFiZWwgdmFsdWUuIENhbiBvbmx5IGJlIG9uZSBsZXZlbCBkZWVwXG5cdCAqIEByZXR1cm5zIHtmdW5jdGlvbn0gLSBGdW5jdGlvbiB0byBpbnZva2Ugd2hlbiB5b3Ugd2FudCB0byBzdG9wIHRoZSB0aW1lciBhbmQgb2JzZXJ2ZSB0aGUgZHVyYXRpb24gaW4gc2Vjb25kc1xuXHQgKiBAZXhhbXBsZVxuXHQgKiB2YXIgZW5kID0gc3VtbWFyeS5zdGFydFRpbWVyKCk7XG5cdCAqIG1ha2VFeHBlbnNpdmVYSFJSZXF1ZXN0KGZ1bmN0aW9uKGVyciwgcmVzKSB7XG5cdCAqXHRlbmQoKTsgLy9PYnNlcnZlIHRoZSBkdXJhdGlvbiBvZiBleHBlbnNpdmVYSFJSZXF1ZXN0XG5cdCAqIH0pO1xuXHQgKi9cblx0c3RhcnRUaW1lcihsYWJlbHMpIHtcblx0XHRyZXR1cm4gc3RhcnRUaW1lci5jYWxsKHRoaXMsIGxhYmVscykoKTtcblx0fVxuXG5cdGxhYmVscygpIHtcblx0XHRjb25zdCBsYWJlbHMgPSBnZXRMYWJlbHModGhpcy5sYWJlbE5hbWVzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRvYnNlcnZlOiBvYnNlcnZlLmNhbGwodGhpcywgbGFiZWxzKSxcblx0XHRcdHN0YXJ0VGltZXI6IHN0YXJ0VGltZXIuY2FsbCh0aGlzLCBsYWJlbHMpXG5cdFx0fTtcblx0fVxuXG5cdHJlbW92ZSgpIHtcblx0XHRjb25zdCBsYWJlbHMgPSBnZXRMYWJlbHModGhpcy5sYWJlbE5hbWVzLCBhcmd1bWVudHMpO1xuXHRcdHJlbW92ZUxhYmVscy5jYWxsKHRoaXMsIHRoaXMuaGFzaE1hcCwgbGFiZWxzKTtcblx0fVxufVxuXG5mdW5jdGlvbiBleHRyYWN0U3VtbWFyaWVzRm9yRXhwb3J0KHN1bW1hcnlPZkxhYmVscywgcGVyY2VudGlsZXMpIHtcblx0c3VtbWFyeU9mTGFiZWxzLnRkLmNvbXByZXNzKCk7XG5cblx0cmV0dXJuIHBlcmNlbnRpbGVzLm1hcChwZXJjZW50aWxlID0+IHtcblx0XHRjb25zdCBwZXJjZW50aWxlVmFsdWUgPSBzdW1tYXJ5T2ZMYWJlbHMudGQucGVyY2VudGlsZShwZXJjZW50aWxlKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bGFiZWxzOiBPYmplY3QuYXNzaWduKHsgcXVhbnRpbGU6IHBlcmNlbnRpbGUgfSwgc3VtbWFyeU9mTGFiZWxzLmxhYmVscyksXG5cdFx0XHR2YWx1ZTogcGVyY2VudGlsZVZhbHVlID8gcGVyY2VudGlsZVZhbHVlIDogMFxuXHRcdH07XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBnZXRDb3VudEZvckV4cG9ydCh2YWx1ZSwgc3VtbWFyeSkge1xuXHRyZXR1cm4ge1xuXHRcdG1ldHJpY05hbWU6IGAke3N1bW1hcnkubmFtZX1fY291bnRgLFxuXHRcdGxhYmVsczogdmFsdWUubGFiZWxzLFxuXHRcdHZhbHVlOiB2YWx1ZS5jb3VudFxuXHR9O1xufVxuXG5mdW5jdGlvbiBnZXRTdW1Gb3JFeHBvcnQodmFsdWUsIHN1bW1hcnkpIHtcblx0cmV0dXJuIHtcblx0XHRtZXRyaWNOYW1lOiBgJHtzdW1tYXJ5Lm5hbWV9X3N1bWAsXG5cdFx0bGFiZWxzOiB2YWx1ZS5sYWJlbHMsXG5cdFx0dmFsdWU6IHZhbHVlLnN1bVxuXHR9O1xufVxuXG5mdW5jdGlvbiBzdGFydFRpbWVyKHN0YXJ0TGFiZWxzKSB7XG5cdHJldHVybiAoKSA9PiB7XG5cdFx0Y29uc3Qgc3RhcnQgPSBwcm9jZXNzLmhydGltZSgpO1xuXHRcdHJldHVybiBlbmRMYWJlbHMgPT4ge1xuXHRcdFx0Y29uc3QgZGVsdGEgPSBwcm9jZXNzLmhydGltZShzdGFydCk7XG5cdFx0XHR0aGlzLm9ic2VydmUoXG5cdFx0XHRcdE9iamVjdC5hc3NpZ24oe30sIHN0YXJ0TGFiZWxzLCBlbmRMYWJlbHMpLFxuXHRcdFx0XHRkZWx0YVswXSArIGRlbHRhWzFdIC8gMWU5XG5cdFx0XHQpO1xuXHRcdH07XG5cdH07XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlSW5wdXQobmFtZSwgaGVscCwgbGFiZWxzKSB7XG5cdGlmICghaGVscCkge1xuXHRcdHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtYW5kYXRvcnkgaGVscCBwYXJhbWV0ZXInKTtcblx0fVxuXHRpZiAoIW5hbWUpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWFuZGF0b3J5IG5hbWUgcGFyYW1ldGVyJyk7XG5cdH1cblxuXHRpZiAoIXZhbGlkYXRlTWV0cmljTmFtZShuYW1lKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBtZXRyaWMgbmFtZScpO1xuXHR9XG5cblx0aWYgKCF2YWxpZGF0ZUxhYmVsTmFtZShsYWJlbHMpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxhYmVsIG5hbWUnKTtcblx0fVxuXG5cdGxhYmVscy5mb3JFYWNoKGxhYmVsID0+IHtcblx0XHRpZiAobGFiZWwgPT09ICdxdWFudGlsZScpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcigncXVhbnRpbGUgaXMgYSByZXNlcnZlZCBsYWJlbCBrZXl3b3JkJyk7XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gY29uZmlndXJlUGVyY2VudGlsZXMoY29uZmlndXJlZFBlcmNlbnRpbGVzKSB7XG5cdGNvbnN0IGRlZmF1bHRQZXJjZW50aWxlcyA9IFswLjAxLCAwLjA1LCAwLjUsIDAuOSwgMC45NSwgMC45OSwgMC45OTldO1xuXHRyZXR1cm4gW11cblx0XHQuY29uY2F0KGNvbmZpZ3VyZWRQZXJjZW50aWxlcyB8fCBkZWZhdWx0UGVyY2VudGlsZXMpXG5cdFx0LnNvcnQoc29ydEFzY2VuZGluZyk7XG59XG5cbmZ1bmN0aW9uIHNvcnRBc2NlbmRpbmcoeCwgeSkge1xuXHRyZXR1cm4geCAtIHk7XG59XG5cbmZ1bmN0aW9uIG9ic2VydmUobGFiZWxzKSB7XG5cdHJldHVybiB2YWx1ZSA9PiB7XG5cdFx0Y29uc3QgbGFiZWxWYWx1ZVBhaXIgPSBjb252ZXJ0TGFiZWxzQW5kVmFsdWVzKGxhYmVscywgdmFsdWUpO1xuXG5cdFx0dmFsaWRhdGVMYWJlbCh0aGlzLmxhYmVsTmFtZXMsIHRoaXMubGFiZWxzKTtcblx0XHRpZiAoIU51bWJlci5pc0Zpbml0ZShsYWJlbFZhbHVlUGFpci52YWx1ZSkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdGBWYWx1ZSBpcyBub3QgYSB2YWxpZCBudW1iZXI6ICR7dXRpbC5mb3JtYXQobGFiZWxWYWx1ZVBhaXIudmFsdWUpfWBcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgaGFzaCA9IGhhc2hPYmplY3QobGFiZWxWYWx1ZVBhaXIubGFiZWxzKTtcblx0XHRsZXQgc3VtbWFyeU9mTGFiZWwgPSB0aGlzLmhhc2hNYXBbaGFzaF07XG5cdFx0aWYgKCFzdW1tYXJ5T2ZMYWJlbCkge1xuXHRcdFx0c3VtbWFyeU9mTGFiZWwgPSB7XG5cdFx0XHRcdGxhYmVsczogbGFiZWxWYWx1ZVBhaXIubGFiZWxzLFxuXHRcdFx0XHR0ZDogbmV3IHRpbWVXaW5kb3dRdWFudGlsZXModGhpcy5tYXhBZ2VTZWNvbmRzLCB0aGlzLmFnZUJ1Y2tldHMpLFxuXHRcdFx0XHRjb3VudDogMCxcblx0XHRcdFx0c3VtOiAwXG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdHN1bW1hcnlPZkxhYmVsLnRkLnB1c2gobGFiZWxWYWx1ZVBhaXIudmFsdWUpO1xuXHRcdHN1bW1hcnlPZkxhYmVsLmNvdW50Kys7XG5cdFx0aWYgKHN1bW1hcnlPZkxhYmVsLmNvdW50ICUgdGhpcy5jb21wcmVzc0NvdW50ID09PSAwKSB7XG5cdFx0XHRzdW1tYXJ5T2ZMYWJlbC50ZC5jb21wcmVzcygpO1xuXHRcdH1cblx0XHRzdW1tYXJ5T2ZMYWJlbC5zdW0gKz0gbGFiZWxWYWx1ZVBhaXIudmFsdWU7XG5cdFx0dGhpcy5oYXNoTWFwW2hhc2hdID0gc3VtbWFyeU9mTGFiZWw7XG5cdH07XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRMYWJlbHNBbmRWYWx1ZXMobGFiZWxzLCB2YWx1ZSkge1xuXHRpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZTogbGFiZWxzLFxuXHRcdFx0bGFiZWxzOiB7fVxuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGxhYmVscyxcblx0XHR2YWx1ZVxuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN1bW1hcnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgVERpZ2VzdCB9ID0gcmVxdWlyZSgndGRpZ2VzdCcpO1xuXG5jbGFzcyBUaW1lV2luZG93UXVhbnRpbGVzIHtcblx0Y29uc3RydWN0b3IobWF4QWdlU2Vjb25kcywgYWdlQnVja2V0cykge1xuXHRcdHRoaXMubWF4QWdlU2Vjb25kcyA9IG1heEFnZVNlY29uZHMgfHwgMDtcblx0XHR0aGlzLmFnZUJ1Y2tldHMgPSBhZ2VCdWNrZXRzIHx8IDA7XG5cblx0XHR0aGlzLnNob3VsZFJvdGF0ZSA9IG1heEFnZVNlY29uZHMgJiYgYWdlQnVja2V0cztcblxuXHRcdHRoaXMucmluZ0J1ZmZlciA9IEFycmF5KGFnZUJ1Y2tldHMpLmZpbGwobmV3IFREaWdlc3QoKSk7XG5cdFx0dGhpcy5jdXJyZW50QnVmZmVyID0gMDtcblxuXHRcdHRoaXMubGFzdFJvdGF0ZVRpbWVzdGFtcE1pbGxpcyA9IERhdGUubm93KCk7XG5cdFx0dGhpcy5kdXJhdGlvbkJldHdlZW5Sb3RhdGVzTWlsbGlzID1cblx0XHRcdChtYXhBZ2VTZWNvbmRzICogMTAwMCkgLyBhZ2VCdWNrZXRzIHx8IEluZmluaXR5O1xuXHR9XG5cblx0cGVyY2VudGlsZShxdWFudGlsZSkge1xuXHRcdGNvbnN0IGJ1Y2tldCA9IHJvdGF0ZS5jYWxsKHRoaXMpO1xuXHRcdHJldHVybiBidWNrZXQucGVyY2VudGlsZShxdWFudGlsZSk7XG5cdH1cblxuXHRwdXNoKHZhbHVlKSB7XG5cdFx0cm90YXRlLmNhbGwodGhpcyk7XG5cdFx0dGhpcy5yaW5nQnVmZmVyLmZvckVhY2goYnVja2V0ID0+IHtcblx0XHRcdGJ1Y2tldC5wdXNoKHZhbHVlKTtcblx0XHR9KTtcblx0fVxuXG5cdHJlc2V0KCkge1xuXHRcdHRoaXMucmluZ0J1ZmZlci5mb3JFYWNoKGJ1Y2tldCA9PiB7XG5cdFx0XHRidWNrZXQucmVzZXQoKTtcblx0XHR9KTtcblx0fVxuXG5cdGNvbXByZXNzKCkge1xuXHRcdHRoaXMucmluZ0J1ZmZlci5mb3JFYWNoKGJ1Y2tldCA9PiB7XG5cdFx0XHRidWNrZXQuY29tcHJlc3MoKTtcblx0XHR9KTtcblx0fVxufVxuXG5mdW5jdGlvbiByb3RhdGUoKSB7XG5cdGxldCB0aW1lU2luY2VMYXN0Um90YXRlTWlsbGlzID0gRGF0ZS5ub3coKSAtIHRoaXMubGFzdFJvdGF0ZVRpbWVzdGFtcE1pbGxpcztcblx0d2hpbGUgKFxuXHRcdHRpbWVTaW5jZUxhc3RSb3RhdGVNaWxsaXMgPiB0aGlzLmR1cmF0aW9uQmV0d2VlblJvdGF0ZXNNaWxsaXMgJiZcblx0XHR0aGlzLnNob3VsZFJvdGF0ZVxuXHQpIHtcblx0XHR0aGlzLnJpbmdCdWZmZXJbdGhpcy5jdXJyZW50QnVmZmVyXSA9IG5ldyBURGlnZXN0KCk7XG5cblx0XHRpZiAoKyt0aGlzLmN1cnJlbnRCdWZmZXIgPj0gdGhpcy5yaW5nQnVmZmVyLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5jdXJyZW50QnVmZmVyID0gMDtcblx0XHR9XG5cdFx0dGltZVNpbmNlTGFzdFJvdGF0ZU1pbGxpcyAtPSB0aGlzLmR1cmF0aW9uQmV0d2VlblJvdGF0ZXNNaWxsaXM7XG5cdFx0dGhpcy5sYXN0Um90YXRlVGltZXN0YW1wTWlsbGlzICs9IHRoaXMuZHVyYXRpb25CZXR3ZWVuUm90YXRlc01pbGxpcztcblx0fVxuXHRyZXR1cm4gdGhpcy5yaW5nQnVmZmVyW3RoaXMuY3VycmVudEJ1ZmZlcl07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGltZVdpbmRvd1F1YW50aWxlcztcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZGVwcmVjYXRpb25zRW1pdHRlZCA9IHt9O1xuXG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcblxuZXhwb3J0cy5nZXRQcm9wZXJ0aWVzRnJvbU9iaiA9IGZ1bmN0aW9uKGhhc2hNYXApIHtcblx0Y29uc3Qgb2JqID0gT2JqZWN0LmtleXMoaGFzaE1hcCkubWFwKHggPT4gaGFzaE1hcFt4XSk7XG5cdHJldHVybiBvYmo7XG59O1xuXG5leHBvcnRzLmdldFZhbHVlQXNTdHJpbmcgPSBmdW5jdGlvbiBnZXRWYWx1ZVN0cmluZyh2YWx1ZSkge1xuXHRpZiAoTnVtYmVyLmlzTmFOKHZhbHVlKSkge1xuXHRcdHJldHVybiAnTmFuJztcblx0fSBlbHNlIGlmICghTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkge1xuXHRcdGlmICh2YWx1ZSA8IDApIHtcblx0XHRcdHJldHVybiAnLUluZic7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiAnK0luZic7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBgJHt2YWx1ZX1gO1xuXHR9XG59O1xuXG5leHBvcnRzLnJlbW92ZUxhYmVscyA9IGZ1bmN0aW9uIHJlbW92ZUxhYmVscyhoYXNoTWFwLCBsYWJlbHMpIHtcblx0Y29uc3QgaGFzaCA9IGhhc2hPYmplY3QobGFiZWxzKTtcblx0ZGVsZXRlIGhhc2hNYXBbaGFzaF07XG59O1xuXG5leHBvcnRzLnNldFZhbHVlID0gZnVuY3Rpb24gc2V0VmFsdWUoaGFzaE1hcCwgdmFsdWUsIGxhYmVscywgdGltZXN0YW1wKSB7XG5cdGNvbnN0IGhhc2ggPSBoYXNoT2JqZWN0KGxhYmVscyk7XG5cdGhhc2hNYXBbaGFzaF0gPSB7XG5cdFx0dmFsdWU6IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgPyB2YWx1ZSA6IDAsXG5cdFx0bGFiZWxzOiBsYWJlbHMgfHwge30sXG5cdFx0dGltZXN0YW1wOiBpc0RhdGUodGltZXN0YW1wKVxuXHRcdFx0PyB0aW1lc3RhbXAudmFsdWVPZigpXG5cdFx0XHQ6IE51bWJlci5pc0Zpbml0ZSh0aW1lc3RhbXApXG5cdFx0XHQ/IHRpbWVzdGFtcFxuXHRcdFx0OiB1bmRlZmluZWRcblx0fTtcblx0cmV0dXJuIGhhc2hNYXA7XG59O1xuXG4vLyBUT0RPOiBGb3Igbm9kZSA2LCB1c2UgcmVzdCBwYXJhbXNcbmV4cG9ydHMuZ2V0TGFiZWxzID0gZnVuY3Rpb24obGFiZWxOYW1lcywgYXJncykge1xuXHRpZiAobGFiZWxOYW1lcy5sZW5ndGggIT09IGFyZ3MubGVuZ3RoKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG51bWJlciBvZiBhcmd1bWVudHMnKTtcblx0fVxuXG5cdGNvbnN0IGFyZ3NBc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJncyk7XG5cdHJldHVybiBsYWJlbE5hbWVzLnJlZHVjZSgoYWNjLCBsYWJlbCwgaW5kZXgpID0+IHtcblx0XHRhY2NbbGFiZWxdID0gYXJnc0FzQXJyYXlbaW5kZXhdO1xuXHRcdHJldHVybiBhY2M7XG5cdH0sIHt9KTtcbn07XG5cbmZ1bmN0aW9uIGhhc2hPYmplY3QobGFiZWxzKSB7XG5cdC8vIFdlIGRvbid0IGFjdHVhbGx5IG5lZWQgYSBoYXNoIGhlcmUuIFdlIGp1c3QgbmVlZCBhIHN0cmluZyB0aGF0XG5cdC8vIGlzIHVuaXF1ZSBmb3IgZWFjaCBwb3NzaWJsZSBsYWJlbHMgb2JqZWN0IGFuZCBjb25zaXN0ZW50IGFjcm9zc1xuXHQvLyBjYWxscyB3aXRoIGVxdWl2YWxlbnQgbGFiZWxzIG9iamVjdHMuXG5cdGxldCBrZXlzID0gT2JqZWN0LmtleXMobGFiZWxzKTtcblx0aWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG5cdFx0cmV0dXJuICcnO1xuXHR9XG5cdC8vIGVsc2Vcblx0aWYgKGtleXMubGVuZ3RoID4gMSkge1xuXHRcdGtleXMgPSBrZXlzLnNvcnQoKTsgLy8gbmVlZCBjb25zaXN0ZW5jeSBhY3Jvc3MgY2FsbHNcblx0fVxuXG5cdGxldCBoYXNoID0gJyc7XG5cdGxldCBpID0gMDtcblx0Y29uc3Qgc2l6ZSA9IGtleXMubGVuZ3RoO1xuXHRmb3IgKDsgaSA8IHNpemUgLSAxOyBpKyspIHtcblx0XHRoYXNoICs9IGAke2tleXNbaV19OiR7bGFiZWxzW2tleXNbaV1dfSxgO1xuXHR9XG5cdGhhc2ggKz0gYCR7a2V5c1tpXX06JHtsYWJlbHNba2V5c1tpXV19YDtcblx0cmV0dXJuIGhhc2g7XG59XG5leHBvcnRzLmhhc2hPYmplY3QgPSBoYXNoT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUob2JqKSB7XG5cdHJldHVybiBvYmogaW5zdGFuY2VvZiBEYXRlICYmICFpc05hTihvYmoudmFsdWVPZigpKTtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBmdW5jdGlvbiBpc09iamVjdChvYmopIHtcblx0cmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG59O1xuXG5mdW5jdGlvbiBwcmludERlcHJlY2F0aW9uKG1zZykge1xuXHRpZiAoZGVwcmVjYXRpb25zRW1pdHRlZFttc2ddKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0ZGVwcmVjYXRpb25zRW1pdHRlZFttc2ddID0gdHJ1ZTtcblxuXHRpZiAocHJvY2Vzcy5lbWl0V2FybmluZykge1xuXHRcdHByb2Nlc3MuZW1pdFdhcm5pbmcobXNnLCAnRGVwcmVjYXRpb25XYXJuaW5nJyk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gQ2hlY2sgY2FuIGJlIHJlbW92ZWQgd2hlbiB3ZSBvbmx5IHN1cHBvcnQgbm9kZUA+PTZcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuXHRcdGNvbnNvbGUud2FybihuZXcgRXJyb3IobXNnKSk7XG5cdH1cbn1cblxuZXhwb3J0cy5wcmludERlcHJlY2F0aW9uT2JqZWN0Q29uc3RydWN0b3IgPSAoKSA9PiB7XG5cdHByaW50RGVwcmVjYXRpb24oXG5cdFx0J3Byb20tY2xpZW50IC0gUGFzc2luZyBhIG5vbi1vYmplY3QgdG8gbWV0cmljcyBjb25zdHJ1Y3RvciBpcyBkZXByZWNhdGVkJ1xuXHQpO1xufTtcblxuZXhwb3J0cy5wcmludERlcHJlY2F0aW9uQ29sbGVjdERlZmF1bHRNZXRyaWNzTnVtYmVyID0gdGltZW91dCA9PiB7XG5cdHByaW50RGVwcmVjYXRpb24oXG5cdFx0YHByb20tY2xpZW50IC0gQSBudW1iZXIgdG8gZGVmYXVsdE1ldHJpY3MgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBcXGBjb2xsZWN0RGVmYXVsdE1ldHJpY3MoeyB0aW1lb3V0OiAke3RpbWVvdXR9IH0pXFxgLmBcblx0KTtcbn07XG5cbmNsYXNzIEdyb3VwZXIgZXh0ZW5kcyBNYXAge1xuXHQvKipcblx0ICogQWRkcyB0aGUgYHZhbHVlYCB0byB0aGUgYGtleWAncyBhcnJheSBvZiB2YWx1ZXMuXG5cdCAqIEBwYXJhbSB7Kn0ga2V5IEtleSB0byBzZXQuXG5cdCAqIEBwYXJhbSB7Kn0gdmFsdWUgVmFsdWUgdG8gYWRkIHRvIGBrZXlgJ3MgYXJyYXkuXG5cdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9IHVuZGVmaW5lZC5cblx0ICovXG5cdGFkZChrZXksIHZhbHVlKSB7XG5cdFx0aWYgKHRoaXMuaGFzKGtleSkpIHtcblx0XHRcdHRoaXMuZ2V0KGtleSkucHVzaCh2YWx1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2V0KGtleSwgW3ZhbHVlXSk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydHMuR3JvdXBlciA9IEdyb3VwZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG5cbi8vIFRoZXNlIGFyZSBmcm9tIGh0dHBzOi8vcHJvbWV0aGV1cy5pby9kb2NzL2NvbmNlcHRzL2RhdGFfbW9kZWwvI21ldHJpYy1uYW1lcy1hbmQtbGFiZWxzXG5jb25zdCBtZXRyaWNSZWdleHAgPSAvXlthLXpBLVpfOl1bYS16QS1aMC05XzpdKiQvO1xuY29uc3QgbGFiZWxSZWdleHAgPSAvXlthLXpBLVpfXVthLXpBLVowLTlfXSokLztcblxuZXhwb3J0cy52YWxpZGF0ZU1ldHJpY05hbWUgPSBmdW5jdGlvbihuYW1lKSB7XG5cdHJldHVybiBtZXRyaWNSZWdleHAudGVzdChuYW1lKTtcbn07XG5cbmV4cG9ydHMudmFsaWRhdGVMYWJlbE5hbWUgPSBmdW5jdGlvbihuYW1lcykge1xuXHRsZXQgdmFsaWQgPSB0cnVlO1xuXHQobmFtZXMgfHwgW10pLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0aWYgKCFsYWJlbFJlZ2V4cC50ZXN0KG5hbWUpKSB7XG5cdFx0XHR2YWxpZCA9IGZhbHNlO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiB2YWxpZDtcbn07XG5cbmV4cG9ydHMudmFsaWRhdGVMYWJlbCA9IGZ1bmN0aW9uIHZhbGlkYXRlTGFiZWwoc2F2ZWRMYWJlbHMsIGxhYmVscykge1xuXHRPYmplY3Qua2V5cyhsYWJlbHMpLmZvckVhY2gobGFiZWwgPT4ge1xuXHRcdGlmIChzYXZlZExhYmVscy5pbmRleE9mKGxhYmVsKSA9PT0gLTEpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0YEFkZGVkIGxhYmVsIFwiJHtsYWJlbH1cIiBpcyBub3QgaW5jbHVkZWQgaW4gaW5pdGlhbCBsYWJlbHNldDogJHt1dGlsLmluc3BlY3QoXG5cdFx0XHRcdFx0c2F2ZWRMYWJlbHNcblx0XHRcdFx0KX1gXG5cdFx0XHQpO1xuXHRcdH1cblx0fSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpO1xuY29uc3QgaGFzRmxhZyA9IHJlcXVpcmUoJ2hhcy1mbGFnJyk7XG5cbmNvbnN0IHtlbnZ9ID0gcHJvY2VzcztcblxubGV0IGZvcmNlQ29sb3I7XG5pZiAoaGFzRmxhZygnbm8tY29sb3InKSB8fFxuXHRoYXNGbGFnKCduby1jb2xvcnMnKSB8fFxuXHRoYXNGbGFnKCdjb2xvcj1mYWxzZScpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9yPW5ldmVyJykpIHtcblx0Zm9yY2VDb2xvciA9IDA7XG59IGVsc2UgaWYgKGhhc0ZsYWcoJ2NvbG9yJykgfHxcblx0aGFzRmxhZygnY29sb3JzJykgfHxcblx0aGFzRmxhZygnY29sb3I9dHJ1ZScpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9yPWFsd2F5cycpKSB7XG5cdGZvcmNlQ29sb3IgPSAxO1xufVxuaWYgKCdGT1JDRV9DT0xPUicgaW4gZW52KSB7XG5cdGlmIChlbnYuRk9SQ0VfQ09MT1IgPT09IHRydWUgfHwgZW52LkZPUkNFX0NPTE9SID09PSAndHJ1ZScpIHtcblx0XHRmb3JjZUNvbG9yID0gMTtcblx0fSBlbHNlIGlmIChlbnYuRk9SQ0VfQ09MT1IgPT09IGZhbHNlIHx8IGVudi5GT1JDRV9DT0xPUiA9PT0gJ2ZhbHNlJykge1xuXHRcdGZvcmNlQ29sb3IgPSAwO1xuXHR9IGVsc2Uge1xuXHRcdGZvcmNlQ29sb3IgPSBlbnYuRk9SQ0VfQ09MT1IubGVuZ3RoID09PSAwID8gMSA6IE1hdGgubWluKHBhcnNlSW50KGVudi5GT1JDRV9DT0xPUiwgMTApLCAzKTtcblx0fVxufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGVMZXZlbChsZXZlbCkge1xuXHRpZiAobGV2ZWwgPT09IDApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdGxldmVsLFxuXHRcdGhhc0Jhc2ljOiB0cnVlLFxuXHRcdGhhczI1NjogbGV2ZWwgPj0gMixcblx0XHRoYXMxNm06IGxldmVsID49IDNcblx0fTtcbn1cblxuZnVuY3Rpb24gc3VwcG9ydHNDb2xvcihzdHJlYW0pIHtcblx0aWYgKGZvcmNlQ29sb3IgPT09IDApIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdGlmIChoYXNGbGFnKCdjb2xvcj0xNm0nKSB8fFxuXHRcdGhhc0ZsYWcoJ2NvbG9yPWZ1bGwnKSB8fFxuXHRcdGhhc0ZsYWcoJ2NvbG9yPXRydWVjb2xvcicpKSB7XG5cdFx0cmV0dXJuIDM7XG5cdH1cblxuXHRpZiAoaGFzRmxhZygnY29sb3I9MjU2JykpIHtcblx0XHRyZXR1cm4gMjtcblx0fVxuXG5cdGlmIChzdHJlYW0gJiYgIXN0cmVhbS5pc1RUWSAmJiBmb3JjZUNvbG9yID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdGNvbnN0IG1pbiA9IGZvcmNlQ29sb3IgfHwgMDtcblxuXHRpZiAoZW52LlRFUk0gPT09ICdkdW1iJykge1xuXHRcdHJldHVybiBtaW47XG5cdH1cblxuXHRpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuXHRcdC8vIE5vZGUuanMgNy41LjAgaXMgdGhlIGZpcnN0IHZlcnNpb24gb2YgTm9kZS5qcyB0byBpbmNsdWRlIGEgcGF0Y2ggdG9cblx0XHQvLyBsaWJ1diB0aGF0IGVuYWJsZXMgMjU2IGNvbG9yIG91dHB1dCBvbiBXaW5kb3dzLiBBbnl0aGluZyBlYXJsaWVyIGFuZCBpdFxuXHRcdC8vIHdvbid0IHdvcmsuIEhvd2V2ZXIsIGhlcmUgd2UgdGFyZ2V0IE5vZGUuanMgOCBhdCBtaW5pbXVtIGFzIGl0IGlzIGFuIExUU1xuXHRcdC8vIHJlbGVhc2UsIGFuZCBOb2RlLmpzIDcgaXMgbm90LiBXaW5kb3dzIDEwIGJ1aWxkIDEwNTg2IGlzIHRoZSBmaXJzdCBXaW5kb3dzXG5cdFx0Ly8gcmVsZWFzZSB0aGF0IHN1cHBvcnRzIDI1NiBjb2xvcnMuIFdpbmRvd3MgMTAgYnVpbGQgMTQ5MzEgaXMgdGhlIGZpcnN0IHJlbGVhc2Vcblx0XHQvLyB0aGF0IHN1cHBvcnRzIDE2bS9UcnVlQ29sb3IuXG5cdFx0Y29uc3Qgb3NSZWxlYXNlID0gb3MucmVsZWFzZSgpLnNwbGl0KCcuJyk7XG5cdFx0aWYgKFxuXHRcdFx0TnVtYmVyKHByb2Nlc3MudmVyc2lvbnMubm9kZS5zcGxpdCgnLicpWzBdKSA+PSA4ICYmXG5cdFx0XHROdW1iZXIob3NSZWxlYXNlWzBdKSA+PSAxMCAmJlxuXHRcdFx0TnVtYmVyKG9zUmVsZWFzZVsyXSkgPj0gMTA1ODZcblx0XHQpIHtcblx0XHRcdHJldHVybiBOdW1iZXIob3NSZWxlYXNlWzJdKSA+PSAxNDkzMSA/IDMgOiAyO1xuXHRcdH1cblxuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0aWYgKCdDSScgaW4gZW52KSB7XG5cdFx0aWYgKFsnVFJBVklTJywgJ0NJUkNMRUNJJywgJ0FQUFZFWU9SJywgJ0dJVExBQl9DSSddLnNvbWUoc2lnbiA9PiBzaWduIGluIGVudikgfHwgZW52LkNJX05BTUUgPT09ICdjb2Rlc2hpcCcpIHtcblx0XHRcdHJldHVybiAxO1xuXHRcdH1cblxuXHRcdHJldHVybiBtaW47XG5cdH1cblxuXHRpZiAoJ1RFQU1DSVRZX1ZFUlNJT04nIGluIGVudikge1xuXHRcdHJldHVybiAvXig5XFwuKDAqWzEtOV1cXGQqKVxcLnxcXGR7Mix9XFwuKS8udGVzdChlbnYuVEVBTUNJVFlfVkVSU0lPTikgPyAxIDogMDtcblx0fVxuXG5cdGlmIChlbnYuQ09MT1JURVJNID09PSAndHJ1ZWNvbG9yJykge1xuXHRcdHJldHVybiAzO1xuXHR9XG5cblx0aWYgKCdURVJNX1BST0dSQU0nIGluIGVudikge1xuXHRcdGNvbnN0IHZlcnNpb24gPSBwYXJzZUludCgoZW52LlRFUk1fUFJPR1JBTV9WRVJTSU9OIHx8ICcnKS5zcGxpdCgnLicpWzBdLCAxMCk7XG5cblx0XHRzd2l0Y2ggKGVudi5URVJNX1BST0dSQU0pIHtcblx0XHRcdGNhc2UgJ2lUZXJtLmFwcCc6XG5cdFx0XHRcdHJldHVybiB2ZXJzaW9uID49IDMgPyAzIDogMjtcblx0XHRcdGNhc2UgJ0FwcGxlX1Rlcm1pbmFsJzpcblx0XHRcdFx0cmV0dXJuIDI7XG5cdFx0XHQvLyBObyBkZWZhdWx0XG5cdFx0fVxuXHR9XG5cblx0aWYgKC8tMjU2KGNvbG9yKT8kL2kudGVzdChlbnYuVEVSTSkpIHtcblx0XHRyZXR1cm4gMjtcblx0fVxuXG5cdGlmICgvXnNjcmVlbnxeeHRlcm18XnZ0MTAwfF52dDIyMHxecnh2dHxjb2xvcnxhbnNpfGN5Z3dpbnxsaW51eC9pLnRlc3QoZW52LlRFUk0pKSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRpZiAoJ0NPTE9SVEVSTScgaW4gZW52KSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRyZXR1cm4gbWluO1xufVxuXG5mdW5jdGlvbiBnZXRTdXBwb3J0TGV2ZWwoc3RyZWFtKSB7XG5cdGNvbnN0IGxldmVsID0gc3VwcG9ydHNDb2xvcihzdHJlYW0pO1xuXHRyZXR1cm4gdHJhbnNsYXRlTGV2ZWwobGV2ZWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0c3VwcG9ydHNDb2xvcjogZ2V0U3VwcG9ydExldmVsLFxuXHRzdGRvdXQ6IGdldFN1cHBvcnRMZXZlbChwcm9jZXNzLnN0ZG91dCksXG5cdHN0ZGVycjogZ2V0U3VwcG9ydExldmVsKHByb2Nlc3Muc3RkZXJyKVxufTtcbiIsIi8vXG4vLyBURGlnZXN0OlxuLy9cbi8vIGFwcHJveGltYXRlIGRpc3RyaWJ1dGlvbiBwZXJjZW50aWxlcyBmcm9tIGEgc3RyZWFtIG9mIHJlYWxzXG4vL1xudmFyIFJCVHJlZSA9IHJlcXVpcmUoJ2JpbnRyZWVzJykuUkJUcmVlO1xuXG5mdW5jdGlvbiBURGlnZXN0KGRlbHRhLCBLLCBDWCkge1xuICAgIC8vIGFsbG9jYXRlIGEgVERpZ2VzdCBzdHJ1Y3R1cmUuXG4gICAgLy9cbiAgICAvLyBkZWx0YSBpcyB0aGUgY29tcHJlc3Npb24gZmFjdG9yLCB0aGUgbWF4IGZyYWN0aW9uIG9mIG1hc3MgdGhhdFxuICAgIC8vIGNhbiBiZSBvd25lZCBieSBvbmUgY2VudHJvaWQgKGJpZ2dlciwgdXAgdG8gMS4wLCBtZWFucyBtb3JlXG4gICAgLy8gY29tcHJlc3Npb24pLiBkZWx0YT1mYWxzZSBzd2l0Y2hlcyBvZmYgVERpZ2VzdCBiZWhhdmlvciBhbmQgdHJlYXRzXG4gICAgLy8gdGhlIGRpc3RyaWJ1dGlvbiBhcyBkaXNjcmV0ZSwgd2l0aCBubyBtZXJnaW5nIGFuZCBleGFjdCB2YWx1ZXNcbiAgICAvLyByZXBvcnRlZC5cbiAgICAvL1xuICAgIC8vIEsgaXMgYSBzaXplIHRocmVzaG9sZCB0aGF0IHRyaWdnZXJzIHJlY29tcHJlc3Npb24gYXMgdGhlIFREaWdlc3RcbiAgICAvLyBncm93cyBkdXJpbmcgaW5wdXQuICAoU2V0IGl0IHRvIDAgdG8gZGlzYWJsZSBhdXRvbWF0aWMgcmVjb21wcmVzc2lvbilcbiAgICAvL1xuICAgIC8vIENYIHNwZWNpZmllcyBob3cgb2Z0ZW4gdG8gdXBkYXRlIGNhY2hlZCBjdW11bGF0aXZlIHRvdGFscyB1c2VkXG4gICAgLy8gZm9yIHF1YW50aWxlIGVzdGltYXRpb24gZHVyaW5nIGluZ2VzdCAoc2VlIGN1bXVsYXRlKCkpLiAgU2V0IHRvXG4gICAgLy8gMCB0byB1c2UgZXhhY3QgcXVhbnRpbGVzIGZvciBlYWNoIG5ldyBwb2ludC5cbiAgICAvL1xuICAgIHRoaXMuZGlzY3JldGUgPSAoZGVsdGEgPT09IGZhbHNlKTtcbiAgICB0aGlzLmRlbHRhID0gZGVsdGEgfHwgMC4wMTtcbiAgICB0aGlzLksgPSAoSyA9PT0gdW5kZWZpbmVkKSA/IDI1IDogSztcbiAgICB0aGlzLkNYID0gKENYID09PSB1bmRlZmluZWQpID8gMS4xIDogQ1g7XG4gICAgdGhpcy5jZW50cm9pZHMgPSBuZXcgUkJUcmVlKGNvbXBhcmVfY2VudHJvaWRfbWVhbnMpO1xuICAgIHRoaXMubnJlc2V0ID0gMDtcbiAgICB0aGlzLnJlc2V0KCk7XG59XG5cblREaWdlc3QucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gcHJlcGFyZSB0byBkaWdlc3QgbmV3IHBvaW50cy5cbiAgICAvL1xuICAgIHRoaXMuY2VudHJvaWRzLmNsZWFyKCk7XG4gICAgdGhpcy5uID0gMDtcbiAgICB0aGlzLm5yZXNldCArPSAxO1xuICAgIHRoaXMubGFzdF9jdW11bGF0ZSA9IDA7XG59O1xuXG5URGlnZXN0LnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY2VudHJvaWRzLnNpemU7XG59O1xuXG5URGlnZXN0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24oZXZlcnl0aGluZykge1xuICAgIC8vIHJldHVybiB7bWVhbixufSBvZiBjZW50cm9pZHMgYXMgYW4gYXJyYXkgb3JkZXJlZCBieSBtZWFuLlxuICAgIC8vXG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGlmIChldmVyeXRoaW5nKSB7XG4gICAgICAgIHRoaXMuX2N1bXVsYXRlKHRydWUpOyAvLyBiZSBzdXJlIGN1bW5zIGFyZSBleGFjdFxuICAgICAgICB0aGlzLmNlbnRyb2lkcy5lYWNoKGZ1bmN0aW9uKGMpIHsgcmVzdWx0LnB1c2goYyk7IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2VudHJvaWRzLmVhY2goZnVuY3Rpb24oYykgeyByZXN1bHQucHVzaCh7bWVhbjpjLm1lYW4sIG46Yy5ufSk7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuVERpZ2VzdC5wcm90b3R5cGUuc3VtbWFyeSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcHByb3ggPSAodGhpcy5kaXNjcmV0ZSkgPyBcImV4YWN0IFwiIDogXCJhcHByb3hpbWF0aW5nIFwiO1xuICAgIHZhciBzID0gW2FwcHJveCArIHRoaXMubiArIFwiIHNhbXBsZXMgdXNpbmcgXCIgKyB0aGlzLnNpemUoKSArIFwiIGNlbnRyb2lkc1wiLFxuICAgICAgICAgICAgIFwibWluID0gXCIrdGhpcy5wZXJjZW50aWxlKDApLFxuICAgICAgICAgICAgIFwiUTEgID0gXCIrdGhpcy5wZXJjZW50aWxlKDAuMjUpLFxuICAgICAgICAgICAgIFwiUTIgID0gXCIrdGhpcy5wZXJjZW50aWxlKDAuNSksXG4gICAgICAgICAgICAgXCJRMyAgPSBcIit0aGlzLnBlcmNlbnRpbGUoMC43NSksXG4gICAgICAgICAgICAgXCJtYXggPSBcIit0aGlzLnBlcmNlbnRpbGUoMS4wKV07XG4gICAgcmV0dXJuIHMuam9pbignXFxuJyk7XG59O1xuXG5mdW5jdGlvbiBjb21wYXJlX2NlbnRyb2lkX21lYW5zKGEsIGIpIHtcbiAgICAvLyBvcmRlciB0d28gY2VudHJvaWRzIGJ5IG1lYW4uXG4gICAgLy9cbiAgICByZXR1cm4gKGEubWVhbiA+IGIubWVhbikgPyAxIDogKGEubWVhbiA8IGIubWVhbikgPyAtMSA6IDA7XG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVfY2VudHJvaWRfbWVhbl9jdW1ucyhhLCBiKSB7XG4gICAgLy8gb3JkZXIgdHdvIGNlbnRyb2lkcyBieSBtZWFuX2N1bW4uXG4gICAgLy9cbiAgICByZXR1cm4gKGEubWVhbl9jdW1uIC0gYi5tZWFuX2N1bW4pO1xufVxuXG5URGlnZXN0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oeCwgbikge1xuICAgIC8vIGluY29ycG9yYXRlIHZhbHVlIG9yIGFycmF5IG9mIHZhbHVlcyB4LCBoYXZpbmcgY291bnQgbiBpbnRvIHRoZVxuICAgIC8vIFREaWdlc3QuIG4gZGVmYXVsdHMgdG8gMS5cbiAgICAvL1xuICAgIG4gPSBuIHx8IDE7XG4gICAgeCA9IEFycmF5LmlzQXJyYXkoeCkgPyB4IDogW3hdO1xuICAgIGZvciAodmFyIGkgPSAwIDsgaSA8IHgubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgIHRoaXMuX2RpZ2VzdCh4W2ldLCBuKTtcbiAgICB9XG59O1xuXG5URGlnZXN0LnByb3RvdHlwZS5wdXNoX2NlbnRyb2lkID0gZnVuY3Rpb24oYykge1xuICAgIC8vIGluY29ycG9yYXRlIGNlbnRyb2lkIG9yIGFycmF5IG9mIGNlbnRyb2lkcyBjXG4gICAgLy9cbiAgICBjID0gQXJyYXkuaXNBcnJheShjKSA/IGMgOiBbY107XG4gICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgYy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgdGhpcy5fZGlnZXN0KGNbaV0ubWVhbiwgY1tpXS5uKTtcbiAgICB9XG59O1xuXG5URGlnZXN0LnByb3RvdHlwZS5fY3VtdWxhdGUgPSBmdW5jdGlvbihleGFjdCkge1xuICAgIC8vIHVwZGF0ZSBjdW11bGF0aXZlIGNvdW50cyBmb3IgZWFjaCBjZW50cm9pZFxuICAgIC8vXG4gICAgLy8gZXhhY3Q6IGZhbHNleSBtZWFucyBvbmx5IGN1bXVsYXRlIGFmdGVyIHN1ZmZpY2llbnRcbiAgICAvLyBncm93dGguIER1cmluZyBpbmdlc3QsIHRoZXNlIGNvdW50cyBhcmUgdXNlZCBhcyBxdWFudGlsZVxuICAgIC8vIGVzdGltYXRlcywgYW5kIHRoZXkgd29yayB3ZWxsIGV2ZW4gd2hlbiBzb21ld2hhdCBvdXQgb2ZcbiAgICAvLyBkYXRlLiAodGhpcyBpcyBhIGRlcGFydHVyZSBmcm9tIHRoZSBwdWJsaWNhdGlvbiwgeW91IG1heSBzZXQgQ1hcbiAgICAvLyB0byAwIHRvIGRpc2FibGUpLlxuICAgIC8vXG4gICAgaWYgKHRoaXMubiA9PT0gdGhpcy5sYXN0X2N1bXVsYXRlIHx8XG4gICAgICAgICFleGFjdCAmJiB0aGlzLkNYICYmIHRoaXMuQ1ggPiAodGhpcy5uIC8gdGhpcy5sYXN0X2N1bXVsYXRlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBjdW1uID0gMDtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5jZW50cm9pZHMuZWFjaChmdW5jdGlvbihjKSB7XG4gICAgICAgIGMubWVhbl9jdW1uID0gY3VtbiArIGMubiAvIDI7IC8vIGhhbGYgb2YgbiBhdCB0aGUgbWVhblxuICAgICAgICBjdW1uID0gYy5jdW1uID0gY3VtbiArIGMubjtcbiAgICB9KTtcbiAgICB0aGlzLm4gPSB0aGlzLmxhc3RfY3VtdWxhdGUgPSBjdW1uO1xufTtcblxuVERpZ2VzdC5wcm90b3R5cGUuZmluZF9uZWFyZXN0ID0gZnVuY3Rpb24oeCkge1xuICAgIC8vIGZpbmQgdGhlIGNlbnRyb2lkIGNsb3Nlc3QgdG8geC4gVGhlIGFzc3VtcHRpb24gb2ZcbiAgICAvLyB1bmlxdWUgbWVhbnMgYW5kIGEgdW5pcXVlIG5lYXJlc3QgY2VudHJvaWQgZGVwYXJ0cyBmcm9tIHRoZVxuICAgIC8vIHBhcGVyLCBzZWUgX2RpZ2VzdCgpIGJlbG93XG4gICAgLy9cbiAgICBpZiAodGhpcy5zaXplKCkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBpdGVyID0gdGhpcy5jZW50cm9pZHMubG93ZXJCb3VuZCh7bWVhbjp4fSk7IC8vIHggPD0gaXRlciB8fCBpdGVyPT1udWxsXG4gICAgdmFyIGMgPSAoaXRlci5kYXRhKCkgPT09IG51bGwpID8gaXRlci5wcmV2KCkgOiBpdGVyLmRhdGEoKTtcbiAgICBpZiAoYy5tZWFuID09PSB4IHx8IHRoaXMuZGlzY3JldGUpIHtcbiAgICAgICAgcmV0dXJuIGM7IC8vIGMgaXMgZWl0aGVyIHggb3IgYSBuZWlnaGJvciAoZGlzY3JldGU6IG5vIGRpc3RhbmNlIGZ1bmMpXG4gICAgfVxuICAgIHZhciBwcmV2ID0gaXRlci5wcmV2KCk7XG4gICAgaWYgKHByZXYgJiYgTWF0aC5hYnMocHJldi5tZWFuIC0geCkgPCBNYXRoLmFicyhjLm1lYW4gLSB4KSkge1xuICAgICAgICByZXR1cm4gcHJldjtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYztcbiAgICB9XG59O1xuXG5URGlnZXN0LnByb3RvdHlwZS5fbmV3X2NlbnRyb2lkID0gZnVuY3Rpb24oeCwgbiwgY3Vtbikge1xuICAgIC8vIGNyZWF0ZSBhbmQgaW5zZXJ0IGEgbmV3IGNlbnRyb2lkIGludG8gdGhlIGRpZ2VzdCAoZG9uJ3QgdXBkYXRlXG4gICAgLy8gY3VtdWxhdGl2ZXMpLlxuICAgIC8vXG4gICAgdmFyIGMgPSB7bWVhbjp4LCBuOm4sIGN1bW46Y3Vtbn07XG4gICAgdGhpcy5jZW50cm9pZHMuaW5zZXJ0KGMpO1xuICAgIHRoaXMubiArPSBuO1xuICAgIHJldHVybiBjO1xufTtcblxuVERpZ2VzdC5wcm90b3R5cGUuX2FkZHdlaWdodCA9IGZ1bmN0aW9uKG5lYXJlc3QsIHgsIG4pIHtcbiAgICAvLyBhZGQgd2VpZ2h0IGF0IGxvY2F0aW9uIHggdG8gbmVhcmVzdCBjZW50cm9pZC4gIGFkZGluZyB4IHRvXG4gICAgLy8gbmVhcmVzdCB3aWxsIG5vdCBzaGlmdCBpdHMgcmVsYXRpdmUgcG9zaXRpb24gaW4gdGhlIHRyZWUgYW5kXG4gICAgLy8gcmVxdWlyZSByZWluc2VydGlvbi5cbiAgICAvL1xuICAgIGlmICh4ICE9PSBuZWFyZXN0Lm1lYW4pIHtcbiAgICAgICAgbmVhcmVzdC5tZWFuICs9IG4gKiAoeCAtIG5lYXJlc3QubWVhbikgLyAobmVhcmVzdC5uICsgbik7XG4gICAgfVxuICAgIG5lYXJlc3QuY3VtbiArPSBuO1xuICAgIG5lYXJlc3QubWVhbl9jdW1uICs9IG4gLyAyO1xuICAgIG5lYXJlc3QubiArPSBuO1xuICAgIHRoaXMubiArPSBuO1xufTtcblxuVERpZ2VzdC5wcm90b3R5cGUuX2RpZ2VzdCA9IGZ1bmN0aW9uKHgsIG4pIHtcbiAgICAvLyBpbmNvcnBvcmF0ZSB2YWx1ZSB4LCBoYXZpbmcgY291bnQgbiBpbnRvIHRoZSBURGlnZXN0LlxuICAgIC8vXG4gICAgdmFyIG1pbiA9IHRoaXMuY2VudHJvaWRzLm1pbigpO1xuICAgIHZhciBtYXggPSB0aGlzLmNlbnRyb2lkcy5tYXgoKTtcbiAgICB2YXIgbmVhcmVzdCA9IHRoaXMuZmluZF9uZWFyZXN0KHgpO1xuICAgIGlmIChuZWFyZXN0ICYmIG5lYXJlc3QubWVhbiA9PT0geCkge1xuICAgICAgICAvLyBhY2N1bXVsYXRlIGV4YWN0IG1hdGNoZXMgaW50byB0aGUgY2VudHJvaWQgd2l0aG91dFxuICAgICAgICAvLyBsaW1pdC4gdGhpcyBpcyBhIGRlcGFydHVyZSBmcm9tIHRoZSBwYXBlciwgbWFkZSBzb1xuICAgICAgICAvLyBjZW50cm9pZHMgcmVtYWluIHVuaXF1ZSBhbmQgY29kZSBjYW4gYmUgc2ltcGxlLlxuICAgICAgICB0aGlzLl9hZGR3ZWlnaHQobmVhcmVzdCwgeCwgbik7XG4gICAgfSBlbHNlIGlmIChuZWFyZXN0ID09PSBtaW4pIHtcbiAgICAgICAgdGhpcy5fbmV3X2NlbnRyb2lkKHgsIG4sIDApOyAvLyBuZXcgcG9pbnQgYXJvdW5kIG1pbiBib3VuZGFyeVxuICAgIH0gZWxzZSBpZiAobmVhcmVzdCA9PT0gbWF4ICkge1xuICAgICAgICB0aGlzLl9uZXdfY2VudHJvaWQoeCwgbiwgdGhpcy5uKTsgLy8gbmV3IHBvaW50IGFyb3VuZCBtYXggYm91bmRhcnlcbiAgICB9IGVsc2UgaWYgKHRoaXMuZGlzY3JldGUpIHtcbiAgICAgICAgdGhpcy5fbmV3X2NlbnRyb2lkKHgsIG4sIG5lYXJlc3QuY3Vtbik7IC8vIG5ldmVyIG1lcmdlXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY29uaWRlciBhIG1lcmdlIGJhc2VkIG9uIG5lYXJlc3QgY2VudHJvaWQncyBjYXBhY2l0eS4gaWZcbiAgICAgICAgLy8gdGhlcmUncyBub3Qgcm9vbSBmb3IgYWxsIG9mIG4sIGRvbid0IGJvdGhlciBtZXJnaW5nIGFueSBvZlxuICAgICAgICAvLyBpdCBpbnRvIG5lYXJlc3QsIGFzIHdlJ2xsIGhhdmUgdG8gbWFrZSBhIG5ldyBjZW50cm9pZFxuICAgICAgICAvLyBhbnl3YXkgZm9yIHRoZSByZW1haW5kZXIgKGRlcGFydHVyZSBmcm9tIHRoZSBwYXBlcikuXG4gICAgICAgIHZhciBwID0gbmVhcmVzdC5tZWFuX2N1bW4gLyB0aGlzLm47XG4gICAgICAgIHZhciBtYXhfbiA9IE1hdGguZmxvb3IoNCAqIHRoaXMubiAqIHRoaXMuZGVsdGEgKiBwICogKDEgLSBwKSk7XG4gICAgICAgIGlmIChtYXhfbiAtIG5lYXJlc3QubiA+PSBuKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGR3ZWlnaHQobmVhcmVzdCwgeCwgbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9uZXdfY2VudHJvaWQoeCwgbiwgbmVhcmVzdC5jdW1uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9jdW11bGF0ZShmYWxzZSk7XG4gICAgaWYgKCF0aGlzLmRpc2NyZXRlICYmIHRoaXMuSyAmJiB0aGlzLnNpemUoKSA+IHRoaXMuSyAvIHRoaXMuZGVsdGEpIHtcbiAgICAgICAgLy8gcmUtcHJvY2VzcyB0aGUgY2VudHJvaWRzIGFuZCBob3BlIGZvciBzb21lIGNvbXByZXNzaW9uLlxuICAgICAgICB0aGlzLmNvbXByZXNzKCk7XG4gICAgfVxufTtcblxuVERpZ2VzdC5wcm90b3R5cGUuYm91bmRfbWVhbiA9IGZ1bmN0aW9uKHgpIHtcbiAgICAvLyBmaW5kIGNlbnRyb2lkcyBsb3dlciBhbmQgdXBwZXIgc3VjaCB0aGF0IGxvd2VyLm1lYW4gPCB4IDxcbiAgICAvLyB1cHBlci5tZWFuIG9yIGxvd2VyLm1lYW4gPT09IHggPT09IHVwcGVyLm1lYW4uIERvbid0IGNhbGxcbiAgICAvLyB0aGlzIGZvciB4IG91dCBvZiBib3VuZHMuXG4gICAgLy9cbiAgICB2YXIgaXRlciA9IHRoaXMuY2VudHJvaWRzLnVwcGVyQm91bmQoe21lYW46eH0pOyAvLyB4IDwgaXRlclxuICAgIHZhciBsb3dlciA9IGl0ZXIucHJldigpOyAgICAgIC8vIGxvd2VyIDw9IHhcbiAgICB2YXIgdXBwZXIgPSAobG93ZXIubWVhbiA9PT0geCkgPyBsb3dlciA6IGl0ZXIubmV4dCgpO1xuICAgIHJldHVybiBbbG93ZXIsIHVwcGVyXTtcbn07XG5cblREaWdlc3QucHJvdG90eXBlLnBfcmFuayA9IGZ1bmN0aW9uKHhfb3JfeGxpc3QpIHtcbiAgICAvLyByZXR1cm4gYXBwcm94aW1hdGUgcGVyY2VudGlsZS1yYW5rcyAoMC4uMSkgZm9yIGRhdGEgdmFsdWUgeC5cbiAgICAvLyBvciBsaXN0IG9mIHguICBjYWxjdWxhdGVkIGFjY29yZGluZyB0b1xuICAgIC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1BlcmNlbnRpbGVfcmFua1xuICAgIC8vXG4gICAgLy8gKE5vdGUgdGhhdCBpbiBjb250aW51b3VzIG1vZGUsIGJvdW5kYXJ5IHNhbXBsZSB2YWx1ZXMgd2lsbFxuICAgIC8vIHJlcG9ydCBoYWxmIHRoZWlyIGNlbnRyb2lkIHdlaWdodCBpbndhcmQgZnJvbSAwLzEgYXMgdGhlXG4gICAgLy8gcGVyY2VudGlsZS1yYW5rLiBYIHZhbHVlcyBvdXRzaWRlIHRoZSBvYnNlcnZlZCByYW5nZSByZXR1cm5cbiAgICAvLyAwLzEpXG4gICAgLy9cbiAgICAvLyB0aGlzIHRyaWdnZXJzIGN1bXVsYXRlKCkgaWYgY3VtbidzIGFyZSBvdXQgb2YgZGF0ZS5cbiAgICAvL1xuICAgIHZhciB4cyA9IEFycmF5LmlzQXJyYXkoeF9vcl94bGlzdCkgPyB4X29yX3hsaXN0IDogW3hfb3JfeGxpc3RdO1xuICAgIHZhciBwcyA9IHhzLm1hcCh0aGlzLl9wX3JhbmssIHRoaXMpO1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHhfb3JfeGxpc3QpID8gcHMgOiBwc1swXTtcbn07XG5cblREaWdlc3QucHJvdG90eXBlLl9wX3JhbmsgPSBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHRoaXMuc2l6ZSgpID09PSAwKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmICh4IDwgdGhpcy5jZW50cm9pZHMubWluKCkubWVhbikge1xuICAgICAgICByZXR1cm4gMC4wO1xuICAgIH0gZWxzZSBpZiAoeCA+IHRoaXMuY2VudHJvaWRzLm1heCgpLm1lYW4pIHtcbiAgICAgICAgcmV0dXJuIDEuMDtcbiAgICB9XG4gICAgLy8gZmluZCBjZW50cm9pZHMgdGhhdCBicmFja2V0IHggYW5kIGludGVycG9sYXRlIHgncyBjdW1uIGZyb21cbiAgICAvLyB0aGVpciBjdW1uJ3MuXG4gICAgdGhpcy5fY3VtdWxhdGUodHJ1ZSk7IC8vIGJlIHN1cmUgY3VtbnMgYXJlIGV4YWN0XG4gICAgdmFyIGJvdW5kID0gdGhpcy5ib3VuZF9tZWFuKHgpO1xuICAgIHZhciBsb3dlciA9IGJvdW5kWzBdLCB1cHBlciA9IGJvdW5kWzFdO1xuICAgIGlmICh0aGlzLmRpc2NyZXRlKSB7XG4gICAgICAgIHJldHVybiBsb3dlci5jdW1uIC8gdGhpcy5uO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBjdW1uID0gbG93ZXIubWVhbl9jdW1uO1xuICAgICAgICBpZiAobG93ZXIgIT09IHVwcGVyKSB7XG4gICAgICAgICAgICBjdW1uICs9ICh4IC0gbG93ZXIubWVhbikgKiAodXBwZXIubWVhbl9jdW1uIC0gbG93ZXIubWVhbl9jdW1uKSAvICh1cHBlci5tZWFuIC0gbG93ZXIubWVhbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1bW4gLyB0aGlzLm47XG4gICAgfVxufTtcblxuVERpZ2VzdC5wcm90b3R5cGUuYm91bmRfbWVhbl9jdW1uID0gZnVuY3Rpb24oY3Vtbikge1xuICAgIC8vIGZpbmQgY2VudHJvaWRzIGxvd2VyIGFuZCB1cHBlciBzdWNoIHRoYXQgbG93ZXIubWVhbl9jdW1uIDwgeCA8XG4gICAgLy8gdXBwZXIubWVhbl9jdW1uIG9yIGxvd2VyLm1lYW5fY3VtbiA9PT0geCA9PT0gdXBwZXIubWVhbl9jdW1uLiBEb24ndCBjYWxsXG4gICAgLy8gdGhpcyBmb3IgY3VtbiBvdXQgb2YgYm91bmRzLlxuICAgIC8vXG4gICAgLy8gWFhYIGJlY2F1c2UgbWVhbiBhbmQgbWVhbl9jdW1uIGdpdmUgcmlzZSB0byB0aGUgc2FtZSBzb3J0IG9yZGVyXG4gICAgLy8gKHVwIHRvIGlkZW50aWNhbCBtZWFucyksIHVzZSB0aGUgbWVhbiByYnRyZWUgZm9yIG91ciBzZWFyY2guXG4gICAgdGhpcy5jZW50cm9pZHMuX2NvbXBhcmF0b3IgPSBjb21wYXJlX2NlbnRyb2lkX21lYW5fY3VtbnM7XG4gICAgdmFyIGl0ZXIgPSB0aGlzLmNlbnRyb2lkcy51cHBlckJvdW5kKHttZWFuX2N1bW46Y3Vtbn0pOyAvLyBjdW1uIDwgaXRlclxuICAgIHRoaXMuY2VudHJvaWRzLl9jb21wYXJhdG9yID0gY29tcGFyZV9jZW50cm9pZF9tZWFucztcbiAgICB2YXIgbG93ZXIgPSBpdGVyLnByZXYoKTsgICAgICAvLyBsb3dlciA8PSBjdW1uXG4gICAgdmFyIHVwcGVyID0gKGxvd2VyICYmIGxvd2VyLm1lYW5fY3VtbiA9PT0gY3VtbikgPyBsb3dlciA6IGl0ZXIubmV4dCgpO1xuICAgIHJldHVybiBbbG93ZXIsIHVwcGVyXTtcbn07XG5cblREaWdlc3QucHJvdG90eXBlLnBlcmNlbnRpbGUgPSBmdW5jdGlvbihwX29yX3BsaXN0KSB7XG4gICAgLy8gZm9yIHBlcmNlbnRhZ2UgcCAoMC4uMSksIG9yIGZvciBlYWNoIHAgaW4gYSBsaXN0IG9mIHBzLCByZXR1cm5cbiAgICAvLyB0aGUgc21hbGxlc3QgZGF0YSB2YWx1ZSBxIGF0IHdoaWNoIGF0IGxlYXN0IHAgcGVyY2VudCBvZiB0aGVcbiAgICAvLyBvYnNlcnZhdGlvbnMgPD0gcS5cbiAgICAvL1xuICAgIC8vIGZvciBkaXNjcmV0ZSBkaXN0cmlidXRpb25zLCB0aGlzIHNlbGVjdHMgcSB1c2luZyB0aGUgTmVhcmVzdFxuICAgIC8vIFJhbmsgTWV0aG9kXG4gICAgLy8gKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1BlcmNlbnRpbGUjVGhlX05lYXJlc3RfUmFua19tZXRob2QpXG4gICAgLy8gKGluIHNjaXB5LCBzYW1lIGFzIHBlcmNlbnRpbGUoLi4uLiwgaW50ZXJwb2xhdGlvbj0naGlnaGVyJylcbiAgICAvL1xuICAgIC8vIGZvciBjb250aW51b3VzIGRpc3RyaWJ1dGlvbnMsIGludGVycG9sYXRlcyBkYXRhIHZhbHVlcyBiZXR3ZWVuXG4gICAgLy8gY291bnQtd2VpZ2h0ZWQgYnJhY2tldGluZyBtZWFucy5cbiAgICAvL1xuICAgIC8vIHRoaXMgdHJpZ2dlcnMgY3VtdWxhdGUoKSBpZiBjdW1uJ3MgYXJlIG91dCBvZiBkYXRlLlxuICAgIC8vXG4gICAgdmFyIHBzID0gQXJyYXkuaXNBcnJheShwX29yX3BsaXN0KSA/IHBfb3JfcGxpc3QgOiBbcF9vcl9wbGlzdF07XG4gICAgdmFyIHFzID0gcHMubWFwKHRoaXMuX3BlcmNlbnRpbGUsIHRoaXMpO1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHBfb3JfcGxpc3QpID8gcXMgOiBxc1swXTtcbn07XG5cblREaWdlc3QucHJvdG90eXBlLl9wZXJjZW50aWxlID0gZnVuY3Rpb24ocCkge1xuICAgIGlmICh0aGlzLnNpemUoKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLl9jdW11bGF0ZSh0cnVlKTsgLy8gYmUgc3VyZSBjdW1ucyBhcmUgZXhhY3RcbiAgICB2YXIgbWluID0gdGhpcy5jZW50cm9pZHMubWluKCk7XG4gICAgdmFyIG1heCA9IHRoaXMuY2VudHJvaWRzLm1heCgpO1xuICAgIHZhciBoID0gdGhpcy5uICogcDtcbiAgICB2YXIgYm91bmQgPSB0aGlzLmJvdW5kX21lYW5fY3VtbihoKTtcbiAgICB2YXIgbG93ZXIgPSBib3VuZFswXSwgdXBwZXIgPSBib3VuZFsxXTtcblxuICAgIGlmICh1cHBlciA9PT0gbG93ZXIgfHwgbG93ZXIgPT09IG51bGwgfHwgdXBwZXIgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIChsb3dlciB8fCB1cHBlcikubWVhbjtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmRpc2NyZXRlKSB7XG4gICAgICAgIHJldHVybiBsb3dlci5tZWFuICsgKGggLSBsb3dlci5tZWFuX2N1bW4pICogKHVwcGVyLm1lYW4gLSBsb3dlci5tZWFuKSAvICh1cHBlci5tZWFuX2N1bW4gLSBsb3dlci5tZWFuX2N1bW4pO1xuICAgIH0gZWxzZSBpZiAoaCA8PSBsb3dlci5jdW1uKSB7XG4gICAgICAgIHJldHVybiBsb3dlci5tZWFuO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB1cHBlci5tZWFuO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHBvcF9yYW5kb20oY2hvaWNlcykge1xuICAgIC8vIHJlbW92ZSBhbmQgcmV0dXJuIGFuIGl0ZW0gcmFuZG9tbHkgY2hvc2VuIGZyb20gdGhlIGFycmF5IG9mIGNob2ljZXNcbiAgICAvLyAobXV0YXRlcyBjaG9pY2VzKVxuICAgIC8vXG4gICAgdmFyIGlkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNob2ljZXMubGVuZ3RoKTtcbiAgICByZXR1cm4gY2hvaWNlcy5zcGxpY2UoaWR4LCAxKVswXTtcbn1cblxuVERpZ2VzdC5wcm90b3R5cGUuY29tcHJlc3MgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBURGlnZXN0cyBleHBlcmllbmNlIHdvcnN0IGNhc2UgY29tcHJlc3Npb24gKG5vbmUpIHdoZW4gaW5wdXRcbiAgICAvLyBpbmNyZWFzZXMgbW9ub3RvbmljYWxseS4gIEltcHJvdmUgb24gYW55IGJhZCBsdWNrIGJ5XG4gICAgLy8gcmVjb25zdW1pbmcgZGlnZXN0IGNlbnRyb2lkcyBhcyBpZiB0aGV5IHdlcmUgd2VpZ2h0ZWQgcG9pbnRzXG4gICAgLy8gd2hpbGUgc2h1ZmZsaW5nIHRoZWlyIG9yZGVyIChhbmQgaG9wZSBmb3IgdGhlIGJlc3QpLlxuICAgIC8vXG4gICAgaWYgKHRoaXMuY29tcHJlc3NpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcG9pbnRzID0gdGhpcy50b0FycmF5KCk7XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMuY29tcHJlc3NpbmcgPSB0cnVlO1xuICAgIHdoaWxlIChwb2ludHMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnB1c2hfY2VudHJvaWQocG9wX3JhbmRvbShwb2ludHMpKTtcbiAgICB9XG4gICAgdGhpcy5fY3VtdWxhdGUodHJ1ZSk7XG4gICAgdGhpcy5jb21wcmVzc2luZyA9IGZhbHNlO1xufTtcblxuZnVuY3Rpb24gRGlnZXN0KGNvbmZpZykge1xuICAgIC8vIGFsbG9jYXRlIGEgZGlzdHJpYnV0aW9uIGRpZ2VzdCBzdHJ1Y3R1cmUuIFRoaXMgaXMgYW4gZXh0ZW5zaW9uXG4gICAgLy8gb2YgYSBURGlnZXN0IHN0cnVjdHVyZSB0aGF0IHN0YXJ0cyBpbiBleGFjdCBoaXN0b2dyYW0gKGRpc2NyZXRlKVxuICAgIC8vIG1vZGUsIGFuZCBhdXRvbWF0aWNhbGx5IHN3aXRjaGVzIHRvIFREaWdlc3QgbW9kZSBmb3IgbGFyZ2VcbiAgICAvLyBzYW1wbGVzIHRoYXQgYXBwZWFyIHRvIGJlIGZyb20gYSBjb250aW51b3VzIGRpc3RyaWJ1dGlvbi5cbiAgICAvL1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgIHRoaXMubW9kZSA9IHRoaXMuY29uZmlnLm1vZGUgfHwgJ2F1dG8nOyAvLyBkaXNjLCBjb250LCBhdXRvXG4gICAgVERpZ2VzdC5jYWxsKHRoaXMsIHRoaXMubW9kZSA9PT0gJ2NvbnQnID8gY29uZmlnLmRlbHRhIDogZmFsc2UpO1xuICAgIHRoaXMuZGlnZXN0X3JhdGlvID0gdGhpcy5jb25maWcucmF0aW8gfHwgMC45O1xuICAgIHRoaXMuZGlnZXN0X3RocmVzaCA9IHRoaXMuY29uZmlnLnRocmVzaCB8fCAxMDAwO1xuICAgIHRoaXMubl91bmlxdWUgPSAwO1xufVxuRGlnZXN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVERpZ2VzdC5wcm90b3R5cGUpO1xuRGlnZXN0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IERpZ2VzdDtcblxuRGlnZXN0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oeF9vcl94bGlzdCkge1xuICAgIFREaWdlc3QucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCB4X29yX3hsaXN0KTtcbiAgICB0aGlzLmNoZWNrX2NvbnRpbnVvdXMoKTtcbn07XG5cbkRpZ2VzdC5wcm90b3R5cGUuX25ld19jZW50cm9pZCA9IGZ1bmN0aW9uKHgsIG4sIGN1bW4pIHtcbiAgICB0aGlzLm5fdW5pcXVlICs9IDE7XG4gICAgVERpZ2VzdC5wcm90b3R5cGUuX25ld19jZW50cm9pZC5jYWxsKHRoaXMsIHgsIG4sIGN1bW4pO1xufTtcblxuRGlnZXN0LnByb3RvdHlwZS5fYWRkd2VpZ2h0ID0gZnVuY3Rpb24obmVhcmVzdCwgeCwgbikge1xuICAgIGlmIChuZWFyZXN0Lm4gPT09IDEpIHtcbiAgICAgICAgdGhpcy5uX3VuaXF1ZSAtPSAxO1xuICAgIH1cbiAgICBURGlnZXN0LnByb3RvdHlwZS5fYWRkd2VpZ2h0LmNhbGwodGhpcywgbmVhcmVzdCwgeCwgbik7XG59O1xuXG5EaWdlc3QucHJvdG90eXBlLmNoZWNrX2NvbnRpbnVvdXMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyB3aGlsZSBpbiAnYXV0bycgbW9kZSwgaWYgdGhlcmUgYXJlIG1hbnkgdW5pcXVlIGVsZW1lbnRzLCBhc3N1bWVcbiAgICAvLyB0aGV5IGFyZSBmcm9tIGEgY29udGludW91cyBkaXN0cmlidXRpb24gYW5kIHN3aXRjaCB0byAnY29udCdcbiAgICAvLyBtb2RlICh0ZGlnZXN0IGJlaGF2aW9yKS4gUmV0dXJuIHRydWUgb24gdHJhbnNpdGlvbiBmcm9tXG4gICAgLy8gZGlzY3RldGUgdG8gY29udGludW91cy5cbiAgICBpZiAodGhpcy5tb2RlICE9PSAnYXV0bycgfHwgdGhpcy5zaXplKCkgPCB0aGlzLmRpZ2VzdF90aHJlc2gpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5uX3VuaXF1ZSAvIHRoaXMuc2l6ZSgpID4gdGhpcy5kaWdlc3RfcmF0aW8pIHtcbiAgICAgICAgdGhpcy5tb2RlID0gJ2NvbnQnO1xuICAgICAgICB0aGlzLmRpc2NyZXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVsdGEgPSB0aGlzLmNvbmZpZy5kZWx0YSB8fCAwLjAxO1xuICAgICAgICB0aGlzLmNvbXByZXNzKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnVERpZ2VzdCc6IFREaWdlc3QsXG4gICAgJ0RpZ2VzdCc6IERpZ2VzdFxufTtcbiIsInZhciB2MSA9IHJlcXVpcmUoJy4vdjEnKTtcbnZhciB2NCA9IHJlcXVpcmUoJy4vdjQnKTtcblxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuIiwiLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7XG4gIC8vIGpvaW4gdXNlZCB0byBmaXggbWVtb3J5IGlzc3VlIGNhdXNlZCBieSBjb25jYXRlbmF0aW9uOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMTc1I2M0XG4gIHJldHVybiAoW1xuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuICAgIGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG4gICAgYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcbiAgICBidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dXG4gIF0pLmpvaW4oJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ5dGVzVG9VdWlkO1xuIiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIEluIG5vZGUuanNcbi8vIHRoaXMgaXMgcHJldHR5IHN0cmFpZ2h0LWZvcndhcmQgLSB3ZSB1c2UgdGhlIGNyeXB0byBBUEkuXG5cbnZhciBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub2RlUk5HKCkge1xuICByZXR1cm4gY3J5cHRvLnJhbmRvbUJ5dGVzKDE2KTtcbn07XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbnZhciBfbm9kZUlkO1xudmFyIF9jbG9ja3NlcTtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDA7XG52YXIgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG4gIGlmIChub2RlID09IG51bGwgfHwgY2xvY2tzZXEgPT0gbnVsbCkge1xuICAgIHZhciBzZWVkQnl0ZXMgPSBybmcoKTtcbiAgICBpZiAobm9kZSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbiAgICAgIG5vZGUgPSBfbm9kZUlkID0gW1xuICAgICAgICBzZWVkQnl0ZXNbMF0gfCAweDAxLFxuICAgICAgICBzZWVkQnl0ZXNbMV0sIHNlZWRCeXRlc1syXSwgc2VlZEJ5dGVzWzNdLCBzZWVkQnl0ZXNbNF0sIHNlZWRCeXRlc1s1XVxuICAgICAgXTtcbiAgICB9XG4gICAgaWYgKGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG4gICAgICBjbG9ja3NlcSA9IF9jbG9ja3NlcSA9IChzZWVkQnl0ZXNbNl0gPDwgOCB8IHNlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG4gICAgfVxuICB9XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogYnl0ZXNUb1V1aWQoYik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjE7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0O1xuIiwiaW1wb3J0IFJlcXVlc3QgZnJvbSBcIi4vcmVxdWVzdFwiO1xuaW1wb3J0IFNlcnZlciBmcm9tIFwiLi9zZXJ2ZXJcIjtcbmltcG9ydCBMb2dnZXIsIHsgX0xvZ2dlciB9IGZyb20gXCIuL2xvZ2dlclwiO1xuaW1wb3J0IHsgVCwgTyB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgUHJvbWV0aGV1cyBmcm9tIFwiLi9wcm9tXCI7XG5pbXBvcnQgUGFyc2VyIGZyb20gXCIuL3BhcnNlclwiO1xuXG5jb25zdCBwanNvbiA9IHJlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIik7XG5cbi8vIExvZ2dlci5lbmFibGVBbGwoKTtcblxuY29uc3QgbG9nZ2VyID0gTG9nZ2VyLm5hbWVzcGFjZShcInNlcnZlclwiKTtcbmxvZ2dlci5kZWJ1ZyhcIlN0YXJ0aW5nIGFwcGxpY2F0aW9uLi4uXCIpO1xubG9nZ2VyLmRlYnVnKEpTT04uc3RyaW5naWZ5KHBqc29uKSk7XG5cbmludGVyZmFjZSBSZXF1ZXN0RGF0YSB7XG4gIGhvc3Q6IHN0cmluZztcbiAgcGF0aDogc3RyaW5nO1xuICBhdXRoOiB7XG4gICAgdXNlcm5hbWU6IHN0cmluZztcbiAgICBwYXNzd29yZDogc3RyaW5nO1xuICB9O1xufVxuXG5jb25zdCBwcm9kdWN0aW9uOiBSZXF1ZXN0RGF0YSA9IHtcbiAgaG9zdDogTy5wdGlvbihwcm9jZXNzLmVudi5QQVlNRU5UUExVU19IT1NUKS5nZXRPckVsc2UoXCJwYXltZW50cGx1cy5oZXJvYXBwLmRldlwiKSxcbiAgcGF0aDogTy5wdGlvbihwcm9jZXNzLmVudi5QQVlNRU5UUExVU19QQVRIKS5nZXRPckVsc2UoXCIvYXBpL29ubGluZS11c2Vycy8/Zm9ybWF0PWpzb25cIiksXG4gIGF1dGg6IHtcbiAgICB1c2VybmFtZTogTy5wdGlvbihwcm9jZXNzLmVudi5QQVlNRU5UUExVU19BVVRIX1VTRVJOQU1FKS5nZXRPckVsc2UoXCJhZG1pblwiKSxcbiAgICBwYXNzd29yZDogTy5wdGlvbihwcm9jZXNzLmVudi5QQVlNRU5UUExVU19BVVRIX1BBU1NXT1JEKS5nZXRPckVsc2UoXCJhZG1pblwiKVxuICB9XG59O1xuXG5jb25zdCBzdGFnaW5nOiBSZXF1ZXN0RGF0YSA9IHtcbiAgaG9zdDogTy5wdGlvbihwcm9jZXNzLmVudi5QQVlNRU5UUExVU19TVEFHSU5HX0hPU1QpLmdldE9yRWxzZShcInBheW1lbnRwbHVzLmhlcm9hcHAuZGV2XCIpLFxuICBwYXRoOiBPLnB0aW9uKHByb2Nlc3MuZW52LlBBWU1FTlRQTFVTX1NUQUdJTkdfUEFUSCkuZ2V0T3JFbHNlKFwiL2FwaS9vbmxpbmUtdXNlcnMvP2Zvcm1hdD1qc29uXCIpLFxuICBhdXRoOiB7XG4gICAgdXNlcm5hbWU6IE8ucHRpb24ocHJvY2Vzcy5lbnYuUEFZTUVOVFBMVVNfU1RBR0lOR19BVVRIX1VTRVJOQU1FKS5nZXRPckVsc2UoXCJhZG1pblwiKSxcbiAgICBwYXNzd29yZDogTy5wdGlvbihwcm9jZXNzLmVudi5QQVlNRU5UUExVU19TVEFHSU5HX0FVVEhfUEFTU1dPUkQpLmdldE9yRWxzZShcImFkbWluXCIpXG4gIH1cbn07XG5cbmNvbnN0IGhvc3QgPSBPLnB0aW9uKHByb2Nlc3MuZW52LkhPU1QpLmdldE9yRWxzZShcIjAuMC4wLjBcIik7XG5jb25zdCBwb3J0ID0gVC5yeSgoKSA9PiBwYXJzZUludChPLnB0aW9uKHByb2Nlc3MuZW52LlBPUlQpLmdldE9yRWxzZShcIlwiKSkpLmdldE9yRWxzZSgxMjM0KTtcblxuY29uc3QgcHJvbSA9IG5ldyBQcm9tZXRoZXVzKHtcbiAgcGF5bWVudHBsdXNfb25saW5lX3VzZXI6IFByb21ldGhldXMuR2F1Z2Uoe1xuICAgIG5hbWU6IFwicGF5bWVudHBsdXNfb25saW5lX3VzZXJfY291bnRcIixcbiAgICBoZWxwOiBcImN1cnJlbnRseSBvbmxpbmUgdXNlciBpbiBwYXltZW50cGx1c1wiLFxuICAgIGxhYmVsTmFtZXM6IFtcImVudlwiXVxuICB9KSxcbiAgcGF5bWVudHBsdXNfZXJyb3I6IFByb21ldGhldXMuR2F1Z2Uoe1xuICAgIG5hbWU6IFwicGF5bWVudHBsdXNfc3lzdGVtX2ZhaWx1cmVcIixcbiAgICBoZWxwOiBcInBheW1lbnRwbHVzIHN5c3RlbSBmYWlsdXJlXCIsXG4gICAgbGFiZWxOYW1lczogW1wiZW52XCJdXG4gIH0pXG59KTtcblxuY29uc3QgdGltZW91dCA9IHByb20uYXBwbHlEZWZhdWx0KCk7XG5wcm9tLmxhYmVsKHsgYXBwdmVyc2lvbjogcGpzb24udmVyc2lvbiwgYXBwbmFtZTogcGpzb24ubmFtZSB9KTtcbnByb20ucmVnaXN0ZXIoKTtcblxuY29uc3Qgc2VydmVyID0gbmV3IFNlcnZlcigocmVxLCByZXMpID0+IHtcbiAgaWYgKHJlcS51cmwgIT09IFwiL21ldHJpY3NcIiAmJiByZXEudXJsICE9PSBcIi9cIikge1xuICAgIGxvZ2dlci53YXJuKGBTZWVtIHNvbWVvbmUgY2FsbGVkICR7cmVxLnVybH0gcGF0aGApO1xuICAgIHJlcy53cml0ZUhlYWQoNDAwLCB7IFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC9wbGFpblwiIH0pO1xuICAgIHJlcy5lbmQoYE5vdCBmb3VuZGApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh7XG4gICAgaG9zdG5hbWU6IGAke3Byb2R1Y3Rpb24uaG9zdH1gLFxuICAgIHBhdGg6IGAke3Byb2R1Y3Rpb24ucGF0aH1gLFxuICAgIGF1dGg6IGAke3Byb2R1Y3Rpb24uYXV0aC51c2VybmFtZX06JHtwcm9kdWN0aW9uLmF1dGgucGFzc3dvcmR9YCxcbiAgICBwb3J0OiA0NDMsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHRpbWVvdXQ6IDUwMDAgLy8gbXNcbiAgfSk7XG5cbiAgY29uc3QgcmVxdWVzdFN0YWdpbmcgPSBuZXcgUmVxdWVzdCh7XG4gICAgaG9zdG5hbWU6IGAke3N0YWdpbmcuaG9zdH1gLFxuICAgIHBhdGg6IGAke3N0YWdpbmcucGF0aH1gLFxuICAgIGF1dGg6IGAke3N0YWdpbmcuYXV0aC51c2VybmFtZX06JHtzdGFnaW5nLmF1dGgucGFzc3dvcmR9YCxcbiAgICBwb3J0OiA0NDMsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIHRpbWVvdXQ6IDUwMDAgLy8gbXNcbiAgfSk7XG5cbiAgY29uc3QgcHJvZFByb21pc2UgPSByZXF1ZXN0Lm1ha2UoKTtcbiAgY29uc3Qgc3RhZ1Byb21pc2UgPSByZXF1ZXN0U3RhZ2luZy5tYWtlKCk7XG5cbiAgcmV0dXJuIFByb21pc2UuYWxsKFtwcm9kUHJvbWlzZSwgc3RhZ1Byb21pc2VdKVxuICAgIC50aGVuKHZhbHVlcyA9PiB7XG4gICAgICBjb25zdCBwcm9kID0gdmFsdWVzWzBdO1xuICAgICAgY29uc3Qgc3RhZyA9IHZhbHVlc1sxXTtcblxuICAgICAgVC5yeSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcnNlciA9IG5ldyBQYXJzZXIobG9nZ2VyKTtcblxuICAgICAgICBjb25zdCBwcm9kdWN0aW9uID0gcGFyc2VyLnBhcnNlKHByb2QsIFwicGF5bWVudHBsdXMgcHJvZHVjdGlvblwiKTtcbiAgICAgICAgY29uc3Qgc3RhZ2luZyA9IHBhcnNlci5wYXJzZShzdGFnLCBcInBheW1lbnRwbHVzIHN0YWdpbmdcIik7XG5cbiAgICAgICAgcHJvbS5nZXQoXCJwYXltZW50cGx1c19vbmxpbmVfdXNlclwiKS5zZXQoeyBlbnY6IFwicHJvZHVjdGlvblwiIH0sIHByb2R1Y3Rpb24udXNlci5jb3VudCwgbmV3IERhdGUoKSk7XG4gICAgICAgIHByb20uZ2V0KFwicGF5bWVudHBsdXNfZXJyb3JcIikuc2V0KHsgZW52OiBcInByb2R1Y3Rpb25cIiB9LCBwcm9kdWN0aW9uLnN0YXR1cyA/IDAgOiAxLCBuZXcgRGF0ZSgpKTtcblxuICAgICAgICBwcm9tLmdldChcInBheW1lbnRwbHVzX29ubGluZV91c2VyXCIpLnNldCh7IGVudjogXCJzdGFnaW5nXCIgfSwgc3RhZ2luZy51c2VyLmNvdW50LCBuZXcgRGF0ZSgpKTtcbiAgICAgICAgcHJvbS5nZXQoXCJwYXltZW50cGx1c19lcnJvclwiKS5zZXQoeyBlbnY6IFwic3RhZ2luZ1wiIH0sIHN0YWdpbmcuc3RhdHVzID8gMCA6IDEsIG5ldyBEYXRlKCkpO1xuXG4gICAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7IFwiQ29udGVudC1UeXBlXCI6IHByb20uY29udGVudFR5cGUgfSk7XG4gICAgICAgIHJlcy5lbmQocHJvbS5leHBvcnQoKSk7XG4gICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7IFwiQ29udGVudC1UeXBlXCI6IHByb20uY29udGVudFR5cGUgfSk7XG4gICAgICAgIHJlcy5lbmQocHJvbS5leHBvcnQoKSk7XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5jYXRjaChlID0+IHtcbiAgICAgIGxvZ2dlci5lcnJvcihlKTtcbiAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7IFwiQ29udGVudC1UeXBlXCI6IHByb20uY29udGVudFR5cGUgfSk7XG4gICAgICByZXMuZW5kKHByb20uZXhwb3J0KCkpO1xuICAgIH0pO1xufSk7XG5cbnNlcnZlci5zdGFydChob3N0LCBwb3J0KS50aGVuKCh7IGhvc3QsIHBvcnQgfSkgPT4ge1xuICBsb2dnZXIuaW5mbyhgU3RhcnQgYXBwbGljYXRpb24gYXQgaHR0cDovLyR7aG9zdH06JHtwb3J0fWApO1xufSk7XG5cbnByb2Nlc3Mub24oXCJTSUdJTlRcIiwgZnVuY3Rpb24oKSB7XG4gIGxvZ2dlci5kZWJ1ZyhcIlN0b3BpbmcgYXBwbGljYXRpb24uLi5cIik7XG5cbiAgY2xlYXJJbnRlcnZhbCh0aW1lb3V0KTtcbiAgc2VydmVyXG4gICAgLnN0b3AoKVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGxvZ2dlci5pbmZvKFwiU3RvcCBhcHBsaWNhdGlvblwiKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICB9KVxuICAgIC5jYXRjaChlID0+IHtcbiAgICAgIGxvZ2dlci5lcnJvcihlKTtcbiAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9KTtcbn0pO1xuIiwiaW1wb3J0IGRlYnVnIGZyb20gXCJkZWJ1Z1wiO1xuXG5leHBvcnQgY2xhc3MgX0xvZ2dlciB7XG4gIHB1YmxpYyBzdGF0aWMgZ2V0IFJPT1RfTkFNRVNQQUNFKCkge1xuICAgIHJldHVybiBcIm9udXNlclwiO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXQgTkFNRVNQQUNFX1NFUEVSQVRPUigpIHtcbiAgICByZXR1cm4gXCI6XCI7XG4gIH1cblxuICBwcml2YXRlIF9uYW1lc3BhY2U6IHN0cmluZztcbiAgcHJpdmF0ZSBfZnVsbE5hbWVzcGFjZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2RlYnVnPzogZGVidWcuRGVidWdnZXI7XG4gIHByaXZhdGUgX2luZm8/OiBkZWJ1Zy5EZWJ1Z2dlcjtcbiAgcHJpdmF0ZSBfd2Fybj86IGRlYnVnLkRlYnVnZ2VyO1xuICBwcml2YXRlIF9lcnJvcj86IGRlYnVnLkRlYnVnZ2VyO1xuXG4gIGNvbnN0cnVjdG9yKC4uLm5hbWVzcGFjZXM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5fbmFtZXNwYWNlID0gbmFtZXNwYWNlcy5qb2luKF9Mb2dnZXIuTkFNRVNQQUNFX1NFUEVSQVRPUik7XG4gICAgdGhpcy5fZnVsbE5hbWVzcGFjZSA9IFtfTG9nZ2VyLlJPT1RfTkFNRVNQQUNFXS5jb25jYXQodGhpcy5fbmFtZXNwYWNlKS5qb2luKF9Mb2dnZXIuTkFNRVNQQUNFX1NFUEVSQVRPUik7XG4gIH1cblxuICBnZXQgbmFtZXNwYWNlKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lc3BhY2U7XG4gIH1cblxuICBnZXQgZnVsbE5hbWVzcGFjZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZnVsbE5hbWVzcGFjZTtcbiAgfVxuXG4gIGRlYnVnKGZvcm1hdDogYW55LCAuLi5tc2c6IGFueVtdKSB7XG4gICAgaWYgKCF0aGlzLl9kZWJ1Zykge1xuICAgICAgdGhpcy5fZGVidWcgPSBkZWJ1Zyh0aGlzLmZ1bGxOYW1lc3BhY2UuY29uY2F0KF9Mb2dnZXIuTkFNRVNQQUNFX1NFUEVSQVRPUiwgXCJkZWJ1Z1wiKSk7XG4gICAgICB0aGlzLl9kZWJ1Zy5sb2cgPSBjb25zb2xlLmRlYnVnLmJpbmQoY29uc29sZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fZGVidWcoZm9ybWF0LCAuLi5tc2cpO1xuICB9XG5cbiAgaW5mbyhmb3JtYXQ6IGFueSwgLi4ubXNnOiBhbnlbXSkge1xuICAgIGlmICghdGhpcy5faW5mbykge1xuICAgICAgdGhpcy5faW5mbyA9IGRlYnVnKHRoaXMuZnVsbE5hbWVzcGFjZS5jb25jYXQoX0xvZ2dlci5OQU1FU1BBQ0VfU0VQRVJBVE9SLCBcImluZm9cIikpO1xuICAgICAgdGhpcy5faW5mby5sb2cgPSBjb25zb2xlLmluZm8uYmluZChjb25zb2xlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9pbmZvKGZvcm1hdCwgLi4ubXNnKTtcbiAgfVxuXG4gIHdhcm4oZm9ybWF0OiBhbnksIC4uLm1zZzogYW55W10pIHtcbiAgICBpZiAoIXRoaXMuX3dhcm4pIHtcbiAgICAgIHRoaXMuX3dhcm4gPSBkZWJ1Zyh0aGlzLmZ1bGxOYW1lc3BhY2UuY29uY2F0KF9Mb2dnZXIuTkFNRVNQQUNFX1NFUEVSQVRPUiwgXCJ3YXJuXCIpKTtcbiAgICAgIHRoaXMuX3dhcm4ubG9nID0gY29uc29sZS53YXJuLmJpbmQoY29uc29sZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fd2Fybihmb3JtYXQsIC4uLm1zZyk7XG4gIH1cblxuICBlcnJvcihmb3JtYXQ6IGFueSwgLi4ubXNnOiBhbnlbXSkge1xuICAgIGlmICghdGhpcy5fZXJyb3IpIHtcbiAgICAgIHRoaXMuX2Vycm9yID0gZGVidWcodGhpcy5mdWxsTmFtZXNwYWNlLmNvbmNhdChfTG9nZ2VyLk5BTUVTUEFDRV9TRVBFUkFUT1IsIFwiZXJyb3JcIikpO1xuICAgICAgdGhpcy5fZXJyb3IubG9nID0gY29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUpO1xuICAgIH1cblxuICAgIHRoaXMuX2Vycm9yKGZvcm1hdCwgLi4ubXNnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dnZXIge1xuICBwdWJsaWMgc3RhdGljIG5hbWVzcGFjZSguLi5uYW1lOiBzdHJpbmdbXSkge1xuICAgIHJldHVybiBuZXcgX0xvZ2dlciguLi5uYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXBwZW5kKGxvZ2dlcjogX0xvZ2dlciwgLi4ubmFtZTogc3RyaW5nW10pIHtcbiAgICByZXR1cm4gTG9nZ2VyLm5hbWVzcGFjZShsb2dnZXIubmFtZXNwYWNlLCAuLi5uYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZW5hYmxlQWxsKCkge1xuICAgIGRlYnVnLmVuYWJsZShgJHtfTG9nZ2VyLlJPT1RfTkFNRVNQQUNFfSR7X0xvZ2dlci5OQU1FU1BBQ0VfU0VQRVJBVE9SfSpgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVCB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBfTG9nZ2VyIH0gZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF5bWVudFBsdXNQYXJzZXJSZXNwb25zZSB7XG4gIHN0YXR1czogYm9vbGVhbjtcbiAgdXNlcjoge1xuICAgIGNvdW50OiBudW1iZXI7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheW1lbnRQbHVzUGFyc2VyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBsb2dnZXI6IF9Mb2dnZXIpIHt9XG5cbiAgcGFyc2UoZGF0YTogYW55LCBuYW1lOiBzdHJpbmcpOiBQYXltZW50UGx1c1BhcnNlclJlc3BvbnNlIHtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgJHtuYW1lfSByYXcgcmVzcG9uc2UgaXMgJHtkYXRhfWApO1xuXG4gICAgY29uc3QgdHJ5Y2F0Y2ggPSBULnJ5KCgpID0+IEpTT04ucGFyc2UoZGF0YSkpO1xuICAgIGNvbnN0IHJlc3BvbnNlOiB7IGNvdW50OiBudW1iZXI7IGRldGFpbD86IHN0cmluZyB9ID0gdHJ5Y2F0Y2guZ2V0T3JFbHNlKHsgY291bnQ6IDAgfSk7XG4gICAgY29uc3QgZXJyb3IgPSB0cnljYXRjaC5mYWlsZWQoKTtcblxuICAgIGlmIChlcnJvcikgdGhpcy5sb2dnZXIuZXJyb3IoYGNhbm5vdCBwYXJzZSBkYXRhIGZyb20gJHtuYW1lfWApO1xuICAgIGVsc2UgdGhpcy5sb2dnZXIuZGVidWcoYCR7bmFtZX0gY3VycmVudCBkYXRhIGlzICVvYCwgcmVzcG9uc2UpO1xuXG4gICAgaWYgKHJlc3BvbnNlLmRldGFpbCkge1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoYCR7bmFtZX0gcmVzcG9uc2UgY29udGFpbnMgZXJyb3I6ICR7cmVzcG9uc2UuZGV0YWlsfWApO1xuICAgICAgcmVzcG9uc2UuY291bnQgPSAwO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXM6ICFlcnJvcixcbiAgICAgIHVzZXI6IHtcbiAgICAgICAgY291bnQ6IHJlc3BvbnNlLmNvdW50XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IGNsaWVudCwgeyBNZXRyaWMgfSBmcm9tIFwicHJvbS1jbGllbnRcIjtcbmltcG9ydCBMb2dnZXIgZnJvbSBcIi4vbG9nZ2VyXCI7XG5cbmNvbnN0IGxvZ2dlciA9IExvZ2dlci5uYW1lc3BhY2UoXCJwcm9tZXRoZXVzXCIpO1xuXG5pbnRlcmZhY2UgUHJvbWV0aGV1c09iamVjdCB7XG4gIFtrZXk6IHN0cmluZ106IE1ldHJpYztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvbWV0aGV1czxUIGV4dGVuZHMgUHJvbWV0aGV1c09iamVjdD4ge1xuICBwdWJsaWMgc3RhdGljIENvdW50ZXIob3B0aW9uczogY2xpZW50LkNvdW50ZXJDb25maWd1cmF0aW9uKSB7XG4gICAgbG9nZ2VyLmRlYnVnKGBjcmVhdGUgbmV3IENvdW50ZXIgb2YgJHtvcHRpb25zLm5hbWV9YCk7XG4gICAgcmV0dXJuIG5ldyBjbGllbnQuQ291bnRlcihvcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgR2F1Z2Uob3B0aW9uczogY2xpZW50LkdhdWdlQ29uZmlndXJhdGlvbikge1xuICAgIGxvZ2dlci5kZWJ1ZyhgY3JlYXRlIG5ldyBHYXVnZSBvZiAke29wdGlvbnMubmFtZX1gKTtcbiAgICByZXR1cm4gbmV3IGNsaWVudC5HYXVnZShvcHRpb25zKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZ2lzdGVyOiBjbGllbnQuUmVnaXN0cnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc3RhdGlzdGljOiBUKSB7XG4gICAgdGhpcy5fcmVnaXN0ZXIgPSBuZXcgY2xpZW50LlJlZ2lzdHJ5KCk7XG4gIH1cblxuICBwdWJsaWMgbGFiZWwobGFiZWxzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSB7XG4gICAgdGhpcy5fcmVnaXN0ZXIuc2V0RGVmYXVsdExhYmVscyhsYWJlbHMpO1xuICB9XG5cbiAgcHVibGljIGdldDxLIGV4dGVuZHMga2V5b2YgVD4obmFtZTogSyk6IFRbS10ge1xuICAgIHJldHVybiB0aGlzLl9zdGF0aXN0aWNbbmFtZV07XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXIoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5fc3RhdGlzdGljKS5tYXAoayA9PiB7XG4gICAgICBsb2dnZXIuZGVidWcoYHJlZ2lzdGVyICR7a30gdG8gcHJvbSByZWdpc3RlciBpbnN0YW5jZWApO1xuICAgICAgdGhpcy5fcmVnaXN0ZXIucmVnaXN0ZXJNZXRyaWModGhpcy5nZXQoaykpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFwcGx5RGVmYXVsdCgpIHtcbiAgICByZXR1cm4gY2xpZW50LmNvbGxlY3REZWZhdWx0TWV0cmljcyh7IHJlZ2lzdGVyOiB0aGlzLl9yZWdpc3RlciB9KTtcbiAgfVxuXG4gIHB1YmxpYyBtZXJnZShyZWdpc3RlcjogY2xpZW50LlJlZ2lzdHJ5KSB7XG4gICAgdGhpcy5fcmVnaXN0ZXIgPSBjbGllbnQuUmVnaXN0cnkubWVyZ2UoW3RoaXMuX3JlZ2lzdGVyLCByZWdpc3Rlcl0pO1xuICB9XG5cbiAgcHVibGljIGdldCBjb250ZW50VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9yZWdpc3Rlci5jb250ZW50VHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBleHBvcnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0ZXIubWV0cmljcygpO1xuICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gXCIuL2xvZ2dlclwiO1xuaW1wb3J0IGh0dHBzIGZyb20gXCJodHRwc1wiO1xuaW1wb3J0IHsgU2VyaWFsaXphdGlvbiB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcXVlc3QgZXh0ZW5kcyBTZXJpYWxpemF0aW9uIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvcHRpb25zOiBodHRwcy5SZXF1ZXN0T3B0aW9ucykge1xuICAgIHN1cGVyKFwiUmVxdWVzdFwiLCBMb2dnZXIubmFtZXNwYWNlKFwicmVxdWVzdFwiKSk7XG5cbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcIiAgd2l0aCAlb1wiLCBvcHRpb25zKTtcbiAgfVxuXG4gIG1ha2UoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcmVxID0gaHR0cHMucmVxdWVzdCh0aGlzLm9wdGlvbnMsIHJlcyA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBpbmZvcm1hdGlvbjogY29kZT0ke3Jlcy5zdGF0dXNDb2RlfSBtc2c9JHtyZXMuc3RhdHVzTWVzc2FnZX1gKTtcblxuICAgICAgICBjb25zdCB7IHN0YXR1c0NvZGUgfSA9IHJlcztcbiAgICAgICAgLy8gY29uc3QgY29udGVudFR5cGUgPSByZXMuaGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXTtcblxuICAgICAgICBsZXQgZXJyb3I7XG4gICAgICAgIGlmIChzdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICAgICAgICBlcnJvciA9IG5ldyBFcnJvcihcIlJlcXVlc3QgRmFpbGVkLlxcblwiICsgYFN0YXR1cyBDb2RlOiAke3N0YXR1c0NvZGV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAvLyBDb25zdW1lIHJlc3BvbnNlIGRhdGEgdG8gZnJlZSB1cCBtZW1vcnlcbiAgICAgICAgICByZXMucmVzdW1lKCk7XG5cbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcy5zZXRFbmNvZGluZyhcInV0ZjhcIik7XG4gICAgICAgIGxldCBkYXRhID0gXCJcIjtcblxuICAgICAgICByZXMub24oXCJlcnJvclwiLCBlcnIgPT4ge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKGByZWNlaXZlZCBlcnJvciByZXNwb25zZSwgbG9nZ2luZyB0byBjb25zb2xlYCk7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXCJFcnJvcjogJU9cIiwgZXJyKTtcblxuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQSBjaHVuayBvZiBkYXRhIGhhcyBiZWVuIHJlY2lldmVkLlxuICAgICAgICByZXMub24oXCJkYXRhXCIsIGNodW5rID0+IHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgcmVjZWl2ZWQgbmV3IGRhdGEgY2h1bmssIGFkZCB0byBkYXRhIG9iamVjdGApO1xuICAgICAgICAgIGRhdGEgKz0gY2h1bms7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRoZSB3aG9sZSByZXNwb25zZSBoYXMgYmVlbiByZWNlaXZlZC4gUHJpbnQgb3V0IHRoZSByZXN1bHQuXG4gICAgICAgIHJlcy5vbihcImVuZFwiLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYHJlY2VpdmVkIGFsbCByZXNwb25zZSwgcnVubmluZyBQcm9taXNlIHJlc29sdmVgKTtcblxuICAgICAgICAgIHJldHVybiByZXNvbHZlKGRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXMub24oXCJjbG9zZVwiLCAoKSA9PiB0aGlzLmxvZ2dlci5kZWJ1ZyhcImNvbm5lY3Rpb24gY2xvc2VkXCIpKTtcbiAgICAgICAgcmVzLm9uKFwicmVhZGFibGVcIiwgKCkgPT4gdGhpcy5sb2dnZXIuZGVidWcoXCJyZWNlaXZlIHJlYWRhYmxlIGV2ZW50c1wiKSk7XG4gICAgICB9KTtcblxuICAgICAgcmVxLm9uKFwiZXJyb3JcIiwgZSA9PiB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGUpO1xuICAgICAgfSk7XG5cbiAgICAgIHJlcS5lbmQoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyIHtcbiAgcHJpdmF0ZSBpbnN0YW5jZTogaHR0cC5TZXJ2ZXI7XG5cbiAgY29uc3RydWN0b3IobGlzdGVuZXI6IGh0dHAuUmVxdWVzdExpc3RlbmVyKSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IGh0dHAuY3JlYXRlU2VydmVyKGxpc3RlbmVyKTtcbiAgfVxuXG4gIHN0YXJ0KGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyKTogUHJvbWlzZTx7IGhvc3Q6IHN0cmluZzsgcG9ydDogbnVtYmVyIH0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzID0+IHtcbiAgICAgIHRoaXMuaW5zdGFuY2UubGlzdGVuKHBvcnQsIGhvc3QsICgpID0+IHtcbiAgICAgICAgcmVzKHsgaG9zdCwgcG9ydCB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RvcCgpOiBQcm9taXNlPEVycm9yIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEVycm9yIHwgdW5kZWZpbmVkPigocmVzLCByZWopID0+IHtcbiAgICAgIHRoaXMuaW5zdGFuY2UuY2xvc2UoZSA9PiAoZSA/IHJlaihlKSA6IHJlcygpKSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBMb2dnZXIsIHsgX0xvZ2dlciB9IGZyb20gXCIuL2xvZ2dlclwiO1xuaW1wb3J0IHV1aWQgZnJvbSBcInV1aWRcIjtcblxuY29uc3QgX2xvZ2dlciA9IExvZ2dlci5uYW1lc3BhY2UoXCJ1dGlsc1wiKTtcblxuZXhwb3J0IGNsYXNzIFNlcmlhbGl6YXRpb24ge1xuICBwcml2YXRlIF9fdXVpZDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX19uYW1lOiBzdHJpbmcgPSBcIlNlcmlhbGl6YXRpb25cIiwgcHJvdGVjdGVkIGxvZ2dlcjogX0xvZ2dlciA9IF9sb2dnZXIpIHtcbiAgICB0aGlzLl9fdXVpZCA9IHV1aWQudjQoKS5zbGljZSgwLCA4KTtcblxuICAgIHRoaXMubG9nZ2VyID0gTG9nZ2VyLmFwcGVuZChsb2dnZXIsIHRoaXMuX191dWlkKTtcblxuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBjcmVhdGUgJHtfX25hbWV9IGluc3RhbmNlLi4uYCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19uYW1lO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldCB1dWlkKCkge1xuICAgIHJldHVybiB0aGlzLl9fdXVpZDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTzxUPiBleHRlbmRzIFNlcmlhbGl6YXRpb24ge1xuICBwdWJsaWMgc3RhdGljIHB0aW9uPFQ+KHQ6IFQgfCB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbmV3IE88VD4odCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHQ6IFQgfCB1bmRlZmluZWQpIHtcbiAgICBzdXBlcihcIk9wdGlvblwiKTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgICBjcmVhdGUgb3B0aW9uIHdpdGggJHt0fWApO1xuICB9XG5cbiAgZ2V0T3JFbHNlKHQ6IFQpOiBUIHtcbiAgICBpZiAodGhpcy50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBpcyAndW5kZWZpbmVkJyBzbyBmYWxsaW5nIGJhY2sgdG8gZGVmYXVsdCAoJHt0fSlgKTtcbiAgICAgIHJldHVybiB0O1xuICAgIH0gZWxzZSBpZiAodGhpcy50ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgJHt0aGlzLm5hbWV9IGlzICdudWxsJyBzbyBmYWxsaW5nIGJhY2sgdG8gZGVmYXVsdCAoJHt0fSlgKTtcbiAgICAgIHJldHVybiB0O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMudCA9PT0gXCJudW1iZXJcIiAmJiBpc05hTih0aGlzLnQgYXMgYW55KSkge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYCR7dGhpcy5uYW1lfSBpcyAnTmFOJyBzbyBmYWxsaW5nIGJhY2sgdG8gZGVmYXVsdCAoJHt0fSlgKTtcbiAgICAgIHJldHVybiB0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgJHt0aGlzLm5hbWV9IGlzIGV4aXN0YCk7XG4gICAgICByZXR1cm4gdGhpcy50O1xuICAgIH1cbiAgfVxufVxuXG50eXBlIEZuPFI+ID0gKCkgPT4gUjtcblxuZXhwb3J0IGNsYXNzIFQ8Uj4gZXh0ZW5kcyBTZXJpYWxpemF0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByeTxSPihmbjogRm48UiB8IHVuZGVmaW5lZD4pIHtcbiAgICByZXR1cm4gbmV3IFQ8Uj4oZm4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmV0dXJuRGF0YT86IFI7XG4gIHByaXZhdGUgX2ZhaWxlZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZuOiBGbjxSIHwgdW5kZWZpbmVkPikge1xuICAgIHN1cGVyKFwiVHJ5XCIpO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGAgIGNyZWF0ZSB0cnkgY2F0Y2ggb2JqZWN0YCk7XG5cbiAgICB0aGlzLl9mYWlsZWQgPSBmYWxzZTsgLy8gZGVmYXVsdCB2YWx1ZVxuICB9XG5cbiAgcHJpdmF0ZSBfX3Byb2Nlc3Mocj86IFIpIHtcbiAgICBpZiAodGhpcy5fcmV0dXJuRGF0YSkgcmV0dXJuO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZm4oKTtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBpcyBzdWNjZXNzZnVsIHJ1bmApO1xuICAgICAgdGhpcy5fcmV0dXJuRGF0YSA9IHJlc3VsdDtcbiAgICAgIHRoaXMuX2ZhaWxlZCA9IGZhbHNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuX2ZhaWxlZCA9IHRydWU7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKGBjYXRjaGluZyBzb21lIGVycm9yXFxuICVPYCwgZSk7XG4gICAgICB0aGlzLl9yZXR1cm5EYXRhID0gcjtcbiAgICB9XG4gIH1cblxuICBmYWlsZWQoKTogYm9vbGVhbiB7XG4gICAgdGhpcy5fX3Byb2Nlc3MoKTtcbiAgICByZXR1cm4gdGhpcy5fZmFpbGVkO1xuICB9XG5cbiAgZ2V0T3JFbHNlKHI6IFIpOiBSIHtcbiAgICB0aGlzLl9fcHJvY2VzcyhyKTtcbiAgICByZXR1cm4gTy5wdGlvbih0aGlzLl9yZXR1cm5EYXRhKS5nZXRPckVsc2Uocik7XG4gIH1cblxuICBjYXRjaChmbjogRm48Uj4pIHtcbiAgICB0aGlzLl9fcHJvY2VzcygpO1xuICAgIGlmICh0aGlzLl9mYWlsZWQpIHJldHVybiBmbigpO1xuICAgIGVsc2UgcmV0dXJuIHRoaXMuX3JldHVybkRhdGEgYXMgUjtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2x1c3RlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcm9jZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR0eVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ2OFwiKTsiXSwic291cmNlUm9vdCI6IiJ9