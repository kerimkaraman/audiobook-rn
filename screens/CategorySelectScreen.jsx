import { View, Text, SafeAreaView, Pressable, Alert } from "react-native";
import React from "react";
import CategorySelectItem from "../components/CategorySelectItem";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { AUTH, FIRESTORE } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function CategorySelectScreen({ navigation }) {
  const { categoryCount, categories } = useSelector((state) => state.category);
  const { id, username, email, password } = useSelector((state) => state.user);

  const handleContinue = async () => {
    if (categoryCount === 3) {
      const db = FIRESTORE;
      const auth = AUTH;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

      await setDoc(doc(db, "users", id), {
        id: id,
        username: username,
        email: email,
        password: password,
        categories: categories,
      });
      navigation.navigate("Homepage");
    } else if (categoryCount < 3) {
      Alert.alert("Warning", "You have to select at least 3 categories");
    }
  };

  return (
    <View
      style={{
        marginTop: Platform.OS == "android" ? "25" : "0",
      }}
      className="bg-[#EEECF9] flex-1"
    >
      <SafeAreaView>
        <View className="w-[80%] mx-auto mt-12 flex-col">
          <Pressable onPress={() => navigation.goBack()} className="mb-6">
            <Ionicons name="arrow-back-outline" size={36} color="black" />
          </Pressable>
          <View>
            <Text className="text-3xl font-semibold">
              Select your favourite book genres
            </Text>
          </View>
          <View style={{ gap: 5 }} className="mt-6 flex-row flex-wrap">
            <CategorySelectItem text="Crime" value="crime" />
            <CategorySelectItem text="Fiction" value="fiction" />
            <CategorySelectItem text="Sci-Fi" value="scifi" />
            <CategorySelectItem text="History" value="history" />
            <CategorySelectItem text="Science" value="science" />
            <CategorySelectItem text="Health" value="health" />
            <CategorySelectItem text="Horror" value="horrorf" />
            <CategorySelectItem text="Art" value="art" />
            <CategorySelectItem text="Sport" value="sport" />
            <CategorySelectItem text="Young Adult" value="youngadult" />
            <CategorySelectItem text="Family" value="family" />
            <CategorySelectItem text="Self Help" value="selfhelp" />
            <CategorySelectItem text="Education" value="education" />
            <CategorySelectItem text="Food" value="food" />
            <CategorySelectItem text="Poetry" value="poetry" />
            <CategorySelectItem text="Romance" value="romance" />
          </View>
          <View className="mt-36">
            <Text className="mb-4 text-center text-lg">
              {categoryCount}/3 is selected
            </Text>
            <Pressable
              onPress={handleContinue}
              className="bg-[#6C62FE] py-2 rounded-xl"
            >
              <Text className="text-center text-white text-xl font-semibold">
                Continue
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
