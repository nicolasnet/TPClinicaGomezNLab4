import { Component, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  animateChild,
  group,
} from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('Login => Registro', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('Registro => Login', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('1000ms ease-out', style({ right: '100%'}))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ right: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('Login => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ transform: "scale(0)" })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate(500, style({ transform: "scale(0)" }))
        ]),
        query(':enter', [
          animate(500, style({ transform: "scale(1)" }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('Registro => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ transform: "scale(0)" })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate(500, style({ transform: "scale(0)" }))
        ]),
        query(':enter', [
          animate(500, style({ transform: "scale(1)" }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('Registro => HomePage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ right: '100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate(1, style({ opacity: 0}))
        ]),
        query(':enter', [
          animate('1000ms ease-out', style({ right: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);

// export const slideInAnimation =
//   trigger('routeAnimations', [
//     transition('HomePage <=> AboutPage', [
//       style({ position: 'relative' }),
//       query(':enter, :leave', [
//         style({
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%'
//         })
//       ]),
//       query(':enter', [
//         style({ left: '-100%' })
//       ]),
//       query(':leave', animateChild()),
//       group([
//         query(':leave', [
//           animate('300ms ease-out', style({ left: '100%' }))
//         ]),
//         query(':enter', [
//           animate('300ms ease-out', style({ left: '0%' }))
//         ])
//       ]),
//       query(':enter', animateChild()),
//     ]),
//     transition('* <=> FilterPage', [
//       style({ position: 'relative' }),
//       query(':enter, :leave', [
//         style({
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%'
//         })
//       ]),
//       query(':enter', [
//         style({ left: '-100%' })
//       ]),
//       query(':leave', animateChild()),
//       group([
//         query(':leave', [
//           animate('200ms ease-out', style({ left: '100%' }))
//         ]),
//         query(':enter', [
//           animate('300ms ease-out', style({ left: '0%' }))
//         ])
//       ]),
//       query(':enter', animateChild()),
//     ])
//   ]);