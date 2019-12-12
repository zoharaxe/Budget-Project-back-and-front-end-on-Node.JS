function isValidationOk(description, amount) {
  return description.length > 0 && amount > 0;
}

function handlePut(array, req, res) {

  const id = req.params.id;
  const updatedObj = req.body;

  // --- validate the descption length > 0 , amount > 0
  // --- if not return status code 400 - BAD REQUEST

  if (isValidationOk(updatedObj.description, updatedObj.amount)) {
    // --- input is valid
    const index = array.findIndex(it => it.id == id);
    if (index == -1) {
      res.sendStatus(404);
    } else {
      array[index] = updatedObj;
      res.send(updatedObj);
    }
  } else {
    // --- input is not valid
    res.sendStatus(400);
  }
}


function handleDelete(array, req, res) {

  const index = array.findIndex(it => it.id == req.params.id);
  // --- need to check index is ok
  if (index == -1) {
    res.sendStatus(404);
  } else {
    array.splice(index, 1);
    res.sendStatus(200);
  }
}

function handleGet(array, req, res) {

  if (req.query.description == undefined) {
    // got /incomes
    res.send(array);
  } else {
    // got e.g. /incomes?description=salary 1
    // -- got query string -> req.query.description
    const item = array.find(
      it => it.description == req.query.description
    );
    if (item == undefined) {
      res.sendStatus(404);
    } else {
      res.send(item);
    }
  }
}


function handlePost(array, chooseIds, req, res) {

  const newObj = {
    description: req.body.description,
    amount: req.body.amount,
    id: chooseIds
  };

  if (isValidationOk(newObj.description, newObj.amount)) {
    chooseIds++;
    array.push(newObj);
    res.status(201).send(newObj);
  } else {
    // --- input is not valid
    res.sendStatus(400);
//     alertbox();
//     function alertbox() {
//       htmlElement = document.createElement("section");
//       htmlElement.innerHTML =

//         `<section>
//   <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
//   <strong>Danger!</strong> Indicates a dangerous or potentially negative action.
// </section>`;
//       document.getElementById("alert").appendChild(htmlElement);
//     }
  }
};

module.exports.handlePut = handlePut;
module.exports.handleDelete = handleDelete;
module.exports.handlePost = handlePost;
module.exports.handleGet = handleGet;