module.exports = {
  ConvertBase64: function (file) {
    return new Promise(async (resolve, reject) => {
      const fileReader = await new FileReader();

      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
      fileReader.onerror = (Error) => reject(Error);
    });
  },

  formattedDate: function (date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  },
};
