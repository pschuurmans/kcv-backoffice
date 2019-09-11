import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Person } from 'src/app/models/person';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {
  personId: string;

  private personDoc: AngularFirestoreDocument<Person>;
  person: Observable<Person>;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.personId = this.route.snapshot.paramMap.get('personId'); // Save url parameter in variable
    this.personDoc = afs.doc<Person>('persons/' + this.personId);
    this.person = this.personDoc.valueChanges();
  }

  ngOnInit() {
  }

  editPerson() {
    this.router.navigate(['/persons/' + this.personId + '/edit']);
  }

  deletePerson() {
    const userAgreed = confirm('Weet je zeker dat je dit item wilt verwijderen?');
    if (userAgreed) {
      this.afs.doc('persons/' + this.personId).delete();
      this.router.navigate(['/persons']);
    }
  }

}
