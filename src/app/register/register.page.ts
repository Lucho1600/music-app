import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storage:Storage,
    private authService: AuthenticateService
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      apellido: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      email: new FormControl(),
      password: new FormControl()
    });
   }

  ngOnInit() {
  }

  register(registerFormValues){
    this.authService.registerUser(registerFormValues).then(()=>{
      this.navCtrl.navigateBack("/login");
    })
  }
  goToLogin(){
    this.navCtrl.navigateBack("/login")
  }

}
