const _parentDiv = Symbol('_parentDiv');
const _getErrorDiv = Symbol('_getErrorDiv');
const _errorDiv = Symbol('_errorDiv');
const _errorMessages = Symbol('_errorMessages');
const _getCloseButton = Symbol('_getCloseButton');

function clearErrorEvent(e){
    showErrorDialog.close(e);
    e.preventDefault();
}

class ShowErrorDialog{
    constructor(parentDiv, closeEvent){
        this[_parentDiv] = parentDiv;
        const errorDiv = this[_getErrorDiv](this[_getCloseButton](closeEvent));
        this[_errorDiv] = errorDiv
    }
    showMessage(message){
        this[_errorMessages].appendChild(document.createTextNode(message));
        this[_parentDiv].appendChild(this[_errorDiv]);
    }
    close(e){
        while(this[_errorMessages].firstChild){
            this[_errorMessages].removeChild(this[_errorMessages].firstChild);
        }
        this[_parentDiv].firstChild.remove();
    }
    showErrors(message, errors){
        const h5 = document.createElement('h5');
        h5.textContent = message;
        this[_errorMessages].appendChild(h5);
        
        const ul = document.createElement('ul');
        let li = null;
        errors.forEach(error => {
            li = document.createElement('li');
            li.className = "li-right";
            li.textContent = error;
            ul.appendChild(li);
        });

        this[_errorMessages].appendChild(ul);
        this[_parentDiv].appendChild(this[_errorDiv]);
    }

    /////// Private methods ////
    [_getErrorDiv](closeButton){
        const errorDiv = document.createElement('div');
        this[_errorMessages] = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.id = 'error-message';
        errorDiv.appendChild(this[_errorMessages]);
        errorDiv.appendChild(closeButton);
        return errorDiv;
    }
    [_getCloseButton](closeEvent){
        const closeButton = document.createElement('button');
        closeButton.className = "btn btn-danger btn-block mt-4";
        closeButton.textContent = 'Close';
        closeButton.onclick = closeEvent;
        return closeButton;
    }
}