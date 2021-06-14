customEval = () => {
    let expression = document.getElementsByTagName("input")[0].value;
    let result = document.getElementsByTagName("span")[0];
    
    let res = evaluatePostfix(infixToPostfix(parseExpression(expression)));
    result.textContent = " = "+res;
};

parseExpression = (expression) => {
    let s = [];
    let operand = "";
    
    for(let c of expression){
        switch(c) {
            case ".":
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9": 
                operand += c;
                break;
            case "+":
            case "-":
            case "/":
            case "*":
            case "(":
            case ")":
                if(Number(operand)){
                    s.push(Number(operand));
                }
                else if(operand.length!=0)
                    console.log("Input error", operand);
                s.push(c);
                operand = "";
                break;
            default:
                console.log("Input error", operand);
                break;
        }
    }
    if(Number(operand))
        s.push(Number(operand));
    else if(operand.length!=0)
        console.log("Input error", operand);
    
    return s;
};

//Function to return precedence of operators
precedence = (operator) => {
    if(operator == '^')
        return 3;
    else if(operator == '*' || operator == '/')
        return 2;
    else if(operator == '+' || operator == '-')
        return 1;
    else
        return -1;
}

infixToPostfix = (parsedExpression) => {
    let postfix = [];
    let temp = [];
    
    for(let term of parsedExpression){
        if((typeof term)=="number")
            postfix.push(term);
        else if(term=="(")
            temp.push(term);
        else if(term==")"){
            while(temp.slice(-1)[0]!="(")
                postfix.push(temp.pop());
            temp.pop();
        }
        else{
            while(temp.length>0 && precedence(term)<=precedence(temp.slice(-1)[0]))
                postfix.push(temp.pop());
            temp.push(term);
        }
    }
    
    while(temp.length>0)
        postfix.push(temp.pop());
    
    return postfix;
};

evaluatePostfix = (postfix) => {
    let temp = [];
    
    for(let term of postfix){
        if((typeof term)=="number")
            temp.push(term);
        else{
            let operand2 = temp.pop();
            let operand1 = temp.pop();
            if(term=="+")
                temp.push(operand1+operand2);
            else if(term=="-")
                temp.push(operand1-operand2);
            else if(term=="*")
                temp.push(operand1*operand2);
            else
                temp.push(operand1/operand2);
        }
    }
    
    return temp[0]
};

dmas = (s) => {
    temp = [];
    
    for(let i=0; i<s.length; i++){
        if(s[i]=="/"){
            temp.push(temp.pop()/s[i+1]);
            i+=1;
        }
        else if(s[i]=="*"){
            temp.push(temp.pop()*s[i+1]);
            i+=1;
        }
        else
            temp.push(s[i]);
    }
    
    let result = temp[0];
    
    for(let i=1; i<temp.length; i+=2){
        if(temp[i]=="+")
            result+=temp[i+1];
        else
            result-=temp[i+1];
    }
    
    return result;
};
