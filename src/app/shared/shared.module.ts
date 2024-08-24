import { NgModule } from '@angular/core';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { RoleBasedAccessDirective } from './directives/role-based-access.directive';
import { RoleBackgroundDirective } from './directives/role-background.directive';


@NgModule({

    declarations: [RoleBasedAccessDirective, RoleBackgroundDirective],
    imports: [
        CommonModule,
        FormsModule,
        GridModule,
        InputsModule,
        ButtonsModule,
        DialogModule,
        DropDownListModule,
        ReactiveFormsModule,


    ],
    exports: [
        FormsModule,
        GridModule,
        InputsModule,
        ButtonsModule,
        DialogModule,
        DropDownListModule,
        ReactiveFormsModule,
        RoleBasedAccessDirective,
        RoleBackgroundDirective
    ]
})

export class SharedModule { }