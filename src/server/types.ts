import { PluginSetup, PluginStart } from '../../../src/plugins/data/server';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomPluginPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomPluginPluginStart {}


export interface CustomPluginPluginSetupDeps {
  data: PluginSetup;
}
export interface CustomPluginPluginStartDeps {
  data: PluginStart;
}
