import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Registration } from 'src/app/models/registration';
import { map } from 'rxjs/operators';
import { TimestampPipe } from 'src/app/core/pipes/timestamp.pipe';
import { LoaderService } from 'src/app/core/services/loader.service';
// import { ExcelService } from '../../services/excel.service';

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
    { name: 'Voornaam', prop: 'personal.first_name' },
    { name: 'Achternaam', prop: 'personal.last_name' },
    // { name: 'Deelname', prop: 'event.tieners.participation' },
    { name: 'Geregistreerd', prop: 'timestamp', pipe: new TimestampPipe() }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore,
    private el: ElementRef,
    private loaderService: LoaderService,
    // private excelService: ExcelService
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
    return this.afs.collection('registrations', ref => ref.where('event.event_id', '==', this.eventId)).snapshotChanges()
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
    // this.excelService.exportAsExcelFile(this.registrations, 'registrations');
    // this.exportService.exportAsExcelFile(this.registrations, 'registrations');
    // const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    // const fileExtension = '.xlsx';
    // exportExcel(this.registrations, 'registrations');

    // function exportExcel(jsonData: any[], fileName: string): void {
    //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    //   const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ['data'] };
    //   const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //   saveExcelFile(excelBuffer, fileName);
    // }

    // function saveExcelFile(buffer: any, fileName: string): void {
    //   const data: Blob = new Blob([buffer], {type: fileType});
    //   FileSaver.saveAs(data, fileName + fileExtension);
    // }
  }

}
