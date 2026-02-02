const URL = "https://api.github.com/users/";
let usrname = "";

function getData(){
    return fetch(URL+usrname+"/repos?sort=updated&per_page=5");
}

async function consumeData(){
    try {
        let data = await getData();
        let repos = await data.json();

        let profile = repos[0].owner;
        let pfp = profile.avatar_url;
        let github_url = profile.html_url;

        let followers = await getFollowers(profile.follower);
        console.log(repos);
        repos.forEach(repo => {
            let repo_name = repo.name;
            let repo_url = repo.html_url;
            let repo_description = repo.description;

            console.log(repo_name);
            console.log(repo_url);
            console.log(repo_description);
            console.log();
        });
    } catch (err) {
        console.debug(err);
    }
}

function fillProfileDetails(){

}

function fillRepositories(){
    
}

document.querySelector("#search").addEventListener("click",()=>{
    usrname = document.getElementById("usrname").value;
    console.log(usrname);
    consumeData(usrname);
});