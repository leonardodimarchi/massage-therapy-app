import { trigger, transition, query, style, group, animate } from "@angular/animations";

// TODO: Test and clean
export const sliderRouteAnimation =
  trigger('routeAnimations', [
    transition('* => fromRight', slideTo('left') ),
    transition('* => fromLeft', slideTo('right') ),
    transition('fromLeft => *', slideTo('left') ),
    transition('fromRight => *', slideTo('right') )
  ]);

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%'}))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}
