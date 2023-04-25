import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

const Edit = () => {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [errors, setErrors] = useState([])
    const [loaded, setLoaded] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`http://localhost:8000/api/note/${id}`)
            .then((res) => {
                console.log("This is our update on get req:", res)
                const note = res.data
                setTitle(note.title)
                setBody(note.body)


            })
            .catch(err => console.log("This is our details get error", err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const noteObj = { title, body }
        axios.put(`http://localhost:8000/api/note/${id}`, noteObj)
            .then((res) => {
                console.log(res)
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


    const handleDelete = (e, id) => {
        axios.delete(`http://localhost:8000/api/note/${id}`)
            .then((res) => {
                console.log('Deleting this note response:', id)
                setLoaded(!loaded)
            })
            .catch((error) => { console.log("This is handle error", error) })

    }


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card">
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <div>
                <h1 className="title">Edit Note.✏</h1>
            </div>

            <div className="group">
                <Link className="neu-link" to='/'>Go back home</Link>
            </div>

            <div className="form">
                <form onSubmit={handleSubmit}>

                    <div className="group">
                        <input type="text" className="form-control" placeholder=" " value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label>Title</label>
                    </div>

                    <div className="group">
                        <textarea className="form-control" placeholder=" " value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                        <label>Body</label>
                    </div>

                    <div className="group">
                        <button type="submit" className="btn btn-outline-success">Submit Edit</button>
                    </div>

                    <div className="group">
                        <button onClick={(e) => { handleDelete(e, id) }} className="btn btn-outline-danger">Delete</button>
                    </div>

                </form>
            </div>
        </div>
    </div>
    )
}

export default Edit