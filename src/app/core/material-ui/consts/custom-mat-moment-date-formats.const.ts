export const CUSTOM_MAT_MOMENT_DATE_FORMATS = {
  parse: {
    // https://momentjs.com/docs/#/parsing/string-format/ -> Locale aware formats
    dateInput: ['l', 'LL', 'DDMMYY'],
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};
