/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import sequelize from "./sequelize";
import config from "../webpack.dev.config";
import logger from "./config/winston";
import "@babel/polyfill";

import login from "./route/login";
import user from "./route/user";
import setting from "./route/setting";
import module from "./route/module";
import gas from "./route/gas";
import auth from "./route/auth";
import area from "./route/area";
import presetArea from "./route/presetArea";
import image from "./route/image";
import event from "./route/event";
import menu from "./route/menu";
import criterion from "./route/criterion";
import eventScheduler from "./scheduler/eventLog";

const schedule = require("node-schedule");

const app = express();
const port = 3000;
const devPort = 3001;
process.env.TZ = "Asia/Seoul";

schedule.scheduleJob("0/7 * * * * *", () => {
  eventScheduler();
});

if (process.env.NODE_ENV === "development") {
  logger.info("Server is running on development mode")

  const compiler = webpack(config)
  const devServer = new WebpackDevServer(compiler, config.devServer)

  devServer.listen(devPort, () => {
    logger.info("webpack-dev-server is listening on port", devPort)
  });
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(`${__dirname}/../public`));

app.use("/v1/api/login", login);
app.use("/v1/api/user", user);
app.use("/v1/api/setting", setting);
app.use("/v1/api/module", module);
app.use("/v1/api/gas", gas);
app.use("/v1/api/auth", auth);
app.use("/v1/api/area", area);
app.use("/v1/api/preset", presetArea);
app.use("/v1/api/image", image);
app.use("/v1/api/event", event);
app.use("/v1/api/menu", menu);
app.use("/v1/api/criterion", criterion);

app.listen(port, () => {
  logger.info("Express listening on port", port);
});

const sqlConnectionTest = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
};

app.get("*", (req, res) => {
  res.redirect("/");
});

sqlConnectionTest();
