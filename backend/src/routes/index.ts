import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

// esse routes.use faz com que toda request que seja /appointments passe para o appointmentsRouter
routes.use('/appointments', appointmentsRouter);

export default routes;
