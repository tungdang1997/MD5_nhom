import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Field, Form, Formik} from "formik";

import {useEffect, useState} from "react";
import {storage} from "../../../firebase";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { getCategory} from "../../../services/categoryService";
import {addSong, getSongs} from "../../../services/songService";
import {getAlbums} from "../../../services/albumService";


export default function AddSong() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);

    const user = useSelector(state => {
        return state.user.user;
    })
    const category = useSelector(state => {
        return state.category.category;
    })
    const album = useSelector(state => {
        return state.album.albums[0];
    })



    useEffect(() => {
        dispatch(getCategory())
    }, [])

    useEffect(() => {
        dispatch(getAlbums())
    }, [])

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
        dispatch(addSong(data)).then(() => {
            navigate('/home');
        })

    }


    return (

        <>
            <div className={'row'}>

                <div className="offset-3 col-6 mt-5">
                    <h1 style={{textAlign: 'center'}}>Add Song</h1>
                    <Formik initialValues={{
                        nameSong: '',
                        singer: '',
                        author: '',
                        idAlbum: '',
                        sound: '',
                        idCategory: '',
                        count: '',
                        user: ''
                    }} onSubmit={(values) => {
                        values.sound = urls[0];
                        values.image = urls[1];
                        handleAdd(values)

                    }}>

                        <Form>
                            <div className="ml-3 form-group">
                                <label htmlFor="exampleInputUsername">Name Song: </label>
                                <Field type='text' className={'form-control'} name={'nameSong'}/>
                            </div>
                            <div className="ml-3 form-group">
                                <label htmlFor="exampleInputPassword">Singer: </label>
                                <Field type='text' className={'form-control'} name={'singer'}/>
                            </div>
                            <div className="ml-3 form-group">
                                <label htmlFor="exampleInputPassword">Author: </label>
                                <Field type='text' className={'form-control'} name={'author'}/>
                            </div>
                            <div className="ml-3 form-group">
                                <label htmlFor="exampleInputPassword">Album: </label>
                                <Field as='select' name={'idAlbum'}>
                                    <option selected>Hãy chọn album...</option>
                                    {album !== undefined && album.map((item) => (
                                        <option value={item.idAlbum} selected>{item.nameAlbum}</option>)

                                    )}
                                </Field>
                            </div>
                            <div className="ml-3 form-group">
                                <label htmlFor="exampleInputPassword">Sound: </label>
                                <Field type='file' name={'sound'} onChange={handleChange}>
                                </Field>
                                <button type='button' onClick={handleUpload}>Upload</button>
                            </div>
                            <div className="ml-3 form-group">
                                <label htmlFor="exampleInputPassword">Count: </label>
                                <Field type='number' className={'form-control'} name={'count'}/>
                            </div>
                            <div className="ml-3 form-group">
                                <label htmlFor="exampleInputPassword">Image: </label>
                                <input type='file' onChange={handleChange}>
                                </input>
                                <button type='button' onClick={handleUpload}>Upload</button>
                            </div>
                            <hr/>
                            <div className="ml-3 form-group">
                                <label htmlFor="exampleInputPassword">Category: </label>
                                <Field as='select' name={'idCategory'}>
                                    <option selected placeholder="">Hãy chọn loại...</option>
                                    {category !== undefined && category.map((item) => (
                                        <option value={item.idCategory} selected>{item.nameCategory}</option>)

                                    )}
                                </Field>
                            </div>
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