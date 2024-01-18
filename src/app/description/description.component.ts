import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent  implements OnInit {
  id:string;
  items : any[] =[]
  detail;
  constructor(private router: Router,
             private menuCtrl: MenuController, 
             private apiService: ApiService,
             private loadingCtrl: LoadingController,
             private activatedRoute: ActivatedRoute) { 
              this.id = activatedRoute.snapshot.queryParams['id']
              console.log('33333333333333333333333333', this.id)
             }

 async ngOnInit() { 
    if(this.apiService.responceData.length > 0){
      this.items = this.apiService.responceData;
      this.detail = this.items[0]
    }else{
       const loading = await this.loadingCtrl.create({});
    loading.present()
    this.apiService.get(`tasks/taskbyimei/${this.id}`).subscribe((data) => {
        console.log(data)
        this.items = data;
        this.detail = this.items[0]
        loading.dismiss();
      }, (error) => {
        loading.dismiss();
      })
   }
  }

   isToastOpen = false;
   message;

 menuType: string = 'push';
  navigate(id){
    this.detail = this.items[id]
    this.menuCtrl.close();
  }

  getDetail(key){
    return this.items[key]
  }

// api/tasks/updatefromdriver?taskId=1&imei="865135060353297"&status="Start"

showFinshButton: boolean = false;
  async onSubmit(id: number){
    const loading = await this.loadingCtrl.create({});
    loading.present()
    this.apiService.put('tasks/updatefromdriver', null, { taskId: id , imei: this.id, status: 'Start' }).subscribe((data) => {
        loading.dismiss()
        this.showFinshButton = true;
    }, (error) => {
        loading.dismiss()
        this.message = 'Something Went Wrong!'
        this.isToastOpen = true;
    })
  }

 async onCancel(id:number){
    const loading = await this.loadingCtrl.create({});
    loading.present()
    this.apiService.put('tasks/updatefromdriver', null, { taskId: id , imei: this.id, status: 'Cancel' }).subscribe((data) => {
        loading.dismiss()
         this.router.navigate([''])
         this.showFinshButton = false;
    }, (error) => {
        loading.dismiss()
        this.message = 'Something Went Wrong!'
        this.isToastOpen = true;
    })

  }
async  onFinish(id: number){
    const loading = await this.loadingCtrl.create({});
    loading.present()
    this.apiService.put('tasks/updatefromdriver', null, { taskId: id , imei: this.id, status: 'End' }).subscribe((data) => {
        loading.dismiss()
          this.router.navigate([''])
          this.showFinshButton = false;
    }, (error) => {
        loading.dismiss()
        this.message = 'Something Went Wrong!'
        this.isToastOpen = true;
    })
   
  }
  ngAfterViewInit(){
    console.log('fsdfkjlsj')
    this.menuCtrl.open()
  }

}
