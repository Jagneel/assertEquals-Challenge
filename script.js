
/**
 * Asserts "expected" versus "actual", 
 * 'failing' the assertion (via Error) if a difference is found.
 *
 * @param {String} message The comparison message passed by the user
 * @param {*} expected The expected item
 * @param {*} actual The actual item
 */

// Create functions that checks for equality for Arrays and Objects

function arrayEquals(message, a, b){
    if(a.length !== b.length){
      throw new Error(message + `Expected array length ${a.length} but found ${b.length}`)
    }
}

function objectEquals(message, a, b){
  const obj1Keys = Object.keys(a.propB);
  const obj2Keys = Object.keys(b.propB);
   
   
  if(obj1Keys.length !== obj2Keys.length){
    throw new Error(message + `Expected ${obj1Keys} but was not found`)
  } 
   
  
  if (JSON.stringify(a) !== JSON.stringify(b)){
    throw new Error(message + `Expected ${JSON.stringify(a.propB.propA[1])} but found ${JSON.stringify(b.propB.propA[1])}`)
    
  }
  
}



 function assertEquals(message, expected, actual) {
//    first check if types match
   
   var typeA = Object.prototype.toString.call(expected)
   var typeB = Object.prototype.toString.call(actual)
  
  
   if(typeA !== typeB){
    throw new Error(message + `Expected type ${typeA} but found ${typeB}`)
   }
   
// now check if strings match
   
   if(typeof(expected) === 'string' && typeof(actual) === 'string'){
      if(expected != actual)
      {
        throw new Error(message + `Expected "${expected}" but found "${actual}"`)
      }
   }
   
//  check if arrays match using the arrayEquals function
   
   if(Array.isArray(expected) && Array.isArray(actual))
      {
        arrayEquals(message, expected, actual)
    }
   
//    checkif objects match using the objectEquals function
   
   if(typeA === "[object Object]" && typeB === "[object Object]"){
     objectEquals(message, expected, actual)

   }   

}



/* -- Test running code:  --- */

/**
 * Runs a "assertEquals" test.
 * 
 * @param {String} message The initial message to pass
 * @param {Array} assertionFailures List of messages that will be displayed on the UI for evaluation
 * @param {*} expected Expected item
 * @param {*} actual The actual item
 */
function runTest(message, assertionFailures, expected, actual) {
  try {
    assertEquals(message, expected, actual);
  } catch (failure) {
    assertionFailures.push(failure.message);
  }
}

function runAll() {
  
  var complexObject1 = {
    propA: 1,
    propB: {
      propA: [1, { propA: 'a', propB: 'b' }, 3],
      propB: 1,
      propC: 2
    }
  };
  var complexObject1Copy = {
    propA: 1,
    propB: {
      propA: [1, { propA: 'a', propB: 'b' }, 3],
      propB: 1,
      propC: 2
    }
  };
  var complexObject2 = {
    propA: 1,
    propB: {
      propB: 1,
      propA: [1, { propA: 'a', propB: 'c' }, 3],
      propC: 2
    }
  };
  var complexObject3 = {
    propA: 1,
    propB: {
      propA: [1, { propA: 'a', propB: 'b' }, 3],
      propB: 1
    }
  };

  // Run the tests
  var assertionFailures = [];
  runTest('Test 01: ', assertionFailures, 'abc', 'abc');
  runTest('Test 02: ', assertionFailures, 'abcdef', 'abc');
  runTest('Test 03: ', assertionFailures, ['a'], {0: 'a'});
  runTest('Test 04: ', assertionFailures, ['a', 'b'], ['a', 'b', 'c']);
  runTest('Test 05: ', assertionFailures, ['a', 'b', 'c'], ['a', 'b', 'c']);
  runTest('Test 06: ', assertionFailures, complexObject1, complexObject1Copy);
  runTest('Test 07: ', assertionFailures, complexObject1, complexObject2);
  runTest('Test 08: ', assertionFailures, complexObject1, complexObject3);
  runTest('Test 09: ', assertionFailures, null, {});

  

  
  // Output the results
  var messagesEl = document.getElementById('messages');
  var newListEl;
  var i, ii;
  
  for (i = 0, ii = assertionFailures.length; i < ii; i++) {    
    newListEl = document.createElement('li');
    newListEl.innerHTML = assertionFailures[i];
    messagesEl.appendChild(newListEl);    
  }
}

runAll();
