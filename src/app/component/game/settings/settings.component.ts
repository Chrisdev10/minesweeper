import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INSERT_FORM_SETTINGS } from 'src/app/guard/validator.settings';
import { SettingsService } from 'src/app/service/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  form: FormGroup;
  constructor(
    private service: SettingsService,
    private router: Router,
    private builder: FormBuilder
    ) {
      this.form = this.builder.group(INSERT_FORM_SETTINGS);
     }

  ngOnInit(): void {
    
  }
  subs(){
    console.log(this.form);
    
    if(this.form.valid){
    this.service.$bombNb = this.form.value.bomb;
    this.service.$panelsize = this.form.value.size;
    this.router.navigate(['game'])
    }
  }
}
