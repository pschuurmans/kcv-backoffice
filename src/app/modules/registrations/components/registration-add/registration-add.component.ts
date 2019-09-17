import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Registration } from 'functions/src/models/registration';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-add',
  templateUrl: './registration-add.component.html',
  styleUrls: ['./registration-add.component.scss']
})
export class RegistrationAddComponent implements OnInit {
  private registrationsCollection: AngularFirestoreCollection<any>;

  registrationForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
  });

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.registrationsCollection = afs.collection<any>('registrations');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.registrationsCollection.add({
      first_name: this.registrationForm.get('first_name').value,
      last_name: this.registrationForm.get('last_name').value,
      event_id: 'ht-2019',
      participation: 'Medewerker',
      email: 'schuurmans.pieter@gmail.com'
    })
      .then(
        () => this.router.navigate(['/registrations'])
      );
  }

}
