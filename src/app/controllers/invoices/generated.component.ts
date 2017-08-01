import { Component, OnInit } from '@angular/core';
 
import { InvoicesService } from '../../services/invoices.service';
 
@Component({
    moduleId: module.id,
    templateUrl: '../../views/invoices/generated.component.html'
})
 
export class GeneratedComponent {
    message = "any";
 
    constructor(private invoicesService: InvoicesService) { }
 
    ngOnInit() {
        //this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}

