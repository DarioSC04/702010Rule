import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import {Storage} from '@ionic/storage-angular'

export interface Rechnung {
  id: string;
  einkommen: number;
  gesamterGrundbedarf70: number;
  sparenUndSchulden20: number;
  lifestyleInvestments10: number;
  Wohnen: number;
  Essen: number;
  Transport: number;
  Nebenkosten: number;
  Versicherungen: number;
  datum: Date;
}
  

@Injectable({
  providedIn: 'root',
})
export class Speicher {

  private rechnungen: Rechnung[] = [];

  constructor (private storage: Storage){
    this.storage.create();
    this.loadRechnungen();
  }

  // Neue Rechnung hinzufügen und speichern
  async addRechnung(rechnung: Rechnung): Promise<void> {
    this.rechnungen.push(rechnung);
    await this.storage.set('rechnungen', this.rechnungen);
  }

  // Alle Rechnungen abrufen
  getRechnungen(): Rechnung[] {
    return this.rechnungen;
  }

  // Eine Rechnung löschen (nach ID)
  async deleteRechnung(id: string): Promise<void> {
    this.rechnungen = this.rechnungen.filter(r => r.id !== id);
    await this.storage.set('rechnungen', this.rechnungen);
  }

  // Letztes Objekt im Array löschen
  async deleteLast(): Promise<void> {
    if (this.rechnungen.length > 0) {
      this.rechnungen.pop();
      await this.storage.set('rechnungen', this.rechnungen);
    }
  }

  // Alle Objekte im Array löschen
  async deleteAll(): Promise<void> {
    this.rechnungen = [];
    await this.storage.set('rechnungen', []);
  }

  // Rechnungen aus Storage laden
  private async loadRechnungen(): Promise<void> {
    const data = await this.storage.get('rechnungen');
    if (data) {
      this.rechnungen = data;
    }
  }
} 
