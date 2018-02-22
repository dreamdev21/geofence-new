import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from "ionic-angular";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { Geofence } from "@ionic-native/geofence";
import { Geolocation } from "@ionic-native/geolocation";
import { LocationProvider } from "../../providers/location/location";
/**
 * Generated class for the ModalmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: "page-modalmap",
  templateUrl: "modalmap.html"
})
export class ModalmapPage {
  @ViewChild("map") mapElement: ElementRef;
  public map: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geofence: Geofence,
    private geolocation: Geolocation,
    public LocationProvider: LocationProvider,
    public viewCtrl: ViewController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ModalmapPage");
    this.mylocation();
  }
  mylocation() {
    this.geolocation
      .getCurrentPosition()
      .then(position => {
        var lat = this.navParams.get("lat");
        var lng = this.navParams.get("lng");
        console.log(lat);
        console.log(lng);
        let latLng = new google.maps.LatLng(lat, lng);
        let mapOptions = {
          center: latLng,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );
        this.addMarker(lat, lng);
        this.viewCircle();
      })
      .catch(error => {
        console.log("Error getting location", error);
      });
  }

  viewCircle() {
    var amsterdam = new google.maps.LatLng(
      this.navParams.get("lat"),
      this.navParams.get("lng"),
    );
    var cityCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      center: amsterdam,
      radius: this.navParams.get("miles")*1609
    });
    console.log(this.navParams.get("miles") * 1609);
    cityCircle.setMap(this.map);
  }

  addMarker(lat, lng) {
    var marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: { lat: lat, lng: lng }
    });

    if (this.LocationProvider.position != null) {
      let content = this.LocationProvider.position;
      this.addInfoWindow(marker, content);
    }
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.open(this.map, marker);
    });
  }
  public closeModal() {
    this.viewCtrl.dismiss();
  }
}
