import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Edit = () => {
    
    const [campaign, setCampaign] = useState({
        name:"",
        platform: "",
        image:"",
        landingpage:""
    });

    const navigate = useNavigate();
    const location = useLocation();
    const [error,setError] = useState(false)

    const campaignId = location.pathname.split("/")[2];
    // so i can reach only the id of the campaign

    const handleChange = (e) => {
        setCampaign((prev) => ({...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/campaigns/${campaignId}`, campaign);
            navigate("/");
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }

  return (  
    <div className='form'>
      <h1>Edit this Banner</h1>
      <input type="text" required placeholder='Banner name' value={campaign.name} onChange={handleChange} name='name' id='name' />
      {error ? <span>Please fill this field.</span> : null}
      <input type="text" required placeholder='Banner image URL' value={campaign.image} onChange={handleChange} name='image' />
      <input type="text" required placeholder='Landing page banner' value={campaign.landingpage} onChange={handleChange} name="landingpage"/>
        <select name="platform" type="text" value={campaign.platform} required onChange={handleChange}>
                <option value="">Please choose an advertising platform</option>
                <option value="Google">Google</option>
                <option value="Taboola">Taboola</option>
                <option value="Tiktok">TikTok</option>
        </select>
      <button className='btnForm' disabled={!campaign.name || !campaign.image || !campaign.landingpage || !campaign.platform} onClick={handleClick}>Save</button>
      {error && "Something went wrong! please try again"}
      <Link className='toHome' to="/">See all Campaigns</Link>
    </div>
  )
}

export default Edit
