const HospitalDetails = require("../../models/Hospital/hospitalDetails"); // Adjust the path to your HospitalDetails model

class HospitalDetailsService {
    async getHospitalDetails(hospitalID) {
        try {
            const details = await HospitalDetails.findOne({ hospitalID }).lean();
            return details;
        } catch (error) {
            throw new Error("Error fetching hospital details: " + error.message);
        }
    }
}

module.exports = HospitalDetailsService;
