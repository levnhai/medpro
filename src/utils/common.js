module.exports = {
  ConvertBase64: function (file) {
    return new Promise(async (resolve, reject) => {
      const fileReader = await new FileReader();

      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
      fileReader.onerror = (Error) => reject(Error);
    });
  },
};
