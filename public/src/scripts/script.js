const URL = "https://api.github.com/users/";
let usrname = "";

function getProfile() {
    return fetch(URL + usrname);
}

function getRepositories() {
    return fetch(URL + usrname + "/repos?sort=updated&per_page=5");
}

async function consumeData() {
    try {
        let pf = await getProfile();
        let profile = await pf.json();
        fillProfileDetails(profile);

        let repos = await getRepositories();
        let repositories = await repos.json();

        console.log(repositories);
        let ul = document.createElement("ul");

        repositories.forEach(repo => {
            ul.appendChild(fillRepository(repo));
            ul.innerHTML+="<hr>";
        });
        let repoSection = document.getElementById("repoSection");
        repoSection.innerHTML = '<h3 class="ps-4" style="text-decoration: underline;">Repositories :</h3>';
        repoSection.appendChild(ul);
        repoSection.style.display = "block";
    } catch (err) {

        console.debug(err);
    }
}

function fillProfileDetails(profile) {
    document.getElementById("profile_url").href = profile.html_url;
    document.querySelector("#pfp").src = profile.avatar_url ? profile.avatar_url : "public/images/avatar.jpg";
    document.querySelector("#username").textContent = profile.name;
    document.querySelector("#bio").textContent = profile.bio;
    document.querySelector("#followers").textContent = "followers " + profile.followers;
    document.querySelector("#following").textContent = "following " + profile.following;

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

document.querySelector("#search").addEventListener("click", () => {
    usrname = document.getElementById("usrname").value;
    console.log(usrname);
    consumeData();
});