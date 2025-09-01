import { appName } from "./appName";

const formatTitle = (title) => {
  return `${title} | ${appName}`;
};

export const titleTabs = {
  DASHBOARD: formatTitle("Dashboard"),
};
