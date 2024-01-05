import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function AudioBookDetailItem({ title, text }) {
  return (
    <View className="items-center">
      <Text className="text-lg">{title}</Text>
      <Text className="text-2xl font-semibold">{text}</Text>
    </View>
  );
}
