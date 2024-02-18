import React, { useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, GestureHandlerRootView, State } from 'react-native-gesture-handler';

export default function SunsetMatchesMain({ navigation }: { navigation: any }) {
  const translateX = useRef(new Animated.Value(0)).current;
 

  const onGestureEvent = Animated.event<PanGestureHandlerGestureEvent>(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.END) {
      translateX.flattenOffset(); 
      Animated.timing(translateX, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();

      
      if (event.nativeEvent.translationX > (200 * 0.20)) {
        navigation.navigate('LoginLanding');
      }
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <ImageBackground
        source={require('../../assets/bg.jpeg')} 
        style={styles.background}
      > */}
        <View style={styles.container}>
          <Text style={styles.title}>Sunset Matches</Text>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Animated.View
              style={[
                styles.slider,
                {
                  transform: [{ translateX }],
                },
              ]}
            >
              <Text style={styles.startButtonText}>Slide to Start {'->'}</Text>
            </Animated.View>
          </PanGestureHandler>
          <Text style={styles.termsText}>
            By continuing you agree with our{' '}
            <Text style={styles.hyperlink}>Terms&Conditions</Text> and the application of our{' '}
            <Text style={styles.hyperlink}>Privacy Statement</Text>
          </Text>
        </View>
      {/* </ImageBackground> */}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  slider: {
    backgroundColor: '#DAA520', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    backgroundColor: 'black'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    marginTop: 100,
  },
  startButton: {
    backgroundColor: '#DAA520',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: 280,
    height: 63
  },
  startButtonText: {
    fontSize: 18,
    color: 'white',
  },
  termsText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30, 
  },
  hyperlink: {
    textDecorationLine: 'underline',
  },
});