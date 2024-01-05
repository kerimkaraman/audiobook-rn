import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import { Audio } from "expo-av";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TrackPlayer({ route }) {
  const [sound, setSound] = useState();

  const [stat, setStat] = useState("loading");
  const nav = useNavigation();
  const { source, image, title, author } = route.params;

  async function playSound() {
    if (stat == "loading") {
      console.log("Loading Sound");
      const { sound, status } = await Audio.Sound.createAsync({
        uri: source,
      });
      setSound(sound);
      console.log("Playing Sound");
      setStat("playing");
      await sound.playAsync();
    } else if (stat == "playing") {
      await sound.pauseAsync();
      console.log("Pausing Sound");
      setStat("paused");
    } else if (stat == "paused") {
      setStat("playing");
      await sound.playAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
          setStat("loading");
        }
      : undefined;
  }, [sound]);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView>
        <View className="px-6 py-2">
          <Pressable onPress={() => nav.goBack()}>
            <Ionicons name="arrow-back" size={36} color="black" />
          </Pressable>
        </View>
        <View>
          <Image
            className="w-[90%] h-[70%] mx-auto"
            style={{ objectFit: "contain" }}
            source={{ uri: image }}
          />
        </View>
        <View>
          <Pressable className="mx-auto" onPress={playSound}>
            <Foundation
              name={stat === "playing" ? "pause" : "play"}
              size={128}
              color="#523EAC"
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

/* 
    <Foundation
    name={stat == "playing" || stat == "loading" ? "play" : "pause"}
    size={128}
    color="#523EAC"
    /> 
*/
