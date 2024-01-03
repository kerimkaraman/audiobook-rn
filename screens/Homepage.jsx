import { View, Text, SafeAreaView, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE } from "../firebaseConfig";
import AudioCard from "../components/AudioCard";

export default function Homepage() {
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
    getAudioBooks().then(console.log(data));
  }, []);

  return isLoading ? (
    <View className="flex-1 justify-center items-center bg-white">
      <Text>Loading</Text>
    </View>
  ) : (
    <View className="bg-white flex-1">
      <SafeAreaView>
        <View className="p-4 flex-row items-end space-x-6">
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
        <Pressable className="bg-[#EFECF8] py-3 px-3 w-[90%] mx-auto rounded-lg mt-4 flex-row justify-between">
          <Text className="text-[#585859]">Search title, topics or author</Text>
          <Ionicons name="search" size={16} color="#585859" />
        </Pressable>
        <View>
          {data.map((audio) => {
            return (
              <AudioCard
                key={audio.id}
                id={audio.id}
                image={audio.image}
                title={audio.name}
              />
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}

/*     querySnapshot.forEach((doc) => {
      setData((previous) => [...previous, doc.data()]);
    }); */
