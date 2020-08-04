function addNamespace(object, prefix){
  function traverse(x, level) {
    if (isArray(x)) {
      traverseArray(x, level);
    } else if ((typeof x === 'object') && (x !== null)) {
      traverseObject(x, level);
    }

  }

  function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  }

  function traverseArray(arr, level) {
    arr.forEach(function(x) {
      traverse(x, level + "  ");
    });
  }

  function traverseObject(obj, level) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[prefix + key] = obj[key];
        traverse(obj[key], level + "    ");
        delete obj[key];
      }
    }
  }
  
  traverse(object, "");
  return object;
}