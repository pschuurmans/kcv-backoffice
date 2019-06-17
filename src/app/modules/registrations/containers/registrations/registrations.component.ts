import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {
  docs: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.docs = db.collection('registrations').valueChanges();
  }

  ngOnInit() {
  }

}
