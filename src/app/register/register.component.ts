import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../sharData/auth.service';


import { NgxSpinnerService } from "ngx-spinner";

FormGroup
FormControl
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoding:boolean = false;
  errorMessage:string = "";
  errorserverMessage:string =   '';
  registerForm:FormGroup = new FormGroup({
    first_name:new FormControl(null , [Validators.minLength(3),Validators.maxLength(10),Validators.required]),
    last_name:new FormControl(null , [Validators.minLength(3),Validators.maxLength(10),Validators.required]),
    age:new FormControl(null , [Validators.min(16),Validators.max(80),Validators.required]),
    email:new FormControl(null , [Validators.email,Validators.required]),
    password:new FormControl(null , [Validators.required]),
  })

  constructor(private _authService:AuthService , private _router:Router ,private _ngxSpinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
  }

  register(value:object){
    this._ngxSpinnerService.show();
    this.isLoding = true;
    this._authService.signup(value).subscribe({
      next:(r)=>{
        this._ngxSpinnerService.hide();
        this.isLoding = false;
        if(r.message == 'success'){
          this._router.navigate(['login'])
        }else {
          this.errorMessage = r.errors.email.message
        }
      },

      error:(e)=>{this.isLoding = false; console.log(e)}
      
      
      
    })
    
  }

}
