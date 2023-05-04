import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  const initialString = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [initialString]);

  const handleChange = (e) => {
    let { name, value, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    // Return Array with key and empty value
    const blankStateArray = Object.entries(inputs).map(([key, value]) => [
      key,
      '',
    ]);
    // Converting the Returned Array to an Object
    const blankState = Object.fromEntries(blankStateArray);

    setInputs(blankState);
  };

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
