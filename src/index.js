function expressionCalculator(expr) {
    expr = expr.replace(/ /g, '');
    console.log("in:",expr);

// check for brackets
    if (expr.includes("(") && expr.includes(")")) {
        let pStart = expr.indexOf("(");
        let pEnd = expr.lastIndexOf(")");
        let p = expr.slice(pStart+1, pEnd);
        let pUpdate = expressionCalculator(p);
        expr = expr.split("");
        expr.splice(pStart, pEnd-pStart+1, pUpdate);
    } else if (expr.includes("(") || expr.includes(")")) {
        throw new Error("ExpressionError: Brackets must be paired");
    } else {
        expr = expr.split("");
    }


    //expr = expr.split("");
    expr.push("#");
    let stackDigits = [];
    let newExpr = [];
    for (let i = 0; i < expr.length; i++) {
        if (!isNaN(expr[i])) {
            stackDigits.push(expr[i]);
        } else {
            newExpr.push(sumStack(stackDigits), expr[i]);
            stackDigits = [];
        }
    }
    newExpr.pop();

    for (let i = 0; i < newExpr.length; i++) {
        switch (newExpr[i]) {
            case "*" : newExpr.splice(i-1, 3, newExpr[i-1]*newExpr[i+1]);
            i = 0;
                break;
            case "/" : newExpr.splice(i-1, 3, newExpr[i-1]/newExpr[i+1]);
            i = 0;
                break;
        }
    }
    for (let i = 0; i < newExpr.length; i++) {
        switch (newExpr[i]) {
            case "+" : newExpr.splice(i-1, 3, Number.parseFloat(newExpr[i-1])+Number.parseFloat(newExpr[i+1]));
            i = 0;
                break;
            case "-" : newExpr.splice(i-1, 3, Number.parseFloat(newExpr[i-1])-Number.parseFloat(newExpr[i+1]));
                i = 0;
                break;
        }
    }
    console.log("before out:", newExpr[0])
    return  newExpr[0];
}

function sumStack(st) {
    let res = '';
    for (let i = 0; i < st.length; i++) {
        res += st[i];
    }
    return res;
}

module.exports = {
    expressionCalculator
}