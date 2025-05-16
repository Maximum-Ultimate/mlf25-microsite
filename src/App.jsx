import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Day1 from './pages/Day1'
import Day2 from './pages/Day2'
import Day3 from './pages/Day3'
import Day4 from './pages/Day4'
import Order from './pages/Order'


export default function App() {
  return (
    <Router>
      {/* <nav style={{ display: 'flex', gap: '10px' }}>
        <Link to="/">Home</Link>
        <Link to="/day1">Day1</Link>
        <Link to="/day2">Day2</Link>
        <Link to="/day3">Day3</Link>
        <Link to="/day4">Day4</Link>
        <Link to="/order">Order</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/day1" element={<Day1 />} />
        <Route path="/day2" element={<Day2 />} />
        <Route path="/day3" element={<Day3 />} />
        <Route path="/day4" element={<Day4 />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  )
}
