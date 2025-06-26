import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent {
constructor( private giftser:GifsService){

}


get resultados(){
  return this.giftser.resultados;
}
modal(){
  
const resultad:string="";

}

}
