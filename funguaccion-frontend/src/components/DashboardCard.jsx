"use client"

export default function DashboardCard({ title, description, color, actions }) {
  const colors = {
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      subtext: "text-red-700",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      subtext: "text-blue-700",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      subtext: "text-green-700",
    },
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-800",
      subtext: "text-emerald-700",
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      subtext: "text-yellow-700",
    },
  }

  const palette = colors[color] || colors.green

  return (
    <div className={`${palette.bg} ${palette.border} border p-4 rounded-lg`}>
      <h3 className={`${palette.text} font-bold mb-1`}>{title}</h3>
      <p className={`${palette.subtext} text-sm mb-3`}>{description}</p>
      <div className="flex gap-2 flex-wrap">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={action.onClick}
            className={`${action.primary ? "btn-primary" : "bg-white border px-4 py-2 rounded-lg"}`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}
