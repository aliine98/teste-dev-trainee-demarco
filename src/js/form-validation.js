export function isValidName(name) {
    return name.length > 10 && name.split(' ').length >= 2;
}

export function isValidEmail(email) {
    return email.length > 10 && email.includes('@') && (email.includes('.com') || email.includes('.com.br'));
}

export function isValidDate(date) {
    const companyCreationDate = new Date('2023-01-01');
    const dateInputValue = new Date(date);
    return dateInputValue < new Date(Date.now()) && dateInputValue > companyCreationDate;
}
