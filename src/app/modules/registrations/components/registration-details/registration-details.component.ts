import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from 'src/app/models/registration';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.scss']
})
export class RegistrationDetailsComponent implements OnInit {
  registrationId: string;

  private registrationDoc: AngularFirestoreDocument<Registration>;
  registration: Observable<Registration>;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.registrationId = this.route.snapshot.paramMap.get('registrationId'); // Save url parameter in variable
    this.registrationDoc = afs.doc<Registration>('registrations/' + this.registrationId);
    this.registration = this.registrationDoc.valueChanges();
  }

  ngOnInit() {
  }

  editRegistration() {
    this.router.navigate(['/registrations/' + this.registrationId + '/edit']);
  }

  deleteRegistration() {
    this.afs.doc('registrations/' + this.registrationId).delete();
    this.router.navigate(['/registrations']);
  }

}
