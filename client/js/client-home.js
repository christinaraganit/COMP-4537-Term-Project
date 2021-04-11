const endPointRoot = "https://ashergum.com/Comp4537/termproject/API/V1";
const xhttp = new XMLHttpRequest();

function logout() {
  window.location.href =
    "https://christinaraganit.live/comp4537/termproject/API/V1/login.html";
}

// ---------------------------------------BAKERIES--------------------------------------------
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

        let bakeryTitle = document.createElement("h2");
        bakeryTitle.setAttribute("class", "text-primary font-weight-bold");
        bakeryTitle.innerHTML = "Bakeries";

        document.getElementById("container").appendChild(bakeryTitle);
        for (let i = 0; i < res.length; i++) {
          generateBakery(res[i]);
        }
      });
  })();
}

function addBakery() {}

function generateBakery(bakeryObj) {
  let outerDiv = document.getElementById("outerDiv");
  outerDiv.setAttribute(
    "class",
    "row h-25 justify-content-center align-items-center"
  );

  let bakeryContainer = document.createElement("div");
  let div = document.createElement("div");
  let bakeryInfo = document.createElement("div");
  let bakeryName = document.createElement("h4");
  let bakeryLocation = document.createElement("h6");
  let bakeryManager = document.createElement("p");
  let bakeryDescription = document.createElement("p");
  let bakeryFooter = document.createElement("div");
  div.setAttribute("class", "w-100 card");
  div.setAttribute("style", "margin-bottom: 12px");
  bakeryInfo.setAttribute("class", "card-body");
  bakeryName.setAttribute("class", "card-title");
  bakeryLocation.setAttribute("class", "card-subtitle mb-2 text-muted");
  bakeryFooter.setAttribute("class", "card-footer");
  bakeryManager.setAttribute("class", "card-text");

  bakeryName.innerHTML = bakeryObj.bakeryName;
  bakeryLocation.innerHTML = bakeryObj.bakeryLocation;
  bakeryManager.innerHTML = "Managed by " + bakeryObj.bakeryManager;
  bakeryDescription.innerHTML = bakeryObj.bakeryDescription;

  bakeryContainer.appendChild(div);
  div.appendChild(bakeryInfo);
  div.appendChild(bakeryFooter);
  bakeryInfo.appendChild(bakeryName);
  bakeryInfo.appendChild(bakeryLocation);
  bakeryInfo.appendChild(bakeryManager);
  bakeryFooter.appendChild(bakeryDescription);

  document.getElementById("container").appendChild(div);
}

// ---------------------------------------DESSERTS--------------------------------------------
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

        let dessertTitle = document.createElement("h2");
        dessertTitle.setAttribute("class", "text-info font-weight-bold");
        dessertTitle.innerHTML = "Desserts";

        document.getElementById("container").appendChild(dessertTitle);
        for (let i = 0; i < res.length; i++) {
          generateDessert(res[i]);
        }
      });
  })();
}

async function getBakery(value) {
  let bakeryName = "";
  const result = await fetch(endPointRoot + "/bakery/?id=" + value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      console.log(res);
      console.log(res[0].bakeryName);
      bakeryName = res[0].bakeryName;
      return res[0].bakeryName;
    });
  console.log("getBakery bakeryName" + bakeryName);
  return bakeryName;
}

function generateDessert(dessertObj) {
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

  div.setAttribute("class", "w-100 card");
  div.setAttribute("style", "margin-bottom: 12px");
  dessertInfo.setAttribute("class", "card-body");
  dessertName.setAttribute("class", "card-title");
  dessertIngredients.setAttribute("class", "card-subtitle mb-2 text-muted");
  dessertBakery.setAttribute("class", "card-text");
  dessertFooter.setAttribute("class", "card-footer");

  dessertName.innerHTML = dessertObj.dessertName;
  dessertIngredients.innerHTML =
    "Ingredients: " + dessertObj.dessertIngredients;
  dessertDescription.innerHTML = dessertObj.dessertDescription;
  dessertDescription.setAttribute("class", "card-text");

  getBakery(dessertObj.bakeryID).then((response) => {
    dessertBakery.innerHTML = "Available in " + response + " bakery";
  });

  console.log("Generate dessert " + dessertObj.bakeryID);
  console.log("Generate dessert " + getBakery(dessertObj.bakeryID));

  dessertContainer.appendChild(div);
  div.appendChild(dessertInfo);
  div.appendChild(dessertFooter);

  dessertInfo.appendChild(dessertName);
  dessertInfo.appendChild(dessertIngredients);
  dessertInfo.appendChild(dessertBakery);
  dessertFooter.appendChild(dessertDescription);
  document.getElementById("container").appendChild(div);
}

// ---------------------------------------EMPLOYEES--------------------------------------------
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

        let employeeTitle = document.createElement("h2");
        employeeTitle.setAttribute("class", "text-success font-weight-bold");
        employeeTitle.innerHTML = "Employees";

        document.getElementById("container").appendChild(employeeTitle);
        for (let i = 0; i < res.length; i++) {
          generateEmployee(res[i]);
        }
      });
  })();
}

function generateEmployee(employeeObj) {
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

  div.setAttribute("class", "w-100 card");
  div.setAttribute("style", "margin-bottom: 12px");
  employeeInfo.setAttribute("class", "card-body");
  employeeName.setAttribute("class", "card-title");
  employeeRole.setAttribute("class", "card-subtitle mb-2 text-muted");
  employeeDescription.setAttribute("class", "card-text");
  employeeFooter.setAttribute("class", "card-footer");

  employeeName.innerHTML = employeeObj.firstName + " " + employeeObj.lastName;
  employeeRole.innerHTML = employeeObj.role;
  getBakery(employeeObj.bakeryID).then((response) => {
    employeeBakery.innerHTML = "Works in " + response + " bakery";
  });

  employeeBakery.setAttribute("class", "card-text");
  employeeDescription.setAttribute("class", "card-text");
  employeeDescription.innerHTML = employeeObj.description;

  employeeContainer.appendChild(div);
  div.appendChild(employeeInfo);
  div.appendChild(employeeFooter);

  employeeInfo.appendChild(employeeName);
  employeeInfo.appendChild(employeeRole);
  employeeInfo.appendChild(employeeBakery);
  employeeFooter.appendChild(employeeDescription);
  document.getElementById("container").appendChild(div);
}

function getStats() {
  (async () => {
    let result = await fetch(endPointRoot + "/stats")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        document.getElementById("container").innerHTML = "";

        let statsTitle = document.createElement("h2");
        statsTitle.setAttribute("class", "text-secondary font-weight-bold");
        statsTitle.innerHTML = "Statistics";

        document.getElementById("container").appendChild(statsTitle);

        generateStatsTable();

        for (let i = 0; i < res.length; i++) {
          generateStats(res[i]);
        }
      });
  })();
}

function generateStatsTable() {
  let outerDiv = document.getElementById("outerDiv");
  outerDiv.setAttribute(
    "class",
    "row h-25 justify-content-center align-items-center"
  );

  let statsTable = document.createElement("table");
  statsTable.setAttribute(
    "class",
    "table table-bordered table-striped table-responsive"
  );

  let statsTableHead = document.createElement("thead");
  statsTableHead.setAttribute("class", "thead-dark");

  let statsTableHeadRow = document.createElement("tr");
  let statsTableHeading1 = document.createElement("th");
  let statsTableHeading2 = document.createElement("th");
  let statsTableHeading3 = document.createElement("th");
  let statsTableHeading4 = document.createElement("th");
  let statsTableHeading5 = document.createElement("th");
  let statsTableBody = document.createElement("tbody");
  statsTableBody.setAttribute("id", "statsTableBody");

  statsTableHeading1.innerHTML = "Endpoint";
  statsTableHeading1.setAttribute("class", "w-100");

  statsTableHeading2.innerHTML = "GET";
  statsTableHeading3.innerHTML = "POST";
  statsTableHeading4.innerHTML = "PUT";
  statsTableHeading5.innerHTML = "DELETE";

  statsTable.appendChild(statsTableHead);
  statsTable.appendChild(statsTableBody);
  statsTableHeadRow.appendChild(statsTableHeading1);
  statsTableHeadRow.appendChild(statsTableHeading2);
  statsTableHeadRow.appendChild(statsTableHeading3);
  statsTableHeadRow.appendChild(statsTableHeading4);
  statsTableHeadRow.appendChild(statsTableHeading5);
  statsTableHead.appendChild(statsTableHeadRow);

  document.getElementById("container").appendChild(statsTable);
}

function generateStats(statsObj) {
  let statsTableBody = document.getElementById("statsTableBody");

  let statsTableRow = document.createElement("tr");
  let statsTableHead = document.createElement("th");
  statsTableHead.setAttribute("scope", "row");
  statsTableHead.setAttribute("class", "w-100");

  let statsTableDetail1 = document.createElement("td");
  let statsTableDetail2 = document.createElement("td");
  let statsTableDetail3 = document.createElement("td");
  let statsTableDetail4 = document.createElement("td");

  statsTableHead.innerHTML = statsObj.Endpoint;
  statsTableDetail1.innerHTML = statsObj.GET_stat;
  statsTableDetail2.innerHTML = statsObj.POST_stat;
  statsTableDetail3.innerHTML = statsObj.PUT_stat;
  statsTableDetail4.innerHTML = statsObj.DELETE_stat;

  statsTableRow.appendChild(statsTableHead);
  statsTableRow.appendChild(statsTableDetail1);
  statsTableRow.appendChild(statsTableDetail2);
  statsTableRow.appendChild(statsTableDetail3);
  statsTableRow.appendChild(statsTableDetail4);

  statsTableBody.appendChild(statsTableRow);
}
