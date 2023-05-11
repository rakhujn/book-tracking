import { useContext } from "react"
import { AuthContext, AuthContextValueType } from "../context/AuthContext"

export const Navbar = (): JSX.Element => {
    const { authUser, logIn, logOut } = useContext(AuthContext) as AuthContextValueType

    return <>
        <div className='bg-light p-3 shadow'>
            <div className="d-flex justify-content-between align-items-center">
                <div className='h4'>
                    My Book Tracker
                </div>
                <div className="d-flex gap-2 align-items-center">
                    {!authUser
                        ? <button className="btn btn-primary" onClick={logIn}>Login</button>
                        : <>
                            <div className="nav-item dropdown border rounded p-1 px-2">
                                <a
                                    className="nav-link"
                                    href="#" id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    
                                    <div className="d-inline-flex gap-2 align-items-center">
                                        <div className="">
                                            {authUser.displayName ?? ''}
                                        </div>
                                        <img
                                            className="rounded-pill"
                                            width={34} height={34}
                                            src={authUser.photoURL ?? ''}
                                            alt={authUser.displayName ?? ''}
                                        />
                                    </div>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Profile</a>
                                    <a className="dropdown-item" href="#">Settings</a>
                                    <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#newBookModal">Add New Book</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#" onClick={logOut}>Logout</a>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    </>
}

/*
condition ? true : false

condition && true

condition ? condition : false
 => condition ?: false

exist(variable) ? variable : ''
variable ?? ''
*/