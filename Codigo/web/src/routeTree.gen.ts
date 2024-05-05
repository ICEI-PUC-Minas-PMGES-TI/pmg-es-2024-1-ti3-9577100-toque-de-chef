/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as SuplyerIndexImport } from './routes/suplyer/index'
import { Route as RegistrationIndexImport } from './routes/registration/index'
import { Route as PurchaseIndexImport } from './routes/purchase/index'
import { Route as ProfileIndexImport } from './routes/profile/index'
import { Route as ProductIndexImport } from './routes/product/index'
import { Route as CategoryIndexImport } from './routes/category/index'
import { Route as AwaitingSystemAccessIndexImport } from './routes/awaiting-system-access/index'
import { Route as AccessControlIndexImport } from './routes/accessControl/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SuplyerIndexRoute = SuplyerIndexImport.update({
  path: '/suplyer/',
  getParentRoute: () => rootRoute,
} as any)

const RegistrationIndexRoute = RegistrationIndexImport.update({
  path: '/registration/',
  getParentRoute: () => rootRoute,
} as any)

const PurchaseIndexRoute = PurchaseIndexImport.update({
  path: '/purchase/',
  getParentRoute: () => rootRoute,
} as any)

const ProfileIndexRoute = ProfileIndexImport.update({
  path: '/profile/',
  getParentRoute: () => rootRoute,
} as any)

const ProductIndexRoute = ProductIndexImport.update({
  path: '/product/',
  getParentRoute: () => rootRoute,
} as any)

const CategoryIndexRoute = CategoryIndexImport.update({
  path: '/category/',
  getParentRoute: () => rootRoute,
} as any)

const AwaitingSystemAccessIndexRoute = AwaitingSystemAccessIndexImport.update({
  path: '/awaiting-system-access/',
  getParentRoute: () => rootRoute,
} as any)

const AccessControlIndexRoute = AccessControlIndexImport.update({
  path: '/accessControl/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/accessControl/': {
      preLoaderRoute: typeof AccessControlIndexImport
      parentRoute: typeof rootRoute
    }
    '/awaiting-system-access/': {
      preLoaderRoute: typeof AwaitingSystemAccessIndexImport
      parentRoute: typeof rootRoute
    }
    '/category/': {
      preLoaderRoute: typeof CategoryIndexImport
      parentRoute: typeof rootRoute
    }
    '/product/': {
      preLoaderRoute: typeof ProductIndexImport
      parentRoute: typeof rootRoute
    }
    '/profile/': {
      preLoaderRoute: typeof ProfileIndexImport
      parentRoute: typeof rootRoute
    }
    '/purchase/': {
      preLoaderRoute: typeof PurchaseIndexImport
      parentRoute: typeof rootRoute
    }
    '/registration/': {
      preLoaderRoute: typeof RegistrationIndexImport
      parentRoute: typeof rootRoute
    }
    '/suplyer/': {
      preLoaderRoute: typeof SuplyerIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AccessControlIndexRoute,
  AwaitingSystemAccessIndexRoute,
  CategoryIndexRoute,
  ProductIndexRoute,
  ProfileIndexRoute,
  PurchaseIndexRoute,
  RegistrationIndexRoute,
  SuplyerIndexRoute,
])

/* prettier-ignore-end */
