class Calculator{
    constructor(operand1Element, operand2Element){
       this.operand1Element = operand1Element;
       this.operand2Element = operand2Element;
       this.clear(); 
    }

    clear(){
        this.operand1 = 0;
        this.operand2 = 0;
        this.operator = '';
        this.updateUI(); /*funcion de actualizacion de datos*/

    }

    updateUI(){
        this.operand1Element.innerHTML = this.operand1 + this.operator;
        this.operand2Element.innerHTML = this.operand2;
    }
    
    appendNumber(number){
        if(number === "." && this.operand2.includes(".")) return;
        this.operand2 = this.operand2 === 0
                        ? number
                        : this.operand2.toString() + number;
        this.updateUI();
    }

    delete(){
        if(this.operand2 === 0) return;
        this.operand2 = +this.operand2.toString().slice(0,-1);

        this.updateUI();
    }

    operation(operator){
        if(this.operator){
            this.calc();
            //calcular operador 1 y operador 2
        }
        this.operator = operator;
        this.operand1 = +this.operand2 === 0 ? this.operand1 : this.operand2;
        this.operand2 = 0;
        this.updateUI();
    }

    calc(){
        switch(this.operator) {
            case "+":
                this.operand1 = +this.operand1 + +this.operand2;
            break;
            case "-":
                this.operand1 = +this.operand1 - +this.operand2;
            break;
            case "*":
                this.operand1 = +this.operand1 * +this.operand2;
            break;
            case "/":
                this.operand1 = +this.operand1 / +this.operand2;
            break;
        }
        this.operator = "";
        this.operand2 = 0;
        this.updateUI();
    }
}

const operand1Element = document.querySelector("[data-operand-1]");
const operand2Element = document.querySelector("[data-operand-2]");
const clearButtons = document.querySelector("[data-clear]");
const numberButtons = document.querySelectorAll("[data-number]");
const deleteButtons = document.querySelector("[data-delete]");
const operationButtons = document.querySelectorAll("[data-operation]");
const igualButton = document.querySelector("[data-igual]");

const calculator = new Calculator(operand1Element, operand2Element);

clearButtons.addEventListener("click", () => {
    calculator.clear();
})

numberButtons.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerHTML);
    })
})
deleteButtons.addEventListener('click', () =>{
    calculator.delete();
})

operationButtons.forEach(button => {
    button.addEventListener("click", () =>{
        calculator.operation(button.innerHTML)
    });   
});

igualButton.addEventListener("click", () =>{
    calculator.calc();
});