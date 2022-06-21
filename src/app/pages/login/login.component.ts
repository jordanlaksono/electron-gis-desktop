import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
	loginData = {
		username: "",
		password: ""
	}

  constructor(private router: Router) { }

  submit(){
    if(this.loginData.username == "jantan" && this.loginData.password == "jantan"){
      console.log(this.loginData)
      this.router.navigate(['pages/peta']);
    }
  }

}
