import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignIn } from '../pages/signIn'
import { Planning } from '../pages/planning'
import { RegisterTag } from '../pages/registerTag'
import { Layout } from '../components/Layout'
import { TagGenerator } from '../pages/tagGenerator'
import { RequireAuth } from './RequireAuth'
import { UserInfo } from '../pages/userInfo'
import { RegisterOEE } from '../pages/registerOEE'
import { DialogProvider } from '../contexts/dialogContext'
import { OeeDashboard } from '../pages/oeeDashboard'

export function AppRoutes () {
  return (
    <BrowserRouter>
    <DialogProvider>

      <Routes>
        <Route path="/" Component={Layout}>

          <Route path="signIn" element={<SignIn />} />

          <Route element={<RequireAuth/>}>
            <Route path='/' element={<h1>Bem vindo!</h1>} />
            <Route path='unauthorized' element={<h1>não autorizado</h1>} />
            <Route path='userInfo' Component={UserInfo} />
          </Route>

          <Route element={<RequireAuth permission='OEE_NOTE'/>}>
            <Route path='registerOEE' Component={RegisterOEE} />
          </Route>

          <Route element={<RequireAuth permission='OEE_NOTE'/>}>
            <Route path='oeeDashboard' Component={OeeDashboard} />
          </Route>

          <Route element={<RequireAuth permission='READ_TAGS'/>}>
            <Route path='registerTag' Component={RegisterTag} />
          </Route>

          <Route element={<RequireAuth permission='GENERATE_TAGS'/>}>
            <Route path='generateTags' Component={TagGenerator} />
          </Route>

          <Route element={<RequireAuth permission='PLANNING'/>}>
            <Route path='planning' Component={Planning} />
          </Route>

          <Route path='*' element={<h1>Not Found (404)!</h1>} />
        </Route>
      </Routes>
      </DialogProvider>
    </BrowserRouter>
  )
}
