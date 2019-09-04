import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Person } from 'src/app/models/person';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.scss']
})
export class PersonAddComponent implements OnInit {
  private personsCollection: AngularFirestoreCollection<Person>;

  personForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
  });

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.personsCollection = afs.collection<Person>('persons');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.personsCollection.add({
      first_name: this.personForm.get('first_name').value,
      last_name: this.personForm.get('last_name').value,
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(
        () => this.router.navigate(['/persons'])
      );
  }

}
