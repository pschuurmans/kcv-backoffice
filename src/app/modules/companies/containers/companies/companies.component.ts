import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;

  companies: Company[] = [];

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCompanies().subscribe(
      (data: Company[]) => this.companies = data,
      err => console.log(err)
    );
  }

  getCompanies() {
    return this.afs.collection('companies').snapshotChanges()
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
      this.showCompany(event.row.id);
    }
  }

  showCompany(id: number) {
    this.router.navigate(['/companies/' + id]);
  }

}
