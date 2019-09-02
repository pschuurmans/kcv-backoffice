import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  auth$: Observable<boolean>;

  constructor(
    store: Store<{ auth: boolean }>
  ) {
    this.auth$ = store.pipe(select('auth'));
  }

  ngOnInit() {
  }
}
