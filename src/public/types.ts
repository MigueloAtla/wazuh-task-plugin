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
  completed: boolean;
  completed_at?: Date;
  created_at: Date;
  finish_date?: Date;
  priority: number;
  tags: string[];
  text: string;
}