import React, { useState,useEffect } from 'react';
import { i18n } from '@osd/i18n';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  EuiButton,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageHeader,
  EuiTitle,
  EuiText,
  EuiCard, EuiIcon, EuiFlexGroup, EuiFlexItem,
  EuiSelectable, EuiSelectableOption,
  EuiBadge,
} from '@elastic/eui';
import { DataPublicPluginStart } from '../../../../src/plugins/data/public'

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';

// Components
import { TodoApp } from './todo';

interface CustomPluginAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  data: DataPublicPluginStart;
}

export const CustomPluginApp = ({
  basename,
  notifications,
  http,
  navigation,
  data
}: CustomPluginAppDeps) => {
  // Use React hooks to manage state.
  // const [timestamp, setTimestamp] = useState<string | undefined>();
  // const [todos, setTodos] = useState<any>([]);

 

  // const onClickHandler = () => {
  //   // Use the core http service to make a response to the server API.
  //   http.get('/api/custom_plugin/example').then((res) => {
  //     setTimestamp(res.time);
  //     // Use the core notifications service to display a success message.
  //     notifications.toasts.addSuccess(
  //       i18n.translate('customPlugin.dataUpdated', {
  //         defaultMessage: 'Data updated',
  //       })
  //     );
  //   });
  // };
  // const onSearchAllHandler = () => {
  //   // Use the core http service to make a response to the server API.
  //   http.get('/api/custom_plugin/searchAll').then((res) => {
  //     // setTimestamp(res.time);
  //     // Use the core notifications service to display a success message.
  //     // notifications.toasts.addSuccess(
  //     //   i18n.translate('customPlugin.dataUpdated', {
  //     //     defaultMessage: 'Data updated',
  //     //   })
  //     // );
  //     console.log(res)
  //   });
  // };
  // const onGetDocHandler = () => {
  //   // Use the core http service to make a response to the server API.
  //   const id = '1'
  //   http.get(`/api/custom_plugin/get/2`).then((res) => {
  //   // http.get(`/api/custom_plugin/delete`).then((res) => {
  //     // setTimestamp(res.time);
  //     // Use the core notifications service to display a success message.
  //     // notifications.toasts.addSuccess(
  //     //   i18n.translate('customPlugin.dataUpdated', {
  //     //     defaultMessage: 'Data updated',
  //     //   })
  //     // );
  //     console.log(res)
  //   });
  // };
  // const onSearchByFieldTestDocHandler = () => {
  //   // Use the core http service to make a response to the server API.
  //   http.get(`/api/custom_plugin/search_by_field`).then((res) => {
  //   // http.get(`/api/custom_plugin/delete`).then((res) => {
  //     // setTimestamp(res.time);
  //     // Use the core notifications service to display a success message.
  //     // notifications.toasts.addSuccess(
  //     //   i18n.translate('customPlugin.dataUpdated', {
  //     //     defaultMessage: 'Data updated',
  //     //   })
  //     // );
  //     console.log(res)
  //   });
  // };
  // const onPutDocHandler = () => {
  //   // Use the core http service to make a response to the server API.
  //   http.post(`/api/custom_plugin/post`).then((res) => {
  //   // http.get(`/api/custom_plugin/delete`).then((res) => {
  //     // setTimestamp(res.time);
  //     // Use the core notifications service to display a success message.
  //     // notifications.toasts.addSuccess(
  //     //   i18n.translate('customPlugin.dataUpdated', {
  //     //     defaultMessage: 'Data updated',
  //     //   })
  //     // );
  //     console.log(res)
  //   });
  // };
  // const onClientHandler = () => {
  //   // Use the core http service to make a response to the server API.
  //   http.get(`/api/custom_plugin/client`).then((res) => {
  //   // http.get(`/api/custom_plugin/delete`).then((res) => {
  //     // setTimestamp(res.time);
  //     // Use the core notifications service to display a success message.
  //     // notifications.toasts.addSuccess(
  //     //   i18n.translate('customPlugin.dataUpdated', {
  //     //     defaultMessage: 'Data updated',
  //     //   })
  //     // );
  //     console.log(res)
  //   })
  // }
  // const getTodos = () => {
  //   // Use the core http service to make a response to the server API.
  //   http.get(`/api/custom_plugin/get-todos`).then((res) => {
  //   // http.get(`/api/custom_plugin/delete`).then((res) => {
  //     // setTimestamp(res.time);
  //     // Use the core notifications service to display a success message.
  //     // notifications.toasts.addSuccess(
  //     //   i18n.translate('customPlugin.dataUpdated', {
  //     //     defaultMessage: 'Data updated',
  //     //   })
  //     // );
  //     console.log(res)
  //   })
  // }
  // const onCreateHandler = () => {
  //   // Use the core http service to make a response to the server API.
  //   const content = 'Kebab ipsum shawarma sit amet'
  //   http.get(`/api/custom_plugin/create-task/${content}`).then((res) => {
  //   // http.get(`/api/custom_plugin/delete`).then((res) => {
  //     // setTimestamp(res.time);
  //     // Use the core notifications service to display a success message.
  //     notifications.toasts.addSuccess(
  //       i18n.translate('customPlugin.dataUpdated', {
  //         defaultMessage: 'Todo created',
  //       })
  //     );
  //     console.log(res)
  //   });
  // };

  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPage restrictWidth="1000px">
            <EuiPageBody component="main">
              <EuiPageHeader>
                <EuiTitle size="l">
                  <h1>
                    <FormattedMessage
                      id="customPlugin.helloWorldText"
                      defaultMessage="{name}"
                      values={{ name: PLUGIN_NAME }}
                    />
                  </h1>
                </EuiTitle>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentHeader>
                  {/* <EuiTitle>
                    <h2>
                      <FormattedMessage
                        id="customPlugin.congratulationsTitle"
                        defaultMessage="This is the great TO-DO plugin for Wazuh"
                      />
                    </h2>
                  </EuiTitle> */}
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  <EuiText>
                    {/* <p>
                      <FormattedMessage
                        id="customPlugin.content"
                        defaultMessage="Look through the generated code and check out the plugin development documentation."
                      />
                    </p> */}
                    <EuiHorizontalRule />
                    {/* <p>
                      <FormattedMessage
                        id="customPlugin.timestampText"
                        defaultMessage="Last timestamp: {time}"
                        values={{ time: timestamp ? timestamp : 'Unknown' }}
                      />
                    </p> */}
                  </EuiText>

                  <TodoApp http={http} />
                  
                  {/* <Example /> */}
                  {/* <EuiButton type="primary" size="s" onClick={onClickHandler}>
                  <FormattedMessage id="customPlugin.buttonText" defaultMessage="Get data" />
                  </EuiButton>
                  <EuiButton type="primary" size="s" onClick={onSearchAllHandler}>
                  <FormattedMessage id="customPlugin.buttonText" defaultMessage="Do a thing" />
                  </EuiButton>
                  <EuiButton type="primary" size="s" onClick={onGetDocHandler}>
                  <FormattedMessage id="customPlugin.buttonText" defaultMessage="Get by id" />
                  </EuiButton>
                  <EuiButton type="primary" size="s" onClick={onPutDocHandler}>
                  <FormattedMessage id="customPlugin.buttonText" defaultMessage="Post" />
                  </EuiButton>
                  <EuiButton type="primary" size="s" onClick={onSearchByFieldTestDocHandler}>
                  <FormattedMessage id="customPlugin.buttonText" defaultMessage="Search by field" />
                  </EuiButton> */}
                  {/* <EuiButton type="primary" size="s" onClick={onClientHandler}>
                  <FormattedMessage id="customPlugin.buttonText" defaultMessage="Client test" />
                  </EuiButton>
                  <EuiButton type="primary" size="s" onClick={getTodos}>
                  <FormattedMessage id="customPlugin.buttonText" defaultMessage="Get Todos" />
                  </EuiButton>
                  <EuiButton type="primary" size="s" onClick={onCreateHandler}>
                  <FormattedMessage id="customPlugin.buttonText" defaultMessage="Create task" />
                  </EuiButton> */}
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};




const icons = ['Beats', 'Cloud', 'Logging', 'Kibana'];

const cardNodes = icons.map(function (item, index) {
  return (
    <EuiFlexItem key={index}>
      <EuiCard
        icon={<EuiIcon size="xxl" type={`logo${item}`} />}
        title={`Elastic ${item}`}
        isDisabled={item === 'Kibana' ? true : false}
        description="Example of a card's description. Stick to one or two sentences."
        onClick={() => {}}
      />
    </EuiFlexItem>
  );
});

const Example = () => {
  return (
    <div>
      {/* <h1>Example title</h1>
      <EuiFlexGroup gutterSize="l">{cardNodes}</EuiFlexGroup> */}
      <Selectable />
    </div>
  )
}

const Selectable = () => {

  const tasks = [
    {
      label: 'Titan',
      'data-test-subj': 'titanOption',
      priority: 0,
      tags: ['bugfix', 'warning']
    },
    {
      label: 'Enceladus is disabled',
      disabled: true,
      priority: 1,
      tags: ['bugfix']
    },
    {
      label: 'Mimas',
      checked: 'on',
      priority: 1,
      tags: ['bugfix']
    },
    {
      label: 'Dione',
    },
    {
      label: 'Iapetus',
      checked: 'on',
      priority: 3,
      tags: ['warning']
    },
    {
      label: 'Phoebe',
    },
    {
      label: 'Rhea',
      priority: 4,
    },
    {
      label:
        "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
    },
    {
      label: 'Tethys',
    },
    {
      label: 'Hyperion',
    }
  ]

  console.log(tasks)

  interface OptionData {
    secondaryContent?: string;
  }
  
  const [options, setOptions] = useState<
    Array<EuiSelectableOption<OptionData>>
  >([
    {
      label: 'Tasks',
      // isGroupLabel: true,
    },
    ...tasks.map(
      (task): EuiSelectableOption => ({
        label: `${task.label}`,
        checked: task.checked,
        searchableLabel: task.label,
        prepend: task.priority ? task.priority : 1,
        append: task.tags ? task.tags.map((tag) => <EuiBadge onClick={(event) => {
          event.stopPropagation();
          console.log('tag', tag)
        }} key={tag}>{tag}</EuiBadge>) : '',
        // data: {
        //   secondaryContent: 'I am secondary content, I am!',
        // },
      })
    ),
  ]);

  return (
    <div style={{
      height: '60vh'
    }}>
      <EuiSelectable
        aria-label="Searchable example"
        height='full'
        searchable
        searchProps={{
          'data-test-subj': 'selectableSearchHere',
        }}
        options={options}
        onChange={(newOptions) => {
          setOptions((currentOptions) => {
            console.log('currentOptions', currentOptions)
            console.log('newOptions', newOptions)

            for (let i = 0; i < currentOptions.length; i++) {
              const obj1 = currentOptions[i];
              const obj2 = newOptions[i];
              
              if (obj2.checked !== obj1.checked) {
                console.log(`Object ${obj2.label} has changed its checked property value from ${obj1.checked} to ${obj2.checked}.`);
              }
            }
            
            return newOptions
          })
        }}
      >
        {(list, search) => (
          <>
            {search}
            {list}
          </>
        )}
      </EuiSelectable>
    </div>
  );
};
