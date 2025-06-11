import { Link, Paper } from '@mui/material';
import NextLink from 'next/link';

export interface NavConfigProps {
  id: string;
  name: string;
  route: string;
}

export interface NavBarProps {
  navConfig: NavConfigProps[];
}

export const NavBar: React.FC<NavBarProps> = ({ navConfig }) => {
  return (
    <Paper className="flex gap-x-4 p-4">
      {navConfig.map((nc) => (
        <Link
          href={nc.route}
          key={nc.id}
          component={NextLink}
          variant="button"
          className="inline-block"
        >
          {nc.name}
        </Link>
      ))}
    </Paper>
  );
};
