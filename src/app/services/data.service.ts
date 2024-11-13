import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resources } from '../interfaces/resources.interface';
import { map } from 'rxjs/operators';
import { Category } from '~/interfaces/category.interface';
import { db } from '~/firebase.config';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, DocumentReference, CollectionReference, Firestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})

export class DataService {

  private jsonUrl = 'assets/data.json';
  private dataSubject = new BehaviorSubject<Resources | null>(null);

  constructor(private http: HttpClient, private firestore: Firestore) { }

  //Category
  private categoryMap: { [key: string]: string } = {
    'design': 'Diseño UX/UI',
    'frontend': 'Frontend',
    'backend': 'Backend',
    'other': 'Otros'
  };

  getCategories(): Category[] {
    return [
      { id: 1, name: 'Diseño UX/UI' },
      { id: 2, name: 'Backend' },
      { id: 3, name: 'Frontend' },
      { id: 4, name: 'Otros' }
    ];
  }

  mapCategory(category: string | null): string | null {
    return this.categoryMap[category || ''] || category;
  }

  private categoriesData: { category: string, subcategories: string[] }[] = [
    { category: 'design', subcategories: ['colors', 'fonts', 'icons', 'images'] },
    { category: 'backend', subcategories: ['learningTools', 'onlineCompilers', 'exercisesChallenges'] },
    { category: 'frontend', subcategories: ['onlineCompilers2', 'CSS_Tools', 'apis'] },
    { category: 'other', subcategories: ['extensions', 'security', 'dba'] }
  ];

  getCategoriesData() {
    return this.categoriesData;
  }

  //Subcategory

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


  getJson(category: string): Observable<Resources[]> {
    const params = new HttpParams().set('category', category);
    return this.http.get<Resources[]>(this.jsonUrl, { params })
  }

  getByName(name: string): Observable<Resources[]> {
    return this.http.get<Resources[]>(this.jsonUrl).pipe(
      map(data => this.filterByName(data, name))
    );
  }

  private filterByName(data: Resources[], name: string): Resources[] {
    return data.filter(item => item.name === name);
  }

  //Mapear datos

  getSubCategoryName(subcategory: string): string {
    return this.subCategoryMap[subcategory] || 'Nombre no disponible'; // Valor predeterminado
  }


  //Enviar datos
  setData(data: Resources): void {
    this.dataSubject.next(data);
  }
  getData(): Observable<Resources | null> {
    return this.dataSubject.asObservable();
  }


  addResource(resource: Resources): Promise<void> {
    const resourceRef = collection(this.firestore, 'resources');
    return addDoc(resourceRef, resource)
      .then(() => {
        console.log('Recurso agregado correctamente');
      })
      .catch((error) => {
        console.error('Error al agregar el recurso:', error);
      });
  }
  
}