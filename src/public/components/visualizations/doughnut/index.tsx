import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { EuiText, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';

export const TagsDoughnutChart = ({ todos }) => {

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