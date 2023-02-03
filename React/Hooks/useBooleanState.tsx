import {useState, useCallback} from 'react'

const useBooleanState = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const setTrueValue = useCallback(()=>{
    setValue(true)
  }, [])

    const setFalseValue = useCallback(()=>{
    setValue(false)
  }, [])

    const toggleValue = useCallback(()=>{
    setValue((prev) => !prev)
  }, [])

  return [value, setTrueValue, setFalseValue, toggleValue] as const
}

export default useBooleanState