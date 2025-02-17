---
title: Download React Native WebRTC Sample Project
description: Download and Install React Native WebRTC Sample Project
keywords: [React Native SDK User Guide, Ant Media Server Documentation, Ant Media Server Tutorials]
sidebar_position: 2
---

## Download React Native WebRTC Sample Project
Ant Media WebRTC React Native samples are available for free download on GitHub. You can access the repository through the link below:

[React Native WebRTC Samples on GitHub](https://github.com/ant-media/WebRTC-React-Native-SDK)

To download the entire project and access the sample implementations, follow these steps:

1. Clone the GitHub repository:

   ```bash
   git clone https://github.com/ant-media/WebRTC-React-Native-SDK.git
   ```
2. Navigate to the examples/src folder where all sample implementations are stored:

   ```bash
   cd WebRTC-React-Native-SDK
   ```
   Once inside the src folder, you'll find all the sample implementations ready for use.


---

## Install Dependencies

You can install the project dependencies using either **npm** or **yarn**. Follow the steps below based on your preferred package manager:

### Using npm

1. Open the root directory of the sample project in your terminal.
2. Run the following command to install the dependencies:

   ```bash
   npm install
   ```

3. Go to `example` directory and install dependencies again
   ```bash
   cd example
   npm install
   ```

4. After installing dependencies, run this command in the `example` directory to build and start the project for Android:

   ```bash
   npm run android
   ```

### Using yarn

1. Install yarn by following [this guide](https://classic.yarnpkg.com/en/docs/install).
2. Open the root directory of the sample project in your terminal.
3. Run the following command to install the dependencies:

   ```bash
   yarn install
   ```

4. Go to `example` directory and install dependencies again
   ```bash
   cd example
   yarn install
   ```

5. After installing dependencies, run this command to build and start the project for Android:

   ```bash
   yarn android
   ```

---

## Run the Project

Once the project is successfully built, the sample app will launch on your connected device or emulator. Explore the app to view various React Native WebRTC examples implemented by Ant Media.

You can proceed to the next document to learn more about the samples and how to run them.

### Notes
- Ensure your development environment is properly set up for React Native. Refer to the [React Native environment setup guide](https://reactnative.dev/docs/environment-setup).
- Use only one package manager (npm or yarn) throughout the project to avoid conflicts.

