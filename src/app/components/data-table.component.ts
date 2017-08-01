import {Component} from '@angular/core';
//import {AgGridNg2} from 'ag-grid-angular/main';
import {GridOptions} from "ag-grid";
 
@Component({
    selector: 'my-datatable',
    templateUrl: './data-table.component.html'
})
 
export class DataTableComponent { 
    
    gridOptions: GridOptions;

    constructor() {
        
    }
}