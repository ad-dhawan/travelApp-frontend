import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';

const pickDocument = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
    });

    // Extracting file extension
    const splitArray = res[0].name.split('.');
    const extension = splitArray.pop();
    const fileName = splitArray.join('.');

    // Converting file to base64
    const base64 = await convertToBase64(res[0].uri);

    return { base64, extension, fileName };
  } catch (err) {
    console.log('Error picking document: ', err);
    return null;
  }
};

const convertToBase64 = async (uri) => {
  try {
    const response = await RNFetchBlob.fs.readFile(uri, 'base64');
    return response;
  } catch (error) {
    console.log('Error converting to base64: ', error);
    return null;
  }
};

export default pickDocument;
