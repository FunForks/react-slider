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


import { useState, useRef } from 'react'


export const Slider = () => {
  const [ left, setLeft ] = useState(0)
  
  const slider = useRef()
  const thumb = useRef()
  const dragData = useRef({})
  

  // Styles for the slider and its thumb
  const sliderStyle = {
    "--size": "2rem",
    position: "relative",
    width: "80vw",
    height: "var(--size)",
    border: "1px solid #fff"
  }

  const thumbStyle = {
    position: "absolute",
    height: "var(--size",
    width: "var(--size)",
    backgroundColor: "#fff",
    border: "2px solid #f003",
    boxSizing: "border-box",
    // Interactive: uses left state variable
    left: `${left}px`
  }


  const startDrag = (event) => {
    const {left: sliderLeft} = slider.current.getBoundingClientRect()
    const sliderWidth = slider.current.clientWidth // without border

    // Calculate the data needed for each update of the mouse loc
    const { left, width } = thumb.current.getBoundingClientRect()
    const max = sliderWidth - width
    const offset =  left - event.pageX - sliderLeft
    
    // Setting ref data does not trigger a new render, but it does
    // make the data available in future closures of this function
    dragData.current = {
      left,
      max,
      offset
    }

    
    /**
     * drag() is triggered by mousemove events
     */
    const drag = (event) => {
      const { left, max, offset } = dragData.current
      const next = Math.max(0, Math.min(event.pageX + offset, max))
     
      if (left !== next) {
        // Save the latest value in a ref, so that it will be
        // available in all future closures of this function
        dragData.current.left = next

        // Set a state variable to make React re-render
        setLeft(next)

        // console.log("left:", left, ", next:", next);
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


  return (
    <div
      className="slider"
      style={sliderStyle}
      ref={slider}
    >
      <div className="thumb"
        style={thumbStyle}
        ref={thumb}
        onMouseDown={startDrag}
      />
    </div>
  )
}