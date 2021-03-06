import InputErrorMessages from '@/constants/InputErrorMessages';

const phoneValidator = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const InputFormatters = {
  phone: {
    format: (phone: string): string => {
      const config = {
        first: InputFormatters.phone.unformat(phone).slice(0, 4),
        second: InputFormatters.phone.unformat(phone).slice(4, 7),
        third: InputFormatters.phone.unformat(phone).slice(7, 10),
      };

      if (config.third) {
        return `${config.first} ${config.second} ${config.third}`;
      }

      if (config.second) {
        return `${config.first} ${config.second}`;
      }

      return `${config.first}`;
    },
    unformat: (phone: string): string => phone.split(' ').join(''),
  },
};

export const InputValidators: Record<string, (value:any) => InputErrorMessages | null> = {
  firstName: (firstName?: string) => {
    if (!firstName || firstName.length === 0) {
      return InputErrorMessages.firstNameEmpty;
    }
    if (firstName.length < 3) {
      return InputErrorMessages.firstNameToShort;
    }
    if (firstName.length > 30) {
      return InputErrorMessages.firstNameToLong;
    }
    return null;
  },
  lastName: (lastName?: string) => {
    if (!lastName || lastName.length === 0) {
      return InputErrorMessages.lastNameEmpty;
    }
    if (lastName.length < 3) {
      return InputErrorMessages.lastNameToShort;
    }
    if (lastName.length > 30) {
      return InputErrorMessages.lastNameToLong;
    }
    return null;
  },
  subject: (subject?: string) => {
    if (!subject || subject.length === 0) {
      return InputErrorMessages.subjectEmpty;
    }
    if (subject.length < 10) {
      return InputErrorMessages.subjectToShort;
    }
    if (subject.length > 50) {
      return InputErrorMessages.subjectToLong;
    }
    return null;
  },
  message: (message?: string) => {
    if (!message || message.length === 0) {
      return InputErrorMessages.messageEmpty;
    }
    if (message.length < 15) {
      return InputErrorMessages.messageToShort;
    }
    if (message.length > 700) {
      return InputErrorMessages.messageToLong;
    }
    return null;
  },
  phone: (phone?: string) => {
    if (!phone || phone.length === 0) {
      return InputErrorMessages.phoneEmpty;
    }

    if (!phoneValidator.test(phone)) {
      return InputErrorMessages.phoneInvalid;
    }

    return null;
  },
  email: (email?: string) => {
    if (!email || email.length === 0) {
      return InputErrorMessages.emailEmpty;
    }

    if (!emailValidator.test(email)) {
      return InputErrorMessages.emailInvalid;
    }

    return null;
  },
  customerCount: (count? :number) => {
    if (!count || count < 1) {
      return InputErrorMessages.noCustomerCount;
    }

    return null;
  },
  adultCount: (count? :number) => {
    if (!count || count < 1) {
      return InputErrorMessages.noAdultCount;
    }

    return null;
  },
  childrenCount: (childrenCount?: number) => {
    if (!childrenCount || childrenCount > 8) {
      return InputErrorMessages.tooMuchChildrenCount;
    }

    return null;
  },
  startDate: (date?: string) => {
    if (!date || date === '') {
      return InputErrorMessages.startDateEmpty;
    }
    if (!Date.parse(date)) {
      return InputErrorMessages.startDateInvalid;
    }

    return null;
  },
  endDate: (date?: string) => {
    if (!date || date === '') {
      return InputErrorMessages.endDateEmpty;
    }
    if (!Date.parse(date)) {
      return InputErrorMessages.endDateInvalid;
    }

    return null;
  },
  date: (date?: string) => {
    if (!date || date === '') {
      return InputErrorMessages.dateEmpty;
    }
    if (!Date.parse(date)) {
      return InputErrorMessages.dateInvalid;
    }

    return null;
  },
};
