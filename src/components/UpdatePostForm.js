import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UpdatePostForm({locId, loc, desc, hideUpdate, updateLocation}) {

  var { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      location: loc,
      description: desc
    }
  });
  
  const onSubmit = (postInput) => {
    updateLocation(postInput)
    reset()
  }
   
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <h1>Update Post Id: {locId}</h1>
        <label>Location:</label>
        <input name="location" ref={register({ required: true })} className="form-control"/>
        {errors.location && <p style={{color: 'red'}}>Please add a location.</p>}
        <label>Description:</label>
        <input name="description" ref={register({ required: true })} className="form-control mb-3"/>
        {errors.location && <p style={{color: 'red'}}>Please add a description.</p>}
        <input type="submit" className="btn btn-success mr-1"/>
        <button type="button" className="btn btn-warning" onClick={()=>hideUpdate()}>Cancel</button>
    </form>
  );
}