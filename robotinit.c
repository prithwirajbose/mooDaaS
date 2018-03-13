#include <stdio.h>
main() {
  chdir("/opt/app-root/src/Tests");
  printf("Starting Jenkins on server...");
system("cd /opt/app-root/src/Tests; robot -d result Build_Acceptance_Script/Build_Acceptance_Script.robot");
system("cd /opt/app-root/src/Tests && robot -d result Build_Acceptance_Script/Build_Acceptance_Script.robot");
}
