# sunset-matches-ui

**Technologies:**

**Setup Instructions:**

1. **Prerequisites:**
    - Node.js(v20.11.0)
    - npm(10.2.4)
    - JDK(21.0.2)
    - Expo(49.0.8)
    - React(18.2.0)
    - React Native(0.72.4)
    - Firebase(10.3.1)
    - Formik(2.4.5) for Form Management & Yup(1.3.3) for validation
    - A code editor or IDE of your choice.
2. **Clone the Repository:**
    ```bash
    git clone https://github.com/sathishserman/sunset-matches-ui.git
    ```
    - Use github desktop for checking in code 

3. **Install Dependencies:**
    ```bash
    cd sunset-matches-ui
    npm install (or yarn install)
    ```
4. **Create Environment Variables:**
    - Create a `.env.local` file in the root directory.
    - Add variables for sensitive information (e.g., API keys, authentication credentials).
5. **Run the Development Server:**
    ```bash
    npx expo start -c
    ```
6. **Branching Stragety:**
    - Main branch will be the development branch
    - Create feature branches out of Main branch and create a PR for checking in the code
    - Release branches will be created whenever we make a production release
7. **EAS:**
    - Install npm install -g eas-cli to install eas-cli
    - npx expo prebuild to create and android and ios folders in your project(when asked for package name: com.sm.mobile.ui)
    - for Android: 
    Mac: Please do the following
    ```bash
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/tools
    export PATH=$PATH:$ANDROID_HOME/tools/bin
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```
    Windows:
    - Open the Start search, type "env", and select "Edit the system environment variables".
    - In the System Properties window, click the "Environment Variables..." button.
    - Under System Variables, click "New..." to add a new variable.
    - Set the variable name to ANDROID_HOME and the variable value to your SDK location, such as C:\Users\[Your-Username]\AppData\Local\Android\Sdk.
    - Add SDK tools to your PATH. You might need to add paths to the SDK's emulator, tools, tools/bin, and platform-tools directories to the system path variable.

