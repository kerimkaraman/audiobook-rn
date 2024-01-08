import { View, Text, ImageBackground, Pressable } from "react-native";
import React from "react";

export default function OpeningScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        className="w-full h-full"
        imageStyle={{
          marginTop: 50,
          width: "100%",
          height: "50%",
          objectFit: "contain",
          zIndex: 1,
        }}
        source={require("../assets/images/avatar.png")}
      >
        <View className="bg-[#EEEDF8] w-full h-[50%]"></View>
        <View className="bg-[#6C62FE] w-full justify-end h-[50%]">
          <View className="h-[80%] p-4 gap-y-10 bg-[#EEEDF8] w-full rounded-tl-3xl rounded-tr-3xl">
            <Text className="text-5xl font-bold">UdiBook</Text>
            <Text className="text-[#595959ff] text-xl font-light w-[60%]">
              Over 10,000 books in your fingertips!
            </Text>
            <View className="flex-row justify-center gap-x-4">
              <Pressable
                onPress={() => navigation.navigate("SignIn")}
                className=" border border-[#6C62FE] py-2 px-14 rounded-lg"
              >
                <Text className="text-lg text-[#6C62FE] font-semibold">
                  Sign In
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("SignUp")}
                className="bg-[#6C62FE] py-2 px-14 rounded-lg"
              >
                <Text className="text-lg text-white font-semibold">
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
