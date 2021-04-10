// ---------------------------------------------BAKERY POST---------------------------------------------
function getBakeryDetails() {
  let bakeryName = "";
  let bakeryLocation = "";
  let bakeryManager = "";
  let bakeryDescription = "";

  bakeryName = document.getElementById("bakeryName").value;
  bakeryLocation = document.getElementById("bakeryLocation").value;
  bakeryManager = document.getElementById("bakeryManager").value;
  bakeryDescription = document.getElementById("bakeryDescription").value;

  postBakery(bakeryName, bakeryLocation, bakeryManager, bakeryDescription);
}

function postBakery(name, location, manager, description) {
  (async () => {
    let result = fetch(endPointRoot + "/bakery", {
      method: "post",
      headers: { "Content-Type": "application/json" },
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
          stats();
        };
        yourFunction();
      });
  })();
}

// ---------------------------------------------DESSERT POST---------------------------------------------
function getDessertDetails() {}

function postDessert() {}

// --------------------------------------------EMPLOYEE POST---------------------------------------------
function getEmployeeDetails() {}

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
        text.innerHTML = "sent";
        let body = document.getElementById("content");
        body.append(text);
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        const yourFunction = async () => {
          await delay(2000);
          text.style.display = "none";
          getBakeries();
          stats();
        };
        yourFunction();
      });
  })();
}
