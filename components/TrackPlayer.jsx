import { useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";

export default function TrackPlayer() {
  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: "https://firebasestorage.googleapis.com/v0/b/audiobook-8840c.appspot.com/o/audiobooks%2Fy2mate.com%20-%20TARKAN%20%20Kara%20Toprak.mp3?alt=media&token=1431e295-ddff-4ea0-a96a-1e7b2f77ee45",
    });
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }
  async function pauseSound() {
    await sound.pauseAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View className="">
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Pause" onPress={pauseSound} />
    </View>
  );
}
