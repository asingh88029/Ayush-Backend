const HospitalAddress = require("../../models/Hospital/hospitalAddress"); // Adjust the path to your HospitalAddress model

class HospitalAddressService {
    async getHospitalAddress(hospitalID) {
        try {
            const address = await HospitalAddress.findOne({ hospitalID })
            return address;
        } catch (error) {
            throw new Error("Error fetching hospital address: " + error.message);
        }
    }
}

module.exports = HospitalAddressService;
