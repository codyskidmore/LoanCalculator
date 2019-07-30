const _loanValueValidator = Symbol('_loanValueValidator');

class LoanService{
    constructor(loanValueValidator){
        this[_loanValueValidator] = loanValueValidator;
    }

    calculateLoan(principal, interest, interestName, years, yearsName){
        const serviceResponse = new ServiceResponse();

        this[_loanValueValidator].validate(interest, interestName);
        if (!this[_loanValueValidator].isValid){
            serviceResponse.addErrors(this[_loanValueValidator].errors);
            this[_loanValueValidator].clearErrors();
        }

        this[_loanValueValidator].validate(years, yearsName);
        if (!this[_loanValueValidator].isValid){
            serviceResponse.addErrors(this[_loanValueValidator].errors);
            this[_loanValueValidator].clearErrors();
        }
        
        if (!serviceResponse.success){
            return serviceResponse;
        }

        const calculatedInterest = interest / 100 / 12;
        const calculatedPayments = years * 12;
    
        // Compute monthly payment
        serviceResponse.data = new LoanResult();            
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        serviceResponse.data.monthlyPayment = (principal*x*calculatedInterest)/(x-1);
        serviceResponse.data.totalPayment = (serviceResponse.data.monthlyPayment * calculatedPayments);
        serviceResponse.data.totalInterest = ((serviceResponse.data.monthlyPayment * calculatedPayments) - principal);

        return serviceResponse;
    }
}