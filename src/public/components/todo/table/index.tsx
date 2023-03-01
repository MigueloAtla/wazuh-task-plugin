import React, { useState } from 'react';
import {
  formatDate,
  Comparators,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableSortingType,
  Criteria,
  EuiHealth,
  EuiIcon,
  EuiLink,
  EuiToolTip,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
  EuiSpacer,
  EuiCode,
  EuiBadge,
  EuiButtonIcon,
  EuiFieldText,
  EuiText
} from '@elastic/eui';
import { EditModal } from '../editModal';
// import { formatDate } from '../../../utils/utils'

// type Todo = {
//   id: number;
//   firstName: string | null | undefined;
//   lastName: string;
//   github: string;
//   dateOfBirth: Date;
//   online: boolean;
//   location: {
//     city: string;
//     country: string;
//   };
// };

// const users: User[] = [];

// const todos = [];

// for (let i = 0; i < 20; i++) {
//   todos.push({
//     id: i + 1,
//     firstName: 'bleh',
//     lastName: 'ananas',
//     online: true
//   });
// }



export const Table = ({
  http,
  activeFilter,
  todos,
  showAllTodos,
  showActiveTodos,
  showCompletedTodos,
  handleSetComplete,
  handleDelete,
  handleClearComplete,
}) => {
  const [enableAll, setEnableAll] = useState(false);
  const [readonly, setReadonly] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const columns = [
    {
      field: 'completed',
      name: 'Completed',
      sortable: true,
      truncateText: true,
      width: '100px',
      render: (completed, todo) => (
        // <span>
        //   {todo.text}
        // </span>
        <CompleteCheckbox completed={completed} id={todo.id} handleSetComplete={handleSetComplete} />
      ),
    },
    {
      field: 'text',
      name: 'Text',
      sortable: true,
      truncateText: true,
      render: (text) => (
        // <span>
        //   {todo.text}
        // </span>
        <EditTitle text={text}/>
      ),
    },
    {
      field: 'tags',
      name: 'Tags',
      render: (tags) => {
        return tags && tags.map((tag) => {
          return <EuiFlexItem grow={false} key={tag}>
            <EuiBadge color={'primary'}>{tag}</EuiBadge>
          </EuiFlexItem>
        })
      },
    },
    {
      field: 'priority',
      name: 'Priority',
      width: '100px',
      sortable: true,
      render: (priority) => {
        let priority_text = ''
        let priority_int = parseInt(priority)
        if(priority_int === 0) priority_text = 'High'
        else if(priority_int === 1) priority_text = 'Medium'
        else if(priority_int === 2) priority_text = 'Low'
        return <EuiText>{priority_text}</EuiText>
      }
    },
    {
      field: 'finish_date',
      name: 'Finish Date',
      sortable: true,
      truncateText: true,
      render: (date) => <EuiText size='s'>{formatDate(date)}</EuiText>
    },
    {
      field: '',
      name: 'Edit',
      width: '80px',
      render: (todo) => (
          <EditModal todo={todo} http={http} />
        )
    },
    {
      field: '',
      name: 'Delete',
      width: '80px',
      render: (todo) => (
        <DeleteButton todo={todo} handleDelete={handleDelete} />
        )
    }
    
  ];
  

  const onTableChange = ({ page, sort }) => {
    if (page) {
      const { index: pageIndex, size: pageSize } = page;
      setPageIndex(pageIndex);
      setPageSize(pageSize);
    }
    if (sort) {
      const { field: sortField, direction: sortDirection } = sort;
      setSortField(sortField);
      setSortDirection(sortDirection);
    }
  };

  // Manually handle sorting and pagination of data
  const findTodos = (
    todos,
    pageIndex: number,
    pageSize: number,
    sortField,
    sortDirection: 'asc' | 'desc'
  ) => {
    let items;

    if (sortField) {
      items = todos
        .slice(0)
        .sort(
          Comparators.property(sortField, Comparators.default(sortDirection))
        );
    } else {
      items = todos;
    }

    let pageOfItems;

    if (!pageIndex && !pageSize) {
      pageOfItems = items;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = items.slice(
        startIndex,
        Math.min(startIndex + pageSize, todos.length)
      );
    }

    return {
      pageOfItems,
      totalItemCount: todos.length,
    };
  };

  const { pageOfItems, totalItemCount } = findTodos(
    todos,
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: [10, 15, 30],
  };

  const sorting = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
    enableAllColumns: enableAll,
    readOnly: readonly,
  };

  return (
    <>
      {/* <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label={<EuiCode>enableAllColumns</EuiCode>}
            checked={enableAll}
            onChange={() => setEnableAll((enabled) => !enabled)}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label={<EuiCode>readOnly</EuiCode>}
            checked={readonly}
            onChange={() => setReadonly((readonly) => !readonly)}
          />
        </EuiFlexItem>
      </EuiFlexGroup> */}
      <EuiSpacer />
      <EuiBasicTable
        tableCaption="Demo for EuiBasicTable with sorting"
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        onChange={onTableChange}
      />
    </>
  );
};

const EditTitle = ({ text }) => {
  const [ edit, setEdit ] = useState(false);

  return (
    <EuiFlexItem grow={false} style={{ flexDirection: 'row' }}>
      {
        !edit ? 
        <p onClick={() => {
          setEdit(true)
          }}>
            {text}
          </p>
        : 
          <>
            <EuiFieldText type="text" value={text} onChange={(e) => {
              console.log(e.target.value)
            }} />
            <span onClick={() => {setEdit(false)}}>x</span>
          </>
      }
    </EuiFlexItem>
  )
}

const CompleteCheckbox = ({ completed, id, handleSetComplete }) => {
  // console.log('completed', completed)
  // console.log('id', id)
  return (
    <EuiFlexItem grow={false}>
      {
        completed ? (
          <EuiButtonIcon 
            onClick={(e) => {
              e.stopPropagation()
              handleSetComplete(id)
              console.log('incomplete')
            }}
            iconType="cross"
            aria-label="Incomplete"
          />
        )
        : 
        (
          <EuiButtonIcon 
          onClick={(e) => {
            e.stopPropagation()
            handleSetComplete(id)
            console.log('complete')
          }}
            iconType="check"
            aria-label="Complete"
          />
        )
      }
    </EuiFlexItem>
  )
}

const DeleteButton = ({ todo, handleDelete }) => {
  return (
    <EuiButtonIcon 
    legend="Delete task"
    onClick={() => handleDelete(todo.id)}
    size="s"
    iconType="cross"
    aria-label="Delete task"
    />
  )
}

const EditButton = ({ todo, handleEdit }) => { 
  return (
    <EuiButtonIcon 
    legend="Edit task"
    onClick={() => handleEdit(todo)}
    size="s"
    iconType="pencil"
    aria-label="Edit task"
    />
  )
}