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

test( "jArgon('.bar') / jArgon('div.bar')", function() {
  deepEqual( jArgon('.bar').length, 5,
    'selection by class works, regardless of elements types' );
  deepEqual( jArgon('strong.bar').length, 1,
    'selection by class works, regard to elements types' );
});