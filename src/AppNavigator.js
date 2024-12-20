import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//AUTH
import Login from './screens/login/loginscreen';

//PROFILE
import Profile from './screens/profile/profilescreen';

//DASHBORD
import Dashboard from './screens/dashboard/dashboardscreen';
import Splash from './screens/splash/splashscreen';

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
import PdfViewer from './screens/trip/pdfviewer';
import CreateTrip from './screens/trip/createtrip';
import EditTrip from './screens/trip/edittrip';

export function createAppNavigator(routes) {
  const AppNavigator = createStackNavigator(routes, {
    defaultNavigationOptions: {
      headerShown: false,
    },
  });

  return createAppContainer(AppNavigator);
}

const routes = {
  splash: { screen: Splash },
  login: { screen: Login },
  // dashboard: { screen: Dashboard },
  upcomingTrips: { screen: UpcomingTrips },
  profile: { screen: Profile },
  myTrips: { screen: MyTrips },
  createTrip: { screen: CreateTrip },
  editTrip: { screen: EditTrip },
  bookings: { screen: Bookings },
  documents: { screen: Documents },
  itinerary: { screen: Itinerary },
  notes: { screen: Notes },
  packingList: { screen: PackingList },
  todo: { screen: Todo },
  transport: { screen: Transport },
  pdfViewer: { screen: PdfViewer }
};

export default createAppNavigator(routes);
