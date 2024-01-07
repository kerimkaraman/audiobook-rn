import {
  View,
  Text,
  Pressable,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setEmail,
  setPassword,
  setUsername,
} from "../store/userSlice";
import { Entypo } from "@expo/vector-icons";
import { AUTH, FIRESTORE } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.user);

  const handleContinue = async () => {
    const auth = AUTH;
    const db = FIRESTORE;
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      dispatch(setUsername(doc.data().username));
      dispatch(setEmail(doc.data().email));
      dispatch(setCategories(doc.data().categories));
    });

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate("Homepage");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={200}
        className="flex-1"
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
          <View className="bg-[#6C62FE] h-[40%] w-full z-[1]"></View>
          <View className="bg-[#EEEDF8] h-[60%] z-[3] w-full p-4 pt-6 rounded-tl-2xl">
            <Text className="text-4xl font-bold">Sign In</Text>
            <View className="mt-6">
              <View className="gap-y-4">
                <View className="gap-y-2">
                  <Text className="font-semibold">Email Adress</Text>
                  <TextInput
                    autoCapitalize="none"
                    onChangeText={(text) => dispatch(setEmail(text))}
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
                      className="block py-4 w-[90%]"
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
              </View>
              <View className="mt-16">
                <Pressable
                  onPress={handleContinue}
                  className="bg-[#6C62FE] py-3 rounded-xl"
                >
                  <Text className="text-center font-bold text-white text-lg">
                    Sign In
                  </Text>
                </Pressable>
                <View className="items-center flex-row justify-center gap-x-2 mt-4">
                  <Text className="font-medium">Don't have an account ?</Text>
                  <Pressable onPress={() => navigation.navigate("SignUp")}>
                    <Text className="text-[#6C62FE] font-bold">Sign Up</Text>
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
