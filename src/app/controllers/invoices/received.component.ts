import { Component, OnInit, AfterViewInit, ViewChild, Output } from '@angular/core';

import { InvoicesService } from '../../services/invoices.service';
import { AlertService } from '../../services/alert.service';

import { User } from '../../model/user';
import {GridOptions} from "ag-grid";
import {IMyDrpOptions} from 'mydaterangepicker';


import { DataTableComponent } from '../../components/data-table.component';
import { ActionsComponent } from '../../components/actions.component';
import { OptionsPopupComponent } from '../../components/options-popup.component';
import { ReadStateComponent } from '../../components/read-state.component';
import { PaidStateComponent } from '../../components/paid-state.component';
declare var $:JQueryStatic;

@Component({
    moduleId: module.id,
    templateUrl: '../../views/invoices/received.component.html'
})
 
export class ReceivedComponent{
    message: any;
    model: any = {
        "Filtro":{}
    };
    totalPage = new Array();
    activePage: number;
    user: User;
    invoiceTypeList:any[] = [];
    
    // @ViewChild(OptionsPopupComponent)
    // public optionComponent: OptionsPopupComponent;

    public gridOptions:GridOptions;
    private myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
        selectBeginDateTxt: 'Seleccionar fecha desde',
        selectEndDateTxt: 'Seleccionar fecha hasta',
        monthLabels: {1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic'},
        dayLabels: {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'}
    };
    dateRange = null;

    // For example initialize to specific date (09.10.2018 - 19.10.2018). It is also possible
    // to set initial date range value using the selDateRange attribute.
 
    constructor(
        private invoicesService: InvoicesService,
        private alertService: AlertService
    ) { 
        this.gridOptions = <GridOptions>{
            context: {
                componentParent: this
            }
        };
        this.model.PerPage = 5;
        this.model.Page = 1;
        this.gridOptions.columnDefs = this.createColumnDefs();
        this.gridOptions.enableFilter = true;
        this.gridOptions.rowHeight = 50;
        this.gridOptions.suppressDragLeaveHidesColumns = true;
        this.gridOptions.suppressCellSelection = true;
        this.gridOptions.singleClickEdit = true;
        this.gridOptions.suppressMovableColumns = true;
        this.gridOptions.enableFilter = false;
        this.gridOptions.rowSelection = 'single';
        this.gridOptions.onRowDoubleClicked=  this.onSelectionChanged;
        this.gridOptions.localeText = {noRowsToShow: 'No hay comprobantes para mostrar'};
    }
 
    ngOnInit() {
        this.getReceivedInvoiceList();
        this.getInvoiceTypeList();
    }

    private onSelectionChanged()
    {
        //debugger;
        //(<any>$("#modal-preview-pdf")).modal("show");
        //this.optionComponent.generatedPDF(0);
        
        return true;
    }

    private createColumnDefs() {
        return [
            {
                headerName: "Acciones",
                field: "acciones",
                cellRendererFramework: ActionsComponent,
                cellEditorFramework: OptionsPopupComponent,
                editable: true,
                width: 90
            },
            // {
            //     headerName: "Fecha Ingreso",
            //     field: "fechaIngreso",
            //     width:130
            // },
            {
                headerName: "Tipo",
                field: "tipo",
                width: 100
            },
            {
                headerName: "CAE / CAI",
                field: "caecai",
                width: 150
            },
            {
                headerName: "Nombre / Razón social",
                field: "nombreRazonSocial"
            },
            {
                headerName: "Documento",
                field: "documento"
            },
            {
                headerName: "Fecha",
                field: "fecha",
                width: 100
            },
            {
                headerName: "Nro.",
                field: "nro",
                width: 160
            },
            {
                headerName: "Estado",
                field: "estado",
                cellRendererFramework: ReadStateComponent,
                width: 100
            },
            {
                headerName: "Estado pago",
                field: "estadoPago",
                cellRendererFramework: PaidStateComponent,
                width: 120
            }
            // {
            //     headerName: "Pagos",
            //     field: "pagos",
            //     width: 100
            // },
        ];
    }

    /*Cantidad de comprobantes por página */
    private changeCountPerPage()
    {
        this.model.Page = 1;
        this.getReceivedInvoiceList();
    }

    /*Pagina anterior */
    private prevPage()
    {
        if(this.model.CurrentPage > 1)
        {
            this.model.Page = this.model.CurrentPage - 1;
            this.getReceivedInvoiceList();
        }
    }

    /*Página siguiente */
    private nextPage()
    {
        if(this.model.CurrentPage < this.model.TotalPage)
        {
            this.model.Page = this.model.CurrentPage + 1;
            this.getReceivedInvoiceList();
        }
    }

    private onSelect(page)
    {
        this.activePage = page;
    }

    // someMethod(event) {
    //     this.getReceivedInvoiceList();
    // }
    private getPage(page)
    {
        this.model.Page = page;
        this.getReceivedInvoiceList();
    }

    private setActive(index) {
        if(this.model.Page == index + 1)
        {return true;}
        return false;
    }

    private getInvoiceTypeList() {
        this.invoicesService.getInvoiceTypeList()
            .then(
                data => {
                    if (data.Items) {
                        this.invoiceTypeList = data.Items;
                    }
                    else{
                        this.alertService.error(data.OperationMessage.Text);
                    }
                },
                error => {
                    this.alertService.error(error);
                });
    }

    private getReceivedInvoiceList() {
        
        let rowData:any[] = [];
        this.formatDateRange();
        this.invoicesService.getReceivedInvoiceList(this.model)
            .then(
                data => {
                        if(data.Meta)
                        {
                            this.model.Total = data.Meta.TotalCount;
                            this.model.CurrentPage = data.Meta.CurrentPage;
                            this.model.TotalPage = data.Meta.TotalPage;
                            this.totalPage = new Array(data.Meta.TotalPage);
                            this.activePage = this.model.CurrentPage;
                            this.model.To = this.model.CurrentPage * this.model.PerPage;
                            this.model.From = this.model.To - this.model.PerPage + 1;
                            if(this.model.To > this.model.Total)
                            {
                                this.model.To = this.model.Total;
                            }
                        }
                        else
                        {
                            this.model.Total = 0;
                            this.model.CurrentPage = 0;
                            this.totalPage = new Array(0);
                            this.model.To = 0;
                            this.model.From = 0;
                        }
                        
                        
                        
                    if (data.Invoices) {
                        for (var i = 0; i < data.Invoices.length; i++) {
                            let invoice = data.Invoices[i];
                            rowData.push({acciones: (invoice.CAI != 0 ? invoice.CAI : invoice.CAE),
                                        //   fechaIngreso: invoice.CbteFch.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$3/$2/$1'),
                                          tipo:invoice.CbteTipoMostrar,
                                          caecai:(invoice.CAI != 0 ? invoice.CAI : invoice.CAE),
                                          nombreRazonSocial:invoice.Emisor.Denominacion,
                                          documento:invoice.Emisor.DocTipoMostrar + ' ' + invoice.Emisor.DocNro,
                                          fecha:invoice.CbteFch.replace(/(\d\d\d\d)(\d\d)(\d\d)/g, '$3/$2/$1'),
                                          nro:invoice.PtoVta + '-' + ('00000000' + invoice.CbteNro).slice(-8),
                                          estado:invoice.EstadoLeido,
                                          estadoPago:invoice.EstadoPago});
                        }
                    }
                    else{
                        //this.alertService.error(data.OperationMessage.Text);
                    }
                    this.gridOptions.api.setRowData(rowData);
                },
                error => {
                    this.alertService.error(error);
                });
    }

    private formatDateRange() {
        if(this.dateRange != null)
        {
            this.model.Filtro.CbteFchD =  this.dateRange.beginDate.year + ('00' + this.dateRange.beginDate.month).slice(-2) + ('00' + this.dateRange.beginDate.day).slice(-2);
            this.model.Filtro.CbteFchH =  this.dateRange.endDate.year + ('00' + this.dateRange.endDate.month).slice(-2) + ('00' + this.dateRange.endDate.day).slice(-2);
        }
        else{
            this.model.Filtro.CbteFchD =  null;
            this.model.Filtro.CbteFchH = null;
        }
    }
}