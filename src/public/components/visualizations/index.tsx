import React, { useEffect, useState } from "react"
import { EuiText, EuiSpacer, EuiFlexItem, EuiFlexGroup } from "@elastic/eui"
import { Chart, Bar } from "react-chartjs-2"
import { TagsDoughnutChart } from "./doughnut"
import { CompletedOverTime } from "./completedOverTime"
import { PriorityChart } from "./priorityChart"
import useStore from "../../store"

export const VisualizationTabContent = () => {
  const todos = useStore(state => state.todos)

  const [_, setUpdate] = useState(false)

  useEffect(() => {
    todos.length > 0 && setUpdate(s => !s)
  }, [todos])

  return (
    <>
      <EuiSpacer />
      <PriorityChart todos={todos} />
      <EuiSpacer size='xxl' />
      <CompletedOverTime todos={todos} />
      <EuiSpacer size='xxl' />
      <TagsDoughnutChart todos={todos} />
    </>
  )
}



