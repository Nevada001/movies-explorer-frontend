import { useState, useCallback } from "react";

const regExEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/;

export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      if (e.target.value === "") {
        e.target.setCustomValidity("Поле обязательно для заполнения");
      } else if (e.target.value.length < 2) {
        e.target.setCustomValidity("Имя должно содержать минимум 2 символа");
      } else if (e.target.value.length > 30) {
        e.target.setCustomValidity("Имя должно содержать максимум 30 символов");
      } else {
        e.target.setCustomValidity("");
      }
    } else if (name === "email") {
      if (value === "") {
        e.target.setCustomValidity("Поле обязательно для заполнения");
      } else if (!value.match(regExEmail)) {
        e.target.setCustomValidity("Введите корректный формат E-mail");
      } else {
        e.target.setCustomValidity("");
      }
    } else if (name === "password") {
      if (value === "") {
        e.target.setCustomValidity("Поле не может быть пустым");
      } else if (!value.match(regExPassword)) {
        e.target.setCustomValidity(
          "Пароль должен содержать не менее 3 символов, буквы и цифры"
        );
      } else {
        e.target.setCustomValidity("");
      }
    } else {
      e.target.setCustomValidity("");
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    const form = e.target.closest("form");
    setFormValid(form ? form.checkValidity() : false);
  };
  const resetFormValues = useCallback(
    (values = {}, errors = {}, formValid = false) => {
      setValues(values);
      setErrors(errors);
      setFormValid(formValid);
    },
    [setValues, setErrors, setFormValid]
  );

  return {
    values,
    errors,
    formValid,
    handleInputChange,
    resetFormValues,
  };
}
