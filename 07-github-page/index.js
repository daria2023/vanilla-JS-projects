

const form = document.querySelector('.form');
const input = document.querySelector('.input');

const container = document.querySelector(".container")

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetchUser(input.value);
    fetchRepos(input.value);
    input.value='';
})

async function fetchUser(q) {
    try {
        const response = await fetch('https://api.github.com/users/'+ q);
        const data = await response.json();
        container.innerHTML = ''
        renderUser(data);
    } catch (error) {
        console.log(error);
    }
}
async function fetchRepos(q) {
    try {
        const response = await fetch('https://api.github.com/users/'+ q + '/repos');
        const data = await response.json();
        renderRepos(data);
    } catch (error) {
        console.log(error);
    }
}

function renderUser(user){
    let {avatar_url: image, name,bio,public_repos:repos,followers,following} = user;
    let userDiv = document.createElement('div');
    userDiv.classList.add('user');
    userDiv.innerHTML = `
    <div class="user-avatar">
        <img src=${image} alt='avatar'/>
    </div>
    <div class="user-info">
        <h3 class='user-name'>${name}</h3>
        <p class='user-bio'>${bio}</p>
        <ul class='user-data'>
            <li>${repos}<span class='tag'> repos</span></li>
            <li>${followers}<span class='tag'> followers</span></li>
            <li>${following}<span class='tag'> following</span></li>
        </ul>
        <div class='repos'>
            <h4>repos</h4>
        </div>
    </div>
    `
    container.appendChild(userDiv);
}


function renderRepos(repos) {
    const reposDiv = document.querySelector('.repos');
    let repoLs = document.createElement('div');
    repoLs.classList.add('repo-ls')
    repos.
    sort((a,b)=>(b.stargazers_count - a.stargazers_count))
    .slice(0,10).map(repo => {
        let repoLi = document.createElement('span');
        repoLi.innerHTML = `<a href=${repo.html_url}>${repo.name}</a>`;
        repoLs.appendChild(repoLi);
    })
    reposDiv.appendChild(repoLs);
}