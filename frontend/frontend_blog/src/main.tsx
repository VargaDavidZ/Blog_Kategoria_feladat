import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostList from './components/postListComp.tsx';
import PublishPost from './components/publishPostComp.tsx';
import PostDetail from './components/postDetail.tsx';
import DeletePost from './components/deletePostComp.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <PostList />,
  },
  {
    path: "/bejegyzesek",
    element: <PostList />,
  },  
  {
    path: "/bejegyzesfelvetele",
    element: <PublishPost />,
  },
  {
    path: "/bejegyzestorles",
    element: <DeletePost />,
  },
  {
    path:"/bejegyzesek/:bejegyzesId",
    element: <PostDetail/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
