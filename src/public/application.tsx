import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../src/core/public';
import { AppPluginStartDependencies } from './types';
import { CustomPluginApp } from './components/app';
// import { DataPublicPluginStart } from '../../../src/plugins/data/public'

// interface CustomPluginDeps {
//   data: DataPublicPluginStart;
// }

export const renderApp = (
  { notifications, http }: CoreStart,
  { navigation, data }: AppPluginStartDependencies,
  { appBasePath, element }: AppMountParameters,
) => {
  ReactDOM.render(
    <CustomPluginApp
      basename={appBasePath}
      notifications={notifications}
      http={http}
      navigation={navigation}
      data={data}
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
