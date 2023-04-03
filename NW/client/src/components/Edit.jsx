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
        <div>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <div>
                <h1>Note</h1>
            </div>

            <div>
                <button className="btn btn-outline-primary" ><Link to='/'>Go back home</Link></button>

            </div>

            <div>

                <form onSubmit={handleSubmit}>

                    <div className="myForm">


                        <div><label>Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                     
                        </div>

                        <div>
                            <label>Body</label>
                            <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />

                        </div>

                    </div>

                    <div>
                        <button type="submit" className="btn btn-outline-warning">Edit note</button>
                    </div>


                    <div>
                        <button onClick={(e) => { handleDelete(e, id) }} className="btn btn-outline-danger">Delete</button>
                    </div>



                </form>
            </div>


        </div>
    )
}

export default Edit