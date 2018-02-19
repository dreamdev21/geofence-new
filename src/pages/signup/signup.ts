import { LoginPage } from "../login/login";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Loading,
  LoadingController,
  ToastController
} from "ionic-angular";
import { User } from "../../models/user";
import { AngularFireDatabase } from "angularfire2/database";
import { FirebaseProvider } from "../../providers/firebase/firebase";
import firebase from "firebase";
import { Http } from "@angular/http";
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  public user = {} as User;
  constructor(
    public http: Http,
    public afd: AngularFireDatabase,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider
  ) {
    this.http = http;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }
  register() {
    console.log(this.user);
    if (this.validateEmail(this.user.email) == false) {
      let toast = this.toastCtrl.create({
        message: "Please fill a correct email",
        duration: 3000,
        position: "top"
      });
      toast.present();
    } else {
      this.user.role = 0;
      this.firebaseProvider.registerUser(this.user);
       let toast = this.toastCtrl.create({
         message: "You are registered successfully!",
         duration: 3000,
         position: "top"
       });
       toast.present();
      this.navCtrl.push(LoginPage);
    }
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
