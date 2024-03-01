import { Component,Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.css']
})
export class LinkButtonComponent {

  @Input() linkText: string;
  @Input() text: string;

  constructor(){
    this.linkText ='';
    this.text = '';
  }

}
