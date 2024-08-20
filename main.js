document.addEventListener('DOMContentLoaded', function() {
    let result = 0;
    let prevEntry = 0;
    let operation = null;
    let currentEntry = '0';
    updateScreen(result);

    // Get all button elements
    const buttons = document.querySelectorAll('.button');

    // Add event listeners to each button
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonPressed = this.textContent.trim();

            if (buttonPressed === "C") {
                result = 0;
                currentEntry = '0';
            } else if (buttonPressed === "CE") {
                currentEntry = '0';
            } else if (buttonPressed === "back") {
                currentEntry = currentEntry.slice(0, -1);
            } else if (buttonPressed === "+/-") {
                currentEntry = (-parseFloat(currentEntry)).toString();
            } else if (buttonPressed === ".") {
                if (!currentEntry.includes('.')) {
                    currentEntry += '.';
                }
            } else if (isNumber(buttonPressed)) {
                if (currentEntry === '0') {
                    currentEntry = buttonPressed;
                } else {
                    currentEntry += buttonPressed;
                }
            } else if (isOperator(buttonPressed)) {
                prevEntry = parseFloat(currentEntry);
                operation = buttonPressed;
                currentEntry = '';
            } else if (buttonPressed === "%") {
                currentEntry = (parseFloat(currentEntry) / 100).toString();
            } else if (buttonPressed === "sqrt") {
                currentEntry = Math.sqrt(parseFloat(currentEntry)).toString();
            } else if (buttonPressed === "1/x") {
                currentEntry = (1 / parseFloat(currentEntry)).toString();
            } else if (buttonPressed === "pi") {
                currentEntry = Math.PI.toString();
            } else if (buttonPressed === "=") {
                currentEntry = operate(prevEntry, parseFloat(currentEntry), operation).toString();
                operation = null;
            }
            updateScreen(currentEntry);
        });
    });

    function updateScreen(displayValue) {
        displayValue = displayValue.toString();
        const screen = document.querySelector('.screen');
        screen.textContent = displayValue.substring(0, 10);
    }

    function isNumber(value) {
        return !isNaN(value) && value.trim() !== '';
    }

    function isOperator(value) {
        return value === '/' || value === '*' || value === '+' || value === '-';
    }

    function operate(a, b, operation) {
        switch (operation) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return b;
        }
    }
});
