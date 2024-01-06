import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FIRESTORE } from "../firebaseConfig";
import AudioBookDetailItem from "../components/AudioBookDetailItem";
import LoadingScreen from "./LoadingScreen";

export default function AudioBookDetailScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const width = Dimensions.get("screen").width;

  const getAllData = async () => {
    const db = FIRESTORE;
    const q = query(collection(db, "audiobooks"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setData(doc.data());
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getAllData();
  }, []);
  const { id } = route.params;
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View
      style={{
        paddingTop: Platform.OS == "android" ? 50 : 0,
      }}
      className="flex-1 py-16 bg-white"
    >
      <ScrollView style={{ flex: 1 }}>
        <View className="px-4">
          <Pressable onPress={() => navigation.goBack()} className="">
            <Ionicons name="arrow-back" size={36} color="black" />
          </Pressable>
        </View>
        <View className="my-2">
          <Image
            style={{
              width: width,
              height: 300,
              objectFit: "contain",
            }}
            source={{ uri: data.image }}
          />
        </View>
        <View className="items-center gap-y-2 mt-2">
          <Text className="text-xl font-semibold">{data.title}</Text>
          <Text className="text-xl font-light">{data.author}</Text>
        </View>
        <View className="flex-row items-center justify-between px-6 mt-6">
          <AudioBookDetailItem text={data.duration} title="Duration" />
          <AudioBookDetailItem text={data.stars} title="Rating" />
          <AudioBookDetailItem text="ENG" title="Lang" />
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate("TrackPlayer", {
              source: data.source,
              image: data.image,
              title: data.title,
              author: data.author,
            })
          }
          className="my-10 bg-[#523EAC] py-2 w-[80%] mx-auto rounded-lg"
        >
          <Text className="text-white text-xl text-center">Listen</Text>
        </Pressable>
        <View className="gap-y-6 px-6">
          <Text className="text-3xl font-bold">About The Book</Text>
          <Text className="text-lg">{data.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
