const formHandler = require('./formHandler');

test('Test valid date', () => {
    expect(formHandler.validateDate('18/05/2024')).toBe(true);
});

test('Test invalid date', () => {
    expect(formHandler.validateDate('18052024')).toBe(false);
});