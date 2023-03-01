import React, { useEffect, useState } from "react"
import { EuiText, EuiSpacer, EuiFlexItem, EuiFlexGroup } from "@elastic/eui"
import { Chart, Line, Bar, Doughnut } from "react-chartjs-2"

export const VisualizationTabContent = ({ todos }) => {

  const [update, setUpdate] = useState(false)

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

const PriorityChart = ({ todos }) => {

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

const CompletedOverTime = ({ todos }) => {

  const getDataset = (todos) => {
    console.log(todos)
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

const TagsDoughnutChart = ({ todos }) => {

  const getDataset = (todos) => {
    const tags = todos.reduce((acc, todo) => {
      todo.tags && todo.tags.forEach(tag => {
        if(acc[tag]) {
          acc[tag] += 1
        } else {
          acc[tag] = 1
        }
      })
      return acc
    }, {})

    return Object.values(tags)
  }

  const data = {
    labels: ['bugfix', 'enhancement', 'refactoring', 'breaking', 'logging'],
    datasets: [
      {
        label: '# of Votes',
        data: getDataset(todos),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <>
      <EuiText>
        <p>
          Shows tags distribution.
        </p>
       <EuiFlexGroup justifyContent='center'>
         <EuiFlexItem style={{
           maxWidth: 600,
         }}>
           <Doughnut data={data} />
         </EuiFlexItem>
       </EuiFlexGroup>
      </EuiText>
    </>
  )
}