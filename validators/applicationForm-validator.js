const { z } = require("zod");

const applicationFormSchema = z.object({
	userId: z.string().min(1, "User ID is required"),
	name: z.string().min(1, "Name is required"),
	fatherName: z.string().min(1, "Father's Name is required"),
	dob: z.coerce.date({ invalid_type_error: "Invalid date of birth" }),
	gender: z.enum(["Male", "Female", "Other"]),
	aadharNumber: z.string().length(12, "Aadhar must be 12 digits"),
	mobileNumber: z.string().length(10, "Mobile number must be 10 digits"),
	email: z.string().email("Invalid email").optional(),
	address: z.string().min(1, "Address is required"),
	college: z.string().min(1, "College name is required"),
	course: z.string().min(1, "Course is required"),
	session: z.string().min(1, "Session is required"),
	currentAcademicSession: z.string().min(1, "Academic session is required"),
	religion: z.string().min(1, "Religion is required"),
	category: z.string().min(1, "Category is required"),
	caste: z.string().min(1, "Caste is required"),
	isAlloted: z.boolean().optional(), // default is false if not provided
});

module.exports = {applicationFormSchema};