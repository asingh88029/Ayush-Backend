class LocationHelper {
    calculateDistanceAndDirection(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers

        // Calculate direction (bearing)
        const y = Math.sin(dLon) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        const direction = (Math.atan2(y, x) * 180) / Math.PI;

        // Convert direction angle to cardinal direction
        let cardinalDirection = '';
        if (direction >= -22.5 && direction <= 22.5) {
            cardinalDirection = 'N';
        } else if (direction > 22.5 && direction <= 67.5) {
            cardinalDirection = 'NE';
        } else if (direction > 67.5 && direction <= 112.5) {
            cardinalDirection = 'E';
        } else if (direction > 112.5 && direction <= 157.5) {
            cardinalDirection = 'SE';
        } else if (direction > 157.5 || direction <= -157.5) {
            cardinalDirection = 'S';
        } else if (direction > -157.5 && direction <= -112.5) {
            cardinalDirection = 'SW';
        } else if (direction > -112.5 && direction <= -67.5) {
            cardinalDirection = 'W';
        } else if (direction > -67.5 && direction <= -22.5) {
            cardinalDirection = 'NW';
        }

        return { distance, direction, cardinalDirection };
    }

    filterLocationsByDistance(locations, lat, lon, distanceLimit) {
        return locations
            .map((location) => {
                const { distance, direction, cardinalDirection } = this.calculateDistanceAndDirection(lat, lon, location.coordinateX, location.coordinateY);
                return { ...location, distance, direction, cardinalDirection };
            })
            .filter((location) => location.distance <= distanceLimit);
    }
}

module.exports = LocationHelper