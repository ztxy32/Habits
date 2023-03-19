import { useNavigation, useFocusEffect } from "@react-navigation/native";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateRangeDatesFromYearStart} from "../utils/generate-range-between-dates"

const weekDays = ["D","S", "T", "Q", "Q", "S", "S"]
const datesFromYearStart = generateRangeDatesFromYearStart()
const minimumSummaryDateSizes = 18 * 5
const ammountOfDaysTofill = minimumSummaryDateSizes - datesFromYearStart.length

type SummaryProps = {
  id: string
  amount: number
  date: string
  completed: number
}[]


export function Home(){
  const { navigate } = useNavigation()
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<SummaryProps | null>(null)

  async function fetchData(){
    try{
      setLoading(true)
      const response = await api.get("/summary")
      setSummary(response.data)

    }catch(error){
      Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos")
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => { fetchData() },[]))

  if(loading){
    return <Loading/>
  }

  return(
    <View className="flex-1 bg-background px-8 pt-16">
      <Header/>
      <View className="flex-row mt-6 mb-2">
        {weekDays.map((item, i) => 
          <Text 
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{width: DAY_SIZE}}
            key={`${item}-${i}`}
          >
            {item}
          </Text>
          )
        }
      </View>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 60}}
      >
        {summary&&
          <View className="flex-row flex-wrap">
          {
            datesFromYearStart.map(date => {
              const daysWithHabits = summary.find(day => {
                return dayjs(date).isSame(day.date, "day")
              })
                return(
                  <HabitDay
                    onPress={() => navigate("habit", {date: date.toISOString()})}
                    date={date}
                    amountOfHabits={daysWithHabits?.amount}
                    amountCompleted={daysWithHabits?.completed}
                    key={date.toISOString()}
                  />)
            })
          }

          {
            ammountOfDaysTofill > 0 && Array
            .from({length: ammountOfDaysTofill})
            .map((_, index) => 
              <View 
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{width: DAY_SIZE, height: DAY_SIZE}}
                key={index}
              />
            )
          }
          </View>
        }
      </ScrollView>
    </View>
  )
}