import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentAmount'
})
export class PaymentAmountPipe implements PipeTransform {

  transform(amount: { value: string, currency: string }): string {
    if (amount.currency === 'EUR') {
      return `€ ${amount.value}`;
    }
    return amount.value;
  }

}
