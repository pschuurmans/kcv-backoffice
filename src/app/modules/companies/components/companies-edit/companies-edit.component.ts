import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Company } from 'src/app/models/company';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-companies-edit',
  templateUrl: './companies-edit.component.html',
  styleUrls: ['./companies-edit.component.scss']
})
export class CompaniesEditComponent implements OnInit {
  companyId: string;

  private companyDoc: AngularFirestoreDocument<Company>;
  company: Observable<Company>;

  companyForm = new FormGroup({
    name: new FormControl(''),
  });

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.companyId = this.route.snapshot.paramMap.get('companyId'); // Save url parameter in variable
    afs.doc<Company>('companies/' + this.companyId).valueChanges()
      .subscribe(
        data => this.companyForm.patchValue(data)
      );
  }

  ngOnInit() {
  }

  onSubmit() {
    this.afs.doc('companies/' + this.companyId).update({
      name: this.companyForm.get('name').value,
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(
        () => this.router.navigate(['/companies'])
      );
  }

}
