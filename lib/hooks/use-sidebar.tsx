'use client'

import * as React from 'react'

const LOCAL_STORAGE_KEY = 'sidebar'

/**
 * The context for the sidebar. This will contain the state of whether the
 * sidebar is open or not, a function to toggle the sidebar, and a flag
 * indicating whether the component is still loading.
 */
interface SidebarContext {
  /**
   * Whether the sidebar is open or not.
   */
  isSidebarOpen: boolean

  /**
   * A function that toggles the sidebar open or closed.
   */
  toggleSidebar: () => void

  /**
   * Whether the component is still loading. When this is true, the
   * component should render a loading indicator. When it is false, the
   * component should render the sidebar.
   */
  isLoading: boolean
}

/**
 * The context for the sidebar. This is used to share the state of the
 * sidebar between components.
 */
const SidebarContext = React.createContext<SidebarContext | undefined>(
  undefined
)

/**
 * Hook to get the sidebar context. This should be used in any component
 * that needs to know whether the sidebar is open or not, or that needs to
 * toggle the sidebar.
 *
 * @throws {Error} If the hook is used outside of a SidebarProvider.
 */
export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error(
      'useSidebarContext must be used within a SidebarProvider'
    )
  }
  return context
}

/**
 * Props for the SidebarProvider component.
 */
interface SidebarProviderProps {
  /**
   * The children of the provider. This should be the JSX that will be
   * rendered inside the provider.
   */
  children: React.ReactNode
}

/**
 * The SidebarProvider component. This component wraps the app and provides
 * the context for the sidebar. It also handles loading the sidebar's state
 * from local storage.
 */
export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true)
  const [isLoading, setLoading] = React.useState(true)

  /**
   * When the component mounts, load the sidebar's state from local storage
   * and set the isLoading flag to false.
   */
  React.useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value) {
      setSidebarOpen(JSON.parse(value))
    }
    setLoading(false)
  }, [])

  /**
   * A function that toggles the sidebar open or closed. This function will
   * update the state of the component and save the new state to local
   * storage.
   */
  const toggleSidebar = () => {
    setSidebarOpen(value => {
      const newState = !value
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState))
      return newState
    })
  }

  /**
   * If the component is still loading, return null. Otherwise, return the
   * children wrapped in the context provider.
   */
  if (isLoading) {
    return null
  }

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, toggleSidebar, isLoading }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

