import { routeManager } from "./routes/router.js";

window.addEventListener("hashchange",routeManager)
window.addEventListener("load",routeManager)