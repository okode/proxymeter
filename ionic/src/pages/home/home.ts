import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IBeacon } from '@ionic-native/ibeacon';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private ibeacon: IBeacon) { }

  ngOnInit() {
    this.ibeacon.requestAlwaysAuthorization();
    
    let delegate = this.ibeacon.Delegate();
    delegate.didEnterRegion().subscribe(
      data => console.log(`Beacon Enter: ${data.beacons[0].uuid}`),
      error => console.error(error)
    );

    delegate.didExitRegion().subscribe(
      data => console.log(`Beacon Exit: ${data.beacons[0].uuid}`),
      error => console.error(error)
    );

    let beaconRegion = this.ibeacon.BeaconRegion('myRegion', 'B9407F30-F5F8-466E-AFF9-25556B57FE6D', 62703, 48774);
    this.ibeacon.startMonitoringForRegion(beaconRegion)
    .then(data => console.log(`Beacon start monitoring region: ${data}`))
    .catch(error => console.log(`Beacon start monitoring error: ${error}`));
  }

}
