import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";



export default function Navbar() {
    const navigate = useNavigate();
    const user= useSelector(state =>{

        return state.user.user;

    })

    return (
        <body>


            <header>
                <div className="header-area ">
                    <div id="sticky-header" className="main-header-area">
                        <div className="container-fluid">
                            <div className="header_bottom_border">
                                <div className="row align-items-center">
                                    <div className="col-xl-3 col-lg-2">
                                        <div className="logo">
                                            <a href="../../public/index.html">
                                                <img src="../../public/img/logo.png" alt=""/>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-7">
                                        <div className="main-menu  d-none d-lg-block">
                                            <nav>
                                                <ul id="navigation">
                                                    <li><Link className="active" href="#" to="">home</Link></li>
                                                    {/*<li><Link href="#" to="add-album">Add Album</Link></li>*/}
                                                    <li><a href="#">Song <i className="ti-angle-down"></i></a>
                                                        <ul className="submenu">
                                                            <li><Link href="#" to="add-song">Add song</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="#">Album <i className="ti-angle-down"></i></a>
                                                        <ul className="submenu">
                                                            <li><Link href="#" to="list-album">My album</Link></li>
                                                            <li><Link href="#" to="add-album">Add album</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="#">pages <i className="ti-angle-down"></i></a>
                                                        <ul className="submenu">
                                                            <li><a href="#">elements</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="#">Tài Khoản: {user !== undefined && user.username}</a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                                        <div className="social_icon text-right">
                                            <ul>
                                                <li><a href="#"> <i className="fa fa-facebook"></i> </a></li>
                                                <li><a href="#"> <i className="fa fa-twitter"></i> </a></li>
                                                <li><a href="#"> <i className="fas fa-sign-out-alt" onClick={()=>{
                                                    localStorage.clear();
                                                    navigate('/')
                                                }}></i> </a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/*<div>*/}
                                    {/*    <button onClick={()=>{*/}
                                    {/*        localStorage.clear();*/}
                                    {/*        navigate('/')*/}
                                    {/*    }}> Log Out </button>*/}
                                    {/*</div>*/}
                                    <div className="col-12">
                                        <div className="mobile_menu d-block d-lg-none"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="slider_area">
                <div className="single_slider  d-flex align-items-center slider_bg_1 overlay2">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="slider_text text-center ">
                                    <h3>Musician </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="row">*/}
            {/*    <div className='col-12'>*/}
            {/*        <nav className="navbar navbar-expand-lg bg-body-tertiary">*/}
            {/*            <div className="container-fluid">*/}
            {/*                <Link className="navbar-brand" to="">LoL</Link>*/}
            {/*                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"*/}
            {/*                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"*/}
            {/*                        aria-expanded="false" aria-label="Toggle navigation">*/}
            {/*                    <span className="navbar-toggler-icon"></span>*/}
            {/*                </button>*/}
            {/*                <div className="collapse navbar-collapse" id="navbarSupportedContent">*/}
            {/*                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">*/}
            {/*                        <li className="nav-item">*/}
            {/*                            <Link className="nav-link active" aria-current="page" to="add-song">Add Song</Link>*/}
            {/*                        </li>*/}
            {/*                        <li className="nav-item">*/}
            {/*                            <Link className="nav-link active" aria-current="page" to="add-album">Add Album</Link>*/}
            {/*                        </li>*/}
            {/*                        <li className="nav-item">*/}
            {/*                            <Link className="nav-link active" aria-current="page" to="list-album">List Album</Link>*/}
            {/*                        </li>*/}
            {/*                        <li className="nav-item">*/}
            {/*                            <Link className="nav-link active" aria-current="page" to="test">Test</Link>*/}
            {/*                        </li>*/}
            {/*                    </ul>*/}

            {/*                    <form className="d-flex" role="search">*/}
            {/*                        <h5 style={{marginLeft: 10}}>Tài Khoản: </h5><h5 style={{marginLeft: 10}}>{user !== undefined &&user.username}</h5>*/}
            {/*                        <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" style={{marginLeft: 10, variant: "primary"}}   onClick={()=>{*/}
            {/*                            localStorage.clear();*/}
            {/*                            navigate('/')*/}
            {/*                        }*/}
            {/*                        }>Logout</button>*/}

            {/*                    </form>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </nav>*/}
            {/*    </div>*/}
            {/*</div>*/}

        </body>
    )
}