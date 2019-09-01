import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Registration } from 'src/app/models/registration';

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
    { name: 'Geregistreerd', prop: 'created_at', pipe: { transform: this.timestampPipe } }
  ];

  timestampPipe(value: any, ...args: any[]) {
    const seconds = value.seconds * 1000; // Convert timestamp to date
    return new Date(seconds).toLocaleString('nl-NL');
  }

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId'); // Save url parameter in variable
    this.getRegistrations();
  }

  getRegistrations() {
    this.afs.collection('registrations', ref => ref.where('event_id', '==', this.eventId)).valueChanges()
      .subscribe(
        (data: Registration[]) => this.registrations = data,
        err => console.log(err)
      );
  }

}
