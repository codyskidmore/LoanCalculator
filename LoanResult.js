const _monthlyPayment = Symbol('_monthlyPayment');
const _totalPayment = Symbol('_totalPayment');
const _totalInterest = Symbol('_totalInterest');

class LoanResult{
    constructor(){
        this[_monthlyPayment] = 0.0;
        this[_totalPayment] = 0.0;
        this[_totalInterest] = 0.0;
    }

    get monthlyPayment(){
        return this[_monthlyPayment];
    }

    set monthlyPayment(value){
        this[_monthlyPayment] = value;
    }

    get totalPayment(){
        return this[_totalPayment];
    }
    set totalPayment(value){
        this[_totalPayment] = value;
    }

    get totalInterest(){
        return this[_totalInterest];
    }
    
    set totalInterest(value){
        this[_totalInterest] = value;
    }
}