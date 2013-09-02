;(function( window, document, undefined ) {
  'use strict';

  // Main variables
  var jArgon, decorator,

  // Shortcuts
    _j,
    // Array#concat way behind Array.proto.push.apply in FF, see:
    // http://jsperf.com/array-prototype-push-apply-vs-concat
    _concat = Array.prototype.push.apply;

  _j = jArgon  = function( elems ) {
    this.length = 0;
    _concat( this, elems );
  };

  // Utilities
  _.extend( _j,
    { 
      toArray: function( pseudoArray ) {
        var a = [];
        _concat( a, pseudoArray );
        return a;
       },

      getElements: function( selector, elem ) {
        return _j.toArray( elem.getElementsByTagName( selector ) );
      }

    });

  // Jargon Interface
  jArgon.prototype = {

    constructor: jArgon,

      // DOM handling methods
    getElements: function( selector ) {
      var i = 0, elems = [];
      for ( ; i < this.length; i += 1 ) {
        _concat( elems, _j.getElements( selector, this[ i ] ) );
      }
      return new jArgon( elems );
    }
  };


  decorator = function( selector, elem ) {
   elem = elem || document;
   return new jArgon( _j.getElements( selector, elem ) );
  };

  // Hi all!
  window.jArgon = decorator;
})( this, this.document );