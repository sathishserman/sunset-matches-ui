import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import MapView, { MapStyleElement, Marker } from "react-native-maps";
import { useDispatch } from "react-redux";
import { setLocation } from "../../redux/actions";
import BackHeader from "../../components/BackHeader";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import { MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { color } from "react-native-elements/dist/helpers";

export default function LocationScreen({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const [location, setLocationState] = useState<Location.LocationObject | null>(
    null
  );
  const [district, setDistrict] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const requestLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocationState(currentLocation);

    dispatch(
      setLocation(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      )
    );

    const address = await Location.reverseGeocodeAsync({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });

    const firstResult = address[0];
    setDistrict(firstResult.district || firstResult.city || "Unknown");
    setLoading(false);
  };

  return (
    <>
      <CustomSafeAreaView>
        <View className="flex-1 justify-between items-center pb-10">
          <View className="items-center justify-center w-5/6">
            <Text className="font-robotoMedium text-3xl text-[#E25A28]">
              Add your location
            </Text>
            <Text className="mt-2 text-center text-[#898A8D]">
              We need your approximate location* to organize dates at convenient
              places
            </Text>
            <Text className="mt-1 text-[#898A8D]">
              *You can change it later
            </Text>
          </View>
          {loading && (
            <View className="w-3/4 h-1/2 items-center gap-3 mb-10">
              <Text className="font-robotoMedium text-xl text-[#E25A28]">
                Loading...
              </Text>
            </View>
          )}
          {!location && !loading && (
            <MaterialIcons name="location-pin" size={80} color="#E25A28" />
          )}
          {location && !loading && (
            <View className="w-3/4 h-1/2 items-center gap-3 mb-10">
              <Text className="font-robotoMedium text-xl text-[#E25A28]">
                Your district: {district}
              </Text>
              <MapView
                className="w-full h-full"
                customMapStyle={mapStyle}
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
            </View>
          )}
          <CustomButton
            // onPress={requestLocation}
            onPress={() => {
              if (location) {
                navigation.navigate("ProfileComplete");
              } else {
                requestLocation();
              }
            }}
            title="Allow"
            gradient
            _className="w-2/3"
          />
        </View>
      </CustomSafeAreaView>
    </>
  );
}

const mapStyle = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#000000",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels.text.fill",
    stylers: [
      {
        lightness: "17",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#ff4700",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        invert_lightness: true,
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#3b3b3b",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ff4700",
      },
      {
        lightness: "39",
      },
      {
        gamma: "0.43",
      },
      {
        saturation: "-47",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#555555",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
    ],
  },
];
