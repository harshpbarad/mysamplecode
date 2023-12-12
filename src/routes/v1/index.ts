import { Router } from "express";

import authRoute from "./authRoute";

const appRouter = Router();

const appRoutes = [
  {
    path: "/auth",
    router: authRoute,
  },
];

appRoutes.forEach(route => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
