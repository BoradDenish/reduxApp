import React from 'react'
import { useSelector } from 'react-redux'

export default function Navbar() {
    const amount = useSelector(state => state.amount)
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">My Bank</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">About</a>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <button disabled={true} className="btn btn-outline-success" type="submit">My balance: {amount}</button>
                </form>
                </div>
            </div>
        </nav>
    </div>
  )
}
