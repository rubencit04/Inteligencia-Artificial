import 'dotenv/config'
import { manageIncidence } from './function-calling/manage-incidence.js'

const message = "Quisiera saber cuando se va a renovar la suscripción a los cursos de las certificaciones de mi usuario pepitogrillo@micurso.com";

const response = await manageIncidence(message);

