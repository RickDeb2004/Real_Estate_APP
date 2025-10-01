import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

const Bidding = () => {
  const [bidAmount, setBidAmount] = useState('');
  const [currentBid, setCurrentBid] = useState(1000); // Starting bid
  const [bidHistory, setBidHistory] = useState<number[]>([1000]); // Track bid history
  const [timer, setTimer] = useState(30); // Auction timer in seconds
  const [isBiddingActive, setIsBiddingActive] = useState(true);

  // Simulate automated bidding (e.g., opponent bids)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBiddingActive && timer > 0) {
      interval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance opponent bids
          const autoBid = currentBid + Math.floor(Math.random() * 500) + 100;
          setCurrentBid(autoBid);
          setBidHistory((prev) => [...prev, autoBid]);
        }
        setTimer((prev) => prev - 1);
      }, 2000); // Update every 2 seconds
    } else if (timer === 0) {
      setIsBiddingActive(false);
      alert('Auction ended! Highest bid: $' + currentBid);
    }
    return () => clearInterval(interval);
  }, [isBiddingActive, timer, currentBid]);

  const handleSubmitBid = () => {
    const newBid = parseInt(bidAmount) || 0;
    if (newBid > currentBid) {
      setCurrentBid(newBid);
      setBidHistory((prev) => [...prev, newBid]);
      setBidAmount(''); // Clear input
      alert('Bid placed successfully! Current bid: $' + newBid);
    } else {
      alert('Bid must be higher than the current bid of $' + currentBid);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-black-300 text-2xl font-rubik-bold mb-4">Live Auction</Text>
      
      {/* Current Bid Display */}
      <View className="bg-primary-100 p-4 rounded-lg mb-4 w-3/4">
        <Text className="text-black-300 text-lg font-rubik-bold">
          Current Highest Bid: ${currentBid}
        </Text>
      </View>

      {/* Timer */}
      <Text className="text-black-200 text-base mb-6">
        Time Left: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}
      </Text>

      {/* Bid Input */}
      <TextInput
        className="border border-primary-200 p-3 mt-2 rounded-lg w-3/4 text-center"
        placeholder="Enter your bid amount"
        keyboardType="numeric"
        value={bidAmount}
        onChangeText={setBidAmount}
      />

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-primary-300 py-3 px-6 mt-6 rounded-full shadow-md shadow-zinc-400"
        onPress={handleSubmitBid}
        disabled={!isBiddingActive}
      >
        <Text className="text-white text-lg font-rubik-bold">Place Bid</Text>
      </TouchableOpacity>

      {/* Bid History */}
      <View className="mt-6 w-3/4">
        <Text className="text-black-300 text-base font-rubik-bold mb-2">Bid History</Text>
        {bidHistory.map((bid, index) => (
          <Text key={index} className="text-black-200 text-sm">
            Bid #{index + 1}: ${bid}
          </Text>
        ))}
      </View>

      {!isBiddingActive && (
        <Text className="text-black-300 text-base mt-4 font-rubik-bold">
          Auction has ended. Winner: ${currentBid}
        </Text>
      )}
    </View>
  );
};

export default Bidding;