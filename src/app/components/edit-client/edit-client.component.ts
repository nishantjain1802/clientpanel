import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { FlashMessagesModule } from 'angular2-flash-messages/module/module';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string;
  client:Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }

  disableBalanceOnEdit:boolean = true;


  constructor(
    public clientService:ClientService,
    public router:Router,
    public route:ActivatedRoute,
    public flashMessagesService:FlashMessagesService,
    public settingsService:SettingsService
  ) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];

    // Get Client
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
    this.disableBalanceOnEdit=this.settingsService.getSettings().disableBalanceOnEdit;
 }

 onSubmit({value,valid}:{value:Client, valid:boolean}){
  if(!valid){
    this.flashMessagesService.show('Please fill in all fields', {cssClass:'alert-danger', timeout: 3000});
    this.router.navigate(['edit-client/'+this.id]);
  }else{
    //Update client
    this.clientService.updateClient(this.id,value);
    this.flashMessagesService.show('Client Updated', {cssClass:'alert-success', timeout: 3000});
    this.router.navigate(['client/'+this.id]);
  }
}
} 
