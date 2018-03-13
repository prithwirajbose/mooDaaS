#include <stdio.h>
main() {
  chdir("/opt/app-root/src/Tests");
  printf("Starting Jenkins on server...");
system("robot -d result Build_Acceptance_Script/Build_Acceptance_Script.robot");
}
