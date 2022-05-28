import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './components/questions/questions.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  
    {path: '', redirectTo: 'welcome', pathMatch: "full"},
   {path: "welcome", component: WelcomeComponent},
   {path: "questions", component: QuestionsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
