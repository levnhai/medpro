module.exports = {
  ConvertBase64: function (file) {
    return new Promise(async (resolve, reject) => {
      const fileReader = await new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (Error) => reject(Error);
    });
  },
};
