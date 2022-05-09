import { Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
// pages
import { 
  Home, 
  Nft, 
  Artist, 
  MapBox, 
  Payment,  
  Signup, 
  Signin, 
  Adverts, 
  AdvertDetail, 
  AdvertEdit, 
  AdvertCreate, 
  ScreenEdit, 
  Screens, 
  ScreenDetail, 
  UserProfile,
  Wallet,
  ScreenDashboard
} from "pages";

// ui
import { Stack } from "@chakra-ui/react";
import { AppLayout } from "components/layouts";
import { CampaignDashboard, UserDashboard } from "pages/dashboard";

export const Routes = () => {
  return (
    <Stack py="20">
      <Switch>
        <PublicRoute exact path="/" component={Home} layout={AppLayout} />
        <PublicRoute exact path="/nft/:id" component={Nft} layout={AppLayout} />
        <PublicRoute exact path="/artist/:id" component={Artist} layout={AppLayout} />
        <PublicRoute exact path="/mapbox/:pinId?" component={MapBox} layout={AppLayout} />
        <PublicRoute exact path="/signin" component={Signin} layout={AppLayout} />
        <PublicRoute exact path="/signup" component={Signup} layout={AppLayout} />

        <PrivateRoute exact path="/screens" component={Screens} layout={AppLayout} />
        <PrivateRoute exact path="/screen/:id" component={ScreenDetail} layout={AppLayout} />
        <PrivateRoute exact path="/screen/:id/edit" component={ScreenEdit} layout={AppLayout} />

        <PrivateRoute exact path="/adverts" component={Adverts} layout={AppLayout} />
        <PrivateRoute exact path="/advert/:id/:txId" component={AdvertDetail} layout={AppLayout} />
        <PrivateRoute exact path="/createCampaign/:screenId" component={AdvertCreate} layout={AppLayout} />
        <PrivateRoute exact path="/editCampaign/:id/:screenId/:txId?" component={AdvertEdit} layout={AppLayout} />

        <PrivateRoute exact path="/campaign/payment/:walletAddress" component={Payment} layout={AppLayout} />
        <PrivateRoute exact path="/userProfile/:id" component={UserProfile} layout={AppLayout} />
        <PrivateRoute exact path="/wallet/:id" component={Wallet} layout={AppLayout} />

        <PrivateRoute exact path="/dashboard/screen/:id" component={ScreenDashboard} layout={AppLayout} />
        <PrivateRoute exact path="/dashboard/user/:id" component={UserDashboard} layout={AppLayout} />
        <PrivateRoute exact path="/dashboard/campaign/:id?/:txId?" component={CampaignDashboard} layout={AppLayout} />



      </Switch>
    </Stack>
  );
};
