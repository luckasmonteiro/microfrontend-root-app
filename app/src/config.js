import { registerApplication, start } from "single-spa";
import "@app/styles.scss";

registerApplication({
  name: "@polyglot-mf/navbar",
  app: () => System.import("@qualis-mf-navbar"),
  activeWhen: "/",
});

start();