const URL = "https://api.github.com/users/";
let usrname = "";

function getProfile() {
    return fetch(URL + usrname);
}

function getRepositories() {
    return fetch(URL + usrname + "/repos?sort=updated&per_page=5");
}

async function consumeData() {
    let repoSection = document.getElementById("repoSection");
    let loader = document.getElementById('loader');
    let errSection = document.getElementById('errSection');
    errSection.style.display = "none";
    loader.style.display = "flex";
    try {

        let pf = await getProfile();
        if(!pf.ok){
            let error;
            if(pf.status=="404"){
                error = new Error("User Not Found")
            }else{
                const errorData = await pf.json();
                error = new Error(errorData.message || "Unknown Error");
            }
            error.status = pf.status;
            throw error;
        }

        let profile = await pf.json();

        let repos = await getRepositories();
        if (!repos.ok) throw new Error("Could not fetch repositories.");
        let repositories = await repos.json();

        fillProfileDetails(profile);

        let ul = document.createElement("ul");

        repositories.forEach(repo => {
            ul.appendChild(fillRepository(repo));
            ul.innerHTML += "<hr>";
        });

        repoSection.innerHTML = '<h3 class="ps-4" style="text-decoration: underline;">Repositories :</h3>';
        repoSection.appendChild(ul);
        repoSection.style.display = "block";

    } catch (err) {
        document.getElementById("status").textContent = err.status;
        document.getElementById("errMsg").textContent = err.message;

        errSection.style.display = "block";
        repoSection.style.display = "none";
        document.getElementById("profileSection").style.display = "none";
        console.debug(err);
    } finally {
        loader.style.display = "none";
    }
}

function fillProfileDetails(profile) {
    document.getElementById("profile_url").href = profile.html_url;
    document.querySelector("#pfp").src = profile.avatar_url ? profile.avatar_url : "public/images/avatar.jpg";
    document.querySelector("#username").textContent = profile.name;
    document.querySelector("#bio").textContent = profile.bio;
    document.querySelector("#followers").textContent = "followers " + (profile.followers ? profile.followers : 0);
    document.querySelector("#following").textContent = "following " + (profile.following ? profile.following : 0);

    document.getElementById("profileSection").style.display = "flex";
}

function fillRepository(repo) {
    let li = document.createElement('li');
    li.className = "d-flex py-4 px-3 rounded repo";

    li.innerHTML = `
        <div>
            <div><h3><a href="${repo.html_url}">${repo.name}</a></h3></div>

            <div><p>${repo.description}</p></div>

            <div class="mt-2 position-relative">
                <span>
                    <span class="repo-language-color" style="background-color: #e34c26" ></span>
                    <span id="language">${repo.language}</span>
                </span>

                &nbsp;&nbsp;Updated on <span>${repo.updated_at}</span>
            </div>
        </div>
    `;

    return li;
}

document.getElementById("usrname").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        search();
    }
});

document.querySelector("#search").addEventListener("click",search);

function search(){
    usrname = document.getElementById("usrname").value;
    consumeData();
}