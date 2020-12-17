import { Component, OnInit,ElementRef, Renderer2, ViewChild } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database"
import {AngularFireStorage,AngularFireUploadTask} from "@angular/fire/storage"
import {finalize} from "rxjs/operators"
import {HttpClient} from '@angular/common/http'; 
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  url='https://run.mocky.io/v3/fb158fb6-98c3-40d0-805b-853bd9ea4cfe'
  task:AngularFireUploadTask;
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
errorMessage=true;
  selectedImage:any=null
   downloadUrl;
  hideCamera=true;
  hideGallery=true;
  capturedImage=true;
  videoWidth = 0;
  AddImageFrom='';
videoHeight = 0;
  constraints = {
    video: {
        facingMode: "environment",
        width: { ideal: 4096 },
        height: { ideal: 2160 }
    }
};
formTemplate=new FormGroup({
      imageUrl:new FormControl('')
})
startCamera() {
  if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { 
navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
  } else {
      alert('Sorry, camera not available.');
  }
}

handleError(error) {
  console.log('Error: ', error);
}
// attachVideo(stream) {
//   this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
// }
attachVideo(stream) {
  this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
  this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
  });
}
capture() {
  this.capturedImage=false;
  this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
  this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
  this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
}
addImageFromGallery()
{
  this.hideGallery=false;
  

}
addImageFromCamera()
{
  this.startCamera();
  this.hideCamera=false;
}



  addEmployeeForm:FormGroup;
  lat = 51.678418;
  lng = 7.809007;
  imgSrc:string= "../../../assets/ClickToAdd.jpeg";
   showPriview(event:any)
  {
    if(event.target.files && event.target.files[0])
  {
   
      const reader=new FileReader();
      reader.onload=(e:any)=>this.imgSrc=e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage=event.target.files[0];
      // var LOGO = require(this.selectedImage.name);
    
  }
  
//   const file=event.target.files[0];
//   const path=`${Date.now()}_${file.name}`;
//  this.task =this.storage.upload(path,file);
// (await this.task).ref.getDownloadURL().then(url=>{this.downloadUrl=url});

//   const ref=this.storage.ref(path)
//  finalize(async () => {
//   this.downloadUrl= await ref.getDownloadURL().toPromise();
// console.log(this.downloadUrl)
//  })
  }

  constructor(private http : HttpClient,private formbuilder:FormBuilder,private router:Router,private storage:AngularFireStorage,private EmployeeeService:EmployeeService,private renderer: Renderer2) { }

  
  


  ngOnInit() {
    this.imgSrc= "../../../assets/ClickToAdd.jpeg";
   
    this.addEmployeeForm=this.formbuilder.group({
   id:[],
   image:new FormControl(''),
      name:['',[Validators.minLength(3),Validators.required]],
      Email:['',[Validators.required,Validators.email]],
      phone:['',Validators.required],
      DOB:['',Validators.required],
      currentLocation:[''],
      address:['',Validators.required],
     
     
    })
    // this.addEmployeeForm.value.id=Math.floor(Math.random() * 100) + 1;
  }
  onChoseLocation(event)
  {
console.log(event)
  }
  
  onSubmit()
  {
    if(this.addEmployeeForm.valid)
    {
    this.addEmployeeForm.value.id="EMP"+Math.floor(Math.random() * 100) + 1;
   

    
    var filePath=`${this.selectedImage.name}_${new Date().getTime()}`;
    const fileRef=this.storage.ref(filePath)
    this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
      finalize(()=>{
fileRef.getDownloadURL().subscribe((url)=>{
  this.formTemplate.value['imageUrl']=url;
  this.addEmployeeForm.value.image=url;
  console.log(url)
})
console.log(this.formTemplate);
      })
    ).subscribe();


    this.http.post('https://useremployee-6833e-default-rtdb.firebaseio.com/posts.json',this.addEmployeeForm.value).subscribe(ResponseData=>{
      console.log(ResponseData)
      });

    this.router.navigate([''])
  }
  else
  {
   this.errorMessage=false;
  
    return
  }

  }
  onReset()
  {
    this.addEmployeeForm.reset();
  }
//  get formControls()
//   {
//     return this.formTemplate['controls'];
//   }


}
