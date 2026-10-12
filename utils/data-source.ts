export const validLoginData = [
    { username: "admin", password: "pass", language: "English (Indian)", expectedValue: "Calendar" },
    { username: "physician", password: "physician", language: "English (Indian)", expectedValue: "Calendar" },
    { username: "accountant", password: "accountant", language: "English (Indian)", expectedValue: "Calendar" }
]

export const invalidLoginData = [
    { username: "john", password: "john123", language: "English (Indian)", expectedError: "Invalid username or password" },
    { username: "peter", password: "peter123", language: "English (Indian)", expectedError: "Invalid username or password" }
]