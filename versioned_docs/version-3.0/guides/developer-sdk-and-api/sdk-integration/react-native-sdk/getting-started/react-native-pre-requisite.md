---
title: Pre-Requisite For React Native SDK
description: Pre-Requisite for React Native SDK
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 1
---

### Software Requirements

*   Android Studio (IDE)
*   Android SDK
*   Java
*   NodeJs
*   NPM
*   React Native CLI

First, you need Node.js installed on your system. If Node.js is already installed, you can skip this step.

### Node JS Installation

![](@site/static/img/image(83).png)

Download the latest Node.js from: [nodejs.org/en](http://nodejs.org/en).

Once the setup is downloaded on your system, run the .msi downloaded file and follow the prompt instructions to install the application.

Furthermore, make ascertain that the Node and NPM have been installed.

Use the below commands to check the version:

```shell
node -v
```    
```shell
npm –v
```   

### React Native CLI

Use the below command to install React Native CLI.

```shell
 npm install -g react-native-cli
```

### Android Development Environment

Download & Install the Android Studio [https://developer.android.com/studio/install.html](https://developer.android.com/studio/install.html)

![](@site/static/img/image(84).png)

The Android Studio lets you run the Reactive Native application in an emulator and test the application.

### Verify React Native Installation

We’ll be building a sample project using React Native by running the following command:

```shell
react-native init MySampleApp
```

Now, run below commands in the terminal from the folder where you have created the application.

```shell
react-native start
``` 

```shell
react-native run-android
```

Make sure you’ve started the emulator on your machine. This is what the sample project will look like in the emulator:

![](@site/static/img/image(85).png)


### Congratulations!

At this point, your development environment for the React Native SDK is fully set up.
