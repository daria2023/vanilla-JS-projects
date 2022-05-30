const searchForm = document.querySelector('.search-bar');
const searchInput = document.querySelector('.search-input');
const container = document.querySelector('.container');
const favContainer = document.querySelector('.fav-items');

let searchTerm = '';

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchTerm = searchInput.value;
    searchItems(searchTerm);
    searchInput.value=''; 
})

fetchRandomData();
renderFavs();

async function fetchRandomData() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    renderItem(data.meals[0],'random receipt');
}

async function searchItems(query){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    let searchResults = data.meals;
    renderItems(searchResults,query);
}

function renderItems(items,query) {
    if(!items){
        container.innerHTML = `
        <h3>Sorry! No matching for your search items!</h3>  `
    } else {
         container.innerHTML = ``;
        items.map(item => { 
            renderItem(item,query + ' receipt');
        })
    }
}

function renderItem(item,type) {
    const {
        idMeal:id,
        strMeal:name,
        strMealThumb:img,
        strCategory:category,
        strInstructions:instruction,
    } = item;

    let itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `
        <div class='img-container'>
        <p class='tag'>${type}</p>
        <img src=${img} alt=${name} class='item-photo'>
        </div>
        <footer class='item-info'>
        <h4 class='item-name'>${name}</h4>
        <button class='fav-btn' id=${id}>collect now</button>
        </footer>   
    `
    container.appendChild(itemDiv);
    let renderItem = {id,name,img,category}
    changeFav(renderItem)
}

function changeFav(item) {
    let btns = document.querySelectorAll('.fav-btn');
    btns.forEach((btn)=> {
        if(item.id === btn.id) {
            btn.addEventListener('click',()=>{
            btn.classList.toggle('favo');
            if(btn.classList.contains('favo')) {
                btn.innerHTML = 'collected';
                addFav(btn,item)
            } else {
                btn.innerHTML = 'collect now';
                removeFav(btn,item);
        }
    })}        
    })   
}

function addFav(btn,item) {
    let favItems = getFavItems();
    localStorage.setItem('fav',JSON.stringify([...favItems,item]));
    renderFavs();
}
function removeFav(btn,item) {
    let favItems = getFavItems();
    localStorage.setItem('fav',JSON.stringify([...favItems.filter(favitem => favitem.id !== btn.id)]));
    renderFavs();
}

function renderFavs() {
    let favItems = getFavItems();
   console.log(favItems);
   if(favItems.length === 0) {
       favContainer.innerHTML = `
        <h3>Sorry, no favorite collections yet, add now!</h3>
        `
   } else {
   favContainer.innerHTML = '';
   favItems.map( favItem => renderFavItem(favItem))
   }

}

function getFavItems() {
    let favItems = localStorage.getItem('fav');
    return favItems === null ? [] : JSON.parse(favItems);
}

function renderFavItem (item) {
    let favItemArea = document.createElement('div')
    favItemArea.classList.add('favitem');
    favItemArea.innerHTML = `
    <img src=${item.img} alt=${item.name} >
    <p class='favitem-name'>${item.name.split(' ')[0].toString()}</p>
    `
    favContainer.appendChild(favItemArea);
}


