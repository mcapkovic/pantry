/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ShoppingListImport } from './routes/shopping-list'
import { Route as PostsImport } from './routes/posts'
import { Route as LoginImport } from './routes/login'
import { Route as IngredientsImport } from './routes/ingredients'
import { Route as ExportImport } from './routes/export'
import { Route as ExamplesImport } from './routes/examples'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as PostsIndexImport } from './routes/posts.index'
import { Route as PostsPostIdImport } from './routes/posts.$postId'
import { Route as PostsPostIdIndexImport } from './routes/posts.$postId.index'
import { Route as PostsPostIdDetailImport } from './routes/posts.$postId.detail'
import { Route as PostsPostIdDetailSubPostIdImport } from './routes/posts.$postId.detail.$subPostId'

// Create/Update Routes

const ShoppingListRoute = ShoppingListImport.update({
  path: '/shopping-list',
  getParentRoute: () => rootRoute,
} as any)

const PostsRoute = PostsImport.update({
  path: '/posts',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IngredientsRoute = IngredientsImport.update({
  path: '/ingredients',
  getParentRoute: () => rootRoute,
} as any)

const ExportRoute = ExportImport.update({
  path: '/export',
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

const PostsIndexRoute = PostsIndexImport.update({
  path: '/',
  getParentRoute: () => PostsRoute,
} as any)

const PostsPostIdRoute = PostsPostIdImport.update({
  path: '/$postId',
  getParentRoute: () => PostsRoute,
} as any)

const PostsPostIdIndexRoute = PostsPostIdIndexImport.update({
  path: '/',
  getParentRoute: () => PostsPostIdRoute,
} as any)

const PostsPostIdDetailRoute = PostsPostIdDetailImport.update({
  path: '/detail',
  getParentRoute: () => PostsPostIdRoute,
} as any)

const PostsPostIdDetailSubPostIdRoute = PostsPostIdDetailSubPostIdImport.update(
  {
    path: '/$subPostId',
    getParentRoute: () => PostsPostIdDetailRoute,
  } as any,
)

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
    '/export': {
      preLoaderRoute: typeof ExportImport
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
    '/posts': {
      preLoaderRoute: typeof PostsImport
      parentRoute: typeof rootRoute
    }
    '/shopping-list': {
      preLoaderRoute: typeof ShoppingListImport
      parentRoute: typeof rootRoute
    }
    '/posts/$postId': {
      preLoaderRoute: typeof PostsPostIdImport
      parentRoute: typeof PostsImport
    }
    '/posts/': {
      preLoaderRoute: typeof PostsIndexImport
      parentRoute: typeof PostsImport
    }
    '/posts/$postId/detail': {
      preLoaderRoute: typeof PostsPostIdDetailImport
      parentRoute: typeof PostsPostIdImport
    }
    '/posts/$postId/': {
      preLoaderRoute: typeof PostsPostIdIndexImport
      parentRoute: typeof PostsPostIdImport
    }
    '/posts/$postId/detail/$subPostId': {
      preLoaderRoute: typeof PostsPostIdDetailSubPostIdImport
      parentRoute: typeof PostsPostIdDetailImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AboutRoute,
  ExamplesRoute,
  ExportRoute,
  IngredientsRoute,
  LoginRoute,
  PostsRoute.addChildren([
    PostsPostIdRoute.addChildren([
      PostsPostIdDetailRoute.addChildren([PostsPostIdDetailSubPostIdRoute]),
      PostsPostIdIndexRoute,
    ]),
    PostsIndexRoute,
  ]),
  ShoppingListRoute,
])

/* prettier-ignore-end */
