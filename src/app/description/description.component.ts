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
  constructor(private router: Router,
             private menuCtrl: MenuController, 
             private apiService: ApiService,
             private loadingCtrl: LoadingController,
             private activatedRoute: ActivatedRoute) { 
              this.id = activatedRoute.snapshot.queryParams['id']
              console.log('33333333333333333333333333', this.id)
             }

  ngOnInit() {  }
  items = [ {   description: "Desciption one ",
                    id: 123123,
                    status:"",
                    remark:"This is the remark description of the content",
                    priority:"High",
                    startTime:"11/11/2013",
                    endTime:"12/13/2015",
                    startLatitude:"12232434324234234",
                    endLatitude:"23423423424324234234",
                    startLongitude:"2423423424234234",
                    endLongitude:"234234234234234234"},
                    {   description: "Desciption Two",
                    status:"",
                    id: 1203,
                    remark:"This is the remark descriptt",
                    priority:"High",
                    startTime:"11/11/2013",
                    endTime:"12/13/2015",
                    startLatitude:"122324343",
                    endLatitude:"034580",
                    startLongitude:"2423423424234234",
                    endLongitude:"234234234234234234"},
                   {   description: "Desciption Three",
                    status:"",
                    id: 1233,
                    remark:"This is the remark description of the content",
                    priority:"High",
                    startTime:"11/11/2013",
                    endTime:"12/13/2015",
                    startLatitude:"834853",
                    endLatitude:"23423423424324234234",
                    startLongitude:"2423423424234234",
                    endLongitude:"234234234234234444444444444444444444444444444444"}];

   detail =this.items[0];
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


showFinshButton: boolean = false;
  async onSubmit(id: number){
    const loading = await this.loadingCtrl.create({});
    loading.present()
    this.apiService.put('tasks/updatefromdriver', null, { taskId: id , imei: this.id, status: 'approve' }).subscribe((data) => {
        loading.dismiss()
        this.showFinshButton = true;
    }, (error) => {
        loading.dismiss()
        this.message = 'Something Went Wrong!'
        this.isToastOpen = true;

    })
  }

  onCancel(){
    this.router.navigate([''])
    this.showFinshButton = false;

  }
  onFinish(){
    this.router.navigate([''])
    this.showFinshButton = false;
  }
  ngAfterViewInit(){
    console.log('fsdfkjlsj')
    this.menuCtrl.open()
  }

}
