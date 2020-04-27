# Recipe Manager

<p align="center">
  <img style="max-height: 500px" src="https://i.imgur.com/7050MqH.png">
</p>

A React Native app to manage personal recipes and view published recipes from others on the platform. Built as a final project for UVA's CS4720 Mobile Development in React course and as a demo to demonstrate various Firebase features.

Uses [Expo](https://expo.io/), [Firebase](https://firebase.google.com/) (Cloud Firestore, Storage and Auth), [react-native-paper](https://callstack.github.io/react-native-paper/) and a bunch of other cool tools.

[Short demo video](https://www.youtube.com/watch?v=-BPMJOxCd_A)

## Firebase Configuration

Create a Firebase project at [firebase.google.com](https://firebase.google.com/). Be sure to enable Cloud Firestore, Storage, and Facebook authentication (will require you to [register your app with Facebook](https://developers.facebook.com/docs/apps/)).

Copy the sample fields from `.env.example` and fill them with information from your Firebase and Facebook projects.

## Firebase Rules Setup

The following steps allow you to locally develop rules for Cloud Firestore or Storage and push them with `firebase deploy`. If you'd rather copy your rules onto the Firebase web console manually (from `firestore.rules` and `storage.rules`), that works as well.

Globally install the Firebase CLI:

```bash
npm i -g firebase-tools
# or with yarn
yarn global add firebase-tools
```

Ensure you are logged in:

```bash
firebase login
```

You should now be able to list any active projects using `firebase projects:list`.

In the cloned project directory, add your Firebase project:

```bash
firebase use --add
```

The name can be anything, such as `production`, `staging` or `develop`. You can add several Firebase projects and switch between them using `firebase use PROJECT_NAME`. For more details, see the [CLI docs](https://firebase.google.com/docs/cli#project_aliases).

## Usage

Start the Expo development server:

```bash
yarn start
# or to immediately start a simulator
yarn ios
yarn android
```
