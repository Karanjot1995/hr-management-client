export function calcBusinessDays(startDate, endDate) { // input given as Date objects
    var elapsed, daysBeforeFirstSunday, daysAfterLastSunday;
    var ifThen = function (a, b, c) {
        return a == b ? c : a;
    };

    elapsed = endDate - startDate;
    elapsed /= 86400000;

    daysBeforeFirstSunday = (7 - startDate.getDay()) % 7;
    daysAfterLastSunday = endDate.getDay();

    elapsed -= (daysBeforeFirstSunday + daysAfterLastSunday);
    elapsed = (elapsed / 7) * 5;
    elapsed += ifThen(daysBeforeFirstSunday - 1, -1, 0) + ifThen(daysAfterLastSunday, 6, 5);

    return Math.ceil(elapsed);
}
  
//   var date1 = new Date("August 11, 2010 11:13:00");
//   var date2 = new Date("August 16, 2010 11:13:00");
//   alert(calcBusinessDays(date1, date2));