import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, OnChanges, SimpleChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent implements OnInit, OnChanges {
  @Input() user: User = {} as User;
  @Input() isOpen: boolean = false;
  @Output() save = new EventEmitter<User>();
  @Output() close = new EventEmitter<void>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form group with validation rules
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roleId: [1, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Initialization logic can go here if needed
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user && this.user._id) {
      this.userForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        roleId: this.user.roleId,
      });

      // If editing, password is not required
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
      this.userForm.get('confirmPassword')?.clearValidators();
      this.userForm.get('confirmPassword')?.updateValueAndValidity();
    }
  }

  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSave() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const roleId = parseInt(this.userForm.value.roleId);
    delete this.userForm.value.confirmPassword;

    const userData = {
      ...this.user,
      ...this.userForm.value,
      roleId,
      password: this.userForm.value.password || undefined // Send password only if it's provided
    };

    this.save.emit(userData);
  }

  onClose() {
    this.close.emit();
  }
}