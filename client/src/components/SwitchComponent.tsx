import React, { FunctionComponent } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import ListView from './ListView/ListView'
import Home from './Home'
import About from './About'
import ElementView from './ListView/ElementView'
import Login from './Admin/Login'
import EditComponent from './Admin/EditComponent'
import PrivateRoute from './Admin/PrivateRoute'
import ChangePassword from './Admin/ChangePassword'
import PictureList from './PictureList'
import PictureComponent from './Admin/PictureComponent'

const SwitchComponent: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/projects"
        element={<ListView elementType="project" header="My Projects" />}
      />
      <Route
        path="/project/:_id"
        element={<ElementView elementType="project" />}
      />
      <Route
        path="/blog"
        element={<ListView elementType="blog" header="It's Storytime" />}
      />
      <Route path="/blog/:_id" element={<ElementView elementType="blog" />} />
      <Route path="/pictures/:_category" element={<PictureList />} />
      <Route path="/admin/login" element={<Login />} />

      <Route
        path="/admin/projects"
        element={<EditComponent elementType="project" />}
      />

      <Route
        path="/admin/blog"
        element={
          <PrivateRoute>
            <EditComponent elementType="blog" />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/image"
        element={
          <PrivateRoute>
            <PictureComponent />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/changepassword"
        element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default SwitchComponent
