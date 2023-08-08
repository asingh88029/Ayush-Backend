const HospitalStaff = require("../../models/Hospital/hospitalStaffs"); // Adjust the path to your HospitalStaff model

class HospitalStaffService {
    async getHospitalStaff(hospitalID) {
        try {
            const staff = await HospitalStaff.find({ hospitalID }).lean();
            return staff;
        } catch (error) {
            throw new Error("Error fetching hospital staff: " + error.message);
        }
    }
}

module.exports = HospitalStaffService;
