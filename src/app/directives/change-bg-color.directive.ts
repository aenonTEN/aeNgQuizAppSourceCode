import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBgColor]'
})
export class ChangeBgColorDirective {
  @Input() isCorrect: boolean = false;

  constructor(private el : ElementRef, private render: Renderer2) { }
  @HostListener('click') answer(){
    if(this.isCorrect){
      this.render.setStyle(this.el.nativeElement,'background', 'rgb(106, 255, 0)');
      this.render.setStyle(this.el.nativeElement,'color', '#fff');
      this.render.setStyle(this.el.nativeElement,'border', '2px solid green ');
    }else {
      this.render.setStyle(this.el.nativeElement,'background', 'red');
      this.render.setStyle(this.el.nativeElement,'color', '#fff');
      this.render.setStyle(this.el.nativeElement,'border', '2px solid maroon ');
    }
  }

}
