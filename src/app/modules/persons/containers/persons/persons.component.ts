import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Person } from 'src/app/models/person';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;

  persons: any = [];

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPersons().subscribe(
      data => this.persons = data,
      err => console.log(err)
    );
  }

  getPersons() {
    return this.afs.collection('persons').snapshotChanges()
      // https://github.com/angular/angularfire2/issues/1973
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  onActivate(event) {
    if (event.type === 'click') {
      this.showPerson(event.row.id);
    }
  }

  showPerson(id: number) {
    this.router.navigate(['/persons/' + id]);
  }

}
