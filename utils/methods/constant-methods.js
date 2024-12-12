function hideFields(obj, fields) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < fields.length; i++) {
      for (let j = 0; j < obj.length; j++) {
        delete obj[j][fields[i]];
      }
    }
  } else {
    hideField(obj, fields);
  }
}

function hideField(obj, fields) {
  for (let i = 0; i < fields.length; i++) {
    delete obj[fields[i]];
  }
}

//todo can be refactored
function keepOnly(obj, fields) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      for (let j = 0; j < fields.length; j++) {
        for (let key in obj[i]) {
          if (fields[j] !== key) {
            delete obj[i][key];
          }
        }
      }
    }
  } else {
    for (let i = 0; i < fields.length; i++) {
      for (let key in obj) {
        if (fields[i] !== key) {
          delete obj[key];
        }
      }
    }
  }
}

function getData(obj){
  return JSON.parse(JSON.stringify(obj));
}

export default { hideFields, hideField, keepOnly, getData };
