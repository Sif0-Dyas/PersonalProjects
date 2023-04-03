import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const NoteWall = () => {


    const [noteList, setNoteList] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8000/api/notes')
            .then((res) => {
                console.log('This is my bucket: ', res.data)

                // sort alphabetically
                res.data.sort(function (a, b) {
                    let titleA = a.title.toLowerCase()
                    let titleB = b.title.toLowerCase()

                    if (titleA > titleB) {
                        return 1
                    } else {
                        return -1
                    }
                })


                setNoteList(res.data)
            })
            .catch((error) => { console.log("This is an error", error) })
    }, [loaded])


    return (
        <div>

            <div>
                <h1>Note Wall</h1>
                <p>Leave a note!</p>
            </div>

            <div>
                <button className="btn btn-outline-info"   ><Link to={'/write'}>Write Note</Link></button>
            </div>

            <hr />

            <div className="Wall"  >
                {
                    noteList.map((note, i) => {
                        return (
                            <div key={i}>
                                <h1>{note.title}</h1>
                                <p>{note.body}</p>
                                <p>{note.date}</p>
                                <button className="btn btn-outline-warning" ><Link to={`/edit/${note._id}`}>Edit</Link></button>
                            </div>
                        )
                    })
                }
            </div>

            <button className="btn btn-outline-dark">
                <Link to={`/random`} >Random Note</Link>
            </button>

        </div>
    )
}

export default NoteWall