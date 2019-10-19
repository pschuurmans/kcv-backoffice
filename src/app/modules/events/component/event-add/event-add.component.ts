import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {
  private dataCollection: AngularFirestoreCollection<Event>;

  prices: {
    participation: string,
    cost: string
  }[];

  eventForm = new FormGroup({
    name: new FormControl(''),
    year: new FormControl(''),
    description: new FormControl(''),
    tag: new FormControl(''),
    price: new FormArray([])
  });

  priceForm = new FormGroup({
    participation: new FormControl(''),
    cost: new FormControl('')
  });

  constructor(private afs: AngularFirestore) {
    this.dataCollection = afs.collection<Event>('events');
  }

  ngOnInit() {
    this.prices = [];
  }

  onSubmit() {
    const event: Event = this.eventForm.value;
    event.price = this.prices;
    this.dataCollection.add(this.eventForm.value);
    this.eventForm.reset();
    this.priceForm.reset();
  }

  addPrice() {
    this.prices.push(this.priceForm.value);
    this.priceForm.reset();
  }

}
