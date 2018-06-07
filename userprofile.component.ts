import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  email:string;
  myid:string;
  
  userkey:any;
 
  itemList:AngularFireList<any>;
  itemArray=[];

  data = {
    name : '' ,
    age :  '' ,
    phone :  '' ,
    address :  '' ,
    city :  '' ,
    job :  '' ,
    email:'',
    
   } 


  

  constructor( public db:AngularFireDatabase) { 
    
 this.email=localStorage.getItem('email')
 this.myid=localStorage.getItem('uid')
  


 




 this.itemList = db.list('users')

 this.itemList.snapshotChanges().subscribe(actions=>{
       actions.forEach(action=>{
         let y = action.payload.toJSON()
         y["$key"] = action.key
         this.userkey
         
     //   console.log(action.payload.toJSON())
     //   console.log(action.payload.child('uid').val() )
         if (action.payload.child('uid').val() === this.myid ) {
          this.userkey = action.key
           this.itemArray.push(y as ListItemClass)
          this.data.name = this.itemArray[0]['name'] 
          this.data.age = this.itemArray[0]['age'] 
          this.data.phone = this.itemArray[0]['phone'] 
          this.data.address = this.itemArray[0]['address'] 
          this.data.city = this.itemArray[0]['city'] 
          this.data.job = this.itemArray[0]['job'] 
          this.data.email = this.itemArray[0]['email'] 
          
         
          
       
     
      
           
                  }
})
 })













}

  ngOnInit() {
    
    console.log(this.email)
    console.log(this.myid)
  }

  onEdit(){
 
this.itemList.set(this.userkey, {
     
      name : this.data.name  ,
      age : this.data.age ,
      phone :  this.data.phone ,
      address :  this.data.address ,
      city :  this.data.city ,
      job :  this.data.job , 
      
      email:this.email,
      myid:this.myid 
      
    })
  

  }

}


 export class ListItemClass{
  $key: string;
  name : string;
  age :  string;
  phone :  string;
  address :  string;
  city : string;
  job :  string;
  email: string;
}
  