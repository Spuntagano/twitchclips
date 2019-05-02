import { App, Home, Clip, About } from '../containers';

export const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/clip/:slug',
        component: Clip,
      },
      {
        path: '/about',
        component: About
      },
      {
        path: '/:type/:name/:period',
        component: Home
      },
      {
        path: '/:type/:name',
        component: Home
      },
      {
        path: '/:period',
        component: Home
      },
    ],
  },
];
