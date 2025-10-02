// src/components/Counter.jsx

import { useState, useEffect } from 'react'
import '../App.css'

const API_URL = 'http://localhost:8000'

function Counter() {
    const [count, setCount] = useState(0)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchCounter()
    }, [])

    const fetchCounter = async () => {
        try {
            const response = await fetch(`${API_URL}/api/counter`)
            const data = await response.json()
            setCount(data.value)
            setError(null)
        } catch (err) {
            setError('Failed to fetch counter')
            console.error(err)
        }
    }

    const handleIncrement = async () => {
        setCount(prev => prev + 1)  // Optimistički update
        try {
            await fetch(`${API_URL}/api/increment`, { method: 'POST' })
            setError(null)
        } catch (err) {
            setError('Failed to increment')
            fetchCounter()  // Re-fetch ako greška
        }
    }

    const handleDecrement = async () => {
        setCount(prev => prev - 1)
        try {
            await fetch(`${API_URL}/api/decrement`, { method: 'POST' })
            setError(null)
        } catch (err) {
            setError('Failed to decrement')
            fetchCounter()
        }
    }

    const handleReset = async () => {
        setCount(0)
        try {
            await fetch(`${API_URL}/api/reset`, { method: 'POST' })
            setError(null)
        } catch (err) {
            setError('Failed to reset')
            fetchCounter()
        }
    }

    return (
        <div className="counter-container">
            <h1>Counter App</h1>

            <div className="counter-display">
                <h2>{count}</h2>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="button-group">
                <button
                    onClick={handleDecrement}
                    className="btn btn-danger"
                >
                    -1
                </button>

                <button
                    onClick={handleIncrement}
                    className="btn btn-primary"
                >
                    +1
                </button>

                <button
                    onClick={handleReset}
                    className="btn btn-secondary"
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

export default Counter