import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


export class Datas {

  constructor(public body: string, 
              public category: string, 
              public title: string, 
              public keywords: string, 
              public favorite: boolean) {}
}


@Injectable()
export class SearchService {

  public datas: Datas[] = [];

  constructor(private http: HttpClient) {}

  public getJSONDatas(): Observable<any> {
    return this.http.get("./assets/swm_waste_wizard_APR.json").pipe(
      map((result: any) => {
        this.datas = result;
        return result;
      })
    )
 
   }
   public findDatasToDisplay(searchTerm: string): string[] {
     let datasToDisplay = [];
     this.datas.forEach((e) => {
      if (e.keywords.includes(searchTerm)) {
        datasToDisplay.push(e)
      }
    });
    return datasToDisplay;
  }

  public favoriteChecking(title): string[]{
    let favorites = [];
    this.datas.forEach((e) => {
      if (e.title === title) {
        console.log(e)
        if(!e.favorite) {
          e.favorite = true;
        }
        else
        e.favorite = false;
      }
    })
    this.datas.forEach((e) => {
      if(e.favorite)
        favorites.push(e)
    })

    return favorites;
  }
}
