import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Company } from 'src/app/models/company';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-companies-add',
  templateUrl: './companies-add.component.html',
  styleUrls: ['./companies-add.component.scss']
})
export class CompaniesAddComponent implements OnInit {
  private companiesCollection: AngularFirestoreCollection<Company>;

  companyForm = new FormGroup({
    name: new FormControl(''),
  });

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.companiesCollection = afs.collection<Company>('companies');
  }

  ngOnInit() {
  }

  onSubmit() {
    this.companiesCollection.add({
      name: this.companyForm.get('name').value,
      updated_at: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(
        () => this.router.navigate(['/companies'])
      );
  }
}
