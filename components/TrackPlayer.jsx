import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, Pressable } from "react-native";
import { Audio } from "expo-av";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { convertMillisecondsToTime } from "../millisecondsConverter";

export default function TrackPlayer({ route }) {
  const [sound, setSound] = useState();
  const [audioLength, setAudioLength] = useState();
  const [currentAudioLength, setCurrentAudioLength] = useState(0);
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
      setAudioLength(status.durationMillis);
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

  setInterval(() => {
    if (stat === "playing") {
      setCurrentAudioLength(currentAudioLength + 1000);
    }
  }, 1000);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView>
        <View className="px-6 pt-4">
          <Pressable onPress={() => nav.goBack()}>
            <Ionicons name="arrow-back" size={36} color="black" />
          </Pressable>
        </View>
        <View className="h-[300px]">
          <Image
            className="w-[100%] h-[100%] mx-auto"
            style={{ objectFit: "contain" }}
            source={{ uri: image }}
          />
        </View>
        <View className="items-center justify-center mt-6 space-y-4">
          <Text className="text-xl font-bold">{title}</Text>
          <Text className="text-lg font-light">{author}</Text>
        </View>
        <View>
          <Slider
            minimumValue={0}
            maximumValue={audioLength}
            value={currentAudioLength}
            onSlidingComplete={(val) => {
              setCurrentAudioLength(val);
              sound.setPositionAsync(val);
            }}
            step={1}
            onValueChange={() => {
              console.log(
                "audio length:",
                audioLength,
                "current audio length:",
                currentAudioLength
              );
            }}
          />
        </View>
        <View>
          <Text>{convertMillisecondsToTime(currentAudioLength)}</Text>
          <Text>{convertMillisecondsToTime(audioLength)}</Text>
        </View>
        <View className="mt-2">
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
