function calculateResults(e){
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    // add validation that verifies interest & years have values. Otherwise we get a divide by zero error.
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    // Redo this
    if (isFinite(monthly)){
        monthlyPayment.value = `$${monthly.toFixed(2)}`;
        totalPayment.value = `$${(monthly * calculatedPayments).toFixed(2)}`;
        totalInterest.value = `$${((monthly * calculatedPayments) - principal).toFixed(2)}`;
    }
    else {
        showErrorDialog.showMessage('Invalid numbers entered. Please check then and try again.');
    }

    e.preventDefault();
}

function assertNotNull(value, valueName){
    console.assert(value !== null, `${valueName} is null`);
}

function globalErrorHandler(msg, url, line, col, error) {
    ///// Borrowed this from a guy who borrowed it from 
    ///// someone else and put it on StackOverflow.

    // Note that col & error are new to the HTML 5 spec and may not be 
    // supported in every browser.  It worked for me in Chrome.
    var extra = !col ? '' : '\ncolumn: ' + col;
    extra += !error ? '' : '\nerror: ' + error;
 
    // You can view the information in an alert to see things working like this:
    alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);
 
    // TODO: Report this error via ajax so you can keep track
    //       of what pages have JS issues
 
    var suppressErrorAlert = true;
    // If you return true, then error alerts (like in older versions of 
    // Internet Explorer) will be suppressed.
    return suppressErrorAlert;
 }