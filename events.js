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
        showError('please check your numbers.');
    }

    e.preventDefault();
}

function assertNotNull(value, valueName){
    console.assert(value !== null, `${valueName} is null`);
}

// Redesign as a class that excepts the message & parent in the constructor
function showError(message){
    const card = document.getElementById('card');
    const heading = document.getElementById('heading');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.id = 'error-message';
    errorDiv.appendChild(document.createTextNode(message));

    const closeButton = document.createElement('button');
    closeButton.className = "btn btn-danger btn-block mt-4";
    closeButton.textContent = 'Close';
    closeButton.onclick = clearError;
    errorDiv.appendChild(closeButton);
    // add button that closes the div. have it call clearError().
    card.insertBefore(errorDiv, heading);
}

function clearError(e){
    document.getElementById('error-message').remove();
}