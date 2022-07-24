import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from "@ionic/storage";
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  userImage ="assets/images/perfil.jpg"
  photo: SafeResourceUrl;
  user = {
    email: "",
    name: "",
    last_name: "",
    following_users: [],
    followed_users: [],
    image: ""
};
  user_id;
  goBack = false;
  constructor(
    private sanitizer: DomSanitizer,
    private authService: AuthenticateService,
    private storage: Storage,
    private alertController: AlertController,
    private navCtrl: NavController
    ) {
      this.storage.create();
     }

     async ngOnInit() {
      this.user_id = await this.storage.get("user_id")
      await this.authService.getCurrentUser(this.user_id).subscribe((data: any) => {
        this.user.email = data.email
        this.user.name = data.name
        this.user.last_name = data.last_name
        this.user.followed_users = data.followed_users
        this.user.following_users = data.following_users
        this.user.image = data.image
      },
      (error) => 
        this.presentAlert("Opps", "hubo un error", error)
      )
      if (this.goBack){
        this.navCtrl.navigateBack("/menu")
      }
    }

    async presentAlert(header, subHeader,message) {
      const alert = await this.alertController.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: [
          {text: 'OK', 
          handler: () => { this.goBack = true }
        }
        ]
      });
      await alert.present();
    }

  async takePhoto() {
    const image = await Camera.getPhoto({
     quality: 100,
     allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );
    console.log(image);
    this.updateUser({"image": image.dataUrl})
  }

  updateUser( user ){
    let update_params = user
    this.authService.updateUser(this.user_id, update_params).then((data:any) => {
      this.user.email = data.user.email
      this.user.name = data.user.name
      this.user.last_name = data.user.last_name
      this.user.followed_users = data.user.followed_users
      this.user.following_users = data.user.following_users
      this.user.image = data.user.image
    })
  }
}