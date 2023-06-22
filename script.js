const searchField = document.querySelector('.search-field');
const searchIcon = document.querySelector('.search-icon');
const profileBox = document.querySelector('.profile-box');
const profilePic = document.querySelector('.profile-pic');
const displayName = document.querySelector('.name');
const userName = document.querySelector('.username');
const userBio = document.querySelector('.bio');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');
const repos = document.querySelector('.repos');
const reposList = document.querySelector('.repos-list');
const repo = document.querySelector('.repo');
const repoBtn = document.querySelector('.repo-btn');



const apiUrl = "https://api.github.com/users/";
const repoUrl = "https://api.github.com/users/the-soban/repos";

async function loadUser(username){
        const response = await fetch(apiUrl + username);
        const responseData = await response.json();

        createUser(responseData);
        loadRepos(username);

}

async function loadRepos(username){
        const response = await fetch(apiUrl + username + '/repos');
        const responseData = await response.json();

        addRepos(responseData);
}

function createUser(user){
    profileBox.style.display = 'flex';
    profilePic.src = `${user.avatar_url}`;
    displayName.innerText = `${user.name}`;
    userName.innerText = `@${user.login}`;
    userName.href = `${user.html_url}`;
    if(user.bio !== null){
        userBio.innerText = `${user.bio}`;
    } else if(user.bio == null){
        userBio.innerText = `No Bio Found`;
    }
    followers.innerText = `${user.followers}`;
    following.innerText = `${user.following}`;
    following.repos = `${user.public_repos}`;
    repoBtn.style.display = 'inline';
    repoBtn.href = `${user.html_url}?tab=repositories`;
}

searchIcon.addEventListener('click', (e) => {
    e.preventDefault();

    const user = searchField.value;
    if(user){
        loadUser(user);
        searchField.value = "";
    }
});

searchField.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        e.preventDefault();
        searchIcon.click();
    }
});

function addRepos(repos){

    while(reposList.hasChildNodes()){
            reposList.removeChild(reposList.firstChild);
        }

    repos.slice(0, 10).forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = `${repo.html_url}`;
        repoEl.target = `_blank`;
        repoEl.innerText = `${repo.name}`;

        reposList.appendChild(repoEl);
    });

    const seeAll = document.createElement('a');
    seeAll.target = `_blank`;
    seeAll.href = `${repos.owner.repos_url}`;
    reposList.appendChild(seeAll);

}