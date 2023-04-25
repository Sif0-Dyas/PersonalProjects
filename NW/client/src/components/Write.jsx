import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const Write = () => {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const note = { title, body }
        console.log("This is my handleSubmit", note)
        axios.post("http://localhost:8000/api/notes/new", note)
            .then((res) => {
                console.log("this is my post req: ", res)
                navigate("/")
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (

        <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card">
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <div><h1 className="title">Write a note! 😃</h1></div>


            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="group">
                        <input type="text" className="form-control" placeholder=" " onChange={(e) => setTitle(e.target.value)} />
                        <label>Title</label>
                    </div>
                    <div className="group">
                        <textarea className="form-control" placeholder=" " onChange={(e) => setBody(e.target.value)}></textarea>
                        <label>Body</label>
                    </div>
                    <div className="group">
                        <button type="submit" className="btn btn-outline-success">Write note</button>
                    </div>
            <div className="group">
            <Link className="neu-link" to="/">Go back home</Link>
            </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Write



