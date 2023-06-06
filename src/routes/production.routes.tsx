import { BrowserRouter, Routes, Route } from "react-router-dom";


export function ProductionRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<div><h1>Home</h1></div>} />

      </Routes>

    </BrowserRouter>
  )
}
