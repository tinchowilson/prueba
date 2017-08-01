import { Component } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular/main";

@Component({
    selector: 'read-state',
    templateUrl: './read-state.component.html'
})

export class ReadStateComponent {
    constructor() { }

    estadoLeido: boolean;

    agInit(params: any): void {
        this.estadoLeido = (params.value == "Not Read" ? false : true)
    }
}