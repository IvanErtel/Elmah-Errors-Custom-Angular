// Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// COMPONENTES 

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatDialogModule,
        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
    ],
    exports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatDialogModule,
        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        FormsModule,
        MatInputModule,
        MatSelectModule,
    ],
    providers: [],
})
export class MaterialComponentsModule { }