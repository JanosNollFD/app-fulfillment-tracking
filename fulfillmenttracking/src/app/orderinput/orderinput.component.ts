import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderinput',
  templateUrl: './orderinput.component.html',
  styleUrls: ['./orderinput.component.css']
})
export class OrderinputComponent implements OnInit {
  barcode: string='';
  values: string[] =[];
  constructor() { }

  ngOnInit(): void {
  }
  onKey(event: any) {
    console.log("EVENT!!!!!!!!!!!!!!" + event)
    if (event.key == 'Enter') this.barcode = '';
    else this.barcode = this.barcode + event.key; // event.target.value;
}
}
