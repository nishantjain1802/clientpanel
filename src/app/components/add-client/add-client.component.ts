import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router'; //Since we are redirecting on filling invalid forms
import { Client } from '../../models/Client'; //Importing Client Interface
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client:Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }

  disableBalanceOnAdd:boolean = false;

  constructor(
    public flashMessagesService: FlashMessagesService,
    public router:Router,
    public clientService:ClientService,
    public settingsService:SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd=this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value,valid}:{value:Client, valid:boolean}){
    if(this.disableBalanceOnAdd == true){
      value.balance = 0;
    }
    if(!valid){
      this.flashMessagesService.show('Please fill in all fields', {cssClass:'alert-danger', timeout: 3000});
      this.router.navigate(['add-client']);
    }else{
      //Add new client
      this.clientService.newClient(value);
      this.flashMessagesService.show('New Client Added', {cssClass:'alert-success', timeout: 3000});
      this.router.navigate(['/']);
    }
  }
}
