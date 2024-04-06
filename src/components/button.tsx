import {
  Text,
  Pressable,
  PressableProps,
  ActivityIndicator,
} from "react-native";

type Props = PressableProps & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading, ...props }: Props) {
  return (
    <Pressable
      disabled={isLoading}
      className="w-full h-14 bg-orange-500 items-center justify-center rounded-lg"
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator className="text-green-500" />
      ) : (
        <Text className="text-green-500 text-base font-bold uppercase">
          {title}
        </Text>
      )}
    </Pressable>
  );
}
