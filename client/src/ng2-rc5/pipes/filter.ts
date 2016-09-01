import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'filterBy',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(values, ...args) {
        console.log(args)
        let filterProperty = args[0];
        let filterValue = args[1];
        let strictSearch = args[args.length-1];  
        
        return this.filterFunc(values, filterProperty, filterValue, strictSearch);        
    }

    filterFunc(values, filterProperty, filterValue, strictSearch) {
        if(strictSearch){
            console.log(1)
            return (filterProperty) ? values.filter(value => this.stringSpliter(value, filterProperty) === filterValue) : values;
        } else {
            console.log(2)
            return (filterProperty) ? values.filter(value => this.stringSpliter(value, filterProperty).indexOf(filterValue) !== -1) : values;
        }
    }

    stringSpliter(obj, property) {
        if(property.indexOf('.') !== -1){
            let pArray = property.split('.');
            pArray.forEach((v) => {
                obj = obj[v];
            });
            return obj;
        } else {
            return obj[property];
        }
        
    }
}