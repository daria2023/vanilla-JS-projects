let goalDay = 'Jan 1 2023';
const container = document.querySelector('.container');

let timer = {};


function counter () {
    container.innerHTML = '';
    goalDay = new Date(goalDay);
    let today = new Date();

    timer.secnds = Math.floor((goalDay - today)/1000);
    timer.minutes = Math.floor((goalDay -today)/1000/60);
    timer.hours = Math.floor((goalDay - today)/1000/60/60);
    timer.days =Math.floor((goalDay - today)/1000/60/60/24);

    for (let key in timer) {
        

        let timerDiv = document.createElement('div');
        timerDiv.classList.add('timer');
        timerDiv.innerHTML = `
        <h1 class="timer-value">${timer[key]}</h1>
         <p class="timer-unit">${key}</p>
        `
        container.appendChild(timerDiv);
    }

}

counter();
setInterval(counter,1000);


