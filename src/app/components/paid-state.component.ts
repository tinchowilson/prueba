import { Component } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular/main";

@Component({
    selector: 'paid-state',
    templateUrl: './paid-state.component.html'
})

export class PaidStateComponent {
    constructor() { }

    estadoPagado: boolean;

    agInit(params: any): void {
        this.estadoPagado = (params.value == "Unpaid" ? false : true)
    }
}