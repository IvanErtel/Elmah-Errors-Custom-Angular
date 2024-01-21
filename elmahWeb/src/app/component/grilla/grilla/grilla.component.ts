import { Component, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ElmaError } from 'src/app/models/ElmaError.model';
import { ElmaErrorDataService } from 'src/app/service/data/elma-error-data.service';
import { DetalleDialogsComponent } from '../../dialog/detalle-dialogs/detalle-dialogs.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { SearchComponent } from '../../search/search.component';
import { PaginatedQueryOptions } from 'src/app/models/paginated-query-options';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.scss'],
})
export class GrillaComponent implements AfterViewInit {

  host = new FormControl<string>('');
  pageSizeOptions: number[] = [10, 20, 30]

  fechaFormGroup = new FormGroup({
    inicioDate: new FormControl(),
    finDate: new FormControl(),
  })

  private subscription = new Subscription();
  displayedColumns: string[] = ['host', 'statusCode', 'type', 'message', 'user', 'date', 'timeUtc', 'detalles'];
  paginatedQueryOptions = new PaginatedQueryOptions(({ PageNumber: 1, PageSize: 10, Filters: [] }))

  datos = new MatTableDataSource<ElmaError>([]);
  datosFiltrados: ElmaError[] = [];
  totalItems!: number;
  loading = true;
  datosCompletos: ElmaError[] = [];
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  @ViewChild(SearchComponent, { static: true }) searchComponent?: SearchComponent;

  // XML
  filtroAllXml: string = '';
  public errorType!: string | null;
  public errorMessage!: string | null;
  public errorTime!: string | null;
  public errorDetail!: string | null;

  pageEvent?: PageEvent;
  filtroNombre: string = '';
  filtroFecha: any = { inicio: null, final: null };
  grillaFiltro = new FormControl<string | null>('');


  ngOnInit(): void {
    this.getPage();
  }
  ngAfterViewInit() {
    if (this.searchComponent) {
      this.searchComponent.filtroCambio.subscribe((filtro) => {
        this.cargarDatosFiltrados(filtro);
      });
      this.searchComponent.fechaCambio.subscribe((rangoFecha) => {
        this.manejarCambioFecha(rangoFecha);
      })
    }
  }

  cargarDatosFiltrados(filtro: { filtroTexto: string, filtroFecha: { inicioDate: any, finDate: any } }): void {
    this.paginatedQueryOptions.PageNumber = 1;
    this.paginatedQueryOptions.PageSize = this.paginatedQueryOptions.PageSize;
    this.paginatedQueryOptions.StartDate = filtro.filtroFecha.inicioDate;
    this.paginatedQueryOptions.EndDate = filtro.filtroFecha.finDate;
    this.paginatedQueryOptions.TextFilter = filtro.filtroTexto;

    this._erroresElmah.getPaginated(this.paginatedQueryOptions)
      .subscribe(response => {
        this.datos.data = response.result;
        this.totalItems = response.totalItems;
      });
  }

  constructor(private _erroresElmah: ElmaErrorDataService,
    public dialog: MatDialog) {
  }

  getPage(): void {
    this.loading = true;
    this._erroresElmah.getPaginated(this.paginatedQueryOptions)
      .subscribe(response => {
        this.datosCompletos = response.result;
        this.datos.data = this.datosCompletos.slice(0, 10);
        this.totalItems = response.totalItems;
        this.loading = false;
      },
        error => {
          console.error('error al obtener datos paginados:', error)
          this.loading = false;
        }
      );
  }

  pageChange(page: PageEvent): void {
    this.paginatedQueryOptions.PageNumber = page.pageIndex + 1;
    this.paginatedQueryOptions.PageSize = page.pageSize;
    this.getPage();
  }

  onFiltroCambio(event: any) {
    const paginatedQueryOptions = new PaginatedQueryOptions({
      PageNumber: 1,
      PageSize: this.paginatedQueryOptions.PageSize,
      StartDate: event.filtroFecha.inicioDate,
      EndDate: event.filtroFecha.finDate,
      TextFilter: event.filtroTexto
    })
    this._erroresElmah.getPaginated(paginatedQueryOptions)
      .subscribe(response => {
        this.datos.data = response.result;
        this.totalItems = response.totalItems
      })
  }

  // Detalle donde muestro parte del allXml
  openDialog(element: ElmaError) {
    const filtroAllXml = element.allXml;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(filtroAllXml, 'text/xml');
    
    if (xmlDoc.documentElement.nodeName === 'parsererror') {
      console.error('Error al parsear el XML');
      return;
    }
  
    const errorElement = xmlDoc.getElementsByTagName('error')[0];
    if (!errorElement) {
      console.error('Elemento <error> no encontrado en el XML');
      return;
    }
    const errorType = errorElement.getAttribute('type');
    const errorMessage = errorElement.getAttribute('message');
    const errorTime = errorElement.getAttribute('time');
    const errorDetail = errorElement.getAttribute('detail');
    
    this.errorType = errorType ;
    this.errorMessage = errorMessage;
    this.errorTime = errorTime;
    this.errorDetail = errorDetail;

    const dialogRef = this.dialog.open(DetalleDialogsComponent, {
      data: { 
        // detalle: element.allXml,
        errorType: this.errorType,
        errorMessage: this.errorMessage,
        errorTime: this.errorTime,
        errorDetail: this.errorDetail
       },
    });

    dialogRef.afterClosed().subscribe((result) => {
      return result
    })
  }

  // expandir detalle del mensaje
  detalleMsj(element: any) {
    const dialogRef2 = this.dialog.open(DetalleDialogsComponent, {
      data: { detalle: element.message, element },
    })
    dialogRef2.afterClosed().subscribe((result) => {
      return result
    })

  }

  // Acortamos Msj que devuelve la Api para que no me rompa todo 
  acortarMsj(element: any): string {
    const words = element.message.split(' ').slice(0, 10);
    const truncatedWords = words.map((word: string) => word.slice(0, 12));
    const result = truncatedWords.join(' ');
    return result
  }

  manejarCambioFecha(rangoFecha: Partial<{ inicioDate: any, finDate: any }>) {
    this.paginatedQueryOptions.StartDate = rangoFecha.inicioDate ? new Date(rangoFecha.inicioDate) : undefined;
    this.paginatedQueryOptions.EndDate = rangoFecha.finDate ? new Date(rangoFecha.finDate) : undefined;
    this.getPage();
  }
  // Filtrado de datos
  filtrarDatos(): void {
    const filtroTexto = this.host.value ? this.host.value.trim().toLowerCase() : '';
    const filtroFecha = this.fechaFormGroup.value;

    this.datosFiltrados = this.datos.data.filter((element) => {
      const fechaElemento = new Date(element.timeUtc);

      // Si no hay filtro de fecha, no aplicamos filtro
      if (!filtroFecha.inicioDate && !filtroFecha.finDate) {
        return (
          element.user.toLowerCase().includes(filtroTexto) ||
          element.host.toLowerCase().includes(filtroTexto)
        );
      }

      // Si hay filtro de fecha, aplicamos el filtro
      const inicioDate = filtroFecha.inicioDate ? new Date(filtroFecha.inicioDate) : null;
      const finDate = filtroFecha.finDate ? new Date(filtroFecha.finDate) : null;

      return (
        (element.user.toLowerCase().includes(filtroTexto) || element.host.toLowerCase().includes(filtroTexto)) &&
        (!inicioDate || fechaElemento >= inicioDate) &&
        (!finDate || fechaElemento <= finDate)
      );
    });

    // Actualizamos el origen de datos con los datos filtrados
    this.datos.data = this.datosFiltrados;

    if (this.datos.paginator) {
      this.datos.paginator.firstPage();
    }
  }

  abrirPicker() {
    this.picker.open()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
