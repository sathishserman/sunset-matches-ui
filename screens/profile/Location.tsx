import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { setLocation } from '../../redux/actions';
import BackHeader from '../../components/BackHeader';

export default function LocationScreen({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const [location, setLocationState] = useState<Location.LocationObject | null>(null);
  const [district, setDistrict] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocationState(currentLocation);
      dispatch(setLocation(currentLocation.coords.latitude, currentLocation.coords.longitude));

   
      const address = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });


      const firstResult = address[0];
      setDistrict(firstResult.district || firstResult.city || 'Unknown');
    })();
  }, [dispatch]);

  return (
    <>
      <BackHeader color="white"/>
      <View style={styles.container}>
        <Text style={styles.title}>Add your location</Text>
        <Text style={styles.district}>Your district: {district}</Text>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={"Your Location"}
            />
          </MapView>
        )}
        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('NextScreen')}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  district: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  continueButton: {
    backgroundColor: '#DAA520',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  continueButtonText: {
    color: '#000',
    fontSize: 18,
  }
});