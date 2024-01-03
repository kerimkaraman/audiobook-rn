import { View, Text, SafeAreaView, Image, Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

export default function Homepage() {
  const { username } = useSelector((state) => state.user);

  return (
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
      </SafeAreaView>
    </View>
  );
}
