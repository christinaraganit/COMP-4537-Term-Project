const endPointRoot = "https://ashergum.com/Comp4537/termproject/API/V1"
const xhttp = new XMLHttpRequest();

// post request for bakery
function postBakery(name, location, manager, description){
    (async() => {
        let result = fetch(endPointRoot, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                type: "Bakery",
                name: name,
                location: location,
                manager: manager,
                description: description
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then(() => {
            // this shows visually that the data has been sent to the database
            let text = document.createElement("H1");
            text.innerHTML = "sent";
            let body = document.getElementById("content")
            body.append(text);
            const delay = ms => new Promise(res => setTimeout(res, ms));
            const yourFunction = async () => {
                await delay(2000);
                text.style.display = "none";
                getBakeries();
                stats();
            }
            yourFunction();
        })
    })();
}

function stats() {
    (async() => {
        let result = await fetch(endPointRoot + "/stats").then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((res) => {
            document.getElementById("stats").innerHTML = "";
            for(let i = 0; i < res.length; i++){
                generateStats(res[i]);
            }
        })
    })();
}


function getBakeries () {
    (async() => {
        let result = await fetch(endPointRoot).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((res) => {
            document.getElementById("container").innerHTML = "";
            for(let i = 0; i < res.length; i++){
                generateBakery(res[i]);
            }
        })
    })();
}

function generateBakery(bakeryObj){
    let aside = document.createElement("aside");
    //Name of Bakery
        let info_column1 = document.createElement("div");
        info_column1.className = "info_column";
            let label1 = document.createElement("p");
            label1.innerHTML = "Name of Bakery";
            label1.className = "label";
            let item1 = document.createElement("p");
            item1.className = "item";
            item1.innerHTML = bakeryObj.bakeryName;

    document.getElementById("container").append(aside);
    aside.append(info_column1);
    info_column1.append(label1);
    info_column1.append(item1);

    //Location of Bakery
        let info_column2 = document.createElement("div");
        info_column2.className = "info_column";
            let label2 = document.createElement("p");
            label2.innerHTML = "Location of Bakery";
            label2.className = "label";
            let item2 = document.createElement("p");
            item2.className = "item";
            item2.innerHTML = bakeryObj.bakeryLocation;

    aside.append(info_column2);
    info_column2.append(label2);
    info_column2.append(item2);

    //Manager of Bakery
        let info_column3 = document.createElement("div");
        info_column3.className = "info_column";
            let label3 = document.createElement("p");
            label3.innerHTML = "Manager of Bakery";
            label3.className = "label";
            let item3 = document.createElement("p");
            item3.className = "item";
            item3.innerHTML = bakeryObj.bakeryManager;


    aside.append(info_column3);
    info_column3.append(label3);
    info_column3.append(item3);

    //Description of Bakery
        let info_column4 = document.createElement("div");
        info_column4.className = "info_column";
            let label4 = document.createElement("p");
            label4.innerHTML = "Description of Bakery";
            label4.className = "label";
            let item4 = document.createElement("p");
            item4.className = "item";
            item4.innerHTML = bakeryObj.bakeryDescription;

    aside.append(info_column4);
    info_column4.append(label4);
    info_column4.append(item4);
        
}

function generateStats(statsObj){
    let stats = document.getElementById("stats");
    console.log(statsObj);
    let text1 = document.createElement("p");
    let text2 = document.createElement("p");
    let text3 = document.createElement("p");
    let text4 = document.createElement("p");
    let text5 = document.createElement("p");
    
    text1.innerHTML = statsObj.Endpoint;
    stats.append(text1);
        
    text2.innerHTML = statsObj.GET_stat;
    stats.append(text2);
        
    text3.innerHTML = statsObj.POST_stat;
    stats.append(text3);
        
    text4.innerHTML = statsObj.PUT_stat;
    stats.append(text4);
        
    text5.innerHTML = statsObj.DELETE_stat;
    stats.append(text5);
}



getBakeries();
stats();
