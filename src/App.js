/**
 * App.jsx
 */

import { SliderProvider } from './contexts/SliderContext'
import { Header } from './components/Header'
import { Slider } from './components/Slider'

function App() {

  return (
    <SliderProvider>
      <Header />
      <Slider />
    </SliderProvider>
  );
}

export default App;
