import { Navbar } from './components/Navbar'
import { AuthContext, AuthContextValueType } from './context/AuthContext'
import { useContext } from 'react'
import { NewBookModal } from './modals/index'
import { BookList } from './components/BookList'

export const Layout = (): JSX.Element => {
  const { authChecked, authUser } = useContext(AuthContext) as AuthContextValueType
  return (
    <>
      {!authChecked
        ?
        <>
          <div className="d-flex justify-content-center h-100">
            <div className="spinner-border" role="status">
            </div>
          </div>
        </>
        :
        <>
          <Navbar />
          {authUser && <BookList />}
          <NewBookModal />
        </>}
    </>
  )
}