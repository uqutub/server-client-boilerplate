import {Component} from '@angular/core';

import {IProduct} from '../../models/index';

@Component({
selector: 'add-invoice'
, template: `
    <h3>Add Invoice</h3>
    <hr/>
    <h5 (click)="showNewPanel=!showNewPanel"><a>Show Invoices</a></h5>
    <form>
        <input type="date" name="date" class="form-control" placeholder="date" />
        <input type="text" name="customer" class="form-control" placeholder="customer" />
        <table class="table">
            <tr>
                <form>
                    <td> <input type="text" name="product" placeholder="product" /> </td>
                    <td> <input type="number" name="qty" placeholder="qty" /> </td>
                    <td> <input type="number" name="price" placeholder="price" /> </td>
                    <td> <input type="submit" name="add" class="btn btn-info" value="add" /> </td>
                </form>
            </tr>
            <tr *ngFor="let product of products">
                <td>
                    {{product.name}}
                </td>
                <td>
                    {{product.qty}}
                </td>
                <td>
                    {{product.rate}}
                </td>
                <td>
                    {{product.total}}
                </td>
            </tr>
            <tr>
                <td>
                    Total Invoice Amount: 
                </td>
            </tr>
        </table>
        <input type="submit"  name="add" class="btn btn-primary" value="Create Invoice" />
    </form>
`
})
export class AddComponent{
    products: IProduct[];
    
    constructor() {
        
    }

    addProduct() {
        this.products.push();
    }
}