import Lottie from 'lottie-react'
import React from 'react'
import noData from "../assets/Loader1.json";

export default function Loading1() {
  return (
    <div className="min-h-screen flex  justify-center items-center">
      <Lottie animationData={noData} loop={true} />
    </div>
  )
}
