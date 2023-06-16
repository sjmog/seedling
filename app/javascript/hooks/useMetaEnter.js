const useMetaEnter = (onMetaEnter) => {
  const metaKey = window.navigator.platform.indexOf('Mac') === 0
                  ? '⌘'
                  : 'Shift'

  const handleMetaEnter = (e) => {
    if(window.navigator.platform.indexOf('Mac') === 0) {
      if(e.keyCode == 13 && e.metaKey) onMetaEnter()
    } else {
      if(e.keyCode == 13 && e.shiftKey) onMetaEnter()
    }
  }

 return { handleMetaEnter, metaKey }
}

export default useMetaEnter
