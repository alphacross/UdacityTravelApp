function validateDate(date){
    //validate the date using regex, need to follow dd/mm/yyyy format
    return /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(date);
}

export { validateDate }