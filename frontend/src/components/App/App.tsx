import { lazy } from 'react';
import { Route, Routes } from "react-router-dom";
import { Layout } from '../Layout';

const TreeListPage = lazy(() => import("../../pages/TreeListPage"));
const TreeDetailsPage = lazy(() => import("../../pages/TreeDetailsPage"));


export const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
        <Route
          index
          element={<TreeListPage />}
        />
          <Route path="/trees/:id" element={<TreeDetailsPage />} />
        </Route>
      </Routes>
      </>
  )
}
