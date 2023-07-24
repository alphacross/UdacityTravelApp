function validateDate(date){
    return /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(date);
}

export { validateDate }