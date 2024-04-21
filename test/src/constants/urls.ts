import { routeCreator } from "@utils";

export const urls = {
  health: {
    entry: () => routeCreator("health"),
    check: () => routeCreator("check"),
  },
};
