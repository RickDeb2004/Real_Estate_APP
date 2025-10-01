import { View, Text, Modal, TouchableOpacity } from "react-native";

const BidModal = ({ visible, onClose, onNegotiate }: any) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-2xl w-11/12">
          <Text className="text-lg font-rubik-bold mb-4">
            Do you want to negotiate?
          </Text>
          <View className="flex flex-row justify-end gap-4">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-red-500 font-rubik-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onNegotiate}>
              <Text className="text-primary-300 font-rubik-bold">Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BidModal;
