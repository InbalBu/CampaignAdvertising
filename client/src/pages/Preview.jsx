import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Preview = () => {

    const [campaign, setCampaign] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const campaignId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/campaigns/${campaignId}`)
                setCampaign({...res.data[0]});
            } catch (error) {
                console.log(error);
            }
        }
        fetchCampaign();
    }, []); 

  return (
    <div>
        <div className='campaign' key={campaign.id}>
            <a href={campaign.landingpage} target="_blank" rel="noopener noreferrer">
             {campaign.image && <img className='soloCampaign' src={campaign.image} alt="" />}
            </a>
            <Link className='toHome' to="/">See all Campaigns</Link>
        </div>
    </div>
  )
}

export default Preview
