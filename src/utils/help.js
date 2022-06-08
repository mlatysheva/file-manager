function Command(example, explanation) {
  this.example = example
  this.explanation = explanation;  
}

export const help = () => {
  const helpData = {};

  helpData.start = new Command("npm run start -- --username=your_username", "Start the application");

  helpData.up = new Command("up", "Go upper from current directory");
  helpData.cd = new Command("cd path_to_directory", "Go to dedicated folder from current directory");
  helpData.ls = new Command("ls", "List all files and folder in current directory");

  console.table(helpData);
}