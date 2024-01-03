import { useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";

export default function TrackPlayer() {
  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: "https://firebasestorage.googleapis.com/v0/b/audiobook-8840c.appspot.com/o/audiobooks%2Fy2mate.com%20-%20The%20Little%20Mermaid%20by%20Hans%20Christian%20Andersen%20%20Full%20Audiobook%20%20Relaxing%20Bedtime%20Stories%20.mp3?alt=media&token=f4322f1d-5d16-4f5f-882d-49df2fbc4e6b",
    });
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }
  async function pauseSound() {
    await sound.pauseAsync();
    console.log("Pausing Sound");
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
