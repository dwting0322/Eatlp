import React from 'react'
import BizForm from './BizForm';


function CreateBizForm() {
 
    const business = {};

  return (
    <BizForm business={business} formType="Create Business" />
  );
}

export default CreateBizForm
