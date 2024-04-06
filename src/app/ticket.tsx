import { useState } from "react";
import {
  Text,
  View,
  Modal,
  Alert,
  Pressable,
  StatusBar,
  ScrollView,
  Share,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { colors } from "@/styles/colors";
import { Header } from "@/components/header";
import { Button } from "@/components/button";
import { QRCode } from "@/components/qrcode";
import { Credential } from "@/components/credential";
import { useBadgeStore } from "@/store/badge-store";
import { Redirect } from "expo-router";
import { MotiView } from "moti";

export default function Ticket() {
  const [expandQRCode, setExpandQRCode] = useState(false);

  const { data, save, remove, setAvatar } = useBadgeStore();

  async function handleShare() {
    try {
      if (data?.checkInURL) {
        await Share.share({
          message: data.checkInURL,
        });
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Compartilhar", "Não foi possível compartilhar");
    }
  }

  async function handleChangeAvatar() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });
      if (result.assets) {
        setAvatar(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert("Foto", "Não foi possível selecionar a imagem");
    }
  }

  if (!data?.checkInURL) return <Redirect href="/" />;

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title="Minha Credencial" />
      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential
          data={data}
          onChangeAvatar={handleChangeAvatar}
          onExpandQrCode={() => {
            setExpandQRCode(true);
          }}
        />
        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 10,
          }}
          transition={{
            loop: true,
            type: "timing",
            duration: 700,
          }}
        >
          <FontAwesome
            name="angle-double-down"
            size={24}
            color={colors.gray[300]}
            className="self-center my-6"
          />
        </MotiView>
        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>
        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai particiapr do {data.eventTitle}
        </Text>

        <Button title="Compratilhar" onPress={handleShare} />

        <Pressable className="mt-10" onPress={remove}>
          <Text className="text-base text-white font-bold text-center">
            Remover Ingresso
          </Text>
        </Pressable>
      </ScrollView>

      <Modal visible={expandQRCode} statusBarTranslucent>
        <View className="flex-1 items-center justify-center bg-green-500">
          <Pressable onPress={() => setExpandQRCode(false)}>
            <QRCode size={300} value="Teste" />
            <Text className="text-sm text-orange-500 text-center mt-10">
              Fechar
            </Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
