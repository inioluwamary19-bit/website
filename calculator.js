function clearDisplay() {
    document.getElementById('display'). innerText = '0'
}
function deleteLast() {
    let display = document.getElementById('display');
    display.innerText = display.innerText.slice(0, -1)|| '0'; 
}
function appendToDisplay(value){
    let display = 
    document.getElementById('display');
    if(display.innerText === '0'){
        display.innerText = value;
    }else{
        display.innerText += value
        display.innerText += value
    }
    }
    function calculate(){
        let display = document.getElementById('display'); try{
            display.innerText = eval(display.innerText);
        }catch{
            display.innerText = "ERROR 404"
        }
    }

    // CHANGE BACKGROUND COLOR
    function changeBackgroungColor(){
        const calculator = document.getElementById('aaa');
        const buttons = document.querySelectorAll('.btn')
        const randomColor = '#'+ Math.floor(Math.random()*16777215).toString(16)
        calculator.style.backgroundColor = randomColor
        buttons.forEach(button =>{
            button.style.backgroundColor = 'white';
        })
    }