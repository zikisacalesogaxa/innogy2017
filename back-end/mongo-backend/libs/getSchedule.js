module.exports = (plumbers, day, slot) => {
    let availablePlumbers = [];
    for (plumber of plumbers) {
        let plumberSchedules = plumber.schedules;
        for (data of plumberSchedules) {
            if (data.day === day && data.slot === slot) {
                availablePlumbers.push(plumber.firstName);
            }
        }
    }
    return availablePlumbers;
}
