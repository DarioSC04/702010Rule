import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
  export class Toaster {
    
  constructor (private altertCtrl: AlertController, private toastController: ToastController) {

  }

   async zeigeDialog(titel: string, nachricht: string) {

    const meinAlert =
          await this.alertCtrl.create({
              header  : titel,
              message : nachricht,
              buttons : [ "Ok" ]
          });

    await meinAlert.present();
  }

  async zeigeToast(nachricht: string) {

    const toast =
          await this.toastController.create({
              message : nachricht,
              duration: 2000  // 2000 ms = 2 seconds
          });

    await toast.present();
  }
  

}

