import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { GenerateRangeBetweenDates } from "../utils/generate-range-between-dates"
import { HabitDay } from "./HabitDay"

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]
const summaryDates = GenerateRangeBetweenDates()
const minimumSummaryDatesSize = 20 * 7 // 20 semanas
const ammountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type Summary = {
  id: string
  date: string
  amount: number
  completed: number
}[]

export function SummaryTable(){
  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    api.get("/summary").then(response => {
      setSummary(response.data)
    })
  }, [])
  return(
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {weekDays.map((item, i) => {
          return(
            <div className="text-zinc-400 text-xl font-bold h-10 w-10 flex-items-center justify-center" key={`${item}-${i}`}>
              {item}
            </div>
          )
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        { summary.length > 0 && summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, "day")
          })

          return(
            <HabitDay
              date={date}
              amount={dayInSummary?.amount} 
              defaultCompleted={dayInSummary?.completed} 
              key={date.toString()}
            />
          )
        })}

        {ammountOfDaysToFill > 0 && Array.from({
          length: ammountOfDaysToFill
        }).map((_, i) => 
          <div 
            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            key={i}
          />
        )}
      </div>
    </div>
  )
}