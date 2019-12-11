import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Registration } from 'src/app/models/registration';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-registrations-edit',
  templateUrl: './registrations-edit.component.html',
  styleUrls: ['./registrations-edit.component.scss']
})
export class RegistrationsEditComponent implements OnInit {
  registrationId: string;

  private registrationDoc: AngularFirestoreDocument<Registration>;
  registration: Observable<Registration>;

  registrationForm = new FormGroup({
    birthday: new FormControl(''),
    city: new FormControl(''),
    contact_preferences: new FormControl(''),
    country: new FormControl(''),
    email: new FormControl(''),
    email2: new FormControl(''),
    event_id: new FormControl(''),
    first_aid: new FormControl(''),
    first_name: new FormControl(''),
    first_time: new FormControl(''),
    house_nr: new FormControl(''),
    job: new FormControl(''),
    id: new FormControl(''),
    last_name: new FormControl(''),
    mobile: new FormControl(''),
    motivation: new FormControl(''),
    notes: new FormControl(''),
    participation: new FormControl(''),
    phone: new FormControl(''),
    phone2: new FormControl(''),
    postal_code: new FormControl(''),
    street: new FormControl(''),
    track: new FormControl(''),
    roommates: new FormControl(''),
  });

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.registrationId = this.route.snapshot.paramMap.get('registrationId'); // Save url parameter in variable
    afs.doc<Registration>('registrations/' + this.registrationId).valueChanges()
      .subscribe(
        data => this.registrationForm.patchValue(data)
      );
  }

  ngOnInit() {
  }

  onSubmit() {
    this.afs.doc('registrations/' + this.registrationId).update({
      first_name: this.registrationForm.get('first_name').value,
      last_name: this.registrationForm.get('last_name').value,
      street: this.registrationForm.get('street').value,
      house_nr: this.registrationForm.get('house_nr').value,
      postal_code: this.registrationForm.get('postal_code').value,
      city: this.registrationForm.get('city').value,
      country: this.registrationForm.get('country').value,
      mobile: this.registrationForm.get('mobile').value,
      phone: this.registrationForm.get('phone').value,
      email: this.registrationForm.get('email').value,
      roommates: this.registrationForm.get('roommates').value,
      notes: this.registrationForm.get('notes').value,
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(
        () => this.router.navigate(['/registrations/' + this.registrationId])
      );
  }

}
