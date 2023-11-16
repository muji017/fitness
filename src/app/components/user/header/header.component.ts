import { ChangeDetectionStrategy, ChangeDetectorRef, Component ,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { UserModel, userToken, userlist } from 'src/app/model/userModel';
import { UserService } from 'src/app/services/userServices/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HeaderComponent {
  @Input() notification:any[]=[]
  smallview: string = "hidden"
  mobileMenuActive: boolean = false;
  usertoken!: userToken
  userData!: UserModel
  userData$: Observable<any> | undefined
  apiUrl!: string
  premiun!: any

  constructor(private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    this.apiUrl = userService.getapiUrl()
  }

  ngOnInit() {
    const user: userToken | any = localStorage.getItem('usertoken')
    const userparse = JSON.parse(user)
    if (user) {
      this.usertoken = user
    }
    this.userData$ = this.userService.getProfile();
  }

  chat() {
    this.userService.getProfile().pipe(
      map((res: any) => {
        const user = res.user
        if (!user.subscriptionDate) {
          this.toastr.info("Need to subscribe a plan to chat")
          this.router.navigate(['/subscription'])
        }
        else {
          const currentDate = new Date();
          const sday = currentDate.getDate();
          const smonth = currentDate.getMonth() + 1;
          const syear = currentDate.getFullYear();
          const formattedCurrentDate = new Date( sday, smonth - 1,syear);

          const userExpiryDate = new Date(user.expiryDate);

          console.log('formattedCurrentDate:', formattedCurrentDate);
          console.log('userExpiryDate:', userExpiryDate);

          if (formattedCurrentDate < userExpiryDate) {
            this.router.navigate(['/chat']);
          } else {
            this.toastr.info("Your Subscription Plan is expired");
            this.router.navigate(['/subscription']);
          }

        }
      })
    ).subscribe();
  }

  // Check if the current route is '/login'
  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  // Check if the current route is '/signup'
  isSignupRoute(): boolean {
    return this.router.url === '/signup';
  }

  isHomeRoute(): boolean {
    return this.router.url === '/home';
  }

  isTrainerRoute(): boolean {
    return this.router.url === '/Usertrainerlist';
  }

  isDietRoute(): boolean {
    return this.router.url === '/dietplans';
  }

  isVideoRoute(): boolean {
    return this.router.url === '/videos';
  }

  isBmiRoute(): boolean {
    return this.router.url === '/bmicalculator';
  }
  isChat(): boolean {
    return this.router.url === '/chat';
  }

  onLogout() {
    localStorage.removeItem('usertoken');
    window.location.reload();
  }
  tog() {
    if (this.smallview == "") {
      this.smallview = "hidden"
      return
    }
    this.smallview = ""

  }
  getProfile() {
    this.userService.getProfile().subscribe(
      (res) => {
        this.router.navigate(['/profile'])
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
