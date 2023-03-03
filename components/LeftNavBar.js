import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LeftNavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text
        style={styles.navItem}
        onPress={() => navigation.navigate('Home')}
      >
        Home
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '20%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItem: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default LeftNavBar;
