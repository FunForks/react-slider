/**
 * Context allows you to share state variables and setter
 * functions across multiple components, without having to pass
 * the variables and setter functions through `props` from each
 * parent component to its children.
 *
 * In a nutshell:
 * 1. You use React.createContext() to create a Context object
 * 2. This Context object has a property called Provider
 * 3. You can give the Provider a `value` which you want to
 *    share. Using an object for the `value` means that you can
 *    share many things with a single Provider
 * 4. You export your customized Provider component
 *
 *      // file CustomContext.jsx
 *
 *      import { createContext, useState } from 'react'
 *
 *      export const CustomContext = createContext()
 *
 *      export const CustomProvider = ({ children }) => {
 *        const [ variable, setVariable ] = useState("default")
 *
 *        return (
 *          <CustomContext.Provider
 *            value ={{
 *              variable,
 *              setVariable
 *            }}
 *          >
 *            {children}
 *          </CustomContext.Provider>
 *        )
 *      }
 *
 * NOTE how the `children` prop is read in, and placed inside
 * the custom Provider component, so that any children nested
 * inside the component will be rendered in the expected place.
 *
 * 5. At the root of your component hierarchy, you import the
 *    custom Provider component, and you nest inside it all the
 *    other components with which you want to share the `value`:
 *
 *      import CustomProvider from './CustomContext.jsx'
 *      import ChildComponentOne from './ChildComponentOne'
 *      import ChildComponentTwo from './ChildComponentTwo'
 *
 *      const App = () => (
 *        <CustomProvider>
 *          <ChildComponentOne />
 *          <ChildComponentTwo />
 *        </CustomProvider>
 *      )
 *
 * 6. In *each of* the child components of the custom Provider,
 *    you import the Context object itself.
 * 7. Inside the component function you destructure the `value`
 *    object, and so get access to each of its state variables
 *    and setter functions:
 *
 *      import { useContext } from 'react'
 *      import { CustomContext } from './CustomContext.jsx'
 *
 *      const ChildComponentOne = () => {
 *        const { variable, setVariable } = useContext(CustomContext)
 *
 *        return (<p>{variable}</p>)
 *      }
 *
 * ########################################################### */

import { createContext, useState } from 'react'


export const SliderContext = createContext()


export const SliderProvider = ({ children }) => {
  const [ maxValue, setMaxValue ] = useState(100)
  const [ value, setValue ] = useState(50)

  return (
    <SliderContext.Provider
      value = {{
        maxValue,
        value,
        setValue
      }}
    >
      {children}
    </SliderContext.Provider>
  )
}