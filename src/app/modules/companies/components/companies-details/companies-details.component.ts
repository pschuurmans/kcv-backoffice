import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Company } from 'src/app/models/company';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-companies-details',
  templateUrl: './companies-details.component.html',
  styleUrls: ['./companies-details.component.scss']
})
export class CompaniesDetailsComponent implements OnInit {
  companyId: string;

  private companyDoc: AngularFirestoreDocument<Company>;
  company: Observable<Company>;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.companyId = this.route.snapshot.paramMap.get('companyId'); // Save url parameter in variable
    this.companyDoc = afs.doc<Company>('companies/' + this.companyId);
    this.company = this.companyDoc.valueChanges();
  }

  ngOnInit() {
  }

  editCompany() {
    this.router.navigate(['/companies/' + this.companyId + '/edit']);
  }

  deleteCompany() {
    this.afs.doc('companies/' + this.companyId).delete();
    this.router.navigate(['/companies']);
  }


}
