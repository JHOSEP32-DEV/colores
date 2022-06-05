import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  errorMsg!: string;
  redirectUrl = '/';

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe(params => {
      if (params['redirectTo']) {
        this.redirectUrl = params['redirectTo'];
      }
    })
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['admin', Validators.required],
      password: ['password', Validators.required]
    })
  }

  onSubmit() {
    this.loading = true;
    const data = this.loginForm.value;
    this.authService.login(data.username, data.password).subscribe(usr => {
      console.log('Logged in success:', usr);
      this.router.navigate([this.redirectUrl]);
      this.loading = true;
    }, err => {
      this.loading = false;
      if (err.error.status === 401) {
        this.errorMsg = 'Bad credentials, check your username or password.';
      }
    });
  }

}
