import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Data } from '../container/data.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private jsonUrl = 'assets/data.json';
  private dataSubject = new BehaviorSubject<Data | null>(null);

  private categoryMap: { [key: string]: string } = {
    'design': 'Diseño UX/UI',
    'frontend': 'Frontend',
    'backend' : 'Backend',
    'other' : 'Otros'
  };

  
  private subCategoryMap: { [key: string]: string } = {
    colors: 'Generador de paletas de colores',
    fonts: 'Fuentes de texto',
    icons: 'Iconos y Gráficos',
    images: 'Recursos de Imágenes',
    learningTools: 'Visores de algoritmos',
    onlineCompilers: 'Compiladores backend Online',
    onlineCompilers2: 'Compiladores frontend Online',
    exercisesChallenges: 'Ejercicios y retos',
    CSS_Tools: 'Herramientas CSS',
    apis: 'API Testing',
    extensions: 'Extensiones de Visual Studio Code',
    security: 'Herramientas de Seguridad',
    dba: 'Herramientas DBA'
  };

  constructor(private http: HttpClient) { }

  getJson(category: string): Observable<Data[]> {
    const params = new HttpParams().set('category', category);
    return this.http.get<Data[]>(this.jsonUrl, { params })
  }

  getByName(name: string): Observable<Data[]> {
    return this.http.get<Data[]>(this.jsonUrl).pipe(
      map(data => this.filterByName(data, name))
    );
  }

  private filterByName(data: Data[], name: string): Data[] {
    return data.filter(item => item.name === name);
  }

  //Mapear datos
  mapCategory(category: string | null): string | null {
    return this.categoryMap[category || ''] || category;
  }

  getSubCategoryName(subcategory: string): string {
    return this.subCategoryMap[subcategory] || 'Nombre no disponible'; // Valor predeterminado
  }



  //Enviar datos
  setData(data: Data): void {
    this.dataSubject.next(data);
  }
  getData(): Observable<Data | null> {
    return this.dataSubject.asObservable();
  }

  //Alert
  private alertSubject: BehaviorSubject<[string, string] | null> =
    new BehaviorSubject<[string, string] | null>(null);

  private confirmSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  getAlert(): Observable<[string, string] | null> {
    return this.alertSubject.asObservable();
  }

  showAlert(message: string, titulo: string): void {
    this.alertSubject.next([message, titulo]);
  }

  getConfirmation(): Observable<boolean> {
    return this.confirmSubject.asObservable();
  }

  confirmAction(confirmed: boolean): void {
    this.confirmSubject.next(confirmed);
  }
}
