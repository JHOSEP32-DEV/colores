import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

@Directive({
  selector: '[appAllowedRoles]'
})
export class AllowedRolesDirective implements OnInit {

  // the role the user must have
  @Input()
  appAllowedRoles!: string[];

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private authService: AuthenticationService
              ) { }

  ngOnInit(): void {
    if (this.authService.userHasRole(this.appAllowedRoles)) { // Tiene permiso
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else { // No tiene permiso
      this.viewContainerRef.clear();
    }
  }

}
