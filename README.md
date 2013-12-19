

<!-- Start jargon.js -->

#A tiny JavaScript DOM library
**Utilities methods &amp; DOM elements decorator**
##Examples
```javascript
jArgon.trim('    a string to trim    ');
var jargonObj = jArgon('div > div.foo .bar #jargon');
jargonObj.getElementsByAttribute('.fuzz[bar]');
```
##Test suite
Use Qunit, see `test/` directory.
Tested under:
   * FF, Chrome on Ubuntu 12.04
   * IE7+, Chrome, FF, Opera on Windows 7
   * Safari on iOS
   * Android Browser, Chrome on Android 4.03

##Coding convention
I use my own `.jshintrc` file, but rules similar to jQuery's

##Documentation:
JSDoc, [markdox](https://github.com/cbou/markdox) for generating README.md

## extend(target, extension)

Extend an object with a set a properties
##Example
```javascript
var o = { prop1: 'hello' };
jArgon.extend( o, { prop2: 'world' } );
// o = { prop1: 'hello', prop2: 'world' }
```

### Params: 

* **Object** *target* - The target object to extend

* **Object** *extension* - An object containing the new properties

### Return:

* **Object** - The target object extended

## trim(str)

Call native API method if exists, use fallback otherwise

### Params: 

* **String** *str* - The string to trim

### Return:

* **String** The new trimmed string

## toArray(pseudoArray)

Convert pseudo arrays (eg `arguments`, `nodeList`) to arrays

### Params: 

* **PseudoArray** *pseudoArray* - The pseudoArray to convert

### Return:

* **Array** The new array

## each(fn)

Iterate over a jargon instance, executing a function for each elements.
The function context is a jargon object wrapping the element itself.
###Example
```javascript
// add classname 'fuzz' on all p tags
jArgon('p').each(function() {
  this.addClassName('fuzz');
});
```

### Params: 

* **Function** *fn* - The function which will be executed recursively

### Return:

* **jArgon** The jargon instance on which the method is called

## hasName(name)

Check if a jargon instance has a given element's name.
If the jargon instance contains multiple elements, an array will be return
containing a boolean for each elements
###Example
```javascript
jArgon('.current').hasName('div');
```

### Params: 

* **String** *name* - The element name

### Return:

* **Array|Boolean** True if match, false otherwise

## hasClassName(className)

Check if a jargon instance has a given class name.
If the jargon instance contains multiple elements, an array will be return
containing a boolean for each elements
###Example
```javascript
jArgon('#nav-bar').hasClassName('hidden');
```

### Params: 

* **String** *className* - The class name

### Return:

* **Array|Boolean** True if match, false otherwise

## hasSelector(selector)

Check if a jargon instance has a given selector
If the jargon instance contains multiple elements, an array will be return
containing a boolean for each elements
###Example
```javascript
jArgon('a').hasSelector('.foo[href="fuzz"]');
// Supported selectors are :
// '#foo', 'div', '.foo', '.foo[href]', 'div[href]', 'div.foo', 
// 'div[href="bar"]', '.foo[href="fuzz"]'
```

### Params: 

* **String** *selector* - The selector

### Return:

* **Array|Boolean** True if match, false otherwise

## getElementsByClassName(selector)

Get the child elements of a jargon instance which match a class name.
If the jargon instance contains multiple elements, the resulting
child elements are merged into a single array.
###Example
```javascript
var ulElem = jArgon('ul');
// return children li elements with class 'current'
ulElem.getElementsByClassName('li.current');
// Valid selectors are :
// 'div.foo' or '.foo' or 'foo'
```

### Params: 

* **String** *selector* - The selector

### Return:

* **jArgon** jArgon object containing matching elements

## getElementsByAttribute(selector)

Get the child elements of a jargon instance which match an attribute.
If the jargon instance contains multiple elements, the resulting
child elements are merged into a single array.
###Example
```javascript
var artElem = jArgon('article');
// return children a elements with href="#"
artElem.getElementsByAttribute('a[href="#"]');
// Valid selectors are :
// 'a[href]' or '.foo[href]' or 'a[href="bar"]' or '.foo[href="bar"]'
```

### Params: 

* **String** *selector* - The selector

### Return:

* **jArgon** jArgon object containing matching elements

## addClassName(className)

Add a class name to the elements of a jargon instance.
If the class name already present, do nothing.
```javascript
// Valid class name:
// 'foo'
```

### Params: 

* **String** *className* - The class name

### Return:

* **jArgon** jArgon object with the updated elements

## removeClassName(className)

Remove a class name to the elements of a jargon instance.
If the class name not present, do nothing.
```javascript
// Valid class name:
// 'foo'
```

### Params: 

* **String** *className* - The class name

### Return:

* **jArgon** jArgon object with the updated elements

## toggleClassName(className)

Toggle a class name on the elements of a jargon instance.
```javascript
// Valid class name:
// 'foo'
```

### Params: 

* **String** *className* - The class name

### Return:

* **jArgon** jArgon object with the updated elements

## jArgon(selector)

###jArgon initializer
Use cases:
   * Query document's elements on a CSS selector chain and return
     a jArgon instance which wraps matching elements. *Based on a "document only bottom-up algorithm"*
   * Wrap a single HTMLElement or a NodeList into a jArgon instance.

If the selector mismatch or if the element is unvalid, an empty jArgon object is returned.
```javascript
var jargonObj;
// a valid selector chain:
jargonObj = jArgon('div > div.foo .bar .fuzz[bar] > a[href="javascript.html"] #jargon');
// elem is a valid HTMLElement
jargonObj = jArgon( elem );
// elems is a NodeList
jargonObj = jArgon( elems );
```

### Params: 

* **String|HTMLElement|NodeList** *selector* - The selector

### Return:

* **jArgon** jArgon object containing matching elements or the passed element(s)

<!-- End jargon.js -->

