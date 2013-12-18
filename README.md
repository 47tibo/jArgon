

<!-- Start jargon.js -->

#A tiny JavaScript DOM library
##Utilities methods &amp; DOM elements decorator
*Examples*
```javascript
jArgon.trim('    a string to trim    ');
var jargonObj = jArgon('div > div.foo .bar #jargon');
jargonObj.getElementsByAttribute('.fuzz[bar]');
```

## extend(target, extension)

Extend an object with a set a properties

### Params: 

* **Object** *target* - The target object to extend

* **Object** *extension* - An object containing the new properties

## trim(str)

Call native API method if exists, use fallback instead

### Params: 

* **String** *str* - The string to trim

## toArray(pseudoArray)

Convert pseudo arrays (eg `arguments`, `nodeList`) to arrays

### Params: 

* **PseudoArray** *pseudoArray* - The pseudoArray to convert

## getAttribute

Wrapper for the eponymous DOM method, buggy in IE7-

### Params: 

* **Element** *elem* - The element

* **String** *name* - The attribute&#39;s name

## hasName

Check if an element has a given name
Valid name : &#39;div&#39;

### Params: 

* **Element** *elem* - The element to validate

* **String** *name* - The element name

## hasClassName

Check if an element has a given class name
Valid class name : &#39;foo&#39;

### Params: 

* **Element** *elem* - The element to validate

* **String** *className* - The class name

## hasSelector

Check if an element has a given selector
Valid selectors are :
#foo, div, .foo, .foo[href], div[href], div.foo, 
div[href=&quot;bar&quot;], .foo[href=&quot;fuzz&quot;]

### Params: 

* **Element** *elem* - The element to validate

* **String** *selector* - The selector

## getElementsByClassName

Returns an array of elements that match the given class name
Return an empty array if mismatch
Valid selectors are :
&#39;div.foo&#39; or &#39;.foo&#39; or &#39;foo&#39;

### Params: 

* **String** *selector* - The selector

* **Element** *[elem]* - The root element on which launch the search

## getElementsByAttribute

Returns an array of elements that match the given attribute
Return an empty array if mismatch
Valid selectors are :
&#39;a[href]&#39; or &#39;.foo[href]&#39; or &#39;a[href=&quot;bar&quot;]&#39; or &#39;.foo[href=&quot;bar&quot;]&#39;

### Params: 

* **String** *selector* - The selector

* **Element** *[elem]* - The root element on which launch the search

Query document&#39;s elements that match a selector
Based on a &quot;document only bottom-up algorithm&quot;
Valid selectors are :
&#39;div &gt; div.foo .bar .fuzz[bar] &gt; a[href=&quot;javascript.html&quot;] #jargon&#39;

### Params: 

* **String** *selector* - The selector

## each(fn)

Iterate over a jargon instance, executing a function for each elements.
The function context is a jargon object wrapping the element itself.

### Params: 

* **Function** *fn* - The function which will be executed recursively

## hasName(name)

Check if a jargon instance has a given element&#39;s name.
If the jargon instance contains multiple elements, an array will be return&lt;br /&gt;
containing a boolean for each elements

### Params: 

* **String** *name* - The element name

## hasClassName(className)

Check if a jargon instance has a given class name.
If the jargon instance contains multiple elements, an array will be return&lt;br /&gt;
containing a boolean for each elements

### Params: 

* **String** *className* - The class name

## hasSelector(selector)

Check if a jargon instance has a given selector
If the jargon instance contains multiple elements, an array will be return&lt;br /&gt;
containing a boolean for each elements

### Params: 

* **String** *selector* - The selector

## getElementsByClassName(selector)

Get the child elements of a jargon instance which match a class name.
If the jargon instance contains multiple elements, the resulting &lt;br /&gt;
child elements are merged into a single array.

### Params: 

* **String** *selector* - The selector

## getElementsByAttribute(selector)

Get the child elements of a jargon instance which match an attribute.
If the jargon instance contains multiple elements, the resulting &lt;br /&gt;
child elements are merged into a single array.

### Params: 

* **String** *selector* - The selector

## addClassName(className)

Add a class name to the elements of a jargon instance.
If the class name already present, do nothing.

### Params: 

* **String** *className* - The class name

## removeClassName(className)

Remove a class name to the elements of a jargon instance.
If the class name not present, do nothing.

### Params: 

* **String** *className* - The class name

## toggleClassName(className)

Toggle a class name on the elements of a jargon instance.

### Params: 

* **String** *className* - The class name

## jArgon(selector)

&lt;strong&gt;jArgon initializer&lt;/strong&gt;&lt;br /&gt;
Query document&#39;s elements on a CSS selector chain and return
a jArgon instance which wraps matching elements.&lt;br /&gt;
- Based on a &quot;document only bottom-up algorithm&quot; -&lt;br /&gt;
Or, wrap a single HTMLElement or a NodeList into a jargon instance.&lt;br /&gt;
If the selector mismatch or if the element unvalid, an empty jArgon object is returned.

### Params: 

* **String|HTMLElement|NodeList** *selector* - The selector

<!-- End jargon.js -->

