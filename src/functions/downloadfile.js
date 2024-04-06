import RNFetchBlob from 'rn-fetch-blob';
import { Platform, ToastAndroid } from 'react-native';

export const downloadDocument = async (base64, title, extension) => {
    try {
        const filePathName = `${title}.${extension}`
        const filePath = `${Platform.OS === 'android' ? RNFetchBlob.fs.dirs.DownloadDir : RNFetchBlob.fs.dirs.DocumentDir}/${filePathName}`;
        const fs = RNFetchBlob.fs;

        const document = base64;

        // Check if the directory exists before creating the file
        const directoryExists = await fs.isDir(Platform.OS === 'android' ? RNFetchBlob.fs.dirs.DownloadDir : RNFetchBlob.fs.dirs.DocumentDir);
        if (!directoryExists) {
          // Handle directory not existing
          console.error('Directory does not exist');
          return;
        }

        // Create the file
        await fs.writeFile(filePath, document, 'base64');
    
        // Handle platform-specific file opening
        if (Platform.OS === 'android') {
          await RNFetchBlob.android.actionViewIntent(filePath);
          ToastAndroid.show("File downloaded", ToastAndroid.SHORT);
        } else {
          RNFetchBlob.ios.openDocument(filePath);
        }
    
      console.log('All files downloaded successfully.');
    } catch (error) {
      console.error('Error downloading files:', error);
      ToastAndroid.show('Download failed. Try again.', ToastAndroid.SHORT);
    }  
};