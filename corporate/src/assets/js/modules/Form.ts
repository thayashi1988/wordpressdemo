export const Form = () => {
  const inputPhone = document.querySelectorAll('.js-input-num');
  const regexp = /[^0-9]/g;
  inputPhone.forEach((elem) => {
    elem.addEventListener('input', (e: any) => {
      const self = e.currentTarget;
      self.value = self.value.replace(regexp, '');
    });
  });
};
