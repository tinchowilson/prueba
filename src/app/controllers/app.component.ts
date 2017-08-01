import { Component, OnInit } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: '../views/app.component.html',
  styleUrls: ['../css/app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Multifacturas';

  constructor(
        ) { }

  ngOnInit(): void {
      
  }
}
