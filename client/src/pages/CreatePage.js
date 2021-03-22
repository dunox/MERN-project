import React, { useState } from 'react';

export const CreatePage = () => {

    const [ link, setLink ] = useState('');

    const pressHandler = event => {
        if(event.key === 'Enter') {
            try {
                
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
            <h1>Create Page</h1>   
        </div>
    )
}