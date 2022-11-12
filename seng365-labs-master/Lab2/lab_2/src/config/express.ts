import express from "express";
import bodyParser from "body-parser"
export default () => {
    const app = express();
    app.use( bodyParser.json() );
    require('../app/routes/user.server.routes.js')(app);
    return app;
};