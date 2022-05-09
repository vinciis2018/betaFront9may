import React, { Fragment, ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from 'react-redux'

type PrivateRouteProps = {
  component?: any;
  layout?: any | typeof Fragment;
  exact?: boolean;
  path?: string;
};

interface Props {
  children: ReactNode;
}
function EmptyLayout({ children }: Props) {
  return <div>{children}</div>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, layout: Layout = EmptyLayout, ...rest }) => (
  
  <Route
    {...rest}
    render={props => {
      return (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);
export default PrivateRoute;
