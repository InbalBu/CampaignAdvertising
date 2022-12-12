import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Campaigns = () => {

    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchAllCampaigns = async () => {
            try {
                const res = await axios.get("http://localhost:8800/campaigns")
                setCampaigns(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCampaigns();
    }, [])

  return (
    <div className='table'>
        <h1 className='header'>Advertise your campaign NOW!</h1>
        <tr className='headingT'>
                <th colSpan={1}>Campaign Name</th>
                <th colSpan={1}>Advertsring platform</th>
                <th colSpan={1}>Advertiser landing page</th>
                <th colSpan={1}>Banner image URL</th>
                <th colSpan={1}>Edit banner</th>
                <th colSpan={1}>Preview banner</th>
        </tr>
        {campaigns.map(campaign => (
                <tr key={campaign.id}>
                    <td>{campaign.name}</td>
                    <td>{campaign.platform}</td>
                    <td><a className='img' target="_blank" rel="noopener noreferrer" href={campaign.landingpage}>{campaign.landingpage}</a></td>
                    <td><a className='img' href={campaign.image}>{campaign.image}</a></td>
                    <td><button className='edit'><Link to={`/edit/${campaign.id}`}>Edit</Link></button></td>
                    <td><button className='preview'><Link to={`/preview/${campaign.id}`}>Preview</Link></button></td>
                </tr>
            ))}
    </div>
  )
}

export default Campaigns
