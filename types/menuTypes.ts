export type MenuItem = {
  title: string;
  key: string;
  link: string;
  icon: string | React.ReactNode;
  children?: MenuItem[];
};
