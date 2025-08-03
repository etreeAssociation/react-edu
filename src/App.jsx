import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Courses from './components/courses/Courses'
import Enquire from './components/Enquire'
import About from './components/About'
import Contact from "./components/Contact";
export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/enquiry" element={<Enquire />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/enquiry/:courseName" element={<Enquire />} />
          <Route path="*" element={<Courses />} />
        </Routes>
      </Router>
    </>
  );
}