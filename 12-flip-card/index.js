const cards = document.querySelectorAll('.card');

let cardOne, cardTwo;
let disableDeck = false;
let matchedCards = 0;

function flipCard (e) {
    let selectedCard = e.target;
    selectedCard.classList.add('flipped');

    if(selectedCard !== cardOne && !disableDeck) {
        if(!cardOne) {
         return cardOne = selectedCard;
        } 
        cardTwo = selectedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector('img').src;
        let cardTwoImg = cardTwo.querySelector('img').src;
        matchedImgs(cardOneImg,cardTwoImg);
    }
    
}

function matchedImgs(img1,img2) {
    if(img1 === img2) {
        matchedCards++;
        if (matchedCards === 8) {
            setTimeout(()=>{
                return resortCards();
            },1000)
        }
        cardOne.removeEventListener('click',flipCard);
        cardTwo.removeEventListener('click',flipCard);
        cardOne = '';
        cardTwo = '';
        return disableDeck = false;
    } 
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');

    setTimeout(()=>{
        cardOne.classList.remove('flipped','shake');
        cardTwo.classList.remove('flipped','shake');
        cardOne = cardTwo = '';
        disableDeck = false;
    },500)

}

function resortCards() {
    cardOne = cardTwo = '';
    disableDeck = false;
    matchedCards = 0;
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
    arr.sort(()=>Math.random > 0.5 ? 1 : -1);
    cards.forEach((card,idx) => {
        card.classList.remove('flipped');
        let img = card.querySelector('img');
        img.src = `./images/img-${arr[idx]}.png`;
        card.addEventListener('click',flipCard);
})
}

resortCards();

cards.forEach(card => {
    card.addEventListener('click',flipCard);
})