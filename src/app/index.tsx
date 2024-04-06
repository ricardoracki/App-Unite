import { useState } from "react";
import { Alert, Image, StatusBar, View } from "react-native";

import { Link, Redirect } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { colors } from "@/styles/colors";
import { api } from "@/service/api";
import { useBadgeStore } from "@/store/badge-store";

export default function Index() {
  const [code, setCode] = useState("");
  const { save, data } = useBadgeStore();
  const [isLoading, setIsLoading] = useState(false);

  async function handleAccessCredential() {
    try {
      if (!code.trim()) {
        return Alert.alert("Ingresso", "Informe o código do ingresso");
      }

      setIsLoading(true);

      const {
        data: { badge },
      } = await api.get(`/attendees/${code}/badge`);
      console.log();
      save(badge);
    } catch (e) {
      console.log(e);
      setIsLoading(false);

      Alert.alert("Ingresso", "Ingresso não encontrado");
    }
  }

  if (data?.checkInURL) return <Redirect href={"/ticket"} />;

  return (
    <View className="flex-1 items-center justify-center bg-green-500 p-8">
      <StatusBar barStyle="light-content" />

      <Image
        source={require("@/assets/logo.png")}
        className="h-16 "
        resizeMode="contain"
      />
      <View className="w-full mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="Código do ingresso"
            onChangeText={setCode}
            value={code}
          />
        </Input>
        <Button
          title="Acessar credencial"
          onPress={handleAccessCredential}
          isLoading={isLoading}
        />
        <Link
          href={"/register"}
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  );
}
