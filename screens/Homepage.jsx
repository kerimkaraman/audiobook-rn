import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE } from "../firebaseConfig";
import AudioCard from "../components/AudioCard";
import LoadingScreen from "./LoadingScreen";

export default function Homepage({ navigation }) {
  const { username } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const getAudioBooks = async () => {
    const db = FIRESTORE;
    const querySnapshot = await getDocs(collection(db, "audiobooks"));
    const newArr = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setData(newArr);
    setIsLoading(false);
  };

  useEffect(() => {
    getAudioBooks();
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <View
      style={{
        paddingTop: Platform.OS == "android" ? 25 : 0,
      }}
      className="bg-white flex-1"
    >
      <SafeAreaView className="flex-1">
        <View className="px-4 flex-row items-end space-x-6">
          <Image
            className="w-[70px] h-[70px] rounded-full"
            style={{ objectFit: "cover" }}
            source={require("../assets/images/avatar.png")}
          />
          <View>
            <Text className="text-lg font-bold">Hello,</Text>
            <Text className="text-lg font-bold">{username}</Text>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate("SearchScreen")}
          className="bg-[#EFECF8] py-3 my-4 px-3 w-[90%] mx-auto rounded-lg mt-4 flex-row justify-between"
        >
          <Text className="text-[#585859]">Search for audibooks</Text>
          <Ionicons name="search" size={16} color="#585859" />
        </Pressable>
        <ScrollView style={{ flex: 1 }}>
          <View className="my-4 px-2">
            <Text className="text-xl font-bold">Audiobooks</Text>
          </View>
          <View
            style={{ gap: 20 }}
            className="flex-row flex-wrap px-6 justify-start"
          >
            {data.map((audio) => {
              return (
                <AudioCard
                  key={audio.id}
                  id={audio.id}
                  image={audio.image}
                  title={audio.title}
                />
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
