/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as IngredientsImport } from './routes/ingredients'
import { Route as ExamplesImport } from './routes/examples'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IngredientsRoute = IngredientsImport.update({
  path: '/ingredients',
  getParentRoute: () => rootRoute,
} as any)

const ExamplesRoute = ExamplesImport.update({
  path: '/examples',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/examples': {
      preLoaderRoute: typeof ExamplesImport
      parentRoute: typeof rootRoute
    }
    '/ingredients': {
      preLoaderRoute: typeof IngredientsImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AboutRoute,
  ExamplesRoute,
  IngredientsRoute,
  LoginRoute,
])

/* prettier-ignore-end */
