const endPointRoot = "https://ashergum.com/Comp4537/termproject/API/V1";
const xhttp = new XMLHttpRequest();



function putRequest(id, firstName, lastName, description, role, bakeryID){
  (async() => {
      let result = fetch(endPointRoot + "/employee", {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              employeeID: id,
              firstName: firstName,
              lastName: lastName,
              description: description,
              role: role,
              bakeryID: bakeryID
          })
      }).then((res) => {
          if (res.ok) {
              return res.json();
          }
      })
  })();
}