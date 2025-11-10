import { useEffect, useState } from "react";
import {reviewAPI} from "../api/reviewApi";

export const useReview = () => {
    const [reviews, setReview] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReview();
    }, []);

    const fetchReview = async () => {
        setError(null);
        try {
            const data = await reviewAPI.getAll();
            setReview(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching reviews:', err);
        }
    };

    return {
    reviews,
    error,
    }
}