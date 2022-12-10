import { OnDestroy } from '@angular/core';
import { AfterViewInit, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { Subject, Subscription, throttleTime } from 'rxjs';

interface InfiniteScrollOptions {
  throttleTimeInMs: number;
  thresholdInPercentage: number;
}

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent implements AfterViewInit, OnDestroy {

  constructor() {
    this.scrollEndSubscription = this.intersectionSubject.pipe(
      throttleTime(this.infiniteScrollOptions.throttleTimeInMs),
    ).subscribe(() => {
      this.scrollEnd.emit();
    })
  }

  @ViewChild('intersection')
  private intersectionComponent?: ElementRef<Element>;

  @Output()
  public scrollEnd: EventEmitter<void> = new EventEmitter();

  @Input()
  public infiniteScrollOptions: InfiniteScrollOptions = {
    throttleTimeInMs: 500,
    thresholdInPercentage: 0.5,
  };

  private intersectionSubject: Subject<void> = new Subject();

  private scrollEndSubscription: Subscription = new Subscription();

  public ngAfterViewInit(): void {
    if (this.intersectionComponent?.nativeElement) {
      const onIntersection: IntersectionObserverCallback = () => {
        this.intersectionSubject.next();
      }
      var observer = new IntersectionObserver(onIntersection, {
        threshold: this.infiniteScrollOptions.thresholdInPercentage,
      })

      observer.observe(this.intersectionComponent.nativeElement);
    }
  }

  public ngOnDestroy(): void {
    this.scrollEndSubscription.unsubscribe();
  }
}
