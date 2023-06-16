import React, { Fragment, useState } from 'react'
import useFetch from 'hooks/useFetch'
import usePut from 'hooks/usePut'
import { SelectInput, Spinner } from 'components/shared'

const CoursePicker = ({ userId, defaultSelected, onSubmit }) => {
  const [courses, setCourses] = useState([])
  const [selected, setSelected] = useState(defaultSelected)
  useFetch('courses', setCourses, [userId])
  const { put, data } = usePut(onSubmit)

  const handleChange = (e) => {
    setSelected(e.target.value)
    put(`users/${userId}`, {
      user: {
        course_id: e.target.value
      }
    })
  }

  return(
    <div className="flex space-x-2">
      <SelectInput
       onChange={handleChange}
       value={selected?.id}
       className="w-64">
        <option value="" disabled>Select a course</option>
        {
          courses.map(course => (
            <option
             key={course.id}
             value={course.id}>{course.title}</option>
          ))
        }
      </SelectInput>
      { data.isLoading && <Spinner /> }
    </div>
  )
}

export default CoursePicker
