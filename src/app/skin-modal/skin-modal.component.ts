import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-skin-modal',
  templateUrl: './skin-modal.component.html',
  styleUrls: ['./skin-modal.component.scss']
})
export class SkinModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
