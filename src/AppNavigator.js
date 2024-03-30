import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//AUTH
import Login from './screens/login/loginscreen';

//PROFILE
import Profile from './screens/profile/profilescreen';

//TRIPS
import UpcomingTrips from './screens/trip/upcomingtripscreen';
import MyTrips from './screens/trip/mytripscreen';
import Bookings from './screens/trip/bookingscreen';
import Documents from './screens/trip/documentscreen';
import Itinerary from './screens/trip/itineraryscreen';
import Notes from './screens/trip/notescreen';
import PackingList from './screens/trip/packinglistscreen';
import Todo from './screens/trip/todoscreen';
import Transport from './screens/trip/transportscreen';

export function createAppNavigator(routes) {
  const AppNavigator = createStackNavigator(routes, {
    defaultNavigationOptions: {
      headerShown: false,
    },
  });

  return createAppContainer(AppNavigator);
}

const routes = {
  login: { screen: Login },
  profile: { screen: Profile },
  upcomingTrips: { screen: UpcomingTrips },
  myTrips: { screen: MyTrips },
  bookings: { screen: Bookings },
  documents: { screen: Documents },
  itinerary: { screen: Itinerary },
  notes: { screen: Notes },
  packingList: { screen: PackingList },
  todo: { screen: Todo },
  transport: { screen: Transport },
};

export default createAppNavigator(routes);