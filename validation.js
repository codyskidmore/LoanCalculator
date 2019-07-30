const _validationErrors = Symbol('_validationErrors');

// Will improve this once I figure out TypeScript.
class Validator{
    constructor(){
        this[_validationErrors] = [];
    }
    get errors(){
        return this[_validationErrors];
    }
    clearErrors()
    {
        this[_validationErrors] = [];
    }
    get isValid(){
        return this[_validationErrors].length === 0;
    }
}

class GreaterThanZeroValueInputValidator extends Validator{
    constructor(){
        super();
    }
    validate(inputValue, targetName){
        if (inputValue <= 0 || isNaN(inputValue)){
            this[_validationErrors].push(new GreaterThanZeroEvent(targetName));
        }        
    }
}

class TargetIdValidator extends Validator{
    constructor(targetId){
        super();
        this[_targetId] = targetId;
    }
    validate(targetId){
        if (targetId !== this[_targetId]){
            this[_validationErrors].push(new InvalidTargetIdEvent(this[_targetId], targetId));
        }
    }
}
class TargetTypeValidator extends Validator{
    constructor(targetType){
        super();
        this[_targetType] = targetType;
    }
    validate(targetType){
        if (targetType !== this[_targetType]){
            this[_validationErrors].push(new InvalidTargetTypeEvent(this[_targetType], targetType));
        }
    }
}
class EmptyInputValueValidator extends Validator{
    constructor(targetName){
        super();
        this[_targetName] = targetName;
    }
    validate(inputValue){
        if (inputValue === ''){
            this[_validationErrors].push(new EmptyInputValueEvent(this[_targetName]));
        }        
    }
}
class TaskNameValidator extends Validator{
    constructor(){
        super();
    }
    validate(tasklist, newTaskName){
        if (tasklist.find( task => task.name === newTaskName) != null){
            this[_validationErrors].push(new TaskExistsEvent(newTaskName));
        }
    }
}