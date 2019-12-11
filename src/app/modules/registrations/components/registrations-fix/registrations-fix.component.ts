import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registrations-fix',
  templateUrl: './registrations-fix.component.html',
  styleUrls: ['./registrations-fix.component.scss']
})
export class RegistrationsFixComponent implements OnInit {
  registrations = [];

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.afs
      .collection('registrations', ref =>
        ref.where('event_id', '==', 'ht-2019')
      )
      .get()
      .toPromise()
      .then(
        data => {
          console.log(data);
          this.registrations = data.docs;
          this.fixData();
        }
      );
  }

  fixData() {
    this.registrations.forEach(async element => {
      const document: any = element.data();
      if (document.rommmates !== undefined) {
        await this.afs
          .doc('registrations/' + element.id)
          .update({
            roommates: document.rommmates
          })
          .then(() =>
            console.log(element.id + ' : Overwritten roommates')
          );
      }
      if (document.postcal_code !== undefined) {
        await this.afs
          .doc('registrations/' + element.id)
          .update({
            postal_code: document.postcal_code
          })
          .then(() =>
            console.log(element.id + ' : Overwritten postal_code')
          );
      }
      // if (document.email !== undefined) {
      //   await this.afs
      //     .doc('registrations/' + element.id)
      //     .update({
      //       new_email: document.email
      //     })
      //     .then(() =>
      //       console.log(element.id + ' : Overwritten new_email')
      //     );
      // }
      // if (document.first_name !== undefined) {
      //   await this.afs
      //     .doc('registrations/' + element.id)
      //     .update({
      //       new_first_name: document.first_name
      //     })
      //     .then(() =>
      //       console.log(element.id + ' : Overwritten new_first_name')
      //     );
      // }
    });
  }
}
