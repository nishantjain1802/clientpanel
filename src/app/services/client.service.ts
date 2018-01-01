import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
// list of clients when fetching from firebase are returned in FirebaseListObservable
// single client when fetching from firebase are returned in FirebaseObjectObservable
import { Observable } from 'rxjs'; //rxjs is react js extension
import { firebase } from '@firebase/app';
import { Client } from '../models/Client';

@Injectable()
export class ClientService {
  clients: FirebaseListObservable<any[]>; //array of <any> type for list of clients
  client: FirebaseObjectObservable<any>; //<any> type for single client

  //Inject  AngularFireDatabas as dependency in Constructor()
  constructor(
    public af: AngularFireDatabase
  ) { 
    //fetch list of clients
    this.clients = this.af.list('/clients') as FirebaseListObservable<Client[]>; 
  }

  getClients(){
    return this.clients;
  }

  newClient(client:Client){
    this.clients.push(client);
  }
  getClient(id: string){
    this.client = this.af.object('/clients/'+id) as FirebaseObjectObservable<Client>;
    return this.client;
  }

  updateClient(id:string, client:Client){
    return this.clients.update(id, client);
  }
  
  deleteClient(id: string){
    return this.clients.remove(id);
  }
}
