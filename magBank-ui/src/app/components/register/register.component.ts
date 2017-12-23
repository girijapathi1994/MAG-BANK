import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  constructor( 
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("hi");
  }

  onRegisterSubmit(){
    const customer = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //validating customer
  // Required Fields
  if(!this.validateService.validateRegister(customer)){
    this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-info', timeout: 3000});
    return false;
  }

  // Validate Email
  if(!this.validateService.validateEmail(customer.email)){
    this.flashMessage.show('Please use a valid email', {cssClass: 'alert-info', timeout: 3000});
    return false;
  }
 // Register user
 this.authService.registerCustomer(customer).subscribe(data => {
  if(data.success){
    this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
  } else {
    this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
    this.router.navigate(['/register']);
  }
});



}





}
