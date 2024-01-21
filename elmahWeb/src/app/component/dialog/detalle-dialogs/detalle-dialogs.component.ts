import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-dialogs',
  templateUrl: './detalle-dialogs.component.html',
  styleUrls: ['./detalle-dialogs.component.scss']
})
export class DetalleDialogsComponent {
detalle: any;
element: any;
mostrarDetalle = false;

constructor(@Inject(MAT_DIALOG_DATA) public data: any){
  this.detalle = data.detalle;
  this.element = data.element;
 }
 toggleDetail(){
  this.mostrarDetalle = !this.mostrarDetalle;
 }
}


