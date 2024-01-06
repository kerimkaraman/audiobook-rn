import {
  View,
  ImageBackground,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Pressable,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { setEmail, setId, setPassword, setUsername } from "../store/userSlice";
import { v4 as uuidv4 } from "uuid";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const id = uuidv4();

  useEffect(() => {
    dispatch(setId(id));
  }, []);

  const handleSignUp = async () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={200}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          className="w-full h-full"
          imageStyle={{
            objectFit: "contain",
            zIndex: 2,
            width: "100%",
            height: "50%",
            marginTop: 50,
          }}
          source={require("../assets/images/avatar.png")}
        >
          <View className="bg-[#6C62FE] h-[30%] w-full z-[1]"></View>
          <View className="bg-[#EEEDF8] h-[70%] z-[3] w-full p-4 pt-6 rounded-tl-2xl">
            <Text className="text-4xl font-bold">Sign up</Text>
            <View className="gap-y-6 mt-6">
              <View className="gap-y-2">
                <Text className="font-semibold">Username</Text>
                <TextInput
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    dispatch(setUsername(text));
                  }}
                  className="bg-[#CEC7F0] py-4 rounded-lg px-2"
                />
              </View>
              <View className="gap-y-2">
                <Text className="font-semibold">Email Adress</Text>
                <TextInput
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    dispatch(setEmail(text));
                  }}
                  className="bg-[#CEC7F0] py-4 rounded-lg px-2"
                />
              </View>
              <View className="gap-y-2">
                <Text className="font-semibold">Password</Text>
                <View className="bg-[#CEC7F0] rounded-lg flex-row justify-between items-center px-4">
                  <TextInput
                    secureTextEntry={showPassword ? false : true}
                    onChangeText={(text) => {
                      dispatch(setPassword(text));
                    }}
                    className="block py-4"
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Entypo
                      name={showPassword ? "eye-with-line" : "eye"}
                      size={24}
                      color="black"
                    />
                  </Pressable>
                </View>
              </View>
              <View>
                <Pressable
                  onPress={() => navigation.navigate("CategorySelect")}
                  className="bg-[#6C62FE] py-3 rounded-xl"
                >
                  <Text className="text-center font-bold text-white text-lg">
                    Sign Up
                  </Text>
                </Pressable>
                <View className="items-center flex-row justify-center gap-x-2 mt-4">
                  <Text className="font-medium">Already have an account ?</Text>
                  <Pressable onPress={handleSignUp}>
                    <Text className="text-[#6C62FE] font-bold">Sign In</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </View>
  );
}
