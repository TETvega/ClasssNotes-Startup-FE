import { appName } from "./app-name";

const formatTitle = (title) => {
  return `${title} | ${appName}`;
};

export const titleTabs = {
  DASHBOARD: formatTitle("Dashboard"),
};
