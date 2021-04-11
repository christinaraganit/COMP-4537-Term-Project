const endPointRoot = "https://ashergum.com/Comp4537/termproject/API/V1";
const xhttp = new XMLHttpRequest();

function signUp(userName, password, email, isAdmin) {
  (async () => {
    let result = fetch(endPointRoot + "/user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
        email: email,
        isAdmin: isAdmin,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        // this shows visually that the data has been sent to the database
        console.log(isAdmin);
        if (isAdmin == 1) {
          window.location.href =
            "https://christinaraganit.live/comp4537/termproject/API/V1/admin-home.html";
        } else {
          window.location.href =
            "https://christinaraganit.live/comp4537/termproject/API/V1/client-home.html";
        }
      });
  })();
}

async function login(userName, password) {
  const result = await fetch(endPointRoot + "/user/?username=" + userName)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      if (password == res[0].uPassword) {
        //login
        if (res[0].isAdmin == 1) {
          //admin
          window.location.href =
            "https://christinaraganit.live/comp4537/termproject/API/V1/admin-home.html";
        } else {
          //client
          window.location.href =
            "https://christinaraganit.live/comp4537/termproject/API/V1/client-home.html";
        }
      } else {
        document.getElementById("errorMessage").innerHTML =
          "Your login credentials were incorrect.";
      }
    });
}

function logout() {
  window.location.href =
    "https://christinaraganit.live/comp4537/termproject/API/V1/login.html";
}
