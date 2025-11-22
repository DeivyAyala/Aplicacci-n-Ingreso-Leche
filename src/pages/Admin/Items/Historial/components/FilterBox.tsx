import type React from "react"

interface props {
    title: string,
    children:React.ReactNode
}

export const FilterBox = ({title, children}:props) => {
  return (
     <div>
        <label className="text-sm font-medium text-amber-800 mb-1 block">{title}</label>
        {children}
    </div>
  )
}
