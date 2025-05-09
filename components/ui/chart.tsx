"use client"

import React from "react"

import { Children, cloneElement } from "react"

interface ChartProps {
  children: React.ReactNode
}

export function Chart({ children }: ChartProps) {
  return <div className="w-full h-full">{children}</div>
}

interface ChartContainerProps {
  children: React.ReactNode
}

export function ChartContainer({ children }: ChartContainerProps) {
  const childrenArray = Children.toArray(children)
  const yAxis = childrenArray.find((child): child is React.ReactElement => {
    return React.isValidElement(child) && child.type === ChartYAxis
  })
  const xAxis = childrenArray.find((child): child is React.ReactElement => {
    return React.isValidElement(child) && child.type === ChartXAxis
  })
  const bars = childrenArray.find((child): child is React.ReactElement => {
    return React.isValidElement(child) && child.type === ChartBars
  })
  const tooltip = childrenArray.find((child): child is React.ReactElement => {
    return React.isValidElement(child) && child.type === ChartTooltip
  })

  return (
    <div className="flex h-full w-full">
      {yAxis && cloneElement(yAxis as React.ReactElement, {})}
      <div className="flex-1">
        <div className="h-[calc(100%-30px)] flex items-end">{bars && cloneElement(bars as React.ReactElement, {})}</div>
        {xAxis && cloneElement(xAxis as React.ReactElement, {})}
      </div>
      {tooltip && cloneElement(tooltip as React.ReactElement, {})}
    </div>
  )
}

export function ChartBars({ data, x, y }: { data: any[]; x: string; y: string }) {
  if (!Array.isArray(data)) {
    return null
  }

  const maxValue = Math.max(...data.map((item) => item[y]))
  const barWidth = 100 / data.length

  return (
    <div className="flex h-full w-full items-end">
      {data.map((item, index) => {
        const height = (item[y] / maxValue) * 100
        return (
          <div key={index} className="flex flex-col items-center justify-end" style={{ width: `${barWidth}%` }}>
            <div
              className="w-[80%] bg-primary rounded-t-sm transition-all hover:bg-primary/80"
              style={{ height: `${height}%` }}
              title={`${item[x]}: ${item[y]}`}
            />
          </div>
        )
      })}
    </div>
  )
}

export function ChartXAxis() {
  return <div className="h-8 mt-2">X Axis</div>
}

export function ChartYAxis() {
  return <div className="w-8 mr-2">Y Axis</div>
}

export function ChartTooltip() {
  return <div>Tooltip</div>
}
