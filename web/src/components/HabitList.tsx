import * as CheckBox from "@radix-ui/react-checkbox"
import dayjs from "dayjs"
import { Check } from "phosphor-react"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"

interface HabitListProps{
  date: Date
  onCompletedChange: (completed: number) => void
}
interface HabitsInfo{
  possibleHabits: {
    id: string
    title: string
    createdAt: string
  }[]
  completedHabits: string[]
}

export function HabitList({ date, onCompletedChange }: HabitListProps){
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()
  useEffect(() => {
    api.get("day", {
      params: {
        date: date.toISOString()
      }
    }).then(response => {
      setHabitsInfo(response.data)
    })
  }, [])

  const isDayInPast = dayjs(date).endOf("day").isBefore(new Date())

  async function handleToggleHabit(habitId: string){
    const isHabitCompleted = habitsInfo!.completedHabits.includes(habitId)
    let completedHabits: string[] = []

    await api.patch(`/habits/${habitId}/toggle`)

    if(isHabitCompleted){
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    }else{
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    })

    onCompletedChange(completedHabits.length)
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map(item =>
        <CheckBox.Root 
          className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          disabled={isDayInPast}
          onCheckedChange={() => handleToggleHabit(item.id)}
          checked={habitsInfo.completedHabits.includes(item.id)}
          key={item.id}
        >
          <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
            <CheckBox.Indicator>
              <Check size={20} className="text-white"/>
            </CheckBox.Indicator>
          </div>
          
          <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
            {item.title}
          </span>
        </CheckBox.Root>
        
      )}
    </div>
  )
}