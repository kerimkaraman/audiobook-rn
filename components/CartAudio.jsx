import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Rating } from "@kolking/react-native-rating";
import { useNavigation } from "@react-navigation/native";

export default function CartAudio({ id, image, title, author, rating }) {
  const nav = useNavigation();

  return (
    <Pressable
      onPress={() => nav.navigate("AudioBookDetailScreen", { id: id })}
      className="w-[90%] rounded-lg mx-auto bg-[#EFECF8] flex-row justify-between items-center p-4"
    >
      <View>
        <Image
          style={{ width: 50, height: 50, objectFit: "cover" }}
          source={{ uri: image }}
        />
      </View>
      <View className="gap-y-4">
        <Text>{title}</Text>
        <Text>{author}</Text>
      </View>
      <View>
        <Rating size={16} spacing={0} rating={rating} />
      </View>
    </Pressable>
  );
}
