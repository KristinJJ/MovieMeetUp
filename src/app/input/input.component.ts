import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {
  value = '';
  submittedValue = '';
  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    this.submittedValue = this.value;
  }

}

