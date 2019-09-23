import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  payment: Payment;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
  }

  getPerson() {
    const personId = this.route.snapshot.paramMap.get('personId');
    this.afs.collection('payments').doc(personId).valueChanges()
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }


}
