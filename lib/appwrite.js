import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.abubakrsadriddinov.aora',
  projectId: '67514bf1000982b556d7',
  databaseId: '67514d370018804f06a5',
  userCollectionId: '67514d5e0000c67281b5',
  videoCollectionId: '67514d8300262da1aae4',
  storageId: '67514edf002776099726',
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    // Ensure an anonymous session for the guest
    const currentSession = await account.get().catch(() => null);
    if (currentSession) {
      console.log('Found active session. Deleting sessions...');
      await account.deleteSessions();
    }

    // Create the user
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw new Error('Failed to create a user');

    const avatarUrl = avatars.getInitials(username);

    console.log('Signing in the new user...');
    await signIn(email, password);

    console.log('Creating user document...');
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    if (newUser) console.log('User sucessfully created!');

    return newUser;
  } catch (error) {
    console.log('Error details:', error.response || error.message);
    throw new Error(error.message || 'An unexpected error occurred.');
  }
};

export const signIn = async (email, password) => {
  try {
    const currentSession = await account.get().catch(() => null);
    if (currentSession) {
      console.log('Found active session. Deleting sessions...');
      await account.deleteSessions();
    }

    const session = await account.createEmailPasswordSession(email, password);
    if (session) console.log('Account found!');
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [
      Query.equal('accountId', currentAccount.$id),
    ]);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId, 
      videoCollectionId,
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId, 
      videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      databaseId, 
      videoCollectionId,
      [Query.search('title', query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      databaseId, 
      videoCollectionId,
      [Query.equal('users', userId)]
    );
    
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    
    return session;
  } catch (error) {
    throw new Error(error); 
  }
}