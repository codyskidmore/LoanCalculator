//alert('test');
const form = document.getElementById('loan-form').addEventListener(FormEvents.Submit(), calculateResults);
const errorMessageDiv = document.getElementById('modal-container');
const showErrorDialog = new ShowErrorDialog(errorMessageDiv, 'Modal Header Cody', 'Please fix the following errors and try again.');

const errors = ['Interest must have a value.','Repayment Years muse have a value.'];
showErrorDialog.showErrors(errors);

window.onerror = globalErrorHandler;