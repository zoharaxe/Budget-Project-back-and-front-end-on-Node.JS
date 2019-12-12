var incomes;
var selection = true;
var income;
let income_sum = 0;
let totalOutcome = 0
var now = new Date();

getIncomes();
getOutcomes();

let month = ["Januray", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById("monthDiv").innerHTML +=
  `${month[now.getMonth()]} ${now.getFullYear()}`;


//Execute with ENTER ****************
var input = document.getElementById("description_Input");
input.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    add();
    document.getElementById("description_Input").value = "";
    document.getElementById("amountInput").value = "";
  }
})

var input1 = document.getElementById("amountInput");
input1.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    add();
    document.getElementById("description_Input").value = "";
    document.getElementById("amountInput").value = "";
  }
})


function red() {
  selection = false;
  document.getElementById("check_symbol").style.color = "rgb(228, 81, 81)";
  document.getElementById("description_Input").style.border = "solid rgb(228, 81, 81) 1px";
  document.getElementById("amountInput").style.border = "solid rgb(228, 81, 81) 1px";
}


function green() {
  selection = true;
  document.getElementById("check_symbol").style.color = "rgb(29, 190, 155)";
  document.getElementById("description_Input").style.border = "solid rgb(29, 190, 155) 1px";
  document.getElementById("amountInput").style.border = "solid rgb(29, 190, 155) 1px";

}


function add() {
  let description = document.getElementById("description_Input").value;
  let amount = Number(document.getElementById("amountInput").value);

  if (description.length > 0 && amount > 0) {
    if (selection) {
      createIncome();
      document.getElementById("description_Input").value = "";
      document.getElementById("amountInput").value = "";
    }


    else {
      createOutcome();
      document.getElementById("description_Input").value = "";
      document.getElementById("amountInput").value = "";

    }
  }
  else {
    alertbox();
    function alertbox() {
      let htmlElement = document.createElement("div");
      htmlElement.innerHTML = `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
          <strong>OOPS!</strong><span>please make sure to <strong>write</strong> a DESCRIPTION and enter a <strong>positive</strong> AMOUNT</span>.`
         

      document.getElementById("alert").appendChild(htmlElement);
    }


  }
}

//ALERT BOX****************************************************************************************************************
// function alertbox() {
//   htmlElement = document.createElement("div");
//   htmlElement.innerHTML =
//     `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
// <strong>OOPS!</strong> Somthing Went Wrong. response code:${response.status}`;

//   document.getElementById("alert").appendChild(htmlElement);
// }


// delete for both************************************************************************************************************

function deleteById(outOrIn, argId, element) {
  // -- call the server using delete
  const url = `/${outOrIn}/${argId}`;
  axios
    .delete(url)
    .then(function (response) {
      // handle success
      if (response.status == 200) {
        const parent = element.parentElement;
        parent.removeChild(element);
        // getIncomes();
        // getOutcomes();

      }
      else {
        alertbox();
        function alertbox() {
          htmlElement = document.createElement("div");
          htmlElement.innerHTML =
            `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
          <strong>OOPS!</strong> Something Went Wrong. response code:${response.status}`;

          document.getElementById("alert").appendChild(htmlElement);
        }

      }
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  // getIncomes();
  // getOutcomes();

}




// // INCOMES FUNCTIONS
// ************************************************************************************************




// UPDATE FOR LATER*******
// function updateIncome() {

//   const description = document.getElementById("description_Input").value;
//   const amount = document.getElementById("amountInput").value;
//   const id = document.getElementById("idInput").value
//   const url = `/incomes/` + id;
//   axios

//     .put(url,
//       {
//         description: description,
//         amount: amount,
//         id: id
//       })
//     .then(function (response) {
//       // handle success
//         console.log(response.data);
//       })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     });
//     getIncomes();

// }

function createIncome() {
  const description = document.getElementById("description_Input").value;
  const amount = document.getElementById("amountInput").value;

  // --- call the server using post
  axios
    .post("/incomes", {
      description: description,
      amount: amount
    })
    .then(function (response) {
      if (response.status == 201) {
        console.log(response.data);
      }
      else {
        alertbox();
        function alertbox() {
          htmlElement = document.createElement("div");
          htmlElement.innerHTML =
            `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
          <strong>OOPS!</strong> Something Went Wrong. response code:${response.status}`;

          document.getElementById("alert").appendChild(htmlElement);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  getIncomes();
  getOutcomes();
}
function getIncomes() {

  income_sum = 0;

  axios
    .get("/incomes")
    .then(function (response) {
      if (response.status == 200) {
        console.log(response.status);

        incomes = response.data;

        document.getElementById("incomeList").innerHTML = "";
        for (let index = 0; index < incomes.length; index++) {
          const element = incomes[index];
          let htmlElement;
          let iconElement;

          //DINAMIC ELEMENT*****************
          htmlElement = document.createElement("li");
          htmlElement.innerHTML = `<div id="liDiv"><span id="sLeft">${element.description}</span>
        <span id="sRight">${element.amount}</span>`;
          iconElement = document.createElement("span");
          iconElement.id = "icon";
          iconElement.innerHTML = `<i id="eraseI" class="material-icons">highlight_off</i></div>`

          document.getElementById("incomeList").appendChild(htmlElement);
          htmlElement.appendChild(iconElement);
          income_sum += Number(element.amount);
          document.getElementById("incomeValue").innerText = income_sum;
          totalBudget = totalOutcome + income_sum;
          document.getElementById("balanceDiv").innerText = totalBudget;

          // DELETE**************************************
          iconElement.onclick = function () {
            deleteById("incomes", element.id, htmlElement);
            income_sum -= Number(element.amount);
            document.getElementById("incomeValue").innerText = income_sum;
            totalBudget = totalOutcome + income_sum;
            document.getElementById("balanceDiv").innerText = totalBudget;
            // getIncomes();
            getOutcomes();
          };
        }

      }
      else {
        alertbox();
        function alertbox() {
          htmlElement = document.createElement("div");
          htmlElement.innerHTML =
            `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
          <strong>OOPS!</strong> Something Went Wrong. response code:${response.status}`;

          document.getElementById("alert").appendChild(htmlElement);
        }


      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}





// EXPENCES FUNCTIONS
// ********************************************************************************************



function createOutcome() {
  const description = document.getElementById("description_Input").value;
  const amount = document.getElementById("amountInput").value;

  // --- call the server using post
  axios
    .post("/outcomes", {
      description: description,
      amount: amount
    })
    .then(function (response) {
      if (response.status == 201) {
        console.log(response.data);
      }
      else {
        alertbox();
        function alertbox() {
          htmlElement = document.createElement("div");
          htmlElement.innerHTML =
            `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
          <strong>OOPS!</strong> Something Went Wrong. response code:${response.status}`;

          document.getElementById("alert").appendChild(htmlElement);
        }

      }
    })
    .catch(function (error) {
      console.log(error);
    });
  getOutcomes();
}

function getOutcomes() {
  totalOutcome = 0

  axios
    .get("/outcomes")
    .then(function (response) {
      if (response.status == 200) {
        incomes = response.data;


        document.getElementById("outcomeList").innerHTML = "";
        for (let index = 0; index < incomes.length; index++) {
          const element = incomes[index];
          let htmlElement;
          let iconElement;

          //DINAMIC ELEMENT*****************
          htmlElement = document.createElement("li");
          htmlElement.innerHTML = `<span id="sLeft">${element.description}</span>
        <span id="sRight">${element.amount}</span>`;
          document.getElementById("outcomeList").appendChild(htmlElement);

          iconElement = document.createElement("span");
          iconElement.id = "icon";
          iconElement.innerHTML = `<i id="eraseI" class="material-icons">highlight_off</i></div>`
          htmlElement.appendChild(iconElement);

          totalOutcome -= Number(element.amount);
          document.getElementById("expensesValue").innerText = totalOutcome;
          totalBudget = totalOutcome + income_sum;
          document.getElementById("balanceDiv").innerText = totalBudget;

          percentageSpan = document.createElement("span");
          percentageSpan.id = "percentage";
          document.getElementById("outcomeList").appendChild(htmlElement);
          percentageSpan.innerText = Math.round(100 * Number(element.amount) / Number(income_sum)) + "%";
          htmlElement.appendChild(percentageSpan);
          // getOutcomes();

          // DELETE**************************************
          iconElement.onclick = function () {
            deleteById("outcomes", element.id, htmlElement);
            totalOutcome += Number(element.amount);
            document.getElementById("expensesValue").innerText = totalOutcome;
            totalBudget = totalOutcome + income_sum;
            document.getElementById("balanceDiv").innerText = totalBudget;

            // getOutcomes();
            // getIncomes();
          };

        }
      }
      else {
        alertbox();
        function alertbox() {
          htmlElement = document.createElement("div");
          htmlElement.innerHTML =
            `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
          <strong>OOPS!</strong> Something Went Wrong. response code:${response.status}`;

          document.getElementById("alert").appendChild(htmlElement);
        }
      }

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

}

