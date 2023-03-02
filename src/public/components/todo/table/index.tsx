import React, { useState } from 'react';
import {
  formatDate,
  Comparators,
  EuiBasicTable,
  EuiHealth,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiBadge,
  EuiButtonIcon,
  EuiFieldText,
  EuiText,
  EuiCallOut,
  EuiSearchBar,
  EuiPopover,
  EuiButtonEmpty
} from '@elastic/eui';
import { EditModal } from '../editModal';
import { TAGS } from '../../../constants';

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

const loadTags = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        TAGS.map((tag) => ({
          value: tag.name,
          view: <EuiHealth color={tag.bgcolor}>{tag.name}</EuiHealth>
        }))
      );
    }, 0);
  });
};

const initialQuery = EuiSearchBar.Query.MATCH_ALL;



export const Table = ({
  http,
  todos,
  handleSetComplete,
  handleDelete,
  handleClearComplete,
}) => {
  const [enableAll, setEnableAll] = useState(false);
  const [readonly, setReadonly] = useState(false);

  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState(null);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const onChange = ({ query, error }) => {
    if (error) {
      setError(error);
    } else {
      setError(null);
      setQuery(query);
    }
  };

  const renderSearch = () => {
    const filters = [
      {
        type: "is",
        field: "completed",
        name: "Completed",
        negatedName: "Active"
      },
      {
        type: "field_value_selection",
        field: "tags",
        name: "Tags",
        multiSelect: "or",
        operator: "exact",
        cache: 10000,
        options: () => loadTags()
      }
    ];

    const schema = {
      strict: true,
      fields: {
        text: {
          type: "string"
        },
        completed: {
          type: "boolean"
        },
        priority: {
          type: "number"
        },
        tags: {
          type: "string",
          validate: (value) => {
            if (value !== "" && !TAGS.some((tag) => tag.name === value)) {
              throw new Error(
                `unknown tag (possible values: ${TAGS
                  .map((tag) => tag.name)
                  .join(",")})`
              );
            }
          }
        }
      }
    };

    return (
      <EuiSearchBar
        defaultQuery={initialQuery}
        box={{
          placeholder: "search",
          schema
        }}
        filters={filters}
        onChange={onChange}
      />
    );
  };

  const renderError = () => {
    if (!error) {
      return;
    }
    return (
      <>
        <EuiCallOut
          iconType="faceSad"
          color="danger"
          title={`Invalid search: ${error.message}`}
        />
        <EuiSpacer size="l" />
      </>
    );
  };

  const renderTable = () => {
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
          <EuiText>
            <p>
              {text}
            </p>
          </EuiText>
        ),
      },
      {
        field: 'tags',
        name: 'Tags',
        render: (tags) => <TagsWithPopover tags={tags} />,
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

    const queriedItems = EuiSearchBar.Query.execute(query, todos, {
      defaultFields: ["owner", "tag", "text"]
    });

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
        items = queriedItems
          .slice(0)
          .sort(
            Comparators.property(sortField, Comparators.default(sortDirection))
          );
      } else {
        items = queriedItems;
      }
  
      let pageOfItems;
  
      if (!pageIndex && !pageSize) {
        pageOfItems = items;
      } else {
        const startIndex = pageIndex * pageSize;
        pageOfItems = items.slice(
          startIndex,
          Math.min(startIndex + pageSize, queriedItems.length)
        );
      }
  
      return {
        pageOfItems,
        totalItemCount: queriedItems.length,
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
      pageSizeOptions: [2, 15, 30],
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
      <EuiBasicTable
        tableCaption="Demo for EuiBasicTable with sorting"
        // items={queriedItems}
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        sorting={sorting}
        onChange={onTableChange}
      />
    )
  }

  let esQueryDsl;
  let esQueryString;

  try {
    esQueryDsl = EuiSearchBar.Query.toESQuery(query);
  } catch (e) {
    esQueryDsl = e.toString();
  }
  try {
    esQueryString = EuiSearchBar.Query.toESQueryString(query);
  } catch (e) {
    esQueryString = e.toString();
  }

  const content = renderError() || (
    <EuiFlexGroup>

      <EuiFlexItem grow={6}>
        {renderTable()}
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  return (
    <>
      {renderSearch()}
      <EuiSpacer size="s" />
      <EuiSpacer size="l" />
      {content}
    </>
  );
};

const CompleteCheckbox = ({ completed, id, handleSetComplete }) => {
  return (
    <EuiFlexItem grow={false}>
      {
        completed ? (
          <EuiButtonIcon 
            onClick={(e) => {
              e.stopPropagation()
              handleSetComplete(id)
            }}
            iconType="stopFilled"
            aria-label="Incomplete"
          />
        )
        : 
        (
          <EuiButtonIcon 
            onClick={(e) => {
              e.stopPropagation()
              handleSetComplete(id)
            }}
            iconType="stop"
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

const TagsWithPopover = ({ tags }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onButtonClick = () =>
  setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);
  
  const getTagColor = (tag) => {
    let bgcolor = null
    TAGS.forEach((tag_obj) => {
      if(tag_obj.name === tag) bgcolor = tag_obj.bgcolor
    }) 
    return bgcolor
  }
  
  return (
    <EuiFlexItem grow={false}>
      <EuiPopover
        button={
          <EuiButtonEmpty
            iconType="questionInCircle"
            iconSide="right"
            onClick={onButtonClick}
          >
            <div>
          {
            tags && tags.map((tag) => <EuiHealth key={tag} color={getTagColor(tag)} />)
          }
        </div>
          </EuiButtonEmpty>
        }
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        anchorPosition="downCenter"
      >
        {
          tags && tags.map((tag) => {
            return <div>
              <EuiHealth color={getTagColor(tag)}>{tag}</EuiHealth>
            </div>
          })
        }
      </EuiPopover>
    </EuiFlexItem>
  )
}