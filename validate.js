const courses = require('../data/courses.json').map((c) => c.title);
const PHONE = /^[+\d][\d\s-]{8,14}$/;
const EMAIL = /^\S+@\S+\.\S+$/;

function validateEnquiry(body) {
  const b = body && typeof body === 'object' ? body : {};
  const value = {
    name: String(b.name || '').trim().slice(0, 80),
    phone: String(b.phone || '').trim().slice(0, 20),
    course: String(b.course || '').trim().slice(0, 80),
    email: String(b.email || '').trim().slice(0, 120),
    message: String(b.message || '').trim().slice(0, 1000),
  };
  const errors = {};
  if (value.name.length < 2) errors.name = 'Please enter your name.';
  if (!PHONE.test(value.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!courses.includes(value.course)) errors.course = 'Please select a valid course.';
  if (value.email && !EMAIL.test(value.email)) errors.email = 'Please enter a valid email.';
  return { errors, value, ok: Object.keys(errors).length === 0 };
}

module.exports = { validateEnquiry };
