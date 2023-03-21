import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from '@angular/core';
@Directive({
  selector: '[clickAway]',
})
export class ClickAwayDirective {
  @Output() clickAway: EventEmitter<Event> = new EventEmitter<Event>();
  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: ElementRef) {
    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.clickAway.emit();
    }
  }
}
