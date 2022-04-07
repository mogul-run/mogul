import * as functions from "firebase-functions";
const cors = require('cors')({origin: true});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

type HTTPSHandler = (req: functions.https.Request, res: functions.Response<any>) => void | Promise<void>;

const applyMiddleware = (handler: HTTPSHandler): HTTPSHandler => {
    return (req, res) => {
        cors(req, res, () => {
            return handler(req, res)
        })
    }
}

export const canIGetIt = functions.https.onRequest(applyMiddleware((request, response) => {
    response.send({
        data: "you got it bud",
    });
}));
