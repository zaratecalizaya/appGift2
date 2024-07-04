import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {
//en este caso buscamos por referencia local opera buscando el elemento y lo almacena
  @ViewChild("txtbuscar")

  txtbuscar!: ElementRef<HTMLInputElement>;// agregamos esto ultimo para tener propiedades de js
 constructor(private giftser:GifsService){ // inyectamos el serices en e constructor

 }
 
  buscar(){
   const dato=this.txtbuscar.nativeElement.value;
  if(dato.trim().length!=0){
     
   this.giftser.buscargift(dato);
   this.txtbuscar.nativeElement.value='';
  }
  
  }
}
