import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const CreatePage = () => {
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const history = useHistory();
    const [ link, setLink ] = useState('');

    useEffect(() => {
        window.M.updateTextFields();
    });


    const pressHandler = async event => {
        if(event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                  })
                  history.push(`detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <input 
                placeholder="Enter link" 
                id="link" 
                type="text"
                value={link}
                onChange={e => setLink(e.target.value)}
                onKeyPress={pressHandler}
                />
                <label htmlFor="link">Enter Link</label>
            </div>
        </div>
    )
}