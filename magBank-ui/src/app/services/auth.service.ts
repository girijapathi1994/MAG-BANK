import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
//for jwt token for login
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  customer: any;
  isDev:boolean;
  loginFlag:boolean;
  constructor(private http:Http) { 
    this.isDev = true; // Change to false before deployment
  }

//service for register customer
  registerCustomer(customer){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
   // let ep = this.prepEndpoint('banks/register');
    return this.http.post('http://localhost:3000/banks/register', customer,{headers: headers})
      .map(res => res.json())
      
  }

  //service for login customer
  authenticateCustomer(customer){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
   // let ep = this.prepEndpoint('banks/register');
    return this.http.post('http://localhost:3000/banks/authenticate', customer,{headers: headers})
      .map(res => res.json())
  }
//getprofile data
getProfile(){
  let headers = new Headers();
  this.loadToken();
  //headers added for authorization
  headers.append('Authorization',this.authToken);
  headers.append('Content-Type','application/json');
 // let ep = this.prepEndpoint('banks/register');
  return this.http.get('http://localhost:3000/banks/profile',{headers: headers})
    .map(res => res.json())
}

  //maintain session data
  storeCustomerData(token,customer){
    localStorage.setItem('id_token',token);
    localStorage.setItem('customer',JSON.stringify(customer));
    this.authToken=token;
    this.customer=customer;

  }
//to send token with request we need get from local storage

loadToken(){
  const token= localStorage.getItem('id_token');
  this.authToken=token;
}

  logOut(){
    this.authToken=null;
    this.customer=null;
    localStorage.clear();

  }
//this one checks automayically token expired or not
  loggedIn() {
    //parameter is same name as parameter set in local storage
    return tokenNotExpired("id_token");
  }

//to prepare endpoint
  prepEndpoint(ep){
    if(this.isDev){
      return ep;
    } else {
      return 'http://localhost:8080/'+ep;
    }
  }
}
