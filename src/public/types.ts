import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';
import { DataPublicPluginStart } from '../../../src/plugins/data/public'
import { CoreStart } from '../../../src/core/public';

export interface CustomPluginPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomPluginPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
  data: DataPublicPluginStart
}

export interface CustomPluginAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  data: DataPublicPluginStart;
}
export interface CoreContextProps {
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
}

export interface HttpActions {
  init: () => Promise<void>;
  getTodos: () => Promise<void>;
  createTask: (new_task: Todo, callback: () => void) => Promise<void>;
  handleSetComplete: (id: string) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  updateTask: (todoObj: Todo) => Promise<void>
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