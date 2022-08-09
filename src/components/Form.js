import React from 'react';
import './Form.css'
const Form = (props)=>{

    return(
        <div className='form' >
            <div>
                <p className="formHeading">Before you go, please leave your contact details so we can get back to you...</p>
            </div>
            
            <input type="text" placeholder='*Your Name'/>
            <input type="text" placeholder='*Your Email'/>
            
            <div className='check'>
                
                <input type="checkbox"/>
                <p className='terms'>* [Sample legal text] The personal data you have provided will be processed by XXXXX for purposes of providing you the service. The legal basis of the processing is XXXXX. Your data will not be transferred nor assigned to third parties. You can exercise your right to access, rectify and delete your data, as well as the other rights granted by law by sending an email to XXXXX. For further information, please check our privacy policy XXXXX.</p>
            </div>
            <button>Send your answer ⟶</button>
        </div>
    )
}
export default Form;