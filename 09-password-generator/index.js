const submitBtn = document.querySelector('.submit-btn');
const copyBtn = document.querySelector('.copy-btn');

const len = document.querySelector('#length');
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numberCheck = document.querySelector('#numbers');
const symbolCheck = document.querySelector('#symbols');

const output = document.querySelector('.output');
const msg = document.querySelector('.msg');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const nums = '0123456789';
const symobols = '!@#$%^&*()_+=';

let password = ''

submitBtn.addEventListener('click',generatorPw);

copyBtn.addEventListener('click',()=>{
    if(output.innerHTML === '') {
        msg.innerHTML = 'pls generator password';
        msg.classList.add('show');
        setTimeout(()=>{
            msg.innerHTML = 'copied to the clipboard';
            msg.classList.remove('show');
        },2000)
    }
    navigator.clipboard.writeText(output.innerHTML);
    msg.classList.add('show');
    setTimeout(()=>{
        msg.classList.remove('show');
    },2000)
})


function generatorPw() {
    let pwLength = len.value;
    let conditionsNum = 0;
    let conditions = [uppercaseCheck,lowercaseCheck,numberCheck,symbolCheck];
    uppercaseCheck.genStrs = upperLetters;
    lowercaseCheck.genStrs = lowerLetters;
    numberCheck.genStrs = nums;
    symbolCheck.genStrs = symobols;
    conditions.map(condition => {
        if(condition.checked) conditionsNum++;
    })
    
    let conditionDivide = randGenerator(conditionsNum,pwLength);

    let tempConditions = conditions.filter(condition => condition.checked === true);
    if(tempConditions.length !== 0){

        for(let i = 0; i < conditionDivide.length; i++) {
            tempConditions[i].num = conditionDivide[i]
        }
        let pwParts = tempConditions.map(condition => {
            let pwPart = ''
            for (let i=0;i <condition.num; i++) {
                let strIdx = Math.floor(Math.random() * condition.genStrs.length)
                pwPart = pwPart + (condition.genStrs[strIdx]);
            }
            return (pwPart);
        })

        password = shuffle(pwParts.join(''));
        output.innerHTML = password;
    } else {
        msg.innerHTML = 'pls select options';
        msg.classList.add('show');
        setTimeout(()=>{
            msg.innerHTML = 'copied to the clipboard';
            msg.classList.remove('show');
        },2000)
    }
}


function randGenerator(n, sum) {
  let aryRet = [];
  let fSumTmp = sum;
  let iAcc = 0;
  for (let i = 0; i < (n -1); i++) {
  	let iTmp = Math.ceil(Math.random() * (fSumTmp / 2));
    aryRet.push(iTmp);
    fSumTmp -= iTmp;
    iAcc += iTmp;
  }
  aryRet.push(sum-iAcc);
  return aryRet;
}
 

function shuffle(str) {
    let array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

