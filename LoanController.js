const _loanCalculator = Symbol('_loanCalculator');
const _loanControllerErrorDialog = Symbol('_loanControllerErrorDialog');

function calculateResults(e){
    loanController.calculateLoan();
    e.preventDefault();
}


class LoanController{
    constructor(loanCalculator, showErrorDialog){
        this[_loanCalculator] = loanCalculator;
        this[_loanControllerErrorDialog] = showErrorDialog;
    }

    calculateLoan(){
        const amount = document.getElementById('amount');
        const interest = document.getElementById('interest');
        const years = document.getElementById('years');
        const monthlyPayment = document.getElementById('monthly-payment');
        const totalPayment = document.getElementById('total-payment');
        const totalInterest = document.getElementById('total-interest');

        const serviceResponse = this[_loanCalculator].calculateLoan(parseFloat(amount.value), 
            parseFloat(interest.value), interest.placeholder, parseFloat(years.value), years.placeholder);

        if (!serviceResponse.success){
            const showErrorDialog = 
            this[_loanControllerErrorDialog].showErrors(serviceResponse.errors);
            return;
        }
        
        const loanResult = serviceResponse.data;
        monthlyPayment.value = `$${loanResult.monthlyPayment.toFixed(2)}`;
        totalPayment.value = `$${loanResult.totalPayment.toFixed(2)}`;
        totalInterest.value = `$${loanResult.totalInterest.toFixed(2)}`;
    }
}