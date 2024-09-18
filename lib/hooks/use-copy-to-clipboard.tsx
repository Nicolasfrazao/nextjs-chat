'use client'

import * as React from 'react'

/**
 * A hook that provides a function to copy a given string to the user's
 * clipboard, as well as a boolean indicating whether the string has been
 * successfully copied.
 *
 * @param {object} props
 * @param {number} [props.timeout=2000] - The amount of time, in milliseconds,
 * that the hook should wait after copying the string to the clipboard before
 * setting `isCopied` to `false`.
 * @returns {object}
 * @returns {boolean} isCopied - Whether a string has been successfully copied
 * to the clipboard.
 * @returns {function} copyToClipboard - A function that takes a string and
 * copies it to the user's clipboard.
 */

/**
 * An object containing properties that can be passed to the
 * `useCopyToClipboard` hook.
 *
 * @property {number} [timeout=2000] - The amount of time, in milliseconds,
 * that the hook should wait after copying a string to the clipboard before
 * setting `isCopied` to `false`.  This is used to provide a visual indicator
 * that the string has been copied, and to prevent the user from repeatedly
 * copying the same string to the clipboard.
 */
export interface useCopyToClipboardProps {
  /**
   * The amount of time, in milliseconds, that the hook should wait after
   * copying a string to the clipboard before setting `isCopied` to `false`.
   * This is used to provide a visual indicator that the string has been
   * copied, and to prevent the user from repeatedly copying the same string
   * to the clipboard.
   */
  timeout?: number
}

export function useCopyToClipboard({
  timeout = 2000
}: useCopyToClipboardProps) {
  /**
   * A boolean indicating whether a string has been successfully copied to
   * the clipboard.
   */
  const [isCopied, setIsCopied] = React.useState<Boolean>(false)

  /**
   * A function that takes a string and copies it to the user's clipboard.
   * @param {string} value - The string to be copied to the clipboard.
   */
  const copyToClipboard = (value: string) => {
    /**
     * If the user is running this code in a context that doesn't have a
     * navigator.clipboard object, just return.
     */
    if (typeof window === 'undefined' || !navigator.clipboard?.writeText) {
      return
    }

    /**
     * If the user hasn't passed a string to be copied, just return.
     */
    if (!value) {
      return
    }

    /**
     * Write the string to the clipboard. If this is successful, set
     * `isCopied` to `true`, and then set it back to `false` after the
     * specified timeout.
     */
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)

      setTimeout(() => {
        setIsCopied(false)
      }, timeout)
    })
  }

  /**
   * Return the `isCopied` boolean and the `copyToClipboard` function.
   */
  return { isCopied, copyToClipboard }
}
