import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Role } from 'src/app/enums/roles.enum';

@Directive({
  selector: '[appRoleBackground]'
})
export class RoleBackgroundDirective implements OnInit {
  @Input('appRoleBackground') role!: Role;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.applyBackgroundColor();
  }

  private applyBackgroundColor(): void {
    switch (this.role) {
      case Role.Admin:
        this.el.nativeElement.style.backgroundColor = 'lightcoral';
        this.el.nativeElement.style.padding = '0.3rem 0.5rem';
        this.el.nativeElement.style.borderRadius = '0.3rem';
        this.el.nativeElement.style.fontWeight = 'bold';
        break;
      case Role.Manager:
        this.el.nativeElement.style.backgroundColor = 'lightblue';
        this.el.nativeElement.style.padding = '0.3rem 0.5rem';
        this.el.nativeElement.style.borderRadius = '0.3rem';
        this.el.nativeElement.style.fontWeight = 'bold';
        break;
      case Role.Editor:
        this.el.nativeElement.style.backgroundColor = 'lightgreen';
        this.el.nativeElement.style.padding = '0.3rem 0.5rem';
        this.el.nativeElement.style.borderRadius = '0.3rem';
        this.el.nativeElement.style.fontWeight = 'bold';
        break;
      default:
        this.el.nativeElement.style.backgroundColor = 'white';
        this.el.nativeElement.style.padding = '0.3rem 0.5rem';
        this.el.nativeElement.style.borderRadius = '0.3rem';
        this.el.nativeElement.style.fontWeight = 'bold';
        break;
    }
  }
}