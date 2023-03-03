import React from 'react';
import { EuiText, EuiSpacer } from '@elastic/eui';
import { Line } from 'react-chartjs-2';

export const CompletedOverTime = ({ todos }) => {

  const getDataset = (todos) => {
    const completedTodos = todos.filter(todo => todo.completed);

    // adds completed todos cuantity of each month
    const completedTodosByMonth = completedTodos.reduce((acc, todo) => {
      const date = new Date(todo.completed_at);
      const month = date.toLocaleString('en-GB', { month: 'short' });
      if(acc[month]) {
        acc[month] += 1
      } else {
        acc[month] = 1
      }
      return acc
    }, {})

    // complete with 0 the months without completed todos uppercase
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach(month => {
      if(!completedTodosByMonth[month]) {
        completedTodosByMonth[month] = 0
      }
    })

    // month values on array in order
    const completedTodosByMonthArray = []
    months.forEach(month => {
      completedTodosByMonthArray.push(completedTodosByMonth[month])
    })
    return completedTodosByMonthArray
    
  }

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: "Completed tasks",
        data: getDataset(todos),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        rough: {
          roughness: 2,
          bowing: 2
        }
      },
    ]
  };
  
  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14
    }
  };
  
  const options = {
    title: {
      display: true,
      text: "Chart Title"
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      ]
    }
  };
  
  return (
    <>
      <EuiSpacer />
      <EuiText>
        <p>
          Shows Completed tasks over time.
        </p>
          <Line data={data} legend={legend} options={options} />
      </EuiText>
    </>  
  )
}