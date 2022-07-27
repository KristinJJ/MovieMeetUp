import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss']
})
export class NameDialogComponent implements OnInit {
  // form: FormGroup | undefined;
  
  userID = '';
  

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NameDialogComponent>  //@Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  ngOnInit() {
    
  }

  save() {
    this.dialogRef.close(this.userID);
  }

  close() {
    this.dialogRef.close(); //{event: 'close', data: this.userID}
  }
}
