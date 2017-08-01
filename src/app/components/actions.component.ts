import { Component } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular/main";

@Component({
    selector: 'mood-cell',
    templateUrl: './actions.component.html'
})

export class ActionsComponent {
    private params: any;

    agInit(params: any): void {
        this.params = params;
    }
}