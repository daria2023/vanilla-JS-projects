const form = document.querySelector(".form");
const input = document.querySelector(".search-input");
const moviesArea = document.querySelector(".movies");
const container = document.querySelector(".container");
const loader = document.querySelector(".loader");

const API_KEY = "api_key=8291278148d144f4fb1e19c044ceafe3";

const popularityURL =
  "https://api.wmdb.tv/api/v1/top?type=Douban&skip=0&limit=250&lang=Cn";
const searchURL = "https://api.wmdb.tv/api/v1/movie/search?lang=Cn&q=";

let page = 0;

const fetchData = async (url) => {
  loader.classList.add("show");
  container.innerHTML = "";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const splitedMovies = splitPages(data);
    renderSplitedMovies(splitedMovies,page);
    loader.classList.remove("show");
  } catch (error) {
    console.log(error);
    loader.classList.remove("show");
  }
};

const listMovie = (movies) => {
  if (movies.length === 0) {
    let errorDiv = document.createElement("div");
    errorDiv.classList.add("err");
    errorDiv.innerHTML = `
        <h3>Oops, no movie fetched your query!</h3>
        `;
    moviesArea.appendChild(errorDiv);
  }
  movies?.map((movie) => {
    let { doubanRating: vote, doubanId: id } = movie;
    let { poster: image, description: overview, name: title } = movie.data[0];
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.innerHTML = `
            <a href='https://movie.douban.com/subject/${id}/'><img src=${image} alt='poster'/></a>
                <div class='info'>
                <h4>${title}</h4>
                <span class=${decideColor(vote)}>${vote}</span>
                </div>
            <div class='overview'>${overview}</div> `;
    container.appendChild(movieDiv);
  });
};

function decideColor(num) {
  if (num >= 8) {
    return "green";
  } else if (num >= 6) {
    return "orange";
  } else {
    return "red";
  }
}


function splitPages(movies) {
  let moviesPerPage = 50;
  let pages = Math.ceil (movies.length / moviesPerPage);
  let newMovies = Array.from({length: pages},(_, index) => {
    let start = index * moviesPerPage;
    return movies.slice(start, start + moviesPerPage);
  })
  return newMovies;
}

function renderSplitedMovies(movies,page) {

  listMovie(movies[page]);
  let btnsDiv = document.createElement('div');
  btnsDiv.classList.add('btns');
  
  movies.map((movie,idx)=> {
    let pageBtn = document.createElement('button');
    pageBtn.classList.add('page-btn');
    pageBtn.innerHTML = `${idx + 1}`;
    
    btnsDiv.appendChild(pageBtn);
  })
  const pageBtns = btnsDiv.querySelectorAll('.page-btn')
  checkBtnActive(pageBtns,page);

  pageBtns.forEach(btn => {
    btn.addEventListener('click',()=>{      
      page = +(btn.innerHTML) - 1;
      container.innerHTML = '';
      listMovie(movies[page]);
      checkBtnActive(pageBtns,page);
    })
  })
  document.body.appendChild(btnsDiv);
}

function checkBtnActive(btns,page) {
  btns.forEach(btn => {
    if(+btn.innerHTML === page + 1) {
      btn.classList.add('active');
    } else {btn.classList.remove('active')}
  })
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  let term = input.value;
  fetchData(searchURL + term);
  input.value = "";
  document.querySelector('.btns').innerHTML = '';
});

fetchData(popularityURL);
