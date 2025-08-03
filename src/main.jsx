import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CourseProvider } from './store/CoursesContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CourseProvider>
      <App />
    </CourseProvider>
  </StrictMode>,
)
