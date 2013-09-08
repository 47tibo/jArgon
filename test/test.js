test( "jArgon Utilities", function() {
  deepEqual( jArgon.trim('    this is    a string to be trimed   ..   '), 'this is    a string to be trimed   ..',
    'jArgon.trim() works' );
  deepEqual( Object.prototype.toString.call( jArgon.toArray( document.getElementsByTagName('div') ) ),
    '[object Array]', 'jArgon.toArray() works' );
});

test( "jArgon('div') / jArgon('div p code')", function() {
  deepEqual( jArgon('code').length, 2,
      'good tag selector works' );

  deepEqual( jArgon(' p > span > code').length, 0,
  'nested & bad tag selector dont work as expected' );

   deepEqual( jArgon(' div div > span > span > code').length, 1,
  'nested but good selector works' );
});

test( "jArgon('#unique') / jArgon('#unique > #unique #unique')", function() {
  deepEqual( jArgon('#unique').length, 1,
    'even with two elements with the same id in the markup, jArgon return only one of them' );

  deepEqual( jArgon('#unique #tutu > #bar').length, 0,
    'bad id selectors chain dont work as expected' );

  deepEqual( jArgon('#bar #blob > #unique').length, 0,
    'bad id selectors chain dont work as expected' );

  deepEqual( jArgon('#tutu > #blob > #unique').length, 0,
    'bad id selectors chain dont work as expected' );

  deepEqual( jArgon('#tutu #blob > #unique').length, 1,
    'good id selectors chain works as expected' );

  deepEqual( jArgon('#tutu #blob #unique').length, 1,
    'good id selectors chain works as expected' );
});

test( "jArgon('.bar') / jArgon('div.bar') / jArgon('div.bar > p.foo .fuzz')", function() {
  deepEqual( jArgon('.bar').length, 6,
    'selection by class works, regardless of elements types' );

  deepEqual( jArgon('strong.bar').length, 1,
    'selection by class works, regard to elements types' );

  deepEqual( jArgon(' div.bar > .bar').length, 0,
  'bad class selector chain failed as expected' );

  deepEqual( jArgon('   .fuu  div.bar >   .jargon  ').length, 3,
  'good class selector chain rocks!' );
});

test( "jArgon('a[href]') / jArgon('img[src='foo.jpg']') / jArgon('a[href] > .fuzz[data-foo='bar']')", function() {
  deepEqual( jArgon('code[data-jargon]').length, 1,
    'selection by attribute on tagname works' );

  deepEqual( jArgon('.bar[data-jargon="fuzz/inputs/fuzz.jpg"]').length, 2,
    'selection by attribute & value on classname works' );

  deepEqual( jArgon('.bar[data-jargon]').length, 2,
    'selection by attribute on classname works' );

  deepEqual( jArgon('img[src="foo.jpg"]').length, 1,
    'selection by attribute & its value works' );
});


test( "jArgon('a > .foo[data-fuzz] p.bar #fuzz > a[href='inputs/all/baz.jpg']')", function() {
  deepEqual( jArgon('.bar > .fuu span > .bar[data-jargon="fuzz/inputs/fuzz.jpg"]').length, 0,
    'bad nested & long selector chain fails' );

  deepEqual( jArgon('div.bar #blob div[bar="baz"] > div[data-jargon]').length, 1,
    'good nested & long selector chain works' );
});

test( "$el.hasClassName('foo')", function() {
  deepEqual( jArgon('strong[data-jargon]').hasClassName('bar'), true,
    'looking for an available classname on a jargon object returns true' );
  deepEqual( jArgon('.fuzz[bar="baz"]').hasClassName('foo'), false,
    'looking for a not available classname on a jargon object returns false' );

  var bools = jArgon('.bunk').hasClassName('bar'),
    j = 0,
    count = 0;
  for ( ; j < bools.length; j +=1 ) {
    if ( bools[ j ] === false ) {
      count += 1;
    }
  }
  deepEqual( count, 1,
    'looking for a classname on a jargon object containing many elements returns an array of boolean values ' +
    'indicating presence/abscence of the classname' );
});

test( "$el.hasName('p')", function() {
  deepEqual( jArgon('.bunk[data-jargon]').hasName('strong'), true,
    'looking for a tagname on a jargon object which indeed has this tagname returns true' );

  deepEqual( jArgon('#blob').hasName('p'), false,
    'looking for a tagname on a jargon object which doesnt have this tagname returns false' );

    var bools = jArgon('.bar').hasName('code'),
    j = 0,
    count = 0;
  for ( ; j < bools.length; j +=1 ) {
    if ( bools[ j ] === true ) {
      count += 1;
    }
  }
  deepEqual( count, 1,
    'looking for a tagname on a jargon object containing many elements returns an array of boolean values ' +
    'indicating presence/abscence of the tagname' );
});


test( "$el.hasSelector('a[href='javascript.js']')", function() {
  deepEqual( jArgon('.fuzz').hasSelector('div[bar="baz"]'), true,
    'looking for a selector on a jargon object which indeed match the selector returns true' );

  deepEqual( jArgon('.fuu span > code').hasSelector('.bar[data-jargon]'), true,
    'looking for a selector on a jargon object which indeed match the selector returns true' );

  deepEqual( jArgon(' .fuu span > code').hasSelector('.bar[data-jargon="fuzz/inputs/fuzz.png"]'), false,
    'looking for a selector on a jargon object which doesnt match the selector returns false' );

  var bools = jArgon(' .bunk').hasSelector('strong.bar'),
    j = 0,
    count = 0;
  for ( ; j < bools.length; j +=1 ) {
    if ( bools[ j ] === true ) {
      count += 1;
    }
  }
  deepEqual( count, 1,
    'looking for a selector on a jargon object containing many elements returns an array of boolean values ' +
    'indicating if each element match/mismatch the selector' );
});


test( "$el.getElementsByAttribute('.foo[src='fuzzy.png']')", function() {
  deepEqual( jArgon('.fuu[data-toby="bar"]').getElementsByAttribute('img[src]').length, 3,
    'looking for child elements of a jargon object (holding one element) on a given tagname & attribute ' +
    'return the corresponding child elements');

  deepEqual( jArgon('.fuu[data-toby="bar"]').getElementsByAttribute('.jargon[src="foo.jpg"]').length, 1,
    'looking for child elements of a jargon object (holding one element) on a given classname & attribute ' +
    'return the corresponding child elements');

  deepEqual( jArgon('.fuu').getElementsByAttribute('.bar[data-jargon]').length, 1,
    'looking for child elements of a jargon object (holding many elements) on a given classname & attribute ' +
    'return the corresponding child elements');
});

test( "$el.getElementsByClassName('.foo')", function() {
  deepEqual( jArgon('.fuu[data-toby]').getElementsByClassName('jargon').length, 2,
    'looking for child elements of a jargon object (holding one element) on a given classname ' +
    'return the corresponding child elements');

  deepEqual( jArgon('.bar').getElementsByClassName('.bar').length, 2,
    'looking for child elements of a jargon object (holding many elements) on a given classname ' +
    'return the corresponding child elements');

  deepEqual( jArgon('.bar').getElementsByClassName('code.bar').length, 1,
    'looking for child elements of a jargon object (holding many elements) on a given tag & a classname ' +
    'return the corresponding child elements');
});