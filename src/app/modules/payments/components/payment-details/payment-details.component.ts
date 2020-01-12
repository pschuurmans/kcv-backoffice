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
    const paymentId = this.route.snapshot.paramMap.get('paymentId');
    this.getPayment(paymentId);
  }

  getPayment(id: string) {
    this.afs.collection('payments').doc(id).valueChanges()
      .subscribe(
        (data: Payment) => this.payment = data,
        err => console.log(err)
      );
  }


}
