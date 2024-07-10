import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFStore, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root' // Hace que este servicio sea global en la aplicación
})
export class GifsService {
  private _historial: string[] = [];
  private readonly APIKEY: string = '5ohe3K58tURp5XQIN71WD59ONUJ68un0';
  public resultados: Gif[] = [];

  constructor(private http: HttpClient) {
    if (this.isLocalStorageAvailable()) {
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    }
  }

  get historial(): string[] {
    // Devolvemos una copia del historial para evitar modificaciones directas
    return [...this._historial];
  }

  buscargift(query: string): void {
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('historial', JSON.stringify(this._historial));
      }
    }

    const params = new HttpParams()
      .set('api_key', this.APIKEY)
      .set('q', query)
      .set('limit', '20');

    this.http.get<SearchGIFStore>('https://api.giphy.com/v1/gifs/search', { params })
      .subscribe((resp: SearchGIFStore) => {
        this.resultados = resp.data;
        if (this.isLocalStorageAvailable()) {
          localStorage.setItem('resultados', JSON.stringify(this.resultados));
        }
      });
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
