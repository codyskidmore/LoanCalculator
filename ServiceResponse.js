const _serviceResponseErrors = Symbol('_serviceResponseErrors');
const _serviceResponseData = Symbol('_serviceResponseData');

class ServiceResponse{
    constructor(){
        this[_serviceResponseErrors] = [];
        this[_serviceResponseData] = null;
    }
    get success(){
        return this.errors.length === 0;
    }
    addErrors(errors){
        errors.forEach(error => this.errors.push(error));
    }
    get errors(){
        return this[_serviceResponseErrors];
    }
    get data(){
        return this[_serviceResponseData];
    }
    set data(value){
        this[_serviceResponseData] = value;
    }
}