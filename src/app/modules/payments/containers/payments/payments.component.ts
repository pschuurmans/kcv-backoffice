import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Payment } from 'src/app/models/payment';
import { PaymentStatusPipe } from 'src/app/core/pipes/payment-status.pipe';
import { PaymentAmountPipe } from 'src/app/core/pipes/payment-amount.pipe';
import { TimestampPipe } from 'src/app/core/pipes/timestamp.pipe';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;

  payments: Payment[] = [];

  columns = [
    { name: 'ID', prop: 'id' },
    { name: 'Status', pipe: new PaymentStatusPipe() },
    { name: 'Datum', prop: 'timestamp', pipe: new TimestampPipe() },
  ];

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPayments().subscribe(
      (data: Payment[]) => this.payments = data,
      err => console.log(err)
    );
  }

  getPayments() {
    return this.afs.collection('payments').snapshotChanges()
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
      this.showPayment(event.row.id);
    }
  }

  showPayment(id: number) {
    this.router.navigate(['/payments/' + id]);
  }
}
