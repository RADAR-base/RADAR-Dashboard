import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-simple-bar',
  template: `
    <svg *ngIf="actualWidth" viewBox="0 0 90 5">
      <rect
        [attr.width]="actualWidth"
        [attr.height]="height"
        [attr.class]="type"
      ></rect>
      <rect
        [attr.width]="width - actualWidth"
        [attr.x]="actualWidth"
        [attr.height]="height"
        class="backbar"
      ></rect>
    </svg>
  `,
  styleUrls: ['./simple-bar.component.scss']
})
export class SimpleBarComponent implements OnInit {
  @Input() data
  type: string
  value: number
  actualWidth: number

  width = 90
  height = 4

  ngOnInit() {
    this.type = this.data.type
    this.value = this.data.value
    this.actualWidth = this.value * this.width
  }
}
