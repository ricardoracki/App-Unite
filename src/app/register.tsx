import { useState } from "react";
import { Alert, Image, StatusBar, View } from "react-native";

import { Link, router } from "expo-router";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { colors } from "@/styles/colors";
import { api } from "@/service/api";
import axios from "axios";
import { useBadgeStore } from "@/store/badge-store";

const EVENT_ID = "297245f0-c780-48f8-ac2b-dc80120dbe36";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { save } = useBadgeStore();

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim())
        return Alert.alert("Inscrição", "Preencha todos os campos");

      setIsLoading(true);
      const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email,
      });

      if (registerResponse.data.attendeeId) {
        const badgeresponse = await api.get(
          `/attendees/${registerResponse.data.attendeeId}/badge`
        );
        save(badgeresponse.data.badge);

        Alert.alert("Inscrição", "Você se inscreveu para esse evento", [
          { text: "Ok", onPress: () => router.push("/ticket") },
        ]);
      }
    } catch (e) {
      console.log(e);

      if (axios.isAxiosError(e)) {
        if (String(e.response?.data.message).includes("already registered")) {
          return Alert.alert("Inscrição", "E-mail já cadastrado");
        }
      }

      Alert.alert("Inscrição", "Não foi possível fazer a inscrição");
    } finally {
      setIsLoading(false);
    }
  }

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
          <FontAwesome6
            name="user-circle"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="Nome completo"
            onChangeText={setName}
            value={name}
          />
        </Input>
        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
        </Input>
        <Button
          title="Realizar inscrição"
          onPress={handleRegister}
          isLoading={isLoading}
        />
        <Link
          href={"/"}
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  );
}
