import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  docs: Observable<any[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.docs = this.afs.collection('events').valueChanges({ idField: 'id' });
  }

  deleteDoc(docId) {
    this.afs.doc('events/' + docId).delete();
  }
}
