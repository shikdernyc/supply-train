import DashboardIcon from '@material-ui/icons/Dashboard';
import TableIcon from '@material-ui/icons/Toc';

const sidebarRoutes = (currentStateCode) => [
  {
    name: 'Overview',
    to: `/state/${currentStateCode}/overview`,
    icon: DashboardIcon,
  }, {
    name: 'State Data',
    to: `/state/${currentStateCode}/state-data`,
    icon: TableIcon,
  }, {
    name: 'Orders',
    to: `/state/${currentStateCode}/orders`,
    icon: DashboardIcon,
  },
];

export default sidebarRoutes;
