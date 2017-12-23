import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
customer:object;
  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
  ) { }
//called after constructor
  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.customer=data.user;
    },
    //calls when we get error
  err=>{
    console.log(err);
    return false;
  })
  }

}
