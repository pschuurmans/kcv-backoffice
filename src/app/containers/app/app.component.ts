import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  auth$: Observable<boolean>;

  constructor(
    store: Store<{ auth: boolean }>,
    private http: HttpClient
  ) {
    this.auth$ = store.pipe(select('auth'));
  }

  callApi() {
    this.http.get('https://reqres.in/api/users?page=2')
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnInit() {
  }
}
