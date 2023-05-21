/**
 * Slider.jsx
 *
 * Demo of dragging an element using a React component.
 *
 * When React renders a component, it calls the component function.
 * The function creates a closure; each rendering of the component
 * creates a different closure. Updating a state variable (using
 * set<State>) causes React to call the function and render the
 * component again.
 *
 * When a mousedown event is triggered in one closure, listeners
 * for mousemove and mouseup are created within that closure.
 *
 * React stores variable created with useRef inside an object. The
 * `.current` value of that object is available across all closures.
 * Its value can be updated in one closure and read in the next.
 *
 * The component below stores references to the slider and thumb
 * DOM elements, via useRef(), and a useRef() variable also stores
 * data that is used in the drag operation. Specifically, the
 * current `left` value for the thumb is stored, and compared with
 * the value that is calculated each time the `mousemove` listener
 * is triggered. If the value for `left` has not changed, nothing
 * happens. If it _has_ changed, then a value for `left` stored
 * by a "useState" variable is updated, which causes a re-render
 * with the thumb in its new position.
 */


import { useState, useRef, useContext, useEffect } from 'react'
import { SliderContext } from "../contexts/SliderContext"




export const Slider = () => {
  const { maxValue, value, setValue } = useContext(SliderContext)

  const [ left, setLeft ] = useState(0)

  const slider = useRef()
  const thumb = useRef()
  const dragData = useRef({})


  // Styles for the slider and its thumb
  const sliderStyle = {
    "--size": "2rem",
    position: "relative",
    width: "320px",
    height: "var(--size)",
    border: "1px solid #fff"
  }

  const thumbStyle = {
    position: "absolute",
    height: "var(--size)",
    width: "var(--size)",
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxSizing: "border-box",
    top: 0,
    // Interactive: uses left state variable
    left: `${left}px`
  }

  const pStyle = {
    position: "relative",
    width: "calc(100% + 2.6667rem)",
    fontSize: "1.5rem",
    textAlign: "right",
    margin: 0,
    "-webkit-user-select": "none", /* Safari */
    "user-select": "none"
  }


  const startDrag = (event) => {
    dragData.current.offset =  dragData.current.left - event.pageX

    /**
     * drag() is triggered by mousemove events
     */
    const drag = (event) => {
      const { left, max, offset } = dragData.current
      let next = Math.max(0, Math.min(event.pageX + offset, max))

      if (left !== next) {
        // Calculate the current value
        const value = Math.round((next / max) * maxValue)
        setValue(value)

        // Snap the thumb to the current value
        next = (max * value) / maxValue

        // Save the latest value in a ref, so that it will be
        // available in all future closures of this function
        dragData.current.left = next

        // Set a state variable to make React re-render
        setLeft(next)
      }
    }

   /**
     * drop() is triggered by a mouseup event
     */
   const drop = () => {
      document.body.removeEventListener("mousemove", drag, false)
    }

    // Start receiving mouse events until the mouse is released
    document.body.addEventListener("mousemove", drag, false)
    document.body.addEventListener("mouseup", drop, {once: true})
  }


  const initialize = () => {
    const sliderWidth = slider.current.clientWidth // without border

    // Calculate the data needed for each update of the mouse loc
    const { width } = thumb.current.getBoundingClientRect()
    const max = sliderWidth - width
    const left = (max * value) / maxValue

    // Setting ref data does not trigger a new render, but it does
    // make the data available in future closures of this function
    dragData.current = {
      left,
      max
    }

    setLeft(left)
  }


  useEffect(initialize, [])


  return (
    <div
      className="slider"
      style={sliderStyle}
      ref={slider}
    >
      <p
        style={pStyle}
      >
        {value}
      </p>
      <div className="thumb"
        style={thumbStyle}
        ref={thumb}
        onMouseDown={startDrag}
      />
    </div>
  )
}