import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;

  persons: Person[] = [];

  columns = [
    { name: 'Voornaam', prop: 'first_name' },
    { name: 'Achternaam', prop: 'last_name' },
    { name: 'Aangemaakt', prop: 'created_at', pipe: { transform: this.timestampPipe } }
  ];

  timestampPipe(value: any, ...args: any[]) {
    const seconds = value.seconds * 1000; // Convert timestamp to date
    return new Date(seconds).toLocaleString('nl-NL');
  }

  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.getPersons();
  }

  getPersons() {
    this.afs.collection('persons').valueChanges()
      .subscribe(
        (data: Person[]) => this.persons = data,
        error => console.log(error)
      );
  }

}
