const container = document.querySelector('.container');

const data = [
    {
        id: 0,
        title: 'count down',
        des:'an app used for counting time until 2023',
        img: '/images/count-app.png',
        url: 'https://daria2023.github.io/vanilla-JS-projects/01-count-down/',
    },{ 
        id: 1,
        title: 'quiz app',
        des:'app used for take a quick quiz and get score',
        img: '/images/quiz-app.png',
        url: 'https://daria2023.github.io/vanilla-JS-projects/02-quiz-app/',   
    },{ 
        id: 2,
        title: 'recipt app',
        des:'using public api to get a random recipt and search for the specific item',
        img: '/images/recipt-app.png',
        url: 'https://daria2023.github.io/vanilla-JS-projects/03-receipt-mobile-app/',   
    },{ 
        id: 3,
        title: 'note app',
        des:'an app can create multiple notes that can display in markdown and store in localstorage',
        img: '/images/note-app.png',
        url: 'https://daria2023.github.io/vanilla-JS-projects/04-note/',   
    },{ 
        id: 4,
        title: 'todo list',
        des:'an todo app that can show what to complete today and how many left',
        img: '/images/todo-app.png',
        url: 'https://daria2023.github.io/vanilla-JS-projects/05-todo-list/',   
    },{ 
        id: 5,
        title: 'douban movie',
        des:'using douban API to fetch movie data and show the overview',
        img: '/images/movie-app.png',
        url: 'https://daria2023.github.io/vanilla-JS-projects/06-douban-movie/',   
    },{ 
        id: 6,
        title: 'github user',
        des:'an little app to search for the specific github user and their 10 most started repos',
        img: '/images/github-page.png',
        url: 'https://daria2023.github.io/vanilla-JS-projects/07-github-page/',   
    },{ 
        id: 7,
        title: 'drawing app',
        des:'an app using html canvas to draw ',
        img: '/images/draw-app.png',
        url: 'https://daria2023.github.io/vanilla-JS-projects/08-drawing-app/',   
    },{ 
        id: 8,
        title: 'password generator',
        des:'using random functions generate random strongly password',
        img: '/images/password-app.png',
        url: 'https://daria2023.github.io/vanilla-JS-projects/09-password-generator/',   
    },
]

data.map(project => {
    let projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    projectDiv.innerHTML = `
    <a href=${project.url}><img src=${project.img} alt=${project.title}/></a>
    <div class='project-info'>
        <h4>${project.title}</h4>
    </div>
    `
    container.appendChild(projectDiv);
})