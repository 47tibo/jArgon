/**
 * <h3>JS DOM library</h3>
 * <q>Utilities methods & DOM elements decorator</q>
 * @example
 * jArgon.trim('  a string to trim   ');
 * var jargonObj = jArgon('div > div.foo .bar #jargon');
 * jargonObj.getElementsByAttribute('.fuzz[bar]');
 * @namespace _jArgon
 */
;(function( window, document, undefined ) {
  'use strict';

  var
    // Main variables
    jArgon, decorator,

    // Shortcuts
    _j,
    arrayProto = Array.prototype,
    stringProto = String.prototype,
    // Array#concat way behind Array.proto.push.apply in FF, see:
    // http://jsperf.com/array-prototype-push-apply-vs-concat
    _concat = arrayProto.push;

  // Jargon Initializer
  _j = jArgon  = function( elems ) {
    this.length = 0;
    _concat.apply( this, elems );
  };

  // Utilities, private
  _.extend( _j,
    {
      /**
       * Call native API method if exists, use fallback instead
       * @function trim
       * @memberof _jArgon
       * @param {String} str - The string to trim
       * @returns {String} The new trimmed string
       */
      trim: (function() {
        return stringProto.trim ?
              function( str ) {
                return stringProto.trim.call( str );
              } :
              // Source: http://blog.stevenlevithan.com/
              function( str ) {
                return str.replace(/^\s\s*/, '')
                          .replace(/\s\s*$/, '');
              };
      })(),

      /**
       * Convert pseudo arrays (eg `arguments`, `nodeList`) to arrays
       * @function toArray
       * @memberof _jArgon
       * @param {PseudoArray} pseudoArray - The pseudoArray to convert
       * @returns {Array} The new array
       */
      toArray: function( pseudoArray ) {
        var array = [];
        _concat.apply( array, pseudoArray );
        return array;
      },

      /**
       * Check if an element has a given name
       * Valid name : 'div'
       * @private
       * @name hasName
       * @param {Element} elem - The element to validate
       * @param {String} name - The element name
       * @returns {Boolean} True if match, false otherwise
       */
      hasName: function( elem, name ) {
        return elem.nodeName.toLowerCase() === name;
      },

      /**
       * Check if an element has a given class name
       * Valid class name : 'foo'
       * @private
       * @name hasClassName
       * @param {Element} elem - The element to validate
       * @param {String} className - The class name
       * @returns {Boolean} True if match, false otherwise
       */
      hasClassName: function( elem, className ) {
        var classNameChain = ' ' + elem.className + ' ';
        className = ' ' + className + ' ';

        return classNameChain.indexOf( className ) >= 0;
      },

      /**
       * Check if an element has a given selector
       * Valid selectors are :
       * #foo, div, .foo, .foo[href], div[href], div.foo, 
       * div[href="bar"], .foo[href="fuzz"]
       * @private
       * @name hasSelector
       * @param {Element} elem - The element to validate
       * @param {String} selector - The selector
       * @returns {Boolean} True if match, false otherwise
       */
      hasSelector: function( elem, selector ) {
        var chunker,
          match = selector.match(/(\.?[^\[]+\[[^\]]+\])|(\.)/);

        if ( match !== null ) {
          // .toto or .toto[href="bar"] or toto[href="foo"]
          if ( match[1] ) {
            // .toto[href] or bar[href] or bar[href="dsds"] : by attribute
            chunker = /([^\[]+)\[([^=\]]+)(?:="([^"]+))?/;
            match = selector.match(chunker);
            if ( /\./.test(match[1]) ) {
              // .toto[href] or .toto[href="bar"]
              if ( !match[3] ) {
                // .toto[href]
                return _j.hasClassName( elem, match[1].slice(1) )  &&
                       !!elem.getAttribute( match[2] );
              } else {
                // .toto[href="bar"]
                return _j.hasClassName( elem, match[1].slice(1) ) &&
                       elem.getAttribute( match[2] ) === match[3];
              }
            } else {
              // bar[href] or bar[href="bar"]
              if ( !match[3] ) {
                // bar[href]
                return _j.hasName( elem, match[1] ) &&
                       !!elem.getAttribute( match[2] );
              } else {
                // bar[href="bar"]
                return _j.hasName( elem, match[1] ) &&
                       elem.getAttribute( match[2] ) === match[3];
              }
            }
          } else {
            // .toto or div.toto: byclassname
            chunker = /([^ \.]+)?\.([^ ]+)/;
            match = selector.match( chunker );
            if ( match[1] ) {
              // div.toto
              return _j.hasName( elem, match[1] ) &&
                     _j.hasClassName( elem, match[2] );
            } else {
              // .toto
              return _j.hasClassName( elem, match[2] );
            }
          }
        } else {
          // byid or bytagname
          // '#foo' or div' or 'p'
          match = selector.match(/#([^#]+)/);
          if ( match !== null ) {
            // #foo
            return elem.getAttribute('id') === match[1];
          } else {
            // div or p
            return _j.hasName( elem, selector );
          }
        }
      },

      /**
       * Returns an array of elements that match the given class name
       * Return an empty array if mismatch
       * Valid selectors are :
       * 'div.foo' or '.foo' or 'foo'
       * @private
       * @name getElementsByClassName
       * @param {String} selector - The selector
       * @param {Element} [elem] - The root element on which launch the search
       * Default to `document`
       * @returns {Array} Elements that match the selector or empty array if mismatch
       */
      getElementsByClassName: function( selector, elem ) {
        var elems, l,
          i = 0,
          elemsA = [],
          match = selector.match(/([^ ]+)?\.([^ ]+)/);

        elem = elem || document;

        if ( match !== null ) {
          // div.toto or .toto
          if ( match[1] ) {
            // div.toto
            elems = elem.getElementsByTagName( match[1] );
          } else {
            elems = elem.getElementsByTagName( '*' );
          }
          selector =  match[2];
        } else {
          // toto
          elems = elem.getElementsByTagName( '*' );
        }

        Array.prototype.push.apply( elemsA, elems );

        for ( l = elemsA.length; i < l; i += 1 ) {
          if ( !_j.hasClassName( elemsA[i], selector ) ) {
            elemsA.splice( i, 1 );
            i -= 1;
            l = elemsA.length;
          }
        }
        return elemsA;
      },

      /**
       * Returns an array of elements that match the given attribute
       * Return an empty array if mismatch
       * Valid selectors are :
       * 'a[href]' or '.foo[href]' or 'a[href="bar"]' or '.foo[href="bar"]'
       * @private
       * @name getElementsByAttribute
       * @param {String} selector - The selector
       * @param {Element} [elem] - The root element on which launch the search
       * Default to `document`
       * @returns {Array} Elements that match the selector or empty array if mismatch
       */
      getElementsByAttribute: function( selector, elem ) {
        var elems, l, iElem,
          i = 0,
          elemsA = [],
          chunker = /([^\[]+)\[([^=\]]+)(?:="([^"]+))?/,
          match = selector.match( chunker );

        elem = elem || document;

        if ( match !== null ) {
          if ( /\./.test(match[1]) ) {
            // by classname .foo[href]
            elems = _j.getElementsByClassName( match[1].slice(1), elem );
          } else {
            //by tag  foo[href]
            elems = elem.getElementsByTagName(match[1]);
          }

          // filter the set on the attribute
          // Array#splice has cool perfs: http://jsperf.com/splice-vs-custom-fn
          // convert to Array
          Array.prototype.push.apply( elemsA, elems );

          for ( l = elemsA.length; i < l ; i += 1 ) {
            iElem = elemsA[ i ];
            if ( iElem.getAttribute( match[2] ) == null ) {
              // attribute null or undefined, remove elem from set
              elemsA.splice( i, 1 );
              i -= 1;
            } else {
              // attribute exist, cool for the elem but did the user ask for a value?
              if ( match[3] && iElem.getAttribute( match[2] ) !== match[3] ) {
                // the attribute's value ask by user dont match, remove from set
                elemsA.splice( i, 1 );
                i -= 1;
              }
            }
            // if any splice
            l = elemsA.length;
          }
        }
        return elemsA;
      },

      /**
       * Query document's elements that match a selector
       * Based on a "document only bottom-up algorithm"
       * Valid selectors are :
       * 'div > div.foo .bar .fuzz[bar] > a[href="javascript.html"] #jargon'
       * @private
       * @param {String} selector - The selector
       * @returns {Array} Elements that match the selector or empty array if mismatch
       */
      querySelectorAll: function( selector ) {
        var iBottom,
          candidatesSelector, candidates, candidatesL,
          category, parent, directChild, i, j,
          chunker = /[^ \[]+\[[^ \]]+\]|(?:[^ .]+)?\.[^ ]+|[^ ]+/g,
          steps = selector.match( chunker ),
          stepsL = steps.length;

        if ( stepsL ) {
          // valid selector

          // get candidates array data, iff any
          candidatesSelector = steps[ stepsL - 1 ];
          category = candidatesSelector.match(/#([^ ]+)|([^\[]+\[[^\]]+\])|(\.)/);
          candidates = category ?
                 ( category[1] && [ document.getElementById( category[1] ) ] ) ||
                 ( category[2] && _j.getElementsByAttribute( candidatesSelector ) ) ||
                 ( category[3] && _j.getElementsByClassName( candidatesSelector ) ) :
                 _j.toArray( document.getElementsByTagName( candidatesSelector ) );

          if ( stepsL > 1 ) {
            // multiple selector

            directChild = />/;
            candidatesL = candidates.length;
            i = 0;
            // update the steps array
            steps = steps.slice(0, -1);
            j = iBottom = steps.length - 1;

            for ( ; i < candidatesL; i += 1, j = iBottom ) {
              parent = candidates[ i ];
              while ( ( parent = parent.parentNode ) && ( parent.nodeType === 1 ) ) {
                if ( directChild.test( steps[ j ] ) ) {
                  // '>' selector, jump to the next step
                  // & give the parent only one chance to match
                  j -= 1;
                  if ( !_j.hasSelector( parent, steps[ j ] ) ) {
                    parent = null;
                    break;
                  }
                  j -= 1;
                } else if ( _j.hasSelector( parent, steps[ j ] ) ) {
                  j -= 1;
                }
                if ( j < 0 ) {
                 // reach all the steps & all steps match 
                  // = candidate match, switch to another
                  break;
                }
              }
              if ( !parent ) {
                // out of the DOM or directchild headshot <=> 
                // candidate don't match:
                // remove it & refresh loop props before next iteration
                candidates.splice( i, 1 );
                candidatesL = candidates.length;
                i -= 1;
              }
            }
          }
          return candidates;
        } else {
          // unvalid selector
          return [];
        }
      },

      // Private Jargon's instances methods, factorize methods behavior

      hasAny: function( criterion, checkFn ) {
        var i = 0,
          match = new Array( this.length );
        for ( ; i < this.length; i += 1 ) {
          match[ i ] = checkFn( this[i], criterion );
        }
        if ( i === 1 ) {
          match = match[ 0 ];
        }
        return match;
      },

      getElements: function( selector, getElementsFn ) {
        var i = 0,
          elems = [];
        for ( ; i < this.length; i += 1 ) {
          _concat.apply( elems, getElementsFn( selector, this[ i ] ) );
        }
        return new jArgon( elems );
      }
    });

  // Jargon Interface
  jArgon.prototype = {
    constructor: jArgon,

    /**
     * Check if jargon instance has a given element's name
     * If the jargon instance contains multiple elements, there will be a<br />
     * boolean for each of them into the returned array
     * @example
     * // Valid name:
     * 'div'
     * @public
     * @function
     * @name hasName
     * @param {String} name - The element name
     * @returns {Array|Boolean} True if match, false otherwise
     */
    hasName: function( name ) {
      return _j.hasAny.call( this, name, _j.hasName );
    },

    /**
     * Check if jargon instance has a given class name
     * If the jargon instance contains multiple elements, there will be a<br />
     * boolean for each of them into the returned array
     * @example
     * // Valid class name:
     * 'foo'
     * @public
     * @function
     * @name hasClassName
     * @param {String} className - The class name
     * @returns {Array|Boolean} True if match, false otherwise
     */
    hasClassName: function( className ) {
      return _j.hasAny.call( this, className, _j.hasClassName );
    },

    /**
     * Check if jargon instance has a given selector
     * If the jargon instance contains multiple elements, there will be a<br />
     * boolean for each of them into the returned array
     * @example
     * // Valid selectors are :
     * '#foo', 'div', '.foo', '.foo[href]', 'div[href]', 'div.foo', 
     * 'div[href="bar"]', '.foo[href="fuzz"]'
     * @public
     * @function
     * @name hasSelector
     * @param {String} selector - The selector
     * @returns {Array|Boolean} True if match, false otherwise
     */
    hasSelector: function( selector ) {
      return _j.hasAny.call( this, selector, _j.hasSelector );
    },

    /**
     * Get the child elements of a jargon instance which match a class name.
     * If the jargon instance contains multiple elements, the resulting <br />
     * child elements are merged into a single array.
     * @example
     * // Valid selectors are :
     * 'div.foo' or '.foo' or 'foo'
     * @public
     * @function
     * @name getElementsByClassName
     * @param {String} selector - The selector
     * @returns {jArgon} jArgon object containing matching elements
     */
    getElementsByClassName: function( selector ) {
      return _j.getElements.call( this, selector, _j.getElementsByClassName );
    },

    /**
     * Get the child elements of a jargon instance which match an attribute.
     * If the jargon instance contains multiple elements, the resulting <br />
     * child elements are merged into a single array.
     * @example
     * // Valid selectors are :
     * 'a[href]' or '.foo[href]' or 'a[href="bar"]' or '.foo[href="bar"]'
     * @public
     * @function
     * @name getElementsByAttribute
     * @param {String} selector - The selector
     * @returns {jArgon} jArgon object containing matching elements
     */
    getElementsByAttribute: function( selector ) {
      return _j.getElements.call( this, selector, _j.getElementsByAttribute );
    }
  };

  // Use a decorator to closure jArgon ...

  /**
   * <strong>jArgon initializer</strong><br />
   * Query document's elements on a CSS selector chain and return
   * a jArgon instance which wraps matching elements.<br />
   * - Based on a "document only bottom-up algorithm" -
   * @example
   * // a valid selector chain:
   * 'div > div.foo .bar .fuzz[bar] > a[href="javascript.html"] #jargon'
   * @function
   * @name jArgon
   * @param {String} selector - The selector
   * @returns {jArgon} jArgon object containing matching elements
   */
  decorator = function( selector ) {
    return new jArgon( _j.querySelectorAll( selector ) );
  };

  // ... and expose utilities
  _.extend( decorator,
    {
      trim: _j.trim,
      toArray: _j.toArray
    });

  // Hi all!
  window.jArgon = decorator;
})( this, this.document );