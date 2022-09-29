import React from 'react'
import {useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import BizForm from './BizForm'


function EditBizForm() {
    const { businessId } = useParams();
   
    const business = useSelector(state => state.businesses[businessId])
   

    return (
        <BizForm business={business} formType="Update Business" />
    );
}

export default EditBizForm
