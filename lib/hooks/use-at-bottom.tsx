import * as React from 'react'

/**
 * useAtBottom is a hook that returns a boolean indicating whether the user
 * has scrolled to the bottom of the page. It is useful for determining when
 * to show or hide a floating action button, for example.
 *
 * The hook takes one optional prop, `offset`, which is the number of pixels
 * to check above the bottom of the page. If the user is scrolled to a point
 * where they are within `offset` pixels of the bottom of the page, the hook
 * will return true. Otherwise, it will return false.
 *
 * The hook works by adding an event listener to the window's scroll event.
 * When the user scrolls, the handler checks whether the user is scrolled to
 * the bottom of the page by checking whether the vertical scroll position
 * plus the height of the window is greater than or equal to the height of the
 * document minus the `offset`. If they are, the hook sets its state to true.
 * Otherwise, it sets its state to false.
 *
 * The hook also cleans up after itself by removing the event listener when
 * the component is unmounted.
 */
export function useAtBottom(offset = 0) {
  const [isAtBottom, setIsAtBottom] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      /**
       * Check whether the user is scrolled to a point where they are within
       * `offset` pixels of the bottom of the page.
       */
      const checkIsAtBottom = (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - offset
      )

      /**
       * If the user is scrolled to a point where they are within `offset`
       * pixels of the bottom of the page, set the hook's state to true.
       * Otherwise, set it to false.
       */
      setIsAtBottom(checkIsAtBottom)
    }

    /**
     * Add the event listener to the window's scroll event. The { passive: true }
     * option is used to prevent the event listener from blocking the main
     * thread and causing scroll jank.
     */
    window.addEventListener('scroll', handleScroll, { passive: true })

    /**
     * Call the handler immediately so that the hook's state is initialized
     * properly.
     */
    handleScroll()

    /**
     * Clean up after ourselves by removing the event listener when the
     * component is unmounted.
     */
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [offset])

  /**
   * Return the hook's state, which indicates whether the user is scrolled to
   * the bottom of the page.
   */
  return isAtBottom
}


