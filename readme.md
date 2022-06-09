# Console File Manager

## Description

This is a CLI File Manager based on Node.js.

The file manager is able to do the following:

- Work using CLI
- Perform basic file operations (copy, move, delete, rename, etc.)
- Utilize Streams API
- Get information about the host machine operating system
- Perform hash calculations
- Compress and decompress files

## Technical requirements

- To run this application you will need 
    `npm`
- Download the repository and start the application by running the npm-script start in the following way:
```bash
npm run start -- --username=your_username
```
- After starting the program displays the following text in the console  
`Welcome to the File Manager, Username!`  
- After program work finished (`ctrl + c` pressed or user sent `.exit` command into console) the program displays the following text in the console  
`Thank you for using File Manager, Username!`  
- At the start of the program and after each end of input/operation current working directory is printed in following way:  
`You are currently in path_to_working_directory`  
- Starting working directory is current user's home directory
- By default program prompts the user in console to print commands and wait for results  
- In case of unknown operation or invalid input `Invalid input` message is shown and user is able to enter another command
- In case of error during execution of operation `Operation failed` message is shown and the user is able to enter another command
- Attempt to perform an operation on a non-existent file or work on a non-existent path results in the operation fail
- User can't go upper than the root directory. If user tries to do so, the current working directory doesn't change  

List of operations and their syntax:
- Navigation & working directory (nwd)
    - Go upper from current directory (when you are in the root folder this operation does not change the working directory)  
    ```bash
    up
    ```
    - Go to a specific folder from the current directory (`path_to_directory` can be relative or absolute)
    ```bash
    cd path_to_directory
    ```
    - List all files and folders in current directory and print it to the console
    ```bash
    ls
    ```
- Basic operations with files
    - Read file and print its content to the console: 
    ```bash
    cat path_to_file
    ```
    - Create an empty file in the current working directory: 
    ```bash
    add new_file_name
    ```
    - Rename a file: 
    ```bash
    rn path_to_file new_filename
    ```
    - Copy a file: 
    ```bash
    cp path_to_file path_to_new_directory
    ```
    - Move a file (same as copy but the initial file is deleted): 
    ```bash
    mv path_to_file path_to_new_directory
    ```
    - Delete a file: 
    ```bash
    rm path_to_file
    ```
- Operating system info (prints the following information to the console)
    - Get EOL (default system End-Of-Line)  
    ```bash
    os --EOL
    ```
    - Get the host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)  
    ```bash
    os --cpus
    ```
    - Get the home directory: 
    ```bash
    os --homedir
    ```
    - Get the current *system user name* (Not to be confused with the username that is set when the application starts)  
    ```bash
    os --username
    ```
    - Get the CPU architecture for which Node.js binary has compiled  
    ```bash
    os --architecture
    ```
- Hash calculation  
    - Calculate hash for a specific file and print it to the console  
    ```bash
    hash path_to_file
    ```
- Compress and decompress operations  
    - Compress a file (using Brotli algorithm)  
    ```bash
    compress path_to_file path_to_destination
    ```
    - Decompress a file (using Brotli algorithm)  
    ```bash
    decompress path_to_file path_to_destination
    ```
- Remember to start the app by running: 
```bash
npm run start -- --username=your_username
```