import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

  transform(status: string): string {
    if (status === 'open') {
      return '<span class="tag is-light">Open</span>';
    }
    if (status === 'canceled') {
      return '<span class="tag is-dark">Geannuleerd</span>';
    }
    if (status === 'pending') {
      return '<span class="tag is-info">In afwachting</span>';
    }
    if (status === 'expired') {
      return '<span class="tag is-warning">Verlopen</span>';
    }
    if (status === 'failed') {
      return '<span class="tag is-danger">Mislukt</span>';
    }
    if (status === 'paid') {
      return '<span class="tag is-success">Betaald</span>';
    }

    return status;
  }

}
