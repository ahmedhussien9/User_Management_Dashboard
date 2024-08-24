import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from 'src/app/enums/roles.enum';

@Directive({
  selector: '[appRoleBasedAccess]'
})
export class RoleBasedAccessDirective {
  @Input() set appRoleBasedAccess(roles: Role[]) {
    const userRole = this.getUserRole();
    if (roles.includes(userRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  private getUserRole(): Role {
    // Replace this logic with however you get the current user's role
    // This is just an example, you might get the role from a service or state management
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.roles as Role;
  }
}