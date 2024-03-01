import { Injectable, EventEmitter } from '@angular/core';
import { ModalComponent } from 'src/app/modals/modal/modal.component';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  private modals: ModalComponent[] = [];
  public onModalOpen: EventEmitter<string> = new EventEmitter<string>();

  add(modal: ModalComponent) {
    console.log('Active modals before add:', this.modals);
    if(!modal.id || this.modals.find(x => x.id === modal.id)){
        throw new Error('modal must have a unique id attribute');
    }

    //add modal to array of active modals
    this.modals.push(modal);
    console.log('Active modals after add:', this.modals);
  }

  remove(){
    //remove modal from array of active modals
    console.log("Triggered modal removal");
    this.modals = [];
    console.log('Active modals after remove:', this.modals);
  }

  open(id: string){

    this.onModalOpen.emit(id);

    //open modal specified by id
    const modal = this.modals.find(x => x.id === id);

    if(!modal){
      throw new Error (`modal '${id}' not found!`);
    }
    modal.open();
  }

  close(){
    console.log("Triggering modal close");
    const modal = this.modals.find(x => x.isOpen);
    modal?.close();
    console.log("Modal closed");
  }
  
  openModalWithData(id: string, data?: any){
    //open modal specified by id
    const modal = this.modals.find(x => x.id === id);

    if(!modal){
      throw new Error (`modal '${id}' not found!`);
    }
    modal.data = data;
    modal.open();
  }
  constructor() { }
}
