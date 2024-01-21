import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent  implements OnInit {
  id:string;
  items : any[] =[]
  detail;
  startPlaceName;
  endPlaceName;
  constructor(private router: Router,
             private menuCtrl: MenuController, 
             private apiService: ApiService,
             private loadingCtrl: LoadingController,
             private activatedRoute: ActivatedRoute,
             private http: HttpClient) { 
              this.id = activatedRoute.snapshot.queryParams['id']
             }

 async ngOnInit() { 
    if(this.apiService.responceData.length > 0){
      this.items = this.apiService.responceData;
      this.detail = this.items[0]
    }else{
       const loading = await this.loadingCtrl.create({});
    loading.present()
    this.apiService.get(`tasks/taskbyimei/${this.id}`).subscribe(async (data) => {
        console.log(data)
        this.items = data;
        this.detail = this.items[0]
        await this.getStartName(this.detail?.startLatitude , this.detail?.startLongitude)
        await this.getEndName(this.detail?.endLatitude , this.detail?.endLongitude)
        loading.dismiss();
      }, (error) => {
        loading.dismiss();
      })
   }
  }

   isToastOpen = false;
   message;

 menuType: string = 'push';
async  navigate(id){
    this.detail = this.items[id]
    await this.getStartName(this.detail?.startLatitude , this.detail?.startLongitude)
    await this.getEndName(this.detail?.endLatitude , this.detail?.endLongitude)
    this.closeSidebar();
  }

// api/tasks/updatefromdriver?taskId=1&imei="865135060353297"&status="Start"

showFinshButton: boolean = false;
  async onSubmit(id: number, status: string){
    const loading = await this.loadingCtrl.create({});
    loading.present()
    this.apiService.put('tasks/updatefromdriver', null, { taskId: id , imei: this.id, status: status }).subscribe((data) => {
        loading.dismiss()
        this.showFinshButton = true;
    }, (error) => {
        loading.dismiss()
        this.message = 'Something Went Wrong!'
        this.isToastOpen = true;
    })
  }

onButtonClick() {
  const startLocation = `${this.detail.startLatitude},${this.detail.startLongitude}`; // Replace with the actual starting coordinates
  const endLocation = `${this.detail.endLatitude},${this.detail.endLongitude}`;     // Replace with the actual ending coordinates
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLocation}&destination=${endLocation}`;

  window.open(googleMapsUrl, '_blank');
}

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  async getStartName(latitude: number, longitude: number){
     const loading = await this.loadingCtrl.create({});
    loading.present()
    const url = `${environment.nominatimBaseUrl}?lat=${latitude}&lon=${longitude}&format=json`;
     
    this.http.get(url).subscribe((data :any) => {
      loading.dismiss()
      this.startPlaceName = data?.name
    }, (err) => {   
         loading.dismiss()
     })
  
  }

   async getEndName(latitude: number, longitude: number){
     const loading = await this.loadingCtrl.create({});
    loading.present()
    const url = `${environment.nominatimBaseUrl}?lat=${latitude}&lon=${longitude}&format=json`;
     
    this.http.get(url).subscribe((data :any) => {
      loading.dismiss()
      this.endPlaceName = data?.name;
    }, (err) => {   
         loading.dismiss()
     })
  
  }
  formatTime(dateTimeString: string): string {
    if(!dateTimeString){
      return ''
    }
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Use a ternary operator to add leading zeros to single-digit minutes
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    // Use the 12-hour format and determine AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${formattedMinutes} ${period}`;
  }
  

}
