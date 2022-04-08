//Logic
// 숫자를 입력하면 currentOperandTextElement.innerText로 들어간다.
// 숫자가 없을 때 operation을 누르면 반응 X
// 숫자가 있을 때 operation누르면 previousOperandTextElement.innerText로 들어간다. current는 없앤다. this.operation도 set.
// equalsButton을 누르면 operation의 종류를 체크하고 전에 입력한 숫자와 현재 입력되어있는 숫자를 computation.
// 여러개의 연산자를 동시에 사용하지는 못한다.


class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    clear() {
      this.currentOperand = '' //생성될때, clear할 때 현재 숫자, 입력되어있는 숫자 값을 리셋한다
      this.previousOperand = ''
      this.operation = undefined  //연산자는 undefined
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return  //입력되어있는 숫자가 없으면 그냥 return 
      if (this.previousOperand !== '') {      
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand) //문자열로 되어 있는걸 실제 숫자로 만든다
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return  // 둘 중 하나라도 true 이면 그냥 return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
    
    //helper function 숫자 4자리마다 , 찍어주고 return 
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      //parseInt -> 분석해서 int자료형으로 번역. parseFloat -> float자료형으로 번역.
      //split 한 결과인 정수부와 소수부로 원소 2개인 배열.
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      //decimal place : 소수점. integer과 decimal 은 정수부와 소수부.
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        //toLocaleString :숫자의 사용 언어에 따른 표현을 포함한 문자열을 반환한다.
        //maximumFractionDigits: 사용할 최대 소수 자릿수이며 가능한 값은 0~20사이의 값이다. 
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        //그냥 소수점만 입력할 경우에도 integerDigits와 decimalDigits는 split함수로 인해서 '',''값을 가지게 된다. 그래서 null이 아니게 된다.
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        //operation이 있을때만 previous에 띄운다. 없는경우에는 그냥 ''으로 세팅.
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
        // previous창의 숫자에도 , 찍는것 적용.
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        //undefined != null 은 false이다. 즉 operation이 undefined인 경우에도 null인것으로 계산되어서 실행된다.
        //compute가 끝난다음 operation이 undefined가 되기 때문에 계산결과를 current에 띄운 경우에 실행된다.
        this.previousOperandTextElement.innerText = ''
      }
    }
    }
  
  
  // DOM Selection // 
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
  })

  allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
  })

  deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()    // 숫자가 바뀌는 실행이 있을때마다 update함수를 실행해준다.
  })                              // React에서는 state바뀌면 자동으로 업데이트 될 것.