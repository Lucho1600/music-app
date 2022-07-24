import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {Storage} from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  registerResult: boolean = true;
  validation_messages = {
    nombre: [
      { type: "required", message: "El nombre es obligatorio" }
    ],
    apellido: [
      { type: "required", message: "Apellidos obligatorios" }
    ],
    email: [
      { type: "required", message: "El email es obligatorio" },
      { type: "pattern", message: "El email no es valido" }

    ],
    password: [
      { type: "required", message: "El pasword es obligatorio" }
    ],
  };

  errMessage;
  errorMessage: any;



  constructor(
    private alertController: AlertController,
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
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(6)

        ])
      )
    });
   }

  ngOnInit() {
  }

  register(registerFormValues){
    this.authService.registerUser(registerFormValues).then( (data) => {
      this.errMessage = "";
      this.navCtrl.navigateBack("/login");
    }).catch( err => {
      this.presentAlert("Opps", "Hubo un error", err)
    })
  }
  async presentAlert(header, subHeader,message) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  goToLogin(){
    this.navCtrl.navigateBack("/login").then((resp) => {
      console.log(resp)
    })
  }
}
