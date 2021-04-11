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
          isAdmin: isAdmin
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(() => {
          // this shows visually that the data has been sent to the database



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
          
      });

  }

