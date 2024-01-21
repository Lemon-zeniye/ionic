import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  imeeNumber;
  constructor( private router: Router, private apiService: ApiService,private loadingCtrl: LoadingController) { }

  ngOnInit() {}

  async onSubmit(){
    if(this.imeeNumber == undefined){
      return;
    }
    const loading = await this.loadingCtrl.create({});

    loading.present();
  
    this.apiService.get(`tasks/taskbyimei/${this.imeeNumber}`).subscribe((data) => {
      this.apiService.responceData = data;
      this.router.navigate(['/tasks'], {queryParams: {id:this.imeeNumber}})
      loading.dismiss();
    }, (error) => {
      loading.dismiss();
    })
  }

}
