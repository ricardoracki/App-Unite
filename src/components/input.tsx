import { TextInput, TextInputProps, View, ViewProps } from "react-native";

function Input({ ...props }: ViewProps) {
  return (
    <View
      className="w-full h-14 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg"
      {...props}
    />
  );
}

function Field({ ...props }: TextInputProps) {
  return (
    <TextInput
      className="flex-1 text-white text-base font-regular"
      placeholderClassName="text-gray-200"
      {...props}
    />
  );
}

Input.Field = Field;

export { Input };
