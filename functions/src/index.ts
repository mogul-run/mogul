// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

import * as functions from "firebase-functions";
const cors = require('cors')({origin: true});

type HTTPSHandler = (req: functions.https.Request, res: functions.Response<any>) => void | Promise<void>;
const applyMiddleware = (handler: HTTPSHandler): HTTPSHandler => {
    return (req, res) => {
        cors(req, res, () => {
            return handler(req, res)
        })
    }
}

// Export functions to register them as GCP functions

export const myFirstHandler = functions.https.onRequest(
    applyMiddleware((request, response) => {
        response.send({
            data: "There you go",
        });
    }
));
