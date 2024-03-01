import { Component, OnInit, ViewEncapsulation, ElementRef, Input, OnDestroy } from '@angular/core';
import { ModalsService } from 'src/services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ww-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() id?: string;
  isOpen = false;
  private element: any;
  public data: any;
  private modalOpenSubscription: Subscription | undefined;

  constructor(
    private modalService: ModalsService,
    private el: ElementRef) { 
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.modalOpenSubscription = this.modalService.onModalOpen.subscribe(modalId => {
      if (modalId === this.id) {
        this.modalService.add(this);
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    this.modalOpenSubscription?.unsubscribe();

    // Remove self from modal service
    this.modalService.remove();

    // Remove element from HTML
    this.element.remove();
  }

  open() {
    this.element.style.display = 'block';
    document.body.classList.add('ww-modal-open');
    this.isOpen = true;
  }

  close() {
    this.element.style.display='none';
    document.body.classList.remove('ww-modal-open');
    this.isOpen = false;
  }
  

}