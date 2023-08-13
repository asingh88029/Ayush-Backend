const mongoose = require('mongoose')
const getDistanceMatrix = require("../../utils/distanceMatrix/distanceMatrix")

const Hospital = require("../../models/Hospital/hospital")
const HospitalDetailsService = require("./hospitalDetailsService"); // Adjust the path to your HospitalDetailsService
const HospitalAddressService = require("./hospitalAddressService"); // Adjust the path to your HospitalAddressService
const HospitalStaffService = require("./hospitalStaffService"); // Adjust the path to your HospitalStaffService

class HospitalService {
    constructor() {
        this.hospitalDetailsService = new HospitalDetailsService();
        this.hospitalAddressService = new HospitalAddressService();
        this.hospitalStaffService = new HospitalStaffService();
    }

    async getNearbyHospitals(latitude, longitude, maxDistance, limit, page, flag) {
        const hospitalsNearby = await this.fetchHospitalsNearby(latitude, longitude, maxDistance, limit, page);
        const res = await this.filterHospitalsByDistance(hospitalsNearby, latitude, longitude, maxDistance);
        const result = await this.processHospitalsData(res, flag);
        return result;
    }

    async filterHospitalsByDistance(hospitalsNearby, latitude, longitude, maxDistance) {
        const origin = latitude + "," + longitude;
        const res = [];
        for (let i = 0; i < hospitalsNearby.length; i++) {
            const hospital = hospitalsNearby[i];
            const destination = hospital.location.coordinates[0] + "," + hospital.location.coordinates[1];
            const result = await getDistanceMatrix(origin, destination);
            try {
                const distance = result.data.rows[0].elements[0].distance.value;
                if (distance < maxDistance) {
                    hospital.distance = distance;
                    res.push(hospital);
                }
            } catch (error) {
                continue;
            }
        }
        return res;
    }

    async fetchHospitalsNearby(latitude, longitude, maxDistance, limit, page) {
        return await Hospital.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [latitude, longitude]
                    },
                    distanceField: "linearDistance",
                    maxDistance: maxDistance, // In m
                    spherical: true
                }
            },
            { $skip: (page - 1) * limit },
            { $limit: limit },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    hospitalType: 1,
                    mobileNumber: 1,
                    specialities: 1,
                    location: 1,
                    linearDistance: {
                        $round: [{ $divide: ["$linearDistance", 1000] }, 3] // Convert meters to kilometers and round to 3 decimal places
                    }
                }
            }
        ]);
    }

    async processHospitalsData(hospitals, flag) {
        const result = await Promise.all(hospitals.map(async hospital => {
            const hospitalId = hospital._id;
            const data = await this.getBasicHospitalData(hospital);

            if (flag === "m" || flag === "h") {
                const address = await this.getAddressData(hospitalId);
                const details = await this.getHospitalDetailsData(hospitalId);
                data.details = details;
                data.address = address;
            }

            if (flag === "h") {
                const staff = await this.getHospitalStaffData(hospitalId);
                data.staff = staff;
            }

            return data;
        }));

        return result;
    }


    async fetchAllHospitals() {
        return await Hospital.find({}).lean();
    }


    async getBasicHospitalData(hospital) {
        return {
            _id: hospital._id,
            name: hospital.name,
            hospitalType: hospital.hospitalType,
            specialities: hospital.specialities,
            mobileNumber: hospital.mobileNumber,
            linearDistance: hospital.linearDistance,
            direction: hospital.direction,
            location: hospital.location,
            distance: hospital.distance
        };
    }

    async getAddressData(hospitalId) {
        return await this.hospitalAddressService.getHospitalAddress(hospitalId);
    }

    async getHospitalDetailsData(hospitalId) {
        return await this.hospitalDetailsService.getHospitalDetails(hospitalId);
    }

    async getHospitalStaffData(hospitalId) {
        return await this.hospitalStaffService.getHospitalStaff(hospitalId);
    }

    async getHospitalById(hospitalId) {
        try {
            const hospital = await Hospital.findById(hospitalId);
            if (!hospital) {
                throw new Error('Hospital not found');
            }

            const [address, details, staffs] = await Promise.all([
                this.getAddressData(hospitalId),
                this.getHospitalDetailsData(hospitalId),
                this.getHospitalStaffData(hospitalId)
            ]);

            return {
                hospital,
                address,
                details,
                staffs
            };
        } catch (error) {
            throw new Error(`Error fetching hospital data: ${error.message}`);
        }

    }
}

module.exports = HospitalService;
