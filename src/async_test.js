

// setTimeout(function(){ console.log('Done'); }, 3000);
// arrow functiont használva így néz ki: 
// setTimeout(() => { console.log('Done'); }, 3000);

console.log('still waiting...');


function getUsers() {
  // a promise Class kostruktorába egy darab callback functiont kell beadni, amibenkét callback function-t kell beadni (lehet csak 1-et is, reject nem mindíg kell)
  return new Promise( (resolve, reject) => {
    setTimeout(() => { 
      let db = false;
      if (db) {
        resolve('Done'); 
      } else {
        reject('Database is unreachable');
      }
    }, 3000);
  });
}


// az új javascript kódot a babel.js alakítja át régebbi verzióba hogy régi böngészőkön is fusson a kód... (ez egy webpack plugin)
async function displayData() {
  try {
    let result = await getUsers();
    console.log(result);
  } catch(error) {
    console.log(error);
  }
}

// displayData();
displayData()
  .then((result) => {
    if(result) {
      console.log(result);
    }
  })
  .catch((e) => {
    console.log(e);
  });


// callback hell...


