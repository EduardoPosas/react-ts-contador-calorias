import { ChangeEvent, Dispatch, FormEvent, useState, useEffect } from "react"
import { categories } from "../data/categories"
import type { Activity } from "../types"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"

type FormProps = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const INITIAL_ACTIVITY: Activity = {
  id: "",
  category: 1,
  name: "",
  calories: 0
}


function Form({ dispatch, state }: FormProps) {

  const [activity, setActivity] = useState<Activity>(INITIAL_ACTIVITY)

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
      setActivity(selectedActivity)
    }
  }, [state])


  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target
    const isNumberField = ["category", "calories"].includes(id)

    setActivity({ ...activity, [id]: isNumberField ? +value : value, id: crypto.randomUUID() })
  }

  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== "" && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: "save-activity", payload: { newActivity: activity } })
    setActivity(INITIAL_ACTIVITY)
  }


  return (
    <form
      className="bg-white rounded p-4 space-y-4"
      onSubmit={handleSubmit}
    >

      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="category"
          className="font-bold"
        >Categoría:</label>
        <select
          id="category"
          className="p-2 border border-gray-300 rounded"
          value={activity.category}
          onChange={handleChange}
        >
          {
            categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
          }
        </select>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="name"
          className="font-bold"
        >Actividad:</label>
        <input
          type="text"
          id="name"
          className="p-2 border border-gray-300 rounded"
          placeholder="Ej. Comida, Jugo Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="calories"
          className="font-bold"
        >Calorias:</label>
        <input
          type="number"
          id="calories"
          className="p-2 border border-gray-300 rounded"
          placeholder="Calorias. Ej. 200 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <div className="md:flex md:justify-end">
        <input
          type="submit"
          value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
          className="w-full md:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-950 text-white font-bold cursor-pointer rounded uppercase transition-colors disabled:opacity-10"
          disabled={!isValidActivity()}
        />
      </div>

    </form>
  )
}

export default Form