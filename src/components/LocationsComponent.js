import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getLocations, deleteLocation, addLocation, updateLocation } from '../redux/actions/locations';
import AddPostForm from './AddPostForm';
import UpdatePostForm from './UpdatePostForm';

const Locations = () => {
    const [hideUpdatePost, setHideUpdatePost] = useState(true)
    const [updatePostInput, setUpdatePostInput] = useState({})

    const dispatch = useDispatch();
    const locations = useSelector(state => state.locations.locations);
    const loading = useSelector(state => state.locations.loading);
    const error = useSelector(state => state.locations.errror)

    useEffect(() => {
        dispatch(getLocations())
    }, []);

    const deleteLoc = (id) => {
        dispatch(deleteLocation(id))
        if(!hideUpdatePost) {
            setHideUpdatePost(!hideUpdatePost)
        }    
    }

    const addLoc = (postInput) => {
        dispatch(addLocation(postInput))
    }

    const updateLoc = (postInput) => {
        dispatch(updateLocation(postInput, updatePostInput.id))
        setHideUpdatePost(!hideUpdatePost)
    }

    const setUpdatePost = (id, location, description) => {
        if(hideUpdatePost) {
            setHideUpdatePost(!hideUpdatePost)
        }
        setUpdatePostInput({
            id,
            location,
            description
        })
    }

    const hideUpdate = () => {
        setHideUpdatePost(!hideUpdatePost)
    }

    return (
        <>      
            {
                hideUpdatePost 
                ? 
                    <AddPostForm addLocation={addLoc}/> 
                : 
                    <UpdatePostForm updateLocation={updateLoc} hideUpdate={hideUpdate} locId={updatePostInput.id} loc={updatePostInput.location} desc={updatePostInput.description}/>
            }
            {locations.loading && <p>Loading...</p>}
            <table id="table" className="table table-bordered border-dark table-striped">
                <thead id="tableHead" className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Location</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {locations.length > 0 && locations.map((location) => (
                    <tr key={location.id}>
                        <td >{location.id}</td>
                        <td>{location.location}</td>
                        <td>{location.description}</td>
                        <td>
                            <button type="button" className="btn btn-danger mr-1" onClick={()=>deleteLoc(location.id)}>delete</button>
                            {hideUpdatePost 
                            ? 
                                <button type="button" className="btn btn-primary" onClick={() => setUpdatePost(location.id, location.location, location.description)}>update</button> 
                            :
                                null
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {locations.length === 0 && !loading && <p>No locations available!</p>}
            {error && !loading && <p>{error}</p>}
        </>
    )
}

export default Locations;