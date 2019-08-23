import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Registration } from 'src/app/models/registration';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.scss']
})
export class RegistrationsListComponent implements OnInit {
  eventId = '';
  items: Registration[] = [];

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('event');
    this.afs.collection('registrations', ref => ref.where('event_id', '==', this.eventId)).valueChanges()
      .subscribe(
        (data: Registration[]) => this.items = data,
        err => console.log(err)
      );
  }

}
