let a = '';  a.length = 5;
let b = '';  b.length = 5;
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];    

const out = document.querySelector('.calc-screen p');

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
}
document.querySelector('.ac').onclick = clearAll;

function changeSign() {
    if(a !== '' && b == ''){
        a = (-a );
        out.textContent = a;
    }
    if (a !== '' && b !== '') {
        b = (-b);
        out.textContent = b;
    }
}
document.querySelector('.plus-minus').onclick = changeSign;

function getPercent() {
    if (a !== '' && b !== '' ) {
        b = (a / 100) * b;
        out.textContent = parseFloat(b).toFixed(5); 
    }
}
 document.querySelector('.percent').onclick = getPercent;


document.querySelector('.buttons').onclick = (event) => {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('ac')) return;
    if (event.target.classList.contains('plus-minus')) return;
    if (event.target.classList.contains('percent')) return;

    out.textContent = '';

    const key = event.target.textContent;
   
    if (digit.includes(key)) {
        if(b === '' && sign === '') {
            a += key;
            out.textContent = a;
            
            if (/^(0)[0-9]/g.test(a)) {
                a = a.replace(/^(0)[0-9]/g, '0');
                out.textContent = a;
            }
            if (/[0-9]{8}/g.test(a)) {
                out.textContent = 'number too long';
            }
        }
        else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        }
        else  {
            b += key;
            out.textContent = b;

            if (/^(0)[0-9]/g.test(b)) {
                b = b.replace(/^(0)[0-9]/g, '0');
                out.textContent = b;
            }

            if (/[0-9]{8}/g.test(b)) {
                out.textContent = 'number too long';
            }
        }
        return;
    }

    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        return;
    }

    if (key === '=') {
        if (b === '') b = a;
         
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "X":
                a = a * b;
                break;
            case "/":
                if (b === '0') {
                    out.textContent = "error";
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
        }
        
        if (/[0-9]{8}/g.test(a)) {
            out.textContent = 'number too long';
        }
        else out.textContent = a;
        finish = true;
    } 
}