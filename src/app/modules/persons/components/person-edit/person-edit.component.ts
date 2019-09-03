import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';
import { Person } from 'src/app/models/person';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  personId: string;

  private personDoc: AngularFirestoreDocument<Person>;
  person: Observable<Person>;

  personForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
  });

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.personId = this.route.snapshot.paramMap.get('personId'); // Save url parameter in variable
    afs.doc<Person>('persons/' + this.personId).valueChanges()
      .subscribe(
        data => this.personForm.patchValue(data)
      );
  }

  ngOnInit() {
  }

  onSubmit() {
    this.afs.doc('persons/' + this.personId).update({
      first_name: this.personForm.get('first_name').value,
      last_name: this.personForm.get('last_name').value,
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(
        () => this.router.navigate(['/persons'])
      );
  }
}
