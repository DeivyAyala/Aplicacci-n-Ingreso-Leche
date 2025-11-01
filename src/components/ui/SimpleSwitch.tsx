import React from "react"

interface SimpleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export const SimpleSwitch: React.FC<SimpleSwitchProps> = ({ checked, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <div className="relative">
        {/* Checkbox oculto */}
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        {/* Fondo del switch */}
        <div
          className={`block w-10 h-5 rounded-full transition-colors duration-300 ${
            checked ? "bg-amber-500" : "bg-gray-300"
          }`}
        ></div>
        {/* Círculo interior */}
        <div
          className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 ${
            checked ? "translate-x-5" : ""
          }`}
        ></div>
      </div>
    </label>
  )
}
