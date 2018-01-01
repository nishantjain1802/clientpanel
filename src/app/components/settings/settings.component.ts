import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings:Settings;

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router:Router,
    public settingsService:SettingsService
  ) { }

  ngOnInit() {
    this.settings=this.settingsService.getSettings();
  }
  onSubmit(){
    this.settingsService.changeSettings(this.settings);
    this.flashMessagesService.show('Settings Saved', {cssClass:'alert-success', timeout: 3000});
    this.router.navigate(['/settings']);
  }

}