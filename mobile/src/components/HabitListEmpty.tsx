import { useNavigation } from "@react-navigation/native"
import { Text } from "react-native"

export function HabitListEmpty(){
  const { navigate } = useNavigation()
  return(
    <Text className="text-zinc-400 text-base">
      Não estás a monitorar hábito algum...{" "}
      <Text 
        className="text-violet-400 text-base underline active:text-violet-500"
        onPress={() => navigate("newHabit")}
      >
        comece criando um.
      </Text>
    </Text>
  )
}