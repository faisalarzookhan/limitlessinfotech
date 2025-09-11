"use client"

// Inspired by react-hot-toast and shadcn/ui toast
import * as React from "react"

import type { ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000 // Keep toasts visible for a long time in v0 preview

/**
 * Represents the properties of a toast notification in the toaster.
 * Extends the base `ToastProps` with additional properties for state management.
 */
type ToasterToast = ToastProps & {
  /** A unique identifier for the toast. */
  id: string
  /** The title of the toast. */
  title?: React.ReactNode
  /** The description or body content of the toast. */
  description?: React.ReactNode
  /** A React node for a call-to-action button or link. */
  action?: React.ReactNode
}

/**
 * Defines the possible action types for the toast reducer.
 * @internal
 */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

/**
 * Generates a unique, sequential ID for each toast.
 * @internal
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

/**
 * Defines the shape of actions that can be dispatched to the toast reducer.
 */
type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

/**
 * Defines the state structure for the toast system.
 */
interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

/**
 * Adds a toast to a removal queue. After a delay, a "REMOVE_TOAST" action is dispatched.
 * @param toastId - The ID of the toast to remove.
 * @internal
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

/**
 * The reducer function for managing toast state.
 * It handles adding, updating, dismissing, and removing toasts.
 * @param state - The current state.
 * @param action - The dispatched action.
 * @returns The new state.
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // The `addToRemoveQueue` is a side effect within the reducer, which is not ideal.
      // It schedules the toast for removal after a delay.
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: ((state: State) => void)[] = []

let memoryState: State = { toasts: [] }

/**
 * Updates the global state and notifies all subscribed listeners.
 * @internal
 */
function setState(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

/**
 * Dispatches an action to the toast state manager.
 * This is the primary way to interact with the toast system.
 * @param action - The action to dispatch.
 * @internal
 */
function dispatch(action: Action) {
  setState(action)
}

/**
 * A custom React hook for interacting with the toast system.
 * It provides the current list of toasts and a `toast` function to create new ones.
 * @returns An object containing the current toasts and the `toast` function.
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    /**
     * A function to create and display a new toast.
     * @param props - The properties for the toast, including `title`, `description`, etc.
     * @returns An object with `id`, `dismiss`, and `update` methods for controlling the toast.
     */
    toast: React.useCallback(
      (props: Omit<ToasterToast, "id">) => {
        const id = genId()

        const update = (props: ToasterToast) =>
          dispatch({
            type: "UPDATE_TOAST",
            toast: { ...props, id },
          })
        const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

        dispatch({
          type: "ADD_TOAST",
          toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open) => {
              if (!open) dismiss()
            },
          },
        })

        return {
          id: id,
          dismiss,
          update,
        }
      },
      [],
    ),
  }
}

export { useToast, reducer as toastReducer }
