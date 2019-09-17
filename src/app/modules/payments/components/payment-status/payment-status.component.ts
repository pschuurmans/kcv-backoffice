import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  paymentId;
  data: any;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {
    this.paymentId = this.route.snapshot.paramMap.get('paymentId'); // Save url parameter in variable
  }

  ngOnInit() {
    this.afs.collection('payments').doc(this.paymentId).get()
      .subscribe(
        data => this.data = data,
        err => console.log(err)
      );
  }

}
