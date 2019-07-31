const _loanCalculator = Symbol('_loanCalculator');
const _loanControllerErrorDialog = Symbol('_loanControllerErrorDialog');

function calculateResults(e){
    const results = document.getElementById('results');
    const loader = document.getElementById('loading');
    results.style.display = 'none';
    loader.style.display = 'block';
    
    let success = false;
    // Simulate a long running process.
    setTimeout(function(){
        success = loanController.calculateLoan();      
        if (success){
            results.style.display = 'block';
        }  
        loader.style.display = 'none';
        }, 2000);
    
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
            this[_loanControllerErrorDialog].showErrors(serviceResponse.errors);
            return false;
        }
        
        const loanResult = serviceResponse.data;
        monthlyPayment.value = `$${loanResult.monthlyPayment.toFixed(2)}`;
        totalPayment.value = `$${loanResult.totalPayment.toFixed(2)}`;
        totalInterest.value = `$${loanResult.totalInterest.toFixed(2)}`;

        return true;
    }
}