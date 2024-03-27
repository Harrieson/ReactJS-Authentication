import express from 'express';
import { LeadsController } from "../controller/leads.controller.js";

const LeadRouter = express.Router();

LeadRouter.get('/', LeadsController)

export default LeadRouter;