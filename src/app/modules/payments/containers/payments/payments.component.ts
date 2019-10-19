import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Payment } from 'src/app/models/payment';
import { PaymentStatusPipe } from 'src/app/core/pipes/payment-status.pipe';
import { PaymentAmountPipe } from 'src/app/core/pipes/payment-amount.pipe';
import { TimestampPipe } from 'src/app/core/pipes/timestamp.pipe';
import { DatePipe } from '@angular/common';

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
    { name: 'Bedrag', prop: 'amount', pipe: new PaymentAmountPipe(), maxWidth: 100 },
    { name: 'Status', pipe: new PaymentStatusPipe(), maxWidth: 150 },
    { name: 'Beschrijving', prop: 'description' },
    { name: 'Datum', prop: 'createdAt', pipe: new DatePipe('nl-NL') },
  ];

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCompanies().subscribe(
      (data: Payment[]) => this.payments = data,
      err => console.log(err)
    );
  }

  getCompanies() {
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
