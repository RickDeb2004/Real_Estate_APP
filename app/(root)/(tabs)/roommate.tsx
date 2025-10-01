import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { router } from "expo-router";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";

const { width, height } = Dimensions.get("window");

const Roommate = () => {
  const [roommates, setRoommates] = useState([
    {
      id: "1",
      name: "Alex",
      age: 25,
      location: "Downtown",
      smoking: "No",
      pets: "No",
      image: require("../../../assets/images/alex.png"),
    },
    {
      id: "2",
      name: "Sam",
      age: 28,
      location: "Uptown",
      smoking: "Yes",
      pets: "Yes",
      image: require("../../../assets/images/alex.png"),
    },
    {
      id: "3",
      name: "Jordan",
      age: 23,
      location: "Midtown",
      smoking: "No",
      pets: "Yes",
      image: require("../../../assets/images/alex.png"),
    },
    {
      id: "4",
      name: "Taylor",
      age: 30,
      location: "Downtown",
      smoking: "No",
      pets: "No",
      image: require("../../../assets/images/alex.png"),
    },
    {
      id: "5",
      name: "Casey",
      age: 26,
      location: "Downtown",
      smoking: "Yes",
      pets: "No",
      image: require("../../../assets/images/alex.png"),
    },
    {
      id: "6",
      name: "Riley",
      age: 24,
      location: "Uptown",
      smoking: "No",
      pets: "Yes",
      image: require("../../../assets/images/alex.png"),
    },
    {
      id: "7",
      name: "Morgan",
      age: 27,
      location: "Midtown",
      smoking: "No",
      pets: "No",
      image: require("../../../assets/images/alex.png"),
    },
    {
      id: "8",
      name: "Jamie",
      age: 29,
      location: "Downtown",
      smoking: "Yes",
      pets: "Yes",
      image: require("../../../assets/images/alex.png"),
    },
    {
      id: "9",
      name: "Logan",
      age: 22,
      location: "Uptown",
      smoking: "No",
      pets: "No",
      image: require("../../../assets/images/alex.png"),
    },
    {
      id: "10",
      name: "Skyler",
      age: 31,
      location: "Midtown",
      smoking: "No",
      pets: "Yes",
      image: require("../../../assets/images/alex.png"),
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });
  const rotateAndTranslate = {
    transform: [{ rotate }, ...position.getTranslateTransform()],
  };

  // Dummy user preferences (replace with actual data from Profile later)
  const { userPreferences } = useGlobalContext();

  // Simple matching logic (dummy for now)
  const getMatchedRoommates = () => {
    return roommates.filter(
      (roommate) =>
        roommate.location === userPreferences.location &&
        roommate.smoking === userPreferences.smoking &&
        roommate.pets === userPreferences.pets
    );
  };

  const matchedRoommates = getMatchedRoommates();
  const [displayedRoommates, setDisplayedRoommates] =
    useState(matchedRoommates);

  useEffect(() => {
    const matches = getMatchedRoommates();

    if (matches.length > 0) {
      setDisplayedRoommates(matches);
      setCurrentIndex(0);
    } else {
      // fallback: show all roommates if no matches
      setDisplayedRoommates(roommates);
      setCurrentIndex(0);
    }
  }, [userPreferences]);
  // Dependency array with userPreferences

  const handleSwipe = (direction: "left" | "right") => {
    const newIndex = currentIndex + 1;
    if (newIndex < displayedRoommates.length) {
      Animated.spring(position, {
        toValue: { x: direction === "right" ? width : -width, y: 0 },
        useNativeDriver: true,
      }).start(() => {
        position.setValue({ x: 0, y: 0 }); // Reset position after animation
        setCurrentIndex(newIndex);
        if (direction === "right") {
          alert(`Matched with ${displayedRoommates[currentIndex].name}!`);
        }
      });
    } else {
      alert("No more matches!");
    }
  };

  const renderCard = () => {
    if (currentIndex >= displayedRoommates.length) return null;

    return (
      <Animated.View
        style={{
          ...rotateAndTranslate,
          position: "absolute",
          width: width * 0.8,
          height: height * 0.7,
          top: height * 0.1,
          borderRadius: 20,
          backgroundColor: "#F5F7FA",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Image
          source={displayedRoommates[currentIndex].image}
          className="w-full h-4/5 rounded-t-xl"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-black-300 text-xl font-rubik-bold">
            {displayedRoommates[currentIndex].name}
          </Text>
          <Text className="text-black-200 text-base">
            Age: {displayedRoommates[currentIndex].age} |{" "}
            {displayedRoommates[currentIndex].location}
          </Text>
          <Text className="text-black-200 text-base">
            Smoking: {displayedRoommates[currentIndex].smoking} | Pets:{" "}
            {displayedRoommates[currentIndex].pets}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-black-300 text-2xl font-rubik-bold mb-6">
        Roommate Finder
      </Text>
      {renderCard()}
      <View className="flex-row justify-between w-4/5 mt-6">
        <TouchableOpacity
          className="bg-red-500 p-3 rounded-full"
          onPress={() => handleSwipe("left")}
        >
          <Image source={icons.close} className="w-6 h-6" tintColor="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 p-3 rounded-full"
          onPress={() => handleSwipe("right")}
        >
          <Image source={icons.heart} className="w-6 h-6" tintColor="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Roommate;
