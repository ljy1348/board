import React, { useEffect, useState } from 'react'

function Homes() {

  const tokenFromLocalStorage = localStorage.getItem('token');
console.log('Token from LocalStorage:', tokenFromLocalStorage);

  return (
    <div>Homes</div>
  )
}

export default Homes