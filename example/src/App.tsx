import * as React from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';
import OnboardingSwiper from 'react-native-onboard-component';

export default function App() {
  React.useEffect(() => {}, []);

  const data = [
    {
      image: require('./images/image.png'),
      title: 'Onboarding',
      description: 'Done with React Native Onboard Component',
    },
    {
      image: require('./images/image2.png'),
      title: 'Onboarding',
      description: 'Done with React Native Onboard Component',
    },
  ];

  return (
    <View style={styles.container}>
      <OnboardingSwiper
        data={data}
        onDone={() => {}}
        textContainerStyle={{ display: 'none' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
