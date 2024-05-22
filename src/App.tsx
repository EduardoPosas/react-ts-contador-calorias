import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"

function App() {

  // Define a global state using useReducer
  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
      <header className="bg-lime-600">
        <div className="max-w-4xl mx-auto py-6 px-4 flex items-center justify-between">
          <h1 className="text-2xl text-white font-black uppercase">Contador de Calorias</h1>
          <button
            className="text-lg text-white uppercase p-2 rounded font-bold bg-gray-800 hover:bg-gray-900 transition-colors disabled:opacity-10"
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "restart-app" })}
          >Reiniciar App</button>
        </div>
      </header>

      <section className="bg-lime-500">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="bg-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl text-white text-center font-bold">Resumen de Calorias</h2>
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-12 px-4">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
