
interface CalorieDisplayProps {
  calories: number
  description: string
}

function CalorieDisplay({ calories, description }: CalorieDisplayProps) {
  return (
    <p className="text-white text-lg text-center grid grid-cols-1 items-center gap-4">
      <span className="text-6xl text-green-500 font-black">{calories}</span>
      {description}
    </p>
  )
}

export default CalorieDisplay