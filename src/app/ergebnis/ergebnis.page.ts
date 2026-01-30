import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Speicher, Rechnung } from '../speicher';

@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.page.html',
  styleUrls: ['./ergebnis.page.scss'],
  standalone: false,
})

export class ErgebnisPage implements OnInit {

  public einkommenNetto: number = 0;
  public gesamterGrundbedarf70: number = 0;

  public sparenUndSchulden20: number = 0;
  public lifestyleInvestments10: number = 0;

  public wohnen: number = 0;
  public essen: number = 0;
  public transport: number = 0;
  public nebenkosten: number = 0;
  public versicherungen: number = 0;

  public zeigeKategorien: boolean = false;
  public kommentar: string = '';

  constructor(
  private speicher: Speicher,
  private activatedRoute: ActivatedRoute,
  private navCtrl: NavController,
  private toastController: ToastController
) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['einkommen']) {
        this.einkommenNetto = parseFloat(parseFloat(params['einkommen']).toFixed(2));
        this.zeigeKategorien = params['zeigeKategorien'] === 'true';
        this.kommentar = '';
        this.berechneAufteilung();
      }
    });
  }

  public berechneAufteilung() {
    this.gesamterGrundbedarf70 = parseFloat((this.einkommenNetto * 0.7).toFixed(2));
    this.sparenUndSchulden20 = parseFloat((this.einkommenNetto * 0.2).toFixed(2));
    this.lifestyleInvestments10 = parseFloat((this.einkommenNetto * 0.1).toFixed(2));
    this.wohnen = parseFloat((this.gesamterGrundbedarf70 * 0.4).toFixed(2));
    this.essen = parseFloat((this.gesamterGrundbedarf70 * 0.2).toFixed(2));
    this.transport = parseFloat((this.gesamterGrundbedarf70 * 0.15).toFixed(2));
    this.nebenkosten = parseFloat((this.gesamterGrundbedarf70 * 0.15).toFixed(2));
    this.versicherungen = parseFloat((this.gesamterGrundbedarf70 * 0.1).toFixed(2));
  }

  public async speichernRechnung() {
    const rechnung: Rechnung = {
      id: Date.now().toString(),
      einkommen: this.einkommenNetto,
      gesamterGrundbedarf70: this.gesamterGrundbedarf70,
      sparenUndSchulden20: this.sparenUndSchulden20,
      lifestyleInvestments10: this.lifestyleInvestments10,
      wohnen: this.wohnen,
      essen: this.essen,
      transport: this.transport,
      nebenkosten: this.nebenkosten,
      versicherungen: this.versicherungen,
      datum: new Date(),
      zeigeKategorien: this.zeigeKategorien,
      kommentar: this.kommentar
    };

    await this.speicher.addRechnung(rechnung);
    
    const toast = await this.toastController.create({
      message: 'Rechnung erfolgreich gespeichert! ✅',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }

  public begrenzKommentar() {
    if (this.kommentar && this.kommentar.length > 500) {
      this.kommentar = this.kommentar.substring(0, 500);
    }
  }

  public neuLaden() {
    this.einkommenNetto = 0;
    this.gesamterGrundbedarf70 = 0;
    this.sparenUndSchulden20 = 0;
    this.lifestyleInvestments10 = 0;
    this.wohnen = 0;
    this.essen = 0;
    this.transport = 0;
    this.nebenkosten = 0;
    this.versicherungen = 0;
    this.kommentar = '';
    this.navCtrl.navigateBack('/home');
  }

}
