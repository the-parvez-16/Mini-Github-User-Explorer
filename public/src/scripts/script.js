const URL = "https://api.github.com/users/";
let usrname = "";

function getData(){
    return fetch(URL+usrname+"/repos?sort=updated&per_page=5");
}

async function consumeData(){
    try {
        let data = await getData();
        let repos = await data.json();

        console.log(repos['0'].owner);

        console.log(repos);
    } catch (err) {
        console.debug(err);
    }
}

document.querySelector("#search").addEventListener("click",()=>{
    usrname = document.getElementById("usrname").value;
    console.log(usrname);
    consumeData(usrname);
});