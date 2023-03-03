import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';
import { DataPublicPluginStart } from '../../../src/plugins/data/public'

export interface CustomPluginPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomPluginPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
  data: DataPublicPluginStart
}

export interface Todo {
  id: string;
  completed: boolean;
  completed_at?: Date;
  created_at: string;
  finish_date?: string;
  priority: number;
  tags: string[];
  text: string;
}
export interface Tab {
  id: string;
  name: string;
  content: JSX.Element;
}