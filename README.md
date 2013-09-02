#Jargon JS library#

#### Questions ####

### Which pattern????
###

##use of __proto__ ??
@ the beginning FF specific;
wont be standardize, ever, but implemented in many browsers;
not implemented in IE10-;
-> use it as a temporary trick;
-> conclusion: brendan eich dont advise the use of __proto__ to
change prototype chain @ runtime.

##Extending the DOM???
http://perfectionkills.com/whats-wrong-with-extending-the-dom/
- DOM interfaces exposures unconsistent accrross browers;
- DOM API evolves in new versions
- browser that don't support DOM extension need to manually extend objects -> overhead

## Conclusion: follow jquery's builder model, with a mootools interface


#### Selector Engine top->down or bottom->up???
####


###Use Cases###


var $el = jArgon(el);   
var $els = jArgon('div');  //equivalent to jArgon(document).getElements('div');
var $els = jArgon('div', el);
var $els = jArgon('div');



var $els = $el.getElements('div')
$els.forEach(function($el) {
  // heavy compute
});
$els.className('div') // change classname for all
$els.getElement('div')  // retrun the 1st sub div in each $els
$els.getElements('div')  // return all the sub div in each $els



var $subEl = $el.getElement('div')
$subEl.forEach(function($el) {
  // allowed but not clever
});
$subEl.className('div');
var $els = $subEl.getElements('div')


var $elID = $el.getElementById('div')


