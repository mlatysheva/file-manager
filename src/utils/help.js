function Command(example, explanation) {
  this.example = example
  this.explanation = explanation;  
}

export const help = () => {
  const helpData = {};

  helpData.start = new Command("npm run start -- --username=your_username", "Start the application");
  helpData.exit = new Command(".exit or exit", "Exit the application");
  helpData.up = new Command("up", "Go upper from current directory");
  helpData.cd = new Command("cd path_to_directory", "Go to dedicated folder from current directory");
  helpData.ls = new Command("ls", "List all files and folder in current directory");
  helpData.cat = new Command("cat file_name", "Show content of the file");
  helpData.add = new Command("add file_name", "Create a new file in the current directory");
  helpData.rm = new Command("rm file_name", "Delete the file from the current directory");
  helpData.rn = new Command("rn file_name new_name", "Rename the file");
  helpData.cp = new Command("cp file_path new_destination", "Copy the file");
  helpData.mv = new Command("mv file_path new_file_path", "Move the file to another directory");
  helpData.os_EOL = new Command("os --EOL", "Show OS info: default end of line");
  helpData.os_cpus = new Command("os --cpus", "Show OS info: host machine CPUs");
  helpData.os_homedir = new Command("os --homedir", "Show OS info: home directory");
  helpData.os_username = new Command("os --username", "Show OS info: username");
  helpData.os_architecture = new Command("os --architecture", "Show OS info: CPU architecture");
  helpData.hash = new Command("hash file_path", "Calculate hash for the file");
  helpData.compress = new Command("compress file_path", "Compress the file");
  helpData.decompress = new Command("decompress file_path", "Decompress the file");

  console.table(helpData);
}