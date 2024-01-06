import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { Audio } from "expo-av";
import {
  Foundation,
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Slider from "react-native-slider";
import { convertMillisecondsToTime } from "../millisecondsConverter";

export default function TrackPlayer({ route }) {
  const [sound, setSound] = useState();
  const [audioLength, setAudioLength] = useState(0);
  const [currentAudioLength, setCurrentAudioLength] = useState(0);
  const [stat, setStat] = useState("loading");
  const [volumeLevel, setVolumeLevel] = useState(0.5);
  const nav = useNavigation();
  const { source, image, title, author } = route.params;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (stat === "playing") {
        if (currentAudioLength === audioLength) {
          setCurrentAudioLength(0);
          setStat("loading");
          clearInterval(intervalId);
        } else {
          setCurrentAudioLength((prev) => prev + 1000);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [stat, currentAudioLength, audioLength]);

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
          setCurrentAudioLength(0);
        }
      : undefined;
  }, [sound]);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView>
        <View className="px-6 pt-4">
          <Pressable onPress={() => nav.goBack()}>
            <Ionicons name="arrow-back-outline" size={36} color="black" />
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
        <View className="w-[80%] mx-auto">
          <Slider
            step={1}
            minimumValue={0}
            maximumValue={audioLength}
            thumbStyle={{
              width: 10,
              height: 10,
              backgroundColor: "#523eac",
            }}
            value={currentAudioLength}
            minimumTrackTintColor="#CFC7F1"
            maximumTrackTintColor="#EEECF9"
            onSlidingComplete={(val) => {
              setCurrentAudioLength(val);
              sound.setPositionAsync(val);
            }}
          />
        </View>
        <View className="flex-row justify-between px-12">
          <Text className=" text-[#523eac] font-light text-xs">
            {convertMillisecondsToTime(currentAudioLength)}
          </Text>
          <Text className=" text-[#523eac] font-light text-xs">
            {convertMillisecondsToTime(audioLength)}
          </Text>
        </View>
        <View className="mt-2">
          <View className="flex-row items-center px-12">
            <Pressable
              onPress={() => {
                setCurrentAudioLength(currentAudioLength - 10000);
                sound.setPositionAsync(currentAudioLength - 10000);
              }}
            >
              <MaterialIcons name="replay-10" size={52} color="#523EAC" />
            </Pressable>
            <Pressable className="mx-auto" onPress={playSound}>
              <Foundation
                name={stat === "playing" ? "pause" : "play"}
                size={128}
                color="#523EAC"
              />
            </Pressable>
            <Pressable
              onPress={() => {
                setCurrentAudioLength(currentAudioLength + 10000);
                sound.setPositionAsync(currentAudioLength + 10000);
              }}
            >
              <MaterialIcons name="forward-10" size={52} color="#523EAC" />
            </Pressable>
          </View>
          <View className="px-12 mt-8 flex-row items-center justify-center space-x-2">
            <FontAwesome5 name="volume-down" size={24} color="#523eac" />
            <View className="w-[80%]">
              <Slider
                minimumValue={0}
                maximumValue={1}
                thumbStyle={{
                  width: 10,
                  height: 10,
                  backgroundColor: "#523eac",
                }}
                value={volumeLevel}
                minimumTrackTintColor="#CFC7F1"
                maximumTrackTintColor="#EEECF9"
                onSlidingComplete={(val) => {
                  setVolumeLevel(val);
                  sound.setVolumeAsync(val);
                }}
              />
            </View>
            <FontAwesome5 name="volume-up" size={24} color="#523eac" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  thumb: {},
});
/* 
    <Foundation
    name={stat == "playing" || stat == "loading" ? "play" : "pause"}
    size={128}
    color="#523EAC"
    /> 
*/
