const endPointRoot = "https://ashergum.com/Comp4537/termproject/API/V1";
const xhttp = new XMLHttpRequest();
let employeeBeingEdited = -1;
let employeeModalBtnListenersAdded = false;

let bakeryBeingEdited = -1;
let bakeryModalBtnListenersAdded = false;

let dessertBeingEdited = -1;
let dessertModalBtnListenersAdded = false;

let allBakeries = {};

function logout() {
  window.location.href =
    "https://christinaraganit.live/comp4537/termproject/API/V1/login.html";
}

// ---------------------------------------BAKERIES--------------------------------------------
async function getBakery(value) {
  let bakeryName = "";
  const result = await fetch(endPointRoot + "/bakery/?id=" + value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      bakeryName = res[0].bakeryName;
      return res[0].bakeryName;
    });
  return bakeryName;
}

async function getBakeryDictionary() {
  const result = await fetch(endPointRoot + "/bakery")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        allBakeries[res[i].bakeryID] = res[i].bakeryName;
      }
      console.log(allBakeries);
    });
  console.log(allBakeries);
}

function viewBakeries() {
  let outerDiv = document.getElementById("outerDiv");
  outerDiv.setAttribute(
    "class",
    "row h-25 justify-content-center align-items-center"
  );

  document.getElementById("container").innerHTML = "";

  let bakeryTitle = document.createElement("h2");
  bakeryTitle.setAttribute("class", "text-primary font-weight-bold");
  bakeryTitle.innerHTML = "Bakeries";

  let button = document.createElement("BUTTON");
  button.innerHTML = "Add new bakery";
  button.setAttribute("class", "w-100 btn btn-outline-primary");
  button.setAttribute("style", "margin-bottom: 24px");
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#addBakeryModal");

  document.getElementById("container").appendChild(bakeryTitle);
  document.getElementById("container").appendChild(button);

  getBakeries();
}

function getBakeries() {
  (async () => {
    let result = await fetch(endPointRoot + "/bakery")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        document.getElementById("container").innerHTML = "";

        for (let i = 0; i < res.length; i++) {
          generateBakery(res[i]);
        }

        function editBakery() {
          putBakery(
            bakeryBeingEdited,
            document.getElementById("editBakeryName").value,
            document.getElementById("editBakeryLocation").value,
            document.getElementById("editBakeryManager").value,
            document.getElementById("editBakeryDescription").value
          );
          let text = document.createElement("H1");
          text.innerHTML = "The bakery was edited.";
          let bakeryModal = document.getElementById("editBakeryModalBody");
          bakeryModal.append(text);

          setTimeout(function () {
            document.getElementById("editBakeryName").value = "";
            document.getElementById("editBakeryLocation").value = "";
            document.getElementById("editBakeryManager").value = "";
            document.getElementById("editBakeryDescription").value = "";
            text.innerHTML = "";
          }, 3000);
        }

        if (!bakeryModalBtnListenersAdded) {
          document
            .getElementById("editBakeryModalBtn")
            .addEventListener("click", editBakery);
          bakeryModalBtnListenersAdded = true;
        }
      });
  })();
}

function generateBakery(bakeryObj) {
  let bakeryContainer = document.createElement("div");
  let div = document.createElement("div");
  let bakeryInfo = document.createElement("div");
  let bakeryName = document.createElement("h4");
  let bakeryLocation = document.createElement("h6");
  let bakeryManager = document.createElement("p");
  let bakeryDescription = document.createElement("p");
  let bakeryFooter = document.createElement("div");
  let editBakeryBtn = document.createElement("button");
  let deleteBakeryBtn = document.createElement("button");

  div.setAttribute("class", "w-100 card");
  div.setAttribute("style", "margin-bottom: 12px");
  bakeryInfo.setAttribute("class", "card-body");
  bakeryName.setAttribute("class", "card-title");
  bakeryLocation.setAttribute("class", "card-subtitle mb-2 text-muted");
  bakeryManager.setAttribute("class", "card-text");
  bakeryDescription.setAttribute("class", "card-text");
  bakeryFooter.setAttribute("class", "card-footer");
  editBakeryBtn.setAttribute("class", "btn btn-secondary");
  editBakeryBtn.setAttribute("style", "margin-right: 8px");
  deleteBakeryBtn.setAttribute("class", "btn btn-outline-danger");

  bakeryName.innerHTML = bakeryObj.bakeryName;
  bakeryLocation.innerHTML = bakeryObj.bakeryLocation;
  bakeryManager.innerHTML = "Managed by " + bakeryObj.bakeryManager;
  bakeryDescription.innerHTML = bakeryObj.bakeryDescription;
  editBakeryBtn.innerHTML = "Edit bakery";
  deleteBakeryBtn.innerHTML = "Delete bakery";

  editBakeryBtn.setAttribute("data-toggle", "modal");
  editBakeryBtn.setAttribute("data-target", "#editBakeryModal");
  editBakeryBtn.addEventListener("click", function () {
    bakeryBeingEdited = bakeryObj.bakeryID;
  });
  deleteBakeryBtn.addEventListener("click", function () {
    deleteRequest("Bakery", bakeryObj.bakeryID).then(() => {
      bakeryObj = null;
      document.getElementById("container").innerHTML = "";
      getBakeries();
    });
  });

  bakeryContainer.appendChild(div);
  div.appendChild(bakeryInfo);
  bakeryInfo.appendChild(bakeryName);
  bakeryInfo.appendChild(bakeryLocation);
  bakeryInfo.appendChild(bakeryManager);
  bakeryInfo.appendChild(bakeryDescription);
  div.appendChild(bakeryFooter);
  bakeryFooter.appendChild(editBakeryBtn);
  bakeryFooter.appendChild(deleteBakeryBtn);

  document.getElementById("container").appendChild(div);
}

async function putBakery(bakeryID, name, location, manager, description) {
  let result = fetch(endPointRoot + "/bakery", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bakeryID: bakeryID,
      name: name,
      location: location,
      manager: manager,
      description: description,
    }),
  }).then((res) => {
    if (res.ok) {
      getBakeries();
      return res.json();
    }
  });
}

// ---------------------------------------DESSERTS--------------------------------------------
function viewDesserts() {
  getBakeryDictionary();

  let outerDiv = document.getElementById("outerDiv");
  outerDiv.setAttribute(
    "class",
    "row h-25 justify-content-center align-items-center"
  );

  document.getElementById("container").innerHTML = "";
  let dessertTitle = document.createElement("h2");
  dessertTitle.setAttribute("class", "text-info font-weight-bold");
  dessertTitle.innerHTML = "Desserts";

  let button = document.createElement("BUTTON");
  button.innerHTML = "Add new dessert";
  button.setAttribute("class", "w-100 btn btn-outline-info");
  button.setAttribute("style", "margin-bottom: 24px");
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#addDessertModal");

  let dessertBakeryId = document.getElementById("dessertBakeryID");
  let editDessertBakeryId = document.getElementById("editDessertBakeryID");
  let employeeBakeryId = document.getElementById("employeeBakeryID");
  let editEmployeeBakeryId = document.getElementById("editEmployeeBakeryID");

  dessertBakeryId.innerHTML = "";
  editDessertBakeryId.innerHTML = "";
  employeeBakeryId.innerHTML = "";
  editEmployeeBakeryId.innerHTML = "";

  for (bakery in allBakeries) {
    dessertBakeryId.innerHTML +=
      "<option value='" + bakery + "'>" + allBakeries[bakery] + "</option>";
    editDessertBakeryId.innerHTML +=
      "<option value='" + bakery + "'>" + allBakeries[bakery] + "</option>";
    employeeBakeryId.innerHTML +=
      "<option value='" + bakery + "'>" + allBakeries[bakery] + "</option>";
    editEmployeeBakeryId.innerHTML +=
      "<option value='" + bakery + "'>" + allBakeries[bakery] + "</option>";
  }

  document.getElementById("container").appendChild(dessertTitle);
  document.getElementById("container").appendChild(button);

  getDesserts();
}

function getDesserts() {
  (async () => {
    let result = await fetch(endPointRoot + "/dessert")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        document.getElementById("container").innerHTML = "";

        for (let i = 0; i < res.length; i++) {
          generateDessert(res[i]);
        }

        function editDessert() {
          putDessert(
            dessertBeingEdited,
            document.getElementById("editDessertName").value,
            document.getElementById("editDessertIngredients").value,
            document.getElementById("editDessertDescription").value,
            document.getElementById("editDessertBakeryID").value
          );

          let text = document.createElement("H1");
          text.innerHTML = "The dessert was edited.";
          let dessertModal = document.getElementById("editDessertModalBody");
          dessertModal.append(text);

          setTimeout(function () {
            document.getElementById("editDessertName").value = "";
            document.getElementById("editDessertIngredients").value = "";
            document.getElementById("editDessertDescription").value = "";
            document.getElementById("editDessertBakeryID").value = "";
            text.innerHTML = "";
          }, 3000);
        }

        if (!dessertModalBtnListenersAdded) {
          document
            .getElementById("editDessertModalBtn")
            .addEventListener("click", editDessert);
          dessertModalBtnListenersAdded = true;
        }
      });
  })();
}

function generateDessert(dessertObj) {
  getBakeryDictionary();

  let outerDiv = document.getElementById("outerDiv");
  outerDiv.setAttribute(
    "class",
    "row h-25 justify-content-center align-items-center"
  );

  let dessertContainer = document.createElement("div");
  let div = document.createElement("div");

  let dessertInfo = document.createElement("div");
  let dessertName = document.createElement("h4");
  let dessertIngredients = document.createElement("h6");
  let dessertDescription = document.createElement("p");
  let dessertBakery = document.createElement("p");

  let dessertFooter = document.createElement("div");
  let editDessertBtn = document.createElement("button");
  let deleteDessertBtn = document.createElement("button");

  div.setAttribute("class", "w-100 card");
  div.setAttribute("style", "margin-bottom: 12px");
  dessertInfo.setAttribute("class", "card-body");
  dessertName.setAttribute("class", "card-title");
  dessertIngredients.setAttribute("class", "card-subtitle mb-2 text-muted");
  dessertDescription.setAttribute("class", "card-text");
  dessertBakery.setAttribute("class", "card-text");
  dessertFooter.setAttribute("class", "card-footer");

  editDessertBtn.setAttribute("class", "btn btn-secondary");
  editDessertBtn.setAttribute("style", "margin-right: 8px");
  editDessertBtn.setAttribute("data-toggle", "modal");
  editDessertBtn.setAttribute("data-target", "#editDessertModal");

  editDessertBtn.addEventListener("click", function () {
    dessertBeingEdited = dessertObj.dessertID;
  });
  deleteDessertBtn.setAttribute("class", "btn btn-outline-danger");
  deleteDessertBtn.addEventListener("click", function () {
    deleteRequest("Dessert", dessertObj.dessertID).then(() => {
      document.getElementById("container").innerHTML = "";
      getDesserts();
    });
  });

  dessertName.innerHTML = dessertObj.dessertName;
  dessertIngredients.innerHTML =
    "Ingredients: " + dessertObj.dessertIngredients;
  dessertDescription.innerHTML = dessertObj.dessertDescription;

  getBakery(dessertObj.bakeryID).then((response) => {
    dessertBakery.innerHTML = "Available in " + response + " bakery";
  });

  editDessertBtn.innerHTML = "Edit dessert";
  deleteDessertBtn.innerHTML = "Delete dessert";

  dessertContainer.appendChild(div);
  div.appendChild(dessertInfo);

  dessertInfo.appendChild(dessertName);
  dessertInfo.appendChild(dessertIngredients);
  dessertInfo.appendChild(dessertDescription);
  dessertInfo.appendChild(dessertBakery);

  div.appendChild(dessertFooter);
  dessertFooter.appendChild(editDessertBtn);
  dessertFooter.appendChild(deleteDessertBtn);

  document.getElementById("container").appendChild(div);
}

async function putDessert(dessertID, name, ingredients, description, bakeryID) {
  let result = fetch(endPointRoot + "/dessert", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dessertID: dessertID,
      name: name,
      ingredients: ingredients,
      description: description,
      bakeryID: bakeryID,
    }),
  }).then((res) => {
    if (res.ok) {
      getDesserts();
      return res.json();
    }
  });
}

// ---------------------------------------EMPLOYEES--------------------------------------------
function viewEmployees() {
  getBakeryDictionary();

  let outerDiv = document.getElementById("outerDiv");
  outerDiv.setAttribute(
    "class",
    "row h-25 justify-content-center align-items-center"
  );

  document.getElementById("container").innerHTML = "";

  let employeeTitle = document.createElement("h2");
  employeeTitle.setAttribute("class", "text-success font-weight-bold");
  employeeTitle.innerHTML = "Employees";

  let button = document.createElement("BUTTON");
  button.innerHTML = "Add new employee";
  button.setAttribute("class", "w-100 btn btn-outline-success");
  button.setAttribute("style", "margin-bottom: 24px");
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#addEmployeeModal");

  let dessertBakeryId = document.getElementById("dessertBakeryID");
  let editDessertBakeryId = document.getElementById("editDessertBakeryID");
  let employeeBakeryId = document.getElementById("employeeBakeryID");
  let editEmployeeBakeryId = document.getElementById("editEmployeeBakeryID");

  dessertBakeryId.innerHTML = "";
  editDessertBakeryId.innerHTML = "";
  employeeBakeryId.innerHTML = "";
  editEmployeeBakeryId.innerHTML = "";

  for (bakery in allBakeries) {
    dessertBakeryId.innerHTML +=
      "<option value='" + bakery + "'>" + allBakeries[bakery] + "</option>";
    editDessertBakeryId.innerHTML +=
      "<option value='" + bakery + "'>" + allBakeries[bakery] + "</option>";
    employeeBakeryId.innerHTML +=
      "<option value='" + bakery + "'>" + allBakeries[bakery] + "</option>";
    editEmployeeBakeryId.innerHTML +=
      "<option value='" + bakery + "'>" + allBakeries[bakery] + "</option>";
  }

  document.getElementById("container").appendChild(employeeTitle);
  document.getElementById("container").appendChild(button);

  getEmployees();
}

function getEmployees() {
  (async () => {
    let result = await fetch(endPointRoot + "/employee")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        document.getElementById("container").innerHTML = "";

        for (let i = 0; i < res.length; i++) {
          generateEmployee(res[i]);
        }

        function editEmployee() {
          putEmployee(
            employeeBeingEdited,
            document.getElementById("editEmployeeFirstName").value,
            document.getElementById("editEmployeeLastName").value,
            document.getElementById("editEmployeeDescription").value,
            document.getElementById("editEmployeeRole").value,
            document.getElementById("editEmployeeBakeryID").value
          );
          let text = document.createElement("H1");
          text.innerHTML = "The employee was edited.";
          let employeeModal = document.getElementById("editEmployeeModalBody");
          employeeModal.append(text);

          setTimeout(function () {
            document.getElementById("editEmployeeFirstName").value = "";
            document.getElementById("editEmployeeLastName").value = "";
            document.getElementById("editEmployeeDescription").value = "";
            document.getElementById("editEmployeeRole").value = "";
            document.getElementById("editEmployeeBakeryID").value = "";
            text.innerHTML = "";
          }, 3000);
        }

        if (!employeeModalBtnListenersAdded) {
          document
            .getElementById("editEmployeeModalBtn")
            .addEventListener("click", editEmployee);
          employeeModalBtnListenersAdded = true;
        }
      });
  })();
}

function generateEmployee(employeeObj) {
  getBakeryDictionary();

  let outerDiv = document.getElementById("outerDiv");
  outerDiv.setAttribute(
    "class",
    "row h-25 justify-content-center align-items-center"
  );

  let employeeContainer = document.createElement("div");
  let div = document.createElement("div");

  let employeeInfo = document.createElement("div");
  let employeeName = document.createElement("h4");
  let employeeRole = document.createElement("h6");
  let employeeBakery = document.createElement("p");
  let employeeDescription = document.createElement("p");

  let employeeFooter = document.createElement("div");
  let editEmployeeBtn = document.createElement("button");
  let deleteEmployeeBtn = document.createElement("button");

  div.setAttribute("class", "w-100 card");
  div.setAttribute("style", "margin-bottom: 12px");
  employeeInfo.setAttribute("class", "card-body");
  employeeName.setAttribute("class", "card-title");
  employeeRole.setAttribute("class", "card-subtitle mb-2 text-muted");
  employeeBakery.setAttribute("class", "card-text");
  employeeDescription.setAttribute("class", "card-text");

  employeeFooter.setAttribute("class", "card-footer");
  editEmployeeBtn.setAttribute("class", "btn btn-secondary");
  editEmployeeBtn.setAttribute("style", "margin-right: 8px");
  deleteEmployeeBtn.setAttribute("class", "btn btn-outline-danger");

  employeeName.innerHTML = employeeObj.firstName + " " + employeeObj.lastName;
  employeeRole.innerHTML = employeeObj.role;
  getBakery(employeeObj.bakeryID).then((response) => {
    employeeBakery.innerHTML = "Works in " + response + " bakery";
  });
  employeeDescription.innerHTML = employeeObj.description;

  editEmployeeBtn.innerHTML = "Edit employee";
  deleteEmployeeBtn.innerHTML = "Delete employee";
  editEmployeeBtn.setAttribute("data-toggle", "modal");
  editEmployeeBtn.setAttribute("data-target", "#editEmployeeModal");
  editEmployeeBtn.addEventListener("click", function () {
    employeeBeingEdited = employeeObj.employeeID;
  });

  deleteEmployeeBtn.addEventListener("click", function () {
    deleteRequest("Employee", employeeObj.employeeID).then(() => {
      document.getElementById("container").innerHTML = "";
      getEmployees();
    });
  });

  employeeContainer.appendChild(div);
  div.appendChild(employeeInfo);

  employeeInfo.appendChild(employeeName);
  employeeInfo.appendChild(employeeRole);
  employeeInfo.appendChild(employeeBakery);
  employeeInfo.appendChild(employeeDescription);

  div.appendChild(employeeFooter);
  employeeFooter.appendChild(editEmployeeBtn);
  employeeFooter.appendChild(deleteEmployeeBtn);

  document.getElementById("container").appendChild(div);
}

async function putEmployee(
  id,
  firstName,
  lastName,
  description,
  role,
  bakeryID
) {
  let result = fetch(endPointRoot + "/employee", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      employeeID: id,
      firstName: firstName,
      lastName: lastName,
      description: description,
      role: role,
      bakeryID: bakeryID,
    }),
  }).then((res) => {
    if (res.ok) {
      getEmployees();
      return res.json();
    }
  });
}

// UNIVERSAL ---------------------------------- DELETE ALL ---------------------------------------------
async function deleteRequest(type, id) {
  let result = await fetch(endPointRoot + "/" + type, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: type,
      id: id,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
}
