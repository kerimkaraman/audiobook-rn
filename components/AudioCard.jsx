import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function AudioCard({ image, title, id }) {
  const width = Dimensions.get("screen").width;
  const nav = useNavigation();

  return (
    <Pressable
      onPress={() => nav.navigate("AudioBookDetailScreen", { id: id })}
      className="bg-[#EFECF8] rounded-xl w-[45%] mx-auto"
    >
      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        className="w-[100%] h-[200px] items-center justify-center"
        source={{ uri: image }}
      >
        <Text
          style={{
            textShadowColor: "black",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 5,
          }}
          className="text-white text-3xl font-bold text-center"
        >
          {title}
        </Text>
      </ImageBackground>
      <Text className="my-3 text-center text-lg font-bold">{title}</Text>
    </Pressable>
  );
}
