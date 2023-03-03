import React, { useEffect, useState, useMemo, useContext } from 'react';
import { 
  EuiTabs,
  EuiTab,
} from '@elastic/eui';

// tabs components
import { TodoTabContent } from '../todoTabContent';
import { VisualizationTabContent } from '../visualizations';

// hooks
import { useHttpActions } from '../../hooks/useHttpActions';

//store
import useStore from '../../store';

//types
import { Todo, Tab } from '../../types';

export const AppConatiner: React.FC = () => {
  
  const todos: Todo[] = useStore(state => state.todos);

  const { init, getTodos } = useHttpActions();

  useEffect(() => {
    init()
  }, [])

  // Tabs
  const tabs: Tab[] = [
    {
      id: 'todos-tab--id',
      name: 'Tasks',
      content: (
        <TodoTabContent />
      ),
    },
    {
      id: 'visualization-tab--id',
      name: 'Visualizations',
      content: (
        <VisualizationTabContent />
      ),
    },
  ];

  // logic for tabs
  const [selectedTabId, setSelectedTabId] = useState<string>('todos-tab--id');
  const selectedTabContent = useMemo(() => {
    return tabs.find((obj) => obj.id === selectedTabId)?.content;
  }, [ selectedTabId, todos ]);

  const onSelectedTabChanged = (id: string) => {
    setSelectedTabId(id);
  };

  const renderTabs = (): JSX.Element[] => {
    return tabs.map((tab: Tab, index: number) => (
      <EuiTab
        key={index}
        onClick={() => onSelectedTabChanged(tab.id)}
        isSelected={tab.id === selectedTabId}
      >
        {tab.name}
      </EuiTab>
    ));
  };

  return (
    <>
      <EuiTabs>{renderTabs()}</EuiTabs>
      {selectedTabContent}
    </>
  );
};