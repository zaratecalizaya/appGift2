import { Component } from '@angular/core';
import { GifsService } from '../../gift/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
constructor(private gifser:GifsService){

}

get historial(){
  return this.gifser.historial;
}
}
