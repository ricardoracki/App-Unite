import { Feather } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { QRCode } from "@/components/qrcode";
import { BadgeStore } from "@/store/badge-store";
import { MotiView } from "moti";

import { colors } from "@/styles/colors";

type Props = {
  data: BadgeStore;
  onChangeAvatar?: () => void;
  onExpandQrCode?: () => void;
};

export function Credential({ onChangeAvatar, data, onExpandQrCode }: Props) {
  const { height } = useWindowDimensions();

  return (
    <MotiView
      from={{
        translateY: -height,
        rotateZ: "50deg",
        rotateY: "30deg",
        rotateX: "30deg",
      }}
      animate={{
        translateY: 0,
        rotateZ: "0deg",
        rotateY: "0deg",
        rotateX: "0deg",
      }}
      transition={{
        type: "spring",
        damping: 20,
        rotateZ: {
          damping: 15,
          mass: 3,
        },
      }}
      className="w-full self-stretch items-center"
    >
      <Image
        source={require("@/assets/ticket/band.png")}
        className="w-24 h-52 z-10 "
      />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          source={require("@/assets/ticket/header.png")}
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">
              {data.eventTitle}
            </Text>
            <Text className="text-zinc-50 text-sm font-bold">#{data.id}</Text>
          </View>
          <View className="w-40 h-40 rounded-full bg-black" />
        </ImageBackground>

        <TouchableOpacity activeOpacity={0.9} onPress={onChangeAvatar}>
          {data.image ? (
            <Image
              source={{ uri: data.image }}
              className="h-36 w-36 rounded-full -mt-24"
            />
          ) : (
            <View className="h-36 w-36 rounded-full -mt-24 items-center justify-center bg-gray-400">
              <Feather name="camera" color={colors.green[400]} size={32} />
            </View>
          )}
        </TouchableOpacity>
        <Text className="text-zinc-50 text-2xl font-bold mt-4">
          {data.name}
        </Text>
        <Text className="text-zinc-300 text-base font-regular mb-4">
          {data.email}
        </Text>

        <QRCode value={data.checkInURL} size={120} />

        <Pressable className="mt-6" onPress={onExpandQrCode}>
          <Text className="font-body text-orange-500 text-sm">
            Ampliar QRCode
          </Text>
        </Pressable>
      </View>
    </MotiView>
  );
}
