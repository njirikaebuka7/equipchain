import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import blogRouter from "./blog";
import contactRouter from "./contact";
import quotesRouter from "./quotes";
import settingsRouter from "./settings";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(blogRouter);
router.use(contactRouter);
router.use(quotesRouter);
router.use(settingsRouter);
router.use(dashboardRouter);

export default router;
