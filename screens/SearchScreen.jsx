import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FIRESTORE } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import LoadingScreen from "./LoadingScreen";

export default function SearchScreen({ navigation }) {
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
    <View className="pt-16">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="space-y-4">
          <Pressable onPress={() => navigation.goBack()} className="ml-6">
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </Pressable>
          <View className="bg-[#EFECF8] py-3 my-4 px-3 w-[90%] mx-auto rounded-lg mt-4 flex-row justify-between">
            <TextInput
              placeholder="Search for audibooks"
              placeholderTextColor="#585859"
            />
            <Ionicons name="search" size={16} color="#585859" />
          </View>
        </View>
        <ScrollView></ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
