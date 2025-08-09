import Lottie from 'lottie-react'
import React from 'react'
import noData from "../assets/Loader2.json";

export default function Loading2() {
  return (
    <div className="min-h-screen flex  justify-center items-center">
      <Lottie animationData={noData} loop={true} />
    </div>
  )
}
