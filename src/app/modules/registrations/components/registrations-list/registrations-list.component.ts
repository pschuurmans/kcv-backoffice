import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Registration } from 'src/app/models/registration';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.scss']
})
export class RegistrationsListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;

  eventId = '';
  registrations: Registration[] = [];

  columns = [
    { name: 'Voornaam', prop: 'first_name' },
    { name: 'Achternaam', prop: 'last_name' },
    { name: 'Geregistreerd', prop: 'timestamp', pipe: { transform: this.timestampPipe } }
  ];

  timestampPipe(value: any, ...args: any[]) {
    const seconds = value.seconds * 1000; // Convert timestamp to date
    return new Date(seconds).toLocaleString('nl-NL');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId'); // Save url parameter in variable
    this.getRegistrations().subscribe(
      (data: Registration[]) => this.registrations = data,
      err => console.log(err)
    );
  }

  getRegistrations() {
    return this.afs.collection('registrations', ref => ref.where('event_id', '==', this.eventId)).snapshotChanges()
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
      this.showRegistration(event.row.id);
    }
  }

  showRegistration(id: number) {
    this.router.navigate(['/registrations/' + id]);
  }

}
