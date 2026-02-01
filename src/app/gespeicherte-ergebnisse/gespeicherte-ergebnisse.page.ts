import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Speicher, Rechnung } from '../speicher';

@Component({
  selector: 'app-gespeicherte-ergebnisse',
  templateUrl: './gespeicherte-ergebnisse.page.html',
  styleUrls: ['./gespeicherte-ergebnisse.page.scss'],
  standalone: false,
})
export class GespeicherteErgebnissePage implements OnInit {

  public rechnungen: Rechnung[] = [];

  constructor(private speicher: Speicher, private alertController: AlertController) {}

  ngOnInit() {
    this.rechnungenLaden();
  }

  ionViewWillEnter() {
    this.rechnungenLaden();
  }

  public rechnungenLaden() {
    this.rechnungen = this.speicher.getRechnungen();
  }

  public async rechnungLoeschen(id: string) {
    const alert = await this.alertController.create({
      header: 'Eintrag löschen?',
      message: 'Möchtest du diesen Eintrag wirklich löschen? Dies kann nicht rückgängig gemacht werden.',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Löschen',
          role: 'destructive',
          handler: async () => {
            await this.speicher.rechnungLoeschen(id);
            this.rechnungenLaden();
          }
        }
      ]
    });
    await alert.present();
  }

  public async alleLoeschen() {
    const alert = await this.alertController.create({
      header: 'Alle Einträge löschen?',
      message: 'Möchtest du wirklich ALLE Einträge löschen? Dies kann nicht rückgängig gemacht werden!',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Alle löschen',
          role: 'destructive',
          handler: async () => {
            await this.speicher.alleLoeschen();
            this.rechnungenLaden();
          }
        }
      ]
    });
    await alert.present();
  }

}
