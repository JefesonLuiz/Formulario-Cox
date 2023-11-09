export const setFormDataDucks = (formData: any) => {
    return {
      type: 'SET_FORM_DATA',
      payload: formData,
    };
  };