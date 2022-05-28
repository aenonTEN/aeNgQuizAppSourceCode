import { Component, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { WelcomeComponent } from '../welcome/welcome.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  labelRefresh: string = "refresh"
  public questionList: any[]=[];
  public currentQuestion: number = 0;
  public optionList: any[]=[]
  public point: number = 0;
  interval$:any;
  progress: string ="0";
  isQuizComplete: boolean=false;


  counter = 60;
  correctAnswer: number =0;
  incorrectAnswer: number =0; 
  

  constructor(private questionService: QuestionService) { 

  }

  public name!: string;
  ngOnInit(): void {
    
    this.name= localStorage.getItem("name")!;
    this.getAllQuestions();
    this.getOption();
    this.startCounter();
    
  }

  labelRefreshMtd(){
    return this.labelRefresh;
  }

  getAllQuestions(){
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      this.questionList = res.questions;
    })
  }
 
  nextQuestion(){
    if(this.currentQuestion!==this.questionList.length-1){
    this.currentQuestion++;
    this.resetCounter();}else{
      this.isQuizComplete=true;
      this.stopCounter();
    }
    
    
  }
  previousQuestion(){
    this.currentQuestion--;
    this.resetCounter();
    this.resetCounter();
  
  }

  getOption(){
    this.questionService.getOptionJson()
    .subscribe(res=>{
      this.optionList = res.options;
    })
  }
  correctAns(currentQno: number, option: any){

    if(currentQno ===this.questionList.length-1){
      this.isQuizComplete=true;
      this.stopCounter();
    }
    if(option.correct){
    this.point+=10;
    this.correctAnswer++;
    
    setTimeout(()=>{

    this.resetCounter();
    this.getProgressPercentage();
    },1000)
    
    }else
    this.point-=10;
    this.incorrectAnswer++;
    setTimeout(()=>{
    this.currentQuestion++;
    this.resetCounter();
    this.getProgressPercentage();
    },1000)
  }

  startCounter(){
    this.interval$=interval(1000)
    .subscribe(val=>{
      this.counter--;
      
      if(this.counter==0){
      this.currentQuestion++;
      this.counter=60;
      
      
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    },660000);

  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
    

  }
  resetCounter(){
    this.stopCounter();
    this.counter=60;
    this.startCounter();
    

  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.point=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress = (0).toString();
    
  }
  getProgressPercentage(){
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}
