import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFStore } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root' //lo elea a un niel global de la aplicacion
})
export class GifsService {
  private _historial:string[]=[];
  private APIKEY:string='5ohe3K58tURp5XQIN71WD59ONUJ68un0';
  public resultados:any[]=[];
  constructor(private http:HttpClient) { }


get historial(){
  return [...this._historial];// hacemos esto para que no se modifique en el historial original
}

buscargift( query:string){
  query=query.trim().toLocaleLowerCase();//que no se inserte datos repetidos en minuscula
  if(!this._historial.includes(query)){
    this._historial.unshift(query);// agregamos al inicio de la cadena4

  }
 this._historial=this._historial.splice(0,10);
  console.log(this._historial);
  this.http.get<SearchGIFStore>(`https://api.giphy.com/v1/gifs/search?api_key=5ohe3K58tURp5XQIN71WD59ONUJ68un0&q=${query}&limit=20`).subscribe(
    (resp)=>{
      this.resultados=resp.data;
    }
  )
}

}
