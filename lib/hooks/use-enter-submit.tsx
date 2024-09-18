import { useRef, type RefObject } from 'react'

/**
 * Returns an object with two properties:
 * - `formRef`: A mutable reference to an HTMLFormElement.
 * - `onKeyDown`: A function that takes a React.KeyboardEvent<HTMLTextAreaElement>
 *   and calls `requestSubmit()` on the form element if the Enter key is pressed.
 *   Prevents default behavior.
 */
export function useEnterSubmit(): {
  formRef: RefObject<HTMLFormElement>
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
} {
  /**
   * A mutable reference to an HTMLFormElement. This is used to access the
   * form element in the `onKeyDown` function.
   */
  const formRef = useRef<HTMLFormElement>(null)

  /**
   * A function that takes a React.KeyboardEvent<HTMLTextAreaElement> and
   * calls `requestSubmit()` on the form element if the Enter key is pressed.
   * Prevents default behavior.
   *
   * @param event The React.KeyboardEvent<HTMLTextAreaElement> to handle.
   */
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    /**
     * If the Enter key is pressed and the shift key is not pressed and the
     * event is not a composition event, then call `requestSubmit()` on the
     * form element. Prevent default behavior.
     */
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      formRef.current?.requestSubmit()
      event.preventDefault()
    }
  }

  return { formRef, onKeyDown: handleKeyDown }
}


