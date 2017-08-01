import { AfterViewInit, Component, ViewChild, ViewContainerRef, Output, EventEmitter, OnInit } from "@angular/core";
import {ICellEditorAngularComp} from "ag-grid-angular/main";
import { InvoicesService } from '../services/invoices.service';
import { AlertService } from '../services/alert.service';
import { SafeUrl, DomSanitizer } from "@angular/platform-browser";
import { Http, ResponseContentType } from "@angular/http";
import * as FileSaver from 'file-saver';
declare var $:JQueryStatic;

@Component({
    selector: 'editor-cell',
    templateUrl: './options-popup.component.html'
    
})
export class OptionsPopupComponent implements OnInit {
    private params: any;
    model: any = {
    };
    current_url: SafeUrl;
    url: string;

    constructor(
        private invoicesService: InvoicesService,
        private alertService: AlertService,
        private sanitizer: DomSanitizer,
        private http: Http
    ) {}

    agInit(params: any): void {
        this.params = params;
        this.model.CAE = this.params.value;
    }

    isPopup(): boolean {
        return true;
    }

    /*Vuelve a cargar la lista de comprobantes*/
    refreshList() {
        this.params.context.componentParent.getReceivedInvoiceList();
    }

    ngOnInit() {
        $('#modal-preview-pdf').on('hidden.bs.modal', () => {
            this.refreshList();
        });
    }


    /*Función para descargar el pdf en la pc */
    public downloadFile() {
        let cae = this.model.CAE;
        return this.http.get(this.url, { responseType: ResponseContentType.Blob })
        .subscribe(
            (res: any) =>
            {
                let blob = res.blob();
                let filename = 'CBTE_' + cae + '.pdf';
                FileSaver.saveAs(blob, filename);
            }
        );
    }

    /*Llamada a servicio que genera el pdf
    Return: Path del archivo*/
    public generatedPDF(action) {
        let rowData:any[] = [];
        this.invoicesService.generatedPDF(this.model)
            .then(
                data => {
                    if (data.RealDocumentPath) {
                        this.url = "http://localhost:81/" + data.RealDocumentPath + "#zoom=100";
                        this.current_url=this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
                        if(action == 1)
                        {
                            /*Se abre el comprobante en otra pestaña */
                            window.open(this.url, '_blank');
                            this.refreshList();
                        }
                    }
                    else{
                        this.alertService.error(data.OperationMessage.Text);
                    }
                },
                error => {
                    this.alertService.error(error);
                });
    }   
}