import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Datas } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public datas = [];
  public searchTerm: string;
  public favoriteDatas = []


  constructor(private searchService: SearchService) { 
  }

  ngOnInit() {
    this.searchService.getJSONDatas().subscribe(data => {
      data.forEach(element => {
        element.body = this.decodeHtml(element.body)
        let data = new Datas(element.body, element.category, element.title, element.keywords, false);
        console.log()
      });
    })

  }

  public decodeHtml(body: string) {
      var newElement = document.createElement('div');
      newElement.innerHTML = body;
      
      if (newElement.childNodes.length === 0) {
        return '';
      } else {
        return newElement.childNodes[0].nodeValue;
      }
  }

  public findDatasToDisplay(): void {
    this.datas = this.searchService.findDatasToDisplay(this.searchTerm);
  }

  public checkEntry():  void {
    if(this.searchTerm === "") {
      this.datas = [];
    }
  }

  public favoriteChecking(title): void {
    this.favoriteDatas = this.searchService.favoriteChecking(title);
  }

}
