import React from 'react'
import { EuiText, EuiSpacer } from '@elastic/eui'
import { Bar } from 'react-chartjs-2'

export const PriorityChart = ({ todos }) => {

  const getData = (todos, status) => {
    const completedTodos = status === 'completed' ? todos.filter(todo => todo.completed) : todos.filter(todo => !todo.completed);
    const priorityNumbers = completedTodos.map(todo => todo.priority);

    function priorityOcurrencesInArray (array) {
      const count0 = array.reduce((acc, val) => {
        if(val === '0') acc++;
        return acc;
      }, 0);
      const count1 = array.reduce((acc, val) => {
        if(val === '1') acc++;
        return acc;
      }
      , 0);
      const count2 = array.reduce((acc, val) => {
        if(val === '2') acc++;
        return acc;
      }
      , 0);
      return [count0, count1, count2]
    }

    const result = priorityOcurrencesInArray(priorityNumbers);

    return result
  }

  const data = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        label: "Completed",
        data: getData(todos, 'completed'),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        rough: {
          roughness: 2,
          bowing: 2,
        },
      },
      {
        label: "Active",
        data: getData(todos, 'active'),
        fill: true,
        backgroundColor: "rgba(102, 81, 194, 0.219)",
        borderColor: "rgba(102, 81, 194, 1)",
      },
    ],
  }

  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14,
    },
  }

  const options = {
    title: {
      display: true,
      text: "Priority",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100,
            stepSize: 1,
            precision: 0
          },
        },
      ],
    },
  }
  
  return (
    <>
      <EuiSpacer />
      <EuiText>
        <p>
          Shows Completed and Active tasks by priority.
        </p>
        {/* <Line data={data} legend={legend} options={options} /> */}
        <Bar data={data} legend={legend} options={options} />
      </EuiText>
    </>
  )
}