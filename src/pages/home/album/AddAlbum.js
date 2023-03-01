import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";

import {useEffect, useState} from "react";
import {storage} from "../../../firebase";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { getCategory} from "../../../services/categoryService";
import {addSong} from "../../../services/songService";
import {addAlbum} from "../../../services/albumService";
import Navbar from "../../../components/Narbar";


export default function AddAlbum() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);

    const user = useSelector(state => {
        return state.user.user;
    })

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        const promises = [];
        if (images.length > 0) {
            images.map((image) => {
                const storageRef = ref(storage, `images/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                promises.push(uploadTask);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                    },
                    async () => {
                        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                            setUrls(prevState => [...prevState, downloadURLs])
                            console.log("File available at", downloadURLs);
                        });
                    }
                );
            });
        }
        Promise.all(promises)
            .then(() => alert("All images uploaded"))
            .catch((err) => console.log(err));
    };

    const handleAdd = (values) => {
        let data = {...values, user: user.idUser};
        dispatch(addAlbum(data)).then(() => {
            navigate('home');
        })

    }


    return (
        <>


            <div className={'row'}>

            <div className="offset-3 col-6 mt-5">
                <h1 style={{textAlign: 'center'}}>Add Album</h1>
                <Formik initialValues={{
                    nameAlbum: '',
                    countSong: ''
                }} onSubmit={(values) => {
                    values.imageAlbum = urls[0];
                    values.idUser = user.idUser;
                    console.log(values)
                    handleAdd(values)
                }}>

                    <Form>
                        <div className="ml-3 form-group">
                            <h6>
                                <label htmlFor="exampleInputPassword" >Name User: </label>
                                {/*<Field type='number' className={'form-control'} name={'idUser'}/>*/}
                                {user !== undefined && user.username}
                            </h6>
                        </div>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputUsername">Name Album: </label>
                            <Field type='text' className={'form-control'} name={'nameAlbum'}/>
                        </div>
                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Count Song: </label>
                            <Field type='number ' className={'form-control'} name={'countSong'}/>
                        </div>

                        <div className="ml-3 form-group">
                            <label htmlFor="exampleInputPassword">Image: </label>
                            <input type='file' name="imageAlbum" onChange={handleChange}>
                            </input>
                            <button type='button' onClick={handleUpload}>Upload</button>
                        </div>
                        {urls.map((item) => (
                            <>
                                <img src={item} width={100} height={100}/>
                            </>
                        ))}
                        <hr/>
                        <br/>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </Form>
                </Formik>
            </div>
        </div>
        <hr/>
            <footer className="footer">
                <div className="footer_top">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-md-6">
                                <div className="footer_widget">
                                    <h3 className="footer_title">
                                        Services
                                    </h3>
                                    <div className="subscribe-from">
                                        <form action="#">
                                            <input type="text" placeholder="Enter your mail"/>
                                            <button type="submit">Subscribe</button>
                                        </form>
                                    </div>
                                    <p className="sub_text">Esteem spirit temper too say adieus who direct esteem esteems
                                        luckily.</p>
                                </div>
                            </div>
                            <div className="col-xl-5 col-md-5 offset-xl-1">
                                <div className="footer_widget">
                                    <h3 className="footer_title">
                                        Contact Me
                                    </h3>
                                    <ul>
                                        <li><a href="#">conbusi@support.com
                                        </a></li>
                                        <li><a href="#">+10 873 672 6782
                                        </a></li>
                                        <li><a href="#">600/D, Green road, Kings Garden NewYork-6732</a></li>
                                    </ul>
                                    <div className="socail_links">
                                        <ul>
                                            <li>
                                                <a href="#">
                                                    <i className=" fa fa-facebook "></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-google-plus"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-youtube-play"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-instagram"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copy-right_text">
                    <div className="container">
                        <div className="footer_border"></div>
                        <div className="row">
                            <div className="col-xl-7 col-md-6">
                                <p className="copy_right">
                                    Copyright &copy;
                                    <script>document.write(new Date().getFullYear());</script>
                                    All rights reserved | This template is made with <i className="fa fa-heart-o"
                                                                                        aria-hidden="true"></i> by <a
                                    href="https://colorlib.com" target="_blank">Colorlib</a>
                                </p>
                            </div>
                            <div className="col-xl-5 col-md-6">
                                <div className="footer_links">
                                    <ul>
                                        <li><a href="#">home</a></li>
                                        <li><a href="#">about</a></li>
                                        <li><a href="#">tracks</a></li>
                                        <li><a href="#">blog</a></li>
                                        <li><a href="#">contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>


    )
}