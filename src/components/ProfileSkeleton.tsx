import React from 'react'
import { CardContent, CardFooter, CardHeader } from './ui/card'

export const ProfileSkeleton = () => (
  <div className="animate-pulse w-full">
    <CardHeader>
      <div className="h-6 bg-gray-200 rounded w-40"></div>
      <div className="h-4 bg-gray-200 rounded w-64"></div>
    </CardHeader>
    <CardContent>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1">
          <div className="h-4 bg-gray-200 rounded w-40"></div>
          <div className="h-6 bg-gray-200 rounded w-64"></div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="h-4 bg-gray-200 rounded w-40"></div>
          <div className="h-6 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex justify-end">
      <div className="h-10 bg-gray-200 rounded w-32"></div>
    </CardFooter>
  </div>
)
