//alert('test');
const form = document.getElementById('loan-form').addEventListener(FormEvents.Submit(), calculateResults);
const errorMessageDiv = document.getElementById('error-message-parent');
const showErrorDialog = new ShowErrorDialog(errorMessageDiv, clearErrorEvent);

// const errors = ['Interest must have a value.','Repayment Years muse have a value.'];
// showErrorDialog.showErrors('Please check the following errors and try again.', errors);

window.onerror = globalErrorHandler;