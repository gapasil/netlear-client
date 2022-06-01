export const setLS = (name, item) => {
    return localStorage.setItem(`${name}`, JSON.stringify(item));
  };
  
  export const getLS = (name) => {
    const item = localStorage.getItem(`${name}`);
    return JSON.parse(item);
  };
  
  export const removeLS = (name) => {
      return localStorage.removeItem(`${name}`)
  }
  