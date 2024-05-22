import { Dispatch, useMemo } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
  activities: Activity[],
  dispatch: Dispatch<ActivityActions>
}

function ActivityList({ activities, dispatch }: ActivityListProps) {

  console.log(activities)
  const categoryName = useMemo(() => (category: Activity["category"]) => categories.map(cat => cat.id === category ? cat.name : ""), [])

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

  const handleSetActiveId = (id: Activity["id"]) => {
    dispatch({ type: "set-activeId", payload: { id } })
  }

  const handleDeleteActivity = (id: Activity["id"]) => {
    const deleteConfirmation = confirm("¿Desseas eliminar la actividad?")
    if (deleteConfirmation) {
      dispatch({ type: "delete-activity", payload: { id } })
    }
  }

  return (
    <>
      <h2 className="text-4xl text-center font-bold text-slate-600">Registro Actividades</h2>
      {
        isEmptyActivities && <p className="mt-6 text-2xl  text-center">Aún no hay actividades registradas</p>
      }

      <ul className="my-6 space-y-6">
        {
          activities.map(activity => (
            <li key={activity.id} className="shadow p-8 flex flex-col gap-4  sm:flex-row sm:justify-between ">
              <div className="relative">
                <p
                  className={`absolute -top-6 -left-12 px-10 py-2 uppercase font-bold ${activity.category === 1 ? "bg-lime-500" : "bg-orange-500"}`}
                >
                  {categoryName(+activity.category)}
                </p>
                <p className="text-2xl font-bold pt-8">{activity.name}</p>
                <p className="text-4xl text-lime-500 font-black pt-2">
                  {activity.calories} {""}
                  <span>Calorias</span>
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleSetActiveId(activity.id)}
                >
                  <PencilSquareIcon
                    className="w-8 h-8 text-gray-800"
                  />
                </button>
                <button
                  onClick={() => handleDeleteActivity(activity.id)}
                >
                  <TrashIcon
                    className="w-8 h-8 text-red-500"
                  />
                </button>
              </div>
            </li>
          ))
        }
      </ul>

    </>
  )
}

export default ActivityList