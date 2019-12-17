import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Registration } from 'src/app/models/registration';
import { map } from 'rxjs/operators';
import { TimestampPipe } from 'src/app/core/pipes/timestamp.pipe';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ExportService } from '../../services/export.service';

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
    { name: 'Deelname', prop: 'participation' },
    { name: 'Geregistreerd', prop: 'timestamp', pipe: new TimestampPipe() }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    private el: ElementRef,
    private loaderService: LoaderService,
    private exportService: ExportService
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('eventId'); // Save url parameter in variable
    this.loaderService.show();
    this.getRegistrations().subscribe(
      (data: Registration[]) => {
        this.registrations = data;
        this.loaderService.hide();
      },
      err => {
        console.log(err);
        this.loaderService.hide();
      }
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

  export() {
    // this.exportToExcelService.exportExcel(this.registrations, 'registrations');
  }

}
