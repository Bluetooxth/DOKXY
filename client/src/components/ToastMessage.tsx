import React from 'react'

interface ToastMessageProps {
    message: string;
    type: string;
    onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = (
    { message, type, onClose }
) => {
  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-xl font-medium text-white ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      }`}
    >
      <span>{message}</span>
      <button className="ml-4" onClick={onClose}>
        ✖
      </button>
    </div>
  )
}

export default ToastMessage