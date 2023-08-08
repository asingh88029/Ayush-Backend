const mongoose = require('mongoose')

const LocationHelper = require("../../utils/locationHelper/locationHelper")
const Hospital = require("../../models/Hospital/hospital")
const HospitalDetailsService = require("./hospitalDetailsService"); // Adjust the path to your HospitalDetailsService
const HospitalAddressService = require("./hospitalAddressService"); // Adjust the path to your HospitalAddressService
const HospitalStaffService = require("./hospitalStaffService"); // Adjust the path to your HospitalStaffService

class HospitalService {
    constructor() {
        this.locationHelper = new LocationHelper()
        this.hospitalDetailsService = new HospitalDetailsService();
        this.hospitalAddressService = new HospitalAddressService();
        this.hospitalStaffService = new HospitalStaffService();
    }

    async getNearbyHospital(latitude, longitude, maxDistance, limit, page, flag) {
        try {
            const hospitals = await Hospital.find({}).lean(); // Fetch hospitals as an array
            const nearbyHospitals = this.locationHelper.filterLocationsByDistance(
                hospitals,
                latitude,
                longitude,
                maxDistance
            );

            // Apply pagination
            const paginatedHospitals = this.paginateHospitals(nearbyHospitals, limit, page);

            const result = await Promise.all(paginatedHospitals.map(async hospital => {
                const hospitalId = mongoose.Types.ObjectId(hospital._id); // Convert _id to ObjectId
                const data = await this.getBasicHospitalData(hospital);

                if (flag === "m" || flag === "h") {
                    const address = await this.hospitalAddressService.getHospitalAddress(hospitalId);
                    const details = await this.hospitalDetailsService.getHospitalDetails(hospitalId);
                    data.details = details;
                    data.address = address;
                }

                if (flag === "h") {
                    const staff = await this.hospitalStaffService.getHospitalStaff(hospitalId);
                    data.staff = staff;
                }

                return data;
            }));

            return result;
        } catch (error) {
            throw new Error("Error fetching nearby hospitals: " + error.message);
        }
    }

    paginateHospitals(hospitals, limit, page) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        return hospitals.slice(startIndex, endIndex);
    }

    async getBasicHospitalData(hospital) {
        return {
            _id: hospital._id,
            name: hospital.name,
            coordinateX: hospital.coordinateX,
            coordinateY: hospital.coordinateY,
            hospitalType: hospital.hospitalType,
            specialities: hospital.specialities,
            mobileNumber: hospital.mobileNumber
        };
    }
}

module.exports = HospitalService;
