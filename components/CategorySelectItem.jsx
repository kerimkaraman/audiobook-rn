import { Text, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCategoryCount,
  increaseCategoryCount,
  removeCategory,
  updateCategories,
} from "../store/categorySlice";

export default function CategorySelectItem({ text, value }) {
  const [isPressed, setIsPressed] = useState(false);
  const { categoryCount, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const handleCheck = () => {
    if (categoryCount == 3 && isPressed == false) {
      Alert.alert("Alert", "You have reached to the max category");
    } else if (categoryCount < 3 && isPressed == false) {
      setIsPressed(!isPressed);
      dispatch(updateCategories(value));
      dispatch(increaseCategoryCount());
    } else if (isPressed == true) {
      setIsPressed(false);
      dispatch(removeCategory(value));
      dispatch(decreaseCategoryCount());
    } else if (isPressed == true && categoryCount == 3) {
      setIsPressed(false);
      dispatch(removeCategory(value));
      dispatch(decreaseCategoryCount());
    }
    console.log(categories);
  };
  const handlePress = async () => {
    handleCheck();
  };

  return (
    <Pressable
      onPress={handlePress}
      className="block py-2 px-6 rounded-3xl"
      style={{
        borderWidth: 2,
        borderColor: isPressed ? "#EEECF9" : "#6C62FE",
        backgroundColor: isPressed ? "#6C62FE" : "#EEECF9",
      }}
    >
      <Text
        className="font-bold"
        style={{ color: isPressed ? "#EEECF9" : "#6C62FE" }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
