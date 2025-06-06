import * as React from 'react';
import { createRef } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import './styles.css';
import fetchModel from "../../lib/fetchModelData.js"

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function UpdatePhoto() {
    const fileInput = createRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const user = JSON.parse(localStorage.getItem("id"));
        formData.set("image", fileInput.current.files[0]);
        formData.append("user_id", user._id);
        console.log(formData.get("user_id"));
        try {
            const response = await fetch(`http://localhost:8081/api/photo/photos/new`, {
                method: "post",
                body: formData
            });
            
            const res = await response.json();
            if(response.ok) {
                alert("Photo Uploaded");
            } else {
                console.error("Error when update Photo");
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" name="image" ref={fileInput}/>
            <Button
                className='button-photo'
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
            >
            Submit
            <VisuallyHiddenInput
                type="submit"
                multiple
                value="Submit"
            />
            </Button>
        </form>
    );
}

export default UpdatePhoto;
