function expressionCalculator(expr) {
    const operators = {
        '+': (y, x) => +x + +y,
        '-': (y, x) => x - y,
        '*': (y, x) => x * y,
        '/': (y, x) => {
            if (y == 0) {
                throw Error("TypeError: Division by zero.");
            } else {
                return x / y;
            }
        },
    };
    const priority = {
        '+': 0,
        '-': 0,
        '*': 1,
        '/': 1,
    };
    let stack = [], digits = [];
    let exprArr = expr.replace(/\s+/g, '').match(/[^-+*/()]+|[^]/g);
    function count() {
        let lastOperation = stack.pop();
        digits.push(operators[lastOperation](digits.pop(), digits.pop()));
    }
    function checkBrackets(exprArr) {
        const open = exprArr.filter(item => item ==='(');
        const close = exprArr.filter(item => item ===')');
        if (open.length !== close.length) {
            throw Error("ExpressionError: Brackets must be paired");
        }
    }
    function evaluate(exprArr) {
        checkBrackets(exprArr);
        exprArr.forEach(element => {
            if(/\d/.test(element)) {
                digits.push(element);
            } else if (priority[stack[stack.length - 1]] < priority[element]) {
                stack.push(element);
            } else if (element === '(') {
                stack.push(element);
            } else if (element === ')') {
                while (stack[stack.length-1] !== '(') {
                    count();
                }
                stack.pop();
            } else {
                while (priority[element] <= priority[stack[stack.length - 1]]) {
                    count();
                }
                stack.push(element);
            }
        });
        while (stack.length > 0) {
            count();
        }
        return digits.pop();
    }
    return evaluate(exprArr);
}

module.exports = {
    expressionCalculator
};