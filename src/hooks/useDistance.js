import { useState, useEffect } from 'react';

export default function useDistance(lat1, lon1, lat2, lon2) {
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        function calculateDistance() {
            const R = 6371; // Radius of the earth in kilometers
            const dLat = deg2rad(lat2 - lat1); // deg2rad below
            const dLon = deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c; // Distance in kilometers
            return d;
        }

        function deg2rad(deg) {
            return deg * (Math.PI / 180);
        }

        const distance = calculateDistance();
        setDistance(distance);
    }, [lat1, lon1, lat2, lon2]);

    return distance;
}
