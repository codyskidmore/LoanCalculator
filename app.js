//alert('test');
const form = document.getElementById('loan-form').addEventListener(FormEvents.Submit(), calculateResults);
const errorMessageDiv = document.getElementById('modal-container');
const showErrorDialog = new ShowErrorDialog(errorMessageDiv, 'Loan Calculator Errors', 'Please fix the following errors and try again.');
const loanService = new LoanService(new GreaterThanZeroValueInputValidator());
const loanController = new LoanController(loanService, showErrorDialog);
window.onerror = globalErrorHandler;