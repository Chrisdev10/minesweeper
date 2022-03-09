import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private panelsize: number = 0;
  private bombNb: number = 0;
  constructor() { }


    /**
     * Getter $panelsize
     * @return {number }
     */
	public get $panelsize(): number  {
		return this.panelsize;
	}

    /**
     * Getter $bombNb
     * @return {number }
     */
	public get $bombNb(): number  {
		return this.bombNb;
	}

    /**
     * Setter $panelsize
     * @param {number } value
     */
	public set $panelsize(value: number ) {
		this.panelsize = value;
	}

    /**
     * Setter $bombNb
     * @param {number } value
     */
	public set $bombNb(value: number ) {
		this.bombNb = value;
	}
  
}
