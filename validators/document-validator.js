const { z } = require("zod");

const documentSchema = z.object({
  photo: z.string().min(1, "Photo is required!"),
  idProof: z.string().min(1, "ID proof is required!"),
  signature: z.string().min(1, "Signature is required!"),
  cast: z.string().min(1, "Cast certificate is required!"),
  matriculationMarksheet: z.string().min(1, "Please upload 10th Marksheet!"),

  intermediateMarksheet: z.string().optional(),
  graduationMarksheet: z.string().optional(),
  extraCertificate1: z.string().optional(),
  extraCertificate2: z.string().optional(),
  extraCertificate3: z.string().optional(),
});


module.exports = documentSchema;