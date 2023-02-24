import { trigger, transition, query, style, group, animate, AnimationQueryOptions, AnimationGroupMetadata, AnimationQueryMetadata } from "@angular/animations";

export type SliderRouteAnimationTypes = 'fromLeft' | 'fromRight';

type SliderDirections = 'left' | 'right';

export const sliderRouteAnimation =
  trigger('routeAnimations', [
    transition('* => fromLeft', slideTo('left') ),
    transition('* => fromRight', slideTo('right') ),
    transition('fromRight => *', slideTo('left') ),
    transition('fromLeft => *', slideTo('right') )
  ]);

function slideTo(direction: SliderDirections): (AnimationQueryMetadata | AnimationGroupMetadata)[] {
  const queryOptions: AnimationQueryOptions = {
    optional: true,
  };

  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%',
      })
    ], queryOptions),
    query(':enter', [
      style({
        [direction]: '-100%',
        opacity: 0,
      })
    ]),
    group([
      query(':leave', [
        animate('300ms ease', style({
          [direction]: '100%',
          opacity: 0,
        }))
      ], queryOptions),
      query(':enter', [
        animate('300ms ease', style({
          [direction]: '0%',
          opacity: 1,
        })),
      ])
    ]),
  ];
}
