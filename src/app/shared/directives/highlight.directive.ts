import {AfterViewInit, Directive, ElementRef, Input, Renderer2} from "@angular/core";

@Directive({
  selector: '[highLight]'
})

export class HighLightDirective implements AfterViewInit {

  @Input() color = 'yellow';

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.setBackgroundColor(this.color);
  }

  setBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
