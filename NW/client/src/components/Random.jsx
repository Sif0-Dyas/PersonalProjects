import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'



const Random = () => {

    const [noteList, setNoteList] = useState([])
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        axios.get('http://localhost:8000/api/notes/random')
            .then((bucket) => {
                console.log('This is my bucket: ', bucket.data)
                setNoteList(bucket.data)
            })
            .catch((error) => { console.log("This is an error", error) })
    }, [loaded])



    return (
        <div>

<div>
                <h1>Note Wall</h1>
            </div>

            <div>
                <button className="btn btn-outline-primary" ><Link to='/'>Go back home</Link></button>

            </div>

            {
                noteList.map((note, i) => {
                    return (
                        <div key={i}>
                            <h1>{note.title}</h1>
                            <p>{note.body}</p>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Random