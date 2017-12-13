///<reference path="../../node_modules/@angular/router/src/router.d.ts"/>
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router){}

  public toPrevPage() {
    this.router.navigate(['']);
  }
}
