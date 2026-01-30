import { Component, OnInit } from '@angular/core';
import { Speicher, Rechnung } from '../speicher';

@Component({
  selector: 'app-gespeicherte-ergebnisse',
  templateUrl: './gespeicherte-ergebnisse.page.html',
  styleUrls: ['./gespeicherte-ergebnisse.page.scss'],
  standalone: false,
})
export class GespeicherteErgebnissePage implements OnInit {

  public rechnungen: Rechnung[] = [];

  constructor(private speicher: Speicher) { }

  ngOnInit() {
    this.loadRechnungen();
  }

  ionViewWillEnter() {
    this.loadRechnungen();
  }

  public loadRechnungen() {
    this.rechnungen = this.speicher.getRechnungen();
  }

  public async deleteRechnung(id: string) {
    await this.speicher.deleteRechnung(id);
    this.loadRechnungen();
  }

  public async deleteAll() {
    await this.speicher.deleteAll();
    this.loadRechnungen();
  }

}
