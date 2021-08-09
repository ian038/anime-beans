import React, { useState } from 'react'

export function useFormFields<T>(initialValues: T): [T, (e: React.ChangeEvent<HTMLInputElement>) => void] {
    const [values, setValues] = useState<T>(initialValues)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }
    return [values, handleChange]
}