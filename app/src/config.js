import { registerApplication, start } from "single-spa";
import "@app/styles.scss";

registerApplication({
  name: "@qualis-mf-/navbar",
  app: () => System.import("@qualis-mf-navbar"),
  activeWhen: "/",
});

registerApplication({
  name: "@qualis-mf-/app1",
  app: () => System.import("@qualis-mf-app1"),
  activeWhen: "/app",
});

registerApplication({
  name: "@qualis-mf-/app2",
  app: () => System.import("@qualis-mf-app2"),
  activeWhen: "/app1",
});

registerApplication({
  name: "@qualis-mf-/app3",
  app: () => System.import("@qualis-mf-app3"),
  activeWhen: "/app2",
});

start();