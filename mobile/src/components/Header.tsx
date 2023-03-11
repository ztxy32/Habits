import { TouchableOpacity, View, Text } from "react-native"
import LogoSvg from "../assets/logo.svg"
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"
import { useNavigation } from "@react-navigation/native"

export function Header(){
  const { navigate } = useNavigation()
  return(
    <View className="w-full flex-row items-center justify-between">
      <LogoSvg/>
      <TouchableOpacity 
        activeOpacity={.7}
        onPress={() => navigate("newHabit")}
        className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
      >
        <Feather
          name="plus"
          color={colors.violet[500]}
          size={20}
        />
        <Text className="text-white ml-3 font-semibold text-base">
          Novo hábito
        </Text>
      </TouchableOpacity>
    </View>
  )
}