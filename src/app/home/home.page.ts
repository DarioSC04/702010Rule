import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  public einkommenNetto: number = 0;
  public frequenz: string = 'monthly';
  public showKategorien: boolean = false;

  constructor(private alertController: AlertController,
              private navCtrl: NavController) {}

  ionViewWillEnter() {
    this.reset();
  }

  public reset() {
    this.einkommenNetto = 0;
    this.frequenz = 'monthly';
    this.showKategorien = false;
  }

  public berechnen() {
    // Validierung: Prüfe ob Wert leer ist
    if (this.einkommenNetto === 0 || this.einkommenNetto === undefined || this.einkommenNetto === null) {
      this.showAlert('Fehler', 'Bitte geben Sie ein Einkommen ein!');
      return;
    }

    // Validierung: Prüfe ob Wert eine positive Zahl ist
    if (isNaN(this.einkommenNetto)) {
      this.showAlert('Fehler', 'Das Einkommen muss eine gültige Zahl sein!');
      return;
    }

    // Validierung: Prüfe ob Wert negativ ist
    if (this.einkommenNetto < 0) {
      this.showAlert('Fehler', 'Das Einkommen kann nicht negativ sein!');
      return;
    }

    // Validierung: Prüfe ob Wert zu hoch ist
    if (this.einkommenNetto > 1000000) {
      this.showAlert('Fehler', 'Das Einkommen ist zu hoch! Bitte geben Sie einen realistischen Wert ein. (<= 1.000.000)');
      return;
    }

    let einkommen = this.einkommenNetto;

    // Wenn jährlich ausgewählt, zu monatlich umrechnen
    if (this.frequenz === 'annual') {
      einkommen = this.einkommenNetto / 12;
    }
    console.log('Einkommen für Berechnung:', einkommen);
    
    // Navigiere zur Ergebnis-Seite und übergebe die Daten
    this.navCtrl.navigateForward('/ergebnis', {
      queryParams: {
        einkommen: einkommen,
        frequenz: this.frequenz,
        showKategorien: String(this.showKategorien)
      }
    });
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}

  













