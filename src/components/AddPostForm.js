import React from "react";
import { useForm } from "react-hook-form";

export default function AddPostForm({addLocation}) {
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      location: "",
      description: ""
    }
  });
  const onSubmit = postInput => {
    addLocation(postInput)
    reset()
  }
   
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        <h1>Add Post Form</h1>
        <label>Location:</label>
        <input name="location" ref={register({ required: true })} className="form-control"/>
        {errors.location && <p style={{color: 'red'}}>Please add a location.</p>}
        <label>Description:</label>
        <input name="description" ref={register({ required: true })} className="form-control mb-3"/>
        {errors.location && <p style={{color: 'red'}}>Please add a description.</p>}
        <input type="submit" className="btn btn-primary" />
    </form>
  );
}