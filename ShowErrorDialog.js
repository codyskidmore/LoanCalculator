const _showErrorDialogParentDiv = Symbol('_showErrorDialogParentDiv');
const _showErrorDialogHeader = Symbol('__showErrorDialogHeader');
const _showErrorDialogHeaderMessage = Symbol('_showErrorDialogHeaderMessage');

class ShowErrorDialog{
    constructor(parentDiv, modalHeader, message){
        this[_showErrorDialogParentDiv] = parentDiv;
        this[_showErrorDialogHeader] = modalHeader;
        this[_showErrorDialogHeaderMessage] = message;
    }
    showErrors(errors){
        const ul = document.createElement('ul');
        let li = null;
        errors.forEach(errorEvent => {
            li = document.createElement('li');
            li.textContent = `EventId: ${errorEvent.eventId}, Message: ${errorEvent.message}`;
            ul.appendChild(li);
        });

        this[_showErrorDialogParentDiv].innerHTML = `
            <button id = 'open-button' type="button" data-toggle="modal" data-target="#error-modal">Open Modal</button>
            <!-- Modal -->
            <div id="error-modal" class="modal fade" role="dialog">
                <div class="modal-dialog alert alert-danger" role="alert">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">${this[_showErrorDialogHeader]}</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <h6>${this[_showErrorDialogHeaderMessage]}</h6>
                            <ul>${ul.innerHTML}</ul>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>        
        `;        
        // This forces the modal to pop up without having to the user interact 
        // with a button. It is a little hack-ish but affective.
        const openButton = document.getElementById('open-button');
        openButton.click();
    }
}