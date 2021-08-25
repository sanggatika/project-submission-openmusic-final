// Schema Validator Producer
const Joi = require('joi');

const ExportSongsPayloadSchema = Joi.object({
  // Mengecek Inputan Email Valid dan Required
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = ExportSongsPayloadSchema;
