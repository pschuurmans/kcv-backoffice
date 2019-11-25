import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Event } from '../../../../models/event';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {
  events = [];

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
    ) { }

  ngOnInit() {
    this.db.collection('access').doc(this.afAuth.auth.currentUser.uid).valueChanges()
      .subscribe(
        (data: any) => this.events = data.events,
        err => console.log(err)
      );
  }

}
