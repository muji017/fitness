import { Component } from '@angular/core';
import { PlansModel } from 'src/app/model/userModel';
import { Observable, map} from 'rxjs'
import { UserService } from 'src/app/services/userServices/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


declare var Razorpay: any;
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  plans!:PlansModel[]
  selectedAmount!:number|any
  selectedPlanId!:any
  constructor(
   private  userServicer:UserService,
   private router:Router,
   private toastr:ToastrService
  ){}

  ngOnInit(){
    this.userServicer.getPlans().subscribe(
      (res:any)=>{
       this.plans=res.plans
       console.log("qsdes",this.plans)
      }
    )
    
  }
  planSelected(planId:any){
      const plan=this.plans.find((p)=>p._id===planId)
      this.selectedAmount=plan?.amount
      this.selectedPlanId=plan?._id

  }
  payNow() {
    let planId = this.selectedPlanId;
    console.log(planId);
    
    this.userServicer.createSubscription(planId).subscribe((res) => {
      console.log(res);
      this.razorpayPopup(res)
      
    });
  }
  payss(){
    console.log("Inside Success");
    const planId=this.selectedPlanId
    const paymetMethod="Razorpay"
    console.log(planId,paymetMethod)
    this.userServicer.paymentss(planId,paymetMethod).subscribe(
      (res) => {
         this.toastr.success("Sucessfully subscribed redirecting to your profile")
         this.router.navigate(['/profile'])
      },(err)=>{
        this.toastr.error(err)  
      }
    );
  }

  razorpayPopup(res: any) {
    const options = {
      description: 'Credits towards consultation',
      image: '../assets/images/logoSEcond-removebg-preview.png',
      currency: 'INR',
      key: res.key_id,
      amount: res.amount,
      name: 'Fitness',
      payment_id: res.payment_id,
      prefill: {
        email: res.email,
        name: res.name,
      },
      theme: {
        color: '#F37254',
      },
      modal: {
        ondismiss: () => {
          alert('Payment was dismissed');
        },
      },
      handler: this.payss.bind(this),
    };
  
    // Open the Razorpay payment modal
    const rzp = new Razorpay(options);
    rzp.open();
  }
  

} 


