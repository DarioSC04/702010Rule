import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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

  public Wohnen: number = 0;
  public Essen: number = 0;
  public Transport: number = 0;
  public Nebenkosten: number = 0;
  public Versicherungen: number = 0;

  public showKategorien: boolean = false;
  public frequenz: string = 'monthly';

  constructor(
  private speicher: Speicher,
  private activatedRoute: ActivatedRoute,
  private navCtrl: NavController
) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['einkommen']) {
        this.einkommenNetto = parseFloat(params['einkommen']);
        this.frequenz = params['frequenz'] || 'monthly';
        this.showKategorien = params['showKategorien'] === 'true';
        this.calcPercentiles100();
      }
    });
  }

  public calcPercentiles100() {
    this.gesamterGrundbedarf70 = parseFloat((this.einkommenNetto * 0.7).toFixed(2));
    this.sparenUndSchulden20 = parseFloat((this.einkommenNetto * 0.2).toFixed(2));
    this.lifestyleInvestments10 = parseFloat((this.einkommenNetto * 0.1).toFixed(2));
    this.Wohnen = parseFloat((this.gesamterGrundbedarf70 * 0.4).toFixed(2));
    this.Essen = parseFloat((this.gesamterGrundbedarf70 * 0.2).toFixed(2));
    this.Transport = parseFloat((this.gesamterGrundbedarf70 * 0.15).toFixed(2));
    this.Nebenkosten = parseFloat((this.gesamterGrundbedarf70 * 0.15).toFixed(2));
    this.Versicherungen = parseFloat((this.gesamterGrundbedarf70 * 0.1).toFixed(2));
  }

  
  public async speichernRechnung() {
    const rechnung: Rechnung = {
      id: Date.now().toString(),
      einkommen: this.einkommenNetto,
      gesamterGrundbedarf70: this.gesamterGrundbedarf70,
      sparenUndSchulden20: this.sparenUndSchulden20,
      lifestyleInvestments10: this.lifestyleInvestments10,
      Wohnen: this.Wohnen,
      Essen: this.Essen,
      Transport: this.Transport,
      Nebenkosten: this.Nebenkosten,
      Versicherungen: this.Versicherungen,
      datum: new Date()
    };

    await this.speicher.addRechnung(rechnung);
    console.log('Rechnung gespeichert!');
  }
    

  public neuLaden() {
    this.einkommenNetto = 0;
    this.gesamterGrundbedarf70 = 0;
    this.sparenUndSchulden20 = 0;
    this.lifestyleInvestments10 = 0;
    this.Wohnen = 0;
    this.Essen = 0;
    this.Transport = 0;
    this.Nebenkosten = 0;
    this.Versicherungen = 0;
    this.navCtrl.navigateBack('/home');
  }

}
