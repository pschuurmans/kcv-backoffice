import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Event } from '../../../../models/event';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {
  docs: Event[] = [];

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection('events').valueChanges()
      .subscribe(
        (data: Event[]) => this.docs = data,
        err => console.log(err)
      );
  }

}
