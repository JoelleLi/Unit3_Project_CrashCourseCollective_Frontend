import React from 'react'
// import { Card, Stack} from "react-bootstrap"
import { useState, useEffect} from 'react'
import axios from 'axios';

export default function ProjectCard({project}) {

    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
      // Function to fetch avatar URL from your database
      const fetchAvatarFromDatabase = async () => {
        try {
          // Send a request to your backend to retrieve the user's avatar URL
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/${project.username}`); 
          console.log(res.data)
            console.log(res.data.avatarUrl)
          if (res.data && res.data.avatarUrl) {
            setAvatarUrl(res.data.avatarUrl);
            
          } else {
            // console.log("User's avatar not found in the database");
          }
        } catch (error) {
        //   console.error('Error fetching avatar from the database:', error);
        }
      };
  
      fetchAvatarFromDatabase(); // Call the function when the component mounts
    }, [project.username]); // Run the effect when project.username changes
  
  

    let altText = `${project.username}'s avatar`
// console.log(project.username)

  return (


    


    <div style={{backgroundcolor: 'red'}}>
        <div>
            {avatarUrl && <img src={avatarUrl} alt={altText} style={{ width: '50px', height: '50px' }} />}
        </div>
        <div>
            {project.projectName}
        </div>
        <div>
        {project.username}
        </div>
        
        hi
    </div>
    
  )
}
