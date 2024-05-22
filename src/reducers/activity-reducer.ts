import { Activity } from "../types"

export type ActivityActions =
  { type: "save-activity", payload: { newActivity: Activity } } |
  { type: "set-activeId", payload: { id: Activity["id"] } } |
  { type: "delete-activity", payload: { id: Activity["id"] } } |
  { type: "restart-app" }

export type ActivityState = {
  activities: Activity[],
  activeId: Activity["id"]
}

const getInitialStateFromStorage = (): Activity[] => {
  const activities = localStorage.getItem("activities")
  return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
  activities: getInitialStateFromStorage(),
  activeId: ""
}

export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    // logic to update the state

    let updatedActivities = []

    if (state.activeId) {
      updatedActivities = state.activities.map(activity => (activity.id === state.activeId ? action.payload.newActivity : activity))

    } else {
      updatedActivities = [...state.activities, action.payload.newActivity]
    }

    return {
      ...state,
      activities: updatedActivities,
      activeId: ""
    }

  }

  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id
    }
  }

  if (action.type === "delete-activity") {
    const filteredActivities = state.activities.filter(activity => activity.id !== action.payload.id)

    return {
      ...state,
      activities: filteredActivities
    }
  }

  if (action.type === "restart-app") {
    return {
      activities: [],
      activeId: ""
    }
  }

  return state
}