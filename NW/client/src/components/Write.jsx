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
        <div>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <div><h1>Write a note</h1></div>


            <div>
                <button className="btn btn-outline-primary" ><Link to='/'>Go back home</Link></button>

            </div>


            <div>

                <form onSubmit={handleSubmit}>

                <div className="myForm">

                    <div><label>Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} /></div>

                    <div>
                    <label>Body</label>
                    <input type="text" onChange={(e) => setBody(e.target.value)} />
                    </div>

                    </div>

                    <div>
                    <button type="submit" className="btn btn-outline-success">Write note</button>
                    </div>

                </form>
            </div>



        </div>
    )
}

export default Write