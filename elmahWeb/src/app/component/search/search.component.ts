import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {

  @Output() filtroCambio = new EventEmitter<any>();
  @Output() fechaCambio = new EventEmitter<Partial<{ inicioDate: any, finDate: any }>>();

  hostFilter = new FormControl<string>('');
  fechaFormGroup = new FormGroup({
    inicioDate: new FormControl(),
    finDate: new FormControl(),
  });

  constructor() {}

  emitfiltro() {
    const filtroTexto = this.hostFilter.value || '';
    const filtroFecha = {
        inicioDate: this.fechaFormGroup.get('inicioDate')?.value,
        finDate: this.fechaFormGroup.get('finDate')?.value
    };
    this.filtroCambio.emit({ filtroTexto, filtroFecha });
}

emitFechaCambio(event: MatDatepickerInputEvent<Date>) {
  if (event.targetElement.id === 'mat-date-range-input-0') {
    this.fechaFormGroup.get('inicioDate')?.setValue(event.value)
  } else if (event.targetElement.id === 'fecha-fin' && event.value !== null) {
    this.fechaFormGroup.get('finDate')?.setValue(event.value)
  }
  this.emitfiltro();
}
}
