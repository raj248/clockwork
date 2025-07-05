import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function Details() {
  const { name } = useLocalSearchParams();

  return (
    <>
      <View>
        <Text>Details for {name}</Text>
      </View>
    </>
  );
}
