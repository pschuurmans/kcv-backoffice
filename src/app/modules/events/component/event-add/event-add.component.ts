import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Event } from 'src/app/core/classes/event';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {
  private dataCollection: AngularFirestoreCollection<Event>;

  eventForm = new FormGroup({
    name: new FormControl(''),
    year: new FormControl(''),
    description: new FormControl(''),
    tag: new FormControl('')
  });

  constructor(private afs: AngularFirestore) {
    this.dataCollection = afs.collection<Event>('events');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.dataCollection.add(this.eventForm.value);
    this.eventForm.reset();
  }

}
