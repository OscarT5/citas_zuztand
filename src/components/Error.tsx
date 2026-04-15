import React from "react"

const Error = ({children}: {children: React.ReactNode}) => {
  return (
        <p className="text-red-500 text-sm mt-1">{children}</p>
    )
}

export default Error