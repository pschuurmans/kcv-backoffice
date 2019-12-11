import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registrations-fix',
  templateUrl: './registrations-fix.component.html',
  styleUrls: ['./registrations-fix.component.scss']
})
export class RegistrationsFixComponent implements OnInit {

  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.afs.collection('registrations', ref => ref.where('event_id', '==', 'ht-2019')).snapshotChanges()
    .subscribe(
      data => {
        data.forEach(element => {
          const document: any = element.payload.doc.data();
          if (document.rommmates !== undefined) {
            this.afs.doc('registrations/' + element.payload.doc.id).update({
              roommates: document.rommmates
            });
            console.log('Roommates fixed on document: ' + element.payload.doc.id);
          }
          if (document.postcal_code !== undefined) {
            this.afs.doc('registrations/' + element.payload.doc.id).update({
              postal_code: document.postcal_code
            });
            console.log('Postal_code fixed on document: ' + element.payload.doc.id);
          }
        });
      }
    );
  }

}
