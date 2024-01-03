import { View, Text, ImageBackground, Dimensions } from "react-native";
import React from "react";

export default function AudioCard({ image, title }) {
  const width = Dimensions.get("screen").width;
  return (
    <View className="bg-[#EFECF8] rounded-xl" style={{ width: width / 2.1 }}>
      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        style={{ width: width / 2.1 }}
        className="w-[200px] h-[200px] items-center justify-center"
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
    </View>
  );
}
