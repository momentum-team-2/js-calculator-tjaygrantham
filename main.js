let display = document.getElementById("display").getElementsByTagName("div")[0];

for(btn of document.getElementsByTagName("button")){
    btn.onclick = event => {
        btn = event.target
        if(btn.id !== 'func'){
            let btntext = btn.innerText;
            if(btntext === 'x')
                btntext = '*';
            updateDisplay(display.innerText + btntext);
        }
        else{
            if(btn.innerText === 'C')
                updateDisplay();
            else
                calculate(display.innerText);
        }
    }
}

function calculate(input){
    updateDisplay(String(eval(input)))
}

function updateDisplay(text){
    display.innerText = text;
}