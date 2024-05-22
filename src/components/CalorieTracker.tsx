import { useMemo } from "react"
import type { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type CalorieTrackerProps = {
  activities: Activity[]
}

function CalorieTracker({ activities }: CalorieTrackerProps) {

  const consumedCalories = useMemo(
    () => activities.reduce((accum, activity) => activity.category === 1 ? accum + activity.calories : accum, 0)
    , [activities]
  )

  const burnedCalories = useMemo(
    () => activities.reduce((accum, activity) => activity.category === 2 ? accum + activity.calories : accum, 0)
    , [activities])

  return (
    <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:justify-around">
      <CalorieDisplay
        calories={consumedCalories}
        description="Consumidas"
      />
      <CalorieDisplay
        calories={burnedCalories}
        description="Ejercicio"
      />
      <CalorieDisplay
        calories={consumedCalories - burnedCalories}
        description="Diferencia"
      />

    </div>
  )
}

export default CalorieTracker