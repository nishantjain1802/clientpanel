import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; //rxjs is react js extension
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthService {

  constructor( public afAuth: AngularFireAuth) { }

  //login user
  login(email:string, password:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userData => resolve(userData),
    err => reject(err));
    });
  }

  //check user status
  getAuth(){
    return this.afAuth.authState.map(auth => auth);
  }

  //logout user
  logout(){
    this.afAuth.auth.signOut();
  }

  //Register
  register(email:string, password:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(userData => resolve(userData),
        err => reject(err));
    });
  }
}
