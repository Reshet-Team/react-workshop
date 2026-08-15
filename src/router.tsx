import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import { Home } from './routes/Home'
import { Module1Route } from './routes/Module1Route'
import { Module2Route } from './routes/Module2Route'
import { Module3Route } from './routes/Module3Route'
import { Module4Route } from './routes/Module4Route'
import { Module5Route } from './routes/Module5Route'

const rootRoute = createRootRoute()

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const module1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/1',
  component: Module1Route,
})

const module1Ex1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/1/exercise/1',
  component: Module1Route,
})

const module1Ex2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/1/exercise/2',
  component: Module1Route,
})

const module1Ex3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/1/exercise/3',
  component: Module1Route,
})

const module2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/2',
  component: Module2Route,
})

const module2Ex1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/2/exercise/1',
  component: Module2Route,
})

const module2Ex2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/2/exercise/2',
  component: Module2Route,
})

const module2Ex3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/2/exercise/3',
  component: Module2Route,
})

const module3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/3',
  component: Module3Route,
})

const module3Ex1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/3/exercise/1',
  component: Module3Route,
})

const module3Ex2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/3/exercise/2',
  component: Module3Route,
})

const module3Ex3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/3/exercise/3',
  component: Module3Route,
})

const module4Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/4',
  component: Module4Route,
})

const module4Ex1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/4/exercise/1',
  component: Module4Route,
})

const module4Ex2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/4/exercise/2',
  component: Module4Route,
})

const module4Ex3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/4/exercise/3',
  component: Module4Route,
})

const module5Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/5',
  component: Module5Route,
})

const module5Ex1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/5/exercise/1',
  component: Module5Route,
})

const module5Ex2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/5/exercise/2',
  component: Module5Route,
})

const module5Ex3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/module/5/exercise/3',
  component: Module5Route,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  module1Route,
  module1Ex1Route,
  module1Ex2Route,
  module1Ex3Route,
  module2Route,
  module2Ex1Route,
  module2Ex2Route,
  module2Ex3Route,
  module3Route,
  module3Ex1Route,
  module3Ex2Route,
  module3Ex3Route,
  module4Route,
  module4Ex1Route,
  module4Ex2Route,
  module4Ex3Route,
  module5Route,
  module5Ex1Route,
  module5Ex2Route,
  module5Ex3Route,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
