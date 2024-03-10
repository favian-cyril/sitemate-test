import { useEffect, useState } from 'react'
import './App.css'
const BASE_URL = 'http://localhost:3000/issues';

interface Issue {
  id: string,
  title: string,
  description: string
}

function App() {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      if (data?.id) {
        setIssue(data);
      } else {
        setIsEdit(true);
      }
    }
    fetchData()
  }, [])
  
  
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const reqBody = {
      id: event.target.id.value,
      title: event.target.title.value,
      description: event.target.description.value
    };
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
    const data = await res.json();
    setIssue(data);
    setIsEdit(false);
  }

  const handleDelete = async () => {
    const reqBody = {
      id: issue?.id,
      title: issue?.title,
      description: issue?.description
    };
    await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
    setIssue(null)
  }

  return (
    <>
      <div className='container'>
        {isEdit || !issue ? (
          <form onSubmit={handleSubmit} className='form'>
            {issue && <p>Current ID: {issue.id}</p>}
            <input type='text' placeholder='ID' name='id' />
            {issue && <p>Current Title: {issue.title}</p>}
            <input type="text" placeholder='title' name='title' />
            {issue && <p>Current Description: {issue.description}</p>}
            <input type="text" placeholder='description' name='description' /> 
            <button type='submit'>Submit</button>
          </form>
        ) : (
          <div>
            <p>{issue.id}</p>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <button onClick={() => setIsEdit(true)}>Edit</button>
            <button onClick={() => handleDelete()}>Delete</button>
          </div>
        )}
      </div>
    </>
  )
}

export default App
