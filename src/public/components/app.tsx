import React, { createContext } from 'react';
import { i18n } from '@osd/i18n';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageHeader,
  EuiTitle,
  EuiText,
  EuiCard, 
  EuiIcon, 
  EuiFlexItem,
  EuiSelectable, 
  EuiSelectableOption,
  EuiBadge,
} from '@elastic/eui';
import { DataPublicPluginStart } from '../../../../src/plugins/data/public'

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';

// Components
import { AppConatiner } from './appContainer';
import { CoreContext } from '../context.ts';

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

              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentHeader>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  <CoreContext.Provider value={{ http, notifications }}>
                    <AppConatiner />
                  </CoreContext.Provider>
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};
