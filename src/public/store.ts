import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { Todo } from './types'

const store = (set: any) => ({
  // state
  todos: [] as Todo[],

  // actions
  setTodos: (data: Todo[]) => set({ todos: data }),
});

const useStore = create(devtools(store))

export default useStore
