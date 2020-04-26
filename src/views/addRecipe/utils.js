import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../firebase';

export const getImageFromGallery = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'Images',
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.cancelled) {
    return result.uri;
  }
  return null;
};

export const uploadPhoto = async ({ id, uri, uid }) => {
  const blob = await uriToBlob(uri);
  return uploadToFirebase({ id, blob, uid });
};

const uriToBlob = (uri) => fetch(uri).then((res) => res.blob());

const uploadToFirebase = async ({ id, blob, uid }) => {
  const snap = await storage
    .ref()
    .child(`recipes/${id}.jpg`)
    .put(blob, {
      contentType: 'image/jpeg',
      customMetadata: {
        owner: uid,
      },
    });
  blob.close();
  return snap;
};
