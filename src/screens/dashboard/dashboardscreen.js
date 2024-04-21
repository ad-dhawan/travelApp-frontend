import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import UpcomingTrips from '../trip/upcomingtripscreen';
import MyTrips from '../trip/mytripscreen';
import Profile from '../profile/profilescreen';

const Dashboard = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'upcoming', title: 'Upcoming trips', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'trips', title: 'My Trips', focusedIcon: 'album' },
    { key: 'profile', title: 'Profile', focusedIcon: 'history' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    upcoming: UpcomingTrips,
    trips: MyTrips,
    profile: Profile,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Dashboard;