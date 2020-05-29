let display = document.getElementById("display").getElementsByTagName("div")[0];

/*let changeBtn = document.createElement('button')
changeBtn.innerText = 'Change Color Palette';
changeBtn.id = 'change-palette';
document.getElementsByClassName('flex-container')[0].appendChild(changeBtn);*/

for(btn of document.getElementsByTagName("button")){
    btn.onclick = event => {
        if(display.innerText === 'Error')
            display.innerText = '';
        btn = event.target
        if(btn.id === 'change-palette'){
            updatePalette();
        }
        else if(btn.id !== 'func'){
            let btntext = btn.innerText;
            if(btntext === 'x')
                btntext = '*';
            updateDisplay(display.innerText + btntext);
        }
        else{
            if(btn.innerText === 'C')
                updateDisplay('');
            else
                calculate(display.innerText);
        }
    }
}

let primaryColor;
let secondaryColor;

function updatePalette(){
    let url = 'http://colormind.io/api/';
    let data = {
        model : 'default',
        input : ['N', 'N']
    };
    let http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if(http.readyState == 4 && http.status == 200){
            var palette = JSON.parse(http.responseText).result.map(rgb => {
                return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            });
            primaryColor = palette[0];
            secondaryColor = palette[1];
        }
        document.getElementById('display').style.backgroundColor = primaryColor;
        for(btn of document.getElementsByTagName("button")){
            if(btn.id === 'func' || btn.id === 'op')
                btn.style.backgroundColor = secondaryColor;
            else
                btn.style.backgroundColor = primaryColor;
        }
    }
    http.open("POST", url, true);
    http.send(JSON.stringify(data));
}
updatePalette();
for(btn of document.getElementsByTagName("button")){
    btn.addEventListener('mouseover', event => switchColor(event.target) );
    btn.addEventListener('mouseout', event => switchColor(event.target) );
}

function switchColor(elem){
    if(elem.style.backgroundColor == primaryColor)
        elem.style.backgroundColor = secondaryColor;
    else
        elem.style.backgroundColor = primaryColor;
}

function calculate(input){
    let result;
    try{
        result = math.evaluate(input);
    }
    catch{
        result = 'Error';
    }
    finally{
        updateDisplay(String(result));
    }
}

function updateDisplay(text){
    display.innerText = text;
}