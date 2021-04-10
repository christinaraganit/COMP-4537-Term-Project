// ---------------------------------------------BAKERY POST---------------------------------------------
function postBakery(name, location, manager, description) {
  (async () => {
    let result = fetch(endPointRoot + "/bakery", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        location: location,
        manager: manager,
        description: description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        // this shows visually that the data has been sent to the database
        let text = document.createElement("H1");
        text.innerHTML = "The bakery was added.";
        let bakeryModal = document.getElementById("bakeryModal");
        bakeryModal.append(text);
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        const yourFunction = async () => {
          await delay(2000);
          text.style.display = "none";
          getBakeries();
        };
        yourFunction();
      });
  })();
}

// ---------------------------------------------DESSERT POST---------------------------------------------
function postDessert(name, ingredients, description, bakeryID) {
  (async () => {
    let result = fetch(endPointRoot + "/dessert", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        ingredients: ingredients,
        description: description,
        bakeryID: bakeryID,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        // this shows visually that the data has been sent to the database
        let text = document.createElement("H1");
        text.innerHTML = "The dessert was added.";
        let dessertModal = document.getElementById("dessertModal");
        dessertModal.append(text);
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        const yourFunction = async () => {
          await delay(2000);
          text.style.display = "none";
          getDesserts();
        };
        yourFunction();
      });
  })();
}

// --------------------------------------------EMPLOYEE POST---------------------------------------------
function postEmployee(firstName, lastName, description, role, bakeryID) {
  (async () => {
    let result = fetch(endPointRoot + "/employee", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        role: role,
        description: description,
        bakeryID: bakeryID,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        // this shows visually that the data has been sent to the database
        let text = document.createElement("H1");
        text.innerHTML = "The employee was added.";
        let employeeModal = document.getElementById("employeeModal");
        employeeModal.append(text);

        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        const yourFunction = async () => {
          await delay(2000);
          text.style.display = "none";
          getEmployees();
        };
        yourFunction();
      });
  })();
}

// -----------------------------------------------EMPLOYEE PUT-----------------------------------------
function putEmployee(
  firstName,
  lastName,
  description,
  role,
  bakeryID,
  emeployeeID
) {
  (async () => {
    let result = fetch(endPointRoot + "/employee", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emeployeeID: emeployeeID,
        firstName: firstName,
        lastName: lastName,
        role: role,
        description: description,
        bakeryID: bakeryID,
      }),
    })
      .then((res) => {
        console.log(res.json());
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        // this shows visually that the data has been sent to the database
        let text = document.createElement("H1");
        text.innerHTML = "The employee was edited.";
        let employeeModal = document.getElementById("editEmployeeModalBody");
        employeeModal.append(text);

        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        const yourFunction = async () => {
          await delay(2000);
          text.style.display = "none";
          getEmployees();
        };
        yourFunction();
      });
  })();
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
