import React from 'react'

function BoardComment({id}:{id:number}) {
  return (
    <td colSpan={2}>{id}</td>
  )
}

export default BoardComment