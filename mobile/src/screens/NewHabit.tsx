import { useState } from "react"
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import { BackButton } from "../components/BackButton"
import { CheckBox } from "../components/CheckBox"
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"
import { api } from "../lib/axios"

const availableWeekDays = ["Domingo","Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

export function NewHabit(){
  const [title, setTitle] = useState("")
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(weekDayIndex: number){
    if(weekDays.includes(weekDayIndex)){
      setWeekDays(prevState => prevState.filter(item => item !== weekDayIndex))
    }else{
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }
  async function handleCreateNewHabit(){
    try{
      if(!title.trim() || weekDays.length === 0){
        return Alert.alert("Novo hábito", "Informe o nome do hábito e escolha a periodicidade")
      }

      await api.post("/habits", {
        title, weekDays
      })

      setTitle("")
      setWeekDays([])

      Alert.alert("Novo hábito", "Novo hábito criado com sucesso!")

    }catch(error){
      console.log(error)
      Alert.alert("Ops ", "Não foi possível criar o novo hábito")
    }
  }

  return(
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView 
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
      >
        <BackButton/>

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual é o teu comprometimento?
        </Text>

        <TextInput
          placeholder="ex.: Exercicios, dormir bem, et cetera..."
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
        />
        <Text className="text-white text-base font-semibold mt-4 mb-3 ">
          Com qual é a recorrência?
        </Text>
        {
          availableWeekDays.map((item, index) => 
            <CheckBox 
              title={item} 
               checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
              key={item}
            />
          )
        }
        <TouchableOpacity 
          activeOpacity={.7}
          onPress={handleCreateNewHabit}
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
        >
          <Feather 
            name="check"
            size={20}
            color={colors.white}
          />
          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}