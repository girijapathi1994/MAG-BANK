import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username:String;
password:String;
  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const customer={
      username:this.username,
      password:this.password
    }

    this.authService.authenticateCustomer(customer).subscribe(data=>{
       if(data.success){
        this.authService.storeCustomerData(data.token,data.customer);
        this.flashMessage.show('You are now logged in',
          {
            cssClass: 'alert-success',
             timeout: 5000
           });
           this.router.navigate(['dashboard']);
       }else{
        this.flashMessage.show(data.msg,
           {
             cssClass: 'alert-info',
              timeout: 5000
            });
        return false;
       }
    });
  }

}
