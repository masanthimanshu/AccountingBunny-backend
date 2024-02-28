export const emailValidator = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const phoneValidator = (phone) => {
  const phoneNumberRegex = /^\d{10}$/
  return phoneNumberRegex.test(phone)
}

export const countryCodeValidator = (code) => {
  const countryCodeRegex = /^\+\d{1,3}$/
  return countryCodeRegex.test(code)
}
